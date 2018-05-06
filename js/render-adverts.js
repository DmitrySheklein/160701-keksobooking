'use strict';

(function () {

  var removeChilds = function(el) {
    for (var i = el.children.length - 1; i >= 0; i--) {
      el.removeChild(el.children[i]);
    }
    return el;
  };

  var createAd = function(obj, index) {
    var adTemplate = document
      .querySelector("template")
      .content.cloneNode(true)
      .querySelector(".map__card");
    var featuresContainer = adTemplate.querySelector(".popup__features");
    var picturesContainer = adTemplate.querySelector(".popup__photos");
    adTemplate.style.display = "none";
    adTemplate.dataset.cardIndex = index;
    adTemplate.querySelector(".popup__title").textContent = obj.offer.title;
    adTemplate.querySelector(".popup__text--address").textContent =
      obj.offer.address;
    adTemplate.querySelector(".popup__text--price").textContent =
      obj.offer.price + " ₽/ночь";
    adTemplate.querySelector(".popup__type").textContent =
      window.data.types[obj.offer.type].name;
    adTemplate.querySelector(".popup__text--capacity").textContent =
      obj.offer.rooms + " комнаты для " + obj.offer.guests + "гостей";
    adTemplate.querySelector(".popup__text--time").textContent =
      "Заезд после " + obj.offer.checkin + ", выезд до " + obj.offer.checkout;
    adTemplate.querySelector(".popup__description").textContent =
      obj.offer.description;
    adTemplate.querySelector(".popup__avatar").src = obj.author.avatar;

    removeChilds(featuresContainer);
    removeChilds(picturesContainer);

    for (var i = 0; i < obj.offer.features.length; i++) {
      var featuresElement = document.createElement("li");
      featuresElement.classList.add("popup__feature");
      featuresElement.classList.add("popup__feature--" + obj.offer.features[i]);
      featuresContainer.appendChild(featuresElement);
    }

    for (var j = 0; j < obj.offer.photos.length; j++) {
      var pictureElement = document.createElement("img");
      pictureElement.src = obj.offer.photos[j];
      pictureElement.classList.add("popup__photo");
      pictureElement.width = 45;
      pictureElement.height = 40;
      picturesContainer.appendChild(pictureElement);
    }

    return adTemplate;
  };

  window.renderAdverts = function(arr) {
    var mapAdsFragment = document.createDocumentFragment();
    var map = document.querySelector(".map");
    var mapFilterContainer = map.querySelector(".map__filters-container");

    for (var i = 0; i < arr.length; i++) {
      mapAdsFragment.appendChild(createAd(arr[i], i));
    }

    return map.insertBefore(mapAdsFragment, mapFilterContainer);
  };
})();
