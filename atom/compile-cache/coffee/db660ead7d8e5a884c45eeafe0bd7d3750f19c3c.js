(function() {
  exports.getInsertIndex = function(sortedArray, object) {
    var curObject, index;
    if (sortedArray.length === 0) {
      return 0;
    }
    for (index in sortedArray) {
      curObject = sortedArray[index];
      if (object.isLessThan(curObject)) {
        return index;
      }
    }
    return sortedArray.length;
  };

  exports.insertOrdered = function(sortedArray, object) {
    var index;
    index = exports.getInsertIndex(sortedArray, object);
    return sortedArray.splice(index, 0, object);
  };

  exports.arraySearch = function(array, object) {
    var curObject, index;
    if (array.length === 0) {
      return false;
    }
    for (index in array) {
      curObject = array[index];
      if (object.isEqual(curObject)) {
        return index;
      }
    }
    return false;
  };

  exports.arrayRemove = function(array, object) {
    var index, removed;
    index = exports.arraySearch(array, object);
    if (index === false) {
      return;
    }
    removed = array.splice(index, 1);
    if (removed.length > 0) {
      return removed[0];
    }
  };

  exports.serializeArray = function(array) {
    var curObject, index, object, ret;
    ret = [];
    for (index in array) {
      curObject = array[index];
      object = curObject.serialize();
      if (object === void 0) {
        continue;
      }
      ret.push(object);
    }
    return ret;
  };

  exports.deserializeArray = function(array) {
    var curObject, error, index, object, ret;
    ret = [];
    for (index in array) {
      curObject = array[index];
      try {
        object = atom.deserializers.deserialize(curObject);
        if (object === void 0) {
          continue;
        }
        ret.push(object);
      } catch (_error) {
        error = _error;
        console.error("Could not deserialize object");
        console.dir(curObject);
      }
    }
    return ret;
  };

  exports.localPathToRemote = function(localPath) {
    var path, pathMap, pathMaps, _i, _len;
    pathMaps = atom.config.get('php-debug.PathMaps');
    for (_i = 0, _len = pathMaps.length; _i < _len; _i++) {
      pathMap = pathMaps[_i];
      if (localPath.indexOf(pathMap.local) === 0) {
        path = localPath.replace(pathMap.local, pathMap.remote);
        if (pathMap.remote.indexOf('/') !== null) {
          path = path.replace(/\\/g, '/');
        } else if (pathMap.remote.indexOf('\\') !== null) {
          path = path.replace(/\//g, '\\');
        }
        return path;
      }
    }
    return localPath;
  };

  exports.remotePathToLocal = function(remotePath) {
    var pathMap, pathMaps, _i, _len;
    pathMaps = atom.config.get('php-debug.PathMaps');
    for (_i = 0, _len = pathMaps.length; _i < _len; _i++) {
      pathMap = pathMaps[_i];
      if (remotePath.indexOf(pathMap.remote) === 0) {
        return remotePath.replace(pathMap.remote, pathMap.local);
        break;
      }
    }
    return remotePath;
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL211aGFtbWFkLy5hdG9tL3BhY2thZ2VzL3BocC1kZWJ1Zy9saWIvaGVscGVycy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLEVBQUEsT0FBTyxDQUFDLGNBQVIsR0FBMEIsU0FBQyxXQUFELEVBQWMsTUFBZCxHQUFBO0FBQ3hCLFFBQUEsZ0JBQUE7QUFBQSxJQUFBLElBQUcsV0FBVyxDQUFDLE1BQVosS0FBc0IsQ0FBekI7QUFDRSxhQUFPLENBQVAsQ0FERjtLQUFBO0FBRUEsU0FBQSxvQkFBQTtxQ0FBQTtBQUNFLE1BQUEsSUFBRyxNQUFNLENBQUMsVUFBUCxDQUFrQixTQUFsQixDQUFIO0FBQ0UsZUFBTyxLQUFQLENBREY7T0FERjtBQUFBLEtBRkE7QUFLQSxXQUFPLFdBQVcsQ0FBQyxNQUFuQixDQU53QjtFQUFBLENBQTFCLENBQUE7O0FBQUEsRUFRQSxPQUFPLENBQUMsYUFBUixHQUF3QixTQUFDLFdBQUQsRUFBYyxNQUFkLEdBQUE7QUFDdEIsUUFBQSxLQUFBO0FBQUEsSUFBQSxLQUFBLEdBQVEsT0FBTyxDQUFDLGNBQVIsQ0FBdUIsV0FBdkIsRUFBb0MsTUFBcEMsQ0FBUixDQUFBO1dBQ0EsV0FBVyxDQUFDLE1BQVosQ0FBbUIsS0FBbkIsRUFBMEIsQ0FBMUIsRUFBNkIsTUFBN0IsRUFGc0I7RUFBQSxDQVJ4QixDQUFBOztBQUFBLEVBWUEsT0FBTyxDQUFDLFdBQVIsR0FBc0IsU0FBQyxLQUFELEVBQVEsTUFBUixHQUFBO0FBQ3BCLFFBQUEsZ0JBQUE7QUFBQSxJQUFBLElBQUcsS0FBSyxDQUFDLE1BQU4sS0FBZ0IsQ0FBbkI7QUFDRSxhQUFPLEtBQVAsQ0FERjtLQUFBO0FBRUEsU0FBQSxjQUFBOytCQUFBO0FBQ0UsTUFBQSxJQUFHLE1BQU0sQ0FBQyxPQUFQLENBQWUsU0FBZixDQUFIO0FBQ0UsZUFB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

//# sourceURL=/Users/muhammad/.atom/packages/php-debug/lib/helpers.coffee
