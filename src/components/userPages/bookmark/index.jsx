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
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import Spinner from "react-bootstrap/Spinner";
import { FaHeart, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import UserHeader from "../Userheader";
import Header from "../../home/header";
import { signOut } from "firebase/auth";
import Footer from "../../home/footer/Footer";
import { ProfileAvatar02, eye } from "../../imagepath";
import axios from "axios";
import { FaUserAlt, FaListUl, FaBullhorn } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { TbLogout2 } from "react-icons/tb";
import { useTranslation } from "react-i18next";

const MySwal = withReactContent(Swal);

const Bookmarks = () => {
  const { t } = useTranslation();
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
    Commercial: "CommercialAdscom",
    Automotive: "Cars",
    Other: "Education",
    Services: "TRAVEL",
    "Home & Furnituer": "HEALTHCARE",
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

        const currentUserId = user.uid;
        console.log("🔖 ============ BOOKMARKS PAGE ============");
        console.log("🔖 Fetching bookmarks for user:", currentUserId);
        console.log("🔖 Current page:", currentPage, "Sort order:", sortOrder);

        // Define all collections to check for bookmarked items
        const collections = [
          { name: "Cars", category: "Automotive" },
          { name: "ELECTRONICS", category: "Electronics" },
          { name: "FASHIONComp", category: "Fashion Style" },
          { name: "HEALTHCARE", category: "Home & Furnituer" },
          { name: "JOBBOARD", category: "Job board" },
          { name: "Education", category: "Other" },
          { name: "REALESTATECOMP", category: "Real Estate" },
          { name: "TRAVEL", category: "Services" },
          { name: "SPORTSGAMESComp", category: "Sports & Game" },
          { name: "PETANIMALCOMP", category: "Pet & Animal" },
          { name: "CommercialAdscom", category: "Commercial" },
        ];

        let allBookmarkedItems = [];

        // Fetch from all collections
        for (const { name: collectionName, category } of collections) {
          try {
            const collectionRef = collection(db, collectionName);
            const q = query(collectionRef, where("heartedby", "array-contains", currentUserId));
            const querySnapshot = await getDocs(q);

            const items = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              category: category,
              collectionName: collectionName,
              bookmarked: true, // Mark as bookmarked since we fetched it via heartedby
            }));

            console.log(`🔖 ${collectionName}: Found ${items.length} bookmarked items`);
            if (items.length > 0) {
              console.log(`🔖 ${collectionName} items:`, items.map(i => ({ id: i.id, title: i.title || i.Title })));
            }
            allBookmarkedItems = [...allBookmarkedItems, ...items];
          } catch (error) {
            console.error(`Error fetching from ${collectionName}:`, error);
            // Continue with other collections even if one fails
          }
        }

        console.log("🔖 ============================================");
        console.log("🔖 Total bookmarked items found:", allBookmarkedItems.length);
        if (allBookmarkedItems.length > 0) {
          console.log("🔖 All items:", allBookmarkedItems.map(i => ({
            id: i.id,
            title: i.title || i.Title,
            collection: i.collectionName,
            heartedby: i.heartedby
          })));
        }
        console.log("🔖 ============================================");

        // Sort the items based on sortOrder
        const sortedItems = allBookmarkedItems.sort((a, b) => {
          const dateA = a.createdAt?.seconds || 0;
          const dateB = b.createdAt?.seconds || 0;
          return sortOrder === "Newest" ? dateB - dateA : dateA - dateB;
        });

        // Implement pagination
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedItems = sortedItems.slice(startIndex, endIndex);

        setCars(sortedItems);
        setFilteredCars(paginatedItems);
        setTotalItems(sortedItems.length);
        setTotalPages(Math.ceil(sortedItems.length / pageSize));
      } catch (error) {
        console.error("Error fetching bookmarked listings:", error);
        setError("Failed to fetch bookmarked data");
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedListings();
  }, [currentPage, sortOrder, userId]);

  useEffect(() => {
    if (!userId || !searchQuery) {
      // No search query, so items are already filtered and paginated in the main fetch
      return;
    }

    // Apply search filter on already bookmarked items
    const lowercasedQuery = searchQuery.toLowerCase();
    const filteredResults = cars.filter(
      (car) =>
        car.title?.toLowerCase().includes(lowercasedQuery) ||
        car.description?.toLowerCase().includes(lowercasedQuery)
    );

    // Apply pagination to search results
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedResults = filteredResults.slice(startIndex, endIndex);

    setFilteredCars(paginatedResults);
    setTotalItems(filteredResults.length);
    setTotalPages(Math.ceil(filteredResults.length / pageSize));
  }, [searchQuery, cars, userId, currentPage, pageSize]);

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

  const toggleBookmark = async (id, category, collectionName) => {
    // Get current user ID
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) {
      setError("User not authenticated");
      return;
    }

    // Use the actual collectionName stored on the item (like Search.jsx does)
    // Fall back to categoryMapping if collectionName is not provided
    const tableName = collectionName || categoryMapping[category] || category;

    console.log("🔖 Toggle Bookmark Debug:", {
      id,
      category,
      collectionName,
      tableName,
      currentUserId,
    });

    if (!tableName) {
      console.error("❌ ERROR: tableName is missing!");
      setError("Error: Cannot update bookmark. Collection name is missing.");
      return;
    }

    try {
      const docRef = doc(db, tableName, id);

      // First, get the current document to check actual heartedby state (like Search.jsx)
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.error("❌ Document does not exist:", tableName, id);
        setError("Error: Item not found in database");
        return;
      }

      const currentData = docSnap.data();
      const currentHeartedBy = currentData.heartedby || [];
      const isCurrentlyBookmarked = currentHeartedBy.includes(currentUserId);

      console.log("📝 Current state from Firebase:", {
        heartedby: currentHeartedBy,
        isCurrentlyBookmarked,
        willRemove: isCurrentlyBookmarked,
      });

      // STEP 1: Update the USER document (like Search.jsx does)
      // This is the source of truth for bookmarkedAds in Search page
      console.log("📝 Updating user document...");
      const userDocRef = doc(db, "users", currentUserId);
      try {
        await updateDoc(userDocRef, {
          heartedby: isCurrentlyBookmarked ? arrayRemove(id) : arrayUnion(id),
        });
        console.log("✅ User document updated successfully");
      } catch (userError) {
        console.error("❌ Error updating user document:", userError);
        // If user document doesn't exist, we'll skip this but continue with ad update
      }

      // STEP 2: Update the AD document's heartedby array, bookmarked field, and per-user bookmark
      await updateDoc(docRef, {
        bookmarked: !isCurrentlyBookmarked,
        heartedby: isCurrentlyBookmarked
          ? arrayRemove(currentUserId)
          : arrayUnion(currentUserId),
        [`userBookmarks.${currentUserId}`]: !isCurrentlyBookmarked,
      });

      // Verify the update by reading back (like Search.jsx does)
      const verifyDoc = await getDoc(docRef);
      const verifyData = verifyDoc.data();
      console.log("✅ Verification - Ad heartedby array:", verifyData.heartedby);
      console.log("✅ Verification - Ad bookmarked:", verifyData.bookmarked);
      console.log("✅ User still in ad heartedby:", verifyData.heartedby?.includes(currentUserId));

      // Clear all cached data to force refetch on other pages
      const cacheKeys = [
        "commercial_ads_data", "commercial_ads_timestamp",
        "ads_all", "ads_all_timestamp",
        "ads_Motors", "ads_Motors_timestamp",
        "ads_Electronics", "ads_Electronics_timestamp",
        "ads_Fashion Style", "ads_Fashion Style_timestamp",
        "ads_Home & Furniture", "ads_Home & Furniture_timestamp",
        "ads_Job Board", "ads_Job Board_timestamp",
        "ads_Other", "ads_Other_timestamp",
        "ads_Real Estate", "ads_Real Estate_timestamp",
        "ads_Services", "ads_Services_timestamp",
        "ads_Sport & Game", "ads_Sport & Game_timestamp",
        "ads_Pet & Animals", "ads_Pet & Animals_timestamp",
      ];
      cacheKeys.forEach(key => sessionStorage.removeItem(key));
      console.log("🧹 All caches cleared");

      // Store the bookmark change in sessionStorage so other pages can detect it
      const bookmarkChange = {
        id,
        category,
        tableName,
        removed: isCurrentlyBookmarked,
        timestamp: Date.now(),
      };
      sessionStorage.setItem("last_bookmark_change", JSON.stringify(bookmarkChange));

      // Update local state
      setCars((prevCars) =>
        prevCars.map((car) => {
          if (car.id === id && car.category === category) {
            const updatedHeartedBy = isCurrentlyBookmarked
              ? (car.heartedby || []).filter((uid) => uid !== currentUserId)
              : [...(car.heartedby || []), currentUserId];

            return {
              ...car,
              bookmarked: !isCurrentlyBookmarked,
              heartedby: updatedHeartedBy,
              userBookmarks: {
                ...car.userBookmarks,
                [currentUserId]: !isCurrentlyBookmarked,
              },
            };
          }
          return car;
        })
      );

      // Remove from filtered list if unbookmarking
      if (isCurrentlyBookmarked) {
        setFilteredCars((prevCars) =>
          prevCars.filter((car) => !(car.id === id && car.category === category))
        );
      } else {
        setFilteredCars((prevCars) =>
          prevCars.map((car) => {
            if (car.id === id && car.category === category) {
              return {
                ...car,
                bookmarked: true,
                heartedby: [...(car.heartedby || []), currentUserId],
                userBookmarks: {
                  ...car.userBookmarks,
                  [currentUserId]: true,
                },
              };
            }
            return car;
          })
        );
      }

      console.log("✅ Bookmark toggle completed successfully!");
    } catch (error) {
      console.error("❌ Error toggling bookmark:", error);
      console.error("Error details:", {
        code: error.code,
        message: error.message,
      });
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
      <div className="dashboard-content" style={{ marginTop: "5rem" }}>
        <div className="container">
          <div className="">
            <ul className="dashborad-menus">
              <li>
                <Link to="/dashboard">
                  <MdDashboard /> <span>{t("common.dashboard")}</span>
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <FaUserAlt /> <span>{t("common.profile")}</span>
                </Link>
              </li>
              <li>
                <Link to="/my-listing">
                  <FaListUl /> <span>{t("common.myListing")}</span>
                </Link>
              </li>
              <li>
                <Link to="/manage-commercial-ads">
                  <FaBullhorn /> <span>{t("messages.commercialAds")}</span>
                </Link>
              </li>
              <li className="active">
                <Link to="/bookmarks">
                  <FaHeart /> <span>{t("common.favourite")}</span>
                </Link>
              </li>
              <li>
                <Link to="/messages">
                  <TiMessages /> <span>{t("common.messages")}</span>
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
                  <span>{t("common.logout")}</span>
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
                  <div className="flex justify-center items-center h-screen">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  {/* <img
                    src={Loading1}
                    alt="Loading..."
                    style={{
                      width: "200px",
                      height: "200px",
                      animation: "spin 1s linear infinite", // Apply the spin animation
                    }}
                  /> */}
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
                    className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                    key={`${car.id}-${car.category}`}
                  >
                    <div
                      className="card aos aos-init aos-animate"
                      data-aos="fade-up"
                    >
                      <div className="blog-widget shadow-sm">
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
                              <span className="Featured-text">{t("common.featured")}</span>
                            )}
                            <Link
                              to="#"
                              className="fav-icon"
                              onClick={() =>
                                toggleBookmark(
                                  car.id,
                                  car.category,
                                  car.collectionName
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
                                    <img
                                      src={eye}
                                      alt="views"
                                      style={{
                                        width: "25px",
                                      }}
                                    />
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
                                {t("bookmarks.productId")}: {car.id}
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
                                  {car.Price ? (
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
                                      {car.Price}
                                    </>
                                  ) : (
                                    "N/A"
                                  )}
                                </span>
                              </div>
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
                      <FaArrowLeft /> {t("myListing.prev")}
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
                      {t("myListing.next")} <FaArrowRight />
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
