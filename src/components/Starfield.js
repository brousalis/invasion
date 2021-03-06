import Game from './Game';

const Starfield = function(speed, opacity, numStars, clear) {
  // Set up the offscreen canvas
  const stars = document.createElement('canvas');
  stars.width = Game.width;
  stars.height = Game.height;
  const starCtx = stars.getContext('2d');

  let offset = 0;

  // If the clear option is set,
  // make the background black instead of transparent
  if (clear) {
    starCtx.fillStyle = '#000';
    starCtx.fillRect(0, 0, stars.width, stars.height);
  }

  // Now draw a bunch of random 2 pixel
  // rectangles onto the offscreen canvas
  starCtx.fillStyle = '#FFF';
  starCtx.globalAlpha = opacity;
  for (let i = 0; i < numStars; i++) {
    starCtx.fillRect(Math.floor(Math.random() * stars.width), Math.floor(Math.random() * stars.height), 2, 2);
  }

  // This method is called every frame
  // to draw the starfield onto the canvas
  this.draw = function(ctx) {
    const intOffset = Math.floor(offset);
    const remaining = stars.height - intOffset;

    // Draw the top half of the starfield
    if (intOffset > 0) {
      ctx.drawImage(stars, 0, remaining, stars.width, intOffset, 0, 0, stars.width, intOffset);
    }

    // Draw the bottom half of the starfield
    if (remaining > 0) {
      ctx.drawImage(stars, 0, 0, stars.width, remaining, 0, intOffset, stars.width, remaining);
    }
  };

  // This method is called to update
  // the starfield
  this.step = dt => {
    offset += dt * speed;
    offset = offset % stars.height;
  };
};

export default Starfield;
