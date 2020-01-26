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
  for (var i = 0; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  drawCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  drawCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  printText(ctx, '#000', fontText, CLOUD_X + MARGIN, CLOUD_Y + MARGIN, 'Ура вы победили! ');
  printText(ctx, '#000', fontText, CLOUD_X + MARGIN, CLOUD_Y + MARGIN + TEXT_HEIGHT, 'Список результатов: ');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var saturation = Math.round(Math.random() * 100);
      ctx.fillStyle = 'hsl(235,' + saturation + '%, 39%)';
    }

    var COLUMN_HEIGHT = Math.round(COLUMN_MAX_HEIGHT * times[i]) / maxTime;

    ctx.fillRect(CLOUD_X + MARGIN + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + HEADING + TEXT_HEIGHT + GAP + (COLUMN_MAX_HEIGHT - COLUMN_HEIGHT), COLUMN_WIDTH, COLUMN_HEIGHT);
    printText(ctx, '#000', fontText, CLOUD_X + MARGIN + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + HEADING + GAP + TEXT_HEIGHT + COLUMN_MAX_HEIGHT + TEXT_HEIGHT, players[i]);
    printText(ctx, '#000', fontText, CLOUD_X + MARGIN + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + GAP + HEADING + (COLUMN_MAX_HEIGHT - COLUMN_HEIGHT), Math.round(times[i]));
  }
};
