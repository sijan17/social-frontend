import { Route, Routes, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Register from "./pages/Register";
import SetAvatar from "./pages/SetAvatar";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import User from "./pages/User";
import { AuthContext } from "./services/AuthContext";
import { useContext, useEffect } from "react";
import { isAuthenticated } from "./services/authService";

const MyRoutes = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(AuthContext);
  useEffect(() => {
    const checkLoggedIn = async () => {
      let cuser = await isAuthenticated();
      if (!cuser) {
        localStorage.setItem("user-token", "");
      } else {
        setIsLoggedIn(true);
        setUser({ ...cuser });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <div className="flex h-[100vh] py-8 px-8 gap-[2rem]">
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={isLoggedIn ? <Home /> : <Login />}></Route>
        <Route path="/" element={isLoggedIn ? <Home /> : <Login />}></Route>
        <Route
          path="/users"
          element={isLoggedIn ? <Users /> : <Login />}
        ></Route>
        <Route
          path="/search"
          element={isLoggedIn ? <Search /> : <Login />}
        ></Route>
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Login />}
        ></Route>
        <Route
          path="/user/:username"
          element={isLoggedIn ? <User /> : <Login />}
        ></Route>
        <Route path="/chat" element={isLoggedIn ? <Chat /> : <Login />}></Route>
        <Route
          path="/setavatar"
          element={isLoggedIn ? <SetAvatar /> : <Login />}
        ></Route>
      </Routes>
    </div>
  );
};

export default MyRoutes;
