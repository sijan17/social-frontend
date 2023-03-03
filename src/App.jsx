import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { isAuthenticated } from "./services/authService";
import AuthContext from "./services/AuthContext";
import MyRoutes from "./MyRoutes";

function App() {
  const userContext = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(userContext.isLoggedIn);
  useEffect(() => {
    const checkLoggedIn = async () => {
      let cuser = await isAuthenticated();
      if (!cuser) {
        localStorage.setItem("user-token", "");
        cuser = "";
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        userContext.isLoggedIn = true;
      }
      userContext.user = cuser;
    };

    if (!userContext.isLoggedIn || !userContext.user.id) {
      checkLoggedIn();
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user: userContext.user }}
    >
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
