import Layout from '../components/Layout/Layout';
import Mapa from '../components/mapa/Mapa';

const Location: React.FC = () => {
  return (
    <Layout title='Location'>
      <Mapa lat='234565' lng='12343' />
    </Layout>
  );
};

export default Location;
