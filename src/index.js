const initializeGame = () => {
  window.addEventListener('load', () => {
    require('./components/Game');
  });
};

initializeGame();

module.exports = initializeGame;
