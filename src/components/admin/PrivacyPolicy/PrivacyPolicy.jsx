import React, { useEffect,useState } from "react";
import {
  FaUserSecret,
  FaLock,
  FaUserShield,
  FaDatabase,
  FaShareAlt,
  FaClipboardCheck,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

import { FaGavel, FaBan, FaShieldAlt } from "react-icons/fa";
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

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
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
              Privacy Policy{" "}
            </button>
          </div>

          <div>
            <h1
              style={{ marginLeft: window.innerWidth <= 576 ? "0.7rem" : "4%", marginTop: window.innerWidth <= 576 ? "10px" : "20px", fontSize: "24px" }}
            >
              Privacy Policy{" "}
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
              Privacy Policy
            </button>
          
          </div>
        </Container>
        {/* Introduction Section */}
        <section className="container">
          <h2 className="fw-bold">Your Privacy Matters</h2>
          <p>
            At KSA4Sale, we value your privacy and are committed to protecting
            your personal data. This Privacy Policy explains how we collect,
            use, and safeguard your information.
          </p>
        </section>
        {/* Privacy Sections */}
        <section className="container">
          <div className="row">
            {/* Data Collection */}
            <div className="col-md-6 my-3">
              <h3 className="fw-bold">
                <FaDatabase className="text-primary" /> Data Collection
              </h3>
              <p>
                We collect personal data such as name, email, contact details,
                and browsing activity to improve your experience on our
                platform.
              </p>
            </div>

            {/* How We Use Your Data */}
            <div className="col-md-6 my-3">
              <h3 className="fw-bold">
                <FaClipboardCheck className="text-success" /> How We Use Your
                Data
              </h3>
              <p>
                Your data is used to personalize your experience, process
                transactions, and improve security measures on KSA4Sale.
              </p>
            </div>

            {/* Third-Party Sharing */}
            <div className="col-md-6 my-3">
              <h3 className="fw-bold">
                <FaShareAlt className="text-danger" /> Third-Party Sharing
              </h3>
              <p>
                We do not sell your personal data. However, we may share data
                with trusted partners for legal and operational purposes.
              </p>
            </div>

            {/* Security Measures */}
            <div className="col-md-6 my-3">
              <h3 className="fw-bold">
                <FaLock className="text-warning" /> Security Measures
              </h3>
              <p>
                We implement strict security protocols to protect your personal
                information from unauthorized access.
              </p>
            </div>

            {/* User Rights */}
            <div className="col-md-6 my-3">
              <h3 className="fw-bold">
                <FaUserShield className="text-info" /> Your Rights
              </h3>
              <p>
                You have the right to access, modify, or delete your personal
                data at any time through your account settings.
              </p>
            </div>

            {/* Children’s Privacy */}
            <div className="col-md-6 my-3">
              <h3 className="fw-bold">
                <FaUserSecret className="text-dark" /> Children’s Privacy
              </h3>
              <p>
                KSA4Sale does not knowingly collect personal data from
                individuals under the age of 13. If you believe a child has
                provided data, please contact us.
              </p>
            </div>
          </div>
        </section>
        {/* Contact Section */}
        <section className="py-5">
          <div className="container text-center" style={{marginTop: window.innerWidth <= 576 ? "-30px" : "0px"}}>
            <h2 className="fw-bold">Have Questions?</h2>
            <p>
              If you have any questions regarding this Privacy Policy, contact
              us.
            </p>
            <a href="mailto:support@KSA4Sale.com" className="btn " style={{backgroundColor:"#2d4495",color:"white"}}>
              Contact Support
            </a>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
