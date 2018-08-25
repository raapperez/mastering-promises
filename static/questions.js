

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
    description: 'PROMISES são executadas "depois", mesmo que já resolvidas...',
    dependencies: [
    ],
    problem: function caju() {
      const myPromise = Promise.resolve('caju');
      myPromise.then((result) => {
        console.log(result);
      });
      console.log('cajuzinho');
      return myPromise;
    },
    answers: [
      'caju|cajuzinho',
      'cajuzinho|caju',
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
    description: 'O que acontece: CATCH antes de um THEN num fluxo de sucesso...',
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
    description: 'O que acontece: CATCH antes de um THEN num fluxo de erro...',
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
  {
    description: 'CATCHs podem corrigir um erro...',
    dependencies: [
      asyncFail,
    ],
    problem: function banana() {
      return asyncFail('banana')
        .then((result) => {
          console.log('banana prata');
          return result;
        })
        .catch((error) => {
          console.log(`Erro: ${error.message}`);
          return 'banana nanica';
        })
        .then(console.log);
    },
    answers: [
      'Erro: falha(banana)|banana nanica',
      'banana prata|Erro: falha(banana)|banana nanica',
      'Erro: falha(banana)|sucesso(banana naninca)',
      'undefined|Erro: falha(banana prata)|banana prata',
    ],
  },
  {
    description: 'Os THENs são ignorados no fluxo quando há erro...',
    dependencies: [
      asyncFail,
    ],
    problem: function morango() {
      return asyncFail('morango')
        .catch((error) => {
          console.log(`Erro1: ${error.message}`);
          throw error;
        })
        .then(console.log)
        .catch((error) => {
          console.log(`Erro2 ${error.message}`);
        });
    },
    answers: [
      'Erro2: falha(morango)',
      'Erro1: falha(morango)|Erro2: falha(morango)',
      'Erro1: falha(morango)|falha(morango)|Erro2: falha(morango)',
    ],
  },
  {
    description: 'É possível retornar PROMISES dentro de THEN / CATCH...',
    dependencies: [
      asyncSuccess,
    ],
    problem: function pitanga() {
      return asyncSuccess('pitanga')
        .then((result) => {
          return asyncSuccess(result)
            .then(console.log);
        })
        .catch(error => console.log(`Erro: ${error.message}`));
    },
    answers: [
      'sucesso(sucesso(pitanga))',
      'sucesso(pitanga)|sucesso(pitanga)',
      'Erro: sucesso(sucesso(pitanga))',
    ],
  },
  {
    description: 'O resultado de um THEN cai no próximo THEN na cadeia...',
    dependencies: [
      asyncSuccess,
    ],
    problem: function ameixa() {
      return asyncSuccess('ameixa')
        .then((result) => {
          return asyncSuccess(result);
        })
        .then((result) => {
          console.log(result);
        })
        .catch(error => console.log(`Erro: ${error.message}`));
    },
    answers: [
      'sucesso(sucesso(ameixa))',
      'sucesso(ameixa)|sucesso(ameixa)',
      'Erro: sucesso(sucesso(ameixa))',
    ],
  },
  {
    description: 'Dificultando um pouco...',
    dependencies: [
      asyncSuccess,
    ],
    problem: function cenoura() {
      return asyncSuccess('cenoura')
        .then((result) => {
          return asyncSuccess(result);
        })
        .then((result) => {
          return asyncSuccess(result)
            .then(console.log);
        })
        .catch(error => console.log(`Erro: ${error.message}`));
    },
    answers: [
      'sucesso(cenoura)|sucesso(sucesso(cenoura))',
      'Erro: sucesso(sucesso(cenoura))',
      'sucesso(sucesso(sucesso(cenoura)))',
    ],
  },
  {
    description: 'Agora com um erro...',
    dependencies: [
      asyncSuccess,
      asyncFail,
    ],
    problem: function batata() {
      return asyncSuccess('batata')
        .then((result) => {
          return asyncFail(result);
        })
        .then((result) => {
          return asyncSuccess(result)
            .then(console.log);
        })
        .catch(error => console.log(`Erro: ${error.message}`));
    },
    answers: [
      'Erro: sucesso(falha(sucesso(batata)))',
      'Erro: falha(sucesso(batata))',
      'Erro: sucesso(sucesso(batata(batata)))',
    ],
  },
  {
    description: 'Use Promise.all para esperar mais de uma PROMISE...',
    dependencies: [
    ],
    problem: function amora() {
      const myPromise = Promise.all([
        Promise.resolve('a'),
        Promise.resolve('m'),
        Promise.resolve('o'),
        Promise.resolve('r'),
        Promise.resolve('a'),
      ]);

      return myPromise.then(result => result.join());
    },
    answers: [
      'amora',
      '["a", "m", "o", "r", "a"]',
    ],
  },
  {
    description: 'A PROMISE só pode ser resolvida ou rejeitada uma vez...',
    dependencies: [
      asyncSuccess,
    ],
    problem: function mandioca() {
      const firstPromise = asyncSuccess('mandioca');

      const secondPromise = firstPromise
        .then((result) => {
          console.log('Executou aqui');
          return `Novo resultado: ${result}`;
        });

      const thirdPromise = secondPromise;

      return Promise.all([
        thirdPromise.then(console.log),
        thirdPromise.then(console.log),
      ]);
    },
    answers: [
      'Executou aqui|Novo resultado: sucesso(mandioca)|Novo resultado: sucesso(mandioca)',
      'Executou aqui|Novo resultado: sucesso(mandioca)|Executou aqui|Novo resultado: sucesso(mandioca)',
      'Executou aqui|Executou aqui|Novo resultado: sucesso(mandioca)',
    ],
  },
  {
    description: 'Acontece o mesmo com o CATCH...',
    dependencies: [
    ],
    problem: function tamarindo() {
      const myPromise = new Promise((resolve, reject) => {
        console.log('Executou aqui');
        reject(new Error('tamarindo'));
      });

      return Promise.all([
        myPromise
          .then(() => console.log('Passou no then'))
          .catch(error => console.log(`Erro: ${error.message}`)),
        myPromise.catch(error => console.log(`Erro: ${error.message}`)),
        myPromise.catch(error => console.log(`Erro: ${error.message}`)),
      ]);
    },
    answers: [
      'Executou aqui|Erro: tamarindo|Executou aqui|Erro: tamarindo|Executou aqui|Erro: tamarindo',
      'Executou aqui|Erro: tamarindo|Erro: tamarindo|Erro: tamarindo',
      'Executou aqui|Passou no then|Erro: tamarindo|Erro: tamarindo|Erro: tamarindo',
    ],
  },
];


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
