import Layout from '../components/Layout';
import Session from '../components/Session';

const SessionPage = ({ session }) => (
  <Layout>
    <Session {...session} />
  </Layout>
);

SessionPage.getInitialProps = async ({ query }) => {
  const res = await fetch(`http://localhost:3001/schedule?slug=${query.slug}`);
  const schedule = await res.json();

  return { session: schedule[0] };
};

export default SessionPage;
