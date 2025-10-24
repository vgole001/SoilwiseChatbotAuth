import React from 'react';
import { Navigate } from 'react-router-dom';
import { keycloak } from '../utils/keycloak';

const PrivateRoute = ({ children }) => {
  return keycloak.authenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
