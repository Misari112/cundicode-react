import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, isAuthenticated }) => {
  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
