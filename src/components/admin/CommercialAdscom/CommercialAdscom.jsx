import React, { useEffect, useState } from "react";
import Header from "../../dyanmic_routes/header/index";
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
import Footer from "../../home/footer/Footer.jsx";
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

  const handleShowWhatsApp = (phone) => {
    setSelectedPhone(phone);
    setShowWhatsApp(true);
  };

  const handleCloseCall = () => setShowCall(false);
  const handleCloseWhatsApp = () => setShowWhatsApp(false);
  const [loading, setLoading] = useState(false);

  // const categories = [
  //     { id: 1, title: "Cars", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq9FsDn0pGVm8ay0WCMuDsv98Xf56FAhFg3Q&s", phone: "+96541117775" },
  //     { id: 2, title: "Jobs", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP60u2MUASTzHB83NhmYT0-CN_b4aS55fzhw&s", phone: "+96552223344" },
  //     { id: 3, title: "Real Estate for Rent", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5KZCLqXG6DjZjCiOEndJcnXLqu6e-KafZjg&s", phone: "+96563334455" },
  //     { id: 4, title: "Electronics",image:"https://vidico.com/app/uploads/2024/04/Best-Commercial-Ads-to-Inspire-Your-Marketing-1.webp", phone: "+96541117775" },
  //     { id: 5 ,title: "Furniture", image: "https://i0.wp.com/www.superbowl-ads.com/wp-content/uploads/2021/01/usatoday_admeter2021.png?fit=1920%2C1080&ssl=1", phone: "+96541117775" },
  //     { id: 6 ,title: "Fashion", image: "https://i.ytimg.com/vi/Tx2DPYeVngw/maxresdefault.jpg", phone: "+96541117775" },
  //     { id: 7 ,title: "Sports", image:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_J0RV_96GQjtxnPbfCFRCyNY4bg11sbHM0g&s", phone: "+96541117775" },
  //     { id: 8, title: "Home & Garden", image: "https://i.ytimg.com/vi/CebzjiESbXc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBsYv5jhw86iScAgxYmyedNeSwfog", phone: "+96541117775" },
  // ];
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
  return (
    <section className="commercial_card_section">
      <div className="container">
        <Header />
        <Container
          className="parent-main"
          style={{ maxWidth: "1530px", paddingTop: "230px" }}
        >
          <div className="d-flex align-items-center justify-content-between my-4 flex-wrap">
            <div className="d-flex align-items-center">
              <button className="btn btn-light" onClick={() => navigate("/")}>
                Home
              </button>
              <span className="mx-2">
                <MdKeyboardArrowRight />
              </span>
              <button
                className="btn btn-light"
                onClick={() => navigate("/ElectronicComp")}
              >
                CommercialAds
              </button>
            </div>
            <div className="d-flex align-items-center justify-content-end">
              {/* Pagination Controls */}
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
            </div>
          </div>
        </Container>

        <hr />

        <h1 className="m-lg-1">Commercial Ads</h1>
        <Container
          className="parent-main"
          style={{ maxWidth: "1530px", paddingTop: "10px" }}
        >
          <div className="d-flex align-items-center justify-content-between my-4 flex-wrap">
            <div className="head2_wrapper">
              <div className="CategoryInfodiv_btn2container">
                <button className="head2btn">
                  <span>
                    <img src={left} alt="leftarrow" />
                  </span>{" "}
                  All
                </button>
                <button className="head2btn">
                  <span>
                    <img src={left} alt="leftarrow" />
                  </span>{" "}
                  Favourite
                </button>

                <button className="head2btn">
                  <span>
                    <img src={report} alt="promote" />
                  </span>
                  Promote
                </button>
                <button className="head2btn">
                  <span>
                    <img src={report} alt="report" />
                  </span>
                  Report
                </button>
              </div>
            </div>
          </div>
        </Container>
        <Container>
          <Row className="g-4">
            {currentItems.map((item) => (
              <Col key={item.id} md={3} sm={6}>
                {/* <Card className="shadow-sm" onClick={() => navigate(/routes/${item.id})} style={{ cursor: "pointer" }}> */}
                <Card
                  className="shadow-sm"
                  onClick={() => {
                    // console.log("Navigating to:", /CategoryDetail/${item.id});
                    // navigate(/CategoryDetail/${item.id})
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
                  <Card.Body className="text-center">
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <Button
                        variant="primary"
                        className="d-flex align-items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShowCall(item.phone);
                          setSelectedPhone(item.phone);
                        }}
                      >
                        <IoCallOutline style={{ width: "50%" }} />
                        <span>Call</span>
                      </Button>
                      <Button
                        variant="primary"
                        className="d-flex align-items-center gap-1"
                        style={{ background: "#09ba50" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShowWhatsApp(item.phone);
                          setSelectedPhone(item.phone);
                        }}
                      >
                        <FaWhatsapp style={{ width: "20%" }} />
                        <span>WhatsApp</span>
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
              <h6 className="fw-bold text-dark">تواصل عبر واتساب</h6>
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
                    width: "28px",
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
      <Footer />
    </section>
  );
};

export default CommercialAdscom;
