'use strict';

(function () {
  var offerNumber = 5;

  var mapFilters = document.querySelector('.map__filters');
  var mapPinsBlock = document.querySelectorAll('.map__pins');
  var houseType = mapFilters.querySelector('#housing-type');
  console.log(houseType);
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
    for( var key in obj) {
      if (obj[key] !== false && obj[key] !== "any") {
        var filterName = key.replace("housing-", '');

        var newArr = arr.filter(function (item) {
          return item.offer[filterName] == obj[key];
        })
        console.log(newArr);

      }
    }
  }
  var onMapFiltersChange = function (evt) {
    var element = evt.target;
    var value = element.value;
    var id = element.id;

    filtersDefaults[id] = value;

    var data = window.generateData(8)
    filtering(filtersDefaults, data);

  }

  houseType.addEventListener("change", onMapFiltersChange);
})();

