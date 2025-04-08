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
    <header className="header" onClick={(value) => toggleMobileMenu()}>
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
                <Link id="mobile_btn" to="#" onClick={onHandleMobileMenu}>
                  <span className="bar-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </Link>
                <Link to="/" className="navbar-brand logo">
                  <img src={LogoSvg} className="img-fluid" alt="Logo" />
                </Link>
              </div>

              {/* Search Bar */}
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

              {/* Navigation Links */}

              <ul
                className="nav header-navbar-rht d-flex align-items-center"
                style={{ gap: "15px", marginBottom: 0 }}
              >
                {auth.currentUser ? (
                  <ul className="nav header-navbar-rht">
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
                      <Link className="nav-link header-reg" to="/signup">
                        Sign Up
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link header-login" to="/login">
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
