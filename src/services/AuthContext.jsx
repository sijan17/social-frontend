import React, { createContext, useEffect, useState } from "react";
import { isAuthenticated } from "./authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [socket, setSocket] = useState({});

  useEffect(() => {
    const checkLoggedIn = async () => {
      let cuser = await isAuthenticated();
      if (!cuser) {
        localStorage.setItem("user-token", "");
      } else {
        setUser({ ...cuser });
        setIsLoggedIn(true);
      }
    };

    checkLoggedIn();
    setIsLoading(false);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        setIsLoading,
        socket,
        setSocket,
      }}
    >
      {isLoading ? (
        <div className="flex text-white items-center justify-center space-x-2 mt-4">
          <div
            className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
