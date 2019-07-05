import React from 'react';
import './App.css';



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
    <li><p>Game: {game.game}</p>  <p>Duration: {game.duration}</p></li>
);
class GameRow extends React.Component {
  render() {
    return (
        <ul>{historyItems}</ul>
    )
  }
}

let gameBeingPlayed = false;
class GameStatus extends React.Component {
  render() {
    return (
        <p>Game Being Played {this.gameBeingPlayed ? "YES":"NO"}</p>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <GameStatus/>
        </div>
        <div>
          <GameRow/>
        </div>
      </header>
    </div>
  );
}

export default App;
