(function() {
  var linkPaths;

  linkPaths = require('../lib/link-paths');

  describe('linkPaths', function() {
    it('detects file paths with line numbers', function() {
      var result;
      result = linkPaths('foo() b/c.js:44:55');
      expect(result).toContain('foo() <a');
      expect(result).toContain('class="-linked-path"');
      expect(result).toContain('data-path="b/c.js"');
      expect(result).toContain('data-line="44"');
      expect(result).toContain('data-column="55"');
      return expect(result).toContain('b/c.js:44:55');
    });
    return it('links multiple paths', function() {
      var multilineResult;
      multilineResult = linkPaths("foo() b/c.js:44:55\nbar() b/c.js:45:56");
      expect(multilineResult).toContain('foo() <a');
      return expect(multilineResult).toContain('bar() <a');
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3NjcmlwdC9zcGVjL2xpbmstcGF0aHMtc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsU0FBQTs7QUFBQSxFQUFBLFNBQUEsR0FBWSxPQUFBLENBQVEsbUJBQVIsQ0FBWixDQUFBOztBQUFBLEVBRUEsUUFBQSxDQUFTLFdBQVQsRUFBc0IsU0FBQSxHQUFBO0FBQ3BCLElBQUEsRUFBQSxDQUFHLHNDQUFILEVBQTJDLFNBQUEsR0FBQTtBQUN6QyxVQUFBLE1BQUE7QUFBQSxNQUFBLE1BQUEsR0FBUyxTQUFBLENBQVUsb0JBQVYsQ0FBVCxDQUFBO0FBQUEsTUFDQSxNQUFBLENBQU8sTUFBUCxDQUFjLENBQUMsU0FBZixDQUF5QixVQUF6QixDQURBLENBQUE7QUFBQSxNQUVBLE1BQUEsQ0FBTyxNQUFQLENBQWMsQ0FBQyxTQUFmLENBQXlCLHNCQUF6QixDQUZBLENBQUE7QUFBQSxNQUdBLE1BQUEsQ0FBTyxNQUFQLENBQWMsQ0FBQyxTQUFmLENBQXlCLG9CQUF6QixDQUhBLENBQUE7QUFBQSxNQUlBLE1BQUEsQ0FBTyxNQUFQLENBQWMsQ0FBQyxTQUFmLENBQXlCLGdCQUF6QixDQUpBLENBQUE7QUFBQSxNQUtBLE1BQUEsQ0FBTyxNQUFQLENBQWMsQ0FBQyxTQUFmLENBQXlCLGtCQUF6QixDQUxBLENBQUE7YUFNQSxNQUFBLENBQU8sTUFBUCxDQUFjLENBQUMsU0FBZixDQUF5QixjQUF6QixFQVB5QztJQUFBLENBQTNDLENBQUEsQ0FBQTtXQVNBLEVBQUEsQ0FBRyxzQkFBSCxFQUEyQixTQUFBLEdBQUE7QUFDekIsVUFBQSxlQUFBO0FBQUEsTUFBQSxlQUFBLEdBQWtCLFNBQUEsQ0FBVSx3Q0FBVixDQUFsQixDQUFBO0FBQUEsTUFJQSxNQUFBLENBQU8sZUFBUCxDQUF1QixDQUFDLFNBQXhCLENBQWtDLFVBQWxDLENBSkEsQ0FBQTthQUtBLE1BQUEsQ0FBTyxlQUFQLENBQXVCLENBQUMsU0FBeEIsQ0FBa0MsVUFBbEMsRUFOeUI7SUFBQSxDQUEzQixFQVZvQjtFQUFBLENBQXRCLENBRkEsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/muhammad/.atom/packages/script/spec/link-paths-spec.coffee
