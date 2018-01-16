import Game from './Game';

function LogoScreen(callback) {
  this.step = function(dt) {
    if (window.play === true) {
      callback();
    }
  };

  this.draw = function(ctx) {
    const img = document.getElementById('image');
    ctx.drawImage(img, Game.width / 2 - img.width / 2, Game.height / 2 - img.height * 2);
  };
}

export default LogoScreen;
