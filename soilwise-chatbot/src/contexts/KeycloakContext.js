import React, { createContext, useState, useContext } from 'react';
import { keycloak } from '../utils/keycloak';

const KeycloakContext = createContext(null);

export const KeycloakProvider = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (!initialized) {
      keycloak
        .init({
          onLoad: 'login-required',
          checkLoginIframe: false,
          pkceMethod: 'S256',
          enableLogging: true
        })
        .then(authenticated => {
          setInitialized(true);
          console.log('User is authenticated:', authenticated);
        })
        .catch(err => {
          setError(err);
          console.error('Failed to initialize Keycloak:', err);
        });
    }
  }, [initialized]);

  return (
    <KeycloakContext.Provider value={{ keycloak, initialized, error }}>
      {children}
    </KeycloakContext.Provider>
  );
};

export const useKeycloak = () => useContext(KeycloakContext);
