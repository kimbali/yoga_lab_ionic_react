import { IonSpinner, useIonRouter } from '@ionic/react';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import GLOBAL from '../utils/global';
import { getUserData } from '../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  user: User | null;
}

interface User {
  token: string;
  username: string;
  userId: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  const router = useIonRouter();

  // Simulamos la carga del estado de autenticación desde almacenamiento local al iniciar la app
  useEffect(() => {
    const token = localStorage.getItem(GLOBAL.STORAGE.TOKEN);

    const getUser = async (token: string) => {
      const data = await getUserData(token);
      setUser(data.user);
    };

    if (token) {
      setIsAuthenticated(true);
      getUser(token); // Call the async function to get user data
    }
  }, []);

  useEffect(() => {
    // Simulate async authentication check (e.g., check localStorage or API)
    const checkAuth = () => {
      const token = localStorage.getItem(GLOBAL.STORAGE.TOKEN);
      setIsAuthenticated(!!token); // if token exists, user is authenticated
      setIsAuthLoading(false); // finished loading
    };

    checkAuth();
  }, []);

  const login = (userData: User) => {
    localStorage.setItem(GLOBAL.STORAGE.TOKEN, userData.token);
    setIsAuthenticated(true);
    setUser(userData);
    router.push(GLOBAL.ROUTES.APP);
  };

  const logout = () => {
    localStorage.removeItem(GLOBAL.STORAGE.TOKEN);
    setIsAuthenticated(false);
    router.push(GLOBAL.ROUTES.LOGIN);
  };

  if (isAuthLoading) {
    return <IonSpinner />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para usar el AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
