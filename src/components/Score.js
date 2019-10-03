import React from 'react';

//Components
import Button from 'react-bootstrap/Button';


class Score extends React.Component {
  constructor(props) {
    super(props);
  }

    render() {
    return (
      <div className="score"><p><span id="player-score">{this.props.playerScore}</span> : <span id="computer-score">{this.props.computerScore}</span></p><Button className="reset" variant="primary" onClick={this.props.resetScore}>Reset</Button></div> 
    );
  }
}

export default Score;