import React, { useEffect, useState } from "react";
import Header from "../../home/header";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Container, Button, Card, Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import left from "../../dyanmic_routes/left.png";
// import whatsapp from "../../dyanmic_routes/whatapp.png";
import { FaWhatsapp } from "react-icons/fa";

import { IoCallOutline } from "react-icons/io5";
import share from "../../dyanmic_routes/sahere.png";
import report from "../../dyanmic_routes/report.png";
import Vector from "../../dyanmic_routes/Vector.png";
import tick from "../../dyanmic_routes/tick.png";
import categories from "../categoiresData/categoiresData";
import { BsWhatsapp } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useParams, useLocation } from "react-router";

import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "./../../Firebase/FirebaseConfig.jsx";
import Footer from "../../home/footer/Footer";
const ITEMS_PER_PAGE = 4; // Set number of items per page

const CommercialAdscom = () => {
  // console.log("file is running",categories);
  const navigate = useNavigate();
  const [showCall, setShowCall] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
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
console.log('itemData_____________111',itemData)
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
        const adsCollection = collection(db, collectionName); // Reference to dynamic collection
        const adsSnapshot = await getDocs(adsCollection); // Fetch all documents
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id, // Include document ID
          ...doc.data(), // Spread document data
        }));

        console.log(adsList, "Fetched Ads");

        // Find the ad that matches the `id` from the URL
        const selectedAd = adsList.find((ad) => ad.id === NewId);
        if (selectedAd) {
          setItemData({
            ...selectedAd,
            timeAgo: selectedAd.createdAt
              ? formatDistanceToNow(selectedAd.createdAt.toDate(), {
                  addSuffix: true,
                })
              : "Unknown time",
          });
        } else {
          setItemData(null);
        }

        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching item:", error);
        // setError("Failed to fetch data");
        setLoading(false); // Stop loading on error
      }
    };

    fetchItem(); // Call the fetch function
  }, [id, callingFrom, db,location]); // Re-run if `id` changes


  const handleShowCall = (phone) => {
    setSelectedPhone(phone);
    setShowCall(true);
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
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
      const adsCollection = collection(db, collectionName);
      const docRef = doc(adsCollection, NewId); // Target document ID

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
        const carsCollectionRef = collection(db, "CommercialAdscom");
        const querySnapshot = await getDocs(carsCollectionRef);
        const carsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(carsData);
      } catch (error) {
        console.error("Error getting cars:", error);
      }
    };

    fetchCars();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);

  // Get current page data
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
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
    <section className="commercial_card_section">
      <div className="container">
        <Header />
        <Container
          className="parent-main"
          style={{ maxWidth: "1530px", paddingTop: "230px",marginTop: window.innerWidth <= 576 ? "-7rem" : "-4rem", marginLeft:-10 }}
        >
          <div className="d-flex align-items-center justify-content-between my-4 flex-wrap">
            <div className="d-flex align-items-center"  style={{marginTop:15}}>
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
            {/* <div className="d-flex align-items-center justify-content-end">
              <div className="d-flex justify-content-center align-items-center mt-4">
                <Button
                  variant="outline-primary"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  <FaArrowLeft /> Previous
                </Button>

                {[...Array(totalPages)].map((_, index) => (
                  <Button
                    key={index}
                    variant={
                      currentPage === index + 1 ? "primary" : "outline-primary"
                    }
                    onClick={() => setCurrentPage(index + 1)}
                    className="mx-2"
                  >
                    {index + 1}
                  </Button>
                ))}

                <Button
                  variant="outline-primary"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  Next <FaArrowRight />
                </Button>
              </div>
            </div> */}
          </div>
        </Container>

        <hr />

        <h1 className="m-lg-1">Commercial Ads</h1>
        <Container
          className="parent-main"
          style={{ maxWidth: "1530px" }}
        >
           <div
            className="CategoryInfodiv_btn2container"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              // marginLeft: window.innerWidth <= 576 ? "0.7rem" : "7.7%",
              marginBottom: window.innerWidth <= 576 ? "10px" : "20px",
              marginTop: window.innerWidth <= 576 ? "10px" : "20px"
            }}
          >
            <Link to="/bookmarks">
            <button
            
              className="head2btn"
              style={{
                backgroundColor: "white",
                border: "1px solid #2D4495",
                padding: window.innerWidth <= 576 ? "5px" : "10px 15px",
                textAlign: "center",
                width: window.innerWidth <= 576 ? "47%" : "auto"
              }}
            >
               <span>
                  {/* <img src={left} alt="leftarrow" /> */}
                  <FaRegHeart/>
                </span>{" "}
              Favourite
            </button>
            </Link>
            <>
                {/* Button to open modal */}
                <button
                  className="head2btn"
                  onClick={() => setShowModal1(true)}
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #2D4495",
                    padding: window.innerWidth <= 576 ? "5px" : "10px 15px",
                    textAlign: "center",
                    width: window.innerWidth <= 576 ? "47%" : "auto"
                  }}
                >
                  <span>
                    <img src={share} alt="share" />
                  </span>
                  Share
                </button>

                {/* Modal */}
                {showModal1 && (
                  <>
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
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
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
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn"
                              style={{ backgroundColor: "#2d4495", color: "#fff", border: "none",fontWeight:"bold",borderRadius:10 }}
                              onClick={copyToClipboard}
                            >
                              Copy
                            </button>
                            <button
                              type="button"
                              className="btn "
                              style={{ backgroundColor: "#2d4495", color: "#fff", border: "none",fontWeight:"bold",borderRadius:10 }}
                              onClick={() => setShowModal1(false)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
              {/* {itemData.userId===userId?

<button className="head2btn" onClick={handleShowReport}
  style={{
                backgroundColor: "white",
                border: "1px solid #2D4495",
                padding: window.innerWidth <= 576 ? "5px" : "10px 15px",
                textAlign: "center",
                width: window.innerWidth <= 576 ? "47%" : "auto"
              }}
>
              <span>
              
                <FaBuysellads />
              </span>
              Promote
            </button>:''     }    
              
                {showReport && (
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
                      backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
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
                            onClick={() => setshowReport(false)}
                          ></button>
                        </div>
                        <div className="modal-body">
                        
                          <Elements stripe={stripePromise}>
                            <PaymentForm
                              _Id={_Id}
                              collectionName1={collectionName1}
                              getpaymentSuccess={setFeaturedAds}
                            />
                          </Elements>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setshowReport(false)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )} */}
              <button className="head2btn"
                style={{
                  backgroundColor: "white",
                  border: "1px solid #2D4495",
                  padding: window.innerWidth <= 576 ? "5px" : "10px 15px",
                  textAlign: "center",
                  width: window.innerWidth <= 576 ? "47%" : "auto"
                }}
              onClick={handleShow}>
                <span>
                  <img src={report} alt="report" />
                </span>
                Report
              </button>

             <Modal 
              style={{marginTop: window.innerWidth <= 576 ? 60 : 20}}
              show={show} onHide={handleClose} centered>
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
                <Button    style={{
        backgroundColor: "#2d4495",
        color: "#fff",
        border: "none",
        fontWeight: "bold",
        borderRadius: 10,
        transition: "none", // Disable transitions
        outline: "none", // Remove focus outline
        boxShadow: "none", // Remove any shadow changes
        cursor: "pointer" // Maintain clickable appearance
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
                      cursor: "pointer" // Maintain clickable appearance
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
        </Container>
        <Container style={{marginBottom: window.innerWidth <= 576 ? "65rem" : "0rem"}}>
          <Row className="g-4">
            {currentItems.map((item) => (
              <Col key={item.id} md={3} sm={6}>

                <Card
                  className="shadow-sm"
                  onClick={() => {
                    navigate(`/CategoryDetail/${item.id}`);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Img
                    variant="top"
                    src={item.image}
                    alt={item.title}
                    style={{ height: "461px", objectFit: "fill", width: "328" }}
                  />
                  <Card>
      <Card.Body>
        <div className="d-flex justify-content-center gap-3 mt-3">
          <Button
            variant="primary"
            className="d-flex align-items-center gap-1"
            style={{
              ...callButtonStyles,
              transition: "all 0.2s ease", // Smooth transition
              padding: "0.375rem 0.75rem", // Match Bootstrap default
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleShowWhatsApp(item.phone);
              setSelectedPhone(item.phone);
            }}
            onMouseEnter={handleCallMouseEnter}
            onMouseLeave={handleCallMouseLeave}
            
          >
            <IoCallOutline style={{ fontSize: "1.5rem", color: callButtonStyles.color }} />
            <span style={{ color: callButtonStyles.color }}>Call</span>
          </Button>
          <Button
            variant="primary"
            className="d-flex align-items-center gap-1"
            style={{
              ...whatsappButtonStyles,
              transition: "all 0.2s ease",
              padding: "0.375rem 0.75rem",
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleShowWhatsApp(item.phone);
              setSelectedPhone(item.phone);
            }}
            onMouseEnter={handleWhatsappMouseEnter}
            onMouseLeave={handleWhatsappMouseLeave}
          >
            <FaWhatsapp style={{ fontSize: "1.5rem", color: whatsappButtonStyles.color }} />
            <span style={{ color: whatsappButtonStyles.color }}>WhatsApp</span>
          </Button>
        </div>
      </Card.Body>
    </Card>
               
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
