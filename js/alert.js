'use strict';

(function () {
  var TIMEOUT = 3000;

  window.alert = {
    success: function () {
      var successBlock = document.querySelector('.success');
      successBlock.classList.remove('hidden');
      setTimeout(function () {
        successBlock.classList.add('hidden');
      }, TIMEOUT);
      window.state.reset();
    },
    error: function (errorMsg) {
      console.log(errorMsg);
      var deleteError = function () {
        document.querySelector('.error-message').remove();
      }

      var errorBlock = document.createElement('div');
      errorBlock.classList.add('error-message');
      errorBlock.textContent = errorMsg;
      document.body.appendChild(errorBlock);
      setTimeout(deleteError, TIMEOUT);
    }
  }
})();
