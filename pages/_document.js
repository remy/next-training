import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async _getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width" />
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link rel="stylesheet" href="/static/styles.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
