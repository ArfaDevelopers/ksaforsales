import React, { useState } from "react";
import Header from "../home/header";
import Footer from "../home/footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

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
        setMessage("OTP sent successfully!");
      } else {
        setMessage(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending OTP");
    }
  };

  const verifyAndUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
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
        setMessage("Password updated successfully!");
        setStep(1);
        setPhoneNumber("");
        setOtp("");
        setNewPassword("");
      } else {
        setMessage(res.data.message || "Failed to update password");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error updating password");
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

                {message && <div className="alert alert-info">{message}</div>}

                {step === 1 && (
                  <form onSubmit={sendOtp}>
                    <div className="form-group group-img">
                      <i className="feather-phone" />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone Number (e.g. +9665xxxxxxxx)"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      className="btn btn-primary w-100 login-btn"
                      style={{
                        boxShadow: "unset",
                        color: "#fff",
                        backgroundColor: "#2d4495",
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
