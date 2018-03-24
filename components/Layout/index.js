import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default ({ children, title = 'Nextconf Schedule' }) => (
  <div id="root">
    <Head>
      <title>{title}</title>
      <link rel="stylesheet" href="/static/styles.css" />
    </Head>
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);
