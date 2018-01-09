const SpriteSheet = new function() {
  this.map = {};

  this.load = function(spriteData, callback) {
    this.map = spriteData;
    this.image = new Image();
    this.image.onload = callback;
    this.image.src = require('../sprites.png');
    document.body.appendChild(this.image);
  };

  this.draw = function(ctx, sprite, x, y, frame) {
    const s = this.map[sprite];
    if (!frame) frame = 0;
    ctx.drawImage(this.image, s.sx + frame * s.w, s.sy, s.w, s.h, Math.floor(x), Math.floor(y), s.w, s.h);
  };

  return this;
}();

export default SpriteSheet;
