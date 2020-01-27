'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var MARGIN = 20;
var GAP = 15;
var COLUMN_WIDTH = 40;
var COLUMN_MAX_HEIGHT = 150;
var COLUMN_GAP = 50;
var TEXT_HEIGHT = 20;
var HEADING = 40;
var fontText = '16px PT Mono';

var drawCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var printText = function (ctx, style, font, x, y, text) {
  ctx.fillStyle = style;
  ctx.font = font;
  ctx.fillText(text, x, y);
};

var getMaxElement = function (array) {
  var maxElement = array[0];
  for (var i = 1; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }
  return maxElement;
};

var setRandomWholeNumber = function () {
  return Math.round(Math.random() * 100);
};

var setRandomColor = function (ctx, color) {
  ctx.fillStyle = 'hsl(' + color + ', ' + setRandomWholeNumber() + '%, ' + setRandomWholeNumber() + '%)';
};

window.renderStatistics = function (ctx, players, times) {
  drawCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  drawCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  printText(ctx, '#000', fontText, CLOUD_X + MARGIN, CLOUD_Y + MARGIN, 'Ура вы победили! ');
  printText(ctx, '#000', fontText, CLOUD_X + MARGIN, CLOUD_Y + MARGIN + TEXT_HEIGHT, 'Список результатов: ');

  var maxTime = getMaxElement(times);

  var setColor = function (names) {
    ctx.fillStyle = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : setRandomColor(ctx, 235);
  };

  var drawStatisticsCloud = function () {
    var COLUMN_HEIGHT = Math.round(COLUMN_MAX_HEIGHT * times[i]) / maxTime;
    var COLUMN_X = CLOUD_X + MARGIN + (COLUMN_WIDTH + COLUMN_GAP) * i;
    var COLUMN_Y = CLOUD_Y + HEADING + GAP;
    var DIFF_HEIGHTS = COLUMN_MAX_HEIGHT - COLUMN_HEIGHT;

    setColor(players);
    ctx.fillRect(COLUMN_X, COLUMN_Y + TEXT_HEIGHT + DIFF_HEIGHTS, COLUMN_WIDTH, COLUMN_HEIGHT);
    printText(ctx, '#000', fontText, COLUMN_X, COLUMN_Y + 2 * TEXT_HEIGHT + COLUMN_MAX_HEIGHT, players[i]);
    printText(ctx, '#000', fontText, COLUMN_X, COLUMN_Y + DIFF_HEIGHTS, Math.round(times[i]));
  };

  for (var i = 0; i < players.length; i++) {
    drawStatisticsCloud();
  }
};
