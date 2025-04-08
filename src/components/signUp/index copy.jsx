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

  // // Handle form submission
  // const handleSignup = async (e) => {
  //   try {
  //     // Check if the mobile number is already registered
  //     const q = query(
  //       collection(db, "users"),
  //       where("mobileNumber", "==", mobileNumber)
  //     );
  //     const querySnapshot = await getDocs(q);

  //     if (!querySnapshot.empty) {
  //       alert("This mobile number is already associated with an account.");
  //       return;
  //     }

  //     // Create user in Firebase Authentication
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     const user = userCredential.user;

  //     // Store user details in Firestore
  //     await addDoc(collection(db, "users"), {
  //       uid: user.uid,
  //       fullName,

  //       email,
  //       mobileNumber, // Store mobile number in Firestore
  //       createdAt: new Date(),
  //     });

  //     alert("Account created successfully!");
  //     navigate("/login"); // Redirect after signup
  //   } catch (error) {
  //     console.error("Error signing up:", error.message);
  //     alert(error.message);
  //   }
  // };
  // Handle form submission
  console.log(imgUrl, "fullName____________1");
  console.log(mobileNumber, "fullName____________2");
  console.log(fullName, "fullName____________3");

  // const handleSignup = async (e) => {
  //   if (e) e.preventDefault(); // Only call if event exists

  //   try {
  //     const q = query(
  //       collection(db, "users"),
  //       where("mobileNumber", "==", mobileNumber)
  //     );
  //     const querySnapshot = await getDocs(q);

  //     if (!querySnapshot.empty) {
  //       alert("This mobile number is already associated with an account.");
  //       return;
  //     }

  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     const user = userCredential.user;

  //     if (user) {
  //       await setDoc(doc(db, "users", user.uid), {
  //         uid: user.uid,
  //         fullName,
  //         email,
  //         mobileNumber,
  //         imgUrl,
  //         createdAt: new Date(),
  //       });

  //       alert("Account created successfully!");
  //       navigate("/login");
  //     }
  //   } catch (error) {
  //     console.error("Error signing up:", error.message);
  //     alert(error.message);
  //   }
  // };

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Handle image upload if provided
      // if (imageUpload) {
      //   const imageRef = ref(
      //     storage,
      //     `images/${imageUpload.name + Date.now()}`
      //   );
      //   await uploadBytes(imageRef, imageUpload);
      //   imgUrl = await getDownloadURL(imageRef);
      // }

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

      // Save user details in Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        displayName: fullName,
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
      {/* <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">Create an Account</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/index">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Register
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div> */}

      <div className="login-content" style={{ marginTop: "15%" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-5 mx-auto">
              <div className="login-wrap register-form">
                <div className="login-header">
                  <h3>Create an Account</h3>
                  <p>
                    Let's start with <span>Listee</span>
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
                  {/* <div className="form-group group-img imageForm"> */}
                  <div className="group-img imageForm1 form-group">
                    <i className="feather-file" />

                    {/* Input Field */}
                    {/* <div className="flex group-img gap-2"> */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                    />
                    {imgUrl && (
                      <img
                        style={{ width: "50%", height: "5rem" }}
                        // src={imgUrl}
                        src={imgUrl}
                        alt="Preview"
                        className="w-12 h-12 object-cover border border-gray-300 rounded"
                      />
                    )}
                    {/* </div> */}
                    {/* </div> */}
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

                  {/* <div className="form-group group-img">
                    <div className="group-img">
                      <i className="feather-phone" />
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Mobile Number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                      />
                    </div>
                  </div> */}
                  <div className="form-group group-img">
                    <div className="group-img">
                      <i className="feather-phone" />
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Mobile Number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                      />
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

                  {/* <button
                    className="btn btn-primary w-100 login-btn"
                    type="submit"
                  >
                    Create Account
                  </button> */}

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
                    <img src="/apple.png" className="me-1" alt="Apple" />
                    Sign in with Apple
                  </Link>
                </div>

                <div className="social-login">
                  <Link to="#" className="btn btn-google w-100">
                    <img src="/google.png" className="me-1" alt="Google" />
                    Sign in with Google
                  </Link>
                </div>

                <div className="social-login">
                  <Link to="#" className="btn btn-facebook w-100 mb-0">
                    <img src="/facebook.png" className="me-2" alt="Facebook" />
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
