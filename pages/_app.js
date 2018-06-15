import { appWithUser } from '../hocs/withUser';
import React from 'react';

import App, { Container } from 'next/app';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, user: ctx.user };
  }

  render() {
    const { Component, pageProps, user } = this.props;
    return (
      <Container>
        <Component {...pageProps} user={user} />
      </Container>
    );
  }
}

export default appWithUser(MyApp);
