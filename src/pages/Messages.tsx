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
import "./Messages.css"; // Import the external CSS file

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
              <IonCardHeader className="card-header">
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
                  <div className="no-notifications">
                    <IonIcon
                      icon={notificationsOffOutline}
                      className="no-notifications-icon"
                    />
                    <p>No notifications to show</p>
                  </div>
                )}
                <div className="fetch-button-container">
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
