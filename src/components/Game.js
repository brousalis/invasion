import Sprite from './Sprite';
import SpriteSheet from './SpriteSheet';
import GameBoard from './GameBoard';
import PlayerShip from './PlayerShip';
import Level from './Level';
import GamePoints from './GamePoints';
import TitleScreen from './TitleScreen';
import Starfield from './Starfield';
import LogoScreen from './LogoScreen';

const Game = new function() {
  const boards = [];

  // Game Initialization
  this.initialize = function(canvasElementId, sprite_data, callback) {
    this.canvas = document.getElementById(canvasElementId);

    this.playerOffset = 10;
    this.canvasMultiplier = 1;
    this.setupMobile();

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
    if (!this.ctx) {
      return alert('Please upgrade your browser to play');
    }

    this.setupInput();

    this.loop();

    if (this.mobile) {
      this.setBoard(4, new TouchControls());
    }

    SpriteSheet.load(sprite_data, callback);
  };

  // Handle Input
  const KEY_CODES = { 37: 'left', 39: 'right', 32: 'fire' };
  this.keys = {};

  this.setupInput = function() {
    window.addEventListener(
      'keydown',
      function(e) {
        if (KEY_CODES[e.keyCode]) {
          Game.keys[KEY_CODES[e.keyCode]] = true;
          e.preventDefault();
        }
      },
      false
    );

    window.addEventListener(
      'keyup',
      function(e) {
        if (KEY_CODES[e.keyCode]) {
          Game.keys[KEY_CODES[e.keyCode]] = false;
          e.preventDefault();
        }
      },
      false
    );
  };

  let lastTime = new Date().getTime();
  const maxTime = 1 / 30;
  // Game Loop
  this.loop = function() {
    const curTime = new Date().getTime();
    requestAnimationFrame(Game.loop);
    var dt = (curTime - lastTime) / 1000;
    if (dt > maxTime) {
      dt = maxTime;
    }

    for (var i = 0, len = boards.length; i < len; i++) {
      if (boards[i]) {
        boards[i].step(dt);
        boards[i].draw(Game.ctx);
      }
    }
    lastTime = curTime;
  };

  // Change an active game board
  this.setBoard = function(num, board) {
    boards[num] = board;
  };

  this.setupMobile = function() {
    var container = document.getElementById('container'),
      hasTouch = !!('ontouchstart' in window),
      w = window.innerWidth,
      h = window.innerHeight;

    if (hasTouch) {
      this.mobile = true;
    }

    if (screen.width >= 1280 || !hasTouch) {
      return false;
    }

    if (w > h) {
      alert('Please rotate the device and then click OK');
      w = window.innerWidth;
      h = window.innerHeight;
    }

    container.style.height = h * 2 + 'px';
    window.scrollTo(0, 1);

    h = window.innerHeight + 2;
    container.style.height = h + 'px';
    container.style.width = w + 'px';
    container.style.padding = 0;

    // if (h >= this.canvas.height * 1.75 || w >= this.canvas.height * 1.75) {
    this.canvasMultiplier = 1.5;
    this.canvas.width = w / 1.5;
    this.canvas.height = h / 1.5;
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
    // } else {
    // this.canvas.width = w;
    // this.canvas.height = h;
    // }

    this.canvas.style.position = 'absolute';
    this.canvas.style.left = '0px';
    this.canvas.style.top = '0px';
  };
}();

const TouchControls = function() {
  var gutterWidth = 10;
  var unitWidth = Game.width / 5;
  var blockWidth = unitWidth - gutterWidth;

  this.drawSquare = function(ctx, x, y, txt, on, center = false) {
    ctx.globalAlpha = on ? 0.9 : 0.6;
    ctx.fillStyle = '#444444';
    ctx.fillRect(x, y, blockWidth, blockWidth);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = 0.8;
    ctx.font = 'bold ' + 3 * unitWidth / 4 + 'px arial';

    const txtSize = ctx.measureText(txt);
    const yLoc = center ? y + 3 * blockWidth / 4 + 1 : y + 3 * blockWidth / 4 + 5;

    ctx.fillText(txt, x + blockWidth / 2 - txtSize.width / 2, yLoc);
  };

  this.draw = function(ctx) {
    ctx.save();

    const yLoc = Game.height - unitWidth;
    this.drawSquare(ctx, gutterWidth, yLoc, '\u25C0', Game.keys['left']);
    this.drawSquare(ctx, unitWidth + gutterWidth, yLoc, '\u25B6', Game.keys['right']);
    this.drawSquare(ctx, 4 * unitWidth, yLoc, '\u25CF', Game.keys['fire'], true);

    ctx.restore();
  };

  this.step = function(dt) {};

  this.trackTouch = function(e) {
    var touch, x;

    e.preventDefault();
    Game.keys['left'] = false;
    Game.keys['right'] = false;
    for (var i = 0; i < e.targetTouches.length; i++) {
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

export default Game;
