(function() {
  var config;

  config = require('../helper/config-helper');

  module.exports = function(opt) {
    var dst, error, progress, src, success;
    if (opt == null) {
      opt = {};
    }
    src = opt.src;
    dst = opt.dst;
    config = opt.config;
    success = opt.success;
    error = opt.error;
    progress = opt.progress;
    if (typeof progress === "function") {
      progress(JSON.stringify(opt, null, 4));
    }
    if (opt.showError && error) {
      return error("Error!");
    } else {
      return success();
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL2F0b20tc3luYy9saWIvc2VydmljZS9lY2hvLXNlcnZpY2UuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLE1BQUE7O0FBQUEsRUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLHlCQUFSLENBQVQsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsR0FBRCxHQUFBO0FBQ2IsUUFBQSxrQ0FBQTs7TUFEYyxNQUFNO0tBQ3BCO0FBQUEsSUFBQSxHQUFBLEdBQU0sR0FBRyxDQUFDLEdBQVYsQ0FBQTtBQUFBLElBQ0EsR0FBQSxHQUFNLEdBQUcsQ0FBQyxHQURWLENBQUE7QUFBQSxJQUVBLE1BQUEsR0FBUyxHQUFHLENBQUMsTUFGYixDQUFBO0FBQUEsSUFHQSxPQUFBLEdBQVUsR0FBRyxDQUFDLE9BSGQsQ0FBQTtBQUFBLElBSUEsS0FBQSxHQUFRLEdBQUcsQ0FBQyxLQUpaLENBQUE7QUFBQSxJQUtBLFFBQUEsR0FBVyxHQUFHLENBQUMsUUFMZixDQUFBOztNQU9BLFNBQVUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxHQUFmLEVBQW9CLElBQXBCLEVBQTBCLENBQTFCO0tBUFY7QUFTQSxJQUFBLElBQUcsR0FBRyxDQUFDLFNBQUosSUFBa0IsS0FBckI7YUFDSSxLQUFBLENBQU0sUUFBTixFQURKO0tBQUEsTUFBQTthQUdJLE9BQUEsQ0FBQSxFQUhKO0tBVmE7RUFBQSxDQUZqQixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/muhammad/.atom/packages/atom-sync/lib/service/echo-service.coffee
