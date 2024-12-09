import { useState } from "react";

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

  return (
    <div className="flex items-center justify-center h-screen">
      <div style={boardStyle}>
        {Array.from({ length: gridSize * gridSize }).map((id) => (
          <div key={id} className="w-[50px] border-[1px] border-white aspect-square"></div>
        ))}
      </div>
      <button onClick={handleButtonClick} className="absolute px-4 py-2 mt-4 text-white bg-blue-500 rounded bottom-4">+</button>
    </div>
  );
};