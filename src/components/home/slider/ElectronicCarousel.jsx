import React, { useRef, useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { db } from "./../../Firebase/FirebaseConfig.jsx";
import { getDocs, collection } from "firebase/firestore";

// Function to format the timeAgo in human-readable form
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
        const adsCollection = collection(db, "ELECTRONICS"); // Get reference to the 'ads' collection
        const adsSnapshot = await getDocs(adsCollection); // Fetch the data
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread the document data
        }));
        console.log(adsList, "adsList___________Electronic");
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

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    lazyLoad: true,
    speed: 1000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };

  const slider = useRef();

  return (
    <section
      className="featured-section-color electronic_card_section"
      style={{ marginTop: "-2rem" }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div
            className="featuresection_infodev"
            style={{ marginTop: "2.5rem" }}
          >
            <h2 className="featuresection_header">Electronic</h2>
            <button className="featuresection_btn">View All</button>
          </div>

          <div
            className="feature-section-info"
            style={{ marginTop: "-0.5rem" }}
          >
            <ul className="info-list">
              <li>Charger</li>
              <li>Headphones</li>
              <li>Speakers</li>
              <li>Mobiles</li>
              <li>Processors</li>
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
                {ads.map((ad) => (
                  <Link
                    //  to={`/car-details/${ad.id}`}
                    to={`/car-details?id=${ad.id}&callingFrom=Electronic`}
                  >
                    <div key={ad.id} className="card aos" data-aos="fade-up">
                      <div className="blog-widget">
                        <div className="blog-img">
                          <img
                            src={ad?.galleryImages[0]}
                            className="img-fluid"
                            // alt={ad.name}
                            style={{ height: "200px", objectFit: "cover" }}
                          />
                          {ad.FeaturedAds === "Featured Ads" ? (
                            <div className="fav-item">
                              <span className="Featured-text">Featured</span>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="bloglist-content">
                          <div className="card-body">
                            <h6>
                              <Link
                                //  to={`/car-details/${ad.id}`}
                                to={`/car-details?id=${ad.id}&callingFrom=Electronic`}
                              >
                                {ad.title}
                              </Link>
                            </h6>

                            <div className="blog-location-details">
                              <div
                                className="location-info"
                                style={{ marginTop: "1rem" }}
                              >
                                {ad.location}
                              </div>
                            </div>
                            <div className="amount-details">
                              <div className="amount">
                                <span
                                  className="validrate"
                                  style={{ fontFamily: "Inter" }}
                                >
                                  ${ad.Price}
                                </span>
                              </div>
                              <div
                                className="ratings"
                                style={{ fontFamily: "Inter" }}
                              >
                                {timeAgo(ad.createdAt)}
                                {/* Call timeAgo function here */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
