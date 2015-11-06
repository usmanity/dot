(function() {
  var ContextVariableScalarView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom-space-pen-views').View;

  module.exports = ContextVariableScalarView = (function(_super) {
    __extends(ContextVariableScalarView, _super);

    function ContextVariableScalarView() {
      return ContextVariableScalarView.__super__.constructor.apply(this, arguments);
    }

    ContextVariableScalarView.content = function(params) {
      return ContextVariableScalarView.div(function() {
        ContextVariableScalarView.span({
          "class": 'variable php'
        }, params.label);
        return ContextVariableScalarView.span({
          "class": 'type php'
        }, params.value);
      });
    };

    return ContextVariableScalarView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3BocC1kZWJ1Zy9saWIvY29udGV4dC9jb250ZXh0LXZhcmlhYmxlLXNjYWxhci12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwrQkFBQTtJQUFBO21TQUFBOztBQUFBLEVBQUMsT0FBUSxPQUFBLENBQVEsc0JBQVIsRUFBUixJQUFELENBQUE7O0FBQUEsRUFDQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osZ0RBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEseUJBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQyxNQUFELEdBQUE7YUFDUix5QkFBQyxDQUFBLEdBQUQsQ0FBSyxTQUFBLEdBQUE7QUFDSCxRQUFBLHlCQUFDLENBQUEsSUFBRCxDQUFNO0FBQUEsVUFBQSxPQUFBLEVBQU8sY0FBUDtTQUFOLEVBQTZCLE1BQU0sQ0FBQyxLQUFwQyxDQUFBLENBQUE7ZUFDQSx5QkFBQyxDQUFBLElBQUQsQ0FBTTtBQUFBLFVBQUEsT0FBQSxFQUFPLFVBQVA7U0FBTixFQUF5QixNQUFNLENBQUMsS0FBaEMsRUFGRztNQUFBLENBQUwsRUFEUTtJQUFBLENBQVYsQ0FBQTs7cUNBQUE7O0tBRHNDLEtBRnhDLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/muhammad/.atom/packages/php-debug/lib/context/context-variable-scalar-view.coffee
