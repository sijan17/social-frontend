import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaBirthdayCake } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import axios from "axios";
import { getAllUserDataRoute, likeRoute } from "../utils/APIRoutes";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEdit, AiOutlineHeart } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../services/AuthContext";
import TimeAgo from "../helpers/TimeAgo";

function Profile() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const { setIsLoggedIn } = useContext(AuthContext);
  const [changed, setChanged] = useState(0);
  const navigate = useNavigate();

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
        console.log(data);
        setUser(data.user);
        setPosts(data.user.posts);
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  const likePost = async (id) => {
    const index = posts.findIndex((obj) => obj.id === id);

    if (index !== -1) {
      const updatedPosts = [...posts];
      const isLiked = updatedPosts[index].isLiked;
      const likes = updatedPosts[index].likes;
      updatedPosts[index] = {
        ...updatedPosts[index],
        isLiked: !isLiked,
        likes: isLiked ? likes - 1 : likes + 1,
      };

      // Update the state with the new array
      setPosts(updatedPosts);

      posts[index].isLiked == false;
      // props.posts[index].likes += props.posts[index].isLiked ? -1 : 1;
    }
    const { data } = await axios.post(
      `${likeRoute}/${id}`,
      {},
      {
        headers: {
          authorization: `token ${localStorage.getItem("user-token")}`,
        },
      }
    );

    console.log(data);
    if (data.success) {
      setChanged(changed + 1);
    }
  };

  const postList = posts.map((post) => {
    return (
      <div key={post.id} className="bg-[#343541] mt-5 py-3 px-4 rounded-[8px]">
        <div className="flex ">
          <div className="img shrink-0">
            <Link to={`/user/${user.username}`}>
              <img
                src={`data:image/svg+xml;base64,${user.avatarImage}`}
                className="w-11 h-11 object-cover rounded-full"
                alt=""
              />
            </Link>
          </div>

          <div className="content pl-3 w-screen">
            <Link to={`/user/${user.username}`}>
              <span className="cursor-pointer font-bold hover:underline">
                @{user.username}
              </span>
            </Link>

            <span className="font-thin pl-1"></span>
            <span className="font-thin  pl-2 float-right">
              {TimeAgo(post.time)}
            </span>

            <p className="font-light mt-1">{post.post}</p>

            <div
              className={`react-section transition-colors duration-500 transform ${
                post.isLiked ? "ease-in-out text-red-500" : ""
              } `}
            >
              <span>
                <span className=" float-right" id="toggle-39">
                  <a id="likecount">
                    <AiOutlineHeart
                      className="inline mr-2 w-6 h-6 cursor-pointer "
                      onClick={(event) => {
                        likePost(post.id, event);
                      }}
                    />
                    <span id="likes-39">{post.likes}</span>
                  </a>
                </span>
                <a className=" font-thin ml-3" id="msg-39">
                  {/* {post.likes == 0 ? " Be the first one to like" : ""} */}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  });
  const logout = () => {
    localStorage.removeItem("user-token");
    setIsLoggedIn(false);
    navigate("/login");
  };
  return (
    <Layout active="profile">
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
          <div className="flex items-center justify-between">
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
            <span className="shrink-0">
              <div className="flex items-center gap-[1rem]">
                <Link to="/setavatar">
                  <span className="float-right  border border-white rounded-[0.3rem] px-1 py-1  hover:bg-[#343541] hover:border-transparent text-white  cursor-pointer ease-in-out duration-300">
                    <AiOutlineEdit className="inline w-6 h-6" />
                  </span>
                </Link>
                <div
                  onClick={() => logout()}
                  className="border border-red-500 rounded-[0.3rem] px-1 py-1  hover:bg-[#343541] hover:border-transparent text-white  cursor-pointer ease-in-out duration-300"
                >
                  <span>
                    <FiLogOut className="inline text-red-500 h-6 w-6" />
                  </span>
                </div>
              </div>
            </span>
          </div>

          <div className="flex justify-between  px-3 ">
            <div>
              <p className="text-[13px] font-light mr-4"></p>
              <div className="font-light  mt-2 grid grid-cols-2">
                <span className="col-span-2 flex items-center gap-2">
                  <HiOutlineLocationMarker className="inline" />
                  <a className="ml-1">{user.location}</a>
                </span>
                {/* <span className="flex items-center gap-2">
                  <FaBirthdayCake className="inline" />
                  <a className="ml-1">January 1</a>
                </span> */}
                <span className=" flex items-center gap-2">
                  <SlCalender className="inline" />
                  <a className="ml-1">Joined {TimeAgo(user.joinedAt)}</a>
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 text-center my-4 ">
            <span className="border-r border-white">
              <p className="font-semibold">{user.postsCount}</p>
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

          <div className="Posts  mx-3 my-4">
            <p className=" font-semibold border-t border-gray-400 pt-4">
              Posts
            </p>
            {postList}
          </div>
        </>
      )}
    </Layout>
  );
}

export default Profile;
