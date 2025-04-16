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
              marginLeft: window.innerWidth <= 576 ? "-0.5rem" : "0%",
              marginBottom: window.innerWidth <= 576 ? "10px" : "20px",
              marginTop: window.innerWidth <= 576 ? "10px" : "20px",
            }}
          >
                <button className="head2btn" style={{
                backgroundColor: "white",
                border: "1px solid #2D4495",
                padding: "10px 15px",
                padding: window.innerWidth <= 576 ? "5px" : "10px 15px",
                textAlign: "center",
                width: window.innerWidth <= 576 ? "47%" : "auto"
              }}>
                  <span>
                    <img src={left} alt="leftarrow" />
                  </span>{" "}
                  All
                </button>
                <button className="head2btn" style={{
                backgroundColor: "white",
                border: "1px solid #2D4495",
                padding: "10px 15px",
                padding: window.innerWidth <= 576 ? "5px" : "10px 15px",
                textAlign: "center",
                width: window.innerWidth <= 576 ? "47%" : "auto"
              }}>
                  {/* <span>
                    <img src={left} alt="leftarrow" />
                  </span>{" "} */}
                  Favourite
                </button>

                <button className="head2btn"style={{
                backgroundColor: "white",
                border: "1px solid #2D4495",
                padding: "10px 15px",
                padding: window.innerWidth <= 576 ? "5px" : "10px 15px",
                textAlign: "center",
                width: window.innerWidth <= 576 ? "47%" : "auto"
              }}>
                  <span>
                    <img src={report} alt="promote" />
                  </span>
                  Promote
                </button>
                <button className="head2btn"style={{
                backgroundColor: "white",
                border: "1px solid #2D4495",
                padding: "10px 15px",
                padding: window.innerWidth <= 576 ? "5px" : "10px 15px",
                textAlign: "center",
                width: window.innerWidth <= 576 ? "47%" : "auto"
              }}>
                  <span>
                    <img src={report} alt="report" />
                  </span>
                  Report
                </button>
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
