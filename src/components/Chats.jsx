import React, { useEffect, useState } from "react";

function Chats({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      <div className="mb-2 uppercase">Messages</div>
      {contacts.map((contact, index) => {
        return (
          <div
            key={index}
            className={`${
              index == currentSelected ? "bg-[#997AF0] " : "bg-[#343541] "
            }message flex   mb-2 px-3 py-4 rounded-[8px] cursor-pointer`}
            onClick={() => changeCurrentChat(index, contact)}
          >
            <div className="left">
              <img
                className="w-11 h-11 object-cover rounded-full"
                src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                alt="user image"
              />
            </div>
            <div className="right ml-3">
              <div className="top">
                <span className="name hover:underline">{contact.username}</span>
              </div>

              <div className="bottom w-full">
                <p className="font-bold">New Message</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Chats;
