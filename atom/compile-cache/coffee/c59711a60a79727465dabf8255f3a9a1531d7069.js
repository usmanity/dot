(function() {
  var ConfigHelper, cson, fs, path;

  fs = require('fs-plus');

  cson = require('season');

  path = require('path');

  module.exports = ConfigHelper = {
    initialise: function() {
      var csonSample, file;
      file = this.getFullPath();
      if (!fs.isFileSync(file)) {
        csonSample = cson.stringify(this.sample);
        fs.writeFileSync(file, csonSample);
      }
      return atom.workspace.open(file);
    },
    load: function(anchor) {
      var file;
      if (anchor == null) {
        anchor = null;
      }
      file = this.getFullPath(anchor);
      if (!file) {
        return;
      }
      if (fs.isFileSync(file)) {
        return cson.readFileSync(file);
      }
    },
    assert: function(anchor) {
      var config;
      if (anchor == null) {
        anchor = null;
      }
      config = this.load(anchor);
      if (!config) {
        throw new Error("You must create remote config first");
      }
      return config;
    },
    isExcluded: function(str, exclude) {
      var pattern, _i, _len;
      for (_i = 0, _len = exclude.length; _i < _len; _i++) {
        pattern = exclude[_i];
        if ((str.indexOf(pattern)) !== -1) {
          return true;
        }
      }
      return false;
    },
    getRelativePath: function(fullpath) {
      var base;
      base = this.getCurrentProjectDirectory();
      return this.getRelativePathByBase(base, fullpath);
    },
    getRelativePathByBase: function(base, fullpath) {
      if (!base || !fullpath) {
        return;
      }
      return fullpath.replace(new RegExp('^' + base.replace(/([.?*+^$[\]\\/(){}|-])/g, "\\$1")), '');
    },
    getFullPath: function(anchor) {
      var root;
      if (anchor == null) {
        anchor = null;
      }
      root = this.getCurrentProjectDirectory(anchor);
      if (!root) {
        return;
      }
      return path.join(root, '.sync-config.cson');
    },
    getCurrentProjectDirectory: function(anchor) {
      var dir, roots, selected, _i, _len;
      if (atom.project.rootDirectories.length < 1) {
        return;
      }
      roots = atom.project.rootDirectories;
      selected = (function() {
        if (anchor != null) {
          return anchor;
        } else if (atom.workspace.getLeftPanels()[0]) {
          return atom.workspace.getLeftPanels()[0].getItem().selectedPaths()[0];
        } else {
          return false;
        }
      })();
      if (!(roots && selected)) {
        return;
      }
      for (_i = 0, _len = roots.length; _i < _len; _i++) {
        dir = roots[_i];
        if ((this.getRelativePathByBase(dir.path, selected)) !== selected) {
          return dir.path;
        }
      }
    },
    sample: {
      remote: {
        host: "HOSTNAME",
        user: "USERNAME",
        path: "REMOTE_DIR"
      },
      behaviour: {
        uploadOnSave: true,
        syncDownOnOpen: true,
        forgetConsole: false,
        autoHideConsole: true,
        alwaysSyncAll: false
      },
      option: {
        deleteFiles: false,
        exclude: ['.sync-config.cson', '.git', 'node_modules', 'tmp', 'vendor']
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL2F0b20tc3luYy9saWIvaGVscGVyL2NvbmZpZy1oZWxwZXIuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRCQUFBOztBQUFBLEVBQUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxTQUFSLENBQUwsQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsUUFBUixDQURQLENBQUE7O0FBQUEsRUFFQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FGUCxDQUFBOztBQUFBLEVBSUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsWUFBQSxHQUNiO0FBQUEsSUFBQSxVQUFBLEVBQVksU0FBQSxHQUFBO0FBQ1IsVUFBQSxnQkFBQTtBQUFBLE1BQUEsSUFBQSxHQUFRLElBQUMsQ0FBQSxXQUFELENBQUEsQ0FBUixDQUFBO0FBQ0EsTUFBQSxJQUFHLENBQUEsRUFBTSxDQUFDLFVBQUgsQ0FBYyxJQUFkLENBQVA7QUFDSSxRQUFBLFVBQUEsR0FBYSxJQUFJLENBQUMsU0FBTCxDQUFlLElBQUMsQ0FBQSxNQUFoQixDQUFiLENBQUE7QUFBQSxRQUNBLEVBQUUsQ0FBQyxhQUFILENBQWlCLElBQWpCLEVBQXVCLFVBQXZCLENBREEsQ0FESjtPQURBO2FBSUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQW9CLElBQXBCLEVBTFE7SUFBQSxDQUFaO0FBQUEsSUFPQSxJQUFBLEVBQU0sU0FBQyxNQUFELEdBQUE7QUFDRixVQUFBLElBQUE7O1FBREcsU0FBUztPQUNaO0FBQUEsTUFBQSxJQUFBLEdBQU8sSUFBQyxDQUFBLFdBQUQsQ0FBYSxNQUFiLENBQVAsQ0FBQTtBQUNBLE1BQUEsSUFBRyxDQUFBLElBQUg7QUFDSSxjQUFBLENBREo7T0FEQTtBQUlBLE1BQUEsSUFBRyxFQUFF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

//# sourceURL=/Users/muhammad/.atom/packages/atom-sync/lib/helper/config-helper.coffee
