import React, { useContext, useEffect, useState } from "react";
import { HashRouter } from "react-router-dom";
import { isAuthenticated } from "./services/authService";
import MyRoutes from "./MyRoutes";
import { AuthProvider } from "./services/AuthContext";

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <MyRoutes />
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
