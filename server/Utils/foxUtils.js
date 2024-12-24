function getRandomFox() {
  const values = ['F', 'O', 'X'];
  return values[Math.floor(Math.random() * values.length)];
};

function createArrayFox(length) { // length = 3,4,5,6
  const foxLetters = ['F', 'O', 'X'];
  let foxArray = Array(length * length).fill(null); // length * length = 9,16,25,36

  const directions = ['horizontal', 'vertical', 'diagonalUp', 'diagonalDown'];
  const direction = directions[Math.floor(Math.random() * directions.length)];
  const forward = Math.random() < 0.5;

  const { startRow, startCol } = getStartPosition(direction, length); // length = 3,4,5,6

  placeFox(foxArray, foxLetters, direction, forward, startRow, startCol, length); // length = 3,4,5,6

  while (foxArray.includes(null)) {
    const nonNullCount = foxArray.filter(value => value !== null).length;
    const numOs = Math.floor(Math.random() * ((length * length) - nonNullCount)); // length * length = 9,16,25,36
    for (let i = 0; i < numOs; i++) {
      let randomIndex = Math.floor(Math.random() * foxArray.length);;
      while (foxArray[randomIndex] !== null) {
        randomIndex = Math.floor(Math.random() * foxArray.length);
      }
      foxArray[randomIndex] = 'O';
    };

    const oIndices = [];
    for (let i = 0; i < foxArray.length; i++) {
      if (foxArray[i] === 'O') {
        oIndices.push(i);
      }
    };

    aroundLetterO(foxArray, oIndices, length, foxLetters); // length = 3,4,5,6
  };
  return foxArray;
};

function aroundLetterO(foxArray, posArray, length, letters) {
  for (let i = 0; i < posArray.length; i++) {
    // console.log(`posArray[${i}]:`, posArray[i]);
    const rowO = Math.floor(posArray[i] / length);
    const colO = posArray[i] % length;

    // check surrounding tiles
    // left side
    if (colO > 0 && foxArray[rowO * length + (colO - 1)] === null) {
      if (colO === length || (colO < length - 1 && foxArray[rowO * length + (colO + 1)] === null) || (colO < length - 1 && foxArray[rowO * length + (colO + 1)] === 'O')) { // check if right side is empty or is O or no right side
        foxArray[rowO * length + (colO - 1)] = letters[Math.floor(Math.random() * letters.length)];
      } else if (foxArray[rowO * length + (colO + 1)] === 'F' && colO < length - 1) { // check if right side is F
        const withoutX = ['F', 'O'];
        foxArray[rowO * length + (colO - 1)] = withoutX[Math.floor(Math.random() * withoutX.length)];
      } else if (foxArray[rowO * length + (colO + 1)] === 'X' && colO < length - 1) { // check if right side is X
        const withoutF = ['O', 'X'];
        foxArray[rowO * length + (colO - 1)] = withoutF[Math.floor(Math.random() * withoutF.length)];
      }
    }
    // left top corner
    if (colO > 0 && rowO > 0 && foxArray[(rowO - 1) * length + (colO - 1)] === null) {
      if (colO === length || rowO == length || (colO < length - 1 && rowO < length - 1 && foxArray[(rowO + 1) * length + (colO + 1)] === null) || (colO < length - 1 && rowO < length - 1 && foxArray[(rowO + 1) * length + (colO + 1)] === 'O')) { // check if right bottom corner is empty or is O or no right bottom corner
        foxArray[(rowO - 1) * length + (colO - 1)] = letters[Math.floor(Math.random() * letters.length)];
      } else if (colO < length - 1 && rowO < length - 1 && foxArray[(rowO + 1) * length + (colO + 1)] === 'F') {
        const withoutX = ['F', 'O'];
        foxArray[(rowO - 1) * length + (colO - 1)] = withoutX[Math.floor(Math.random() * withoutX.length)];
      } else if (colO < length - 1 && rowO < length - 1 && foxArray[(rowO + 1) * length + (colO + 1)] === 'X') {
        const withoutF = ['O', 'X'];
        foxArray[(rowO - 1) * length + (colO - 1)] = withoutF[Math.floor(Math.random() * withoutF.length)];
      }
    }
    // top side
    if (rowO > 0 && foxArray[(rowO - 1) * length + colO] === null) {
      if (rowO === length || (rowO < length - 1 && foxArray[(rowO + 1) * length + colO] === null) || (rowO < length - 1 && foxArray[(rowO + 1) * length + colO] === 'O')) { // check if bottom side is empty or is O or no bottom side
        foxArray[(rowO - 1) * length + colO] = letters[Math.floor(Math.random() * letters.length)];
      } else if (rowO < length - 1 && foxArray[(rowO + 1) * length + colO] === 'F') {
        const withoutX = ['F', 'O'];
        foxArray[(rowO - 1) * length + colO] = withoutX[Math.floor(Math.random() * withoutX.length)];
      } else if (rowO < length - 1 && foxArray[(rowO + 1) * length + colO] === 'X') {
        const withoutF = ['O', 'X'];
        foxArray[(rowO - 1) * length + colO] = withoutF[Math.floor(Math.random() * withoutF.length)];
      }
    }
    // right top corner
    if (rowO > 0 && colO < length - 1 && foxArray[(rowO - 1) * length + (colO + 1)] === null) {
      if (colO === 0 || rowO == length || (colO > 0 && rowO < length - 1 && foxArray[(rowO + 1) * length + (colO - 1)] === null) || (colO > 0 && rowO < length - 1 && foxArray[(rowO + 1) * length + (colO - 1)] === 'O')) { // check if left bottom corner is empty or is O or no left bottom corner
        foxArray[(rowO - 1) * length + (colO + 1)] = letters[Math.floor(Math.random() * letters.length)];
      } else if (colO > 0 && rowO < length - 1 && foxArray[(rowO + 1) * length + (colO - 1)] === 'F') {
        const withoutX = ['F', 'O'];
        foxArray[(rowO - 1) * length + (colO + 1)] = withoutX[Math.floor(Math.random() * withoutX.length)];
      } else if (colO > 0 && rowO < length - 1 && foxArray[(rowO + 1) * length + (colO - 1)] === 'X') {
        const withoutF = ['O', 'X'];
        foxArray[(rowO - 1) * length + (colO + 1)] = withoutF[Math.floor(Math.random() * withoutF.length)];
      }
    }
    // right side    
    if (colO < length - 1 && foxArray[rowO * length + (colO + 1)] === null) {
      if (colO === 0 || (colO > 0 && foxArray[rowO * length + (colO - 1)] === null) || (colO > 0 && foxArray[rowO * length + (colO - 1)] === 'O')) { // check if left side is empty or is O or no left side
        foxArray[rowO * length + (colO + 1)] = letters[Math.floor(Math.random() * letters.length)];
      } else if (colO > 0 && foxArray[rowO * length + (colO - 1)] === 'F') {
        const withoutX = ['F', 'O'];
        foxArray[rowO * length + (colO + 1)] = withoutX[Math.floor(Math.random() * withoutX.length)];
      } else if (colO > 0 && foxArray[rowO * length + (colO - 1)] === 'X') {
        const withoutF = ['O', 'X'];
        foxArray[rowO * length + (colO + 1)] = withoutF[Math.floor(Math.random() * withoutF.length)];
      }
    }
    // right bottom corner
    if (colO < length - 1 && rowO < length - 1 && foxArray[(rowO + 1) * length + (colO + 1)] === null) {
      if (colO === 0 || rowO == 0 || (colO > 0 && rowO > 0 && foxArray[(rowO - 1) * length + (colO - 1)] === null) || (colO > 0 && rowO > 0 && foxArray[(rowO - 1) * length + (colO - 1)] === 'O')) { // check if left top corner is empty or is O or no left top corner
        foxArray[(rowO + 1) * length + (colO + 1)] === letters[Math.floor(Math.random() * letters.length)];
      } else if (colO > 0 && rowO > 0 && foxArray[(rowO - 1) * length + (colO - 1)] === 'F') {
        const withoutX = ['F', 'O'];
        foxArray[(rowO + 1) * length + (colO + 1)] = withoutX[Math.floor(Math.random() * withoutX.length)];
      } else if (colO > 0 && rowO > 0 && foxArray[(rowO - 1) * length + (colO - 1)] === 'X') {
        const withoutF = ['O', 'X'];
        foxArray[(rowO + 1) * length + (colO + 1)] = withoutF[Math.floor(Math.random() * withoutF.length)];
      }
    }
    // bottom side
    if (rowO < length - 1 && foxArray[(rowO + 1) * length + colO] === null) {
      if (rowO === 0 || (rowO > 0 && foxArray[(rowO - 1) * length + colO] === null) || (rowO > 0 && foxArray[(rowO - 1) * length + colO] === 'O')) { // check if top side is empty or is O or no top side
        foxArray[(rowO + 1) * length + colO] = letters[Math.floor(Math.random() * letters.length)];
      } else if (rowO > 0 && foxArray[(rowO - 1) * length + colO] === 'F') {
        const withoutX = ['F', 'O'];
        foxArray[(rowO + 1) * length + colO] = withoutX[Math.floor(Math.random() * withoutX.length)];
      } else if (rowO > 0 && foxArray[(rowO - 1) * length + colO] === 'X') {
        const withoutF = ['O', 'X'];
        foxArray[(rowO + 1) * length + colO] = withoutF[Math.floor(Math.random() * withoutF.length)];
      }
    }
    // left bottom corner
    if (colO > 0 && rowO < length - 1 && foxArray[(rowO + 1) * length + (colO - 1)] === null) {
      if (colO === length || rowO == 0 || (colO < length - 1 && rowO > 0 && foxArray[(rowO - 1) * length + (colO + 1)] === null) || (colO < length - 1 && rowO > 0 && foxArray[(rowO - 1) * length + (colO + 1)] === 'O')) { // check if right top corner is empty or is O or no right top corner
        foxArray[(rowO + 1) * length + (colO - 1)] = letters[Math.floor(Math.random() * letters.length)];
      } else if (colO < length - 1 && rowO > 0 && foxArray[(rowO - 1) * length + (colO + 1)] === 'F') {
        const withoutX = ['F', 'O'];
        foxArray[(rowO + 1) * length + (colO - 1)] = withoutX[Math.floor(Math.random() * withoutX.length)];
      } else if (colO < length - 1 && rowO > 0 && foxArray[(rowO - 1) * length + (colO + 1)] === 'X') {
        const withoutF = ['O', 'X'];
        foxArray[(rowO + 1) * length + (colO - 1)] = withoutF[Math.floor(Math.random() * withoutF.length)];
      }
    }
  }
};

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

function placeFox(foxArray, foxLetters, direction, forward, startRow, startCol, length) { // length = 3,4,5,6
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