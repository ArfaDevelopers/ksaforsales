import React, { useEffect, useState } from "react";
import HomeMenu from "../common/HomeMenu";
import ListingMenu from "../common/ListingMenu";
import PagesMenu from "../common/PagesMenu";
import UserPagesMenu from "../common/UserPagesMenu";
import BlogMenu from "../common/BlogMenu";
import { LogoSvg, Phone, profile_img } from "../imagepath";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/FirebaseConfig"; // Ensure correct Firebase import
import { onAuthStateChanged } from "firebase/auth";
import { db } from "./../Firebase/FirebaseConfig.jsx";
import { addDoc, collection } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import Flag from "react-world-flags";
import { FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";
const UserHeader = ({ parms }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [drops, setDrops] = useState(false);
  const [divideName, setdivideName] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const handleLogout = async () => {
    try {
      await signOut(auth); // Logs out the user
      console.log("User logged out successfully!");
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setIsDropdownVisible(false);
  };
  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        console.log("User ID Token:__________", user.email);
        var divideName = user.email.split("@");
        console.log("User UID:divideName", user);
        // setdivideName(divideName[0]);
        setdivideName(user.displayName);

        console.log("User UID:", user.uid);
      } else {
        console.log("No user is logged in. Redirecting to /login...");
        navigate("/login", { replace: true }); // Redirect to login page
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [navigate]);
  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container py-2">
          {" "}
          {/* Inner container with the same background */}
          <div className="d-flex justify-content-between align-items-center">
            {/* Download App Section with Mobile Icon */}
            <div className="text-muted d-flex align-items-center">
              <img src={Phone} alt="phone" />
              <Link to="https://play.google.com/store/apps/details?id=com.facebook.katana&hl=en&pli=1">
                <p className="app-download-button  ">Download App Via SMS</p>
              </Link>
            </div>

            {/* Contact Info Section with Phone Icon */}
            <div
              className="d-flex align-items-center  contantIndoPhone_Wrapper"
              style={{ gap: "67.8px" }}
            >
              <div className="phone-info text-muted">
                <FontAwesomeIcon
                  icon={faPhone}
                  style={{ color: "#36A680" }}
                  className="me-2"
                />
                <span
                  className="para-text "
                  style={{ fontFamily: "Inter", color: "#353535" }}
                >
                  +966 530 77 1851
                </span>
              </div>

              {/* Language Dropdown Section */}
              <div
                className="lang_dropdown"
                style={{
                  display: "flex",
                }}
              >
                <button
                  className="btn dropdown-toggle"
                  onClick={toggleDropdown}
                  aria-expanded={isDropdownVisible ? "true" : "false"}
                >
                  <Flag
                    code={selectedLanguage === "en" ? "GB" : "SA"}
                    className="flag-icon"
                    style={{
                      width: "27px",
                      marginRight: "5px",
                      fontFamily: "Inter",
                    }}
                  />
                  {selectedLanguage === "en" ? "EN" : "AR"}
                </button>

                {/* Dropdown Menu */}
                {isDropdownVisible && (
                  <ul className="dropdown-menu show">
                    <li>
                      <button
                        className="dropdown-item"
                        style={{ fontFamily: "Inter" }}
                        onClick={() => handleLanguageChange("en")}
                      >
                        <Flag
                          code="GB"
                          className="flag-icon"
                          style={{ width: "27px", marginRight: "5px" }}
                        />
                        English
                      </button>
                    </li>
                    <li>
                      <button
                        style={{ fontFamily: "VIP Rawy" }}
                        className="dropdown-item"
                        onClick={() => handleLanguageChange("ar")}
                      >
                        <Flag
                          code="SA"
                          className="flag-icon"
                          style={{ width: "27px", marginRight: "5px" }}
                        />
                        Arabic
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <nav className="navbar navbar-expand-lg header-nav">
            <div
              className="container-fluid d-flex align-items-center justify-content-between"
              style={{ flexWrap: "nowrap" }}
            >
              <div className="navbar-header">
                <Link id="mobile_btn" to="#">
                  <span className="bar-icon">
                    <span />
                    <span />
                    <span />
                  </span>
                </Link>
                <Link
                  to="/"
                  className="navbar-brand logo"
                  style={{ marginLeft: "38px", width: "9rem" }}
                >
                  <img src={LogoSvg} className="img-fluid" alt="Logo" />
                </Link>
              </div>
              <div className="main-menu-wrapper">
                <div className="menu-header">
                  <Link to="/" className="menu-logo">
                    <img src={LogoSvg} className="img-fluid" alt="Logo" />
                  </Link>
                  <Link id="menu_close" className="menu-close" to="#">
                    {" "}
                    <i className="fas fa-times" />
                  </Link>
                </div>
                <ul className="main-nav">
                  <HomeMenu activeMenu={"Classified"} />
                  <ListingMenu />
                  <PagesMenu />
                  <UserPagesMenu activesMenu={parms} />
                  <BlogMenu />
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>

                  <li className="login-link">
                    <Link to="/signup">Sign Up</Link>
                  </li>
                  <li className="login-link">
                    <Link to="login">Sign In</Link>
                  </li>
                </ul>
              </div>
              {!isMobile && (
                <form
                  className="d-flex search-container"
                  style={{
                    position: "relative",
                    flexGrow: 1, // Allows it to take available space
                    maxWidth: "500px", // Adjust max width as needed
                    margin: "0 20px", // Space around search bar
                  }}
                >
                  <input
                    className="form-control search-input"
                    type="search"
                    placeholder="What are you looking for?"
                    aria-label="Search"
                    style={{
                      paddingRight: "40px",
                      borderRadius: "20px",
                      border: "1px solid #ccc",
                      width: "100%",
                    }}
                  />
                  <button
                    className="btn search-btn"
                    type="submit"
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      border: "none",
                      padding: 0,
                    }}
                  >
                    <FaSearch style={{ color: "#0056b3" }} />
                  </button>
                </form>
              )}
              {/* <ul className="nav header-navbar-rht" >
              <li className="nav-item">
                <Link
                  className="nav-link header-login add-listing"
                  to="/add-listing"
                >
                  <i className="fa-solid fa-plus" /> Add Listing
                </Link>
              </li>
              <li className="nav-item dropdown has-arrow logged-item" >
                <Link
                  to="#"
                  className={`${
                    drops === true
                      ? "dropdown-toggle profile-userlink show "
                      : "dropdown-toggle profile-userlink"
                  }`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => setDrops(!drops)}
                  // className={`${change1===true ? 'dropdown-menu dropdown-menu-end show' : "dropdown-menu dropdown-menu-end"}`}
                >
                  <img src={profile_img} alt="" />
                  <span>{divideName}</span>
                </Link>
                <div className="dropdown-menu dropdown-menu-end">
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                  <Link className="dropdown-item" to="/profile">
                    Profile Settings
                  </Link>
                  <Link className="dropdown-item" to="#" onClick={handleLogout}>
                    {t('common.logout')}
                  </Link>
                </div>
              </li>
            </ul> */}
              <ul
                className="nav header-navbar-rht"
                style={{ display: "flex", gap: "15px" }}
              >
                <li className="nav-item">
                  <Link
                    className="nav-link header-login add-listing"
                    to="/add-listing"
                  >
                    <i className="fa-solid fa-plus" /> Add Listing
                  </Link>
                </li>
                <li className="nav-item dropdown has-arrow logged-item">
                  <Link
                    to="#"
                    className={`dropdown-toggle profile-userlink ${
                      drops ? "show" : ""
                    }`}
                    data-bs-toggle="dropdown"
                    aria-expanded={drops}
                    onClick={() => setDrops(!drops)}
                  >
                    <img src={profile_img} alt="" />
                    <span>{divideName}</span>
                  </Link>
                  <div
                    className={`dropdown-menu dropdown-menu-end ${
                      drops ? "show" : ""
                    }`}
                  >
                    <Link className="dropdown-item" to="/dashboard">
                      Dashboard
                    </Link>
                    <Link className="dropdown-item" to="/profile">
                      Profile Settings
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="#"
                      onClick={handleLogout}
                    >
                      {t('common.logout')}
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      {/* /Header */}
    </>
  );
};
export default UserHeader;
