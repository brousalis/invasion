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
  Game.setBoard(
    3,
    new TitleScreen('Shoot all the enemies to win!', 'Press fire to start (bottom right)', 24, playGame)
  );
};

const playGame = () => {
  window.lost = false;
  $('#lost').hide();
  const board = new GameBoard();
  board.add(new PlayerShip(loseGame));
  board.add(new Level(winGame));

  Game.setBoard(3, board);
  Game.setBoard(5, new GamePoints(0));
};

const winGame = () => {
  Game.setBoard(3, new TitleScreen('You win!', '', 30, playGame));
  saveScore({ winner: true });
};

const loseGame = () => {
  Game.setBoard(3, new TitleScreen('You lose!', '', 30, playGame, false));
  window.lost = true;
  $('#lost').show();
  saveScore({ winner: false });
};

const saveScore = data => {
  const updates = {};
  const url = '/points/' + window.name;
  firebase
    .database()
    .ref(url)
    .once('value')
    .then(function(snapshot) {
      const record = snapshot.val();
      let points = 0;
      if (record) points = record.points;
      if (window.name && Game.points > points) {
        updates[url] = Object.assign(data, { points: Game.points });
        firebase
          .database()
          .ref()
          .update(updates);
      }
    });
};

$(function() {
  Game.initialize('game', sprites, startGame);
  $('#lost-button').click(playGame);
});
