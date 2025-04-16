import React, { useEffect } from "react";
import Header from "../../home/header";
import {
  Feature_1_svg,
  Feature_2_svg,
  Feature_3_svg,
  Feature_4_svg,
  Feature_5_svg,
  Feature_6_svg,
  Feature_7_svg,
  Feature_8_svg,
  GalleryImg1,
  GalleryImg10,
  GalleryImg11,
  GalleryImg2,
  GalleryImg3,
  GalleryImg9,
  ProfileAvatar01,
  ProfileAvatar02,
  ProfileAvatar10,
  ProfileAvatar12,
  avatar_11,
  details_icon,
  gallery_09,
  gallery_10,
  gallery_11,
  gallery_1_jpg,
  gallery_2_jpg,
  gallery_3_jpg,
  gallery_4_jpg,
  gallery_5_jpg,
  gallery_6_jpg,
  gallery_8_jpg,
  galleryicon,
  statistic_icon,
  website,
} from "../../imagepath";
import Footer from "../../home/footer/Footer";
import StickyBox from "react-sticky-box";
import { useState } from "react";
// import Lightbox from "react-awesome-lightbox";
// You need to import the CSS only once
// import "react-awesome-lightbox/build/style.css";
import { Link, useLocation, useParams } from "react-router-dom";
import Rooms from "./myComponent2";
import Roomspics from "./myComponent3";
import RoomsProfile from "./myComponent4";
import PhotoAlbum from "react-photo-album";
import { auth, db } from "../../Firebase/FirebaseConfig";
import {
  getDocs,
  collection,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { Modal, Button, Form } from "react-bootstrap";

const ServiceDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };
  const [_Id, setId] = useState(null); // State to store ads data
  const [callingFrom, setCallingFrom] = useState(null); // State to store ads data
  const [successShow, setSuccessShow] = useState(false);
  const handleSuccessClose = () => setSuccessShow(false);
  useEffect(() => {
    const callingFrom = getQueryParam("callingFrom");
    const ids = getQueryParam("id");

    console.log("callingFrom______ID:ids______________________", ids);
    console.log("callingFrom______Calling From:", callingFrom);
    setCallingFrom(callingFrom);
    setId(ids);
  }, [id, location]);
  const [itemData, setItemData] = useState(null); // State to store ads data
  const [loading, setLoading] = useState(true); // Loading state
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A"; // Handle undefined or null timestamps
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // Format it into a readable string
  };
  const [userData, setUserData] = useState([]);
  const [filteredData, setfilteredData] = useState({});

  const [showModal1, setShowModal1] = useState(false);
  const link = getQueryParam("link") || window.location.href;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [reportText, setReportText] = useState("");
  const [selectedReports, setSelectedReports] = useState([]);
  const handleCheckboxChange = (type) => {
    setSelectedReports((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };
  const [show, setShow] = useState(false);
  const [reportTypes, setReportTypes] = useState([
    "Sexual",
    "Illegal",
    "Abusive",
    "Harassment",
    "Fraud",
    "Spam",
  ]);
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
  const [userId, setUserId] = useState(null);
  console.log(filteredData, "userDataitemData__________itemData");
  const formatValue = (value) => {
    if (typeof value === "object" && value.seconds) {
      return new Date(value.seconds * 1000).toLocaleString(); // Convert timestamp
    }
    return value;
  };
  // const NewId = callingFrom === "automotive" || "RealEstate" ? _Id : id;
  const NewId =
    callingFrom === "automotive"
      ? _Id
      : callingFrom === "RealEstate"
      ? _Id
      : callingFrom === "Education"
      ? _Id
      : callingFrom === "Electronics"
      ? _Id
      : callingFrom === "HealthCare"
      ? _Id
      : callingFrom === "GamesSport"
      ? _Id
      : callingFrom === "ComercialsAds"
      ? _Id
      : id;
  const categoryMapping = {
    "Sports&Game": "SPORTSGAMESComp",
    Electronics: "ELECTRONICS",
    FashionStyle: "FASHION",
    JobBoard: "JobBoard",
    RealEstate: "REALESTATECOMP",
    Education: "Education",
    Travel: "TRAVEL",

    Pet: "PETANIMALCOMP",
    "Health Care": "HEALTHCARE",

    // Add more categories as needed
  };
  const collectionNames =
    callingFrom === "Automotive"
      ? "Cars"
      : callingFrom === "Education"
      ? "Education"
      : callingFrom === "Pet"
      ? "PETANIMALCOMP"
      : callingFrom === "RealEstate"
      ? "REALESTATECOMP"
      : callingFrom === "JobBoard"
      ? "JOBBOARD"
      : callingFrom === "Electronics"
      ? "ELECTRONICS"
      : callingFrom === "FashionStyle"
      ? "FASHION"
      : callingFrom === "HealthCare"
      ? "HEALTHCARE"
      : callingFrom === "GamesSport"
      ? "SPORTSGAMESComp"
      : callingFrom === "ComercialsAds"
      ? "ComercialsAds"
      : "";
  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true); // Start loading
      
    const callingFrom = getQueryParam("callingFrom");
    const ids = getQueryParam("id");
  const collectionNames =

      callingFrom === "Automotive"
      ? "Cars"
      : callingFrom === "Education"
      ? "Education"
      : callingFrom === "Pet"
      ? "PETANIMALCOMP"
      : callingFrom === "RealEstate"
      ? "REALESTATECOMP"
      : callingFrom === "JobBoard"
      ? "JOBBOARD"
      : callingFrom === "Electronics"
      ? "ELECTRONICS"
      : callingFrom === "FashionStyle"
      ? "FASHION"
      : callingFrom === "HealthCare"
      ? "HEALTHCARE"
      : callingFrom === "Sports" || "GamesSport" ||"Sports&Game"
      ? "SPORTSGAMESComp"
      : callingFrom === "ComercialsAds"
      ? "ComercialsAds"
      : "";
      try {
        if (!db) {
          console.error("Firestore instance (db) is undefined");
          setLoading(false);
          return;
        }

        console.log("Collection Name:", collectionNames);
        if (!collectionNames) {
          console.error("collectionNames is undefined");
          setLoading(false);
          return;
        }
        const adsCollection = collection(db, collectionNames);
        const adsSnapshot = await getDocs(adsCollection);
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const ids = getQueryParam("id");

        if (!ids) {
          console.error("NewId is undefined");
          setLoading(false);
          return;
        }
        // const callingFrom = getQueryParam("callingFrom");
        useEffect(() => {
          window.scrollTo(0, 0);
        }, [location]);
        const docRef = doc(db, collectionNames, ids);
        const docSnap = await getDoc(docRef);
        console.log("No document found docSnap___-", docSnap);

        if (docSnap.exists()) {
          console.log("Raw Document Data:", docSnap.data());
          const newdocSnap = docSnap.data();

          // Filter out empty, null, and undefined fields
          const filteredData = Object.fromEntries(
            Object.entries(newdocSnap).filter(
              ([_, value]) =>
                value !== "" && value !== null && value !== undefined
            )
          );

          console.log("Filtered Data:", JSON.stringify(filteredData, null, 2));
          setfilteredData(newdocSnap);
        } else {
          console.log("No document found with this ID.");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching item:", error);
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, callingFrom, db]);
  // Re-run if `id` changes

  const [showFancyBox, setBox] = useState(false);
  let imagess = [
    {
      url: { gallery_1_jpg },
    },
    {
      url: { gallery_2_jpg },
    },
  ];

  const parms = useLocation().pathname;
  return (
    <>
      <Header parms={parms} />
      {/*Galler Slider Section*/}
      <div className="bannergallery-section container-fluid">
        <div className="gallery-slider d-flex container">
          <Rooms filteredData={filteredData} />
          <div className="showphotos">
            <Link
              // to={gallery_3_jpg}
              data-fancybox="gallery1"
              onClick={() => setBox(true)}
            >
              {/* ... Show Photos */}
            </Link>
          </div>
          {showFancyBox && <PhotoAlbum photos={imagess} layout="rows" />}
        </div>
      </div>
      {/*/Galler Slider Section*/}
      {/*Details Description  Section*/}
      <section className="details-description">
        <div className="container">
          <div className="about-details" style={{marginTop:130}}>
            <div className="about-headings">
              <div className="author-img">
                <img src={ProfileAvatar10} alt="authorimg" />
              </div>
              <div className="authordetails">
                <h5>{filteredData?.title}</h5>
                <p>{filteredData?.tagline}</p>
                <div className="rating">
                  <i className="fas fa-star filled" />
                  <i className="fas fa-star filled" />
                  <i className="fas fa-star filled" />
                  <i className="fas fa-star filled" />
                  <i className="fa-regular fa-star rating-color" />
                  <span className="d-inline-block average-rating"> 4.5 </span>
                </div>
              </div>
            </div>
            <div className="rate-details">
            <div
                  style={{
                    fontSize: "60px",
                    fontWeight: "bold",
                    marginLeft: 70,
                    color:"#2d4495"
                  }}
                >
                  ${filteredData?.Price}
                </div>
              <p>Fixed</p>
            </div>
          </div>
          <div className="descriptionlinks">
            <div className="row">
              <div className="col-lg-9">
                <ul>
                  {/* <li>
                    <Link to="#">
                      <i className="feather-map" style={{color:"#2d4495"}} /> Get Directions
                    </Link>
                  </li> */}
                  {/* <li>
                    <Link to="#" >
                      <img src={website} alt="website" style={{ filter: 'invert(20%) sepia(70%) saturate(1500%) hue-rotate(210deg) brightness(90%) contrast(90%)' }} />
                      Website
                    </Link>
                  </li> */}
                  <li onClick={() => setShowModal1(true)}>
                   
                      <i className="feather-share-2"  style={{color:"#2d4495"}} /> share
                   
                    
                  </li>
                  
                  <li>
                    <Link to="#">
                      <i className="fa-regular fa-comment-dots"  style={{color:"#2d4495"}}/> Write a
                      review
                    </Link>
                  </li>
                  <li onClick={handleShow}>
                      <i className="feather-flag"  style={{color:"#2d4495"}}/> report
                  </li>
                  <li>
                    <Link to="#">
                      <i className="feather-heart"  style={{color:"#2d4495"}}/> Save
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3">
                <div className="callnow">
                  <Link to="contact.html" style={{backgroundColor:"#2d4495",color:"white" }}>
                    {" "}
                    <i className="feather-phone-call" /> Call Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*/Details Description  Section*/}

              <Modal 
              style={{marginTop:20}}
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
          
            <Modal
  style={{ marginTop: 20 }}
  show={successShow}
  onHide={handleSuccessClose}
  centered
>
  <Modal.Header closeButton>
    <Modal.Title>Success</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>Your report has been submitted successfully!</p>
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
        cursor: "pointer" // Maintain clickable appearance
      }}
      onClick={handleSuccessClose}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "#2d4495"; // Force same background
        e.currentTarget.style.color = "#fff"; // Force same text color
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "#2d4495"; // Restore same background
        e.currentTarget.style.color = "#fff"; // Restore same text color
      }}
    >
      OK
    </Button>
  </Modal.Footer>
</Modal>
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
      {/*Details Main  Section*/}
      <div className="details-main-wrapper">
        <div className="container" style={{marginTop:-60}}>
          <div className="row">
            <div className="col-lg-9">
              <div className="card ">
                <div className="card-header">
                  <span className="bar-icon">
                    <span />
                    <span />
                    <span />
                  </span>
                  <h4>Description</h4>
                </div>
                <div className="card-body">
                  <p>{filteredData?.description}</p>
                </div>
              </div>
          
              <div className="card gallery-section ">
                <div className="card-header " >
                  <img src={galleryicon} alt="gallery" style={{ filter: 'invert(20%) sepia(70%) saturate(1500%) hue-rotate(210deg) brightness(90%) contrast(90%)' }}/>
                  <h4>Gallery</h4>
                </div>
                <div className="card-body">
                  <div className="gallery-content">
                    <Roomspics filteredData={filteredData} />
                  </div>
                </div>
              </div>
            
              <div className="card ">
                <div className="card-header  align-items-center">
                  <i className="feather-star" style={{color:"#2d4495"}}/>
                  <h4>Ratings</h4>
                </div>
                <div className="card-body">
                  <div className="ratings-content">
                    <div className="row">
                      <div className="col-lg-3">
                        <div className="ratings-info">
                          <p className="ratings-score">
                            <span>4</span>/5
                          </p>
                          <p>OVERALL</p>
                          <p>
                            {" "}
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fa-regular fa-star" />
                          </p>
                          <p>Based on Listing</p>
                        </div>
                      </div>
                      <div className="col-lg-9">
                        <div className="ratings-table table-responsive">
                          <table className="">
                            <tbody>
                              <tr>
                                <td className="star-ratings">
                                  <i className="fas fa-star filled" />
                                  <i className="fas fa-star filled" />
                                  <i className="fas fa-star filled" />
                                  <i className="fas fa-star filled" />
                                  <i className="fas fa-star filled" />
                                </td>
                                <td className="scrore-width">
                                  <span> </span>
                                </td>
                                <td> 0</td>
                              </tr>
                              <tr>
                                <td className="star-ratings">
                                  <i className="fas fa-star filled" />
                                  <i className="fas fa-star filled" />
                                  <i className="fas fa-star filled" />
                                  <i className="fas fa-star filled" />
                                  <i className="fa-regular fa-star rating-color" />
                                </td>
                                <td className="scrore-width selected">
                                  <span> </span>
                                </td>
                                <td> 1</td>
                              </tr>
                              <tr>
                                <td className="star-ratings">
                                  <i className="fas fa-star filled" />
                                  <i className="fas fa-star filled" />
                                  <i className="fas fa-star filled" />
                                  <i className="fa-regular fa-star rating-color" />
                                  <i className="fa-regular fa-star rating-color" />
                                </td>
                                <td className="scrore-width">
                                  <span> </span>
                                </td>
                                <td> 0</td>
                              </tr>
                              <tr>
                                <td className="star-ratings">
                                  <i className="fas fa-star filled" />
                                  <i className="fas fa-star filled" />
                                  <i className="fa-regular fa-star rating-color" />
                                  <i className="fa-regular fa-star rating-color" />
                                  <i className="fa-regular fa-star rating-color" />
                                </td>
                                <td className="scrore-width">
                                  <span> </span>
                                </td>
                                <td> 0</td>
                              </tr>
                              <tr>
                                <td className="star-ratings">
                                  <i className="fas fa-star filled" />
                                  <i className="fa-regular fa-star rating-color" />
                                  <i className="fa-regular fa-star rating-color" />
                                  <i className="fa-regular fa-star rating-color" />
                                  <i className="fa-regular fa-star rating-color" />
                                </td>
                                <td className="scrore-width">
                                  <span> </span>
                                </td>
                                <td> 0</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
            </div>
            <div className="col-lg-3 theiaStickySidebar">
              <StickyBox>
                <div className="rightsidebar">
                  <div className="card">
                    <h4>
                      <img src={details_icon} alt="details-icon" style={{ filter: 'invert(20%) sepia(70%) saturate(1500%) hue-rotate(210deg) brightness(90%) contrast(90%)' }}/> Details
                    </h4>
                    <ul>
                      {[
                        { label: "City", value: filteredData.City },
                        {
                          label: "Closure Type",
                          value: filteredData.ClosureType,
                        },
                        { label: "Features", value: filteredData.Features },
                        { label: "Fit", value: filteredData.Fit },
                        { label: "Gender", value: filteredData.Gender },
                        { label: "Make", value: filteredData.Make },
                        { label: "Material", value: filteredData.Material },
                        {
                          label: "Seller Type",
                          value: filteredData.SellerType,
                        },
                        {
                          label: "Engine Capacity",
                          value: filteredData.EngineCapacity,
                        },
                        {
                          label: "Transmission",
                          value: filteredData.Transmission,
                        },
                        {
                          label: "Seating Capacity",
                          value: filteredData.SeatingCapacity,
                        },
                        { label: "Body Type", value: filteredData.BodyType },
                        { label: "Purpose", value: filteredData.Purpose },
                        { label: "Price From", value: filteredData.priceFrom },
                        { label: "Price To", value: filteredData.priceTo },
                        {
                          label: "Manufacture Year",
                          value: filteredData.ManufactureYear,
                        },
                        {
                          label: "Engine Type",
                          value: filteredData.EngineType,
                        },
                        { label: "Color", value: filteredData.Color },
                        {
                          label: "Video Availability",
                          value: filteredData.VideoAvailability,
                        },
                        {
                          label: "Picture Availability",
                          value: filteredData.PictureAvailability,
                        },
                        { label: "Location", value: filteredData.location },
                      ]
                        .filter(({ value }) => value) // Remove empty/null values
                        .map(({ label, value }) => (
                          <li key={label}>
                            {label} <span>{formatValue(value)}</span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* <div className="card">
                    <h4>
                      <img src="assets/img/breifcase.svg" alt="Business Info" />{" "}
                      Business Info
                    </h4>
                    <div className="map-details">
                      <div className="map-frame">
                        <iframe
                          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
                            filteredData.mapAddress
                          )}`}
                          width="200"
                          height="160"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                      <ul className="info-list">
                        <li>
                          <i className="feather-map-pin" />{" "}
                          {filteredData.mapAddress}
                        </li>
                        <li>
                          <i className="feather-phone-call" />{" "}
                          {filteredData.Phone}
                        </li>
                        <li>
                          <i className="feather-mail" /> {filteredData.Email}
                        </li>
                        <li>
                          <img src={website} alt="website" />{" "}
                          {filteredData.Website}
                        </li>
                        <li className="socialicons pb-0">
                          <Link to={filteredData.facebook} target="_blank">
                            <i className="fab fa-facebook-f" />
                          </Link>
                          <Link to={filteredData.twitter} target="_blank">
                            <i className="fab fa-twitter" />
                          </Link>
                          <Link to={filteredData.instagram} target="_blank">
                            <i className="fab fa-instagram" />
                          </Link>
                          <Link to={filteredData.googlePlus} target="_blank">
                            <i className="fab fa-google-plus-g" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div> */}
                  <div className="card">
                    <h4>
                      <img src={statistic_icon} alt="location" style={{ filter: 'invert(20%) sepia(70%) saturate(1500%) hue-rotate(210deg) brightness(90%) contrast(90%)' }}/> Statistics
                    </h4>
                    <ul className="statistics-list">
                      <li>
                        <div className="statistic-details">
                          <span className="icons">
                            <i className="fa-regular fa-eye"style={{color:"#2d4495"}} />
                          </span>
                          Views{" "}
                        </div>
                        <span className="text-end">453563</span>
                      </li>
                      <li>
                        <div className="statistic-details">
                          <span className="icons">
                            <i className="feather-star" style={{color:"#2d4495"}}/>
                          </span>
                          Ratings{" "}
                        </div>
                        <span className="text-end">153</span>
                      </li>
                      <li>
                        <div className="statistic-details">
                          <span className="icons">
                            <i className="feather-heart"style={{color:"#2d4495"}} />
                          </span>
                          Favorites{" "}
                        </div>
                        <span className="text-end">123</span>
                      </li>
                      <li className="mb-0">
                        <div className="statistic-details">
                          <span className="icons">
                            <i className="feather-share-2" style={{color:"#2d4495"}}/>
                          </span>
                          Shares{" "}
                        </div>
                        <span className="text-end">50</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card">
                    <h4>
                      <i className="feather-user" style={{color:"#2d4495"}}/> {filteredData.title}
                    </h4>
                    <div className="sidebarauthor-details align-items-center">
                      <div className="sideauthor-img">
                        <img src={ProfileAvatar12} alt="author" />
                      </div>
                      <div className="sideauthor-info">
                        <p className="authorname">{filteredData.displayName}</p>
                        <p>{filteredData.creationTime}</p>
                      </div>
                    </div>
                  </div>
            
                </div>
              </StickyBox>
            </div>
          </div>
        </div>
      </div>
      {/* /Details Main Section */}
      <Footer />
    </>
  );
};
export default ServiceDetails;
