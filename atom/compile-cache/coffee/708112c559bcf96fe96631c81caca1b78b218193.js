(function() {
  var Disposable, Emitter, GlobalContext, helpers, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  helpers = require('../helpers.coffee');

  _ref = require('event-kit'), Emitter = _ref.Emitter, Disposable = _ref.Disposable;

  module.exports = GlobalContext = (function() {
    atom.deserializers.add(GlobalContext);

    function GlobalContext() {
      this.getCurrentDebugContext = __bind(this.getCurrentDebugContext, this);
      this.emitter = new Emitter;
      this.breakpoints = [];
      this.watchpoints = [];
      this.debugContexts = [];
      this.onSessionEnd((function(_this) {
        return function() {
          delete _this.debugContexts[0];
          return _this.debugContexts = [];
        };
      })(this));
    }

    GlobalContext.prototype.serialize = function() {
      return {
        deserializer: 'GlobalContext',
        data: {
          version: this.constructor.version,
          breakpoints: helpers.serializeArray(this.getBreakpoints()),
          watchpoints: helpers.serializeArray(this.getWatchpoints())
        }
      };
    };

    GlobalContext.deserialize = function(_arg) {
      var breakpoints, context, data, watchpoints;
      data = _arg.data;
      context = new GlobalContext();
      breakpoints = helpers.deserializeArray(data.breakpoints);
      context.setBreakpoints(breakpoints);
      watchpoints = helpers.deserializeArray(data.watchpoints);
      context.setWatchpoints(watchpoints);
      return context;
    };

    GlobalContext.prototype.addBreakpoint = function(breakpoint) {
      var data;
      helpers.insertOrdered(this.breakpoints, breakpoint);
      data = {
        added: [breakpoint]
      };
      return this.notifyBreakpointsChange(data);
    };

    GlobalContext.prototype.removeBreakpoint = function(breakpoint) {
      var data, removed;
      removed = helpers.arrayRemove(this.breakpoints, breakpoint);
      if (removed) {
        data = {
          removed: [removed]
        };
        this.notifyBreakpointsChange(data);
        return removed;
      }
    };

    GlobalContext.prototype.setBreakpoints = function(breakpoints) {
      var data, removed;
      removed = this.breakpoints;
      this.breakpoints = breakpoints;
      data = {
        added: breakpoints,
        removed: removed
      };
      return this.notifyBreakpointsChange(data);
    };

    GlobalContext.prototype.setWatchpoints = function(watchpoints) {
      var data;
      this.watchpoints = watchpoints;
      data = {
        added: watchpoints
      };
      return this.notifyWatchpointsChange();
    };

    GlobalContext.prototype.getBreakpoints = function() {
      return this.breakpoints;
    };

    GlobalContext.prototype.addDebugContext = function(debugContext) {
      return this.debugContexts.push(debugContext);
    };

    GlobalContext.prototype.getCurrentDebugContext = function() {
      return this.debugContexts[0];
    };

    GlobalContext.prototype.addWatchpoint = function(watchpoint) {
      helpers.insertOrdered(this.watchpoints, watchpoint);
      return this.notifyWatchpointsChange();
    };

    GlobalContext.prototype.getWatchpoints = function() {
      return this.watchpoints;
    };

    GlobalContext.prototype.setContext = function(context) {
      return this.context = context;
    };

    GlobalContext.prototype.getContext = function() {
      return this.context;
    };

    GlobalContext.prototype.clearContext = function() {};

    GlobalContext.prototype.onBreakpointsChange = function(callback) {
      return this.emitter.on('php-debug.breakpointsChange', callback);
    };

    GlobalContext.prototype.notifyBreakpointsChange = function(data) {
      return this.emitter.emit('php-debug.breakpointsChange', data);
    };

    GlobalContext.prototype.onWatchpointsChange = function(callback) {
      return this.emitter.on('php-debug.watchpointsChange', callback);
    };

    GlobalContext.prototype.notifyWatchpointsChange = function(data) {
      return this.emitter.emit('php-debug.watchpointsChange', data);
    };

    GlobalContext.prototype.onBreak = function(callback) {
      return this.emitter.on('php-debug.break', callback);
    };

    GlobalContext.prototype.notifyBreak = function(data) {
      return this.emitter.emit('php-debug.break', data);
    };

    GlobalContext.prototype.onContextUpdate = function(callback) {
      return this.emitter.on('php-debug.contextUpdate', callback);
    };

    GlobalContext.prototype.notifyContextUpdate = function(data) {
      return this.emitter.emit('php-debug.contextUpdate', data);
    };

    GlobalContext.prototype.onSessionEnd = function(callback) {
      return this.emitter.on('php-debug.sessionEnd', callback);
    };

    GlobalContext.prototype.notifySessionEnd = function(data) {
      return this.emitter.emit('php-debug.sessionEnd', data);
    };

    GlobalContext.prototype.onSessionStart = function(callback) {
      return this.emitter.on('php-debug.sessionStart', callback);
    };

    GlobalContext.prototype.notifySessionStart = function(data) {
      return this.emitter.emit('php-debug.sessionStart', data);
    };

    GlobalContext.prototype.onRunning = function(callback) {
      return this.emitter.on('php-debug.running', callback);
    };

    GlobalContext.prototype.notifyRunning = function(data) {
      return this.emitter.emit('php-debug.running', data);
    };

    return GlobalContext;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3BocC1kZWJ1Zy9saWIvbW9kZWxzL2dsb2JhbC1jb250ZXh0LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxpREFBQTtJQUFBLGtGQUFBOztBQUFBLEVBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxtQkFBUixDQUFWLENBQUE7O0FBQUEsRUFDQSxPQUF3QixPQUFBLENBQVEsV0FBUixDQUF4QixFQUFDLGVBQUEsT0FBRCxFQUFVLGtCQUFBLFVBRFYsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSixJQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBbkIsQ0FBdUIsYUFBdkIsQ0FBQSxDQUFBOztBQUVhLElBQUEsdUJBQUEsR0FBQTtBQUNYLDZFQUFBLENBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxPQUFELEdBQVcsR0FBQSxDQUFBLE9BQVgsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLFdBQUQsR0FBZSxFQURmLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxXQUFELEdBQWUsRUFGZixDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsYUFBRCxHQUFpQixFQUhqQixDQUFBO0FBQUEsTUFLQSxJQUFDLENBQUEsWUFBRCxDQUFjLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDWixVQUFBLE1BQUEsQ0FBQSxLQUFRLENBQUEsYUFBYyxDQUFBLENBQUEsQ0FBdEIsQ0FBQTtpQkFDQSxLQUFDLENBQUEsYUFBRCxHQUFpQixHQUZMO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBZCxDQUxBLENBRFc7SUFBQSxDQUZiOztBQUFBLDRCQVlBLFNBQUEsR0FBVyxTQUFBLEdBQUE7YUFBRztBQUFBLFFBQ1osWUFBQSxF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

//# sourceURL=/Users/muhammad/.atom/packages/php-debug/lib/models/global-context.coffee
