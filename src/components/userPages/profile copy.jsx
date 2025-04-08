import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { profile_img } from "../imagepath";
import Header from "../home/header";
import Footer from "../home/footer/Footer";
import UserHeader from "./Userheader";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "./../Firebase/FirebaseConfig.jsx";
import { auth } from "./../Firebase/FirebaseConfig"; // Ensure the correct Firebase import

const Profile = () => {
  const navigate = useNavigate();

  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const handlePasswordChange = (evnt) => {
    setPasswordInput(evnt.target.value);
  };
  // const [userId, setUserId] = useState(""); // State for image preview
  // const [error, setError] = useState(""); // ✅ Error state
  // const [isChecked, setIsChecked] = useState(false);
  // const [displayName, setdisplayName] = useState(""); // State for image preview
  // const [photoURL, setphotoURL] = useState(""); // State for image preview
  // const [creationTime, setcreationTime] = useState(""); // State for image preview

  const [userId, setUserId] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [creationTime, setCreationTime] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setDisplayName(user.displayName || "");
        setPhotoURL(user.photoURL || "");
        setCreationTime(user.metadata.creationTime);
        setEmail(user.email || "");
        setPhoneNumber(user.phoneNumber || "");
      } else {
        console.log("No user is logged in.");
      }
    });

    return () => unsubscribe();
  }, []);
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const token = await user.getIdToken();
  //       console.log("User ID Token:", token);
  //       console.log("User UID:", user.uid);
  //       console.log("User Display Name:", user.displayName); // Now it should not be null
  //       console.log("User Display creationTime:", user.metadata.creationTime); // Now it should not be null
  //       setcreationTime(user.metadata.creationTime);
  //       setdisplayName(user.displayName);
  //       setphotoURL(user.photoURL);

  //       setUserId(user.uid);
  //     } else {
  //       console.log("No user is logged in. Redirecting to /login...");
  //       // navigate("/login", { replace: true });
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [navigate]);
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Update Firebase Authentication profile
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });

      // Update Firestore User Data (If you're storing additional data in Firestore)
      if (userId) {
        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, {
          displayName,
          photoURL,
          phoneNumber,
          email,
        });
      }

      alert("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <UserHeader />
      {/* Breadscrumb Section */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">Profile</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Profile
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadscrumb Section */}
      {/* Profile Content */}
      <div className="dashboard-content">
        <div className="container">
          <div className="">
            <ul className="dashborad-menus">
              <li>
                <Link to="/dashboard">
                  <i className="feather-grid" /> <span>Dashboard</span>
                </Link>
              </li>
              <li className="active">
                <Link to="/profile">
                  <i className="fa-solid fa-user" /> <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/my-listing">
                  <i className="feather-list" /> <span>My Listing</span>
                </Link>
              </li>
              <li>
                <Link to="/bookmarks">
                  <i className="fas fa-solid fa-heart" /> <span>Bookmarks</span>
                </Link>
              </li>
              <li>
                <Link to="/messages">
                  <i className="fa-solid fa-comment-dots" />{" "}
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link to="/reviews">
                  <i className="fas fa-solid fa-star" /> <span>Reviews</span>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <i className="fas fa-light fa-circle-arrow-left" />{" "}
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="profile-content">
            <div className="row dashboard-info">
              <div className="col-lg-9">
                <div className="card dash-cards">
                  <div className="card-header">
                    <h4>Profile Details</h4>
                  </div>
                  <div className="card-body">
                    <div className="profile-photo">
                      <div className="profile-img">
                        <div className="settings-upload-img">
                          <img src={profile_img} alt="profile" />
                        </div>
                        <div className="settings-upload-btn">
                          <input
                            type="file"
                            accept="image/*"
                            name="image"
                            className="hide-input image-upload"
                            id="file"
                          />
                          <label htmlFor="file" className="file-upload">
                            Upload New photo
                          </label>
                        </div>
                        <span>Max file size: 10 MB</span>
                      </div>
                      <Link to="#" className="profile-img-del">
                        <i className="feather-trash-2" />
                      </Link>
                    </div>
                    <div className="profile-form">
                      <form onSubmit={handleUpdate}>
                        {error && <p className="text-red-500">{error}</p>}

                        <div className="form-group">
                          <label className="col-form-label">
                            Your Full Name
                          </label>
                          <div className="pass-group group-img">
                            <span className="lock-icon">
                              <i className="feather-user" />
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              value={displayName}
                              onChange={(e) => setdisplayName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <label className="col-form-label">
                                Phone Number
                              </label>
                              <div className="pass-group group-img">
                                <span className="lock-icon">
                                  <i className="feather-phone-call" />
                                </span>
                                <input
                                  type="tel"
                                  className="form-control"
                                  value={phoneNumber}
                                  onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <label className="col-form-label">
                                Email Address
                              </label>
                              <div className="group-img">
                                <i className="feather-mail" />
                                <input
                                  type="text"
                                  className="form-control"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <button type="submit" className="btn btn-primary">
                          Update Profile
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-3">
                <div className="profile-sidebar">
                  <div className="card">
                    <div className="card-header">
                      <h4>Change Password</h4>
                    </div>
                    <div className="card-body">
                      <form>
                        <div className="form-group">
                          <label className="col-form-label">
                            Current Password
                          </label>
                          <div className="pass-group group-img">
                            <span className="lock-icon">
                              <i className="feather-lock" />
                            </span>
                            <input
                              type="password"
                              className="form-control pass-input"
                              placeholder="Password"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-form-label">New Password</label>
                          <div className="pass-group group-img">
                            <span className="lock-icon">
                              <i className="feather-lock" />
                            </span>
                            <input
                              type={passwordType}
                              className="form-control pass-input"
                              defaultValue=".............."
                              onChange={handlePasswordChange}
                            />
                            <span
                              className={`toggle-password  ${
                                passwordType === "password"
                                  ? "feather-eye"
                                  : "feather-eye-off"
                              } `}
                              onClick={togglePassword}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-form-label">
                            Confirm New Password
                          </label>
                          <div className="pass-group group-img">
                            <span className="lock-icon">
                              <i className="feather-lock" />
                            </span>
                            <input
                              type={passwordType}
                              className="form-control pass-input"
                              defaultValue=".............."
                              onChange={handlePasswordChange}
                            />
                            <span
                              className={`toggle-password  ${
                                passwordType === "password"
                                  ? "feather-eye"
                                  : "feather-eye-off"
                              } `}
                              onClick={togglePassword}
                            />
                          </div>
                        </div>
                        <button className="btn btn-primary" type="submit">
                          {" "}
                          Change Password
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* /Profile Content */}
      <Footer />
    </>
  );
};
export default Profile;
