import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Modal } from "react-bootstrap";
import {
  FaArrowLeft,
  FaPhone,
  FaWhatsapp,
  FaShareAlt,
  FaCopy,
} from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";
// import categories from "../categoiresData/categoiresData";
import { MdKeyboardArrowRight } from "react-icons/md";
import Footer from "../../home/footer/Footer.jsx";
import Header from "../../home/header";
import { v4 as uuidv4 } from "uuid"; // For unique visitor tracking

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
} from "firebase/firestore";
import { db } from "./../../Firebase/FirebaseConfig.jsx";
const CategoryDetail = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();

  // State to manage modals for call and WhatsApp
  const [showCall, setShowCall] = useState(false);
  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const [categories, setcategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(categories.image);
    alert("Link copied to clipboard!");
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

    fetchCarById(); // Call the fetch function
  }, [id]); // Run this effect every time the `id` changes

  if (!categories) {
    return <div>Loading...</div>; // Show a loading message while fetching
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

  const [visitCount, setVisitCount] = useState(0);
  useEffect(() => {
    const trackVisit = async () => {
      const visitorId = localStorage.getItem("visitorId") || uuidv4();
      localStorage.setItem("visitorId", visitorId);

      const docRef = doc(db, "WebsiteStats", "views");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        if (!data.visitors?.includes(visitorId)) {
          await updateDoc(docRef, {
            visitors: arrayUnion(visitorId),
          });
        }
        setTotalVisitors(data.visitors?.length || 0);
      } else {
        await setDoc(docRef, {
          visitors: [visitorId],
        });
        setTotalVisitors(1);
      }
    };

    trackVisit();
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
      backgroundColor: "#0c9e6f",
      borderColor: "#0c9e6f",
      color: "black",
    });
  };
  return (
    <>
    <Container className="mt-5">
      <Header />

      <Container className="parent-main" style={{ maxWidth: "1530px", paddingTop: "230px",marginTop: window.innerWidth <= 576 ? "-9rem" : "-6rem", marginLeft:-10 }}>
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
      <Card className="text-center position-relative" style={{marginBottom: window.innerWidth <= 576 ? "63rem" : "0rem",marginTop: window.innerWidth <= 576 ? "-1rem" : "0rem",}}>
        {/* Wrapper for top-left and top-right text */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "30%",
            margin: "13px auto",
            padding: "0 11px",
          }}
        >
          {/* Top-left text */}
          <div
            className="d-flex gap-2 align-items-center mt-2"
            style={{
              height: "0rem",
              fontSize: "18px",
              // marginLeft: "1.6rem",
              marginLeft: window.innerWidth <= 576 ? "-7rem" : "1.6rem",
              paddingTop: "1rem",
            }}
          >
            <FaRegEye />
            <span style={{ fontWeight: "bold" }} className="gap-2">
              {totalVisitors}
              <span style={{ marginLeft: "3px" }}>Views</span>
            </span>
          </div>

          {/* Top-right text */}
          <span
            style={{
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "18px",
              marginRight: window.innerWidth <= 576 ? "-7rem" : "1.6rem",
              // marginTop: "-5px", // Adjust this value as needed
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
              <FaShareAlt
                width="24px"
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
          <Modal.Header closeButton>
            <Modal.Title>Share Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Wrapping URL in a div with word-break to prevent overflow */}
            <div style={{ wordBreak: "break-all", overflowWrap: "break-word" }}>
              {categories.image}
            </div>
            <Button variant="primary" onClick={handleCopyLink} className="mt-3">
              <FaCopy /> Copy Link
            </Button>
          </Modal.Body>
        </Modal>
        <Card.Img
          variant="top"
          src={categories.image}
          style={{
            maxHeight: "461px",
            maxWidth: "328px",
            width: "100%", // Makes it responsive
            objectFit: "cover",
            margin: "0 auto",
            display: "block",
          }}
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
            onClick={handleOpenCall}
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
            onClick={handleOpenWhatsapp}
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
