// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const location = useLocation();

  const currentPath = location.pathname;

  // Routes waarvoor geen authenticatie vereist is
  const unprotectedRoutes = ['/login', /^\/shared\/[^/]+$/];

  const isUnprotected = unprotectedRoutes.some(route =>
    typeof route === 'string' ? route === currentPath : route.test(currentPath)
  );

  if (!isAuthenticated && !isUnprotected) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
