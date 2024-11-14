import { IonButton, IonIcon, IonImg } from '@ionic/react';
import LOTUS_WOMAN from '../assets/lotus-woman.png';
import { calendar, location, phonePortrait } from 'ionicons/icons';
import GLOBAL from '../utils/global';
import Layout from '../components/Layout/Layout';
import Lotus from '../components/svg/Lotus';

const Menu: React.FC = () => {
  return (
    <Layout title='YogaLab Barcelona'>
      <IonImg
        src={LOTUS_WOMAN}
        alt='Mujer haciendo la postura de lotus de yoga'
      ></IonImg>

      <div className='ion-text-center'>
        <h1>Bienvenido a YogaLab</h1>
        <Lotus />
        <h2>Tu espacio de cuidado personal</h2>

        <IonButton href={`tel:${'617791443'}`} color='tertiary'>
          <IonIcon slot='start' icon={phonePortrait} />
          Llamar a la escuela
        </IonButton>

        <IonButton href={GLOBAL.ROUTES.LOCATION} color='tertiary'>
          <IonIcon slot='start' icon={location} />
          Ver localización
        </IonButton>

        <p>Recuerda llegar 10 minutos antes del comienzo de la clase</p>

        <IonButton size='large' expand='block' href={GLOBAL.ROUTES.BOOKINGS}>
          <IonIcon slot='start' icon={calendar}></IonIcon>Realizar reserva
        </IonButton>
      </div>
    </Layout>
  );
};

export default Menu;
