import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const[lastping, setLastPing]=useState('');

  useEffect( () => {
    fetch('/time')
      .then(response => response.json())
      .then(data => setLastPing(data.lastping));
  }, []);

  useEffect( () => {
    const interval = setInterval(() => {
      fetch('/time')
        .then(response => response.json())
        .then(data => setLastPing(data.lastping));
    }, 1000);
    return () => clearInterval(interval);
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Last time the Raspberry Pi communicated with the server: {lastping}
        </p>
      </header>
    </div>
  );
}

export default App;
