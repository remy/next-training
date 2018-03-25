import Layout from '../components/Layout';
import Session from '../components/Session';
import fetch from 'isomorphic-unfetch';

const API = process.env.API || process.env.NOW_URL;

const SessionPage = ({ session, rating }) => (
  <Layout>
    <Session {...session} rating={rating} more={true} />
  </Layout>
);

SessionPage.getInitialProps = async ({ query, req }) => {
  const res = await fetch(`${API}/schedule/${query.slug}`);
  const session = await res.json();

  return { session, rating: query.rating };
};

export default SessionPage;
