import Game from './components/Game';
import GameBoard from './components/GameBoard';
import GamePoints from './components/GamePoints';
import PlayerShip from './components/PlayerShip';
import Level from './components/Level';

import { sprites } from './sprites';

var level1 = [
  // Start,   End, Gap,  Type,   Override
  [0, 4000, 500, 'step'],
  [6000, 13000, 800, 'ltr'],
  [10000, 16000, 400, 'circle'],
  [17800, 20000, 500, 'straight', { x: 50 }],
  [18200, 20000, 500, 'straight', { x: 90 }],
  [18200, 20000, 500, 'straight', { x: 10 }],
  [22000, 25000, 400, 'wiggle', { x: 150 }],
  [22000, 25000, 400, 'wiggle', { x: 100 }],
];

var startGame = function() {
  var ua = navigator.userAgent.toLowerCase();

  // Only 1 row of stars
  if (ua.match(/android/)) {
    Game.setBoard(0, new Starfield(50, 0.6, 100, true));
  } else {
    Game.setBoard(0, new Starfield(20, 0.4, 100, true));
    Game.setBoard(1, new Starfield(50, 0.6, 100));
    Game.setBoard(2, new Starfield(100, 1.0, 50));
  }

  Game.setBoard(3, new TitleScreen('G-Rally', 'Press fire to start playing', playGame));
};

var playGame = function() {
  var board = new GameBoard();
  board.add(new PlayerShip());
  board.add(new Level(level1, winGame));
  Game.setBoard(3, board);
  Game.setBoard(5, new GamePoints(0));
};

var winGame = function() {
  Game.setBoard(3, new TitleScreen('You win!', 'Press fire to play again', playGame));
};

var loseGame = function() {
  Game.setBoard(3, new TitleScreen('You lose!', 'Press fire to play again', playGame));
};

window.addEventListener('load', function() {
  Game.initialize('game', sprites, startGame);
});
