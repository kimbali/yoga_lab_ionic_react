import { IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import './header.scss';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <IonHeader>
      <IonToolbar color={'light'}>
        <IonTitle color={'dark'} className='header-title'>
          {title}
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
