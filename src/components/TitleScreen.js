import Game from './Game';

function TitleScreen(title, subtitle, size = 15, callback) {
  let up = false;

  this.step = function(dt) {
    if (!Game.keys['fire']) {
      up = true;
    }
    if (up && Game.keys['fire'] && callback) {
      callback();
    }
  };
  const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
    var words = text.split(' ');
    var line = '';

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  };
  this.draw = function(ctx) {
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';

    ctx.font = `bold ${size}px Arial`;
    wrapText(ctx, title, Game.width / 2, Game.height / 2 - 50, Game.width - 40, 25);

    ctx.font = 'bold 12px Arial';
    ctx.fillText(subtitle, Game.width / 2, Game.height / 2 + 30);
  };
}

export default TitleScreen;
