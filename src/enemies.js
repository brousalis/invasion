export default {
  boss: {
    x: 0,
    y: -50,
    sprite: 'enemy_boss',
    health: 200,
    A: 0,
    B: -100,
    C: 2,
    E: 20,
    F: 100,
    G: 2,
    H: Math.PI / 2,
    missiles: 2,
    boss: true,
  },
  sap: {
    x: 0,
    y: -50,
    sprite: 'enemy_sap',
    health: 10,
    E: 100,
  },
  mackeyStraight: {
    x: 0,
    y: -50,
    sprite: 'enemy_mackey',
    health: 10,
    E: 100,
  },
  mharStraight: {
    x: 0,
    y: -50,
    sprite: 'enemy_mhar',
    health: 10,
    E: 100,
  },
  peteStraight: {
    x: 0,
    y: -50,
    sprite: 'enemy_pete',
    health: 10,
    E: 100,
  },
  richMed: {
    x: -50,
    y: 0,
    sprite: 'enemy_rich',
    health: 20,
    A: 70,
    E: 0,
    package: true,
  },
  richFast: {
    x: -50,
    y: 0,
    sprite: 'enemy_rich',
    health: 20,
    A: 90,
    E: 0,
    package: true,
  },
  rich: {
    x: -50,
    package: true,
    y: 50,
    sprite: 'enemy_rich',
    health: 20,
    A: 40,
    E: 0,
  },
  ltr: {
    x: 0,
    y: -50,
    sprite: 'enemy_dan',
    health: 10,
    B: 75,
    C: 1,
    E: 80,
  },
  circle: {
    x: 210,
    y: -50,
    sprite: 'enemy_gomez',
    health: 10,
    A: 0,
    B: -100,
    C: 1,
    E: 25,
    F: 100,
    G: 1,
    H: Math.PI / 2,
  },
  wiggle: {
    x: 100,
    y: -50,
    sprite: 'enemy_mcmaster',
    health: 10,
    B: 50,
    C: 4,
    E: 100,
    missiles: 1,
  },
  step: {
    x: 0,
    y: -50,
    sprite: 'enemy_gomez',
    health: 10,
    B: 150,
    C: 1.2,
    E: 55,
    missiles: 2,
  },
};
