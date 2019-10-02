import React from 'react';
import logo from './logo.svg';

//Components
import Main from './components/Main';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//Styles
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Container>
        <Row>
          <Col>
          <h1>Rock, Paper, Scissors, Lizard, Spock</h1>
          </Col>
        </Row>
        </Container>
        </header>
      <Container className="bottom-header">
        <Row>
          <Col xs={3} className="label"><h3>Rules:</h3></Col>
          <Col xs={9} className="description"><p>Scissors cuts Paper covers Rock crushes Lizard poisons Spock smashes Scissors decapitates Lizard eats Paper disproves Spock vaporizes Rock crushes Scissors.</p></Col>
        </Row>
      </Container>
      <Main />
    </div>
  );
}

export default App;
