'use strict';

(function () {

  var form = document.querySelector(".ad-form");
  var formCheckIn = form.querySelector('#timein');
  var formCheckOut = form.querySelector('#timeout');
  var formType = form.querySelector("#type");
  var formPrice = form.querySelector("#price");
  var formRooms = form.querySelector("#room_number");
  var formGuests = form.querySelector("#capacity");


  var formCheckHandler = function (e) {
    var selectTarget = e.target.id === 'timein' ? formCheckIn : formCheckOut;
    var selectCompare = e.target.id === 'timein' ? formCheckOut : formCheckIn;
    selectCompare.value = selectTarget.options[selectTarget.selectedIndex].value;
  }

  var formTypeHandler = function (e) {
    var offerType = e.target.value;
    if (Object.getOwnPropertyNames(OFFER_TYPES).includes(offerType)) {
      formPrice.min = OFFER_TYPES[offerType].price;
      formPrice.placeholder = OFFER_TYPES[offerType].price;
    } else {
      formPrice.min = '0';
      formPrice.placeholder = '0';
    }
  }

  var formRoomsHandler = function () {
    var roomsValue = formRooms.options[formRooms.selectedIndex].value;
    var guestsValue = formGuests.options[formGuests.selectedIndex].value;

    if (roomsValue === "1" && guestsValue !== "1") {
      formGuests.setCustomValidity("Подходит только для 1 гостя");
    } else if (roomsValue === "2" && guestsValue !== "1" && guestsValue !== "2") {
      formGuests.setCustomValidity("Подходит только для 1 или 2 гостей");
    } else if (roomsValue === "3" && guestsValue !== "1" && guestsValue !== "2" && guestsValue !== "3") {
      formGuests.setCustomValidity("Подходит только для 1,2 или 3 гостей");
    } else if (roomsValue === "100" && guestsValue !== "0") {
      formGuests.setCustomValidity("Не подходит для гостей");
    } else {
      formGuests.setCustomValidity("");
    }
  }

  formRooms.addEventListener("change", formRoomsHandler);
  formGuests.addEventListener("change", formRoomsHandler);

  formCheckIn.addEventListener("change", formCheckHandler);
  formCheckOut.addEventListener("change", formCheckHandler);

  formType.addEventListener("change", formTypeHandler);
})()
