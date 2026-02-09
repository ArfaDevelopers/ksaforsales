import React, { useEffect, useState } from "react";
import Mylistings from "../../json/Mylisting";
import { Table } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Footer from "../../home/footer/Footer";
import Header from "../../home/header";
import UserHeader from "../Userheader";
import Loading1 from "../../../../public/Progress circle.png";
import { Modal, Button, Row, Col, Card, Form } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../Firebase/FirebaseConfig";
import Spinner from "react-bootstrap/Spinner";
import {
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import axios from "axios";
import {
  FaUserAlt,
  FaListUl,
  FaHeart,
  FaBullhorn,
  FaArrowRight,
  FaArrowLeft,
  FaRegStopCircle,
  FaRegEye,
  FaEdit,
  FaTrash,
  FaTag,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { TbLogout2 } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { getTranslatedField } from "../../../utils/autoTranslate";
import "../../../assets/css/mobile-my-listing.css";

const MyListe = () => {
  const { t, i18n } = useTranslation();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const data = Mylistings.Mylistings;
  const dataSource = { data };
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({});
  const [itemCategory, setItemCategory] = useState("");
  console.log("itemCategory______", currentPage);
  const [itemId, setItemId] = useState(null);
  const [FormDataView, setFormDataView] = useState({});
  const [view, setView] = useState(false);
  const [change, setChange] = useState(false);
  const [filter, setFilter] = useState("All Listing");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
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
        const token = await user.getIdToken();
        console.log("User ID Token:", token);
        console.log("User UID:", user.uid);
        setUserId(user.uid);
        localStorage.setItem(user.uid, "user.uid1");
      } else {
        console.log("No user is logged in. Redirecting to /login...");
      }
    });

    return () => unsubscribe();
  }, []);

  const categoryMapping = {
    Motors: "AutomotiveComp",
    "Sports&Game": "SPORTSGAMESComp",
    Electronics: "ELECTRONICS",
    FashionStyle: "FASHION",
    JobBoard: "JOBBOARD",
    RealEstate: "REALESTATECOMP",
    Other: "Education",
    Services: "TRAVEL",
    "Pet & Animals": "PETANIMALCOMP",
    "Home&Furnituer": "HEALTHCARE",
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleView = () => setView(true);
  const handleCloseview = () => setView(false);
  const [showInvoiceColumn, setShowInvoiceColumn] = useState(false);
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    setCurrentPage(1); // 🔄 Reset to page 1 on sort change
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    setShowInvoiceColumn(selectedFilter === "Featured Ads");
    setCurrentPage(1);
    setChange(false);
  };
  const [listingData, setListingData] = useState([]);
  useEffect(() => {
    const fetchCarsFromApi = async () => {
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
          `http://168.231.80.24:9002/api/listings`,
          {
            params: {
              userId,
              page: currentPage,
              sortOrder,
            },
          }
        );

        const { data, totalPages: serverTotalPages } = response.data;

        const normalizedData = data.map((item) => ({
          ...item,
          isActive: item.isActive ?? false,
        }));

        setCars(normalizedData);
        setFilteredCars(normalizedData);
        setTotalPages(serverTotalPages);

        const COLLECTIONS = [
          "SPORTSGAMESComp",
          "REALESTATECOMP",
          "Cars",
          "ELECTRONICS",
          "Education",
          "FASHION",
          "HEALTHCARE",
          "JOBBOARD",
          "MAGAZINESCOMP",
          "PETANIMALCOMP",
          "TRAVEL",
        ];

        const listingsData = COLLECTIONS.map(async (collectionName) => {
          const listingRef = collection(db, collectionName);
          const q = query(
            listingRef,
            where("userId", "==", auth.currentUser.uid)
          );
          const listings = await getDocs(q);
          const totalListings = listings.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          console.log("totallistingss..", totalListings);
          return totalListings;
        });

        listingsData();
        setListingData(listingData());
      } catch (error) {
        console.error("Error fetching cars from API:", error);
        setError("Failed to fetch listings from API");
      } finally {
        setLoading(false);
      }
    };

    fetchCarsFromApi();
  }, [currentPage, sortOrder]);
  // console.log("totallistingss..", listingData);

  const isMobile = window.innerWidth <= 576;
  useEffect(() => {
    let result = [...cars];

    if (filter === "Featured Ads") {
      result = result.filter((item) => item.FeaturedAds === "Featured Ads");
    } else if (filter === "Not Featured Ads") {
      result = result.filter((item) => item.FeaturedAds !== "Featured Ads");
    }

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      result = result.filter(
        (car) =>
          car.title?.toLowerCase().includes(lowercasedQuery) ||
          car.description?.toLowerCase().includes(lowercasedQuery)
      );
    }

    result = result.sort((a, b) => {
      const dateA = a.createdAt?.seconds || 0;
      const dateB = b.createdAt?.seconds || 0;
      return sortOrder === "Newest" ? dateB - dateA : dateA - dateB;
    });

    console.log(
      "Filtered Cars Count (after filter/search/sort):",
      result.length
    );
    setFilteredCars(result);
  }, [cars, filter, searchQuery, sortOrder]);

  const viewItem = async (id, category) => {
    try {
      const tableName = categoryMapping[category] || category;
      const docRef = doc(db, tableName, id);
      const docSnap = await getDoc(docRef);
      console.log(category, "category_________");
      console.log(id, "category_________id");

      if (docSnap.exists()) {
        console.log("Document Data:", docSnap.data());
        const filteredData = Object.fromEntries(
          Object.entries(docSnap.data()).filter(
            ([_, value]) => value !== "" && value !== null
          )
        );
        console.log("No document found with this ID.", filteredData);
        setFormDataView(filteredData);
        setItemId(id);
        setItemCategory(category);
        handleView();
      } else {
        console.log("No document found with this ID.");
      }
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  const editItem = async (id, category) => {
    try {
      const trimmedCategory = category.trim();
      const tableName = categoryMapping[trimmedCategory];

      if (!tableName) {
        console.error(
          "Invalid category:",
          category,
          "Mapped table:",
          tableName
        );
        return;
      }

      console.log(
        "Category:",
        trimmedCategory,
        "Table Name:",
        tableName,
        "ID:",
        id
      );
      const docRef = doc(db, tableName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document Data:", docSnap.data());
        const filteredData = Object.fromEntries(
          Object.entries(docSnap.data()).filter(
            ([_, value]) => value !== "" && value !== null
          )
        );
        setFormData(filteredData);
        setItemId(id);
        setItemCategory(category);
        handleShow();
      } else {
        console.log("No document found with this ID.");
      }
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  const updateItem = async () => {
    try {
      const tableName = categoryMapping[itemCategory] || itemCategory;
      const docRef = doc(db, tableName, itemId);
      await updateDoc(docRef, formData);
      console.log("Document successfully updated!");
      handleClose();
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const deleteItem = async (id, category) => {
    console.log(category, "combinedData___________category");
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
        MySwal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          timer: 1000,
        });
        try {
          const tableName = categoryMapping[category] || category;
          const docRef = doc(db, tableName, id);
          await deleteDoc(docRef);
          console.log(
            `Deleted item with ID: ${id} from collection: ${tableName}`
          );
        } catch (error) {
          console.error("Error deleting ad from Firestore:", error);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Your file is safe :)",
          icon: "error",
          timer: 1000,
        });
      }
    });
  };
  // const totalPages = Math.ceil(filteredCars.length / pageSize);

  const renderPaginationItems = () => {
    const items = [];
    const isMobile = window.innerWidth <= 768;
    const maxButtons = isMobile ? 4 : 7; // Show 4 buttons on mobile, 7 on desktop

    if (totalPages <= maxButtons) {
      // Show all pages if total is less than max buttons
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <li
            key={i}
            className={`page-item ${currentPage === i ? "active" : ""}`}
          >
            <Link className="page-link" to="#" onClick={() => setCurrentPage(i)}>
              {i}
            </Link>
          </li>
        );
      }
    } else {
      // Smart pagination with ellipsis
      const showFirst = currentPage > 2;
      const showLast = currentPage < totalPages - 1;

      if (currentPage <= 3) {
        // Show first 4 pages + ellipsis + last
        for (let i = 1; i <= Math.min(maxButtons, totalPages); i++) {
          items.push(
            <li
              key={i}
              className={`page-item ${currentPage === i ? "active" : ""}`}
            >
              <Link className="page-link" to="#" onClick={() => setCurrentPage(i)}>
                {i}
              </Link>
            </li>
          );
        }
        if (totalPages > maxButtons) {
          items.push(
            <li key="ellipsis-end" className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          );
          items.push(
            <li key={totalPages} className="page-item">
              <Link className="page-link" to="#" onClick={() => setCurrentPage(totalPages)}>
                {totalPages}
              </Link>
            </li>
          );
        }
      } else if (currentPage >= totalPages - 2) {
        // Show first + ellipsis + last 4 pages
        items.push(
          <li key={1} className="page-item">
            <Link className="page-link" to="#" onClick={() => setCurrentPage(1)}>
              1
            </Link>
          </li>
        );
        items.push(
          <li key="ellipsis-start" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
        for (let i = totalPages - (maxButtons - 1); i <= totalPages; i++) {
          items.push(
            <li
              key={i}
              className={`page-item ${currentPage === i ? "active" : ""}`}
            >
              <Link className="page-link" to="#" onClick={() => setCurrentPage(i)}>
                {i}
              </Link>
            </li>
          );
        }
      } else {
        // Show first + ellipsis + current-1, current, current+1 + ellipsis + last
        items.push(
          <li key={1} className="page-item">
            <Link className="page-link" to="#" onClick={() => setCurrentPage(1)}>
              1
            </Link>
          </li>
        );
        items.push(
          <li key="ellipsis-start" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          items.push(
            <li
              key={i}
              className={`page-item ${currentPage === i ? "active" : ""}`}
            >
              <Link className="page-link" to="#" onClick={() => setCurrentPage(i)}>
                {i}
              </Link>
            </li>
          );
        }
        items.push(
          <li key="ellipsis-end" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
        items.push(
          <li key={totalPages} className="page-item">
            <Link className="page-link" to="#" onClick={() => setCurrentPage(totalPages)}>
              {totalPages}
            </Link>
          </li>
        );
      }
    }
    return items;
  };

  const toggleDisable = async (id, category, isActive) => {
    const categoryMapping1 = {
      Motors: "Cars",

      "Sports&Game": "SPORTSGAMESComp",
      Electronics: "ELECTRONICS",
      FashionStyle: "FASHION",
      JobBoard: "JOBBOARD",
      RealEstate: "REALESTATECOMP",
      Other: "Education",
      Services: "TRAVEL",
      "Pet & Animals": "PETANIMALCOMP",
      "Home&Furnituer": "HEALTHCARE",
    };
    try {
      // Validate inputs
      if (!id || !category || typeof isActive !== "boolean") {
        throw new Error("Invalid input parameters");
      }

      console.log("toggleDisable called with:", { id, category, isActive });

      // Map category to collection name
      const tableName = categoryMapping1[category] || category;
      console.log(`Updating document: ${tableName}/${id}`);

      // Create document reference
      const docRef = doc(
        db,
        tableName === "Pet&Animals"
          ? "PETANIMALCOMP"
          : tableName === "Motors"
          ? "Cars"
          : tableName,
        id
      );

      // Check if document exists
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error(`Document ${id} does not exist in ${tableName}`);
      }

      // Update Firestore document
      await updateDoc(docRef, { isActive });
      console.log(
        `Firestore updated: ${id} in ${tableName} to isActive=${isActive}`
      );

      // Set flag to invalidate search page cache
      sessionStorage.setItem("listing_status_changed", Date.now().toString());
      console.log("✅ Set listing_status_changed flag for cache invalidation");

      // Update local state
      setFilteredCars((prevData) => {
        const updated = prevData.map((item) =>
          item.id === id ? { ...item, isActive } : item
        );
        console.log("Updated filteredCars:", updated);
        return updated;
      });

      setCars((prevData) => {
        const updated = prevData.map((item) =>
          item.id === id ? { ...item, isActive } : item
        );
        console.log("Updated cars:", updated);
        return updated;
      });

      console.log(
        `Toggled ${id} in ${category} to ${isActive ? "disabled" : "enabled"}`
      );
    } catch (error) {
      console.error("Error toggling disable status:", error.message, error);
      MySwal.fire({
        title: "Error",
        text: `Failed to toggle disable status: ${error.message}`,
        icon: "error",
        timer: 2000,
      });
    }
  };

  // Helper function to translate category names
  const translateCategory = (category) => {
    if (!category) return "";
    const trimmedCategory = category.trim();
    const categoryMap = {
      "Motors": t("categories.motors"),
      "Automotive": t("categories.motors"),
      "Electronics": t("categories.electronics"),
      "Fashion Style": t("categories.fashionStyle"),
      "FashionStyle": t("categories.fashionStyle"),
      "Home & Furniture": t("categories.homeFurniture"),
      "Home & Furnituer": t("categories.homeFurniture"),
      "Job Board": t("categories.jobBoard"),
      "JobBoard": t("categories.jobBoard"),
      "Real Estate": t("categories.realEstate"),
      "RealEstate": t("categories.realEstate"),
      "Services": t("categories.services"),
      "Sport & Game": t("categories.sportGame"),
      "Sports & Game": t("categories.sportGame"),
      "Pet & Animals": t("categories.petAnimals"),
      "Other": t("categories.other"),
      "Commercial": t("categories.commercial")
    };
    return categoryMap[trimmedCategory] || trimmedCategory;
  };

  const formatCategory = (category) => {
    // Return translated category instead of formatting
    return translateCategory(category);
  };

  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // ⚠️⚠️⚠️ IMPORTANT: ALL isActive LOGIC IN THIS FILE IS REVERSED ⚠️⚠️⚠️
  //
  // REASON: Backend carousel endpoints (at http://168.231.80.24:9002/route/*Carousal) have a bug.
  // They filter and return listings where isActive !== true (inactive listings) instead of active ones.
  //
  // WORKAROUND: We reversed the meaning of isActive throughout the application:
  // - isActive: false = "Active/Enabled" (shows in carousels, UI shows as Active) ✅
  // - isActive: true = "Not Active/Disabled" (hidden from carousels, UI shows as Not Active) ❌
  //
  // This affects:
  // - Status display: Shows "Active" when isActive === false
  // - Link states: Links are enabled when isActive === false, disabled when true
  // - Button appearance: Blue/unlocked when false, gray/locked when true
  // - Toggle function: Toggles between false (active) and true (inactive)
  //
  // TODO: When backend is fixed to return active listings (isActive === true),
  // revert ALL logic in this file:
  // 1. Status: {record.isActive ? "Active" : "Not Active"}
  // 2. Links: {!record.isActive ? "#" : "url"}
  // 3. Styles: {!record.isActive ? "disabled" : "enabled"}
  // 4. Toggle button: backgroundColor when isActive === true
  //
  const columns = [
    {
      title: t("myListing.image"),
      dataIndex: "galleryImages",
      align: i18n.language.startsWith('ar') ? 'right' : 'left',
      render: (images, record) => (
        <div className="listingtable-img">
          <Link
            onClick={() => {
              console.log(record.category, "record.category_______");
            }}
            to={
              record.isActive
                ? "#"
                : `/Dynamic_Route?id=${record.id}&callingFrom=${formatCategory(
                    record.category.trim() === "Pet & Animals"
                      ? "PetAnimalsComp"
                      : record.category.trim() === "Motors"
                      ? "AutomotiveComp"
                      : record.category.trim() === "Other"
                      ? "Education"
                      : record.category.trim() === "Services"
                      ? "TravelComp"
                      : record.category.trim() === "JobBoard"
                      ? "JobBoard"
                      : record.category.trim() === "FashionStyle"
                      ? "FashionStyle"
                      : record.category.trim() === "Electronics"
                      ? "ElectronicComp"
                      : record.category.trim() === "Home & Furnituer"
                      ? "HealthCareComp"
                      : record.category.trim() === "Sports & Game"
                      ? "SportGamesComp"
                      : record.category.trim() === "Real Estate"
                      ? "RealEstateComp"
                      : formatCategory(record.category.trim())
                  )}`
            }
            style={{
              // REVERSED: Image link disabled when true (Not Active), enabled when false (Active)
              pointerEvents: record.isActive ? "none" : "auto",
              opacity: record.isActive ? 0.5 : 1,
              cursor: record.isActive ? "not-allowed" : "pointer",
            }}
          >
            <img
              className="img-fluid avatar-img"
              src={images?.[0] || "placeholder.jpg"}
              alt=""
              style={{
                width: "150px",
                height: "100px",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
          </Link>
        </div>
      ),
      sorter: (a, b) =>
        (a.galleryImages?.[0]?.length || 0) -
        (b.galleryImages?.[0]?.length || 0),
    },
    {
      title: t("myListing.details"),
      dataIndex: "title",
      align: i18n.language.startsWith('ar') ? 'right' : 'left',
      render: (text, record) => (
        <>
          <h6>
            <Link
              to={
                record.isActive
                  ? "#"
                  : `/Dynamic_Route?id=${
                      record.id
                    }&callingFrom=${formatCategory(
                      record.category.trim() === "Pet & Animals"
                        ? "PetAnimalsComp"
                        : record.category.trim() === "Motors"
                        ? "AutomotiveComp"
                        : record.category.trim() === "Other"
                        ? "Education"
                        : record.category.trim() === "Services"
                        ? "TravelComp"
                        : record.category.trim() === "JobBoard"
                        ? "JobBoard"
                        : record.category.trim() === "FashionStyle"
                        ? "FashionStyle"
                        : record.category.trim() === "Electronics"
                        ? "ElectronicComp"
                        : record.category.trim() === "Home & Furnituer"
                        ? "HealthCareComp"
                        : record.category.trim() === "Sports & Game"
                        ? "SportGamesComp"
                        : record.category.trim() === "Real Estate"
                        ? "RealEstateComp"
                        : formatCategory(record.category.trim())
                    )}`
              }
              style={{
                pointerEvents: record.isActive ? "none" : "auto",
                opacity: record.isActive ? 0.5 : 1,
                cursor: record.isActive ? "not-allowed" : "pointer",
              }}
            >
              {getTranslatedField(record, 'title', i18n.language) || text}
            </Link>
          </h6>
          <div className="listingtable-rate" style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            direction: i18n.language.startsWith('ar') ? 'rtl' : 'ltr',
            flexDirection: i18n.language.startsWith('ar') ? 'row-reverse' : 'row',
            justifyContent: i18n.language.startsWith('ar') ? 'flex-start' : 'flex-start'
          }}>
            <Link
              to={
                record.isActive
                  ? "#"
                  : `/Dynamic_Route?id=${
                      record.id
                    }&callingFrom=${formatCategory(
                      record.category.trim() === "Pet & Animals"
                        ? "PetAnimalsComp"
                        : record.category.trim() === "Motors"
                        ? "AutomotiveComp"
                        : record.category.trim() === "Other"
                        ? "Education"
                        : record.category.trim() === "Services"
                        ? "TravelComp"
                        : record.category.trim() === "JobBoard"
                        ? "JobBoard"
                        : record.category.trim() === "FashionStyle"
                        ? "FashionStyle"
                        : record.category.trim() === "Electronics"
                        ? "ElectronicComp"
                        : record.category.trim() === "Home & Furnituer"
                        ? "HealthCareComp"
                        : record.category.trim() === "Sports & Game"
                        ? "SportGamesComp"
                        : record.category.trim() === "Real Estate"
                        ? "RealEstateComp"
                        : formatCategory(record.category.trim())
                    )}`
              }
              className="cat-icon"
              style={{
                pointerEvents: record.isActive ? "none" : "auto",
                opacity: record.isActive ? 0.5 : 1,
                cursor: record.isActive ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                flexDirection: i18n.language.startsWith('ar') ? 'row-reverse' : 'row'
              }}
            >
              <FaRegStopCircle />
              {formatCategory(record.category)}
            </Link>
            <span className="discount-amt" style={{
              color: "#2d4495",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              flexDirection: i18n.language.startsWith('ar') ? 'row-reverse' : 'row'
            }}>
              <img
                src="https://www.sama.gov.sa/ar-sa/Currency/Documents/Saudi_Riyal_Symbol-2.svg"
                alt="Saudi Riyal Symbol"
                style={{
                  height: "1em",
                  verticalAlign: "middle",
                }}
              />
              {record.Price}
            </span>
          </div>
          <p>{getTranslatedField(record, 'description', i18n.language) || record.tagline}.</p>
        </>
      ),
      sorter: (a, b) => (a.title?.length || 0) - (b.title?.length || 0),
    },
    {
      title: t("myListing.status"),
      dataIndex: "status",
      align: i18n.language.startsWith('ar') ? 'right' : 'left',
      render: (text, record) => (
        <span className={record.bg}>
          {/* REVERSED: false = Active, true = Not Active (see comment at top of columns) */}
          {!record.isActive ? t("myListing.active") : t("myListing.notActive")}
        </span>
      ),
      sorter: (a, b) => (a.status?.length || 0) - (b.status?.length || 0),
    },
    ...(showInvoiceColumn
      ? [
          {
            title: t("myListing.invoice"),
            dataIndex: "invoiceNumber",
            align: i18n.language.startsWith('ar') ? 'right' : 'left',
            render: (text, record) => (
              <div
                className="invoice-cell"
                onClick={() => {
                  // REVERSED: Invoice clickable when false (Active), disabled when true (Not Active)
                  if (!record.isActive) {
                    setSelectedInvoice(record);
                    setShowInvoiceModal(true);
                  }
                }}
                style={{
                  cursor: record.isActive ? "not-allowed" : "pointer",
                  opacity: record.isActive ? 0.5 : 1,
                }}
              >
                <div>
                  <div>
                    <strong>Invoice #{text || "N/A"}</strong>
                  </div>
                  <div className="invoice-date">{record.invoiceDate}</div>
                  <div className="invoice-status">{record.invoiceStatus}</div>
                </div>
              </div>
            ),
            sorter: (a, b) =>
              (a.invoiceNumber?.length || 0) - (b.invoiceNumber?.length || 0),
          },
        ]
      : []),
    {
      title: t("myListing.views"),
      dataIndex: "views", // ✅ correct field
      align: i18n.language.startsWith('ar') ? 'right' : 'left',
      render: (text, record) => <span>{record.views ?? 0}</span>,
      sorter: (a, b) => (a.views || 0) - (b.views || 0),
    },
    {
      title: t("myListing.action"),
      dataIndex: "class",
      align: i18n.language.startsWith('ar') ? 'right' : 'left',
      render: (text, record) => (
        <div
          className={text}
          // REVERSED: "View Item" when false (Active), "Not Active" when true
          title={!record.isActive ? "View Item" : "Not Active"}
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-start",
          }}
        >
          <Link
            to={
              record.isActive
                ? "#"
                : `/Dynamic_Route?id=${record.id}&callingFrom=${formatCategory(
                    record.category.trim() === "Pet & Animals"
                      ? "PetAnimalsComp"
                      : record.category.trim() === "Motors"
                      ? "AutomotiveComp"
                      : record.category.trim() === "Other"
                      ? "Education"
                      : record.category.trim() === "Services"
                      ? "TravelComp"
                      : record.category.trim() === "JobBoard"
                      ? "JobBoard"
                      : record.category.trim() === "FashionStyle"
                      ? "FashionStyle"
                      : record.category.trim() === "Electronics"
                      ? "ElectronicComp"
                      : record.category.trim() === "Home & Furnituer"
                      ? "HealthCareComp"
                      : record.category.trim() === "Sports & Game"
                      ? "SportGamesComp"
                      : record.category.trim() === "Real Estate"
                      ? "RealEstateComp"
                      : formatCategory(record.category.trim())
                  )}`
            }
            className="action-btn btn-view"
            onClick={(e) => {
              // Prevent navigation if inactive
              if (record.isActive) {
                e.preventDefault();
              }
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: record.isActive ? "none" : "auto",
              opacity: record.isActive ? 0.5 : 1,
              cursor: record.isActive ? "not-allowed" : "pointer",
            }}
          >
            <FaRegEye />
          </Link>
          <Link
            to={
              record.isActive
                ? "#"
                : `/add-listing?id=${record.id}&callingFrom=${formatCategory(
                    record.category
                  )}`
            }
            className="action-btn btn-edit"
            title={"Edit Item"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              // REVERSED: Edit enabled when false (Active), disabled when true (Not Active)
              pointerEvents: record.isActive ? "none" : "auto",
              opacity: record.isActive ? 0.5 : 1,
              cursor: record.isActive ? "not-allowed" : "pointer",
            }}
          >
            <i className="feather-edit-3" />
          </Link>
          <button
            className={`action-btn ${
              !record.isActive ? "btn-enabled" : "btn-disabled"
            }`}
            onClick={() => {
              // REVERSED: Toggles between false (Active) and true (Not Active)
              toggleDisable(
                record.id,
                formatCategory(record.category),
                !record.isActive
              );
              console.log(record, "record______");
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              // REVERSED: Blue when false (Active), gray when true (Not Active)
              backgroundColor: !record.isActive ? "#2d4495" : "#cccccc",
              color: "#ffffff",
              cursor: "pointer",
              border: "none",
            }}
            title={!record.isActive ? "Disable Item" : "Enable Item"}
          >
            <i
              // REVERSED: Unlocked when false (Active), locked when true (Not Active)
              className={!record.isActive ? "feather-unlock" : "feather-lock"}
            />
          </button>
        </div>
      ),
      sorter: (a, b) => (a.class?.length || 0) - (b.class?.length || 0),
    },
  ];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  const paginatedData = filteredCars.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <Modal show={view} onHide={handleCloseview} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Property Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container p-3">
            <div className="row g-3">
              {Object.entries(FormDataView).map(([key, value]) =>
                value &&
                typeof value !== "object" &&
                key !== "galleryImages" ? (
                  <div key={key} className="col-md-6">
                    <strong className="text-dark">
                      {key.replace(/([A-Z])/g, " $1").trim()}:
                    </strong>
                    <span className="ms-2 text-muted">{value}</span>
                  </div>
                ) : null
              )}
            </div>
            {FormDataView.galleryImages &&
              FormDataView.galleryImages.length > 0 && (
                <div className="mt-4">
                  <strong className="text-dark">Gallery Images:</strong>
                  <div className="d-flex flex-wrap gap-3 mt-3">
                    {FormDataView.galleryImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Gallery ${index}`}
                        className="img-thumbnail rounded"
                        style={{ width: 100, height: 100, objectFit: "cover" }}
                      />
                    ))}
                  </div>
                </div>
              )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseview}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showInvoiceModal}
        onHide={() => setShowInvoiceModal(false)}
        style={{ marginTop: "70px" }}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Invoice Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInvoice && (
            <div className="invoice-detail">
              <h2>Invoice #{selectedInvoice.invoiceNumber}</h2>
              <p>
                <strong>Date:</strong> {selectedInvoice.invoiceDate}
              </p>
              <p>
                <strong>Status:</strong> {selectedInvoice.invoiceStatus}
              </p>
              <hr />
              <h3>Billing To:</h3>
              <p>
                {selectedInvoice.billingName}
                <br />
                Email: {selectedInvoice.billingEmail}
                <br />
                Phone: {selectedInvoice.billingPhone}
              </p>
              <h3>Ad Details:</h3>
              <p>
                <strong>Title:</strong> {selectedInvoice.adTitle}
              </p>
              <p>
                <strong>Ad ID:</strong> {selectedInvoice.adId}
              </p>
              <h3>Payment Details:</h3>
              <table className="invoice-items">
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
                {selectedInvoice.paymentDetails?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.description}</td>
                    <td>{item.amount}</td>
                  </tr>
                ))}
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>
                    <strong>{selectedInvoice.totalAmount}</strong>
                  </td>
                </tr>
              </table>
              <hr />
              <p>Payment Method: {selectedInvoice.paymentMethod}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        style={{ marginTop: "3%", overflow: "scroll" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{show ? "Edit Item" : "View Item Details"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {show ? (
            Object.keys(formData).length > 0 ? (
              <Form>
                {Object.keys(formData).map((key) => (
                  <Form.Group className="mt-3" key={key}>
                    <Form.Label>
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                    />
                  </Form.Group>
                ))}
              </Form>
            ) : (
              <p>No fields available to edit.</p>
            )
          ) : (
            <div className="container">
              <Row>
                {Object.entries(formData).map(([key, value]) =>
                  value &&
                  typeof value !== "object" &&
                  key !== "galleryImages" ? (
                    <Col md={6} key={key} className="mb-3">
                      <strong className="text-primary">
                        {key.replace(/([A-Z])/g, " $1").trim()}:
                      </strong>
                      <p className="text-muted mb-0">{value}</p>
                    </Col>
                  ) : null
                )}
              </Row>
              {formData.galleryImages && formData.galleryImages.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-primary">Gallery Images:</h5>
                  <Row className="g-2">
                    {formData.galleryImages.map((img, index) => (
                      <Col xs={4} sm={3} md={2} key={index}>
                        <Card className="border-0 shadow-sm">
                          <Card.Img
                            variant="top"
                            src={img}
                            alt={`Gallery ${index}`}
                            className="rounded"
                            style={{
                              width: "100%",
                              height: "100px",
                              objectFit: "cover",
                            }}
                          />
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {show && (
            <Button variant="primary" onClick={updateItem}>
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>

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
              <li className="active">
                <Link to="/my-listing">
                  <FaListUl /> <span>{t("common.myListing")}</span>
                </Link>
              </li>
              <li>
                <Link to="/manage-commercial-ads">
                  <FaBullhorn /> <span>{t("messages.commercialAds")}</span>
                </Link>
              </li>
              <li>
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

          <div className="dash-listingcontent dashboard-info">
            <div className="dash-cards card">
              <div
                style={{
                  display: "flex",
                  justifyContent: isMobile ? "flex-start" : "space-between",
                  alignItems: isMobile ? "flex-start" : "center",
                  padding: isMobile ? "10px" : "15px",
                  backgroundColor: "#fff",
                  borderBottom: "1px solid #e0e0e0",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? "10px" : "0",
                }}
              >
                <h4
                  style={{
                    margin: "0",
                    fontSize: isMobile ? "18px" : "20px",
                    fontWeight: "600",
                  }}
                >
                  {t("myListing.myListings")}
                </h4>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "5px" : "10px",
                    flexDirection: isMobile ? "row" : "row", // Keep row for both mobile and desktop
                    width: isMobile ? "100%" : "auto",
                    justifyContent: isMobile ? "space-between" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: isMobile ? "50%" : "auto",
                    }}
                  >
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      <li style={{ position: "relative" }}>
                        <Link
                          to="#"
                          className="dropdown-toggle pageviews-link"
                          data-bs-toggle="dropdown"
                          aria-expanded={change}
                          onClick={() => {
                            setChange(!change);
                            console.log("Change:", change);
                          }}
                          style={{
                            textDecoration: "none",
                            color: "#000",
                            padding: isMobile ? "6px 10px" : "8px 12px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            display: "inline-flex",
                            alignItems: "center",
                            fontSize: isMobile ? "12px" : "14px",
                            width: isMobile ? "100%" : "auto",
                            justifyContent: isMobile ? "center" : "flex-start",
                            textAlign: "center",
                          }}
                        >
                          <span>
                            {filter === "All Listing"
                              ? t("myListing.allListing")
                              : filter === "Featured Ads"
                              ? t("myListing.featuredAds")
                              : filter === "Not Featured Ads"
                              ? t("myListing.notFeaturedAds")
                              : filter}
                          </span>
                        </Link>
                        <div
                          className={`dropdown-menu dropdown-menu-end ${
                            change ? "show" : ""
                          }`}
                          style={{
                            position: "absolute",
                            top: "calc(100% + 5px)",
                            left: isMobile ? "0" : "auto",
                            right: isMobile ? "0" : "0",
                            backgroundColor: "#fff",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            borderRadius: "4px",
                            minWidth: isMobile ? "120px" : "150px",
                            zIndex: 1000,
                          }}
                        >
                          <Link
                            className="dropdown-item"
                            to="#"
                            onClick={() => handleFilterChange("All Listing")}
                            style={{
                              display: "block",
                              padding: isMobile ? "6px 12px" : "8px 16px",
                              textDecoration: "none",
                              color: "#000",
                              fontSize: isMobile ? "12px" : "14px",
                            }}
                          >
                            {t("myListing.allListing")}
                          </Link>
                          <Link
                            className="dropdown-item"
                            to="#"
                            onClick={() => handleFilterChange("Featured Ads")}
                            style={{
                              display: "block",
                              padding: isMobile ? "6px 12px" : "8px 16px",
                              textDecoration: "none",
                              color: "#000",
                              fontSize: isMobile ? "12px" : "14px",
                            }}
                          >
                            {t("myListing.featuredAds")}
                          </Link>
                          <Link
                            className="dropdown-item"
                            to="#"
                            onClick={() =>
                              handleFilterChange("Not Featured Ads")
                            }
                            style={{
                              display: "block",
                              padding: isMobile ? "6px 12px" : "8px 16px",
                              textDecoration: "none",
                              color: "#000",
                              fontSize: isMobile ? "12px" : "14px",
                            }}
                          >
                            {t("myListing.notFeaturedAds")}
                          </Link>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <Link
                    className="nav-link header-login add-listing"
                    to="/add-listing"
                    style={{
                      backgroundColor: "#2d4495",
                      color: "#fff",
                      padding: isMobile ? "6px 10px" : "8px 12px",
                      borderRadius: "4px",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: isMobile ? "12px" : "14px",
                      width: isMobile ? "50%" : "auto",
                      justifyContent: isMobile ? "center" : "flex-start",
                      textAlign: "center",
                    }}
                  >
                    <i
                      className="fa-solid fa-plus"
                      style={{ fontSize: isMobile ? "12px" : "14px" }}
                    />
                    {t("myListing.addListing")}
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <div className="listing-search">
                  <div className="filter-content form-group">
                    <div className="group-img">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t("myListing.search")}
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                      <i className="feather-search" />
                    </div>
                  </div>
                  <div className="sorting-div">
                    <div className="sortbyset">
                      <span className="sortbytitle">{t("myListing.sortBy")}</span>
                      <div className="sorting-select">
                        <select
                          value={sortOrder}
                          onChange={handleSortChange}
                          className="form-control"
                        >
                          <option value="Newest">{t("myListing.newestFirst")}</option>
                          <option value="Oldest">{t("myListing.oldestFirst")}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
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
                  ) : (
                    <>
                      {/* Mobile Cards View */}
                      <div className="mobile-listing-cards">
                        {filteredCars.length === 0 ? (
                          <div className="mobile-listing-empty">
                            <FaListUl />
                            <p>{t("myListing.noListings") || "No listings found"}</p>
                          </div>
                        ) : (
                          filteredCars.map((record) => (
                            <div key={record.id} className="mobile-listing-card">
                              <div className="mobile-listing-card-content">
                                <Link
                                  to={
                                    record.isActive
                                      ? "#"
                                      : `/Dynamic_Route?id=${record.id}&callingFrom=${formatCategory(
                                          record.category.trim() === "Pet & Animals"
                                            ? "PetAnimalsComp"
                                            : record.category.trim() === "Motors"
                                            ? "AutomotiveComp"
                                            : record.category.trim() === "Other"
                                            ? "Education"
                                            : record.category.trim() === "Services"
                                            ? "TravelComp"
                                            : record.category.trim() === "JobBoard"
                                            ? "JobBoard"
                                            : record.category.trim() === "FashionStyle"
                                            ? "FashionStyle"
                                            : record.category.trim() === "Electronics"
                                            ? "ElectronicComp"
                                            : record.category.trim() === "Home & Furnituer"
                                            ? "HealthCareComp"
                                            : record.category.trim() === "Sports & Game"
                                            ? "SportGamesComp"
                                            : record.category.trim() === "Real Estate"
                                            ? "RealEstateComp"
                                            : formatCategory(record.category.trim())
                                        )}`
                                  }
                                  style={{
                                    pointerEvents: record.isActive ? "none" : "auto",
                                  }}
                                >
                                  <div className={`mobile-listing-card-image ${record.isActive ? 'inactive' : ''}`}>
                                    <img
                                      src={record.galleryImages?.[0] || "placeholder.jpg"}
                                      alt={record.title}
                                    />
                                  </div>
                                </Link>

                                <div className="mobile-listing-card-details">
                                  <div className="mobile-listing-card-info">
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                                      <p className="mobile-listing-card-category" style={{
                                        opacity: record.isActive ? 0.5 : 1,
                                      }}>
                                        <FaRegStopCircle />
                                        {formatCategory(record.category)}
                                      </p>
                                      <span className={`mobile-listing-card-status ${record.isActive ? 'inactive' : 'active'}`}>
                                        {record.isActive ? t("myListing.notActive") || "Not Active" : t("myListing.active") || "Active"}
                                      </span>
                                    </div>

                                    <h3 className="mobile-listing-card-title">
                                      <Link
                                        to={
                                          record.isActive
                                            ? "#"
                                            : `/Dynamic_Route?id=${record.id}&callingFrom=${formatCategory(
                                                record.category.trim() === "Pet & Animals"
                                                  ? "PetAnimalsComp"
                                                  : record.category.trim() === "Motors"
                                                  ? "AutomotiveComp"
                                                  : record.category.trim() === "Other"
                                                  ? "Education"
                                                  : record.category.trim() === "Services"
                                                  ? "TravelComp"
                                                  : record.category.trim() === "JobBoard"
                                                  ? "JobBoard"
                                                  : record.category.trim() === "FashionStyle"
                                                  ? "FashionStyle"
                                                  : record.category.trim() === "Electronics"
                                                  ? "ElectronicComp"
                                                  : record.category.trim() === "Home & Furnituer"
                                                  ? "HealthCareComp"
                                                  : record.category.trim() === "Sports & Game"
                                                  ? "SportGamesComp"
                                                  : record.category.trim() === "Real Estate"
                                                  ? "RealEstateComp"
                                                  : formatCategory(record.category.trim())
                                              )}`
                                        }
                                        style={{
                                          pointerEvents: record.isActive ? "none" : "auto",
                                          opacity: record.isActive ? 0.5 : 1,
                                          cursor: record.isActive ? "not-allowed" : "pointer",
                                        }}
                                      >
                                        {getTranslatedField(record, 'title', i18n.language) || record.title}
                                      </Link>
                                    </h3>

                                    <div className="mobile-listing-card-meta" style={{
                                      opacity: record.isActive ? 0.5 : 1,
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}>
                                      {record.Price && (
                                        <p className="mobile-listing-card-price" style={{ margin: 0 }}>
                                          <img src="https://www.sama.gov.sa/ar-sa/Currency/Documents/Saudi_Riyal_Symbol-2.svg" alt="SAR" />
                                          {record.Price}
                                        </p>
                                      )}
                                      <div className="mobile-listing-card-views">
                                        <FaRegEye />
                                        {record.views ?? 0} {t("myListing.views") || "views"}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="mobile-listing-card-actions">
                                <Link
                                  to={
                                    record.isActive
                                      ? "#"
                                      : `/Dynamic_Route?id=${record.id}&callingFrom=${formatCategory(
                                          record.category.trim() === "Pet & Animals"
                                            ? "PetAnimalsComp"
                                            : record.category.trim() === "Motors"
                                            ? "AutomotiveComp"
                                            : record.category.trim() === "Other"
                                            ? "Education"
                                            : record.category.trim() === "Services"
                                            ? "TravelComp"
                                            : record.category.trim() === "JobBoard"
                                            ? "JobBoard"
                                            : record.category.trim() === "FashionStyle"
                                            ? "FashionStyle"
                                            : record.category.trim() === "Electronics"
                                            ? "ElectronicComp"
                                            : record.category.trim() === "Home & Furnituer"
                                            ? "HealthCareComp"
                                            : record.category.trim() === "Sports & Game"
                                            ? "SportGamesComp"
                                            : record.category.trim() === "Real Estate"
                                            ? "RealEstateComp"
                                            : formatCategory(record.category.trim())
                                        )}`
                                  }
                                  onClick={(e) => {
                                    if (record.isActive) {
                                      e.preventDefault();
                                    }
                                  }}
                                >
                                  <button
                                    className="mobile-listing-card-action-btn view"
                                    disabled={record.isActive}
                                  >
                                    <FaRegEye />
                                  </button>
                                </Link>
                                <Link
                                  to={
                                    record.isActive
                                      ? "#"
                                      : `/add-listing?id=${record.id}&callingFrom=${formatCategory(
                                          record.category
                                        )}`
                                  }
                                  onClick={(e) => {
                                    if (record.isActive) {
                                      e.preventDefault();
                                    }
                                  }}
                                >
                                  <button
                                    className="mobile-listing-card-action-btn edit"
                                    disabled={record.isActive}
                                  >
                                    <FaEdit />
                                  </button>
                                </Link>
                                <button
                                  className="mobile-listing-card-action-btn lock"
                                  onClick={() => {
                                    toggleDisable(
                                      record.id,
                                      formatCategory(record.category),
                                      !record.isActive
                                    );
                                  }}
                                  style={{
                                    backgroundColor: !record.isActive ? "#2d4495" : "#cccccc",
                                  }}
                                >
                                  {!record.isActive ? (
                                    <i className="feather-unlock" />
                                  ) : (
                                    <i className="feather-lock" />
                                  )}
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Desktop Table View */}
                      <div dir={i18n.language.startsWith('ar') ? 'rtl' : 'ltr'} style={{
                        direction: i18n.language.startsWith('ar') ? 'rtl' : 'ltr',
                        textAlign: i18n.language.startsWith('ar') ? 'right' : 'left'
                      }}>
                        <Table
                          className="listing-table datatable"
                          columns={columns}
                          dataSource={filteredCars}
                          rowKey={(record) => record.id}
                          pagination={false}
                        />
                      </div>
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
                          <FaArrowLeft /> <span>{t("myListing.prev")}</span>
                        </Link>
                      </li>
                      <li className="justify-content-center pagination-center">
                        <div className="pagelink">
                          <ul>{renderPaginationItems()}</ul>
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
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
                          }
                        >
                          <span>{t("myListing.next")}</span> <FaArrowRight />
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyListe;
