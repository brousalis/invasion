import Game from './Game';

const TitleScreen = function TitleScreen(title, subtitle, callback) {
  let up = false;

  this.step = function(dt) {
    if (!Game.keys['fire']) up = true;
    if (up && Game.keys['fire'] && callback) callback();
  };

  this.draw = function(ctx) {
    ctx.fillStyle = '#FFFFFF';

    ctx.font = 'bold 40px';
    const measure = ctx.measureText(title);
    ctx.fillText(title, Game.width / 2 - measure.width / 2, Game.height / 2);

    ctx.font = 'bold 20px';
    const measure2 = ctx.measureText(subtitle);
    ctx.fillText(subtitle, Game.width / 2 - measure2.width / 2, Game.height / 2 + 40);
  };
};

export default TitleScreen;
