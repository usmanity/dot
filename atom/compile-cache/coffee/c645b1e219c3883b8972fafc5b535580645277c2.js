(function() {
  var StackFrameView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom-space-pen-views').View;

  module.exports = StackFrameView = (function(_super) {
    __extends(StackFrameView, _super);

    function StackFrameView() {
      return StackFrameView.__super__.constructor.apply(this, arguments);
    }

    StackFrameView.content = function(params) {
      return StackFrameView.li(function() {
        StackFrameView.div({
          "class": 'stack-frame-label text-info inline-block-tight'
        }, params.label);
        StackFrameView.div({
          "class": 'stack-frame-filepath text-smaller inline-block-tight'
        }, params.filepath);
        return StackFrameView.div({
          "class": 'stack-frame-line text-smaller inline-block-tight'
        }, params.line);
      });
    };

    return StackFrameView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3BocC1kZWJ1Zy9saWIvc3RhY2svc3RhY2stZnJhbWUtdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsb0JBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFDLE9BQVEsT0FBQSxDQUFRLHNCQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUVKLHFDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLGNBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQyxNQUFELEdBQUE7YUFDUixjQUFDLENBQUEsRUFBRCxDQUFJLFNBQUEsR0FBQTtBQUNGLFFBQUEsY0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFVBQUEsT0FBQSxFQUFPLGdEQUFQO1NBQUwsRUFBOEQsTUFBTSxDQUFDLEtBQXJFLENBQUEsQ0FBQTtBQUFBLFFBQ0EsY0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFVBQUEsT0FBQSxFQUFPLHNEQUFQO1NBQUwsRUFBb0UsTUFBTSxDQUFDLFFBQTNFLENBREEsQ0FBQTtlQUVBLGNBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxVQUFBLE9BQUEsRUFBTyxrREFBUDtTQUFMLEVBQWdFLE1BQU0sQ0FBQyxJQUF2RSxFQUhFO01BQUEsQ0FBSixFQURRO0lBQUEsQ0FBVixDQUFBOzswQkFBQTs7S0FGMkIsS0FIN0IsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/muhammad/.atom/packages/php-debug/lib/stack/stack-frame-view.coffee
