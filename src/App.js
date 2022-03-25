import './App.css';
import {React, useEffect, useState} from 'react';

function App() {

  const[lastping, setLastPing]=useState('');

  useEffect(
    function getMetrics() {
      fetch('/time')
        .then(response => response.json())
        .then(data => setLastPing(data.lastping))
        .catch((error) => console.log("Error contacting server: %s", error));
      setTimeout(getMetrics, 1000);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Last time the Raspberry Pi communicated with the server: {lastping}
        </p>
      </header>
    </div>
  );
}

export default App;
