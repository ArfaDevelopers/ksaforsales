import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/FirebaseConfig";
import { db } from "./../../Firebase/FirebaseConfig.jsx";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import Footer from "../../home/footer/Footer";
import UserHeader from "../Userheader";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Header from "../../home/header";
import { FaPlusCircle, FaBullhorn, FaStar, FaInfoCircle } from "react-icons/fa"; // Added FaInfoCircle

const stripePromise = loadStripe(
  "pk_test_51Oqyo3Ap5li0mnBdxJiCZ4k0IEWVbOgGvyMbYB6XVUqYh1yNUEnRiX4e5UO1eces9kf9qZNZcF7ybjxg7MimKmUQ00a9s60Pa1"
);

const Listing = () => {
  const MySwal = withReactContent(Swal);
  const parms = useLocation().pathname;
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeBox, setActiveBox] = useState(null); // Changed to null for no default active box

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [parms]);

  // Function to handle box selection
  const handleBoxChange = (box) => {
    setActiveBox(box);
    if (box === "box1") {
      navigate("/add-listing");
    } else if (box === "box2") {
      navigate("/commercial-ads");
    } else if (box === "box3") {
      navigate("/features-ads");
    } else if (box === "box4") {
      navigate("/detail-ads");
    }
  };

  return (
    <>
      <div className="main-wrapper">
        <Header />
        <div
          className="dashboard-content"
          style={{
            marginTop: "8rem",
          }}
        >
          <div className="container">
            {/* Boxes in a Row */}
            <div
              style={{
                display: "flex",
                width: "100%",
                gap: "30px",
                marginBottom: "30px",
                flexWrap: "wrap", // Ensures responsiveness on smaller screens
              }}
            >
              <div
                style={{
                  flex: 1,
                  minWidth: "250px",
                  padding: "25px",
                  background: activeBox === "box1"
                    ? "linear-gradient(135deg, #2d4495 0%, #4a67d6 100%)"
                    : "#ffffff",
                  color: activeBox === "box1" ? "#ffffff" : "#333333",
                  border: "1px solid #e0e0e0",
                  borderRadius: "12px",
                  boxShadow: activeBox === "box1"
                    ? "0 8px 16px rgba(45, 68, 149, 0.3)"
                    : "0 4px 8px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
                  transform: activeBox === "box1" ? "scale(1.05)" : "scale(1)",
                }}
                onClick={() => handleBoxChange("box1")}
                role="button"
                aria-selected={activeBox === "box1"}
                onMouseEnter={(e) => {
                  if (activeBox !== "box1") {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeBox !== "box1") {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }
                }}
              >
                <FaPlusCircle
                  style={{
                    fontSize: "3rem",
                    marginBottom: "10px",
                    color: activeBox === "box1" ? "#ffffff" : "#2d4495",
                  }}
                />
                <h3
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                  }}
                >
                  Add Listing
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "1rem",
                    opacity: activeBox === "box1" ? 0.9 : 0.7,
                  }}
                >
                  Create a new listing to showcase your content.
                </p>
              </div>
              <div
                style={{
                  flex: 1,
                  minWidth: "250px",
                  padding: "25px",
                  background: activeBox === "box2"
                    ? "linear-gradient(135deg, #2d4495 0%, #4a67d6 100%)"
                    : "#ffffff",
                  color: activeBox === "box2" ? "#ffffff" : "#333333",
                  border: "1px solid #e0e0e0",
                  borderRadius: "12px",
                  boxShadow: activeBox === "box2"
                    ? "0 8px 16px rgba(45, 68, 149, 0.3)"
                    : "0 4px 8px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
                  transform: activeBox === "box2" ? "scale(1.05)" : "scale(1)",
                }}
                onClick={() => handleBoxChange("box2")}
                role="button"
                aria-selected={activeBox === "box2"}
                onMouseEnter={(e) => {
                  if (activeBox !== "box2") {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeBox !== "box2") {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }
                }}
              >
                <FaBullhorn
                  style={{
                    fontSize: "3rem",
                    marginBottom: "10px",
                    color: activeBox === "box2" ? "#ffffff" : "#2d4495",
                  }}
                />
                <h3
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                  }}
                >
                  Commercial Ads
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "1rem",
                    opacity: activeBox === "box2" ? 0.9 : 0.7,
                  }}
                >
                  Promote your business with targeted ads.
                </p>
              </div>
              <div
                style={{
                  flex: 1,
                  minWidth: "250px",
                  padding: "25px",
                  background: activeBox === "box3"
                    ? "linear-gradient(135deg, #2d4495 0%, #4a67d6 100%)"
                    : "#ffffff",
                  color: activeBox === "box3" ? "#ffffff" : "#333333",
                  border: "1px solid #e0e0e0",
                  borderRadius: "12px",
                  boxShadow: activeBox === "box3"
                    ? "0 8px 16px rgba(45, 68, 149, 0.3)"
                    : "0 4px 8px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
                  transform: activeBox === "box3" ? "scale(1.05)" : "scale(1)",
                }}
                onClick={() => handleBoxChange("box3")}
                role="button"
                aria-selected={activeBox === "box3"}
                onMouseEnter={(e) => {
                  if (activeBox !== "box3") {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeBox !== "box3") {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }
                }}
              >
                <FaStar
                  style={{
                    fontSize: "3rem",
                    marginBottom: "10px",
                    color: activeBox === "box3" ? "#ffffff" : "#2d4495",
                  }}
                />
                <h3
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                  }}
                >
                  Features Ads
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "1rem",
                    opacity: activeBox === "box3" ? 0.9 : 0.7,
                  }}
                >
                  Highlight your ads with premium features.
                </p>
              </div>
              <div
                style={{
                  flex: 1,
                  minWidth: "250px",
                  padding: "25px",
                  background: activeBox === "box4"
                    ? "linear-gradient(135deg, #2d4495 0%, #4a67d6 100%)"
                    : "#ffffff",
                  color: activeBox === "box4" ? "#ffffff" : "#333333",
                  border: "1px solid #e0e0e0",
                  borderRadius: "12px",
                  boxShadow: activeBox === "box4"
                    ? "0 8px 16px rgba(45, 68, 149, 0.3)"
                    : "0 4px 8px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
                  transform: activeBox === "box4" ? "scale(1.05)" : "scale(1)",
                }}
                onClick={() => handleBoxChange("box4")}
                role="button"
                aria-selected={activeBox === "box4"}
                onMouseEnter={(e) => {
                  if (activeBox !== "box4") {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeBox !== "box4") {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }
                }}
              >
                <FaInfoCircle
                  style={{
                    fontSize: "3rem",
                    marginBottom: "10px",
                    color: activeBox === "box4" ? "#ffffff" : "#2d4495",
                  }}
                />
                <h3
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                  }}
                >
                  Detail Ads
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "1rem",
                    opacity: activeBox === "box4" ? 0.9 : 0.7,
                  }}
                >
                  Provide detailed information for your ads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Listing;