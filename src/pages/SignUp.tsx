import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonButton,
  IonCardContent,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { checkmarkDoneCircleOutline } from "ionicons/icons";
import { signup } from "../services/authService";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signup({ username, password });
      console.log("Registration successful:", res);
      setSuccessMessage(res.message);
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle error (e.g., show a UI error message)
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/login'></IonBackButton>
          </IonButtons>
          <IonTitle>Create Your Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
                    onIonChange={(e) => setName(e.detail.value!)}
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
                    onIonChange={(e) => setPassword(e.detail.value!)}
                  />
                </IonItem>
              </IonList>

              <IonButton
                className='ion-margin-top'
                color={"secondary"}
                type='submit'
                expand='block'
              >
                Create Account
                <IonIcon icon={checkmarkDoneCircleOutline} slot='end' />
              </IonButton>
            </form>

            {successMessage && (
              <p>
                Success: {successMessage}, <Link to='/login'>Log in here</Link>
              </p>
            )}

            <p>
              Already have an account? <Link to='/login'>Log in here</Link>
            </p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
