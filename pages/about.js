import Link from 'next/link';
import Layout from '../components/Layout';

export default () => (
  <Layout title="About the app">
    <h1>About</h1>
    <p>This site will a conference schedule…eventually!</p>
    <p>
      <Link prefetch href="/contact">
        <a>Get in touch</a>
      </Link>
    </p>
  </Layout>
);
