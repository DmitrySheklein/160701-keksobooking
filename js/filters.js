'use strict';

(function () {
  var offerNumber = 5;

  var mapFilters = document.querySelector('.map__filters');
  var mapPinsBlock = document.querySelectorAll('.map__pins');
  var houseType = mapFilters.querySelector('#housing-type');
  var housePrice = mapFilters.querySelector('#housing-price');
  var houseRooms = mapFilters.querySelector('#housing-rooms');
  var houseGuests = mapFilters.querySelector('#housing-guests');
  var featuresSelector = mapFilters.querySelector('.map__features');
  var filterWifi = featuresSelector.querySelector('#filter-wifi');
  var filterDishwasher = featuresSelector.querySelector('#filter-dishwasher');
  var filterParking = featuresSelector.querySelector('#filter-parking');
  var filterWasher = featuresSelector.querySelector('#filter-washer');
  var filterElevator = featuresSelector.querySelector('#filter-elevator');
  var filterConditioner = featuresSelector.querySelector('#filter-conditioner');

  var typeCheckboxSelect = featuresSelector.querySelectorAll('[type="checkbox"]');

  var filtersDefaults = {
    'housing-type': 'any',
    'housing-price': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any'
  };

  var filtersFeaturesDefaults = {
    'filter-wifi': false,
    'filter-dishwasher': false,
    'filter-parking': false,
    'filter-washer': false,
    'filter-elevator' : false,
    'filter-conditioner': false
  };

  var featuresClassListMap = {
    'filter-wifi': 'wifi',
    'filter-dishwasher': 'dishwasher',
    'filter-parking': 'parking',
    'filter-washer': 'washer',
    'filter-elevator': 'elevator',
    'filter-conditioner': 'conditioner'
   };

  var filtering = function (obj,arr) {
    var newArr = arr.slice();
    for( var key in obj) {
      if (obj[key] !== false && obj[key] !== "any") {
        var filterName = key.replace("housing-", '');

          newArr = newArr.filter(function(item) {
            return item.offer[filterName] == obj[key];
          });
          console.log("ok", newArr);

          if (filterName == "price") {
            console.log("ok-price", newArr);
            newArr = newArr.filter(function(item) {
              console.log(filterHousingPrice(obj[key], item.offer["price"]));
              // var isGoodPrice = filterHousingPrice(obj[key], item.offer["price"]);
              return item.offer[filterName] == filterHousingPrice(obj[key], item.offer["price"]);
            });
          }




      }
    }
    // console.log(newArr);

    function filterHousingPrice (type, price) {
      var minPrice = 0;
      var middlePrice = 10000;
      var maxPrice = 50000;
      var priceVal = false;

      switch (type) {
        case "any":
          priceVal = true;
          break;
        case "low":
          priceVal = price <= middlePrice;
          break;
        case "middle":
          priceVal = price >= middlePrice && price <= maxPrice;
          break;
        case "high":
          priceVal = price >= maxPrice;
          break;
        default:
          break;
      }
      if (priceVal) {
        return price;
      }
    };


  }

  var data = window.generateData(5);
  var onMapFiltersChange = function (evt) {
    var element = evt.target;
    var value = element.value;
    var id = element.id;

    filtersDefaults[id] = value;
    filtering(filtersDefaults, data);

  }
  var selects = mapFilters.querySelectorAll('select');
  for (var i = 0; i < selects.length; i++) {
    selects[i].addEventListener("change", onMapFiltersChange);
  }
})();

