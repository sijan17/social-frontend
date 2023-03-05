import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { AuthContext } from "../services/AuthContext";
import { getAllUserDataRoute, host } from "../utils/APIRoutes";
import ChatContainer from "./ChatContainer";
import Layout from "./Layout";

function ChatContainer1() {
  const username = useParams().username;
  const { user } = useContext(AuthContext);
  const [currentChat, setCurrentChat] = useState({});
  const currentUser = user;
  const socket = useRef();
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(`${getAllUserDataRoute}/${username}`, {
        headers: {
          authorization: `token ${localStorage.getItem("user-token")}`,
        },
      });
      if (data.success) {
        setCurrentChat(data.user);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    async function sockett() {
      if (currentUser) {
        socket.current = io(host);
        await socket.current.emit("add-user", currentUser.id);
      }
    }
    sockett();
  }, [currentUser]);

  return (
    <Layout active="chat">
      <ChatContainer
        currentChat={currentChat}
        currentUser={currentUser}
        socket={socket}
      />
    </Layout>
  );
}

export default ChatContainer1;
