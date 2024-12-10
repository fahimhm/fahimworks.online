function getRandomFox() {
  const values = ['F', 'O', 'X'];
  return values[Math.floor(Math.random() * values.length)];
}

function createArrayFox(length) {
  return Array.from({length}, getRandomFox);
}

module.exports = { createArrayFox };