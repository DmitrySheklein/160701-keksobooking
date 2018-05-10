'use strict';

(function () {
  var OFFER_TYPES = {
    flat: {
      name: 'Квартира',
      price: '1000'
    },
    house: {
      name: 'Дом',
      price: '5000'
    },
    palace: {
      name: 'Дворец',
      price: '10000'
    },
    bungalo: {
      name: 'Бунгало',
      price: '0'
    }
  };
  var offerData = null;
  window.data = {
    types: OFFER_TYPES,
    content: offerData
  };
})();
