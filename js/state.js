'use strict';

(function () {
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var formResetBtn = form.querySelector('.ad-form__reset');

  window.state = {
    deleteMapContent: function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pins.length; i++) {
        pins[i].remove();
      }
      var popups = document.querySelectorAll('.map__card');
      for (var j = 0; j < popups.length; j++) {
        popups[j].remove();
      }
    },
    reset: function () {
      map.classList.add("map--faded");
      form.classList.add("ad-form--disabled");
      form.reset();
      window.util.changeDisabledFields(true);
      window.util.setAddress().resetPin();

      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pins.length; i++) {
        pins[i].remove();
      }
      var popups = document.querySelectorAll('.map__card');
      for (var j = 0; j < popups.length; j++) {
        popups[j].remove();
      }
    }
  }
})();
