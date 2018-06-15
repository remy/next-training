import Link from 'next/link';
import Layout from '../components/Layout';

const About = props => (
  <Layout title="About the app" {...props}>
    <h1>About</h1>
    <p>This site will a conference schedule…eventually!</p>
    <p>
      <Link prefetch href="/contact">
        <a>Get in touch</a>
      </Link>
    </p>
  </Layout>
);

export default About;
