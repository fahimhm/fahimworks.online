import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function FindFox() {
  const [gridSize, setGridSize] = useState(3);
  const [foxArray, setFoxArray] = useState([]);
  const [activeGrids, setActiveGrids] = useState([]);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const boardStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridSize}, 50px)`,
    gridTemplateRows: `repeat(${gridSize}, 50px)`,
    gap: '5px',
  };

  const handleButtonClick = async () => {
    setGridSize(gridSize + 1);
    await axios.post('/api/remove-least-array');
    await axios.post('/api/add-new-array', { length: gridSize + 3 });
    fetchFoxArray();
    setActiveGrids([]); // reset active grids
  };

  const fetchFoxArray = () =>{
    axios.get('/api/findfox')
      .then(response => {
        setFoxArray(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the foxes', error);
      });
  };

  useEffect(() => {
    axios.get('/api/least-array-length')
      .then(response => {
        // setGridSize(Math.sqrt(response.data.length));
        setGridSize(response.data.length);
      })
      .catch(error => {
        console.error('There was an error fetching the least array length', error);
      });
  }, []);

  useEffect(() => {
    fetchFoxArray();
  }, [gridSize]);

  const handleGridClick = (rowIndex, colIndex) => {
    const gridKey = `${rowIndex}-${colIndex}`;
    setActiveGrids(prevActiveGrids => {
      if (prevActiveGrids.includes(gridKey)) {
        return prevActiveGrids.filter(grid => grid !== gridKey);
      } else {
        if (prevActiveGrids.length >= 3) {
          return [...prevActiveGrids.slice(1), gridKey];
        } else {
          return [...prevActiveGrids, gridKey];
        }
      }
    });
  };

  const isActive = (rowIndex, colIndex) => {
    return activeGrids.includes(`${rowIndex}-${colIndex}`);
  };

  const checkButtonStatus = useCallback(() => {
    if (activeGrids.length < 3) {
      setIsButtonActive(false);
      return;
    };

    const [value01, value02] = activeGrids[0].split('-').map(Number);
    const [value11, value12] = activeGrids[1].split('-').map(Number);
    const [value21, value22] = activeGrids[2].split('-').map(Number);

    const calculations = {
      A: value11 - value01,
      B: value21 - value11,
      C: value12 - value02,
      D: value22 - value12,
    };

    if (((Math.abs(calculations.A) === 1 || calculations.A === 0) && calculations.A === calculations.B && (Math.abs(calculations.C) === 1 || calculations.C === 0) && calculations.C === calculations.D) && ((foxArray[value01][value02] === 'F' && foxArray[value11][value12] === 'O' && foxArray[value21][value22] === 'X') || (foxArray[value01][value02] === 'X' && foxArray[value11][value12] === 'O' && foxArray[value21][value22] === 'F'))) {
      setIsButtonActive(true);
      return;
    }
    setIsButtonActive(false);
  }, [activeGrids, foxArray]);

  useEffect(() => {
    checkButtonStatus();
  }, [activeGrids, checkButtonStatus]);

  return (
    <div className="flex flex-col items-center justify-center h-fit">
      <h1 className="text-3xl font-bold text-white mt-14" style={{ fontFamily: 'Riddle' }}>What the Fox!!</h1>
      <div className="flex flex-col items-center justify-center mt-10 overflow-auto h-fit w-fit">
        <div style={boardStyle}>
          {foxArray.map((row, rowIndex) => (
            row.map((value, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-[50px] border-[1px] border-white aspect-square flex items-center justify-center text-white ${isActive(rowIndex, colIndex) ? 'bg-teal-300 text-black' : 'bg-[#0F172A] text-white'} hover:text-black hover:bg-gray-300 cursor-pointer`}
                onClick={() => handleGridClick(rowIndex, colIndex)}
              >
                {value}
              </div>
            ))
          ))}
        </div>
      <button
        onClick={handleButtonClick}
        className={`px-4 py-2 mt-4 text-white rounded bottom-4 ${isButtonActive ? 'bg-blue-500' : 'bg-gray-500 cursor-not-allowed'}`}
        disabled={!isButtonActive}
        >
        +
      </button>
        </div>
    </div>
  );
};