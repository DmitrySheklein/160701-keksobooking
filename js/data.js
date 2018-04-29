'use strict'

var OFFER_TITLES = [
  "Большая уютная квартира",
  "Маленькая неуютная квартира",
  "Огромный прекрасный дворец",
  "Маленький ужасный дворец",
  "Красивый гостевой домик",
  "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря",
  "Неуютное бунгало по колено в воде"
];
var ADS_QUANTITY = 8;
var OFFER_TYPES = {
  flat: {
    name: "Квартира",
    price: "1000"
  },
  house: {
    name: "Дом",
    price: "5000"
  },
  palace: {
    name: "Дворец",
    price: "10000"
  },
  bungalo: {
    name: "Бунгало",
    price: "0"
  }
};
var offerTypesKeys = Object.getOwnPropertyNames(OFFER_TYPES);
var OFFER_TIMES = ["12:00", "13:00", "14:00"];
var OFFER_FEATURES = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner"
];
var OFFER_PHOTOS = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];
var listAds = [];

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var getRandomData = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var mixArray = function(arr) {
  var newArr = arr.slice();
  for (var i = newArr.length - 1; i > 0; i--) {
    var num = Math.floor(Math.random() * (i + 1));
    var buffer = newArr[num];
    newArr[num] = newArr[i];
    newArr[i] = buffer;
  }
  return newArr;
};

var generateArrayRandomLength = function(arr) {
  var newArr = arr.slice();
  return mixArray(newArr).slice(0, getRandomNum(1, newArr.length - 1));
};

var removeChilds = function(el) {
  for (var i = el.children.length - 1; i >= 0; i--) {
    el.removeChild(el.children[i]);
  }
  return el;
};
