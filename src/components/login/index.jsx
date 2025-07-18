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
import QRcode from "../../../public/QR.jpg";
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
const Login = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  // State for email & password
  const [email, setEmail] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
      setError1("Please enter a valid KSA phone number (+9665xxxxxxxx)");
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
        title: "Login Successful",
        text: `Welcome back!`,
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message);

      await MySwal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message || "An error occurred during login.",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
          <div className="row">
            {/* Left Column: QR Code Section */}

            <div className="col-md-6 col-lg-6 ">
              <div className="login-wrap">
                <div className="login-header">
                  <h3>Log in</h3>
                  <p>
                    Welcome Back.Keep using our great features and find what you
                    need.
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
                          backgroundColor: "#f0f4ff",
                          padding: "5px 10px",
                          boxSizing: "border-box",
                          width: "100%", // Ensure the container takes full width
                        }}
                      >
                        <input
                          type="tel"
                          id="phoneNumber"
                          value={phoneNumber}
                          onChange={handlePhoneNumberChange1}
                          placeholder="05XXXXXXXX"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          required
                          style={{
                            flex: 1, // Allow the input to grow and fill the space
                            border: "none", // Remove border to match the container
                            outline: "none", // Remove outline
                            backgroundColor: "transparent", // Match background with container
                          }}
                        />
                      </div>
                      {error1 && (
                        <p className="text-red-500 text-sm mt-1">{error1}</p>
                      )}

                      {/* <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+965"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      /> */}
                    </div>

                    <style>
                      {`
      /* For Chrome, Edge, and Safari */
      input[type="number"]::-webkit-inner-spin-button,
      input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* For Firefox */
      input[type="number"] {
        -moz-appearance: textfield;
      }

      /* Placeholder styling */
      input::placeholder {
        color: #999;
      }
    `}
                    </style>
                  </div>
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
                        backgroundColor: "#f0f4ff",
                        padding: "5px 10px",
                        width: "100%",
                        boxSizing: "border-box",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          marginRight: "10px",
                          fontSize: "16px",
                          color: "#2d4495",
                        }}
                      >
                        🔒
                      </span>
                      <input
                        className="mt-1 block w-full px-0 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        type={passwordType}
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
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

                      <span
                        onClick={togglePassword}
                        style={{
                          marginLeft: "10px",
                          fontSize: "16px",
                          color: "#2d4495",
                          cursor: "pointer",
                        }}
                      >
                        {passwordType === "password" ? "👁️" : "👁️‍🗨️"}
                      </span>
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
                        Forgot your password?
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
                      borderRadius: 50,
                    }}
                  >
                    Sign in
                  </button>

                  <div className="register-link text-center">
                    <p style={{ fontWeight: "bold" }}>
                      Don't have an account?{" "}
                      <Link
                        className="forgot-link"
                        to="/signup"
                        style={{ textDecoration: "none" }}
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <div className="qr-section " style={{ position: "relative" }}>
                {/* QR Code with Phone Border */}
                <div
                  style={{
                    position: "relative",
                    padding: 20,
                    width: "300px",
                    height: "300px",
                    margin: "0 auto 20px",
                    background: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e0e0e0", // Simulates the phone border
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* QR Code Image */}
                  <img
                    src={QRcode}
                    alt="QR Code"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                    }}
                  />
                </div>

                {/* Text Section */}
                <div
                  style={{ color: "black", fontWeight: "bold", fontSize: 26 }}
                >
                  Login with QR Code
                </div>
                <ol
                  style={{
                    listStyle: "none", // Remove default numbering
                    paddingLeft: "0", // Remove default padding
                    color: "#666", // Text color
                    textAlign: "left", // Align text to the left
                  }}
                >
                  <li
                    style={{
                      display: "flex", // Use flexbox to align badge and text
                      alignItems: "center", // Vertically center the badge and text
                      marginBottom: "10px", // Space between list items
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex", // Center the number in the badge
                        justifyContent: "center",
                        alignItems: "center",
                        width: "24px", // Badge size
                        height: "24px",
                        backgroundColor: "#fff", // White background for the badge
                        border: "1px solid #ccc", // Light gray border
                        borderRadius: "20%", // Circular shape
                        marginRight: "10px", // Space between badge and text
                        fontSize: "14px", // Number size
                        color: "#666", // Number color
                        fontWeight: "bold", // Bold number
                      }}
                    >
                      1
                    </span>
                    Open 4Sale on your phone.
                  </li>
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "24px",
                        height: "24px",
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "20%",
                        marginRight: "10px",
                        fontSize: "14px",
                        color: "#666",
                        fontWeight: "bold",
                      }}
                    >
                      2
                    </span>
                    Tap Profile and scroll to Settings.
                  </li>
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "24px",
                        height: "24px",
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "20%",
                        marginRight: "10px",
                        fontSize: "14px",
                        color: "#666",
                        fontWeight: "bold",
                      }}
                    >
                      3
                    </span>
                    Tap Web QR.
                  </li>
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "24px",
                        height: "24px",
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "20%",
                        marginRight: "10px",
                        fontSize: "14px",
                        color: "#666",
                        fontWeight: "bold",
                      }}
                    >
                      4
                    </span>
                    Scan the QR code above.
                  </li>
                </ol>
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
