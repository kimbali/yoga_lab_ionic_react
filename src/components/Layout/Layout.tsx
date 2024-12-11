import { ReactNode } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import './layout.scss';
import Header from '../header/Header.js';

interface LayoutProps {
  title: string;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <IonPage>
      <Header title={title} />

      <IonContent fullscreen color={'secondary'} className='ion-padding'>
        <div>{children}</div>
      </IonContent>
    </IonPage>
  );
};

export default Layout;
