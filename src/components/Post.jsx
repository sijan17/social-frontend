import axios from "axios";
import React, { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../services/AuthContext";
import { postRoute } from "../utils/APIRoutes";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import Dropzone from "react-dropzone";

function Post(props) {
  const [focus, setFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState(undefined);
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(undefined);
  const [preview, setPreview] = useState(null);

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

  const handleDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setPreview(URL.createObjectURL(acceptedFiles[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!file && !post) {
      toast.error("Post can not be empty.", toastOptions);
    } else {
      const formData = new FormData();
      formData.append("post", post);
      formData.append("file", file);
      // console.log(formData.get("file"));

      try {
        const { data } = await axios.post(postRoute, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `token ${localStorage.getItem("user-token")}`,
          },
        });
        if (data.success) {
          const hasImage = data.post.path ? true : false;
          const newPost = {
            id: data.post.id,
            post: data.post.post,
            likes: 0,
            time: data.post.time,
            hasImage,
            path: data.post.path,
            user: {
              username: user.username,
              avatarImage: user.avatarImage,
            },
          };

          props.setPosts([newPost, ...props.posts]);
          toast.success("Posted", toastOptions);
          props.setChanged(props.changed + 1);
          setPost("");
          setFile(undefined);
          setPreview(undefined);
        } else {
          toast.error("Something went wrong.", toastOptions);
        }
      } catch (err) {
        console.error(err);
        // handle error response
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="post relative flex gap-4 px-4 py-4 bg-[#343541] rounded-[0.4rem]">
      <img
        src={`data:image/svg+xml;base64,${user.avatarImage}`}
        className="w-11 h-11 object-cover rounded-full"
        alt=""
      />
      <form className="w-full">
        <textarea
          className=" scroll outline-none bg-[#343541] resize-none  opacity-[0.8] p-3 w-full h-[4rem]"
          placeholder={`What's happening ?`}
          onChange={(e) => handleChange(e)}
          onFocus={() => {
            setFocus(true);
          }}
          value={post}
        ></textarea>
        <div
          className={`ease-in-out duration-1000 fadein ${
            focus ? " " : "hidden"
          }`}
        >
          <div className="mb-4 flex relative">
            {preview && (
              <>
                <img src={preview} alt="Preview" className="h-16" />
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setPreview(null);
                    setFile(null);
                  }}
                >
                  <AiOutlineCloseCircle className="h-6 w-6 absolute top-0 left-0 bg-red-500 rounded-full " />
                </span>{" "}
              </>
            )}
          </div>
          <div className="flex items-center gap-4 opacity-[0.6] w-full justify-between">
            <div className="flex gap-4">
              <label htmlFor="upload">
                <BsImage className="cursor-pointer hover:text-green-500 ease-in-out duration-300" />
                <Dropzone onDrop={handleDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} id="upload" />
                    </div>
                  )}
                </Dropzone>
              </label>
              <GoLocation className="cursor-pointer hover:text-green-500 ease-in-out duration-300" />
            </div>
            <button
              onClick={(e) => handleSubmit(e)}
              className="justify-end px-2 py-1 border border-white-500 rounded-[0.4rem]  hover:bg-black ease-in-out duration-300"
            >
              {isLoading ? "Posting" : "Post"}
            </button>
          </div>
        </div>
      </form>

      <ToastContainer></ToastContainer>
    </div>
  );
}

export default Post;
