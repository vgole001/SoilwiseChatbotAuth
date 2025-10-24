import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { keycloak } from './utils/keycloak';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);
  const isInitialized = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (isInitialized.current) {
      return;
    }
    
    isInitialized.current = true;

    keycloak
      .init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        checkLoginIframe: false,
        pkceMethod: 'S256',
      })
      .then((authenticated) => {
        console.log('Keycloak initialized. Authenticated:', authenticated);
        console.log('Current URL:', window.location.href);
        setKeycloakInitialized(true);
      })
      .catch((error) => {
        console.error('Keycloak initialization failed:', error);
        setKeycloakInitialized(true);
      });
  }, []);

  if (!keycloakInitialized) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            keycloak.authenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;