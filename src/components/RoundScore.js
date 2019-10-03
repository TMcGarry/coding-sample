import React from 'react';

//Components
import Col from 'react-bootstrap/Col';

class RoundScore extends React.Component {
  constructor(props) {
    super(props);

  }

    render() {
    return (
        <Col xs={5}><p className={this.props.roundClass}>{this.props.roundScore}</p></Col>
    );
  }
}

export default RoundScore;