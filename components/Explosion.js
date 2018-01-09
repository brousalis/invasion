import Sprite from './Sprite';

var Explosion = function(centerX, centerY) {
  this.setup('explosion', { frame: 0 });
  this.x = centerX - this.w / 2;
  this.y = centerY - this.h / 2;
};

Explosion.prototype = new Sprite();

Explosion.prototype.step = function(dt) {
  this.frame++;
  if (this.frame >= 12) {
    this.board.remove(this);
  }
};

export default Explosion;
