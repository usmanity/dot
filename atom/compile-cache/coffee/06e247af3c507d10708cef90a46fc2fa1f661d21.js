(function() {
  var $, ContextView, Disposable, PhpDebugContextView, ScrollView, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Disposable = require('atom').Disposable;

  _ref = require('atom-space-pen-views'), $ = _ref.$, ScrollView = _ref.ScrollView;

  ContextView = require('./context-view');

  module.exports = PhpDebugContextView = (function(_super) {
    __extends(PhpDebugContextView, _super);

    function PhpDebugContextView() {
      this.showContexts = __bind(this.showContexts, this);
      return PhpDebugContextView.__super__.constructor.apply(this, arguments);
    }

    PhpDebugContextView.content = function() {
      return this.div({
        "class": 'php-debug php-debug-context-view pane-item native-key-bindings',
        style: "overflow:auto;",
        tabindex: -1
      }, (function(_this) {
        return function() {
          _this.div({
            "class": "panel-heading"
          }, "Context");
          return _this.div({
            outlet: 'contextViewList',
            "class": 'php-debug-contexts'
          });
        };
      })(this));
    };

    PhpDebugContextView.prototype.serialize = function() {
      return {
        deserializer: this.constructor.name,
        uri: this.getURI()
      };
    };

    PhpDebugContextView.prototype.getURI = function() {
      return this.uri;
    };

    PhpDebugContextView.prototype.getTitle = function() {
      return "Context";
    };

    PhpDebugContextView.prototype.initialize = function(params) {
      PhpDebugContextView.__super__.initialize.apply(this, arguments);
      this.GlobalContext = params.context;
      return this.GlobalContext.onContextUpdate(this.showContexts);
    };

    PhpDebugContextView.prototype.onDidChangeTitle = function() {
      return new Disposable(function() {});
    };

    PhpDebugContextView.prototype.onDidChangeModified = function() {
      return new Disposable(function() {});
    };

    PhpDebugContextView.prototype.isEqual = function(other) {
      return other instanceof PhpDebugContextView;
    };

    PhpDebugContextView.prototype.showContexts = function() {
      var context, contexts, index, _ref1, _results;
      if (this.contextViewList) {
        this.contextViewList.empty();
      }
      contexts = this.GlobalContext.getCurrentDebugContext();
      _ref1 = contexts.scopeList;
      _results = [];
      for (index in _ref1) {
        context = _ref1[index];
        if (context === void 0) {
          continue;
        }
        _results.push(this.contextViewList.append(new ContextView(context)));
      }
      return _results;
    };

    return PhpDebugContextView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3BocC1kZWJ1Zy9saWIvY29udGV4dC9waHAtZGVidWctY29udGV4dC12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxpRUFBQTtJQUFBOzttU0FBQTs7QUFBQSxFQUFDLGFBQWMsT0FBQSxDQUFRLE1BQVIsRUFBZCxVQUFELENBQUE7O0FBQUEsRUFDQSxPQUFrQixPQUFBLENBQVEsc0JBQVIsQ0FBbEIsRUFBQyxTQUFBLENBQUQsRUFBSSxrQkFBQSxVQURKLENBQUE7O0FBQUEsRUFFQSxXQUFBLEdBQWMsT0FBQSxDQUFRLGdCQUFSLENBRmQsQ0FBQTs7QUFBQSxFQUlBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSiwwQ0FBQSxDQUFBOzs7OztLQUFBOztBQUFBLElBQUEsbUJBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLGdFQUFQO0FBQUEsUUFBeUUsS0FBQSxFQUFPLGdCQUFoRjtBQUFBLFFBQWtHLFFBQUEsRUFBVSxDQUFBLENBQTVHO09BQUwsRUFBcUgsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUNuSCxVQUFBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxlQUFQO1dBQUwsRUFBNkIsU0FBN0IsQ0FBQSxDQUFBO2lCQUNBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE1BQUEsRUFBUSxpQkFBUjtBQUFBLFlBQTJCLE9BQUEsRUFBTSxvQkFBakM7V0FBTCxFQUZtSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXJILEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsa0NBS0EsU0FBQSxHQUFXLFNBQUEsR0FBQTthQUNUO0FBQUEsUUFBQSxZQUFBLEVBQWMsSUFBQyxDQUFBLFdBQVcsQ0FBQyxJQUEzQjtBQUFBLFFBQ0EsR0FBQSxFQUFLLElBQUMsQ0FBQSxNQUFELENBQUEsQ0FETDtRQURTO0lBQUEsQ0FMWCxDQUFBOztBQUFBLGtDQVNBLE1BQUEsR0FBUSxTQUFBLEdBQUE7YUFBRyxJQUFDLENBQUEsSUFBSjtJQUFBLENBVFIsQ0FBQTs7QUFBQSxrQ0FXQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2FBQUcsVUFBSDtJQUFBLENBWFYsQ0FBQTs7QUFBQSxrQ0FhQSxVQUFBLEdBQVksU0FBQyxNQUFELEdBQUE7QUFDVixNQUFBLHFEQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsYUFBRCxHQUFpQixNQUFNLENBQUMsT0FEeEIsQ0FBQTthQUVBLElBQUMsQ0FBQSxhQUFhLENBQUMsZUFBZixDQUErQixJQUFDLENBQUEsWUFBaEMsRUFIVTtJQUFBLENBYlosQ0FBQTs7QUFBQSxrQ0FrQkEsZ0JBQUEsR0FBa0IsU0FBQSxHQUFBO2FBQU8sSUFBQSxVQUFBLENBQVcsU0FBQSxHQUFBLENBQVgsRUFBUDtJQUFBLENBbEJsQixDQUFBOztBQUFBLGtDQW1CQSxtQkFBQSxHQUFxQixTQUFBLEdBQUE7YUFBTyxJQUFBLFVBQUEsQ0FBVyxTQUFBLEdBQUEsQ0FBWCxFQUFQO0lBQUEsQ0FuQnJCLENBQUE7O0FBQUEsa0NBcUJBLE9BQUEsR0FBUyxTQUFDLEtBQUQsR0FBQTthQUNQLEtBQUEsWUFBaUIsb0JBRFY7SUFBQSxDQXJCVCxDQUFBOztBQUFBLGtDQXdCQSxZQUFBLEdBQWMsU0FBQSxHQUFBO0FBQ1osVUFBQSx5Q0FBQTtBQUFBLE1BQUEsSUFBRyxJQUFDLENBQUEsZUFBSjtBQUNFLFFBQUEsSUFBQyxDQUFBLGVBQWUsQ0FBQyxLQUFqQixDQUFBLENBQUEsQ0FERjtPQUFBO0FBQUEsTUFFQSxRQUFBLEdBQVcsSUFBQyxDQUFBLGFBQWEsQ0FBQyxzQkFBZixDQUFBLENBRlgsQ0FBQTtBQUdBO0FBQUE7V0FBQSxjQUFBOytCQUFBO0FBQ0UsUUFBQSxJQUFHLE9BQUEsS0FBVyxNQUFkO0FBQ0UsbUJBREY7U0FBQTtBQUFBLHNCQUVBLElBQUMsQ0FBQSxlQUFlLENBQUMsTUFBakIsQ0FBNEIsSUFBQSxXQUFBLENBQVksT0FBWixDQUE1QixFQUZBLENBREY7QUFBQTtzQkFKWTtJQUFBLENBeEJkLENBQUE7OytCQUFBOztLQURnQyxXQUxsQyxDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/muhammad/.atom/packages/php-debug/lib/context/php-debug-context-view.coffee
