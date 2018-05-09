'use strict';

(function () {
  var SUCCESS_STATUS = 200;
  var TIMEOUT = 10000;
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';

  var errorMsgOnLoad = 'Статус ответа: ';
  var errorMsgOnError = 'Произошла ошибка соединения';
  var errorMsgOnTimeout = 'Превышен лимит ожидания: ';

  window.backend = {
    upload: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_STATUS) {
          onSuccess(xhr.response);
        } else {
          onError(errorMsgOnLoad + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError(errorMsgOnError);
      });

      xhr.addEventListener('timeout', function () {
        onError(errorMsgOnTimeout + xhr.timeout);
      });

      xhr.timeout = TIMEOUT;

      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    },
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_STATUS) {
          onSuccess(xhr.response);
        } else {
          onError(errorMsgOnLoad + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError(errorMsgOnError);
      });

      xhr.addEventListener('timeout', function () {
        onError(errorMsgOnTimeout + xhr.timeout);
      });

      xhr.open('GET', URL_LOAD);
      xhr.send();
    }
  };

})();
