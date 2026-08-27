export interface AppConfig {
  appName: string;
  version: string;
  schemaVersion: string;
  environment: 'development' | 'production' | 'test';
  defaultLanguage: 'es' | 'en';
  defaultTheme: 'dark' | 'light';
}

export const APP_CONFIG: AppConfig = {
  appName: 'Venture Hub OS',
  version: '0.1.0',
  schemaVersion: '1.0',
  environment: 'development',
  defaultLanguage: 'es',
  defaultTheme: 'dark'
};
