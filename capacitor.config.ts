import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'yogaLabReact',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0, // Para evitar problemas con el SplashScreen
    },
    CapacitorHttp: {
      enabled: true, // Habilitar el plugin HTTP para evitar problemas de CORS
    },
  },
};

export default config;
