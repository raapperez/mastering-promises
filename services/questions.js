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


const test1 = () => {
  asyncSuccess(1)
    .then(console.log)
    .catch(error => console.log(`Erro: ${error.message}`));
};

test1();

const test2 = () => {
  asyncFail(2)
    .then(console.log)
    .catch(error => console.log(`Erro: ${error.message}`));
};

test2();


export default [
  {
    description: 'Quando a PROMISE é completada com sucesso...',
    dependencies: [
      asyncSuccess,
      asyncFail,
    ],
    problem: () => {
      asyncSuccess('abacaxi')
        .then(console.log)
        .catch(error => console.log(`Erro: ${error.message}`));
    },
    answers: [
      'sucesso(abacaxi)',
      'Erro: falha(abacaxi)',
      'Erro: sucesso(abacaxi)',
    ],
    correct: 0,
  },
  {

  },

];
