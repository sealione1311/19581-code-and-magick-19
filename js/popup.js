'use strict';

(function () {

  var Keys = {
    ESC: 'Escape',
    ENTER: 'Enter'
  };
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = document.querySelector('.setup-user-name');
  var form = setup.querySelector('.setup-wizard-form');

  var onPopupEscPress = function (evt) {
    if (evt.key === Keys.ESC && userNameInput !== evt.target) {
      closePopup();
    }
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setup.style.top = '';
    setup.style.left = '';
  };

  var createElement = function (tag, parentClass) {
    var elementNew = document.createElement(tag);
    var parent = document.querySelector(parentClass);
    parent.append(elementNew);
    return elementNew;
  };

  var spanError = createElement('span', '.setup');

  var onLoad = function () {
    closePopup();
  };

  var onError = function (errorMassage) {
    spanError.textContent = errorMassage;
    spanError.setAttribute('style', 'color: black');
  };

  setupOpen.addEventListener('click', openPopup);

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === Keys.ENTER) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', closePopup);

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.key === Keys.ENTER) {
      closePopup();
    }
  });

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onLoad, onError);
  });

  window.popup = {
    onError: onError
  };
})();
