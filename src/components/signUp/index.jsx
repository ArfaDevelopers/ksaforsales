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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useTranslation } from "react-i18next";
const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
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
  const [sendingOtp, setSendingOtp] = useState(false);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  // Add +966 prefix with normalization for OTP API
  const normalizedPhone = phoneNumber.startsWith('0') ? phoneNumber.substring(1) : phoneNumber;
  const fullPhoneNumber = `+966${normalizedPhone}`;

  const handleMobileChange = (e) => {
    let input = e.target.value;
    if (/^[\d+]*$/.test(input)) {
      setPhoneNumber(input);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateNumber = () => {
    const saudiNumberRegex = /^0?5\d{8}$/;
    if (phoneNumber && !saudiNumberRegex.test(phoneNumber)) {
      setSaudinummsg("Please enter valid Saudi number starting with 05 or 5");
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
      await MySwal.fire({
        icon: "warning",
        title: "Missing Number",
        text: "Please enter your mobile number.",
      });
      return;
    }

    setSendingOtp(true);

    try {
      console.log("Checking if phone number exists:", fullPhoneNumber);

      // ✅ Step 1: Check if phone number already exists
      const q = query(
        collection(db, "users"),
        where("phoneNumber", "==", fullPhoneNumber)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // ✅ If phone exists, show alert and stop here
        setSendingOtp(false);
        await MySwal.fire({
          icon: "warning",
          title: "Phone Number Exists",
          text: "This mobile number is already associated with an account.",
        });
        return;
      }

      console.log("Phone number is available. Sending OTP to:", fullPhoneNumber);

      // ✅ Step 2: Send OTP if number doesn't exist
      const response = await fetch(
        "https://ksaforsaleapis.vercel.app/route/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: fullPhoneNumber }),
        }
      );

      console.log("OTP API Response Status:", response.status);

      if (!response.ok) {
        console.error("API returned error status:", response.status);
        throw new Error(`API returned status ${response.status}`);
      }

      const data = await response.json();
      console.log("OTP API Response Data:", data);

      if (data.success) {
        setOtpSent(true);
        setSendingOtp(false);
        await MySwal.fire({
          icon: "success",
          title: "OTP Sent",
          text: "OTP sent successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        setSendingOtp(false);
        console.error("OTP sending failed. Response:", data);
        await MySwal.fire({
          icon: "error",
          title: "Sending Failed",
          text: data.message || "Error sending OTP. Please check your phone number and try again.",
        });
      }
    } catch (error) {
      setSendingOtp(false);
      console.error("Error sending OTP:", error);
      await MySwal.fire({
        icon: "error",
        title: "Network Error",
        text: "Failed to send OTP. Please check your internet connection and try again.",
      });
    }
  };

  // const sendOtp = async () => {
  //   if (!phoneNumber) {
  //     await MySwal.fire({
  //       icon: "warning",
  //       title: "Missing Number",
  //       text: "Please enter your mobile number.",
  //     });
  //     return;
  //   }

  //   try {
  //     const response = await fetch(
  //       "https://ksaforsaleapis.vercel.app/route/send-otp",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ phone: fullPhoneNumber }),
  //       }
  //     );

  //     const data = await response.json();
  //     if (data.success) {
  //       setOtpSent(true);
  //       await MySwal.fire({
  //         icon: "success",
  //         title: "OTP Sent",
  //         text: "OTP sent successfully!",
  //         timer: 2000,
  //         showConfirmButton: false,
  //       });
  //     } else {
  //       await MySwal.fire({
  //         icon: "error",
  //         title: "Sending Failed",
  //         text: "Error sending OTP.",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     await MySwal.fire({
  //       icon: "error",
  //       title: "Network Error",
  //       text: "Failed to send OTP. Please try again.",
  //     });
  //   }
  // };

  // ✅ Updated verifyOtp
  const verifyOtp = async (event) => {
    event.preventDefault();

    if (!otp) {
      await MySwal.fire({
        icon: "warning",
        title: "Missing OTP",
        text: "Please enter the OTP.",
      });
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
        await MySwal.fire({
          icon: "success",
          title: "OTP Verified",
          text: "Your OTP has been verified.",
          timer: 1500,
          showConfirmButton: false,
        });
        handleSignup(event);
      } else {
        await MySwal.fire({
          icon: "error",
          title: "Invalid OTP",
          text: "The OTP you entered is incorrect.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      await MySwal.fire({
        icon: "error",
        title: "Verification Failed",
        text: "Failed to verify OTP. Please try again.",
      });
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
        await MySwal.fire({
          icon: "warning",
          title: "Phone Number Exists",
          text: "This mobile number is already associated with an account.",
        });
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
      });

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        fullName: fullName,
        email,
        phoneNumber: fullPhoneNumber,
        password: password,
        photoURL: imgUrl || null,
        createdAt: new Date(),
      });

      await MySwal.fire({
        icon: "success",
        title: "Account Created",
        text: "Your account has been created successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error.message);
      await MySwal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.message || "An unexpected error occurred.",
      });
    }
  };

  const togglePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    <>
      <Header />
      <div className="login-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="login-wrap register-form">
                <div className="login-header">
                  <h3>{t("signup.title")}</h3>
                  <p style={{}}>
                    {t("signup.welcomeMessage")}
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
                          padding: "0px 15px",
                          width: "100%",
                          boxSizing: "border-box",
                          backgroundColor: "#e8f0fe",
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
                          placeholder={t("signup.phonePlaceholder")}
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
                        placeholder={t("signup.fullNamePlaceholder")}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group group-img">
                    <div className="group-img">
                      <i className="feather-mail" />
                      <input
                        type="email"
                        className="form-control"
                        placeholder={t("signup.emailPlaceholder")}
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
                        placeholder={t("signup.passwordPlaceholder")}
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
                      className="btn w-100 login-btn"
                      disabled={sendingOtp}
                      style={{
                        backgroundColor: sendingOtp ? "#1a4a9e" : "#1E55B4",
                        color: "#fff",
                        border: "none",
                        fontWeight: "bold",
                        borderRadius: "10px",
                        cursor: sendingOtp ? "not-allowed" : "pointer",
                        opacity: sendingOtp ? 0.8 : 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                      onClick={sendOtp}
                    >
                      {sendingOtp && (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                      {sendingOtp ? "Sending OTP..." : "Send OTP"}
                    </button>
                  ) : (
                    <>
                      <div className="form-group group-img">
                        <div className="group-img">
                          <i className="feather-lock" style={{ color: "#2d4495" }} />
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
                        className="btn w-100 login-btn"
                        style={{
                          backgroundColor: "#1E55B4",
                          color: "#fff",
                          border: "none",
                          fontWeight: "bold",
                          borderRadius: "10px",
                        }}
                        onClick={verifyOtp}
                      >
                        Verify OTP & Sign Up
                      </button>
                    </>
                  )}

                  <div className="register-link text-center">
                    <p style={{ fontWeight: "bold", fontSize: 16 }}>
                      {t("signup.haveAccount")}{" "}
                      <Link
                        className="forgot-link"
                        to="/login"
                        style={{ textDecoration: "none" }}
                      >
                        {t("signup.signIn")}
                      </Link>
                    </p>
                  </div>
                  <div className="register-link text-center">
                    <p style={{ fontWeight: "bold", fontSize: 14 }}>
                      {t("signup.agreeToTerms")} <br />
                      <Link className="forgot-link" to="/TermsAndConditions">
                        {t("signup.termsAndConditions")}
                      </Link>
                    </p>
                  </div>
                </form>
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
