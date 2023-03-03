import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { allUsersRoute, followRoute } from "../utils/APIRoutes";

function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const { data } = await axios.get(allUsersRoute, {
        headers: {
          authorization: `token ${localStorage.getItem("user-token")}`,
        },
      });
      if (data.success) {
        setUsers(data.users);
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  const follow = async (id) => {
    const { data } = await axios.post(
      `${followRoute}/${id}`,
      {},
      {
        headers: {
          authorization: `token ${localStorage.getItem("user-token")}`,
        },
      }
    );
    console.log(data);
  };

  const listUsers = users.map((user) => {
    return (
      <div
        key={user._id}
        className="bg-[#343541] user flex mb-2  px-3 py-4  rounded-[8px] justify-between"
      >
        <div className="flex ">
          <img
            className="w-11 h-11 object-cover rounded-full"
            src={`data:image/svg+xml;base64,${user.avatarImage}`}
            alt="user image"
          />

          <div className="right ml-3">
            <a href="./saswot1">
              <div className="top flex-auto flex gap-4 items-center  ">
                <span className="hover:underline cursor-pointer">
                  {user.username}
                </span>
                <span className="font-thin text-sm "></span>
              </div>
            </a>
            <div className="bottom">
              <div className="font-light text-sm flex gap-4 justify-between ">
                Hello, there.
              </div>
            </div>
          </div>
        </div>
        <div className="float-right">
          <span
            onClick={() => follow(user._id)}
            id="follow-40"
            className="float-right  px-2 py-0.5 border rounded-[9px] border-white text-white cursor-pointer hover:text-black hover:bg-white"
          >
            Follow
          </span>
        </div>
      </div>
    );
  });

  return (
    <Layout active="users">
      <div className="scroll text-white bg-[#202123] w-[45%] rounded-[0.5rem] p-8 overflow-y-scroll ">
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
          listUsers
        )}
      </div>
    </Layout>
  );
}

export default Users;
