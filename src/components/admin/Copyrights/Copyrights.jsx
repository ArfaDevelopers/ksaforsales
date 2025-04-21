
import {
  FaGavel,
  FaShieldAlt,
  FaCopyright,
  FaFileContract,
  FaBalanceScale,
  FaTrademark,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaUserSecret,
  FaLock,
  FaUserShield,
  FaDatabase,
  FaShareAlt,
  FaClipboardCheck,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect,useState } from "react"; // Import useEffect along with React
import { FaBan } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../home/footer/Footer";
import Header from "../../home/header"; // Ensure Header is correctly implemented and imported
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  ButtonGroup,
  Badge,
} from "react-bootstrap";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import Link from react-router-dom

const Copyrights = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Header />

      <div
      className="dashboard-content"
      style={{
        marginTop: window.innerWidth <= 576 ? "4rem" : "6rem",
      }}
      >
        <Container
          className="parent-main"
          style={{
            paddingLeft: "2px", // Padding on the left side
            paddingRight: "2px", // Padding on the right side
            color: "black", // Text color
            maxWidth: "1530px", // Optional: Add max-width to ensure padding is visible
            margin: "0 auto", // Optional: Center the container if desired
            marginLeft: window.innerWidth <= 576 ? "0rem" : "12.5%",
            
          }}
        >
          <div
            className="adsCategory_head"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginLeft: "4%",
              marginLeft: window.innerWidth <= 576 ? "0.5rem" : "4%",
              marginTop: "40px",
              alignItems: "center",
            }}
          >
            <button
              className="btn"
              style={{
                background: window.innerWidth <= 576 ? "none" : "#E9EEFF",
                fontWeight: "500",
                pointerEvents: "none",
                padding: window.innerWidth <= 576 ? "0px" : "10px 15px",
              }}
            >
              Home
            </button>

            <span>
              <MdKeyboardArrowRight />
            </span>

            <button
              className="btn"
              style={{
                background: window.innerWidth <= 576 ? "none" : "#E9EEFF",
                fontWeight: "500",
                pointerEvents: "none",
                padding: window.innerWidth <= 576 ? "0px" : "10px 15px",
              }}
            >
              Copyrights{" "}
            </button>
          </div>

          <div>
            <h1
              style={{marginLeft: window.innerWidth <= 576 ? "0.5rem" : "4%", marginTop: window.innerWidth <= 576 ? "10px" : "20px", fontSize: "24px" }}
            >
              Copyrights{" "}
            </h1>
          </div>

          <div
            className="CategoryInfodiv_btn2container"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginLeft: window.innerWidth <= 576 ? "0.5rem" : "4%",
              marginBottom: window.innerWidth <= 576 ? "10px" : "20px",
              marginTop: window.innerWidth <= 576 ? "10px" : "20px"
            }}
          >
            <button
              onClick={() => {
                navigate("/PrivacyPolicy");
              }}
              className="head2btn"
              style={{
                backgroundColor: "white",
                border: "1px solid #2D4495",
                padding: window.innerWidth <= 576 ? "5px" : "10px 15px",
                textAlign: "center",
                width: window.innerWidth <= 576 ? "47%" : "auto"
              }}
            >
              Copyrights
            </button>

          </div>
        </Container>
        {/* Introduction Section */}
        <section className="container ">
          <h2 className="fw-bold">Copyright Notice</h2>
          <p>
            All content, including text, images, graphics, logos, and code,
            published on KSA4Sale is the exclusive property of KSA4Sale or its
            licensors and is protected under copyright laws.
          </p>
        </section>

        {/* Copyright Sections */}
        <section className="container">
          <div className="row">
            {/* Usage Restrictions */}
            <div className="col-md-6 my-3">
              <h3 className="fw-bold">
                <FaFileContract className="text-primary" /> Usage Restrictions
              </h3>
              <p>
                You may not copy, reproduce, distribute, or modify any content
                on KSA4Sale without prior written consent.
              </p>
            </div>

            {/* Intellectual Property */}
            <div className="col-md-6 my-3">
              <h3 className="fw-bold">
                <FaShieldAlt className="text-success" /> Intellectual Property
              </h3>
              <p>
                KSA4Sale respects intellectual property rights and expects users
                to do the same. Unauthorized use of content will lead to legal
                action.
              </p>
            </div>

            {/* Copyright Complaints */}
            <div className="col-md-6 my-3">
              <h3 className="fw-bold">
                <FaGavel className="text-danger" /> Copyright Complaints
              </h3>
              <p>
                If you believe your work has been copied without permission,
                please contact us with proof of ownership.
              </p>
            </div>

            {/* Trademarks */}
            <div className="col-md-6 my-3">
              <h3 className="fw-bold">
                <FaTrademark className="text-warning" /> Trademarks
              </h3>
              <p>
                KSA4Sale, the KSA4Sale logo, and other trademarks used on this
                site are the property of KSA4Sale and may not be used without
                consent.
              </p>
            </div>

            {/* Legal Enforcement */}
            <div className="col-md-6 my-3">
              <h3 className="fw-bold">
                <FaBalanceScale className="text-info" /> Legal Enforcement
              </h3>
              <p>
                We reserve the right to take legal action against copyright
                violators, including seeking damages and injunctions.
              </p>
            </div>

            {/* User Responsibility */}
            <div className="col-md-6 my-3">
              <h3 className="fw-bold">
                <FaCopyright className="text-dark" /> User Responsibility
              </h3>
              <p>
                By using KSA4Sale, you agree to respect all copyright and
                intellectual property laws and adhere to our policies.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className=" py-5">
          <div className="container text-center" style={{marginTop: window.innerWidth <= 576 ? "-30px" : "0px",}}>
            <h2 className="fw-bold">Have Questions?</h2>
            <p>If you have any copyright concerns, please contact us.</p>
            <a href="mailto:copyright@KSA4Sale.com" className="btn "style={{backgroundColor:"#2d4495",color:"white"}}>
              Report Copyright Issue
            </a>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Copyrights;
