(function() {
  var BreakpointItemView, BreakpointListView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom-space-pen-views').View;

  BreakpointItemView = require('./breakpoint-item-view');

  module.exports = BreakpointListView = (function(_super) {
    __extends(BreakpointListView, _super);

    function BreakpointListView() {
      return BreakpointListView.__super__.constructor.apply(this, arguments);
    }

    BreakpointListView.content = function() {
      return BreakpointListView.ul({
        "class": "breakpoint-list-view"
      }, function() {
        return BreakpointListView.div({
          outlet: "breakpointItemList"
        });
      });
    };

    BreakpointListView.prototype.initialize = function(breakpoints) {
      this.breakpoints = breakpoints;
      return this.render();
    };

    BreakpointListView.prototype.render = function() {
      var breakpoint, _i, _len, _ref, _results;
      _ref = this.breakpoints;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        breakpoint = _ref[_i];
        _results.push(this.breakpointItemList.append(new BreakpointItemView(breakpoint)));
      }
      return _results;
    };

    return BreakpointListView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3BocC1kZWJ1Zy9saWIvYnJlYWtwb2ludC9icmVha3BvaW50LWxpc3Qtdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsNENBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFDLE9BQVEsT0FBQSxDQUFRLHNCQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBQ0Esa0JBQUEsR0FBcUIsT0FBQSxDQUFRLHdCQUFSLENBRHJCLENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRUoseUNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsa0JBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ04sa0JBQUMsQ0FBQSxFQUFELENBQUk7QUFBQSxRQUFBLE9BQUEsRUFBTyxzQkFBUDtPQUFKLEVBQW1DLFNBQUEsR0FBQTtlQUNqQyxrQkFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFVBQUEsTUFBQSxFQUFRLG9CQUFSO1NBQUwsRUFEaUM7TUFBQSxDQUFuQyxFQURNO0lBQUEsQ0FBVixDQUFBOztBQUFBLGlDQUlBLFVBQUEsR0FBWSxTQUFDLFdBQUQsR0FBQTtBQUNWLE1BQUEsSUFBQyxDQUFBLFdBQUQsR0FBZSxXQUFmLENBQUE7YUFDQSxJQUFDLENBQUEsTUFBRCxDQUFBLEVBRlU7SUFBQSxDQUpaLENBQUE7O0FBQUEsaUNBUUEsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNOLFVBQUEsb0NBQUE7QUFBQTtBQUFBO1dBQUEsMkNBQUE7OEJBQUE7QUFDRSxzQkFBQSxJQUFDLENBQUEsa0JBQWtCLENBQUMsTUFBcEIsQ0FBK0IsSUFBQSxrQkFBQSxDQUFtQixVQUFuQixDQUEvQixFQUFBLENBREY7QUFBQTtzQkFETTtJQUFBLENBUlIsQ0FBQTs7OEJBQUE7O0tBRitCLEtBSmpDLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/muhammad/.atom/packages/php-debug/lib/breakpoint/breakpoint-list-view.coffee
