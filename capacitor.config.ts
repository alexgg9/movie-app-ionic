import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'movies-app',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    allowNavigation: [
      "movies-app://*",
      "https://*.themoviedb.org",
    ]
  }
};

export default config;
