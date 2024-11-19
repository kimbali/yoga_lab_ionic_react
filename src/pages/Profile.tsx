import React from "react";
import { IonButton, IonIcon, IonAvatar, IonLabel, IonItem } from "@ionic/react";
import { camera } from "ionicons/icons";
import Layout from "../components/Layout/Layout";

const Profile: React.FC = () => {
  const handleTakePicture = () => {
    console.log("Take Picture button clicked!");
    // Logic for taking a picture will be added later
  };

  return (
    <Layout title='Profile page'>
      {/* Profile Picture */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <IonAvatar
          style={{ width: "100px", height: "100px", margin: "0 auto" }}
        >
          <img src='https://via.placeholder.com/100' alt='Profile' />
        </IonAvatar>
        <IonLabel>
          <h2 style={{ marginTop: "10px" }}>Your Name</h2>
        </IonLabel>
      </div>

      {/* User Info */}
      <IonItem lines='none'>
        <IonLabel>
          <p>Email: your.email@example.com</p>
          <p>Phone: (123) 456-7890</p>
        </IonLabel>
      </IonItem>

      {/* Take Picture Button */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <IonButton onClick={handleTakePicture} color='primary'>
          <IonIcon slot='start' icon={camera} />
          Take Picture
        </IonButton>
      </div>
    </Layout>
  );
};

export default Profile;
