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
import { User } from '../interfaces/userType';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  const router = useIonRouter();

  useEffect(() => {
    const token = localStorage.getItem(GLOBAL.STORAGE.TOKEN);

    const getUser = async (token: string) => {
      try {
        const data = await getUserData(token);
        setUser({ ...data.user, token });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsAuthenticated(false);
      }
    };

    if (token) {
      setIsAuthenticated(true);
      getUser(token);
    } else {
      setIsAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem(GLOBAL.STORAGE.TOKEN);
      setIsAuthenticated(!!token);
      setIsAuthLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData: User) => {
    if (userData && userData.token) {
      localStorage.setItem(GLOBAL.STORAGE.TOKEN, userData.token);
      setIsAuthenticated(true);
      setUser(userData);
      router.push(GLOBAL.ROUTES.APP);
    }
  };

  const logout = () => {
    localStorage.removeItem(GLOBAL.STORAGE.TOKEN);
    setIsAuthenticated(false);
    setUser(null); // Resetear user al cerrar sesión
    router.push(GLOBAL.ROUTES.LOGIN);
  };

  if (isAuthLoading) {
    return <IonSpinner />;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
