import Game from './Game';

const GamePoints = function() {
  Game.points = 0;

  const pointsLength = 6;

  this.draw = ctx => {
    ctx.save();
    ctx.font = 'bold 18px arial';
    ctx.fillStyle = '#FFFFFF';

    const txt = '' + Game.points;
    let i = pointsLength - txt.length,
      zeros = '';
    while (i-- > 0) {
      zeros += '0';
    }

    ctx.fillText(zeros + txt, 35, 20);
    ctx.restore();
  };

  this.step = dt => {};
};

export default GamePoints;
