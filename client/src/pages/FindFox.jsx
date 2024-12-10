import { useState, useEffect } from "react";
import axios from "axios";

export default function FindFox() {
  const [gridSize, setGridSize] = useState(3);
  const [foxArray, setFoxArray] = useState([]);

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
        setGridSize(Math.sqrt(response.data.length));
      })
      .catch(error => {
        console.error('There was an error fetching the least array length', error);
      });
  }, []);

  useEffect(() => {
    fetchFoxArray();
  }, [gridSize]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div style={boardStyle}>
        {foxArray.map((value, index) => (
          <div key={index} className="w-[50px] border-[1px] border-white aspect-square flex items-center justify-center text-white">{value}</div>
        ))}
      </div>
      <button onClick={handleButtonClick} className="absolute px-4 py-2 mt-4 text-white bg-blue-500 rounded bottom-4">+</button>
    </div>
  );
};