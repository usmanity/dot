(function() {
  var AtomSync;

  AtomSync = require('../lib/atom-sync');

  describe("AtomSync", function() {
    var activationPromise, workspaceElement, _ref;
    _ref = [], workspaceElement = _ref[0], activationPromise = _ref[1];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      return activationPromise = atom.packages.activatePackage('atom-sync');
    });
    return describe("when the atom-sync:toggle-log-panel event is triggered", function() {
      return it("hides and shows the log panel", function() {
        expect(workspaceElement.querySelector('.atom-sync')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'atom-sync:toggle-log-panel');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var atomSyncElement, atomSyncPanel;
          expect(workspaceElement.querySelector('.atom-sync')).toExist();
          atomSyncElement = workspaceElement.querySelector('.atom-sync');
          expect(atomSyncElement).toExist();
          atomSyncPanel = atom.workspace.panelForItem(atomSyncElement);
          expect(atomSyncPanel.isVisible()).toBe(true);
          atom.commands.dispatch(workspaceElement, 'atom-sync:toggle-log-panel');
          return expect(atomSyncPanel.isVisible()).toBe(false);
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL2F0b20tc3luYy9zcGVjL2F0b20tc3luYy1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxRQUFBOztBQUFBLEVBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxrQkFBUixDQUFYLENBQUE7O0FBQUEsRUFPQSxRQUFBLENBQVMsVUFBVCxFQUFxQixTQUFBLEdBQUE7QUFDbkIsUUFBQSx5Q0FBQTtBQUFBLElBQUEsT0FBd0MsRUFBeEMsRUFBQywwQkFBRCxFQUFtQiwyQkFBbkIsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixDQUFuQixDQUFBO2FBQ0EsaUJBQUEsR0FBb0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLFdBQTlCLEVBRlg7SUFBQSxDQUFYLENBRkEsQ0FBQTtXQU1BLFFBQUEsQ0FBUyx3REFBVCxFQUFtRSxTQUFBLEdBQUE7YUFDakUsRUFBQSxDQUFHLCtCQUFILEVBQW9DLFNBQUEsR0FBQTtBQUdsQyxRQUFBLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQixZQUEvQixDQUFQLENBQW9ELENBQUMsR0FBRyxDQUFDLE9BQXpELENBQUEsQ0FBQSxDQUFBO0FBQUEsUUFJQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsZ0JBQXZCLEVBQXlDLDRCQUF6QyxDQUpBLENBQUE7QUFBQSxRQU1BLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2lCQUNkLGtCQURjO1FBQUEsQ0FBaEIsQ0FOQSxDQUFBO2VBU0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtBQUNILGNBQUEsOEJBQUE7QUFBQSxVQUFBLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQixZQUEvQixDQUFQLENBQW9ELENBQUMsT0FBckQsQ0FBQSxDQUFBLENBQUE7QUFBQSxVQUVBLGVBQUEsR0FBa0IsZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IsWUFBL0IsQ0FGbEIsQ0FBQTtBQUFBLFVBR0EsTUFBQSxDQUFPLGVBQVAsQ0FBdUIsQ0FBQyxPQUF4QixDQUFBLENBSEEsQ0FBQTtBQUFBLFVBS0EsYUFBQSxHQUFnQixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQWYsQ0FBNEIsZUFBNUIsQ0FMaEIsQ0FBQTtBQUFBLFVBTUEsTUFBQSxDQUFPLGFBQWEsQ0FBQyxTQUFkLENBQUEsQ0FBUCxDQUFpQyxDQUFDLElBQWxDLENBQXVDLElBQXZDLENBTkEsQ0FBQTtBQUFBLFVBT0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5Qyw0QkFBekMsQ0FQQSxDQUFBO2lCQVFBLE1BQUEsQ0FBTyxhQUFhLENBQUMsU0FBZCxDQUFBLENBQVAsQ0FBaUMsQ0FBQyxJQUFsQyxDQUF1QyxLQUF2QyxFQVRHO1FBQUEsQ0FBTCxFQVprQztNQUFBLENBQXBDLEVBRGlFO0lBQUEsQ0FBbkUsRUFQbUI7RUFBQSxDQUFyQixDQVBBLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/muhammad/.atom/packages/atom-sync/spec/atom-sync-spec.coffee
