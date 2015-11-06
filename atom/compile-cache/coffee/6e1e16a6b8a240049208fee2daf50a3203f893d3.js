(function() {
  var ContextVariableListView, ContextView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom-space-pen-views').View;

  ContextVariableListView = require('./context-variable-list-view');

  module.exports = ContextView = (function(_super) {
    __extends(ContextView, _super);

    function ContextView() {
      return ContextView.__super__.constructor.apply(this, arguments);
    }

    ContextView.content = function() {
      return ContextView.div(function() {
        return ContextView.span({
          outlet: 'contextListView'
        });
      });
    };

    ContextView.prototype.initialize = function(context) {
      this.context = context;
      return this.render();
    };

    ContextView.prototype.render = function() {
      if (this.context.context) {
        return this.contextListView.append(new ContextVariableListView({
          name: this.context.name,
          summary: null,
          variables: this.context.context.variables,
          autoopen: true
        }));
      }
    };

    return ContextView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3BocC1kZWJ1Zy9saWIvY29udGV4dC9jb250ZXh0LXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDBDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxzQkFBUixFQUFSLElBQUQsQ0FBQTs7QUFBQSxFQUNBLHVCQUFBLEdBQTBCLE9BQUEsQ0FBUSw4QkFBUixDQUQxQixDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUVKLGtDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLFdBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsV0FBQyxDQUFBLEdBQUQsQ0FBSyxTQUFBLEdBQUE7ZUFDSCxXQUFDLENBQUEsSUFBRCxDQUFNO0FBQUEsVUFBQSxNQUFBLEVBQVEsaUJBQVI7U0FBTixFQURHO01BQUEsQ0FBTCxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLDBCQUlBLFVBQUEsR0FBWSxTQUFFLE9BQUYsR0FBQTtBQUNWLE1BRFcsSUFBQyxDQUFBLFVBQUEsT0FDWixDQUFBO2FBQUEsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQURVO0lBQUEsQ0FKWixDQUFBOztBQUFBLDBCQU9BLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDTixNQUFBLElBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxPQUFaO2VBQ0UsSUFBQyxDQUFBLGVBQWUsQ0FBQyxNQUFqQixDQUE0QixJQUFBLHVCQUFBLENBQXlCO0FBQUEsVUFBQyxJQUFBLEVBQU0sSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFoQjtBQUFBLFVBQXNCLE9BQUEsRUFBUyxJQUEvQjtBQUFBLFVBQXFDLFNBQUEsRUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFqRTtBQUFBLFVBQTRFLFFBQUEsRUFBVSxJQUF0RjtTQUF6QixDQUE1QixFQURGO09BRE07SUFBQSxDQVBSLENBQUE7O3VCQUFBOztLQUZ3QixLQUoxQixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/muhammad/.atom/packages/php-debug/lib/context/context-view.coffee
