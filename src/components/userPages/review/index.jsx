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
import { db } from "../../Firebase/FirebaseConfig"; // Import your Firebase config
import { collection, getDocs } from "firebase/firestore"; // Firestore methods

const Review = () => {
  const [change, setChange] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [visitorReviews, setVisitorReviews] = useState([]); // State to store fetched reviews
  const [filteredReviews, setFilteredReviews] = useState([]); // State to store filtered reviews
  const [visibleCount, setVisibleCount] = useState(4); // Number of reviews to show
  const [filter, setFilter] = useState("All Listing"); // State to track selected filter
  const location = useLocation();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll to top on location change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Fetch and sort reviews from Firestore
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsCollection = collection(db, "reviews");
        const reviewsSnapshot = await getDocs(reviewsCollection);
        const reviewsList = reviewsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort reviews by createdAt (descending)
        reviewsList.sort((a, b) => {
          const dateA = a.createdAt ? a.createdAt.toDate() : new Date(0);
          const dateB = b.createdAt ? b.createdAt.toDate() : new Date(0);
          return dateB - dateA;
        });

        setVisitorReviews(reviewsList);
        setFilteredReviews(reviewsList); // Initially show all reviews

        // Log reviews to console for verification
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
            replies: review.replies,
            userId: review.userId,
            createdAt: review.createdAt?.toDate().toLocaleString(),
          });
        });
        console.log("========================");
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  // Filter reviews based on selected filter
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
      filtered = visitorReviews; // Show all reviews for "All Listing"
    }

    setFilteredReviews(filtered);
    setVisibleCount(4); // Reset visible count when filter changes
  }, [filter, visitorReviews]);

  // Load more reviews
  const loadMoreReviews = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  // Handle filter selection
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setChange(false); // Close dropdown after selection
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
          <div className="col-12 text-start text-dark" style={{ fontSize: 26, fontWeight: 500 }}>
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
            <div className="card-header d-flex align-items-center justify-content-between">
              <h1 style={{ margin: 20 }}>All Review</h1>
              <div className="card-dropdown">
                <ul className="nav">
                  <li className="nav-item dropdown has-arrow logged-item">
                    <Link
                      to="#"
                      className="dropdown-toggle pageviews-link"
                      data-bs-toggle="dropdown"
                      aria-expanded={change}
                      onClick={() => setChange(!change)}
                    >
                      <span>{filter}</span>
                    </Link>
                    <div
                      className={`dropdown-menu dropdown-menu-end ${change ? "show" : ""}`}
                    >
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={() => handleFilterChange("All Listing")}
                      >
                        All Listing
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={() => handleFilterChange("Last Week")}
                      >
                        Last Week
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={() => handleFilterChange("Last Month")}
                      >
                        Last Month
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={() => handleFilterChange("Last Year")}
                      >
                        Last Year
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row dashboard-info reviewpage-content">
              {/* Visitor Review Section */}
              <div className="col-lg-6 d-flex">
                <div className="card dash-cards">
                  <div className="card-header">
                    <h4>Visitor Review</h4>
                  </div>
                  <div className="card-body" style={{ marginLeft: -30 }}>
                    <ul className="review-list">
                      {filteredReviews.length > 0 ? (
                        filteredReviews.slice(0, visibleCount).map((review) => (
                          <li key={review.id} className="review-box">
                            <div className="review-profile">
                              <div className="review-img">
                                <img
                                  src={ProfileAvatar11}
                                  className="img-fluid"
                                  alt="img"
                                />
                              </div>
                            </div>
                            <div className="review-details">
                              <h6>{review.name}</h6>
                              <div className="rating">
                                <div className="rating-star">
                                  {[...Array(5)].map((_, i) => (
                                    <i
                                      key={i}
                                      className={`fas fa-star ${i < review.rating ? "filled" : ""}`}
                                    />
                                  ))}
                                </div>
                                <div>
                                  <i className="fa-sharp fa-solid fa-calendar-days" />{" "}
                                  {review.date}
                                </div>
                              </div>
                              <p>{review.review}</p>
                            </div>
                          </li>
                        ))
                      ) : (
                        <li className="review-box">
                          <p>No reviews available.</p>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Your Reviews Section (Only Replies) */}
              <div className="col-lg-6 d-flex">
                <div className="card dash-cards">
                  <div className="card-header">
                    <h4>Your Reviews</h4>
                  </div>
                  <div className="card-body" style={{ marginLeft: -30 }}>
                    <ul className="review-list">
                      {filteredReviews.length > 0 ? (
                        filteredReviews.slice(0, visibleCount).map((review) => (
                          <li key={review.id} className="review-box">
                            <div className="review-details">
                              <div className="replies" style={{ height: "108px" }}>
                                {review.replies && review.replies.length > 0 ? (
                                  review.replies.map((reply, index) => (
                                    <div
                                      key={index}
                                      style={{
                                        backgroundColor: "#f9f9f9",
                                        borderRadius: "5px",
                                        marginBottom: "5px",
                                      }}
                                    >
                                      <div className="review-details">
                                        <h6>{reply.by}</h6>
                                        <div className="rating">
                                          <div className="rating-star">
                                            {[...Array(5)].map((_, i) => (
                                              <i
                                                key={i}
                                                className={`fas fa-star ${i < review.rating ? "filled" : ""}`}
                                              />
                                            ))}
                                          </div>
                                          <div>
                                            <i className="fa-sharp fa-solid fa-calendar-days" />{" "}
                                            {review.date}
                                          </div>
                                        </div>
                                        <p>{reply.reply}</p>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <p
                                    style={{
                                      fontStyle: "italic",
                                      color: "#888",
                                      marginLeft: "20px",
                                    }}
                                  >
                                    No reply from client
                                  </p>
                                )}
                              </div>
                            </div>
                          </li>
                        ))
                      ) : (
                        <li className="review-box">
                          <p>No replies available.</p>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {filteredReviews.length > visibleCount && (
              <div className="text-center mt-3">
                <button
                  className="btn"
                  onClick={loadMoreReviews}
                  style={{ padding: "10px 20px", backgroundColor: "#2d4495", color: "white" }}
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Review;