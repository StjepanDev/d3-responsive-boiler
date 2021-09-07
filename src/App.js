import React, { useState } from 'react';
import BarChart from './components/BarChart';
import './App.css';

function App() {
  const [data, setData] = useState([26, 75, 45, 60, 37, 30, 17]);

  return (
    <>
      <BarChart data={data} />
      <button onClick={() => setData(data.map((value) => value + 5))}>
        Update data
      </button>
      <button onClick={() => setData(data.filter((value) => value < 45))}>
        Filter data
      </button>
      <button
        onClick={() => setData([...data, Math.round(Math.random() * 100)])}
      >
        Random data data
      </button>
    </>
  );
}

export default App;
