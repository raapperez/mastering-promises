import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="pt-BR">
        <Head>
          <title>Dominando Promises</title>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <meta name="author" content="Rodrigo Augusto Azevedo Pelegrini Perez" />
          <meta name="description" content="Veja com exemplos tudo o que você precisa saber de Promises." />
          <meta name="keywords" content="Promise,JavaScript" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="static/questions.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
