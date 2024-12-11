import React, { useState } from 'react';
import {
  IonCard,
  IonButton,
  IonCardContent,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
  IonText,
  IonItemDivider,
} from '@ionic/react';
import { addCircleOutline, checkmarkDoneCircleOutline } from 'ionicons/icons';
import { signup } from '../services/authService';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import LOTUS_WOMAN from '../assets/lotus-woman.png';
import './SignUp.css';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signup({ username: email, password });
      setSuccessMessage(res.message);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Layout title='Sign Up'>
      <IonCard className='page-card'>
        <img src={LOTUS_WOMAN} alt='Image of a person doing a yoga posture' />

        <IonCardHeader>
          <IonCardTitle>Registrate</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <form onSubmit={handleSignUp}>
            <IonInput
              className='ion-margin-bottom'
              fill='outline'
              labelPlacement='stacked'
              label='Email'
              type='email'
              placeholder='hello@gmail.com'
              value={email}
              onIonInput={(e: any) => setEmail(e.target.value)}
            />
            <IonInput
              fill='outline'
              labelPlacement='stacked'
              label='Password'
              type='password'
              value={password}
              onIonInput={(e: any) => setPassword(e.target.value)}
            />
          </form>

          <IonItem>
            <IonLabel>
              Ya tienes una cuenta?{' '}
              <Link to='/login'>Entra con tu usuario</Link>
            </IonLabel>
          </IonItem>
        </IonCardContent>

        <IonButton
          className='ion-margin'
          color='primary'
          size='large'
          expand='block'
          type='submit'
          disabled={!password || !email}
          onClick={handleSignUp}
        >
          Crear usuario <IonIcon icon={addCircleOutline} />
        </IonButton>

        <div className='ion-text-center' style={{ width: '100%' }}>
          <IonLabel>
            {successMessage && (
              <IonText color='warning'>
                {successMessage} <Link to='/login'>Ir al login</Link>
              </IonText>
            )}
          </IonLabel>
        </div>
      </IonCard>
    </Layout>
  );
};

export default SignUp;
