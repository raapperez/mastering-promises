import React, { PureComponent } from 'react';
import Question from '../components/question';
import questions from '../services/questions';

class GamePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Question question={questions[0]} />
      </div>
    );
  }
}

export default GamePage;
