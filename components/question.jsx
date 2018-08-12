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
        <div>
          {description}
        </div>
        <div className="dependencies">
          {_.map(dependencies, (dependency, index) => (
            <pre className="dependencies__item" key={index}>
              <code
                className="javascript"
                dangerouslySetInnerHTML={{
                  __html: formatCode(dependency),
                }}
              />
            </pre>
          ))}

        </div>
        <div>
          <pre>
            <code
              className="javascript"
              dangerouslySetInnerHTML={{
                __html: formatCode(problem),
              }}
            />
          </pre>
        </div>

        <SinglePlayerForm onSubmit={console.log} answers={answers} />
        <style jsx>
          {`
            .dependencies {
              display: flex;
            }

            .dependencies__item:not(:first-child) {
              margin-left: 8px;
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
