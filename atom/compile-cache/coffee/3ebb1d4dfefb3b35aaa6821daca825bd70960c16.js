(function() {
  var ContextVariableScalarView, ContextVariableView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom-space-pen-views').View;

  ContextVariableScalarView = require("./context-variable-scalar-view");

  module.exports = ContextVariableView = (function(_super) {
    __extends(ContextVariableView, _super);

    function ContextVariableView() {
      return ContextVariableView.__super__.constructor.apply(this, arguments);
    }

    ContextVariableView.content = function() {
      return ContextVariableView.li({
        "class": 'native-key-bindings'
      }, function() {
        return ContextVariableView.div({
          "class": 'native-key-bindings',
          tabindex: -1,
          outlet: 'variableView'
        });
      });
    };

    ContextVariableView.prototype.initialize = function(variable) {
      this.variable = variable;
      return this.render();
    };

    ContextVariableView.prototype.renderScalar = function(_arg) {
      var label, value;
      label = _arg.label, value = _arg.value;
      return "<span class=\"variable php\">" + label + "</span><span class=\"type php\">" + value + "</span>";
    };

    ContextVariableView.prototype.render = function() {
      var ContextVariableListView, label, properties, summary;
      ContextVariableListView = require("./context-variable-list-view");
      label = this.variable.label;
      switch (this.variable.type) {
        case 'string':
          return this.variableView.append(this.renderScalar({
            label: label,
            value: "\"" + this.variable.value + "\""
          }));
        case 'numeric':
          return this.variableView.append(this.renderScalar({
            label: label,
            value: this.variable.value
          }));
        case 'bool':
          return this.variableView.append(this.renderScalar({
            label: label,
            value: this.variable.value
          }));
        case 'uninitialized':
          return this.variableView.append(this.renderScalar({
            label: label,
            value: "?"
          }));
        case 'null':
          return this.variableView.append(this.renderScalar({
            label: label,
            value: "null"
          }));
        case 'array':
          summary = "array[" + this.variable.length + "]";
          return this.variableView.append(new ContextVariableListView({
            name: label,
            summary: summary,
            variables: this.variable.value,
            autoopen: false
          }));
        case 'object':
          summary = "object";
          properties = this.variable.value;
          return this.variableView.append(new ContextVariableListView({
            name: label,
            summary: summary,
            variables: properties,
            autoopen: false
          }));
        default:
          return console.error("Unhandled variable type: " + this.variable.type);
      }
    };

    return ContextVariableView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3BocC1kZWJ1Zy9saWIvY29udGV4dC9jb250ZXh0LXZhcmlhYmxlLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG9EQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxzQkFBUixFQUFSLElBQUQsQ0FBQTs7QUFBQSxFQUNBLHlCQUFBLEdBQTRCLE9BQUEsQ0FBUSxnQ0FBUixDQUQ1QixDQUFBOztBQUFBLEVBSUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLDBDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLG1CQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLG1CQUFDLENBQUEsRUFBRCxDQUFJO0FBQUEsUUFBQSxPQUFBLEVBQU8scUJBQVA7T0FBSixFQUFrQyxTQUFBLEdBQUE7ZUFDaEMsbUJBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxVQUFBLE9BQUEsRUFBTyxxQkFBUDtBQUFBLFVBQThCLFFBQUEsRUFBVSxDQUFBLENBQXhDO0FBQUEsVUFBNEMsTUFBQSxFQUFRLGNBQXBEO1NBQUwsRUFEZ0M7TUFBQSxDQUFsQyxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLGtDQUlBLFVBQUEsR0FBWSxTQUFFLFFBQUYsR0FBQTtBQUNWLE1BRFcsSUFBQyxDQUFBLFdBQUEsUUFDWixDQUFBO2FBQUEsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQURVO0lBQUEsQ0FKWixDQUFBOztBQUFBLGtDQU9BLFlBQUEsR0FBYyxTQUFDLElBQUQsR0FBQTtBQUNaLFVBQUEsWUFBQTtBQUFBLE1BRGMsYUFBQSxPQUFNLGFBQUEsS0FDcEIsQ0FBQTthQUFDLCtCQUFBLEdBQStCLEtBQS9CLEdBQXFDLGtDQUFyQyxHQUF1RSxLQUF2RSxHQUE2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

//# sourceURL=/Users/muhammad/.atom/packages/php-debug/lib/context/context-variable-view.coffee
