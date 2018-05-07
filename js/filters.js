'use strict';

(function () {
  var offerNumber = 5;

  var mapFilters = document.querySelector('.map__filters');
  var mapPinsBlock = document.querySelectorAll('.map__pins');
  var featuresSelector = mapFilters.querySelector('.map__features');
  var typeCheckboxSelect = featuresSelector.querySelectorAll('[type="checkbox"]');
  var selects = mapFilters.querySelectorAll('select');

  var filtersDefaults = {
    'housing-type': 'any',
    'housing-price': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any',
    'filter-wifi': false,
    'filter-dishwasher': false,
    'filter-parking': false,
    'filter-washer': false,
    'filter-elevator': false,
    'filter-conditioner': false

  };


  window.filtering = function (obj,arr) {
    var newArr = arr.slice();

    for( var key in obj) {
      if (obj[key] !== false && obj[key] !== "any") {
        // Обычный селект
        var filterName = key.replace("housing-", '');
        // Если это чекбокс фильтр
        var isFilter = filterName.indexOf('filter-') !== -1;
        if (isFilter) {
          filterName = key.replace("filter-", '')
        }
          // Если это фильтр по цене
          if (filterName == "price") {
            newArr = newArr.filter(function(item) {
              // console.log(filterHousingPrice(obj[key], item.offer["price"]));
              var isGoodPrice = filterHousingPrice(obj[key], item.offer["price"]);
              return item.offer[filterName] == isGoodPrice;
            });
            //Если это фильтр по фичам
          } else if (isFilter) {
            newArr = newArr.filter(function (item) {
              return item.offer.features.indexOf(filterName) !== -1;
            });
            //Стандарт
          }  else {
            newArr = newArr.filter(function(item) {
              return item.offer[filterName] == obj[key];
            });
          }

      }
    }
    // Дебаг
    newArr.forEach(function(item, i){
      if (i == 0) {
        console.log('///////');

      }
      var msg = i
          msg += ' --- Тип - '
          msg += item.offer.type
          msg += ' Цена - '
          msg += item.offer.price
          msg += ' Фичи  {'
          msg += item.offer.features.join('|')
          msg += '}'
          console.log(msg);
      if (i == newArr.length -1 ) {
        console.log("///////");
      }
    })


    if (newArr.length == 0) {
      console.log('нет совпадений');
    }
    //
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

    return newArr;
  }

  var data = window.generateData(5);
  var onMapFiltersChange = function (evt) {
    var element = evt.target;
    var value = element.value;
    var id = element.id;
    var isCheckbox = evt.target.type === 'checkbox';
    var isCheckboxChecked = element.checked;

    // Удаление и добавление значения в объекте, если это чекбокс
    if (isCheckbox) {
      if (isCheckboxChecked) {
          filtersDefaults[id] = value;
      }else {
          filtersDefaults[id] = false;
      }
    //Иначе если селект
    } else {
      filtersDefaults[id] = value;
    }

    // Запуск функции сортировки
    window.filtering(filtersDefaults, data);
  }


  for (var i = 0; i < selects.length; i++) {
    selects[i].addEventListener("change", onMapFiltersChange);
  }

  for (var i = 0; i < typeCheckboxSelect.length; i++) {
    typeCheckboxSelect[i].addEventListener("change", onMapFiltersChange);
  }


})();

