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
import { addDoc, collection, updateDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./../Firebase/FirebaseConfig.jsx";
import { auth } from "./../Firebase/FirebaseConfig"; // Ensure the correct Firebase import
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axios from "axios";
const Profile = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  // const handlePasswordChange = (evnt) => {
  //   setPasswordInput(evnt.target.value);
  // };
  // const [userId, setUserId] = useState(""); // State for image preview
  // const [error, setError] = useState(""); // ✅ Error state
  // const [isChecked, setIsChecked] = useState(false);
  // const [displayName, setdisplayName] = useState(""); // State for image preview
  // const [photoURL, setphotoURL] = useState(""); // State for image preview
  // const [creationTime, setcreationTime] = useState(""); // State for image preview
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
      alert(error.message);
    }
  };
  const [userId, setUserId] = useState("");
  const [displayName, setdisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photoURL, setphotoURL] = useState("");
  const [creationTime, setcreationTime] = useState("");
  const [error, setError] = useState("");
  const handleDeleteUser = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.error("No user is logged in");
      return;
    }

    // Ask user to confirm deletion
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
      // Ask user for password before re-authenticating
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

      // Re-authenticate the user
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);

      // Now delete the user
      await deleteUser(user);
      Swal.fire("Deleted!", "Your account has been deleted.", "success");

      // Redirect to login page
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
        console.log("User UID:", user.uid);
        console.log("User Display Name:", user.displayName);
        console.log("User Display creationTime:", user.metadata.creationTime);

        setUserId(user.uid);
        setdisplayName(user.displayName || "");
        setEmail(user.email || "");
        setphotoURL(user.photoURL || "");
        setcreationTime(user.metadata.creationTime);
      } else {
        console.log("No user is logged in.");
      }
    });

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUserId(user.uid);
  //       setDisplayName(user.displayName || "");
  //       setPhotoURL(user.photoURL || "");
  //       setCreationTime(user.metadata.creationTime);
  //       setEmail(user.email || "");
  //       setPhoneNumber(user.phoneNumber || "");
  //     } else {
  //       console.log("No user is logged in.");
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dlfdvlmse"); // Replace with your actual preset
    formData.append("cloud_name", "dlfdvlmse"); // Replace with your actual cloud name

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dlfdvlmse/image/upload",
        formData
      );

      const uploadedUrl = response.data.secure_url;
      setphotoURL(uploadedUrl); // Update the state with the URL

      // Update Firebase user profile
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
  // const handleUpdate = async (e) => {
  //   e.preventDefault();

  //   if (!auth.currentUser) {
  //     console.error("No authenticated user found.");
  //     return;
  //   }

  //   try {
  //     // Update Firebase Authentication profile
  //     await updateProfile(auth.currentUser, {
  //       displayName,
  //       photoURL, // Only these fields can be updated in Firebase Auth
  //     });

  //     // Store the phone number separately in Firestore
  //     const userRef = doc(db, "users", auth.currentUser.uid);
  //     await setDoc(userRef, { phoneNumber, email }, { merge: true });

  //     console.log("Profile updated successfully!");
  //     Swal.fire({
  //       title: "Success!",
  //       text: "Profile Updated Successfully",
  //       icon: "success",
  //       timer: 1000,
  //     });
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //     Swal.fire({
  //       title: "Error!",
  //       text: "Failed to update profile.",
  //       icon: "error",
  //     });
  //   }
  // };
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      console.error("No authenticated user found.");
      return;
    }

    try {
      // Update Firebase Authentication profile
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });

      // Save phoneNumber separately in Firestore
      const userRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(userRef, { phoneNumber, email }, { merge: true });

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
          marginTop: "8rem",
        }}
      >
        <div className="container">
          <div class="col-12 text-start text-dark " style={{fontSize:26,fontWeight:500}}>Home / Profile</div>

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
              {/* <li>
                <Link to="/bookmarks">
                  <i className="fas fa-solid fa-heart" /> <span>Favourite</span>
                </Link>
              </li> */}
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
          {/* <div className="login-content"> */}
          {/* <div class="container breadcrumb mt-4  mt-4 d-flex justify-content-start align-items-start">
            <div class="row">
              <div class="col-12 text-start text-dark ">Home / Profile</div>
            </div>
           </div> */}
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
                          <img src={photoURL} alt="profile" />
                        </div>
                        <div className="settings-upload-btn">
                          <input
                            type="file"
                            accept="image/*"
                            name="image"
                            className="hide-input image-upload"
                            id="file"
                            onChange={handleImageChange} // Handle file selection
                          />
                          <label htmlFor="file" className="file-upload">
                            Upload New Photo
                          </label>
                        </div>
                        <span>Max file size: 10 MB</span>
                      </div>
                      <Link
                        to="#"
                        className="profile-img-del"
                        onClick={handleDeleteUser}
                      >
                        <i className="feather-trash-2" />
                      </Link>
                      {/* <button
                        onClick={() =>
                          handleChangePassword("newSecurePassword123!")
                        }
                      >
                        Change Password
                      </button> */}
                    </div>

                    <div className="profile-form">
                      <form onSubmit={handleUpdate}>
                        {error && <p className="text-red-500">{error}</p>}

                        <div className="form-group">
                          <label className="col-form-label">
                            Your Full Name
                          </label>
                          <div className="pass-group group-img">
                            <span className="lock-icon" >
                              <i className="feather-user"style={{color:"#2d4495"}} />
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
                                <i className="feather-mail" style={{color:"#2d4495"}}/>
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

                        <button type="submit" className="btn "style={{backgroundColor:"#2d4495",color:"white"}}>
                          Update Profile
                        </button>
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
                              <i className="feather-lock" style={{color:"#2d4495"}}/>
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
                              <i className="feather-lock" style={{color:"#2d4495"}} />
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
                              <i className="feather-lock" style={{color:"#2d4495"}}/>
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

                        <button className="btn" type="submit" style={{backgroundColor:"#2d4495",color:"white"}}>
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
      {/* /Profile Content */}
      <Footer />
    </>
  );
};
export default Profile;
