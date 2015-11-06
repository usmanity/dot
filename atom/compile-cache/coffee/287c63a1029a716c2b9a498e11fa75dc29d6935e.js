(function() {
  var $, BreakpointView, Disposable, GlobalContext, PhpDebugBreakpointView, ScrollView, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Disposable = require('atom').Disposable;

  _ref = require('atom-space-pen-views'), $ = _ref.$, ScrollView = _ref.ScrollView;

  BreakpointView = require('./breakpoint-view');

  GlobalContext = require('../models/global-context');

  module.exports = PhpDebugBreakpointView = (function(_super) {
    __extends(PhpDebugBreakpointView, _super);

    PhpDebugBreakpointView.content = function() {
      return this.div({
        "class": 'php-debug php-debug-breakpoint-view pane-item',
        tabindex: -1
      }, (function(_this) {
        return function() {
          _this.div({
            "class": "panel-heading"
          }, "Breakpoints");
          return _this.div({
            outlet: 'breakpointViewList',
            tabindex: -1,
            "class": 'php-debug-breakpoints native-key-bindings'
          });
        };
      })(this));
    };

    function PhpDebugBreakpointView(params) {
      this.showBreakpoints = __bind(this.showBreakpoints, this);
      this.initialize = __bind(this.initialize, this);
      PhpDebugBreakpointView.__super__.constructor.apply(this, arguments);
      this.contextList = [];
    }

    PhpDebugBreakpointView.prototype.serialize = function() {
      return {
        deserializer: this.constructor.name,
        uri: this.getURI()
      };
    };

    PhpDebugBreakpointView.prototype.getURI = function() {
      return this.uri;
    };

    PhpDebugBreakpointView.prototype.getTitle = function() {
      return "Breakpoints";
    };

    PhpDebugBreakpointView.prototype.onDidChangeTitle = function() {
      return new Disposable(function() {});
    };

    PhpDebugBreakpointView.prototype.onDidChangeModified = function() {
      return new Disposable(function() {});
    };

    PhpDebugBreakpointView.prototype.isEqual = function(other) {
      return other instanceof PhpDebugBreakpointView;
    };

    PhpDebugBreakpointView.prototype.initialize = function(params) {
      this.GlobalContext = params.context;
      this.showBreakpoints();
      return this.GlobalContext.onBreakpointsChange(this.showBreakpoints);
    };

    PhpDebugBreakpointView.prototype.showBreakpoints = function() {
      var breakpoints;
      if (this.breakpointViewList) {
        this.breakpointViewList.empty();
      }
      breakpoints = this.GlobalContext.getBreakpoints();
      return this.breakpointViewList.append(new BreakpointView(breakpoints));
    };

    return PhpDebugBreakpointView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3BocC1kZWJ1Zy9saWIvYnJlYWtwb2ludC9waHAtZGVidWctYnJlYWtwb2ludC12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxzRkFBQTtJQUFBOzttU0FBQTs7QUFBQSxFQUFDLGFBQWMsT0FBQSxDQUFRLE1BQVIsRUFBZCxVQUFELENBQUE7O0FBQUEsRUFDQSxPQUFrQixPQUFBLENBQVEsc0JBQVIsQ0FBbEIsRUFBQyxTQUFBLENBQUQsRUFBSSxrQkFBQSxVQURKLENBQUE7O0FBQUEsRUFFQSxjQUFBLEdBQWlCLE9BQUEsQ0FBUSxtQkFBUixDQUZqQixDQUFBOztBQUFBLEVBSUEsYUFBQSxHQUFnQixPQUFBLENBQVEsMEJBQVIsQ0FKaEIsQ0FBQTs7QUFBQSxFQU1BLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSiw2Q0FBQSxDQUFBOztBQUFBLElBQUEsc0JBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLCtDQUFQO0FBQUEsUUFBd0QsUUFBQSxFQUFVLENBQUEsQ0FBbEU7T0FBTCxFQUEyRSxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO0FBQ3pFLFVBQUEsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFlBQUEsT0FBQSxFQUFPLGVBQVA7V0FBTCxFQUE2QixhQUE3QixDQUFBLENBQUE7aUJBQ0EsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFlBQUEsTUFBQSxFQUFRLG9CQUFSO0FBQUEsWUFBOEIsUUFBQSxFQUFVLENBQUEsQ0FBeEM7QUFBQSxZQUE0QyxPQUFBLEVBQU0sMkNBQWxEO1dBQUwsRUFGeUU7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUEzRSxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUthLElBQUEsZ0NBQUMsTUFBRCxHQUFBO0FBQ1gsK0RBQUEsQ0FBQTtBQUFBLHFEQUFBLENBQUE7QUFBQSxNQUFBLHlEQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsV0FBRCxHQUFlLEVBRGYsQ0FEVztJQUFBLENBTGI7O0FBQUEscUNBU0EsU0FBQSxHQUFXLFNBQUEsR0FBQTthQUNUO0FBQUEsUUFBQSxZQUFBLEVBQWMsSUFBQyxDQUFBLFdBQVcsQ0FBQyxJQUEzQjtBQUFBLFFBQ0EsR0FBQSxFQUFLLElBQUMsQ0FBQSxNQUFELENBQUEsQ0FETDtRQURTO0lBQUEsQ0FUWCxDQUFBOztBQUFBLHFDQWFBLE1BQUEsR0FBUSxTQUFBLEdBQUE7YUFBRyxJQUFDLENBQUEsSUFBSjtJQUFBLENBYlIsQ0FBQTs7QUFBQSxxQ0FlQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2FBQUcsY0FBSDtJQUFBLENBZlYsQ0FBQTs7QUFBQSxxQ0FpQkEsZ0JBQUEsR0FBa0IsU0FBQSxHQUFBO2FBQU8sSUFBQSxVQUFBLENBQVcsU0FBQSxHQUFBLENBQVgsRUFBUDtJQUFBLENBakJsQixDQUFBOztBQUFBLHFDQWtCQSxtQkFBQSxHQUFxQixTQUFBLEdBQUE7YUFBTyxJQUFBLFVBQUEsQ0FBVyxTQUFBLEdBQUEsQ0FBWCxFQUFQO0lBQUEsQ0FsQnJCLENBQUE7O0FBQUEscUNBb0JBLE9BQUEsR0FBUyxTQUFDLEtBQUQsR0FBQTthQUNQLEtBQUEsWUFBaUIsdUJBRFY7SUFBQSxDQXBCVCxDQUFBOztBQUFBLHFDQXVCQSxVQUFBLEdBQVksU0FBQyxNQUFELEdBQUE7QUFDVixNQUFBLElBQUMsQ0FBQSxhQUFELEdBQWlCLE1BQU0sQ0FBQyxPQUF4QixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsZUFBRCxDQUFBLENBREEsQ0FBQTthQUVBLElBQUMsQ0FBQSxhQUFhLENBQUMsbUJBQWYsQ0FBbUMsSUFBQyxDQUFBLGVBQXBDLEVBSFU7SUFBQSxDQXZCWixDQUFBOztBQUFBLHFDQTRCQSxlQUFBLEdBQWlCLFNBQUEsR0FBQTtBQUNmLFVBQUEsV0FBQTtBQUFBLE1BQUEsSUFBRyxJQUFDLENBQUEsa0JBQUo7QUFDRSxRQUFBLElBQUMsQ0FBQSxrQkFBa0IsQ0FBQyxLQUFwQixDQUFBLENBQUEsQ0FERjtPQUFBO0FBQUEsTUFFQSxXQUFBLEdBQWMsSUFBQyxDQUFBLGFBQWEsQ0FBQyxjQUFmLENBQUEsQ0FGZCxDQUFBO2FBR0EsSUFBQyxDQUFBLGtCQUFrQixDQUFDLE1BQXBCLENBQStCLElBQUEsY0FBQSxDQUFlLFdBQWYsQ0FBL0IsRUFKZTtJQUFBLENBNUJqQixDQUFBOztrQ0FBQTs7S0FEbUMsV0FQckMsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/muhammad/.atom/packages/php-debug/lib/breakpoint/php-debug-breakpoint-view.coffee
