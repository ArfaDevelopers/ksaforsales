import React, { useRef, useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { db } from "./../../Firebase/FirebaseConfig.jsx";
import { getDocs, collection } from "firebase/firestore";

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

export default function Carousel() {
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const slider = useRef();
  console.log(ads, "ads____________________");
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsCollection = collection(db, "Education");
        const adsSnapshot = await getDocs(adsCollection);
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAds(adsList.slice(0, 6)); // Ensure we only take 4 items
        setLoading(false);
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

  const settings = {
    dots: false,
    arrows: true,
    infinite: false, // Ensure no duplicate looping
    speed: 1000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };

  return (
    <section className="featured-section-color automotive_card_section">
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
              <div className="loading">Loading...</div>
            ) : (
              <Slider
                ref={slider}
                {...settings}
                className="featured-slider grid-view"
              >
                {ads.map((item, index) => (
                  <div key={index}>
                    <Link
                      //  to={`/routes/${item.id}`}
                      to={`/Dynamic_Route?id=${item.id}&callingFrom=${item.Category}`}
                    >
                      <div
                        className="card aos"
                        data-aos="fade-up"
                        style={{
                          height: "400px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          overflow: "hidden",
                        }}
                      >
                        <div className="blog-widget">
                          <div
                            className="blog-img"
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
                            <div className="card-body fw-bold">
                              <h6>
                                <Link to="/index">{item.title}</Link>
                              </h6>
                              {/* <p style={{ fontSize: "0.7rem" }}>
                                {item.ContentType} | {item.SkillLevel} |{" "}
                                {item.SubjectCategories}
                              </p> */}
                              <div className="blog-location-details">
                                <div
                                  className="location-info mt-2"
                                  style={{ fontFamily: "Inter" }}
                                >
                                  {item.location}
                                </div>
                              </div>
                              <div className="amount-details">
                                <div className="amount">
                                  <span
                                    className="validrate"
                                    style={{ fontFamily: "Inter" }}
                                  >
                                    ${item.Price}
                                  </span>
                                </div>
                                <div className="ratings">
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
