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
        <style jsx global>
          {`
            body {
              background-color: #f5f5dc;
              margin: 32px;
            }

            input[type=radio] {
              margin: 0 8px 0 0;
            }

            pre {
              margin: 0;
            }

            code.hljs {
              border-radius: 4px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default GamePage;
