import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

//Components


class Choices extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        choice: "none"
    };

    this.getChoice = this.getChoice.bind(this);
  }

  getChoice(e) {
      let _attr = e.target.getAttribute("id");

      this.setState({
          choice: _attr
      });
  }


    render() {
    return (
        <div className="flex-container">
          <ul className="choices">
            <li><Button variant="primary" id="rock" onClick={this.getChoice} block>Rock</Button></li>
            <li><Button variant="primary" id="paper" onClick={this.getChoice} block>Paper</Button></li>
            <li><Button variant="primary" id="scissors" onClick={this.getChoice} block>Scissors</Button></li>
            <li><Button variant="primary" id="lizard" onClick={this.getChoice} block>Lizard</Button></li>
            <li><Button variant="primary" id="spock" onClick={this.getChoice} block>Spock</Button></li>
          </ul>
        </div>
    );
  }
}

export default Choices;