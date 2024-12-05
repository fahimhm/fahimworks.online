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

    // do {
    gridBoard = Array(size * size).fill(null);

    // Randomly choose a starting point and direction for the word FOX sequence
    const directions = ['hor', 'ver', 'diaUp', 'diaDown']
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const forward = Math.random() < 0.5;

    let startRow, startCol;
    if (direction === 'hor') {
      startRow = Math.floor(Math.random() * size);
      startCol = Math.floor(Math.random() * (size - 3));
    } else if (direction === 'ver') {
      startRow = Math.floor(Math.random() * (size - 3));
      startCol = Math.floor(Math.random() * size);
    } else if (direction === 'diaUp') {
      startCol = Math.floor(Math.random() * (size - 3));
      startRow = Math.floor(Math.random() * size);
      if (startRow < size - 1) {
        startRow = size - 1;
      }
    } else {
      startRow = Math.floor(Math.random() * (size - 3));
      startCol = Math.floor(Math.random() * (size - 3));
    }
    
    if (direction === 'hor') {
      if (forward) {
        gridBoard[startRow * size + startCol] = foxLetters[0];
        gridBoard[startRow * size + (startCol + 1)] = foxLetters[1];
        gridBoard[startRow * size + (startCol + 2)] = foxLetters[2];
      } else {
        gridBoard[startRow * size + (startCol + 2)] = foxLetters[0];
        gridBoard[startRow * size + (startCol + 1)] = foxLetters[1];
        gridBoard[startRow * size + startCol] = foxLetters[2];
      }
    } else if (direction === 'ver') {
      if (forward) {
        gridBoard[startRow * size + startCol] = foxLetters[0];
        gridBoard[(startRow + 1) * size + startCol] = foxLetters[1];
        gridBoard[(startRow + 2) * size + startCol] = foxLetters[2];
      } else {
        gridBoard[(startRow + 2) * size + startCol] = foxLetters[0];
        gridBoard[(startRow + 1) * size + startCol] = foxLetters[1];
        gridBoard[startRow * size + startCol] = foxLetters[2];
      }
    } else if (direction === 'diaDown') {
      if (forward) {
        gridBoard[startRow * size + startCol] = foxLetters[0];
        gridBoard[(startRow + 1) * size + (startCol + 1)] = foxLetters[1];
        gridBoard[(startRow + 2) * size + (startCol + 2)] = foxLetters[2];
      } else {
        gridBoard[(startRow + 2) * size + (startCol + 2)] = foxLetters[0];
        gridBoard[(startRow + 1) * size + (startCol + 1)] = foxLetters[1];
        gridBoard[startRow * size + startCol] = foxLetters[2];
      }
    } else if (forward) {
      gridBoard[startRow * size + startCol] = foxLetters[0];
      gridBoard[(startRow - 1) * size + (startCol + 1)] = foxLetters[1];
      gridBoard[(startRow - 2) * size + (startCol + 2)] = foxLetters[2];
    } else {
      gridBoard[(startRow - 2) * size + (startCol + 2)] = foxLetters[0];
      gridBoard[(startRow - 1) * size + (startCol + 1)] = foxLetters[1];
      gridBoard[startRow * size + startCol] = foxLetters[2];
    }
    // }
    
    console.log('startRow:', startRow, 'startCol:', startCol, 'direction:', direction, 'forward:', forward, 'size', size);
    return gridBoard;
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