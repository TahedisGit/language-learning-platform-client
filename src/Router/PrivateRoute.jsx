import React, { useContext } from "react";
import AuthContext from "../contexts/authContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (user) {
    return children;
  }
  return <Navigate to="/signup" />;
};

export default PrivateRoute;
