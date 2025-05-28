import React, { useRef, useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { db } from "./../../Firebase/FirebaseConfig.jsx";
import { getDocs, collection } from "firebase/firestore";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Function to calculate the difference in days
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

export default function AutomativeCarousel() {
  const [slidesToShow, setSlidesToShow] = useState(5);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsCollection = collection(db, "REALESTATECOMP"); // Get reference to the 'ads' collection
        const adsSnapshot = await getDocs(adsCollection); // Fetch the data
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread the document data
        }));
        console.log("Ads data fetched from backend:", adsList);
        setAds(adsList); // Set the state with the ads data
        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching ads:", error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 767) {
        setSlidesToShow(1);
      } else if (width >= 768 && width <= 1024) {
        setSlidesToShow(5);
      } else {
        setSlidesToShow(5);
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
  };

  // const settings = {
  //   dots: false,
  //   arrows: true,
  //   infinite: true,
  //   lazyLoad: true,
  //   speed: 1000,
  //   slidesToShow: slidesToShow,
  //   slidesToScroll: 1,
  // };

  const slider = useRef();

  return (
    <section
      className="featured-section-color electronic_card_section"
      style={{ marginTop: "-2rem" }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="featuresection_infodev" style={{ marginTop: "2rem" }}>
            <h2 className="featuresection_header">Real Estate</h2>
            <Link to="/RealEstateComp">
              <button className="featuresection_btn">View All</button>
            </Link>
          </div>

          <div
            className="feature-section-info"
            style={{ marginTop: "-0.5rem" }}
          >
            <ul className="info-list">
              <li>Sale Property</li>
              <li>Rent Property </li>
              <li>Buy Property</li>
            </ul>
          </div>

          <div className="featureline">
            <div className="highlighter"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div>
              <Slider
                ref={slider}
                {...settings}
                className="featured-slider grid-view"
              >
                {ads.map((item, index) => (
                  <div key={index}>
                    <Link
                      to={`/car-details?id=${item.id}&callingFrom=RealEstate`}
                    >
                      <div
                        className="card aos"
                        data-aos="fade-up"
                        style={{
                          height: "330px", // Adjusted to remove bottom gap
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          overflow: "hidden",
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
                                <span className="Featured-text">Featured</span>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
