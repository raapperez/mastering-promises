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

class Question extends PureComponent {
  componentDidMount() {
    hljs.initHighlighting();
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
    const { description, problem, answers } = question;
    return (
      <div>
        <div>
          {description}
        </div>
        <div>
          <pre>
            <code className="javascript" dangerouslySetInnerHTML={{
                __html: beautify(problem.toString(), beautifyOptions)
                  .replace(/\n/g, '<br>')
                  .replace(/\s/g, '&nbsp;')
              }}
            />
          </pre>
        </div>

        <SinglePlayerForm onSubmit={console.log} answers={answers} />
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    problem: PropTypes.func.isRequired,
  }).isRequired,
  isMultiplayer: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func,
};

export default Question;
