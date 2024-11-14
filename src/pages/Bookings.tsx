import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

const Bookings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis reservas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Mis reservas</IonTitle>
          </IonToolbar>
        </IonHeader>

        <ExploreContainer name='Mi lista de reservas' />
      </IonContent>
    </IonPage>
  );
};

export default Bookings;
