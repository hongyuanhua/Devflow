import React from "react";
import "./logo.css";

const Logo = ({ Logo }) => {
  return (
    <div className="logo">
      <img id="logo" src={Logo} className="rounded float-left" alt="logo"></img>
    </div>
  );
};

export default Logo;
