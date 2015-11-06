(function() {
  var Watchpoint;

  module.exports = Watchpoint = (function() {
    atom.deserializers.add(Watchpoint);

    Watchpoint.version = '1b';

    function Watchpoint(data) {
      if (!data.expression) {
        throw new Error("Invalid watchpoint");
      }
      this.expression = data.expression;
    }

    Watchpoint.prototype.serialize = function() {
      return {
        deserializer: 'Watchpoint',
        version: this.constructor.version,
        data: {
          expression: this.getExpression()
        }
      };
    };

    Watchpoint.deserialize = function(_arg) {
      var data;
      data = _arg.data;
      return new Watchpoint({
        expression: data.expression
      });
    };

    Watchpoint.prototype.getPath = function() {
      return this.path;
    };

    Watchpoint.prototype.getExpression = function() {
      return this.expression;
    };

    Watchpoint.prototype.setValue = function(value) {
      this.value = value;
      return void 0;
    };

    Watchpoint.prototype.getValue = function() {
      return this.value;
    };

    Watchpoint.prototype.isLessThan = function(other) {
      if (!other instanceof Watchpoint) {
        return true;
      }
      if (other.getExpression() < this.getExpression()) {
        return true;
      }
    };

    Watchpoint.prototype.isEqual = function(other) {
      if (!other instanceof Watch) {
        return false;
      }
      if (other.geExpression() !== this.getExpression()) {
        return false;
      }
      return true;
    };

    Watchpoint.prototype.isGreaterThan = function(other) {
      return !this.isLessThan(other) && !this.isEqual(other);
    };

    return Watchpoint;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3BocC1kZWJ1Zy9saWIvbW9kZWxzL3dhdGNocG9pbnQuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFVBQUE7O0FBQUEsRUFBQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osSUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQW5CLENBQXVCLFVBQXZCLENBQUEsQ0FBQTs7QUFBQSxJQUNBLFVBQUMsQ0FBQSxPQUFELEdBQVUsSUFEVixDQUFBOztBQUVhLElBQUEsb0JBQUMsSUFBRCxHQUFBO0FBQ1gsTUFBQSxJQUFJLENBQUEsSUFBSyxDQUFDLFVBQVY7QUFDRSxjQUFVLElBQUEsS0FBQSxDQUFNLG9CQUFOLENBQVYsQ0FERjtPQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsVUFBRCxHQUFjLElBQUksQ0FBQyxVQUZuQixDQURXO0lBQUEsQ0FGYjs7QUFBQSx5QkFPQSxTQUFBLEdBQVcsU0FBQSxHQUFBO0FBQ1QsYUFBTztBQUFBLFFBQ0wsWUFBQSxFQUFjLFlBRFQ7QUFBQSxRQUVMLE9BQUEsRUFBUyxJQUFDLENBQUEsV0FBVyxDQUFDLE9BRmpCO0FBQUEsUUFHTCxJQUFBLEVBQU07QUFBQSxVQUNKLFVBQUEsRUFBWSxJQUFDLENBQUEsYUFBRCxDQUFBLENBRFI7U0FIRDtPQUFQLENBRFM7SUFBQSxDQVBYLENBQUE7O0FBQUEsSUFnQkEsVUFBQyxDQUFBLFdBQUQsR0FBYyxTQUFDLElBQUQsR0FBQTtBQUNaLFVBQUEsSUFBQTtBQUFBLE1BRGMsT0FBRCxLQUFDLElBQ2QsQ0FBQTtBQUFBLGFBQVcsSUFBQSxVQUFBLENBQVc7QUFBQSxRQUFBLFVBQUEsRUFBWSxJQUFJLENBQUMsVUFBakI7T0FBWCxDQUFYLENBRFk7SUFBQSxDQWhCZCxDQUFBOztBQUFBLHlCQW1CQSxPQUFBLEdBQVMsU0FBQSxHQUFBO0FBQ1AsYUFBTyxJQUFDLENBQUEsSUFBUixDQURPO0lBQUEsQ0FuQlQsQ0FBQTs7QUFBQSx5QkFzQkEsYUFBQSxHQUFlLFNBQUEsR0FBQTtBQUNiLGFBQU8sSUFBQyxDQUFBLFVBQVIsQ0FEYTtJQUFBLENBdEJmLENBQUE7O0FBQUEseUJBeUJBLFFBQUEsR0FBVSxTQUFFLEtBQUYsR0FBQTtBQUNSLE1BRFMsSUFBQyxDQUFBLFFBQUEsS0FDVixDQUFBO2FBQUEsT0FEUTtJQUFBLENBekJWLENBQUE7O0FBQUEseUJBNEJBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDUixhQUFPLElBQUMsQ0FBQSxLQUFSLENBRFE7SUFBQSxDQTVCVixDQUFBOztBQUFBLHlCQStCQSxVQUFBLEdBQVksU0FBQyxLQUFELEdBQUE7QUFDVixNQUFBLElBQWUsQ0FBQSxLQUFBLFlBQWtCLFVBQWpDO0FBQUEsZUFBTyxJQUFQLENBQUE7T0FBQTtBQUNBLE1BQUEsSUFBZSxLQUFLLENBQUMsYUFBTixDQUFBLENBQUEsR0FBd0IsSUFBQyxDQUFBLGFBQUQsQ0FBQSxDQUF2QztBQUFBLGVBQU8sSUFBUCxDQUFBO09BRlU7SUFBQSxDQS9CWixDQUFBOztBQUFBLHlCQW1DQSxPQUFBLEdBQVMsU0FBQyxLQUFELEdBQUE7QUFDUCxNQUFBLElBQWdCLENBQUEsS0FBQSxZQUFrQixLQUFsQztBQUFBLGVBQU8sS0FBUCxDQUFBO09BQUE7QUFDQSxNQUFBLElBQWdCLEtBQUssQ0FBQyxZQUFOLENBQUEsQ0FBQSxLQUF3QixJQUFDLENBQUEsYUFBRCxDQUFBLENBQXhDO0FBQUEsZUFBTyxLQUFQLENBQUE7T0FEQTtBQUVBLGFBQU8sSUFBUCxDQUhPO0lBQUEsQ0FuQ1QsQ0FBQTs7QUFBQSx5QkF3Q0EsYUFBQSxHQUFlLFNBQUMsS0FBRCxHQUFBO0FBQ2IsYUFBTyxDQUFBLElBQUUsQ0FBQSxVQUFELENBQVksS0FBWixDQUFELElBQXVCLENBQUEsSUFBRSxDQUFBLE9BQUQsQ0FBUyxLQUFULENBQS9CLENBRGE7SUFBQSxDQXhDZixDQUFBOztzQkFBQTs7TUFGRixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/muhammad/.atom/packages/php-debug/lib/models/watchpoint.coffee
