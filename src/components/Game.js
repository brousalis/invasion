import Sprite from './Sprite';
import SpriteSheet from './SpriteSheet';
import GameBoard from './GameBoard';
import PlayerShip from './PlayerShip';
import Level from './Level';
import GamePoints from './GamePoints';
import TitleScreen from './TitleScreen';
import TouchControls from './TouchControls';
import Starfield from './Starfield';
import LogoScreen from './LogoScreen';
import sprites from '../sprites';

const KEY_CODES = { 37: 'left', 39: 'right', 32: 'fire' };
const GAME_WIDTH = 380;
const GAME_HEIGHT = 480;

let lastTime = new Date().getTime();
let maxTime = 1 / 30;

class Game {
  constructor() {
    this.keys = {};
    this.boards = [];

    this.canvas = document.getElementById('game');
    this.canvas.width = GAME_WIDTH;
    this.canvas.height = GAME_HEIGHT;

    this.playerOffset = 10;
    this.canvasMultiplier = 1;

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.ctx = this.canvas.getContext && this.canvas.getContext('2d');

    if (!this.ctx) {
      return alert('Please upgrade your browser to play');
    }

    this.setupInput();
    this.setupMobile();

    if (this.mobile) {
      this.setBoard(4, new TouchControls());
    }

    this.loop = this.loop.bind(this);
    this.setBoard = this.setBoard.bind(this);
    this.setupInput = this.setupInput.bind(this);
    this.startGame = this.startGame.bind(this);
    this.playGame = this.playGame.bind(this);
    this.loseGame = this.loseGame.bind(this);
    this.winGame = this.winGame.bind(this);
    this.helpGame = this.helpGame.bind(this);

    this.loop();

    SpriteSheet.load(sprites, this.startGame);
  }

  setBoard(num, board) {
    this.boards[num] = board;
  }

  startGame() {
    this.setBoard(0, new Starfield(50, 0.2, 100, true));
    this.setBoard(1, new Starfield(20, 0.1, 100));
    this.setBoard(2, new Starfield(70, 0.4, 100));
    this.setBoard(3, new LogoScreen(this.helpGame));
  }

  helpGame() {
    this.setBoard(3, new TitleScreen('Shoot the ships to win!', 'Press fire to start', 20, this.playGame));
  }

  playGame() {
    const board = new GameBoard();
    board.add(new PlayerShip());
    board.add(new Level(this.winGame));

    this.setBoard(3, board);
    this.setBoard(5, new GamePoints(0));
  }

  winGame() {
    this.setBoard(3, new TitleScreen('You win!', 'Press fire to play again', 40, this.playGame));
    var updates = {};
    updates['/points/' + window.name] = this.points;
    firebase
      .database()
      .ref()
      .update(updates);
  }

  loseGame() {
    this.setBoard(3, new TitleScreen('You lose!', 'Press fire to play again', 40, this.playGame));
    var updates = {};
    updates['/points/' + window.name] = this.points;
    firebase
      .database()
      .ref()
      .update(updates);
  }

  setupInput() {
    const game = this;
    window.addEventListener(
      'keydown',
      e => {
        if (KEY_CODES[e.keyCode]) {
          this.keys[KEY_CODES[e.keyCode]] = true;
          e.preventDefault();
        }
      },
      false
    );

    window.addEventListener(
      'keyup',
      e => {
        if (KEY_CODES[e.keyCode]) {
          this.keys[KEY_CODES[e.keyCode]] = false;
          e.preventDefault();
        }
      },
      false
    );
  }

  loop() {
    const curTime = new Date().getTime();
    requestAnimationFrame(this.loop);
    let dt = (curTime - lastTime) / 1000;
    if (dt > maxTime) {
      dt = maxTime;
    }

    for (let i = 0, len = this.boards.length; i < len; i++) {
      if (this.boards[i]) {
        this.boards[i].step(dt);
        this.boards[i].draw(this.ctx);
      }
    }
    lastTime = curTime;
  }

  setupMobile() {
    let container = document.getElementById('container'),
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
  }
}

export default new Game();
