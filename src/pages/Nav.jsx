import React, { useContext } from "react";
import {
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineUser,
  AiOutlineSearch,
} from "react-icons/ai";

import { FiLogOut, FiUsers } from "react-icons/fi";
import { IoIosNotifications } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../services/AuthContext";

function Nav(props) {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user-token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="scroll lg:w-[25%] overflow-y-scroll md:flex-shrink-0 rounded-[0.5rem] bg-[#202123] text-white">
      <div className="hidden md:block logo text-center px-4 md:m-8 uppercase  font-bold">
        <img className="inline h-[2rem]" src={logo} />
      </div>
      <ul className="flex mx-4  items-center justify-between  md:block md:space-y-4 md:mx-8 ">
        <Link to="/home">
          <li
            className={`flex p-2 my-2 md:p-4 rounded-[0.5rem] gap-[1rem]  ${
              props.active === "home" ? "bg-[#343541] " : " "
            }hover:text-[#4e0eff] cursor-pointer ease-in-out duration-500`}
          >
            <span>
              <AiOutlineHome className="h-6 w-6" />
            </span>
            <span className="hidden lg:block">Home</span>
          </li>
        </Link>
        <Link to="/users">
          <li
            className={`flex my-2 p-2 md:p-4 rounded-[0.5rem] gap-[1rem] ${
              props.active == "users" ? "bg-[#343541] " : " "
            }hover:text-[#4e0eff] cursor-pointer ease-in-out duration-500`}
          >
            <span>
              <FiUsers className="h-6 w-6" />
            </span>
            <span className="hidden lg:block">Users</span>
          </li>
        </Link>
        <Link to="/search">
          <li
            className={`flex my-2 p-2 md:p-4 rounded-[0.5rem] gap-[1rem] ${
              props.active == "search" ? "bg-[#343541] " : " "
            }hover:text-[#4e0eff] cursor-pointer ease-in-out duration-500`}
          >
            <span>
              <AiOutlineSearch className="h-6 w-6" />
            </span>
            <span className="hidden lg:block">Search</span>
          </li>
        </Link>
        <Link to="/notification">
          <li
            className={`flex my-2 p-2 md:p-4 rounded-[0.5rem] gap-[1rem] ${
              props.active == "notification" ? "bg-[#343541] " : " "
            }hover:text-[#4e0eff] cursor-pointer ease-in-out duration-500`}
          >
            <span>
              <IoIosNotifications className="h-6 w-6" />
            </span>
            <span className="hidden lg:block">Notifications</span>
          </li>
        </Link>
        <Link to="/chat">
          <li
            className={`flex my-2 p-2 md:p-4 rounded-[0.5rem] gap-[1rem] ${
              props.active == "chat" ? "bg-[#343541] " : " "
            }hover:text-[#4e0eff] cursor-pointer ease-in-out duration-500`}
          >
            <span>
              <AiOutlineMessage className="h-6 w-6" />
            </span>
            <span className="hidden lg:block">Messages</span>
          </li>
        </Link>
        <Link to="/profile">
          <li
            className={`flex my-2 p-2 md:p-4 rounded-[0.5rem] gap-[1rem] ${
              props.active == "profile" ? "bg-[#343541] " : " "
            }hover:text-[#4e0eff] cursor-pointer ease-in-out duration-500`}
          >
            <span>
              <AiOutlineUser className="h-6 w-6" />
            </span>
            <span className="hidden lg:block">Profile</span>
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default Nav;
