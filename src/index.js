import Sprite from './components/Sprite';
import SpriteSheet from './components/SpriteSheet';
import GameBoard from './components/GameBoard';
import PlayerShip from './components/PlayerShip';
import Level from './components/Level';
import GamePoints from './components/GamePoints';
import TitleScreen from './components/TitleScreen';
import Starfield from './components/Starfield';
import LogoScreen from './components/LogoScreen';
import Game from './components/Game';
import sprites from './sprites';

const startGame = () => {
  Game.setBoard(0, new Starfield(50, 0.2, 100, true));
  Game.setBoard(1, new Starfield(20, 0.1, 100));
  Game.setBoard(2, new Starfield(70, 0.4, 100));
  Game.setBoard(3, new LogoScreen(helpGame));
};

const helpGame = () => {
  Game.setBoard(3, new TitleScreen('Shoot the ships to win!', 'Press fire to start', 20, playGame));
};

const playGame = () => {
  const board = new GameBoard();
  board.add(new PlayerShip(loseGame));
  board.add(new Level(winGame));

  Game.setBoard(3, board);
  Game.setBoard(5, new GamePoints(0));
};

const winGame = () => {
  Game.setBoard(3, new TitleScreen('You win!', 'Press fire to play again', 40, playGame));
  var updates = {};
  updates['/points/' + window.name] = Game.points;
  firebase
    .database()
    .ref()
    .update(updates);
};

const loseGame = () => {
  Game.setBoard(3, new TitleScreen('You lose!', 'Press fire to play again', 40, playGame));
  var updates = {};
  updates['/points/' + window.name] = Game.points;
  firebase
    .database()
    .ref()
    .update(updates);
};

window.addEventListener('load', () => {
  Game.initialize('game', sprites, startGame);
});
