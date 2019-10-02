import React, { Component } from 'react';

//Components


class Score extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        playerScore: 0,
        computerScore: 0
    };
  }


    render() {
    return (
        <div className="flex-container scoreboard">
          <div id='player-label' className="card">Player 1</div>
          <div id="computer-label" className="card">Computer</div>
          <p><span id="player-score">0</span> : <span id="computer-score">0</span></p>
        </div>
    );
  }
}

export default Score;