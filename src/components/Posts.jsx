import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import TimeAgo from "../helpers/TimeAgo";
import { likeRoute, postsRoute } from "../utils/APIRoutes";
function Posts(props) {
  const likePost = async (id) => {
    const index = props.posts.findIndex((obj) => obj.id === id);

    if (index !== -1) {
      const updatedPosts = [...props.posts];
      const isLiked = updatedPosts[index].isLiked;
      const likes = updatedPosts[index].likes;
      updatedPosts[index] = {
        ...updatedPosts[index],
        isLiked: !isLiked,
        likes: isLiked ? likes - 1 : likes + 1,
      };

      // Update the state with the new array
      props.setPosts(updatedPosts);

      props.posts[index].isLiked == false;
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

    if (data.success) {
      props.setChanged(props.changed + 1);
    }
  };

  const postList = props.posts.map((post) => {
    return (
      <div key={post.id} className="bg-[#343541] mt-5 py-3 px-4 rounded-[8px]">
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

          <div className="content pl-3 w-screen">
            <Link to={`/user/${post.user.username}`}>
              <span className="cursor-pointer font-bold hover:underline">
                @{post.user.username}
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

  return (
    <>
      {props.isLoading ? (
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
        postList
      )}
    </>
  );
}

export default Posts;
