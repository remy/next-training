import fetch from 'isomorphic-unfetch';
import Session from '../components/Session';
import Layout from '../components/Layout';

const Index = ({ schedule }) => (
  <Layout>
    <h1>NextConf Schedule Browser</h1>
    {schedule.map(s => <Session key={s.slug} {...s} />)}
  </Layout>
);

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3001/schedule');
  const schedule = await res.json();

  return { schedule };
};

export default Index;
