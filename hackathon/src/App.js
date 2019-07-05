import React from 'react';
import './App.css';

let gameBeingPlayed = false;
let history = [
  {
    "game":"fifa",
    "duration": 12
  },
  {
    "game": "smash",
    "duration": 43
  }
];
let historyItems = history.map((game) =>
    <li>Game: {game.game} | Duration: {game.duration}</li>
);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          Game Being Played? {gameBeingPlayed ? "YES" : "NO"}
        </div>
        <div>
          <ul>
            {historyItems}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
