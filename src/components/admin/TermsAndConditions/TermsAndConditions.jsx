import React, { useEffect } from "react";
import {
  FaGavel,
  FaUserShield,
  FaBan,
  FaClipboardCheck,
  FaShieldAlt,
} from "react-icons/fa";
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

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <Header />

      <div
        className="parent-main"
        style={{
          paddingLeft: "2px", // Padding on the left side
          paddingRight: "2px", // Padding on the right side
          color: "black", // Text color
          maxWidth: "1530px", // Optional: Add max-width to ensure padding is visible
          margin: "0 auto", // Optional: Center the container if desired
        }}
      >
        {/* Hero Section */}
        <section className="bg-dark text-light text-center py-5">
          <div className="container">
            <h1 className="display-4 fw-bold">Terms and Conditions</h1>
            <p className="lead">Last Updated: March 2025</p>
          </div>
        </section>
        <Container
          className="parent-main"
          style={{
            paddingLeft: "10px", // Padding on the left side
            paddingRight: "2px", // Padding on the right side
            color: "black", // Text color
            maxWidth: "1530px", // Optional: Add max-width to ensure padding is visible
            margin: "0 auto", // Optional: Center the container if desired
            marginLeft: "3%",
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
              style={{ marginLeft: "4%", marginTop: "20px", fontSize: "24px" }}
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
                navigate("/TermsAndConditions");
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
        </Container>
        {/* Introduction Section */}
        <section className="container my-5">
          <h2 className="fw-bold">Welcome to KSA4Sale</h2>
          <p>
            By accessing or using KSA4Sale, you agree to abide by the following
            terms and conditions. If you do not agree with any part of these
            terms, please refrain from using our platform.
          </p>
        </section>
        {/* Terms Sections */}
        <section className="container">
          <div className="row">
            {/* User Responsibilities */}
            <div className="col-md-6 my-3">
              <h3 className="fw-bold">
                <FaUserShield className="text-primary" /> User Responsibilities
              </h3>
              <p>
                Users must ensure all provided information is accurate and not
                misleading. Any fraudulent activity will result in account
                suspension.
              </p>
            </div>

            {/* Prohibited Activities */}
            <div className="col-md-6 my-3">
              <h3 className="fw-bold">
                <FaBan className="text-danger" /> Prohibited Activities
              </h3>
              <p>
                The following activities are strictly prohibited on KSA4Sale:
              </p>
              <ul>
                <li>Posting illegal or counterfeit products</li>
                <li>Spamming other users</li>
                <li>Using automated bots for bulk posting</li>
              </ul>
            </div>

            {/* Posting Guidelines */}
            <div className="col-md-6 my-3">
              <h3 className="fw-bold">
                <FaClipboardCheck className="text-success" /> Posting Guidelines
              </h3>
              <p>
                All listings must adhere to our community standards. Ensure that
                images and descriptions are accurate.
              </p>
            </div>

            {/* Security and Privacy */}
            <div className="col-md-6 my-3">
              <h3 className="fw-bold">
                <FaShieldAlt className="text-warning" /> Security & Privacy
              </h3>
              <p>
                KSA4Sale ensures data privacy and protection. However, users
                must take personal security measures while dealing with other
                buyers or sellers.
              </p>
            </div>

            {/* Legal Action */}
            <div className="col-md-6 my-3">
              <h3 className="fw-bold">
                <FaGavel className="text-dark" /> Legal Action
              </h3>
              <p>
                Violation of these terms may lead to legal action, including
                permanent bans or reports to authorities.
              </p>
            </div>
          </div>
        </section>
        {/* Contact Section */}
        {/* <section className="bg-light py-5">
          <div className="container text-center">
            <h2 className="fw-bold">Need Help?</h2>
            <p>
              If you have any questions regarding these terms, please contact
              us.
            </p>
            <a href="mailto:support@KSA4Sale.com" className="btn btn-primary">
              Contact Support
            </a>
          </div>
        </section> */}
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default TermsAndConditions;
