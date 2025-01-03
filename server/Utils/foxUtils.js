const foxLetters = ['F', 'O', 'X'];
const FO = foxLetters.filter(l => l !== 'X');
const OX = foxLetters.filter(l => l !== 'F');
const FX = foxLetters.filter(l => l !== 'O');
const dirSet = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

function createArrayFox(n) {
  if (n < 3) throw new Error('n must be at least 3');

  // 1. Create an n x n array of nulls
  let arr = Array.from({ length: n }, () => Array(n).fill(null)); // length = n * n, n = 3,4,5,6...

  // 2. Place the first FOX as correct answer
  // 2.1 Chhose the direction randomly
  const direction = dirSet[Math.floor(Math.random() * dirSet.length)];
  // 2.2 Choose the starting position randomly
  const { X, Y } = getStartPosition(n, direction);
  // 2.3 Place the first FOX
  for (let i = 0; i < foxLetters.length; i++) {
    // arr[((X + i * direction[1]) * n) + (Y + i * direction[0])] = foxLetters[i];
    arr[X + i * direction[1]][Y + i * direction[0]] = foxLetters[i];
  }
  // 2.3.1 get the index of letter O
  const oX = X + direction[1];
  const oY = Y + direction[0];

  // 3 Get random letter around first FOX
  aroundLetterO(arr, oX, oY, n);

  // 4 Fill the first 1/3 of null value with letter F
  let firstNullIndices = [];
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (arr[row][col] === null) {
        firstNullIndices.push([row, col]);
      }
    }
  };
  const numFs = Math.floor(firstNullIndices.length / 3);
  const indexFs = firstNullIndices.sort(() => 0.5 - Math.random()).slice(0, numFs);
  indexFs.forEach(([row, col]) => {
    arr[row][col] = 'F';
  });


  // 5 Fill the second 1/3 of null value with letter X
  let secondNullIndices = [];
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (arr[row][col] === null) {
        secondNullIndices.push([row, col]);
      }
    }
  };
  const numXs = numFs;
  const indexXs = secondNullIndices.sort(() => 0.5 - Math.random()).slice(0, numXs);
  indexXs.forEach(([row, col]) => {
    arr[row][col] = 'X';
  });

  // 6 Fill the last 1/3 of null value with O or random letter
  // 6.1 Get the indices of the null value
  let thirdNullIndices = [];
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (arr[row][col] === null) {
        thirdNullIndices.push([row, col]);
      }
    };
  };

  // 6.2 check if null indices is in between F and X
  thirdNullIndices.forEach(([row, col]) => {
    let Os = 0;
    dirSet.forEach(([colDir, rowDir]) => {
      const newRow = row + rowDir;
      const newCol = col + colDir;

      const dRow = row + (-1 * rowDir);
      const dCol = col + (-1 * colDir);

      if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n && dRow >= 0 && dRow < n && dCol >= 0 && dCol < n) {
        if ((arr[newRow][newCol] === 'F' && arr[dRow][dCol] === 'X') || (arr[newRow][newCol] === 'X' && arr[dRow][dCol] === 'F')) {
          Os += 1;
        }
      }
    });

    if (Os === 0) {
      arr[row][col] = 'O';
    } else {
      // arr[row][col] = 'B'
      arr[row][col] = FX[Math.floor(Math.random() * FX.length)];
    };
  });

  // Below are old code need to be removed
  // // 3. Maintain a list of null indices
  // // let nullIndices = arr.map((v, index) => v === null ? index : -1).filter(index => index !== -1);

  // // 4. Place some Os randomly
  // // 4.1 Choose a random number of Os to place
  // // const numOs = Math.floor(Math.random() * 3/4 * nullIndices.length) + Math.floor(1/4 * nullIndices.length);
  // // 4.2 Place the Os
  // // for (let i = 0; i < numOs; i++) {
  // //   const randomIndex = nullIndices[Math.floor(Math.random() * nullIndices.length)]; // Math.floor(Math.random() * nullIndices.length);
  // //   arr[nullIndices[randomIndex]] = 'O';
  // //   nullIndices.splice(randomIndex, 1); // Remove the index from the list
  // // }

  // // 5. Place some letters around the Os
  // // 5.1 Get the indices of the Os
  // // const oIndices = arr.map((value, index) => value === 'O' ? index : -1).filter(index => index !== -1);
  // // 5.2 Place the letters around the Os
  // // aroundLetterO(arr, oIndices, n);

  // // 6. Fill the null value with random letters
  // // const finalNullIndices = arr.map((v, index) => v === null ? index : -1).filter(index => index !== -1);
  // // for (let i = 0; i < finalNullIndices.length; i++) {
  // //   arr[finalNullIndices[i]] = FX[Math.floor(Math.random() * foxLetters.length)];
  // // }
  return arr;
};

function aroundLetterO(array, rowO, colO, length) {

  dirSet.forEach(([col, row]) => {
    const newRow = rowO + row;
    const newCol = colO + col;

    const dRow = rowO + (-1 * row);
    const dCol = colO + (-1 * col);

    if (newRow >= 0 && newRow < length && newCol >= 0 && newCol < length && array[newRow][newCol] === null) {
      if (dRow < 0 || dCol < 0 || array[dRow][dCol] === null || array[dRow][dCol] === 'O') {
        array[newRow][newCol] = FX[Math.floor(Math.random() * FX.length)];
      } else if (array[dRow][dCol] === 'F') {
        array[newRow][newCol] = FO[Math.floor(Math.random() * FO.length)];
      } else if (array[dRow][dCol] === 'X') {
        array[newRow][newCol] = OX[Math.floor(Math.random() * OX.length)];
      };
    };
  });
}

function isValidPosition(row, col, length) {
  return row >= 0 && row < length && col >= 0 && col < length;
}

function getStartPosition(n, direction) {
  let X = Math.floor(Math.random() * (n - 3));
  let Y = Math.floor(Math.random() * (n - 3));

  if (direction[0] < 0) {
    Y += 2;
  }

  if (direction[1] < 0) {
    X += 2;
  }

  return { X, Y }; // { row, col}
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