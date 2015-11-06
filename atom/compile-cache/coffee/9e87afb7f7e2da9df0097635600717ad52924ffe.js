(function() {
  var linkPaths, regex, template;

  regex = /(\/?(?:[-\w.]+\/)*[-\w.]+):(\d+):(\d+)/g;

  template = '<a class="-linked-path" data-path="$1" data-line="$2" data-column="$3">$&</a>';

  module.exports = linkPaths = function(lines) {
    return lines.replace(regex, template);
  };

  linkPaths.listen = function(parentView) {
    return parentView.on('click', '.-linked-path', function(event) {
      var column, el, line, path, _ref;
      el = this;
      _ref = el.dataset, path = _ref.path, line = _ref.line, column = _ref.column;
      line = Number(line) - 1;
      column = Number(column) - 1;
      return atom.workspace.open(path, {
        initialLine: line,
        initialColumn: column
      });
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvbGluay1wYXRocy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsMEJBQUE7O0FBQUEsRUFBQSxLQUFBLEdBQVEseUNBQVIsQ0FBQTs7QUFBQSxFQUNBLFFBQUEsR0FBVywrRUFEWCxDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQSxHQUFZLFNBQUMsS0FBRCxHQUFBO1dBQzNCLEtBQUssQ0FBQyxPQUFOLENBQWMsS0FBZCxFQUFxQixRQUFyQixFQUQyQjtFQUFBLENBSDdCLENBQUE7O0FBQUEsRUFNQSxTQUFTLENBQUMsTUFBVixHQUFtQixTQUFDLFVBQUQsR0FBQTtXQUNqQixVQUFVLENBQUMsRUFBWCxDQUFjLE9BQWQsRUFBdUIsZUFBdkIsRUFBd0MsU0FBQyxLQUFELEdBQUE7QUFDdEMsVUFBQSw0QkFBQTtBQUFBLE1BQUEsRUFBQSxHQUFLLElBQUwsQ0FBQTtBQUFBLE1BQ0EsT0FBdUIsRUFBRSxDQUFDLE9BQTFCLEVBQUMsWUFBQSxJQUFELEVBQU8sWUFBQSxJQUFQLEVBQWEsY0FBQSxNQURiLENBQUE7QUFBQSxNQUVBLElBQUEsR0FBTyxNQUFBLENBQU8sSUFBUCxDQUFBLEdBQWUsQ0FGdEIsQ0FBQTtBQUFBLE1BR0EsTUFBQSxHQUFTLE1BQUEsQ0FBTyxNQUFQLENBQUEsR0FBaUIsQ0FIMUIsQ0FBQTthQUtBLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFvQixJQUFwQixFQUEwQjtBQUFBLFFBQ3hCLFdBQUEsRUFBYSxJQURXO0FBQUEsUUFFeEIsYUFBQSxFQUFlLE1BRlM7T0FBMUIsRUFOc0M7SUFBQSxDQUF4QyxFQURpQjtFQUFBLENBTm5CLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/muhammad/.atom/packages/script/lib/link-paths.coffee
