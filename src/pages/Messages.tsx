import React, { useEffect } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import {
  registerNotifications,
  addListeners,
  getDeliveredNotifications,
} from "../services/pushNotificationService";
import Layout from "../components/Layout/Layout";
const Messages: React.FC = () => {
  useEffect(() => {
    const initializePushNotifications = async () => {
      try {
        // Register for notifications and set up listeners
        await registerNotifications();
        await addListeners();
      } catch (error) {
        console.error("Error initializing push notifications", error);
      }
    };
    initializePushNotifications();
  }, []); // Empty dependency array ensures this runs only once
  return (
      <Layout title="Push Notifications">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-md="6">
              <IonCard>
                <IonCardHeader style={{ textAlign: "center", color: "var(--ion-color-dark)" }}>
                  <h2>Manage Notifications</h2>
                </IonCardHeader>
                <IonCardContent>
                  <p
                      style={{
                        textAlign: "center",
                        marginBottom: "20px",
                        color: "var(--ion-color-medium)",
                      }}
                  >
                    Click below to fetch delivered notifications.
                  </p>
                  <div style={{ textAlign: "center" }}>
                    <IonButton
                        onClick={getDeliveredNotifications}
                        color="primary"
                        expand="block"
                        style={{
                          "--background": "var(--ion-color-primary)",
                          "--color": "var(--ion-color-primary-contrast)",
                        }}
                        aria-label="Fetch delivered notifications"
                    >
                      Get Delivered Notifications
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
export default Messages;
