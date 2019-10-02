import React, { Component } from 'react';

//Components


class GameStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        count: 0
    };
  }


    render() {
    return (
        <div className="flex-container">
          <p>Choose your move</p>
        </div>
    );
  }
}

export default GameStatus;