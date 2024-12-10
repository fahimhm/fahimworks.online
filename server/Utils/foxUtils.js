function getRandomFox() {
  const values = ['F', 'O', 'X'];
  return values[Math.floor(Math.random() * values.length)];
};

function createArrayFox(length) {
  const foxLetters = ['F', 'O', 'X'];
  let foxArray = Array(length * length).fill(null);

  const directions = ['horizontal', 'vertical', 'diagonalUp', 'diagonalDown'];
  const direction = directions[Math.floor(Math.random() * directions.length)];
  const forward = Math.random() < 0.5;

  const { startRow, startCol } = getStartPosition(direction, length);

  placeFox(foxArray, foxLetters, direction, forward, startRow, startCol, length);

  foxArray = foxArray.map(value => value === null ? getRandomFox() : value);

  return foxArray;
}

function getStartPosition(direction, length) {
  let startRow, startCol;
  if (direction === 'horizontal') {
    startRow = Math.floor(Math.random() * length);
    startCol = Math.floor(Math.random() * (length - 3));
  } else if (direction === 'vertical') {
    startRow = Math.floor(Math.random() * (length - 3));
    startCol = Math.floor(Math.random() * length);
  } else if (direction === 'diagonalUp') {
    startCol = Math.floor(Math.random() * (length - 3));
    startRow = Math.floor(Math.random() * length);
    if (startRow < length - 1) {
      startRow = length - 1;
    }
  } else {
    startRow = Math.floor(Math.random() * (length - 3));
    startCol = Math.floor(Math.random() * (length - 3));
  }
  return { startRow, startCol };
}

function placeFox(foxArray, foxLetters, direction, forward, startRow, startCol, length) {
  if (direction === 'horizontal') {
    placeHorizontal(foxArray, foxLetters, forward, startRow, startCol, length);
  } else if (direction === 'vertical') {
    placeVertical(foxArray, foxLetters, forward, startRow, startCol, length);
  } else if (direction === 'diagonalDown') {
    placeDiagonalDown(foxArray, foxLetters, forward, startRow, startCol, length);
  } else if (direction === 'diagonalUp') {
    placeDiagonalUp(foxArray, foxLetters, forward, startRow, startCol, length);
  }
}

function placeHorizontal(foxArray, foxLetters, forward, startRow, startCol, length) {
  if (forward) {
    foxArray[startRow * length + (startCol + 0)] = foxLetters[0];
    foxArray[startRow * length + (startCol + 1)] = foxLetters[1];
    foxArray[startRow * length + (startCol + 2)] = foxLetters[2];
  } else {
    foxArray[startRow * length + (startCol + 2)] = foxLetters[0];
    foxArray[startRow * length + (startCol + 1)] = foxLetters[1];
    foxArray[startRow * length + (startCol + 0)] = foxLetters[2];
  }
}

function placeVertical(foxArray, foxLetters, forward, startRow, startCol, length) {
  if (forward) {
    foxArray[(startRow + 0) * length + startCol] = foxLetters[0];
    foxArray[(startRow + 1) * length + startCol] = foxLetters[1];
    foxArray[(startRow + 2) * length + startCol] = foxLetters[2];
  } else {
    foxArray[(startRow + 2) * length + startCol] = foxLetters[0];
    foxArray[(startRow + 1) * length + startCol] = foxLetters[1];
    foxArray[(startRow + 0) * length + startCol] = foxLetters[2];
  }
}

function placeDiagonalDown(foxArray, foxLetters, forward, startRow, startCol, length) {
  if (forward) {
    foxArray[(startRow + 0) * length + (startCol + 0)] = foxLetters[0];
    foxArray[(startRow + 1) * length + (startCol + 1)] = foxLetters[1];
    foxArray[(startRow + 2) * length + (startCol + 2)] = foxLetters[2];
  } else {
    foxArray[(startRow + 0) * length + (startCol + 0)] = foxLetters[2];
    foxArray[(startRow + 1) * length + (startCol + 1)] = foxLetters[1];
    foxArray[(startRow + 2) * length + (startCol + 2)] = foxLetters[0];
  }
}

function placeDiagonalUp(foxArray, foxLetters, forward, startRow, startCol, length) {
  if (forward) {
    foxArray[(startRow - 0) * length + (startCol + 0)] = foxLetters[0];
    foxArray[(startRow - 1) * length + (startCol + 1)] = foxLetters[1];
    foxArray[(startRow - 2) * length + (startCol + 2)] = foxLetters[2];
  } else {
    foxArray[(startRow - 0) * length + (startCol + 0)] = foxLetters[2];
    foxArray[(startRow - 1) * length + (startCol + 1)] = foxLetters[1];
    foxArray[(startRow - 2) * length + (startCol + 2)] = foxLetters[0];
  }
}

// function createArrayFox(length) {
//   return Array.from({length}, getRandomFox);
// };

function getLeastArray(arrays) {
  return arrays.reduce((minArray, currentArray) => 
    currentArray.length < minArray.length ? currentArray : minArray
  );
};

function initializeInitialFox() {
  return [
    createArrayFox(3),
    createArrayFox(4),
    createArrayFox(5),
  ];
};

function removeLeastArray(arrays) {
  const leastArray = getLeastArray(arrays);
  const index = arrays.indexOf(leastArray);
  if (index > -1) {
    arrays.splice(index, 1);
  };
};

function addNewArray(arrays, length) {
  arrays.push(createArrayFox(length));
};

module.exports = { createArrayFox, getLeastArray, initializeInitialFox, removeLeastArray, addNewArray };