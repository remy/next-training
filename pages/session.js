import Layout from '../components/Layout';
import Session from '../components/Session';
import fetch from 'isomorphic-unfetch';

const SessionPage = ({ session, rating }) => (
  <Layout>
    <Session {...session} rating={rating} />
  </Layout>
);

SessionPage.getInitialProps = async ({ query }) => {
  const res = await fetch(`http://localhost:3001/schedule/${query.slug}`);
  const session = await res.json();

  return { session, rating: query.rating };
};

export default SessionPage;
