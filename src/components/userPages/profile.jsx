import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { profile_img } from "../imagepath";
import Header from "../home/header";
import Footer from "../home/footer/Footer";
import UserHeader from "./Userheader";
import {
  onAuthStateChanged,
  reauthenticateWithCredential,
  updateProfile,
  updatePassword,
  deleteUser,
  EmailAuthProvider,
} from "firebase/auth";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { getDatabase, ref, get, child } from "firebase/database";

import { db } from "./../Firebase/FirebaseConfig.jsx";
import { auth } from "./../Firebase/FirebaseConfig";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axios from "axios";
import { signOut } from "firebase/auth";

const Profile = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const handleLogout = async () => {
    try {
      await signOut(auth); // Logs out the user
      console.log("User logged out successfully!");
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert("User not logged in!");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      alert("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error("Error changing password:", error.message);
      alert("New password and Current password do not match!");
    }
  };

  const [userId, setUserId] = useState("");
  const [displayName, setdisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photoURL, setphotoURL] = useState("");
  const [creationTime, setcreationTime] = useState("");
  const [error, setError] = useState("");
  // useEffect(() => {
  //   if (auth.currentUser) {
  //     const uid = auth.currentUser.uid;
  //     const fetchData = async () => {
  //       const userDoc = await getDoc(doc(db, "users", uid));
  //       if (userDoc.exists()) {
  //         const data = userDoc.data();

  //         // ✅ Log the user data to console
  //         console.log("User Data:__________", data);

  //         setdisplayName(data.displayName || "");
  //         setEmail(data.email || "");
  //         setPhoneNumber(data.phoneNumber || "");
  //         setphotoURL(data.photoURL || "");
  //       } else {
  //         console.log("No user document found for UID:", uid);
  //       }
  //     };
  //     fetchData();
  //   } else {
  //     console.log("No authenticated user.");
  //   }
  // }, []);
  useEffect(() => {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      const fetchData = async () => {
        const dbRef = ref(getDatabase());

        try {
          const snapshot = await get(child(dbRef, `users/${uid}`));

          if (snapshot.exists()) {
            const data = snapshot.val();

            // ✅ Log the user data to console
            console.log("User Data from Realtime DB:", data);

            setdisplayName(data.displayName || "");
            setEmail(data.email || "");
            setPhoneNumber(data.phoneNumber || "");
            setphotoURL(data.photoURL || "");
          } else {
            console.log("No data available for UID:", uid);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchData();
    } else {
      console.log("No authenticated user.");
    }
  }, []);
  const handleDeleteUser = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.error("No user is logged in");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const { value: password } = await Swal.fire({
        title: "Enter your password",
        input: "password",
        inputPlaceholder: "Your password",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
      });

      if (!password) {
        Swal.fire("Cancelled", "Account deletion cancelled", "info");
        return;
      }

      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);

      await deleteUser(user);
      Swal.fire("Deleted!", "Your account has been deleted.", "success");

      navigate("/login");
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire("Error!", error.message, "error");
    }
  };

  const handleChangePassword = async (newPassword) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("User not logged in!");
        return;
      }

      await updatePassword(user, newPassword);
      alert("Password updated successfully!");
    } catch (error) {
      console.error("Error changing password:", error.message);
      alert(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User UID:", user);
        console.log("User Display Name:", user.displayName);
        console.log("User Display creationTime:", user.metadata.creationTime);

        setUserId(user.uid);
        setdisplayName(user.displayName || "");
        setEmail(user.email || "");
        setphotoURL(user.photoURL || "");
        setPhoneNumber(user.phoneNumber || "");
        setcreationTime(user.metadata.creationTime);
      } else {
        console.log("No user is logged in.");
      }
    });

    return () => unsubscribe();
  }, []);

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
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

      const uploadedUrl = response.data.secure_url;
      setphotoURL(uploadedUrl);

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { photoURL: uploadedUrl });
        console.log("User profile updated with new photo URL:", uploadedUrl);
      }

      console.log("Uploaded Image URL:", uploadedUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image.");
    }
  };

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      console.error("No authenticated user found.");
      return;
    }

    try {
      // Update only supported auth fields
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });

      // Update Firestore fields (including custom fields like phoneNumber)
      const userRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(
        userRef,
        {
          email,
          phoneNumber,
          displayName,
          photoURL,
          updatedAt: new Date(),
        },
        { merge: true }
      );

      console.log("Profile updated successfully!");
      Swal.fire({
        title: "Success!",
        text: "Profile Updated Successfully",
        icon: "success",
        timer: 1000,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update profile.",
        icon: "error",
      });
    }
  };

  return (
    <>
      <Header />
      <div
        className="dashboard-content"
        style={{
          marginTop: window.innerWidth <= 576 ? "4rem" : "6rem",
        }}
      >
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
                  <i className="fas fa-solid fa-heart" /> <span>Favourite</span>
                </Link>
              </li>
              <li>
                <Link to="/messages">
                  <i className="fa-solid fa-comment-dots" />{" "}
                  <span>Messages</span>
                </Link>
              </li>
              {/* <li>
                <Link to="/reviews">
                  <i className="fas fa-solid fa-star" /> <span>Reviews</span>
                </Link>
              </li> */}
              <li>
                <Link className="dropdown-item" to="#" onClick={handleLogout}>
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
                    <div
                      className="profile-photo"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: isSmallScreen
                          ? "center"
                          : "space-between",
                        flexDirection: isSmallScreen ? "column" : "row",
                        textAlign: isSmallScreen ? "center" : "left",
                      }}
                    >
                      <div
                        className="profile-img"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: isSmallScreen ? "10px 0" : "0",
                          gap: "10px",
                        }}
                      >
                        <div className="settings-upload-img">
                          <img src={photoURL} alt="profile" />
                        </div>
                        <div
                          className="settings-upload-btn"
                          style={{ margin: "px 0" }}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            name="image"
                            className="hide-input image-upload"
                            id="file"
                            onChange={handleImageChange}
                          />
                          <label htmlFor="file" className="file-upload">
                            Upload New Photo
                          </label>
                        </div>
                        <span>Max file size: 10 MB</span>
                      </div>
                      {/* <Link
                        to="#"
                        className="profile-img-del"
                        onClick={handleDeleteUser}
                        style={{
                          marginTop:
                            window.innerWidth <= 576 ? "-1rem" : "0rem",
                        }}>
                        <i className="feather-trash-2" />
                      </Link> */}
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
                              <i
                                className="feather-user"
                                style={{ color: "#2d4495" }}
                              />
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
                                Email Address
                              </label>
                              <div className="group-img">
                                <i
                                  className="feather-mail"
                                  style={{ color: "#2d4495" }}
                                />
                                <input
                                  type="text"
                                  className="form-control"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <label className="col-form-label">
                                Phone Number
                              </label>
                              <div className="group-img">
                                <i
                                  className="feather-phone"
                                  style={{ color: "#2d4495" }}
                                />
                                <input
                                  type="tel"
                                  className="form-control"
                                  value={phoneNumber}
                                  onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                  }
                                  placeholder="Enter phone number"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="updatedel_wrap">
                          <button type="submit" className="blue_btn list_btn">
                            Update Profile
                          </button>
                          <Link
                            to="#"
                            className="blue_btn list_btn"
                            onClick={handleDeleteUser}
                          >
                            <i
                              style={{
                                marginRight: "3px",
                              }}
                              className="feather-trash-2"
                            />
                            <span>Delete Profile</span>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="profile-sidebar">
                  <div className="card">
                    <div className="card-header">
                      <h4>Change Password</h4>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handlePasswordChange}>
                        <div className="form-group">
                          <label className="col-form-label">
                            Current Password
                          </label>
                          <div className="pass-group group-img">
                            <span className="lock-icon">
                              <i
                                className="feather-lock"
                                style={{ color: "#2d4495" }}
                              />
                            </span>
                            <input
                              type="password"
                              className="form-control pass-input"
                              placeholder="Current Password"
                              value={currentPassword}
                              onChange={(e) =>
                                setCurrentPassword(e.target.value)
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-form-label">New Password</label>
                          <div className="pass-group group-img">
                            <span className="lock-icon">
                              <i
                                className="feather-lock"
                                style={{ color: "#2d4495" }}
                              />
                            </span>
                            <input
                              type={passwordType}
                              className="form-control pass-input"
                              placeholder="New Password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              required
                            />
                            <span
                              className={`toggle-password ${
                                passwordType === "password"
                                  ? "feather-eye"
                                  : "feather-eye-off"
                              }`}
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
                              <i
                                className="feather-lock"
                                style={{ color: "#2d4495" }}
                              />
                            </span>
                            <input
                              type={passwordType}
                              className="form-control pass-input"
                              placeholder="Confirm New Password"
                              value={confirmNewPassword}
                              onChange={(e) =>
                                setConfirmNewPassword(e.target.value)
                              }
                              required
                            />
                            <span
                              className={`toggle-password ${
                                passwordType === "password"
                                  ? "feather-eye"
                                  : "feather-eye-off"
                              }`}
                              onClick={togglePassword}
                            />
                          </div>
                        </div>
                        <button
                          className="btn"
                          type="submit"
                          style={{
                            backgroundColor: "#2d4495",
                            color: "white",
                          }}
                        >
                          Change Password
                        </button>
                      </form>
                    </div>
                  </div>
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

export default Profile;
