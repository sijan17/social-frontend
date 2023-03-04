import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/APIRoutes";
import axios from "axios";
import { Buffer } from "buffer";
import Layout from "../components/Layout";
import { useContext } from "react";
import { AuthContext } from "../services/AuthContext";
function SetAvatar() {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    async function getData() {
      if (!localStorage.getItem("user")) {
        navigate("/login");
      }
    }
    getData();
  }, []);

  const setProfilePicture = async () => {
    setIsLoading(true);
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar to continue", toastOptions);
    } else {
      const { data } = await axios.post(`${setAvatarRoute}/${user.id}`, {
        image: avatars[selectedAvatar],
      });
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      const data = [];
      for (let i = 0; i <= 3; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);
  return (
    <>
      <Layout>
        <div className="text-white bg-[#202123] w-[65%] rounded-[0.5rem] p-8 flex justify-center items-center flex-col gap-[3rem] ">
          <div className="title-container text-white p-4">
            <h1 className=" font-bold ">Pick an avatar</h1>
          </div>
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
            ""
          )}
          <div className="avatars flex gap-[2rem] ">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar border-[0.4rem] rounded-full flex justify-center items-center ease-in-out duration-300 ${
                    selectedAvatar === index
                      ? "selected  border-[#4e0eff]"
                      : " border-transparent"
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt={`avatar${index}`}
                    className="h-[6rem] rounded-full"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button
            className="submitBtn bg-[#4e0eff] text-white px-4 py-3  border-none font-bold mt-4 cursor-pointer rounded-[0.5rem] uppercase hover:bg-[#997af0] ease-in-out duration-300"
            onClick={setProfilePicture}
          >
            CONTINUE
          </button>
        </div>
        <ToastContainer></ToastContainer>
      </Layout>
    </>
  );
}

export default SetAvatar;
