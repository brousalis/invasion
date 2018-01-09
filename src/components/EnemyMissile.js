import Game from './Game';
import Sprite from './Sprite';
import c from '../consts';

const EnemyMissile = function(x, y) {
  this.setup('enemy_missile', { vy: 200, damage: 10 });
  this.x = x - this.w / 2;
  this.y = y;
};

EnemyMissile.prototype = new Sprite();
EnemyMissile.prototype.type = c.OBJECT_ENEMY_PROJECTILE;

EnemyMissile.prototype.step = function(dt) {
  this.y += this.vy * dt;
  const collision = this.board.collide(this, c.OBJECT_PLAYER);
  if (collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  } else if (this.y > Game.height) {
    this.board.remove(this);
  }
};

export default EnemyMissile;
