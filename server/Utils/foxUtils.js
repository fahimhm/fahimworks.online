const foxLetters = ['F', 'O', 'X'];
const FO = foxLetters.filter(l => l !== 'X');
const OX = foxLetters.filter(l => l !== 'F');
const FX = foxLetters.filter(l => l !== 'O');
const dirSet = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

function createArrayFox(n) {
  if (n < 3) throw new Error('n must be at least 3');

  // 1. Create an n x n array of nulls
  let arr = Array(n * n).fill(null); // length = n * n, n = 3,4,5,6...

  // 2. Place the first FOX as correct answer
  // 2.1 Chhose the direction randomly
  const direction = dirSet[Math.floor(Math.random() * dirSet.length)];
  // 2.2 Choose the starting position randomly
  const { X, Y } = getStartPosition(n, direction);
  // 2.3 Place the first FOX
  for (let i = 0; i < foxLetters.length; i++) {
    arr[((X + i * direction[1]) * n) + (Y + i * direction[0])] = foxLetters[i];
  }

  // 3. Maintain a list of null indices
  let nullIndices = arr.map((v, index) => v === null ? index : -1).filter(index => index !== -1);

  // 4. Place some Os randomly
  // 4.1 Choose a random number of Os to place
  const numOs = Math.floor(Math.random() * 3/4 * nullIndices.length) + Math.floor(1/4 * nullIndices.length);
  // 4.2 Place the Os
  for (let i = 0; i < numOs; i++) {
    const randomIndex = nullIndices[Math.floor(Math.random() * nullIndices.length)]; // Math.floor(Math.random() * nullIndices.length);
    arr[nullIndices[randomIndex]] = 'O';
    nullIndices.splice(randomIndex, 1); // Remove the index from the list
  }

  // 5. Place some letters around the Os
  // 5.1 Get the indices of the Os
  const oIndices = arr.map((value, index) => value === 'O' ? index : -1).filter(index => index !== -1);
  // 5.2 Place the letters around the Os
  aroundLetterO(arr, oIndices, n);

  // 6. Fill the null value with random letters
  const finalNullIndices = arr.map((v, index) => v === null ? index : -1).filter(index => index !== -1);
  for (let i = 0; i < finalNullIndices.length; i++) {
    arr[finalNullIndices[i]] = FX[Math.floor(Math.random() * foxLetters.length)];
  }
  return arr;
};

function aroundLetterO(array, posSet, length) {
  posSet.forEach(pos => {
    const rowO = Math.floor(pos / length);
    const colO = pos % length;

    dirSet.forEach(([col, row]) => {
      const newRow = rowO + row;
      const newCol = colO + col;
      const index = newRow * length + newCol;

      const dRow = rowO + (-1 * row);
      const dCol = colO + (-1 * col);
      const dIndex = dRow * length + dCol;

      if (isValidPosition(newRow, newCol, length) && array[index] === null) {
        // array[index] = getRandomLetter(array, index, foxLetters);
        if ((isValidPosition(dRow, dCol, length) && (array[dIndex] === null || array[dIndex] === 'O')) || !isValidPosition(dRow, dCol, length)) {
          array[index] = foxLetters[Math.floor(Math.random() * foxLetters.length)];
        } else if (isValidPosition(dRow, dCol, length) && array[dIndex] === 'F') {
          array[index] = FO[Math.floor(Math.random() * FO.length)];
        } else if (isValidPosition(dRow, dCol, length) && array[dIndex] === 'X') {
          array[index] = OX[Math.floor(Math.random() * OX.length)];
        }
      }
    });
  });
}

function isValidPosition(row, col, length) {
  return row >= 0 && row < length && col >= 0 && col < length;
}

function getStartPosition(n, direction) {
  let X = Math.floor(Math.random() * (n - 3));
  let Y = Math.floor(Math.random() * (n - 3));

  if (direction[0] !== 1) {
    Y += 2;
  }

  if (direction[1] !== 1) {
    X += 2;
  }

  return { X, Y };
}

function initializeInitialFox() {
  return [
    createArrayFox(3),
    createArrayFox(4),
    createArrayFox(5),
  ];
};

function getLeastArray(arrays) {
  return arrays.reduce((minArray, currentArray) => 
    currentArray.length < minArray.length ? currentArray : minArray
  );
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