import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import UpperHeader from "../upperHeader/Upper_Header";
import HeaderLower from "../HeaderlowerNav/HeaderLower";
import { LogoSvg } from "../../imagepath";
import { useNavigate } from "react-router-dom";

const Header = ({ parms }) => {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const onHandleMobileMenu = (e) => {
    // Prevent click event from propagating when clicking the button itself
    e.stopPropagation();
    var root = document.getElementsByTagName("html")[0];
    root.classList.add("menu-opened");
    setMenu(true); // Open the menu when the button is clicked
  };

  const onhandleCloseMenu = (e) => {
    // Prevent click event from propagating when clicking the close button itself
    e.stopPropagation();
    var root = document.getElementsByTagName("html")[0];
    root.classList.remove("menu-opened");
    setMenu(false); // Close the menu when the close button is clicked
  };

  const toggleMobileMenu = (e) => {
    // Prevent click event from propagating when clicking inside the menu
    e.stopPropagation();
    setMenu(!menu); // Toggle menu visibility
  };

  // Close the menu when clicking outside of it
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenu(false);
    }
  };

  // Add event listener for click outside on component mount, and clean up on unmount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <UpperHeader />
      <div className="containerWrapper">
        <div className="container">
          <nav className="navbar navbar-expand-lg header-nav">
            <div className="container-fluid">
              <div
                className="navbar-header d-flex align-items-center"
                style={{ flexGrow: 1 }}
              >
                <Link
                  id="mobile_btn"
                  to="#"
                  onClick={onHandleMobileMenu} // Open menu on button click
                >
                  <span className="bar-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </Link>
                <Link to="/" className="navbar-brand logo">
                  <img src={LogoSvg} className="img-fluid" alt="Logo" />
                </Link>

                <form
                  className="d-flex search-container"
                  style={{
                    position: "relative",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "50%", // Adjust width as needed
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

                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div
                  className={`main-menu-wrapper collapse navbar-collapse ${
                    menu ? "opened" : ""
                  }`}
                  ref={menuRef} // Attach the reference here
                  id="navbarNav"
                >
                  <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="/signup">
                        Sign Up
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        Sign In
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link add-listing" to="/add-listing">
                        <i className="fa-solid fa-plus"></i> Add Listing
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <HeaderLower />
    </header>
  );
};

export default Header;
