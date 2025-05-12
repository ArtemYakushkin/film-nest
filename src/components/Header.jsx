import React from "react";
import { useNavigate } from "react-router-dom";

import AuthButton from "./AuthButton";

import Logo from "../assets/logo-filmnest.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="container">
        <div className="header-wrapp">
          <img className="header-logo" src={Logo} alt="logo" onClick={() => navigate("/")} />
          {/* <div className="header-btn-box"> */}
          <AuthButton />
          {/* <button className="header-btn sign-in">Sign In</button> */}
          {/* <button className="header-btn sign-up">Sign Up</button> */}
          {/* </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
