(function() {
  var $, GlobalContext, PhpDebugStackView, ScrollView, StackFrameView, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom-space-pen-views'), $ = _ref.$, ScrollView = _ref.ScrollView;

  StackFrameView = require('./stack-frame-view');

  GlobalContext = require('../models/global-context');

  module.exports = PhpDebugStackView = (function(_super) {
    __extends(PhpDebugStackView, _super);

    function PhpDebugStackView() {
      this.showStackFrames = __bind(this.showStackFrames, this);
      return PhpDebugStackView.__super__.constructor.apply(this, arguments);
    }

    PhpDebugStackView.content = function() {
      return this.div({
        "class": 'php-debug php-debug-context-view pane-item native-key-bindings',
        style: "overflow:auto;",
        tabindex: -1
      }, (function(_this) {
        return function() {
          _this.div({
            "class": "panel-heading"
          }, "Stack");
          return _this.ul({
            outlet: 'stackFrameViewList',
            "class": 'php-debug-contexts'
          });
        };
      })(this));
    };

    PhpDebugStackView.prototype.initialize = function(params) {
      PhpDebugStackView.__super__.initialize.apply(this, arguments);
      this.GlobalContext = params.context;
      return this.GlobalContext.onContextUpdate(this.showStackFrames);
    };

    PhpDebugStackView.prototype.showStackFrames = function() {
      var context, index, stackFrame, _ref1, _results;
      if (this.stackFrameViewList) {
        this.stackFrameViewList.empty();
      }
      context = this.GlobalContext.getCurrentDebugContext();
      _ref1 = context.getStack();
      _results = [];
      for (index in _ref1) {
        stackFrame = _ref1[index];
        if (stackFrame === void 0) {
          continue;
        }
        _results.push(this.stackFrameViewList.append(new StackFrameView(stackFrame)));
      }
      return _results;
    };

    return PhpDebugStackView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3BocC1kZWJ1Zy9saWIvc3RhY2svcGhwLWRlYnVnLXN0YWNrLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFFQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsT0FBa0IsT0FBQSxDQUFRLHNCQUFSLENBQWxCLEVBQUMsU0FBQSxDQUFELEVBQUksa0JBQUEsVUFBSixDQUFBOztBQUFBLEVBRUEsY0FBQSxHQUFpQixPQUFBLENBQVEsb0JBQVIsQ0FGakIsQ0FBQTs7QUFBQSxFQUdBLGFBQUEsR0FBZ0IsT0FBQSxDQUFRLDBCQUFSLENBSGhCLENBQUE7O0FBQUEsRUFLQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osd0NBQUEsQ0FBQTs7Ozs7S0FBQTs7QUFBQSxJQUFBLGlCQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyxnRUFBUDtBQUFBLFFBQXlFLEtBQUEsRUFBTyxnQkFBaEY7QUFBQSxRQUFrRyxRQUFBLEVBQVUsQ0FBQSxDQUE1RztPQUFMLEVBQXFILENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDbkgsVUFBQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8sZUFBUDtXQUFMLEVBQTZCLE9BQTdCLENBQUEsQ0FBQTtpQkFDQSxLQUFDLENBQUEsRUFBRCxDQUFJO0FBQUEsWUFBQSxNQUFBLEVBQVEsb0JBQVI7QUFBQSxZQUE4QixPQUFBLEVBQU0sb0JBQXBDO1dBQUosRUFGbUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFySCxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLGdDQUtBLFVBQUEsR0FBWSxTQUFDLE1BQUQsR0FBQTtBQUNWLE1BQUEsbURBQUEsU0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxhQUFELEdBQWlCLE1BQU0sQ0FBQyxPQUR4QixDQUFBO2FBRUEsSUFBQyxDQUFBLGFBQWEsQ0FBQyxlQUFmLENBQStCLElBQUMsQ0FBQSxlQUFoQyxFQUhVO0lBQUEsQ0FMWixDQUFBOztBQUFBLGdDQVVBLGVBQUEsR0FBaUIsU0FBQSxHQUFBO0FBQ2YsVUFBQSwyQ0FBQTtBQUFBLE1BQUEsSUFBRyxJQUFDLENBQUEsa0JBQUo7QUFDRSxRQUFBLElBQUMsQ0FBQSxrQkFBa0IsQ0FBQyxLQUFwQixDQUFBLENBQUEsQ0FERjtPQUFBO0FBQUEsTUFFQSxPQUFBLEdBQVUsSUFBQyxDQUFBLGFBQWEsQ0FBQyxzQkFBZixDQUFBLENBRlYsQ0FBQTtBQUdBO0FBQUE7V0FBQSxjQUFBO2tDQUFBO0FBQ0UsUUFBQSxJQUFHLFVBQUEsS0FBYyxNQUFqQjtBQUNFLG1CQURGO1NBQUE7QUFBQSxzQkFFQSxJQUFDLENBQUEsa0JBQWtCLENBQUMsTUFBcEIsQ0FBK0IsSUFBQSxjQUFBLENBQWUsVUFBZixDQUEvQixFQUZBLENBREY7QUFBQTtzQkFKZTtJQUFBLENBVmpCLENBQUE7OzZCQUFBOztLQUQ4QixXQU5oQyxDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/muhammad/.atom/packages/php-debug/lib/stack/php-debug-stack-view.coffee
