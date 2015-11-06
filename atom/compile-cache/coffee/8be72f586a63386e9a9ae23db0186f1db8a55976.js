(function() {
  var $, ConsoleView, View, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom-space-pen-views'), $ = _ref.$, View = _ref.View;

  module.exports = ConsoleView = (function(_super) {
    __extends(ConsoleView, _super);

    function ConsoleView() {
      return ConsoleView.__super__.constructor.apply(this, arguments);
    }

    ConsoleView.content = function() {
      return this.div({
        "class": 'atom-sync'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'header'
          }, "Sync Console", function() {
            _this.div({
              "class": 'btn_close',
              title: 'Close'
            }, String.fromCharCode(0xf081));
            return _this.div({
              "class": 'btn_empty',
              title: 'Clear sync log'
            }, String.fromCharCode(0xf0d0));
          });
          return _this.div({
            "class": 'console inset-panel panel-bottom run-command native-key-bindings',
            tabindex: -1
          }, "Ready");
        };
      })(this));
    };

    ConsoleView.prototype.initialize = function() {
      return this.find('div.btn_empty').click((function(_this) {
        return function(e) {
          return _this.empty();
        };
      })(this));
    };

    ConsoleView.prototype.close = function(cb) {
      return this.find('div.btn_close').click((function(_this) {
        return function(e) {
          return cb();
        };
      })(this));
    };

    ConsoleView.prototype.log = function(msg) {
      var div;
      div = this.find('div.console');
      div.html(this.find('div.console').html() + "\n" + msg);
      if (div[0].scrollHeight > div.height()) {
        return div.scrollTop(div[0].scrollHeight - div.height());
      }
    };

    ConsoleView.prototype.empty = function() {
      return this.find('div.console').html('');
    };

    return ConsoleView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL2F0b20tc3luYy9saWIvdmlldy9jb25zb2xlLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDBCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUFZLE9BQUEsQ0FBUSxzQkFBUixDQUFaLEVBQUMsU0FBQSxDQUFELEVBQUksWUFBQSxJQUFKLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0Ysa0NBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsV0FBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDTixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sV0FBUDtPQUFMLEVBQXlCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDckIsVUFBQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8sUUFBUDtXQUFMLEVBQXNCLGNBQXRCLEVBQXNDLFNBQUEsR0FBQTtBQUNsQyxZQUFBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxjQUFBLE9BQUEsRUFBTyxXQUFQO0FBQUEsY0FBb0IsS0FBQSxFQUFPLE9BQTNCO2FBQUwsRUFBeUMsTUFBTSxDQUFDLFlBQVAsQ0FBb0IsTUFBcEIsQ0FBekMsQ0FBQSxDQUFBO21CQUNBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxjQUFBLE9BQUEsRUFBTyxXQUFQO0FBQUEsY0FBb0IsS0FBQSxFQUFPLGdCQUEzQjthQUFMLEVBQWtELE1BQU0sQ0FBQyxZQUFQLENBQW9CLE1BQXBCLENBQWxELEVBRmtDO1VBQUEsQ0FBdEMsQ0FBQSxDQUFBO2lCQUdBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxrRUFBUDtBQUFBLFlBQTJFLFFBQUEsRUFBVSxDQUFBLENBQXJGO1dBQUwsRUFBOEYsT0FBOUYsRUFKcUI7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF6QixFQURNO0lBQUEsQ0FBVixDQUFBOztBQUFBLDBCQU9BLFVBQUEsR0FBWSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsSUFBRCxDQUFNLGVBQU4sQ0FDSSxDQUFDLEtBREwsQ0FDVyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxDQUFELEdBQUE7aUJBQ0gsS0FBQyxDQUFBLEtBQUQsQ0FBQSxFQURHO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FEWCxFQURRO0lBQUEsQ0FQWixDQUFBOztBQUFBLDBCQVlBLEtBQUEsR0FBTyxTQUFDLEVBQUQsR0FBQTthQUNILElBQUMsQ0FBQSxJQUFELENBQU0sZUFBTixDQUNJLENBQUMsS0FETCxDQUNXLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLENBQUQsR0FBQTtpQkFDSCxFQUFBLENBQUEsRUFERztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRFgsRUFERztJQUFBLENBWlAsQ0FBQTs7QUFBQSwwQkFpQkEsR0FBQSxHQUFLLFNBQUMsR0FBRCxHQUFBO0FBQ0QsVUFBQSxHQUFBO0FBQUEsTUFBQSxHQUFBLEdBQU0sSUFBQyxDQUFBLElBQUQsQ0FBTSxhQUFOLENBQU4sQ0FBQTtBQUFBLE1BQ0EsR0FBRyxDQUFDLElBQUosQ0FBUyxJQUFDLENBQUEsSUFBRCxDQUFNLGFBQU4sQ0FBb0IsQ0FBQyxJQUFyQixDQUFBLENBQUEsR0FBOEIsSUFBOUIsR0FBcUMsR0FBOUMsQ0FEQSxDQUFBO0FBRUEsTUFBQSxJQUFHLEdBQUksQ0FBQSxDQUFBLENBQUUsQ0FBQyxZQUFQLEdBQXNCLEdBQUcsQ0FBQyxNQUFKLENBQUEsQ0FBekI7ZUFDSSxHQUFHLENBQUMsU0FBSixDQUFjLEdBQUksQ0FBQSxDQUFBLENBQUUsQ0FBQyxZQUFQLEdBQXNCLEdBQUcsQ0FBQyxNQUFKLENBQUEsQ0FBcEMsRUFESjtPQUhDO0lBQUEsQ0FqQkwsQ0FBQTs7QUFBQSwwQkF1QkEsS0FBQSxHQUFPLFNBQUEsR0FBQTthQUNILElBQUMsQ0FBQSxJQUFELENBQU0sYUFBTixDQUNJLENBQUMsSUFETCxDQUNVLEVBRFYsRUFERztJQUFBLENBdkJQLENBQUE7O3VCQUFBOztLQURzQixLQUgxQixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/muhammad/.atom/packages/atom-sync/lib/view/console-view.coffee
