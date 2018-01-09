import Game from './Game';

const TouchControls = function() {
  const gutterWidth = 10;
  const unitWidth = Game.width / 5;
  const blockWidth = unitWidth - gutterWidth;

  this.drawSquare = function(ctx, x, y, txt, on) {
    ctx.globalAlpha = on ? 0.9 : 0.6;
    ctx.fillStyle = '#CCC';
    ctx.fillRect(x, y, blockWidth, blockWidth);

    ctx.fillStyle = '#FFF';
    ctx.globalAlpha = 1.0;
    ctx.font = 'bold ' + 3 * unitWidth / 4 + 'px arial';

    const txtSize = ctx.measureText(txt);

    ctx.fillText(txt, x + blockWidth / 2 - txtSize.width / 2, y + 3 * blockWidth / 4 + 5);
  };

  this.draw = function(ctx) {
    ctx.save();

    const yLoc = Game.height - unitWidth;
    this.drawSquare(ctx, gutterWidth, yLoc, '\u25C0', Game.keys['left']);
    this.drawSquare(ctx, unitWidth + gutterWidth, yLoc, '\u25B6', Game.keys['right']);
    this.drawSquare(ctx, 4 * unitWidth, yLoc, 'A', Game.keys['fire']);

    ctx.restore();
  };

  this.step = function(dt) {};

  this.trackTouch = function(e) {
    let touch, x;

    e.preventDefault();
    Game.keys['left'] = false;
    Game.keys['right'] = false;
    for (let i = 0; i < e.targetTouches.length; i++) {
      touch = e.targetTouches[i];
      x = touch.pageX / Game.canvasMultiplier - Game.canvas.offsetLeft;
      if (x < unitWidth) {
        Game.keys['left'] = true;
      }
      if (x > unitWidth && x < 2 * unitWidth) {
        Game.keys['right'] = true;
      }
    }

    if (e.type == 'touchstart' || e.type == 'touchend') {
      for (i = 0; i < e.changedTouches.length; i++) {
        touch = e.changedTouches[i];
        x = touch.pageX / Game.canvasMultiplier - Game.canvas.offsetLeft;
        if (x > 4 * unitWidth) {
          Game.keys['fire'] = e.type == 'touchstart';
        }
      }
    }
  };

  Game.canvas.addEventListener('touchstart', this.trackTouch, true);
  Game.canvas.addEventListener('touchmove', this.trackTouch, true);
  Game.canvas.addEventListener('touchend', this.trackTouch, true);

  // For Android
  Game.canvas.addEventListener(
    'dblclick',
    function(e) {
      e.preventDefault();
    },
    true
  );
  Game.canvas.addEventListener(
    'click',
    function(e) {
      e.preventDefault();
    },
    true
  );

  Game.playerOffset = unitWidth + 20;
};

export default TouchControls;
