
import './App.css';
//import { useMediaQuery } from 'react-responsive';
import React, { useState, useEffect } from 'react';

function Timer() {
  const [time, setTime] = useState(new Date());
  const [expired, setExpired] = useState(false);
  const [inputTime] = useState(0);
  const [updateInterval, setUpdateInterval] = useState(1000);
  const [manualUpdate, setManualUpdate] = useState(false);

  useEffect(() => {
    let intervalID;

    if (!manualUpdate) {
      intervalID = setInterval(() => {
        setTime(new Date());
      }, updateInterval);
    }

    setTimeout(() => {
      setExpired(true);
      clearInterval(intervalID);
    }, 60000);

    return () => {
      clearInterval(intervalID);
    };
  }, [updateInterval, manualUpdate]);

  const handleStartTimer = () => {
    setExpired(false);
    setManualUpdate(true);
    setTimeout(() => {
      setManualUpdate(false);
    }, inputTime * 1000);
  };

  return (
    <div className="timer">
      <h2>Timer</h2>
      <div>

        <label htmlFor="intervalInput">Введите интервал(s):</label>
        <input
          type="number"
          id="intervalInput"
          value={updateInterval / 1000}
          onChange={(e) => setUpdateInterval(parseInt(e.target.value) * 1000)}
        />
        <button onClick={handleStartTimer}>Старт</button>
      </div>
      {expired ? (
        <p>Время вышло!</p>
      ) : (
        <p>Время: {time.toLocaleTimeString()}</p>
      )}
    </div>
  );
}


function App() {
  const [count, setCount] = useState(0);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      setCount(count + 1);
    } else if (event.key === 'ArrowDown') {
      setCount(count - 1);
    }
  };
  return (
    <div className="app">
      <div className="counter" onKeyDown={handleKeyDown} tabIndex="0">
        <h2>Счётчик</h2>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Прибавить</button>
        <button onClick={() => setCount(count - 1)}>Убавить</button>
      </div>
      <Timer />
    </div>
  );
}

export default App;






