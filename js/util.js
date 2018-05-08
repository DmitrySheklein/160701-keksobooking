'use strict';

(function () {
  window.util = {
    changeDisabledFields: function (boolean) {
      var fieldset = document.querySelectorAll("fieldset");
      for (var i = 0; i < fieldset.length; i++) {
        fieldset[i].disabled = boolean;
      }
    },
    debounce : function (fun) {
      var DEBOUNCE_INTERVAL = 300;
      var lastTimeout;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);

    },
    setAddress : function () {
        var mapMainPin = document.querySelector(".map__pin--main");

        var MAIN_PIN_WIDTH = 65;
        var MAIN_PIN_HEIGTH = 65;
        var PIN_MAIN_X = 570;
        var PIN_MAIN_Y = 375;
        var startsMainPinCoords = { x: Math.floor(mapMainPin.offsetLeft + MAIN_PIN_WIDTH / 2), y: Math.floor(mapMainPin.offsetTop + MAIN_PIN_HEIGTH / 2) };
        var addressInput = document.querySelector("#address");

        var startPosition = function () {
          addressInput.value = startsMainPinCoords.x + ", " + startsMainPinCoords.y;
          return mapMainPin;
        }


        var updateMapMainPinCoords = function() {
          var newMainPinCoords = { x:  Math.floor(mapMainPin.offsetLeft + MAIN_PIN_WIDTH / 2), y:  Math.floor(mapMainPin.offsetTop + MAIN_PIN_HEIGTH / 2) };
          addressInput.value = newMainPinCoords.x + ", " + newMainPinCoords.y;
        };

        var resetPinPosition = function () {
          mapMainPin.style.left = PIN_MAIN_X + "px";
          mapMainPin.style.top = PIN_MAIN_Y + "px";
          window.util.setAddress().update();
        }

        return {
          start: startPosition,
          resetPin: resetPinPosition,
          update: updateMapMainPinCoords
        }
    }
  }
})();
