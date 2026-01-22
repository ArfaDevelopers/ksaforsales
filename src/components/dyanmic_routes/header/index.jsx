import React, { useEffect, useState } from "react";
// import BlogMenu from "../../common/BlogMenu";
// import HomeMenu from "../../common/HomeMenu";
// import ListingMenu from "../../common/ListingMenu";
// import PagesMenu from "../../common/PagesMenu";
// import UserPagesMenu from "../../common/UserPagesMenu";
import {
  // Home01,
  // Home02,
  // Home03,
  // Home04,
  // Home05,
  // Home06,
  // Home07,
  // Home08,
  // Home09,
  LogoSvg,
} from "../../imagepath";
import { Offcanvas } from "react-bootstrap";
import { FaThLarge, FaStickyNote, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import UpperHeader from "../upperHeader/Upper_Header";
import { FaSearch } from "react-icons/fa";
import HeaderLower from "../HeaderlowerNav/HeaderLower";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/FirebaseConfig"; // Ensure the correct Firebase import
import { db } from "./../../Firebase/FirebaseConfig.jsx";
import { addDoc, collection } from "firebase/firestore";
import { Phone, profile_img } from "../../imagepath";
import { signOut } from "firebase/auth";
const Header = ({ parms }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(""); // State for image preview
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        console.log("User ID Token:", token);
        console.log("User UID:", user.uid);
        console.log("User Display Name:", user.displayName); // Now it should not be null
        console.log("User Display creationTime:", user.metadata.creationTime); // Now it should not be null

        setUserId(user.uid);
      } else {
        console.log("No user is logged in. Redirecting to /login...");
        // navigate("/login", { replace: true });
      }
    });

    return () => unsubscribe();
  }, [navigate]);
  const [drops, setDrops] = useState(false);
  const [divideName, setdivideName] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleLogout = async () => {
    try {
      await signOut(auth); // Logs out the user
      console.log("User logged out successfully!");
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };
  const onHandleMobileMenu = () => {
    var root = document.getElementsByTagName("html")[0];
    root.classList.add("menu-opened");
  };

  const onhandleCloseMenu = () => {
    var root = document.getElementsByTagName("html")[0];
    root.classList.remove("menu-opened");
  };
  const [menu, setMenu] = useState(false);
  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  return (
    <header
      className="header"
      //  onClick={(value) => toggleMobileMenu()}
    >
      <UpperHeader />

      <div className="containerWrapper">
        <div className="container">
          <nav className="navbar navbar-expand-lg header-nav">
            <div
              className="container-fluid d-flex align-items-center justify-content-between"
              style={{ display: "flex", flexWrap: "nowrap" }}
            >
              {/* Logo and Mobile Menu */}
              <div className="navbar-header d-flex align-items-center">
                <Link id="mobile_btn" to="#" onClick={toggleMobileMenu}>
                  <span className="bar-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </Link>
                <Link
                  id="mobile_btn"
                  to="#"
                  onClick={toggleMobileMenu}
                  className="menu-btn"
                >
                  <span className="bar-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </Link>

                <Offcanvas
                  show={menu}
                  onHide={toggleMobileMenu}
                  placement="start"
                  className="custom-sidebar"
                >
                  <Offcanvas.Header className="border-bottom">
                    <Offcanvas.Title className="fs-5 fw-bold">
                      Menu
                    </Offcanvas.Title>
                    <FaTimes
                      className="close-icon"
                      onClick={toggleMobileMenu}
                    />
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <nav className="sidenav">
                      <NavLink
                        to="/AutomotiveComp"
                        className="sidebar-item d-flex align-items-center"
                      >
                        <FaThLarge className="sidebar-icon me-2" />
                        <span className="fw-semibold">Automotive</span>
                      </NavLink>
                      <NavLink
                        to="/ElectronicComp"
                        className="sidebar-item d-flex align-items-center"
                      >
                        <FaStickyNote className="sidebar-icon me-2" />
                        <span className="fw-semibold">Electronics</span>
                      </NavLink>
                      <NavLink
                        to="/FashionStyle"
                        className="sidebar-item d-flex align-items-center"
                      >
                        <FaStickyNote className="sidebar-icon me-2" />
                        <span className="fw-semibold">Fashion Style</span>
                      </NavLink>
                      <NavLink
                        to="/HealthCareComp"
                        className="sidebar-item d-flex align-items-center"
                      >
                        <FaStickyNote className="sidebar-icon me-2" />
                        <span className="fw-semibold">Health Care</span>
                      </NavLink>
                      <NavLink
                        to="/JobBoard"
                        className="sidebar-item d-flex align-items-center"
                      >
                        <FaStickyNote className="sidebar-icon me-2" />
                        <span className="fw-semibold">Job Board</span>
                      </NavLink>
                      <NavLink
                        to="/Education"
                        className="sidebar-item d-flex align-items-center"
                      >
                        <FaStickyNote className="sidebar-icon me-2" />
                        <span className="fw-semibold">Education</span>
                      </NavLink>
                      <NavLink
                        to="/RealEstateComp"
                        className="sidebar-item d-flex align-items-center"
                      >
                        <FaStickyNote className="sidebar-icon me-2" />
                        <span className="fw-semibold">Real Estate</span>
                      </NavLink>
                      <NavLink
                        to="/TravelComp"
                        className="sidebar-item d-flex align-items-center"
                      >
                        <FaStickyNote className="sidebar-icon me-2" />
                        <span className="fw-semibold">Travel</span>
                      </NavLink>
                      <NavLink
                        to="/SportGamesComp"
                        className="sidebar-item d-flex align-items-center"
                      >
                        <FaStickyNote className="sidebar-icon me-2" />
                        <span className="fw-semibold">Sport & Games</span>
                      </NavLink>
                      <NavLink
                        to="/PetAnimalsComp"
                        className="sidebar-item d-flex align-items-center"
                      >
                        <FaStickyNote className="sidebar-icon me-2" />
                        <span className="fw-semibold">Pet & Animals</span>
                      </NavLink>
                      <NavLink
                        to="/CommercialAdscom"
                        className="sidebar-item d-flex align-items-center"
                      >
                        <FaStickyNote className="sidebar-icon me-2" />
                        <span className="fw-semibold">Commercial</span>
                        <span
                          className="badge bg-danger ms-2"
                          style={{ fontSize: "10px", padding: "3px 6px" }}
                        >
                          New
                        </span>
                      </NavLink>

                      {/* My Account Section */}
                      <div className="sidebar-section-divider mt-3 mb-2">
                        <span className="fw-bold text-muted ps-3" style={{ fontSize: "12px" }}>
                          MY ACCOUNT
                        </span>
                      </div>
                      <NavLink
                        to="/dashboard"
                        className="sidebar-item d-flex align-items-center"
                      >
                        <FaStickyNote className="sidebar-icon me-2" />
                        <span className="fw-semibold">Dashboard</span>
                      </NavLink>
                      <NavLink
                        to="/my-profile"
                        className="sidebar-item d-flex align-items-center"
                      >
                        <FaStickyNote className="sidebar-icon me-2" />
                        <span className="fw-semibold">Profile</span>
                      </NavLink>
                      <NavLink
                        to="/my-listing"
                        className="sidebar-item d-flex align-items-center"
                      >
                        <FaStickyNote className="sidebar-icon me-2" />
                        <span className="fw-semibold">My Listing</span>
                      </NavLink>
                      <NavLink
                        to="/BookMark"
                        className="sidebar-item d-flex align-items-center"
                      >
                        <FaStickyNote className="sidebar-icon me-2" />
                        <span className="fw-semibold">Bookmarks</span>
                      </NavLink>
                      <NavLink
                        to="/messages"
                        className="sidebar-item d-flex align-items-center"
                      >
                        <FaStickyNote className="sidebar-icon me-2" />
                        <span className="fw-semibold">Messages</span>
                      </NavLink>

                      {/* Ksa4sale Section */}
                      <div className="sidebar-section-divider mt-3 mb-2">
                        <span className="fw-bold text-muted ps-3" style={{ fontSize: "12px" }}>
                          KSA4SALE
                        </span>
                      </div>
                      <NavLink
                        to="/about"
                        className="sidebar-item d-flex align-items-center"
                      >
                        <FaStickyNote className="sidebar-icon me-2" />
                        <span className="fw-semibold">About Us</span>
                      </NavLink>
                      <NavLink
                        to="/terms-condition"
                        className="sidebar-item d-flex align-items-center"
                      >
                        <FaStickyNote className="sidebar-icon me-2" />
                        <span className="fw-semibold">Terms & Conditions</span>
                      </NavLink>
                      <NavLink
                        to="/privacy-policy"
                        className="sidebar-item d-flex align-items-center"
                      >
                        <FaStickyNote className="sidebar-icon me-2" />
                        <span className="fw-semibold">Privacy Policy</span>
                      </NavLink>
                      <NavLink
                        to="/copy_right_text"
                        className="sidebar-item d-flex align-items-center"
                      >
                        <FaStickyNote className="sidebar-icon me-2" />
                        <span className="fw-semibold">Copyrights</span>
                      </NavLink>

                      {/* Useful Links Section */}
                      <div className="sidebar-section-divider mt-3 mb-2">
                        <span className="fw-bold text-muted ps-3" style={{ fontSize: "12px" }}>
                          USEFUL LINKS
                        </span>
                      </div>
                      <NavLink
                        to="/blog-list"
                        className="sidebar-item d-flex align-items-center"
                      >
                        <FaStickyNote className="sidebar-icon me-2" />
                        <span className="fw-semibold">Blog</span>
                      </NavLink>
                    </nav>
                    <div className="sidebar-footer text-center py-3 mt-3 border-top">
                      KSA4Sale
                    </div>
                  </Offcanvas.Body>
                </Offcanvas>

                {/* Custom CSS */}
                <style>
                  {`
          .custom-sidebar {
            width: 280px !important;
            background-color: #fff;
            box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
          }

          .sidenav {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .sidebar-item {
            padding: 10px 15px;
            font-size: 16px;
            color: #333;
            border-radius: 6px;
            transition: all 0.3s ease-in-out;
            cursor: pointer;
            text-decoration: none;
          }

          .sidebar-item:hover {
            background-color: #f8f9fa;
          }

          .close-icon {
            font-size: 20px;
            cursor: pointer;
            color: #333;
          }

          .menu-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background: #36a680;
            border-radius: 50%;
            color: red;
            cursor: pointer;
          }

          .bar-icon span {
            display: block;
            width: 20px;
            height: 2px;
            background: white;
            margin: 4px 0;
          }
        `}
                </style>
                <Link
                  to="/"
                  className="navbar-brand logo"
                  style={{ marginLeft: "33px", width: "9rem" }}
                >
                  <img src={LogoSvg} className="img-fluid" alt="Logo" />
                </Link>
              </div>

              {/* Search Bar */}
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
              {/* Navigation Links */}

              <ul
                className="nav header-navbar-rht d-flex align-items-center"
                style={{
                  gap: "15px",
                  marginBottom: 0,
                  flexShrink: 0,
                  "@media (max-width: 768px)": { gap: "10px" },
                }}
              >
                {auth.currentUser ? (
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
                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </div>
                    </li>
                  </ul>
                ) : (
                  <>
                    {" "}
                    <li className="nav-item">
                      <Link
                        className="nav-link header-reg"
                        to="/signup"
                        style={{ marginLeft: "-1rem" }}
                      >
                        Sign Up
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link header-login"
                        to="/login"
                        style={{ marginLeft: "-2.5rem" }}
                      >
                        Sign In
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link header-login add-listing"
                        to="/add-listing"
                      >
                        <i className="fa-solid fa-plus"></i> Add Listing
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <HeaderLower />
    </header>
  );
};

export default Header;
