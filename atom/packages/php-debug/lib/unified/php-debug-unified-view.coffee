{Disposable} = require 'atom'
{$, ScrollView} = require 'atom-space-pen-views'
PhpDebugContextView = require '../context/php-debug-context-view'
PhpDebugStackView = require '../stack/php-debug-stack-view'
PhpDebugWatchView = require '../watch/php-debug-watch-view'
PhpDebugBreakpointView = require '../breakpoint/php-debug-breakpoint-view'
module.exports =
class PhpDebugUnifiedView extends ScrollView
  @content: ->
    @div class: 'php-debug php-debug-unified-view pane-item padded', style: 'overflow:auto;', tabindex: -1, =>
      @div class: "block", =>
        @button class: "btn octicon icon-playback-play inline-block-tight",    disabled: 'disabled', 'data-action':'continue', "Continue"
        @button class: "btn octicon icon-steps inline-block-tight",            disabled: 'disabled', 'data-action':'step', "Step Over"
        @button class: "btn octicon icon-sign-in inline-block-tight",          disabled: 'disabled', 'data-action':'in', "Step In"
        @button class: "btn octicon icon-sign-out inline-block-tight",         disabled: 'disabled', 'data-action':'out', "Step Out"
        @button class: "btn octicon icon-primitive-square inline-block-tight", disabled: 'disabled', 'data-action':'stop', "Stop"
      @div class: 'tabs-view', =>
        @div outlet: 'stackView', class:'php-debug-tab'
        @div outlet: 'contextView', class:'php-debug-tab'
        @div outlet: 'watchpointView', class:'php-debug-tab'
        @div outlet: 'breakpointView', class:'php-debug-tab'

  constructor: (params) ->
    super
    @GlobalContext = params.context
    @contextList = []
    @GlobalContext.onBreak () =>
      @find('button').enable()
    @GlobalContext.onRunning () =>
      @find('button').disable()
    @GlobalContext.onSessionEnd () =>
      @find('button').disable()

  serialize: ->
    deserializer: @constructor.name
    uri: @getURI()

  getURI: -> @uri

  getTitle: -> "Debugging"

  initialize: (params) =>
    super
    @stackView.append(new PhpDebugStackView(context: params.context))
    @contextView.append(new PhpDebugContextView(context: params.context))
    @watchpointView.append(new PhpDebugWatchView(context: params.context))
    @breakpointView.append(new PhpDebugBreakpointView(context: params.context))

    @on 'click', '[data-action]', (e) =>
      action = e.target.getAttribute('data-action')
      switch action
        when 'continue'
          @GlobalContext.getCurrentDebugContext().continue "run"
        when 'step'
          @GlobalContext.getCurrentDebugContext().continue "step_over"
        when 'in'
          @GlobalContext.getCurrentDebugContext().continue "step_into"
        when 'out'
          @GlobalContext.getCurrentDebugContext().continue "step_out"
        when 'stop'
          @GlobalContext.getCurrentDebugContext().executeDetach()

        else
          console.error "unknown action"
          console.dir action
          console.dir this

  openWindow: ->
    atom.workspace.addBottomPanel({
      item: this
      visible: true
    })

  onDidChangeTitle: -> new Disposable ->
  onDidChangeModified: -> new Disposable ->

  destroy: =>
    if @GlobalContext.getCurrentDebugContext()
      @GlobalContext.getCurrentDebugContext().executeDetach()

  isEqual: (other) ->
    other instanceof PhpDebugUnifiedView
