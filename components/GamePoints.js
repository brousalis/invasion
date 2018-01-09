var GamePoints = function() {
  Game.points = 0;

  var pointsLength = 8;

  this.draw = function(ctx) {
    ctx.save();
    ctx.font = 'bold 18px arial';
    ctx.fillStyle = '#FFFFFF';

    var txt = '' + Game.points;
    var i = pointsLength - txt.length,
      zeros = '';
    while (i-- > 0) {
      zeros += '0';
    }

    ctx.fillText(zeros + txt, 10, 20);
    ctx.restore();
  };

  this.step = function(dt) {};
};

export default GamePoints;
