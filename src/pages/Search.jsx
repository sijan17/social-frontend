import React, { useState } from "react";
import Layout from "../components/Layout";
import {
  AiFillHeart,
  AiOutlineComment,
  AiOutlineHeart,
  AiOutlineSearch,
} from "react-icons/ai";
import { host, searchPostsRoute, searchUsersRoute } from "../utils/APIRoutes";
import axios from "axios";
import { Link } from "react-router-dom";
import TimeAgo from "../helpers/TimeAgo";

function Users() {
  const [hidden, setHidden] = useState(true);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [active, setActive] = useState("users");
  const [term, setTerm] = useState("");
  const handleKeyPress = async (e) => {
    setHidden(false);
    const term = e.target.value;
    setTerm(term);
    if (term !== "") {
      const { data } = await axios.get(`${searchUsersRoute}/${term}`, {
        headers: {
          authorization: `token ${localStorage.getItem("user-token")}`,
        },
      });
      if (data.success) {
        setUsers(data.users);
        // setActive("users");
      }
      console.log(data);
    } else {
      setUsers(undefined);
    }
  };

  const searchPosts = async () => {
    if (term !== "") {
      setActive("posts");
      const { data } = await axios.get(`${searchPostsRoute}/${term}`, {
        headers: {
          authorization: `token ${localStorage.getItem("user-token")}`,
        },
      });
      if (data.success) {
        // setUsers(data.users);
        setPosts(data.posts);
        // setActive("users");
      }
      console.log(data);
    } else {
      setPosts(undefined);
    }
  };

  const usersList =
    users &&
    users.map((user, index) => {
      return (
        <div
          key={user.id}
          className=" user flex mb-2  px-3 py-4  rounded-[8px] justify-between"
        >
          <div className="flex ">
            <img
              className="w-11 h-11 object-cover rounded-full"
              src={`data:image/svg+xml;base64,${user.avatarImage}`}
              alt="user image"
            />

            <div className="right ml-3">
              <Link to={`/user/${user.username}`}>
                <div className="top flex-auto flex gap-4 items-center  ">
                  <span className="hover:underline cursor-pointer">
                    {user.username}
                  </span>
                  <span className="font-thin text-sm "></span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      );
    });

  const postList =
    posts &&
    posts.map((post) => {
      return (
        <div
          key={post.id}
          className="bg-[#343541] mt-3 py-3 px-4 rounded-[8px]"
        >
          <div className="flex ">
            <div className="img shrink-0">
              <Link to={`/user/${post.user.username}`}>
                <img
                  src={`data:image/svg+xml;base64,${post.user.avatarImage}`}
                  className="w-11 h-11 object-cover rounded-full"
                  alt=""
                />
              </Link>
            </div>

            <div className="content pl-3 w-screen ">
              <Link to={`/user/${post.user.username}`}>
                <span className="cursor-pointer font-bold opacity-[0.6] hover:underline">
                  @{post.user.username}
                </span>
              </Link>

              <span className="font-thin pl-1"></span>
              <span className="font-thin opacioty-[0.6] text-sm pl-2 float-right">
                {TimeAgo(post.time)}
              </span>

              <p className="font-light mt-1">{post.post}</p>
              {post.hasImage ? (
                <img
                  className="w-full rounded-[10px] my-4"
                  src={`${host}/${post.path}`}
                />
              ) : (
                ""
              )}

              <div
                className={`react-section text-[#dcdee2] flex justify-end gap-[2rem] transition-colors  `}
              >
                <div className=" " id="toggle-39">
                  <AiOutlineComment className="inline mr-2 w-6 h-6 cursor-pointer " />
                  <span id="likes-39">0</span>
                </div>
                <div
                  className={`ease-in-out duration-500 transform ${
                    post.isLiked ? " text-red-500" : ""
                  }`}
                  id="toggle-39"
                >
                  {!post.isLiked ? (
                    <AiOutlineHeart
                      className="inline mr-2 w-6 h-6 cursor-pointer "
                      onClick={(event) => {
                        likePost(post.id, event);
                      }}
                    />
                  ) : (
                    <AiFillHeart
                      className="inline mr-2 w-6 h-6 cursor-pointer "
                      onClick={(event) => {
                        likePost(post.id, event);
                      }}
                    />
                  )}
                  <span className="font-bold">{post.likes}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

  return (
    <Layout active="search">
      <div className="flex flex-col gap-4">
        <form className="w-full flex items-center gap-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 px-4 rounded-[0.4rem]  focus:outline-none"
            onChange={(e) => handleKeyPress(e)}
            value={term}
          />
          <AiOutlineSearch className="inline w-6 h-6 cursor-pointer" />
        </form>

        <div className={`flex gap-8 ${hidden ? "hidden" : ""}`}>
          <span
            onClick={() => setActive("users")}
            className={`${
              active == "users" ? "border-b-2 border-white" : "cursor-pointer"
            }`}
          >
            Users
          </span>
          <span
            onClick={() => searchPosts()}
            className={`${
              active == "posts" ? "border-b-2 border-white" : "cursor-pointer"
            }`}
          >
            Posts
          </span>
        </div>

        <div className="search-users">
          {active == "users" ? usersList : postList}
        </div>
      </div>
    </Layout>
  );
}

export default Users;
