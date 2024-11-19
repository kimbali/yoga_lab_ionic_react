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
  IonItem,
  IonList,
} from '@ionic/react';
import { logInOutline } from 'ionicons/icons';
import { login as loginService } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import splashImg from '../assets/splash-page.jpg';
import Layout from '../components/Layout/Layout';
import './LoginPage.css'; // Import component-specific styles

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const res = await loginService({ username, password });

      if (res.error) {
        setError(res.message);
        return;
      }

      login(res.token);
    } catch (error: any) {
      console.error('Login failed:', error);
      setError(error.message); // Display the error message in the UI
    }
  };

  return (
      <Layout title='login'>
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
                            value={username}
                            onIonChange={e => setEmail(e.detail.value!)}
                        />


                        <IonInput
                            fill='outline'
                            labelPlacement='stacked'
                            label='Password'
                            type='password'
                            value={password}
                            onIonChange={e => setPassword(e.detail.value!)}
                        />



                    {error && <p className='error-message'>Error: {error}</p>}

                    <IonButton type='submit' expand='block' className='login-button'>
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
