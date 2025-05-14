import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { PiDotsNineBold } from "react-icons/pi";

import AuthButton from "./AuthButton";
import MobileMenu from "./MobileMenu";

import Logo from "../assets/logo-filmnest.png";
import LogoMob from "../assets/logo-small.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const imageLogo = isMobile ? LogoMob : Logo;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-wrapp">
          <img className="header-logo" src={imageLogo} alt="logo" onClick={() => navigate("/")} />
          <AuthButton />
          <button
            className={`header-mobile-menu ${isMobileMenuOpen ? "header-mobile-menu-open" : ""}`}
            onClick={toggleMobileMenu}
          >
            <PiDotsNineBold size={28} />
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} closeMenu={closeMenu} />
    </header>
  );
};

export default Header;
