import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaBirthdayCake } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import axios from "axios";
import { getAllUserDataRoute } from "../utils/APIRoutes";
import { Link } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const username = await JSON.parse(localStorage.getItem("user")).username;
      const { data } = await axios.get(`${getAllUserDataRoute}/${username}`, {
        headers: {
          authorization: `token ${localStorage.getItem("user-token")}`,
        },
      });
      if (data.success) {
        setUser(data.user);
        setIsLoading(false);
      }
    }
    getData();
  }, []);
  return (
    <Layout active="profile">
      <div className="scroll text-white bg-[#202123] w-[65%] lg:w-[45%] rounded-[0.rem] p-8 overflow-y-scroll ">
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2 mt-4">
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
          <>
            <div className="flex items-center p-3">
              <img
                src={`data:image/svg+xml;base64,${user.avatarImage}`}
                alt=""
                className="h-[67px] w-[67px] object-cover rounded-full"
              />
              <span className="px-2">
                <p className="font-semibold ">{user.username}</p>
                <p className="font-light ">{user.username}</p>
              </span>
            </div>

            <div className="flex justify-between  px-3 ">
              <div>
                <p className="text-[13px] font-light mr-4"></p>
                <div className="font-light  mt-2 grid grid-cols-2">
                  <span className="col-span-2 flex items-center gap-2">
                    <HiOutlineLocationMarker className="inline" />
                    <a className="ml-1">Nepal</a>
                  </span>
                  <span className="flex items-center gap-2">
                    <FaBirthdayCake className="inline" />
                    <a className="ml-1">January 1</a>
                  </span>
                  <span className="ml-4 flex items-center gap-2">
                    <SlCalender className="inline" />
                    <a className="ml-1">5Mo ago</a>
                  </span>
                </div>
              </div>
              <span className="shrink-0">
                <div className="">
                  <Link to="/setavatar">
                    <span className="float-right px-2 border border-black rounded-full px-3 py-1 ml-4 bg-[#006175] text-white  cursor-pointer">
                      Edit Profile
                    </span>
                  </Link>
                </div>
              </span>
            </div>

            <div className="grid grid-cols-3 text-center my-4">
              <span className="border-r border-white">
                <p className="font-semibold">5</p>
                <p>Posts</p>
              </span>
              <span className="border-r border-white">
                <p className="font-semibold">
                  <a id="following">{user.followingCount}</a>
                </p>
                <p>Following</p>
              </span>
              <span>
                <p className="font-semibold">
                  <a id="followers">{user.followerCount}</a>
                </p>
                <p>Followers</p>
              </span>
            </div>

            <div className="tweets">
              <p className=" font-semibold mx-3 py-2 border-t border-gray-400">
                Tweets
              </p>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Profile;
