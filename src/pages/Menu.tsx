import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from '@ionic/react';
import LOTUS_WOMAN from '../assets/lotus-woman.png';
import { calendar, location, phonePortrait } from 'ionicons/icons';
import GLOBAL from '../utils/global';
import Layout from '../components/Layout/Layout';
import './Menu.css';

const Menu: React.FC = () => {
  return (
    <Layout title='Bienvenido'>
      <IonCard className='page-card'>
        <img
          className='woman'
          src={LOTUS_WOMAN}
          alt='Mujer haciendo la postura de lotus de yoga'
        />

        <IonCardHeader>
          <IonCardTitle>YogaLab</IonCardTitle>
          <IonCardSubtitle>Tu espacio de cuidado personal</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          <IonButton href={`tel:${'617791443'}`} fill='clear'>
            <IonIcon slot='start' icon={phonePortrait} />
            Hablar con la escuela
          </IonButton>

          <IonButton href={GLOBAL.ROUTES.LOCATION} fill='clear'>
            <IonIcon slot='start' icon={location} />
            Localizar el centro
          </IonButton>
        </IonCardContent>

        <IonButton
          className='ion-margin'
          color='primary'
          size='large'
          expand='block'
          href={GLOBAL.ROUTES.YOGA_CLASS_LIST}
        >
          <IonIcon slot='start' icon={calendar}></IonIcon>Ver horarios
        </IonButton>
      </IonCard>
    </Layout>
  );
};

export default Menu;
