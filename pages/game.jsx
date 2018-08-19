import React, { PureComponent } from 'react';
import Question from '../components/question';
import questions from '../services/questions';

class GamePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      results: {
      },
    };
  }

  nextQuestion(result) {
    this.setState((prevState) => {
      const { step, results } = prevState;

      return {
        step: step + 1,
        results: {
          ...results,
          [step]: result,
        },
      };
    });
  }

  render() {
    const { step } = this.state;

    return (
      <div>
        <Question
          key={step}
          question={questions[step]}
          isMultiplayer={false}
          onSubmit={result => this.nextQuestion(result)}
        />
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
