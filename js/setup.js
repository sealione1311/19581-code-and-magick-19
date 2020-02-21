'use strict';
(function () {

  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_NUMBER = 4;
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var setupPlayer = document.querySelector('.setup-player');
  var wizardCoat = setupPlayer.querySelector('.wizard-coat');
  var wizardEyes = setupPlayer.querySelector('.wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var onLoad = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_NUMBER; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  window.backend.load(onLoad, window.popup.onError);
  document.querySelector('.setup-similar').classList.remove('hidden');

  wizardCoat.addEventListener('click', function () {
    var wizardCoatColor = getRandomElement(COAT_COLORS);
    wizardCoat.style.fill = wizardCoatColor;
    setupPlayer.querySelector('input[name=coat-color]').value = wizardCoatColor;
  });

  wizardEyes.addEventListener('click', function () {
    var wizardEyesColor = getRandomElement(EYES_COLORS);
    wizardEyes.style = 'fill:' + wizardEyesColor;
    setupPlayer.querySelector('input[name=eyes-color]').value = wizardEyesColor;
  });

  fireball.addEventListener('click', function () {
    var fireballColor = getRandomElement(FIREBALL_COLORS);
    fireball.style.background = fireballColor;
    fireball.querySelector('input[name=fireball-color]').value = fireballColor;
  });
})();
