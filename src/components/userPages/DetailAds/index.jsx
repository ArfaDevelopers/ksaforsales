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
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  Spinner,
  Form,
  Alert,
} from "react-bootstrap";
import {
  FiUpload,
  FiImage,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";

const stripePromise = loadStripe(
  "pk_test_51Oqyo3Ap5li0mnBdxJiCZ4k0IEWVbOgGvyMbYB6XVUqYh1yNUEnRiX4e5UO1eces9kf9qZNZcF7ybjxg7MimKmUQ00a9s60Pa1"
);

const DetailAds = () => {
  const MySwal = withReactContent(Swal);
  const parms = useLocation().pathname;
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [userId, setUserId] = useState(null);

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

  const [selectedImages, setSelectedImages] = useState([null, null, null]);
  const [previews, setPreviews] = useState(["", "", ""]);
  const [uploading, setUploading] = useState(false);
  const [existingImageId, setExistingImageId] = useState(null);
  const [uploadProgress, setUploadProgress] = useState([0, 0, 0]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "AdsdetailImages"));
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0];
          setExistingImageId(docData.id);
          const urls = docData.data().imageUrls;
          if (Array.isArray(urls) && urls.length === 3) {
            setPreviews(urls);
          }
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        MySwal.fire("Error", "Failed to load existing images.", "error");
      }
    };
    fetchImages();
  }, []);

  const handleSingleImageChange = (index, file) => {
    const updatedImages = [...selectedImages];
    const updatedPreviews = [...previews];
    updatedImages[index] = file;
    updatedPreviews[index] = URL.createObjectURL(file);
    setSelectedImages(updatedImages);
    setPreviews(updatedPreviews);
  };
  const [isHovered, setIsHovered] = useState(false);
  const handleUpload = async () => {
    if (!previews.every((p) => p)) {
      MySwal.fire({
        icon: "error",
        title: "Missing Images",
        text: "All 3 image slots must have a valid image.",
        confirmButtonColor: "#0d6efd",
      });
      return;
    }

    setUploading(true);
    try {
      const uploadedUrls = [];

      for (let i = 0; i < 3; i++) {
        const image = selectedImages[i];
        setUploadProgress((prev) => {
          const newProgress = [...prev];
          newProgress[i] = 10;
          return newProgress;
        });

        if (image instanceof File) {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", "ml_default");
          formData.append("cloud_name", "dv26wjoay");

          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dv26wjoay/image/upload",
            formData,
            {
              onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                  const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                  );
                  setUploadProgress((prev) => {
                    const newProgress = [...prev];
                    newProgress[i] = percentCompleted;
                    return newProgress;
                  });
                }
              },
            }
          );
          uploadedUrls.push(response.data.secure_url);
        } else {
          uploadedUrls.push(previews[i]);
          setUploadProgress((prev) => {
            const newProgress = [...prev];
            newProgress[i] = 100;
            return newProgress;
          });
        }
      }

      const docRef = doc(
        db,
        "AdsdetailImages",
        existingImageId || "defaultAdsdetailImages"
      );

      await setDoc(docRef, {
        imageUrls: uploadedUrls,
        createdAt: new Date(),
      });

      MySwal.fire({
        icon: "success",
        title: "Success!",
        text: "Your ad images have been updated successfully!",
        confirmButtonColor: "#0d6efd",
      });

      setUploadProgress([0, 0, 0]);
    } catch (err) {
      console.error("Upload error:", err);
      MySwal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "There was a problem uploading your images. Please try again.",
        confirmButtonColor: "#0d6efd",
      });
    } finally {
      setUploading(false);
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
              <Container className="p-0">
                <Card className="mb-4 shadow p-0">
                  <Card.Header
                    className="text-white"
                    style={{ backgroundColor: "#2d4495" }}
                  >
                    <h4 className="m-0 mb-2 d-flex align-items-center text-white">
                      <FiImage className="me-2" />
                      Update Detail Page Advertisements
                    </h4>
                    <small>Upload three high-quality images</small>
                  </Card.Header>
                  <Card.Body>
                    <Row className="g-4">
                      {previews.map((src, index) => (
                        <Col md={4} key={index}>
                          <Card className="h-100 border">
                            <div
                              className="position-relative"
                              style={{
                                aspectRatio: "16/9",
                                height: "200px",
                                overflow: "hidden",
                              }}
                            >
                              {src ? (
                                <Card.Img
                                  src={src}
                                  alt={`Advertisement ${index + 1}`}
                                  style={{
                                    objectFit: "cover",
                                    height: "100%",
                                    width: "100%",
                                  }}
                                />
                              ) : (
                                <div
                                  className="d-flex align-items-center justify-content-center bg-light"
                                  style={{ height: "100%", width: "100%" }}
                                >
                                  <FiImage size={48} className="text-muted" />
                                </div>
                              )}

                              {uploading && uploadProgress[index] < 100 && (
                                <div className="position-absolute top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
                                  <div className="text-white text-center">
                                    <Spinner animation="border" size="sm" />
                                    <div>{uploadProgress[index]}%</div>
                                  </div>
                                </div>
                              )}
                            </div>

                            <Card.Body className="text-center">
                              <Form.Group controlId={`imgInput-${index}`}>
                                <Form.Label
                                  className="btn w-100 text-white"
                                  style={{ backgroundColor: "#2d4495" }}
                                >
                                  <FiUpload className="me-1" />
                                  {src ? "Change Image" : "Select Image"}
                                  <Form.Control
                                    type="file"
                                    accept="image/*"
                                    className="d-none"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        handleSingleImageChange(index, file);
                                      }
                                    }}
                                  />
                                </Form.Label>
                              </Form.Group>
                              <div className="mt-2 text-muted">
                                Ad Slot {index + 1}
                                {src && (
                                  <div
                                    className=" mt-1 d-flex justify-content-center align-items-center"
                                    style={{ color: "#2d4495" }}
                                  >
                                    <FiCheckCircle className="me-1" /> Image
                                    selected
                                  </div>
                                )}
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>

                    <Alert
                      variant="info"
                      className="mt-4 d-flex align-items-center"
                    >
                      <FiAlertCircle className="me-2" />
                      All three images are required for the ad display.
                    </Alert>
                    <div className="text-center mt-4">
                      <Button
                        onClick={handleUpload}
                        style={{
                          backgroundColor: uploading
                            ? "#2d4495"
                            : isHovered
                            ? "#3b57c4"
                            : "#2d4495",
                          color: "#ffffff", // Explicitly set text color to white
                          transition: "all 0.3s ease",
                          transform:
                            isHovered && !uploading ? "scale(1.05)" : "none",
                          boxShadow:
                            isHovered && !uploading
                              ? "0 4px 8px rgba(0, 0, 0, 0.2)"
                              : "none",
                        }}
                        size="lg"
                        disabled={uploading}
                        onMouseEnter={() => !uploading && setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        {uploading ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              className="me-2"
                              style={{ color: "#ffffff" }} // Spinner white
                            />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <FiUpload
                              className="me-2"
                              style={{ color: "#ffffff" }}
                            />{" "}
                            {/* Icon white */}
                            Upload Images
                          </>
                        )}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>

                <div className="text-center text-muted small">
                  Recommended image size: 1200 × 675 pixels (16:9 ratio)
                </div>
              </Container>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailAds;
