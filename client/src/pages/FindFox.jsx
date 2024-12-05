import React, { useState } from 'react';

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
    const gridBoard = Array.from({ length: size * size}, () => foxLetters[Math.floor(Math.random() * foxLetters.length)]);
    return gridBoard;
  };

  const grid = generateRandomFOX(gridSize);

  return (
    <div className="relative flex items-center justify-center h-screen">
      <div style={boardStyle}>
        {grid.map((foxLetter, index) => (
          <div key={index} className='w-[50px] border-[1px] border-white aspect-square flex items-center justify-center text-white'>{foxLetter}</div>
        ))}
      </div>
      <button onClick={handleButtonClick} className='absolute px-4 py-2 mt-4 text-white bg-blue-500 rounded bottom-4'>
        +
      </button>
    </div>
  );
};