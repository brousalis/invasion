import c from '../consts';
import Sprite from './Sprite';

var PlayerMissile = function(x, y) {
  this.setup('missile', { vy: -700, damage: 10 });
  this.x = x - this.w / 2;
  this.y = y - this.h;
};

PlayerMissile.prototype = new Sprite();
PlayerMissile.prototype.type = c.OBJECT_PLAYER_PROJECTILE;

PlayerMissile.prototype.step = function(dt) {
  this.y += this.vy * dt;
  var collision = this.board.collide(this, c.OBJECT_ENEMY);
  if (collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  } else if (this.y < -this.h) {
    this.board.remove(this);
  }
};

export default PlayerMissile;
