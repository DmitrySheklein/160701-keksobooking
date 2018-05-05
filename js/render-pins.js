'use strict';

(function () {
  var ADS_QUANTITY = 8;

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
      mapPins.appendChild(pinItem);
    }
  };
})();
