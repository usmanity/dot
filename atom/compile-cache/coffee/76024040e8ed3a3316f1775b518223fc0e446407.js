(function() {
  var PhpDebug;

  PhpDebug = require('../lib/php-debug');

  describe("PhpDebug", function() {
    var activationPromise, workspaceElement, _ref;
    _ref = [], workspaceElement = _ref[0], activationPromise = _ref[1];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      return activationPromise = atom.packages.activatePackage('php-debug');
    });
    return describe("when the php-debug:toggle event is triggered", function() {
      it("hides and shows the modal panel", function() {
        expect(workspaceElement.querySelector('.php-debug')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'php-debug:toggleDebugging');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var phpDebugElement, phpDebugPanel;
          expect(workspaceElement.querySelector('.php-debug')).toExist();
          phpDebugElement = workspaceElement.querySelector('.php-debug');
          expect(phpDebugElement).toExist();
          phpDebugPanel = atom.workspace.panelForItem(phpDebugElement);
          expect(phpDebugPanel.isVisible()).toBe(true);
          atom.commands.dispatch(workspaceElement, 'php-debug:toggleDebugging');
          return expect(phpDebugPanel.isVisible()).toBe(false);
        });
      });
      return it("hides and shows the view", function() {
        jasmine.attachToDOM(workspaceElement);
        expect(workspaceElement.querySelector('.php-debug')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'php-debug:toggleDebugging');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var phpDebugElement;
          phpDebugElement = workspaceElement.querySelector('.php-debug');
          expect(phpDebugElement).toBeVisible();
          atom.commands.dispatch(workspaceElement, 'php-debug:toggleDebugging');
          return expect(phpDebugElement).not.toBeVisible();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3BocC1kZWJ1Zy9zcGVjL3BocC1kZWJ1Zy1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxRQUFBOztBQUFBLEVBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxrQkFBUixDQUFYLENBQUE7O0FBQUEsRUFPQSxRQUFBLENBQVMsVUFBVCxFQUFxQixTQUFBLEdBQUE7QUFDbkIsUUFBQSx5Q0FBQTtBQUFBLElBQUEsT0FBd0MsRUFBeEMsRUFBQywwQkFBRCxFQUFtQiwyQkFBbkIsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixDQUFuQixDQUFBO2FBQ0EsaUJBQUEsR0FBb0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLFdBQTlCLEVBRlg7SUFBQSxDQUFYLENBRkEsQ0FBQTtXQU1BLFFBQUEsQ0FBUyw4Q0FBVCxFQUF5RCxTQUFBLEdBQUE7QUFDdkQsTUFBQSxFQUFBLENBQUcsaUNBQUgsRUFBc0MsU0FBQSxHQUFBO0FBR3BDLFFBQUEsTUFBQSxDQUFPLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLFlBQS9CLENBQVAsQ0FBb0QsQ0FBQyxHQUFHLENBQUMsT0FBekQsQ0FBQSxDQUFBLENBQUE7QUFBQSxRQUlBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMsMkJBQXpDLENBSkEsQ0FBQTtBQUFBLFFBTUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7aUJBQ2Qsa0JBRGM7UUFBQSxDQUFoQixDQU5BLENBQUE7ZUFTQSxJQUFBLENBQUssU0FBQSxHQUFBO0FBQ0gsY0FBQSw4QkFBQTtBQUFBLFVBQUEsTUFBQSxDQUFPLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLFlBQS9CLENBQVAsQ0FBb0QsQ0FBQyxPQUFyRCxDQUFBLENBQUEsQ0FBQTtBQUFBLFVBRUEsZUFBQSxHQUFrQixnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQixZQUEvQixDQUZsQixDQUFBO0FBQUEsVUFHQSxNQUFBLENBQU8sZUFBUCxDQUF1QixDQUFDLE9BQXhCLENBQUEsQ0FIQSxDQUFBO0FBQUEsVUFLQSxhQUFBLEdBQWdCLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBZixDQUE0QixlQUE1QixDQUxoQixDQUFBO0FBQUEsVUFNQSxNQUFBLENBQU8sYUFBYSxDQUFDLFNBQWQsQ0FBQSxDQUFQLENBQWlDLENBQUMsSUFBbEMsQ0FBdUMsSUFBdkMsQ0FOQSxDQUFBO0FBQUEsVUFPQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsZ0JBQXZCLEVBQXlDLDJCQUF6QyxDQVBBLENBQUE7aUJBUUEsTUFBQSxDQUFPLGFBQWEsQ0FBQyxTQUFkLENBQUEsQ0FBUCxDQUFpQyxDQUFDLElBQWxDLENBQXVDLEtBQXZDLEVBVEc7UUFBQSxDQUFMLEVBWm9DO01BQUEsQ0FBdEMsQ0FBQSxDQUFBO2FBdUJBLEVBQUEsQ0FBRywwQkFBSCxFQUErQixTQUFBLEdBQUE7QUFPN0IsUUFBQSxPQUFPLENBQUMsV0FBUixDQUFvQixnQkFBcEIsQ0FBQSxDQUFBO0FBQUEsUUFFQSxNQUFBLENBQU8sZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IsWUFBL0IsQ0FBUCxDQUFvRCxDQUFDLEdBQUcsQ0FBQyxPQUF6RCxDQUFBLENBRkEsQ0FBQTtBQUFBLFFBTUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5QywyQkFBekMsQ0FOQSxDQUFBO0FBQUEsUUFRQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtpQkFDZCxrQkFEYztRQUFBLENBQWhCLENBUkEsQ0FBQTtlQVdBLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFFSCxjQUFBLGVBQUE7QUFBQSxVQUFBLGVBQUEsR0FBa0IsZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IsWUFBL0IsQ0FBbEIsQ0FBQTtBQUFBLFVBQ0EsTUFBQSxDQUFPLGVBQVAsQ0FBdUIsQ0FBQyxXQUF4QixDQUFBLENBREEsQ0FBQTtBQUFBLFVBRUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5QywyQkFBekMsQ0FGQSxDQUFBO2lCQUdBLE1BQUEsQ0FBTyxlQUFQLENBQXVCLENBQUMsR0FBRyxDQUFDLFdBQTVCLENBQUEsRUFMRztRQUFBLENBQUwsRUFsQjZCO01BQUEsQ0FBL0IsRUF4QnVEO0lBQUEsQ0FBekQsRUFQbUI7RUFBQSxDQUFyQixDQVBBLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/muhammad/.atom/packages/php-debug/spec/php-debug-spec.coffee
