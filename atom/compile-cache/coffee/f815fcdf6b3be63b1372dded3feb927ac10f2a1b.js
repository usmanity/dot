(function() {
  var ContextVariableListView, ContextVariableView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom-space-pen-views').View;

  ContextVariableView = require('./context-variable-view');

  module.exports = ContextVariableListView = (function(_super) {
    __extends(ContextVariableListView, _super);

    function ContextVariableListView() {
      return ContextVariableListView.__super__.constructor.apply(this, arguments);
    }

    ContextVariableListView.content = function(params) {
      return this.li({
        "class": "context-variable-list-view"
      }, (function(_this) {
        return function() {
          return _this.details(function() {
            _this.summary(function() {
              _this.span({
                "class": 'variable php'
              }, params.name);
              return _this.span({
                "class": 'type php'
              }, params.summary);
            });
            return _this.ul({
              outlet: "contextVariableList"
            });
          });
        };
      })(this));
    };

    ContextVariableListView.prototype.initialize = function(_arg) {
      this.variables = _arg.variables;
      return this.render();
    };

    ContextVariableListView.prototype.render = function() {
      var variable, _i, _len, _ref, _results;
      if (this.autoopen) {
        this.find('details').attr("open", "open");
      }
      if (this.variables) {
        _ref = this.variables;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          variable = _ref[_i];
          _results.push(this.contextVariableList.append(new ContextVariableView(variable)));
        }
        return _results;
      }
    };

    return ContextVariableListView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3BocC1kZWJ1Zy9saWIvY29udGV4dC9jb250ZXh0LXZhcmlhYmxlLWxpc3Qtdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsa0RBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFDLE9BQVEsT0FBQSxDQUFRLHNCQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBQ0EsbUJBQUEsR0FBc0IsT0FBQSxDQUFRLHlCQUFSLENBRHRCLENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRUosOENBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsdUJBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQyxNQUFELEdBQUE7YUFDUixJQUFDLENBQUEsRUFBRCxDQUFJO0FBQUEsUUFBQSxPQUFBLEVBQU8sNEJBQVA7T0FBSixFQUF5QyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUN2QyxLQUFDLENBQUEsT0FBRCxDQUFTLFNBQUEsR0FBQTtBQUNQLFlBQUEsS0FBQyxDQUFBLE9BQUQsQ0FBUyxTQUFBLEdBQUE7QUFDUCxjQUFBLEtBQUMsQ0FBQSxJQUFELENBQU07QUFBQSxnQkFBQSxPQUFBLEVBQU8sY0FBUDtlQUFOLEVBQTZCLE1BQU0sQ0FBQyxJQUFwQyxDQUFBLENBQUE7cUJBQ0EsS0FBQyxDQUFBLElBQUQsQ0FBTTtBQUFBLGdCQUFBLE9BQUEsRUFBTyxVQUFQO2VBQU4sRUFBeUIsTUFBTSxDQUFDLE9BQWhDLEVBRk87WUFBQSxDQUFULENBQUEsQ0FBQTttQkFHQSxLQUFDLENBQUEsRUFBRCxDQUFJO0FBQUEsY0FBQSxNQUFBLEVBQVEscUJBQVI7YUFBSixFQUpPO1VBQUEsQ0FBVCxFQUR1QztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXpDLEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsc0NBUUEsVUFBQSxHQUFZLFNBQUMsSUFBRCxHQUFBO0FBQ1YsTUFEWSxJQUFDLENBQUEsWUFBRixLQUFFLFNBQ2IsQ0FBQTthQUFBLElBQUMsQ0FBQSxNQUFELENBQUEsRUFEVTtJQUFBLENBUlosQ0FBQTs7QUFBQSxzQ0FXQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBQ04sVUFBQSxrQ0FBQTtBQUFBLE1BQUEsSUFBRyxJQUFDLENBQUEsUUFBSjtBQUNFLFFBQUEsSUFBQyxDQUFBLElBQUQsQ0FBTSxTQUFOLENBQWdCLENBQUMsSUFBakIsQ0FBc0IsTUFBdEIsRUFBOEIsTUFBOUIsQ0FBQSxDQURGO09BQUE7QUFFQSxNQUFBLElBQUcsSUFBQyxDQUFBLFNBQUo7QUFDRTtBQUFBO2FBQUEsMkNBQUE7OEJBQUE7QUFDRSx3QkFBQSxJQUFDLENBQUEsbUJBQW1CLENBQUMsTUFBckIsQ0FBZ0MsSUFBQSxtQkFBQSxDQUFvQixRQUFwQixDQUFoQyxFQUFBLENBREY7QUFBQTt3QkFERjtPQUhNO0lBQUEsQ0FYUixDQUFBOzttQ0FBQTs7S0FGb0MsS0FKdEMsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/muhammad/.atom/packages/php-debug/lib/context/context-variable-list-view.coffee
