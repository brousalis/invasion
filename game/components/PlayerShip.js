import Sprite from './Sprite';
import PlayerMissile from './PlayerMissile';
import Game from './Game';
import c from '../consts';

const PlayerShip = function() {
  this.setup('ship', { vx: 0, reloadTime: 0.25, maxVel: 200 });

  this.reload = this.reloadTime;
  this.x = Game.width / 2 - this.w / 2;
  this.y = Game.height - Game.playerOffset - this.h;

  this.step = function(dt) {
    if (Game.keys['left']) {
      this.vx = -this.maxVel;
    } else if (Game.keys['right']) {
      this.vx = this.maxVel;
    } else {
      this.vx = 0;
    }

    this.x += this.vx * dt;

    if (this.x < 0) {
      this.x = 0;
    } else if (this.x > Game.width - this.w) {
      this.x = Game.width - this.w;
    }

    this.reload -= dt;
    if (Game.keys['fire'] && this.reload < 0) {
      Game.keys['fire'] = false;
      this.reload = this.reloadTime;

      this.board.add(new PlayerMissile(this.x, this.y + this.h / 2));
      this.board.add(new PlayerMissile(this.x + this.w, this.y + this.h / 2));
    }
  };
};

PlayerShip.prototype = new Sprite();
PlayerShip.prototype.type = c.OBJECT_PLAYER;

PlayerShip.prototype.hit = function(damage) {
  if (this.board.remove(this)) {
    Game.loseGame();
  }
};

export default PlayerShip;
