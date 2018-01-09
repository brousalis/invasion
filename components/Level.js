import { enemies } from '../sprites';
import c from '../consts';

var Level = function(levelData, callback) {
  this.levelData = [];
  for (var i = 0; i < levelData.length; i++) {
    this.levelData.push(Object.create(levelData[i]));
  }
  this.t = 0;
  this.callback = callback;
};

Level.prototype.step = function(dt) {
  var idx = 0,
    remove = [],
    curShip = null;

  // Update the current time offset
  this.t += dt * 1000;

  //   Start, End,  Gap, Type,   Override
  // [ 0,     4000, 500, 'step', { x: 100 } ]
  while ((curShip = this.levelData[idx]) && curShip[0] < this.t + 2000) {
    // Check if we've passed the end time
    if (this.t > curShip[1]) {
      remove.push(curShip);
    } else if (curShip[0] < this.t) {
      // Get the enemy definition blueprint
      var enemy = enemies[curShip[3]],
        override = curShip[4];

      // Add a new enemy with the blueprint and override
      this.board.add(new Enemy(enemy, override));

      // Increment the start time by the gap
      curShip[0] += curShip[2];
    }
    idx++;
  }

  // Remove any objects from the levelData that have passed
  for (var i = 0, len = remove.length; i < len; i++) {
    var remIdx = this.levelData.indexOf(remove[i]);
    if (remIdx != -1) this.levelData.splice(remIdx, 1);
  }

  // If there are no more enemies on the board or in
  // levelData, this level is done
  if (this.levelData.length === 0 && this.board.cnt[c.OBJECT_ENEMY] === 0) {
    if (this.callback) this.callback();
  }
};

Level.prototype.draw = function(ctx) {};

export default Level;
