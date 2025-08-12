import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { verified, chat, rating } from "../../imagepath";
import Header from "../../home/header";
import Footer from "../../home/footer/Footer";
import AutomativeCarousel from "./../../../components/home/ComercialsAds/ComercialsAds";
import LatestBlog from "../../../components/blog/BlogList/LatestBlog/LatestBlog";
import { db, auth } from "../../Firebase/FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { FaUserAlt, FaListUl, FaHeart } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { TbLogout2 } from "react-icons/tb";

const Dashboard = () => {
  const [filter, setFilter] = useState("All Listing");
  const [visitorReviews, setVisitorReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(2);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [userId, setUserId] = useState(null);
  const [Activelisting, setActivelisting] = useState(null);
  const [Message, setMessage] = useState(null);
  const navigate = useNavigate();

  const [userReviews1, setuserReviews1] = useState(null);
  const [chartFilter, setChartFilter] = useState("This Week"); // New state for chart filter
  const [chartData, setChartData] = useState([]);
  console.log(userReviews1, "userReviews1___________");
  const location = useLocation();
  useEffect(() => {
    if (!userId || !visitorReviews.length) {
      setChartData([0, 0, 0, 0, 0, 0, 0]); // Default empty data
      return;
    }

    // Filter reviews for the current user
    const userReviews = visitorReviews.filter(
      (review) => review.listingUserId === userId
    );

    // Initialize counts for each day (Sunday to Saturday)
    const weekDays = [0, 0, 0, 0, 0, 0, 0]; // Index 0 = Sunday, 6 = Saturday

    // Get current week's start and end (Sunday to Saturday)
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - dayOfWeek); // Set to Sunday
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to Saturday
    endOfWeek.setHours(23, 59, 59, 999);

    // Process reviews based on chart filter
    userReviews.forEach((review) => {
      const reviewDate = review.createdAt ? review.createdAt.toDate() : null;
      if (!reviewDate) return;

      // Check if review falls within the selected time frame
      let isWithinTimeFrame = false;
      if (chartFilter === "This Week") {
        isWithinTimeFrame =
          reviewDate >= startOfWeek && reviewDate <= endOfWeek;
      } else if (chartFilter === "Last Week") {
        const lastWeekStart = new Date(startOfWeek);
        lastWeekStart.setDate(startOfWeek.getDate() - 7);
        const lastWeekEnd = new Date(endOfWeek);
        lastWeekEnd.setDate(endOfWeek.getDate() - 7);
        isWithinTimeFrame =
          reviewDate >= lastWeekStart && reviewDate <= lastWeekEnd;
      } else if (chartFilter === "Last Month") {
        const lastMonthStart = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          1
        );
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        isWithinTimeFrame =
          reviewDate >= lastMonthStart && reviewDate <= lastMonthEnd;
      } else if (chartFilter === "Next Week") {
        // Optional: Skip or handle future data (no reviews expected)
        return;
      }

      if (isWithinTimeFrame) {
        const dayIndex = reviewDate.getDay(); // 0 (Sunday) to 6 (Saturday)
        weekDays[dayIndex]++;
      }
    });

    setChartData(weekDays);
  }, [visitorReviews, userId, chartFilter]);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Logs out the user
      console.log("User logged out successfully!");
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };
  const handleChartFilterChange = (newFilter) => {
    setChartFilter(newFilter);
  };

  // Chart options for weekly reviews
  const chartOptions = {
    series: [
      {
        name: "Reviews",
        data: chartData, // Dynamic data from useEffect
      },
    ],
    chart: {
      height: 350,
      type: "line", // Changed to line chart
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
      },
    },
    colors: ["#C10037"], // Match dashboard theme
    dataLabels: {
      enabled: true,
      formatter: (val) => val, // Show review count
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Number of Reviews",
      },
      min: 0,
      forceNiceScale: true,
      labels: {
        formatter: (val) => Math.floor(val), // Whole numbers only
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} reviews`,
      },
    },
  };
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
  const isInitialLoad = useRef(true);
  // Scroll to top on location change
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
      console.log("Scroll restoration set to manual");
    }
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      console.log(
        "Scrolled to top for location:",
        location.pathname,
        "scrollY:",
        window.scrollY
      );
    };
    scrollToTop();
    const timeout = setTimeout(scrollToTop, 100);
    if (isInitialLoad.current) {
      const interval = setInterval(() => {
        if (window.scrollY !== 0) {
          scrollToTop();
        }
      }, 50);
      setTimeout(() => clearInterval(interval), 1000);
      isInitialLoad.current = false;
    }
    return () => {
      clearTimeout(timeout);
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
        console.log("Scroll restoration reset to auto");
      }
    };
  }, [location]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const fetchTotalBookmarked = async () => {
      try {
        const response = await fetch(
          "http://168.231.80.24:9002/api/total-favourite?userId=xuo3iX8sQye2TT09WbW9OwnG0dB2"
        );
        const data = await response.json();
        setuserReviews1(data.totalBookmarked);
      } catch (error) {
        console.error("Error fetching total bookmarked:", error);
        setuserReviews1("Error");
      }
    };

    fetchTotalBookmarked();
  }, []);

  // Fetch reviews from Firebase in real-time
  useEffect(() => {
    const reviewsCollection = collection(db, "reviews");
    const unsubscribe = onSnapshot(
      reviewsCollection,
      (snapshot) => {
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
          const userReviews = reviewsList.filter(
            (review) => review.listingUserId === userId
          );
          console.log(
            "Total Reviews for User ID",
            userId,
            ":",
            userReviews.length
          );
          // setuserReviews1(userReviews.length)
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
      },
      (error) => {
        console.error("Error listening to reviews:", error);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  // Filter reviews based on selected filter
  useEffect(() => {
    const now = new Date();
    let filtered;

    if (filter === "Last Week") {
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = visitorReviews.filter((review) => {
        const reviewDate = review.createdAt
          ? review.createdAt.toDate()
          : new Date(0);
        return reviewDate >= oneWeekAgo && reviewDate <= now;
      });
    } else if (filter === "Last Month") {
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
      filtered = visitorReviews.filter((review) => {
        const reviewDate = review.createdAt
          ? review.createdAt.toDate()
          : new Date(0);
        return reviewDate >= lastMonthStart && reviewDate <= lastMonthEnd;
      });
    } else if (filter === "Last Year") {
      const lastYearStart = new Date(now.getFullYear() - 1, 0, 1);
      const lastYearEnd = new Date(now.getFullYear() - 1, 11, 31);
      filtered = visitorReviews.filter((review) => {
        const reviewDate = review.createdAt
          ? review.createdAt.toDate()
          : new Date(0);
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
  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://168.231.80.24:9002/api/total-data-count"
        );
        const data = await response.json();
        setActivelisting(data.totalCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetch function
    fetchData();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "http://168.231.80.24:9002/api/total-messages"
        );
        const data = await response.json();
        console.log("Total Messages:", data);
        setMessage(data.unseenMessagesCount);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);
  return (
    <div className="main-wrapper">
      <Header />
      <div
        className="dashboard-content"
        style={{
          marginTop: "5rem",
        }}
      >
        <div className="container">
          <div className="">
            <ul className="dashborad-menus">
              <li className="active">
                <Link to="/dashboard">
                  <MdDashboard /> <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <FaUserAlt /> <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/my-listing">
                  <FaListUl /> <span>My Listing</span>
                </Link>
              </li>
              <li>
                <Link to="/bookmarks">
                  <FaHeart /> <span>Favourite</span>
                </Link>
              </li>
              <li>
                <Link to="/messages">
                  <TiMessages /> <span>Messages</span>
                </Link>
              </li>
              {/* <li>
                           <Link to="/reviews">
                             <i className="fas fa-solid fa-star" /> <span>Reviews</span>
                           </Link>
                         </li> */}
              <li>
                <Link className="dropdown-item" to="#" onClick={handleLogout}>
                  <TbLogout2 />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="dashboard-details">
            <div className="row g-2">
              <div
                className="col-lg-6 col-md-6 col-6"
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
                      <div>{Activelisting ?? 0}</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div
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
              </div> */}
              <div
                className="col-lg-6 col-md-6 col-6"
                // style={{
                // 	flex: "0 0 auto",
                // 	minWidth: "100px",
                // 	marginTop: windowWidth <= 576 ? "-15px" : "8px",
                // }}
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
                      <div>{Message ?? 0}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="row dashboard-info">
              <div className="col-lg-6 d-flex">
                <div className="card dash-cards w-100">
                  <div className="card-header">
                    <h4>Weekly Reviews</h4>
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
                            <span>{chartFilter}</span>
                          </Link>
                          <div className="dropdown-menu dropdown-menu-end">
                            <Link
                              className="dropdown-item"
                              to="#"
                              onClick={() =>
                                handleChartFilterChange("This Week")
                              }
                            >
                              This Week
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                              onClick={() =>
                                handleChartFilterChange("Last Week")
                              }
                            >
                              Last Week
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                              onClick={() =>
                                handleChartFilterChange("Last Month")
                              }
                            >
                              Last Month
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                              onClick={() =>
                                handleChartFilterChange("Next Week")
                              }
                            >
                              Next Week
                            </Link>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-body">
                    <div id="review-chart">
                      <ReactApexChart
                        options={chartOptions}
                        series={chartOptions.series}
                        type="line"
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
                            ownerReviews
                              .slice(0, visibleCount)
                              .map((review) => (
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
                    {userId &&
                      filteredReviews.filter(
                        (review) => userId === review.listingUserId
                      ).length > visibleCount && (
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
            </div> */}
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
