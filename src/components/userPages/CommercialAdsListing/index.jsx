import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/FirebaseConfig";
import { db } from "./../../Firebase/FirebaseConfig.jsx";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { Elements } from "@stripe/react-stripe-js";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Footer from "../../home/footer/Footer";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Header from "../../home/header";
import { loadStripe } from "@stripe/stripe-js";
import { signOut } from "firebase/auth";
import PaymentForm from "../AddLisiting/PaymentForm";
import { FaUserAlt, FaListUl, FaHeart, FaBullhorn } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { TbLogout2 } from "react-icons/tb";
import { useTranslation } from "react-i18next";

const stripePromise = loadStripe(
  "pk_test_51Oqyo3Ap5li0mnBdxJiCZ4k0IEWVbOgGvyMbYB6XVUqYh1yNUEnRiX4e5UO1eces9kf9qZNZcF7ybjxg7MimKmUQ00a9s60Pa1"
);

const CommercialAdsListing = () => {
  const { t } = useTranslation();
  const MySwal = withReactContent(Swal);
  const parms = useLocation().pathname;
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [Url, setUrl] = useState("");
  // State for image preview
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreviewMessage, setimagePreviewMessage] = useState(null);
  const [showPayment, setshowPayment] = useState(true); // Store a single URL, initially null
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [uid, setUid] = useState(null);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Logs out the user
      console.log("User logged out successfully!");
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    bannerImage: null,
  });

  // Get current user ID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [parms]);

  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "CommercialAdscom"));
        const adsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched Ads:____________", adsList);
        setAds(adsList);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    const fetchUserPhoneNumber = async () => {
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setFormData((prevData) => ({
            ...prevData,
            phone: userData.phoneNumber || "",
            whatsapp: userData.phoneNumber || "",
          }));
        }
      } catch (error) {}
    };

    fetchAds();
    fetchUserPhoneNumber();
  }, []);

  // Handle form input changes
  const [phoneError, setPhoneError] = useState("");
  const [whatsappError, setWhatsappError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Only allow digits and '+' for both fields
    if ((name === "phone" || name === "whatsapp") && !/^[+0-9]*$/.test(value)) {
      return; // Prevent invalid characters
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    const saudiPhoneRegex = /^\+9665\d{8}$/;

    if (name === "phone") {
      if (value && !saudiPhoneRegex.test(value)) {
        setPhoneError(
          t("commercialAdsForm.phoneError")
        );
      } else {
        setPhoneError("");
      }
    }

    if (name === "whatsapp") {
      if (value && !saudiPhoneRegex.test(value)) {
        setWhatsappError(
          t("commercialAdsForm.whatsappError")
        );
      } else {
        setWhatsappError("");
      }
    }
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      MySwal.fire({
        icon: "error",
        title: t("commercialAdsForm.invalidFileType"),
        text: t("commercialAdsForm.invalidFileTypeMessage"),
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      MySwal.fire({
        icon: "error",
        title: t("commercialAdsForm.fileTooLarge"),
        text: t("commercialAdsForm.fileTooLargeMessage"),
      });
      return;
    }

    // Set image preview
    setImagePreview(URL.createObjectURL(file));

    // Upload to Cloudinary
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("upload_preset", "ml_default"); // Replace this
    formDataUpload.append("cloud_name", "dv26wjoay");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dv26wjoay/image/upload",
        {
          method: "POST",
          body: formDataUpload,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        console.log("Cloudinary Image URL:", data.secure_url);
        setUrl(data.secure_url);
        setFormData((prev) => ({
          ...prev,
          bannerImage: file,
          cloudinaryUrl: data.secure_url,
        }));
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      MySwal.fire({
        icon: "error",
        title: t("commercialAdsForm.uploadFailed"),
        text: t("commercialAdsForm.uploadFailedMessage"),
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    if (!imagePreview && imagePreview === null) {
      setimagePreviewMessage(t("commercialAdsForm.uploadImageError"));
      return;
    }
    e.preventDefault();
    try {
      // Save the form data to the CommercialAdscom collection
      const listingData = {
        Title: formData.name,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        image: Url || null,
        timeAgo: new Date(),
        userId: uid,
      };

      console.log("Saving commercial ad with data:", listingData);
      await addDoc(collection(db, "CommercialAdscom"), listingData);
      console.log("Commercial ad saved successfully!");

      // Show success message and reset the form
      MySwal.fire({
        icon: "success",
        title: t("commercialAdsForm.listingCreated"),
        text: t("commercialAdsForm.listingCreatedMessage"),
      });

      setFormData({ name: "", phone: "", whatsapp: "", bannerImage: null });
      setImagePreview(null); // Reset image preview
      setUrl("");
    } catch (error) {
      console.error("Error saving listing:", error);
      MySwal.fire({
        icon: "error",
        title: t("commercialAdsForm.error"),
        text: t("commercialAdsForm.errorMessage"),
      });
    }
  };

  // Categories for dropdown
  const categories = [
    "Motor",
    "Electronics",
    "Fashion Style",
    "Home & Furniture",
    "Job Board",
    "Real Estate",
    "Services",
    "Sport & Game",
    "Pet & Animals",
    "Other",
    "Commercial",
  ];

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
                    <MdDashboard /> <span>{t("common.dashboard")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/profile">
                    <FaUserAlt /> <span>{t("common.profile")}</span>
                  </Link>
                </li>
                <li className="active">
                  <Link to="/my-listing">
                    <FaListUl /> <span>{t("common.myListing")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/manage-commercial-ads">
                    <FaBullhorn /> <span>{t("messages.commercialAds")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/bookmarks">
                    <FaHeart /> <span>{t("common.favourite")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/messages">
                    <TiMessages /> <span>{t("common.messages")}</span>
                  </Link>
                </li>
                {/* <li>
                             <Link to="/reviews">
                               <i className="fas fa-solid fa-star" /> <span>Reviews</span>
                             </Link>
                           </li> */}
                <li>
                  <Link className="dropdown-item" to="#" onClick={handleLogout}>
                    <TbLogout2 />
                    <span>{t("common.logout")}</span>
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
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "20px",
                    marginLeft: "-0.2rem",
                    color: "#333",
                  }}
                >
                  {t("commercialAdsForm.pageTitle")}
                </h3>
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "20px" }}>
                    <h4
                      style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        marginBottom: "10px",
                        color: "#333",
                      }}
                    >
                      {t("commercialAdsForm.basicInformation")}
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ flex: 1, minWidth: "200px" }}>
                        <label
                          ഗ
                          htmlFor="name"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "14px",
                            color: "#555",
                            marginBottom: "5px",
                          }}
                        >
                          <span
                            style={{ marginRight: "5px", color: "#007bff" }}
                          >
                            📋
                          </span>
                          {t("commercialAdsForm.category")}
                        </label>
                        <select
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                            fontSize: "14px",
                            color: "#333",
                          }}
                          required
                        >
                          <option value="" disabled>
                            {t("commercialAdsForm.selectCategory")}
                          </option>
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {t(`categories.${category.toLowerCase().replace(/\s+&\s+/g, '').replace(/\s+/g, '')}`)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div style={{ flex: 1, minWidth: "200px" }}>
                        <label
                          htmlFor="phone"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "14px",
                            color: "#555",
                            marginBottom: "5px",
                          }}
                        >
                          <span
                            style={{ marginRight: "5px", color: "#007bff" }}
                          >
                            📞
                          </span>
                          {t("commercialAdsForm.phone")}
                        </label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={t("commercialAdsForm.enterPhone")}
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: phoneError
                              ? "1px solid red"
                              : "1px solid #ddd",
                            borderRadius: "5px",
                            fontSize: "14px",
                            color: "#333",
                          }}
                          required
                        />
                        {phoneError && (
                          <p
                            style={{
                              color: "red",
                              fontSize: "12px",
                              marginTop: "5px",
                            }}
                          >
                            {t("commercialAdsForm.phoneError")}
                          </p>
                        )}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        flexWrap: "wrap",
                        marginTop: "1rem",
                      }}
                    >
                      <div style={{ flex: 1, minWidth: "200px" }}>
                        <label
                          htmlFor="whatsapp"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "14px",
                            color: "#555",
                            marginBottom: "5px",
                          }}
                        >
                          <span
                            style={{ marginRight: "5px", color: "#25D366" }}
                          >
                            💬
                          </span>
                          {t("commercialAdsForm.whatsapp")}
                        </label>
                        <input
                          type="text"
                          id="whatsapp"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          placeholder={t("commercialAdsForm.enterWhatsApp")}
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: whatsappError
                              ? "1px solid red"
                              : "1px solid #ddd",
                            borderRadius: "5px",
                            fontSize: "14px",
                            color: "#333",
                          }}
                          required
                        />
                        {whatsappError && (
                          <p
                            style={{
                              color: "red",
                              fontSize: "12px",
                              marginTop: "5px",
                            }}
                          >
                            {t("commercialAdsForm.whatsappError")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {showPayment && (
                    <Elements stripe={stripePromise}>
                      <PaymentForm getpaymentSuccess={setPaymentSuccess} />
                    </Elements>
                  )}
                  {/* Upload Banner Image */}
                  <div
                    style={{
                      marginBottom: "20px",
                      marginTop: "20px",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        marginBottom: "10px",
                        color: "#333",
                      }}
                    >
                      {t("commercialAdsForm.uploadBannerImage")}
                    </h4>
                    <div
                      style={{
                        border: "2px dashed #ddd",
                        borderRadius: "5px",
                        padding: "20px",
                        textAlign: "center",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      {imagePreview ? (
                        <div style={{ marginBottom: "10px" }}>
                          <img
                            src={imagePreview}
                            alt="Preview"
                            style={{
                              maxWidth: "100%",
                              maxHeight: "200px",
                              objectFit: "contain",
                              borderRadius: "5px",
                            }}
                          />
                          <p style={{ fontSize: "14px", color: "#555" }}>
                            {formData.bannerImage?.name}
                          </p>
                        </div>
                      ) : (
                        <>
                          <p
                            style={{
                              fontSize: "14px",
                              color: "#555",
                              marginBottom: "10px",
                            }}
                          >
                            {t("commercialAdsForm.clickToUpload")}
                          </p>
                          <p
                            style={{
                              fontSize: "12px",
                              color: "#777",
                              marginBottom: "10px",
                            }}
                          >
                            {t("commercialAdsForm.fileFormats")}
                          </p>
                        </>
                      )}
                      <label
                        htmlFor="bannerImage"
                        style={{
                          display: "inline-block",
                          padding: "10px 20px",
                          backgroundColor: "#f1f1f1",
                          borderRadius: "5px",
                          fontSize: "14px",
                          color: "#333",
                          cursor: "pointer",
                        }}
                      >
                        <span style={{ marginRight: "5px" }}>📤</span>
                        {t("commercialAdsForm.uploadImage")}
                      </label>
                      <input
                        type="file"
                        id="bannerImage"
                        name="bannerImage"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                    </div>
                    {imagePreviewMessage && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "14px",
                          marginTop: "10px",
                        }}
                      >
                        {t("commercialAdsForm.uploadImageError")}
                      </p>
                    )}
                  </div>
                  {/* {showPayment && ( */}

                  {/* )} */}
                  {/* Submit Button */}
                  <button
                    className="blue_btn"
                    disabled={
                      !formData.name ||
                      !formData.phone ||
                      !formData.whatsapp ||
                      !imagePreview
                      // ||
                      // !Url ||
                      // !paymentSuccess
                    }
                    type="submit"
                  >
                    {t("commercialAdsForm.addListing")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CommercialAdsListing;
