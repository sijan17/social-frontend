import React from "react";
import Nav from "../pages/Nav";

const Layout = ({ active, children }) => {
  return (
    <>
      <Nav active={active} />
      <div className="scroll text-white bg-[#202123] w-[100%] md:w-[45%] rounded-[0.5rem] p-8 overflow-y-scroll ">
        {children}
      </div>
    </>
  );
};

export default Layout;
