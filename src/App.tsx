import { useEffect } from "react";
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  calendar,
  home,
  location,
  notifications,
  person,
} from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import SignUp from "./pages/SignUp";
import Menu from "./pages/Menu";
import GLOBAL from "./utils/global";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Location from "./pages/Location";
import { registerNotifications, addListeners } from "./services/pushNotificationService";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    const initializePushNotifications = async () => {
      try {
        console.log("Initializing push notifications...");
        await registerNotifications();
        await addListeners();
      } catch (error) {
        console.error("Error initializing push notifications:", error);
      }
    };

    initializePushNotifications();
  }, []);

  return (
      <IonApp>
        <IonReactRouter>
          <AuthProvider>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path={GLOBAL.ROUTES.LOGIN} component={LoginPage} />
                <Route exact path={GLOBAL.ROUTES.SIGNUP} component={SignUp} />
                <Route exact path={GLOBAL.ROUTES.APP} component={Menu} />
                <Route exact path={GLOBAL.ROUTES.MESSAGES} component={Messages} />
                <Route exact path={GLOBAL.ROUTES.PROFILE} component={Profile} />
                <Route exact path="/">
                  <Redirect to={GLOBAL.ROUTES.LOGIN} />
                </Route>
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="menu" href={GLOBAL.ROUTES.APP}>
                  <IonIcon aria-hidden="true" icon={home} />
                </IonTabButton>
                <IonTabButton tab="location" href={GLOBAL.ROUTES.LOCATION}>
                  <IonIcon aria-hidden="true" icon={location} />
                </IonTabButton>
                <IonTabButton tab="bookings" href={GLOBAL.ROUTES.BOOKINGS}>
                  <IonIcon aria-hidden="true" icon={calendar} />
                </IonTabButton>
                <IonTabButton tab="profile" href={GLOBAL.ROUTES.PROFILE}>
                  <IonIcon aria-hidden="true" icon={person} />
                </IonTabButton>
                <IonTabButton tab="messages" href={GLOBAL.ROUTES.MESSAGES}>
                  <IonIcon aria-hidden="true" icon={notifications} />
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </AuthProvider>
        </IonReactRouter>
      </IonApp>
  );
};

export default App;