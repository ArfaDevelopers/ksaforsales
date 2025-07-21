import React, { useRef, useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { db } from "./../../Firebase/FirebaseConfig.jsx";
import { getDocs, collection } from "firebase/firestore";
import Loading1 from "../../../../public/Progress circle.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Function to format posted time (e.g., "2 days ago")
const formatPostedTime = (timestamp) => {
  const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp); // Handle Firestore Timestamp
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert time difference to days

  return diffDays === 0
    ? "Today"
    : `${diffDays} day${diffDays > 1 ? "s" : ""} ago`; // Return formatted string
};

export default function AutomativeCarousel() {
  const [slidesToShow, setSlidesToShow] = useState(5);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch ads from Firestore
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsCollection = collection(db, "Cars"); // Get reference to the 'ads' collection
        const adsSnapshot = await getDocs(adsCollection); // Fetch the data
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread the document data
        }));
        console.log(adsList, "dtaa__________");
        setAds(adsList); // Set the state with the ads data
        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching ads:", error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);
  function timeAgo(timestamp) {
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    const now = new Date();
    const difference = Math.abs(now - date); // Difference in milliseconds
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "Just now";
  }
  // Update slidesToShow on screen resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 767) {
        setSlidesToShow(1);
      } else if (width >= 768 && width <= 1024) {
        setSlidesToShow(5); // Adjust number of slides for medium screens
      } else {
        setSlidesToShow(5); // Adjust number of slides for large screens
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const CustomPrevArrow = ({ onClick }) => (
    <div className="custom-arrow custom-prev" onClick={onClick}>
      <FaChevronLeft />
    </div>
  );

  const CustomNextArrow = ({ onClick }) => (
    <div className="custom-arrow custom-next" onClick={onClick}>
      <FaChevronRight />
    </div>
  );
  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 1000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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

  const slider = useRef();

  return (
    <section
      className="featured-section-color automotive_card_section"
      style={{ marginTop: window.innerWidth <= 576 ? "0rem" : "0.5rem" }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div
            className="featuresection_infodev"
            style={{ marginTop: "1.5rem" }}
          >
            <h2 className="featuresection_header">Automotive</h2>
            <Link to="/AutomotiveComp">
              <button className="featuresection_btn">View All</button>
            </Link>
          </div>

          <div
            className="feature-section-info"
            // style={{ marginTop: "-0.5rem" }}
          >
            <ul className="info-list">
              <li className="active">Car For Sales</li>
              <li>Car For Sales</li>
              <li>Car For Sales</li>
              {/* <li>Car For Sales</li> */}
              {/* <li>Car For Sales</li> */}
            </ul>
          </div>

          {/* <div className="featureline">
						<div className="highlighter"></div>
					</div> */}
        </div>

        <div className="row">
          <div className="col-md-12">
            <div>
              {loading ? (
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
              ) : (
                <Slider
                  ref={slider}
                  {...settings}
                  className="featured-slider grid-view"
                >
                  {ads.map((item, index) => (
                    <div key={index}>
                      <Link
                        to={`/car-details?id=${item.id}&callingFrom=automotive`}
                      >
                        <div
                          className="card aos"
                          data-aos="fade-up"
                          style={{
                            height: "310px", // Adjusted to remove bottom gap
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            overflow: "hidden",
                            backgroundColor: "#f0f0f0",
                          }}
                        >
                          <div className="blog-widget">
                            <div
                              style={{
                                height: "200px",
                                width: "100%",
                                overflow: "hidden",
                              }}
                            >
                              <img
                                src={
                                  item.galleryImages?.[0] || "/placeholder.jpg"
                                }
                                className="img-fluid"
                                alt="blog-img"
                                style={{
                                  objectFit: "cover",
                                  width: "100%",
                                  height: "100%",
                                }}
                              />
                              {item.FeaturedAds === "Featured Ads" && (
                                <div className="fav-item">
                                  <span className="Featured-text">
                                    Featured
                                  </span>
                                </div>
                              )}
                            </div>

                            <div
                              className="bloglist-content"
                              style={{
                                flexGrow: 1,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                className="card-body fw-bold"
                                style={{ padding: "0.75rem" }} // Reduced padding
                              >
                                <h6
                                  style={{
                                    marginBottom: "0.3rem",
                                    fontSize: "1.05rem",
                                  }}
                                >
                                  <Link
                                    to="/index"
                                    style={{
                                      color: "#222",
                                      textDecoration: "none",
                                    }}
                                  >
                                    {item.title}
                                  </Link>
                                </h6>
                                <p
                                  style={{
                                    fontSize: "0.68rem",
                                    color: "#666",
                                    marginBottom: "0.3rem",
                                  }}
                                >
                                  {item.District}, {item.City}
                                </p>
                                <div
                                  className="blog-location-details"
                                  style={{
                                    fontSize: "0.75rem",
                                    color: "#444",
                                    marginBottom: "0.3rem",
                                  }}
                                >
                                  <div
                                    className="location-info"
                                    style={{
                                      fontFamily: "Inter",
                                      marginTop: "0.2rem",
                                    }}
                                  >
                                    {item.location}
                                  </div>
                                </div>
                                <div
                                  className="amount-details"
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <div className="amount">
                                    <span
                                      className="validrate"
                                      style={{
                                        fontWeight: "bold",
                                        // color: "#27ae60",
                                        fontSize: "0.9rem",
                                      }}
                                    >
                                      ${item.Price}
                                    </span>
                                  </div>
                                  <div
                                    className="ratings"
                                    style={{
                                      color: "#999",
                                      fontStyle: "italic",
                                      fontSize: "0.7rem",
                                    }}
                                  >
                                    {timeAgo(item.createdAt)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
