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
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ADS_QUANTITY; i++) {
    var newPin = document.createElement("button");
    newPin.classList = "map__pin";
    newPin.style.left = arr[i].location.x + "px";
    newPin.style.top = arr[i].location.y + "px";
    newPin.innerHTML =
      '<img src="' +
      arr[i].author.avatar +
      '" widht="40" height="40" draggble="false">';
    newPin.dataset.markerIndex = i;
    fragment.appendChild(newPin);
  }
  mapPins.appendChild(fragment);
};


var createAd = function(obj, index) {
  var adTemplate = document
    .querySelector("template")
    .cloneNode(true)
    .content.querySelector(".map__card");
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
    featuresContainer.innerHTML += '<li class="popup__feature popup__feature--' + obj.offer.features[i] + ' "></li>';
  }

  for (var j = 0; j < obj.offer.photos.length; j++) {
    picturesContainer.innerHTML +=
      '<img width="60px" height="30px" src=" ' +
      obj.offer.photos[j] +
      ' ">';
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


var showMap = function() {
  map.classList.remove("map--faded");
};

var showForm = function() {
  form.classList.remove("ad-form--disabled");
  removeFormDisabled();
};

var addFormDisabled = function() {
  var fieldset = document.querySelectorAll("fielset");
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].setAttribute("disabled", "disabled");
  }
};

addFormDisabled();

var removeFormDisabled = function() {
  var fieldset = document.querySelectorAll("fielset");
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].removeAttribute("disabled");
  }
};

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

var mapMainPinMouseUpHandler = function() {
  showMap();
  showForm();
  updateMapMainPinCoords();
  renderPins(listAdsData);
  renderAds(listAdsData);
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

mapMainPin.addEventListener("mouseup", mapMainPinMouseUpHandler);
map.addEventListener("click", mapPinsOnClickRender);


