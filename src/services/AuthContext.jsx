import { createContext, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: {},
  setUser: () => {},
});

export default AuthContext;
