import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import {
  verified,
  chat,
  rating,
} from "../../imagepath";
import Header from "../../home/header";
import Footer from "../../home/footer/Footer";
import AutomativeCarousel from "./../../../components/home/ComercialsAds/ComercialsAds";
import LatestBlog from "../../../components/blog/BlogList/LatestBlog/LatestBlog";
import { db, auth } from "../../Firebase/FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

const Dashboard = () => {
  const [filter, setFilter] = useState("All Listing");
  const [visitorReviews, setVisitorReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(2);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [userId, setUserId] = useState(null);
  const [userReviews1, setuserReviews1] = useState(null);
console.log(userReviews1,"userReviews1___________")
  const location = useLocation();

  // Fetch current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUserId(currentUser.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Scroll to top on location change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch reviews from Firebase in real-time
  useEffect(() => {
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
     
      if (userId) {
        const userReviews = reviewsList.filter((review) => review.listingUserId === userId);
        console.log("Total Reviews for User ID", userId, ":", userReviews.length);
        setuserReviews1(userReviews.length)
      } else {
        console.log("No user logged in, cannot filter reviews by user ID");
      }


      console.log("=== Dashboard Visitor Reviews ===");
      console.log(`Total Reviews: ${reviewsList.length}`);
      reviewsList.forEach((review, index) => {
        console.log(`Review ${index + 1}:`, {
          id: review.id,
          adId: review.adId,
          name: review.name,
          review: review.review,
          rating: review.rating,
          date: review.date,
          by: review.by,
          listingUserId: review.listingUserId || "Not found",
          createdAt: review.createdAt?.toDate().toLocaleString(),
        });
      });
      console.log("========================");
    }, (error) => {
      console.error("Error listening to reviews:", error);
    });

    return () => unsubscribe();
  }, [userId]);

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
      filtered = visitorReviews;
    }

    setFilteredReviews(filtered);
    setVisibleCount(2);
  }, [filter, visitorReviews]);

  const loadMoreReviews = () => {
    setVisibleCount((prevCount) => prevCount + 2);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Chart options (unchanged)
  const optionss = {
    series: [
      {
        name: "Series 1",
        data: [80, 50, 30, 40, 100, 20],
      },
      {
        name: "Series 2",
        data: [20, 30, 40, 80, 20, 80],
      },
      {
        name: "Series 3",
        data: [44, 76, 78, 13, 43, 10],
      },
    ],
    colors: ["#666666", "#C10037", "#666666"],
    chart: {
      height: 350,
      type: "radar",
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1,
      },
      dataLabels: {
        enabled: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.1,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
    },
  };

  return (
    <div className="main-wrapper">
      <Header />
      <div
        className="dashboard-content"
        style={{
          marginTop: windowWidth <= 576 ? "6rem" : "8rem",
        }}
      >
        <div className="container">
          <div
            className="col-12 text-start text-dark"
            style={{ fontSize: 26, fontWeight: 500 }}
          >
            Home / Dashboard
          </div>

          <div className="">
            <ul className="dashborad-menus">
              <li className="active">
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
              <li>
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

          <div className="dashboard-details">
            <div className="row g-2">
              <div
                className="col-lg-4 col-md-4 col-6"
                style={{ flex: "0 0 auto", minWidth: "100px" }}
              >
                <div className="card dash-cards">
                  <div className="card-body">
                    <div className="dash-top-content">
                      <div className="dashcard-img">
                        <img src={verified} className="img-fluid" alt="" />
                      </div>
                    </div>
                    <div className="dash-widget-info">
                      <h6>Active Listing</h6>
                      <div>500</div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-4 col-6"
                style={{ flex: "0 0 auto", minWidth: "100px" }}
              >
                <div className="card dash-cards">
                  <div className="card-body">
                    <div className="dash-top-content">
                      <div className="dashcard-img">
                        <img src={rating} className="img-fluid" alt="" />
                      </div>
                    </div>
                    <div className="dash-widget-info">
                      <h6>Total Reviews</h6>
                      <div>{userReviews1}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-4 col-12"
                style={{
                  flex: "0 0 auto",
                  minWidth: "100px",
                  marginTop: windowWidth <= 576 ? "-15px" : "8px",
                }}
              >
                <div className="card dash-cards">
                  <div className="card-body">
                    <div className="dash-top-content">
                      <div className="dashcard-img">
                        <img src={chat} className="img-fluid" alt="" />
                      </div>
                    </div>
                    <div className="dash-widget-info">
                      <h6>Messages</h6>
                      <div>15</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row dashboard-info">
              <div className="col-lg-6 d-flex">
                <div className="card dash-cards w-100">
                  <div className="card-header">
                    <h4>Page Views</h4>
                    <div className="card-dropdown">
                      <ul>
                        <li className="nav-item dropdown has-arrow logged-item">
                          <Link
                            to="#"
                            className="dropdown-toggle pageviews-link"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{ textDecoration: "none" }}
                          >
                            <span>This week</span>
                          </Link>
                          <div className="dropdown-menu dropdown-menu-end">
                            <Link className="dropdown-item" to="javascript:void();">
                              Next Week
                            </Link>
                            <Link className="dropdown-item" to="javascript:void();">
                              Last Month
                            </Link>
                            <Link className="dropdown-item" to="javascript:void();">
                              Next Month
                            </Link>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-body">
                    <div id="review-chart">
                      <ReactApexChart
                        options={optionss}
                        series={optionss.series}
                        type="radar"
                        height={350}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 d-flex">
                <div className="card dash-cards w-100">
                  <div className="card-header">
                    <h4>Visitor Review</h4>
                    <div className="card-dropdown">
                      <ul>
                        <li className="nav-item dropdown has-arrow logged-item">
                          <Link
                            to="#"
                            className="dropdown-toggle pageviews-link"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{ textDecoration: "none" }}
                          >
                            <span>{filter}</span>
                          </Link>
                          <div className="dropdown-menu dropdown-menu-end">
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
                  <div className="card-body" style={{ marginLeft: -30 }}>
                    <ul className="review-list">
                      {userId ? (
                        (() => {
                          const ownerReviews = filteredReviews.filter(
                            (review) => userId === review.listingUserId
                          );
                          return ownerReviews.length > 0 ? (
                            ownerReviews.slice(0, visibleCount).map((review) => (
                              <li className="review-box" key={review.id}>
                                <div className="review-details">
                                  <h6>{review.name}</h6>
                                  <div className="rating">
                                    <div className="rating-star">
                                      {[...Array(5)].map((_, i) => (
                                        <i
                                          key={i}
                                          className={`fas fa-star ${
                                            i < review.rating ? "filled" : ""
                                          }`}
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
                              <p>No product found</p>
                            </li>
                          );
                        })()
                      ) : (
                        <li className="review-box">
                          <p>No product found</p>
                        </li>
                      )}
                    </ul>
                    {userId && filteredReviews.filter((review) => userId === review.listingUserId).length > visibleCount && (
                      <div className="text-center mt-3">
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
          </div>
        </div>
      </div>
      <AutomativeCarousel />
      <LatestBlog />
      <Footer />
    </div>
  );
};

export default Dashboard;