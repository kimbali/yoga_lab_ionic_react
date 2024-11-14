import { useIonRouter } from '@ionic/react';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useHistory } from 'react-router-dom';
import GLOBAL from '../utils/global';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const history = useHistory();
  const router = useIonRouter();

  // Simulamos la carga del estado de autenticación desde almacenamiento local al iniciar la app
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    // Simulate async authentication check (e.g., check localStorage or API)
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      setIsAuthenticated(!!token); // if token exists, user is authenticated
      setIsLoading(false); // finished loading
    };

    checkAuth();
  }, []);

  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    router.push(GLOBAL.ROUTES.APP); // Redirigir a la página principal
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    router.push(GLOBAL.ROUTES.LOGIN); // Redirigir a la página de login
  };

  if (isLoading) {
    return <div>Loading...</div>; // Optionally, show a loading spinner while checking authentication
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
