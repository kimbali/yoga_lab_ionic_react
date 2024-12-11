import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
} from '@ionic/react';
import LOTUS_WOMAN from '../assets/lotus-woman.png';
import { calendar, location, phonePortrait } from 'ionicons/icons';
import GLOBAL from '../utils/global';
import Layout from '../components/Layout/Layout';
// import Lotus from '../components/svg/Lotus';

const Menu: React.FC = () => {
  return (
    <Layout title='YogaLab Barcelona'>
      <IonGrid fixed>
        {/* Centering Image Row */}
        <IonRow className='ion-justify-content-center ion-align-items-center'>
          <IonCol sizeXs='12' sizeMd='8' sizeLg='6' sizeXl='4'>
            <div className='ion-text-center'>
              <img
                src={LOTUS_WOMAN}
                alt='Mujer haciendo la postura de lotus de yoga'
                width='90%'
              />
            </div>
          </IonCol>
        </IonRow>

        {/* Centering Card Row */}
        <IonRow className='ion-justify-content-center ion-align-items-center'>
          <IonCol sizeXs='12' sizeMd='8' sizeLg='6' sizeXl='4'>
            <IonCard color='primary' className='menu-card'>
              <IonCardContent>
                <div className='ion-text-center'>
                  <h1>Bienvenido a YogaLab</h1>
                  <h2>Tu espacio de cuidado personal</h2>

                  <IonButton href={`tel:${'617791443'}`} color='tertiary'>
                    <IonIcon slot='start' icon={phonePortrait} />
                    Llamar a la escuela
                  </IonButton>

                  <IonButton href={GLOBAL.ROUTES.LOCATION} color='tertiary'>
                    <IonIcon slot='start' icon={location} />
                    Ver localización
                  </IonButton>

                  <p>
                    Recuerda llegar 10 minutos antes del comienzo de la clase
                  </p>

                  <IonButton
                    color='secondary'
                    size='large'
                    expand='block'
                    href={GLOBAL.ROUTES.YOGA_CLASS_LIST}
                  >
                    <IonIcon slot='start' icon={calendar}></IonIcon>Realizar
                    reserva
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Layout>
  );
};

export default Menu;
