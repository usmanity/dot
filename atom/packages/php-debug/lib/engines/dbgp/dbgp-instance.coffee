parseString = require('xml2js').parseString
Q = require 'q'
{Emitter, Disposable} = require 'event-kit'
helpers = require '../../helpers.coffee'

DebugContext = require '../../models/debug-context'
Watchpoint = require '../../models/watchpoint'
Breakpoint = require '../../models/breakpoint'

module.exports =
class DbgpInstance extends DebugContext
  constructor: (params) ->
    super
    @socket = params.socket
    @GlobalContext = params.context
    @promises = []
    @socket.on 'data', @stuff
    @emitter = new Emitter
    @buffer = ''
    @GlobalContext.addDebugContext(this)
    @GlobalContext.notifySessionStart()
    @breakpointMap = {}
    @socket.on "error", (error) =>
      @GlobalContext.notifySessionEnd()

  stop: ->
    @socket.end()
    @GlobalContext.notifySessionEnd()

  syncStack: ->
    return @executeCommand('stack_get').then (data) =>
      stackFrames = []
      for frame in data.response.stack
        csonFrame = {
          id:       frame.$.level
          label:    frame.$.where
          filepath: frame.$.filename
          line:     frame.$.lineno
        }
        stackFrames.push csonFrame
      @setStack(stackFrames)

  nextTransactionId: ->
    if !@transaction_id
      @transaction_id = 1
    return @transaction_id++

  parse: (buffer) =>
    while buffer.split("\0").length >= 2
      n = buffer.indexOf("\0")
      len = parseInt(buffer.slice(0, n))
      if buffer.length >= n + len + 2
        message = buffer.slice(n+1, n+1+len)
        buffer = buffer.slice(n+2+len)
        if message != ""
          o = parseString message, (err, result) =>
            if err
              console.error err
            else
              type = Object.keys(result)[0]
              switch type
                when "init" then @onInit result
                when "response"
                  @parseResponse result
      else
        return buffer
    return buffer

  parseResponse: (data) =>
    result = data.response.$
    transactionId = result.transaction_id

    if @promises[transactionId] != undefined
      @promises[transactionId].resolve(data)
      delete @promises[transactionId]
    else
      console.warn "Could not find promise for transaction " + transactionId


  stuff: (data) =>
    @buffer = message = @parse(@buffer + data)

  executeCommand: (command, options, data) ->
    @command(command, options, data)

  command: (command, options, data) =>

    transactionId = @nextTransactionId()
    deferred = Q.defer();
    @promises[transactionId] = deferred

    payload = command + " -i " + transactionId
    if options && Object.keys(options).length > 0
      argu = ("-"+(arg) + " " + encodeURI(val) for arg, val of options)
      argu2 = argu.join(" ")
      payload += " " + argu2

    if data
      payload += " -- " + new Buffer(data, 'ascii').toString('base64')
    if @socket
      @socket.write(payload + "\0")
    else
      console.error "No socket found"
    return deferred.promise

  getFeature: (feature_name) =>
    @command("feature_get", {n: feature_name})

  setFeature: (feature_name, value) =>
    return @command("feature_set", {n: feature_name, v: value})

  onInit: (data) =>
    console.log "init"
    @setFeature('show_hidden', 1)
    .then () =>
      return @setFeature('max_depth', atom.config.get('php-debug.MaxDepth'))
    .then () =>
      return @setFeature('max_data', atom.config.get('php-debug.MaxData'))
    .then () =>
      return @setFeature('max_children', atom.config.get('php-debug.MaxChildren'))
    .then () =>
      return @setFeature('multiple_sessions', 0)
    .then () =>
      return @sendAllBreakpoints()
    .then () =>
      return @executeRun()


  sendAllBreakpoints: =>
    breakpoints = @GlobalContext.getBreakpoints()
    commands = []
    for breakpoint in breakpoints
      commands.push @executeBreakpoint(breakpoint)

    if atom.config.get('php-debug.PhpException.FatalError')
      commands.push @executeBreakpoint(new Breakpoint(type: Breakpoint.TYPE_EXCEPTION, exception: 'Fatal Error'))
    if atom.config.get('php-debug.PhpException.CatchableFatalError')
      commands.push @executeBreakpoint(new Breakpoint(type: Breakpoint.TYPE_EXCEPTION, exception: 'Catchable Fatal Error'))
    if atom.config.get('php-debug.PhpException.Warning')
      commands.push @executeBreakpoint(new Breakpoint(type: Breakpoint.TYPE_EXCEPTION, exception: 'Warning'))
    if atom.config.get('php-debug.PhpException.StrictStandards')
      commands.push @executeBreakpoint(new Breakpoint(type: Breakpoint.TYPE_EXCEPTION, exception: 'Strict Standards'))
    if atom.config.get('php-debug.PhpException.Xdebug')
      commands.push @executeBreakpoint(new Breakpoint(type: Breakpoint.TYPE_EXCEPTION, exception: 'Xdebug'))
    if atom.config.get('php-debug.PhpException.UnknownError')
      commands.push @executeBreakpoint(new Breakpoint(type: Breakpoint.TYPE_EXCEPTION, exception: 'Unknown Error'))
    if atom.config.get('php-debug.PhpException.Notice')
      commands.push @executeBreakpoint(new Breakpoint(type: Breakpoint.TYPE_EXCEPTION, exception: 'Notice'))

    for exception in atom.config.get('php-debug.CustomExceptions')
      console.log exception
      commands.push @executeBreakpoint(new Breakpoint(type: Breakpoint.TYPE_EXCEPTION, exception: exception))

    return Q.all(commands)

  executeBreakpoint: (breakpoint) =>
    switch breakpoint.getType()
      when Breakpoint.TYPE_LINE
        path = breakpoint.getPath()
        path = helpers.localPathToRemote(path)
        options = {
          t: 'line'
          f: 'file://' + path
          n: breakpoint.getLine()
        }
      when Breakpoint.TYPE_EXCEPTION
        options = {
          t: 'exception'
          x: breakpoint.getException()
        }
    p =  @command("breakpoint_set", options)
    return p.then (data) =>
      @breakpointMap[breakpoint.getId()] = data.response.$.id

  executeBreakpointRemove: (breakpoint) =>
    path = breakpoint.getPath()
    path = helpers.localPathToRemote(path)
    options = {
      d: @breakpointMap[breakpoint.getId()]
    }
    return @command("breakpoint_remove", options)

  continue: (type) =>
    @GlobalContext.notifyRunning()
    return @command(type).then(
      (data) =>
        response = data.response
        switch response.$.status
          when 'break'
            messages = response["xdebug:message"]
            message = messages[0]
            thing = message.$
            console.dir data
            filepath = decodeURI(thing['filename']).replace("file:///", "")

            if not filepath.match(/^[a-zA-Z]:/)
              filepath = '/' + filepath

            lineno = thing['lineno']
            type = 'break'
            if thing.exception
              type = "error"
            breakpoint = new Breakpoint(filepath: filepath, line:lineno, type: type)
            @GlobalContext.notifyBreak(breakpoint)
          when 'stopping'
            @executeStop()
          else
            console.dir response
            console.error "Unhandled status: " + response.$.status
    )

  syncCurrentContext: () ->
    p2 = @getContextNames().then(
      (data) =>
        return @processContextNames(data)
    )

    p3 = p2.then(
      (data) =>
        return @updateWatchpoints(data)
    )

    p4 = p3.then (
      (data) =>
        @syncStack()
    )

    p5 = p4.then(
      (data) =>
        return @GlobalContext.notifyContextUpdate()
    )

    p5.done()

  getContextNames: () ->
    return @command("context_names")

  processContextNames: (data) =>
    for context in data.response.context
      @addScope(context.$.id,context.$.name)
    commands = []
    scopes = @getScopes()
    for index, scope of scopes
      commands.push(@updateContext(scope))
    return Q.all(commands)

  executeDetach: () =>
    @command('detach')
    .then () =>
      @executeStop()

  updateWatchpoints: (data) =>
    @clearWatchpoints()
    commands = []
    for watch in @GlobalContext.getWatchpoints()
      commands.push @evalWatchpoint(watch)
    return Q.all(commands)


  executeEval: (expression) ->
    return @command("eval", null, expression)

  evalWatchpoint: (watchpoint) ->
    p = @command("eval", null, watchpoint.getExpression())
    return p.then (data) =>
      datum = @parseContextVariable({variable:data.response.property[0]})
      datum.label = watchpoint.getExpression()
      watchpoint.setValue(datum)
      @addWatchpoint(watchpoint)

  updateContext: (scope) =>
    p = @contextGet(scope.scopeId)
    return p.then (data) =>
      context = @buildContext data
      @setScopeContext(scope.scopeId, context)

  contextGet: (scope) =>
    return @command("context_get", {c: scope})

  buildContext: (response) =>
    data = {}
    data.type = 'context'
    data.context = response.response.$.context
    data.variables = []
    if response.response.property
      for property in response.response.property
        v = @parseContextVariable({variable:property})
        data.variables.push v
      return data

  executeRun: () =>
    return @continue("run")

  executeStop: () =>
    @command("stop")
    @stop()

  parseContextVariable: ({variable}) ->
    datum = {
      name : variable.$.name
      fullname : variable.$.fullname
      type: variable.$.type
    }

    if variable.$.fullname?
      datum.label = variable.$.fullname
    else if variable.$.name?
      datum.label = variable.$.name

    switch variable.$.type
      when "string"
        switch variable.$.encoding
          when "base64"
            if not variable._?
              datum.value = ""
            else
              datum.value = new Buffer(variable._, 'base64').toString('ascii')
          else
            console.error "Unhandled context variable encoding: " + variable.$.encoding
      when "array"
        datum.value = []
        datum.length = variable.$.numchildren
        if variable.property
          for property in variable.property
            datum.value.push @parseContextVariable({variable:property})
      when "object"
        datum.value = []
        if variable.property
          for property in variable.property
            datum.value.push @parseContextVariable({variable:property})
      when "int"
        datum.type = "numeric"
        datum.value = variable._
      when "uninitialized"
        datum.value = undefined
      when "null"
        datum.value = null
      when "bool"
        datum.value = variable._
      when "float"
        datum.type = "numeric"
        datum.value = variable._
      else
        console.dir variable
        console.error "Unhandled context variable type: " + variable.$.type
    return datum
