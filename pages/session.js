import Layout from '../components/Layout';
import Session from '../components/Session';
import fetch from 'isomorphic-unfetch';

const SessionPage = ({ session, rating }) => (
  <Layout>
    <Session {...session} rating={rating} more={true} />
  </Layout>
);

SessionPage.getInitialProps = async ({ query, req }) => {
  if (req) {
    console.log('ON SERVER');
  } else {
    console.log('IN CLIENT');
  }

  const res = await fetch(`http://localhost:3001/schedule/${query.slug}`);
  const session = await res.json();

  return { session, rating: query.rating };
};

export default SessionPage;
