import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { checkAuthRoute, loginRoute } from "../utils/APIRoutes";
import { AuthContext } from "../services/AuthContext";
function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn, isLoggedIn, setUser } = useContext(AuthContext);

  const [values, setValues] = useState({
    username: "",

    password: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, { username, password });

      if (data.status == false) {
        toast.error(data.msg, toastOptions);
      } else if (data.status == true) {
        localStorage.setItem("user-token", JSON.stringify(data.user));
        userData();
      }
    }
    setIsLoading(false);
  };

  const userData = async () => {
    const token = localStorage.getItem("user-token");
    const { data } = await axios.get(checkAuthRoute, {
      headers: {
        authorization: `token ${token}`,
      },
    });

    if (data.session == true) {
      setIsLoggedIn(true);
      const user = JSON.stringify(data.user);
      setUser({ ...user });

      navigate("/home");
      return JSON.parse(user);
    } else {
      return {};
    }
  };

  const handleValidation = () => {
    const { username, password } = values;
    if (username == "" || password == "") {
      toast.error("All fields are required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className="h-[100vh] w-[100vw] md:flex flex-col justify-center gap-[1rem] items-center bg-[#00000076] md:bg-[#343541] overflow-hidden">
        <FormContainer>
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
            className="absolute top-[25%] md:relative mx-8 md:flex flex-col md:bg-[#00000076] rounded-[2rem] md:px-[3rem] py-[3rem]"
          >
            <div className="brand flex items-center gap-[1rem] justify-center">
              <img src={logo} alt="logo" className="h-[3rem]" />
              <h1 className="text-white uppercase">Login</h1>
            </div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              id="user"
              className="bg-transparent text-white px-4 py-3 mt-4 w-full rounded-md border-b  border-[0.1rem] border-[] focus:border-[0.1rem] focus:border-[#997af0] focus:outline-none text-sm"
              onChange={(e) => handleChange(e)}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              id="pass"
              className="bg-transparent text-white px-4 py-3 mt-4 w-full rounded-md border-b  border-[0.1rem] border-[] focus:border-[0.1rem] focus:border-[#997af0] focus:outline-none text-sm"
              onChange={(e) => handleChange(e)}
            />

            <button
              className="bg-[#997af0] w-full text-white px-4 py-3 border-none font-bold mt-4 cursor-pointer rounded-[0.5rem] uppercase hover:bg-[#4e0eff] ease-in-out duration-300"
              type="submit"
            >
              {" "}
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2 ">
                  <div
                    className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  ></div>
                </div>
              ) : (
                "Login"
              )}
            </button>
            <div className="text-white mt-8 md:mt-2">
              New Here ?{" "}
              <Link to="/register">
                <span className="text-[#4e0eff]">Register</span>
              </Link>{" "}
            </div>
          </form>
        </FormContainer>
        <ToastContainer></ToastContainer>
      </div>
    </>
  );
}

const FormContainer = styled.div``;

export default Login;
