import { ReactNode } from 'react';
import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import './layout.scss';
import Header from '../header/Header.js';
import Lotus from '../svg/Lotus';

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

      <IonContent fullscreen color={'secondary'} className='ion-padding'>
        {loading ? (
          <IonSpinner className='spinner' />
        ) : (
          <>
            <div>{children}</div>

            <Lotus />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Layout;
