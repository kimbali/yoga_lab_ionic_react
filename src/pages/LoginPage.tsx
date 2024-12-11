import React, { useState } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonButton,
  IonCardContent,
  IonIcon,
  IonInput,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonLabel,
  IonItem,
  IonText,
} from '@ionic/react';
import { logInOutline } from 'ionicons/icons';
import { login as loginService } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import LOTUS_WOMAN from '../assets/lotus-woman.png';
import Layout from '../components/Layout/Layout';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      const res = await loginService({ username: email, password });

      if (res.error) {
        setError(res.message);
        return;
      }

      login(res);
    } catch (error: any) {
      console.error('Login failed:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title='Login' loading={loading}>
      <IonCard className='page-card'>
        <img src={LOTUS_WOMAN} alt='Image of a person doing a yoga posture' />

        <IonCardHeader>
          <IonCardTitle>Inicia sessión</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <form onSubmit={handleLogin}>
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

            <IonItem>
              <IonLabel>
                Aun no tienes una cuenta?{' '}
                <Link to='/signup'>Registrate aqui</Link>
              </IonLabel>
            </IonItem>
          </form>
        </IonCardContent>

        <IonButton
          className='ion-margin'
          color='primary'
          size='large'
          expand='block'
          type='submit'
          disabled={!password || !email}
          onClick={handleLogin}
        >
          Login
          <IonIcon icon={logInOutline} slot='end' />
        </IonButton>

        <div className='ion-text-center' style={{ width: '100%' }}>
          <IonLabel>
            {error && <IonText color='danger'>{error}</IonText>}
          </IonLabel>
        </div>
      </IonCard>
    </Layout>
  );
};

export default LoginPage;
