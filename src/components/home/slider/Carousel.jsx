import React, { useRef, useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { db } from "./../../Firebase/FirebaseConfig.jsx";
import { getDocs, collection } from "firebase/firestore";
import Loading1 from "../../../../public/Progress circle.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
function timeAgo(timestamp) {
  let seconds;

  if (!timestamp) return "Unknown time";

  if (timestamp._seconds) {
    // Firestore format (from backend response)
    seconds = timestamp._seconds;
  } else if (timestamp.seconds) {
    // Client format
    seconds = timestamp.seconds;
  } else {
    return "Invalid date";
  }

  const date = new Date(seconds * 1000);
  const now = new Date();
  const difference = Math.abs(now - date);
  const diffSeconds = Math.floor(difference / 1000);
  const minutes = Math.floor(diffSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "Just now";
}
export default function Carousel() {
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const slider = useRef();
  console.log(ads, "ads____________________111");
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch(
          "http://168.231.80.24:9002/route/EducationCarousal"
        );
        const data = await response.json();
        if (!response.ok) return;

        setAds(data.slice(0, 6)); // Limit to 6 items
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ads from API:", error);
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
        setSlidesToShow(2);
      } else {
        setSlidesToShow(Math.min(ads.length, 5)); // Ensure we don't show more than available items
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ads]);
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
    slidesToShow: 5,
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

  // const settings = {
  //   dots: false,
  //   arrows: true,
  //   infinite: false, // Ensure no duplicate looping
  //   speed: 1000,
  //   slidesToShow: slidesToShow,
  //   slidesToScroll: 1,
  // };

  return (
    <section className="featured-section-color automotive_card_section -mt-8 lg:-mt-16 feature_section_carosel">
      {" "}
      <div className="container">
        <div className="row align-items-center">
          <div
            className="col-md-10 aos aos-init aos-animate"
            data-aos="fade-up"
          >
            <div className="section-heading">
              <h2>Feature Ads</h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <div className="flex justify-center items-center h-screen">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                {/* <img
                  src={Loading1}
                  alt="Loading..."
                  style={{
                    width: "200px",
                    height: "200px",
                    animation: "spin 1s linear infinite", // Apply the spin animation
                  }}
                /> */}
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
                      to={`/Dynamic_Route?id=${item.id}&callingFrom=Education`}
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
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
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
                                      fontSize: "0.9rem",
                                    }}
                                  >
                                    {item.Price ? (
                                      <>
                                        <img
                                          src="https://www.sama.gov.sa/ar-sa/Currency/Documents/Saudi_Riyal_Symbol-2.svg"
                                          alt="Saudi Riyal Symbol"
                                          style={{
                                            height: "1em",
                                            verticalAlign: "middle",
                                            marginRight: "5px",
                                          }}
                                        />
                                        {item.Price}
                                      </>
                                    ) : (
                                      "N/A"
                                    )}
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
    </section>
  );
}
