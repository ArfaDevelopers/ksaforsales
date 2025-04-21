import React, { useState, useEffect } from "react";
import Footer from "../../home/footer/Footer";
import Header from "../../home/header";
import img from "./home-07.jpg";
import tick from "./tick.png";
import bullet from "./bullet.png";
import profile from "./profileimage.png";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { FaMobile } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { useParams, useLocation } from "react-router";
import { useMyContext } from "../../store/Contexxt.store";
import arrow from "./Vector.png";
import left from "./left.png";
import right from "./right.png";
import share from "./sahere.png";
import report from "./report.png";
import carimg from "./carimg.png";
import { MdMessage } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaBuysellads } from "react-icons/fa";

import image1 from "../../../assets/img/banner/bannerimage1.png";
import image2 from "../../../assets/img/banner/bannerimage2.png";
import image3 from "../../../assets/img/banner/bannerimage3.png";
import image4 from "../../../assets/img/banner/bannerimage4.png";
import { HiMiniSlash } from "react-icons/hi2";

import ads from "./adsimg.png";
import {
  getDocs,
  collection,
  addDoc,
  setDoc,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db,auth } from "../../Firebase/FirebaseConfig";
import { formatDistanceToNow } from "date-fns";
import Spinner from "react-bootstrap/Spinner";
import { Modal, Button, Form } from "react-bootstrap";
import { Container, Row, Col, Card, ButtonGroup, Badge } from "react-bootstrap";
import { MdKeyboardArrowRight } from "react-icons/md";
import { io } from "socket.io-client";
import axios from "axios";
import Chat from "./upperHeader/Chat";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../../../components/userPages/AddLisiting/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import SuggestedAds from "../../../components/home/SuggestedAds/SuggestedAds";
import RatingAndReviews from "../../admin/RatingSection/RatingSection";

const stripePromise = loadStripe(
  "pk_test_51Oqyo3Ap5li0mnBdxJiCZ4k0IEWVbOgGvyMbYB6XVUqYh1yNUEnRiX4e5UO1eces9kf9qZNZcF7ybjxg7MimKmUQ00a9s60Pa1"
);

 let socket;
const Dynamic_Route = () => {
  const { id } = useParams();
  const location = useLocation(); // Access the full location object

  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };
  const [_Id, setId] = useState(null); // State to store ads data
  const [callingFrom, setCallingFrom] = useState(null); // State to store ads data
  const link = getQueryParam("link") || window.location.href;
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [loading, setLoading] = useState(false); // Loading state
  const [show, setShow] = useState(false);

  const receiverNumber = "+923445101462"; // The number you want to call
  const [calling, setCalling] = useState(false);
  const [showReport, setshowReport] = useState(false);
  const [FeaturedAds, setFeaturedAds] = useState(false);
  const handleCheckboxChangePromote = () => {
    setFeaturedAds((prev) => {
      const newState = !prev;
      if (newState) {
        console.log("True");
        console.log("Featured Ads");
      } else {
        console.log("Not Featured Ads");
      }
      return newState;
    });
  };

  const handleShowReport = () => {
    setshowReport(true);
  };

  const makeCall = async (Phone) => {
    setCalling(true);
    try {
      const response = await fetch("http://localhost:9002/route/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: Phone, receiverNumber: receiverNumber }),
      });

      const data = await response.json();
      if (data.success) {
        alert(`Call initiated to ${receiverNumber}`);
      } else {
        alert("Call failed: " + data.message);
      }
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setCalling(false);
    }
  };
  const [reportTypes, setReportTypes] = useState([
    "Sexual",
    "Illegal",
    "Abusive",
    "Harassment",
    "Fraud",
    "Spam",
  ]);
  const [selectedReports, setSelectedReports] = useState([]);
  const [reportText, setReportText] = useState("");
  const [itemData, setItemData] = useState(null); // State to store ads data
  const [showPhone, setShowPhone] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  console.log(itemData?.userId, "selectedReports_______itemData");
  console.log(selectedImage, "selectedReports_______", reportText);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] = useState(
    "d38e0cee-daa7-46e2-bfd1-d7f9c4683546"
  );
  const [receiverId, setReceiverId] = useState("3");
  const [chatId, setChatId] = useState("");
  const [refresh, setRefresh] = useState(false);
  //  const [userId, setUserId] = useState(null);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };
  const user1 = auth.currentUser;
  const userId = user1?.uid;
  const collectionName1 =
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
  const handleCall = async (phoneNumber) => {
    try {
      const response = await axios.post("http://localhost:9002/api/call", {
        to: phoneNumber,
      });
      console.log("Call Initiated:", response.data);
    } catch (error) {
      console.error("Error making the call:", error);
    }
  };
  console.log("Fetched messages:receivedMessages", receivedMessages);
 
  const handleSend = async () => {
    const user = auth.currentUser;
    const userId = user?.uid;
 
    if (message.trim() && userId && itemData.userId) {
      try {
        const response = await fetch(
          "https://ksaforsaleapis.vercel.app/api/messages",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content: message,
              sender: userId,
              receiver: itemData.userId,
              from: "client",
            }),
          }
        );
 
        if (!response.ok) {
          throw new Error("Failed to send message");
        }
 
        const data = await response.json();
        console.log("Message sent:", data);
        setRefresh(!refresh);
        setMessage("");
        // setShowModal(false); // Close modal
      } catch (error) {
        console.error("Error sending message:", error);
        alert("Failed to send message. Please try again.");
      }
    } else {
      alert("Message content and sender/receiver IDs are required.");
    }
  };
  const user = auth.currentUser;
 //  const userId = user?.uid;
  const recieverId = itemData?.userId;
 
  const [chatIds, setChatIds] = useState([]);
 
  useEffect(() => {
    const fetchChatIds = async () => {
      try {
        const messagesRef = collection(db, "messages");
 
        // Query to get messages where sender-receiver pair exists in either order
        const q = query(
          messagesRef,
          or(
            where("sender", "==", userId),
            where("receiver", "==", userId),
            where("sender", "==", recieverId),
            where("receiver", "==", recieverId)
          )
        );
 
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const chatIdsArray = querySnapshot.docs.map(
            (doc) => doc.data().chat_id
          );
          console.log("No chats foundchatIdsArray__________", chatIdsArray);
 
          setChatIds(chatIdsArray);
        } else {
          console.log("No chats found1");
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
 
    if (userId && recieverId) {
      fetchChatIds();
    }
  }, [userId, recieverId]);
 

  useEffect(() => {
    const fetchChatIdAndMessages = async () => {
      try {
        const { data: chatData } = await axios.get(
          `https://ksaforsaleapis.vercel.app/api/chat-id/${userId}/${itemData.userId}`
        );
 
        if (!chatData.success) {
          console.log("No chat found");
          return;
        }
 
        const chatId = chatData.chatId;
 
        // Now fetch messages using chatId
        const { data: messagesData } = await axios.get(
          `https://ksaforsaleapis.vercel.app/api/messages/${chatId}`
        );
 
        setReceivedMessages(messagesData?.data || []);
        console.log("Fetched messages:", messagesData);
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };
 
    fetchChatIdAndMessages();
  }, [refresh, itemData?.userId, userId]);
 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          "https://ksaforsaleapis.vercel.app/route/api/users"
        );
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
 
    socket = io("https://ksaforsaleapis.vercel.app/route");
    socket.on("message", (msg) => {
      setReceivedMessages((prevMessages) => [
        ...prevMessages,
        { senderId: msg.sender, content: msg.content },
      ]);
    });
 
    fetchUsers();
 
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);
 
  const fetchChats = async (userId) => {
    try {
      const { data } = await axios.get(
        `https://ksaforsaleapis.vercel.app/route/api/chats/${userId}`
      );
      setChats(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };
 
  const fetchMessages = async (chatId) => {
    try {
      const { data } = await axios.get(
        `https://ksaforsaleapis.vercel.app/route/api/messages/${chatId}`
      );
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
 
 
 
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Go to previous page
    } else {
      // Optionally redirect to Home or disable button
      console.log("Already on the first page!");
      // window.location.href = "/home"; // Uncomment if Home redirect is desired
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1); // Go to next page
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const handleImageSelect = (newImage) => setSelectedImage(newImage);
  const handleImageSelect = (image) => setSelectedImage(image);
  const [showAllThumbnails, setShowAllThumbnails] = useState(false); // State to toggle thumbnails
  const handleNextImage = () => {
    const images = itemData?.galleryImages?.length
      ? itemData.galleryImages
      : [img];
    const currentIndex = images.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };
  const handlePrevImage = () => {
    const images = itemData?.galleryImages?.length
      ? itemData.galleryImages
      : [img];
    const currentIndex = images.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };
  const handleCheckboxChange = (type) => {
    setSelectedReports((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const [successShow, setSuccessShow] = useState(false);
  const handleSuccessClose = () => setSuccessShow(false);
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

  console.log(itemData, "item Data__________-itemData");
  // const NewId = callingFrom === "automotive" || "RealEstate" ? _Id : id;
  const NewId =
    callingFrom === "AutomotiveComp"
      ? _Id
      : callingFrom === "ElectronicComp"
      ? _Id
      : callingFrom === "FashionStyle"
      ? _Id
      : callingFrom === "HealthCareComp"
      ? _Id
      : callingFrom === "JobBoard"
      ? _Id
      : callingFrom === "Education"
      ? _Id
      : callingFrom === "RealEstateComp"
      ? _Id
      : callingFrom === "TravelComp"
      ? _Id
      : callingFrom === "SportGamesComp"
      ? _Id
      : callingFrom === "PetAnimalsComp"
      ? _Id
      : id;

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
        setError("Failed to fetch data");
        setLoading(false); // Stop loading on error
      }
    };

    fetchItem(); // Call the fetch function
  }, [id, callingFrom, db,location]); // Re-run if `id` changes

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: Add a light overlay
        }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    ); // Display loading state
  }

  if (!itemData) {
    return <p>No item found for the given ID.</p>; // Handle case where no item matches the `id`
  }

  const postedTime = itemData.createdAt?.toDate
    ? itemData.createdAt.toDate()
    : null;
  const timeAgo = postedTime
    ? formatDistanceToNow(postedTime, { addSuffix: true })
    : "Unknown time";

  const images = itemData?.galleryImages || []; // Ensure images are taken from galleryImages

  const featuresData = [
    ["Ads", "Normal Condition", "Immobilizer Key", "Power Mirrors"],
    ["Ads", "Normal Condition", "Immobilizer Key", "Power Mirrors"],
    ["Ads", "Normal Condition", "Immobilizer Key", "Power Mirrors"],
  ];
  const visibleImages = showAllThumbnails ? images : images.slice(0, 5); // Show 5 or all

  
  return (
    <>
      <div className="main-wrapper ">
        <Header />

        <Container
          className="parent-main"
          style={{
            paddingLeft: "2px", // Padding on the left side
            paddingRight: "2px", // Padding on the right side
            color: "black", // Text color
            maxWidth: "1530px", // Optional: Add max-width to ensure padding is visible
            margin: "0 auto", // Optional: Center the container if desired
            marginTop: window.innerWidth <= 576 ? "9rem" : "13rem",

          }}
        >
          <div
            className="adsCategory_head"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginLeft: window.innerWidth <= 576 ? "0.7rem" : "7.7%",
              marginTop: "40px",
              alignItems: "center",
            }}
          >
            <button
              className="btn"
              style={{
                background: window.innerWidth <= 576 ? "none" : "#E9EEFF",
                // background: "#E9EEFF",
                fontWeight: "500",
                pointerEvents: "none",
                padding: window.innerWidth <= 576 ? "0px" : "10px 15px",
              }}
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
            >
              {callingFrom}{" "}
            </button>
          </div>
          <hr
  style={{
    color: "#000000",
    marginTop: "14.83px",
    marginBottom: "14.3px",
    width: window.innerWidth <= 576 ? "95%" : "85%",
    marginLeft: "auto", // Center the line
    marginRight: "auto",
  }}
/>
          <div>
            <h1
              style={{ marginLeft: window.innerWidth <= 576 ? "0.7rem" : "7.7%",marginTop: window.innerWidth <= 576 ? "10px" : "20px", fontSize: "24px" }}
            >
              {itemData?.title || "Default Title"}{" "}
            </h1>
          </div>
          <div
            className="CategoryInfodiv_btn2container"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginLeft: window.innerWidth <= 576 ? "0.7rem" : "7.7%",
              marginBottom: window.innerWidth <= 576 ? "10px" : "20px",
              marginTop: window.innerWidth <= 576 ? "10px" : "20px"
            }}
          >
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
                  <img src={left} alt="leftarrow" />
                </span>{" "}
              Favourite
            </button>
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
                            <h6 style={{ wordBreak: "break-all" }}>{link}</h6>
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
              {itemData.userId===userId?

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
                {/* <img src="your-report-image-source" alt="promote" /> */}
                <FaBuysellads />
              </span>
              Promote
            </button>:''     }    
                {/* <button className="head2btn mt-4" onClick={handleShowReport}>
                  <span>
                     <FaBuysellads />
                  </span>
                  Promote
                </button> */}

                {/* Modal */}
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
                          {/* <label>
                            <input
                              type="checkbox"
                              checked={FeaturedAds}
                              onChange={handleCheckboxChangePromote}
                            />
                            Featured Ads
                          </label> */}
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
                )}
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

        <Container
          fluid
          style={{
            paddingLeft: "10px", // Padding on the left side
            paddingRight: "1px", // Padding on the right side
            color: "black", // Text color
            maxWidth: "1300px", // Optional: Add max-width to ensure padding is visible
            margin: "0 auto", // Optional: Center the container if desired
            marginLeft: window.innerWidth <= 576 ? "-0.3rem" : "16%",
            marginBottom: window.innerWidth <= 576 ? "10rem" : "0rem",
            // margintop: window.innerWidth <= 576 ? "0px" : "-30px",


          }}
        >
              <div className="d-flex flex-wrap justify-content-end">
              <p
                style={{
                  color: "black",
                  fontWeight: "400",
                  // marginBottom: "24.5px",
                }}
              >
                Posted {itemData?.timeAgo || "Loading..."}
              </p>
            </div>
          <Row>
            {/* Sidebar */}
            <Col md={8} style={{marginLeft: window.innerWidth <= 576 ? -5 : -20}}>
            {callingFrom === "AutomotiveComp" ? (
                    // <div className="col  border-none container ">
                    //   <div className="col  border-none">\
                    <>
                      <div style={{marginLeft: window.innerWidth <= 576 ? 5 : 10}}>
                       
                        {/* Main Image with Previous & Next Buttons */}
                        <div
  style={{
    position: "relative",
    textAlign: "center",
  }}
>
  <img
    src={selectedImage ? selectedImage : itemData?.galleryImages[0]}
    className="w-md-24 heightofDetailpageimage"
    alt={itemData?.title || "Default Item"}
    style={{
      width: "100%",
      marginTop: "1rem",
      borderRadius: "0.3rem",
    }}
  />
  {/* Previous Button */}
  <button
    onClick={handlePrevImage}
    style={{
      position: "absolute",
      left: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgb(252, 252, 252)",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
    }}
  >
    <img src={left} alt="Previous" width={30} />
  </button>

  {/* Next Button */}
  <button
    onClick={handleNextImage}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgb(236, 236, 236)",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
    }}
  >
    <img src={right} alt="Next" width={30} />
  </button>

  {/* Image Counter */}
  <div
    style={{
      position: "absolute",
      bottom: "10px",
      right: "10px",
      background: "rgba(0, 0, 0, 0.5)",
      color: "white",
      padding: "5px 10px",
      borderRadius: "15px",
      fontSize: "14px",
    }}
  >
    {`${
      itemData?.galleryImages.indexOf(selectedImage) + 1 || 1
    } of ${itemData?.galleryImages.length} photos`}
  </div>
</div>

{/* Thumbnail Images */}
<div
  className="multiplesimage-wrapper"
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "1rem",
    flexWrap: "nowrap",
    overflow: "hidden",
  }}
>
  {visibleImages.map((image, index) => (
    <div
      className="multiplesimage-wrapper-item"
      key={index}
      onClick={() => handleImageSelect(image)}
      style={{
        cursor: "pointer",
        border: selectedImage === image ? "2px solid blue" : "none",
        padding: "5px",
      }}
    >
      <img
        src={image}
        alt={`Car ${index + 1}`}
        className="images"
        style={{
          width: "80px",
          height: "60px",
          borderRadius: "5px",
        }}
      />
    </div>
  ))}
  {/* Arrow Button for More Images */}
  {images.length > 5 && (
    <button
      onClick={() => setShowAllThumbnails(!showAllThumbnails)}
      style={{
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        border: "none",
        backgroundColor: "#007bff",
        color: "white",
        fontSize: "16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "10px",
      }}
    >
      {showAllThumbnails ? "−" : "+"}
    </button>
  )}
</div>
                      </div>

                      <div className="border-none info_wrapper " style={{marginLeft: window.innerWidth <= 576 ? 5 : 10,}}>
                        <div className="col">
                    
                              <div className="table-responsive info_table">
                                <table className="table">
                                 <tbody className="info_body">
  {Object.entries({
    "Seller Type": itemData?.SellerType || "Default Seller Type",
    "Registered City": itemData?.Registeredin || "Default Registered City",
    Assembly: itemData?.Assembly || "Default Assembly",
    "Engine Capacity": itemData?.EngineCapacity || "Default Engine Capacity",
    "Body Type": itemData?.BodyType || "Default Body Type",
    "Last Updated": itemData?.timeAgo || "Default Last Updated",
    Condition: itemData?.Condition || "Default Condition",
    "Exterior Color": itemData?.ExteriorColor || "Default Color",
    Purpose: itemData?.Purpose || "Default Purpose",
    Model: itemData?.Model || "Default Model",
    Color: itemData?.Color || "Default Color",
  })
    .filter(([_, value]) => value)
    .map(([label, value], index) => (
      <tr key={index} className="border-bottom">
        <th className="table_text">{label}:</th>
        <td className="table_text">{value}</td>
      </tr>
    ))}
</tbody>

                                </table>
                              </div>
                          

                          <div>
                            <h1
                              className="mb-3"
                             
                            >
                              More  Features
                            </h1>
                            <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: "0 15px",
      }}
    >
      {featuresData.map((column, columnIndex) => (
        <div
          key={columnIndex}
          style={{
            flex: "0 0 32%", // Approximately 1/3 width for 3 columns on md and up
            maxWidth: "32%",
            // marginBottom: "15px",
            "@media (max-width: 767.98px)": {
              flex: "0 0 100%", // Full width on mobile
              maxWidth: "100%",
            },
          }}
        >
          {column.map((feature, index) => (
            <p
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
                "@media (max-width: 767.98px)": {
                  marginBottom: "8px", // Reduced gap on mobile
                },
              }}
            >
              <span
                style={{
                  marginRight: "8px",
                }}
              >
                <img
                  src={tick}
                  alt="tick"
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                />
              </span>
              {feature}
            </p>
          ))}
        </div>
      ))}
    </div>
    <style>
  {`
    @media (max-width: 767.98px) {
      div[style*="flex: 0 0 32%"] {
        flex: 0 0 100% !important;
        max-width: 100% !important;
      }
      p[style*="margin-bottom: 15px"] {
        margin-bottom: 8px !important;
      }
    }
  `}
</style>
                            <div className="descriptions_wrapper" >
                              <h1
                                className="fw-bold"
                                style={{ padding: "20px",marginLeft:-12 }}
                              >
                                Description:
                              </h1>
                              <p className="descriptions_para">
                                {" "}
                                {itemData.description}
                              </p>
                          
                              <div className="col-md-1  border-none w-100 ads_features_wrapper ">
                               
                                <div>
                                  
                                  <p className="morefeatures_para">
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Itaque ipsam aperiam vero
                                    officia praesentium facilis.
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Itaque ipsam aperiam vero
                                    officia praesentium facilis.
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Itaque ipsam aperiam vero
                                    officia praesentium facilis.
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Itaque ipsam aperiam vero
                                    officia praesentium facilis.
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Itaque ipsam aperiam vero
                                    officia praesentium facilis.
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Itaque ipsam aperiam vero
                                    officia praesentium facilis.
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Itaque ipsam aperiam vero
                                    officia praesentium facilis.
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Itaque ipsam aperiam vero
                                    officia praesentium facilis.
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Itaque ipsam aperiam vero
                                    officia praesentium facilis.
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Itaque ipsam aperiam vero
                                    officia praesentium facilis.
                                  </p>

                               
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : callingFrom === "ElectronicComp" ? (
                    <div className="col  border-none container ">
                      <div className="col  border-none">
                       
                        <div>
                          {/* Main Image with Previous & Next Buttons */}
                          <div
  style={{
    position: "relative",
    textAlign: "center",
  }}
>
  <img
    src={selectedImage ? selectedImage : itemData?.galleryImages[0]}
    className="w-md-24 heightofDetailpageimage"
    alt={itemData?.title || "Default Item"}
    style={{
      width: "100%",
      marginTop: "1rem",
      borderRadius: "0.3rem",
    }}
  />
  {/* Previous Button */}
  <button
    onClick={handlePrevImage}
    style={{
      position: "absolute",
      left: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgb(252, 252, 252)",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
    }}
  >
    <img src={left} alt="Previous" width={30} />
  </button>

  {/* Next Button */}
  <button
    onClick={handleNextImage}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgb(236, 236, 236)",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
    }}
  >
    <img src={right} alt="Next" width={30} />
  </button>

  {/* Image Counter */}
  <div
    style={{
      position: "absolute",
      bottom: "10px",
      right: "10px",
      background: "rgba(0, 0, 0, 0.5)",
      color: "white",
      padding: "5px 10px",
      borderRadius: "15px",
      fontSize: "14px",
    }}
  >
    {`${
      itemData?.galleryImages.indexOf(selectedImage) + 1 || 1
    } of ${itemData?.galleryImages.length} photos`}
  </div>
</div>

{/* Thumbnail Images */}
<div
  className="multiplesimage-wrapper"
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "1rem",
    flexWrap: "nowrap",
    overflow: "hidden",
  }}
>
  {visibleImages.map((image, index) => (
    <div
      className="multiplesimage-wrapper-item"
      key={index}
      onClick={() => handleImageSelect(image)}
      style={{
        cursor: "pointer",
        border: selectedImage === image ? "2px solid blue" : "none",
        padding: "5px",
      }}
    >
      <img
        src={image}
        alt={`Car ${index + 1}`}
        className="images"
        style={{
          width: "80px",
          height: "60px",
          borderRadius: "5px",
        }}
      />
    </div>
  ))}
  {/* Arrow Button for More Images */}
  {images.length > 5 && (
    <button
      onClick={() => setShowAllThumbnails(!showAllThumbnails)}
      style={{
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        border: "none",
        backgroundColor: "#007bff",
        color: "white",
        fontSize: "16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "10px",
      }}
    >
      {showAllThumbnails ? "−" : "+"}
    </button>
  )}
</div>
                        </div>
                        <div className="border-none info_wrapper " style={{marginLeft: window.innerWidth <= 576 ? "0rem" : "-0.7rem",}}>
                          <div className="col">
                          <div className="table-responsive info_table">
  <table className="table table-borderless">
    <tbody className="info_body">
      <tr className="border-bottom">
        <th className="table_text">Seller Type:</th>
        <td className="table_text">{itemData?.sellerType || "Default Seller Type"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">RAM:</th>
        <td className="table_text">{itemData?.RAM || "No RAM"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Assembly:</th>
        <td className="table_text">{itemData?.Assembly || "Default Assembly"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Graphics Card:</th>
        <td className="table_text">{itemData?.GraphicsCard || "No Graphics Card"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Body Type:</th>
        <td className="table_text">{itemData?.bodyType || "Default Body Type"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Last Updated:</th>
        <td className="table_text">{itemData?.lastUpdated || "Default Last Updated"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Brand:</th>
        <td className="table_text">{itemData?.Brand || "Default Condition"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Battery Life:</th>
        <td className="table_text">{itemData?.BatteryLife || "No Battery Life"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Operating System:</th>
        <td className="table_text">{itemData?.OperatingSystem || "Default OS"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Model:</th>
        <td className="table_text">{itemData?.model || "Default Model"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Type:</th>
        <td className="table_text">{itemData?.type || "Default Type"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Screen Size:</th>
        <td className="table_text">{itemData?.ScreenSize || "No Screen Size"}</td>
      </tr>
    </tbody>
  </table>
</div>

                            <div>
                              <h1
                                className="mb-3"
                                style={{ paddingLeft: "15px" }}
                              >
                                Features
                              </h1>
                              <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: "0 15px",
      }}
    >
      {featuresData.map((column, columnIndex) => (
        <div
          key={columnIndex}
          style={{
            flex: "0 0 32%", // Approximately 1/3 width for 3 columns on md and up
            maxWidth: "32%",
            // marginBottom: "15px",
            "@media (max-width: 767.98px)": {
              flex: "0 0 100%", // Full width on mobile
              maxWidth: "100%",
            },
          }}
        >
          {column.map((feature, index) => (
            <p
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
                "@media (max-width: 767.98px)": {
                  marginBottom: "8px", // Reduced gap on mobile
                },
              }}
            >
              <span
                style={{
                  marginRight: "8px",
                }}
              >
                <img
                  src={tick}
                  alt="tick"
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                />
              </span>
              {feature}
            </p>
          ))}
        </div>
      ))}
    </div>
    <style>
  {`
    @media (max-width: 767.98px) {
      div[style*="flex: 0 0 32%"] {
        flex: 0 0 100% !important;
        max-width: 100% !important;
      }
      p[style*="margin-bottom: 15px"] {
        margin-bottom: 8px !important;
      }
    }
  `}
</style>

                              <div className="descriptions_wrapper">
                                <h1
                                  className="fw-bold"
                                  style={{ padding: "20px",marginLeft:-12 }}
                                >
                                  Description:
                                </h1>
                                <p className="descriptions_para">
                                  {" "}
                                  {itemData.description}
                                </p>
                               
                           <div className="col-md-1  border-none w-100 ads_features_wrapper ">
                               
                               <div>
                                 
                                 <p className="morefeatures_para">
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                 </p>

                               
                               </div>
                             </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : callingFrom === "FashionStyle" ? (
                    <div className="col  border-none container ">
                      <div className="col  border-none">
                       
                        <div>
                          {/* Main Image with Previous & Next Buttons */}
                          <div
  style={{
    position: "relative",
    textAlign: "center",
  }}
>
  <img
    src={selectedImage ? selectedImage : itemData?.galleryImages[0]}
    className="w-md-24 heightofDetailpageimage"
    alt={itemData?.title || "Default Item"}
    style={{
      width: "100%",
      marginTop: "1rem",
      borderRadius: "0.3rem",
    }}
  />
  {/* Previous Button */}
  <button
    onClick={handlePrevImage}
    style={{
      position: "absolute",
      left: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgb(252, 252, 252)",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
    }}
  >
    <img src={left} alt="Previous" width={30} />
  </button>

  {/* Next Button */}
  <button
    onClick={handleNextImage}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgb(236, 236, 236)",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
    }}
  >
    <img src={right} alt="Next" width={30} />
  </button>

  {/* Image Counter */}
  <div
    style={{
      position: "absolute",
      bottom: "10px",
      right: "10px",
      background: "rgba(0, 0, 0, 0.5)",
      color: "white",
      padding: "5px 10px",
      borderRadius: "15px",
      fontSize: "14px",
    }}
  >
    {`${
      itemData?.galleryImages.indexOf(selectedImage) + 1 || 1
    } of ${itemData?.galleryImages.length} photos`}
  </div>
</div>

{/* Thumbnail Images */}
<div
  className="multiplesimage-wrapper"
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "1rem",
    flexWrap: "nowrap",
    overflow: "hidden",
  }}
>
  {visibleImages.map((image, index) => (
    <div
      className="multiplesimage-wrapper-item"
      key={index}
      onClick={() => handleImageSelect(image)}
      style={{
        cursor: "pointer",
        border: selectedImage === image ? "2px solid blue" : "none",
        padding: "5px",
      }}
    >
      <img
        src={image}
        alt={`Car ${index + 1}`}
        className="images"
        style={{
          width: "80px",
          height: "60px",
          borderRadius: "5px",
        }}
      />
    </div>
  ))}
  {/* Arrow Button for More Images */}
  {images.length > 5 && (
    <button
      onClick={() => setShowAllThumbnails(!showAllThumbnails)}
      style={{
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        border: "none",
        backgroundColor: "#007bff",
        color: "white",
        fontSize: "16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "10px",
      }}
    >
      {showAllThumbnails ? "−" : "+"}
    </button>
  )}
</div>
                        </div>
                        <div className="border-none info_wrapper " style={{marginLeft: window.innerWidth <= 576 ? "0rem" : "-0.7rem",}}>
                          <div className="col">
                          <div className="table-responsive info_table">
  <table className="table table-borderless">
    <tbody className="info_body">
      <tr className="border-bottom">
        <th className="table_text">Seller Type:</th>
        <td className="table_text">{itemData?.sellerType || "Default Seller Type"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Gender:</th>
        <td className="table_text">{itemData?.Gender || "No Gender"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Closure Type:</th>
        <td className="table_text">{itemData?.ClosureType || "No ClosureType"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Material:</th>
        <td className="table_text">{itemData?.Material || "No Material"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Collar Type:</th>
        <td className="table_text">{itemData?.CollarType || "Default CollarType"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Last Updated:</th>
        <td className="table_text">{itemData?.lastUpdated || "Default last updated"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Brand:</th>
        <td className="table_text">{itemData?.Brand || "Default Condition"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Season:</th>
        <td className="table_text">{itemData?.Season || "No Season"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Color:</th>
        <td className="table_text">{itemData?.Color || "Default Color"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">WashType:</th>
        <td className="table_text">{itemData?.WashType || "Default WashType"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Type:</th>
        <td className="table_text">{itemData?.type || "Default color"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">StyleDesign:</th>
        <td className="table_text">{itemData?.StyleDesign || "No StyleDesign"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Fit:</th>
        <td className="table_text">{itemData?.Fit || "No Fit"}</td>
      </tr>
    </tbody>
  </table>
</div>

                            <div>
                              <h1
                                className="mb-3"
                                style={{ paddingLeft: "15px" }}
                              >
                                Features
                              </h1>
                              <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: "0 15px",
      }}
    >
      {featuresData.map((column, columnIndex) => (
        <div
          key={columnIndex}
          style={{
            flex: "0 0 32%", // Approximately 1/3 width for 3 columns on md and up
            maxWidth: "32%",
            // marginBottom: "15px",
            "@media (max-width: 767.98px)": {
              flex: "0 0 100%", // Full width on mobile
              maxWidth: "100%",
            },
          }}
        >
          {column.map((feature, index) => (
            <p
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
                "@media (max-width: 767.98px)": {
                  marginBottom: "8px", // Reduced gap on mobile
                },
              }}
            >
              <span
                style={{
                  marginRight: "8px",
                }}
              >
                <img
                  src={tick}
                  alt="tick"
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                />
              </span>
              {feature}
            </p>
          ))}
        </div>
      ))}
    </div>
    <style>
  {`
    @media (max-width: 767.98px) {
      div[style*="flex: 0 0 32%"] {
        flex: 0 0 100% !important;
        max-width: 100% !important;
      }
      p[style*="margin-bottom: 15px"] {
        margin-bottom: 8px !important;
      }
    }
  `}
</style>

                              <div className="descriptions_wrapper" >
                                <h1
                                  className="fw-bold"
                                  style={{ padding: "20px",marginLeft:-12 }}
                                >
                                  Description:
                                </h1>
                                <p className="descriptions_para">
                                  {" "}
                                  {itemData.description}
                                </p>
                               
                           <div className="col-md-1  border-none w-100 ads_features_wrapper ">
                               
                               <div>
                                 
                                 <p className="morefeatures_para">
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                 </p>

                            
                               </div>
                             </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : callingFrom === "HealthCareComp" ? (
                    <div className="col  border-none container ">
                      <div className="col  border-none">
                        <div>
                         
                          <div
  style={{
    position: "relative",
    textAlign: "center",
  }}
>
  <img
    src={selectedImage ? selectedImage : itemData?.galleryImages[0]}
    className="w-md-24 heightofDetailpageimage"
    alt={itemData?.title || "Default Item"}
    style={{
      width: "100%",
      marginTop: "1rem",
      borderRadius: "0.3rem",
    }}
  />
  {/* Previous Button */}
  <button
    onClick={handlePrevImage}
    style={{
      position: "absolute",
      left: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgb(252, 252, 252)",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
    }}
  >
    <img src={left} alt="Previous" width={30} />
  </button>

  {/* Next Button */}
  <button
    onClick={handleNextImage}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgb(236, 236, 236)",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
    }}
  >
    <img src={right} alt="Next" width={30} />
  </button>

  {/* Image Counter */}
  <div
    style={{
      position: "absolute",
      bottom: "10px",
      right: "10px",
      background: "rgba(0, 0, 0, 0.5)",
      color: "white",
      padding: "5px 10px",
      borderRadius: "15px",
      fontSize: "14px",
    }}
  >
    {`${
      itemData?.galleryImages.indexOf(selectedImage) + 1 || 1
    } of ${itemData?.galleryImages.length} photos`}
  </div>
</div>

{/* Thumbnail Images */}
<div
  className="multiplesimage-wrapper"
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "1rem",
    flexWrap: "nowrap",
    overflow: "hidden",
  }}
>
  {visibleImages.map((image, index) => (
    <div
      className="multiplesimage-wrapper-item"
      key={index}
      onClick={() => handleImageSelect(image)}
      style={{
        cursor: "pointer",
        border: selectedImage === image ? "2px solid blue" : "none",
        padding: "5px",
      }}
    >
      <img
        src={image}
        alt={`Car ${index + 1}`}
        className="images"
        style={{
          width: "80px",
          height: "60px",
          borderRadius: "5px",
        }}
      />
    </div>
  ))}
  {/* Arrow Button for More Images */}
  {images.length > 5 && (
    <button
      onClick={() => setShowAllThumbnails(!showAllThumbnails)}
      style={{
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        border: "none",
        backgroundColor: "#007bff",
        color: "white",
        fontSize: "16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "10px",
      }}
    >
      {showAllThumbnails ? "−" : "+"}
    </button>
  )}
</div>
                        </div>
                        <div className="border-none info_wrapper " style={{marginLeft: window.innerWidth <= 576 ? "0rem" : "-0.7rem",}}>
                          <div className="col">
                          <div className="table-responsive info_table">
  <table className="table table-borderless">
    <tbody className="info_body">
      <tr className="border-bottom">
        <th className="table_text">Accuracy:</th>
        <td className="table_text">{itemData?.Accuracy || "No Accuracy"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Battery Type:</th>
        <td className="table_text">{itemData?.BatteryType || "No BatteryType"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Compatibility:</th>
        <td className="table_text">{itemData?.Compatibility || "No Compatibility"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">CuffSize:</th>
        <td className="table_text">{itemData?.CuffSize || "No CuffSize"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Display Type:</th>
        <td className="table_text">{itemData?.DisplayType || "Default DisplayType"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Last Updated:</th>
        <td className="table_text">{itemData?.lastUpdated || "Default last updated"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Features:</th>
        <td className="table_text">{itemData?.Features || "Default Features"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Measurement Range:</th>
        <td className="table_text">{itemData?.MeasurementRange || "No MeasurementRange"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Measurement Units:</th>
        <td className="table_text">{itemData?.MeasurementUnits || "Default MeasurementUnits"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">WashType:</th>
        <td className="table_text">{itemData?.WashType || "Default WashType"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Type:</th>
        <td className="table_text">{itemData?.Type || "Default Type"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Storage Capacity:</th>
        <td className="table_text">{itemData?.StorageCapacity || "No StorageCapacity"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Seller Type:</th>
        <td className="table_text">{itemData?.SellerType || "No SellerType"}</td>
      </tr>
    </tbody>
  </table>
</div>

                            <div>
                              <h1
                                className="mb-3"
                                style={{ paddingLeft: "15px" }}
                              >
                                Features
                              </h1>
                              <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: "0 15px",
      }}
    >
      {featuresData.map((column, columnIndex) => (
        <div
          key={columnIndex}
          style={{
            flex: "0 0 32%", // Approximately 1/3 width for 3 columns on md and up
            maxWidth: "32%",
            // marginBottom: "15px",
            "@media (max-width: 767.98px)": {
              flex: "0 0 100%", // Full width on mobile
              maxWidth: "100%",
            },
          }}
        >
          {column.map((feature, index) => (
            <p
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
                "@media (max-width: 767.98px)": {
                  marginBottom: "8px", // Reduced gap on mobile
                },
              }}
            >
              <span
                style={{
                  marginRight: "8px",
                }}
              >
                <img
                  src={tick}
                  alt="tick"
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                />
              </span>
              {feature}
            </p>
          ))}
        </div>
      ))}
    </div>
    <style>
  {`
    @media (max-width: 767.98px) {
      div[style*="flex: 0 0 32%"] {
        flex: 0 0 100% !important;
        max-width: 100% !important;
      }
      p[style*="margin-bottom: 15px"] {
        margin-bottom: 8px !important;
      }
    }
  `}
</style>

                              <div className="descriptions_wrapper" >
                                <h1
                                  className="fw-bold"
                                  style={{ padding: "20px",marginLeft:-12 }}
                                >
                                  Description:
                                </h1>
                                <p className="descriptions_para">
                                  {" "}
                                  {itemData.description}
                                </p>
                           <div className="col-md-1  border-none w-100 ads_features_wrapper ">
                               
                               <div>
                                 
                                 <p className="morefeatures_para">
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                 </p>

                               </div>
                             </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : callingFrom === "JobBoard" ? (
                    <div className="col  border-none container ">
                      <div className="col  border-none">
                        <div>
                          {/* Main Image with Previous & Next Buttons */}
                        
                          <div
  style={{
    position: "relative",
    textAlign: "center",
  }}
>
  <img
    src={selectedImage ? selectedImage : itemData?.galleryImages[0]}
    className="w-md-24 heightofDetailpageimage"
    alt={itemData?.title || "Default Item"}
    style={{
      width: "100%",
      marginTop: "1rem",
      borderRadius: "0.3rem",
    }}
  />
  {/* Previous Button */}
  <button
    onClick={handlePrevImage}
    style={{
      position: "absolute",
      left: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgb(252, 252, 252)",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
    }}
  >
    <img src={left} alt="Previous" width={30} />
  </button>

  {/* Next Button */}
  <button
    onClick={handleNextImage}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgb(236, 236, 236)",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
    }}
  >
    <img src={right} alt="Next" width={30} />
  </button>

  {/* Image Counter */}
  <div
    style={{
      position: "absolute",
      bottom: "10px",
      right: "10px",
      background: "rgba(0, 0, 0, 0.5)",
      color: "white",
      padding: "5px 10px",
      borderRadius: "15px",
      fontSize: "14px",
    }}
  >
    {`${
      itemData?.galleryImages.indexOf(selectedImage) + 1 || 1
    } of ${itemData?.galleryImages.length} photos`}
  </div>
</div>

{/* Thumbnail Images */}
<div
  className="multiplesimage-wrapper"
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "1rem",
    flexWrap: "nowrap",
    overflow: "hidden",
  }}
>
  {visibleImages.map((image, index) => (
    <div
      className="multiplesimage-wrapper-item"
      key={index}
      onClick={() => handleImageSelect(image)}
      style={{
        cursor: "pointer",
        border: selectedImage === image ? "2px solid blue" : "none",
        padding: "5px",
      }}
    >
      <img
        src={image}
        alt={`Car ${index + 1}`}
        className="images"
        style={{
          width: "80px",
          height: "60px",
          borderRadius: "5px",
        }}
      />
    </div>
  ))}
  {/* Arrow Button for More Images */}
  {images.length > 5 && (
    <button
      onClick={() => setShowAllThumbnails(!showAllThumbnails)}
      style={{
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        border: "none",
        backgroundColor: "#007bff",
        color: "white",
        fontSize: "16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "10px",
      }}
    >
      {showAllThumbnails ? "−" : "+"}
    </button>
  )}
</div>
                        </div>
                        <div className="border-none info_wrapper " style={{marginLeft: window.innerWidth <= 576 ? "0rem" : "-0.7rem",}}>
                          <div className="col">
                          <div className="table-responsive info_table">
  <table className="table table-borderless">
    <tbody className="info_body">
      <tr className="border-bottom">
        <th className="table_text">City:</th>
        <td className="table_text">{itemData?.City || "Default Seller Type"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Company:</th>
        <td className="table_text">{itemData?.Company || "No Company"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Employment Type:</th>
        <td className="table_text">{itemData?.EmploymentType || "No EmploymentType"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Experience Level:</th>
        <td className="table_text">{itemData?.ExperienceLevel || "No ExperienceLevel"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Industry:</th>
        <td className="table_text">{itemData?.Industry || "Default Industry"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Last Updated:</th>
        <td className="table_text">{itemData?.lastUpdated || "Default last updated"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Job Title:</th>
        <td className="table_text">{itemData?.JobTitle || "Default JobTitle"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Salary Range:</th>
        <td className="table_text">{itemData?.SalaryRange || "No SalaryRange"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Salary From:</th>
        <td className="table_text">{itemData?.SallaryFromRange || "Default SallaryFromRange"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Salary To:</th>
        <td className="table_text">{itemData?.SallaryToRange || "Default SallaryToRange"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Location:</th>
        <td className="table_text">{itemData?.location || "Default location"}</td>
      </tr>
    </tbody>
  </table>
</div>

                            <div>
                              <h1
                                className="mb-3"
                                style={{ paddingLeft: "15px" }}
                              >
                                Features
                              </h1>
                              <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: "0 15px",
      }}
    >
      {featuresData.map((column, columnIndex) => (
        <div
          key={columnIndex}
          style={{
            flex: "0 0 32%", // Approximately 1/3 width for 3 columns on md and up
            maxWidth: "32%",
            // marginBottom: "15px",
            "@media (max-width: 767.98px)": {
              flex: "0 0 100%", // Full width on mobile
              maxWidth: "100%",
            },
          }}
        >
          {column.map((feature, index) => (
            <p
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
                "@media (max-width: 767.98px)": {
                  marginBottom: "8px", // Reduced gap on mobile
                },
              }}
            >
              <span
                style={{
                  marginRight: "8px",
                }}
              >
                <img
                  src={tick}
                  alt="tick"
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                />
              </span>
              {feature}
            </p>
          ))}
        </div>
      ))}
    </div>
    <style>
  {`
    @media (max-width: 767.98px) {
      div[style*="flex: 0 0 32%"] {
        flex: 0 0 100% !important;
        max-width: 100% !important;
      }
      p[style*="margin-bottom: 15px"] {
        margin-bottom: 8px !important;
      }
    }
  `}
</style>

                              <div className="descriptions_wrapper" >
                                <h1
                                  className="fw-bold"
                                  style={{ padding: "20px",marginLeft:-12 }}
                                >
                                  Description:
                                </h1>
                                <p className="descriptions_para">
                                  {" "}
                                  {itemData.description}
                                </p>
                            
                           <div className="col-md-1  border-none w-100 ads_features_wrapper ">
                               
                               <div>
                                 
                                 <p className="morefeatures_para">
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                 </p>

                                
                               </div>
                             </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : callingFrom === "Education" ? (
                    <div className="col  border-none container ">
                      <div className="col  border-none">
                        <div>
                        
                          {/* Main Image with Previous & Next Buttons */}
                          <div
  style={{
    position: "relative",
    textAlign: "center",
  }}
>
  <img
    src={selectedImage ? selectedImage : itemData?.galleryImages[0]}
    className="w-md-24 heightofDetailpageimage"
    alt={itemData?.title || "Default Item"}
    style={{
      width: "100%",
      marginTop: "1rem",
      borderRadius: "0.3rem",
    }}
  />
  {/* Previous Button */}
  <button
    onClick={handlePrevImage}
    style={{
      position: "absolute",
      left: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgb(252, 252, 252)",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
    }}
  >
    <img src={left} alt="Previous" width={30} />
  </button>

  {/* Next Button */}
  <button
    onClick={handleNextImage}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgb(236, 236, 236)",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
    }}
  >
    <img src={right} alt="Next" width={30} />
  </button>

  {/* Image Counter */}
  <div
    style={{
      position: "absolute",
      bottom: "10px",
      right: "10px",
      background: "rgba(0, 0, 0, 0.5)",
      color: "white",
      padding: "5px 10px",
      borderRadius: "15px",
      fontSize: "14px",
    }}
  >
    {`${
      itemData?.galleryImages.indexOf(selectedImage) + 1 || 1
    } of ${itemData?.galleryImages.length} photos`}
  </div>
</div>

{/* Thumbnail Images */}
<div
  className="multiplesimage-wrapper"
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "1rem",
    flexWrap: "nowrap",
    overflow: "hidden",
  }}
>
  {visibleImages.map((image, index) => (
    <div
      className="multiplesimage-wrapper-item"
      key={index}
      onClick={() => handleImageSelect(image)}
      style={{
        cursor: "pointer",
        border: selectedImage === image ? "2px solid blue" : "none",
        padding: "5px",
      }}
    >
      <img
        src={image}
        alt={`Car ${index + 1}`}
        className="images"
        style={{
          width: "80px",
          height: "60px",
          borderRadius: "5px",
        }}
      />
    </div>
  ))}
  {/* Arrow Button for More Images */}
  {images.length > 5 && (
    <button
      onClick={() => setShowAllThumbnails(!showAllThumbnails)}
      style={{
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        border: "none",
        backgroundColor: "#007bff",
        color: "white",
        fontSize: "16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "10px",
      }}
    >
      {showAllThumbnails ? "−" : "+"}
    </button>
  )}
</div>
                        </div>
                        <div className="border-none info_wrapper " style={{marginLeft: window.innerWidth <= 576 ? "0rem" : "-0.7rem",}}>
                          <div className="col">
                          <div className="table-responsive info_table">
  <table className="table table-borderless">
    <tbody className="info_body">
      <tr className="border-bottom">
        <th className="table_text">City:</th>
        <td className="table_text">{itemData?.City || "Default Seller Type"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Content Type:</th>
        <td className="table_text">{itemData?.ContentType || "No ContentType"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Duration:</th>
        <td className="table_text">{itemData?.Duration || "No Duration"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Language:</th>
        <td className="table_text">{itemData?.Language || "No Language"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Skill Level:</th>
        <td className="table_text">{itemData?.SkillLevel || "Default SkillLevel"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Last Updated:</th>
        <td className="table_text">{itemData?.lastUpdated || "Default last updated"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">States:</th>
        <td className="table_text">{itemData?.States || "Default States"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Subject Categories:</th>
        <td className="table_text">{itemData?.SubjectCategories || "No SubjectCategories"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Assembly:</th>
        <td className="table_text">{itemData?.assembly || "Default assembly"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Condition:</th>
        <td className="table_text">{itemData?.condition || "Default condition"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Purpose:</th>
        <td className="table_text">{itemData?.purpose || "Default purpose"}</td>
      </tr>
    </tbody>
  </table>
</div>

                            <div>
                              <h1
                                className="mb-3"
                                style={{ paddingLeft: "15px" }}
                              >
                                Features
                              </h1>
                              <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: "0 15px",
      }}
    >
      {featuresData.map((column, columnIndex) => (
        <div
          key={columnIndex}
          style={{
            flex: "0 0 32%", // Approximately 1/3 width for 3 columns on md and up
            maxWidth: "32%",
            // marginBottom: "15px",
            "@media (max-width: 767.98px)": {
              flex: "0 0 100%", // Full width on mobile
              maxWidth: "100%",
            },
          }}
        >
          {column.map((feature, index) => (
            <p
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
                "@media (max-width: 767.98px)": {
                  marginBottom: "8px", // Reduced gap on mobile
                },
              }}
            >
              <span
                style={{
                  marginRight: "8px",
                }}
              >
                <img
                  src={tick}
                  alt="tick"
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                />
              </span>
              {feature}
            </p>
          ))}
        </div>
      ))}
    </div>
    <style>
  {`
    @media (max-width: 767.98px) {
      div[style*="flex: 0 0 32%"] {
        flex: 0 0 100% !important;
        max-width: 100% !important;
      }
      p[style*="margin-bottom: 15px"] {
        margin-bottom: 8px !important;
      }
    }
  `}
</style>

                              <div className="descriptions_wrapper" >
                                <h1
                                  className="fw-bold"
                                  style={{ padding: "20px",marginLeft:-12 }}
                                >
                                  Description:
                                </h1>
                                <p className="descriptions_para">
                                  {" "}
                                  {itemData.description}
                                </p>
                              
                           <div className="col-md-1  border-none w-100 ads_features_wrapper ">
                               
                               <div>
                                 
                                 <p className="morefeatures_para">
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                 </p>

                               </div>
                             </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : callingFrom === "RealEstateComp" ? (
                    <div className="col  border-none container ">
                      <div className="col  border-none">
                       
                        <div>
                        <div
  style={{
    position: "relative",
    textAlign: "center",
  }}
>
  <img
    src={selectedImage ? selectedImage : itemData?.galleryImages[0]}
    className="w-md-24 heightofDetailpageimage"
    alt={itemData?.title || "Default Item"}
    style={{
      width: "100%",
      marginTop: "1rem",
      borderRadius: "0.3rem",
    }}
  />
  {/* Previous Button */}
  <button
    onClick={handlePrevImage}
    style={{
      position: "absolute",
      left: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgb(252, 252, 252)",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
    }}
  >
    <img src={left} alt="Previous" width={30} />
  </button>

  {/* Next Button */}
  <button
    onClick={handleNextImage}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgb(236, 236, 236)",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
    }}
  >
    <img src={right} alt="Next" width={30} />
  </button>

  {/* Image Counter */}
  <div
    style={{
      position: "absolute",
      bottom: "10px",
      right: "10px",
      background: "rgba(0, 0, 0, 0.5)",
      color: "white",
      padding: "5px 10px",
      borderRadius: "15px",
      fontSize: "14px",
    }}
  >
    {`${
      itemData?.galleryImages.indexOf(selectedImage) + 1 || 1
    } of ${itemData?.galleryImages.length} photos`}
  </div>
</div>

{/* Thumbnail Images */}
<div
  className="multiplesimage-wrapper"
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "1rem",
    flexWrap: "nowrap",
    overflow: "hidden",
  }}
>
  {visibleImages.map((image, index) => (
    <div
      className="multiplesimage-wrapper-item"
      key={index}
      onClick={() => handleImageSelect(image)}
      style={{
        cursor: "pointer",
        border: selectedImage === image ? "2px solid blue" : "none",
        padding: "5px",
      }}
    >
      <img
        src={image}
        alt={`Car ${index + 1}`}
        className="images"
        style={{
          width: "80px",
          height: "60px",
          borderRadius: "5px",
        }}
      />
    </div>
  ))}
  {/* Arrow Button for More Images */}
  {images.length > 5 && (
    <button
      onClick={() => setShowAllThumbnails(!showAllThumbnails)}
      style={{
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        border: "none",
        backgroundColor: "#007bff",
        color: "white",
        fontSize: "16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "10px",
      }}
    >
      {showAllThumbnails ? "−" : "+"}
    </button>
  )}
</div>
                        </div>
                        <div className="border-none info_wrapper " style={{marginLeft: window.innerWidth <= 576 ? "0rem" : "-0.7rem",}}>
                          <div className="col">
                          <div className="table-responsive info_table">
  <table className="table table-borderless">
    <tbody className="info_body">
      <tr className="border-bottom">
        <th className="table_text">Accessibility:</th>
        <td className="table_text">{itemData?.Accessibility || "Default Accessibility"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Amenities:</th>
        <td className="table_text">{itemData?.Amenities || "No Amenities"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Building Type:</th>
        <td className="table_text">{itemData?.BuildingType || "No BuildingType"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">City:</th>
        <td className="table_text">{itemData?.City || "No City"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Property Features:</th>
        <td className="table_text">{itemData?.PropertyFeatures || "Default PropertyFeatures"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Last Updated:</th>
        <td className="table_text">{itemData?.lastUpdated || "Default last updated"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Property Type:</th>
        <td className="table_text">{itemData?.PropertyType || "Default PropertyType"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Seller Type:</th>
        <td className="table_text">{itemData?.SellerType || "No SellerType"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Size:</th>
        <td className="table_text">{itemData?.Size || "Default Size"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">States:</th>
        <td className="table_text">{itemData?.States || "Default States"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Location:</th>
        <td className="table_text">{itemData?.location || "Default location"}</td>
      </tr>
    </tbody>
  </table>
</div>

                            <div>
                              <h1
                                className="mb-3"
                                style={{ paddingLeft: "15px" }}
                              >
                                Features
                              </h1>
                              <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: "0 15px",
      }}
    >
      {featuresData.map((column, columnIndex) => (
        <div
          key={columnIndex}
          style={{
            flex: "0 0 32%", // Approximately 1/3 width for 3 columns on md and up
            maxWidth: "32%",
            // marginBottom: "15px",
            "@media (max-width: 767.98px)": {
              flex: "0 0 100%", // Full width on mobile
              maxWidth: "100%",
            },
          }}
        >
          {column.map((feature, index) => (
            <p
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
                "@media (max-width: 767.98px)": {
                  marginBottom: "8px", // Reduced gap on mobile
                },
              }}
            >
              <span
                style={{
                  marginRight: "8px",
                }}
              >
                <img
                  src={tick}
                  alt="tick"
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                />
              </span>
              {feature}
            </p>
          ))}
        </div>
      ))}
    </div>
    <style>
  {`
    @media (max-width: 767.98px) {
      div[style*="flex: 0 0 32%"] {
        flex: 0 0 100% !important;
        max-width: 100% !important;
      }
      p[style*="margin-bottom: 15px"] {
        margin-bottom: 8px !important;
      }
    }
  `}
</style>

                              <div className="descriptions_wrapper" >
                                <h1
                                  className="fw-bold"
                                  style={{ padding: "20px",marginLeft:-12 }}
                                >
                                  Description:
                                </h1>
                                <p className="descriptions_para">
                                  {" "}
                                  {itemData.description}
                                </p>
                            
                           <div className="col-md-1  border-none w-100 ads_features_wrapper ">
                               
                               <div>
                                 
                                 <p className="morefeatures_para">
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                 </p>

                               
                               </div>
                             </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : callingFrom === "TravelComp" ? (
                    <div className="col  border-none container ">
                      <div className="col  border-none">
                        <div>
                        
                          <div
  style={{
    position: "relative",
    textAlign: "center",
  }}
>
  <img
    src={selectedImage ? selectedImage : itemData?.galleryImages[0]}
    className="w-md-24 heightofDetailpageimage"
    alt={itemData?.title || "Default Item"}
    style={{
      width: "100%",
      marginTop: "1rem",
      borderRadius: "0.3rem",
    }}
  />
  {/* Previous Button */}
  <button
    onClick={handlePrevImage}
    style={{
      position: "absolute",
      left: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgb(252, 252, 252)",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
    }}
  >
    <img src={left} alt="Previous" width={30} />
  </button>

  {/* Next Button */}
  <button
    onClick={handleNextImage}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgb(236, 236, 236)",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
    }}
  >
    <img src={right} alt="Next" width={30} />
  </button>

  {/* Image Counter */}
  <div
    style={{
      position: "absolute",
      bottom: "10px",
      right: "10px",
      background: "rgba(0, 0, 0, 0.5)",
      color: "white",
      padding: "5px 10px",
      borderRadius: "15px",
      fontSize: "14px",
    }}
  >
    {`${
      itemData?.galleryImages.indexOf(selectedImage) + 1 || 1
    } of ${itemData?.galleryImages.length} photos`}
  </div>
</div>

{/* Thumbnail Images */}
<div
  className="multiplesimage-wrapper"
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "1rem",
    flexWrap: "nowrap",
    overflow: "hidden",
  }}
>
  {visibleImages.map((image, index) => (
    <div
      className="multiplesimage-wrapper-item"
      key={index}
      onClick={() => handleImageSelect(image)}
      style={{
        cursor: "pointer",
        border: selectedImage === image ? "2px solid blue" : "none",
        padding: "5px",
      }}
    >
      <img
        src={image}
        alt={`Car ${index + 1}`}
        className="images"
        style={{
          width: "80px",
          height: "60px",
          borderRadius: "5px",
        }}
      />
    </div>
  ))}
  {/* Arrow Button for More Images */}
  {images.length > 5 && (
    <button
      onClick={() => setShowAllThumbnails(!showAllThumbnails)}
      style={{
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        border: "none",
        backgroundColor: "#007bff",
        color: "white",
        fontSize: "16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "10px",
      }}
    >
      {showAllThumbnails ? "−" : "+"}
    </button>
  )}
</div>
                        </div>
                        <div className="border-none info_wrapper " style={{marginLeft: window.innerWidth <= 576 ? "0rem" : "-0.7rem",}}>
                          <div className="col">
                          <div className="table-responsive info_table">
  <table className="table table-borderless">
    <tbody className="info_body">
      <tr className="border-bottom">
        <th className="table_text">Amenities:</th>
        <td className="table_text">{itemData?.Amenities || "Default Amenities"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Checkin:</th>
        <td className="table_text">{itemData?.Checkin || "No Checkin"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">City:</th>
        <td className="table_text">{itemData?.City || "No City"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">PropertyType:</th>
        <td className="table_text">{itemData?.PropertyType || "No PropertyType"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Room Type:</th>
        <td className="table_text">{itemData?.RoomType || "Default RoomType"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Last Updated:</th>
        <td className="table_text">{itemData?.lastUpdated || "Default last updated"}</td>
      </tr>
    </tbody>
  </table>
</div>

                            <div>
                              <h1
                                className="mb-3"
                                style={{ paddingLeft: "15px" }}
                              >
                                Features
                              </h1>
                              <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: "0 15px",
      }}
    >
      {featuresData.map((column, columnIndex) => (
        <div
          key={columnIndex}
          style={{
            flex: "0 0 32%", // Approximately 1/3 width for 3 columns on md and up
            maxWidth: "32%",
            // marginBottom: "15px",
            "@media (max-width: 767.98px)": {
              flex: "0 0 100%", // Full width on mobile
              maxWidth: "100%",
            },
          }}
        >
          {column.map((feature, index) => (
            <p
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
                "@media (max-width: 767.98px)": {
                  marginBottom: "8px", // Reduced gap on mobile
                },
              }}
            >
              <span
                style={{
                  marginRight: "8px",
                }}
              >
                <img
                  src={tick}
                  alt="tick"
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                />
              </span>
              {feature}
            </p>
          ))}
        </div>
      ))}
    </div>
    <style>
  {`
    @media (max-width: 767.98px) {
      div[style*="flex: 0 0 32%"] {
        flex: 0 0 100% !important;
        max-width: 100% !important;
      }
      p[style*="margin-bottom: 15px"] {
        margin-bottom: 8px !important;
      }
    }
  `}
</style>

                              <div className="descriptions_wrapper" >
                                <h1
                                  className="fw-bold"
                                  style={{ padding: "20px",marginLeft:-12 }}
                                >
                                  Description:
                                </h1>
                                <p className="descriptions_para">
                                  {" "}
                                  {itemData.description}
                                </p>
                            
                           <div className="col-md-1  border-none w-100 ads_features_wrapper ">
                               
                               <div>
                                 
                                 <p className="morefeatures_para">
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                 </p>

                            
                               </div>
                             </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : callingFrom === "SportGamesComp" ? (
                    <div className="col  border-none container ">
                      <div className="col  border-none">
                        <div>
                       
                          <div
  style={{
    position: "relative",
    textAlign: "center",
  }}
>
  <img
    src={selectedImage ? selectedImage : itemData?.galleryImages[0]}
    className="w-md-24 heightofDetailpageimage"
    alt={itemData?.title || "Default Item"}
    style={{
      width: "100%",
      marginTop: "1rem",
      borderRadius: "0.3rem",
    }}
  />
  {/* Previous Button */}
  <button
    onClick={handlePrevImage}
    style={{
      position: "absolute",
      left: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgb(252, 252, 252)",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
    }}
  >
    <img src={left} alt="Previous" width={30} />
  </button>

  {/* Next Button */}
  <button
    onClick={handleNextImage}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgb(236, 236, 236)",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
    }}
  >
    <img src={right} alt="Next" width={30} />
  </button>

  {/* Image Counter */}
  <div
    style={{
      position: "absolute",
      bottom: "10px",
      right: "10px",
      background: "rgba(0, 0, 0, 0.5)",
      color: "white",
      padding: "5px 10px",
      borderRadius: "15px",
      fontSize: "14px",
    }}
  >
    {`${
      itemData?.galleryImages.indexOf(selectedImage) + 1 || 1
    } of ${itemData?.galleryImages.length} photos`}
  </div>
</div>

{/* Thumbnail Images */}
<div
  className="multiplesimage-wrapper"
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "1rem",
    flexWrap: "nowrap",
    overflow: "hidden",
  }}
>
  {visibleImages.map((image, index) => (
    <div
      className="multiplesimage-wrapper-item"
      key={index}
      onClick={() => handleImageSelect(image)}
      style={{
        cursor: "pointer",
        border: selectedImage === image ? "2px solid blue" : "none",
        padding: "5px",
      }}
    >
      <img
        src={image}
        alt={`Car ${index + 1}`}
        className="images"
        style={{
          width: "80px",
          height: "60px",
          borderRadius: "5px",
        }}
      />
    </div>
  ))}
  {/* Arrow Button for More Images */}
  {images.length > 5 && (
    <button
      onClick={() => setShowAllThumbnails(!showAllThumbnails)}
      style={{
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        border: "none",
        backgroundColor: "#007bff",
        color: "white",
        fontSize: "16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "10px",
      }}
    >
      {showAllThumbnails ? "−" : "+"}
    </button>
  )}
</div>
                        </div>
                        <div className="border-none info_wrapper " style={{marginLeft: window.innerWidth <= 576 ? "0rem" : "-0.7rem",}}>
                          <div className="col">
                          <div className="table-responsive info_table">
  <table className="table table-borderless">
    <tbody className="info_body">
      <tr className="border-bottom">
        <th className="table_text">Availability:</th>
        <td className="table_text">{itemData?.Availability || "Default Availability"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Brand:</th>
        <td className="table_text">{itemData?.Brand || "No Brand"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Category:</th>
        <td className="table_text">{itemData?.Category || "No Category"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">City:</th>
        <td className="table_text">{itemData?.City || "No City"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Color Options:</th>
        <td className="table_text">{itemData?.ColorOptions || "Default ColorOptions"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Last Updated:</th>
        <td className="table_text">{itemData?.lastUpdated || "Default last updated"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Features:</th>
        <td className="table_text">{itemData?.Features || "Default Features"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Gender:</th>
        <td className="table_text">{itemData?.Gender || "No Gender"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Material:</th>
        <td className="table_text">{itemData?.Material || "Default Material"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Seller Type:</th>
        <td className="table_text">{itemData?.SellerType || "Default SellerType"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Size:</th>
        <td className="table_text">{itemData?.Size || "Default Size"}</td>
      </tr>
    </tbody>
  </table>
</div>

                            <div>
                              <h1
                                className="mb-3"
                                style={{ paddingLeft: "15px" }}
                              >
                                Features
                              </h1>
                              <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: "0 15px",
      }}
    >
      {featuresData.map((column, columnIndex) => (
        <div
          key={columnIndex}
          style={{
            flex: "0 0 32%", // Approximately 1/3 width for 3 columns on md and up
            maxWidth: "32%",
            // marginBottom: "15px",
            "@media (max-width: 767.98px)": {
              flex: "0 0 100%", // Full width on mobile
              maxWidth: "100%",
            },
          }}
        >
          {column.map((feature, index) => (
            <p
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
                "@media (max-width: 767.98px)": {
                  marginBottom: "8px", // Reduced gap on mobile
                },
              }}
            >
              <span
                style={{
                  marginRight: "8px",
                }}
              >
                <img
                  src={tick}
                  alt="tick"
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                />
              </span>
              {feature}
            </p>
          ))}
        </div>
      ))}
    </div>
    <style>
  {`
    @media (max-width: 767.98px) {
      div[style*="flex: 0 0 32%"] {
        flex: 0 0 100% !important;
        max-width: 100% !important;
      }
      p[style*="margin-bottom: 15px"] {
        margin-bottom: 8px !important;
      }
    }
  `}
</style>

                              <div className="descriptions_wrapper" >
                                <h1
                                  className="fw-bold"
                                  style={{ padding: "20px",marginLeft:-12 }}
                                >
                                  Description:
                                </h1>
                                <p className="descriptions_para">
                                  {" "}
                                  {itemData.description}
                                </p>
                                <div className="col-md-1  border-none w-100 ads_features_wrapper ">
                               
                               <div>
                                 
                                 <p className="morefeatures_para">
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                 </p>

                                
                               </div>
                             </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : callingFrom === "PetAnimalsComp" ? (
                    <div className="col  border-none container ">
                      <div className="col  border-none">
                        <div>
                       
                          {/* Main Image with Previous & Next Buttons */}
                          <div
  style={{
    position: "relative",
    textAlign: "center",
  }}
>
  <img
    src={selectedImage ? selectedImage : itemData?.galleryImages[0]}
    className="w-md-24 heightofDetailpageimage"
    alt={itemData?.title || "Default Item"}
    style={{
      width: "100%",
      marginTop: "1rem",
      borderRadius: "0.3rem",
    }}
  />
  {/* Previous Button */}
  <button
    onClick={handlePrevImage}
    style={{
      position: "absolute",
      left: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgb(252, 252, 252)",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
    }}
  >
    <img src={left} alt="Previous" width={30} />
  </button>

  {/* Next Button */}
  <button
    onClick={handleNextImage}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgb(236, 236, 236)",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
    }}
  >
    <img src={right} alt="Next" width={30} />
  </button>

  {/* Image Counter */}
  <div
    style={{
      position: "absolute",
      bottom: "10px",
      right: "10px",
      background: "rgba(0, 0, 0, 0.5)",
      color: "white",
      padding: "5px 10px",
      borderRadius: "15px",
      fontSize: "14px",
    }}
  >
    {`${
      itemData?.galleryImages.indexOf(selectedImage) + 1 || 1
    } of ${itemData?.galleryImages.length} photos`}
  </div>
</div>

{/* Thumbnail Images */}
<div
  className="multiplesimage-wrapper"
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "1rem",
    flexWrap: "nowrap",
    overflow: "hidden",
  }}
>
  {visibleImages.map((image, index) => (
    <div
      className="multiplesimage-wrapper-item"
      key={index}
      onClick={() => handleImageSelect(image)}
      style={{
        cursor: "pointer",
        border: selectedImage === image ? "2px solid blue" : "none",
        padding: "5px",
      }}
    >
      <img
        src={image}
        alt={`Car ${index + 1}`}
        className="images"
        style={{
          width: "80px",
          height: "60px",
          borderRadius: "5px",
        }}
      />
    </div>
  ))}
  {/* Arrow Button for More Images */}
  {images.length > 5 && (
    <button
      onClick={() => setShowAllThumbnails(!showAllThumbnails)}
      style={{
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        border: "none",
        backgroundColor: "#007bff",
        color: "white",
        fontSize: "16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "10px",
      }}
    >
      {showAllThumbnails ? "−" : "+"}
    </button>
  )}
</div>
                        </div>
                        <div className="border-none info_wrapper " style={{marginLeft: window.innerWidth <= 576 ? "0rem" : "-0.7rem",}}>
                          <div className="col">
                          <div className="table-responsive info_table">
  <table className="table table-borderless">
    <tbody className="info_body">
      <tr className="border-bottom">
        <th className="table_text">Age:</th>
        <td className="table_text">{itemData?.Age || "Default Age"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Breed:</th>
        <td className="table_text">{itemData?.Breed || "No Breed"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">City:</th>
        <td className="table_text">{itemData?.City || "No City"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Color:</th>
        <td className="table_text">{itemData?.Color || "No Color"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Dietary Preferences:</th>
        <td className="table_text">{itemData?.DietaryPreferences || "Default DietaryPreferences"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Last Updated:</th>
        <td className="table_text">{itemData?.lastUpdated || "Default last updated"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Gender:</th>
        <td className="table_text">{itemData?.Gender || "Default Gender"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Health Status:</th>
        <td className="table_text">{itemData?.HealthStatus || "No HealthStatus"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Seller Type:</th>
        <td className="table_text">{itemData?.SellerType || "Default SellerType"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Size:</th>
        <td className="table_text">{itemData?.Size || "Default Size"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Temperament:</th>
        <td className="table_text">{itemData?.Temperament || "Default Temperament"}</td>
      </tr>
      <tr className="border-bottom">
        <th className="table_text">Training Level:</th>
        <td className="table_text">{itemData?.TrainingLevel || "Default TrainingLevel"}</td>
      </tr>
    </tbody>
  </table>
</div>

                            <div>
                              <h1
                                className="mb-3"
                                style={{ paddingLeft: "15px" }}
                              >
                                Features
                              </h1>
                              <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: "0 15px",
      }}
    >
      {featuresData.map((column, columnIndex) => (
        <div
          key={columnIndex}
          style={{
            flex: "0 0 32%", // Approximately 1/3 width for 3 columns on md and up
            maxWidth: "32%",
            // marginBottom: "15px",
            "@media (max-width: 767.98px)": {
              flex: "0 0 100%", // Full width on mobile
              maxWidth: "100%",
            },
          }}
        >
          {column.map((feature, index) => (
            <p
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
                "@media (max-width: 767.98px)": {
                  marginBottom: "8px", // Reduced gap on mobile
                },
              }}
            >
              <span
                style={{
                  marginRight: "8px",
                }}
              >
                <img
                  src={tick}
                  alt="tick"
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                />
              </span>
              {feature}
            </p>
          ))}
        </div>
      ))}
    </div>
    <style>
  {`
    @media (max-width: 767.98px) {
      div[style*="flex: 0 0 32%"] {
        flex: 0 0 100% !important;
        max-width: 100% !important;
      }
      p[style*="margin-bottom: 15px"] {
        margin-bottom: 8px !important;
      }
    }
  `}
</style>

                              <div className="descriptions_wrapper" >
                                <h1
                                  className="fw-bold"
                                  style={{ padding: "20px",marginLeft:-12 }}
                                >
                                  Description:
                                </h1>
                                <p className="descriptions_para">
                                  {itemData.descdescription}
                                </p>
                                <div className="col-md-1  border-none w-100 ads_features_wrapper ">
                               
                               <div>
                                 
                                 <p className="morefeatures_para">
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                   Lorem ipsum, dolor sit amet consectetur
                                   adipisicing elit. Itaque ipsam aperiam vero
                                   officia praesentium facilis.
                                 </p>

                            
                               </div>
                             </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

<div
            className="adsCategory_head"
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginLeft: window.innerWidth <= 576 ? "0px" : "-40px",
              alignItems: "center",
            }}
          >
                           <RatingAndReviews currentAdId={_Id} listingUserId={itemData?.userId} />

          </div>
            </Col>
            <Col md={4} className="p-3">
 
           
 <Col xs={11}  >
 <Card  style={{ position: "relative", minHeight: "100px",borderRadius: "12px",width:"110%",marginTop: window.innerWidth <= 576 ? -10 : 10,boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)", }}>
{/* Card body to hold the price and heart button */}
<Card.Body style={{  position: "relative" ,marginLeft:-15,marginBottom:-30}}>
<div
style={{
fontSize: "60px",
fontWeight: "bold",
textAlign: "center",
color: "#2d4495",
marginBottom:20
}}
>
${itemData?.Price || "N/A"}
</div>
<h5>Safety Tips</h5>
         <ul
           style={{
             listStyleImage: `url(${bullet})`,
             marginLeft: "-1.1rem",
           }}
         >
           <li className="safteytip_para">
             Meet seller at a safe place.
           </li>
           <li className="safteytip_para">
             Check item before you buy
           </li>
           <li className="safteytip_para">
             Pay only after collecting item.
           </li>
         </ul>
         <hr
style={{
border: "none", // Default border hatao
borderTop: "3px solid #000", // Dark aur bold line
}}
/>

<div className="col-md ">
         <h1 className="sallerinfo_para">Seller Information</h1>
         <div className="row profileinner_container ">
           
             <div className="col-5 profileimg">
                           <Link to={`/Userinfo?id=${itemData.userId}&callingFrom=${callingFrom}`}>
                           
             <img
               src={profile}
               alt="Profile"
               className="img-fluid rounded-circle"
             />
           </Link>
         </div>
           <div className="col-5 profile_rightbarTags">
             <p className="sallerInfo_para">
               {itemData.displayName}
             </p>
             <p className="sallerInfo_para">
               {itemData.creationTime}
             </p>
             <p className="s allerInfo_para">
             <Link to={`/Userinfo?id=${itemData.userId}&callingFrom=${callingFrom}`}>
               View all Ads
               </Link></p>
           </div>

           <div className="col mt-3 innerContainer2">
           <div className="d-flex align-items-center gap-2 mt-3 innerContainer2 head2btflex">

<a href={`tel:${itemData.Phone}`}>
<button
className={`sign-in-button ${showPhone ? "expanded" : ""}`}
onClick={() => setShowPhone(true)}
>
<FaPhoneAlt />
<span className="fw-semibold">
{showPhone ? itemData.Phone : "Call Now"}
</span>
</button>
</a>


<a href={`https://wa.me/${itemData.whatsapp}`} target="_blank" rel="noopener noreferrer">
<button className={`sign-in-button ${showPhone ? "icon-only" : ""}`}>
<FaWhatsapp />
<span className="button-text">WhatsApp</span>
</button>
</a>


<button
className={`sign-in-button ${showPhone ? "icon-only" : ""}`}
onClick={() => setShowModal(true)}
>
<MdMessage />
<span className="button-text">Message</span>
</button>


<style jsx>{`
.sign-in-button {
background-color: #0055a5; /* Blue background color matching the image */
color: white; /* White text color */
font-size: 18px; /* Approximate font size */
font-weight: bold; /* Bold text */
width: 120px; /* Default fixed width */
height: 50px; /* Fixed height */
border: none; /* No border */
border-radius: 10px; /* Rounded corners */
cursor: pointer; /* Hand cursor on hover */
text-transform: capitalize; /* Capitalize the text like in the image */
display: flex; /* Use flexbox to center icon and text */
align-items: center; /* Vertically center */
justify-content: center; /* Horizontally center */
gap: 8px; /* Space between icon and text */
transition: width 0.3s ease; /* Smooth transition for width change */
}

.sign-in-button:hover {
background-color: #004080; /* Slightly darker blue on hover for feedback */
}

/* Expanded state for Call Now button */
.expanded {
width: 200px; /* Larger width when showing phone number */
font-size: 16px; /* Slightly smaller font to fit the number */
}

/* Icon-only state for WhatsApp and Message buttons */
.icon-only {
width: 50px; /* Smaller width to fit just the icon */
}

/* Hide text in icon-only state */
.icon-only .button-text {
display: none; /* Hide the text */
}

/* Remove underline from <a> tags */
a {
text-decoration: none;
}
`}</style>
</div>
             <div>
                                     <div
                                       className={`modal fade ${
                                         showModal ? "show d-block" : "d-none"
                                       }`}
                                       tabIndex="-1"
                                       role="dialog"
                                       style={{
                                         backgroundColor: "rgba(0, 0, 0, 0.5)",
                                         marginTop:100
                                       }} // Backdrop effect
                                     >
                                       <div
                                         className="modal-dialog modal-dialog-centered"
                                         role="document"
                                       >
                                         <div className="modal-content">
                                        
                                           <div className="modal-header">
                                             <h5 className="modal-title">Send Message</h5>
                                             <button
                                               type="button"
                                               className="btn-close"
                                               onClick={() => setShowModal(false)}
                                             ></button>
                                           </div>
             
                                           <div className="modal-body">
                 <div className="p-4 w-full max-w-lg mx-auto">
                   {userId && recieverId ? (
                     <Chat
                       userId={userId}
                       recieverId={recieverId}
                     />
                   ) : (
                     <div className="flex items-center justify-center h-40 bg-gray-100 rounded-md">
                       <p className="text-lg font-semibold text-gray-600">
                         Please log in to start messaging.
                       </p>
                     </div>
                   )}
                 </div>
               </div>
                                         </div>
                                       </div>
                                     </div>
             
                                   
                                     {showModal && (
                                       <div
                                         className="modal-backdrop fade show"
                                         onClick={() => setShowModal(false)}
                                       ></div>
                                     )}
                                   </div>

             
           </div>
         </div>
       </div>

       <h4 className="mt-4 mb-4">Location </h4>

<button className="location_btn ">
{itemData.location}{" "}
</button>
         
</Card.Body>
</Card>
<Card  style={{ position: "relative", minHeight: "100px",borderRadius: "12px",width:"110%",marginTop:18,boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)" }}>
{/* Card body to hold the price and heart button */}
<Card.Body style={{  position: "relative",marginTop:-40 ,marginLeft:-20}}>
      
       
     
             <div className="d-flex flex-column gap-3 mt-4 ms-0">
               <img
                 src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                 alt="Dummy 1"
                 className="rounded shadow"
                 style={{
                   width: window.innerWidth <= 576 ? "330px" : "375px",
                   height: "300px",
                   objectFit: "cover",
                 }}
               />
               <img
                 src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                 alt="Dummy 2"
                 className="rounded shadow"
                 style={{
                   width: window.innerWidth <= 576 ? "330px" : "375px",
                   height: "300px",
                   objectFit: "cover",
                 }}
               />
               <img
                 src="https://images.unsplash.com/photo-1471357674240-e1a485acb3e1"
                 alt="Dummy 3"
                 className="rounded shadow"
                 style={{
                   width: window.innerWidth <= 576 ? "330px" : "375px",
                   height: "300px",
                   objectFit: "cover",
                 }}
               />
             
            
             </div>
       
             </Card.Body>
</Card>   
 </Col>       

</Col>
          
          </Row>
          <SuggestedAds callingFrom={callingFrom} currentAdId={_Id} />
        </Container>


        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Dynamic_Route;
