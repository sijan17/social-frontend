import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { isAuthenticated } from "./services/authService";
import MyRoutes from "./MyRoutes";
import { AuthContext, AuthProvider } from "./services/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
