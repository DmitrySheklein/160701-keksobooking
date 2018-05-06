"use strict";

(function () {
  var ADS_QUANTITY = 8;
  var mapMainPin = document.querySelector(".map__pin--main");
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGTH = 65;
  var map = document.querySelector(".map");
  var form = document.querySelector(".ad-form");

  var changeDisabledFields = function(boolean) {
    var fieldset = document.querySelectorAll("fieldset");
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].disabled = boolean;
    }
  };

  changeDisabledFields(true);

  var mapMainPinCoords = { x: Math.floor(mapMainPin.offsetLeft + MAIN_PIN_WIDTH / 2), y: Math.floor(mapMainPin.offsetTop + MAIN_PIN_HEIGTH / 2) };

  var addressInput = document.querySelector("#address");
  addressInput.value = mapMainPinCoords.x + ", " + mapMainPinCoords.y;

  var updateMapMainPinCoords = function() {
    mapMainPinCoords = { x: mapMainPin.offsetLeft + MAIN_PIN_WIDTH / 2, y: mapMainPin.offsetTop + MAIN_PIN_HEIGTH };
    addressInput.value = mapMainPinCoords.x + ", " + mapMainPinCoords.y;
  };

  var activatePage = function() {
    if (!map.classList.contains('map--faded')) {
      return;
    }
    map.classList.remove("map--faded");
    form.classList.remove("ad-form--disabled");
    changeDisabledFields(false);

    var generateData = window.generateData(ADS_QUANTITY);
    window.renderPins(generateData);
    window.renderAdverts(generateData);

    var mapPins = document.querySelectorAll(".map__pin:not(.map__pin--main)");

    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].addEventListener("click", mapPinsOnClickRender);
    }
  };

  var mapPinsOnClickRender = function(evt) {
    if (evt.target.classList.contains("map__pin") && !evt.target.classList.contains("map__pin--main")) {
      var pinIndex = evt.target.dataset.markerIndex;

      var marCards = document.querySelectorAll(".map__card");

      for (var i = 0; i < marCards.length; i++) {
        marCards[i].style.display = "none";
        marCards[pinIndex].style.display = "block";
      }

      var popupCardClose = function(evt) {
        evt.preventDefault();
        evt.target.parentNode.style.display = "none";
      };

      marCards[pinIndex]
        .querySelector(".popup__close")
        .addEventListener("click", popupCardClose);
    }
  };

  mapMainPin.addEventListener("mousedown", function(evt) {
    evt.preventDefault();

    var startCoordinates = { x: evt.clientX, y: evt.clientY };

    var onMouseMove = function(moveEvt) {
      moveEvt.preventDefault();

      var pinHalfWidth = MAIN_PIN_WIDTH / 2;

      var limit = { top: 150, bottom: 500 };

      var shift = { x: startCoordinates.x - moveEvt.clientX, y: startCoordinates.y - moveEvt.clientY };

      startCoordinates = { x: moveEvt.clientX, y: moveEvt.clientY };

      mapMainPin.style.top = mapMainPin.offsetTop - shift.y + "px";
      mapMainPin.style.left = mapMainPin.offsetLeft - shift.x + "px";

      if (mapMainPin.offsetTop < limit.top) {
        mapMainPin.style.top = limit.top + "px";
      } else if (mapMainPin.offsetTop + MAIN_PIN_HEIGTH > limit.bottom) {
        mapMainPin.style.top = limit.bottom - MAIN_PIN_HEIGTH + "px";
      }

      if (mapMainPin.offsetLeft + pinHalfWidth < 0) {
        mapMainPin.style.left = 0 - pinHalfWidth + "px";
      } else if (mapMainPin.offsetLeft + pinHalfWidth > map.offsetWidth) {
        mapMainPin.style.left = map.offsetWidth - pinHalfWidth + 'px';
      }

      updateMapMainPinCoords();
    };

    var onMouseUp = function(upEvt) {
      upEvt.preventDefault();

      updateMapMainPinCoords();
      activatePage();
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

})();
