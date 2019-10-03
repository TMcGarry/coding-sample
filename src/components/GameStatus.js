import React from 'react';

//Components
import Col from 'react-bootstrap/Col';

class GameStatus extends React.Component {
  constructor(props) {
    super(props);

  }


    render() {
    return (
      <Col xs={2} className="no-pad"><p className="status">{this.props.gameStatus}</p></Col>
    );
  }
}

export default GameStatus;