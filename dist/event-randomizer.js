(function(root, definition) {
  "use strict";
  if (typeof define === 'function' && define.amd) {
    define(definition);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = definition();
  } else {
    root.EventRandomizer = definition();
  }
}(this, function() {
  "use strict";

  function Randomizer() {
    var self = this;

    var initialized = false;
    var listenedEvents = Object.keys(window)
      .filter(function(key) {
        return key.match(/^on/)
      })
      .map(function(ev) {
        return ev.replace(/^on/, '')
      }) || [];
    var keyMap = {};

    var size = undefined;
    var buffer = undefined;
    var cryptoBuffer = undefined;

    self.onUpdate = undefined;

    self.start = function(_size) {
      size = parseInt(_size || 128);
      buffer = new Int32Array(size);
      cryptoBuffer = new Int32Array(size);

      if (!initialized) _initialize();
    }

    self.stop = function() {
      if (initialized) {
        _clearListeners();
      }
    }

    self.getValue = function() {
      var outputBuffer = new Int32Array(size);
      for (var i = 0; i < size; i++) {
        outputBuffer[i] = buffer[i] + cryptoBuffer[i];
      }

      return outputBuffer;
    }

    self.clear = function() {
      buffer = new Int32Array(size);
      cryptoBuffer = new Int32Array(size);
    }

    function _listener(e) {
      _update(e);
    }

    function _initialize() {
      for (var i = 0; i < listenedEvents.length; i++) {
        window.addEventListener(listenedEvents[i], _listener, {
          passive: true
        });
      }
      initialized = true;
    }

    function _clearListeners() {
      for (var i = 0; i < listenedEvents.length; i++) {
        window.removeEventListener(listenedEvents[i], _listener);
      }
      initialized = false;
    }

    function _update(event) {
      var index = buffer[Math.floor(Math.random() * size)] += _collectNumbers(event).reduce(function(a, b) {
        return a + b
      }, 0);
      crypto.getRandomValues(cryptoBuffer);
      _notify();
    }

    function _notify() {
      if (self.onUpdate) {

        self.onUpdate(self.getValue());
      }
    }

    function _collectNumbers(event) {
      var nums = [];
      var keys = _getKeys(event);
      for (var i = 0; i < keys.length; i++) {
        var val = event[keys[i]];
        if (typeof val === 'number') {
          nums.push(val);
        }
      }

      return nums;
    }

    function _getKeys(event) {
      if (keyMap[event.constructor.name]) {
        return keyMap[event.constructor.name];
      }

      if (!(event instanceof Event)) {
        return [];
      }

      var keys = _getKeys(event.__proto__);
      var childKeys = Object.keys(event.__proto__);
      for (var i = 0; i < childKeys.length; i++) {
        keys.push(childKeys[i]);
      }

      if (!keyMap[event.constructor.name]) {
        keyMap[event.constructor.name] = keys;
      }
      return keys;
    }

  }

  var randomizer = new Randomizer();

  return randomizer;
}));
