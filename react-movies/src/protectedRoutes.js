import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/authContext'; // assuming you have an AuthContext

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); // or use any method you have to check authentication

  if (!isAuthenticated) {
    return <Navigate to="/movies/homePageLogIn" />; // Redirect to login if not authenticated
  }

  return children; // Allow access to the protected route
};

export default PrivateRoute;
