import React, { useEffect } from "react";
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
  return (
    <>
      <Header />

      <div>
        {/* Hero Section */}
        <section className="bg-dark text-light text-center py-5">
          <div className="container">
            <h1 className="display-4 fw-bold">Privacy Policy</h1>
            <p className="lead">Last Updated: March 2025</p>
          </div>
        </section>{" "}
        <Container
          className="parent-main"
          style={{
            paddingLeft: "2px", // Padding on the left side
            paddingRight: "2px", // Padding on the right side
            color: "black", // Text color
            maxWidth: "1530px", // Optional: Add max-width to ensure padding is visible
            margin: "0 auto", // Optional: Center the container if desired
            marginLeft: "12%",
          }}
        >
          <div
            className="adsCategory_head"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginLeft: "4%",
              marginTop: "40px",
              alignItems: "center",
            }}
          >
            <button
              className="btn"
              style={{
                background: "#E9EEFF",
                fontWeight: "500",
                pointerEvents: "none",
                padding: "10px 15px",
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
                background: "#E9EEFF",
                fontWeight: "500",
                pointerEvents: "none",
                padding: "10px 15px",
              }}
            >
              Privacy Policy{" "}
            </button>
          </div>

          <div>
            <h1
              style={{ marginLeft: "4%", marginTop: "20px", fontSize: "24px" }}
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
              marginLeft: "4%",
              marginBottom: "40px",
              marginTop: "20px",
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
                padding: "10px 15px",
                textAlign: "center",
              }}
            >
              Privacy Policy
            </button>
            {/* <Container
              className="parent-main"
              style={{
                paddingLeft: "2px", // Padding on the left side
                paddingRight: "2px", // Padding on the right side
                color: "black", // Text color
                maxWidth: "1530px", // Optional: Add max-width to ensure padding is visible
                margin: "0 auto", // Optional: Center the container if desired
              }}
            >
              <div
                className="adsCategory_head"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginLeft: "4%",
                  marginTop: "40px",
                  alignItems: "center",
                }}
              >
                <button
                  className="btn"
                  style={{
                    background: "#E9EEFF",
                    fontWeight: "500",
                    pointerEvents: "none",
                    padding: "10px 15px",
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
                    background: "#E9EEFF",
                    fontWeight: "500",
                    pointerEvents: "none",
                    padding: "10px 15px",
                  }}
                >
                  Terms & Conditions{" "}
                </button>
              </div>

              <div>
                <h1
                  style={{
                    marginLeft: "4%",
                    marginTop: "20px",
                    fontSize: "24px",
                  }}
                >
                  Terms & Conditions{" "}
                </h1>
              </div>

              <div
                className="CategoryInfodiv_btn2container"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginLeft: "4%",
                  marginBottom: "40px",
                  marginTop: "20px",
                }}
              >
                <button
                  onClick={() => {
                    navigate("/AboutUs");
                  }}
                  className="head2btn"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #2D4495",
                    padding: "10px 15px",
                    textAlign: "center",
                  }}
                >
                  Terms & Conditions
                </button>
              </div>
            </Container> */}
          </div>
        </Container>
        {/* Introduction Section */}
        <section className="container my-5">
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
        <section className="bg-light py-5">
          <div className="container text-center">
            <h2 className="fw-bold">Have Questions?</h2>
            <p>
              If you have any questions regarding this Privacy Policy, contact
              us.
            </p>
            <a href="mailto:support@KSA4Sale.com" className="btn btn-primary">
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
