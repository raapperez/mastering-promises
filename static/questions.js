

function asyncSuccess(param) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`sucesso(${param})`);
    }, 100);
  });
}

function asyncFail(param) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`falha(${param})`));
    }, 100);
  });
}


window.questions = [
  {
    description: 'Quando a PROMISE é completada com sucesso...',
    dependencies: [
      asyncSuccess,
      asyncFail,
    ],
    problem: function abacaxi() {
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
      asyncFail,
    ],
    problem: function beterraba() {
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
    description: 'Quando a PROMISE é completada com erro usando await...',
    dependencies: [
      asyncFail,
    ],
    problem: async function cebola() {
      try {
        const result = await asyncFail('cebola');
        console.log(result);
      } catch (error) {
        console.log(`Erro: ${error.message}`);
      }
    },
    answers: [
      'sucesso(cebola)',
      'Erro: falha(cebola)',
      'Erro: sucesso(cebola)',
      'null',
    ],
  },
  {
    description: 'Criando uma PROMISE já resolvida...',
    dependencies: [
    ],
    problem: function mexerica() {
      return Promise.resolve('mexerica')
        .then(result => console.log(`Sucesso: ${result}`))
        .catch(error => console.log(`Erro: ${error.message}`));
    },
    answers: [
      'Sucesso: mexerica',
      'Erro: mexerica',
    ],
  },
  {
    description: 'Criando uma PROMISE já rejeitada...',
    dependencies: [
    ],
    problem: function uva() {
      return Promise.reject(new Error('uva'))
        .then(result => console.log(`Sucesso: ${result}`))
        .catch(error => console.log(`Erro: ${error.message}`));
    },
    answers: [
      'Sucesso: uva',
      'Erro: uva',
    ],
  },
  {
    description: 'Quando acontece um erro no THEN...',
    dependencies: [
      asyncSuccess,
    ],
    problem: function milho() {
      return asyncSuccess('milho')
        .then((result) => {
          console.log(result);
          throw new Error(`falha(${result})`);
          console.log('milho verde');
        })
        .catch(error => console.log(`Erro: ${error.message}`));
    },
    answers: [
      'Erro: sucesso(milho)',
      'sucesso(milho)|Erro: sucesso(falha(milho))',
      'sucesso(milho)|Erro: falha(sucesso(milho))',
      'sucesso(milho)|Erro: falha(sucesso(milho))|milho verde',
    ],
  },
  {
    description: 'O que acontece num CATCH antes de um THEN num fluxo de sucesso...',
    dependencies: [
      asyncSuccess,
    ],
    problem: function laranja() {
      return asyncSuccess('laranja')
        .catch(error => console.log(`Erro: ${error.message}`))
        .then(console.log);
    },
    answers: [
      'sucesso(laranja)',
      'Erro: falha(laranja)',
      'undefined',
    ],
  },
  {
    description: 'O que acontece num CATCH antes de um THEN num fluxo de erro...',
    dependencies: [
      asyncFail,
    ],
    problem: function melancia() {
      return asyncFail('melancia')
        .catch(error => console.log(`Erro: ${error.message}`))
        .then(console.log);
    },
    answers: [
      'Erro: falha(melancia)',
      'Erro: falha(melancia)|sucesso(melancia)',
      'Erro: falha(melancia)|undefined',
    ],
  },
];

// const test9 = () => {
//   asyncFail(9)
//     .catch((error) => {
//       console.log(`Erro: ${error.message}`);
//       return 'valor corrigido';
//     })
//     .then(console.log);
// };

// test9();

// const test10 = () => {
//   asyncFail(10)
//     .catch((error) => {
//       console.log(`Erro1: ${error.message}`);
//       throw error;
//     })
//     .then(console.log)
//     .catch((error) => {
//       console.log(`Erro2 ${error.message}`);
//     });
// };

// test10();

// const test11 = () => {
//   asyncSuccess(11)
//     .then((result) => {
//       return asyncSuccess(result)
//         .then(console.log);
//     })
//     .catch(error => console.log(`Erro: ${error.message}`));
// };

// test11();

// const test12 = () => {
//   asyncSuccess(12)
//     .then((result) => {
//       return asyncSuccess(result);
//     })
//     .then((result) => {
//       console.log(result);
//     })
//     .catch(error => console.log(`Erro: ${error.message}`));
// };

// test12();

// const test13 = () => {
//   asyncSuccess(13)
//     .then((result) => {
//       return asyncSuccess(result);
//     })
//     .then((result) => {
//       return asyncSuccess(result)
//         .then(console.log);
//     })
//     .catch(error => console.log(`Erro: ${error.message}`));
// };

// test13();

// const test14 = () => {
//   asyncSuccess(14)
//     .then((result) => {
//       return asyncFail(result);
//     })
//     .then((result) => {
//       return asyncSuccess(result)
//         .then(console.log);
//     })
//     .catch(error => console.log(`Erro: ${error.message}`));
// };

// test14();

// const test15 = () => {
//   const firstPromise = asyncSuccess(15);

//   const secondPromise = firstPromise
//     .then((result) => {
//       console.log('Executou aqui');
//       return `Substituindo o resultado: ${result}`;
//     });

//   const thirdPromise = secondPromise;

//   thirdPromise.then(console.log);
//   thirdPromise.then(console.log);
// };

// test15();


// const test16 = () => {
//   const myPromise = Promise.resolve()
//     .then(() => {
//       console.log('Executou aqui');
//       return asyncFail(16);
//     });

//   myPromise
//     .then(() => console.log('Passou no then'))
//     .catch(error => console.log(`Erro: ${error.message}`));
//   myPromise.catch(error => console.log(`Erro: ${error.message}`));
//   myPromise.catch(error => console.log(`Erro: ${error.message}`));
// };

// test16();

// const test17 = () => {
//   const myPromise = Promise.resolve('a');

//   myPromise.then((result) => {
//     return Promise.resolve('b')
//       .then((otherResult) => {
//         console.log(result);
//         return otherResult;
//       });
//   }).then(result => console.log(result));
//   myPromise.then(() => console.log('c'));
//   myPromise.then(() => console.log('d'));
// };

// test17();

// const test18 = () => {
//   const myPromise = Promise.resolve('a');

//   myPromise.then((result) => {
//     console.log(result);
//   });
//   console.log('b');
// };

// test18();

// const test19 = () => {
//   const myPromise = Promise.all([
//     asyncSuccess('a'),
//     asyncSuccess('b'),
//     asyncSuccess('c'),
//   ]);

//   return myPromise.then((result) => {
//     console.log(result);
//   });
// };

// test19();

// const test20 = () => {
//   const myPromise = Promise.all([
//     asyncSuccess('a'),
//     asyncFail('b'),
//     asyncFail('c'),
//   ]);

//   return myPromise.then((result) => {
//     console.log(result);
//   }).catch((err) => {
//     console.log('error', err.message);
//   });
// };

// test20();

// const test21 = () => {
//   const myPromise = Promise.all([
//     asyncSuccess('a').catch(err => ({ error: err.message })),
//     asyncFail('b').catch(err => ({ error: err.message })),
//     asyncFail('c').catch(err => ({ error: err.message })),
//   ]);

//   return myPromise.then((result) => {
//     console.log(result);
//   }).catch((err) => {
//     console.log('error', err.message);
//   });
// };

// test21();

// const test22 = () => {
//   const promises = [
//     asyncSuccess('a'),
//     asyncSuccess('b'),
//     asyncSuccess('c'),
//   ];

//   return promises.reduce((lastPromise, currentPromise) => {
//     return lastPromise.then(currentPromise);
//   }, Promise.resolve()).then((result) => {
//     console.log(result);
//   });
// };

// test22();

// const test23 = () => {
//   const promises = [
//     asyncSuccess('a'),
//     asyncSuccess('b'),
//     asyncSuccess('c'),
//   ];

//   return promises.reduce((lastPromise, currentPromise) => {
//     return lastPromise.then((lastResult) => {
//       return currentPromise.then(currentResult => [...lastResult, currentResult]);
//     });
//   }, Promise.resolve([])).then((result) => {
//     console.log(result);
//   });
// };

// test23();

// const test24 = () => {
//   const promises = [
//     asyncSuccess('a'),
//     asyncFail('b').catch(err => ({ error: err.message })),
//     asyncFail('c').catch(err => ({ error: err.message })),
//   ];

//   return promises.reduce((lastPromise, currentPromise) => {
//     return lastPromise.then((lastResult) => {
//       return currentPromise.then(currentResult => [...lastResult, currentResult]);
//     });
//   }, Promise.resolve([])).then((result) => {
//     console.log(result);
//   });
// };

// test24();
