import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
} from "@ionic/react";
import { notificationsOffOutline } from "ionicons/icons";
import Layout from "../components/Layout/Layout";
import { getDeliveredNotifications } from "../services/pushNotificationService";

const Messages: React.FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

  const fetchNotifications = async () => {
    try {
      const delivered = await getDeliveredNotifications();
      const messages = delivered.notifications.map(
          (n: any) => n.body || "No content"
      );
      setNotifications(messages);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications(["Error fetching notifications"]);
    }
  };

  return (
      <Layout title="Push Notifications">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-md="8">
              <IonCard>
                <IonCardHeader style={{ textAlign: "center" }}>
                  <h2>Notifications</h2>
                </IonCardHeader>
                <IonCardContent>
                  {notifications.length > 0 ? (
                      <ul>
                        {notifications.map((note, index) => (
                            <li key={index}>{note}</li>
                        ))}
                      </ul>
                  ) : (
                      <div style={{ textAlign: "center", color: "var(--ion-color-medium)" }}>
                        <IonIcon
                            icon={notificationsOffOutline}
                            style={{ fontSize: "40px", marginBottom: "10px" }}
                        />
                        <p>No notifications to show</p>
                      </div>
                  )}
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <IonButton onClick={fetchNotifications} color="primary">
                      Fetch Notifications
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