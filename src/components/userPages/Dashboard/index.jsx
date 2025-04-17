import React from "react";
import {
  ProfileAvatar01,
  ProfileAvatar11,
  bookmark,
  chat,
  rating,
  verified,
} from "../../imagepath";
import Header from "../../home/header";
import Footer from "../../home/footer/Footer";
import { Link, useLocation } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { useState,useEffect } from "react";

import AutomativeCarousel from "./../../../components/home/ComercialsAds/ComercialsAds";
import LatestBlog from "../../../components/blog/BlogList/LatestBlog/LatestBlog";

const Dashboard = () => {
  const [change, setChange] = useState(false);
  const [change1, setChange1] = useState(false);
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
        "Fridau",
      ],
    },
  };

  const parms = useLocation().pathname;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
 <div className="main-wrapper">
 <Header />
      <div
        className="dashboard-content"
        style={{
          marginTop: window.innerWidth <= 576 ? "6rem" : "8rem"
        }}
      >
        <div className="container">
          <div class="col-12 text-start text-dark " style={{fontSize:26,fontWeight:500}}>Home / Dashboard</div>

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
              {/* <li>
                <Link to="/bookmarks">
                  <i className="fas fa-solid fa-heart" /> <span>Favourite</span>
                </Link>
              </li> */}
              <li>
                <Link to="/messages">
                  <i className="fa-solid fa-comment-dots" />{" "}
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link to="/reviews">
                  <i className="fas fa-solid fa-star" /> <span>Reviews</span>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <i className="fas fa-light fa-circle-arrow-left" />{" "}
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="dashboard-details">
          <div className="row g-2">
              <div className="col-lg-4 col-md-4 col-6" style={{ flex: '0 0 auto', minWidth: '100px' }}>
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
  <div className="col-lg-4 col-md-4 col-6" style={{ flex: '0 0 auto', minWidth: '100px' }}>
    <div className="card dash-cards">
      <div className="card-body">
        <div className="dash-top-content">
          <div className="dashcard-img">
            <img src={rating} className="img-fluid" alt="" />
          </div>
        </div>
        <div className="dash-widget-info">
          <h6>Total Reviews</h6>
          <div>15230</div>
        </div>
      </div>
    </div>
  </div>
  <div className="col-lg-4 col-md-4 col-12" style={{ flex: '0 0 auto', minWidth: '100px', marginTop: window.innerWidth <= 576 ? "-15px" : "8px" }}>
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
                        <li className="nav-item dropdown has-arrow logged-item " >
                          <Link
                            to="#"
                            className="dropdown-toggle pageviews-link"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            onClick={() => setChange(!change)}
                            style={{ textDecoration: "none" }}
                          >
                            <span>This week</span>
                          </Link>
                          <div
                            className={`${
                              change === true
                                ? "dropdown-menu dropdown-menu-end show"
                                : "dropdown-menu dropdown-menu-end"
                            }`}
                          >
                            <Link
                              className="dropdown-item"
                              to="javascript:void();"
                            >
                              Next Week
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="javascript:void()"
                            >
                              Last Month
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="javascript:void()"
                            >
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
                            onClick={() => setChange1(!change1)}
                            style={{ textDecoration: "none" }}
                          >
                            <span>All Listing</span>
                          </Link>
                          <div
                            className={`${
                              change1 === true
                                ? "dropdown-menu dropdown-menu-end show"
                                : "dropdown-menu dropdown-menu-end"
                            }`}
                          >
                            <Link className="dropdown-item" to="#">
                              Next Week
                            </Link>
                            <Link className="dropdown-item" to="#">
                              Last Month
                            </Link>
                            <Link className="dropdown-item" to="#">
                              Next Month
                            </Link>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-body" style={{marginLeft:-30}}>
                    <ul className="review-list">
                      <li className="review-box">
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
                          <h6>Joseph</h6>
                          <div className="rating">
                            <div className="rating-star">
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                            </div>
                            <div>
                              <i className="fa-sharp fa-solid fa-calendar-days" />{" "}
                              4 months ago
                            </div>
                            <div>by: Demo Test</div>
                          </div>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. It has been the industry's
                            standard dummy.
                          </p>
                        </div>
                      </li>
                      <li className="review-box">
                        <div className="review-profile">
                          <div className="review-img">
                            <img
                              src={ProfileAvatar01}
                              className="img-fluid"
                              alt="img"
                            />
                          </div>
                        </div>
                        <div className="review-details">
                          <h6>Dev</h6>
                          <div className="rating">
                            <div className="rating-star">
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                            </div>
                            <div>
                              <i className="fa-sharp fa-solid fa-calendar-days" />{" "}
                              4 months ago
                            </div>
                            <div>by: Demo Test</div>
                          </div>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. It has been the industry's
                            standard dummy.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AutomativeCarousel/>
      <LatestBlog/>
      </div>
     
      {/* /Dashboard Content */}
      <Footer />
    </>
  );
};
export default Dashboard;
