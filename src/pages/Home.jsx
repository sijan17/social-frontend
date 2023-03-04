import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Post from "../components/Post";
import Posts from "../components/Posts";
import { postsRoute } from "../utils/APIRoutes";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [changed, setChanged] = useState(0);
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(postsRoute, {
        headers: {
          authorization: `token ${localStorage.getItem("user-token")}`,
        },
      });
      if (data.success) {
        setPosts(data.posts);
        setIsLoading(false);
      }
    }
    getData();
  }, [changed]);

  return (
    <Layout active="home">
      <>
        {" "}
        <Post
          posts={posts}
          setPosts={setPosts}
          changed={changed}
          setChanged={setChanged}
        />
        <Posts
          posts={posts}
          setPosts={setPosts}
          isLoading={isLoading}
          changed={changed}
          setChanged={setChanged}
        />
      </>
    </Layout>
  );
}

export default Home;
