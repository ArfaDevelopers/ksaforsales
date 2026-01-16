import React, { useState, useEffect } from "react";
import Header from "../home/header";
import Footer from "../home/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { apple, facebook, google } from "../imagepath";
// import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth, db } from "./../Firebase/FirebaseConfig";
// import { auth } from "./../Firebase/FirebaseConfig"; // Ensure correct Firebase import
import { FaApple } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import UpperHeader from "../../components/dyanmic_routes/upperHeader/Upper_Header";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  // State for email & password
  const [email, setEmail] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  // const [phoneNumber, setPhoneNumber] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [error1, setError1] = useState("");

  const handlePhoneNumberChange1 = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);

    // This regex only allows valid sequences starting with +9665 followed by up to 8 digits
    const liveKsaPhoneRegex = /^\+9665\d{0,8}$/;

    // Show error if input is not empty and doesn't match the required live pattern
    if (value === "") {
      setError1("");
    } else if (!liveKsaPhoneRegex.test(value)) {
      setError1(t("login.phoneError"));
    } else {
      setError1("");
    }
  };

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before attempting login

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Login successful:", userCredential.user);

      // Redirect to dashboard or homepage after login
      navigate("/");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Login failed:", error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // ✅ Check for empty fields
    if (!phoneNumber.trim() || !password.trim()) {
      setLoading(false);
      MySwal.fire({
        icon: "warning",
        title: t("login.missingFields"),
        text: t("login.missingFieldsMessage"),
      });
      return;
    }
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("phoneNumber", "==", phoneNumber));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("No user found with this phone number.");
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      const email = userData.email;

      if (!email) {
        throw new Error("User email not found in database.");
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      localStorage.setItem("user", user.uid); // fixed this line

      console.log("User logged in:", user);
      await MySwal.fire({
        icon: "success",
        title: t("login.loginSuccessful"),
        text: t("login.welcomeBack"),
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message);

      await MySwal.fire({
        icon: "error",
        title: t("login.loginFailed"),
        text: err.message || t("login.loginFailedMessage"),
      });
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setEmail(e.target.value);
    console.log("Entered Email:", e.target.value);
  };
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const fullPhoneNumber = `+966${phoneNumber}`;
  // Handle email & password input changes
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  // Toggle password visibility
  const togglePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    <>
      <Header />

      {/* <div className="login-content" style={{ marginTop: "8rem" ,marginLeft:"2rem" }}>
        
        <div class="container breadcrumb mt-4  mt-4 d-flex justify-content-start align-items-start">
          <div class="row">
            <div class="col-12 text-start text-dark ">Home / Login</div>
          </div>
        </div>
      </div> */}

      <div className="login-content">
        <div className="container">
          <div className="row justify-content-center">
            {/* Login Form Section */}

            <div className="col-md-8 col-lg-6">
              <div className="login-wrap">
                <div className="login-header">
                  <h3>{t("login.title")}</h3>
                  <p>
                    {t("login.welcomeMessage")}
                  </p>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div
                    style={{
                      position: "relative",
                      marginBottom: "15px",
                      width: "100%",
                    }}
                  >
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
                        {" "}
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
                          type="tel"
                          id="phoneNumber"
                          value={phoneNumber}
                          autoComplete="off"  
                          onChange={handlePhoneNumberChange1}
                          placeholder={t("login.phonePlaceholder")}
                          className="form-control"
                          maxLength={15}
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
                      {error1 && (
                        <p className="text-red-500 text-sm mt-1">{error1}</p>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      position: "relative",
                      marginBottom: "15px",
                      width: "100%",
                    }}
                  >
                    <div
                      className="group-img"
                      style={{
                        // display: "flex",
                        // alignItems: "center",
                        // border: "1px solid #e0e0e0",
                        // borderRadius: "10px",
                        // backgroundColor: "#f0f4ff",
                        // padding: "5px 10px",
                        // width: "100%",
                        // boxSizing: "border-box",
                        position: "relative",
                      }}
                    >
                      <i
                        className="feather-lock"
                        style={{ color: "#2d4495" }}
                      />
                      {/* <span
                        style={{
                          marginRight: "10px",
                          fontSize: "16px",
                          color: "#2d4495",
                          position: "absolute",
                          top: "50%",
                          transform: "translateY(-50%)",
                          left: "10px",
                        }}>
                        🔒
                      </span> */}
                      <input
                        className="form-control"
                        type={passwordType}
                        placeholder={t("login.passwordPlaceholder")}
                        value={password}
                        autoComplete="new-password"
                        onChange={handlePasswordChange}
                        style={{
                          outline: "none",
                          flex: 1,
                          backgroundColor: "transparent",
                          color: "#666",
                          fontSize: "14px",
                          // paddingLeft: "35px",
                          width: "100%",
                        }}
                      />

                      {/* <span
                        onClick={togglePassword}
                        style={{
                          marginLeft: "10px",
                          fontSize: "16px",
                          color: "#2d4495",
                          cursor: "pointer",
                          position: "absolute",
                          top: "50%",
                          transform: "translateY(-50%)",
                          right: "10px",
                        }}>
                        {passwordType === "password" ? "👁️" : "👁️‍🗨️"}
                      </span> */}
                      <span
                        className={`toggle-password ${
                          passwordType === "password"
                            ? "feather-eye"
                            : "feather-eye-off"
                        }`}
                        onClick={togglePassword}
                      ></span>
                    </div>
                    <style>
                      {`
      /* Placeholder styling */
      input::placeholder {
        color: #999;
      }
    `}
                    </style>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-6 ">
                      <Link
                        className="forgot-link"
                        to="/forgot-password"
                        style={{
                          color: "#2d4495",
                          textDecoration: "none",
                          fontWeight: "bold",
                        }}
                      >
                        {t("login.forgotPassword")}
                      </Link>
                    </div>
                  </div>
                  <button
                    className="btn w-100 login-btn"
                    type="submit"
                    style={{
                      backgroundColor: "#2d4495",
                      color: "#fff",
                      border: "none",
                      fontWeight: "bold",
                      borderRadius: "10px",
                    }}
                  >
                    {t("login.signIn")}
                  </button>

                  <div className="register-link text-center">
                    <p style={{ fontWeight: "bold" }}>
                      {t("login.noAccount")}{" "}
                      <Link
                        className="forgot-link"
                        to="/signup"
                        style={{ textDecoration: "none" }}
                      >
                        {t("login.signUp")}
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Login Section */}

      <Footer />
    </>
  );
};

export default Login;
