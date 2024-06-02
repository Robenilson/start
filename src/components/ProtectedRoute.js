import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ userType, allowedTypes }) => {
  return allowedTypes.includes(userType) ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;