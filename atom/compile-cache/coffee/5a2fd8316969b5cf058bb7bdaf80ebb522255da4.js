(function() {
  var CommandContext, Emitter, Runtime, _;

  CommandContext = require('./command-context');

  _ = require('underscore');

  Emitter = require('atom').Emitter;

  module.exports = Runtime = (function() {
    Runtime.prototype.observers = [];

    function Runtime(runner, codeContextBuilder, observers, emitter) {
      this.runner = runner;
      this.codeContextBuilder = codeContextBuilder;
      this.observers = observers != null ? observers : [];
      this.emitter = emitter != null ? emitter : new Emitter;
      this.scriptOptions = this.runner.scriptOptions;
      _.each(this.observers, (function(_this) {
        return function(observer) {
          return observer.observe(_this);
        };
      })(this));
    }

    Runtime.prototype.addObserver = function(observer) {
      this.observers.push(observer);
      return observer.observe(this);
    };

    Runtime.prototype.destroy = function() {
      this.stop();
      this.runner.destroy();
      _.each(this.observers, (function(_this) {
        return function(observer) {
          return observer.destroy();
        };
      })(this));
      this.emitter.dispose();
      return this.codeContextBuilder.destroy();
    };

    Runtime.prototype.execute = function(argType, input) {
      var codeContext, commandContext;
      if (argType == null) {
        argType = "Selection Based";
      }
      if (input == null) {
        input = null;
      }
      this.emitter.emit('did-execute-start');
      codeContext = this.codeContextBuilder.buildCodeContext(atom.workspace.getActiveTextEditor(), argType);
      if (codeContext.lang == null) {
        return;
      }
      commandContext = CommandContext.build(this, this.scriptOptions, codeContext);
      if (!commandContext) {
        return;
      }
      this.emitter.emit('did-context-create', {
        lang: codeContext.lang,
        filename: codeContext.filename,
        lineNumber: codeContext.lineNumber
      });
      return this.runner.run(commandContext.command, commandContext.args, codeContext, input);
    };

    Runtime.prototype.stop = function() {
      return this.runner.stop();
    };

    Runtime.prototype.onDidExecuteStart = function(callback) {
      return this.emitter.on('did-execute-start', callback);
    };

    Runtime.prototype.onDidNotSpecifyLanguage = function(callback) {
      return this.codeContextBuilder.onDidNotSpecifyLanguage(callback);
    };

    Runtime.prototype.onDidNotSupportLanguage = function(callback) {
      return this.codeContextBuilder.onDidNotSupportLanguage(callback);
    };

    Runtime.prototype.onDidNotSupportMode = function(callback) {
      return this.emitter.on('did-not-support-mode', callback);
    };

    Runtime.prototype.onDidNotBuildArgs = function(callback) {
      return this.emitter.on('did-not-build-args', callback);
    };

    Runtime.prototype.onDidContextCreate = function(callback) {
      return this.emitter.on('did-context-create', callback);
    };

    Runtime.prototype.onDidWriteToStdout = function(callback) {
      return this.runner.onDidWriteToStdout(callback);
    };

    Runtime.prototype.onDidWriteToStderr = function(callback) {
      return this.runner.onDidWriteToStderr(callback);
    };

    Runtime.prototype.onDidExit = function(callback) {
      return this.runner.onDidExit(callback);
    };

    Runtime.prototype.onDidNotRun = function(callback) {
      return this.runner.onDidNotRun(callback);
    };

    Runtime.prototype.modeNotSupported = function(argType, lang) {
      return this.emitter.emit('did-not-support-mode', {
        argType: argType,
        lang: lang
      });
    };

    Runtime.prototype.didNotBuildArgs = function(error) {
      return this.emitter.emit('did-not-build-args', {
        error: error
      });
    };

    return Runtime;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvcnVudGltZS5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsbUNBQUE7O0FBQUEsRUFBQSxjQUFBLEdBQWlCLE9BQUEsQ0FBUSxtQkFBUixDQUFqQixDQUFBOztBQUFBLEVBRUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxZQUFSLENBRkosQ0FBQTs7QUFBQSxFQUlDLFVBQVcsT0FBQSxDQUFRLE1BQVIsRUFBWCxPQUpELENBQUE7O0FBQUEsRUFNQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osc0JBQUEsU0FBQSxHQUFXLEVBQVgsQ0FBQTs7QUFLYSxJQUFBLGlCQUFFLE1BQUYsRUFBVyxrQkFBWCxFQUFnQyxTQUFoQyxFQUFpRCxPQUFqRCxHQUFBO0FBQ1gsTUFEWSxJQUFDLENBQUEsU0FBQSxNQUNiLENBQUE7QUFBQSxNQURxQixJQUFDLENBQUEscUJBQUEsa0JBQ3RCLENBQUE7QUFBQSxNQUQwQyxJQUFDLENBQUEsZ0NBQUEsWUFBWSxFQUN2RCxDQUFBO0FBQUEsTUFEMkQsSUFBQyxDQUFBLDRCQUFBLFVBQVUsR0FBQSxDQUFBLE9BQ3RFLENBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxhQUFELEdBQWlCLElBQUMsQ0FBQSxNQUFNLENBQUMsYUFBekIsQ0FBQTtBQUFBLE1BQ0EsQ0FBQyxDQUFDLElBQUYsQ0FBTyxJQUFDLENBQUEsU0FBUixFQUFtQixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxRQUFELEdBQUE7aUJBQWMsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsS0FBakIsRUFBZDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQW5CLENBREEsQ0FEVztJQUFBLENBTGI7O0FBQUEsc0JBZUEsV0FBQSxHQUFhLFNBQUMs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

//# sourceURL=/Users/muhammad/.atom/packages/script/lib/runtime.coffee
