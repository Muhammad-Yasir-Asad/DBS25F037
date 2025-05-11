// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem('auth-token');
  if (!token) {
    return <Navigate to="/" replace />;
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch {
    return <Navigate to="/" replace />;
  }

  if (decoded.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }


  return children;
}
