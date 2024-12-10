import React, { useState } from "react";
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
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { camera } from "ionicons/icons";
import Layout from "../components/Layout/Layout";
import { Camera, CameraResultType } from "@capacitor/camera";
import "./Profile.css"; // Import the external CSS file

const Profile: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

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
      console.error("Error taking photo:", error);
    }
  };

  return (
    <Layout title="My Profile">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" size-md="6">
            <IonCard>
              {/* Profile Picture */}
              <IonCardHeader className="profile-header">
                <IonAvatar className="profile-avatar">
                  {image ? (
                    <img src={image} alt="Profile" />
                  ) : (
                    <img src="../assets/lotus-woman.png" alt="Profile" />
                  )}
                </IonAvatar>
                <IonLabel>
                  <h2 className="profile-name">Your Name</h2>
                </IonLabel>
              </IonCardHeader>
              {/* User Info */}
              <IonCardContent>
                <IonItem lines="none" className="profile-info-item">
                  <IonLabel className="ion-text-wrap">
                    <p className="profile-info">
                      <strong>Email:</strong> your.email@example.com
                    </p>
                    <p className="profile-info">
                      <strong>Phone:</strong> (123) 456-7890
                    </p>
                  </IonLabel>
                </IonItem>
                {/* Take Picture Button */}
                <div className="take-picture-container">
                  <IonButton
                    expand="full"
                    onClick={handleTakePicture}
                    color="primary"
                    className="take-picture-button"
                  >
                    <IonIcon slot="start" icon={camera} />
                    Take Picture
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Layout>
  );
};

export default Profile;
