import React from 'react';

//Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Score from './Score';
import Player from './Player';
import RoundScore from './RoundScore';
import GameStatus from './GameStatus';


class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      choice: null,
      choices: [],
      error: null,
      ranNum: null,
      play: null,
      playerChoice: 1,
      playerChoiceName: "Ready",
      playerScore: 0,
      playRoundScore: "0",
      computerChoice: 1,
      computerChoiceName: "Ready",
      computerScore: 0,
      compRoundScore: "0",
      gameStatus: "Choose wisely...",
      gameHistory: [],
      toggleClass: "toggle",
      playerCardClass: "card",
      computerCardClass: "card",
      playRoundClass: "roundScore",
      compRoundClass: "roundScore",
      playIconClass:"fa fa-check-circle",
      compIconClass:"fa fa-check-circle",
      resultData: null
  };
  this.timer = null;
  this.choose = this.choose.bind(this);
  this.getChoices = this.getChoices.bind(this);
  this.getSetCompChoice = this.getSetCompChoice.bind(this);
  this.resetScore = this.resetScore.bind(this);
  this.resetBoard = this.resetBoard.bind(this);
  this.postPlay = this.postPlay.bind(this);
  this.createHistoryItems = this.createHistoryItems.bind(this);
  this.displayChoices = this.displayChoices.bind(this);
  this.toggleAccord = this.toggleAccord.bind(this);
  this.displayResults = this.displayResults.bind(this);
  this.chooseRandom = this.chooseRandom.bind(this);
  this.chooseIcon = this.chooseIcon.bind(this);
}

toggleAccord() {
  let tClass = this.state.toggleClass;

  if(tClass === "toggle") {
    this.setState({toggleClass:"toggle active"});
  }else{
    this.setState({toggleClass:"toggle"});
  }
}
resetScore() {
  this.setState({
    playerScore: 0,
    computerScore: 0,
    gameHistory: []
  })
}
resetBoard() {
  this.setState({
    playRoundScore: "0",
    compRoundScore: "0",
    gameStatus: "Choose wisely...",
    playerChoiceName: "Ready",
    computerChoiceName: "Ready",
    playerCardClass: "card",
    computerCardClass: "card",
    playRoundClass:"roundScore",
    compRoundClass:"roundScore",
    playIconClass:"fa fa-check-circle",
    compIconClass:"fa fa-check-circle"
  })
}

getChoices() {
  fetch("https://codechallenge.boohma.com/choices")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          choices:result
        });
      },
      (error) => {
        this.setState({
          error:error.message
        });
      }
    )
}
getSetCompChoice() {
  fetch("https://codechallenge.boohma.com/choice")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          choice:result.name
        });
      },
      (error) => {
        this.setState({
          error:error.message
        });
      }
    )
}
getIndex(i) {
  return i - 1;
}
chooseRandom(e) {
  fetch("https://codechallenge.boohma.com/choice")
    .then(res => res.json())
    .then(
      (result) => {
          this.postPlay(result.id, result.name);
      },
      (error) => {
        this.setState({
          error:error.message
        });
      }
    )
}
choose(e) {
  let _attr = e.target.getAttribute("id");
  let _id = _attr.split('-')[1];
  let _name = _attr.split('-')[0];

  this.postPlay(_id, _name);
}
postPlay(pid, pname) {
  let self = this;
  let _pid = parseInt(pid);

  fetch("https://codechallenge.boohma.com/play", {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({"player": _pid})
  }).then(function (response) {
    return response.json();
  }).then(function (responseData) {
    self.setState({resultData:responseData});
    self.displayResults(pid, pname);
  });
}

chooseIcon(name) {
  let n = '';

  switch(name) {
    case "rock":
      n = "fa fa-hand-rock-o";
      break;
    case "paper":
      n = "fa fa-hand-paper-o";
      break;
    case "scissors":
      n = "fa fa-hand-scissors-o";
      break;
    case "lizard":
      n = "fa fa-hand-lizard-o";
      break;
    case "spock":
      n = "fa fa-hand-spock-o";
      break;
    default:
      n = "fa fa-hand-spock-o";
      break;
  }
  return n
}

displayResults(pid, pname) {
  
  let ccId = this.state.resultData.computer;
  let r = this.state.resultData.results;

  let pc = pname;
  let cc = this.state.choices[this.getIndex(ccId)].name;

  this.setState({
    playerChoice: pid,
    playerChoiceName: pname,
    computerChoice: ccId,
    computerChoiceName: cc
  });

  let compIcon = this.chooseIcon(cc);
  let playIcon = this.chooseIcon(pc);

  
  let pScore = this.state.playerScore;
  let cScore = this.state.computerScore;

  let gr = '';
  let gh = this.state.gameHistory;

  this.setState({
    playIconClass: playIcon,
    compIconClass:compIcon
  })

  switch(r) {
    case "lose":
      gr = "Computer wins!";
        this.setState({
          computerScore: cScore+1,
          compRoundScore: "+1",
          playerCardClass: "card",
          computerCardClass: "card winner",
          playRoundScore: "0",
          playRoundClass:"roundScore lose",
          compRoundClass:"roundScore win"
        });
      break;
    case "win":
        gr = "Player wins!";
        this.setState({
          playerScore: pScore+1,
          playRoundScore: "+1",
          playerCardClass: "card winner",
          computerCardClass: "card",
          compRoundScore: "0",
          playRoundClass:"roundScore win",
          compRoundClass:"roundScore lose"
        });
        break;
    case "tie":
        gr = "A tie.";
        this.setState({
          playerScore: pScore+1,
          playRoundScore: "+1",
          computerScore: cScore+1,
          compRoundScore: "+1",
          playerCardClass: "card",
          computerCardClass: "card",
          playRoundClass:"roundScore win",
          compRoundClass:"roundScore win"
        });
        break;
    default:
        gr = "A tie.";
        this.setState({
          playerScore: pScore+1,
          computerScore: cScore+1,
          playerCardClass: "card",
          computerCardClass: "card",
          playRoundClass:"roundScore win",
          compRoundClass:"roundScore win"
        });
      break;
  }

  let newDate = Date.now();
  let newRound = gh.concat({"playerchoice":pc,"computerchoice":cc,"result":gr,"key":newDate});

  this.setState({
    gameStatus: gr,
    gameHistory: newRound
  });

    this.timer = setTimeout(this.resetBoard, 1500);
  
}

displayChoices(item) {
  let btnId = item.name +"-"+ item.id;
  return <li key={item.id}><Button variant="outline-secondary" id={btnId} onClick={this.choose} block>{item.name}</Button></li>
}
createHistoryItems(item) {
  return <li key={item.key}>{item.playerchoice} : {item.computerchoice} | {item.result}</li>
}

componentDidMount() {
  this.getChoices();
}
componentDidUpdate() {
  clearTimeout(this.timer);
}

    render() {
      let rounds = <li className="hideNum">Please play a round.</li>;
      if(this.state.gameHistory.length !== 0) {
       rounds = this.state.gameHistory.map(this.createHistoryItems);
      }
      let choiceBtns = this.state.choices.map(this.displayChoices);

    return (
        <div className="flex-container">
          <Container className="game">
            <Row>
              <Col xs={3} className="sidebar col-3">
                <h3>Choose your weapon</h3>
              <ul className="choices">
              {choiceBtns}
              <li><Button variant="outline-secondary" id="random" onClick={this.chooseRandom} block>Random</Button></li>
              </ul>
              </Col>
              <Col xs={9} className="col-9">
              <Container className="scoreboard">
              <Row>
                <Col className="no-pad">
                <Score playerScore={this.state.playerScore} computerScore={this.state.computerScore} resetScore={this.resetScore} />
                </Col>
              </Row>
              <Row>
                <Col xs={true}>
                <Player playerId="player-label" cardClass={this.state.playerCardClass} playerName="Player 1" iconClass={this.state.playIconClass} choiceName={this.state.playerChoiceName} />
                </Col>
                <Col xs={2} className="versus">
                  <h3>VS.</h3>
                </Col>
                <Col xs={true}>
                <Player playerId="computer-label" cardClass={this.state.computerCardClass} playerName="Computer" iconClass={this.state.compIconClass} choiceName={this.state.computerChoiceName} />
                </Col>
              </Row>
              <Row>
                <RoundScore roundClass={this.state.playRoundClass} roundScore={this.state.playRoundScore} />
                <GameStatus gameStatus={this.state.gameStatus} />
                <RoundScore roundClass={this.state.compRoundClass} roundScore={this.state.compRoundScore} />
              </Row>
              <Row>
                <Col className="rounds">
                <Accordion>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0" onClick={this.toggleAccord} className={this.state.toggleClass}>
                      <h2>Round history <span className="arrow"></span></h2>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <p></p>
                        <ol>
                          {rounds}
                        </ol>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
                </Col>
              </Row>
            </Container>
              </Col>
            </Row>
          </Container>
        </div>
    );
  }
}

export default Main;
