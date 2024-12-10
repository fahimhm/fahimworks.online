function getRandomFox() {
  const values = ['F', 'O', 'X'];
  return values[Math.floor(Math.random() * values.length)];
};

function createArrayFox(length) {
  return Array.from({length}, getRandomFox);
};

function getLeastArray(arrays) {
  return arrays.reduce((minArray, currentArray) => 
    currentArray.length < minArray.length ? currentArray : minArray
  );
};

const initialFox = [
  createArrayFox(3*3),
  createArrayFox(4*4),
  createArrayFox(5*5),
];

function removeLeastArray(arrays) {
  const leastArray = getLeastArray(arrays);
  const index = arrays.indexOf(leastArray);
  if (index > -1) {
    arrays.splice(index, 1);
  };
};

function addNewArray(arrays, length) {
  arrays.push(createArrayFox(length * length));
};

module.exports = { createArrayFox, getLeastArray, initialFox, removeLeastArray, addNewArray };