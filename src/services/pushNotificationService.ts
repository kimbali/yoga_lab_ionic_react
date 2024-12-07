import { PushNotifications } from "@capacitor/push-notifications";

export const addListeners = async () => {
  await PushNotifications.addListener("registration", (token) => {
    console.info("Myapp Registration token: ", token.value);
  });

  await PushNotifications.addListener("registrationError", (err) => {
    console.error(" Myapp Registration error: ", err.error);
  });

  await PushNotifications.addListener(
    "pushNotificationReceived",
    (notification) => {
      console.log(" Myapp Push notification received: ", notification);
    }
  );

  await PushNotifications.addListener(
    "pushNotificationActionPerformed",
    (notification) => {
      console.log(
        " Myapp Push notification action performed",
        notification.actionId,
        notification.inputValue
      );
    }
  );
};

export const registerNotifications = async () => {
  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === "prompt") {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== "granted") {
    throw new Error("User denied permissions!");
  }

  await PushNotifications.register();
};



export const getDeliveredNotifications = async () => {
  const result = await PushNotifications.getDeliveredNotifications();
  console.log("Delivered notifications:", result);
  return result; // Return the notifications list
};

/*
* Key Events:
registration:
Triggered when the app successfully registers for push notifications.
You receive a registration token (unique to the device) that can be used to send push notifications to this device.
This token should usually be sent to your backend server.
registrationError:
Triggered if the registration process fails.
Logs the error for debugging.
pushNotificationReceived:
Fired when the app receives a push notification while it is open.
Useful for displaying in-app alerts or logging the notification data.
pushNotificationActionPerformed:
Triggered when the user interacts with the notification (e.g., taps on it).
Provides details like the action ID (if the notification had actions) and any input value the user provided.
*
*
* Logic:

Purpose: To check and request permissions for push notifications, and then register the app/device for receiving notifications.
Step-by-Step Process:
Check Permissions (checkPermissions):
Checks the current notification permissions status (granted, denied, or prompt).
Request Permissions (requestPermissions):
If permissions are set to prompt (i.e., the user hasn’t decided yet), request permission from the user.
Handle Denied Permissions:
If the user denies permissions, throw an error so you can handle it (e.g., show a message in the app).
Register the App (register):
If permissions are granted, register the app to receive push notifications.
This process generates a device token, which you’ll need to send to your backend for sending notifications.
*
*
*
*
*Flow of Operations
User launches the app:
In useEffect or another lifecycle method, registerNotifications is called to register the app and request permissions.
Listeners are set up:
addListeners is invoked to listen for events like registration, errors, incoming notifications, or user actions.
Push Notifications arrive:
If the app is open, pushNotificationReceived is triggered, and you can display or log the notification.
User interacts with a notification:
pushNotificationActionPerformed fires, and you can handle the user’s interaction (e.g., navigate to a specific screen).
Delivered notifications:
You can use getDeliveredNotifications to retrieve previously delivered notifications for display.
*
*
*
*How Does This Help in Real Apps?
Registration Token: You send this token to your backend server to identify the device for push notifications.
Listeners: They enable real-time handling of notifications, ensuring a seamless user experience.
Permission Management: Handles edge cases where the user has denied or hasn’t yet granted permissions.
Delivered Notifications: Useful for showing a notification history or debugging notification delivery.
By organizing this logic in a service, you ensure it’s reusable, maintainable, and decoupled from your UI code.
*
*
*
* at Happens During Registration?
Registering on the Mobile Device:
When you call PushNotifications.register(), the app requests permission to send notifications to the user.
If the user grants permission, the operating system (iOS or Android) registers the app with its notification service.
This registration is specific to the mobile device and the app.
Receiving a Device Token:
After the device is successfully registered, the notification service (APNs for iOS or FCM for Android) generates a unique device token.
This token is a key identifier that allows the notification service to target this specific device for notifications.
Communicating with Your Backend Server:
The device token is returned to your app (via the registration event in the addListeners function).
Typically, your app then sends this token to your backend server.
Your backend stores the token and uses it to send push notifications to this specific device in the future.
* */
