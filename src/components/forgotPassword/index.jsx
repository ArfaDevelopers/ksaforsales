import React, { useState } from "react";
import Header from "../home/header";
import Footer from "../home/footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const MySwal = withReactContent(Swal);

  const sendOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post(
        "http://168.231.80.24:9002/route/forgot-password/send-otp",
        {
          phoneNumber,
        }
      );
      if (res.data.success) {
        setStep(2);
        MySwal.fire({
          icon: "success",
          title: "OTP Sent",
          text: "OTP sent successfully!",
        });
      } else {
        MySwal.fire({
          icon: "error",
          title: "Failed",
          text: res.data.message || "Failed to send OTP",
        });
      }
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Error sending OTP",
      });
    }
  };

  const verifyAndUpdate = async (e) => {
    e.preventDefault();
    // setMessage("");
    if (!phoneNumber.trim()) {
      MySwal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in both phone number and password before updating.",
      });
      return;
    }
    try {
      const res = await axios.post(
        "http://168.231.80.24:9002/route/verifyChangepasswdotp",
        {
          phoneNumber,
          otp,
          newPassword,
        }
      );
      if (res.data.success) {
        // setMessage("Password updated successfully!");
        MySwal.fire({
          icon: "success",
          title: "Password Updated",
          text: "Your password has been updated successfully!",
        });
        setStep(1);
        setPhoneNumber("");
        setOtp("");
        setNewPassword("");
      } else {
        // setMessage(res.data.message || "Failed to update password");
        MySwal.fire({
          icon: "error",
          title: "Failed",
          text: res.data.message || "Failed to update password",
        });
      }
    } catch (err) {
      // setMessage(err.response?.data?.message || "Error updating password");
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Error updating password",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="login-content">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-5 mx-auto">
              <div className="login-wrap password-form">
                <div className="login-header">
                  <h3>Forgot Password</h3>
                  <p>
                    Enter your phone number to receive an OTP to reset your
                    password.
                  </p>
                </div>

                {/* {message && <div className="alert alert-info">{message}</div>} */}

                {step === 1 && (
                  <form onSubmit={sendOtp}>
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
                          +92
                        </span>
                      </span>
                      <input
                        type="text"
                        class
                        placeholder="Phone Number (XXXXXXXXXX)"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
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
                    <button
                      className="btn btn-primary w-100 login-btn"
                      style={{
                        boxShadow: "unset",
                        color: "#fff",
                        backgroundColor: "#2d4495",
                        marginTop: "10px"
                      }}
                      type="submit"
                    >
                      Send OTP
                    </button>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={verifyAndUpdate}>
                    <div className="form-group group-img">
                      <i className="feather-lock" />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="OTP Code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group group-img">
                      <i className="feather-key" />
                      <input
                        type="password"
                        className="form-control"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      className="btn btn-success w-100 login-btn"
                      type="submit"
                      style={{
                        boxShadow: "unset",
                        backgroundColor: "#28a745",
                        color: "#fff",
                      }}
                    >
                      Verify & Update Password
                    </button>
                  </form>
                )}

                <Link to="/" className="back-home mt-3 d-block text-center">
                  <i className="fas fa-arrow-left me-1" /> Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
