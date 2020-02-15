'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 130;
  var CLOUD_Y = 10;
  var MARGIN = 20;
  var GAP = 15;
  var COLUMN_WIDTH = 40;
  var COLUMN_MAX_HEIGHT = 150;
  var COLUMN_GAP = 50;
  var TEXT_HEIGHT = 20;
  var HEADING = 40;
  var FONT_TEXT = '16px PT Mono';

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

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomColor = function (color) {
    var randomNumber = getRandomNumber(0, 100);
    return 'hsl(' + color + ', ' + randomNumber + '%, ' + randomNumber + '%)';
  };

  var getColor = function (name) {
    return name === 'Вы' ? 'rgba(255, 0, 0, 1)' : getRandomColor(235);
  };

  var drawPlayerResult = function (ctx, player, time, index, maxTime) {
    var COLUMN_HEIGHT = Math.round(COLUMN_MAX_HEIGHT * time) / maxTime;
    var COLUMN_X = CLOUD_X + MARGIN + (COLUMN_WIDTH + COLUMN_GAP) * index;
    var COLUMN_Y = CLOUD_Y + HEADING + GAP;
    var DIFF_HEIGHTS = COLUMN_MAX_HEIGHT - COLUMN_HEIGHT;

    ctx.fillStyle = getColor(player);
    ctx.fillRect(COLUMN_X, COLUMN_Y + TEXT_HEIGHT + DIFF_HEIGHTS, COLUMN_WIDTH, COLUMN_HEIGHT);
    printText(ctx, '#000', FONT_TEXT, COLUMN_X, COLUMN_Y + 2 * TEXT_HEIGHT + COLUMN_MAX_HEIGHT, player);
    printText(ctx, '#000', FONT_TEXT, COLUMN_X, COLUMN_Y + DIFF_HEIGHTS, Math.round(time));
  };

  window.renderStatistics = function (ctx, players, times) {
    drawCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    drawCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
    printText(ctx, '#000', FONT_TEXT, CLOUD_X + MARGIN, CLOUD_Y + MARGIN, 'Ура вы победили! ');
    printText(ctx, '#000', FONT_TEXT, CLOUD_X + MARGIN, CLOUD_Y + MARGIN + TEXT_HEIGHT, 'Список результатов: ');

    var maxTime = getMaxElement(times);
    for (var i = 0; i < players.length; i++) {
      drawPlayerResult(ctx, players[i], times[i], i, maxTime);
    }
  };
})();
