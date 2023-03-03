import { Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Register from "./pages/Register";
import SetAvatar from "./pages/SetAvatar";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import User from "./pages/User";
import AuthContext from "./services/AuthContext";
import { useContext } from "react";

const MyRoutes = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  return (
    <div className="flex h-[100vh] py-8 px-8 gap-[2rem]">
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/home"
          element={isLoggedIn && user.id ? <Home /> : <Login />}
        ></Route>
        <Route
          path="/users"
          element={isLoggedIn && user.id ? <Users /> : <Login />}
        ></Route>
        <Route
          path="/search"
          element={isLoggedIn && user.id ? <Search /> : <Login />}
        ></Route>
        <Route
          path="/profile"
          element={isLoggedIn && user.id ? <Profile /> : <Login />}
        ></Route>
        <Route
          path="/user/:username"
          element={isLoggedIn && user.id ? <User /> : <Login />}
        ></Route>
        <Route
          path="/chat"
          element={isLoggedIn && user.id ? <Chat /> : <Login />}
        ></Route>
        <Route
          path="/setavatar"
          element={isLoggedIn && user.id ? <SetAvatar /> : <Login />}
        ></Route>
      </Routes>
    </div>
  );
};

export default MyRoutes;
