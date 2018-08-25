

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
    description: 'Quando a PROMISE é completada com erro usando await...',
    dependencies: [
      asyncFail,
    ],
    problem: async function foo() {
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
];



// const test3 = () => asyncFail(3).then(error => console.log(`Erro: ${error.message}`));

// async function x() {
//   try {
//     await test3();
//   } catch (e) {
//     console.log(`Erro: ${e.message}`);
//   }
// }

// x();

// const test4 = () => {
//   Promise.resolve('hello')
//     .then(result => console.log(`${result} sucesso`))
//     .catch(error => console.log(`Erro: ${error.message} falha!`));
// };

// test4();

// const test5 = () => {
//   Promise.reject(new Error('hello'))
//     .then(result => console.log(`${result} sucesso`))
//     .catch(error => console.log(`Erro: ${error.message} falha!`));
// };

// test5();

// const test6 = () => {
//   asyncSuccess(6)
//     .then((result) => {
//       throw new Error(result);
//     })
//     .catch(error => console.log(`Erro: ${error.message}`));
// };

// test6();

// const test7 = () => {
//   asyncSuccess(7)
//     .catch(error => console.log(`Erro: ${error.message}`))
//     .then(console.log);
// };

// test7();

// const test8 = () => {
//   asyncFail(8)
//     .catch(error => console.log(`Erro: ${error.message}`))
//     .then(console.log);
// };

// test8();

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
