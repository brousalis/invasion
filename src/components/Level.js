import Enemy from './Enemy';
import c from '../consts';
import enemies from '../enemies';

const levelOne = [
  // Start,   End, Gap,  Type,   Override

  // [0, 100, 500, 'boss', { x: 90 }],

  [0, 2000, 500, 'peteStraight', { x: 190 }],
  [4000, 6000, 500, 'peteStraight', { x: 50 }],
  [8000, 12000, 500, 'ltr'],

  // gomez snake
  [15000, 18000, 400, 'step'],
  [18000, 23000, 400, 'circle'],

  // sap ship
  [21800, 22800, 300, 'straight', { x: 50 }],
  [22000, 23000, 300, 'straight', { x: 90 }],
  [22000, 23000, 300, 'straight', { x: 10 }],

  // sap ship
  [28800, 29800, 300, 'straight', { x: 250 }],
  [29000, 30000, 300, 'straight', { x: 290 }],
  [29000, 30000, 300, 'straight', { x: 210 }],

  // mcmaster
  [42000, 45000, 400, 'wiggle', { x: 150 }],
  [42000, 45000, 400, 'wiggle', { x: 100 }],
  [45000, 48000, 800, 'ltr', { x: 210 }],
];

function Level(callback) {
  const levelData = levelOne;
  this.levelData = [];
  for (let i = 0; i < levelData.length; i++) {
    this.levelData.push(Object.create(levelData[i]));
  }
  this.t = 0;
  this.callback = callback;
}

Level.prototype.step = function(dt) {
  let idx = 0,
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
      const enemy = enemies[curShip[3]],
        override = curShip[4];

      // Add a new enemy with the blueprint and override
      this.board.add(new Enemy(enemy, override));

      // Increment the start time by the gap
      curShip[0] += curShip[2];
    }
    idx++;
  }

  // Remove any objects from the levelData that have passed
  for (let i = 0, len = remove.length; i < len; i++) {
    const remIdx = this.levelData.indexOf(remove[i]);
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
