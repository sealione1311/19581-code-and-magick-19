'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_NUMBER = 4;
var wizards = [];
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');


var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getArrayWizards = function (wizardsarray, names, surnames, coatColors, eyesColors) {
  wizardsarray[i] = {
    name: getRandomElement(names) + ' ' + getRandomElement(surnames),
    coatColor: getRandomElement(coatColors),
    eyesColor: getRandomElement(eyesColors)
  };
  wizardsarray.push(wizardsarray[i]);
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var renderWizards = function (wizardsarray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardsarray.length; i++) {
    fragment.appendChild(renderWizard(wizardsarray[i]));
  }
  return fragment;
};

for (var i = 0; i < WIZARDS_NUMBER - 1; i++) {
  getArrayWizards(wizards, NAMES, SURNAMES, COAT_COLORS, EYES_COLORS);
}

document.querySelector('.setup').classList.remove('hidden');
similarListElement.appendChild(renderWizards(wizards));
document.querySelector('.setup-similar').classList.remove('hidden');
