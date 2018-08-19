import _ from 'lodash';

const asyncSuccess = param => new Promise((resolve) => {
  setTimeout(() => {
    resolve(`sucesso(${param})`);
  }, 100);
});

const asyncFail = param => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error(`falha(${param})`));
  }, 100);
});

// const test2 = () => {
//   asyncFail(2)
//     .then(console.log)
//     .catch(error => console.log(`Erro: ${error.message}`));
// };

// test2();


export default [
  {
    description: 'Quando a PROMISE é completada com sucesso...',
    dependencies: [
      asyncSuccess,
      asyncFail,
    ],
    problem: () => {
      return asyncSuccess('abacaxi')
        .then(console.log)
        .catch(error => console.log(`Erro: ${error.message}`));
    },
    answers: [
      'sucesso(abacaxi)',
      'Erro: falha(abacaxi)',
      'Erro: sucesso(abacaxi)',
    ],
  },
  {
    description: 'Quando a PROMISE é completada com erro...',
    dependencies: [
      asyncSuccess,
      asyncFail,
    ],
    problem: () => {
      return asyncFail('beterraba')
        .then(console.log)
        .catch(error => console.log(`Erro: ${error.message}`));
    },
    answers: [
      'sucesso(beterraba)',
      'Erro: falha(beterraba)',
      'Erro: sucesso(beterraba)',
    ],
  },
  {
    description: 'Quando a PROMISE é completada com erro...',
    dependencies: [
      asyncSuccess,
      asyncFail,
    ],
    problem: () => {
      return asyncFail('beterraba')
        .then(console.log)
        .catch(error => console.log(`Erro: ${error.message}`));
    },
    answers: [
      'sucesso(beterraba)',
      'Erro: falha(beterraba)',
      'Erro: sucesso(beterraba)',
    ],
  },
];
