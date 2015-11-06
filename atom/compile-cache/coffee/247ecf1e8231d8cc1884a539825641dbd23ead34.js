(function() {
  var Breakpoint, DbgpInstance, DebugContext, Disposable, Emitter, Q, Watchpoint, helpers, parseString, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  parseString = require('xml2js').parseString;

  Q = require('q');

  _ref = require('event-kit'), Emitter = _ref.Emitter, Disposable = _ref.Disposable;

  helpers = require('../../helpers.coffee');

  DebugContext = require('../../models/debug-context');

  Watchpoint = require('../../models/watchpoint');

  Breakpoint = require('../../models/breakpoint');

  module.exports = DbgpInstance = (function(_super) {
    __extends(DbgpInstance, _super);

    function DbgpInstance(params) {
      this.executeStop = __bind(this.executeStop, this);
      this.executeRun = __bind(this.executeRun, this);
      this.buildContext = __bind(this.buildContext, this);
      this.contextGet = __bind(this.contextGet, this);
      this.updateContext = __bind(this.updateContext, this);
      this.updateWatchpoints = __bind(this.updateWatchpoints, this);
      this.executeDetach = __bind(this.executeDetach, this);
      this.processContextNames = __bind(this.processContextNames, this);
      this["continue"] = __bind(this["continue"], this);
      this.executeBreakpointRemove = __bind(this.executeBreakpointRemove, this);
      this.executeBreakpoint = __bind(this.executeBreakpoint, this);
      this.sendAllBreakpoints = __bind(this.sendAllBreakpoints, this);
      this.onInit = __bind(this.onInit, this);
      this.setFeature = __bind(this.setFeature, this);
      this.getFeature = __bind(this.getFeature, this);
      this.command = __bind(this.command, this);
      this.stuff = __bind(this.stuff, this);
      this.parseResponse = __bind(this.parseResponse, this);
      this.parse = __bind(this.parse, this);
      DbgpInstance.__super__.constructor.apply(this, arguments);
      this.socket = params.socket;
      this.GlobalContext = params.context;
      this.promises = [];
      this.socket.on('data', this.stuff);
      this.emitter = new Emitter;
      this.buffer = '';
      this.GlobalContext.addDebugContext(this);
      this.GlobalContext.notifySessionStart();
      this.breakpointMap = {};
      this.socket.on("error", (function(_this) {
        return function(error) {
          return _this.GlobalContext.notifySessionEnd();
        };
      })(this));
    }

    DbgpInstance.prototype.stop = function() {
      this.socket.end();
      return this.GlobalContext.notifySessionEnd();
    };

    DbgpInstance.prototype.syncStack = function() {
      return this.executeCommand('stack_get').then((function(_this) {
        return function(data) {
          var csonFrame, frame, stackFrames, _i, _len, _ref1;
          stackFrames = [];
          _ref1 = data.response.stack;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            frame = _ref1[_i];
            csonFrame = {
              id: frame.$.level,
              label: frame.$.where,
              filepath: frame.$.filename,
              line: frame.$.lineno
            };
            stackFrames.push(csonFrame);
          }
          return _this.setStack(stackFrames);
        };
      })(this));
    };

    DbgpInstance.prototype.nextTransactionId = function() {
      if (!this.transaction_id) {
        this.transaction_id = 1;
      }
      return this.transaction_id++;
    };

    DbgpInstance.prototype.parse = function(buffer) {
      var len, message, n, o;
      while (buffer.split("\0").length >= 2) {
        n = buffer.indexOf("\0");
        len = parseInt(buffer.slice(0, n));
        if (buffer.length >= n + len + 2) {
          message = buffer.slice(n + 1, n + 1 + len);
          buffer = buffer.slice(n + 2 + len);
          if (message !== "") {
            o = parseString(message, (function(_this) {
              return function(err, result) {
                var type;
                if (err) {
                  return console.error(err);
                } else {
                  type = Object.keys(result)[0];
                  switch (type) {
                    case "init":
                      return _this.onInit(result);
                    case "response":
                      return _this.parseResponse(result);
                  }
                }
              };
            })(this));
          }
        } else {
          return buffer;
        }
      }
      return buffer;
    };

    DbgpInstance.prototype.parseResponse = function(data) {
      var result, transactionId;
      result = data.response.$;
      transactionId = result.transaction_id;
      if (this.promises[transactionId] !== void 0) {
        this.promises[transactionId].resolve(data);
        return delete this.promises[transactionId];
      } else {
        return console.warn("Could not find promise for transaction " + transactionId);
      }
    };

    DbgpInstance.prototype.stuff = function(data) {
      var message;
      return this.buffer = message = this.parse(this.buffer + data);
    };

    DbgpInstance.prototype.executeCommand = function(command, options, data) {
      return this.command(command, options, data);
    };

    DbgpInstance.prototype.command = function(command, options, data) {
      var arg, argu, argu2, deferred, payload, transactionId, val;
      transactionId = this.nextTransactionId();
      deferred = Q.defer();
      this.promises[transactionId] = deferred;
      payload = command + " -i " + transactionId;
      if (options && Object.keys(options).length > 0) {
        argu = (function() {
          var _results;
          _results = [];
          for (arg in options) {
            val = options[arg];
            _results.push("-" + arg + " " + encodeURI(val));
          }
          return _results;
        })();
        argu2 = argu.join(" ");
        payload += " " + argu2;
      }
      if (data) {
        payload += " -- " + new Buffer(data, 'ascii').toString('base64');
      }
      if (this.socket) {
        this.socket.write(payload + "\0");
      } else {
        console.error("No socket found");
      }
      return deferred.promise;
    };

    DbgpInstance.prototype.getFeature = function(feature_name) {
      return this.command("feature_get", {
        n: feature_name
      });
    };

    DbgpInstance.prototype.setFeature = function(feature_name, value) {
      return this.command("feature_set", {
        n: feature_name,
        v: value
      });
    };

    DbgpInstance.prototype.onInit = function(data) {
      console.log("init");
      return this.setFeature('show_hidden', 1).then((function(_this) {
        return function() {
          return _this.setFeature('max_depth', atom.config.get('php-debug.MaxDepth'));
        };
      })(this)).then((function(_this) {
        return function() {
          return _this.setFeature('max_data', atom.config.get('php-debug.MaxData'));
        };
      })(this)).then((function(_this) {
        return function() {
          return _this.setFeature('max_children', atom.config.get('php-debug.MaxChildren'));
        };
      })(this)).then((function(_this) {
        return function() {
          return _this.setFeature('multiple_sessions', 0);
        };
      })(this)).then((function(_this) {
        return function() {
          return _this.sendAllBreakpoints();
        };
      })(this)).then((function(_this) {
        return function() {
          return _this.executeRun();
        };
      })(this));
    };

    DbgpInstance.prototype.sendAllBreakpoints = function() {
      var breakpoint, breakpoints, commands, exception, _i, _j, _len, _len1, _ref1;
      breakpoints = this.GlobalContext.getBreakpoints();
      commands = [];
      for (_i = 0, _len = breakpoints.length; _i < _len; _i++) {
        breakpoint = breakpoints[_i];
        commands.push(this.executeBreakpoint(breakpoint));
      }
      if (atom.config.get('php-debug.PhpException.FatalError')) {
        commands.push(this.executeBreakpoint(new Breakpoint({
          type: Breakpoint.TYPE_EXCEPTION,
          exception: 'Fatal Error'
        })));
      }
      if (atom.config.get('php-debug.PhpException.CatchableFatalError')) {
        commands.push(this.executeBreakpoint(new Breakpoint({
          type: Breakpoint.TYPE_EXCEPTION,
          exception: 'Catchable Fatal Error'
        })));
      }
      if (atom.config.get('php-debug.PhpException.Warning')) {
        commands.push(this.executeBreakpoint(new Breakpoint({
          type: Breakpoint.TYPE_EXCEPTION,
          exception: 'Warning'
        })));
      }
      if (atom.config.get('php-debug.PhpException.StrictStandards')) {
        commands.push(this.executeBreakpoint(new Breakpoint({
          type: Breakpoint.TYPE_EXCEPTION,
          exception: 'Strict Standards'
        })));
      }
      if (atom.config.get('php-debug.PhpException.Xdebug')) {
        commands.push(this.executeBreakpoint(new Breakpoint({
          type: Breakpoint.TYPE_EXCEPTION,
          exception: 'Xdebug'
        })));
      }
      if (atom.config.get('php-debug.PhpException.UnknownError')) {
        commands.push(this.executeBreakpoint(new Breakpoint({
          type: Breakpoint.TYPE_EXCEPTION,
          exception: 'Unknown Error'
        })));
      }
      if (atom.config.get('php-debug.PhpException.Notice')) {
        commands.push(this.executeBreakpoint(new Breakpoint({
          type: Breakpoint.TYPE_EXCEPTION,
          exception: 'Notice'
        })));
      }
      _ref1 = atom.config.get('php-debug.CustomExceptions');
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        exception = _ref1[_j];
        console.log(exception);
        commands.push(this.executeBreakpoint(new Breakpoint({
          type: Breakpoint.TYPE_EXCEPTION,
          exception: exception
        })));
      }
      return Q.all(commands);
    };

    DbgpInstance.prototype.executeBreakpoint = function(breakpoint) {
      var options, p, path;
      switch (breakpoint.getType()) {
        case Breakpoint.TYPE_LINE:
          path = breakpoint.getPath();
          path = helpers.localPathToRemote(path);
          options = {
            t: 'line',
            f: 'file://' + path,
            n: breakpoint.getLine()
          };
          break;
        case Breakpoint.TYPE_EXCEPTION:
          options = {
            t: 'exception',
            x: breakpoint.getException()
          };
      }
      p = this.command("breakpoint_set", options);
      return p.then((function(_this) {
        return function(data) {
          return _this.breakpointMap[breakpoint.getId()] = data.response.$.id;
        };
      })(this));
    };

    DbgpInstance.prototype.executeBreakpointRemove = function(breakpoint) {
      var options, path;
      path = breakpoint.getPath();
      path = helpers.localPathToRemote(path);
      options = {
        d: this.breakpointMap[breakpoint.getId()]
      };
      return this.command("breakpoint_remove", options);
    };

    DbgpInstance.prototype["continue"] = function(type) {
      this.GlobalContext.notifyRunning();
      return this.command(type).then((function(_this) {
        return function(data) {
          var breakpoint, filepath, lineno, message, messages, response, thing;
          response = data.response;
          switch (response.$.status) {
            case 'break':
              messages = response["xdebug:message"];
              message = messages[0];
              thing = message.$;
              console.dir(data);
              filepath = decodeURI(thing['filename']).replace("file:///", "");
              if (!filepath.match(/^[a-zA-Z]:/)) {
                filepath = '/' + filepath;
              }
              lineno = thing['lineno'];
              type = 'break';
              if (thing.exception) {
                type = "error";
              }
              breakpoint = new Breakpoint({
                filepath: filepath,
                line: lineno,
                type: type
              });
              return _this.GlobalContext.notifyBreak(breakpoint);
            case 'stopping':
              return _this.executeStop();
            default:
              console.dir(response);
              return console.error("Unhandled status: " + response.$.status);
          }
        };
      })(this));
    };

    DbgpInstance.prototype.syncCurrentContext = function() {
      var p2, p3, p4, p5;
      p2 = this.getContextNames().then((function(_this) {
        return function(data) {
          return _this.processContextNames(data);
        };
      })(this));
      p3 = p2.then((function(_this) {
        return function(data) {
          return _this.updateWatchpoints(data);
        };
      })(this));
      p4 = p3.then(((function(_this) {
        return function(data) {
          return _this.syncStack();
        };
      })(this)));
      p5 = p4.then((function(_this) {
        return function(data) {
          return _this.GlobalContext.notifyContextUpdate();
        };
      })(this));
      return p5.done();
    };

    DbgpInstance.prototype.getContextNames = function() {
      return this.command("context_names");
    };

    DbgpInstance.prototype.processContextNames = function(data) {
      var commands, context, index, scope, scopes, _i, _len, _ref1;
      _ref1 = data.response.context;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        context = _ref1[_i];
        this.addScope(context.$.id, context.$.name);
      }
      commands = [];
      scopes = this.getScopes();
      for (index in scopes) {
        scope = scopes[index];
        commands.push(this.updateContext(scope));
      }
      return Q.all(commands);
    };

    DbgpInstance.prototype.executeDetach = function() {
      return this.command('detach').then((function(_this) {
        return function() {
          return _this.executeStop();
        };
      })(this));
    };

    DbgpInstance.prototype.updateWatchpoints = function(data) {
      var commands, watch, _i, _len, _ref1;
      this.clearWatchpoints();
      commands = [];
      _ref1 = this.GlobalContext.getWatchpoints();
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        watch = _ref1[_i];
        commands.push(this.evalWatchpoint(watch));
      }
      return Q.all(commands);
    };

    DbgpInstance.prototype.executeEval = function(expression) {
      return this.command("eval", null, expression);
    };

    DbgpInstance.prototype.evalWatchpoint = function(watchpoint) {
      var p;
      p = this.command("eval", null, watchpoint.getExpression());
      return p.then((function(_this) {
        return function(data) {
          var datum;
          datum = _this.parseContextVariable({
            variable: data.response.property[0]
          });
          datum.label = watchpoint.getExpression();
          watchpoint.setValue(datum);
          return _this.addWatchpoint(watchpoint);
        };
      })(this));
    };

    DbgpInstance.prototype.updateContext = function(scope) {
      var p;
      p = this.contextGet(scope.scopeId);
      return p.then((function(_this) {
        return function(data) {
          var context;
          context = _this.buildContext(data);
          return _this.setScopeContext(scope.scopeId, context);
        };
      })(this));
    };

    DbgpInstance.prototype.contextGet = function(scope) {
      return this.command("context_get", {
        c: scope
      });
    };

    DbgpInstance.prototype.buildContext = function(response) {
      var data, property, v, _i, _len, _ref1;
      data = {};
      data.type = 'context';
      data.context = response.response.$.context;
      data.variables = [];
      if (response.response.property) {
        _ref1 = response.response.property;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          property = _ref1[_i];
          v = this.parseContextVariable({
            variable: property
          });
          data.variables.push(v);
        }
        return data;
      }
    };

    DbgpInstance.prototype.executeRun = function() {
      return this["continue"]("run");
    };

    DbgpInstance.prototype.executeStop = function() {
      this.command("stop");
      return this.stop();
    };

    DbgpInstance.prototype.parseContextVariable = function(_arg) {
      var datum, property, variable, _i, _j, _len, _len1, _ref1, _ref2;
      variable = _arg.variable;
      datum = {
        name: variable.$.name,
        fullname: variable.$.fullname,
        type: variable.$.type
      };
      if (variable.$.fullname != null) {
        datum.label = variable.$.fullname;
      } else if (variable.$.name != null) {
        datum.label = variable.$.name;
      }
      switch (variable.$.type) {
        case "string":
          switch (variable.$.encoding) {
            case "base64":
              if (variable._ == null) {
                datum.value = "";
              } else {
                datum.value = new Buffer(variable._, 'base64').toString('ascii');
              }
              break;
            default:
              console.error("Unhandled context variable encoding: " + variable.$.encoding);
          }
          break;
        case "array":
          datum.value = [];
          datum.length = variable.$.numchildren;
          if (variable.property) {
            _ref1 = variable.property;
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              property = _ref1[_i];
              datum.value.push(this.parseContextVariable({
                variable: property
              }));
            }
          }
          break;
        case "object":
          datum.value = [];
          if (variable.property) {
            _ref2 = variable.property;
            for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
              property = _ref2[_j];
              datum.value.push(this.parseContextVariable({
                variable: property
              }));
            }
          }
          break;
        case "int":
          datum.type = "numeric";
          datum.value = variable._;
          break;
        case "uninitialized":
          datum.value = void 0;
          break;
        case "null":
          datum.value = null;
          break;
        case "bool":
          datum.value = variable._;
          break;
        case "float":
          datum.type = "numeric";
          datum.value = variable._;
          break;
        default:
          console.dir(variable);
          console.error("Unhandled context variable type: " + variable.$.type);
      }
      return datum;
    };

    return DbgpInstance;

  })(DebugContext);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3BocC1kZWJ1Zy9saWIvZW5naW5lcy9kYmdwL2RiZ3AtaW5zdGFuY2UuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHNHQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxRQUFSLENBQWlCLENBQUMsV0FBaEMsQ0FBQTs7QUFBQSxFQUNBLENBQUEsR0FBSSxPQUFBLENBQVEsR0FBUixDQURKLENBQUE7O0FBQUEsRUFFQSxPQUF3QixPQUFBLENBQVEsV0FBUixDQUF4QixFQUFDLGVBQUEsT0FBRCxFQUFVLGtCQUFBLFVBRlYsQ0FBQTs7QUFBQSxFQUdBLE9BQUEsR0FBVSxPQUFBLENBQVEsc0JBQVIsQ0FIVixDQUFBOztBQUFBLEVBS0EsWUFBQSxHQUFlLE9BQUEsQ0FBUSw0QkFBUixDQUxmLENBQUE7O0FBQUEsRUFNQSxVQUFBLEdBQWEsT0FBQSxDQUFRLHlCQUFSLENBTmIsQ0FBQTs7QUFBQSxFQU9BLFVBQUEsR0FBYSxPQUFBLENBQVEseUJBQVIsQ0FQYixDQUFBOztBQUFBLEVBU0EsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLG1DQUFBLENBQUE7O0FBQWEsSUFBQSxzQkFBQyxNQUFELEdBQUE7QUFDWCx1REFBQSxDQUFBO0FBQUEscURBQUEsQ0FBQTtBQUFBLHlEQUFBLENBQUE7QUFBQSxxREFBQSxDQUFBO0FBQUEsMkRBQUEsQ0FBQTtBQUFBLG1FQUFBLENBQUE7QUFBQSwyREFBQSxDQUFBO0FBQUEsdUVBQUEsQ0FBQTtBQUFBLHVEQUFBLENBQUE7QUFBQSwrRUFBQSxDQUFBO0FBQUEsbUVBQUEsQ0FBQTtBQUFBLHFFQUFBLENBQUE7QUFBQSw2Q0FBQSxDQUFBO0FBQUEscURBQUEsQ0FBQTtBQUFBLHFEQUFBLENBQUE7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

//# sourceURL=/Users/muhammad/.atom/packages/php-debug/lib/engines/dbgp/dbgp-instance.coffee
