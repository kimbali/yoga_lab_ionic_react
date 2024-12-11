import {
  IonButton,
  IonCard,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useState } from 'react';
import { User } from '../../interfaces/userType';

interface UserFormProps {
  setIsModalOpen: (param: boolean) => void;
  handleSave: (data: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ setIsModalOpen, handleSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  };

  const handelSubmit = () => {
    handleSave(formData);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Profile</IonTitle>
          <IonButton slot='end' onClick={() => setIsModalOpen(false)}>
            Close
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding'>
        <IonItem>
          <IonLabel position='stacked'>Nombre</IonLabel>
          <IonInput
            value={formData.name}
            placeholder='Introduce tu nombre'
            onIonInput={e => handleInputChange('name', e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position='stacked'>Teléfono</IonLabel>
          <IonInput
            type='tel'
            value={formData.phone}
            placeholder='Entra tu teléfono'
            onIonInput={e => handleInputChange('phone', e.detail.value!)}
          />
        </IonItem>
      </IonContent>

      <IonFooter>
        <IonButton
          className='ion-margin'
          color='primary'
          size='large'
          expand='block'
          onClick={handelSubmit}
        >
          Guardar
        </IonButton>
      </IonFooter>
    </>
  );
};

export default UserForm;
