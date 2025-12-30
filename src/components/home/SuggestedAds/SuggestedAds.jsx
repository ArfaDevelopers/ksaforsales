import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { db } from "../../Firebase/FirebaseConfig"; // Adjust path as needed
import { getDocs, collection } from "firebase/firestore";
import Spinner from "react-bootstrap/Spinner";
import { useTranslation } from "react-i18next";

const SuggestedAds = ({ callingFrom, currentAdId }) => {
  const { t } = useTranslation();
  const [suggestedAds, setSuggestedAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const slider = useRef();

  // Map callingFrom to Firestore collection
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

  // Fetch suggested ads
  useEffect(() => {
    const fetchSuggestedAds = async () => {
      setLoading(true);
      try {
        const adsCollection = collection(db, collectionName);
        const adsSnapshot = await getDocs(adsCollection);
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Filter out the current ad and limit to 5 suggestions
        const filteredAds = adsList
          .filter((ad) => ad.id !== currentAdId)
          .slice(0, 5);
        setSuggestedAds(filteredAds);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching suggested ads:", error);
        setLoading(false);
      }
    };
    if (callingFrom && currentAdId) fetchSuggestedAds();
  }, [callingFrom, currentAdId]);

  // Slider settings
  const settings = {
    dots: false,
    arrows: true,
    infinite: suggestedAds.length > 3,
    lazyLoad: true,
    speed: 1000,
    slidesToShow: Math.min(suggestedAds.length, 3),
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 767, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="suggested-ads-section" style={{ marginTop: "2rem" }}>
      <h2 className="featuresection_header"style={{marginLeft:"1rem"}}>Similar Ads</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : suggestedAds.length > 0 ? (
        <Slider ref={slider} {...settings} className="suggested-slider">
          {suggestedAds.map((ad) => (
            <Link
              to={`/Dynamic_Route?id=${ad.id}&callingFrom=${callingFrom}`}
              key={ad.id}
            >
              <div className="card aos" data-aos="fade-up">
                <div className="blog-widget">
                  <div className="blog-img">
                    <img
                      src={ad.galleryImages?.[0] || "https://via.placeholder.com/200"}
                      className="img-fluid"
                      alt={ad.title || "Ad Image"}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </div>
                  {ad.FeaturedAds === "Featured Ads" && (
                    <div className="fav-item">
                      <span className="Featured-text">{t("common.featured")}</span>
                    </div>
                  )}
                  <div className="bloglist-content">
                    <div className="card-body">
                      <h6>{ad.title}</h6>
                      <p>${ad.Price || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      ) : (
        <p>No suggested ads available.</p>
      )}
    </section>
  );
};

export default SuggestedAds;