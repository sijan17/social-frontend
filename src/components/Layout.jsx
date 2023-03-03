import React from "react";
import Nav from "../pages/Nav";

const Layout = ({ active, children }) => {
  return (
    <>
      <Nav active={active} />
      {children}
    </>
  );
};

export default Layout;
