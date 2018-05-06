"use strict";

var generateAdsData = function(arr) {
  for (var i = 0; i < ADS_QUANTITY; i++) {
    var locationX = getRandomNum(300, 900);
    var locationY = getRandomNum(150, 500);
    arr.push({
      author: {
        avatar: "img/avatars/user0" + (i + 1) + ".png"
      },
      offer: {
        title: OFFER_TITLES[i],
        address: locationX + ", " + locationY,
        price: getRandomNum(1000, 1000000),
        type: offerTypesKeys[getRandomNum(0,offerTypesKeys.length)],
        rooms: getRandomNum(1, 5),
        guests: getRandomNum(1, 5),
        checkin: getRandomData(OFFER_TIMES),
        checkout: getRandomData(OFFER_TIMES),
        features: generateArrayRandomLength(OFFER_FEATURES),
        description: "",
        photos: mixArray(OFFER_PHOTOS)
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }
  return arr;
};

var listAdsData = generateAdsData(listAds);

var renderPins = function(arr) {
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
  adTemplate.querySelector(".popup__text--address").textContent = obj.offer.address;
  adTemplate.querySelector(".popup__text--price").textContent = obj.offer.price + " ₽/ночь";
  adTemplate.querySelector(".popup__type").textContent = OFFER_TYPES[obj.offer.type].name;
  adTemplate.querySelector(".popup__text--capacity").textContent = obj.offer.rooms + " комнаты для " + obj.offer.guests + "гостей";
  adTemplate.querySelector(".popup__text--time").textContent = "Заезд после " + obj.offer.checkin + ", выезд до " + obj.offer.checkout;
  adTemplate.querySelector(".popup__description").textContent = obj.offer.description;
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
    var pictureElement = document.createElement('img');
    pictureElement.src = obj.offer.photos[j];
    pictureElement.classList.add('popup__photo');
    pictureElement.width = 45;
    pictureElement.height = 40;
    picturesContainer.appendChild(pictureElement)
  }

  return adTemplate;
};

var renderAds = function(listAdsData) {
  var mapAdsFragment = document.createDocumentFragment();
  var map = document.querySelector(".map");
  var mapFilterContainer = map.querySelector(".map__filters-container");

  for (let i = 0; i < listAdsData.length; i++) {
    mapAdsFragment.appendChild(createAd(listAdsData[i], i));
  }

  return map.insertBefore(mapAdsFragment, mapFilterContainer);
};

var mapMainPin = document.querySelector(".map__pin--main");
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGTH = 65;
var map = document.querySelector(".map");
var form = document.querySelector(".ad-form");

var disabledFields = function (boolean) {
  var fieldset = document.querySelectorAll("fieldset");
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].disabled = boolean;
    }
}

disabledFields(true);


var mapMainPinCoords = {
  x: Math.floor(mapMainPin.offsetLeft + MAIN_PIN_WIDTH / 2),
  y: Math.floor(mapMainPin.offsetTop + MAIN_PIN_HEIGTH / 2)
};

var addressInput = document.querySelector("#address");
addressInput.value = mapMainPinCoords.x + ", " + mapMainPinCoords.y;

var updateMapMainPinCoords = function() {
  mapMainPinCoords = {
    x: mapMainPin.offsetLeft + MAIN_PIN_WIDTH / 2,
    y: mapMainPin.offsetTop + MAIN_PIN_HEIGTH
  };
  addressInput.value = mapMainPinCoords.x + ", " + mapMainPinCoords.y;
};

var activatePage = function() {
  map.classList.remove("map--faded");
  form.classList.remove("ad-form--disabled");
  disabledFields(false);

  renderPins(listAdsData);
  renderAds(listAdsData);

  var mapPins = document.querySelectorAll(".map__pin:not(.map__pin--main)");

  for (var i = 0; i < mapPins.length; i++) {
    mapPins[i].addEventListener("click", mapPinsOnClickRender);
  }
};

var mapPinsOnClickRender = function(evt) {
  if (
    evt.target.classList.contains("map__pin") &&
    !evt.target.classList.contains("map__pin--main")
  ) {
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


mapMainPin.addEventListener("mousedown", function (evt) {
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
    }

    var shift = {
      x: startCoordinates.x - moveEvt.clientX,
      y: startCoordinates.y - moveEvt.clientY
    }

    startCoordinates = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    }

    mapMainPin.style.top = (mapMainPin.offsetTop - shift.y) + 'px';
    mapMainPin.style.left = (mapMainPin.offsetLeft - shift.x) + 'px';

    if (mapMainPin.offsetTop < limit.top){
      mapMainPin.style.top = limit.top + 'px'
    } else if (mapMainPin.offsetTop + MAIN_PIN_HEIGTH > limit.bottom) {
      mapMainPin.style.top = limit.bottom + 'px'
    }

    if (mapMainPin.offsetLeft + pinHalfWidth < 0) {
      mapMainPin.style.left = 0 - pinHalfWidth + "px";
    } else if (mapMainPin.offsetLeft + pinHalfWidth > map.offsetWidth) {
      mapMainPin.style.left = map.offsetWidth - pinHalfWidth;
      console.log("more then map.offset", mapMainPin.style.left);
    }

    updateMapMainPinCoords();
  }

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    updateMapMainPinCoords();
    activatePage();
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});


