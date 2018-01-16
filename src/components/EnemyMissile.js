import Game from './Game';
import Sprite from './Sprite';
import c from '../consts';

const EnemyMissile = function(x, y, missle = 'enemy_missile') {
  this.setup(missle, { frame: 0, vy: 200, damage: 10 });
  this.x = x - this.w / 2;
  this.y = y - this.h / 2;
};

EnemyMissile.prototype = new Sprite();
EnemyMissile.prototype.type = c.OBJECT_ENEMY_PROJECTILE;

EnemyMissile.prototype.step = function(dt) {
  this.y += this.vy * dt;

  this.frame++;
  if (this.frame === 2) this.frame = 0;

  const collision = this.board.collide(this, c.OBJECT_PLAYER);

  if (collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  } else if (this.y > Game.height) {
    this.board.remove(this);
  }
};

export default EnemyMissile;
