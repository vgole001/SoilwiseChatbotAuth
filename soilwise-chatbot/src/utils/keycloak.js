import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
  url: 'https://id.soilwise.wetransform.eu',
  realm: 'soilwise-chatbot-realm',
  clientId: 'soilwise-client',
});

// Optional debug
keycloak.onReady = (authenticated) => {
  console.log('Keycloak ready. Authenticated:', authenticated);
  console.log('Token:', keycloak.token);
};

keycloak.onAuthSuccess = () => {
  console.log('Auth success!');
  console.log('Authenticated:', keycloak.authenticated);
  console.log('Token:', keycloak.token);
};

keycloak.onAuthError = (error) => {
  console.error('Keycloak auth error:', error);
};

keycloak.onAuthRefreshError = () => {
  console.error('Failed to refresh token');
};

keycloak.onTokenExpired = () => {
  console.log('Token expired');
  keycloak.updateToken(30).catch(() => {
    console.error('Failed to refresh expired token');
  });
};