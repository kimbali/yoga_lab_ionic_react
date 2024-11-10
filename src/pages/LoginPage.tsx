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
import { logInOutline } from "ionicons/icons";
import { login as loginService } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import splashImg from "../assets/splash-page.jpg"; // Make sure this path is correct

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const res = await loginService({ username, password });
      console.log("Login successful:", res);

      if (res.error) {
        setError(res.message);
        return;
      }

      login(res.token);
    } catch (error: any) {
      console.error("Login failed:", error);
      setError(error.message); // Display the error message in the UI
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='ion-text-center ion-padding'>
          <img
            src={splashImg}
            alt='Image of a person doing a yoga posture'
            width={"50%"}
          />
        </div>

        <IonCard>
          <IonCardContent>
            <form onSubmit={handleLogin}>
              <IonList>
                <IonItem>
                  <IonInput
                    className='ion-margin'
                    fill='outline'
                    labelPlacement='stacked'
                    label='Email'
                    type='email'
                    placeholder='jonDoe@gmail.com'
                    value={username}
                    onIonChange={(e) => setEmail(e.detail.value!)}
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

              {error && <p>Error: {error}</p>}

              <IonButton type='submit' expand='block'>
                Login
                <IonIcon icon={logInOutline} slot='end' />
              </IonButton>

              <p>
                Don't have an account? <Link to='/signup'>Sign up here</Link>
              </p>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
