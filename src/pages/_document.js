import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocuments extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}