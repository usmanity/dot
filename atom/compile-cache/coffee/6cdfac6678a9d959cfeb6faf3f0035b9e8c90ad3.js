(function() {
  var BreakpointItemView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom-space-pen-views').View;

  module.exports = BreakpointItemView = (function(_super) {
    __extends(BreakpointItemView, _super);

    function BreakpointItemView() {
      return BreakpointItemView.__super__.constructor.apply(this, arguments);
    }

    BreakpointItemView.content = function() {
      return BreakpointItemView.li({
        "class": 'meow'
      }, function() {
        return BreakpointItemView.div({
          "class": 'meow'
        }, function() {
          BreakpointItemView.span({
            outlet: 'path'
          });
          return BreakpointItemView.span({
            outlet: 'line'
          });
        });
      });
    };

    BreakpointItemView.prototype.initialize = function(breakpoint) {
      this.breakpoint = breakpoint;
      return this.render();
    };

    BreakpointItemView.prototype.render = function() {
      this.path.append(this.breakpoint.getPath());
      return this.line.append(this.breakpoint.getLine());
    };

    return BreakpointItemView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3BocC1kZWJ1Zy9saWIvYnJlYWtwb2ludC9icmVha3BvaW50LWl0ZW0tdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsd0JBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFDLE9BQVEsT0FBQSxDQUFRLHNCQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLHlDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLGtCQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLGtCQUFDLENBQUEsRUFBRCxDQUFJO0FBQUEsUUFBQSxPQUFBLEVBQU8sTUFBUDtPQUFKLEVBQW1CLFNBQUEsR0FBQTtlQUNqQixrQkFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFVBQUEsT0FBQSxFQUFPLE1BQVA7U0FBTCxFQUFvQixTQUFBLEdBQUE7QUFDbEIsVUFBQSxrQkFBQyxDQUFBLElBQUQsQ0FBTTtBQUFBLFlBQUEsTUFBQSxFQUFRLE1BQVI7V0FBTixDQUFBLENBQUE7aUJBQ0Esa0JBQUMsQ0FBQSxJQUFELENBQU07QUFBQSxZQUFBLE1BQUEsRUFBUSxNQUFSO1dBQU4sRUFGa0I7UUFBQSxDQUFwQixFQURpQjtNQUFBLENBQW5CLEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsaUNBTUEsVUFBQSxHQUFZLFNBQUMsVUFBRCxHQUFBO0FBQ1YsTUFBQSxJQUFDLENBQUEsVUFBRCxHQUFjLFVBQWQsQ0FBQTthQUNBLElBQUMsQ0FBQSxNQUFELENBQUEsRUFGVTtJQUFBLENBTlosQ0FBQTs7QUFBQSxpQ0FVQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBQ04sTUFBQSxJQUFDLENBQUEsSUFBSSxDQUFDLE1BQU4sQ0FBYSxJQUFDLENBQUEsVUFBVSxDQUFDLE9BQVosQ0FBQSxDQUFiLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTixDQUFhLElBQUMsQ0FBQSxVQUFVLENBQUMsT0FBWixDQUFBLENBQWIsRUFGTTtJQUFBLENBVlIsQ0FBQTs7OEJBQUE7O0tBRCtCLEtBSGpDLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/muhammad/.atom/packages/php-debug/lib/breakpoint/breakpoint-item-view.coffee
