const asyncSuccess = param => new Promise((resolve) => {
  setTimeout(() => {
    resolve(`sucesso! ${param}`);
  }, 100);
});

const asyncFail = param => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error(`falha! ${param}`));
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


const test3 = () => asyncFail(3).then(error => console.log(`Erro: ${error.message}`));

async function x() {
  try {
    await test3();
  } catch (e) {
    console.log(`Erro: ${e.message}`);
  }
}

x();

const test4 = () => {
  Promise.resolve('hello')
    .then(result => console.log(`${result} sucesso`))
    .catch(error => console.log(`Erro: ${error.message} falha!`));
};

test4();

const test5 = () => {
  Promise.reject(new Error('hello'))
    .then(result => console.log(`${result} sucesso`))
    .catch(error => console.log(`Erro: ${error.message} falha!`));
};

test5();

const test6 = () => {
  asyncSuccess(6)
    .then((result) => {
      throw new Error(result);
    })
    .catch(error => console.log(`Erro: ${error.message}`));
};

test6();

const test7 = () => {
  asyncSuccess(7)
    .catch(error => console.log(`Erro: ${error.message}`))
    .then(console.log);
};

test7();

const test8 = () => {
  asyncFail(8)
    .catch(error => console.log(`Erro: ${error.message}`))
    .then(console.log);
};

test8();

const test9 = () => {
  asyncFail(9)
    .catch((error) => {
      console.log(`Erro: ${error.message}`);
      return 'valor corrigido';
    })
    .then(console.log);
};

test9();

const test10 = () => {
  asyncFail(10)
    .catch((error) => {
      console.log(`Erro1: ${error.message}`);
      throw error;
    })
    .then(console.log)
    .catch((error) => {
      console.log(`Erro2 ${error.message}`);
    });
};

test10();

const test11 = () => {
  asyncSuccess(11)
    .then((result) => {
      return asyncSuccess(result)
        .then(console.log);
    })
    .catch(error => console.log(`Erro: ${error.message}`));
};

test11();

const test12 = () => {
  asyncSuccess(12)
    .then((result) => {
      return asyncSuccess(result);
    })
    .then((result) => {
      console.log(result);
    })
    .catch(error => console.log(`Erro: ${error.message}`));
};

test12();

const test13 = () => {
  asyncSuccess(13)
    .then((result) => {
      return asyncSuccess(result);
    })
    .then((result) => {
      return asyncSuccess(result)
        .then(console.log);
    })
    .catch(error => console.log(`Erro: ${error.message}`));
};

test13();

const test14 = () => {
  asyncSuccess(14)
    .then((result) => {
      return asyncFail(result);
    })
    .then((result) => {
      return asyncSuccess(result)
        .then(console.log);
    })
    .catch(error => console.log(`Erro: ${error.message}`));
};

test14();

const test15 = () => {
  const firstPromise = asyncSuccess(15);

  const secondPromise = firstPromise
    .then((result) => {
      console.log('Executou aqui');
      return `Substituindo o resultado: ${result}`;
    });

  const thirdPromise = secondPromise;

  thirdPromise.then(console.log);
};

test15();
