import React from "react";
import Nav from "../pages/Nav";

const Layout = ({ active, children }) => {
  return (
    <>
      <Nav active={active} />
      <div
        className={`scroll h-full text-white bg-[#202123] w-[100%] ${
          active === "chat" ? "md:w-[35%]" : "md:w-[45%]"
        } rounded-[0.5rem] md:p-8 p-4 overflow-y-scroll `}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
