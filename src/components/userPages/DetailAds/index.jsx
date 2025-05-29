import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/FirebaseConfig";
import { db } from "../../Firebase/FirebaseConfig.jsx";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { loadStripe } from "@stripe/stripe-js";
import Footer from "../../home/footer/Footer";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Header from "../../home/header";

const stripePromise = loadStripe(
  "pk_test_51Oqyo3Ap5li0mnBdxJiCZ4k0IEWVbOgGvyMbYB6XVUqYh1yNUEnRiX4e5UO1eces9kf9qZNZcF7ybjxg7MimKmUQ00a9s60Pa1"
);

const DetailAds = () => {
  const MySwal = withReactContent(Swal);
  const parms = useLocation().pathname;
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [userId, setUserId] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // Loading state for uploads
  const [uploadProgress, setUploadProgress] = useState({ slot1: false, slot2: false, slot3: false }); // Track individual slot uploads

  // State for image previews and selected images for each slot
  const [imagePreviews, setImagePreviews] = useState({
    slot1: "https://via.placeholder.com/200x100?text=Ad+Slot+1",
    slot2: "https://via.placeholder.com/200x100?text=YOUR+AD+HERE",
    slot3: "https://via.placeholder.com/200x100?text=WE+ARE+BACK!",
  });

  // Form state
  const [formData, setFormData] = useState({
    slot1Url: "",
    slot2Url: "",
    slot3Url: "",
  });

  // State for fetched ads
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Get current user
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        console.log("User authenticated, userId:", user.uid);
      } else {
        console.log("No user authenticated, redirecting to login");
        navigate("/login");
      }
    });

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [parms]);

  // Fetch ads from AdsdetailImages
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "AdsdetailImages"));
        const adsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched Ads from AdsdetailImages:", adsList);
        setAds(adsList);
      } catch (error) {
        console.error("Error fetching ads:", error);
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch ads.",
        });
      }
    };

    fetchAds();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = async (e, slot) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      MySwal.fire({
        icon: "error",
        title: "Invalid file type",
        text: "Please upload a PNG, JPG, or JPEG file.",
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      MySwal.fire({
        icon: "error",
        title: "File too large",
        text: "File size must be less than 2MB.",
      });
      return;
    }

    if (!userId) {
      MySwal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "User not authenticated. Please log in.",
      });
      return;
    }

    // Set image preview for the specific slot
    setImagePreviews((prev) => ({
      ...prev,
      [slot]: URL.createObjectURL(file),
    }));

    // Start upload for this slot
    setUploadProgress((prev) => ({ ...prev, [slot]: true }));
    console.log(`Starting upload for ${slot}`);

    // Upload to Firebase Storage
    const storage = getStorage();
    const storageRef = ref(storage, `ads/${userId}/${slot}/${file.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log(`${slot} Image URL:`, downloadURL);

      // Update formData with the URL for the specific slot
      setFormData((prev) => {
        const newFormData = {
          ...prev,
          [`${slot}Url`]: downloadURL,
        };
        console.log(`Updated formData after ${slot} upload:`, newFormData);
        return newFormData;
      });
    } catch (error) {
      console.error(`Firebase Storage Upload Error for ${slot}:`, error);
      MySwal.fire({
        icon: "error",
        title: "Upload Failed",
        text: `Image upload to Firebase failed for ${slot}. Error: ${error.message}`,
      });
    } finally {
      // Mark this slot's upload as complete
      setUploadProgress((prev) => {
        const newProgress = { ...prev, [slot]: false };
        console.log(`Upload completed for ${slot}, uploadProgress:`, newProgress);
        // Check if all uploads are complete
        const allUploadsComplete = !Object.values(newProgress).some((status) => status);
        setIsUploading(!allUploadsComplete);
        console.log(`All uploads complete: ${allUploadsComplete}, isUploading: ${!allUploadsComplete}`);
        return newProgress;
      });
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    console.log("Form Data on Submit:", formData);
    if (!formData.slot1Url || !formData.slot2Url || !formData.slot3Url) {
      MySwal.fire({
        icon: "error",
        title: "Missing Images",
        text: `Please upload all three images. Missing: ${
          !formData.slot1Url ? "Slot 1" : ""
        } ${!formData.slot2Url ? "Slot 2" : ""} ${
          !formData.slot3Url ? "Slot 3" : ""
        }`,
      });
      return;
    }

    if (!userId) {
      MySwal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "You must be logged in to submit ads.",
      });
      return;
    }

    try {
      const adData = {
        userId,
        slot1Url: formData.slot1Url,
        slot2Url: formData.slot2Url,
        slot3Url: formData.slot3Url,
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "AdsdetailImages"), adData);
      MySwal.fire({
        icon: "success",
        title: "Success",
        text: "Advertisement submitted successfully!",
      });

      // Reset form
      setFormData({
        slot1Url: "",
        slot2Url: "",
        slot3Url: "",
      });
      setImagePreviews({
        slot1: "https://via.placeholder.com/200x100?text=Ad+Slot+1",
        slot2: "https://via.placeholder.com/200x100?text=YOUR+AD+HERE",
        slot3: "https://via.placeholder.com/200x100?text=WE+ARE+BACK!",
      });
    } catch (error) {
      console.error("Error submitting ad:", error);
      MySwal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Failed to submit advertisement.",
      });
    }
  };

  return (
    <>
      <div className="main-wrapper">
        <Header />
        <div
          className="dashboard-content"
          style={{
            marginTop: "5rem",
          }}
        >
          <div className="container">
            <div className="mt-1">
              <ul className="dashborad-menus">
                <li>
                  <Link to="/dashboard">
                    <i className="feather-grid" /> <span>Dashboard</span>
                  </Link>
                </li>
                <li>
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
                    <i className="fas fa-solid fa-heart" />{" "}
                    <span>Favourite</span>
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
            {/* Form Section */}
            <div
              style={{
                display: "flex",
                width: "100%",
                gap: "30px",
                marginBottom: "30px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  width: "100%",
                  maxWidth: "1420px",
                  margin: "0 auto",
                }}
              >
                <div
                  style={{
                    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                    padding: "10px 20px",
                    borderRadius: "10px 10px 0 0",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  Update Detail Page Advertisements
                </div>
                <div style={{ padding: "20px" }}>
                  <p style={{ marginBottom: "20px" }}>
                    Upload three high-quality images to display on your details page
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      marginBottom: "20px",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* Ad Slot 1 */}
                    <div
                      style={{
                        flex: "1",
                        minWidth: "200px",
                        border: "2px dashed #ccc",
                        borderRadius: "10px",
                        padding: "20px",
                        textAlign: "center",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      <img
                        src={imagePreviews.slot1}
                        alt="Ad Slot 1"
                        style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "5px" }}
                      />
                      <button
                        onClick={() => document.getElementById("slot1Input").click()}
                        style={{
                          backgroundColor: "#007bff",
                          color: "white",
                          padding: "5px 10px",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginTop: "10px",
                        }}
                      >
                        Change Image
                      </button>
                      <input
                        type="file"
                        id="slot1Input"
                        style={{ display: "none" }}
                        onChange={(e) => handleImageUpload(e, "slot1")}
                        accept="image/png, image/jpeg, image/jpg"
                      />
                      <p style={{ marginTop: "10px", fontWeight: "bold" }}>Ad Slot 1</p>
                      <p style={{ color: "green", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                        <span>✔</span> {formData.slot1Url ? "Image selected" : "No image selected"}
                      </p>
                    </div>
                    {/* Ad Slot 2 */}
                    <div
                      style={{
                        flex: "1",
                        minWidth: "200px",
                        border: "2px dashed #ccc",
                        borderRadius: "10px",
                        padding: "20px",
                        textAlign: "center",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      <img
                        src={imagePreviews.slot2}
                        alt="Ad Slot 2"
                        style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "5px" }}
                      />
                      <button
                        onClick={() => document.getElementById("slot2Input").click()}
                        style={{
                          backgroundColor: "#007bff",
                          color: "white",
                          padding: "5px 10px",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginTop: "10px",
                        }}
                      >
                        Change Image
                      </button>
                      <input
                        type="file"
                        id="slot2Input"
                        style={{ display: "none" }}
                        onChange={(e) => handleImageUpload(e, "slot2")}
                        accept="image/png, image/jpeg, image/jpg"
                      />
                      <p style={{ marginTop: "10px", fontWeight: "bold" }}>Ad Slot 2</p>
                      <p style={{ color: "green", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                        <span>✔</span> {formData.slot2Url ? "Image selected" : "No image selected"}
                      </p>
                    </div>
                    {/* Ad Slot 3 */}
                    <div
                      style={{
                        flex: "1",
                        minWidth: "200px",
                        border: "2px dashed #ccc",
                        borderRadius: "10px",
                        padding: "20px",
                        textAlign: "center",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      <img
                        src={imagePreviews.slot3}
                        alt="Ad Slot 3"
                        style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "5px" }}
                      />
                      <button
                        onClick={() => document.getElementById("slot3Input").click()}
                        style={{
                          backgroundColor: "#007bff",
                          color: "white",
                          padding: "5px 10px",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginTop: "10px",
                        }}
                      >
                        Change Image
                      </button>
                      <input
                        type="file"
                        id="slot3Input"
                        style={{ display: "none" }}
                        onChange={(e) => handleImageUpload(e, "slot3")}
                        accept="image/png, image/jpeg, image/jpg"
                      />
                      <p style={{ marginTop: "10px", fontWeight: "bold" }}>Ad Slot 3</p>
                      <p style={{ color: "green", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                        <span>✔</span> {formData.slot3Url ? "Image selected" : "No image selected"}
                      </p>
                    </div>
                  </div>
                  <p style={{ marginBottom: "10px", color: "#555" }}>
                    ALL THREE IMAGES ARE REQUIRED FOR THE AD DISPLAY
                  </p>
                  <button
                    onClick={handleSubmit}
                    disabled={isUploading}
                    style={{
                      backgroundColor: isUploading ? "#ccc" : "#007bff",
                      color: "white",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: isUploading ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>↑</span> {isUploading ? "Uploading..." : "Submit Images"}
                  </button>
                  <p style={{ marginTop: "10px", color: "#777", fontSize: "14px" }}>
                    Recommended image size: 1200 x 675 pixels (16:9 ratio)
                  </p>
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

export default DetailAds;