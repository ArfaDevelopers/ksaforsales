import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ProfileAvatar01,
  ProfileAvatar02,
  ProfileAvatar11,
  profile_img,
  review_1,
  review_2,
  review_3,
  review_4,
} from "../../imagepath";
import UserHeader from "../Userheader";
import Footer from "../../home/footer/Footer";
import Header from "../../home/header";
import { db } from "../../Firebase/FirebaseConfig";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

const Review = () => {
  const [change, setChange] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [visitorReviews, setVisitorReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [filter, setFilter] = useState("All Listing");
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    // Set up real-time listener for reviews
    const reviewsCollection = collection(db, "reviews");
    const unsubscribe = onSnapshot(reviewsCollection, (snapshot) => {
      const reviewsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort reviews by createdAt date (newest first)
      reviewsList.sort((a, b) => {
        const dateA = a.createdAt ? a.createdAt.toDate() : new Date(0);
        const dateB = b.createdAt ? b.createdAt.toDate() : new Date(0);
        return dateB - dateA;
      });

      setVisitorReviews(reviewsList);
      setFilteredReviews(reviewsList);

      console.log("=== All Visitor Reviews ===");
      console.log(`Total Reviews: ${reviewsList.length}`);
      reviewsList.forEach((review, index) => {
        console.log(`Review ${index + 1}:`, {
          id: review.id,
          adId: review.adId,
          name: review.name,
          email: review.email,
          review: review.review,
          rating: review.rating,
          date: review.date,
          by: review.by,
          likes: review.likes,
          dislikes: review.dislikes,
          replies: review.replies || [],
          userId: review.userId,
          createdAt: review.createdAt?.toDate().toLocaleString(),
        });
      });
      console.log("========================");
    }, (error) => {
      console.error("Error listening to reviews:", error);
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const now = new Date();
    let filtered;

    if (filter === "Last Week") {
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = visitorReviews.filter((review) => {
        const reviewDate = review.createdAt ? review.createdAt.toDate() : new Date(0);
        return reviewDate >= oneWeekAgo && reviewDate <= now;
      });
    } else if (filter === "Last Month") {
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
      filtered = visitorReviews.filter((review) => {
        const reviewDate = review.createdAt ? review.createdAt.toDate() : new Date(0);
        return reviewDate >= lastMonthStart && reviewDate <= lastMonthEnd;
      });
    } else if (filter === "Last Year") {
      const lastYearStart = new Date(now.getFullYear() - 1, 0, 1);
      const lastYearEnd = new Date(now.getFullYear() - 1, 11, 31);
      filtered = visitorReviews.filter((review) => {
        const reviewDate = review.createdAt ? review.createdAt.toDate() : new Date(0);
        return reviewDate >= lastYearStart && reviewDate <= lastYearEnd;
      });
    } else {
      filtered = visitorReviews;
    }

    setFilteredReviews(filtered);
    setVisibleCount(4);
  }, [filter, visitorReviews]);

  const loadMoreReviews = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setChange(false);
  };

  return (
    <>
      <Header />
      <div
        className="dashboard-content"
        style={{
          marginTop: "8rem",
        }}
      >
        <div className="container">
          <div
            className="col-12 text-start text-dark"
            style={{ fontSize: "26px", fontWeight: 500 }}
          >
            Home / Reviews
          </div>

          <div className="">
            <ul className="dashborad-menus">
              <li>
                <Link to="/dashboard">
                  <i className="feather-grid" /> <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <i className="fa-solid fa-user" /> <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/my-listing">
                  <i className="feather-list" /> <span>My Listing</span>
                </Link>
              </li>
              <li>
                <Link to="/messages">
                  <i className="fa-solid fa-comment-dots" /> <span>Messages</span>
                </Link>
              </li>
              <li className="active">
                <Link to="/reviews">
                  <i className="fas fa-solid fa-star" /> <span>Reviews</span>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <i className="fas fa-light fa-circle-arrow-left" /> <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>

          <div
            className="review-box-container"
            style={{
              backgroundColor: "#f8f9fa",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: window.innerWidth <= 576 ? "3rem" : "0rem",
            }}
          >
            <div
              className="card-header"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 20px",
              }}
            >
              <h1 style={{ margin: "20px", fontSize: "24px", fontWeight: 600 }}>
                All Review
              </h1>
              <div
                className="card-dropdown"
                style={{ position: "relative" }}
              >
                <ul
                  className="nav"
                  style={{ listStyle: "none", padding: 0, margin: 0 }}
                >
                  <li
                    className="nav-item dropdown has-arrow logged-item"
                    style={{ position: "relative" }}
                  >
                    <Link
                      to="#"
                      className="dropdown-toggle pageviews-link"
                      data-bs-toggle="dropdown"
                      aria-expanded={change}
                      onClick={() => setChange(!change)}
                      style={{
                        textDecoration: "none",
                        color: "#000",
                        padding: "8px 16px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        display: "inline-block",
                      }}
                    >
                      <span>{filter}</span>
                    </Link>
                    <div
                      className={`dropdown-menu dropdown-menu-end ${change ? "show" : ""}`}
                      style={{
                        position: "absolute",
                        top: "100%",
                        right: 0,
                        backgroundColor: "#fff",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        borderRadius: "4px",
                        display: change ? "block" : "none",
                        zIndex: 1000,
                      }}
                    >
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={() => handleFilterChange("All Listing")}
                        style={{
                          display: "block",
                          padding: "8px 16px",
                          textDecoration: "none",
                          color: "#000",
                        }}
                      >
                        All Listing
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={() => handleFilterChange("Last Week")}
                        style={{
                          display: "block",
                          padding: "8px 16px",
                          textDecoration: "none",
                          color: "#000",
                        }}
                      >
                        Last Week
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={() => handleFilterChange("Last Month")}
                        style={{
                          display: "block",
                          padding: "8px 16px",
                          textDecoration: "none",
                          color: "#000",
                        }}
                      >
                        Last Month
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={() => handleFilterChange("Last Year")}
                        style={{
                          display: "block",
                          padding: "8px 16px",
                          textDecoration: "none",
                          color: "#000",
                        }}
                      >
                        Last Year
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="card dash-cards"
              style={{
                border: "none",
                borderRadius: "8px",
                backgroundColor: "#f8f9fa",
                padding: "0px",
              }}
            >
              <div
                className="card-header"
                style={{
                  padding: "15px",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                {/* Inline <style> tag for media query */}
                <style>
                  {`
                    @media (max-width: 768px) {
                      .your-reviews {
                        display: none;
                      }
                    }
                  `}
                </style>
                <div
                  className="row"
                  style={{ margin: 0 }}
                >
                  <div
                    className="col-lg-6"
                    style={{ padding: 0 }}
                  >
                    <h4
                      style={{
                        margin: 0,
                        fontSize: "18px",
                        fontWeight: 500,
                      }}
                    >
                      Visitor Review
                    </h4>
                  </div>
                  <div
                    className="col-lg-6 your-reviews"
                    style={{ padding: 0 }}
                  >
                    <h4
                      style={{
                        margin: 0,
                        fontSize: "18px",
                        fontWeight: 500,
                      }}
                    >
                      Your Reviews
                    </h4>
                  </div>
                </div>
              </div>
              <div
                className="card-body"
                style={{ padding: "0" }}
              >
                {filteredReviews.length > 0 ? (
                  filteredReviews.slice(0, visibleCount).map((review) => (
                    <div
                      key={review.id}
                      className="row"
                      style={{
                        display: "flex",
                        alignItems: "stretch",
                        margin: "0",
                        borderBottom: "1px solid #e0e0e0",
                        padding: "10px 0",
                      }}
                    >
                      {/* Visitor Review Box */}
                      <div
                        className="col-lg-6 d-flex"
                        style={{ padding: "0 15px" }}
                      >
                        <div
                          className="review-box"
                          style={{
                            display: "flex",
                            flex: 1,
                            padding: "10px",
                            backgroundColor: "#fff",
                            borderRadius: "5px",
                            transition: "all 0.3s ease",
                          }}
                        >
                          <div
                            className="review-details"
                            style={{ flex: 1 }}
                          >
                            <h6
                              style={{
                                margin: "0 0 5px",
                                fontSize: "16px",
                                fontWeight: 500,
                              }}
                            >
                              {review.name}
                            </h6>
                            <div
                              className="rating"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "5px",
                              }}
                            >
                              <div
                                className="rating-star"
                                style={{ display: "flex", gap: "2px" }}
                              >
                                {[...Array(5)].map((_, i) => (
                                  <i
                                    key={i}
                                    className={`fas fa-star`}
                                    style={{
                                      color: i < review.rating ? "#f5c518" : "#ccc",
                                      fontSize: "14px",
                                    }}
                                  />
                                ))}
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "5px",
                                  fontSize: "14px",
                                  color: "#666",
                                }}
                              >
                                <i
                                  className="fa-sharp fa-solid fa-calendar-days"
                                  style={{ color: "#ff0000" }}
                                />
                                {review.date}
                              </div>
                            </div>
                            <p
                              style={{
                                margin: "5px 0",
                                fontSize: "14px",
                                color: "#666",
                              }}
                            >
                              Product Id: {review.adId}
                            </p>
                            <p
                              style={{
                                margin: "5px 0",
                                fontSize: "14px",
                                color: "#333",
                              }}
                            >
                              {review.review}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Your Review (Reply) Box */}
                      <div
                        className="col-lg-6 d-flex"
                        style={{ padding: "0 15px" }}
                      >
                        <div
                          className="review-box"
                          style={{
                            display: "flex",
                            flex: 1,
                            padding: "10px",
                            backgroundColor: "#fff",
                            borderRadius: "5px",
                            transition: "all 0.3s ease",
                          }}
                        >
                          <div
                            className="review-details"
                            style={{ flex: 1 }}
                          >
                            {review.replies && review.replies.length > 0 ? (
                              review.replies.map((reply, index) => (
                                <div key={index}>
                                  <h6
                                    style={{
                                      margin: "0 0 5px",
                                      fontSize: "16px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {reply.by}
                                  </h6>
                                  <div
  className="rating"
  style={{
    display: "flex",
    justifyContent: "flex-end", // Align content to the right
    alignItems: "center",
    marginBottom: "5px",
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "5px",
      fontSize: "14px",
      color: "#666",
    }}
  >
    <i
      className="fa-sharp fa-solid fa-calendar-days"
      style={{ color: "#ff0000" }}
    />
    {reply.date}
  </div>
</div>
                                  <p
                                    style={{
                                      margin: "5px 0",
                                      fontSize: "14px",
                                      color: "#333",
                                    }}
                                  >
                                    {reply.reply}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <p
                                style={{
                                  fontStyle: "italic",
                                  color: "#888",
                                  margin: "5px 0",
                                  fontSize: "14px",
                                }}
                              >
                                No reply from client
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    className="row"
                    style={{ margin: 0 }}
                  >
                    <div
                      className="col-lg-6"
                      style={{ padding: "15px" }}
                    >
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#666",
                          margin: 0,
                        }}
                      >
                        No reviews available.
                      </p>
                    </div>
                    <div
                      className="col-lg-6"
                      style={{ padding: "15px" }}
                    >
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#666",
                          margin: 0,
                        }}
                      >
                        No replies available.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {filteredReviews.length > visibleCount && (
                <div
                  className="text-center mt-3"
                  style={{ marginTop: "20px" }}
                >
                  <button
                    className="btn"
                    onClick={loadMoreReviews}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#2d4495",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Review;