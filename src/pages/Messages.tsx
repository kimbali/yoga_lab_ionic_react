// src/pages/Tab1.tsx
import React, { useEffect } from "react";
import { IonButton, IonCard, IonCardContent } from "@ionic/react";

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
    <Layout title={"push notifications"}>
      <IonCard>
        <IonCardContent>
          <IonButton onClick={getDeliveredNotifications}>
            get delivered notification
          </IonButton>
        </IonCardContent>
      </IonCard>
    </Layout>
  );
};

export default Messages;

/*
How This Works
useEffect Hook:
Initializes push notifications by calling registerNotifications and setting up listeners with addListeners.
This ensures that the logic runs once when the component is loaded.
Button for Fetching Notifications:
The button labeled "Get Delivered Notifications" calls the getDeliveredNotifications function when clicked, allowing you to fetch and log delivered notifications.
Separation of Concerns:
The push notification logic is encapsulated in the utility file, keeping your Tab1 component clean and focused on rendering UI.*/
