import Layout from '../components/Layout';
import Session from '../components/Session';
import fetch from 'isomorphic-unfetch';
import withUser from '../hocs/withUser';

const API = process.env.API || process.env.NOW_URL;

const SessionPage = ({ session, rating, ...props }) => (
  <Layout {...props}>
    <Session {...session} rating={rating} more={true} {...props} />
  </Layout>
);

SessionPage.getInitialProps = async ({ query, req }) => {
  const res = await fetch(`${API}/schedule/${query.slug}`, {
    mode: 'cors',
  });
  const session = await res.json();

  return { session, rating: query.rating };
};

export default withUser(SessionPage);
