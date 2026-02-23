import React, { useRef, useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import { db } from "./../../Firebase/FirebaseConfig.jsx";
import { getDocs, collection } from "firebase/firestore";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getSubcategoriesByName } from "../../../utils/categoriesData";
import { useTranslation } from "react-i18next";
import { getTranslatedField } from "../../../utils/autoTranslate";

// Function to format the timeAgo in human-readable form with translation support
function timeAgo(timestamp, t) {
  let seconds;

  if (!timestamp) return t ? t("common.unknownTime") : "Unknown time";

  if (timestamp._seconds) {
    // Firestore format (from backend response)
    seconds = timestamp._seconds;
  } else if (timestamp.seconds) {
    // Client format
    seconds = timestamp.seconds;
  } else {
    return t ? t("common.invalidDate") : "Invalid date";
  }

  const date = new Date(seconds * 1000);
  const now = new Date();
  const difference = Math.abs(now - date);
  const diffSeconds = Math.floor(difference / 1000);
  const minutes = Math.floor(diffSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (t) {
    if (days > 0)
      return `${days} ${days > 1 ? t("common.daysAgo") : t("common.dayAgo")}`;
    if (hours > 0)
      return `${hours} ${hours > 1 ? t("common.hoursAgo") : t("common.hourAgo")}`;
    if (minutes > 0)
      return `${minutes} ${minutes > 1 ? t("common.minutesAgo") : t("common.minuteAgo")}`;
    return t("common.justNow");
  }

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "Just now";
}

export default function AutomativeCarousel() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [slidesToShow, setSlidesToShow] = useState(5);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subcategories, setSubcategories] = useState([]);
  const [activeSubcategory, setActiveSubcategory] = useState("Mobile Phones");

  // Helper function to translate electronics subcategory names
  const translateSubcategory = (name) => {
    const subcategoryMap = {
      "Mobile Phones": t("subcategories.electronics.mobilePhones"),
      "Tablet Devices": t("subcategories.electronics.tabletDevices"),
      "Computers & Laptops": t("subcategories.electronics.computersAndLaptops"),
      "Video Games": t("subcategories.electronics.videoGames"),
      Cameras: t("subcategories.electronics.cameras"),
      "Home & Kitchen Appliance": t(
        "subcategories.electronics.homeAndKitchenAppliance",
      ),
    };
    return subcategoryMap[name] || name;
  };

  // Fetch subcategories
  useEffect(() => {
    const cats = getSubcategoriesByName("Electronics");
    setSubcategories(cats);
  }, []);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch("/route/ELECTRONICSCarousal");
        const data = await response.json();
        if (!response.ok) return;

        console.log(data, "adsList___________Electronic");
        setAds(data); // Set the state with the ads data
        setLoading(false); // Stop loading when data is fetched
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
  //   infinite: true,
  //   lazyLoad: true,
  //   speed: 1000,
  //   slidesToShow: slidesToShow,
  //   slidesToScroll: 1,
  // };

  const slider = useRef();

  // Don't render the section if there are no ads
  if (loading || ads.length === 0) {
    return null;
  }

  return (
    <section className="featured-section-color electronic_card_section">
      <div className="container">
        <div className="row align-items-center">
          <div
            className="featuresection_infodev"
            style={{ marginTop: "2.5rem" }}
          >
            <h2 className="featuresection_header">
              {t("categories.electronics")}
            </h2>
            <Link to="/ElectronicComp">
              <button className="blue_btn">{t("home.viewAll")}</button>
            </Link>
          </div>

          <div className="feature-section-info">
            <ul
              className="info-list"
              style={{
                display: "flex",
                overflowX: "auto",
                whiteSpace: "nowrap",
                scrollBehavior: "smooth",
                paddingBottom: "8px",
                gap: "10px",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "thin",
                scrollbarColor: "#ddd #f5f5f5",
              }}
            >
              {subcategories.map((sub, index) => (
                <li
                  key={index}
                  className={activeSubcategory === sub.name ? "active" : ""}
                  onClick={() => {
                    setActiveSubcategory(sub.name);
                    // Use the path directly from the subcategory data
                    if (sub.path) {
                      navigate(sub.path);
                    }
                  }}
                  style={{
                    cursor: "pointer",
                    padding: "8px 16px",
                    borderBottom:
                      activeSubcategory === sub.name
                        ? "3px solid #2563eb"
                        : "3px solid transparent",
                    flexShrink: 0,
                    transition: "all 0.3s ease",
                    fontSize: "14px",
                    color: activeSubcategory === sub.name ? "#2563eb" : "#666",
                    fontWeight: activeSubcategory === sub.name ? "600" : "500",
                  }}
                  onMouseEnter={(e) => {
                    if (activeSubcategory !== sub.name) {
                      e.target.style.color = "#2563eb";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSubcategory !== sub.name) {
                      e.target.style.color = "#666";
                    }
                  }}
                >
                  {translateSubcategory(sub.name)}
                </li>
              ))}
            </ul>
            <style>{`
              .info-list::-webkit-scrollbar {
                height: 4px;
              }
              .info-list::-webkit-scrollbar-track {
                background: #f5f5f5;
                borderRadius: 10px;
              }
              .info-list::-webkit-scrollbar-thumb {
                background: #ddd;
                borderRadius: 10px;
              }
              .info-list::-webkit-scrollbar-thumb:hover {
                background: #999;
              }
            `}</style>
          </div>

          {/* <div className="featureline">
            <div className="highlighter"></div>
          </div> */}
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
                      to={`/Dynamic_Route?id=${item.id}&callingFrom=ElectronicComp`}
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
                                  {t("common.featured")}
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
                                  {getTranslatedField(
                                    item,
                                    "title",
                                    i18n.language,
                                  )}
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
                                {getTranslatedField(
                                  item,
                                  "District",
                                  i18n.language,
                                )}
                                ,{" "}
                                {getTranslatedField(
                                  item,
                                  "City",
                                  i18n.language,
                                )}
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
                                  {timeAgo(item.createdAt, t)}
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
