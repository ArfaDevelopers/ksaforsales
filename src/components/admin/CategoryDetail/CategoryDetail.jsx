import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Modal, Row, Col } from "react-bootstrap";
import {
  FaArrowLeft,
  FaPhone,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaShareAlt,
  FaCopy,
} from "react-icons/fa";
import share from "../../dyanmic_routes/sahere.png";
import { IoShare } from "react-icons/io5";
import { VscReport } from "react-icons/vsc";
import { Form } from "react-bootstrap";

import { IoLogoWhatsapp } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

import { IoCallOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";
// import categories from "../categoiresData/categoiresData";
import { MdKeyboardArrowRight } from "react-icons/md";
import Footer from "../../home/footer/Footer.jsx";
import Header from "../../home/header";
import { v4 as uuidv4 } from "uuid"; // For unique visitor tracking
import Loading1 from "../../../../public/Progress circle.png";
import { FaHeart, FaPhoneAlt } from "react-icons/fa";
import { MdIosShare } from "react-icons/md";

import {
  getDocs,
  collection,
  doc,
  increment,
  setDoc,
  deleteDoc,
  getDoc,
  arrayUnion,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { auth } from "../../Firebase/FirebaseConfig"; // Ensure the correct Firebase import

import { onAuthStateChanged } from "firebase/auth";

import { db } from "./../../Firebase/FirebaseConfig.jsx";
import Swal from "sweetalert2";
const CategoryDetail = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const { page } = useParams(); // This will be "CommercialAdscom"

  // State to manage modals for call and WhatsApp
  const [showCall, setShowCall] = useState(false);
  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  const [categories, setcategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };
  const link = getQueryParam("link") || window.location.href;

  const copyToClipboard = async () => {
    try {
      // Try modern clipboard API first (works on HTTPS and localhost)
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(link);
        Swal.fire({
          icon: "success",
          title: "Copied!",
          text: "Link copied to clipboard!",
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
      } else {
        // Fallback for browsers without clipboard support
        copyLinkFallback(link);
      }
    } catch (err) {
      console.error("Clipboard API failed:", err);
      // If clipboard API fails, use fallback
      copyLinkFallback(link);
    }
  };
  const handleShareClick = () => {
    setShowModal(true);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const token = await user.getIdToken();
  //       console.log("User ID Token:", token);
  //       console.log("User UID:", user.uid);
  //       setUserId(user.uid);
  //       localStorage.setItem(user.uid, "user.uid1");
  //     } else {
  //       console.log("No user is logged in. Redirecting to /login...");
  //       // navigate("/login", { replace: true }); // Redirect to login page
  //     }
  //   });

  //   return () => unsubscribe(); // Cleanup on unmount
  // }, []);

  const handleCopyLink = async () => {
    const currentUrl = window.location.href; // Gets the full URL

    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(currentUrl);
        Swal.fire({
          icon: "success",
          title: "Copied!",
          text: "Link copied to clipboard!",
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
      } else {
        // Fallback for browsers without clipboard support
        copyLinkFallback(currentUrl);
      }
    } catch (err) {
      console.error("Clipboard API failed:", err);
      // Fallback to older method if clipboard API fails
      copyLinkFallback(currentUrl);
    }
  };

  // Fallback method for copying to clipboard
  const copyLinkFallback = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        Swal.fire({
          icon: "success",
          title: "Copied!",
          text: "Link copied to clipboard!",
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Failed to copy the link. Please try again.",
          timer: 3000,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
      }
    } catch (err) {
      console.error("Fallback copy failed:", err);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Failed to copy the link. Please try again.",
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    }

    document.body.removeChild(textArea);
  };

  console.log(categories, "categories_");
  useEffect(() => {
    const fetchCarById = async () => {
      try {
        console.log("Fetching data for ID:", id);
        setLoading(true); // Set loading to true to show the spinner or loading state

        // Fetch the specific car data by ID
        const carDocRef = doc(db, "CommercialAdscom", id);
        const docSnap = await getDoc(carDocRef);

        if (docSnap.exists()) {
          setcategories(docSnap.data()); // Store the fetched data in state
          console.log("Fetched Car Data:", docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching is done
      }
    };
    return () => fetchCarById(); // Call the fetch function
  }, [id, refresh]); // Run this effect every time the `id` changes

  const MILLISECONDS_IN_24_HOURS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  useEffect(() => {
    const incrementAdVisit = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId || !id) return; // 'id' should be the current ad's ID

      const now = new Date();

      const adDocRef = doc(db, "CommercialAdscom", id);
      const userVisitRef = doc(
        db,
        "CommercialAdscom",
        id,
        "UserVisits",
        userId
      );

      try {
        // Check if this user already visited this ad
        const userVisitSnap = await getDoc(userVisitRef);
        const lastVisit = userVisitSnap.exists()
          ? userVisitSnap.data().lastVisit.toDate()
          : new Date(0); // Default to epoch (1970) if no record

        if (now - lastVisit < MILLISECONDS_IN_24_HOURS) {
          console.log("⏱️ Same user already visited in the last 24 hours.");
          return;
        }

        // Fetch current visit count
        const adSnap = await getDoc(adDocRef);
        if (adSnap.exists()) {
          const data = adSnap.data();
          const currentVisitCount = data.visitCount || 0;

          // Increment visit count
          await updateDoc(adDocRef, {
            visitCount: currentVisitCount + 1,
          });

          console.log(
            "✅ visitCount incremented for this user after 24 hours:",
            currentVisitCount + 1
          );
        } else {
          console.log("📭 Ad not found.");
        }

        // Record/update lastVisit timestamp for this user
        await setDoc(userVisitRef, {
          lastVisit: now,
        });
      } catch (err) {
        console.error("❌ Error in tracking ad visit:", err);
      }
    };

    return () => incrementAdVisit();
  }, []);

  if (!categories) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img
          src={Loading1}
          alt="Loading..."
          style={{
            width: "200px",
            height: "200px",
            animation: "spin 1s linear infinite", // Apply the spin animation
          }}
        />
        <style>
          {`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}
        </style>
      </div>
    );
  }
  // Find the selected category
  //   const selectedCategory = categories?.find(
  //     (item) => item.id === parseInt(id, 10)
  //   );

  if (!categories) {
    return <h2 className="text-center">Category Not Found</h2>;
  }

  // Handle opening the call modal
  const handleOpenCall = () => {
    // setSelectedPhone(selectedCategory.phone);
    setShowCall(true);
  };

  // Handle opening the WhatsApp modal
  const handleOpenWhatsapp = () => {
    // setSelectedPhone(selectedCategory.phone);
    setShowWhatsapp(true);
  };

  // Handle closing the modals
  const handleCloseCall = () => setShowCall(false);
  const handleCloseWhatsapp = () => setShowWhatsapp(false);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const userClickedId = auth.currentUser?.uid;

  const [visitCount, setVisitCount] = useState(0);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [reportText, setReportText] = useState("");

  const [successShow, setSuccessShow] = useState(false);
  const handleSuccessClose = () => setSuccessShow(false);
  const [reportTypes, setReportTypes] = useState([
    "Sexual",
    "Illegal",
    "Abusive",
    "Harassment",
    "Fraud",
    "Spam",
  ]);
  const [selectedReports, setSelectedReports] = useState([]);
  const handleSubmit = async () => {
    console.log("Report Submitted:", { reportText, selectedReports });

    try {
      const adsCollection = collection(db, "CommercialAdscom");
      const docRef = doc(adsCollection, id); // Target document ID

      // Fetch existing document
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        // Get existing data
        const existingData = docSnapshot.data();

        // Merge new selectedReports with existing reportTypes (if present)
        const updatedReportTypes = existingData.reportTypes
          ? [...existingData.reportTypes, ...selectedReports]
          : selectedReports; // If reportTypes is missing, initialize it

        // Update only the reportTypes field
        await updateDoc(docRef, {
          reportTypes: updatedReportTypes,
        });

        console.log("Document updated successfully:", updatedReportTypes);
      } else {
        console.log("Document does not exist.");
      }

      handleClose();
      setSuccessShow(true);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  const [isHeartedUI, setIsHeartedUI] = useState(false);

  useEffect(() => {
    setIsHeartedUI(categories?.heartedby?.includes(userClickedId));
  }, [categories, userClickedId]);

  const favoritiesadded = async (itemId) => {
    const userClickedId = auth.currentUser?.uid;
    if (!userClickedId) return;

    // 🔥 1. INSTANT UI update (no wait)
    setIsHeartedUI((prev) => !prev);

    // 🔥 2. Firestore update in background
    try {
      const docRef = doc(db, "CommercialAdscom", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentData = docSnap.data();
        const currentHeartedBy = currentData.heartedby || [];

        const isAlreadyHearted = currentHeartedBy.includes(userClickedId);

        await updateDoc(docRef, {
          heartedby: isAlreadyHearted
            ? arrayRemove(userClickedId)
            : arrayUnion(userClickedId),
        });
      }
    } catch (error) {
      console.error("Error updating heart:", error);

      // ❗ If failed, revert the UI
      setIsHeartedUI((prev) => !prev);
    }
  };

  useEffect(() => {
    const trackUserVisit = async () => {
      const user = auth.currentUser?.uid;
      if (!user) return;

      const userDocRef = doc(db, "WebsiteStats", user);
      const now = new Date();

      try {
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const lastVisit = userData?.lastVisit?.toDate();

          if (!lastVisit || now - lastVisit > MILLISECONDS_IN_24_HOURS) {
            // Update timestamp and count visit
            await updateDoc(userDocRef, {
              lastVisit: now,
            });
            setVisitCount((prev) => prev + 1);
            console.log(
              "✅ Visit counted (after 24h or first after missing timestamp)"
            );
          } else {
            console.log("🕒 Already visited in the last 24 hours.");
          }
        } else {
          // First-time visitor: set timestamp and count visit
          await setDoc(userDocRef, {
            lastVisit: now,
          });
          setVisitCount((prev) => prev + 1);
          console.log("🌟 First visit counted.");
        }
      } catch (error) {
        console.error("Error tracking visit:", error);
      }
    };

    trackUserVisit();
  }, []);
  const [callButtonStyles, setCallButtonStyles] = useState({
    backgroundColor: "#2d4495",
    borderColor: "#2d4495",
    color: "black",
  });

  // State to manage hover styles for WhatsApp button
  const [whatsappButtonStyles, setWhatsappButtonStyles] = useState({
    backgroundColor: "#0c9e6f",
    borderColor: "#0c9e6f",
    color: "black",
  });

  // Hover handlers for Call button
  const handleCallMouseEnter = () => {
    setCallButtonStyles({
      backgroundColor: "white",
      borderColor: "#2d4495",
      color: "#2d4495",
    });
  };

  const handleCallMouseLeave = () => {
    setCallButtonStyles({
      backgroundColor: "#2d4495",
      borderColor: "#2d4495",
      color: "black",
    });
  };

  // Hover handlers for WhatsApp button
  const handleWhatsappMouseEnter = () => {
    setWhatsappButtonStyles({
      backgroundColor: "white",
      borderColor: "#0c9e6f",
      color: "#0c9e6f",
    });
  };

  const handleWhatsappMouseLeave = () => {
    setWhatsappButtonStyles({
      backgroundColor: "white",
      borderColor: "#0c9e6f",
      color: "black",
    });
  };
  return (
    <>
      <Container className="mt-5">
        <Header />

        <Container
          className="parent-main"
          style={{
            maxWidth: "1530px",
            paddingTop: "230px",
            marginTop: window.innerWidth <= 576 ? "-9rem" : "-6rem",
            marginLeft: -10,
          }}
        >
          <div className="d-flex align-items-center justify-content-between my-4 flex-wrap">
            <div className="d-flex align-items-center flex-wrap gap-2">
              <button
                className="btn"
                style={{
                  background: window.innerWidth <= 576 ? "none" : "#E9EEFF",
                  fontWeight: "500",
                  padding: window.innerWidth <= 576 ? "0px" : "10px 15px",
                }}
                onClick={() => navigate("/")}
              >
                Home
              </button>
              <span>
                <MdKeyboardArrowRight />
              </span>
              <button
                className="btn"
                style={{
                  background: window.innerWidth <= 576 ? "none" : "#E9EEFF",
                  fontWeight: "500",
                  padding: window.innerWidth <= 576 ? "0px" : "10px 15px",
                }}
                onClick={() => navigate("/CommercialAdscom")}
              >
                CommercialAds
              </button>
              <span>
                <MdKeyboardArrowRight />
              </span>
              <button
                className="btn"
                style={{
                  background: window.innerWidth <= 576 ? "none" : "#E9EEFF",
                  fontWeight: "500",
                  padding: window.innerWidth <= 576 ? "0px" : "10px 15px",
                }}
              >
                Commercial ad details
              </button>
            </div>
          </div>
        </Container>
        <div
          className="report_main_btn_wrap"
          // to="/bookmarks"
        >
          <button
            className="head2btn"
            style={{
              backgroundColor: "white",
              border: "1px solid #2D4495",
              padding: window.innerWidth <= 576 ? "5px" : "10px 15px",
              textAlign: "center",
              width: window.innerWidth <= 576 ? "47%" : "auto",
            }}
            onClick={(e) => {
              e.stopPropagation();
              favoritiesadded(categories.id);
            }}
          >
            <span>
              {isHeartedUI ? (
                <FaHeart
                  style={{
                    fontSize: "20px",
                    marginRight: "5px",
                    color: "red",
                    fill: "red",
                  }}
                />
              ) : (
                <FaRegHeart
                  style={{
                    fontSize: "20px",
                    color: "#2d4495",
                  }}
                />
              )}
            </span>{" "}
            Favourite
          </button>

          <>
            {/* Button to open modal */}
            <button
              className="head2btn"
              onClick={() => setShowModal1(true)}
              style={{
                marginLeft: "0.6rem",
                backgroundColor: "white",
                border: "1px solid #2D4495",
                padding: window.innerWidth <= 576 ? "5px" : "10px 15px",
                textAlign: "center",
                width: window.innerWidth <= 576 ? "47%" : "auto",
              }}
            >
              <span>
                <IoShare
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    marginRight: "5px",
                    color: "black",
                  }}
                />

                {/* <img src={share} alt="share" /> */}
              </span>
              Share
            </button>

            {/* Modal */}
            {showModal1 && (
              <div
                className="modal fade show d-block"
                tabIndex="-1"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 1050,
                }}
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Share</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowModal1(false)}
                      ></button>
                    </div>

                    <div className="modal-body">
                      <div style={{ wordBreak: "break-all" }}>{link}</div>
                      <div
                        style={{
                          display: "flex",
                          gap: "15px",
                          marginTop: "15px",
                        }}
                      >
                        {/* Facebook Share */}
                        <FaFacebook
                          size={32}
                          color="#3b5998"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            window.open(
                              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                link
                              )}`,
                              "_blank"
                            )
                          }
                        />

                        {/* Facebook Share */}
                        <FaWhatsapp
                          size={32}
                          color="#25D366"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            window.open(
                              `https://wa.me/?text=${encodeURIComponent(link)}`,
                              "_blank"
                            )
                          }
                        />
                        {/* Instagram - opens Instagram app on mobile */}
                        <FaInstagram
                          size={32}
                          color="#C13584"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            if (/Mobi|Android/i.test(navigator.userAgent)) {
                              window.location.href = `instagram://share?text=${encodeURIComponent(
                                link
                              )}`;
                            } else {
                              alert(
                                "Instagram sharing is only available on mobile apps. Link copied!"
                              );
                              navigator.clipboard.writeText(link);
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="blue_btn"
                        onClick={copyToClipboard}
                      >
                        Copy
                      </button>
                      <button
                        type="button"
                        className="blue_btn"
                        onClick={() => setShowModal1(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
          <button
            className="head2btn"
            style={{
              marginLeft: "0.6rem",

              backgroundColor: "white",
              border: "1px solid #2D4495",
              padding: window.innerWidth <= 576 ? "5px" : "10px 15px",
              textAlign: "center",
              width: window.innerWidth <= 576 ? "47%" : "auto",
            }}
            onClick={handleShow}
          >
            <span>
              <VscReport
                style={{
                  fontSize: "20px",
                  marginRight: "5px",
                  color: "#2d4495",
                  fontWeight: "bold",
                }}
              />
            </span>
            Report
          </button>
          <Modal
            style={{ marginTop: window.innerWidth <= 576 ? 60 : 20 }}
            show={show}
            onHide={handleClose}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Submit a Report</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="reportText">
                  <Form.Label>Report Details</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Describe the issue..."
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>Report Type</Form.Label>
                  {reportTypes.map((type, index) => (
                    <Form.Check
                      key={index}
                      type="checkbox"
                      label={type}
                      checked={selectedReports.includes(type)}
                      onChange={() => handleCheckboxChange(type)}
                    />
                  ))}
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{
                  backgroundColor: "#2d4495",
                  color: "#fff",
                  border: "none",
                  fontWeight: "bold",
                  borderRadius: 10,
                  transition: "none", // Disable transitions
                  outline: "none", // Remove focus outline
                  boxShadow: "none", // Remove any shadow changes
                  cursor: "pointer", // Maintain clickable appearance
                }}
                onClick={handleClose}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#2d4495"; // Force same background
                  e.currentTarget.style.color = "#fff"; // Force same text color
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#2d4495"; // Restore same background
                  e.currentTarget.style.color = "#fff"; // Restore same text color
                }}
              >
                Close
              </Button>
              <Button
                style={{
                  backgroundColor: "#2d4495",
                  color: "#fff",
                  border: "none",
                  fontWeight: "bold",
                  borderRadius: 10,
                  transition: "none", // Disable transitions
                  outline: "none", // Remove focus outline
                  boxShadow: "none", // Remove any shadow changes
                  cursor: "pointer", // Maintain clickable appearance
                }}
                onClick={handleSubmit}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#2d4495"; // Force same background
                  e.currentTarget.style.color = "#fff"; // Force same text color
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#2d4495"; // Restore same background
                  e.currentTarget.style.color = "#fff"; // Restore same text color
                }}
                // disabled={!reportText || selectedReports.length === 0}
                // disabled={selectedReports.length === 0}
              >
                Submit Report
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <Card
          className="text-center position-relative"
          style={{
            width: "350px",
            margin: "20px auto",
          }}
        >
          {/* Wrapper for top-left and top-right text */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
            <div
              className="d-flex gap-2 align-items-center mt-2"
              style={{
                fontSize: "18px",
              }}
            >
              <FaRegEye />
              <span style={{ fontWeight: "bold" }} className="gap-2">
                {categories?.visitCount}
                <span style={{ marginLeft: "3px" }}>Views</span>
              </span>
            </div>

            {/* Top-right text */}
            <span
              style={{
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "18px",
              }}
              onClick={handleShareClick}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px", // Adjust size as needed
                  height: "40px", // Adjust size as needed
                  backgroundColor: "#f7f8fa",
                  fontWeight: "var(--font-bold)",
                  color: "var(--shades_0)",
                  border: "none",
                  borderRadius: "50%",
                  // marginTop: "-1.5rem",
                }}
              >
                <MdIosShare
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.4rem",
                    color: "black",
                  }}
                  // width="24px"

                  // style={{ marginTop: "-1.5rem" }}
                  //   height="24px"
                  //   viewBox="0 0 24 24"
                  //   fill="none"
                  //   xmlns="http://www.w3.org/2000/svg"
                  // >
                  //   <path
                  //     d="M11.293 2.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.414L13 5.414V15a1 1 0 1 1-2 0V5.414L9.707 6.707a1 1 0 0 1-1.414-1.414l3-3zM4 11a2 2 0 0 1 2-2h2a1 1 0 0 1 0 2H6v9h12v-9h-2a1 1 0 1 1 0-2h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9z"
                  //     fill="#0D0D0D"
                />
                {/* </svg> */}
              </div>
            </span>
          </div>
          {/* Share Modal */}
          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header
              closeButton
              className="bg-dark text-white"
              style={{
                borderBottom: "2px solid #2d4495",
              }}
            >
              <Modal.Title>
                <FaShareAlt className="me-2" />
                Share Image
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
              <div className="mb-3">
                <label className="text-secondary mb-2 fw-bold">Link</label>
                <div
                  className="border rounded p-3"
                  style={{
                    background: "#f8f9fa",
                    wordBreak: "break-all",
                    overflowWrap: "break-word",
                    maxHeight: "80px",
                    overflowY: "auto",
                    fontSize: "0.9rem",
                    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  {window.location.href}
                </div>
              </div>

              <Row className="mt-4">
                <Col>
                  <Button
                    variant="outline-primary"
                    onClick={handleCopyLink}
                    className="w-100 d-flex align-items-center justify-content-center"
                    style={{
                      borderWidth: "2px",
                      borderColor: "#2d4495",
                      height: "50px",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <FaCopy size={18} className="me-2" />
                      <span className="fw-bold">Copy to Clipboard</span>
                    </div>
                  </Button>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
          <Card.Img
            variant="top"
            src={categories.image}
            style={{
              height: "350px",
              width: "100%", // Makes it responsive
              maxWidth: "100%",
              objectFit: "cover",
              margin: "0 auto",
              display: "block",
            }}
          />

          <div>
            <div>
              <div className="d-flex justify-content-center gap-1 mt-3">
                <button
                  variant="primary"
                  className="d-flex align-items-center blue_btn list_btn categories"
                  onClick={handleOpenCall}
                  onMouseEnter={handleCallMouseEnter}
                  onMouseLeave={handleCallMouseLeave}
                >
                  <FaPhoneAlt
                    style={{
                      // fontSize: "1.5rem",
                      // color: callButtonStyles.color,
                      fontSize: "0.8rem",
                      color: "white",
                      fill: "white",
                    }}
                  />
                  <span style={{ color: "white" }}>Call</span>
                </button>
                <button
                  className="d-flex align-items-center blue_btn list_btn categories"
                  onClick={handleOpenWhatsapp}
                  // onMouseEnter={handleWhatsappMouseEnter}
                  // onMouseLeave={handleWhatsappMouseLeave}
                >
                  <FaWhatsapp />
                  <span>WhatsApp</span>
                </button>
                <Button
                  variant="primary"
                  className="d-flex align-items-center gap-1 bg-white"
                  style={{
                    transition: "all 0.2s ease",
                    padding: "0.375rem 0.75rem",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    favoritiesadded(categories.id);
                  }}
                >
                  <FaHeart
                    style={{
                      fontSize: "1.5rem",
                      color: isHeartedUI ? "red" : "#2d4495",
                    }}
                  />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Modal for Call */}
        <Modal show={showCall} onHide={handleCloseCall} centered>
          <Modal.Body className="text-end p-4">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="fw-bold">Call</h5>
              <button onClick={handleCloseCall} className="btn btn-light">
                ✕
              </button>
            </div>
            <hr />
            <div className="d-flex align-items-center gap-2 justify-content-start">
              <IoCallOutline style={{ width: "24px", color: "#2d4495" }} />
              <a
                href={`tel:${categories?.phone}`}
                className="fw-bold text-dark text-decoration-none"
              >
                {categories?.phone}
              </a>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={showWhatsapp} onHide={handleCloseWhatsapp} centered>
          <Modal.Body className="text-end p-4">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="fw-bold">WhatsApp</h5>
              <button onClick={handleCloseWhatsapp} className="btn btn-light">
                ✕
              </button>
            </div>
            <hr />
            <div className="d-flex align-items-center gap-2 justify-content-start">
              <FaWhatsapp style={{ width: "24px", color: "#25D366" }} />
              <a
                href={`https://wa.me/${categories?.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fw-bold text-dark text-decoration-none"
              >
                {categories?.phone}
              </a>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
      <Footer />
    </>
  );
};

export default CategoryDetail;
