import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

const Location: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Localizacion del centro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Localizacion del centro</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name='Mapa de localizacion' />
      </IonContent>
    </IonPage>
  );
};

export default Location;
