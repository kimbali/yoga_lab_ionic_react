import { ReactNode } from 'react';
import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import './layout.scss';
import Header from '../header/Header.js';

interface LayoutProps {
  title: string;
  children: ReactNode;
  loading?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  title,
  children,
  loading = false,
}) => {
  return (
    <IonPage>
      <Header title={title} />

      {loading ? (
        <IonSpinner />
      ) : (
        <IonContent fullscreen color={'secondary'} className='ion-padding'>
          <div>{children}</div>
        </IonContent>
      )}
    </IonPage>
  );
};

export default Layout;
