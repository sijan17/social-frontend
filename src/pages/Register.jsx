import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      setLoading(true);
      const { username, email, password } = values;
      const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else if (data.status === true) {
        localStorage.setItem("user-token", JSON.stringify(data.user));
        navigate("/setavatar");
      } else {
        toast.error("Something went wrong. Try again laters.", toastOptions);
      }
    }
    setLoading(false);
  };

  const handleValidation = () => {
    const { username, email, password, confirmpassword } = values;
    console.log(confirmpassword);
    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };
    if (
      email == "" ||
      username == "" ||
      password == "" ||
      confirmpassword == ""
    ) {
      toast.error("All fields are required.", toastOptions);
      return false;
    } else if (password !== confirmpassword) {
      toast.error("Passwords doesn't match.", toastOptions);
      return false;
    } else if (username.length <= 3) {
      toast.error("Username should have at least 4 characters.", toastOptions);
      return false;
    } else if (password.length <= 5) {
      toast.error("Password should be of at least 6 characters.", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className="h-[100vh] w-[100vw] flex flex-col justify-center gap-[1rem] items-center bg-[#343541]">
        <FormContainer>
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
            className="md:flex mx-8 flex-col bg-[#00000076] rounded-[2rem] px-[3rem] py-[3rem]"
          >
            <div className="brand flex items-center gap-[1rem] justify-center">
              <img src={logo} alt="logo" className="h-[3rem]" />
              <h1 className="text-white uppercase">Register</h1>
            </div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              id="username"
              className="bg-transparent text-white px-4 py-3 mt-4 w-full rounded-md border-b  border-[0.1rem] border-[] focus:border-[0.1rem] focus:border-[#997af0] focus:outline-none text-sm"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              id="email"
              className="bg-transparent text-white px-4 py-3 mt-4 w-full rounded-md border-b  border-[0.1rem] border-[] focus:border-[0.1rem] focus:border-[#997af0] focus:outline-none text-sm"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              className="bg-transparent text-white px-4 py-3 mt-4 w-full rounded-md border-b  border-[0.1rem] border-[] focus:border-[0.1rem] focus:border-[#997af0] focus:outline-none text-sm"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              id="confirmpassword"
              className="bg-transparent text-white px-4 py-3 mt-4 w-full rounded-md border-b  border-[0.1rem] border-[] focus:border-[0.1rem] focus:border-[#997af0] focus:outline-none text-sm"
              onChange={(e) => handleChange(e)}
            />
            <button
              className="bg-[#997af0] w-full text-white px-4 py-3 border-none font-bold mt-4 cursor-pointer rounded-[0.5rem] uppercase hover:bg-[#4e0eff] ease-in-out duration-300"
              type="submit"
            >
              {loading ? (
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
            <div className="text-white mt-4 md:mt-2">
              Already user ?{" "}
              <Link to="/login">
                <span className="text-[#4e0eff]">Login</span>
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

export default Register;
