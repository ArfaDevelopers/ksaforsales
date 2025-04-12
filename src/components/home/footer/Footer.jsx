import React, { useEffect,useState  } from "react";
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
} from "../../imagepath";
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
    <style>
        {`
          footer {
            margin-top: -3rem;
          }

          @media (max-width: 768px) {
            footer {
              margin-top: -65rem;
            }
          }
        `}
      </style>
    <footer >
      <div className="footer">
        {/* footer_top */}

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
                    marginRight: "2rem",
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
          <div className="topfooter_qrcodescanner" style={{marginLeft: window.innerWidth <= 576 ? "-1.5rem" : "0rem",marginTop: window.innerWidth <= 576 ? "-2rem" : "0rem"}}>
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

        <div className="footermid-wrapper " style={{  marginTop: window.innerWidth <= 576 ? "-8rem" : "-4rem"}}>
          <div className="footermid-container container" style={{marginRight:"19rem" }}>
            <h3 className="footermid-heading" style={{marginLeft: window.innerWidth <= 576 ? "-3rem" : "0rem"}}>We are always here to help</h3>
            <div className="footermidinfo-container">
              <div className="midfooterinfo">
                <i className="midfooterinfo-icon" >
                  <img src={gmail} alt="" style={{ width: "3.5rem" }} />
                </i>
                <div className="footermidgmail">
                  <h4 className="footermidgmailheading">Email support</h4>
                  <p className="footermid-para" style={{ fontFamily: "Inter" }}>
                    emailsupport@Ksa4sale.com
                  </p>
                </div>
              </div>
              <div className="midfooterinfo"style={{marginTop: window.innerWidth <= 576 ? "-3rem" : "0rem",marginBottom: window.innerWidth <= 576 ? "-4rem" : "0rem"}}>
                <i className="midfooterinfo-icon">
                  <img src={whatapp} alt="" style={{ marginRight: window.innerWidth <= 576 ? "2rem" : "0rem",marginLeft: window.innerWidth <= 576 ? "-3rem" : "0rem" , }} />
                </i>
                <div className="footermidgmail">
                  <h4 className="footermidgmailheading">Phone Number</h4>
                  <p className="footermid-para" style={{ fontFamily: "Inter" }}>
                    + 965 43215678
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="footer-top aos  footer_shadow "
          data-aos="fade-up"
          style={{ marginTop: "-2rem" }}
        >
          <div className="container  footerContact_Wrapper">
            <div className="row  footerEnd_container">
              <div className="col-lg-3 col-md-6  logoInfo_wrapper">
                <div className="footer-widget containerParaInfo ">
                  <div className="footer-logo">
                    <Link to="#">
                      <img src={KSA} alt="logo" />
                    </Link>
                    <p className="footerLogo_para">
                      Lorem ipsum dolor sit amet, consectetur 
                    </p>
                  </div>
                  <div
                    className="footer-content"
                    style={{ marginLeft: "-1.5rem" }}
                  >
                    <h3>Download Our App</h3>
                    <div className="socialicons " style={{marginLeft: window.innerWidth <= 576 ? "0rem" : "3.5rem"}}>
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
                  <ul className="col_2" style={{marginTop: window.innerWidth <= 576 ? "-1rem" : "30px"}}>
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
          <div className="footerend_para">
            All CopyRight Reserved &copy;{" "}
            <span style={{ fontFamily: "'Inter', sans-serif" }}>2025</span>
            -Ksa4sale
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
