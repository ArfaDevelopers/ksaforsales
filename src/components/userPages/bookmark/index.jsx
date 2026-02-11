import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Table } from "antd";
import { Modal, Button, Row, Col, Card, Form } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../Firebase/FirebaseConfig";
import Loading1 from "../../../../public/Progress circle.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
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
import { getTranslatedField } from "../../../utils/autoTranslate";

const MySwal = withReactContent(Swal);

// ✅ PERFORMANCE: Move constant mapping outside component to prevent recreation
const categoryMapping = {
  "Sports & Game": "SPORTSGAMESComp",
  Electronics: "ELECTRONICS",
  "Fashion Style": "FASHION",
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

// ✅ PERFORMANCE: Memoized card component to prevent unnecessary re-renders
const BookmarkCard = React.memo(
  ({ car, getCarRoute, toggleBookmark, t, i18n, getTranslatedField, eye }) => {
    // ✅ Precompute expensive values once per card
    const route = useMemo(() => getCarRoute(car), [car, getCarRoute]);
    const title = useMemo(
      () =>
        getTranslatedField(car, "title", i18n.language) ||
        getTranslatedField(car, "Title", i18n.language) ||
        car.title ||
        car.Title,
      [car, i18n.language, getTranslatedField],
    );
    const city = useMemo(
      () => getTranslatedField(car, "City", i18n.language) || car.City,
      [car, i18n.language, getTranslatedField],
    );
    const formattedDate = useMemo(
      () =>
        car.createdAt
          ? new Date(car.createdAt.seconds * 1000).toLocaleDateString()
          : "N/A",
      [car.createdAt],
    );

    return (
      <>
        <div className="card aos aos-init aos-animate" data-aos="fade-up">
          <div className="blog-widget shadow-sm">
            <div className="blog-img">
              <Link to={route}>
                <img
                  style={{ height: "200px", objectFit: "cover" }}
                  src={car.galleryImages?.[0] || "placeholder.jpg"}
                  className="img-fluid"
                  alt="car-img"
                  loading="lazy"
                />
              </Link>
              <div className="fav-item">
                {car.FeaturedAds === "Featured Ads" && (
                  <span className="Featured-text">{t("common.featured")}</span>
                )}
                <Link
                  to="#"
                  className="fav-icon"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleBookmark(car.id, car.category, car.collectionName);
                  }}
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
                <div className="blogfeaturelink author--info">
                  <div className="bookmark-author">
                    <img src={car.photoURL} alt="author" loading="lazy" />
                  </div>
                  <div className="blog-features">
                    <span>
                      {car.displayName}
                    </span>
                  </div>
                  <div className="blog-author text-end">
                    <span>
                      <Link to={route}>
                        <img src={eye} alt="views" style={{ width: "25px" }} />
                      </Link>
                      {car.visitCount || 0}
                    </span>
                  </div>
                </div>
                <h6>
                  <Link
                    to={route}
                    style={{ color: "#2d4495", fontWeight:"600" }}
                  >
                    {title}
                  </Link>
                </h6>

                <h6
                  style={{
                    fontSize: "14px",
                    fontWeight: "100",
                    padding: "10px 0px",
                  }}
                >
                  <Link to={route}>
                    {t("bookmarks.productId")}: {car.id}
                  </Link>
                </h6>
                <div className="blog-location-details">
                  <div className="location-info">
                    <i className="feather-map-pin" /> {city}
                  </div>
                  <div className="location-info">
                    <i className="fa-solid fa-calendar-days" /> {formattedDate}
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
                              marginRight: "0.25em",
                            }}
                          />
                          {car.Price}
                        </>
                      ) : (
                        t("common.priceNotAvailable")
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison for better performance
    return (
      prevProps.car.id === nextProps.car.id &&
      prevProps.car.bookmarked === nextProps.car.bookmarked &&
      prevProps.i18n.language === nextProps.i18n.language
    );
  },
);

const Bookmarks = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12); // ✅ Increased to 12 cards per page (3 rows of 4 cards)
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
        // ✅ FIXED: Added missing collections that were causing bookmarks not to show
        const collections = [
          { name: "Cars", category: "Automotive" },
          { name: "ELECTRONICS", category: "Electronics" },
          { name: "FASHION", category: "Fashion Style" },
          { name: "BodyContentFashion", category: "Fashion Style" },
          { name: "HEALTHCARE", category: "Home & Furnituer" },
          { name: "HomeFurnitureContent", category: "Home & Furnituer" },
          { name: "JOBBOARD", category: "Job board" },
          { name: "Education", category: "Other" },
          { name: "OtherContent", category: "Other" },
          { name: "REALESTATECOMP", category: "Real Estate" },
          { name: "TRAVEL", category: "Services" },
          { name: "SPORTSGAMESComp", category: "Sports & Game" },
          { name: "PETANIMALCOMP", category: "Pet & Animal" },
          { name: "CommercialAdscom", category: "Commercial" },
        ];

        // ✅ PERFORMANCE FIX: Fetch from ALL collections in PARALLEL using Promise.all
        const fetchPromises = collections.map(
          async ({ name: collectionName, category }) => {
            try {
              const collectionRef = collection(db, collectionName);
              const q = query(
                collectionRef,
                where("heartedby", "array-contains", currentUserId),
              );
              const querySnapshot = await getDocs(q);

              const items = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                category: category,
                collectionName: collectionName,
                bookmarked: true,
              }));

              console.log(
                `🔖 ${collectionName}: Found ${items.length} bookmarked items`,
              );
              return items;
            } catch (error) {
              console.error(`Error fetching from ${collectionName}:`, error);
              return []; // Return empty array on error
            }
          },
        );

        // Wait for ALL queries to complete in parallel
        const results = await Promise.all(fetchPromises);
        const allBookmarkedItems = results.flat();

        console.log("🔖 ============================================");
        console.log(
          "🔖 Total bookmarked items found:",
          allBookmarkedItems.length,
        );
        console.log("🔖 ============================================");

        // ✅ UPDATED: Sort by bookmark timestamp (most recently bookmarked first)
        const sortedItems = allBookmarkedItems.sort((a, b) => {
          // Use bookmarkedAt timestamp if available, otherwise fall back to createdAt
          const dateA =
            a.bookmarkedAt?.[currentUserId] || a.createdAt?.seconds * 1000 || 0;
          const dateB =
            b.bookmarkedAt?.[currentUserId] || b.createdAt?.seconds * 1000 || 0;
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
        car.description?.toLowerCase().includes(lowercasedQuery),
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

  // ✅ PERFORMANCE: Memoize toggleBookmark to prevent unnecessary re-renders
  const toggleBookmark = useCallback(async (id, category, collectionName) => {
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
        [`bookmarkedAt.${currentUserId}`]: !isCurrentlyBookmarked
          ? Date.now()
          : null, // ✅ Store bookmark timestamp
      });

      // Verify the update by reading back (like Search.jsx does)
      const verifyDoc = await getDoc(docRef);
      const verifyData = verifyDoc.data();
      console.log(
        "✅ Verification - Ad heartedby array:",
        verifyData.heartedby,
      );
      console.log("✅ Verification - Ad bookmarked:", verifyData.bookmarked);
      console.log(
        "✅ User still in ad heartedby:",
        verifyData.heartedby?.includes(currentUserId),
      );

      // Clear all cached data to force refetch on other pages
      const cacheKeys = [
        "commercial_ads_data",
        "commercial_ads_timestamp",
        "ads_all",
        "ads_all_timestamp",
        "ads_Motors",
        "ads_Motors_timestamp",
        "ads_Electronics",
        "ads_Electronics_timestamp",
        "ads_Fashion Style",
        "ads_Fashion Style_timestamp",
        "ads_Home & Furniture",
        "ads_Home & Furniture_timestamp",
        "ads_Job Board",
        "ads_Job Board_timestamp",
        "ads_Other",
        "ads_Other_timestamp",
        "ads_Real Estate",
        "ads_Real Estate_timestamp",
        "ads_Services",
        "ads_Services_timestamp",
        "ads_Sport & Game",
        "ads_Sport & Game_timestamp",
        "ads_Pet & Animals",
        "ads_Pet & Animals_timestamp",
      ];
      cacheKeys.forEach((key) => sessionStorage.removeItem(key));
      console.log("🧹 All caches cleared");

      // Store the bookmark change in sessionStorage so other pages can detect it
      const bookmarkChange = {
        id,
        category,
        tableName,
        removed: isCurrentlyBookmarked,
        timestamp: Date.now(),
      };
      sessionStorage.setItem(
        "last_bookmark_change",
        JSON.stringify(bookmarkChange),
      );

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
        }),
      );

      // Remove from filtered list if unbookmarking
      if (isCurrentlyBookmarked) {
        setFilteredCars((prevCars) =>
          prevCars.filter(
            (car) => !(car.id === id && car.category === category),
          ),
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
          }),
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
  }, []); // ✅ Empty deps - categoryMapping is now a constant outside component

  const viewItem = async (id, category) => {
    try {
      const tableName = categoryMapping[category] || category;
      const docRef = doc(db, tableName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const filteredData = Object.fromEntries(
          Object.entries(data).filter(
            ([_, value]) => value !== "" && value !== null,
          ),
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
            ([_, value]) => value !== "" && value !== null,
          ),
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
            : car,
        ),
      );
      setFilteredCars((prevCars) =>
        prevCars.map((car) =>
          car.id === itemId && car.category === itemCategory
            ? { ...car, ...formData }
            : car,
        ),
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
              (car) => !(car.id === id && car.category === category),
            ),
          );
          setFilteredCars((prevCars) =>
            prevCars.filter(
              (car) => !(car.id === id && car.category === category),
            ),
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

  // ✅ PERFORMANCE: Precompute route to avoid repeated logic in render
  const getCarRoute = useCallback((car) => {
    if (car.isActive) return "#";

    const trimmedCategory = car.category.trim();
    let callingFrom;

    switch (trimmedCategory) {
      case "Pet & Animal":
      case "Pet & Animals":
        callingFrom = "PetAnimalsComp";
        break;
      case "Automotive":
        callingFrom = "AutomotiveComp";
        break;
      case "Other":
        callingFrom = "Education";
        break;
      case "Services":
        callingFrom = "TravelComp";
        break;
      case "JobBoard":
        callingFrom = "JobBoard";
        break;
      case "FashionStyle":
        callingFrom = "FashionStyle";
        break;
      case "Electronics":
        callingFrom = "ElectronicComp";
        break;
      case "Home & Furnituer":
        callingFrom = "HealthCareComp";
        break;
      case "Sports & Game":
        callingFrom = "SportGamesComp";
        break;
      case "Real Estate":
        callingFrom = "RealEstateComp";
        break;
      default:
        callingFrom = formatCategory(trimmedCategory);
    }

    return `/Dynamic_Route?id=${car.id}&callingFrom=${callingFrom}`;
  }, []);

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

          <div
            className="bookmarks-content grid-view featured-slider"
            dir={i18n.language.startsWith("ar") ? "rtl" : "ltr"}
            style={{
              direction: i18n.language.startsWith("ar") ? "rtl" : "ltr",
              textAlign: i18n.language.startsWith("ar") ? "right" : "left",
            }}
          >
            <div className="row">
              {loading ? (
                <>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="col-lg-4 col-md-6 col-sm-12">
                      <div
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: "20px",
                          padding: "0",
                          marginBottom: "30px",
                          border: "1px solid #e0e0e0",
                          overflow: "hidden",
                        }}
                      >
                        {/* Image Skeleton */}
                        <div
                          style={{
                            width: "100%",
                            height: "250px",
                            backgroundColor: "#f0f0f0",
                            animation: "pulse 1.5s ease-in-out infinite",
                          }}
                        />
                        {/* Content Skeleton */}
                        <div style={{ padding: "20px" }}>
                          {/* Title */}
                          <div
                            style={{
                              height: "24px",
                              backgroundColor: "#f0f0f0",
                              borderRadius: "8px",
                              marginBottom: "15px",
                              width: "80%",
                              animation: "pulse 1.5s ease-in-out infinite",
                            }}
                          />
                          {/* Price */}
                          <div
                            style={{
                              height: "28px",
                              backgroundColor: "#f0f0f0",
                              borderRadius: "8px",
                              marginBottom: "15px",
                              width: "50%",
                              animation: "pulse 1.5s ease-in-out infinite",
                            }}
                          />
                          {/* Author and Details */}
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              marginBottom: "15px",
                            }}
                          >
                            <div
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                backgroundColor: "#f0f0f0",
                                animation: "pulse 1.5s ease-in-out infinite",
                              }}
                            />
                            <div style={{ flex: 1 }}>
                              <div
                                style={{
                                  height: "16px",
                                  backgroundColor: "#f0f0f0",
                                  borderRadius: "8px",
                                  marginBottom: "8px",
                                  width: "60%",
                                  animation: "pulse 1.5s ease-in-out infinite",
                                }}
                              />
                              <div
                                style={{
                                  height: "14px",
                                  backgroundColor: "#f0f0f0",
                                  borderRadius: "8px",
                                  width: "40%",
                                  animation: "pulse 1.5s ease-in-out infinite",
                                }}
                              />
                            </div>
                          </div>
                          {/* Button */}
                          <div
                            style={{
                              height: "45px",
                              backgroundColor: "#f0f0f0",
                              borderRadius: "8px",
                              width: "100%",
                              animation: "pulse 1.5s ease-in-out infinite",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : filteredCars.length === 0 ? (
                <div className="col-12 text-center">
                  <p>No bookmarked items found.</p>
                </div>
              ) : (
                <>
                  <style>
                    {`
                      @keyframes fadeInUp {
                        from {
                          opacity: 0;
                          transform: translateY(20px);
                        }
                        to {
                          opacity: 1;
                          transform: translateY(0);
                        }
                      }
                      .bookmark-card-animate {
                        animation: fadeInUp 0.5s ease-out forwards;
                        opacity: 0;
                        padding-bottom: 20px;
                      }
                    `}
                  </style>
                  {filteredCars.map((car, index) => (
                    <div
                      key={`${car.id}-${car.category}`}
                      className="col-xl-3 col-lg-4 col-md-6 col-sm-6 bookmark-card-animate"
                      style={{
                        animationDelay: `${index * 0.05}s`,
                      }}
                    >
                      <BookmarkCard
                        car={car}
                        getCarRoute={getCarRoute}
                        toggleBookmark={toggleBookmark}
                        t={t}
                        i18n={i18n}
                        getTranslatedField={getTranslatedField}
                        eye={eye}
                      />
                    </div>
                  ))}
                </>
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
