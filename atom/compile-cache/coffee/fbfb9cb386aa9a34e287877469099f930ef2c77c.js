(function() {
  var DebugContext, helpers;

  helpers = require('../helpers.coffee');

  module.exports = DebugContext = (function() {
    function DebugContext() {
      this.scopeList = {};
      this.watchpointList = [];
      this.stackFrameList = [];
    }

    DebugContext.prototype.addScope = function(scopeId, name) {
      return this.scopeList[scopeId] = {
        name: name,
        scopeId: scopeId,
        context: {}
      };
    };

    DebugContext.prototype.setScopeContext = function(scopeId, context) {
      return this.scopeList[scopeId].context = context;
    };

    DebugContext.prototype.addWatchpoint = function(watchpoint) {
      var index;
      index = helpers.getInsertIndex(this.watchpointList, watchpoint);
      return this.watchpointList.push(watchpoint);
    };

    DebugContext.prototype.clearWatchpoints = function() {
      return this.watchpointList = [];
    };

    DebugContext.prototype.getWatchpoints = function() {
      return this.watchpointList;
    };

    DebugContext.prototype.setStack = function(stack) {
      return this.stackFrameList = stack;
    };

    DebugContext.prototype.getStack = function() {
      return this.stackFrameList;
    };

    DebugContext.prototype.clear = function() {
      return this.scopeList = {};
    };

    DebugContext.prototype.getScopes = function() {
      return this.scopeList;
    };

    return DebugContext;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3BocC1kZWJ1Zy9saWIvbW9kZWxzL2RlYnVnLWNvbnRleHQuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFCQUFBOztBQUFBLEVBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxtQkFBUixDQUFWLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUVNO0FBRVMsSUFBQSxzQkFBQSxHQUFBO0FBQ1gsTUFBQSxJQUFDLENBQUEsU0FBRCxHQUFhLEVBQWIsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLGNBQUQsR0FBa0IsRUFEbEIsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLGNBQUQsR0FBa0IsRUFGbEIsQ0FEVztJQUFBLENBQWI7O0FBQUEsMkJBS0EsUUFBQSxHQUFVLFNBQUMsT0FBRCxFQUFVLElBQVYsR0FBQTthQUNSLElBQUMsQ0FBQSxTQUFVLENBQUEsT0FBQSxDQUFYLEdBQXNCO0FBQUEsUUFBRSxJQUFBLEVBQU0sSUFBUjtBQUFBLFFBQWMsT0FBQSxFQUFTLE9BQXZCO0FBQUEsUUFBZ0MsT0FBQSxFQUFTLEVBQXpDO1FBRGQ7SUFBQSxDQUxWLENBQUE7O0FBQUEsMkJBUUEsZUFBQSxHQUFpQixTQUFDLE9BQUQsRUFBVSxPQUFWLEdBQUE7YUFDZixJQUFDLENBQUEsU0FBVSxDQUFBLE9BQUEsQ0FBUSxDQUFDLE9BQXBCLEdBQThCLFFBRGY7SUFBQSxDQVJqQixDQUFBOztBQUFBLDJCQVdBLGFBQUEsR0FBZSxTQUFDLFVBQUQsR0FBQTtBQUNiLFVBQUEsS0FBQTtBQUFBLE1BQUEsS0FBQSxHQUFRLE9BQU8sQ0FBQyxjQUFSLENBQXVCLElBQUMsQ0FBQSxjQUF4QixFQUF3QyxVQUF4QyxDQUFSLENBQUE7YUFDQSxJQUFDLENBQUEsY0FBYyxDQUFDLElBQWhCLENBQXFCLFVBQXJCLEVBRmE7SUFBQSxDQVhmLENBQUE7O0FBQUEsMkJBZUEsZ0JBQUEsR0FBa0IsU0FBQSxHQUFBO2FBQ2hCLElBQUMsQ0FBQSxjQUFELEdBQWtCLEdBREY7SUFBQSxDQWZsQixDQUFBOztBQUFBLDJCQWtCQSxjQUFBLEdBQWdCLFNBQUEsR0FBQTtBQUNkLGFBQU8sSUFBQyxDQUFBLGNBQVIsQ0FEYztJQUFBLENBbEJoQixDQUFBOztBQUFBLDJCQXFCQSxRQUFBLEdBQVUsU0FBQyxLQUFELEdBQUE7YUFDUixJQUFDLENBQUEsY0FBRCxHQUFrQixNQURWO0lBQUEsQ0FyQlYsQ0FBQTs7QUFBQSwyQkF3QkEsUUFBQSxHQUFVLFNBQUEsR0FBQTtBQUNSLGFBQU8sSUFBQyxDQUFBLGNBQVIsQ0FEUTtJQUFBLENBeEJWLENBQUE7O0FBQUEsMkJBMkJBLEtBQUEsR0FBTyxTQUFBLEdBQUE7YUFDTCxJQUFDLENBQUEsU0FBRCxHQUFhLEdBRFI7SUFBQSxDQTNCUCxDQUFBOztBQUFBLDJCQThCQSxTQUFBLEdBQVcsU0FBQSxHQUFBO0FBQ1QsYUFBTyxJQUFDLENBQUEsU0FBUixDQURTO0lBQUEsQ0E5QlgsQ0FBQTs7d0JBQUE7O01BTkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/muhammad/.atom/packages/php-debug/lib/models/debug-context.coffee
