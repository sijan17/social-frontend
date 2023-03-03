import React, { useEffect, useState } from "react";
import Chats from "../components/Chats";
import Layout from "../components/Layout";

function Chat() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function getData() {}
    getData();
  }, []);

  return (
    <>
      <Layout>
        <Chats />
        <div className="text-white bg-[#202123] w-[40%] rounded-[0.5rem] p-8 "></div>
      </Layout>
    </>
  );
}

export default Chat;
