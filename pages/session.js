import Layout from '../components/Layout';
import Session from '../components/Session';
import fetch from 'isomorphic-unfetch';

const API = process.env.API || process.env.NOW_URL;

const SessionPage = ({ session, rating, ...props }) => (
  <>
    <Session {...session} rating={rating} more={true} {...props} />
  </>
);

SessionPage.getInitialProps = async ({ query, user }) => {
  console.log('SessionPage.getInitialProps', user);
  const res = await fetch(`${API}/schedule/${query.slug}`, {
    mode: 'cors',
  });
  const session = await res.json();

  return { session, rating: query.rating };
};

export default SessionPage;
