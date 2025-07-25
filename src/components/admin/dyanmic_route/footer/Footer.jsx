import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Amexpay,
  Applepay,
  CallCallingSvg,
  FooterLogo,
  Gpay,
  Master,
  Phone,
  SmsTracking,
  Visa,
} from "../../../imagepath";
import AOS from "aos";
import "aos/dist/aos.css";
// import image from "./Group 164.png";
// import image2 from "./Help Section.png";
import gmail from "./gmail.png";
import whatapp from "./whatapp.png";
import googlebutton from "./Google button.png";
import mobileimage from "./mobileimg.png";
import appstore from "./Appstore.png";
import arrowimage from "./arrow.png";
import scanner from "./scanner.png";
import KSA from "./Logo ksa.svg";

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  return (
    <footer>
      <div className="footer">
        <div className="topfooter_wrapper container">
          <div className="topfooter_container1">
            <h4 className="topfooter_heading1">GET KSA4SALES APP</h4>
            <div className="topfooter_soc   d-flex flex-column">
              <div>
                <h4 className="topfooter_heading2">
                  The best for is You just one click away
                </h4>
              </div>
              <div>
                <i
                  className="topfooter-socialimg"
                  style={{
                    marginRight: "1rem",
                    width: "148px",
                    height: "50px",
                  }}
                >
                  {" "}
                  <img src={googlebutton} alt="" />
                </i>
                <i className="topfooter-socialimg">
                  <img src={appstore} alt="" />
                </i>
              </div>
            </div>
          </div>
          <div className="topfooter_qrcodescanner">
            <div className="qrcodescanner_socs">
              <i className="topfooter_arrow">
                <img src={arrowimage} alt="" />
              </i>
              <i className="topfooterscanner">
                <img src={scanner} alt="" />
              </i>
            </div>
            <div className="para_div">
              <p className="qrcodepara">
                Scan the Qr to <br />
                get the app
              </p>
            </div>
          </div>
          <div className="topfooter-mobileimage">
            <i className="topfooter-mob">
              <img src={mobileimage} alt="" />
            </i>
          </div>
        </div>

        {/* footer mid */}

        <div className="footermid-wrapper ">
          <div
            className="footermid-container container"
            style={{ marginRight: "19rem" }}
          >
            <h3 className="footermid-heading">We are always here to help</h3>
            <div className="footermidinfo-container">
              <div className="midfooterinfo">
                <i className="midfooterinfo-icon">
                  <img src={gmail} alt="" style={{ width: "50px" }} />
                </i>
                <div className="footermidgmail">
                  <h4 className="footermidgmailheading">Email support</h4>
                  <p className="footermid-para" style={{ fontFamily: "Inter" }}>
                    Info@ksa4sale.com
                  </p>
                </div>
              </div>
              <div className="midfooterinfo">
                <i className="midfooterinfo-icon">
                  <img src={whatapp} alt="" style={{ width: "50px" }} />
                </i>
                <div className="footermidgmail">
                  <h4 className="footermidgmailheading">Phone Number</h4>
                  <p className="footermid-para" style={{ fontFamily: "Inter" }}>
                    530771851
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-top aos  footer_shadow" data-aos="fade-up">
          <div className="container">
            <div className="row" style={{ gap: "1.7rem" }}>
              <div className="col-lg-3 col-md-6">
                <div className="footer-widget">
                  <div className="footer-logo">
                    <Link to="#">
                      <img src={KSA} alt="logo" />
                    </Link>
                  </div>
                  <div className="footer-content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing </p>
                    <h3>Donwload Our App</h3>
                    <div
                      className="socialicons "
                      style={{ marginBottom: "2rem" }}
                    >
                      <i className="footer_socialsIcons">
                        <img src={googlebutton} />
                      </i>
                      <i className="footer_socialsIcons">
                        {" "}
                        <img src={appstore} />
                      </i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-6">
                <div className="footer-widget footer-menu">
                  <h2 className="footer-title">Categories</h2>
                  <ul>
                    <li>
                      <Link to="/PetAnimalsComp">Our product</Link>
                    </li>
                    <li>
                      <Link to="AutomotiveComp">Automative</Link>
                    </li>
                    <li>
                      <Link to="/ElectronicComp">Electronic</Link>
                    </li>
                    <li>
                      <Link to="/PetAnimalsComp">Animal</Link>
                    </li>
                    <li>
                      <Link to="/FashionStyle">Gift</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-6">
                <div className="footer-widget footer-menu">
                  {/* <h2 className="footer-title">Quick links</h2> */}
                  <ul className="col_2">
                    <li>
                      <Link to="/RealEstateComp">Property</Link>
                    </li>
                    <li>
                      <Link to="/RealEstateComp">Contracting</Link>
                    </li>
                    <li>
                      <Link to="/RealEstateComp">Camping</Link>
                    </li>
                    <li>
                      <Link to="/Education">Family</Link>
                    </li>
                    <li>
                      <Link to="/RealEstateComp">Furniture</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-6">
                <div className="footer-widget footer-menu">
                  <h2 className="footer-title">My Account</h2>
                  <ul>
                    <li>
                      <Link to="/profile">Account Infromation</Link>
                    </li>
                    <li>
                      <Link to="/my-listing">My Listing</Link>
                    </li>
                    <li>
                      <Link to="/bookmarks">My Favourtite</Link>
                    </li>
                    <li>
                      <Link to="#">My Payment</Link>
                    </li>
                    <li>
                      <Link to="#">Followers</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-2 col-md-6">
                <div className="footer-widget footer-menu">
                  <h2 className="footer-title">My Information</h2>
                  <ul>
                    <li>
                      <Link to="/AboutUs">About Us</Link>
                    </li>
                    <li>
                      <Link to="/TermsAndConditions">Terms & Conditions</Link>
                    </li>
                    <li>
                      <Link to="/PrivacyPolicy">Privacy & Policy</Link>
                    </li>
                    <li>
                      <Link to="#">Blog</Link>
                    </li>
                    <li>
                      <Link to="/Copyrights">CopyRights</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_end">
          <h6 className="footerend_para">
            All CopyRight Reserved &copy;{" "}
            <span style={{ fontFamily: "'Inter', sans-serif" }}>2025</span>
            -Ksa4sale
          </h6>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
