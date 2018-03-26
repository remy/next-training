import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import NProgress from 'nprogress';
import Router from 'next/router';

Router.onRouteChangeStart = url => {
  console.log(`Loading: ${url}`);
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export default ({ children, title = 'Nextconf Schedule', ...props }) => (
  <div id="root">
    <Head>
      <title>{title}</title>
      <link rel="stylesheet" href="/static/nprogress.css" />
    </Head>
    <Header {...props} />
    <main>{children}</main>
    <Footer />
  </div>
);
