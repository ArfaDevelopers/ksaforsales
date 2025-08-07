import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
import Header from "../../home/header";
import Footer from "../../home/footer/Footer";
import StickyBox from "react-sticky-box";
import { Modal, Button, Form } from "react-bootstrap";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { auth } from "../../Firebase/FirebaseConfig";
import Chat from "../../../components/admin/dyanmic_route/upperHeader/Chat";
import Loading1 from "../../../../public/Progress circle.png";

import {
  ProfileAvatar10,
  ProfileAvatar12,
  galleryicon,
  details_icon,
  statistic_icon,
  website,
} from "../../imagepath";
import Rooms from "./myComponent2";
import Roomspics from "./myComponent3";
import { Link } from "react-router-dom";
import RatingAndReviews from "../../../components/admin/RatingSection/RatingSection";

const ServiceDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [itemData, setItemData] = useState(null);
  console.log(itemData, "itemData______________");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal1, setShowModal1] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [showReportModal, setShowReportModal] = useState(false);
  const [successShow, setSuccessShow] = useState(false);
  const [reportText, setReportText] = useState("");
  const [selectedReports, setSelectedReports] = useState([]);
  const [showPhone, setShowPhone] = useState(false);
  const user = auth.currentUser;
  const userId = user?.uid;
  const recieverId = itemData?.userId;

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
  const [reportTypes] = useState([
    "Sexual",
    "Illegal",
    "Abusive",
    "Harassment",
    "Fraud",
    "Spam",
  ]);

  // Category mapping aligned with MyListe
  const categoryMapping = {
    "Job board": "JOBBOARD",
    Education: "Education",
    Travel: "TRAVEL",
    Pet: "PETANIMALCOMP",

    Automotive: "Cars",
    Sports: "SPORTSGAMESComp",
    Electronics: "ELECTRONICS",
    "Fashion Style": "FASHION",
    "Job Board": "JOBBOARD",
    "Real Estate": "REALESTATECOMP",
    Other: "Education",
    Services: "TRAVEL",
    "Pet & Animal": "PETANIMALCOMP",
    Home: "HEALTHCARE",
  };

  // Reverse mapping for formatted category to Firestore collection
  const reverseCategoryMapping = Object.keys(categoryMapping).reduce(
    (acc, key) => {
      const formattedKey = key
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
      acc[formattedKey] = categoryMapping[key];
      return acc;
    },
    {}
  );

  // Fetch item data
  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      setError("");

      try {
        const callingFrom = getQueryParam("callingFrom");
        const itemId = getQueryParam("id") || id;

        if (!itemId || !callingFrom) {
          setError("Missing ID or category.");
          setLoading(false);
          return;
        }

        // Map formatted category to Firestore collection
        const collectionName = reverseCategoryMapping[callingFrom];
        if (!collectionName) {
          setError("Invalid category.");
          setLoading(false);
          return;
        }

        // Fetch document
        const docRef = doc(db, collectionName, itemId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // Filter out empty, null, or undefined fields
          const filteredData = Object.fromEntries(
            Object.entries(data).filter(
              ([_, value]) =>
                value !== "" && value !== null && value !== undefined
            )
          );
          setItemData(filteredData);
        } else {
          setError("No item found with this ID.");
        }
      } catch (err) {
        console.error("Error fetching item:", err);
        setError("Failed to load item details.");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, location.search]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Handle report submission

  const handleSubmitReport = async () => {
    const callingFrom = getQueryParam("callingFrom");
    const itemId = getQueryParam("id") || id;
    const collectionName = reverseCategoryMapping[callingFrom];

    try {
      const docRef = doc(db, collectionName, itemId);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const existingData = docSnapshot.data();
        const updatedReportTypes = existingData.reportTypes
          ? [...existingData.reportTypes, ...selectedReports]
          : selectedReports;

        await updateDoc(docRef, { reportTypes: updatedReportTypes });
        setShowReportModal(false);
        setSuccessShow(true);
      } else {
        setError("Document does not exist.");
      }
    } catch (error) {
      console.error("Error updating document:", error);
      setError("Failed to submit report.");
    }
  };

  // Add this state at the top of your component with other states
  const [copyCount, setCopyCount] = useState(0);
  console.log("copyCount___________", copyCount);
  // Modify your existing copyToClipboard function

  const copyToClipboard = () => {
    const link = getQueryParam("link") || window.location.href;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        // Increment copy count only after successful copy
        setCopyCount((prevCount) => prevCount + 1);
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
        alert("Failed to copy link!");
      });
  };
  // // Copy link to clipboard
  // const copyToClipboard = () => {
  //   const link = getQueryParam("link") || window.location.href;
  //   navigator.clipboard.writeText(link);
  //   alert("Link copied to clipboard!");
  // };

  // Format timestamp
  const formatValue = (value) => {
    if (value && typeof value === "object" && value.seconds) {
      return new Date(value.seconds * 1000).toLocaleString();
    }
    return value || "N/A";
  };

  // Handle loading and error states
  if (loading) {
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

  if (error) {
    return (
      <>
        <Header />
        <div className="container my-5">
          <h4 className="text-danger">{error}</h4>
        </div>
        <Footer />
      </>
    );
  }

  if (!itemData) {
    return (
      <>
        <Header />
        <div className="container my-5">
          <h4>No item found.</h4>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      {/* Gallery Slider Section */}
      {/* <div className="bannergallery-section container-fluid">
        <div className="gallery-slider d-flex container" style={{marginTop:'150px'}}>
          <Rooms filteredData={itemData} />
       
        </div>
      </div> */}

      {/* Details Description Section */}
      <section
        className="details-description"
        style={{ marginTop: window.innerWidth <= 576 ? "130px" : "200px" }}
      >
        <div className="container">
          <div className="about-details">
            <div className="about-headings">
              <div className="author-img">
                <img src={itemData?.galleryImages[0]} alt="authorimg" />
              </div>
              <div className="authordetails">
                <h5>{itemData.title || "N/A"}</h5>
                <p>{itemData.tagline || "N/A"}</p>
                <div className="rating">
                  <i className="fas fa-star filled" />
                  <i className="fas fa-star filled" />
                  <i className="fas fa-star filled" />
                  <i className="fas fa-star filled" />
                  <i className="fa-regular fa-star rating-color" />
                  <span className="d-inline-block average-rating">4.5</span>
                </div>
              </div>
            </div>
            <div className="rate-details">
              <div
                style={{
                  fontSize: "60px",
                  fontWeight: "bold",
                  marginLeft: window.innerWidth <= 576 ? 0 : 70,
                  color: "#2d4495",
                }}
              >
                ${itemData.Price || "N/A"}
              </div>
              <p>Fixed</p>
            </div>
          </div>
          <div className="descriptionlinks">
            <div
              className="row"
              style={{ marginLeft: window.innerWidth <= 576 ? 0 : 270 }}
            >
              <div className="col-lg-8">
                {/* <ul>
                  <li onClick={() => setShowModal1(true)}>
                    <i className="feather-share-2" style={{ color: "#2d4495" }} />{" "}
                    Share
                  </li>
          
                </ul> */}
              </div>
              <div className="col-lg-4">
                <div className="d-flex align-items-center gap-2  innerContainer2 head2btflex">
                  <a href={`tel:${itemData.Phone}`}>
                    <button
                      className={`sign-in-button ${
                        showPhone ? "expanded" : ""
                      }`}
                      onClick={() => setShowPhone(true)}
                    >
                      <FaPhoneAlt />
                      <span className="fw-semibold">
                        {showPhone ? itemData.Phone : "Call Now"}
                      </span>
                    </button>
                  </a>

                  <a
                    href={`https://wa.me/${itemData.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      className={`sign-in-button ${
                        showPhone ? "icon-only" : ""
                      }`}
                    >
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
                        {/* <div className="modal-body">
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
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                <div style={{ wordBreak: "break-all" }}>
                  {getQueryParam("link") || window.location.href}
                </div>
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
                  className="btn"
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
      )}
      {/* Details Main Section */}
      <div className="details-main-wrapper">
        <div className="container" style={{ marginTop: -60 }}>
          <div className="row">
            <div className="col-lg-9">
              <div className="card">
                <div className="card-header">
                  <h4>Description</h4>
                </div>
                <div className="card-body">
                  <p>{itemData.description || "No description available."}</p>
                </div>
              </div>

              <div className="card gallery-section">
                <div className="card-header">
                  <img
                    src={galleryicon}
                    alt="gallery"
                    style={{
                      filter:
                        "invert(20%) sepia(70%) saturate(1500%) hue-rotate(210deg) brightness(90%) contrast(90%)",
                    }}
                  />
                  <h4>Gallery</h4>
                </div>
                <div className="card-body">
                  <div className="gallery-content">
                    <Roomspics filteredData={itemData} />
                  </div>
                </div>
              </div>
              {/* <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <RatingAndReviews
                  currentAdId={_Id}
                  listingUserId={itemData?.userId}
                />
              </div> */}
            </div>
            <div className="col-lg-3 theiaStickySidebar">
              <StickyBox>
                <div className="rightsidebar">
                  <div className="card">
                    <h4>
                      <img
                        src={details_icon}
                        alt="details-icon"
                        style={{
                          filter:
                            "invert(20%) sepia(70%) saturate(1500%) hue-rotate(210deg) brightness(90%) contrast(90%)",
                        }}
                      />{" "}
                      Details
                    </h4>
                    <ul>
                      {[
                        { label: "City", value: itemData.City },
                        { label: "Closure Type", value: itemData.ClosureType },
                        { label: "Features", value: itemData.Features },
                        { label: "Fit", value: itemData.Fit },
                        { label: "Gender", value: itemData.Gender },
                        { label: "Make", value: itemData.Make },
                        { label: "Material", value: itemData.Material },
                        { label: "Seller Type", value: itemData.SellerType },
                        {
                          label: "Engine Capacity",
                          value: itemData.EngineCapacity,
                        },
                        { label: "Transmission", value: itemData.Transmission },
                        {
                          label: "Seating Capacity",
                          value: itemData.SeatingCapacity,
                        },
                        { label: "Body Type", value: itemData.BodyType },
                        { label: "Purpose", value: itemData.Purpose },
                        { label: "Price From", value: itemData.priceFrom },
                        { label: "Price To", value: itemData.priceTo },
                        {
                          label: "Manufacture Year",
                          value: itemData.ManufactureYear,
                        },
                        { label: "Engine Type", value: itemData.EngineType },
                        { label: "Color", value: itemData.Color },
                        {
                          label: "Video Availability",
                          value: itemData.VideoAvailability,
                        },
                        {
                          label: "Picture Availability",
                          value: itemData.PictureAvailability,
                        },
                        { label: "Location", value: itemData.location },
                      ]
                        .filter(({ value }) => value)
                        .map(({ label, value }) => (
                          <li key={label}>
                            {label} <span>{formatValue(value)}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="card">
                    <h4>
                      <img
                        src={statistic_icon}
                        alt="location"
                        style={{
                          filter:
                            "invert(20%) sepia(70%) saturate(1500%) hue-rotate(210deg) brightness(90%) contrast(90%)",
                        }}
                      />{" "}
                      Statistics
                    </h4>
                    <ul className="statistics-list">
                      <li>
                        <div className="statistic-details">
                          <span className="icons">
                            <i
                              className="fa-regular fa-eye"
                              style={{ color: "#2d4495" }}
                            />
                          </span>
                          Views
                        </div>
                        <span className="text-end">453563</span>
                      </li>
                      <li>
                        <div className="statistic-details">
                          <span className="icons">
                            <i
                              className="feather-star"
                              style={{ color: "#2d4495" }}
                            />
                          </span>
                          Ratings
                        </div>
                        <span className="text-end">153</span>
                      </li>
                      <li>
                        <div className="statistic-details">
                          <span className="icons">
                            <i
                              className="feather-heart"
                              style={{ color: "#2d4495" }}
                            />
                          </span>
                          Favorites
                        </div>
                        <span className="text-end">123</span>
                      </li>
                      <li className="mb-0">
                        <div className="statistic-details">
                          <span className="icons">
                            <i
                              className="feather-share-2"
                              style={{ color: "#2d4495" }}
                            />
                          </span>
                          Shares
                        </div>
                        <span className="text-end">{copyCount}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card">
                    <h4>
                      <i
                        className="feather-user"
                        style={{ color: "#2d4495" }}
                      />{" "}
                      {/* {itemData.title || "N/A"} */}
                      Profile
                    </h4>
                    <div className="sidebarauthor-details align-items-center">
                      <div className="sideauthor-img">
                        <img src={itemData.photoURL} alt="author" />
                      </div>
                      <div className="sideauthor-info">
                        <p className="authorname">
                          {itemData.displayName || "N/A"}
                        </p>
                        <p>{formatValue(itemData.creationTime)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </StickyBox>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ServiceDetails;
