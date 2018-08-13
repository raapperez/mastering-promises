import _ from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import beautify from 'js-beautify';
import hljs from 'highlightjs';
import SinglePlayerForm from './forms/single-player';
// import MultiPlayerFrom from './forms/multi-player';

const beautifyOptions = {
  break_chained_methods: true,
  indent_size: 2,
};

function formatCode(code) {
  return beautify(code.toString(), beautifyOptions)
    .replace(/\n/g, '<br>')
    .replace(/\s/g, '&nbsp;');
}

class Question extends PureComponent {
  componentDidMount() {
    hljs.initHighlighting();
  }

  getStyle() {
    return (
      <style jsx>
        {`
        .dependencies {
          display: flex;
        }
        `}
      </style>
    );
  }

  renderForm() {
    const { isMultiplayer, onSubmit, question } = this.props;
    const { answers } = question;

    if (isMultiplayer) {
      return (
        null
        // <MultiPlayerFrom onSubmit={onSubmit} answers={answers} />
      );
    }

    return (
      <SinglePlayerForm onSubmit={onSubmit} answers={answers} />
    );
  }

  render() {
    const { question, onSubmit } = this.props;
    const { description, problem, answers, dependencies } = question;
    return (
      <div>
        <div className="question__description">
          {description}
        </div>
        <div className="question__dependencies">
          {_.map(dependencies, (dependency, index) => (
            <pre className="question__dependencies__item" key={index}>
              <code
                className="javascript"
                dangerouslySetInnerHTML={{
                  __html: formatCode(dependency),
                }}
              />
            </pre>
          ))}

        </div>
        <div className="question__problem">
          <pre>
            <code
              className="javascript"
              dangerouslySetInnerHTML={{
                __html: formatCode(problem),
              }}
            />
          </pre>
        </div>

        <div className="question__form">
          <SinglePlayerForm onSubmit={console.log} answers={answers} />
        </div>
        <style jsx>
          {`
            .question__description {
              background-color: #2b2b2b;
              box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.4);
              color: #cb7832;
              font-family: monospace;
              font-size: 1.6rem;
              padding: 8px;
            }

            .question__dependencies {
              display: flex;
              margin-top: 8px;
            }

            .question__dependencies__item {
              box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.4);
            }

            .question__dependencies__item:not(:first-child) {
              margin-left: 8px;
            }

            .question__problem {
              box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.4);
              margin-top: 8px;
            }

            .question__form {
              box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.4);
              margin-top: 8px;
            }
          `}
        </style>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    problem: PropTypes.func.isRequired,
    dependencies: PropTypes.arrayOf(PropTypes.func),
  }).isRequired,
  isMultiplayer: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func,
};

export default Question;
