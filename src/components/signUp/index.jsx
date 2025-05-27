import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../home/header";
import Footer from "../home/footer/Footer";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { db, auth, storage } from "../Firebase/FirebaseConfig.jsx";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { apple, facebook, google } from "../imagepath";
import { FaApple } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import image from "../../../public/Banner1.png";
import googlebutton from "../../components/home/footer/Google button.png";
import mobileimage from "../../components/home/footer/mobileimg.png";
import appstore from "../../components/home/footer/Appstore.png";
import arrowimage from "../../components/home/footer/arrow.png";
import scanner from "../../components/home/footer/scanner.png";
import KSA from "../../components/home/footer/Logo ksa.svg";
const SignUp = () => {
  const navigate = useNavigate();

  const [passwordType, setPasswordType] = useState("password");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [Saudinummsg, setSaudinummsg] = useState(null);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const fullPhoneNumber = `+966${phoneNumber}`;

  const handleMobileChange = (e) => {
    let input = e.target.value;
    if (/^[\d+]*$/.test(input)) {
      setPhoneNumber(input);
    }
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
  }, []);

  const validateNumber = () => {
    const saudiNumberRegex = /^\+966\d{8}$/;
    if (phoneNumber && !saudiNumberRegex.test(phoneNumber)) {
      setSaudinummsg("Please enter valid Saudi like +9665XXXXXXXX");
      setPhoneNumber("");
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    formData.append("cloud_name", "dv26wjoay");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dv26wjoay/image/upload",
        formData
      );
      setImgUrl(response.data.secure_url);
      console.log("Image uploaded successfully:", response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image.");
    }
  };

  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          console.log("User Data:", userDoc.data());
        } else {
          console.log("No user document found!");
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const sendOtp = async () => {
    if (!phoneNumber) {
      alert("Please enter your mobile number");
      return;
    }

    try {
      const response = await fetch(
        "https://ksaforsaleapis.vercel.app/route/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: fullPhoneNumber }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setOtpSent(true);
        alert("OTP sent successfully!");
      } else {
        alert("Error sending OTP");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send OTP");
    }
  };

  const verifyOtp = async (event) => {
    event.preventDefault();
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      const response = await fetch(
        "https://ksaforsaleapis.vercel.app/route/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: fullPhoneNumber, code: otp }),
        }
      );

      const data = await response.json();
      if (data.success) {
        handleSignup(event);
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to verify OTP");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const q = query(
        collection(db, "users"),
        where("phoneNumber", "==", fullPhoneNumber)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("This mobile number is already associated with an account.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: fullName,
        photoURL: imgUrl,
        phoneNumber: fullPhoneNumber,
      });

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        fullName: fullName,
        email,
        phoneNumber: fullPhoneNumber,
        password: password, // Added password to payload
        photoURL: imgUrl || null,
        createdAt: new Date(),
      });

      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert(error.message);
    }
  };

  const togglePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    <>
      <Header />
      <div
        className="login-content"
        style={{ marginTop: window.innerWidth <= 576 ? "6rem" : "12rem" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6 ">
              <div className="login-wrap register-form">
                <div className="login-header">
                  <h3>Sign Up</h3>
                  <p style={{ fontWeight: "bold" }}>
                    Hurry up! By signing up you get full access to all of our
                    features.
                  </p>
                </div>

                <form onSubmit={handleSignup}>
                  <div className="form-group group-img">
                    <div
                      style={{
                        position: "relative",
                        marginBottom: "15px",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #e0e0e0",
                          borderRadius: "10px",
                          padding: "5px 10px",
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "10px",
                          }}
                        >
                          <img
                            src="https://flagcdn.com/16x12/sa.png"
                            alt="Saudi Arabia Flag"
                            style={{
                              width: "20px",
                              height: "15px",
                              marginRight: "5px",
                            }}
                          />

                          <span
                            style={{
                              color: "#2d4495",
                              fontWeight: "500",
                              fontSize: "14px",
                            }}
                          >
                            +966
                          </span>
                        </span>
                        <input
                          type="number"
                          placeholder="xxxxxxxxx"
                          value={phoneNumber}
                          onChange={(e) => {
                            const value = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 15);
                            handlePhoneNumberChange({ target: { value } });
                          }}
                          maxLength={15}
                          required
                          style={{
                            border: "none",
                            outline: "none",
                            flex: 1,
                            backgroundColor: "transparent",
                            color: "#666",
                            fontSize: "14px",
                            padding: "5px 0",
                            width: "100%",
                          }}
                        />
                      </div>
                      <style>
                        {`
                          input[type="number"]::-webkit-inner-spin-button,
                          input[type="number"]::-webkit-outer-spin-button {
                            -webkit-appearance: none;
                            margin: 0;
                          }
                          input[type="number"] {
                            -moz-appearance: textfield;
                          }
                          input::placeholder {
                            color: #999;
                          }
                        `}
                      </style>
                    </div>
                  </div>

                  <div className="form-group group-img">
                    <div className="group-img">
                      <i
                        className="feather-user"
                        style={{ color: "#2d4495" }}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group group-img">
                    <div className="group-img">
                      <i
                        className="feather-mail"
                        style={{ color: "#2d4495" }}
                      />
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="pass-group group-img">
                      <i
                        className="feather-lock"
                        style={{ color: "#2d4495" }}
                      />
                      <input
                        type={passwordType}
                        className="form-control pass-input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <span
                        className={`toggle-password ${
                          passwordType === "password"
                            ? "feather-eye"
                            : "feather-eye-off"
                        }`}
                        onClick={togglePassword}
                      ></span>
                    </div>
                  </div>

                  {!otpSent ? (
                    <button
                      type="button"
                      className="btn w-100"
                      style={{
                        backgroundColor: "#2d4495",
                        color: "#fff",
                        border: "none",
                      }}
                      onClick={sendOtp}
                    >
                      Send OTP
                    </button>
                  ) : (
                    <>
                      <div className="form-group group-img">
                        <div className="group-img">
                          <i
                            className="feather-key"
                            style={{ color: "#2d4495" }}
                          />
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-secondary w-100"
                        onClick={verifyOtp}
                      >
                        Verify OTP and Create Account
                      </button>
                    </>
                  )}

                  <div className="register-link text-center">
                    <p style={{ fontWeight: "bold", fontSize: 16 }}>
                      Already have an account?{" "}
                      <Link
                        className="forgot-link"
                        to="/login"
                        style={{ textDecoration: "none" }}
                      >
                        Sign In
                      </Link>
                    </p>
                  </div>
                  <div className="register-link text-center">
                    <p style={{ fontWeight: "bold", fontSize: 14 }}>
                      By using the ksa4sale app.you agree to our <br />
                      <Link className="forgot-link" to="/TermsAndConditions">
                        Terms&conditions
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="qr-section"
                style={{ position: "relative", marginTop: -20 }}
              >
                {/* QR Code with Phone Border */}
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <img
                    src={image}
                    alt="QR Code"
                    style={{
                      width: "100%",
                      // maxWidth: '200px', // Adjust size as needed
                      height: "100%",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div
                  className="slogan-section"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "5px",
                  }}
                >
                  <div className="topfooter_wrapper container d-flex justify-content-center align-items-center">
                    <div
                      className="d-flex flex-column"
                      style={{ textAlign: "center" }}
                    >
                      <div>
                        <h4 style={{ marginBottom: 20, marginTop: -30 }}>
                          Download the Ksa4sale App
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
                          <img src={googlebutton} alt="Google Play Store" />
                        </i>
                        <i className="topfooter-socialimg">
                          <img src={appstore} alt="App Store" />
                        </i>
                      </div>
                    </div>
                  </div>
                  {/* Double Arrow Icon (Flipped and Larger) */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
