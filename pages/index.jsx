import React from 'react';
import Question from '../components/question';
import 'highlightjs/styles/darkula.css';
import Link from 'next/link';

const test1 = () => {
  asyncSuccess(1)
    .then(console.log)
    .catch(error => console.log(`Erro: ${error.message}`));
};

const question = {
  description: '',
  problem: test1,
  answers: [
    'A',
    'B',
    'C',
  ],
};

export default () => (
  <div className="index">
    <h1 className="index__title">Dominando Promises</h1>
    <h2 className="index__author">Rodrigo Augusto Azevedo Pelegrini Perez</h2>

    <Link href="/game">
        <a>Continuar</a>
    </Link>

    <div className="index__options">
      <a>Jogar Sozinho</a>
      <a>Jogar em Grupo</a>
    </div>

    <style jsx>
      {`
        .index {
          align-items: center;
          background-color: #2b2b2b;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          font-family: monospace;
          justify-content: center;
          padding: 8px;
          height: calc(100vh - 80px);
        }

        .index__title {
          font-size: 52px;
          color: #cb7832;
        }

        .index__author {
          color: #bababa;
          font-size: 28px;
        }

        .index__options {
          display: flex;
          flex-direction: column;
          font-size: 22px;
          font-weight: bold;
          align-items: center;
        }
      `}
    </style>
  </div>
);
