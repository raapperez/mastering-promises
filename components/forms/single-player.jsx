import _ from 'lodash';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

const SinglePlayer = (props) => {
  const {
    answers,
    handleSubmit,
    submitting,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      {_.map(answers, (answer, index) => (
        <label key={index} htmlFor={`answer${index}`}>
          <Field name="answer" component="input" type="radio" value={index.toString()} id={`answer${index}`} />
          {answer}
        </label>
      ))}
      <button type="submit" disabled={submitting}>
        Próximo
      </button>
    </form>
  );
};

SinglePlayer.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'singlePlayer',
})(SinglePlayer);
