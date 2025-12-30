// import React, { useState } from "react";
// import Flag from "react-world-flags";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

// const UpperHeader = () => {
//   const [selectedLanguage, setSelectedLanguage] = useState("en");
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);

//   const handleLanguageChange = (lang) => {
//     setSelectedLanguage(lang);
//     setIsDropdownVisible(false);
//   };

//   const toggleDropdown = () => {
//     setIsDropdownVisible((prev) => !prev);
//   };

//   return (
//     <div className="upperHeaderWrapper">
//       <div className="upperHeaderContainer">
//         <div className="appInfo">
//           <span className="appInfoText">Download App Via SMS</span>
//         </div>

//         {/* Contact and Language Section */}
//         <div className="contactAndLanguage">
//           <div className="phoneInfo">
//             <span className="phoneText">+966 530 77 1851</span>
//           </div>

//           {/* Language Selection */}
//           <div className="languageDropdown">
//             <button
//               className="languageButton"
//               onClick={toggleDropdown} // Toggle dropdown visibility
//             >
//               <Flag
//                 code={selectedLanguage === "en" ? "GB" : "SA"}
//                 className="flagIcon"
//               />
//               {selectedLanguage === "en" ? "Eng" : "Arb"}
//             </button>

//             {isDropdownVisible && ( // Show dropdown only if visible
//               <div className="dropdownContent">
//                 <div
//                   className="dropdownItem"
//                   onClick={() => handleLanguageChange("en")}
//                 >
//                   <Flag code="GB" className="flagIcon" />
//                   English
//                 </div>
//                 <div
//                   className="dropdownItem"
//                   onClick={() => handleLanguageChange("ar")}
//                 >
//                   <Flag code="SA" className="flagIcon" />
//                   Arabic
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpperHeader;

import React, { useState, useRef, useEffect, useContext } from "react";
import Flag from "react-world-flags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import phone from "./fa-solid_mobile.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { LanguageContext } from "../../../LanguageContext";

const UpperHeader = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleLanguageChange = (lang) => {
    console.log("🟢 Language selected:", lang);
    toggleLanguage(lang);
    setIsDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };
  const handleCall = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/call", {
        to: "+966 530 77 1851",
      });
      console.log("Call Initiated:", response.data);
    } catch (error) {
      console.error("Error making the call:", error);
    }
  };
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    // <div style={{ backgroundColor: "#E9EEFF" }}>
    <div style={{ backgroundColor: "white" }}>
      {" "}
      {/* Full width background */}
      <div className="container py-2">
        {" "}
        {/* Inner container with the same background */}
        <div className="d-flex justify-content-between align-items-center">
          {/* Download App Section with Mobile Icon */}
          <div className="text-muted d-flex align-items-center">
            {/* <img src={phone} alt="phone" />
            <Link to="https://play.google.com/store/apps/details?id=com.facebook.katana&hl=en&pli=1">
              <p className="app-download-button  ">Download App Via SMS</p>
            </Link> */}
          </div>

          {/* Contact Info Section with Phone Icon */}
          <div
            className="d-flex align-items-center  contantIndoPhone_Wrapper"
            style={{ gap: "67.8px" }}
          >
            {/* <div className="phone-info text-muted mt-2">
              <FontAwesomeIcon
                icon={faPhone}
                style={{ color: "#36A680" }}
                className="me-2"
              />
              <a
                href="tel:+966530771851"
                className="para-text"
                style={{
                  fontFamily: "Inter",
                  color: "#353535",
                  textDecoration: "none",
                }}
              >
                +966 530 77 1851
              </a>
            </div> */}

            {/* Language Dropdown Section */}
            <div
              ref={dropdownRef}
              className="lang_dropdown"
              style={{
                display: "flex",
              }}
            >
              <button
                className="btn dropdown-toggle"
                onClick={toggleDropdown}
                aria-expanded={isDropdownVisible ? "true" : "false"}
              >
                <Flag
                  code={language === "en" ? "GB" : "SA"}
                  className="flag-icon"
                  style={{
                    width: "27px",
                    marginRight: "5px",
                    fontFamily: "Inter",
                  }}
                />
                {language === "en" ? "EN" : "AR"}
              </button>

              {/* Dropdown Menu */}
              {isDropdownVisible && (
                <ul className="dropdown-menu show">
                  <li>
                    <button
                      className="dropdown-item"
                      style={{ fontFamily: "Inter" }}
                      onClick={() => handleLanguageChange("en")}
                    >
                      <Flag
                        code="GB"
                        className="flag-icon"
                        style={{ width: "27px", marginRight: "5px" }}
                      />
                      English
                    </button>
                  </li>
                  <li>
                    <button
                      style={{ fontFamily: "VIP Rawy" }}
                      className="dropdown-item"
                      onClick={() => handleLanguageChange("ar")}
                    >
                      <Flag
                        code="SA"
                        className="flag-icon"
                        style={{ width: "27px", marginRight: "5px" }}
                      />
                      Arabic
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpperHeader;
