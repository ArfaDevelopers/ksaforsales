import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FaHeart, FaRegHeart, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import { Link } from "react-router-dom";
import Mesagedeals from "../userPages/mesagedeals";
import {Divider } from 'antd';
import { useTranslation } from "react-i18next";
import "../../assets/css/mobile-search-card.css";
import { getTranslatedField } from "../../utils/autoTranslate";

const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect width='150' height='150' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";

const SearchResultCard = ({
  ad,
  onToggleBookmark,
  isBookmarked,
  currentUserId,
}) => {
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [receiverId, setReceiverId] = useState(null);
  const [productIds, setProductIds] = useState(null);
  const [activePhoneIndex, setActivePhoneIndex] = useState(null);
  const [popoverCarId, setPopoverCarId] = useState(null);
  const [activeButton, setActiveButton] = useState("call"); // Track which button is active

  // Get translated fields based on current language
  const currentLanguage = i18n.language;
  const title = getTranslatedField(ad, 'title', currentLanguage);
  const description = getTranslatedField(ad, 'description', currentLanguage);
  const city = getTranslatedField(ad, 'City', currentLanguage);
  const district = getTranslatedField(ad, 'District', currentLanguage);

  const handleShowModal = (userId, productId) => {
    setReceiverId(userId);
    setProductIds(productId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setReceiverId(null);
    setProductIds(null);
  };

  function timeAgo(timestamp) {
    if (!timestamp) return t("time.recently");

    // console.log("Timestamp received:", timestamp, "Type:", typeof timestamp);
    let date;

    // Handle Firebase Timestamp object
    if (timestamp?.toDate && typeof timestamp.toDate === 'function') {
      date = timestamp.toDate();
    }
    // Handle Firestore Timestamp with seconds
    else if (timestamp?._seconds) {
      date = new Date(timestamp._seconds * 1000);
    }
    // Handle Firestore Timestamp with seconds property
    else if (timestamp?.seconds) {
      date = new Date(timestamp.seconds * 1000);
    }
    // Handle Date object
    else if (timestamp instanceof Date) {
      date = timestamp;
    }
    // Handle milliseconds timestamp
    else if (typeof timestamp === "number") {
      date = new Date(timestamp);
    }
    // Handle string date
    else if (typeof timestamp === "string") {
      date = new Date(timestamp);
    }
    // Unknown format
    else {
      console.log("Unknown timestamp format:", timestamp);
      return t("time.recently");
    }

    // Validate date
    if (isNaN(date.getTime())) {
      console.log("Invalid date:", timestamp);
      return t("time.recently");
    }

    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return days === 1 ? t("time.dayAgo") : t("time.daysAgo", { count: days });
    if (hours > 0) return hours === 1 ? t("time.hourAgo") : t("time.hoursAgo", { count: hours });
    if (minutes > 0) return minutes === 1 ? t("time.minuteAgo") : t("time.minutesAgo", { count: minutes });
    return t("time.justNow");
  }

  const imageUrl =
    ad.galleryImages && ad.galleryImages.length > 0
      ? ad.galleryImages[0]
      : placeholderImage;

  const getCategoryRoute = (category) => {
    const categoryRouteMap = {
      Motors: "motors",
      Automotive: "motors",
      Electronics: "electronics",
      "Fashion Style": "fashion-style",
      "Home & Furniture": "home-and-furniture",
      "Job Board": "job-board",
      Realestate: "realestate",
      "Real Estate": "realestate",
      Services: "services",
      "Sport & Game": "sport-and-game",
      "Pet & Animals": "pet-and-animals",
      Other: "other",
      Commercial: "commercial",
    };
    return categoryRouteMap[category] || "search";
  };

  const getCallingFrom = (category) => {
    const callingFromMap = {
      Motors: "AutomotiveComp",
      Automotive: "AutomotiveComp",
      Electronics: "ElectronicComp",
      "Fashion Style": "FashionStyle",
      "Home & Furniture": "HealthCareComp",
      "Home & Furnituer": "HealthCareComp", // Handle typo variation
      "home & furniture": "HealthCareComp",
      "home-furniture": "HealthCareComp",
      HomeFurnitureContent: "HealthCareComp",
      HEALTHCARE: "HealthCareComp",
      "Job Board": "JobBoard",
      Realestate: "RealEstateComp",
      "Real Estate": "RealEstateComp",
      Services: "TravelComp",
      "Sport & Game": "SportGamesComp",
      "Sports & Game": "SportGamesComp", // Handle variation
      "Pet & Animals": "PetAnimalsComp",
      Other: "Education",
      Commercial: "Commercial",
    };
    return callingFromMap[category] || "AutomotiveComp";
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    if (!currentUserId) {
      setPopoverCarId(ad.id);
      setTimeout(() => setPopoverCarId(null), 3000);
      return;
    }
    onToggleBookmark && onToggleBookmark(ad.id);
  };

  const isActive = activePhoneIndex === ad.id;

  return (
    <>
      {/* Mobile Compact Card */}
      <div className="mobile-search-card">
        {popoverCarId === ad.id && (
          <div className="mobile-search-card-popover">
            Please log in to bookmark
          </div>
        )}

        <div className="mobile-search-card-content">
          {/* Image with Heart */}
          <div className="mobile-search-card-image">
            <div className="mobile-search-card-heart" onClick={handleBookmarkClick}>
              <FaHeart
                style={{
                  color:
                    isBookmarked ||
                    (currentUserId && ad.heartedby?.includes(currentUserId))
                      ? "red"
                      : "white",
                }}
              />
            </div>
            <Link
              to={`/Dynamic_Route?id=${ad.id}&callingFrom=${getCallingFrom(
                ad.ModalCategory || ad.category || ad.SubCategory || "Automotive"
              )}`}
            >
              <img
                src={imageUrl}
                alt={title || "Ad"}
                loading="lazy"
              />
            </Link>
          </div>

          {/* Details */}
          <div className="mobile-search-card-details">
            <Link
              to={`/Dynamic_Route?id=${ad.id}&callingFrom=${getCallingFrom(
                ad.ModalCategory || ad.category || ad.SubCategory || "Automotive"
              )}`}
              style={{ textDecoration: "none" }}
            >
              <h3 className="mobile-search-card-title">{title || "No Title"}</h3>
            </Link>

            <div className="mobile-search-card-price-location">
              <p className="mobile-search-card-price">
                {ad.Price ? (
                  <>
                    <img
                      src="https://www.sama.gov.sa/ar-sa/Currency/Documents/Saudi_Riyal_Symbol-2.svg"
                      alt="SAR"
                    />
                    {ad.Price}
                  </>
                ) : (
                  "Contact Us..."
                )}
              </p>

              <p className="mobile-search-card-location">
                <IoLocationOutline />
                <span>{city || t("common.location") || "Location"}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mobile-search-card-actions" style={{ position: 'relative' }}>
              {/* Phone Number Tooltip */}
              {isActive && ad.Phone && (
                <div className="mobile-search-card-phone-tooltip">
                  <span>{ad.Phone}</span>
                  <div className="tooltip-arrow"></div>
                </div>
              )}

              {/* Call Button */}
              {ad.showNumberChecked ? (
                ""
              ) : (
                <a href={`tel:${ad.Phone}`}>
                  <button
                    className={`mobile-search-card-btn mobile-search-card-btn-call ${
                      activeButton === "call" ? "active" : ""
                    }`}
                    onClick={(e) => {
                      setActiveButton("call");
                      if (!isActive) {
                        e.preventDefault();
                        setActivePhoneIndex(ad.id);
                      }
                    }}
                  >
                    <FaPhoneAlt />
                    <span>{t("listing.call")}</span>
                  </button>
                </a>
              )}

              {/* Message Button */}
              <button
                className={`mobile-search-card-btn mobile-search-card-btn-message ${
                  activeButton === "message" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveButton("message");
                  handleShowModal(ad.userId, ad.id);
                }}
              >
                <MdMessage /> {t("listing.message")}
              </button>

              {/* WhatsApp Button */}
              {ad.showNumberChecked ? (
                ""
              ) : (
                <a
                  href={`https://wa.me/${ad.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    className={`mobile-search-card-btn mobile-search-card-btn-whatsapp ${
                      activeButton === "whatsapp" ? "active" : ""
                    }`}
                    onClick={() => setActiveButton("whatsapp")}
                  >
                    <FaWhatsapp /> {t("listing.whatsapp")}
                  </button>
                </a>
              )}
            </div>

            <p className="mobile-search-card-time">
              {timeAgo(ad.timestamp || ad.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Card */}
      <Card
        key={ad.id}
        className="desktop-search-card"
        style={{
          padding: window.innerWidth <= 576 ? "10px 10px" : "0px 20px",
          marginBottom: "0px",
          paddingBottom: "0px",
          boxShadow: "none",
        }}
      >
        <Row className="g-0">
        <Col md={4} style={{ position: "relative" }}>
          {/* Featured Label */}
          {ad.FeaturedAds === "Featured Ads" && (
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                backgroundColor: "#36A680",
                color: "white",
                padding: "6px 12px",
                fontWeight: "bold",
                borderRadius: "8px",
                border: "2px solid #2c8e6f",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
                fontSize: "14px",
                zIndex: 2,
              }}
            >
              Featured
            </div>
          )}
          {/* Heart Icon */}
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "90%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              padding: "10px",
              zIndex: 3,
              cursor: "pointer",
            }}
            onClick={handleBookmarkClick}
          >
            <FaHeart
              style={{
                color:
                  isBookmarked ||
                  (currentUserId && ad.heartedby?.includes(currentUserId))
                    ? "red"
                    : "gray",
                fontSize: "30px",
              }}
            />
          </div>
          {popoverCarId === ad.id && (
            <div
              style={{
                position: "absolute",
                top: "-30px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#333",
                color: "#fff",
                padding: "8px 12px",
                borderRadius: "5px",
                fontSize: "14px",
                whiteSpace: "nowrap",
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              Please log in to bookmark
            </div>
          )}
          <Link
            to={`/Dynamic_Route?id=${ad.id}&callingFrom=${getCallingFrom(
              ad.ModalCategory || ad.category || ad.SubCategory || "Automotive"
            )}`}
          >
            {/* Image */}
            <Card.Img
              src={imageUrl}
              alt={title || "Ad"}
              loading="lazy"
              style={{
                width: "100%",
                height: "230px",
                objectFit: "cover",
                borderTopLeftRadius: "20px",
                borderBottomLeftRadius: "20px",
              }}
            />
          </Link>
        </Col>

        <Col md={8} className="filter_card_main">
          <Card.Body>
            <Card.Title
              className="title_head"
              style={{
                color: "#2D4495",
                marginTop: window.innerWidth <= 576 ? "-2px" : "0px",
              }}
            >
              <Link
                to={`/Dynamic_Route?id=${ad.id}&callingFrom=${getCallingFrom(
                  ad.ModalCategory || ad.category || ad.SubCategory || "Automotive"
                )}`}
              >
                {title || "No Title"}
              </Link>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "#1E55B4",
                }}
              >
                {ad.Price ? (
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
                    {ad.Price}
                  </>
                ) : (
                  "Price not available"
                )}
              </p>
            </Card.Title>
            <Card.Text style={{ color: "black" }}>
              <small className="text-muted">
                <IoLocationOutline
                  style={{
                    marginRight: "5px",
                    color: "#6c757d",
                  }}
                />
                <span style={{ color: "black" }}>{city || t("common.location") || "Location"}</span>
              </small>

              <br />
              <p className="car_desc">
                {description || "Description not available."}
              </p>
            </Card.Text>
            <Col
              className="align-items-center user_profile_block"
              style={{
                marginTop: window.innerWidth <= 576 ? "-10px" : "30px",
              }}
            >
              <div
                className="profile_image_block"
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  zIndex: 2,
                  color: "#2D4495",
                }}
              >
                <img
                  src={ad.photoURL || placeholderImage}
                  alt="User profile"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholderImage;
                  }}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: "2px solid white",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    display: "block",
                  }}
                />
              </div>
              {/* Updated text at the bottom-right corner */}
              <p
                style={{
                  marginTop: window.innerWidth <= 1100 ? "5px" : "54px",
                  color: "black",
                }}
              >
                {t("detailsPage.updated")} {timeAgo(ad.createdAt || ad.timestamp || ad.created_at)}
              </p>
              {/* Responsive layout for small screens */}
            </Col>
            <div className="d-flex align-items-center gap-2 mt-3 innerContainer2 head2btflex card_btn_wrap">
              {/* Call Now Button */}
              {ad.showNumberChecked ? (
                ""
              ) : (
                <a href={`tel:${ad.Phone}`}>
                  <button
                    className={`blue_btn list_btn ${
                      isActive ? "expanded" : ""
                    }`}
                    style={{
                      marginTop: window.innerWidth <= 576 ? "10px" : "50px",
                      width: window.innerWidth <= 576 ? "150px" : "auto",
                    }}
                    onClick={(e) => {
                      if (!isActive) {
                        e.preventDefault();
                        setActivePhoneIndex(ad.id);
                      }
                    }}
                  >
                    <FaPhoneAlt />
                    <span>{isActive ? ad.Phone : t("listing.callNow")}</span>
                  </button>
                </a>
              )}{" "}
              {/* Message Button */}
              <button
                className={`blue_btn list_btn ${
                  isActive ? "icon-only" : ""
                }`}
                style={{
                  marginTop: window.innerWidth <= 576 ? "5px" : "50px",
                  width: window.innerWidth <= 576 ? "150px" : "auto",
                }}
                onClick={() => handleShowModal(ad.userId, ad.id)}
              >
                <MdMessage />
                <span className="button-text">{t("listing.message")}</span>
              </button>
              {/* WhatsApp Button */}
              {ad.showNumberChecked ? (
                ""
              ) : (
                <a
                  href={`https://wa.me/${ad.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    className={`blue_btn list_btn ${
                      isActive ? "icon-only" : ""
                    }`}
                    style={{
                      marginTop: window.innerWidth <= 576 ? "5px" : "50px",
                      width: window.innerWidth <= 576 ? "150px" : "auto",
                    }}
                  >
                    <FaWhatsapp />
                    <span className="button-text">{t("listing.whatsapp")}</span>
                  </button>
                </a>
              )}
              <button
                className={`sign-in-button`}
                style={{
                  border: "1px solid #2D4495",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  cursor: "pointer",
                  color: "#2D4495",
                  width: "fit-content",
                  height: "fit-content",
                  padding: "9px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "5px",
                  marginBottom: "0px",
                  marginTop: window.innerWidth <= 576 ? "5px" : "50px",
                }}
              >
                <FaRegHeart
                  onClick={handleBookmarkClick}
                  style={{
                    color:
                      isBookmarked ||
                      (currentUserId && ad.heartedby?.includes(currentUserId))
                        ? "red"
                        : "#2D4495",
                    fontSize: "20px",
                  }}
                />
              </button>
              {/* Consolidated styles for all buttons */}
              <style jsx>{`
                .sign-in-button {
                  background-color: #0055a5;
                  color: white;
                  font-size: 12px;
                  font-weight: bold;
                  height: 40px;
                  border: none;
                  border-radius: 10px;
                  cursor: pointer;
                  text-transform: capitalize;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 8px;
                  transition: width 0.3s ease;
                }

                .sign-in-button:hover {
                  background-color: #004080;
                }

                .expanded {
                  width: 200px;
                  font-size: 16px;
                }

                .icon-only {
                  width: 50px;
                }

                .icon-only .button-text {
                  display: none;
                }

                a {
                  text-decoration: none;
                }
              `}</style>
            </div>
          </Card.Body>
        </Col>
      </Row>

        <Divider style={{
          margin: '20px 0',
          borderColor: '#e0e0e0',
          borderWidth: '1px'
        }} />
      </Card>

      {/* Shared Message Modal for both Mobile and Desktop */}
      <div
        className={`modal fade ${
          showModal ? "show d-block" : "d-none"
        }`}
        tabIndex="-1"
        role="dialog"
        style={{
          pointerEvents: showModal ? "auto" : "none",
        }}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          style={{
            maxWidth: "500px",
          }}
        >
          <div
            className="modal-content"
            style={{
              borderRadius: "15px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            <div
              className="modal-header"
              style={{
                backgroundColor: "#1E55B4",
                color: "white",
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
              }}
            >
              <h5 className="modal-title">Send Message</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={handleCloseModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {currentUserId && receiverId ? (
                <Mesagedeals
                  productId={ad.id}
                  productIds={productIds}
                  userId={currentUserId}
                  recieverId={receiverId}
                />
              ) : (
                <p>Please log in to send messages.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className="modal-backdrop fade show"
          onClick={handleCloseModal}
        ></div>
      )}
    </>
  );
};

export default SearchResultCard;
