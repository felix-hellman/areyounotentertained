import React from 'react';
import './App.css';


let click = () => {
};



let history = [{
    "game":"fifa",
    "duration": 12
  }, {
    "game": "smash",
    "duration": 43
  }];

let historyItems = history.map((game) =>
    <li key={game.game}><p>Game: {game.game}</p>  <p>Duration: {game.duration}</p></li>
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
function getMostPlayed() {
  console.log("Fetching most played");
  fetch('http://localhost:5000/psn/mostplayed')
  .then(data => data.json())
  .then(jsonData => console.log(jsonData))
}


class App extends React.Component{

  componentDidMount(){
    let pollingTimer = setInterval(() => getMostPlayed(), 5000)
  }

  render() {
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
  )
  }
}

export default App;
