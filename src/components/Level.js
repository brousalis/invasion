import Enemy from './Enemy';
import c from '../consts';
import enemies from '../enemies';

const levelOne = [
  // Start,   End, Gap,  Type,   Override

  [0, 2000, 500, 'peteStraight', { x: 190 }],
  [4006, 6000, 500, 'mackeyStraight', { x: 20 }],
  [8000, 10000, 500, 'mharStraight', { x: 180 }],
  // [8000, 1200, 500, 'ltr'],

  // gomez snake
  [13500, 17000, 400, 'step'],

  // dan
  [21000, 23500, 500, 'ltr'],

  // sap ship
  [24800, 25800, 300, 'sap', { x: 50 }],
  [25000, 26000, 300, 'sap', { x: 90 }],
  [25000, 26000, 300, 'sap', { x: 10 }],

  // sap ship
  [29800, 30800, 300, 'sap', { x: 160 }],
  [30000, 31000, 300, 'sap', { x: 200 }],
  [30000, 31000, 300, 'sap', { x: 120 }],

  // mcmaster
  [34000, 36500, 400, 'wiggle', { x: 120 }],
  [34000, 36500, 400, 'wiggle', { x: 70 }],

  // gomez circle
  [42000, 50000, 400, 'circle'],

  // horizontal part
  [60000, 60100, 400, 'rich', { x: -50, y: 120 }],
  [60000, 60100, 400, 'richMed', { x: -50, y: 20 }],
  [60000, 60100, 400, 'richFast', { x: -50, y: 70 }],

  [66000, 66100, 400, 'mackeyStraight', { x: 190 }],
  [66000, 66100, 400, 'rich'],
  [68000, 68100, 400, 'mharStraight'],

  // amazon boss
  [75000, 75100, 100, 'boss', { x: 90 }],
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
