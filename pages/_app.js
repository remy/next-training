import App, { Container } from 'next/app';
import Layout from '../components/Layout';
import { appWithUser } from '../hocs/withUser';
import { appWithToken } from '../hocs/withToken';

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps: { ...pageProps, user: ctx.user } };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}

export default appWithToken(appWithUser(MyApp));
