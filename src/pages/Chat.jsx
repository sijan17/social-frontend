import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import ChatContainer from "../components/ChatContainer";
import Chats from "../components/Chats";
import Layout from "../components/Layout";
import Welcome from "../components/Welcome";
import { AuthContext } from "../services/AuthContext";
import { allUsersRoute, host } from "../utils/APIRoutes";
import { io } from "socket.io-client";

function Chat() {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({ ...user });
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const { data } = await axios.get(allUsersRoute, {
        headers: {
          authorization: `token ${localStorage.getItem("user-token")}`,
        },
      });
      if (data.success) {
        setContacts(data.users);
        setIsLoading(false);
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

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Layout active="chat">
        <Chats
          contacts={contacts}
          currentUser={user}
          changeChat={handleChatChange}
        />
      </Layout>
      <div className="md:block w-full md:w-[45%] text-white  bg-[#202123]  rounded-[0.5rem] px-4 ">
        {currentChat ? (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        ) : (
          <Welcome currentUser={user} />
        )}
      </div>
    </>
  );
}

export default Chat;
