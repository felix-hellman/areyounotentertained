import React from 'react';
import './App.css';


let validCharsRegex = 'a-zA-Z0-9  .,-:';
class GameList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mostplayed: []
    }
  }

  pollingTimer;

  componentDidMount() {
    let mostPlayedStatusChecker = () => getMostPlayed(data => {
      console.log(data);
      const gameNames = Object.keys(data);
      const duration = Object.values(data);

      let newState = [];
      for (let i = 0; i < gameNames.length; i++) {
        newState.push({
          game: removeChars(validCharsRegex ,gameNames[i]),
          duration: duration[i] + " hours"
        })
      }

      this.setState({
        mostplayed: newState.filter(gameRow => gameRow.game !== "")
      });

    });
    mostPlayedStatusChecker();
    this.pollingTimer = setInterval(() => mostPlayedStatusChecker(), 5000)
  }

  componentWillUnmount() {
    clearInterval(this.pollingTimer);
  }

  prettyprint() {
    return this.state.mostplayed.map((game) =>
        <li key={game.game}><p>Game: {game.game}</p>
          <p>Duration: {game.duration}</p></li>
    );
  }

  render() {
    return (
        <ul>{this.prettyprint()}</ul>
    )
  }
}

function removeChars(validChars, inputString) {
  var regex = new RegExp('[^' + validChars + ']', 'g');
  return inputString.replace(regex, '');
}

let gameBeingPlayed = false;

class GameStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStatus: {}
    }
  }

  pollingTimer;

  componentDidMount() {
    let statusCheck = () => getCurrentStatus(data => {
      this.setState({
        gameStatus: data
      })
    });
    statusCheck();
    this.pollingTimer = setInterval(() => statusCheck(), 5000)
  }

  render() {
    return (<p>Game Being Played: {
      this.state.gameStatus['TrustlyStockholm']
          ? removeChars(validCharsRegex,this.state.gameStatus['TrustlyStockholm'])
          : "None"
    }</p>)
  }
}

function getCurrentStatus(callback) {
  console.log("Fetching current played");
  fetch('http://localhost:5000/psn/played')
  .then(data => data.json())
  .then(jsonData => callback(jsonData))
}

function getMostPlayed(callback) {
  console.log("Fetching most played");
  fetch('http://localhost:5000/psn/mostplayed')
  .then(data => data.json())
  .then(jsonData => callback(jsonData))
}

class App extends React.Component {

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <div>
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
