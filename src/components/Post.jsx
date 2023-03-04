import axios from "axios";
import React, { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../services/AuthContext";
import { postRoute } from "../utils/APIRoutes";

function Post(props) {
  const [post, setPost] = useState("");
  const { user } = useContext(AuthContext);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleChange = (e) => {
    setPost(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (post !== "") {
      const { data } = await axios.post(
        postRoute,
        { post },
        {
          headers: {
            authorization: `token ${localStorage.getItem("user-token")}`,
          },
        }
      );
      if (data.success) {
        const newPost = {
          id: data.post.id,
          post: data.post.post,
          likes: 0,
          time: data.post.time,
          user: {
            username: user.username,
            avatarImage: user.avatarImage,
          },
        };

        props.setPosts([newPost, ...props.posts]);
        toast.success("Posted", toastOptions);
        props.setChanged(props.changed + 1);
        setPost("");
      } else {
        toast.error("Something went wrong.", toastOptions);
      }
    } else {
      toast.error("Post can not be empty.", toastOptions);
    }
  };

  return (
    <div className="post relative flex">
      <textarea
        className="outline-none bg-[#343541] resize-none rounded-[0.3rem] opacity-[0.8] p-3 w-full flex-shrink-0 h-[8rem]"
        placeholder={`What's happening ?`}
        onChange={(e) => handleChange(e)}
        value={post}
      ></textarea>
      <button
        onClick={(e) => handleSubmit(e)}
        className="w-16 text-center absolute bottom-0 right-0 border-2 border-white text-[white]  mx-1 my-2 py-1  rounded-[0.5rem] hover:bg-[#4e0eff] ease-in-out duration-300"
      >
        Post
      </button>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default Post;
