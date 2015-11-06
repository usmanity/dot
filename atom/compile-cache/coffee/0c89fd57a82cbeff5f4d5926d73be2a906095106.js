(function() {
  var HeaderView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom-space-pen-views').View;

  module.exports = HeaderView = (function(_super) {
    __extends(HeaderView, _super);

    function HeaderView() {
      return HeaderView.__super__.constructor.apply(this, arguments);
    }

    HeaderView.content = function() {
      return this.div({
        "class": 'panel-heading padded heading header-view'
      }, (function(_this) {
        return function() {
          _this.span({
            "class": 'heading-title',
            outlet: 'title'
          });
          _this.span({
            "class": 'heading-status',
            outlet: 'status'
          });
          return _this.span({
            "class": 'heading-close icon-remove-close pull-right',
            outlet: 'closeButton',
            click: 'close'
          });
        };
      })(this));
    };

    HeaderView.prototype.close = function() {
      return atom.commands.dispatch(this.workspaceView(), 'script:close-view');
    };

    HeaderView.prototype.setStatus = function(status) {
      this.status.removeClass('icon-alert icon-check icon-hourglass icon-stop');
      switch (status) {
        case 'start':
          return this.status.addClass('icon-hourglass');
        case 'stop':
          return this.status.addClass('icon-check');
        case 'kill':
          return this.status.addClass('icon-stop');
        case 'err':
          return this.status.addClass('icon-alert');
      }
    };

    HeaderView.prototype.workspaceView = function() {
      return atom.views.getView(atom.workspace);
    };

    return HeaderView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvaGVhZGVyLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGdCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxzQkFBUixFQUFSLElBQUQsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFFSixpQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsSUFBQSxVQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTywwQ0FBUDtPQUFMLEVBQXdELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDdEQsVUFBQSxLQUFDLENBQUEsSUFBRCxDQUFNO0FBQUEsWUFBQSxPQUFBLEVBQU8sZUFBUDtBQUFBLFlBQXdCLE1BQUEsRUFBUSxPQUFoQztXQUFOLENBQUEsQ0FBQTtBQUFBLFVBQ0EsS0FBQyxDQUFBLElBQUQsQ0FBTTtBQUFBLFlBQUEsT0FBQSxFQUFPLGdCQUFQO0FBQUEsWUFBeUIsTUFBQSxFQUFRLFFBQWpDO1dBQU4sQ0FEQSxDQUFBO2lCQUVBLEtBQUMsQ0FBQSxJQUFELENBQ0U7QUFBQSxZQUFBLE9BQUEsRUFBTyw0Q0FBUDtBQUFBLFlBQ0EsTUFBQSxFQUFRLGFBRFI7QUFBQSxZQUVBLEtBQUEsRUFBTyxPQUZQO1dBREYsRUFIc0Q7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF4RCxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLHlCQVNBLEtBQUEsR0FBTyxTQUFBLEdBQUE7YUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsSUFBQyxDQUFBLGFBQUQsQ0FBQSxDQUF2QixFQUF5QyxtQkFBekMsRUFESztJQUFBLENBVFAsQ0FBQTs7QUFBQSx5QkFZQSxTQUFBLEdBQVcsU0FBQyxNQUFELEdBQUE7QUFDVCxNQUFBLElBQUMsQ0FBQSxNQUFNLENBQUMsV0FBUixDQUFvQixnREFBcEIsQ0FBQSxDQUFBO0FBQ0EsY0FBTyxNQUFQO0FBQUEsYUFDTyxPQURQO2lCQUNvQixJQUFDLENBQUEsTUFBTSxDQUFDLFFBQVIsQ0FBaUIsZ0JBQWpCLEVBRHBCO0FBQUEsYUFFTyxNQUZQO2lCQUVtQixJQUFDLENBQUEsTUFBTSxDQUFDLFFBQVIsQ0FBaUIsWUFBakIsRUFGbkI7QUFBQSxhQUdPLE1BSFA7aUJBR21CLElBQUMsQ0FBQSxNQUFNLENBQUMsUUFBUixDQUFpQixXQUFqQixFQUhuQjtBQUFBLGFBSU8sS0FKUDtpQkFJa0IsSUFBQyxDQUFBLE1BQU0sQ0FBQyxRQUFSLENBQWlCLFlBQWpCLEVBSmxCO0FBQUEsT0FGUztJQUFBLENBWlgsQ0FBQTs7QUFBQSx5QkFvQkEsYUFBQSxHQUFlLFNBQUEsR0FBQTthQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxDQUFtQixJQUFJLENBQUMsU0FBeEIsRUFEYTtJQUFBLENBcEJmLENBQUE7O3NCQUFBOztLQUZ1QixLQUh6QixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/muhammad/.atom/packages/script/lib/header-view.coffee
