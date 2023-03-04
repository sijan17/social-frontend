import axios from "axios";
import React, { useContext } from "react";
import {
  FaHome,
  FaUsers,
  FaSearch,
  FaPlus,
  FaFacebookMessenger,
  FaUser,
} from "react-icons/fa";

import { FiLogOut } from "react-icons/fi";
import { IoMdNotifications } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../services/AuthContext";

function Nav(props) {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user-token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className=" lg:w-[25%]   md:flex-shrink-0 rounded-[0.5rem] bg-[#202123] text-white">
      <div className="hidden md:block logo text-center m-8 uppercase  font-bold">
        <img className="inline h-[2rem]" src={logo} />
      </div>
      <ul className="flex mx-8 items-center justify-between  md:block md:space-y-4 md:m-8 ">
        <Link to="/home">
          <li
            className={`flex my-2 p-4 rounded-[0.5rem] gap-[1rem]  ${
              props.active === "home" ? "bg-[#343541] " : " "
            }hover:text-[#4e0eff] cursor-pointer ease-in-out duration-500`}
          >
            <span>
              <FaHome className="h-6 w-6" />
            </span>
            <span className="hidden lg:block">Home</span>
          </li>
        </Link>
        <Link to="/users">
          <li
            className={`flex my-2 p-4 rounded-[0.5rem] gap-[1rem] ${
              props.active == "users" ? "bg-[#343541] " : " "
            }hover:text-[#4e0eff] cursor-pointer ease-in-out duration-500`}
          >
            <span>
              <FaUsers className="h-6 w-6" />
            </span>
            <span className="hidden lg:block">Users</span>
          </li>
        </Link>
        <Link to="/search">
          <li
            className={`flex my-2 p-4 rounded-[0.5rem] gap-[1rem] ${
              props.active == "search" ? "bg-[#343541] " : " "
            }hover:text-[#4e0eff] cursor-pointer ease-in-out duration-500`}
          >
            <span>
              <FaSearch className="h-6 w-6" />
            </span>
            <span className="hidden lg:block">Search</span>
          </li>
        </Link>
        <Link to="/notification">
          <li
            className={`flex my-2 p-4 rounded-[0.5rem] gap-[1rem] ${
              props.active == "notification" ? "bg-[#343541] " : " "
            }hover:text-[#4e0eff] cursor-pointer ease-in-out duration-500`}
          >
            <span>
              <IoMdNotifications className="h-6 w-6" />
            </span>
            <span className="hidden lg:block">Notifications</span>
          </li>
        </Link>
        <Link to="/chat">
          <li
            className={`flex my-2 p-4 rounded-[0.5rem] gap-[1rem] ${
              props.active == "chat" ? "bg-[#343541] " : " "
            }hover:text-[#4e0eff] cursor-pointer ease-in-out duration-500`}
          >
            <span>
              <FaFacebookMessenger className="h-6 w-6" />
            </span>
            <span className="hidden lg:block">Messages</span>
          </li>
        </Link>
        <Link to="/profile">
          <li
            className={`flex my-2 p-4 rounded-[0.5rem] gap-[1rem] ${
              props.active == "setavatar" ? "bg-[#343541] " : " "
            }hover:text-[#4e0eff] cursor-pointer ease-in-out duration-500`}
          >
            <span>
              <FaUser className="h-6 w-6" />
            </span>
            <span className="hidden lg:block">Profile</span>
          </li>
        </Link>
        <li
          onClick={() => logout()}
          className="flex my-2 p-4 rounded-[0.5rem] gap-[1rem] hover:text-[#4e0eff] cursor-pointer ease-in-out duration-500"
        >
          <span>
            <FiLogOut className="h-6 w-6" />
          </span>
          <span className="hidden lg:block">Log Out</span>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
