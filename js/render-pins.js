'use strict';

(function () {
  var ADS_QUANTITY = 8;

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

  window.renderPins = function(arr) {
    var mapPins = document.querySelector(".map__pins");
    var pinTemplate = document.querySelector("template").content;

    for (var i = 0; i < ADS_QUANTITY; i++) {
      var pinItem = pinTemplate.querySelector('.map__pin').cloneNode(true);
      pinItem.dataset.markerIndex = i;
      pinItem.style.left = arr[i].location.x + "px";
      pinItem.style.top = arr[i].location.y + "px";
      pinItem.querySelector("img").src = arr[i].author.avatar;
      pinItem.querySelector("img").alt = arr[i].offer.title;
      pinItem.addEventListener("click", mapPinsOnClickRender);
      mapPins.appendChild(pinItem);
    }
  };
})();
