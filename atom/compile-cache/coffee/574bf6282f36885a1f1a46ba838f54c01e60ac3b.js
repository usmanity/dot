(function() {
  var Rsync, yellowpage;

  Rsync = require('rsync');

  yellowpage = {
    1: 'Syntax or usage error',
    2: 'Protocol incompatibility',
    3: 'Errors selecting input/output files, dirs',
    4: 'Requested action not supported: an attempt was made to manipulate 64-bit files on a platform that cannot support them; or an option was specified that is supported by the client and not by the server.',
    5: 'Error starting client-server protocol',
    6: 'Daemon unable to append to log-file',
    10: 'Error in socket I/O',
    11: 'Error in file I/O',
    12: 'Error in rsync protocol data stream',
    13: 'Errors with program diagnostics',
    14: 'Error in IPC code',
    20: 'Received SIGUSR1 or SIGINT',
    21: 'Some error returned by waitpid()',
    22: 'Error allocating core memory buffers',
    23: 'Partial transfer due to error',
    24: 'Partial transfer due to vanished source files',
    25: 'The --max-delete limit stopped deletions',
    30: 'Timeout in data send/receive',
    35: 'Timeout waiting for daemon connection',
    255: 'SSH connection failed'
  };

  module.exports = function(opt) {
    var config, dst, error, flags, progress, rsync, src, success, _ref, _ref1, _ref2;
    if (opt == null) {
      opt = {};
    }
    src = opt.src;
    dst = opt.dst;
    config = opt.config;
    flags = (_ref = config != null ? config.flags : void 0) != null ? _ref : 'avzpu';
    success = opt.success;
    error = opt.error;
    progress = opt.progress;
    rsync = new Rsync().shell('ssh').flags('avzpu').source(src).destination(dst).output(function(data) {
      return typeof progress === "function" ? progress(data.toString('utf-8').trim()) : void 0;
    });
    if ((_ref1 = config.option) != null ? _ref1.deleteFiles : void 0) {
      rsync["delete"]();
    }
    if ((_ref2 = config.option) != null ? _ref2.exclude : void 0) {
      rsync.exclude(config.option.exclude);
    }
    return rsync.execute((function(_this) {
      return function(err, code, cmd) {
        var _ref3;
        if (err) {
          return typeof error === "function" ? error((_ref3 = yellowpage[code]) != null ? _ref3 : err.message, cmd) : void 0;
        } else {
          return typeof success === "function" ? success() : void 0;
        }
      };
    })(this));
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL2F0b20tc3luYy9saWIvc2VydmljZS9yc3luYy1zZXJ2aWNlLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxpQkFBQTs7QUFBQSxFQUFBLEtBQUEsR0FBUSxPQUFBLENBQVEsT0FBUixDQUFSLENBQUE7O0FBQUEsRUFFQSxVQUFBLEdBQ0k7QUFBQSxJQUFBLENBQUEsRUFBRyx1QkFBSDtBQUFBLElBQ0EsQ0FBQSxFQUFHLDBCQURIO0FBQUEsSUFFQSxDQUFBLEVBQUcsMkNBRkg7QUFBQSxJQUdBLENBQUEsRUFBRywwTUFISDtBQUFBLElBSUEsQ0FBQSxFQUFHLHVDQUpIO0FBQUEsSUFLQSxDQUFBLEVBQUcscUNBTEg7QUFBQSxJQU1BLEVBQUEsRUFBSSxxQkFOSjtBQUFBLElBT0EsRUFBQSxFQUFJLG1CQVBKO0FBQUEsSUFRQSxFQUFBLEVBQUkscUNBUko7QUFBQSxJQVNBLEVBQUEsRUFBSSxpQ0FUSjtBQUFBLElBVUEsRUFBQSxFQUFJLG1CQVZKO0FBQUEsSUFXQSxFQUFBLEVBQUksNEJBWEo7QUFBQSxJQVlBLEVBQUEsRUFBSSxrQ0FaSjtBQUFBLElBYUEsRUFBQSxFQUFJLHNDQWJKO0FBQUEsSUFjQSxFQUFBLEVBQUksK0JBZEo7QUFBQSxJQWVBLEVBQUEsRUFBSSwrQ0FmSjtBQUFBLElBZ0JBLEVBQUEsRUFBSSwwQ0FoQko7QUFBQSxJQWlCQSxFQUFBLEVBQUksOEJBakJKO0FBQUEsSUFrQkEsRUFBQSxFQUFJLHVDQWxCSjtBQUFBLElBbUJBLEdBQUEsRUFBSyx1QkFuQkw7R0FISixDQUFBOztBQUFBLEVBd0JBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsR0FBRCxHQUFBO0FBQ2IsUUFBQSw0RUFBQTs7TUFEYyxNQUFNO0tBQ3BCO0FBQUEsSUFBQSxHQUFBLEdBQU0sR0FBRyxDQUFDLEdBQVYsQ0FBQTtBQUFBLElBQ0EsR0FBQSxHQUFNLEdBQUcsQ0FBQyxHQURWLENBQUE7QUFBQSxJQUVBLE1BQUEsR0FBUyxHQUFHLENBQUMsTUFGYixDQUFBO0FBQUEsSUFHQSxLQUFBLG9FQUF3QixPQUh4QixDQUFBO0FBQUEsSUFJQSxPQUFBLEdBQVUsR0FBRyxDQUFDLE9BSmQsQ0FBQTtBQUFBLElBS0EsS0FBQSxHQUFRLEdBQUcsQ0FBQyxLQUxaLENBQUE7QUFBQSxJQU1BLFFBQUEsR0FBVyxHQUFHLENBQUMsUUFOZixDQUFBO0FBQUEsSUFRQSxLQUFBLEdBQVksSUFBQSxLQUFBLENBQUEsQ0FDUixDQUFDLEtBRE8sQ0FDRCxLQURDLENBRVIsQ0FBQyxLQUZPLENBRUQsT0FGQyxDQUdSLENBQUMsTUFITyxDQUdBLEdBSEEsQ0FJUixDQUFDLFdBSk8sQ0FJSyxHQUpMLENBS1IsQ0FBQyxNQUxPLENBS0EsU0FBQyxJQUFELEdBQUE7OENBQ0osU0FBVSxJQUFJLENBQUMsUUFBTCxDQUFjLE9BQWQsQ0FBc0IsQ0FBQyxJQUF2QixDQUFBLFlBRE47SUFBQSxDQUxBLENBUlosQ0FBQTtBQWdCQSxJQUFBLDJDQUErQixDQUFFLG9CQUFqQztBQUFBLE1BQUEsS0FBSyxDQUFDLFFBQUQsQ0FBTCxDQUFBLENBQUEsQ0FBQTtLQWhCQTtBQWlCQSxJQUFBLDJDQUFvRCxDQUFFLGdCQUF0RDtBQUFBLE1BQUEsS0FBSyxDQUFDLE9BQU4sQ0FBYyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQTVCLENBQUEsQ0FBQTtLQWpCQTtXQWtCQSxLQUFLLENBQUMsT0FBTixDQUFjLENBQUEsU0FBQSxLQUFBLEdBQUE7YUFBQSxTQUFDLEdBQUQsRUFBTSxJQUFOLEVBQVksR0FBWixHQUFBO0FBQ1YsWUFBQSxLQUFBO0FBQUEsUUFBQSxJQUFHLEdBQUg7K0NBQ0ksbURBQTJCLEdBQUcsQ0FBQyxTQUFVLGNBRDdDO1NBQUEsTUFBQTtpREFHSSxtQkFISjtTQURVO01BQUEsRUFBQTtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBZCxFQW5CYTtFQUFBLENBeEJqQixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/muhammad/.atom/packages/atom-sync/lib/service/rsync-service.coffee
