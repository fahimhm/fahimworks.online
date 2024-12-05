import { useState } from 'react';

export default function FindFox() {
  const [gridSize, setGridSize] = useState(3);

  const boardStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridSize}, 50px)`,
    gridTemplateRows: `repeat(${gridSize}, 50px)`,
    gap: '5px',
  };

  const handleButtonClick = () => {
    setGridSize(gridSize + 1);
  };

  const generateRandomFOX = (size) => {
    const foxLetters = ['F', 'O', 'X'];
    let gridBoard;

    do {
      gridBoard = Array(size * size).fill(null);

      // Randomly choose a starting point and direction for the word FOX sequence
      const startRow = Math.floor(Math.random() * size);
      const startCol = Math.floor(Math.random() * size);
      const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
      
      if (direction === 'horizontal' && startCol <= size - 3) {
        gridBoard[startRow * size + startCol] = 'F';
        gridBoard[startRow * size + startCol + 1] = 'O';
        gridBoard[startRow * size + startCol + 2] = 'X';
      } else if (direction === 'vertical' && startRow <= size - 3) {
        gridBoard[startRow * size + startCol] = 'F';
        gridBoard[(startRow + 1) * size + startCol] = 'O';
        gridBoard[(startRow + 2) * size + startCol] = 'X';
      } else {
        // If the chosen position doesn't fit, place FOX at the end of the grid
        gridBoard[size * size - 3] = 'F';
        gridBoard[size * size - 2] = 'O';
        gridBoard[size * size - 1] = 'X';
      }
      
      // Fill the rest of the grid with random letters
      for (let i = 0; i < gridBoard.length; i++) {
        if (gridBoard[i] === null) {
          gridBoard[i] = foxLetters[Math.floor(Math.random() * foxLetters.length)];
        }
      }
    } while (checkForMultipleFOX(gridBoard, size));
    return gridBoard;
  };

  const checkForMultipleFOX = (grid, size) => {
    let count = 0;

    const checkSequence = (a, b, c) => {
      return (
        (a === 'F' && b === 'O' && c === 'X') ||
        (a === 'X' && b === 'O' && c === 'F')
      );
    };

    const checkHorizontal = (row, col) => {
      if (checkSequence(grid[row * size + col], grid[row * size + col + 1], grid[row * size + col + 2])) {
        count++;
      }
    };

    const checkVertical = (row, col) => {
      if (checkSequence(grid[row * size + col], grid[(row + 1) * size + col], grid[(row + 2) * size + col])) {
        count++;
      }
    };

    // check horizontally forward and backward
    for (let row = 0; row < size; row++) {
      for (let col = 0; col <= size - 3; col++) {
        checkHorizontal(row, col);
      }
    }

    // check vertically forward and backward
    for (let col = 0; col < size; col++) {
      for (let row = 0; row <= size - 3; row++) {
        checkVertical(row, col);
      }
    }

    return count > 1;
  };

  const grid = generateRandomFOX(gridSize);

  return (
    <div className="relative flex items-center justify-center h-screen">
      <div style={boardStyle}>
        {grid.map((foxLetter, index) => (
          <div key={`${foxLetter}-${index}`} className='w-[50px] border-[1px] border-white aspect-square flex items-center justify-center text-white'>{foxLetter}</div>
        ))}
      </div>
      <button onClick={handleButtonClick} className='absolute px-4 py-2 mt-4 text-white bg-blue-500 rounded bottom-4'>
        +
      </button>
    </div>
  );
};