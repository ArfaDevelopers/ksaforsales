import React, { useEffect, useState, useMemo } from "react";
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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams, useLocation } from "react-router";
import { useMyContext } from "../../store/Contexxt.store";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import arrow from "./Vector.png";
import left from "./left.png";
import right from "./right.png";
import share from "./sahere.png";
import report from "./report.png";
import carimg from "./carimg.png";
import { MdMessage } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaBuysellads } from "react-icons/fa";
import Loading1 from "../../../../public/Progress circle.png";
import image1 from "../../../assets/img/banner/bannerimage1.png";
import image2 from "../../../assets/img/banner/bannerimage2.png";
import image3 from "../../../assets/img/banner/bannerimage3.png";
import image4 from "../../../assets/img/banner/bannerimage4.png";
import { HiMiniSlash } from "react-icons/hi2";
// import { FaRegHeart } from "react-icons/fa";
import ads from "./adsimg.png";
import {
  getDocs,
  collection,
  addDoc,
  setDoc,
  getDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../../Firebase/FirebaseConfig";
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
import Mesagedeals from "../../../components/userPages/mesagedeals";
import SwiperSlider from "../SwiperSlider/SwiperSlider";
import { ref } from "firebase/storage";
import Relateddata from "./upperHeader/Relateddata";

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
  const [refresh, setRefresh] = useState(false);

  const link = getQueryParam("link") || window.location.href;
  const handleFavourite = async (id, category) => {
    try {
      // 🔁 Map category to actual Firestore collection name
      const collectionMap = {
        Motors: "Cars",
        Electronics: "ELECTRONICS",
        Services: "TRAVEL",
        Other: "Education",
        "Pet & Animals": "PETANIMALCOMP",
        "Home & Furnituer": "HEALTHCARE",

        "Sports & Game": "SPORTSGAMESComp",
        "Fashion Style": "FASHION",
        "Job Board": "JOBBOARD",
        Automotive: "Cars",
      };

      const firestoreCollection = collectionMap[category] || category;

      // 🔍 Get current document
      const docRef = doc(db, firestoreCollection, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.warn(
          `Document with ID ${id} not found in ${firestoreCollection}`
        );
        return;
      }

      const currentData = docSnap.data();
      const currentBookmarkStatus = currentData.bookmarked || false;

      // ✅ Toggle the bookmark field
      await updateDoc(docRef, {
        bookmarked: !currentBookmarkStatus,
      });
      setRefresh(!refresh);
      console.log(
        `✅ Bookmark toggled for ${id} in ${firestoreCollection} — Now: ${!currentBookmarkStatus}`
      );
    } catch (error) {
      console.error("❌ Error toggling bookmark:", error);
    }
  };
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

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
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
  const [itemData, setItemData] = useState(null); // State to store ads

  console.log(itemData, "itemData111111111111111");
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
        const response = await fetch("http://168.231.80.24:9002/api/messages", {
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
        });

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
  console.log("userid__________", recieverId);
  const [chatIds, setChatIds] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFullScreen) return;
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "Escape") handleCloseFullScreen();
    };

    // Disable body scrolling when full-screen is active
    if (isFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto"; // Re-enable scrolling on cleanup
    };
  }, [isFullScreen, selectedImage]);

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
  };
  const handleFullScreen = (image) => {
    setSelectedImage(image);
    setIsFullScreen(true);
  };
  const [adsDetailImagesContent, setAdsdetailImagesContent] = useState([]);
  console.log(adsDetailImagesContent, "adsDetailImagesContent_____________111");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "AdsdetailImages"), // Fetch data from the "AdsdetailImages" table/collection
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched AdsdetailImages data:", data);
        setAdsdetailImagesContent(data); // Assuming you have a state setter for AdsdetailImages
      },
      (error) => {
        console.error("Error fetching AdsdetailImages data:", error);
      }
    );
    return () => unsubscribe();
  }, []);
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
          `http://168.231.80.24:9002/api/chat-id/${userId}/${itemData.userId}`
        );

        if (!chatData.success) {
          console.log("No chat found");
          return;
        }

        const chatId = chatData.chatId;

        // Now fetch messages using chatId
        const { data: messagesData } = await axios.get(
          `http://168.231.80.24:9002/api/messages/${chatId}`
        );

        setReceivedMessages(messagesData?.data || []);
        console.log("Fetched messages:", messagesData);
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };

    fetchChatIdAndMessages();
  }, [refresh, itemData?.userId, refresh, userId]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          "http://168.231.80.24:9002/route/api/users"
        );
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    socket = io("http://168.231.80.24:9002/route");
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
        `http://168.231.80.24:9002/route/api/chats/${userId}`
      );
      setChats(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const { data } = await axios.get(
        `http://168.231.80.24:9002/route/api/messages/${chatId}`
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

  // useEffect(() => {
  //   const fetchItem = async () => {
  //     setLoading(true); // Start loading
  //     try {
  //       const collectionName =
  //         callingFrom === "AutomotiveComp"
  //           ? "Cars"
  //           : callingFrom === "ElectronicComp"
  //           ? "ELECTRONICS"
  //           : callingFrom === "FashionStyle"
  //           ? "FASHION"
  //           : callingFrom === "HealthCareComp"
  //           ? "HEALTHCARE"
  //           : callingFrom === "JobBoard"
  //           ? "JOBBOARD"
  //           : callingFrom === "Education"
  //           ? "Education"
  //           : callingFrom === "RealEstateComp"
  //           ? "REALESTATECOMP"
  //           : callingFrom === "TravelComp"
  //           ? "TRAVEL"
  //           : callingFrom === "SportGamesComp"
  //           ? "SPORTSGAMESComp"
  //           : callingFrom === "PetAnimalsComp"
  //           ? "PETANIMALCOMP"
  //           : "books";
  //       // Determine collection based on `callingFrom`
  //       // const collectionName = callingFrom === "automotive" ? "carData" : "books";
  //       const adsCollection = collection(db, collectionName); // Reference to dynamic collection
  //       const adsSnapshot = await getDocs(adsCollection); // Fetch all documents
  //       const adsList = adsSnapshot.docs.map((doc) => ({
  //         id: doc.id, // Include document ID
  //         ...doc.data(), // Spread document data
  //       }));

  //       console.log(adsList, "Fetched Ads");

  //       // Find the ad that matches the `id` from the URL
  //       const selectedAd = adsList.find((ad) => ad.id === NewId);
  //       if (selectedAd) {
  //         setItemData({
  //           ...selectedAd,
  //           timeAgo: selectedAd.createdAt
  //             ? formatDistanceToNow(selectedAd.createdAt.toDate(), {
  //                 addSuffix: true,
  //               })
  //             : "Unknown time",
  //         });
  //       } else {
  //         setItemData(null);
  //       }

  //       setLoading(false); // Stop loading
  //     } catch (error) {
  //       console.error("Error fetching item:", error);
  //       setError("Failed to fetch data");
  //       setLoading(false); // Stop loading on error
  //     }
  //   };

  //   fetchItem(); // Call the fetch function
  // }, [id, callingFrom, db, location, refresh]); // Re-run if `id` changes
  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://168.231.80.24:9002/route/getItemById?callingFrom=${callingFrom}&id=${_Id}`
        );

        const item = await res.json();

        if (item?.id) {
          setItemData({
            ...item,
            timeAgo: item.createdAt?._seconds
              ? formatDistanceToNow(new Date(item.createdAt._seconds * 1000), {
                  addSuffix: true,
                })
              : "Unknown time",
          });
        } else {
          setItemData(null);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching item:", error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    if (_Id && callingFrom) fetchItem();
  }, [_Id, callingFrom, refresh]); // Re-run if `_Id` or `callingFrom` changes
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      // <div
      //   style={{
      //     display: "flex",
      //     justifyContent: "center",
      //     alignItems: "center",
      //     height: "100vh",
      //   }}
      // >
      //   <img
      //     src={Loading1}
      //     alt="Loading..."
      //     style={{
      //       width: "200px",
      //       height: "200px",
      //       animation: "spin 1s linear infinite", // Apply the spin animation
      //     }}
      //   />
      //   <style>
      //     {`
      //     @keyframes spin {
      //       from {
      //         transform: rotate(0deg);
      //       }
      //       to {
      //         transform: rotate(360deg);
      //       }
      //     }
      //   `}
      //   </style>
      // </div>
    ); // Display loading state
  }

  if (!itemData) {
    return <p>No item found for the given ID.</p>;
  }

  const postedTime = itemData.createdAt?.toDate
    ? itemData.createdAt.toDate()
    : null;
  const timeAgo = postedTime
    ? formatDistanceToNow(postedTime, { addSuffix: true })
    : "Unknown time";

  const images = itemData?.galleryImages || [];
  console.log(images, "images______________");
  const featuresData = [
    ["Ads", "Normal Condition", "Immobilizer Key", "Power Mirrors"],
    ["Ads", "Normal Condition", "Immobilizer Key", "Power Mirrors"],
    ["Ads", "Normal Condition", "Immobilizer Key", "Power Mirrors"],
  ];
  const visibleImages = images;
  // useEffect(() => {
  //   if (images.length > 0) {
  //     setSelectedImage(images[0]);
  //   }
  // }, [images]); // Re-run when images prop changes

  // Settings for React Slick
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Loop the slider
    speed: 500, // Transition speed
    slidesToShow:
      images.length === 1
        ? 1
        : images.length === 2
        ? 2
        : images.length === 3
        ? 3
        : images.length === 4
        ? 4
        : 5, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    initialSlide: 0, // Starting slide index
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          infinite: false,
          autoplay: false,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="main-wrapper ">
        <Header />

        <Container
          className="parent-main"
          style={{
            color: "black",
            marginTop: window.innerWidth <= 576 ? "7rem" : "11rem",
          }}
        >
          <div
            className="adsCategory_head"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
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
              width: "100%",
            }}
          />
          <div>
            <div
              style={{
                marginTop: window.innerWidth <= 576 ? "10px" : "20px",
                marginBottom: window.innerWidth <= 576 ? "10px" : "20px",
                fontSize: "40px",
                fontWeight: "bold",
              }}
            >
              {itemData?.title || "Default Title"}{" "}
            </div>
          </div>
          <div
            className="CategoryInfodiv_btn2container"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: window.innerWidth <= 576 ? "10px" : "0px",
              marginTop: window.innerWidth <= 576 ? "10px" : "0px",
            }}
          >
            {/* <button
              className="head2btn"
              style={{
                backgroundColor: "white",
                border: "1px solid #2D4495",
                padding: window.innerWidth <= 576 ? "5px" : "10px 15px",
                textAlign: "center",
                width: window.innerWidth <= 576 ? "47%" : "auto",
              }}
              onClick={() => handleFavourite(itemData?.id, itemData?.category)} // ← Add this
            >
              <span>
                <FaRegHeart />
              </span>{" "}
              Favourite
            </button> */}
            <button
              className="head2btn"
              style={{
                backgroundColor: "white",
                border: "1px solid #2D4495",
                padding: window.innerWidth <= 576 ? "5px" : "10px 15px",
                textAlign: "center",
                width: window.innerWidth <= 576 ? "47%" : "auto",
              }}
              onClick={() => handleFavourite(itemData?.id, itemData?.category)}
            >
              <span style={{ color: itemData?.bookmarked ? "red" : "gray" }}>
                {itemData?.bookmarked ? <FaHeart /> : <FaRegHeart />}
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
                  width: window.innerWidth <= 576 ? "47%" : "auto",
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
                            style={{
                              backgroundColor: "#2d4495",
                              color: "#fff",
                              border: "none",
                              fontWeight: "bold",
                              borderRadius: 10,
                            }}
                            onClick={copyToClipboard}
                          >
                            Copy
                          </button>
                          <button
                            type="button"
                            className="btn "
                            style={{
                              backgroundColor: "#2d4495",
                              color: "#fff",
                              border: "none",
                              fontWeight: "bold",
                              borderRadius: 10,
                            }}
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
            {itemData.userId === userId ? (
              <button
                className="head2btn"
                onClick={handleShowReport}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #2D4495",
                  padding: window.innerWidth <= 576 ? "5px" : "10px 15px",
                  textAlign: "center",
                  width: window.innerWidth <= 576 ? "47%" : "auto",
                }}
              >
                <span>
                  {/* <img src="your-report-image-source" alt="promote" /> */}
                  <FaBuysellads />
                </span>
                Promote
              </button>
            ) : (
              ""
            )}
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
            <button
              className="head2btn"
              style={{
                backgroundColor: "white",
                border: "1px solid #2D4495",
                padding: window.innerWidth <= 576 ? "5px" : "10px 15px",
                textAlign: "center",
                width: window.innerWidth <= 576 ? "47%" : "auto",
              }}
              onClick={handleShow}
            >
              <span>
                <img src={report} alt="report" />
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
        </Container>

        <Container
          style={{
            color: "black", // Text color
          }}
        >
          <div className="d-flex flex-wrap justify-content-end">
            <p
              style={{
                color: "black",
                fontWeight: "400",
                marginBottom: "10px",
              }}
            >
              Posted {itemData?.timeAgo || "Loading..."}
            </p>
          </div>
          <Row>
            {/* Sidebar */}
            <Col xl={8}>
              {callingFrom === "AutomotiveComp" ? (
                <>
                  <div>
                    {/* Main Image with Previous & Next Buttons */}
                    <div
                      style={{
                        position: "relative",
                        textAlign: "center",
                      }}
                    ></div>

                    {isFullScreen && (
                      <div
                        style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          width: "100vw",
                          height: "100vh",
                          background: "rgba(0, 0, 0, 0.9)",
                          zIndex: 9999,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          margin: 0,
                          padding: 0,
                          overflow: "hidden",
                        }}
                      >
                        {/* Header Section with Title, Price, and Buttons */}
                        <div
                          style={{
                            position: "absolute",
                            top: "20px",
                            width: "100%",
                            padding: "0 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            zIndex: 10000,
                          }}
                        >
                          {/* Left Side: Title, Price, and Images Link */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft:
                                window.innerWidth <= 576 ? "0px" : "270px",
                              alignItems: "flex-start",
                            }}
                          >
                            <h2
                              style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: "white",
                                margin: 0,
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              {itemData?.title || "آلة غسيل أطباق"}
                            </h2>
                            <p
                              style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "white",
                                margin: "5px 0",
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              ${itemData?.Price || "N/A"}
                            </p>
                          </div>

                          {/* Right Side: Call, WhatsApp, Message Buttons */}
                          <div className="d-flex align-items-center gap-2">
                            {/* Call, WhatsApp, Message Buttons */}
                            <div
                              className="d-flex align-items-center gap-2 head2btflex"
                              style={{
                                marginRight:
                                  window.innerWidth <= 576 ? "0px" : "270px",
                                marginTop:
                                  window.innerWidth <= 576 ? "70px" : "0px",
                              }}
                            >
                              {itemData.showNumberChecked ? (
                                ""
                              ) : (
                                <a
                                  disabled={itemData.showNumberChecked}
                                  href={`tel:${itemData.Phone}`}
                                >
                                  <button
                                    disabled={itemData.showNumberChecked}
                                    className={`blue_btn list_btn ${
                                      showPhone ? "expanded" : ""
                                    }`}
                                    onClick={() => setShowPhone(true)}
                                  >
                                    <FaPhoneAlt />
                                    <span>
                                      {showPhone ? itemData.Phone : "Call Now"}
                                    </span>
                                  </button>
                                </a>
                              )}{" "}
                              <a
                                href={`https://wa.me/${itemData.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <button
                                  className={`blue_btn list_btn ${
                                    showPhone ? "icon-only" : ""
                                  }`}
                                >
                                  <FaWhatsapp />
                                  <span className="button-text">WhatsApp</span>
                                </button>
                              </a>
                              <button
                                className={`blue_btn list_btn ${
                                  showPhone ? "icon-only" : ""
                                }`}
                                onClick={() => setShowModal(true)}
                              >
                                <MdMessage />
                                <span className="button-text">Message</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Full-Screen Image */}
                        {selectedImage && (
                          <div
                            style={{
                              textAlign: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <img
                              src={selectedImage}
                              alt="Full Screen"
                              style={{
                                width: "100%", // Use 100% width of its container
                                maxWidth: "800px", // Max width to control size on larger screens
                                height: "auto", // Maintain aspect ratio
                                maxHeight: "80vh", // Max height to ensure it fits the viewport
                                objectFit: "contain",
                                marginTop: "20px", // Adjust margin as needed
                                borderRadius: "8px", // Slightly rounded corners
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Subtle shadow
                              }}
                            />
                          </div>
                        )}

                        {/* Close Button */}
                        <button
                          onClick={handleCloseFullScreen}
                          aria-label="Close full-screen image"
                          style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            background: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                            cursor: "pointer",
                            fontSize: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 10001, // Above other elements
                          }}
                        >
                          X
                        </button>

                        {/* Previous Button */}
                        <button
                          onClick={handlePrevImage}
                          style={{
                            position: "absolute",
                            left: window.innerWidth <= 576 ? "10px" : "200px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(0, 0, 0, 0.5)", // Match the image's button style
                            color: "white",
                            border: "none",
                            padding: "10px",
                            cursor: "pointer",
                            borderRadius: "50%",
                            fontSize: "20px",
                          }}
                        >
                          ◄
                        </button>

                        {/* Next Button */}
                        <button
                          onClick={handleNextImage}
                          style={{
                            position: "absolute",
                            right: window.innerWidth <= 576 ? "10px" : "200px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(0, 0, 0, 0.5)", // Match the image's button style
                            color: "white",
                            border: "none",
                            padding: "10px",
                            cursor: "pointer",
                            borderRadius: "50%",
                            fontSize: "20px",
                          }}
                        >
                          ►
                        </button>

                        {/* Image Counter */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: "20px",
                            background: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "15px",
                            fontSize: "16px",
                            zIndex: 10000,
                          }}
                        >
                          {`${
                            itemData?.galleryImages.indexOf(selectedImage) + 1
                          } of ${itemData?.galleryImages.length} photos`}
                        </div>

                        {/* Message Modal */}
                        {showModal && (
                          <>
                            <div
                              className={`modal fade ${
                                showModal ? "show d-block" : "d-none"
                              }`}
                              tabIndex="-1"
                              role="dialog"
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                zIndex: 10001,
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100vw",
                                height: "100vh",
                              }}
                            >
                              <div
                                className="modal-dialog modal-dialog-centered"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title">
                                      Send Message
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={() => setShowModal(false)}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <div className="p-4 w-full max-w-lg mx-auto">
                                      {userId && recieverId ? (
                                        <Mesagedeals
                                          userId={userId}
                                          recieverId={recieverId}
                                          fullWidth={true} // :point_left: Add this prop
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
                            <div
                              className="modal-backdrop fade show"
                              onClick={() => setShowModal(false)}
                              style={{ zIndex: 10000 }}
                            ></div>
                          </>
                        )}
                      </div>
                    )}

                    <div
                      className="multiplesimage-wrapper"
                      style={{
                        gap: "10px",
                        marginTop: "0",
                        // flexWrap: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      <SwiperSlider images={images} />
                      {/* {images.length > 0 ? (
                        <div style={{ maxWidth: "100%", margin: "0 auto" }}>
                          {" "}
                      
                          <Slider {...settings}>
                            {images.map((image, index) => (
                              <div
                                key={index}
                                onClick={() => handleImageSelect(image)}
                                style={{
                                  padding: "5px", // Add some padding around each slide item
                                  outline: "none", // Remove focus outline
                                }}
                              >
                                <img
                                  src={image}
                                  alt={`Car ${index + 1}`}
                                  style={{
                                    width:
                                      window.innerWidth <= 480
                                        ? "110px"
                                        : "110px%",

                                    // "95%", // Occupy most of the slide width
                                    height: "100px", // Fixed height for thumbnails
                                    objectFit: "cover", // Crop to cover the area
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    border:
                                      selectedImage === image
                                        ? "2px solid blue"
                                        : "2px solid transparent", // Use transparent border for consistency
                                    transition: "border 0.2s ease-in-out", // Smooth border transition
                                  }}
                                />
                              </div>
                            ))}
                          </Slider>
                        </div>
                      ) : (
                        <p>No images to display.</p>
                      )} */}
                    </div>
                  </div>

                  <div
                    className="border-none info_wrapper "
                    style={{ marginLeft: window.innerWidth <= 576 ? 5 : 10 }}
                  >
                    <div className="col">
                      <div className="table-responsive info_table">
                        <div className="product_Detail_main">
                          <ul className="product_Detail_inner">
                            {Object.entries({
                              SellerType: itemData?.SellerType || "N/A",
                              Insurance: itemData?.Insurance || "N/A",
                              City: itemData?.City || "N/A",
                              SeatingCapacity:
                                itemData?.SeatingCapacity || "N/A",
                              FeaturedAds: itemData?.FeaturedAds || "N/A",
                              "Body Type": itemData?.BodyType || "N/A",
                              "Last Updated": itemData?.timeAgo || "N/A",
                              Condition: itemData?.Condition || "N/A",
                              District: itemData?.District || "N/A",
                              Purpose: itemData?.Purpose || "N/A",
                              Model: itemData?.Model || "N/A",
                              Color: itemData?.Color || "N/A",
                              RegionalSpec: itemData?.RegionalSpec || "N/A",
                              Transmission: itemData?.Transmission || "N/A",
                            })
                              .filter(([_, value]) => value)
                              .map(([label, value], index) => (
                                <li
                                  key={index}
                                  className="product_Detail_block"
                                >
                                  <span className="detail_text">{label}:</span>
                                  <span className="detail_text">{value}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>

                      <div className="dynamic-route-container">
                        {/* Features Section */}
                        <div className="section">
                          <h1 className="section-title dynamic_route">
                            Features
                          </h1>
                          <ul className="descriptions-wrapper">
                            {itemData?.AdditionalFeatures?.length > 0 ? (
                              itemData.AdditionalFeatures.map(
                                (feature, index) => (
                                  <li key={index} className="feature-item">
                                    {feature}
                                  </li>
                                )
                              )
                            ) : (
                              <li className="no-data">N/A</li>
                            )}
                          </ul>
                        </div>

                        {/* Description Section */}
                        <div className="section m-0">
                          <h1 className="section-title section-title-description dynamic_route">
                            Description
                          </h1>
                          <p className="descriptions-para">
                            {itemData?.description?.trim() || "No description"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : callingFrom === "ElectronicComp" ? (
                <>
                  <div
                  // style={{ marginLeft: window.innerWidth <= 576 ? 5 : 10 }}
                  >
                    {/* Main Image with Previous & Next Buttons */}
                    <div
                      style={{
                        position: "relative",
                        textAlign: "center",
                      }}
                    >
                      {/* <div
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
                          itemData?.galleryImages.indexOf(selectedImage) + 1 ||
                          1
                        } of ${itemData?.galleryImages.length} photos`}
                      </div> */}
                    </div>

                    {isFullScreen && (
                      <div
                        style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          width: "100vw",
                          height: "100vh",
                          background: "rgba(0, 0, 0, 0.9)",
                          zIndex: 9999,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          margin: 0,
                          padding: 0,
                          overflow: "hidden",
                        }}
                      >
                        {/* Header Section with Title, Price, and Buttons */}
                        <div
                          style={{
                            position: "absolute",
                            top: "20px",
                            width: "100%",
                            padding: "0 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            zIndex: 10000,
                          }}
                        >
                          {/* Left Side: Title, Price, and Images Link */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft:
                                window.innerWidth <= 576 ? "0px" : "270px",
                              alignItems: "flex-start",
                            }}
                          >
                            <h2
                              style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: "white",
                                margin: 0,
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              {itemData?.title || "آلة غسيل أطباق"}
                            </h2>
                            <p
                              style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "white",
                                margin: "5px 0",
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              ${itemData?.Price || "N/A"}
                            </p>
                          </div>

                          {/* Right Side: Call, WhatsApp, Message Buttons */}
                          <div className="d-flex align-items-center gap-2">
                            {/* Call, WhatsApp, Message Buttons */}
                            <div
                              className="d-flex align-items-center gap-2 head2btflex"
                              style={{
                                marginRight:
                                  window.innerWidth <= 576 ? "0px" : "270px",
                                marginTop:
                                  window.innerWidth <= 576 ? "70px" : "0px",
                              }}
                            >
                              {itemData.showNumberChecked ? (
                                ""
                              ) : (
                                <a
                                  disabled={itemData.showNumberChecked}
                                  href={`tel:${itemData.Phone}`}
                                >
                                  <button
                                    disabled={itemData.showNumberChecked}
                                    className={`blue_btn list_btn ${
                                      showPhone ? "expanded" : ""
                                    }`}
                                    onClick={() => setShowPhone(true)}
                                  >
                                    <FaPhoneAlt />
                                    <span>
                                      {showPhone ? itemData.Phone : "Call Now"}
                                    </span>
                                  </button>
                                </a>
                              )}{" "}
                              <a
                                href={`https://wa.me/${itemData.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <button
                                  className={`blue_btn list_btn ${
                                    showPhone ? "icon-only" : ""
                                  }`}
                                >
                                  <FaWhatsapp />
                                  <span className="button-text">WhatsApp</span>
                                </button>
                              </a>
                              <button
                                className={`blue_btn list_btn ${
                                  showPhone ? "icon-only" : ""
                                }`}
                                onClick={() => setShowModal(true)}
                              >
                                <MdMessage />
                                <span className="button-text">Message</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Full-Screen Image */}
                        {selectedImage && (
                          <div
                            style={{
                              textAlign: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <img
                              src={selectedImage}
                              alt="Full Screen"
                              style={{
                                width: "100%", // Use 100% width of its container
                                maxWidth: "800px", // Max width to control size on larger screens
                                height: "auto", // Maintain aspect ratio
                                maxHeight: "80vh", // Max height to ensure it fits the viewport
                                objectFit: "contain",
                                marginTop: "20px", // Adjust margin as needed
                                borderRadius: "8px", // Slightly rounded corners
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Subtle shadow
                              }}
                            />
                          </div>
                        )}

                        {/* Close Button */}
                        <button
                          onClick={handleCloseFullScreen}
                          aria-label="Close full-screen image"
                          style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            background: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                            cursor: "pointer",
                            fontSize: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 10001, // Above other elements
                          }}
                        >
                          X
                        </button>

                        {/* Previous Button */}
                        <button
                          onClick={handlePrevImage}
                          style={{
                            position: "absolute",
                            left: window.innerWidth <= 576 ? "10px" : "200px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(0, 0, 0, 0.5)", // Match the image's button style
                            color: "white",
                            border: "none",
                            padding: "10px",
                            cursor: "pointer",
                            borderRadius: "50%",
                            fontSize: "20px",
                          }}
                        >
                          ◄
                        </button>

                        {/* Next Button */}
                        <button
                          onClick={handleNextImage}
                          style={{
                            position: "absolute",
                            right: window.innerWidth <= 576 ? "10px" : "200px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(0, 0, 0, 0.5)", // Match the image's button style
                            color: "white",
                            border: "none",
                            padding: "10px",
                            cursor: "pointer",
                            borderRadius: "50%",
                            fontSize: "20px",
                          }}
                        >
                          ►
                        </button>

                        {/* Image Counter */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: "20px",
                            background: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "15px",
                            fontSize: "16px",
                            zIndex: 10000,
                          }}
                        >
                          {`${
                            itemData?.galleryImages.indexOf(selectedImage) + 1
                          } of ${itemData?.galleryImages.length} photos`}
                        </div>

                        {/* Message Modal */}
                        {showModal && (
                          <>
                            <div
                              className={`modal fade ${
                                showModal ? "show d-block" : "d-none"
                              }`}
                              tabIndex="-1"
                              role="dialog"
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                zIndex: 10001,
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100vw",
                                height: "100vh",
                              }}
                            >
                              <div
                                className="modal-dialog modal-dialog-centered"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title">
                                      Send Message
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={() => setShowModal(false)}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <div className="p-4 w-full max-w-lg mx-auto">
                                      {userId && recieverId ? (
                                        <Mesagedeals
                                          userId={userId}
                                          recieverId={recieverId}
                                          fullWidth={true} // :point_left: Add this prop
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
                            <div
                              className="modal-backdrop fade show"
                              onClick={() => setShowModal(false)}
                              style={{ zIndex: 10000 }}
                            ></div>
                          </>
                        )}
                      </div>
                    )}

                    <div
                      className="multiplesimage-wrapper"
                      style={{
                        gap: "10px",
                        marginTop: "0rem",
                        // flexWrap: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      <SwiperSlider images={images} />
                      {/* {images.length > 0 ? (
                        <div style={{ maxWidth: "100%", margin: "0 auto" }}>
                          {" "}
                      
                          <Slider {...settings}>
                            {images.map((image, index) => (
                              <div
                                key={index}
                                onClick={() => handleImageSelect(image)}
                                style={{
                                  padding: "5px", // Add some padding around each slide item
                                  outline: "none", // Remove focus outline
                                }}
                              >
                                <img
                                  src={image}
                                  alt={`Car ${index + 1}`}
                                  style={{
                                    width:
                                      window.innerWidth <= 480
                                        ? "110px"
                                        : "110px%",

                                    // "95%", // Occupy most of the slide width
                                    height: "100px", // Fixed height for thumbnails
                                    objectFit: "cover", // Crop to cover the area
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    border:
                                      selectedImage === image
                                        ? "2px solid blue"
                                        : "2px solid transparent", // Use transparent border for consistency
                                    transition: "border 0.2s ease-in-out", // Smooth border transition
                                  }}
                                />
                              </div>
                            ))}
                          </Slider>
                        </div>
                      ) : (
                        <p>No images to display.</p>
                      )} */}
                    </div>
                  </div>

                  <div
                    className="border-none info_wrapper "
                    style={{ marginLeft: window.innerWidth <= 576 ? 5 : 10 }}
                  >
                    <div className="col">
                      <div className="table-responsive info_table">
                        <div className="product_Detail_main">
                          <ul className="product_Detail_inner">
                            {Object.entries({
                              SellerType: itemData?.SellerType || "N/A",
                              Insurance: itemData?.Insurance || "N/A",
                              City: itemData?.City || "N/A",
                              SeatingCapacity:
                                itemData?.SeatingCapacity || "N/A",
                              FeaturedAds: itemData?.FeaturedAds || "N/A",
                              "Body Type": itemData?.BodyType || "N/A",
                              "Last Updated": itemData?.timeAgo || "N/A",
                              Condition: itemData?.Condition || "N/A",
                              District: itemData?.District || "N/A",
                              Purpose: itemData?.Purpose || "N/A",
                              Model: itemData?.Model || "N/A",
                              Color: itemData?.Color || "N/A",
                              RegionalSpec: itemData?.RegionalSpec || "N/A",
                              Transmission: itemData?.Transmission || "N/A",
                            })
                              .filter(([_, value]) => value)
                              .map(([label, value], index) => (
                                <li
                                  key={index}
                                  className="product_Detail_block"
                                >
                                  <span className="detail_text">{label}:</span>
                                  <span className="detail_text">{value}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>

                      <div className="dynamic-route-container">
                        {/* Features Section */}
                        <div className="section">
                          <h1 className="section-title">Features</h1>
                          <ul className="descriptions-wrapper">
                            {itemData?.AdditionalFeatures?.length > 0 ? (
                              itemData.AdditionalFeatures.map(
                                (feature, index) => (
                                  <li key={index} className="feature-item">
                                    {feature}
                                  </li>
                                )
                              )
                            ) : (
                              <li className="no-data">N/A</li>
                            )}
                          </ul>
                        </div>

                        {/* Description Section */}
                        <div className="section m-0">
                          <h1 className="section-title section-title-description">
                            Description
                          </h1>
                          <p className="descriptions-para">
                            {itemData?.description?.trim() || "No description"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : callingFrom === "FashionStyle" ? (
                <>
                  <div
                  // style={{ marginLeft: window.innerWidth <= 576 ? 5 : 10 }}
                  >
                    {/* Main Image with Previous & Next Buttons */}
                    <div
                      style={{
                        position: "relative",
                        textAlign: "center",
                      }}
                    >
                      {/* <div
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
                          itemData?.galleryImages.indexOf(selectedImage) + 1 ||
                          1
                        } of ${itemData?.galleryImages.length} photos`}
                      </div> */}
                    </div>

                    {isFullScreen && (
                      <div
                        style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          width: "100vw",
                          height: "100vh",
                          background: "rgba(0, 0, 0, 0.9)",
                          zIndex: 9999,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          margin: 0,
                          padding: 0,
                          overflow: "hidden",
                        }}
                      >
                        {/* Header Section with Title, Price, and Buttons */}
                        <div
                          style={{
                            position: "absolute",
                            top: "20px",
                            width: "100%",
                            padding: "0 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            zIndex: 10000,
                          }}
                        >
                          {/* Left Side: Title, Price, and Images Link */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft:
                                window.innerWidth <= 576 ? "0px" : "270px",
                              alignItems: "flex-start",
                            }}
                          >
                            <h2
                              style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: "white",
                                margin: 0,
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              {itemData?.title || "آلة غسيل أطباق"}
                            </h2>
                            <p
                              style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "white",
                                margin: "5px 0",
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              ${itemData?.Price || "N/A"}
                            </p>
                          </div>

                          {/* Right Side: Call, WhatsApp, Message Buttons */}
                          <div className="d-flex align-items-center gap-2">
                            {/* Call, WhatsApp, Message Buttons */}
                            <div
                              className="d-flex align-items-center gap-2 head2btflex"
                              style={{
                                marginRight:
                                  window.innerWidth <= 576 ? "0px" : "270px",
                                marginTop:
                                  window.innerWidth <= 576 ? "70px" : "0px",
                              }}
                            >
                              {itemData.showNumberChecked ? (
                                ""
                              ) : (
                                <a
                                  disabled={itemData.showNumberChecked}
                                  href={`tel:${itemData.Phone}`}
                                >
                                  <button
                                    disabled={itemData.showNumberChecked}
                                    className={`blue_btn list_btn ${
                                      showPhone ? "expanded" : ""
                                    }`}
                                    onClick={() => setShowPhone(true)}
                                  >
                                    <FaPhoneAlt />
                                    <span>
                                      {showPhone ? itemData.Phone : "Call Now"}
                                    </span>
                                  </button>
                                </a>
                              )}{" "}
                              <a
                                href={`https://wa.me/${itemData.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <button
                                  className={`blue_btn list_btn ${
                                    showPhone ? "icon-only" : ""
                                  }`}
                                >
                                  <FaWhatsapp />
                                  <span className="button-text">WhatsApp</span>
                                </button>
                              </a>
                              <button
                                className={`blue_btn list_btn ${
                                  showPhone ? "icon-only" : ""
                                }`}
                                onClick={() => setShowModal(true)}
                              >
                                <MdMessage />
                                <span className="button-text">Message</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Full-Screen Image */}
                        {selectedImage && (
                          <div
                            style={{
                              textAlign: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <img
                              src={selectedImage}
                              alt="Full Screen"
                              style={{
                                width: "100%", // Use 100% width of its container
                                maxWidth: "800px", // Max width to control size on larger screens
                                height: "auto", // Maintain aspect ratio
                                maxHeight: "80vh", // Max height to ensure it fits the viewport
                                objectFit: "contain",
                                marginTop: "20px", // Adjust margin as needed
                                borderRadius: "8px", // Slightly rounded corners
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Subtle shadow
                              }}
                            />
                          </div>
                        )}

                        {/* Close Button */}
                        <button
                          onClick={handleCloseFullScreen}
                          aria-label="Close full-screen image"
                          style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            background: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                            cursor: "pointer",
                            fontSize: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 10001, // Above other elements
                          }}
                        >
                          X
                        </button>

                        {/* Previous Button */}
                        <button
                          onClick={handlePrevImage}
                          style={{
                            position: "absolute",
                            left: window.innerWidth <= 576 ? "10px" : "200px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(0, 0, 0, 0.5)", // Match the image's button style
                            color: "white",
                            border: "none",
                            padding: "10px",
                            cursor: "pointer",
                            borderRadius: "50%",
                            fontSize: "20px",
                          }}
                        >
                          ◄
                        </button>

                        {/* Next Button */}
                        <button
                          onClick={handleNextImage}
                          style={{
                            position: "absolute",
                            right: window.innerWidth <= 576 ? "10px" : "200px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(0, 0, 0, 0.5)", // Match the image's button style
                            color: "white",
                            border: "none",
                            padding: "10px",
                            cursor: "pointer",
                            borderRadius: "50%",
                            fontSize: "20px",
                          }}
                        >
                          ►
                        </button>

                        {/* Image Counter */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: "20px",
                            background: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "15px",
                            fontSize: "16px",
                            zIndex: 10000,
                          }}
                        >
                          {`${
                            itemData?.galleryImages.indexOf(selectedImage) + 1
                          } of ${itemData?.galleryImages.length} photos`}
                        </div>

                        {/* Message Modal */}
                        {showModal && (
                          <>
                            <div
                              className={`modal fade ${
                                showModal ? "show d-block" : "d-none"
                              }`}
                              tabIndex="-1"
                              role="dialog"
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                zIndex: 10001,
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100vw",
                                height: "100vh",
                              }}
                            >
                              <div
                                className="modal-dialog modal-dialog-centered"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title">
                                      Send Message
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={() => setShowModal(false)}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <div className="p-4 w-full max-w-lg mx-auto">
                                      {userId && recieverId ? (
                                        <Mesagedeals
                                          userId={userId}
                                          recieverId={recieverId}
                                          fullWidth={true} // :point_left: Add this prop
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
                            <div
                              className="modal-backdrop fade show"
                              onClick={() => setShowModal(false)}
                              style={{ zIndex: 10000 }}
                            ></div>
                          </>
                        )}
                      </div>
                    )}

                    <div
                      className="multiplesimage-wrapper"
                      style={{
                        gap: "10px",
                        marginTop: "0rem",
                        // flexWrap: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      <SwiperSlider images={images} />
                      {/* {images.length > 0 ? (
                        <div style={{ maxWidth: "100%", margin: "0 auto" }}>
                          {" "}
                      
                          <Slider {...settings}>
                            {images.map((image, index) => (
                              <div
                                key={index}
                                onClick={() => handleImageSelect(image)}
                                style={{
                                  padding: "5px", // Add some padding around each slide item
                                  outline: "none", // Remove focus outline
                                }}
                              >
                                <img
                                  src={image}
                                  alt={`Car ${index + 1}`}
                                  style={{
                                    width:
                                      window.innerWidth <= 480
                                        ? "110px"
                                        : "110px%",

                                    // "95%", // Occupy most of the slide width
                                    height: "100px", // Fixed height for thumbnails
                                    objectFit: "cover", // Crop to cover the area
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    border:
                                      selectedImage === image
                                        ? "2px solid blue"
                                        : "2px solid transparent", // Use transparent border for consistency
                                    transition: "border 0.2s ease-in-out", // Smooth border transition
                                  }}
                                />
                              </div>
                            ))}
                          </Slider>
                        </div>
                      ) : (
                        <p>No images to display.</p>
                      )} */}
                    </div>
                  </div>

                  <div
                    className="border-none info_wrapper "
                    style={{ marginLeft: window.innerWidth <= 576 ? 5 : 10 }}
                  >
                    <div className="col">
                      <div className="table-responsive info_table">
                        <div className="product_Detail_main">
                          <ul className="product_Detail_inner">
                            {Object.entries({
                              SellerType: itemData?.SellerType || "N/A",
                              Insurance: itemData?.Insurance || "N/A",
                              City: itemData?.City || "N/A",
                              SeatingCapacity:
                                itemData?.SeatingCapacity || "N/A",
                              FeaturedAds: itemData?.FeaturedAds || "N/A",
                              "Body Type": itemData?.BodyType || "N/A",
                              "Last Updated": itemData?.timeAgo || "N/A",
                              Condition: itemData?.Condition || "N/A",
                              District: itemData?.District || "N/A",
                              Purpose: itemData?.Purpose || "N/A",
                              Model: itemData?.Model || "N/A",
                              Color: itemData?.Color || "N/A",
                              RegionalSpec: itemData?.RegionalSpec || "N/A",
                              Transmission: itemData?.Transmission || "N/A",
                            })
                              .filter(([_, value]) => value)
                              .map(([label, value], index) => (
                                <li
                                  key={index}
                                  className="product_Detail_block"
                                >
                                  <span className="detail_text">{label}:</span>
                                  <span className="detail_text">{value}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>

                      <div className="dynamic-route-container">
                        {/* Features Section */}
                        <div className="section m-0">
                          <h1 className="section-title">Features</h1>
                          <ul className="descriptions-wrapper">
                            {itemData?.AdditionalFeatures?.length > 0 ? (
                              itemData.AdditionalFeatures.map(
                                (feature, index) => (
                                  <li key={index} className="feature-item">
                                    {feature}
                                  </li>
                                )
                              )
                            ) : (
                              <li className="no-data">N/A</li>
                            )}
                          </ul>
                        </div>

                        {/* Description Section */}
                        <div className="section m-0">
                          <h1 className="section-title section-title-description">
                            Description
                          </h1>
                          <p className="descriptions-para">
                            {itemData?.description?.trim() || "No description"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : callingFrom === "HealthCareComp" ? (
                <>
                  <div
                  // style={{ marginLeft: window.innerWidth <= 576 ? 5 : 10 }}
                  >
                    {/* Main Image with Previous & Next Buttons */}
                    <div
                      style={{
                        position: "relative",
                        textAlign: "center",
                      }}
                    >
                      {/* <div
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
                          itemData?.galleryImages.indexOf(selectedImage) + 1 ||
                          1
                        } of ${itemData?.galleryImages.length} photos`}
                      </div> */}
                    </div>

                    {isFullScreen && (
                      <div
                        style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          width: "100vw",
                          height: "100vh",
                          background: "rgba(0, 0, 0, 0.9)",
                          zIndex: 9999,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          margin: 0,
                          padding: 0,
                          overflow: "hidden",
                        }}
                      >
                        {/* Header Section with Title, Price, and Buttons */}
                        <div
                          style={{
                            position: "absolute",
                            top: "20px",
                            width: "100%",
                            padding: "0 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            zIndex: 10000,
                          }}
                        >
                          {/* Left Side: Title, Price, and Images Link */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft:
                                window.innerWidth <= 576 ? "0px" : "270px",
                              alignItems: "flex-start",
                            }}
                          >
                            <h2
                              style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: "white",
                                margin: 0,
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              {itemData?.title || "آلة غسيل أطباق"}
                            </h2>
                            <p
                              style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "white",
                                margin: "5px 0",
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              ${itemData?.Price || "N/A"}
                            </p>
                          </div>

                          {/* Right Side: Call, WhatsApp, Message Buttons */}
                          <div className="d-flex align-items-center gap-2">
                            {/* Call, WhatsApp, Message Buttons */}
                            <div
                              className="d-flex align-items-center gap-2 head2btflex"
                              style={{
                                marginRight:
                                  window.innerWidth <= 576 ? "0px" : "270px",
                                marginTop:
                                  window.innerWidth <= 576 ? "70px" : "0px",
                              }}
                            >
                              {itemData.showNumberChecked ? (
                                ""
                              ) : (
                                <a
                                  disabled={itemData.showNumberChecked}
                                  href={`tel:${itemData.Phone}`}
                                >
                                  <button
                                    disabled={itemData.showNumberChecked}
                                    className={`blue_btn list_btn ${
                                      showPhone ? "expanded" : ""
                                    }`}
                                    onClick={() => setShowPhone(true)}
                                  >
                                    <FaPhoneAlt />
                                    <span>
                                      {showPhone ? itemData.Phone : "Call Now"}
                                    </span>
                                  </button>
                                </a>
                              )}{" "}
                              <a
                                href={`https://wa.me/${itemData.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <button
                                  className={`blue_btn list_btn ${
                                    showPhone ? "icon-only" : ""
                                  }`}
                                >
                                  <FaWhatsapp />
                                  <span className="button-text">WhatsApp</span>
                                </button>
                              </a>
                              <button
                                className={`blue_btn list_btn ${
                                  showPhone ? "icon-only" : ""
                                }`}
                                onClick={() => setShowModal(true)}
                              >
                                <MdMessage />
                                <span className="button-text">Message</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Full-Screen Image */}
                        {selectedImage && (
                          <div
                            style={{
                              textAlign: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <img
                              src={selectedImage}
                              alt="Full Screen"
                              style={{
                                width: "100%", // Use 100% width of its container
                                maxWidth: "800px", // Max width to control size on larger screens
                                height: "auto", // Maintain aspect ratio
                                maxHeight: "80vh", // Max height to ensure it fits the viewport
                                objectFit: "contain",
                                marginTop: "20px", // Adjust margin as needed
                                borderRadius: "8px", // Slightly rounded corners
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Subtle shadow
                              }}
                            />
                          </div>
                        )}

                        {/* Close Button */}
                        <button
                          onClick={handleCloseFullScreen}
                          aria-label="Close full-screen image"
                          style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            background: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                            cursor: "pointer",
                            fontSize: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 10001, // Above other elements
                          }}
                        >
                          X
                        </button>

                        {/* Previous Button */}
                        <button
                          onClick={handlePrevImage}
                          style={{
                            position: "absolute",
                            left: window.innerWidth <= 576 ? "10px" : "200px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(0, 0, 0, 0.5)", // Match the image's button style
                            color: "white",
                            border: "none",
                            padding: "10px",
                            cursor: "pointer",
                            borderRadius: "50%",
                            fontSize: "20px",
                          }}
                        >
                          ◄
                        </button>

                        {/* Next Button */}
                        <button
                          onClick={handleNextImage}
                          style={{
                            position: "absolute",
                            right: window.innerWidth <= 576 ? "10px" : "200px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(0, 0, 0, 0.5)", // Match the image's button style
                            color: "white",
                            border: "none",
                            padding: "10px",
                            cursor: "pointer",
                            borderRadius: "50%",
                            fontSize: "20px",
                          }}
                        >
                          ►
                        </button>

                        {/* Image Counter */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: "20px",
                            background: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "15px",
                            fontSize: "16px",
                            zIndex: 10000,
                          }}
                        >
                          {`${
                            itemData?.galleryImages.indexOf(selectedImage) + 1
                          } of ${itemData?.galleryImages.length} photos`}
                        </div>

                        {/* Message Modal */}
                        {showModal && (
                          <>
                            <div
                              className={`modal fade ${
                                showModal ? "show d-block" : "d-none"
                              }`}
                              tabIndex="-1"
                              role="dialog"
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                zIndex: 10001,
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100vw",
                                height: "100vh",
                              }}
                            >
                              <div
                                className="modal-dialog modal-dialog-centered"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title">
                                      Send Message
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={() => setShowModal(false)}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <div className="p-4 w-full max-w-lg mx-auto">
                                      {userId && recieverId ? (
                                        <Mesagedeals
                                          userId={userId}
                                          recieverId={recieverId}
                                          fullWidth={true} // :point_left: Add this prop
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
                            <div
                              className="modal-backdrop fade show"
                              onClick={() => setShowModal(false)}
                              style={{ zIndex: 10000 }}
                            ></div>
                          </>
                        )}
                      </div>
                    )}

                    <div
                      className="multiplesimage-wrapper"
                      style={{
                        gap: "10px",
                        marginTop: "0rem",
                        // flexWrap: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      <SwiperSlider images={images} />
                      {/* {images.length > 0 ? (
                        <div style={{ maxWidth: "100%", margin: "0 auto" }}>
                          {" "}
                      
                          <Slider {...settings}>
                            {images.map((image, index) => (
                              <div
                                key={index}
                                onClick={() => handleImageSelect(image)}
                                style={{
                                  padding: "5px", // Add some padding around each slide item
                                  outline: "none", // Remove focus outline
                                }}
                              >
                                <img
                                  src={image}
                                  alt={`Car ${index + 1}`}
                                  style={{
                                    width:
                                      window.innerWidth <= 480
                                        ? "110px"
                                        : "110px%",

                                    // "95%", // Occupy most of the slide width
                                    height: "100px", // Fixed height for thumbnails
                                    objectFit: "cover", // Crop to cover the area
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    border:
                                      selectedImage === image
                                        ? "2px solid blue"
                                        : "2px solid transparent", // Use transparent border for consistency
                                    transition: "border 0.2s ease-in-out", // Smooth border transition
                                  }}
                                />
                              </div>
                            ))}
                          </Slider>
                        </div>
                      ) : (
                        <p>No images to display.</p>
                      )} */}
                    </div>
                  </div>

                  <div
                    className="border-none info_wrapper "
                    style={{ marginLeft: window.innerWidth <= 576 ? 5 : 10 }}
                  >
                    <div className="col">
                      <div className="table-responsive info_table">
                        <div className="product_Detail_main">
                          <ul className="product_Detail_inner">
                            {Object.entries({
                              SellerType: itemData?.SellerType || "N/A",
                              Insurance: itemData?.Insurance || "N/A",
                              City: itemData?.City || "N/A",
                              SeatingCapacity:
                                itemData?.SeatingCapacity || "N/A",
                              FeaturedAds: itemData?.FeaturedAds || "N/A",
                              "Body Type": itemData?.BodyType || "N/A",
                              "Last Updated": itemData?.timeAgo || "N/A",
                              Condition: itemData?.Condition || "N/A",
                              District: itemData?.District || "N/A",
                              Purpose: itemData?.Purpose || "N/A",
                              Model: itemData?.Model || "N/A",
                              Color: itemData?.Color || "N/A",
                              RegionalSpec: itemData?.RegionalSpec || "N/A",
                              Transmission: itemData?.Transmission || "N/A",
                            })
                              .filter(([_, value]) => value)
                              .map(([label, value], index) => (
                                <li
                                  key={index}
                                  className="product_Detail_block"
                                >
                                  <span className="detail_text">{label}:</span>
                                  <span className="detail_text">{value}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>

                      <div className="dynamic-route-container">
                        {/* Features Section */}
                        <div className="section">
                          <h1 className="section-title">Features</h1>
                          <ul className="descriptions-wrapper">
                            {itemData?.AdditionalFeatures?.length > 0 ? (
                              itemData.AdditionalFeatures.map(
                                (feature, index) => (
                                  <li key={index} className="feature-item">
                                    {feature}
                                  </li>
                                )
                              )
                            ) : (
                              <li className="no-data">N/A</li>
                            )}
                          </ul>
                        </div>

                        {/* Description Section */}
                        <div className="section m-0">
                          <h1 className="section-title section-title-description">
                            Description
                          </h1>
                          <p className="descriptions-para">
                            {itemData?.description?.trim() || "No description"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : callingFrom === "JobBoard" ? (
                <>
                  <div
                  // style={{ marginLeft: window.innerWidth <= 576 ? 5 : 10 }}
                  >
                    {/* Main Image with Previous & Next Buttons */}
                    <div
                      style={{
                        position: "relative",
                        textAlign: "center",
                      }}
                    >
                      {/* <div
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
                          itemData?.galleryImages.indexOf(selectedImage) + 1 ||
                          1
                        } of ${itemData?.galleryImages.length} photos`}
                      </div> */}
                    </div>

                    {isFullScreen && (
                      <div
                        style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          width: "100vw",
                          height: "100vh",
                          background: "rgba(0, 0, 0, 0.9)",
                          zIndex: 9999,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          margin: 0,
                          padding: 0,
                          overflow: "hidden",
                        }}
                      >
                        {/* Header Section with Title, Price, and Buttons */}
                        <div
                          style={{
                            position: "absolute",
                            top: "20px",
                            width: "100%",
                            padding: "0 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            zIndex: 10000,
                          }}
                        >
                          {/* Left Side: Title, Price, and Images Link */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft:
                                window.innerWidth <= 576 ? "0px" : "270px",
                              alignItems: "flex-start",
                            }}
                          >
                            <h2
                              style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: "white",
                                margin: 0,
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              {itemData?.title || "آلة غسيل أطباق"}
                            </h2>
                            <p
                              style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "white",
                                margin: "5px 0",
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              ${itemData?.Price || "N/A"}
                            </p>
                          </div>

                          {/* Right Side: Call, WhatsApp, Message Buttons */}
                          <div className="d-flex align-items-center gap-2">
                            {/* Call, WhatsApp, Message Buttons */}
                            <div
                              className="d-flex align-items-center gap-2 head2btflex"
                              style={{
                                marginRight:
                                  window.innerWidth <= 576 ? "0px" : "270px",
                                marginTop:
                                  window.innerWidth <= 576 ? "70px" : "0px",
                              }}
                            >
                              {itemData.showNumberChecked ? (
                                ""
                              ) : (
                                <a
                                  disabled={itemData.showNumberChecked}
                                  href={`tel:${itemData.Phone}`}
                                >
                                  <button
                                    disabled={itemData.showNumberChecked}
                                    className={`blue_btn list_btn ${
                                      showPhone ? "expanded" : ""
                                    }`}
                                    onClick={() => setShowPhone(true)}
                                  >
                                    <FaPhoneAlt />
                                    <span>
                                      {showPhone ? itemData.Phone : "Call Now"}
                                    </span>
                                  </button>
                                </a>
                              )}{" "}
                              <a
                                href={`https://wa.me/${itemData.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <button
                                  className={`blue_btn list_btn ${
                                    showPhone ? "icon-only" : ""
                                  }`}
                                >
                                  <FaWhatsapp />
                                  <span className="button-text">WhatsApp</span>
                                </button>
                              </a>
                              <button
                                className={`blue_btn list_btn ${
                                  showPhone ? "icon-only" : ""
                                }`}
                                onClick={() => setShowModal(true)}
                              >
                                <MdMessage />
                                <span className="button-text">Message</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Full-Screen Image */}
                        {selectedImage && (
                          <div
                            style={{
                              textAlign: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <img
                              src={selectedImage}
                              alt="Full Screen"
                              style={{
                                width: "100%", // Use 100% width of its container
                                maxWidth: "800px", // Max width to control size on larger screens
                                height: "auto", // Maintain aspect ratio
                                maxHeight: "80vh", // Max height to ensure it fits the viewport
                                objectFit: "contain",
                                marginTop: "20px", // Adjust margin as needed
                                borderRadius: "8px", // Slightly rounded corners
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Subtle shadow
                              }}
                            />
                          </div>
                        )}

                        {/* Close Button */}
                        <button
                          onClick={handleCloseFullScreen}
                          aria-label="Close full-screen image"
                          style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            background: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                            cursor: "pointer",
                            fontSize: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 10001, // Above other elements
                          }}
                        >
                          X
                        </button>

                        {/* Previous Button */}
                        <button
                          onClick={handlePrevImage}
                          style={{
                            position: "absolute",
                            left: window.innerWidth <= 576 ? "10px" : "200px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(0, 0, 0, 0.5)", // Match the image's button style
                            color: "white",
                            border: "none",
                            padding: "10px",
                            cursor: "pointer",
                            borderRadius: "50%",
                            fontSize: "20px",
                          }}
                        >
                          ◄
                        </button>

                        {/* Next Button */}
                        <button
                          onClick={handleNextImage}
                          style={{
                            position: "absolute",
                            right: window.innerWidth <= 576 ? "10px" : "200px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(0, 0, 0, 0.5)", // Match the image's button style
                            color: "white",
                            border: "none",
                            padding: "10px",
                            cursor: "pointer",
                            borderRadius: "50%",
                            fontSize: "20px",
                          }}
                        >
                          ►
                        </button>

                        {/* Image Counter */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: "20px",
                            background: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "15px",
                            fontSize: "16px",
                            zIndex: 10000,
                          }}
                        >
                          {`${
                            itemData?.galleryImages.indexOf(selectedImage) + 1
                          } of ${itemData?.galleryImages.length} photos`}
                        </div>

                        {/* Message Modal */}
                        {showModal && (
                          <>
                            <div
                              className={`modal fade ${
                                showModal ? "show d-block" : "d-none"
                              }`}
                              tabIndex="-1"
                              role="dialog"
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                zIndex: 10001,
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100vw",
                                height: "100vh",
                              }}
                            >
                              <div
                                className="modal-dialog modal-dialog-centered"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title">
                                      Send Message
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={() => setShowModal(false)}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <div className="p-4 w-full max-w-lg mx-auto">
                                      {userId && recieverId ? (
                                        <Mesagedeals
                                          userId={userId}
                                          recieverId={recieverId}
                                          fullWidth={true} // :point_left: Add this prop
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
                            <div
                              className="modal-backdrop fade show"
                              onClick={() => setShowModal(false)}
                              style={{ zIndex: 10000 }}
                            ></div>
                          </>
                        )}
                      </div>
                    )}

                    <div
                      className="multiplesimage-wrapper"
                      style={{
                        gap: "10px",
                        marginTop: "0rem",
                        // flexWrap: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      <SwiperSlider images={images} />
                      {/* {images.length > 0 ? (
                        <div style={{ maxWidth: "100%", margin: "0 auto" }}>
                          {" "}
                      
                          <Slider {...settings}>
                            {images.map((image, index) => (
                              <div
                                key={index}
                                onClick={() => handleImageSelect(image)}
                                style={{
                                  padding: "5px", // Add some padding around each slide item
                                  outline: "none", // Remove focus outline
                                }}
                              >
                                <img
                                  src={image}
                                  alt={`Car ${index + 1}`}
                                  style={{
                                    width:
                                      window.innerWidth <= 480
                                        ? "110px"
                                        : "110px%",

                                    // "95%", // Occupy most of the slide width
                                    height: "100px", // Fixed height for thumbnails
                                    objectFit: "cover", // Crop to cover the area
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    border:
                                      selectedImage === image
                                        ? "2px solid blue"
                                        : "2px solid transparent", // Use transparent border for consistency
                                    transition: "border 0.2s ease-in-out", // Smooth border transition
                                  }}
                                />
                              </div>
                            ))}
                          </Slider>
                        </div>
                      ) : (
                        <p>No images to display.</p>
                      )} */}
                    </div>
                  </div>

                  <div
                    className="border-none info_wrapper "
                    style={{ marginLeft: window.innerWidth <= 576 ? 5 : 10 }}
                  >
                    <div className="col">
                      <div className="table-responsive info_table">
                        <div className="product_Detail_main">
                          <ul className="product_Detail_inner">
                            {Object.entries({
                              SellerType: itemData?.SellerType || "N/A",
                              Insurance: itemData?.Insurance || "N/A",
                              City: itemData?.City || "N/A",
                              SeatingCapacity:
                                itemData?.SeatingCapacity || "N/A",
                              FeaturedAds: itemData?.FeaturedAds || "N/A",
                              "Body Type": itemData?.BodyType || "N/A",
                              "Last Updated": itemData?.timeAgo || "N/A",
                              Condition: itemData?.Condition || "N/A",
                              District: itemData?.District || "N/A",
                              Purpose: itemData?.Purpose || "N/A",
                              Model: itemData?.Model || "N/A",
                              Color: itemData?.Color || "N/A",
                              RegionalSpec: itemData?.RegionalSpec || "N/A",
                              Transmission: itemData?.Transmission || "N/A",
                            })
                              .filter(([_, value]) => value)
                              .map(([label, value], index) => (
                                <li
                                  key={index}
                                  className="product_Detail_block"
                                >
                                  <span className="detail_text">{label}:</span>
                                  <span className="detail_text">{value}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>

                      <div className="dynamic-route-container">
                        {/* Features Section */}
                        <div className="section">
                          <h1 className="section-title">Features</h1>
                          <ul className="descriptions-wrapper">
                            {itemData?.AdditionalFeatures?.length > 0 ? (
                              itemData.AdditionalFeatures.map(
                                (feature, index) => (
                                  <li key={index} className="feature-item">
                                    {feature}
                                  </li>
                                )
                              )
                            ) : (
                              <li className="no-data">N/A</li>
                            )}
                          </ul>
                        </div>

                        {/* Description Section */}
                        <div className="section m-0">
                          <h1 className="section-title section-title-description">
                            Description
                          </h1>
                          <p className="descriptions-para">
                            {itemData?.description?.trim() || "No description"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : callingFrom === "Education" ? (
                <>
                  <div
                  // style={{ marginLeft: window.innerWidth <= 576 ? 5 : 10 }}
                  >
                    {/* Main Image with Previous & Next Buttons */}
                    <div
                      style={{
                        position: "relative",
                        textAlign: "center",
                      }}
                    >
                      {/* <div
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
                          itemData?.galleryImages.indexOf(selectedImage) + 1 ||
                          1
                        } of ${itemData?.galleryImages.length} photos`}
                      </div> */}
                    </div>

                    {isFullScreen && (
                      <div
                        style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          width: "100vw",
                          height: "100vh",
                          background: "rgba(0, 0, 0, 0.9)",
                          zIndex: 9999,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          margin: 0,
                          padding: 0,
                          overflow: "hidden",
                        }}
                      >
                        {/* Header Section with Title, Price, and Buttons */}
                        <div
                          style={{
                            position: "absolute",
                            top: "20px",
                            width: "100%",
                            padding: "0 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            zIndex: 10000,
                          }}
                        >
                          {/* Left Side: Title, Price, and Images Link */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft:
                                window.innerWidth <= 576 ? "0px" : "270px",
                              alignItems: "flex-start",
                            }}
                          >
                            <h2
                              style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: "white",
                                margin: 0,
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              {itemData?.title || "آلة غسيل أطباق"}
                            </h2>
                            <p
                              style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "white",
                                margin: "5px 0",
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              ${itemData?.Price || "N/A"}
                            </p>
                          </div>

                          {/* Right Side: Call, WhatsApp, Message Buttons */}
                          <div className="d-flex align-items-center gap-2">
                            {/* Call, WhatsApp, Message Buttons */}
                            <div
                              className="d-flex align-items-center gap-2 head2btflex"
                              style={{
                                marginRight:
                                  window.innerWidth <= 576 ? "0px" : "270px",
                                marginTop:
                                  window.innerWidth <= 576 ? "70px" : "0px",
                              }}
                            >
                              {itemData.showNumberChecked ? (
                                ""
                              ) : (
                                <a
                                  disabled={itemData.showNumberChecked}
                                  href={`tel:${itemData.Phone}`}
                                >
                                  <button
                                    disabled={itemData.showNumberChecked}
                                    className={`blue_btn list_btn ${
                                      showPhone ? "expanded" : ""
                                    }`}
                                    onClick={() => setShowPhone(true)}
                                  >
                                    <FaPhoneAlt />
                                    <span>
                                      {showPhone ? itemData.Phone : "Call Now"}
                                    </span>
                                  </button>
                                </a>
                              )}{" "}
                              <a
                                href={`https://wa.me/${itemData.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <button
                                  className={`blue_btn list_btn ${
                                    showPhone ? "icon-only" : ""
                                  }`}
                                >
                                  <FaWhatsapp />
                                  <span className="button-text">WhatsApp</span>
                                </button>
                              </a>
                              <button
                                className={`blue_btn list_btn ${
                                  showPhone ? "icon-only" : ""
                                }`}
                                onClick={() => setShowModal(true)}
                              >
                                <MdMessage />
                                <span className="button-text">Message</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Full-Screen Image */}
                        {selectedImage && (
                          <div
                            style={{
                              textAlign: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <img
                              src={selectedImage}
                              alt="Full Screen"
                              style={{
                                width: "100%", // Use 100% width of its container
                                maxWidth: "800px", // Max width to control size on larger screens
                                height: "auto", // Maintain aspect ratio
                                maxHeight: "80vh", // Max height to ensure it fits the viewport
                                objectFit: "contain",
                                marginTop: "20px", // Adjust margin as needed
                                borderRadius: "8px", // Slightly rounded corners
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Subtle shadow
                              }}
                            />
                          </div>
                        )}

                        {/* Close Button */}
                        <button
                          onClick={handleCloseFullScreen}
                          aria-label="Close full-screen image"
                          style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            background: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                            cursor: "pointer",
                            fontSize: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 10001, // Above other elements
                          }}
                        >
                          X
                        </button>

                        {/* Previous Button */}
                        <button
                          onClick={handlePrevImage}
                          style={{
                            position: "absolute",
                            left: window.innerWidth <= 576 ? "10px" : "200px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(0, 0, 0, 0.5)", // Match the image's button style
                            color: "white",
                            border: "none",
                            padding: "10px",
                            cursor: "pointer",
                            borderRadius: "50%",
                            fontSize: "20px",
                          }}
                        >
                          ◄
                        </button>

                        {/* Next Button */}
                        <button
                          onClick={handleNextImage}
                          style={{
                            position: "absolute",
                            right: window.innerWidth <= 576 ? "10px" : "200px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(0, 0, 0, 0.5)", // Match the image's button style
                            color: "white",
                            border: "none",
                            padding: "10px",
                            cursor: "pointer",
                            borderRadius: "50%",
                            fontSize: "20px",
                          }}
                        >
                          ►
                        </button>

                        {/* Image Counter */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: "20px",
                            background: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "15px",
                            fontSize: "16px",
                            zIndex: 10000,
                          }}
                        >
                          {`${
                            itemData?.galleryImages.indexOf(selectedImage) + 1
                          } of ${itemData?.galleryImages.length} photos`}
                        </div>

                        {/* Message Modal */}
                        {showModal && (
                          <>
                            <div
                              className={`modal fade ${
                                showModal ? "show d-block" : "d-none"
                              }`}
                              tabIndex="-1"
                              role="dialog"
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                zIndex: 10001,
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100vw",
                                height: "100vh",
                              }}
                            >
                              <div
                                className="modal-dialog modal-dialog-centered"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title">
                                      Send Message
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={() => setShowModal(false)}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <div className="p-4 w-full max-w-lg mx-auto">
                                      {userId && recieverId ? (
                                        <Mesagedeals
                                          userId={userId}
                                          recieverId={recieverId}
                                          fullWidth={true} // :point_left: Add this prop
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
                            <div
                              className="modal-backdrop fade show"
                              onClick={() => setShowModal(false)}
                              style={{ zIndex: 10000 }}
                            ></div>
                          </>
                        )}
                      </div>
                    )}

                    <div
                      className="multiplesimage-wrapper"
                      style={{
                        gap: "10px",
                        marginTop: "0rem",
                        // flexWrap: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      <SwiperSlider images={images} />
                      {/* {images.length > 0 ? (
                        <div style={{ maxWidth: "100%", margin: "0 auto" }}>
                          {" "}
                      
                          <Slider {...settings}>
                            {images.map((image, index) => (
                              <div
                                key={index}
                                onClick={() => handleImageSelect(image)}
                                style={{
                                  padding: "5px", // Add some padding around each slide item
                                  outline: "none", // Remove focus outline
                                }}
                              >
                                <img
                                  src={image}
                                  alt={`Car ${index + 1}`}
                                  style={{
                                    width:
                                      window.innerWidth <= 480
                                        ? "110px"
                                        : "110px%",

                                    // "95%", // Occupy most of the slide width
                                    height: "100px", // Fixed height for thumbnails
                                    objectFit: "cover", // Crop to cover the area
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    border:
                                      selectedImage === image
                                        ? "2px solid blue"
                                        : "2px solid transparent", // Use transparent border for consistency
                                    transition: "border 0.2s ease-in-out", // Smooth border transition
                                  }}
                                />
                              </div>
                            ))}
                          </Slider>
                        </div>
                      ) : (
                        <p>No images to display.</p>
                      )} */}
                    </div>
                  </div>

                  <div
                    className="border-none info_wrapper "
                    style={{ marginLeft: window.innerWidth <= 576 ? 5 : 10 }}
                  >
                    <div className="col">
                      <div className="table-responsive info_table">
                        <div className="product_Detail_inner">
                          <ul className="info_body">
                            {Object.entries({
                              SellerType: itemData?.SellerType || "N/A",
                              Insurance: itemData?.Insurance || "N/A",
                              City: itemData?.City || "N/A",
                              SeatingCapacity:
                                itemData?.SeatingCapacity || "N/A",
                              FeaturedAds: itemData?.FeaturedAds || "N/A",
                              "Body Type": itemData?.BodyType || "N/A",
                              "Last Updated": itemData?.timeAgo || "N/A",
                              Condition: itemData?.Condition || "N/A",
                              District: itemData?.District || "N/A",
                              Purpose: itemData?.Purpose || "N/A",
                              Model: itemData?.Model || "N/A",
                              Color: itemData?.Color || "N/A",
                              RegionalSpec: itemData?.RegionalSpec || "N/A",
                              Transmission: itemData?.Transmission || "N/A",
                            })
                              .filter(([_, value]) => value)
                              .map(([label, value], index) => (
                                <li
                                  key={index}
                                  className="product_Detail_block"
                                >
                                  <span className="detail_text">{label}:</span>
                                  <span className="detail_text">{value}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>

                      <div className="dynamic-route-container">
                        {/* Features Section */}
                        <div className="section">
                          <h1 className="section-title">Features</h1>
                          <ul className="descriptions-wrapper">
                            {itemData?.AdditionalFeatures?.length > 0 ? (
                              itemData.AdditionalFeatures.map(
                                (feature, index) => (
                                  <li key={index} className="feature-item">
                                    {feature}
                                  </li>
                                )
                              )
                            ) : (
                              <li className="no-data">N/A</li>
                            )}
                          </ul>
                        </div>

                        {/* Description Section */}
                        <div className="section m-0">
                          <h1 className="section-title section-title-description">
                            Description
                          </h1>
                          <p className="descriptions-para">
                            {itemData?.description?.trim() || "No description"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : callingFrom === "RealEstateComp" ? (
                <>
                  <div
                  // style={{ marginLeft: window.innerWidth <= 576 ? 5 : 10 }}
                  >
                    {/* Main Image with Previous & Next Buttons */}
                    <div
                      style={{
                        position: "relative",
                        textAlign: "center",
                      }}
                    >
                      {/* <div
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
                          itemData?.galleryImages.indexOf(selectedImage) + 1 ||
                          1
                        } of ${itemData?.galleryImages.length} photos`}
                      </div> */}
                    </div>

                    {isFullScreen && (
                      <div
                        style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          width: "100vw",
                          height: "100vh",
                          background: "rgba(0, 0, 0, 0.9)",
                          zIndex: 9999,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          margin: 0,
                          padding: 0,
                          overflow: "hidden",
                        }}
                      >
                        {/* Header Section with Title, Price, and Buttons */}
                        <div
                          style={{
                            position: "absolute",
                            top: "20px",
                            width: "100%",
                            padding: "0 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            zIndex: 10000,
                          }}
                        >
                          {/* Left Side: Title, Price, and Images Link */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft:
                                window.innerWidth <= 576 ? "0px" : "270px",
                              alignItems: "flex-start",
                            }}
                          >
                            <h2
                              style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: "white",
                                margin: 0,
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              {itemData?.title || "آلة غسيل أطباق"}
                            </h2>
                            <p
                              style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "white",
                                margin: "5px 0",
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              ${itemData?.Price || "N/A"}
                            </p>
                          </div>

                          {/* Right Side: Call, WhatsApp, Message Buttons */}
                          <div className="d-flex align-items-center gap-2">
                            {/* Call, WhatsApp, Message Buttons */}
                            <div
                              className="d-flex align-items-center gap-2 head2btflex"
                              style={{
                                marginRight:
                                  window.innerWidth <= 576 ? "0px" : "270px",
                                marginTop:
                                  window.innerWidth <= 576 ? "70px" : "0px",
                              }}
                            >
                              {itemData.showNumberChecked ? (
                                ""
                              ) : (
                                <a
                                  disabled={itemData.showNumberChecked}
                                  href={`tel:${itemData.Phone}`}
                                >
                                  <button
                                    disabled={itemData.showNumberChecked}
                                    className={`blue_btn list_btn ${
                                      showPhone ? "expanded" : ""
                                    }`}
                                    onClick={() => setShowPhone(true)}
                                  >
                                    <FaPhoneAlt />
                                    <span>
                                      {showPhone ? itemData.Phone : "Call Now"}
                                    </span>
                                  </button>
                                </a>
                              )}{" "}
                              <a
                                href={`https://wa.me/${itemData.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <button
                                  className={`blue_btn list_btn ${
                                    showPhone ? "icon-only" : ""
                                  }`}
                                >
                                  <FaWhatsapp />
                                  <span className="button-text">WhatsApp</span>
                                </button>
                              </a>
                              <button
                                className={`blue_btn list_btn ${
                                  showPhone ? "icon-only" : ""
                                }`}
                                onClick={() => setShowModal(true)}
                              >
                                <MdMessage />
                                <span className="button-text">Message</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Full-Screen Image */}
                        {selectedImage && (
                          <div
                            style={{
                              textAlign: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <img
                              src={selectedImage}
                              alt="Full Screen"
                              style={{
                                width: "100%", // Use 100% width of its container
                                maxWidth: "800px", // Max width to control size on larger screens
                                height: "auto", // Maintain aspect ratio
                                maxHeight: "80vh", // Max height to ensure it fits the viewport
                                objectFit: "contain",
                                marginTop: "20px", // Adjust margin as needed
                                borderRadius: "8px", // Slightly rounded corners
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Subtle shadow
                              }}
                            />
                          </div>
                        )}

                        {/* Close Button */}
                        <button
                          onClick={handleCloseFullScreen}
                          aria-label="Close full-screen image"
                          style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            background: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                            cursor: "pointer",
                            fontSize: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 10001, // Above other elements
                          }}
                        >
                          X
                        </button>

                        {/* Previous Button */}
                        <button
                          onClick={handlePrevImage}
                          style={{
                            position: "absolute",
                            left: window.innerWidth <= 576 ? "10px" : "200px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(0, 0, 0, 0.5)", // Match the image's button style
                            color: "white",
                            border: "none",
                            padding: "10px",
                            cursor: "pointer",
                            borderRadius: "50%",
                            fontSize: "20px",
                          }}
                        >
                          ◄
                        </button>

                        {/* Next Button */}
                        <button
                          onClick={handleNextImage}
                          style={{
                            position: "absolute",
                            right: window.innerWidth <= 576 ? "10px" : "200px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(0, 0, 0, 0.5)", // Match the image's button style
                            color: "white",
                            border: "none",
                            padding: "10px",
                            cursor: "pointer",
                            borderRadius: "50%",
                            fontSize: "20px",
                          }}
                        >
                          ►
                        </button>

                        {/* Image Counter */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: "20px",
                            background: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "15px",
                            fontSize: "16px",
                            zIndex: 10000,
                          }}
                        >
                          {`${
                            itemData?.galleryImages.indexOf(selectedImage) + 1
                          } of ${itemData?.galleryImages.length} photos`}
                        </div>

                        {/* Message Modal */}
                        {showModal && (
                          <>
                            <div
                              className={`modal fade ${
                                showModal ? "show d-block" : "d-none"
                              }`}
                              tabIndex="-1"
                              role="dialog"
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                zIndex: 10001,
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100vw",
                                height: "100vh",
                              }}
                            >
                              <div
                                className="modal-dialog modal-dialog-centered"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title">
                                      Send Message
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={() => setShowModal(false)}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <div className="p-4 w-full max-w-lg mx-auto">
                                      {userId && recieverId ? (
                                        <Mesagedeals
                                          userId={userId}
                                          recieverId={recieverId}
                                          fullWidth={true} // :point_left: Add this prop
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
                            <div
                              className="modal-backdrop fade show"
                              onClick={() => setShowModal(false)}
                              style={{ zIndex: 10000 }}
                            ></div>
                          </>
                        )}
                      </div>
                    )}

                    <div
                      className="multiplesimage-wrapper"
                      style={{
                        gap: "10px",
                        marginTop: "0rem",
                        // flexWrap: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      <SwiperSlider images={images} />
                      {/* {images.length > 0 ? (
                        <div style={{ maxWidth: "100%", margin: "0 auto" }}>
                          {" "}
                      
                          <Slider {...settings}>
                            {images.map((image, index) => (
                              <div
                                key={index}
                                onClick={() => handleImageSelect(image)}
                                style={{
                                  padding: "5px", // Add some padding around each slide item
                                  outline: "none", // Remove focus outline
                                }}
                              >
                                <img
                                  src={image}
                                  alt={`Car ${index + 1}`}
                                  style={{
                                    width:
                                      window.innerWidth <= 480
                                        ? "110px"
                                        : "110px%",

                                    // "95%", // Occupy most of the slide width
                                    height: "100px", // Fixed height for thumbnails
                                    objectFit: "cover", // Crop to cover the area
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    border:
                                      selectedImage === image
                                        ? "2px solid blue"
                                        : "2px solid transparent", // Use transparent border for consistency
                                    transition: "border 0.2s ease-in-out", // Smooth border transition
                                  }}
                                />
                              </div>
                            ))}
                          </Slider>
                        </div>
                      ) : (
                        <p>No images to display.</p>
                      )} */}
                    </div>
                  </div>

                  <div
                    className="border-none info_wrapper "
                    style={{ marginLeft: window.innerWidth <= 576 ? 5 : 10 }}
                  >
                    <div className="col">
                      <div className="table-responsive info_table">
                        <div className="product_Detail_inner">
                          <ul className="info_body">
                            {Object.entries({
                              SellerType: itemData?.SellerType || "N/A",
                              Insurance: itemData?.Insurance || "N/A",
                              City: itemData?.City || "N/A",
                              SeatingCapacity:
                                itemData?.SeatingCapacity || "N/A",
                              FeaturedAds: itemData?.FeaturedAds || "N/A",
                              "Body Type": itemData?.BodyType || "N/A",
                              "Last Updated": itemData?.timeAgo || "N/A",
                              Condition: itemData?.Condition || "N/A",
                              District: itemData?.District || "N/A",
                              Purpose: itemData?.Purpose || "N/A",
                              Model: itemData?.Model || "N/A",
                              Color: itemData?.Color || "N/A",
                              RegionalSpec: itemData?.RegionalSpec || "N/A",
                              Transmission: itemData?.Transmission || "N/A",
                            })
                              .filter(([_, value]) => value)
                              .map(([label, value], index) => (
                                <li
                                  key={index}
                                  className="product_Detail_block"
                                >
                                  <span className="detail_text">{label}:</span>
                                  <span className="detail_text">{value}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>

                      <div className="dynamic-route-container">
                        {/* Features Section */}
                        <div className="section">
                          <h1 className="section-title">Features</h1>
                          <ul className="descriptions-wrapper">
                            {itemData?.AdditionalFeatures?.length > 0 ? (
                              itemData.AdditionalFeatures.map(
                                (feature, index) => (
                                  <li key={index} className="feature-item">
                                    {feature}
                                  </li>
                                )
                              )
                            ) : (
                              <li className="no-data">N/A</li>
                            )}
                          </ul>
                        </div>

                        {/* Description Section */}
                        <div className="section m-0">
                          <h1 className="section-title section-title-description">
                            Description
                          </h1>
                          <p className="descriptions-para">
                            {itemData?.description?.trim() || "No description"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : callingFrom === "TravelComp" ? (
                <>
                  <div
                  // style={{ marginLeft: window.innerWidth <= 576 ? 5 : 10 }}
                  >
                    {/* Main Image with Previous & Next Buttons */}
                    <div
                      style={{
                        position: "relative",
                        textAlign: "center",
                      }}
                    >
                      {/* <div
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
                          itemData?.galleryImages.indexOf(selectedImage) + 1 ||
                          1
                        } of ${itemData?.galleryImages.length} photos`}
                      </div> */}
                    </div>

                    {isFullScreen && (
                      <div
                        style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          width: "100vw",
                          height: "100vh",
                          background: "rgba(0, 0, 0, 0.9)",
                          zIndex: 9999,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          margin: 0,
                          padding: 0,
                          overflow: "hidden",
                        }}
                      >
                        {/* Header Section with Title, Price, and Buttons */}
                        <div
                          style={{
                            position: "absolute",
                            top: "20px",
                            width: "100%",
                            padding: "0 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            zIndex: 10000,
                          }}
                        >
                          {/* Left Side: Title, Price, and Images Link */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft:
                                window.innerWidth <= 576 ? "0px" : "270px",
                              alignItems: "flex-start",
                            }}
                          >
                            <h2
                              style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: "white",
                                margin: 0,
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              {itemData?.title || "آلة غسيل أطباق"}
                            </h2>
                            <p
                              style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "white",
                                margin: "5px 0",
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              ${itemData?.Price || "N/A"}
                            </p>
                          </div>

                          {/* Right Side: Call, WhatsApp, Message Buttons */}
                          <div className="d-flex align-items-center gap-2">
                            {/* Call, WhatsApp, Message Buttons */}
                            <div
                              className="d-flex align-items-center gap-2 head2btflex"
                              style={{
                                marginRight:
                                  window.innerWidth <= 576 ? "0px" : "270px",
                                marginTop:
                                  window.innerWidth <= 576 ? "70px" : "0px",
                              }}
                            >
                              {itemData.showNumberChecked ? (
                                ""
                              ) : (
                                <a
                                  disabled={itemData.showNumberChecked}
                                  href={`tel:${itemData.Phone}`}
                                >
                                  <button
                                    disabled={itemData.showNumberChecked}
                                    className={`blue_btn list_btn ${
                                      showPhone ? "expanded" : ""
                                    }`}
                                    onClick={() => setShowPhone(true)}
                                  >
                                    <FaPhoneAlt />
                                    <span>
                                      {showPhone ? itemData.Phone : "Call Now"}
                                    </span>
                                  </button>
                                </a>
                              )}{" "}
                              <a
                                href={`https://wa.me/${itemData.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <button
                                  className={`blue_btn list_btn ${
                                    showPhone ? "icon-only" : ""
                                  }`}
                                >
                                  <FaWhatsapp />
                                  <span className="button-text">WhatsApp</span>
                                </button>
                              </a>
                              <button
                                className={`blue_btn list_btn ${
                                  showPhone ? "icon-only" : ""
                                }`}
                                onClick={() => setShowModal(true)}
                              >
                                <MdMessage />
                                <span className="button-text">Message</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Full-Screen Image */}
                        {selectedImage && (
                          <div
                            style={{
                              textAlign: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <img
                              src={selectedImage}
                              alt="Full Screen"
                              style={{
                                width: "100%", // Use 100% width of its container
                                maxWidth: "800px", // Max width to control size on larger screens
                                height: "auto", // Maintain aspect ratio
                                maxHeight: "80vh", // Max height to ensure it fits the viewport
                                objectFit: "contain",
                                marginTop: "20px", // Adjust margin as needed
                                borderRadius: "8px", // Slightly rounded corners
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Subtle shadow
                              }}
                            />
                          </div>
                        )}

                        {/* Close Button */}
                        <button
                          onClick={handleCloseFullScreen}
                          aria-label="Close full-screen image"
                          style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            background: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                            cursor: "pointer",
                            fontSize: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 10001, // Above other elements
                          }}
                        >
                          X
                        </button>

                        {/* Previous Button */}
                        <button
                          onClick={handlePrevImage}
                          style={{
                            position: "absolute",
                            left: window.innerWidth <= 576 ? "10px" : "200px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(0, 0, 0, 0.5)", // Match the image's button style
                            color: "white",
                            border: "none",
                            padding: "10px",
                            cursor: "pointer",
                            borderRadius: "50%",
                            fontSize: "20px",
                          }}
                        >
                          ◄
                        </button>

                        {/* Next Button */}
                        <button
                          onClick={handleNextImage}
                          style={{
                            position: "absolute",
                            right: window.innerWidth <= 576 ? "10px" : "200px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(0, 0, 0, 0.5)", // Match the image's button style
                            color: "white",
                            border: "none",
                            padding: "10px",
                            cursor: "pointer",
                            borderRadius: "50%",
                            fontSize: "20px",
                          }}
                        >
                          ►
                        </button>

                        {/* Image Counter */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: "20px",
                            background: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "15px",
                            fontSize: "16px",
                            zIndex: 10000,
                          }}
                        >
                          {`${
                            itemData?.galleryImages.indexOf(selectedImage) + 1
                          } of ${itemData?.galleryImages.length} photos`}
                        </div>

                        {/* Message Modal */}
                        {showModal && (
                          <>
                            <div
                              className={`modal fade ${
                                showModal ? "show d-block" : "d-none"
                              }`}
                              tabIndex="-1"
                              role="dialog"
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                zIndex: 10001,
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100vw",
                                height: "100vh",
                              }}
                            >
                              <div
                                className="modal-dialog modal-dialog-centered"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title">
                                      Send Message
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={() => setShowModal(false)}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <div className="p-4 w-full max-w-lg mx-auto">
                                      {userId && recieverId ? (
                                        <Mesagedeals
                                          userId={userId}
                                          recieverId={recieverId}
                                          fullWidth={true} // :point_left: Add this prop
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
                            <div
                              className="modal-backdrop fade show"
                              onClick={() => setShowModal(false)}
                              style={{ zIndex: 10000 }}
                            ></div>
                          </>
                        )}
                      </div>
                    )}

                    <div
                      className="multiplesimage-wrapper"
                      style={{
                        gap: "10px",
                        marginTop: "0rem",
                        // flexWrap: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      <SwiperSlider images={images} />
                      {/* {images.length > 0 ? (
                        <div style={{ maxWidth: "100%", margin: "0 auto" }}>
                          {" "}
                      
                          <Slider {...settings}>
                            {images.map((image, index) => (
                              <div
                                key={index}
                                onClick={() => handleImageSelect(image)}
                                style={{
                                  padding: "5px", // Add some padding around each slide item
                                  outline: "none", // Remove focus outline
                                }}
                              >
                                <img
                                  src={image}
                                  alt={`Car ${index + 1}`}
                                  style={{
                                    width:
                                      window.innerWidth <= 480
                                        ? "110px"
                                        : "110px%",

                                    // "95%", // Occupy most of the slide width
                                    height: "100px", // Fixed height for thumbnails
                                    objectFit: "cover", // Crop to cover the area
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    border:
                                      selectedImage === image
                                        ? "2px solid blue"
                                        : "2px solid transparent", // Use transparent border for consistency
                                    transition: "border 0.2s ease-in-out", // Smooth border transition
                                  }}
                                />
                              </div>
                            ))}
                          </Slider>
                        </div>
                      ) : (
                        <p>No images to display.</p>
                      )} */}
                    </div>
                  </div>

                  <div
                    className="border-none info_wrapper "
                    style={{ marginLeft: window.innerWidth <= 576 ? 5 : 10 }}
                  >
                    <div className="col">
                      <div className="table-responsive info_table">
                        <div className="product_Detail_main">
                          <ul className="product_Detail_inner">
                            {Object.entries({
                              SellerType: itemData?.SellerType || "N/A",
                              Insurance: itemData?.Insurance || "N/A",
                              City: itemData?.City || "N/A",
                              SeatingCapacity:
                                itemData?.SeatingCapacity || "N/A",
                              FeaturedAds: itemData?.FeaturedAds || "N/A",
                              "Body Type": itemData?.BodyType || "N/A",
                              "Last Updated": itemData?.timeAgo || "N/A",
                              Condition: itemData?.Condition || "N/A",
                              District: itemData?.District || "N/A",
                              Purpose: itemData?.Purpose || "N/A",
                              Model: itemData?.Model || "N/A",
                              Color: itemData?.Color || "N/A",
                              RegionalSpec: itemData?.RegionalSpec || "N/A",
                              Transmission: itemData?.Transmission || "N/A",
                            })
                              .filter(([_, value]) => value)
                              .map(([label, value], index) => (
                                <li
                                  key={index}
                                  className="product_Detail_block"
                                >
                                  <span className="detail_text">{label}:</span>
                                  <span className="detail_text">{value}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>

                      <div className="dynamic-route-container">
                        {/* Features Section */}
                        <div className="section">
                          <h1 className="section-title">Features</h1>
                          <ul className="descriptions-wrapper">
                            {itemData?.AdditionalFeatures?.length > 0 ? (
                              itemData.AdditionalFeatures.map(
                                (feature, index) => (
                                  <li key={index} className="feature-item">
                                    {feature}
                                  </li>
                                )
                              )
                            ) : (
                              <li className="no-data">N/A</li>
                            )}
                          </ul>
                        </div>

                        {/* Description Section */}
                        <div className="section m-0">
                          <h1 className="section-title section-title-description">
                            Description
                          </h1>
                          <p className="descriptions-para">
                            {itemData?.description?.trim() || "No description"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : callingFrom === "SportGamesComp" ? (
                <>
                  <div
                  // style={{ marginLeft: window.innerWidth <= 576 ? 5 : 10 }}
                  >
                    {/* Main Image with Previous & Next Buttons */}
                    <div
                      style={{
                        position: "relative",
                        textAlign: "center",
                      }}
                    >
                      {/* <div
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
                          itemData?.galleryImages.indexOf(selectedImage) + 1 ||
                          1
                        } of ${itemData?.galleryImages.length} photos`}
                      </div> */}
                    </div>

                    {isFullScreen && (
                      <div
                        style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          width: "100vw",
                          height: "100vh",
                          background: "rgba(0, 0, 0, 0.9)",
                          zIndex: 9999,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          margin: 0,
                          padding: 0,
                          overflow: "hidden",
                        }}
                      >
                        {/* Header Section with Title, Price, and Buttons */}
                        <div
                          style={{
                            position: "absolute",
                            top: "20px",
                            width: "100%",
                            padding: "0 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            zIndex: 10000,
                          }}
                        >
                          {/* Left Side: Title, Price, and Images Link */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft:
                                window.innerWidth <= 576 ? "0px" : "270px",
                              alignItems: "flex-start",
                            }}
                          >
                            <h2
                              style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: "white",
                                margin: 0,
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              {itemData?.title || "آلة غسيل أطباق"}
                            </h2>
                            <p
                              style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "white",
                                margin: "5px 0",
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              ${itemData?.Price || "N/A"}
                            </p>
                          </div>

                          {/* Right Side: Call, WhatsApp, Message Buttons */}
                          <div className="d-flex align-items-center gap-2">
                            {/* Call, WhatsApp, Message Buttons */}
                            <div
                              className="d-flex align-items-center gap-2 head2btflex"
                              style={{
                                marginRight:
                                  window.innerWidth <= 576 ? "0px" : "270px",
                                marginTop:
                                  window.innerWidth <= 576 ? "70px" : "0px",
                              }}
                            >
                              {itemData.showNumberChecked ? (
                                ""
                              ) : (
                                <a
                                  disabled={itemData.showNumberChecked}
                                  href={`tel:${itemData.Phone}`}
                                >
                                  <button
                                    disabled={itemData.showNumberChecked}
                                    className={`blue_btn list_btn ${
                                      showPhone ? "expanded" : ""
                                    }`}
                                    onClick={() => setShowPhone(true)}
                                  >
                                    <FaPhoneAlt />
                                    <span>
                                      {showPhone ? itemData.Phone : "Call Now"}
                                    </span>
                                  </button>
                                </a>
                              )}{" "}
                              <a
                                href={`https://wa.me/${itemData.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <button
                                  className={`blue_btn list_btn ${
                                    showPhone ? "icon-only" : ""
                                  }`}
                                >
                                  <FaWhatsapp />
                                  <span className="button-text">WhatsApp</span>
                                </button>
                              </a>
                              <button
                                className={`blue_btn list_btn ${
                                  showPhone ? "icon-only" : ""
                                }`}
                                onClick={() => setShowModal(true)}
                              >
                                <MdMessage />
                                <span className="button-text">Message</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Full-Screen Image */}
                        {selectedImage && (
                          <div
                            style={{
                              textAlign: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <img
                              src={selectedImage}
                              alt="Full Screen"
                              style={{
                                width: "100%", // Use 100% width of its container
                                maxWidth: "800px", // Max width to control size on larger screens
                                height: "auto", // Maintain aspect ratio
                                maxHeight: "80vh", // Max height to ensure it fits the viewport
                                objectFit: "contain",
                                marginTop: "20px", // Adjust margin as needed
                                borderRadius: "8px", // Slightly rounded corners
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Subtle shadow
                              }}
                            />
                          </div>
                        )}

                        {/* Close Button */}
                        <button
                          onClick={handleCloseFullScreen}
                          aria-label="Close full-screen image"
                          style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            background: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                            cursor: "pointer",
                            fontSize: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 10001, // Above other elements
                          }}
                        >
                          X
                        </button>

                        {/* Previous Button */}
                        <button
                          onClick={handlePrevImage}
                          style={{
                            position: "absolute",
                            left: window.innerWidth <= 576 ? "10px" : "200px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(0, 0, 0, 0.5)", // Match the image's button style
                            color: "white",
                            border: "none",
                            padding: "10px",
                            cursor: "pointer",
                            borderRadius: "50%",
                            fontSize: "20px",
                          }}
                        >
                          ◄
                        </button>

                        {/* Next Button */}
                        <button
                          onClick={handleNextImage}
                          style={{
                            position: "absolute",
                            right: window.innerWidth <= 576 ? "10px" : "200px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(0, 0, 0, 0.5)", // Match the image's button style
                            color: "white",
                            border: "none",
                            padding: "10px",
                            cursor: "pointer",
                            borderRadius: "50%",
                            fontSize: "20px",
                          }}
                        >
                          ►
                        </button>

                        {/* Image Counter */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: "20px",
                            background: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "15px",
                            fontSize: "16px",
                            zIndex: 10000,
                          }}
                        >
                          {`${
                            itemData?.galleryImages.indexOf(selectedImage) + 1
                          } of ${itemData?.galleryImages.length} photos`}
                        </div>

                        {/* Message Modal */}
                        {showModal && (
                          <>
                            <div
                              className={`modal fade ${
                                showModal ? "show d-block" : "d-none"
                              }`}
                              tabIndex="-1"
                              role="dialog"
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                zIndex: 10001,
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100vw",
                                height: "100vh",
                              }}
                            >
                              <div
                                className="modal-dialog modal-dialog-centered"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title">
                                      Send Message
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={() => setShowModal(false)}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <div className="p-4 w-full max-w-lg mx-auto">
                                      {userId && recieverId ? (
                                        <Mesagedeals
                                          userId={userId}
                                          recieverId={recieverId}
                                          fullWidth={true} // :point_left: Add this prop
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
                            <div
                              className="modal-backdrop fade show"
                              onClick={() => setShowModal(false)}
                              style={{ zIndex: 10000 }}
                            ></div>
                          </>
                        )}
                      </div>
                    )}

                    <div
                      className="multiplesimage-wrapper"
                      style={{
                        gap: "10px",
                        marginTop: "0rem",
                        // flexWrap: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      <SwiperSlider images={images} />
                      {/* {images.length > 0 ? (
                        <div style={{ maxWidth: "100%", margin: "0 auto" }}>
                          {" "}
                      
                          <Slider {...settings}>
                            {images.map((image, index) => (
                              <div
                                key={index}
                                onClick={() => handleImageSelect(image)}
                                style={{
                                  padding: "5px", // Add some padding around each slide item
                                  outline: "none", // Remove focus outline
                                }}
                              >
                                <img
                                  src={image}
                                  alt={`Car ${index + 1}`}
                                  style={{
                                    width:
                                      window.innerWidth <= 480
                                        ? "110px"
                                        : "110px%",

                                    // "95%", // Occupy most of the slide width
                                    height: "100px", // Fixed height for thumbnails
                                    objectFit: "cover", // Crop to cover the area
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    border:
                                      selectedImage === image
                                        ? "2px solid blue"
                                        : "2px solid transparent", // Use transparent border for consistency
                                    transition: "border 0.2s ease-in-out", // Smooth border transition
                                  }}
                                />
                              </div>
                            ))}
                          </Slider>
                        </div>
                      ) : (
                        <p>No images to display.</p>
                      )} */}
                    </div>
                  </div>

                  <div
                    className="border-none info_wrapper "
                    style={{ marginLeft: window.innerWidth <= 576 ? 5 : 10 }}
                  >
                    <div className="col">
                      <div className="table-responsive info_table">
                        <div className="product_Detail_inner">
                          <ul className="info_body">
                            {Object.entries({
                              SellerType: itemData?.SellerType || "N/A",
                              Insurance: itemData?.Insurance || "N/A",
                              City: itemData?.City || "N/A",
                              SeatingCapacity:
                                itemData?.SeatingCapacity || "N/A",
                              FeaturedAds: itemData?.FeaturedAds || "N/A",
                              "Body Type": itemData?.BodyType || "N/A",
                              "Last Updated": itemData?.timeAgo || "N/A",
                              Condition: itemData?.Condition || "N/A",
                              District: itemData?.District || "N/A",
                              Purpose: itemData?.Purpose || "N/A",
                              Model: itemData?.Model || "N/A",
                              Color: itemData?.Color || "N/A",
                              RegionalSpec: itemData?.RegionalSpec || "N/A",
                              Transmission: itemData?.Transmission || "N/A",
                            })
                              .filter(([_, value]) => value)
                              .map(([label, value], index) => (
                                <li
                                  key={index}
                                  className="product_Detail_block"
                                >
                                  <span className="detail_text">{label}:</span>
                                  <span className="detail_text">{value}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>

                      <div className="dynamic-route-container">
                        {/* Features Section */}
                        <div className="section">
                          <h1 className="section-title">Features</h1>
                          <ul className="descriptions-wrapper">
                            {itemData?.AdditionalFeatures?.length > 0 ? (
                              itemData.AdditionalFeatures.map(
                                (feature, index) => (
                                  <li key={index} className="feature-item">
                                    {feature}
                                  </li>
                                )
                              )
                            ) : (
                              <li className="no-data">N/A</li>
                            )}
                          </ul>
                        </div>

                        {/* Description Section */}
                        <div className="section m-0">
                          <h1 className="section-title section-title-description">
                            Description
                          </h1>
                          <p className="descriptions-para">
                            {itemData?.description?.trim() || "No description"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : callingFrom === "PetAnimalsComp" ? (
                <>
                  <div
                  // style={{ marginLeft: window.innerWidth <= 576 ? 5 : 10 }}
                  >
                    {/* Main Image with Previous & Next Buttons */}
                    <div
                      style={{
                        position: "relative",
                        textAlign: "center",
                      }}
                    >
                      {/* <div
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
                          itemData?.galleryImages.indexOf(selectedImage) + 1 ||
                          1
                        } of ${itemData?.galleryImages.length} photos`}
                      </div> */}
                    </div>

                    {isFullScreen && (
                      <div
                        style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          width: "100vw",
                          height: "100vh",
                          background: "rgba(0, 0, 0, 0.9)",
                          zIndex: 9999,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          margin: 0,
                          padding: 0,
                          overflow: "hidden",
                        }}
                      >
                        {/* Header Section with Title, Price, and Buttons */}
                        <div
                          style={{
                            position: "absolute",
                            top: "20px",
                            width: "100%",
                            padding: "0 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            zIndex: 10000,
                          }}
                        >
                          {/* Left Side: Title, Price, and Images Link */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft:
                                window.innerWidth <= 576 ? "0px" : "270px",
                              alignItems: "flex-start",
                            }}
                          >
                            <h2
                              style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: "white",
                                margin: 0,
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              {itemData?.title || "آلة غسيل أطباق"}
                            </h2>
                            <p
                              style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "white",
                                margin: "5px 0",
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              ${itemData?.Price || "N/A"}
                            </p>
                          </div>

                          {/* Right Side: Call, WhatsApp, Message Buttons */}
                          <div className="d-flex align-items-center gap-2">
                            {/* Call, WhatsApp, Message Buttons */}
                            <div
                              className="d-flex align-items-center gap-2 head2btflex"
                              style={{
                                marginRight:
                                  window.innerWidth <= 576 ? "0px" : "270px",
                                marginTop:
                                  window.innerWidth <= 576 ? "70px" : "0px",
                              }}
                            >
                              {itemData.showNumberChecked ? (
                                ""
                              ) : (
                                <a
                                  disabled={itemData.showNumberChecked}
                                  href={`tel:${itemData.Phone}`}
                                >
                                  <button
                                    disabled={itemData.showNumberChecked}
                                    className={`blue_btn list_btn ${
                                      showPhone ? "expanded" : ""
                                    }`}
                                    onClick={() => setShowPhone(true)}
                                  >
                                    <FaPhoneAlt />
                                    <span>
                                      {showPhone ? itemData.Phone : "Call Now"}
                                    </span>
                                  </button>
                                </a>
                              )}{" "}
                              <a
                                href={`https://wa.me/${itemData.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <button
                                  className={`blue_btn list_btn ${
                                    showPhone ? "icon-only" : ""
                                  }`}
                                >
                                  <FaWhatsapp />
                                  <span className="button-text">WhatsApp</span>
                                </button>
                              </a>
                              <button
                                className={`blue_btn list_btn ${
                                  showPhone ? "icon-only" : ""
                                }`}
                                onClick={() => setShowModal(true)}
                              >
                                <MdMessage />
                                <span className="button-text">Message</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Full-Screen Image */}
                        {selectedImage && (
                          <div
                            style={{
                              textAlign: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <img
                              src={selectedImage}
                              alt="Full Screen"
                              style={{
                                width: "100%", // Use 100% width of its container
                                maxWidth: "800px", // Max width to control size on larger screens
                                height: "auto", // Maintain aspect ratio
                                maxHeight: "80vh", // Max height to ensure it fits the viewport
                                objectFit: "contain",
                                marginTop: "20px", // Adjust margin as needed
                                borderRadius: "8px", // Slightly rounded corners
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Subtle shadow
                              }}
                            />
                          </div>
                        )}

                        {/* Close Button */}
                        <button
                          onClick={handleCloseFullScreen}
                          aria-label="Close full-screen image"
                          style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            background: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                            cursor: "pointer",
                            fontSize: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 10001, // Above other elements
                          }}
                        >
                          X
                        </button>

                        {/* Previous Button */}
                        <button
                          onClick={handlePrevImage}
                          style={{
                            position: "absolute",
                            left: window.innerWidth <= 576 ? "10px" : "200px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(0, 0, 0, 0.5)", // Match the image's button style
                            color: "white",
                            border: "none",
                            padding: "10px",
                            cursor: "pointer",
                            borderRadius: "50%",
                            fontSize: "20px",
                          }}
                        >
                          ◄
                        </button>

                        {/* Next Button */}
                        <button
                          onClick={handleNextImage}
                          style={{
                            position: "absolute",
                            right: window.innerWidth <= 576 ? "10px" : "200px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(0, 0, 0, 0.5)", // Match the image's button style
                            color: "white",
                            border: "none",
                            padding: "10px",
                            cursor: "pointer",
                            borderRadius: "50%",
                            fontSize: "20px",
                          }}
                        >
                          ►
                        </button>

                        {/* Image Counter */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: "20px",
                            background: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "15px",
                            fontSize: "16px",
                            zIndex: 10000,
                          }}
                        >
                          {`${
                            itemData?.galleryImages.indexOf(selectedImage) + 1
                          } of ${itemData?.galleryImages.length} photos`}
                        </div>

                        {/* Message Modal */}
                        {showModal && (
                          <>
                            <div
                              className={`modal fade ${
                                showModal ? "show d-block" : "d-none"
                              }`}
                              tabIndex="-1"
                              role="dialog"
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                zIndex: 10001,
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100vw",
                                height: "100vh",
                              }}
                            >
                              <div
                                className="modal-dialog modal-dialog-centered"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title">
                                      Send Message
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={() => setShowModal(false)}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <div className="p-4 w-full max-w-lg mx-auto">
                                      {userId && recieverId ? (
                                        <Mesagedeals
                                          userId={userId}
                                          recieverId={recieverId}
                                          fullWidth={true} // :point_left: Add this prop
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
                            <div
                              className="modal-backdrop fade show"
                              onClick={() => setShowModal(false)}
                              style={{ zIndex: 10000 }}
                            ></div>
                          </>
                        )}
                      </div>
                    )}

                    <div
                      className="multiplesimage-wrapper"
                      style={{
                        gap: "10px",
                        marginTop: "0rem",
                        // flexWrap: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      <SwiperSlider images={images} />
                      {/* {images.length > 0 ? (
                        <div style={{ maxWidth: "100%", margin: "0 auto" }}>
                          {" "}
                      
                          <Slider {...settings}>
                            {images.map((image, index) => (
                              <div
                                key={index}
                                onClick={() => handleImageSelect(image)}
                                style={{
                                  padding: "5px", // Add some padding around each slide item
                                  outline: "none", // Remove focus outline
                                }}
                              >
                                <img
                                  src={image}
                                  alt={`Car ${index + 1}`}
                                  style={{
                                    width:
                                      window.innerWidth <= 480
                                        ? "110px"
                                        : "110px%",

                                    // "95%", // Occupy most of the slide width
                                    height: "100px", // Fixed height for thumbnails
                                    objectFit: "cover", // Crop to cover the area
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    border:
                                      selectedImage === image
                                        ? "2px solid blue"
                                        : "2px solid transparent", // Use transparent border for consistency
                                    transition: "border 0.2s ease-in-out", // Smooth border transition
                                  }}
                                />
                              </div>
                            ))}
                          </Slider>
                        </div>
                      ) : (
                        <p>No images to display.</p>
                      )} */}
                    </div>
                  </div>

                  <div
                    className="border-none info_wrapper "
                    style={{ marginLeft: window.innerWidth <= 576 ? 5 : 10 }}
                  >
                    <div className="col">
                      <div className="table-responsive info_table">
                        <div className="product_Detail_main">
                          <ul className="product_Detail_inner">
                            {Object.entries({
                              SellerType: itemData?.SellerType || "N/A",
                              Insurance: itemData?.Insurance || "N/A",
                              City: itemData?.City || "N/A",
                              SeatingCapacity:
                                itemData?.SeatingCapacity || "N/A",
                              FeaturedAds: itemData?.FeaturedAds || "N/A",
                              "Body Type": itemData?.BodyType || "N/A",
                              "Last Updated": itemData?.timeAgo || "N/A",
                              Condition: itemData?.Condition || "N/A",
                              District: itemData?.District || "N/A",
                              Purpose: itemData?.Purpose || "N/A",
                              Model: itemData?.Model || "N/A",
                              Color: itemData?.Color || "N/A",
                              RegionalSpec: itemData?.RegionalSpec || "N/A",
                              Transmission: itemData?.Transmission || "N/A",
                            })
                              .filter(([_, value]) => value)
                              .map(([label, value], index) => (
                                <li
                                  key={index}
                                  className="product_Detail_block"
                                >
                                  <span className="detail_text">{label}:</span>
                                  <span className="detail_text">{value}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>

                      <div className="dynamic-route-container">
                        {/* Features Section */}
                        <div className="section">
                          <h1 className="section-title">Features</h1>
                          <ul className="descriptions-wrapper">
                            {itemData?.AdditionalFeatures?.length > 0 ? (
                              itemData.AdditionalFeatures.map(
                                (feature, index) => (
                                  <li key={index} className="feature-item">
                                    {feature}
                                  </li>
                                )
                              )
                            ) : (
                              <li className="no-data">N/A</li>
                            )}
                          </ul>
                        </div>

                        {/* Description Section */}
                        <div className="section m-0">
                          <h1 className="section-title section-title-description">
                            Description
                          </h1>
                          <p className="descriptions-para">
                            {itemData?.description?.trim() || "No description"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}

              {/* <div
                className="adsCategory_head"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  marginLeft: window.innerWidth <= 576 ? "0px" : "10px",
                  marginBottom: "30px",
                  alignItems: "center",
                }}
              >
                <RatingAndReviews
                  currentAdId={_Id}
                  listingUserId={itemData?.userId}
                />
              </div> */}
            </Col>
            <Col xl={4}>
              <Col xs={12}>
                <Card
                  style={{
                    position: "relative",
                    minHeight: "100px",
                    borderRadius: "12px",
                    width: window.innerWidth <= 576 ? "100%" : "100%",
                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {/* Card body to hold the price and heart button */}
                  <Card.Body
                    className="p-0"
                    style={{
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "60px",
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "#2d4495",
                        marginBottom: 20,
                      }}
                    >
                      SAR {itemData?.Price || "N/A"}
                    </div>
                    <h5>Safety Tips</h5>
                    <ul
                      style={{
                        listStyleImage: `url(${bullet})`,
                        marginLeft: "1.1rem",
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

                    <div className="col-md">
                      <h1 className="sallerinfo_para">Seller Information</h1>
                      <div className="row profileinner_container ">
                        <div className="col-4 profileimg">
                          <Link
                            to={`/Userinfo?id=${itemData.userId}&callingFrom=${callingFrom}`}
                          >
                            <img
                              src={
                                itemData.photoURL ||
                                "/blank-profile-picture.webp"
                              }
                              alt="Profile"
                              className="img-fluid rounded-circle"
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                              }} // Adjust size as needed
                            />
                          </Link>
                        </div>
                        <div className="col-8 profile_rightbarTags">
                          <p className="sallerInfo_para">
                            {itemData.displayName}
                          </p>
                          <p className="sallerInfo_para">
                            {itemData.creationTime}
                          </p>
                          <p className="s allerInfo_para">
                            <Link
                              to={`/Userinfo?id=${itemData.userId}&callingFrom=${callingFrom}`}
                            >
                              View all Ads
                            </Link>
                          </p>
                        </div>

                        <div className="col-12 mt-3 innerContainer2">
                          <div className="d-flex align-items-center gap-2 innerContainer2 head2btflex card_btn_wrap">
                            {itemData.showNumberChecked ? (
                              ""
                            ) : (
                              <a
                                disabled={itemData.showNumberChecked}
                                href={`tel:${itemData.Phone}`}
                              >
                                <button
                                  disabled={itemData.showNumberChecked}
                                  className={`blue_btn list_btn ${
                                    showPhone ? "expanded" : ""
                                  }`}
                                  onClick={() => setShowPhone(true)}
                                >
                                  <FaPhoneAlt />
                                  <span>
                                    {showPhone ? itemData.Phone : "Call Now"}
                                  </span>
                                </button>
                              </a>
                            )}{" "}
                            <a
                              href={`https://wa.me/${itemData.whatsapp}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button
                                className={`blue_btn list_btn ${
                                  showPhone ? "icon-only" : ""
                                }`}
                              >
                                <FaWhatsapp />
                                <span className="button-text">WhatsApp</span>
                              </button>
                            </a>
                            <button
                              className={`blue_btn list_btn ${
                                showPhone ? "icon-only" : ""
                              }`}
                              onClick={() => setShowModal(true)}
                            >
                              <MdMessage />
                              <span className="button-text">Message</span>
                            </button>
                            <style jsx>{`
                              .blue_btn list_btn {
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

                              .blue_btn list_btn:hover {
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
                                    <h5 className="modal-title">
                                      Send Message
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={() => setShowModal(false)}
                                    ></button>
                                  </div>
                                  {userId && recieverId ? (
                                    <Mesagedeals
                                      productIds={itemData.id}
                                      userId={userId}
                                      recieverId={recieverId}
                                      fullWidth={true} // :point_left: Add this prop
                                    />
                                  ) : (
                                    <div className="flex items-center justify-center h-40 bg-gray-100 rounded-md">
                                      <p className="text-lg font-semibold text-gray-600">
                                        Please log in to start messaging.
                                      </p>
                                    </div>
                                  )}
                                  {/* <div className="modal-body">
                                    <div className="p-4 w-full max-w-lg mx-auto">
                                 
                                    </div>
                                  </div> */}
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

                    <h4 className="mt-2 mb-2">Location </h4>
                    <button className="location_btn ">{itemData.City} </button>
                  </Card.Body>
                </Card>
                <Card
                  style={{
                    position: "relative",
                    minHeight: "100px",
                    borderRadius: "12px",
                    width: window.innerWidth <= 576 ? "100%" : "100%",
                    marginTop: 18,
                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <Card.Body
                    className="p-0"
                    style={{
                      position: "relative",
                      // marginTop: -40,
                      // marginLeft: -20,
                    }}
                  >
                    <div className="d-flex flex-column gap-3 ms-0">
                      {adsDetailImagesContent.length > 0 &&
                        adsDetailImagesContent[0].imageUrls.map(
                          (imageUrl, index) => {
                            const link =
                              adsDetailImagesContent[0].links[index]?.trim(); // remove any extra spaces
                            return (
                              <a
                                key={index}
                                href={link || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: "none" }}
                              >
                                <img
                                  src={imageUrl}
                                  alt={`Image ${index + 1}`}
                                  className="rounded shadow"
                                  style={{
                                    width:
                                      window.innerWidth <= 576
                                        ? "100%"
                                        : "100%",
                                    height: "300px",
                                    objectFit: "cover",
                                    cursor: "pointer",
                                  }}
                                />
                              </a>
                            );
                          }
                        )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Col>
          </Row>
          <Relateddata itemData={itemData} />

          {/* <SuggestedAds callingFrom={callingFrom} currentAdId={_Id} /> */}
        </Container>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Dynamic_Route;
