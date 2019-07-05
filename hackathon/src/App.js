import React from 'react';
import './App.css';


let click = () => {
  fetch('http://localhost:5000/psn/played')
  .then(data => data.json())
  .then(jsonData => console.log(jsonData))
};

let history = [{
    "game":"fifa",
    "duration": 12
  }, {
    "game": "smash",
    "duration": 43
  }];

let historyItems = history.map((game) =>
    <li><p>Game: {game.game}</p>  <p>Duration: {game.duration}</p></li>
);

function GameList(){
    return (
        <ul>{historyItems}</ul>
    )
}

let gameBeingPlayed = false;
function GameStatus() {
    return (
        <p>Game Being Played {gameBeingPlayed ? "YES":"NO"}</p>
    )
}

function TestButton() {
  return (
      <button onClick={click}>Tetss</button>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <TestButton/>
          <GameStatus/>
        </div>
        <div>
          <GameList/>
        </div>
      </header>
    </div>
  );
}

export default App;
