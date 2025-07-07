import React, { useEffect, useState } from "react";
import Header from "../../home/header";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Container, Button, Card, Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import left from "../../dyanmic_routes/left.png";
// import whatsapp from "../../dyanmic_routes/whatapp.png";
import { FaHeart, FaPhoneAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaRegEye } from "react-icons/fa6";
import { MdIosShare } from "react-icons/md";

import { IoCallOutline } from "react-icons/io5";
import share from "../../dyanmic_routes/sahere.png";
import report from "../../dyanmic_routes/report.png";
import Vector from "../../dyanmic_routes/Vector.png";
import tick from "../../dyanmic_routes/tick.png";
import categories from "../categoiresData/categoiresData";
import { BsWhatsapp } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router";
import { FaPhone, FaWhatsapp, FaShareAlt, FaCopy } from "react-icons/fa";
import { FaLink } from "react-icons/fa";

import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { auth, db } from "./../../Firebase/FirebaseConfig.jsx";
import Footer from "../../home/footer/Footer";
import axios from "axios";
const ITEMS_PER_PAGE = 4; // Set number of items per page

const CommercialAdscom = () => {
  // console.log("file is running",categories);
  const navigate = useNavigate();
  const [showCall, setShowCall] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [selectedPhone, setSelectedPhone] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [reportText, setReportText] = useState("");
  const [reportTypes, setReportTypes] = useState([
    "Sexual",
    "Illegal",
    "Abusive",
    "Harassment",
    "Fraud",
    "Spam",
  ]);
  const [selectedReports, setSelectedReports] = useState([]);
  const [itemData, setItemData] = useState(null); // State to store ads data
  console.log("itemData_____________111", itemData);
  const { id } = useParams();
  const location = useLocation(); // Access the full location object

  const [_Id, setId] = useState(null); // State to store ads data
  const [callingFrom, setCallingFrom] = useState(null); // State to store ads data
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    const callingFrom = getQueryParam("callingFrom");
    const ids = getQueryParam("id");
    console.log("callingFrom______ID:ids", ids);
    console.log("callingFrom______Calling From:", callingFrom);
    setCallingFrom(callingFrom);
    setId(ids);
  }, [id, location]);
  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true); // Start loading
      try {
        const collectionName =
          callingFrom === "AutomotiveComp"
            ? "Cars"
            : callingFrom === "ElectronicComp"
            ? "ELECTRONICS"
            : callingFrom === "FashionStyle"
            ? "FASHION"
            : callingFrom === "HealthCareComp"
            ? "HEALTHCARE"
            : callingFrom === "JobBoard"
            ? "JOBBOARD"
            : callingFrom === "Education"
            ? "Education"
            : callingFrom === "RealEstateComp"
            ? "REALESTATECOMP"
            : callingFrom === "TravelComp"
            ? "TRAVEL"
            : callingFrom === "SportGamesComp"
            ? "SPORTSGAMESComp"
            : callingFrom === "PetAnimalsComp"
            ? "PETANIMALCOMP"
            : "books";
        // Determine collection based on `callingFrom`
        // const collectionName = callingFrom === "automotive" ? "carData" : "books";
        const adsCollection = collection(db, "CommercialAdscom"); // Reference to dynamic collection
        const adsSnapshot = await getDocs(adsCollection); // Fetch all documents
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id, // Include document ID
          ...doc.data(), // Spread document data
        }));

        console.log(adsList, "Fetched Ads");

        // Find the ad that matches the `id` from the URL
        // const selectedAd = adsList.find((ad) => ad.id === NewId);
        // if (selectedAd) {
        //   setItemData({
        //     ...selectedAd,
        //     timeAgo: selectedAd.createdAt
        //       ? formatDistanceToNow(selectedAd.createdAt.toDate(), {
        //           addSuffix: true,
        //         })
        //       : "Unknown time",
        //   });
        // } else {
        //   setItemData(null);
        // }

        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching item:", error);
        // setError("Failed to fetch data");
        setLoading(false); // Stop loading on error
      }
    };

    fetchItem(); // Call the fetch function
  }, [id, callingFrom, db, location]); // Re-run if `id` changes

  const handleShowCall = (phone) => {
    setSelectedPhone(phone);
    setShowCall(true);
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [successShow, setSuccessShow] = useState(false);
  const handleSuccessClose = () => setSuccessShow(false);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const userClickedId = auth.currentUser?.uid;
  console.log(userClickedId, "userClickedId__________");
  // const favoritiesadded = (id) => {
  //   console.log("Added to favorites:", id);
  //   // Add your actual logic here
  // };
  // const favoritiesadded = async (adId) => {
  //   const userClickedId = auth.currentUser?.uid;

  //   if (!userClickedId) {
  //     console.error("User not authenticated");
  //     return;
  //   }

  //   try {
  //     const adRef = doc(db, "CommercialAdscom", adId);

  //     await updateDoc(adRef, {
  //       heartedby: arrayUnion(userClickedId), // Adds UID only if it's not already in the array
  //     });
  //     setRefresh(!refresh);
  //     console.log(`User ${userClickedId} hearted ad ${adId}`);
  //   } catch (error) {
  //     console.error("Error updating heartedby field:", error);
  //   }
  // };
  const favoritiesadded = async (itemId) => {
    const userClickedId = auth.currentUser?.uid;
    if (!userClickedId) return;

    try {
      const docRef = doc(db, "CommercialAdscom", itemId);
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
        setRefresh(!refresh); // force re-fetch if needed

        console.log(
          `User ${
            isAlreadyHearted ? "removed from" : "added to"
          } heartedby for item ${itemId}`
        );
      }
    } catch (error) {
      console.error("Error updating heartedby field:", error);
    }
  };
  const handleShowWhatsApp = (phone) => {
    setSelectedPhone(phone);
    setShowWhatsApp(true);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const handleCloseCall = () => setShowCall(false);
  const handleCloseWhatsApp = () => setShowWhatsApp(false);
  const [loading, setLoading] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };
  const link = getQueryParam("link") || window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };
  const handleSubmit = async () => {
    console.log("Report Submitted:", { reportText, selectedReports });

    const NewId =
      callingFrom === "AutomotiveComp" ||
      callingFrom === "ElectronicComp" ||
      callingFrom === "FashionStyle" ||
      callingFrom === "HealthCareComp" ||
      callingFrom === "JobBoard" ||
      callingFrom === "Education" ||
      callingFrom === "RealEstateComp" ||
      callingFrom === "TravelComp" ||
      callingFrom === "SportGamesComp" ||
      callingFrom === "PetAnimalsComp"
        ? _Id
        : "default_id"; // Default if not matched

    const collectionName =
      callingFrom === "AutomotiveComp"
        ? "Cars"
        : callingFrom === "ElectronicComp"
        ? "ELECTRONICS"
        : callingFrom === "FashionStyle"
        ? "FASHION"
        : callingFrom === "HealthCareComp"
        ? "HEALTHCARE"
        : callingFrom === "JobBoard"
        ? "JOBBOARD"
        : callingFrom === "Education"
        ? "Education"
        : callingFrom === "RealEstateComp"
        ? "REALESTATECOMP"
        : callingFrom === "TravelComp"
        ? "TRAVEL"
        : callingFrom === "SportGamesComp"
        ? "SPORTSGAMESComp"
        : callingFrom === "PetAnimalsComp"
        ? "PETANIMALCOMP"
        : "books";

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
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          "http://168.231.80.24:9002/route/commercial-ads"
        );
        setCategories(response.data);
        console.log(response.data, "userClickedId__________contentapi");
      } catch (error) {
        console.error("Error getting cars:", error);
      }
    };

    fetchCars();
  }, [refresh]);
  // Calculate total pages
  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);

  // Get current page data
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
  console.log(currentItems, "currentItems__________");
  const [callButtonStyles, setCallButtonStyles] = useState({
    backgroundColor: "#2d4495",
    borderColor: "#2d4495",
    color: "black",
  });
  const [showModal, setShowModal] = useState(false);
  const [PramaId, setPramaId] = useState("");
  const [paramLink, setparamLink] = useState("");

  // const handleShareClick = (e, id) => {
  //   e.stopPropagation();
  //   setPramaId(id);
  //   console.log("Shared item ID:", id);
  //   setShowModal(true);
  // };
  const handleShareClick = (e, id) => {
    e.stopPropagation();
    setPramaId(id);

    const fullUrl = window.location.href;
    const hashIndex = fullUrl.indexOf("#");
    const baseUrl =
      hashIndex !== -1 ? fullUrl.substring(0, hashIndex + 1) : fullUrl + "#";
    const finalUrl = `${baseUrl}/CategoryDetail/${id}`;

    setparamLink(finalUrl); // ⬅️ Save full link to state
    console.log("Shared item ID:", id);
    console.log("Generated link:", finalUrl);
    setShowModal(true);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  // const handleCopyLink = () => {
  //   navigator.clipboard.writeText(categories.image);
  //   alert("Link copied to clipboard!");
  // };
  // const handleCopyLink = () => {
  //   const fullUrl = window.location.href;
  //   const hashIndex = fullUrl.indexOf("#");
  //   const urlWithHashOnly =
  //     hashIndex !== -1 ? fullUrl.substring(0, hashIndex + 1) : fullUrl;
  //   navigator.clipboard.writeText(urlWithHashOnly);
  //   alert("Link copied to clipboard!\n" + urlWithHashOnly);
  // };
  const handleCopyLink = () => {
    const fullUrl = window.location.href;
    const hashIndex = fullUrl.indexOf("#");
    const baseUrl =
      hashIndex !== -1 ? fullUrl.substring(0, hashIndex + 1) : fullUrl + "#";

    const finalUrl = `${baseUrl}/CategoryDetail/${PramaId}`;

    navigator.clipboard.writeText(finalUrl);
    alert("Link copied to clipboard!\n" + finalUrl);
  };

  const [totalVisitors, setTotalVisitors] = useState(0);
  const MILLISECONDS_IN_24_HOURS = 24 * 60 * 60 * 1000;

  const [visitCount, setVisitCount] = useState(0);
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
  // State to manage hover styles for WhatsApp button
  const [whatsappButtonStyles, setWhatsappButtonStyles] = useState({
    backgroundColor: "#0c9e6f",
    borderColor: "#2d4495",
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
  const handleCheckboxChange = (type) => {
    setSelectedReports((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };
  const handleWhatsappMouseLeave = () => {
    setWhatsappButtonStyles({
      backgroundColor: "#0c9e6f",
      borderColor: "#0c9e6f",
      color: "black",
    });
  };
  return (
    <>
      <section
        className="commercial_card_section"
        style={{ marginBottom: "3rem" }}
      >
        <div className="container">
          <Header />
          <Container
            className="parent-main"
            style={{
              maxWidth: "1530px",
              paddingTop: "200px",
              marginTop: window.innerWidth <= 576 ? "-7rem" : "-4rem",
              marginLeft: -10,
            }}
          >
            <div className="d-flex align-items-center justify-content-between my-4 flex-wrap">
              <div
                className="d-flex align-items-center"
                style={{ marginTop: 15 }}
              >
                <button
                  className="btn"
                  style={{
                    background: window.innerWidth <= 576 ? "none" : "#E9EEFF",
                    fontWeight: "500",
                    pointerEvents: "none",
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
                    pointerEvents: "none",
                    padding: window.innerWidth <= 576 ? "0px" : "10px 15px",
                  }}
                  onClick={() => navigate("/ElectronicComp")}
                >
                  CommercialAds
                </button>
              </div>
            </div>
          </Container>

          {/* <hr /> */}

          <h1
            style={{
              marginBottom: "20px",
            }}
          >
            Commercial Ads
          </h1>

          <Modal show={showModal} onHide={handleCloseModal} centered>
            <div className="position-relative">
              <Modal.Header
                closeButton
                className="border-0"
                style={{
                  background: "transparent",
                  zIndex: 2,
                }}
              >
                <span></span>
              </Modal.Header>
            </div>

            <Modal.Body className="px-4 pt-0 pb-4">
              <div className="text-center mb-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "#2d4495",
                    color: "white",
                  }}
                >
                  <FaLink size={24} />
                </div>
                <h4 className="fw-bold">Share Image</h4>
                <div className="text-muted small">
                  Copy the link to share with others
                </div>
              </div>

              <div
                className="d-flex align-items-center p-3 rounded mb-4"
                style={{
                  background: "#f8f9fa",
                  border: "1px solid #dee2e6",
                }}
              >
                <div
                  className="flex-grow-1 me-2"
                  style={{
                    wordBreak: "break-all",
                    overflowWrap: "break-word",
                    fontSize: "0.85rem",
                    maxHeight: "60px",
                    overflowY: "auto",
                  }}
                >
                  {paramLink}
                </div>

                <Button
                  onClick={handleCopyLink}
                  variant="light"
                  className="flex-shrink-0"
                  style={{
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaCopy size={16} color="#2d4495" />
                </Button>
              </div>

              <div className="d-grid">
                <Button
                  variant="primary"
                  onClick={handleCloseModal}
                  style={{
                    backgroundColor: "#2d4495",
                    border: "none",
                    borderRadius: "6px",
                    padding: "10px 0",
                  }}
                >
                  Done
                </Button>
              </div>
            </Modal.Body>
          </Modal>
          <Container className="p-0">
            <Row className="g-4">
              {categories.map((item) => (
                <Col key={item.id} xl={3} md={6} sm={6}>
                  <Card
                    className="shadow-lg"
                    onClick={() => {
                      navigate(`/CategoryDetail/${item.id}`);
                    }}
                    style={{
                      cursor: "pointer",
                      padding: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%", // Use full width or adjust as needed
                        marginBottom: "5px",
                      }}
                    >
                      {/* Left Side - Views */}
                      <div className="d-flex gap-2 align-items-center">
                        <FaRegEye />
                        <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                          {item?.visitCount}
                          <span style={{ marginLeft: "3px" }}>Views</span>
                        </span>
                      </div>

                      {/* Right Side - Share Icon */}
                      <span
                        style={{
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                        onClick={(e) => handleShareClick(e, item.id)}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#f7f8fa",
                            color: "var(--shades_0)",
                            border: "none",
                            borderRadius: "50%",
                          }}
                        >
                          <MdIosShare
                            style={{
                              fontWeight: "bold",
                              fontSize: "1.4rem",
                              color: "black",
                            }}
                          />
                        </div>
                      </span>
                    </div>

                    <Card.Img
                      variant="top"
                      src={item.image}
                      alt={item.title}
                      style={{
                        height: "350px",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                    <Card.Body
                      style={{
                        paddingBottom: "0",
                        paddingLeft: "0",
                        paddingRight: "0",
                      }}
                    >
                      <div className="d-flex justify-content-between gap-2 mt-1">
                        <Button
                          variant="primary"
                          className="d-flex align-items-center gap-1 bg-white"
                          style={{
                            ...whatsappButtonStyles,
                            transition: "all 0.2s ease",
                            padding: "0.375rem 0.75rem",
                            fontSize: "14px",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowWhatsApp(item.phone);
                            setSelectedPhone(item.phone);
                          }}
                        >
                          <FaPhoneAlt
                            style={{
                              fontSize: "0.8rem",
                              color: "#2d4495",
                            }}
                            // className="fill-white text-white mt-1"
                          />
                          <span style={{ color: whatsappButtonStyles.color }}>
                            Call
                          </span>
                        </Button>

                        <Button
                          variant="primary"
                          className="d-flex align-items-center gap-1 bg-white"
                          style={{
                            ...whatsappButtonStyles,
                            transition: "all 0.2s ease",
                            padding: "0.375rem 0.75rem",
                            fontSize: "14px",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowWhatsApp(item.phone);
                            setSelectedPhone(item.phone);
                          }}
                        >
                          <IoLogoWhatsapp
                            style={{
                              fontSize: "1.5rem",
                              color: "#2d4495",

                              // color: whatsappButtonStyles.color,
                            }}
                          />
                          <span style={{ color: whatsappButtonStyles.color }}>
                            WhatsApp
                          </span>
                        </Button>
                        <Button
                          variant="primary"
                          className="d-flex align-items-center gap-1 bg-white"
                          style={{
                            transition: "all 0.2s ease",
                            padding: "0.375rem 0.75rem",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            favoritiesadded(item.id); // Call your function with the clicked item's ID
                          }}
                        >
                          <FaHeart
                            style={{
                              fontSize: "1.5rem",
                              // color: "#2d4495",
                              color: item.heartedby?.includes(userClickedId)
                                ? "red"
                                : "#2d4495",
                            }}
                          />
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>

          {/* Call Modal */}
          <Modal show={showCall} onHide={handleCloseCall} centered>
            <div className="p-4">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="fw-bold text-dark">Call</h6>
                <button onClick={handleCloseCall} className="btn border-0">
                  ✕
                </button>
              </div>
              <hr />
              <div className="d-flex align-items-center gap-3">
                <IoCallOutline
                  style={{
                    width: "28px",
                    height: "32px",
                    color: "#2d4495",
                    background: "#f0f5ff",
                    padding: "8px",
                    borderRadius: "50%",
                  }}
                />
                <a
                  href={`tel:${selectedPhone}`}
                  className="fw-bold text-dark text-decoration-none"
                >
                  {selectedPhone}
                </a>
              </div>
            </div>
          </Modal>

          {/* WhatsApp Modal */}
          <Modal show={showWhatsApp} onHide={handleCloseWhatsApp} centered>
            <div className="p-4">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="fw-bold text-dark">Whatsapp</h6>
                <button onClick={handleCloseWhatsApp} className="btn border-0">
                  ✕
                </button>
              </div>
              <hr />
              <a
                href={`https://wa.me/${selectedPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fw-bold text-dark text-decoration-none"
              >
                <div className="d-flex align-items-center gap-3">
                  <BsWhatsapp
                    style={{
                      width: "29px",
                      height: "32px",
                      color: "#25D366",
                      background: "#E7F9ED",
                      padding: "8px",
                      borderRadius: "50%",
                    }}
                  />

                  {selectedPhone}
                </div>
              </a>
            </div>
          </Modal>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CommercialAdscom;
