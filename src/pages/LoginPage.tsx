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
} from '@ionic/react';
import { logInOutline } from 'ionicons/icons';
import { login as loginService } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import splashImg from '../assets/splash-page.jpg';
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
    <Layout title='login' loading={loading}>
      <IonGrid fixed>
        <IonRow className='ion-justify-content-center'>
          <IonCol sizeXs='12' sizeMd='8' sizeLg='6' sizeXl='4'>
            <div className='ion-text-center ion-padding'>
              <img
                src={splashImg}
                alt='Image of a person doing a yoga posture'
                className='splash-image'
              />
            </div>
          </IonCol>
        </IonRow>

        <IonRow className='ion-justify-content-center'>
          <IonCol sizeXs='12' sizeMd='8' sizeLg='6' sizeXl='4'>
            <IonCard className='form-container'>
              <IonCardContent>
                <form onSubmit={handleLogin}>
                  <IonInput
                    className='ion-margin-bottom'
                    fill='outline'
                    labelPlacement='stacked'
                    label='Email'
                    type='email'
                    placeholder='jonDoe@gmail.com'
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

                  {error && <p className='error-message'>Error: {error}</p>}

                  <IonButton
                    type='submit'
                    expand='block'
                    className='login-button'
                  >
                    Login
                    <IonIcon icon={logInOutline} slot='end' />
                  </IonButton>

                  <p className='signup-link'>
                    Don't have an account?{' '}
                    <Link to='/signup'>Sign up here</Link>
                  </p>
                </form>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Layout>
  );
};

export default LoginPage;
