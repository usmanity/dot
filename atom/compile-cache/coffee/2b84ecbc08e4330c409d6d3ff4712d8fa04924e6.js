(function() {
  var $, Disposable, Emitter, GlobalContext, PhpDebugWatchView, ScrollView, TextEditorView, View, WatchView, Watchpoint, _ref, _ref1, _ref2,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Disposable = require('atom').Disposable;

  _ref = require('atom-space-pen-views'), $ = _ref.$, ScrollView = _ref.ScrollView;

  _ref1 = require('atom-space-pen-views'), $ = _ref1.$, TextEditorView = _ref1.TextEditorView, View = _ref1.View;

  _ref2 = require('event-kit'), Emitter = _ref2.Emitter, Disposable = _ref2.Disposable;

  WatchView = require('./watch-view');

  GlobalContext = require('../models/global-context');

  Watchpoint = require('../models/watchpoint');

  module.exports = PhpDebugWatchView = (function(_super) {
    __extends(PhpDebugWatchView, _super);

    PhpDebugWatchView.content = function() {
      return this.div({
        "class": "panel"
      }, (function(_this) {
        return function() {
          _this.div({
            "class": "panel-heading"
          }, "Watchpoints");
          return _this.section({
            "class": 'watchpoint-panel section'
          }, function() {
            _this.div({
              "class": 'editor-container'
            }, function() {
              return _this.subview('newWatchpointEditor', new TextEditorView());
            });
            return _this.div({
              outlet: 'watchpointViewList',
              "class": 'php-debug-watchpoints'
            });
          });
        };
      })(this));
    };

    function PhpDebugWatchView() {
      this.showWatches = __bind(this.showWatches, this);
      this.submitWatchpoint = __bind(this.submitWatchpoint, this);
      PhpDebugWatchView.__super__.constructor.apply(this, arguments);
    }

    PhpDebugWatchView.prototype.serialize = function() {
      return {
        deserializer: this.constructor.name,
        uri: this.getURI()
      };
    };

    PhpDebugWatchView.prototype.getURI = function() {
      return this.uri;
    };

    PhpDebugWatchView.prototype.getTitle = function() {
      return "Watch";
    };

    PhpDebugWatchView.prototype.onDidChangeTitle = function() {
      return new Disposable(function() {});
    };

    PhpDebugWatchView.prototype.onDidChangeModified = function() {
      return new Disposable(function() {});
    };

    PhpDebugWatchView.prototype.initialize = function(params) {
      this.GlobalContext = params.context;
      this.newWatchpointEditor.getModel().onWillInsertText(this.submitWatchpoint);
      this.GlobalContext.onContextUpdate(this.showWatches);
      this.GlobalContext.onWatchpointsChange(this.showWatches);
      return this.showWatches();
    };

    PhpDebugWatchView.prototype.submitWatchpoint = function(event) {
      var expression, w;
      if (event.text !== "\n") {
        return;
      }
      expression = this.newWatchpointEditor.getModel().getText();
      w = new Watchpoint({
        expression: expression
      });
      this.GlobalContext.addWatchpoint(w);
      this.newWatchpointEditor.getModel().setText('');
      return event.cancel();
    };

    PhpDebugWatchView.prototype.isEqual = function(other) {
      return other instanceof PhpDebugWatchView;
    };

    PhpDebugWatchView.prototype.showWatches = function() {
      var watch, watches, _i, _len, _results;
      this.watchpointViewList.empty();
      if (this.GlobalContext.getCurrentDebugContext()) {
        watches = this.GlobalContext.getCurrentDebugContext().getWatchpoints();
      } else {
        watches = this.GlobalContext.getWatchpoints();
      }
      _results = [];
      for (_i = 0, _len = watches.length; _i < _len; _i++) {
        watch = watches[_i];
        if (watch === void 0) {
          continue;
        }
        _results.push(this.watchpointViewList.append(new WatchView(watch)));
      }
      return _results;
    };

    return PhpDebugWatchView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3BocC1kZWJ1Zy9saWIvd2F0Y2gvcGhwLWRlYnVnLXdhdGNoLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFJQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUMsYUFBYyxPQUFBLENBQVEsTUFBUixFQUFkLFVBQUQsQ0FBQTs7QUFBQSxFQUNBLE9BQWtCLE9BQUEsQ0FBUSxzQkFBUixDQUFsQixFQUFDLFNBQUEsQ0FBRCxFQUFJLGtCQUFBLFVBREosQ0FBQTs7QUFBQSxFQUVBLFFBQTZCLE9BQUEsQ0FBUSxzQkFBUixDQUE3QixFQUFDLFVBQUEsQ0FBRCxFQUFJLHVCQUFBLGNBQUosRUFBb0IsYUFBQSxJQUZwQixDQUFBOztBQUFBLEVBR0EsUUFBd0IsT0FBQSxDQUFRLFdBQVIsQ0FBeEIsRUFBQyxnQkFBQSxPQUFELEVBQVUsbUJBQUEsVUFIVixDQUFBOztBQUFBLEVBSUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxjQUFSLENBSlosQ0FBQTs7QUFBQSxFQUtBLGFBQUEsR0FBZ0IsT0FBQSxDQUFRLDBCQUFSLENBTGhCLENBQUE7O0FBQUEsRUFNQSxVQUFBLEdBQWEsT0FBQSxDQUFRLHNCQUFSLENBTmIsQ0FBQTs7QUFBQSxFQU9BLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSix3Q0FBQSxDQUFBOztBQUFBLElBQUEsaUJBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLE9BQVA7T0FBTCxFQUFxQixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO0FBQ25CLFVBQUEsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFlBQUEsT0FBQSxFQUFPLGVBQVA7V0FBTCxFQUE2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

//# sourceURL=/Users/muhammad/.atom/packages/php-debug/lib/watch/php-debug-watch-view.coffee
