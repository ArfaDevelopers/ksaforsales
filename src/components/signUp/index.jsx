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
import { db, auth, storage } from "../Firebase/FirebaseConfig.jsx"; // Ensure correct Firebase import
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import storage functions
import { apple, facebook, google } from "../imagepath";
import { FaApple } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();

  const [passwordType, setPasswordType] = useState("password");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState(""); // New state for mobile number
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [imgUrl, setImgUrl] = useState(""); // Store a single image URL
  const [imageFile, setImageFile] = useState(null); // Store a single file
  const [Saudinummsg, setSaudinummsg] = useState(null); // Store a single file

  const handleMobileChange = (e) => {
    let input = e.target.value;

    // Allow typing numbers and "+"
    if (/^[\d+]*$/.test(input)) {
      setMobileNumber(input);
    }
  };

  const validateNumber = () => {
    const saudiNumberRegex = /^\+9665\d{8}$/; // Saudi number pattern
    if (mobileNumber && !saudiNumberRegex.test(mobileNumber)) {
      setSaudinummsg("Please enter valid Saudi like +9665XXXXXXXX");
      setMobileNumber(""); // Clear invalid input
    }
  };
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dlfdvlmse");
    formData.append("cloud_name", "dlfdvlmse");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dlfdvlmse/image/upload",
        formData
      );
      setImgUrl(response.data.secure_url); // Save the image URL
      console.log("Image uploaded successfully:", response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image.");
    }
  };

  // Handle file selection for images
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      handleImageUpload(file); // Upload the selected file
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

  // Call this function when needed (e.g., on component mount)
  // Send OTP
  const sendOtp = async () => {
    if (!mobileNumber) {
      alert("Please enter your mobile number");
      return;
    }

    try {
      const response = await fetch(
        // "https://ksaforsaleapis.vercel.app/route/send-otp",
        // "https://ksaforsaleapis.vercel.app/route/send-otp",
        "http://localhost:9002/route/send-otp",

        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: mobileNumber }),
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

  // Verify OTP
  const verifyOtp = async (event) => {
    event.preventDefault(); // Ensure it receives the event

    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      const response = await fetch("http://localhost:9002/route/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: mobileNumber, code: otp }),
      });

      const data = await response.json();
      if (data.success) {
        handleSignup(event); // Pass event to handleSignup
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to verify OTP");
    }
  };

  console.log(imgUrl, "fullName____________1");
  console.log(mobileNumber, "fullName____________2");
  console.log(fullName, "fullName____________3");

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Check if the mobile number is already in use
      const q = query(
        collection(db, "users"),
        where("phoneNumber", "==", mobileNumber)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("This mobile number is already associated with an account.");
        return;
      }
      console.log(querySnapshot, "querySnapshot");
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update user profile in Firebase Authentication
      await updateProfile(user, {
        displayName: fullName,
        photoURL: imgUrl,
        phoneNumber: mobileNumber,
      });
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        fullName: fullName, // Use fullName instead of displayName
        email,
        phoneNumber: mobileNumber,
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

      <div className="login-content" style={{ marginTop: "8rem" }}>
        <div class="container breadcrumb mt-4  mt-4 d-flex justify-content-start align-items-start">
          <div class="row">
            <div class="col-12 text-start text-dark ">Home / Register</div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-5 mx-auto">
              <div className="login-wrap register-form">
                <div className="login-header">
                  <h3>Create an Account</h3>
                  <p>
                    Let's start with <span>KSA4Sale</span>
                  </p>
                </div>

                <form onSubmit={handleSignup}>
                  <div className="form-group group-img">
                    <div className="group-img">
                      <i className="feather-user" />
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
                  <div className="group-img imageForm1 form-group">
                    <i className="feather-file" />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                    />
                    {imgUrl && (
                      <img
                        style={{ width: "50%", height: "5rem" }}
                        src={imgUrl}
                        alt="Preview"
                        className="w-12 h-12 object-cover border border-gray-300 rounded"
                      />
                    )}
                  </div>
                  <div className="form-group group-img">
                    <div className="group-img">
                      <i className="feather-mail" />
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

                  <div className="form-group group-img">
                    <div className="group-img">
                      <i className="feather-phone" />
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="+9665XXXXXXXX"
                        value={mobileNumber}
                        onChange={handleMobileChange}
                        onBlur={validateNumber} // Validate when user leaves input
                        required
                      />
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {Saudinummsg}
                      </p>
                    </div>
                  </div>

                  {!otpSent ? (
                    <button
                      type="button"
                      className="btn btn-secondary w-100"
                      onClick={sendOtp}
                    >
                      Send OTP
                    </button>
                  ) : (
                    <>
                      <div className="form-group group-img">
                        <div className="group-img">
                          <i className="feather-key" />
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

                      <div className="form-group">
                        <div className="pass-group group-img">
                          <i className="feather-lock" />
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
                    <p>
                      Already have an account?{" "}
                      <Link className="forgot-link" to="/login">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </form>

                <div className="login-or">
                  <span className="or-line" />
                  <span className="span-or">
                    Sign in with Social Media Accounts
                  </span>
                </div>

                <div className="social-login">
                  <Link to="#" className="btn btn-apple w-100">
                    <FaApple
                      style={{ marginBottom: "2px" }}
                      className="me-1"
                      alt="img"
                    />
                    Sign in with Apple
                  </Link>
                </div>

                <div className="social-login">
                  <Link to="#" className="btn btn-google w-100">
                    <img src={google} className="me-1" alt="Google" />
                    Sign in with Google
                  </Link>
                </div>

                <div className="social-login">
                  <Link to="#" className="btn btn-facebook w-100 mb-0">
                    <FaFacebookF
                      style={{ marginBottom: "2px" }}
                      className="me-1"
                      alt="img"
                    />
                    Continue with Facebook
                  </Link>
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
