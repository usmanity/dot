(function() {
  var CompositeDisposable, NotificationManager, Wsync, exec, fs, os, path, _ref;

  _ref = require('atom'), NotificationManager = _ref.NotificationManager, CompositeDisposable = _ref.CompositeDisposable;

  os = require('os');

  fs = require('fs');

  path = require('path');

  exec = require('child_process').exec;

  module.exports = Wsync = {
    config: {
      localRepoBasePath: {
        type: 'string',
        "default": 'CHANGE_ME',
        description: "Absolute path to your local repository."
      },
      pathRepo: {
        type: 'string',
        "default": 'CHANGE_ME',
        description: "Name of your repo on PATH."
      }
    },
    sassCompileBlock: null,
    activate: function(state) {
      var msg, self;
      self = this;
      if (!this.checkSettings) {
        msg = "One or all of your settings for Wsync are not setup. Wsync will not\nwork until these settings are setup.\n\n\nFor more information, see README.md.";
        atom.notifications.addError('Error!', {
          detail: msg,
          dismissable: true
        });
      }
      this.subs = new CompositeDisposable;
      this.subs.add(atom.commands.add('atom-workspace', {
        'wsync:sync-project': (function(_this) {
          return function() {
            return _this.wsyncProject();
          };
        })(this),
        'wsync:compile-path-sass': (function(_this) {
          return function() {
            return _this.wsyncCompileSass();
          };
        })(this)
      }));
      return atom.workspace.observeTextEditors(function(editor) {
        return editor.onDidSave(function(event) {
          return self.wsyncFile(event);
        });
      });
    },
    checkSettings: function() {
      var good;
      good = true;
      if (atom.config.get('atom-wsync.localRepoBasePath') === 'CHANGE_ME') {
        good = false;
      }
      if (atom.config.get('atom-wsync.pathRepo') === 'CHANGE_ME') {
        good = false;
      }
      return good;
    },
    wsyncFile: function(event) {
      var cmd, filePath, localBase, remoteBase, repo;
      if (!this.checkSettings) {
        return;
      }
      localBase = atom.config.get('atom-wsync.localRepoBasePath').trim();
      if (event.path.indexOf(localBase) > -1) {
        filePath = event.path.replace(localBase, '');
        repo = atom.config.get('atom-wsync.pathRepo').trim();
        remoteBase = "path:/nfs/repos-sf/" + repo;
        cmd = "scp " + (localBase + filePath) + " " + (remoteBase + filePath);
        return exec(cmd, function(err, stdout, stderr) {
          if (err) {
            atom.notifications.addError('Error!', {
              detail: err,
              dismissable: true
            });
            return;
          }
          if (stderr) {
            atom.notifications.addError('Standard Error!', {
              detail: stderr,
              dismissable: true
            });
            return;
          }
          return atom.notifications.addSuccess('File Synced', {
            detail: stdout
          });
        });
      }
    },
    wsyncProject: function() {
      var cmd, localBase, remoteBase, repo, rsyncOptions;
      if (!this.checkSettings) {
        return;
      }
      localBase = atom.config.get('atom-wsync.localRepoBasePath').trim();
      repo = atom.config.get('atom-wsync.pathRepo').trim();
      rsyncOptions = "-avz --delete --exclude=.git --filter=\"dir-merge,- .gitignore\"";
      remoteBase = "path:/nfs/repos-sf/" + repo;
      cmd = "rsync " + rsyncOptions + " " + localBase + "/ -e ssh " + remoteBase;
      return exec(cmd, function(err, stdout, stderr) {
        if (err) {
          atom.notifications.addError('Error!', {
            detail: err,
            dismissable: true
          });
          return;
        }
        if (stderr) {
          atom.notifications.addError('Standard Error!', {
            detail: stderr,
            dismissable: true
          });
          return;
        }
        return atom.notifications.addSuccess('Project Synced', {
          detail: stdout
        });
      });
    },
    wsyncCompileSass: function() {
      var cmd, repo, self;
      self = this;
      if (!this.checkSettings) {
        return;
      }
      repo = atom.config.get('atom-wsync.pathRepo').trim();
      cmd = "ssh path.intern.weebly.net 'cd /nfs/repos-sf/" + repo + " && ./build/compile_sass.sh'";
      if (this.sassCompileBlock) {
        atom.notifications.addWarning("Wsync sass compiling is being blocked...", {
          detail: "The previous compile process has not completed yet.",
          dismissable: false
        });
        return;
      }
      atom.notifications.addInfo('Compiling sass...', {
        detail: 'This may take a while.'
      });
      this.sassCompileBlock = true;
      return exec(cmd, function(err, stdout, stderr) {
        stdout = stdout.replace(/\[(\d*m)/g, '');
        atom.notifications.addSuccess('Sass Compiled', {
          detail: stdout,
          dismissable: true
        });
        return self.sassCompileBlock = false;
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkL2F0b20tcGFja2FnZXMvYXRvbS13c3luYy9saWIvd3N5bmMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHlFQUFBOztBQUFBLEVBQUEsT0FBNkMsT0FBQSxDQUFRLE1BQVIsQ0FBN0MsRUFBQywyQkFBQSxtQkFBRCxFQUFzQiwyQkFBQSxtQkFBdEIsQ0FBQTs7QUFBQSxFQUVBLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQUZMLENBQUE7O0FBQUEsRUFHQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FITCxDQUFBOztBQUFBLEVBSUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBSlAsQ0FBQTs7QUFBQSxFQUtBLElBQUEsR0FBTyxPQUFBLENBQVEsZUFBUixDQUF3QixDQUFDLElBTGhDLENBQUE7O0FBQUEsRUFPQSxNQUFNLENBQUMsT0FBUCxHQUFpQixLQUFBLEdBRWI7QUFBQSxJQUFBLE1BQUEsRUFDSTtBQUFBLE1BQUEsaUJBQUEsRUFDSTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxXQURUO0FBQUEsUUFFQSxXQUFBLEVBQWEseUNBRmI7T0FESjtBQUFBLE1BSUEsUUFBQSxFQUNJO0FBQUEsUUFBQSxJQUFBLEVBQU0sUUFBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLFdBRFQ7QUFBQSxRQUVBLFdBQUEsRUFBYSw0QkFGYjtPQUxKO0tBREo7QUFBQSxJQVVBLGdCQUFBLEVBQWtCLElBVmxCO0FBQUEsSUFZQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFDTixVQUFBLFNBQUE7QUFBQSxNQUFBLElBQUEsR0FBTyxJQUFQLENBQUE7QUFFQSxNQUFBLElBQUcsQ0FBQSxJQUFFLENBQUEsYUFBTDtBQUNJLFFBQUEsR0FBQSxHQUFNLHFKQUFO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

//# sourceURL=/Users/muhammad/atom-packages/atom-wsync/lib/wsync.coffee
