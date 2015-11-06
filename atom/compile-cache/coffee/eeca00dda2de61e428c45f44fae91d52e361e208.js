(function() {
  var ContextVariableView, View, WatchView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom-space-pen-views').View;

  ContextVariableView = require('../context/context-variable-view');

  module.exports = WatchView = (function(_super) {
    __extends(WatchView, _super);

    function WatchView() {
      return WatchView.__super__.constructor.apply(this, arguments);
    }

    WatchView.content = function() {
      return this.div({
        "class": 'native-key-bindings'
      }, (function(_this) {
        return function() {
          return _this.div({
            outlet: 'variable'
          });
        };
      })(this));
    };

    WatchView.prototype.initialize = function(watchpoint) {
      this.watchpoint = watchpoint;
      return this.render();
    };

    WatchView.prototype.render = function() {
      var datum;
      datum = this.watchpoint.getValue();
      if (datum == null) {
        datum = {
          label: this.watchpoint.getExpression(),
          type: 'uninitialized'
        };
      }
      return this.variable.append(new ContextVariableView(datum));
    };

    return WatchView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3BocC1kZWJ1Zy9saWIvd2F0Y2gvd2F0Y2gtdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsb0NBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFDLE9BQVEsT0FBQSxDQUFRLHNCQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBQ0EsbUJBQUEsR0FBc0IsT0FBQSxDQUFRLGtDQUFSLENBRHRCLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRUosZ0NBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsU0FBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8scUJBQVA7T0FBTCxFQUFtQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUNqQyxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxNQUFBLEVBQVEsVUFBUjtXQUFMLEVBRGlDO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbkMsRUFEUTtJQUFBLENBQVYsQ0FBQTs7QUFBQSx3QkFJQSxVQUFBLEdBQVksU0FBQyxVQUFELEdBQUE7QUFDVixNQUFBLElBQUMsQ0FBQSxVQUFELEdBQWMsVUFBZCxDQUFBO2FBQ0EsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQUZVO0lBQUEsQ0FKWixDQUFBOztBQUFBLHdCQVFBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDTixVQUFBLEtBQUE7QUFBQSxNQUFBLEtBQUEsR0FBUSxJQUFDLENBQUEsVUFBVSxDQUFDLFFBQVosQ0FBQSxDQUFSLENBQUE7QUFDQSxNQUFBLElBQU8sYUFBUDtBQUNFLFFBQUEsS0FBQSxHQUFRO0FBQUEsVUFDTixLQUFBLEVBQVEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxhQUFaLENBQUEsQ0FERjtBQUFBLFVBRU4sSUFBQSxFQUFNLGVBRkE7U0FBUixDQURGO09BREE7YUFNQSxJQUFDLENBQUEsUUFBUSxDQUFDLE1BQVYsQ0FBcUIsSUFBQSxtQkFBQSxDQUFvQixLQUFwQixDQUFyQixFQVBNO0lBQUEsQ0FSUixDQUFBOztxQkFBQTs7S0FGc0IsS0FIeEIsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/muhammad/.atom/packages/php-debug/lib/watch/watch-view.coffee
