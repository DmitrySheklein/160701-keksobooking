'use strict';

(function () {
  var mapMainPin = document.querySelector('.map__pin--main');
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGTH = 65;
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');

  window.util.changeDisabledFields(true);
  window.util.setAddress().start();

  var activatePage = function () {
    if (!map.classList.contains('map--faded')) {
      return;
    }
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    window.util.changeDisabledFields(false);

    var getContent = function (data) {
      window.renderPins(data);
      window.renderAdverts(data);
      window.data.content = data;
    };
    window.backend.load(getContent, window.alert.error);

  };


  mapMainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var pinHalfWidth = MAIN_PIN_WIDTH / 2;

      var limit = {
        top: 150,
        bottom: 500
      };

      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapMainPin.style.top = mapMainPin.offsetTop - shift.y + 'px';
      mapMainPin.style.left = mapMainPin.offsetLeft - shift.x + 'px';

      if (mapMainPin.offsetTop < limit.top) {
        mapMainPin.style.top = limit.top + 'px';
      } else if (mapMainPin.offsetTop + MAIN_PIN_HEIGTH > limit.bottom) {
        mapMainPin.style.top = limit.bottom - MAIN_PIN_HEIGTH + 'px';
      }

      if (mapMainPin.offsetLeft + pinHalfWidth < 0) {
        mapMainPin.style.left = 0 - pinHalfWidth + 'px';
      } else if (mapMainPin.offsetLeft + pinHalfWidth > map.offsetWidth) {
        mapMainPin.style.left = map.offsetWidth - pinHalfWidth + 'px';
      }
      window.util.setAddress().update();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.util.setAddress().update();
      activatePage();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
