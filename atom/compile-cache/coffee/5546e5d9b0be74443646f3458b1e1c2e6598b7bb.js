(function() {
  var BreakpointListView, BreakpointView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom-space-pen-views').View;

  BreakpointListView = require('./breakpoint-list-view');

  module.exports = BreakpointView = (function(_super) {
    __extends(BreakpointView, _super);

    function BreakpointView() {
      return BreakpointView.__super__.constructor.apply(this, arguments);
    }

    BreakpointView.content = function() {
      return BreakpointView.div(function() {
        return BreakpointView.div({
          outlet: 'breakpointListView'
        });
      });
    };

    BreakpointView.prototype.initialize = function(breakpoints) {
      this.breakpoints = breakpoints;
      return this.render();
    };

    BreakpointView.prototype.render = function() {
      return this.breakpointListView.append(new BreakpointListView(this.breakpoints));
    };

    return BreakpointView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3BocC1kZWJ1Zy9saWIvYnJlYWtwb2ludC9icmVha3BvaW50LXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxzQkFBUixFQUFSLElBQUQsQ0FBQTs7QUFBQSxFQUNBLGtCQUFBLEdBQXFCLE9BQUEsQ0FBUSx3QkFBUixDQURyQixDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUVKLHFDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLGNBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsY0FBQyxDQUFBLEdBQUQsQ0FBSyxTQUFBLEdBQUE7ZUFDSCxjQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsVUFBQSxNQUFBLEVBQVEsb0JBQVI7U0FBTCxFQURHO01BQUEsQ0FBTCxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLDZCQUlBLFVBQUEsR0FBWSxTQUFDLFdBQUQsR0FBQTtBQUNWLE1BQUEsSUFBQyxDQUFBLFdBQUQsR0FBZSxXQUFmLENBQUE7YUFDQSxJQUFDLENBQUEsTUFBRCxDQUFBLEVBRlU7SUFBQSxDQUpaLENBQUE7O0FBQUEsNkJBUUEsTUFBQSxHQUFRLFNBQUEsR0FBQTthQUNOLElBQUMsQ0FBQSxrQkFBa0IsQ0FBQyxNQUFwQixDQUErQixJQUFBLGtCQUFBLENBQW1CLElBQUMsQ0FBQSxXQUFwQixDQUEvQixFQURNO0lBQUEsQ0FSUixDQUFBOzswQkFBQTs7S0FGMkIsS0FKN0IsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/muhammad/.atom/packages/php-debug/lib/breakpoint/breakpoint-view.coffee
