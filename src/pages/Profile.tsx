import React from "react";
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

const Profile: React.FC = () => {
    const handleTakePicture = () => {
        console.log("Take Picture button clicked!");
        // Logic for taking a picture will be added later
    };

    return (
        <Layout title="My Profile">
            <IonGrid>
                <IonRow className="ion-justify-content-center">
                    <IonCol size="12" size-md="6">
                        <IonCard>
                            {/* Profile Picture */}
                            <IonCardHeader style={{ textAlign: "center" }}>
                                <IonAvatar
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        margin: "0 auto",
                                    }}
                                >
                                    <img src="https://via.placeholder.com/100" alt="Profile" />
                                </IonAvatar>
                                <IonLabel>
                                    <h2 style={{ marginTop: "10px", color: "var(--ion-color-dark)" }}>
                                        Your Name
                                    </h2>
                                </IonLabel>
                            </IonCardHeader>

                            {/* User Info */}
                            <IonCardContent>
                                <IonItem lines="none" style={{ "--background": "transparent" }}>
                                    <IonLabel className="ion-text-wrap">
                                        <p style={{ marginBottom: "5px", color: "var(--ion-color-medium)" }}>
                                            <strong>Email:</strong> your.email@example.com
                                        </p>
                                        <p style={{ color: "var(--ion-color-medium)" }}>
                                            <strong>Phone:</strong> (123) 456-7890
                                        </p>
                                    </IonLabel>
                                </IonItem>

                                {/* Take Picture Button */}
                                <div style={{ textAlign: "center", marginTop: "20px" }}>
                                    <IonButton
                                        onClick={handleTakePicture}
                                        color="primary"
                                        style={{
                                            "--background": "var(--ion-color-primary)",
                                            "--color": "var(--ion-color-primary-contrast)",
                                        }}
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
