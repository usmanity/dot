(function() {
  var ConsoleHelper, ConsoleView;

  ConsoleView = require('../view/console-view');

  module.exports = ConsoleHelper = {
    consoleView: null,
    bottomPanel: null,
    isVisible: function() {
      var _ref;
      return (_ref = this.bottomPanel) != null ? _ref.isVisible() : void 0;
    },
    show: function() {
      if (this.bottomPanel === null) {
        this.consoleView = new ConsoleView();
        this.bottomPanel = atom.workspace.addBottomPanel({
          item: this.consoleView.element
        });
        return this.consoleView.close((function(_this) {
          return function() {
            return _this.hide();
          };
        })(this));
      } else {
        return this.bottomPanel.show();
      }
    },
    hide: function() {
      var _ref;
      return (_ref = this.bottomPanel) != null ? _ref.hide() : void 0;
    },
    log: function(msg) {
      var _ref;
      return (_ref = this.consoleView) != null ? _ref.log(msg) : void 0;
    },
    destory: function() {
      var _ref, _ref1;
      if ((_ref = this.consoleView) != null) {
        _ref.destory();
      }
      return (_ref1 = this.bottomPanel) != null ? _ref1.destory() : void 0;
    },
    serialize: function() {
      var _ref;
      return (_ref = this.consoleView) != null ? _ref.serialize() : void 0;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL2F0b20tc3luYy9saWIvaGVscGVyL2NvbnNvbGUtaGVscGVyLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwwQkFBQTs7QUFBQSxFQUFBLFdBQUEsR0FBYyxPQUFBLENBQVEsc0JBQVIsQ0FBZCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsYUFBQSxHQUNiO0FBQUEsSUFBQSxXQUFBLEVBQWEsSUFBYjtBQUFBLElBQ0EsV0FBQSxFQUFhLElBRGI7QUFBQSxJQUdBLFNBQUEsRUFBVyxTQUFBLEdBQUE7QUFDUCxVQUFBLElBQUE7QUFBQSxxREFBbUIsQ0FBRSxTQUFkLENBQUEsVUFBUCxDQURPO0lBQUEsQ0FIWDtBQUFBLElBTUEsSUFBQSxFQUFNLFNBQUEsR0FBQTtBQUNGLE1BQUEsSUFBRyxJQUFDLENBQUEsV0FBRCxLQUFnQixJQUFuQjtBQUNJLFFBQUEsSUFBQyxDQUFBLFdBQUQsR0FBbUIsSUFBQSxXQUFBLENBQUEsQ0FBbkIsQ0FBQTtBQUFBLFFBQ0EsSUFBQyxDQUFBLFdBQUQsR0FBZSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWYsQ0FBOEI7QUFBQSxVQUFBLElBQUEsRUFBTSxJQUFDLENBQUEsV0FBVyxDQUFDLE9BQW5CO1NBQTlCLENBRGYsQ0FBQTtlQUVBLElBQUMsQ0FBQSxXQUFXLENBQUMsS0FBYixDQUFtQixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTttQkFBRyxLQUFDLENBQUEsSUFBRCxDQUFBLEVBQUg7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFuQixFQUhKO09BQUEsTUFBQTtlQUtJLElBQUMsQ0FBQSxXQUFXLENBQUMsSUFBYixDQUFBLEVBTEo7T0FERTtJQUFBLENBTk47QUFBQSxJQWNBLElBQUEsRUFBTSxTQUFBLEdBQUE7QUFDRixVQUFBLElBQUE7cURBQVksQ0FBRSxJQUFkLENBQUEsV0FERTtJQUFBLENBZE47QUFBQSxJQWlCQSxHQUFBLEVBQUssU0FBQyxHQUFELEdBQUE7QUFDRCxVQUFBLElBQUE7cURBQVksQ0FBRSxHQUFkLENBQWtCLEdBQWxCLFdBREM7SUFBQSxDQWpCTDtBQUFBLElBb0JBLE9BQUEsRUFBUyxTQUFBLEdBQUE7QUFDTCxVQUFBLFdBQUE7O1lBQVksQ0FBRSxPQUFkLENBQUE7T0FBQTt1REFDWSxDQUFFLE9BQWQsQ0FBQSxXQUZLO0lBQUEsQ0FwQlQ7QUFBQSxJQXdCQSxTQUFBLEVBQVcsU0FBQSxHQUFBO0FBQ1AsVUFBQSxJQUFBO3FEQUFZLENBQUUsU0FBZCxDQUFBLFdBRE87SUFBQSxDQXhCWDtHQUhKLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/muhammad/.atom/packages/atom-sync/lib/helper/console-helper.coffee
