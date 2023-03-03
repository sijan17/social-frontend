import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../services/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
