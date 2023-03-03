import React from "react";
import Layout from "../components/Layout";

function Users() {
  return (
    <Layout active="search">
      <div className="text-white bg-[#202123] w-[45%] rounded-[0.5rem] p-8 overflow-y-scroll ">
        Search
      </div>
    </Layout>
  );
}

export default Users;
