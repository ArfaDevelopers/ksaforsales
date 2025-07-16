import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Table } from "antd";
import { Modal, Button, Row, Col, Card, Form } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../Firebase/FirebaseConfig";
import Loading1 from "../../../../public/Progress circle.png";
import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import Spinner from "react-bootstrap/Spinner";
import { FaHeart } from "react-icons/fa";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import UserHeader from "../Userheader";
import Header from "../../home/header";
import { signOut } from "firebase/auth";
import Footer from "../../home/footer/Footer";
import { ProfileAvatar02, eye } from "../../imagepath";
import axios from "axios";

const MySwal = withReactContent(Swal);

const Bookmarks = () => {
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({});
  const [itemCategory, setItemCategory] = useState("");
  const [itemId, setItemId] = useState(null);
  const [FormDataView, setFormDataView] = useState({});
  const [view, setView] = useState(false);
  const [sortOrder, setSortOrder] = useState("Newest");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Logs out the user
      console.log("User logged out successfully!");
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };
  const categoryMapping = {
    "Sports & Game": "SPORTSGAMESComp",
    Electronics: "ELECTRONICS",
    "Fashion Style": "FASHIONComp",
    "Job board": "JOBBOARD",
    "Real Estate": "REALESTATECOMP",
    Education: "Education",
    Travel: "TRAVEL",
    "Pet & Animal": "PETANIMALCOMP",
    "Health Care": "HEALTHCARE",
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        localStorage.setItem(user.uid, "user.uid1");
      } else {
        console.log("No user is logged in. Redirecting to /login...");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchBookmarkedListings = async () => {
      setLoading(true);
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log("No user logged in");
          setLoading(false);
          return;
        }

        const userId = user.uid;

        const response = await axios.get(
          `http://168.231.80.24:9002/currentUserData/bookmarked-listings`,
          {
            params: {
              userId,
              sortOrder,
              page: currentPage,
              limit: pageSize,
            },
          }
        );
        console.log(response, "normalizedData____________1");

        const { data, totalPages, total } = response.data;
        const normalizedData = data.map((item) => ({
          ...item,
          isActive: item.isActive ?? false,
        }));
        console.log(normalizedData, "normalizedData____________");
        console.log(data, "normalizedData____________data");

        setCars(normalizedData);
        setFilteredCars(normalizedData);
        setTotalItems(total);

        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching bookmarked listings from API:", error);
        setError("Failed to fetch bookmarked data");
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedListings();
  }, [currentPage, sortOrder]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredCars(cars.filter((val) => val.bookmarked === true));
      return;
    }

    const lowercasedQuery = searchQuery.toLowerCase();
    const filteredResults = cars.filter(
      (car) =>
        car.bookmarked === true &&
        (car.title?.toLowerCase().includes(lowercasedQuery) ||
          car.description?.toLowerCase().includes(lowercasedQuery))
    );

    setFilteredCars(filteredResults);
  }, [searchQuery, cars]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    const sortedCars = [...filteredCars].sort((a, b) => {
      const dateA = a.createdAt?.seconds || 0;
      const dateB = b.createdAt?.seconds || 0;
      return event.target.value === "Newest" ? dateB - dateA : dateA - dateB;
    });
    setFilteredCars(sortedCars);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleBookmark = async (id, category, currentBookmarkState) => {
    try {
      const tableName = categoryMapping[category] || category;
      const docRef = doc(db, tableName, id);
      await updateDoc(docRef, { bookmarked: !currentBookmarkState });

      setCars((prevCars) =>
        prevCars.map((car) =>
          car.id === id && car.category === category
            ? { ...car, bookmarked: !currentBookmarkState }
            : car
        )
      );
      setFilteredCars((prevCars) =>
        prevCars.map((car) =>
          car.id === id && car.category === category
            ? { ...car, bookmarked: !currentBookmarkState }
            : car
        )
      );
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      setError("Failed to update bookmark");
    }
  };

  const viewItem = async (id, category) => {
    try {
      const tableName = categoryMapping[category] || category;
      const docRef = doc(db, tableName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const filteredData = Object.fromEntries(
          Object.entries(data).filter(
            ([_, value]) => value !== "" && value !== null
          )
        );

        setFormDataView(filteredData);
        setItemId(id);
        setItemCategory(category);
        setView(true);
      } else {
        console.log("No document found with this ID.");
        setError("Item not found");
      }
    } catch (error) {
      console.error("Error fetching item:", error);
      setError("Failed to fetch item details");
    }
  };

  const editItem = async (id, category) => {
    try {
      const tableName = categoryMapping[category] || category;
      const docRef = doc(db, tableName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const filteredData = Object.fromEntries(
          Object.entries(data).filter(
            ([_, value]) => value !== "" && value !== null
          )
        );

        setFormData(filteredData);
        setItemId(id);
        setItemCategory(category);
        setShow(true);
      } else {
        console.log("No document found with this ID.");
        setError("Item not found");
      }
    } catch (error) {
      console.error("Error fetching item:", error);
      setError("Failed to fetch item details");
    }
  };

  const updateItem = async () => {
    try {
      const tableName = categoryMapping[itemCategory] || itemCategory;
      const docRef = doc(db, tableName, itemId);
      await updateDoc(docRef, formData);

      setCars((prevCars) =>
        prevCars.map((car) =>
          car.id === itemId && car.category === itemCategory
            ? { ...car, ...formData }
            : car
        )
      );
      setFilteredCars((prevCars) =>
        prevCars.map((car) =>
          car.id === itemId && car.category === itemCategory
            ? { ...car, ...formData }
            : car
        )
      );

      setShow(false);
    } catch (error) {
      console.error("Error updating document:", error);
      setError("Failed to update item");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const deleteItem = async (id, category) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const tableName = categoryMapping[category] || category;
          const docRef = doc(db, tableName, id);
          await deleteDoc(docRef);

          setCars((prevCars) =>
            prevCars.filter(
              (car) => !(car.id === id && car.category === category)
            )
          );
          setFilteredCars((prevCars) =>
            prevCars.filter(
              (car) => !(car.id === id && car.category === category)
            )
          );

          MySwal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            timer: 1000,
          });
        } catch (error) {
          console.error("Error deleting item:", error);
          setError("Failed to delete item");
        }
      } else {
        MySwal.fire({
          title: "Cancelled",
          text: "Your file is safe :)",
          icon: "error",
          timer: 1000,
        });
      }
    });
  };

  const paginatedData = [...new Set(filteredCars)].slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const formatCategory = (category) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  };

  const parms = useLocation().pathname;

  return (
    <>
      <Header />
      <div className="dashboard-content" style={{ marginTop: "6rem" }}>
        <div className="container">
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
              <li className="active">
                <Link to="/bookmarks">
                  <i className="fas fa-solid fa-heart" /> <span>Favourite</span>
                </Link>
              </li>
              <li>
                <Link to="/messages">
                  <i className="fa-solid fa-comment-dots" />{" "}
                  <span>Messages</span>
                </Link>
              </li>
              {/* <li>
                <Link to="/reviews">
                  <i className="fas fa-solid fa-star" /> <span>Reviews</span>
                </Link>
              </li> */}
              <li>
                <Link className="dropdown-item" to="#" onClick={handleLogout}>
                  <i className="fas fa-light fa-circle-arrow-left" />{" "}
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="bookmarks-content grid-view featured-slider">
            <div className="row">
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                  }}
                >
                  <img
                    src={Loading1}
                    alt="Loading..."
                    style={{
                      width: "200px",
                      height: "200px",
                      animation: "spin 1s linear infinite", // Apply the spin animation
                    }}
                  />
                  <style>
                    {`
                    @keyframes spin {
                      from {
                        transform: rotate(0deg);
                      }
                      to {
                        transform: rotate(360deg);
                      }
                    }
                  `}
                  </style>
                </div>
              ) : filteredCars.length === 0 ? (
                <div className="col-12 text-center">
                  <p>No bookmarked items found.</p>
                </div>
              ) : (
                filteredCars.map((car) => (
                  <div
                    className="col-lg-4 col-md-4 col-sm-6"
                    key={`${car.id}-${car.category}`}
                  >
                    <div
                      className="card aos aos-init aos-animate"
                      data-aos="fade-up"
                    >
                      <div className="blog-widget">
                        <div className="blog-img">
                          <Link
                            to={
                              car.isActive
                                ? "#"
                                : `/Dynamic_Route?id=${
                                    car.id
                                  }&callingFrom=${formatCategory(
                                    car.category.trim() === "Pet & Animals"
                                      ? "PetAnimalsComp"
                                      : car.category.trim() === "Automotive"
                                      ? "AutomotiveComp"
                                      : car.category.trim() === "Other"
                                      ? "Education"
                                      : car.category.trim() === "Services"
                                      ? "TravelComp"
                                      : car.category.trim() === "JobBoard"
                                      ? "JobBoard"
                                      : car.category.trim() === "FashionStyle"
                                      ? "FashionStyle"
                                      : car.category.trim() === "Electronics"
                                      ? "ElectronicComp"
                                      : car.category.trim() ===
                                        "Home & Furnituer"
                                      ? "HealthCareComp"
                                      : car.category.trim() === "Sports & Game"
                                      ? "SportGamesComp"
                                      : car.category.trim() === "Real Estate"
                                      ? "RealEstateComp"
                                      : formatCategory(car.category.trim())
                                  )}`
                            }
                          >
                            <img
                              style={{ height: "322px" }}
                              src={car.galleryImages?.[0] || "placeholder.jpg"}
                              className="img-fluid"
                              alt="car-img"
                            />
                          </Link>
                          <div className="fav-item">
                            {car.FeaturedAds === "Featured Ads" && (
                              <span className="Featured-text">Featured</span>
                            )}
                            <Link
                              to="#"
                              className="fav-icon"
                              onClick={() =>
                                toggleBookmark(
                                  car.id,
                                  car.category,
                                  car.bookmarked
                                )
                              }
                            >
                              <FaHeart
                                style={{
                                  color: car.bookmarked ? "red" : "white",
                                  fontSize: "30px",
                                }}
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="bloglist-content">
                          <div className="card-body">
                            <div className="blogfeaturelink">
                              <div className="grid-author">
                                <img src={car.photoURL} alt="author" />
                              </div>
                              <div className="blog-features">
                                {/* <Link to="#"> */}
                                <span
                                  style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  <i className="fa-regular fa-circle-stop" />{" "}
                                  {car.displayName}
                                </span>
                                {/* </Link> */}
                              </div>
                              <div className="blog-author text-end">
                                <span>
                                  <Link
                                    to={
                                      car.isActive
                                        ? "#"
                                        : `/Dynamic_Route?id=${
                                            car.id
                                          }&callingFrom=${formatCategory(
                                            car.category.trim() ===
                                              "Pet & Animals"
                                              ? "PetAnimalsComp"
                                              : car.category.trim() ===
                                                "Automotive"
                                              ? "AutomotiveComp"
                                              : car.category.trim() === "Other"
                                              ? "Education"
                                              : car.category.trim() ===
                                                "Services"
                                              ? "TravelComp"
                                              : car.category.trim() ===
                                                "JobBoard"
                                              ? "JobBoard"
                                              : car.category.trim() ===
                                                "FashionStyle"
                                              ? "FashionStyle"
                                              : car.category.trim() ===
                                                "Electronics"
                                              ? "ElectronicComp"
                                              : car.category.trim() ===
                                                "Home & Furnituer"
                                              ? "HealthCareComp"
                                              : car.category.trim() ===
                                                "Sports & Game"
                                              ? "SportGamesComp"
                                              : car.category.trim() ===
                                                "Real Estate"
                                              ? "RealEstateComp"
                                              : formatCategory(
                                                  car.category.trim()
                                                )
                                          )}`
                                    }
                                  >
                                    <img src={eye} alt="views" />
                                  </Link>
                                  4000
                                </span>
                              </div>
                            </div>
                            <h6>
                              <Link
                                to={
                                  car.isActive
                                    ? "#"
                                    : `/Dynamic_Route?id=${
                                        car.id
                                      }&callingFrom=${formatCategory(
                                        car.category.trim() === "Pet & Animals"
                                          ? "PetAnimalsComp"
                                          : car.category.trim() === "Automotive"
                                          ? "AutomotiveComp"
                                          : car.category.trim() === "Other"
                                          ? "Education"
                                          : car.category.trim() === "Services"
                                          ? "TravelComp"
                                          : car.category.trim() === "JobBoard"
                                          ? "JobBoard"
                                          : car.category.trim() ===
                                            "FashionStyle"
                                          ? "FashionStyle"
                                          : car.category.trim() ===
                                            "Electronics"
                                          ? "ElectronicComp"
                                          : car.category.trim() ===
                                            "Home & Furnituer"
                                          ? "HealthCareComp"
                                          : car.category.trim() ===
                                            "Sports & Game"
                                          ? "SportGamesComp"
                                          : car.category.trim() ===
                                            "Real Estate"
                                          ? "RealEstateComp"
                                          : formatCategory(car.category.trim())
                                      )}`
                                }
                              >
                                {car.title}
                              </Link>
                            </h6>
                            <h6>
                              <Link
                                to={
                                  car.isActive
                                    ? "#"
                                    : `/Dynamic_Route?id=${
                                        car.id
                                      }&callingFrom=${formatCategory(
                                        car.category.trim() === "Pet & Animals"
                                          ? "PetAnimalsComp"
                                          : car.category.trim() === "Automotive"
                                          ? "AutomotiveComp"
                                          : car.category.trim() === "Other"
                                          ? "Education"
                                          : car.category.trim() === "Services"
                                          ? "TravelComp"
                                          : car.category.trim() === "JobBoard"
                                          ? "JobBoard"
                                          : car.category.trim() ===
                                            "FashionStyle"
                                          ? "FashionStyle"
                                          : car.category.trim() ===
                                            "Electronics"
                                          ? "ElectronicComp"
                                          : car.category.trim() ===
                                            "Home & Furnituer"
                                          ? "HealthCareComp"
                                          : car.category.trim() ===
                                            "Sports & Game"
                                          ? "SportGamesComp"
                                          : car.category.trim() ===
                                            "Real Estate"
                                          ? "RealEstateComp"
                                          : formatCategory(car.category.trim())
                                      )}`
                                }
                              >
                                Product Id : {car.id}
                              </Link>
                            </h6>
                            <div className="blog-location-details">
                              <div className="location-info">
                                <i className="feather-map-pin" /> {car.City}
                              </div>
                              <div className="location-info">
                                <i className="fa-solid fa-calendar-days" />{" "}
                                {car.createdAt
                                  ? new Date(
                                      car.createdAt.seconds * 1000
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </div>
                            </div>
                            <div className="amount-details">
                              <div className="amount">
                                <span className="validrate">
                                  ${car.Price || "N/A"}
                                </span>
                              </div>
                              {/* <div className="ratings">
                                <span>4.7</span> (5)
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="blog-pagination">
              <nav>
                <ul className="pagination">
                  <li
                    className={`page-item previtem ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <Link
                      className="page-link"
                      to="#"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                    >
                      <i className="fas fa-regular fa-arrow-left" /> Prev
                    </Link>
                  </li>
                  <li className="justify-content-center pagination-center">
                    <div className="pagelink">
                      <ul>
                        {[...Array(totalPages)].map((_, index) => (
                          <li
                            key={index}
                            className={`page-item ${
                              currentPage === index + 1 ? "active" : ""
                            }`}
                          >
                            <Link
                              className="page-link"
                              to="#"
                              onClick={() => setCurrentPage(index + 1)}
                            >
                              {index + 1}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                  <li
                    className={`page-item nextlink ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <Link
                      className="page-link"
                      to="#"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                    >
                      Next <i className="fas fa-regular fa-arrow-right" />
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Bookmarks;
