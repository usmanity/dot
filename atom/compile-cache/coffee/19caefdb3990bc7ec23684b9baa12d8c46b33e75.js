(function() {
  var $, Disposable, PhpDebugBreakpointView, PhpDebugContextView, PhpDebugStackView, PhpDebugUnifiedView, PhpDebugWatchView, ScrollView, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Disposable = require('atom').Disposable;

  _ref = require('atom-space-pen-views'), $ = _ref.$, ScrollView = _ref.ScrollView;

  PhpDebugContextView = require('../context/php-debug-context-view');

  PhpDebugStackView = require('../stack/php-debug-stack-view');

  PhpDebugWatchView = require('../watch/php-debug-watch-view');

  PhpDebugBreakpointView = require('../breakpoint/php-debug-breakpoint-view');

  module.exports = PhpDebugUnifiedView = (function(_super) {
    __extends(PhpDebugUnifiedView, _super);

    PhpDebugUnifiedView.content = function() {
      return this.div({
        "class": 'php-debug php-debug-unified-view pane-item padded',
        style: 'overflow:auto;',
        tabindex: -1
      }, (function(_this) {
        return function() {
          _this.div({
            "class": "block"
          }, function() {
            _this.button({
              "class": "btn octicon icon-playback-play inline-block-tight",
              disabled: 'disabled',
              'data-action': 'continue'
            }, "Continue");
            _this.button({
              "class": "btn octicon icon-steps inline-block-tight",
              disabled: 'disabled',
              'data-action': 'step'
            }, "Step Over");
            _this.button({
              "class": "btn octicon icon-sign-in inline-block-tight",
              disabled: 'disabled',
              'data-action': 'in'
            }, "Step In");
            _this.button({
              "class": "btn octicon icon-sign-out inline-block-tight",
              disabled: 'disabled',
              'data-action': 'out'
            }, "Step Out");
            return _this.button({
              "class": "btn octicon icon-primitive-square inline-block-tight",
              disabled: 'disabled',
              'data-action': 'stop'
            }, "Stop");
          });
          return _this.div({
            "class": 'tabs-view'
          }, function() {
            _this.div({
              outlet: 'stackView',
              "class": 'php-debug-tab'
            });
            _this.div({
              outlet: 'contextView',
              "class": 'php-debug-tab'
            });
            _this.div({
              outlet: 'watchpointView',
              "class": 'php-debug-tab'
            });
            return _this.div({
              outlet: 'breakpointView',
              "class": 'php-debug-tab'
            });
          });
        };
      })(this));
    };

    function PhpDebugUnifiedView(params) {
      this.destroy = __bind(this.destroy, this);
      this.initialize = __bind(this.initialize, this);
      PhpDebugUnifiedView.__super__.constructor.apply(this, arguments);
      this.GlobalContext = params.context;
      this.contextList = [];
      this.GlobalContext.onBreak((function(_this) {
        return function() {
          return _this.find('button').enable();
        };
      })(this));
      this.GlobalContext.onRunning((function(_this) {
        return function() {
          return _this.find('button').disable();
        };
      })(this));
      this.GlobalContext.onSessionEnd((function(_this) {
        return function() {
          return _this.find('button').disable();
        };
      })(this));
    }

    PhpDebugUnifiedView.prototype.serialize = function() {
      return {
        deserializer: this.constructor.name,
        uri: this.getURI()
      };
    };

    PhpDebugUnifiedView.prototype.getURI = function() {
      return this.uri;
    };

    PhpDebugUnifiedView.prototype.getTitle = function() {
      return "Debugging";
    };

    PhpDebugUnifiedView.prototype.initialize = function(params) {
      PhpDebugUnifiedView.__super__.initialize.apply(this, arguments);
      this.stackView.append(new PhpDebugStackView({
        context: params.context
      }));
      this.contextView.append(new PhpDebugContextView({
        context: params.context
      }));
      this.watchpointView.append(new PhpDebugWatchView({
        context: params.context
      }));
      this.breakpointView.append(new PhpDebugBreakpointView({
        context: params.context
      }));
      return this.on('click', '[data-action]', (function(_this) {
        return function(e) {
          var action;
          action = e.target.getAttribute('data-action');
          switch (action) {
            case 'continue':
              return _this.GlobalContext.getCurrentDebugContext()["continue"]("run");
            case 'step':
              return _this.GlobalContext.getCurrentDebugContext()["continue"]("step_over");
            case 'in':
              return _this.GlobalContext.getCurrentDebugContext()["continue"]("step_into");
            case 'out':
              return _this.GlobalContext.getCurrentDebugContext()["continue"]("step_out");
            case 'stop':
              return _this.GlobalContext.getCurrentDebugContext().executeDetach();
            default:
              console.error("unknown action");
              console.dir(action);
              return console.dir(_this);
          }
        };
      })(this));
    };

    PhpDebugUnifiedView.prototype.openWindow = function() {
      return atom.workspace.addBottomPanel({
        item: this,
        visible: true
      });
    };

    PhpDebugUnifiedView.prototype.onDidChangeTitle = function() {
      return new Disposable(function() {});
    };

    PhpDebugUnifiedView.prototype.onDidChangeModified = function() {
      return new Disposable(function() {});
    };

    PhpDebugUnifiedView.prototype.destroy = function() {
      if (this.GlobalContext.getCurrentDebugContext()) {
        return this.GlobalContext.getCurrentDebugContext().executeDetach();
      }
    };

    PhpDebugUnifiedView.prototype.isEqual = function(other) {
      return other instanceof PhpDebugUnifiedView;
    };

    return PhpDebugUnifiedView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3BocC1kZWJ1Zy9saWIvdW5pZmllZC9waHAtZGVidWctdW5pZmllZC12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSx1SUFBQTtJQUFBOzttU0FBQTs7QUFBQSxFQUFDLGFBQWMsT0FBQSxDQUFRLE1BQVIsRUFBZCxVQUFELENBQUE7O0FBQUEsRUFDQSxPQUFrQixPQUFBLENBQVEsc0JBQVIsQ0FBbEIsRUFBQyxTQUFBLENBQUQsRUFBSSxrQkFBQSxVQURKLENBQUE7O0FBQUEsRUFFQSxtQkFBQSxHQUFzQixPQUFBLENBQVEsbUNBQVIsQ0FGdEIsQ0FBQTs7QUFBQSxFQUdBLGlCQUFBLEdBQW9CLE9BQUEsQ0FBUSwrQkFBUixDQUhwQixDQUFBOztBQUFBLEVBSUEsaUJBQUEsR0FBb0IsT0FBQSxDQUFRLCtCQUFSLENBSnBCLENBQUE7O0FBQUEsRUFLQSxzQkFBQSxHQUF5QixPQUFBLENBQVEseUNBQVIsQ0FMekIsQ0FBQTs7QUFBQSxFQU1BLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSiwwQ0FBQSxDQUFBOztBQUFBLElBQUEsbUJBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLG1EQUFQO0FBQUEsUUFBNEQsS0FBQSxFQUFPLGdCQUFuRTtBQUFBLFFBQXFGLFFBQUEsRUFBVSxDQUFBLENBQS9GO09BQUwsRUFBd0csQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUN0RyxVQUFBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxPQUFQO1dBQUwsRUFBcUIsU0FBQSxHQUFBO0FBQ25CLFlBQUEsS0FBQyxDQUFBLE1BQUQsQ0FBUTtB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

//# sourceURL=/Users/muhammad/.atom/packages/php-debug/lib/unified/php-debug-unified-view.coffee
