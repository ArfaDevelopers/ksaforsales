import React, { useState, useEffect } from "react";
import Footer from "./footer/Footer";
import Header from "./header";
import img from "./home-07.jpg";
import tick from "./tick.png";
import bullet from "./bullet.png";
import profile from "./profileimage.png";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { MdMessage } from "react-icons/md";

import { FaMobile } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { useParams, useLocation } from "react-router";
import { useMyContext } from "../store/Contexxt.store";
import arrow from "./Vector.png";
import left from "./left.png";
import right from "./right.png";
import share from "./sahere.png";
import report from "./report.png";
import carimg from "./carimg.png";
import image1 from "../../assets/img/banner/bannerimage1.png";
import { Container, Row, Col, Card, ButtonGroup, Badge } from "react-bootstrap";
import { HiMiniSlash } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import image2 from "../../assets/img/banner/bannerimage2.png";
import image3 from "../../assets/img/banner/bannerimage3.png";
import image4 from "../../assets/img/banner/bannerimage4.png";
import ads from "./adsimg.png";
import {
  getDocs,
  collection,
  query,
  where,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../Firebase/FirebaseConfig";
import { formatDistanceToNow } from "date-fns";
import { onAuthStateChanged } from "firebase/auth";
import { Modal, Button, Form } from "react-bootstrap";
import { io } from "socket.io-client";
import axios from "axios";
import Chat from "../../components/admin/dyanmic_route/upperHeader/Chat";
let socket;
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../../components/userPages/AddLisiting/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { FaBuysellads } from "react-icons/fa";
import SuggestedAds from "../../components/home/SuggestedAds/SuggestedAds";

const stripePromise = loadStripe(
  "pk_test_51Oqyo3Ap5li0mnBdxJiCZ4k0IEWVbOgGvyMbYB6XVUqYh1yNUEnRiX4e5UO1eces9kf9qZNZcF7ybjxg7MimKmUQ00a9s60Pa1"
);
const Dynamic_Routes = () => {
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
    const callingFrom = getQueryParam("callingFrom");
    const ids = getQueryParam("id");

    console.log("callingFrom______ID:ids", ids);
    console.log("callingFrom______Calling From:", callingFrom);
    setCallingFrom(callingFrom);
    setId(ids);
  }, [id, location]);
  const [showPhone, setShowPhone] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
 const [itemData, setItemData] = useState(null); // State to store ads data
 const [loading, setLoading] = useState(true); // Loading state
 const [userId, setUserId] = useState(null);
 const [showModal1, setShowModal1] = useState(false);
 const [FeaturedAds, setFeaturedAds] = useState(false);
 const [showReport, setshowReport] = useState(false);
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
 const copyToClipboard = () => {
  navigator.clipboard.writeText(link);
  alert("Link copied to clipboard!");
};
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
 console.log(itemData,'111111111111111111111111111')
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

 // useEffect(() => {
 //   const fetchMessages = async () => {
 //     const user = auth.currentUser;
 //     const userId = user?.uid;
 //     if (!userId) {
 //       console.warn("User ID is missing, skipping API call");
 //       return;
 //     }

 //     try {
 //       const { data } = await axios.get(
 //         `https://ksaforsaleapis.vercel.app/api/messages/${userId}`
 //       );
 //       setReceivedMessages(data?.data || []);
 //       console.log("Fetched messages:", data?.data);
 //     } catch (error) {
 //       console.error("Error fetching messages:", error);
 //     }
 //   };

 //   fetchMessages();
 // }, [refresh, userId]);
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
  // const handleSend = () => {
  //   console.log("Message:", message);
  //   setMessage(""); // Clear input after sending
  //   setShowModal(false); // Close modal
  // };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A"; // Handle undefined or null timestamps
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // Format it into a readable string
  };
  const [userData, setUserData] = useState([]);
  const [show, setShow] = useState(false);
  const [reportText, setReportText] = useState("");
  const [selectedReports, setSelectedReports] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [reportTypes, setReportTypes] = useState([
    "Sexual",
    "Illegal",
    "Abusive",
    "Harassment",
    "Fraud",
    "Spam",
  ]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
  console.log(itemData?.category, "itemData.category______");
  const handleSubmit = async () => {
    console.log("Report Submitted:", { reportText, selectedReports });

    const collectionName =
      itemData.category === "AutomotiveComp"
        ? "Cars"
        : itemData.category === "Electronics"
        ? "ELECTRONICS"
        : itemData.category === "FashionStyle"
        ? "FASHION"
        : itemData.category === "Health Care"
        ? "HEALTHCARE"
        : itemData.category === "JobBoard"
        ? "JOBBOARD"
        : itemData.category === "Education"
        ? "Education"
        : itemData.category === "Real Estate"
        ? "REALESTATECOMP"
        : itemData.category === "TravelComp"
        ? "TRAVEL"
        : itemData.category === "Sports & Game"
        ? "SPORTSGAMESComp"
        : itemData.category === "PetAnimalsComp"
        ? "PETANIMALCOMP"
        : "books";
    console.log(collectionName, "collectionName________________-");
    try {
      const adsCollection = collection(db, collectionName);

      if (!itemData.id) {
        console.error("Error: itemData.id is missing.");
        return;
      }

      const docRef = doc(adsCollection, itemData.id); // Ensure itemData.id is a valid string

      // Fetch existing document
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const existingData = docSnapshot.data();

        // Ensure existingData.reportTypes is an array
        const currentReports = Array.isArray(existingData.reportTypes)
          ? existingData.reportTypes
          : [];

        // Ensure selectedReports is an array
        const newReports = Array.isArray(selectedReports)
          ? selectedReports
          : [];

        // Merge arrays while avoiding duplicates
        const updatedReportTypes = [
          ...new Set([...currentReports, ...newReports]),
        ];

        // Update only the reportTypes field
        await updateDoc(docRef, {
          reportTypes: updatedReportTypes,
          reportText: reportText || "",
        });

        console.log("Document updated successfully:", updatedReportTypes);
      } else {
        console.log("Document does not exist.");
      }

      handleClose();
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        console.log("User ID Token:", token);
        console.log("User UID:", user.uid);
        setUserId(user.uid);

        // Fetch user-specific data from Firestore
        try {
          const userQuery = query(
            collection(db, "users"), // Replace 'users' with your collection name
            where("userId", "==", "N2mN6BG5Q2gtxqLSWfNgAzl48Ik1") // Query based on the userId field
          );
          const querySnapshot = await getDocs(userQuery);

          // Assuming the data is stored in the collection and each document has a `timestamp` or `createdAt` field
          const fetchedData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt
              ? formatDistanceToNow(doc.data().createdAt.toDate())
              : "N/A", // Format the timestamp if exists
          }));
          console.log(fetchedData, "userDataitem Data_________fetchedData");
          setUserData(fetchedData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No user is logged in. Redirecting to /login...");
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  console.log(userData, "userDataitem Data__________-");
  // const NewId = callingFrom === "automotive" || "RealEstate" ? _Id : id;
  const NewId =
    callingFrom === "automotive"
      ? _Id
      : callingFrom === "RealEstate"
      ? _Id
      : callingFrom === "Electronic"
      ? _Id
      : callingFrom === "HealthCare"
      ? _Id
      : callingFrom === "GamesSport"
      ? _Id
      : callingFrom === "ComercialsAds"
      ? _Id
      : callingFrom === "Education"
      ? _Id
      : id;

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true); // Start loading
      try {
        const collectionName =
          callingFrom === "automotive"
            ? "Cars"
            : callingFrom === "RealEstate"
            ? "REALESTATECOMP"
            : callingFrom === "Electronic"
            ? "ELECTRONICS"
            : callingFrom === "HealthCare"
            ? "HEALTHCARE"
            : callingFrom === "GamesSport"
            ? "SPORTSGAMESComp"
            : callingFrom === "ComercialsAds"
            ? "ComercialsAds"
            : callingFrom === "Education"
            ? "Education"
            : "books";
        // Determine collection based on `callingFrom`
        // const collectionName = callingFrom === "automotive" ? "carData" : "books";
        const adsCollection = collection(db, collectionName); // Reference to dynamic collection
        const adsSnapshot = await getDocs(adsCollection); // Fetch all documents
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id, // Include document ID
          ...doc.data(), // Spread document data
        }));

        console.log(adsList, "item Data__________adsList");

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
    return <p>Loading...</p>; // Display loading state
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

  const images = itemData?.galleryImages || [];
  const featuresData = [
    ["Ads", "Normal Condition", "Immobilizer Key", "Power Mirrors"],
    ["Ads", "Normal Condition", "Immobilizer Key", "Power Mirrors"],
    ["Ads", "Normal Condition", "Immobilizer Key", "Power Mirrors"],
  ];
  const visibleImages = showAllThumbnails ? images : images.slice(0, 5); // Show 5 or all
  return (
    <>
      <div className="main-wrapper">
        <Header />

        {/* Banner Section */}
        {/* <section className="banner-section">
          <div className="container">
            <div className="home-banner">
              <div className="home-banner-about">
                <div className="section-search aos r" data-aos="fade-up">
                  <p className="explore-text banner-text">
                    <span>Explore top-rated attractions</span>
                  </p>
                  <h1>
                    Let us help you <br />
                    <span>Find, Buy</span> & Own Dreams
                  </h1>
                  <p className="banner-para">
                    Countrys most loved and trusted classified ad listing
                    website classified ad.randomised words which don't look even
                    slightly Browse thousand of items near you.
                  </p>
                </div>

                <div className="bannerimages_wrapper">
                  <div className="wrapper_container">
                    <img src={image1} alt="" />
                    <img src={image2} alt="" />
                  </div>
                  <div className="wrapper_container">
                    <img src={image3} alt="" />
                    <img src={image4} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/* <section
          className="banner-section bg-no-repeat bg-center w-full"
          style={{
            backgroundImage: `url(${"/12750.jpg"})`,
            backgroundSize: "cover", // Use 'cover' to fill the section without repeating
            height: "50vh", // Adjust height as needed
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container mx-auto flex items-center justify-center h-full">
            <div className="home-banner">
              <div className="home-banner-about">
                <div
                  className="section-search aos r homebannerwrapper_2"
                  data-aos="fade-up"
                ></div>
              </div>
            </div>
          </div>
        </section> */}
        <div
          className="container    border-none h-auto containerWrapper"
          style={{ marginTop: "220px" }}
        >
         <div className="d-flex flex-wrap justify-content-between align-items-center">
            {/* Breadcrumb buttons */}
           
            <div className="adsCategory_head">
              <button
                className="btn border me-2 mb-2 mb-sm-0"
                style={{ background: "#E9EEFF", fontWeight: "500" }}
              >
                Home
              </button>
              <span>
                <img src={arrow} alt="" />
              </span>
              <button
                className="btn border me-2 mb-2 mb-sm-0"
                style={{ background: "#E9EEFF", fontWeight: "500" }}
              >
               {callingFrom}{" "}
              </button>
             
             
            
            </div>

            <div className="adsCategoryInfoheade2">
        <button
          className="btn me-2 mb-2 mb-sm-0"
          style={{
            color: "#2D4495",
            background: "white",
            border: "2px solid #2D4495",
          }}
          onClick={handlePrevious} // Attach handler
        >
          <span>
            <img src={left} alt="left" />
          </span>
          Previous
        </button>
        <button
          className="btn mb-2 mb-sm-0"
          style={{
            color: "#2D4495",
            background: "white",
            border: "2px solid #2D4495",
          }}
          onClick={handleNext} // Attach handler
        >
          <span>
            <img src={right} alt="right" />
          </span>
          Next
        </button>
      </div>
          </div>
          <hr
            style={{
              color: "#000000",
              marginTop: "24.83px",
              marginBottom: "24.3px",
            }}
          />

          {/* More buttons */}
          <h1 className="fw-bold" style={{ marginBottom: "24px" }}>
            {itemData?.title || "Default Title"}{" "}
            {/* Dynamically display the title */}
          </h1>
      

          <div className="head2_wrapper mt-4">
            <div className="CategoryInfodiv_btn2container mt-4">
              <button className="head2btn mt-4">
                <span>
                  <img src={left} alt="leftarrow" />
                </span>{" "}
                Favourite
              </button>
              <>
                {/* Button to open modal */}
                <button
                  className="head2btn mt-4"
                  onClick={() => setShowModal1(true)}
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
                            <h3 style={{ wordBreak: "break-all" }}>{link}</h3>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={copyToClipboard}
                            >
                              Copy
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
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
              <div>
              {itemData.userId===userId?

<button className="head2btn mt-4" onClick={handleShowReport}>
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
              </div>
              <button className="head2btn mt-4" onClick={handleShow}>
                <span>
                  <img src={report} alt="report" />
                </span>
                Report
              </button>
            </div>

            <Modal show={show} onHide={handleClose} centered>
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
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  // disabled={!reportText || selectedReports.length === 0}
                  disabled={selectedReports.length === 0}
                >
                  Submit Report
                </Button>
              </Modal.Footer>
            </Modal>
            {/* Posted time */}
            <div className="d-flex flex-wrap justify-content-end">
              <p
                style={{
                  color: "black",
                  fontWeight: "400",
                  marginBottom: "24.5px",
                }}
              >
                Posted {itemData?.timeAgo || "Loading..."}
              </p>
            </div>
          </div>
       
          <div
            className="row    border-none"
            style={{ marginTop: "-2rem" }}
          >
            {/* Left Side: Image Section */}
            <div className="col-md-8    border-none">
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

              <div className="row    border-none info_wrapper p-3">
                <div className="col">
                  <div className="table-responsive info_table">
                    <table className="table table-borderless">
                      <tbody className="info_body">
                        {Object.entries({
                          "Seller Type": itemData?.SellerType,
                          Duration: itemData?.Duration,
                          "Registered City": itemData?.Registeredin,
                          Assembly: itemData?.Assembly,
                          "Engine Capacity": itemData?.EngineCapacity,
                          Make: itemData?.Make || "California",
                          Language: itemData?.Language,
                          "Body Type": itemData?.BodyType,
                          ContentType: itemData?.ContentType,
                          "Last Updated":
                            itemData?.timeAgo || "about 18 hours ago",
                          Condition: itemData?.Condition,
                          "Exterior Color": itemData?.ExteriorColor,
                          Purpose: itemData?.Purpose,
                          Model: itemData?.Model,
                          Color: itemData?.Color,
                          City: itemData?.City || "Paris",
                          "Price From": itemData?.priceFrom || "65",
                          "Price To": itemData?.priceTo || "120",
                          "Skill Level": itemData?.SkillLevel,
                          Website: itemData?.Website,
                          Phone: itemData?.Phone || "03136424039",
                          Email: itemData?.Email || "tofarhanali@gmail.com",
                          Facebook: itemData?.facebook || "http://facebook.com",
                          Twitter: itemData?.twitter || "http://twitter.com",
                          Instagram:
                            itemData?.instagram || "http://instagram.com",
                          "Google Plus":
                            itemData?.googlePlus || "http://google.com",
                          Address:
                            itemData?.address ||
                            "8697-8747 Stirling Rd, Florida",
                          Location: itemData?.location || "$$$islmabad",
                          Latitude: itemData?.latitude || "26.045197767574102",
                          Longitude:
                            itemData?.longitude || "-80.26095677163161",
                          "Manufacture Year": itemData?.ManufactureYear,
                          Processor: itemData?.Processor || "Apple M1",
                          "Display Quality":
                            itemData?.DisplayQuality || "Full HD",
                          "Storage Capacity":
                            itemData?.Storagecapacity || "1TB",
                          "Storage Type":
                            itemData?.StorageType || "SSD (Solid State Drive)",
                          "Battery Life": itemData?.BatteryLife || "8-12 hours",
                          Connectivity: itemData?.Connectivity || "Wi-Fi 5",
                          "Graphics Card":
                            itemData?.GraphicsCard || "AMD Radeon",
                          "Special Features":
                            itemData?.SpecialFeatures || "Backlit keyboard",
                          "Screen Size": itemData?.ScreenSize || "14-inch",
                          "Picture Availability":
                            itemData?.PictureAvailability || "Without Pictures",
                          "Video Availability":
                            itemData?.VideoAvailability || "Without video",
                          "Featured Ads":
                            itemData?.FeaturedAds || "Featured Ads",
                          Category: itemData?.category || "Electronics",
                          State: itemData?.States || "Illinois",
                          "Created At": formatTimestamp(itemData?.createdAt), // Format timestamp
                        })
                          .filter(([_, value]) => value) // Remove empty values
                          .map(([label, value], index) => (
                            <tr
                              key={index}
                              className="border-bottom border-gray-300"
                            >
                              <th className="table_text px-3 py-2 text-left font-medium w-1/3">
                                {label}:
                              </th>
                              <td className="table_text px-3 py-2 w-2/3">
                                {value}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="descriptions_wrapper">
                                <h1
                                  className="fw-bold"
                                  style={{ padding: "20px" ,marginLeft:-100}}
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

                                 {/* <div className="row">
                                   <button
                                     className="hovering"
                                     style={{
                                       color: "white",
                                       border: "2px solid rgb(45, 68, 149)",
                                       background: "#2D4495",
                                       borderRadius: "0.7rem",
                                       width: "7rem",
                                       height: "2rem",
                                       margin: "1.3rem",
                                     }}
                                   >
                                     Loresm
                                   </button>

                                   <>
                                     <button
                                       className="hovering"
                                       style={{
                                         color: "white",
                                         border: "2px solid rgb(45, 68, 149)",
                                         background: "#2D4495",
                                         borderRadius: "0.7rem",
                                         width: "7rem",
                                         height: "2rem",
                                         margin: "1.3rem",
                                       }}
                                       onClick={handleShow}
                                     >
                                       Report
                                     </button>

                                     <Modal
                                       show={show}
                                       onHide={handleClose}
                                       centered
                                     >
                                       <Modal.Header closeButton>
                                         <Modal.Title>
                                           Submit a Report
                                         </Modal.Title>
                                       </Modal.Header>
                                       <Modal.Body>
                                         <Form>
                                           <Form.Group controlId="reportText">
                                             <Form.Label>
                                               Report Details
                                             </Form.Label>
                                             <Form.Control
                                               as="textarea"
                                               rows={3}
                                               placeholder="Describe the issue..."
                                               value={reportText}
                                               onChange={(e) =>
                                                 setReportText(e.target.value)
                                               }
                                             />
                                           </Form.Group>

                                           <Form.Group className="mt-3">
                                             <Form.Label>
                                               Report Type
                                             </Form.Label>
                                             {reportTypes.map(
                                               (type, index) => (
                                                 <Form.Check
                                                   key={index}
                                                   type="checkbox"
                                                   label={type}
                                                   checked={selectedReports.includes(
                                                     type
                                                   )}
                                                   onChange={() =>
                                                     handleCheckboxChange(type)
                                                   }
                                                 />
                                               )
                                             )}
                                           </Form.Group>
                                         </Form>
                                       </Modal.Body>
                                       <Modal.Footer>
                                         <Button
                                           variant="secondary"
                                           onClick={handleClose}
                                         >
                                           Close
                                         </Button>
                                         <Button
                                           variant="primary"
                                           onClick={handleSubmit}
                                           disabled={
                                             !reportText ||
                                             selectedReports.length === 0
                                           }
                                         >
                                           Submit Report
                                         </Button>
                                       </Modal.Footer>
                                     </Modal>
                                   </>
                                 </div> */}
                               </div>
                             </div>
                              </div>
            </div>

            {/* Right Side: Profile Information Section */}
            <div className="col-md-4    border-none leftCard responsive_card">
            {" "}
      
            <div className="col-md-11  border-none leftCard responsive_card">
                  <Card  style={{ position: "relative", minHeight: "100px",borderRadius: "12px",width:"110%",marginTop:18,boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)", }}>
  {/* Card body to hold the price and heart button */}
  <Card.Body style={{  position: "relative",marginTop:-40 ,marginLeft:-15,marginBottom:-30}}>
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


                            
                                                       
                                                          <div className="modal-footer">
                                                            <button
                                                              type="button"
                                                              className="btn btn-secondary"
                                                              onClick={() => setShowModal(false)}
                                                            >
                                                              Close
                                                            </button>
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
                   
                      
              
                     
                    <Card  style={{ position: "relative", minHeight: "100px",borderRadius: "12px",width:"110%",marginTop:18,boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)", }}>
  {/* Card body to hold the price and heart button */}
  <Card.Body style={{  position: "relative",marginTop:-40 ,marginLeft:-20}}>
                     
                      
                    
                            <div className="d-flex flex-column gap-3 mt-4 ms-0">
                              <img
                                src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                                alt="Dummy 1"
                                className="rounded shadow"
                                style={{
                                  width: "375px",
                                  height: "300px",
                                  objectFit: "cover",
                                }}
                              />
                              <img
                                src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                                alt="Dummy 2"
                                className="rounded shadow"
                                style={{
                                  width: "375px",
                                  height: "300px",
                                  objectFit: "cover",
                                }}
                              />
                              <img
                                src="https://images.unsplash.com/photo-1471357674240-e1a485acb3e1"
                                alt="Dummy 3"
                                className="rounded shadow"
                                style={{
                                  width: "375px",
                                  height: "300px",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                      
                            </Card.Body>
</Card>   
                   
                  </div>
         
            </div>
            <SuggestedAds callingFrom={callingFrom} currentAdId={_Id} />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Dynamic_Routes;
