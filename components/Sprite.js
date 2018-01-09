import SpriteSheet from './SpriteSheet';

var Sprite = function() {};

Sprite.prototype.setup = function(sprite, props) {
  this.sprite = sprite;
  this.merge(props);
  this.frame = this.frame || 0;
  this.w = SpriteSheet.map[sprite].w;
  this.h = SpriteSheet.map[sprite].h;
};

Sprite.prototype.merge = function(props) {
  if (props) {
    for (var prop in props) {
      this[prop] = props[prop];
    }
  }
};

Sprite.prototype.draw = function(ctx) {
  SpriteSheet.draw(ctx, this.sprite, this.x, this.y, this.frame);
};

Sprite.prototype.hit = function(damage) {
  this.board.remove(this);
};

export default Sprite;
