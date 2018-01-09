import Sprite from './Sprite';
import SpriteSheet from './SpriteSheet';

var KEY_CODES = { 37: 'left', 39: 'right', 32: 'fire' };
var lastTime = new Date().getTime();
var maxTime = 1 / 30;

var Game = new function() {
  var boards = [];

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
  // Game Loop
  this.loop = function() {
    var curTime = new Date().getTime();
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

    if (h >= this.canvas.height * 1.75 || w >= this.canvas.height * 1.75) {
      this.canvasMultiplier = 2;
      this.canvas.width = w / 2;
      this.canvas.height = h / 2;
      this.canvas.style.width = w + 'px';
      this.canvas.style.height = h + 'px';
    } else {
      this.canvas.width = w;
      this.canvas.height = h;
    }

    this.canvas.style.position = 'absolute';
    this.canvas.style.left = '0px';
    this.canvas.style.top = '0px';
  };
}();

export default Game;
