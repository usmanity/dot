(function() {
  var ServiceController, configHelper, consoleHelper, fs, log, path;

  path = require('path');

  fs = require('fs-plus');

  log = require('../helper/logger-helper');

  consoleHelper = require('../helper/console-helper');

  configHelper = require('../helper/config-helper');

  module.exports = ServiceController = {
    console: consoleHelper,
    config: configHelper,
    destory: function() {
      return this.console.destory();
    },
    serialize: function() {
      return this.console.serialize();
    },
    toggleConsole: function() {
      if (this.console.isVisible()) {
        return this.console.hide();
      } else {
        return this.console.show();
      }
    },
    onCreate: function() {
      return this.config.initialise();
    },
    onSave: function(obj) {
      var config, _ref;
      config = this.config.load(obj);
      if (config != null ? (_ref = config.behaviour) != null ? _ref.uploadOnSave : void 0 : void 0) {
        return this.onSync(obj, 'up');
      }
    },
    onOpen: function(obj) {
      var config, _ref;
      config = this.config.load(obj);
      if (config != null ? (_ref = config.behaviour) != null ? _ref.syncDownOnOpen : void 0 : void 0) {
        return this.onSync(obj, 'down');
      }
    },
    onSync: function(obj, direction) {
      var config, dst, err, relativePath, src, _ref, _ref1, _ref2;
      obj = path.normalize(obj);
      try {
        config = this.config.assert(obj);
      } catch (_error) {
        err = _error;
        this.console.show();
        this.console.log("<span class='error'>" + err + "</span>\n");
        return;
      }
      relativePath = this.config.getRelativePath(obj);
      if (this.config.isExcluded(relativePath, (_ref = config.option) != null ? _ref.exclude : void 0)) {
        return;
      }
      switch (direction) {
        case 'up':
          if (((_ref1 = config.behaviour) != null ? _ref1.alwaysSyncAll : void 0) === true) {
            src = this.config.getCurrentProjectDirectory() + path.sep;
            dst = this.genRemoteString(config.remote.user, config.remote.host, config.remote.path);
          } else {
            src = obj + (fs.isDirectorySync(obj) ? path.sep : '');
            dst = this.genRemoteString(config.remote.user, config.remote.host, fs.isDirectorySync(obj) ? path.join(config.remote.path, relativePath) : path.dirname(path.join(config.remote.path, relativePath)));
          }
          break;
        case 'down':
          if (((_ref2 = config.behaviour) != null ? _ref2.alwaysSyncAll : void 0) === true) {
            src = (this.genRemoteString(config.remote.user, config.remote.host, path.join(config.remote.path, relativePath))) + (fs.isDirectorySync(obj) ? '/' : '');
            dst = fs.isDirectorySync(obj) ? path.normalize(obj) : (path.dirname(obj)) + '/';
            this.sync(src, dst, config);
            src = (this.genRemoteString(config.remote.user, config.remote.host, config.remote.path)) + path.sep;
            dst = this.config.getCurrentProjectDirectory();
            config.option.exclude.push(relativePath);
          } else {
            src = (this.genRemoteString(config.remote.user, config.remote.host, path.join(config.remote.path, relativePath))) + (fs.isDirectorySync(obj) ? '/' : '');
            dst = fs.isDirectorySync(obj) ? path.normalize(obj) : (path.dirname(obj)) + '/';
          }
          break;
        default:
          return;
      }
      return this.sync(src, dst, config);
    },
    genRemoteString: function(user, remoteAddr, remotePath) {
      var result;
      result = "" + remoteAddr + ":" + remotePath;
      if (user) {
        return result = "" + user + "@" + result;
      }
    },
    sync: function(src, dst, config, provider) {
      if (config == null) {
        config = {};
      }
      if (provider == null) {
        provider = 'rsync-service';
      }
      if (!config.behaviour.forgetConsole) {
        this.console.show();
      }
      this.console.log("<span class='info'>Syncing from " + src + " to " + dst + "</span> ...");
      return (require('../service/' + provider))({
        src: src,
        dst: dst,
        config: config,
        progress: (function(_this) {
          return function(msg) {
            return _this.console.log(msg);
          };
        })(this),
        success: (function(_this) {
          return function() {
            var _ref;
            _this.console.log("<span class='success'>Sync completed without error.</span>\n");
            if ((_ref = config.behaviour) != null ? _ref.autoHideConsole : void 0) {
              return setTimeout((function() {
                return _this.console.hide();
              }), 1500);
            }
          };
        })(this),
        error: (function(_this) {
          return function(err, cmd) {
            return _this.console.log("<span class='error'>" + err + ", plese review your config file.</span>\n");
          };
        })(this)
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL2F0b20tc3luYy9saWIvY29udHJvbGxlci9zZXJ2aWNlLWNvbnRyb2xsZXIuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDZEQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBQVAsQ0FBQTs7QUFBQSxFQUNBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQURMLENBQUE7O0FBQUEsRUFFQSxHQUFBLEdBQU0sT0FBQSxDQUFRLHlCQUFSLENBRk4sQ0FBQTs7QUFBQSxFQUlBLGFBQUEsR0FBZ0IsT0FBQSxDQUFRLDBCQUFSLENBSmhCLENBQUE7O0FBQUEsRUFLQSxZQUFBLEdBQWUsT0FBQSxDQUFRLHlCQUFSLENBTGYsQ0FBQTs7QUFBQSxFQU9BLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLGlCQUFBLEdBQ2I7QUFBQSxJQUFBLE9BQUEsRUFBUyxhQUFUO0FBQUEsSUFDQSxNQUFBLEVBQVEsWUFEUjtBQUFBLElBR0EsT0FBQSxFQUFTLFNBQUEsR0FBQTthQUNMLElBQUMsQ0FBQSxPQUFPLENBQUMsT0FBVCxDQUFBLEVBREs7SUFBQSxDQUhUO0FBQUEsSUFNQSxTQUFBLEVBQVcsU0FBQSxHQUFBO2FBQ1AsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFULENBQUEsRUFETztJQUFBLENBTlg7QUFBQSxJQVVBLGFBQUEsRUFBZSxTQUFBLEdBQUE7QUFDWCxNQUFBLElBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFULENBQUEsQ0FBSDtlQUE2QixJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBQSxFQUE3QjtPQUFBLE1BQUE7ZUFBa0QsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQUEsRUFBbEQ7T0FEVztJQUFBLENBVmY7QUFBQSxJQWFBLFFB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

//# sourceURL=/Users/muhammad/.atom/packages/atom-sync/lib/controller/service-controller.coffee
