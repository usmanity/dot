(function() {
  var $$, AnsiFilter, HeaderView, ScriptOptionsView, ScriptView, View, linkPaths, stripAnsi, _, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  HeaderView = require('./header-view');

  ScriptOptionsView = require('./script-options-view');

  _ref = require('atom-space-pen-views'), View = _ref.View, $$ = _ref.$$;

  AnsiFilter = require('ansi-to-html');

  stripAnsi = require('strip-ansi');

  linkPaths = require('./link-paths');

  _ = require('underscore');

  module.exports = ScriptView = (function(_super) {
    __extends(ScriptView, _super);

    function ScriptView() {
      this.setHeaderAndShowExecutionTime = __bind(this.setHeaderAndShowExecutionTime, this);
      return ScriptView.__super__.constructor.apply(this, arguments);
    }

    ScriptView.results = "";

    ScriptView.content = function() {
      return this.div((function(_this) {
        return function() {
          var css;
          _this.subview('headerView', new HeaderView());
          css = 'tool-panel panel panel-bottom padding script-view native-key-bindings';
          return _this.div({
            "class": css,
            outlet: 'script',
            tabindex: -1
          }, function() {
            return _this.div({
              "class": 'panel-body padded output',
              outlet: 'output'
            });
          });
        };
      })(this));
    };

    ScriptView.prototype.initialize = function(serializeState) {
      this.ansiFilter = new AnsiFilter;
      return linkPaths.listen(this);
    };

    ScriptView.prototype.serialize = function() {};

    ScriptView.prototype.setHeaderAndShowExecutionTime = function(returnCode, executionTime) {
      this.display('stdout', '[Finished in ' + executionTime.toString() + 's]');
      if (returnCode === 0) {
        return this.setHeaderStatus('stop');
      } else {
        return this.setHeaderStatus('err');
      }
    };

    ScriptView.prototype.resetView = function(title) {
      if (title == null) {
        title = 'Loading...';
      }
      if (!this.hasParent()) {
        atom.workspace.addBottomPanel({
          item: this
        });
      }
      this.stop();
      this.headerView.title.text(title);
      this.headerView.setStatus('start');
      this.output.empty();
      return this.results = "";
    };

    ScriptView.prototype.close = function() {
      var grandParent;
      this.stop();
      if (this.hasParent()) {
        grandParent = this.script.parent().parent();
        this.detach();
        return grandParent.remove();
      }
    };

    ScriptView.prototype.stop = function() {
      this.display('stdout', '^C');
      return this.headerView.setStatus('kill');
    };

    ScriptView.prototype.createGitHubIssueLink = function(argType, lang) {
      var body, encodedURI, err, title;
      title = "Add " + argType + " support for " + lang;
      body = "##### Platform: `" + process.platform + "`\n---";
      encodedURI = encodeURI("https://github.com/rgbkrk/atom-script/issues/new?title=" + title + "&body=" + body);
      encodedURI = encodedURI.replace(/#/g, '%23');
      err = $$(function() {
        this.p({
          "class": 'block'
        }, "" + argType + " runner not available for " + lang + ".");
        return this.p({
          "class": 'block'
        }, (function(_this) {
          return function() {
            _this.text('If it should exist, add an ');
            _this.a({
              href: encodedURI
            }, 'issue on GitHub');
            return _this.text(', or send your own pull request.');
          };
        })(this));
      });
      return this.handleError(err);
    };

    ScriptView.prototype.showUnableToRunError = function(command) {
      return this.output.append($$(function() {
        this.h1('Unable to run');
        this.pre(_.escape(command));
        this.h2('Did you start Atom from the command line?');
        this.pre('  atom .');
        this.h2('Is it in your PATH?');
        return this.pre("PATH: " + (_.escape(process.env.PATH)));
      }));
    };

    ScriptView.prototype.showNoLanguageSpecified = function() {
      var err;
      err = $$(function() {
        return this.p('You must select a language in the lower right, or save the file with an appropriate extension.');
      });
      return this.handleError(err);
    };

    ScriptView.prototype.showLanguageNotSupported = function(lang) {
      var err;
      err = $$(function() {
        this.p({
          "class": 'block'
        }, "Command not configured for " + lang + "!");
        return this.p({
          "class": 'block'
        }, (function(_this) {
          return function() {
            _this.text('Add an ');
            _this.a({
              href: "https://github.com/rgbkrk/atom-script/issues/new?title=Add%20support%20for%20" + lang
            }, 'issue on GitHub');
            return _this.text(' or send your own Pull Request.');
          };
        })(this));
      });
      return this.handleError(err);
    };

    ScriptView.prototype.handleError = function(err) {
      this.headerView.title.text('Error');
      this.headerView.setStatus('err');
      this.output.append(err);
      return this.stop();
    };

    ScriptView.prototype.setHeaderStatus = function(status) {
      return this.headerView.setStatus(status);
    };

    ScriptView.prototype.setHeaderTitle = function(title) {
      return this.headerView.title.text(title);
    };

    ScriptView.prototype.display = function(css, line) {
      var lessThanFull, padding, scrolledToEnd;
      this.results += line;
      if (atom.config.get('script.escapeConsoleOutput')) {
        line = _.escape(line);
      }
      line = this.ansiFilter.toHtml(line);
      line = linkPaths(line);
      padding = parseInt(this.output.css('padding-bottom'));
      scrolledToEnd = this.script.scrollBottom() === (padding + this.output.trueHeight());
      lessThanFull = this.output.trueHeight() <= this.script.trueHeight();
      this.output.append($$(function() {
        return this.pre({
          "class": "line " + css
        }, (function(_this) {
          return function() {
            return _this.raw(line);
          };
        })(this));
      }));
      if (atom.config.get('script.scrollWithOutput')) {
        if (lessThanFull || scrolledToEnd) {
          return this.checkScrollAgain(5)();
        }
      }
    };

    ScriptView.prototype.scrollTimeout = null;

    ScriptView.prototype.checkScrollAgain = function(times) {
      return (function(_this) {
        return function() {
          _this.script.scrollToBottom();
          clearTimeout(_this.scrollTimeout);
          if (times > 1) {
            return _this.scrollTimeout = setTimeout(_this.checkScrollAgain(times - 1), 50);
          }
        };
      })(this);
    };

    ScriptView.prototype.copyResults = function() {
      if (this.results) {
        return atom.clipboard.write(stripAnsi(this.results));
      }
    };

    return ScriptView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvc2NyaXB0LXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDhGQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxlQUFSLENBQWIsQ0FBQTs7QUFBQSxFQUNBLGlCQUFBLEdBQW9CLE9BQUEsQ0FBUSx1QkFBUixDQURwQixDQUFBOztBQUFBLEVBR0EsT0FBYSxPQUFBLENBQVEsc0JBQVIsQ0FBYixFQUFDLFlBQUEsSUFBRCxFQUFPLFVBQUEsRUFIUCxDQUFBOztBQUFBLEVBS0EsVUFBQSxHQUFhLE9BQUEsQ0FBUSxjQUFSLENBTGIsQ0FBQTs7QUFBQSxFQU1BLFNBQUEsR0FBWSxPQUFBLENBQVEsWUFBUixDQU5aLENBQUE7O0FBQUEsRUFPQSxTQUFBLEdBQVksT0FBQSxDQUFRLGNBQVIsQ0FQWixDQUFBOztBQUFBLEVBUUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxZQUFSLENBUkosQ0FBQTs7QUFBQSxFQVdBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSixpQ0FBQSxDQUFBOzs7OztLQUFBOztBQUFBLElBQUEsVUFBQyxDQUFBLE9BQUQsR0FBVSxFQUFWLENBQUE7O0FBQUEsSUFFQSxVQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUssQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUNILGNBQUEsR0FBQTtBQUFBLFVBQUEsS0FBQyxDQUFBLE9BQUQsQ0FBUyxZQUFULEVBQTJCLElBQUEsVUFBQSxDQUFBLENBQTNCLENBQUEsQ0FBQTtBQUFBLFVBR0EsR0FBQSxHQUFNLHVFQUhOLENBQUE7aUJBS0EsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFB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

//# sourceURL=/Users/muhammad/.atom/packages/script/lib/script-view.coffee
