//src\Routers\Private.js


// src/Routers/Private.js
import React from "react";
import { Navigate } from "react-router-dom";

// Recebe children (componente protegido) e isAuthenticated (estado de login)
const Private = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default Private;
