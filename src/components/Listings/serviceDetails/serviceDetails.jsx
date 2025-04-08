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

const ServiceDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };
  const [_Id, setId] = useState(null); // State to store ads data
  const [callingFrom, setCallingFrom] = useState(null); // State to store ads data

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
          <div className="about-details">
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
                    color:"blue"
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
                  <li>
                    <Link to="#">
                      <i className="feather-map" /> Get Directions
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src={website} alt="website" />
                      Website
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="feather-share-2" /> share
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fa-regular fa-comment-dots" /> Write a
                      review
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="feather-flag" /> report
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="feather-heart" /> Save
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3">
                <div className="callnow">
                  <Link to="contact.html">
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
      {/*Details Main  Section*/}
      <div className="details-main-wrapper">
        <div className="container">
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
              {/*Listing Features Section*/}
              {/* <div className="card ">
                <div className="card-header">
                  <i className="feather-list" />
                  <h4>Listing Features</h4>
                </div>
                <div className="card-body">
                  <div className="lisiting-featues">
                    <div className="row">
                      <div className="featureslist d-flex align-items-center col-lg-4 col-md-4">
                        <div className="feature-img">
                          <img src={Feature_1_svg} alt="Room amenties" />
                        </div>
                        <div className="featues-info">
                          <h6>
                            Room <br /> amenities
                          </h6>
                        </div>
                      </div>
                      <div className="featureslist d-flex align-items-center col-lg-4 col-md-4">
                        <div className="feature-img">
                          <img src={Feature_2_svg} alt="Bathroom amenities" />
                        </div>
                        <div className="featues-info">
                          <h6>
                            Bathroom <br /> amenities
                          </h6>
                        </div>
                      </div>
                      <div className="featureslist d-flex align-items-center col-lg-4 col-md-4">
                        <div className="feature-img">
                          <img src={Feature_3_svg} alt="Media Technology" />
                        </div>
                        <div className="featues-info">
                          <h6>
                            Media &amp; Technology <br /> amenities
                          </h6>
                        </div>
                      </div>
                      <div className="featureslist d-flex align-items-center col-lg-4 col-md-4">
                        <div className="feature-img">
                          <img src={Feature_4_svg} alt="Food Security" />
                        </div>
                        <div className="featues-info">
                          <h6>
                            Food &amp; Security <br /> amenities
                          </h6>
                        </div>
                      </div>
                      <div className="featureslist d-flex align-items-center col-lg-4 col-md-4">
                        <div className="feature-img">
                          <img src={Feature_5_svg} alt="Media Technology" />
                        </div>
                        <div className="featues-info">
                          <h6>
                            Services &amp; Extra <br /> amenities
                          </h6>
                        </div>
                      </div>
                      <div className="featureslist d-flex align-items-center col-lg-4 col-md-4">
                        <div className="feature-img">
                          <img src={Feature_6_svg} alt="Media Technology" />
                        </div>
                        <div className="featues-info">
                          <h6>
                            Outdoor &amp; View <br /> amenities
                          </h6>
                        </div>
                      </div>
                      <div className="featureslist d-flex  access-feature align-items-center col-lg-4 col-md-4">
                        <div className="feature-img">
                          <img src={Feature_7_svg} alt="Media Technology" />
                        </div>
                        <div className="featues-info">
                          <h6>
                            Accessibility <br /> amenities
                          </h6>
                        </div>
                      </div>
                      <div className="featureslist d-flex align-items-center access-feature col-lg-4 col-md-4">
                        <div className="feature-img">
                          <img src={Feature_8_svg} alt="Media Technology" />
                        </div>
                        <div className="featues-info">
                          <h6>
                            Safety &amp; Security
                            <br /> amenities
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/*/Listing Features Section*/}
              {/*Gallery Section*/}
              <div className="card gallery-section ">
                <div className="card-header ">
                  <img src={galleryicon} alt="gallery" />
                  <h4>Gallery</h4>
                </div>
                <div className="card-body">
                  <div className="gallery-content">
                    <Roomspics filteredData={filteredData} />
                  </div>
                </div>
              </div>
              {/*/Gallery Section*/}
              {/*Ratings Section*/}
              <div className="card ">
                <div className="card-header  align-items-center">
                  <i className="feather-star" />
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
              {/*/Ratings Section*/}
              {/*Review  Section*/}
              {/* <div className="card review-sec  mb-0">
                <div className="card-header  align-items-center">
                  <i className="fa-regular fa-comment-dots" />
                  <h4>Write a Review</h4>
                </div>
                <div className="card-body">
                  <div className="review-list">
                    <ul className="">
                      <li className="review-box ">
                        <div className="review-profile">
                          <div className="review-img">
                            <img
                              src={avatar_11}
                              className="img-fluid"
                              alt="img"
                            />
                          </div>
                        </div>
                        <div className="review-details">
                          <h6>Joseph</h6>
                          <div className="rating">
                            <div className="rating-star">
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fa-regular fa-star rating-overall" />
                            </div>
                            <div>
                              <i className="fa-sharp fa-solid fa-calendar-days" />{" "}
                              4 months ago
                            </div>
                            <div>by: Demo Test</div>
                          </div>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>

                          <RoomsProfile />

                          <div className="reply-box ">
                            <p>
                              Was This Review...?{" "}
                              <Link to="#" className="thumbsup">
                                <i className="feather-thumbs-up" /> Like{" "}
                              </Link>
                              <Link to="#" className="thumbsdown">
                                <i className="feather-thumbs-down" /> Dislike{" "}
                              </Link>
                            </p>
                            <Link to="#" className="replylink">
                              <i className="feather-corner-up-left" /> Reply
                            </Link>
                          </div>
                        </div>
                      </li>
                      <li className="review-box">
                        <div className="review-profile">
                          <div className="review-img">
                            <img
                              src={ProfileAvatar02}
                              className="img-fluid"
                              alt="img"
                            />
                          </div>
                        </div>
                        <div className="review-details">
                          <h6>Dev</h6>
                          <div className="rating">
                            <div className="rating-star">
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fa-regular fa-star rating-overall" />
                            </div>
                            <div>
                              <i className="fa-sharp fa-solid fa-calendar-days" />{" "}
                              4 months ago
                            </div>
                            <div>by: Demo Test</div>
                          </div>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>
                        </div>
                      </li>
                      <li className="review-box">
                        <div className="review-profile">
                          <div className="review-img">
                            <img
                              src={ProfileAvatar01}
                              className="img-fluid"
                              alt="img"
                            />
                          </div>
                        </div>
                        <div className="review-details">
                          <h6>Johnson</h6>
                          <div className="rating">
                            <div className="rating-star">
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fa-regular fa-star rating-overall" />
                            </div>
                            <div>
                              <i className="fa-sharp fa-solid fa-calendar-days" />{" "}
                              4 months ago
                            </div>
                            <div>by: Demo Test</div>
                          </div>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>
                          <div className="reply-box ">
                            <p>
                              Was This Review...?{" "}
                              <Link to="#" className="thumbsup">
                                <i className="feather-thumbs-up" /> Like{" "}
                              </Link>
                              <Link to="#" className="thumbsdown">
                                <i className="feather-thumbs-down" /> Dislike{" "}
                              </Link>
                            </p>
                            <Link to="#" className="replylink">
                              <i className="feather-corner-up-left" /> Reply
                            </Link>
                          </div>
                        </div>
                      </li>
                      <li className="review-box feedbackbox mb-0">
                        <div className="review-details">
                          <h6>Leave feedback about this</h6>
                        </div>
                        <div className="card-body">
                          <form className="">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Title"
                              />
                            </div>
                            <div className="namefield">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Name*"
                                  required=""
                                />
                              </div>
                              <div className="form-group me-0">
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="Email*"
                                  required=""
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <textarea
                                rows={4}
                                className="form-control"
                                placeholder="Write a Review*"
                                required=""
                                defaultValue={""}
                              />
                            </div>
                            <div className="reviewbox-rating">
                              <p>
                                <span> Rating</span>
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                              </p>
                            </div>
                            <div className="submit-section">
                              <button
                                className="btn btn-primary submit-btn"
                                type="submit"
                              >
                                {" "}
                                Submit Review
                              </button>
                            </div>
                          </form>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
              {/*/Review Section*/}
            </div>
            <div className="col-lg-3 theiaStickySidebar">
              <StickyBox>
                <div className="rightsidebar">
                  <div className="card">
                    <h4>
                      <img src={details_icon} alt="details-icon" /> Details
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
                      <img src={statistic_icon} alt="location" /> Statistics
                    </h4>
                    <ul className="statistics-list">
                      <li>
                        <div className="statistic-details">
                          <span className="icons">
                            <i className="fa-regular fa-eye" />
                          </span>
                          Views{" "}
                        </div>
                        <span className="text-end">453563</span>
                      </li>
                      <li>
                        <div className="statistic-details">
                          <span className="icons">
                            <i className="feather-star" />
                          </span>
                          Ratings{" "}
                        </div>
                        <span className="text-end">153</span>
                      </li>
                      <li>
                        <div className="statistic-details">
                          <span className="icons">
                            <i className="feather-heart" />
                          </span>
                          Favorites{" "}
                        </div>
                        <span className="text-end">123</span>
                      </li>
                      <li className="mb-0">
                        <div className="statistic-details">
                          <span className="icons">
                            <i className="feather-share-2" />
                          </span>
                          Shares{" "}
                        </div>
                        <span className="text-end">50</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card">
                    <h4>
                      <i className="feather-user" /> {filteredData.title}
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
                  {/* <div className="card mb-0">
                    <h4>
                      <i className="feather-phone-call" /> Contact Business
                    </h4>
                    <form className="contactbusinessform">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email Address"
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          rows={6}
                          className="form-control"
                          placeholder="Message"
                          defaultValue={""}
                        />
                      </div>
                      <div className="submit-section">
                        <button
                          className="btn btn-primary submit-btn"
                          type="submit"
                        >
                          Send Message
                        </button>
                      </div>
                    </form>
                  </div> */}
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
