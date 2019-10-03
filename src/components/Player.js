import React from 'react';

//Components


class Player extends React.Component {
  constructor(props) {
    super(props);
  }

    render() {
    return (
      <div id={this.props.playerId} className={this.props.cardClass}>
      <h3>{this.props.playerName}</h3>
      <p><i className={this.props.iconClass}></i></p>
      <h1>{this.props.choiceName}</h1>
    </div>
    );
  }
}

export default Player;
