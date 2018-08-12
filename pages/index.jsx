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
  <div className="oi">
    <style jsx>
      {`
        .oi {
        }
      `}
    </style>

    <h1>Dominando Promises</h1>
    <h2>Rodrigo Augusto Azevedo Pelegrini Perez</h2>

    <Link href="/game">
        <a>Continuar</a>
    </Link>

    <div>
      Novo jogo:
      <a>Sozinho</a>
      <a>Grupo</a>
    </div>

  </div>
);
