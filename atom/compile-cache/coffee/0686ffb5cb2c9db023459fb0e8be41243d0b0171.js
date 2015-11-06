(function() {
  var Dbgp, DbgpInstance, DebugContext, Disposable, Emitter, Q, Watchpoint, parseString, _ref;

  parseString = require('xml2js').parseString;

  Q = require('q');

  _ref = require('event-kit'), Emitter = _ref.Emitter, Disposable = _ref.Disposable;

  DebugContext = require('../../models/debug-context');

  Watchpoint = require('../../models/watchpoint');

  DbgpInstance = require('./dbgp-instance');

  module.exports = Dbgp = (function() {
    function Dbgp(params) {
      this.emitter = new Emitter;
      this.buffer = '';
      this.GlobalContext = params.context;
      this.serverPort = params.serverPort;
    }

    Dbgp.prototype.listening = function() {
      return this.server !== void 0;
    };

    Dbgp.prototype.running = function() {
      return this.socket && this.socket.readyState === 1;
    };

    Dbgp.prototype.listen = function(options) {
      var buffer, net;
      this.debugContext = new DebugContext;
      net = require("net");
      buffer = '';
      console.log("Listening on Port " + this.serverPort);
      return this.server = net.createServer((function(_this) {
        return function(socket) {
          var instance;
          socket.setEncoding('utf8');
          if (!_this.GlobalContext.getCurrentDebugContext()) {
            console.log("Session initiated");
            return instance = new DbgpInstance({
              socket: socket,
              context: _this.GlobalContext
            });
          } else {
            console.log("New session rejected");
            return socket.end();
          }
        };
      })(this)).listen(this.serverPort);
    };

    Dbgp.prototype.close = function(options) {
      if (!!this.socket) {
        this.socket.end();
        delete this.socket;
      }
      if (!!this.server) {
        this.server.close();
        delete this.server;
      }
      return console.log("closed");
    };

    return Dbgp;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3BocC1kZWJ1Zy9saWIvZW5naW5lcy9kYmdwL2RiZ3AuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVGQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxRQUFSLENBQWlCLENBQUMsV0FBaEMsQ0FBQTs7QUFBQSxFQUNBLENBQUEsR0FBSSxPQUFBLENBQVEsR0FBUixDQURKLENBQUE7O0FBQUEsRUFFQSxPQUF3QixPQUFBLENBQVEsV0FBUixDQUF4QixFQUFDLGVBQUEsT0FBRCxFQUFVLGtCQUFBLFVBRlYsQ0FBQTs7QUFBQSxFQUlBLFlBQUEsR0FBZSxPQUFBLENBQVEsNEJBQVIsQ0FKZixDQUFBOztBQUFBLEVBS0EsVUFBQSxHQUFhLE9BQUEsQ0FBUSx5QkFBUixDQUxiLENBQUE7O0FBQUEsRUFNQSxZQUFBLEdBQWUsT0FBQSxDQUFRLGlCQUFSLENBTmYsQ0FBQTs7QUFBQSxFQVFBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDUyxJQUFBLGNBQUMsTUFBRCxHQUFBO0FBQ1gsTUFBQSxJQUFDLENBQUEsT0FBRCxHQUFXLEdBQUEsQ0FBQSxPQUFYLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxNQUFELEdBQVUsRUFEVixDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsYUFBRCxHQUFpQixNQUFNLENBQUMsT0FGeEIsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLFVBQUQsR0FBYyxNQUFNLENBQUMsVUFIckIsQ0FEVztJQUFBLENBQWI7O0FBQUEsbUJBTUEsU0FBQSxHQUFXLFNBQUEsR0FBQTtBQUNULGFBQU8sSUFBQyxDQUFBLE1BQUQsS0FBVyxNQUFsQixDQURTO0lBQUEsQ0FOWCxDQUFBOztBQUFBLG1CQVNBLE9BQUEsR0FBUyxTQUFBLEdBQUE7QUFDUCxhQUFPLElBQUMsQ0FBQSxNQUFELElBQVcsSUFBQyxDQUFBLE1BQU0sQ0FBQyxVQUFSLEtBQXNCLENBQXhDLENBRE87SUFBQSxDQVRULENBQUE7O0FBQUEsbUJBWUEsTUFBQSxHQUFRLFNBQUMsT0FBRCxHQUFBO0FBRU4sVUFBQSxXQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsWUFBRCxHQUFnQixHQUFBLENBQUEsWUFBaEIsQ0FBQTtBQUFBLE1BQ0EsR0FBQSxHQUFNLE9BQUEsQ0FBUSxLQUFSLENBRE4sQ0FBQTtBQUFBLE1BRUEsTUFBQSxHQUFTLEVBRlQsQ0FBQTtBQUFBLE1BR0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxvQkFBQSxHQUF1QixJQUFDLENBQUEsVUFBcEMsQ0FIQSxDQUFBO2FBSUEsSUFBQyxDQUFBLE1BQUQsR0FBVSxHQUFHLENBQUMsWUFBSixDQUFrQixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxNQUFELEdBQUE7QUFFMUIsY0FBQSxRQUFBO0FBQUEsVUFBQSxNQUFNLENBQUMsV0FBUCxDQUFtQixNQUFuQixDQUFBLENBQUE7QUFDQSxVQUFBLElBQUcsQ0FBQSxLQUFFLENBQUEsYUFBYSxDQUFDLHNCQUFmLENBQUEsQ0FBSjtBQUNFLFlBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxtQkFBWixDQUFBLENBQUE7bUJBQ0EsUUFBQSxHQUFlLElBQUEsWUFBQSxDQUFhO0FBQUEsY0FBQSxNQUFBLEVBQU8sTUFBUDtBQUFBLGNBQWUsT0FBQSxFQUFRLEtBQUMsQ0FBQSxhQUF4QjthQUFiLEVBRmpCO1dBQUEsTUFBQTtBQUlFLFlBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxzQkFBWixDQUFBLENBQUE7bUJBQ0EsTUFBTSxDQUFDLEdBQVAsQ0FBQSxFQUxGO1dBSDBCO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbEIsQ0FTVCxDQUFDLE1BVFEsQ0FTRCxJQUFDLENBQUEsVUFUQSxFQU5KO0lBQUEsQ0FaUixDQUFBOztBQUFBLG1CQTZCQSxLQUFBLEdBQU8sU0FBQyxPQUFELEdBQUE7QUFDTCxNQUFBLElBQUEsQ0FBQSxDQUFPLElBQUUsQ0FBQSxNQUFUO0FBQ0UsUUFBQSxJQUFDLENBQUEsTUFBTSxDQUFDLEdBQVIsQ0FBQSxDQUFBLENBQUE7QUFBQSxRQUNBLE1BQUEsQ0FBQSxJQUFRLENBQUEsTUFEUixDQURGO09BQUE7QUFHQSxNQUFBLElBQUEsQ0FBQSxDQUFPLElBQUUsQ0FBQSxNQUFUO0FBQ0UsUUFBQSxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQVIsQ0FBQSxDQUFBLENBQUE7QUFBQSxRQUNBLE1BQUEsQ0FBQSxJQUFRLENBQUEsTUFEUixDQURGO09BSEE7YUFNQSxPQUFPLENBQUMsR0FBUixDQUFZLFFBQVosRUFQSztJQUFBLENBN0JQLENBQUE7O2dCQUFBOztNQVZGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/muhammad/.atom/packages/php-debug/lib/engines/dbgp/dbgp.coffee
