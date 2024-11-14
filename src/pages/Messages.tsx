import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

const Messages: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis mensajes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Mis mensajes</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name='Mensajes que recibe desde la app' />
      </IonContent>
    </IonPage>
  );
};

export default Messages;
