import React from "react";
import icon from "../assets/icon.png";

function Chats() {
  return (
    <div className="text-white bg-[#202123] w-[30%] rounded-[0.5rem] p-8 ">
      <div className="mb-2 uppercase">Messages</div>
      <div className="message flex  bg-[#343541] mb-2 px-3 py-4 rounded-[8px] cursor-pointer">
        <div className="left">
          <img
            className="w-11 h-11 object-cover rounded-full"
            src={icon}
            alt="user image"
          />
        </div>
        <div className="right ml-3">
          <div className="top">
            <span className="name hover:underline">Sijan</span>
          </div>

          <div className="bottom w-full">
            <p className="font-bold">New Message</p>
          </div>
        </div>
      </div>
      <div className="message flex  bg-[#343541] mb-2 px-3 py-4 rounded-[8px] cursor-pointer">
        <div className="left">
          <img
            className="w-11 h-11 object-cover rounded-full"
            src={icon}
            alt="user image"
          />
        </div>
        <div className="right ml-3">
          <div className="top">
            <span className="name hover:underline">Sijan</span>
          </div>

          <div className="bottom w-full">
            <p className="font-light">Received</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chats;
