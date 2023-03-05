import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { getAllMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";

function ChatContainer({ currentChat, currentUser, socket }) {
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function getData() {
      if (currentChat) {
        const { data } = await axios.post(getAllMessageRoute, {
          from: currentUser.id,
          to: currentChat.id,
        });
        if (data.success) {
          setMessages([...data.messages]);
        }
      }
    }

    getData();
  }, [currentChat]);

  const handleChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSendMsg = async (msg) => {
    setMessage("");
    await axios.post(sendMessageRoute, {
      from: currentUser.id,
      to: currentChat.id,
      message: message,
    });
    socket.current.emit("send-msg", {
      from: currentChat.id,
      to: currentUser.id,
      message: message,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: message });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage &&
      setMessages((prev) => {
        return [...prev, arrivalMessage];
      });
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const messageList = messages
    ? messages.map((msg, index) => {
        return (
          <>
            <div ref={scrollRef} key={index}>
              <li
                key={index}
                className={`flex ${
                  !msg.fromSelf ? "justify-start" : "justify-end"
                }  text-white`}
              >
                <div
                  className={`relative bg-[#343541]  max-w-[80%] px-4 py-2  rounded shadow`}
                >
                  <span className="block">{msg.message}</span>
                </div>
              </li>
            </div>
          </>
        );
      })
    : "No messages";

  return (
    <>
      <div className="flex flex-col h-full gap-2">
        <div className="relative flex items-center p-3 border-b border-[#343541]">
          <img
            className="w-10 h-10 object-cover rounded-full"
            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
            alt="user image"
          />
          <span className="block ml-2 font-bold text-gray-600">
            {currentChat.username}
          </span>
          <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
        </div>
        <ul className="scroll space-y-2 h-[90%] overflow-y-scroll pr-4">
          {messageList}
        </ul>
        <div className="flex items-center justify-between w-full p-3 border-t gap-[1rem] border-[#343541]">
          <input
            type="text"
            placeholder={`Type your message to ${currentChat.username}`}
            className="outline-none bg-[#343541] resize-none rounded-[0.3rem] opacity-[0.8] p-3 w-full "
            name="message"
            onChange={(e) => {
              handleChange(e);
            }}
            value={message}
            required
          />
          <button type="submit" onClick={(e) => handleSendMsg(e)}>
            <svg
              className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatContainer;
