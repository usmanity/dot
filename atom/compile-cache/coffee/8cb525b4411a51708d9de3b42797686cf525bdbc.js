(function() {
  var Breakpoint, CompositeDisposable, Emitter, GlobalContext, PhpDebug, PhpDebugBreakpointsUri, PhpDebugContextUri, PhpDebugStackUri, PhpDebugUnifiedUri, PhpDebugWatchUri, Watchpoint, createBreakpointsView, createContextView, createWatchView, events, helpers;

  CompositeDisposable = require('atom').CompositeDisposable;

  Emitter = require('event-kit').Emitter;

  events = require('events');

  Breakpoint = require('./models/breakpoint');

  Watchpoint = require('./models/watchpoint');

  GlobalContext = require('./models/global-context');

  helpers = require('./helpers');

  PhpDebugContextUri = "phpdebug://context";

  PhpDebugStackUri = "phpdebug://stack";

  PhpDebugBreakpointsUri = "phpdebug://breakpoints";

  PhpDebugWatchUri = "phpdebug://watch";

  PhpDebugUnifiedUri = "phpdebug://unified";

  createContextView = function(state) {
    var PhpDebugContextView;
    PhpDebugContextView = require('./context/php-debug-context-view');
    return this.contextView = new PhpDebugContextView(state);
  };

  createBreakpointsView = function(state) {
    var PhpDebugBreakpointView;
    PhpDebugBreakpointView = require('./breakpoint/php-debug-breakpoint-view');
    return this.breakpointView = new PhpDebugBreakpointView(state);
  };

  createWatchView = function(state) {
    var PhpDebugWatchView;
    PhpDebugWatchView = require('./watch/php-debug-watch-view');
    return this.watchView = new PhpDebugWatchView(state);
  };

  module.exports = PhpDebug = {
    subscriptions: null,
    config: {
      CustomExceptions: {
        type: 'array',
        "default": [],
        items: {
          type: 'string'
        },
        description: "Custom Exceptions to break on"
      },
      PathMaps: {
        type: 'array',
        "default": [],
        items: {
          type: 'object',
          properties: {
            from: {
              type: 'string'
            },
            to: {
              type: 'string'
            }
          }
        }
      },
      ServerPort: {
        type: 'integer',
        "default": 9000
      },
      MaxChildren: {
        type: 'integer',
        "default": 32
      },
      MaxData: {
        type: 'integer',
        "default": 1024
      },
      MaxDepth: {
        type: 'integer',
        "default": 4
      },
      PhpException: {
        type: 'object',
        properties: {
          FatalError: {
            type: 'boolean',
            "default": true
          },
          CatchableFatalError: {
            type: 'boolean',
            "default": true
          },
          Notice: {
            type: 'boolean',
            "default": true
          },
          Warning: {
            type: 'boolean',
            "default": true
          },
          Deprecated: {
            type: 'boolean',
            "default": true
          },
          StrictStandards: {
            type: 'boolean',
            "default": true
          },
          ParseError: {
            type: 'boolean',
            "default": true
          },
          Xdebug: {
            type: 'boolean',
            "default": true
          },
          UnknownError: {
            type: 'boolean',
            "default": true
          }
        }
      }
    },
    activate: function(state) {
      var Dbgp;
      if (state) {
        this.GlobalContext = atom.deserializers.deserialize(state);
      }
      if (!this.GlobalContext) {
        this.GlobalContext = new GlobalContext();
      }
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'php-debug:toggleBreakpoint': (function(_this) {
          return function() {
            return _this.toggleBreakpoint();
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'php-debug:toggleDebugging': (function(_this) {
          return function() {
            return _this.toggleDebugging();
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'php-debug:run': (function(_this) {
          return function() {
            return _this.run();
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'php-debug:stepOver': (function(_this) {
          return function() {
            return _this.stepOver();
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'php-debug:stepIn': (function(_this) {
          return function() {
            return _this.stepIn();
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'php-debug:stepOut': (function(_this) {
          return function() {
            return _this.stepOut();
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'php-debug:clearAllBreakpoints': (function(_this) {
          return function() {
            return _this.clearAllBreakpoints();
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'php-debug:clearAllWatchpoints': (function(_this) {
          return function() {
            return _this.clearAllWatchpoints();
          };
        })(this)
      }));
      this.subscriptions.add(atom.workspace.addOpener((function(_this) {
        return function(filePath) {
          switch (filePath) {
            case PhpDebugContextUri:
              return createContextView({
                uri: PhpDebugContextUri
              });
            case PhpDebugBreakpointsUri:
              return createBreakpointsView({
                uri: PhpDebugBreakpointsUri
              });
            case PhpDebugWatchUri:
              return createWatchView({
                uri: PhpDebugWatchUri
              });
            case PhpDebugUnifiedUri:
              return _this.createUnifiedView({
                uri: PhpDebugUnifiedUri,
                context: _this.GlobalContext
              });
          }
        };
      })(this)));
      Dbgp = require('./engines/dbgp/dbgp');
      this.dbgp = new Dbgp({
        context: this.GlobalContext,
        serverPort: atom.config.get('php-debug.ServerPort')
      });
      this.GlobalContext.onBreak((function(_this) {
        return function(breakpoint) {
          return _this.doBreak(breakpoint);
        };
      })(this));
      this.GlobalContext.onRunning((function(_this) {
        return function() {
          if (_this.currentBreakDecoration) {
            return _this.currentBreakDecoration.destroy();
          }
        };
      })(this));
      this.GlobalContext.onWatchpointsChange((function(_this) {
        return function() {
          if (_this.GlobalContext.getCurrentDebugContext()) {
            return _this.GlobalContext.getCurrentDebugContext().syncCurrentContext();
          }
        };
      })(this));
      this.GlobalContext.onBreakpointsChange((function(_this) {
        return function(event) {
          var breakpoint, _i, _j, _len, _len1, _ref, _ref1, _results;
          if (_this.GlobalContext.getCurrentDebugContext()) {
            if (event.removed) {
              _ref = event.removed;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                breakpoint = _ref[_i];
                _this.GlobalContext.getCurrentDebugContext().executeBreakpointRemove(breakpoint);
              }
            }
            if (event.added) {
              _ref1 = event.added;
              _results = [];
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                breakpoint = _ref1[_j];
                _results.push(_this.GlobalContext.getCurrentDebugContext().executeBreakpoint(breakpoint));
              }
              return _results;
            }
          }
        };
      })(this));
      return atom.workspace.observeTextEditors((function(_this) {
        return function(editor) {
          var breakpoint, marker, _i, _len, _ref, _results;
          _ref = _this.GlobalContext.getBreakpoints();
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            breakpoint = _ref[_i];
            if (breakpoint.getPath() === editor.getPath()) {
              marker = _this.addBreakpointMarker(breakpoint.getLine(), editor);
              _results.push(breakpoint.setMarker(marker));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        };
      })(this));
    },
    createUnifiedView: function(state) {
      var PhpDebugUnifiedView;
      PhpDebugUnifiedView = require('./unified/php-debug-unified-view');
      return new PhpDebugUnifiedView(state);
    },
    serialize: function() {
      return this.GlobalContext.serialize();
    },
    deactivate: function() {
      this.modalPanel.destroy();
      return this.subscriptions.dispose();
    },
    updateDebugContext: function(data) {
      return this.contextView.setDebugContext(data);
    },
    doBreak: function(breakpoint) {
      var filepath;
      filepath = breakpoint.getPath();
      filepath = helpers.remotePathToLocal(filepath);
      atom.workspace.open(filepath, {
        searchAllPanes: true,
        activatePane: true
      }).then((function(_this) {
        return function(editor) {
          var line, marker, range, type;
          if (_this.currentBreakDecoration) {
            _this.currentBreakDecoration.destroy();
          }
          line = breakpoint.getLine();
          range = [[line - 1, 0], [line - 1, 0]];
          marker = editor.markBufferRange(range, {
            invalidate: 'surround'
          });
          type = breakpoint.getType();
          _this.currentBreakDecoration = editor.decorateMarker(marker, {
            type: 'line',
            "class": 'debug-break-' + type
          });
          return editor.scrollToBufferPosition([line - 1, 0]);
        };
      })(this));
      return this.GlobalContext.getCurrentDebugContext().syncCurrentContext();
    },
    addBreakpointMarker: (function(_this) {
      return function(line, editor) {
        var decoration, marker, range;
        range = [[line - 1, 0], [line - 1, 0]];
        marker = editor.markBufferRange(range);
        decoration = editor.decorateMarker(marker, {
          type: 'line-number',
          "class": 'php-debug-breakpoint'
        });
        return marker;
      };
    })(this),
    toggle: function() {
      var editor, marker, range;
      editor = atom.workspace.getActivePaneItem();
      range = editor.getSelectedBufferRange();
      return marker = editor.markBufferRange(range);
    },
    toggleDebugging: function() {
      var pane;
      if (this.currentBreakDecoration) {
        this.currentBreakDecoration.destroy();
      }
      pane = atom.workspace.paneForItem(this.unifiedWindow);
      if (!pane) {
        this.showWindows();
        if (!this.dbgp.listening()) {
          return this.dbgp.listen();
        }
      } else {
        pane.destroy();
        delete this.unifiedWindow;
        return this.dbgp.close();
      }
    },
    run: function() {
      if (this.GlobalContext.getCurrentDebugContext()) {
        return this.GlobalContext.getCurrentDebugContext().executeRun();
      }
    },
    stepOver: function() {
      if (this.GlobalContext.getCurrentDebugContext()) {
        return this.GlobalContext.getCurrentDebugContext()["continue"]("step_over");
      }
    },
    stepIn: function() {
      if (this.GlobalContext.getCurrentDebugContext()) {
        return this.GlobalContext.getCurrentDebugContext()["continue"]("step_into");
      }
    },
    stepOut: function() {
      if (this.GlobalContext.getCurrentDebugContext()) {
        return this.GlobalContext.getCurrentDebugContext()["continue"]("step_out");
      }
    },
    clearAllBreakpoints: function() {
      return this.GlobalContext.setBreakpoints([]);
    },
    clearAllWatchpoints: function() {
      return this.GlobalContext.setWatchpoints([]);
    },
    showWindows: function() {
      var editor;
      editor = atom.workspace.getActivePane();
      editor.splitDown();
      return atom.workspace.open(PhpDebugUnifiedUri).then((function(_this) {
        return function(unifiedWindow) {
          return _this.unifiedWindow = unifiedWindow;
        };
      })(this));
    },
    toggleBreakpoint: function() {
      var breakpoint, editor, marker, path, range, removed;
      editor = atom.workspace.getActivePaneItem();
      range = editor.getSelectedBufferRange();
      path = editor.getPath();
      breakpoint = new Breakpoint({
        filepath: path,
        line: range.getRows()[0] + 1
      });
      removed = this.GlobalContext.removeBreakpoint(breakpoint);
      if (removed) {
        if (removed.getMarker()) {
          return removed.getMarker().destroy();
        }
      } else {
        marker = this.addBreakpointMarker(range.getRows()[0] + 1, editor);
        breakpoint.setMarker(marker);
        return this.GlobalContext.addBreakpoint(breakpoint);
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3BocC1kZWJ1Zy9saWIvcGhwLWRlYnVnLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSw2UEFBQTs7QUFBQSxFQUFDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFBRCxDQUFBOztBQUFBLEVBQ0MsVUFBVyxPQUFBLENBQVEsV0FBUixFQUFYLE9BREQsQ0FBQTs7QUFBQSxFQUVBLE1BQUEsR0FBUyxPQUFBLENBQVEsUUFBUixDQUZULENBQUE7O0FBQUEsRUFJQSxVQUFBLEdBQWdCLE9BQUEsQ0FBUSxxQkFBUixDQUpoQixDQUFBOztBQUFBLEVBS0EsVUFBQSxHQUFnQixPQUFBLENBQVEscUJBQVIsQ0FMaEIsQ0FBQTs7QUFBQSxFQU1BLGFBQUEsR0FBZ0IsT0FBQSxDQUFRLHlCQUFSLENBTmhCLENBQUE7O0FBQUEsRUFPQSxPQUFBLEdBQWlCLE9BQUEsQ0FBUSxXQUFSLENBUGpCLENBQUE7O0FBQUEsRUFTQSxrQkFBQSxHQUFxQixvQkFUckIsQ0FBQTs7QUFBQSxFQVVBLGdCQUFBLEdBQW1CLGtCQVZuQixDQUFBOztBQUFBLEVBV0Esc0JBQUEsR0FBeUIsd0JBWHpCLENBQUE7O0FBQUEsRUFZQSxnQkFBQSxHQUFtQixrQkFabkIsQ0FBQTs7QUFBQSxFQWFBLGtCQUFBLEdBQXFCLG9CQWJyQixDQUFBOztBQUFBLEVBZUEsaUJBQUEsR0FBcUIsU0FBQyxLQUFELEdBQUE7QUFDbkIsUUFBQSxtQkFBQTtBQUFBLElBQUEsbUJBQUEsR0FBc0IsT0FBQSxDQUFRLGtDQUFSLENBQXRCLENBQUE7V0FDQSxJQUFDLENBQUEsV0FBRCxHQUFtQixJQUFBLG1CQUFBLENBQW9CLEtBQXBCLEVBRkE7RUFBQSxDQWZyQixDQUFBOztBQUFBLEVBbUJBLHFCQUFBLEdBQXlC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

//# sourceURL=/Users/muhammad/.atom/packages/php-debug/lib/php-debug.coffee
