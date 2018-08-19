import _ from 'lodash';
import React, { PureComponent } from 'react';
import Question from '../components/question';
import questions from '../services/questions';
import ResultGraph from '../components/result-graph';

class GamePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: 'game',
      questionIndex: 0,
      results: {
      },
    };
  }

  getChartData() {
    const { results } = this.state;

    let acc = 0;
    const points = _.map(results, (result) => {
      acc += result;
      return acc;
    });

    return {
      labels: ['0', ..._(results).keys().map(q => (parseInt(q, 10) + 1).toString()).value()],
      datasets: [{
        label: `Pontuação total: ${_.last(points)}`,
        data: [0, ...Object.values(points)],
        backgroundColor: 'rgba(186, 186, 186, 0.5)',
        borderColor: 'rgba(255, 255, 255, 1)',
      }],
    };
  }

  nextQuestion(result) {
    this.setState((prevState) => {
      const { questionIndex, results } = prevState;

      if (questionIndex + 1 < questions.length) {
        return {
          questionIndex: questionIndex + 1,
          results: {
            ...results,
            [questionIndex]: result,
          },
        };
      }

      return {
        questionIndex: null,
        step: 'chart',
        results: {
          ...results,
          [questionIndex]: result,
        },
      };
    });
  }

  render() {
    const { questionIndex, step } = this.state;

    return (
      <div>
        {step === 'game' ? (
          <Question
            key={questionIndex}
            question={questions[questionIndex]}
            isMultiplayer={false}
            onSubmit={result => this.nextQuestion(result)}
          />
        ) : (
          null
        )}

        {step === 'chart' ? (
          <ResultGraph data={this.getChartData()} />
        ) : (
          null
        )}

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
