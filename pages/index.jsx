import React from 'react';
import Question from '../components/question';
import 'highlightjs/styles/darkula.css';

const test1 = () => {
  asyncSuccess(1)
    .then(console.log)
    .catch(error => console.log(`Erro: ${error.message}`));
};

const question = {
  description: '',
  problem: test1,
  answers: [

  ],
};

export default () => (
  <div className="oi">
    <style jsx>
      {`
        .oi {
        }
      `}
    </style>
    Welcome to next.js!
    <Question isMultiplayer={true} {...question} />
    {'oi'}
  </div>
);
