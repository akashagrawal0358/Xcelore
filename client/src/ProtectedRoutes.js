import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, userRole } = useContext(AuthContext);
  return isAuthenticated && userRole === 'admin' ? children : <Navigate to="/login" />;
};

const UserRoute = ({ children }) => {
  const { isAuthenticated, userRole } = useContext(AuthContext);
  return isAuthenticated && userRole === 'User' ? children : <Navigate to="/login" />;
};

export { AdminRoute, UserRoute };
