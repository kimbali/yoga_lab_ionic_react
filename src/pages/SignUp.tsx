import React, { useState } from 'react';
import {
  IonCard,
  IonButton,
  IonCardContent,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { checkmarkDoneCircleOutline } from 'ionicons/icons';
import { signup } from '../services/authService';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const SignUp: React.FC = () => {
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signup({ username, password });
      setSuccessMessage(res.message);
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error (e.g., show a UI error message)
    }
  };

  return (
    <Layout title='Sign Up'>
      <IonGrid fixed>
        <IonRow class='ion-justify-content-center'>
          <IonCol sizeXs='12' sizeMd='8' sizeLg='6' sizeXl='4'>
            <IonCard>
              <IonCardContent>
                <form onSubmit={handleSignUp}>
                  <IonList>
                    <IonItem>
                      <IonInput
                        className='ion-margin'
                        fill='outline'
                        labelPlacement='stacked'
                        label='Username'
                        type='text'
                        value={username}
                        onIonChange={e => setName(e.detail.value!)}
                        placeholder='Enter your username'
                      />
                    </IonItem>
                    <IonItem>
                      <IonInput
                        className='ion-margin'
                        fill='outline'
                        labelPlacement='stacked'
                        label='Password'
                        type='password'
                        value={password}
                        onIonChange={e => setPassword(e.detail.value!)}
                      />
                    </IonItem>
                  </IonList>

                  <IonButton
                    className='ion-margin-top'
                    color={'secondary'}
                    type='submit'
                    expand='block'
                  >
                    Create Account
                    <IonIcon icon={checkmarkDoneCircleOutline} slot='end' />
                  </IonButton>
                </form>

                {successMessage && (
                  <p>
                    Success: {successMessage},{' '}
                    <Link to='/login'>Log in here</Link>
                  </p>
                )}

                <p>
                  Already have an account? <Link to='/login'>Log in here</Link>
                </p>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Layout>
  );
};

export default SignUp;
