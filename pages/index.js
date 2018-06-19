import fetch from 'isomorphic-unfetch';
import Session from '../components/Session';
import withToken from '../hocs/withToken';

const API = process.env.API || process.env.NOW_URL;

const Index = ({ schedule = [], ...props }) => (
  <>
    <h1>NextConf Schedule Browser</h1>
    {schedule.map(s => <Session key={s.slug} {...s} />)}
  </>
);

Index.getInitialProps = async () => {
  const res = await fetch(`${API}/schedule`);
  const schedule = await res.json();

  return { schedule };
};

export default Index;
