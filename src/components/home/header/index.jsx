import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import UpperHeader from "../upperHeader/Upper_Header";
import HeaderLower from "../HeaderlowerNav/HeaderLower";
import { LogoSvg } from "../../imagepath";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Firebase/FirebaseConfig";
import { Phone, profile_img } from "../../imagepath";
import { Offcanvas } from "react-bootstrap";
import { FaThLarge, FaStickyNote, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";



const Header = ({ parms }) => {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [drops, setDrops] = useState(false);
  const [divideName, setDivideName] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        setDivideName(user.displayName || "User"); // Set display name or fallback
      } else {
        console.log("No user is logged in.");
      }
    });
    return () => unsubscribe();
  }, [navigate]);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const onHandleMobileMenu = (e) => {
    e.stopPropagation();
    document.documentElement.classList.add("menu-opened");
    setMenu(true);
  };

  const onhandleCloseMenu = (e) => {
    e.stopPropagation();
    document.documentElement.classList.remove("menu-opened");
    setMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };
  return (
    <header className="header">
      <UpperHeader />
      <div className="containerWrapper">
        <div className="container">
          <nav className="navbar navbar-expand-lg header-nav">
            <div
              className="container-fluid d-flex align-items-center justify-content-between"
              style={{ flexWrap: "nowrap" }}
            >
              {/* Logo and Mobile Menu */}
              {/* <div
                className="navbar-header d-flex align-items-center"
                style={{ flexShrink: 0 }}
              >
                <Link id="mobile_btn" to="#" onClick={onHandleMobileMenu}>
                  <span className="bar-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </Link>
                <Link to="/" className="navbar-brand logo" style={{ marginLeft: "33px",width:"9rem" }}>
                  <img src={LogoSvg} className="img-fluid" alt="Logo" />
                </Link>
              </div> */}
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
                      Contrast Light
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
                <Link to="/" className="navbar-brand logo" style={{ marginLeft: "33px",width:"9rem" }}>
                  <img src={LogoSvg} className="img-fluid" alt="Logo" />
                </Link>
              </div>
              {/* Search Bar (Hidden on Mobile) */}
              {!isMobile && (
              <form
                className="d-flex search-container"
                style={{
                  flexGrow: 1,
                  maxWidth: "500px",
                  margin: "0 20px",
                  position: "relative",
                  display: "flex", // Default display
                  "@media (max-width: 768px)": { display: "none" }, // Hide on mobile
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
                  "@media (max-width: 768px)": { gap: "10px" }, // Adjust gap on mobile
                }}
              >
                {auth.currentUser ? (
                  <ul className="nav header-navbar-rht" style={{ display: "flex", gap: "15px" }}>
                    <li className="nav-item">
                      <Link className="nav-link header-login add-listing" to="/add-listing">
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
                      <div className={`dropdown-menu dropdown-menu-end ${drops ? "show" : ""}`}>
                        <Link className="dropdown-item" to="/dashboard">
                          Dashboard
                        </Link>
                        <Link className="dropdown-item" to="/profile">
                          Profile Settings
                        </Link>
                        <Link className="dropdown-item" to="#" onClick={handleLogout}>
                          Logout
                        </Link>
                      </div>
                    </li>
                  </ul>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link header-reg" to="/signup" style={{marginLeft:'-1rem' }}>
                        Sign Up
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link header-login" to="/login" style={{marginLeft:'-2.5rem' }}>
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
       {
        userId?
      <HeaderLower />
:''
       }
    </header>
  );
};

export default Header;