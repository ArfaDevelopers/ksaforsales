import React, { useState,useEffect } from "react";
import Header from "../home/header";
import Footer from "../home/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { apple, facebook, google } from "../imagepath";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../Firebase/FirebaseConfig"; // Ensure correct Firebase import
import { FaApple } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  // State for email & password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [error, setError] = useState(null);

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
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Login failed:", error.message);
    }
  };

  return (
    <>
      <Header />
      {/* Breadcrumb Section */}
      {/* <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">Login</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/index">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Login
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div> */}
      {/* /Breadcrumb Section */}

      {/* Login Section */}

      <div className="login-content" style={{ marginTop: "8rem" ,marginLeft:"2rem" }}>
        <div class="container breadcrumb mt-4  mt-4 d-flex justify-content-start align-items-start">
          <div class="row">
            <div class="col-12 text-start text-dark ">Home / Login</div>
          </div>
        </div>
      </div>

      <div className="login-content" style={{ marginTop: "-6rem" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-5 mx-auto">
              <div className="login-wrap">
                <div className="login-header">
                  <h3>Welcome Back</h3>
                  <p>Please Enter your Details</p>
                </div>

                {/* Display Error Message if Any */}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Login Form */}
                <form onSubmit={handleLogin}>
                  <div className="form-group group-img">
                    <i className="feather-mail" style={{color:"#2d4495"}} />
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <div className="pass-group group-img">
                      <i className="feather-lock" style={{color:"#2d4495"}} />
                      <input
                        type={passwordType}
                        className="form-control pass-input"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
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
                  <div className="row">
                    <div className="col-md-6 col-sm-6">
                      <label className="custom_check">
                        <input
                          type="checkbox"
                          name="rememberme"
                          className="rememberme"
                        />
                        <span className="checkmark" />
                        Remember Me
                      </label>
                    </div>
                    <div className="col-md-6 col-sm-6 text-md-end">
                      <Link className="forgot-link" to="/forgot-password">
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                  <button
  className="btn w-100 login-btn"
  type="submit"
  style={{ backgroundColor: "#2d4495", color: "#fff", border: "none" }}
>
  Sign in
</button>

                  <div className="register-link text-center">
                    <p>
                      No account yet?{" "}
                      <Link className="forgot-link" to="/signup">
                        Signup
                      </Link>
                    </p>
                  </div>
                  {/* <div className="login-or">
                    <span className="or-line" />
                    <span className="span-or">
                      Sign in with Social Media Accounts
                    </span>
                  </div> */}
                  {/* <div className="social-login">
                    <Link to="#" className="btn btn-apple w-100">
                      <FaApple
                        style={{ marginBottom: "1px" }}
                        className="me-1"
                        alt="img"
                      />
                      Sign in with Apple
                    </Link>
                  </div> */}

                  {/* <div className="social-login">
                    <Link to="#" className="btn btn-google w-100">
                      <img src={google} className="me-1" alt="img" />
                      Sign in with Google
                    </Link>
                  </div> */}
                  {/* <div className="social-login">
                    <Link to="#" className="btn btn-facebook w-100 mb-0">
                      <FaFacebookF
                        style={{ marginBottom: "2px" }}
                        
                        className="me-1"
                        alt="img"
                      />
                      Continue with Facebook
                    </Link>
                  </div> */}
                </form>
                {/* /Login Form */}
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
