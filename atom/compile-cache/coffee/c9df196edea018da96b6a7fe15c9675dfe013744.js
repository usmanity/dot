(function() {
  var Range, Shell;

  Shell = require('shell');

  Range = require('atom').Range;

  module.exports = {
    config: {
      openCodebug: {
        type: 'boolean',
        "default": true
      }
    },
    activate: function() {
      return atom.commands.add('atom-workspace', 'codebug:break', (function(_this) {
        return function() {
          return _this.codebugBreak();
        };
      })(this));
    },
    codebugBreak: function() {
      if (this.isOpenable()) {
        this.openUrlInBrowser(this.breakUrl());
        return console.log(this.breakUrl());
      } else {
        return this.reportValidationErrors();
      }
    },
    file: function() {
      var activeItem;
      activeItem = atom.workspace.getActivePaneItem();
      if (activeItem.buffer.file != null) {
        return encodeURI(activeItem.buffer.file.path);
      }
    },
    getLineNumber: function() {
      var endRow, lineRange, startRow, _ref;
      lineRange = (_ref = atom.workspace.getActivePaneItem()) != null ? typeof _ref.getSelectedBufferRange === "function" ? _ref.getSelectedBufferRange() : void 0 : void 0;
      if (lineRange) {
        lineRange = Range.fromObject(lineRange);
        startRow = lineRange.start.row + 1;
        endRow = lineRange.end.row + 1;
        return startRow;
      }
    },
    openIt: function() {
      if (atom.config.get('codebug.openCodebug')) {
        return '1';
      } else {
        return '2';
      }
    },
    openUrlInBrowser: function(url) {
      return Shell.openExternal(url);
    },
    breakUrl: function() {
      return "codebug://send?file=" + (this.file()) + "&line=" + (this.getLineNumber()) + "&op=" + (this.whichOperation()) + "&open=" + (this.openIt());
    },
    whichOperation: function() {
      return 'add';
    },
    isOpenable: function() {
      return this.validationErrors().length === 0;
    },
    validationErrors: function() {
      if (!this.file()) {
        return ['Buffer is not saved!'];
      }
      return [];
    },
    reportValidationErrors: function() {
      var error, _i, _len, _ref, _results;
      atom.beep();
      _ref = this.validationErrors();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        error = _ref[_i];
        _results.push(console.warn(error));
      }
      return _results;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL2NvZGVidWcvbGliL2NvZGVidWcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFlBQUE7O0FBQUEsRUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLE9BQVIsQ0FBUixDQUFBOztBQUFBLEVBQ0MsUUFBUyxPQUFBLENBQVEsTUFBUixFQUFULEtBREQsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLE1BQUEsRUFDRTtBQUFBLE1BQUEsV0FBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLElBRFQ7T0FERjtLQURGO0FBQUEsSUFLQSxRQUFBLEVBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFkLENBQWtCLGdCQUFsQixFQUFvQyxlQUFwQyxFQUFxRCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxZQUFELENBQUEsRUFBSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXJELEVBRFE7SUFBQSxDQUxWO0FBQUEsSUFRQSxZQUFBLEVBQWMsU0FBQSxHQUFBO0FBQ1osTUFBQSxJQUFHLElBQUMsQ0FBQSxVQUFELENBQUEsQ0FBSDtBQUNFLFFBQUEsSUFBQyxDQUFBLGdCQUFELENBQWtCLElBQUMsQ0FBQSxRQUFELENBQUEsQ0FBbEIsQ0FBQSxDQUFBO2VBQ0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFDLENBQUEsUUFBRCxDQUFBLENBQVosRUFGRjtPQUFBLE1BQUE7ZUFJRSxJQUFDLENBQUEsc0JBQUQsQ0FBQSxFQUpGO09BRFk7SUFBQSxDQVJkO0FBQUEsSUFlQSxJQUFBLEVBQU0sU0FBQSxHQUFBO0FBQ0osVUFBQSxVQUFBO0FBQUEsTUFBQSxVQUFBLEdBQWEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBZixDQUFBLENBQWIsQ0FBQTtBQUNBLE1BQUEsSUFBRyw4QkFBSDtlQUNFLFNBQUEsQ0FBVSxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFqQyxFQURGO09BRkk7SUFBQSxDQWZOO0FBQUEsSUFvQkEsYUFBQSxFQUFlLFNBQUEsR0FBQTtBQUNiLFVBQUEsaUNBQUE7QUFBQSxNQUFBLFNBQUEsaUhBQThDLENBQUUsMENBQWhELENBQUE7QUFDQSxNQUFBLElBQUcsU0FBSDtBQUNFLFFBQUEsU0FBQSxHQUFZLEtBQUssQ0FBQyxVQUFOLENBQWlCLFNBQWpCLENBQVosQ0FBQTtBQUFBLFFBQ0EsUUFBQSxHQUFXLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBaEIsR0FBc0IsQ0FEakMsQ0FBQTtBQUFBLFFBRUEsTUFBQSxHQUFTLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBZCxHQUFvQixDQUY3QixDQUFBO0FBR0EsZUFBTyxRQUFQLENBSkY7T0FGYTtJQUFBLENBcEJmO0FBQUEsSUE0QkEsTUFBQSxFQUFRLFNBQUEsR0FBQTtBQUNOLE1BQUEsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IscUJBQWhCLENBQUg7ZUFDRSxJQURGO09BQUEsTUFBQTtlQUdFLElBSEY7T0FETTtJQUFBLENBNUJSO0FBQUEsSUFrQ0EsZ0JBQUEsRUFBa0IsU0FBQyxHQUFELEdBQUE7YUFDaEIsS0FBSyxDQUFDLFlBQU4sQ0FBbUIsR0FBbkIsRUFEZ0I7SUFBQSxDQWxDbEI7QUFBQSxJQXFDQSxRQUFBLEVBQVUsU0FBQSxHQUFBO2FBQ1Asc0JBQUEsR0FBcUIsQ0FBQyxJQUFDLENBQUEsSUFBRCxDQUFBLENBQUQsQ0FBckIsR0FBOEIsUUFBOUIsR0FBcUMsQ0FBQyxJQUFDLENBQUEsYUFBRCxDQUFBLENBQUQsQ0FBckMsR0FBdUQsTUFBdkQsR0FBNEQsQ0FBQyxJQUFDLENBQUEsY0FBRCxDQUFBLENBQUQsQ0FBNUQsR0FBK0UsUUFBL0UsR0FBc0YsQ0FBQyxJQUFDLENBQUEsTUFBRCxDQUFBLENBQUQsRUFEL0U7SUFBQSxDQXJDVjtBQUFBLElBd0NBLGNBQUEsRUFBZ0IsU0FBQSxHQUFBO2FBQ2QsTUFEYztJQUFBLENBeENoQjtBQUFBLElBMkNBLFVBQUEsRUFBWSxTQUFBLEdBQUE7YUFDVixJQUFDLENBQUEsZ0JBQUQsQ0FBQSxDQUFtQixDQUFDLE1BQXBCLEtBQThCLEVBRHBCO0lBQUEsQ0EzQ1o7QUFBQSxJQThDQSxnQkFBQSxFQUFrQixTQUFBLEdBQUE7QUFDaEIsTUFBQSxJQUFBLENBQUEsSUFBUSxDQUFBLElBQUQsQ0FBQSxDQUFQO0FBQ0UsZUFBTyxDQUFDLHNCQUFELENBQVAsQ0FERjtPQUFBO2FBR0EsR0FKZ0I7SUFBQSxDQTlDbEI7QUFBQSxJQW9EQSxzQkFBQSxFQUF3QixTQUFBLEdBQUE7QUFDdEIsVUFBQSwrQkFBQTtBQUFBLE1BQUEsSUFBSSxDQUFDLElBQUwsQ0FBQSxDQUFBLENBQUE7QUFDQTtBQUFBO1dBQUEsMkNBQUE7eUJBQUE7QUFBQSxzQkFBQSxPQUFPLENBQUMsSUFBUixDQUFhLEtBQWIsRUFBQSxDQUFBO0FBQUE7c0JBRnNCO0lBQUEsQ0FwRHhCO0dBSkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/muhammad/.atom/packages/codebug/lib/codebug.coffee
