import React, { useState } from 'react';
import {
  IonButton,
  IonIcon,
  IonAvatar,
  IonLabel,
  IonItem,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonModal,
} from '@ionic/react';
import { camera, createOutline } from 'ionicons/icons';
import Layout from '../components/Layout/Layout';
import { Camera, CameraResultType } from '@capacitor/camera';
import './Profile.css';
import PROFILE_PIC from '../assets/splash-page.jpg';
import { useAuth } from '../contexts/AuthContext';
import UserForm from '../components/userForm/UserForm';
import { User } from '../interfaces/userType';
import { updateUserData } from '../services/authService';

const Profile: React.FC = () => {
  const { user, setUser } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTakePicture = async () => {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });

      const img = `data:image/jpeg;base64,${photo.base64String}`;
      setImage(img);
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };
  console.log(user);
  const handleSave = async (userData: User) => {
    try {
      if (user && user.token) {
        const updatedData = await updateUserData(user.token, userData);
        setUser({ ...user, ...updatedData.user });
      }
    } catch (error) {
      console.error('Failed to update user data:', error);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <Layout title='My Profile'>
      <IonCard className='page-card'>
        <IonCardHeader className='profile-header'>
          <IonAvatar className='profile-avatar'>
            {image ? (
              <img src={image} alt='Profile' />
            ) : (
              <img src={PROFILE_PIC} alt='Profile' />
            )}
          </IonAvatar>
          <IonLabel>
            <h2 className='profile-name'>{user?.name || 'Mi nombre'}</h2>
          </IonLabel>
        </IonCardHeader>

        <IonCardContent>
          <IonItem lines='none' className='profile-info-item'>
            <IonLabel className='ion-text-wrap'>
              <p className='profile-info'>
                <strong>Email:</strong> {user?.username || ''}
              </p>
              <p className='profile-info'>
                <strong>Phone:</strong> {user?.phone || 'Mi telefono'}
              </p>
            </IonLabel>
          </IonItem>

          <IonButton onClick={() => setIsModalOpen(true)} fill='clear'>
            <IonIcon slot='start' icon={createOutline} />
            Modificar datos
          </IonButton>

          <div className='take-picture-container'></div>
        </IonCardContent>

        <IonButton
          className='ion-margin'
          color='primary'
          size='large'
          expand='block'
          onClick={handleTakePicture}
        >
          <IonIcon slot='start' icon={camera} />
          Sacarme una foto
        </IonButton>
      </IonCard>

      <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
        <UserForm setIsModalOpen={setIsModalOpen} handleSave={handleSave} />
      </IonModal>
    </Layout>
  );
};

export default Profile;
