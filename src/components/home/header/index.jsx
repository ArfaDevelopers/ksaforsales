import React, { useState, useRef, useEffect } from "react";
import {
  FaSearch,
  FaThLarge,
  FaStickyNote,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
  FaFolderOpen,
} from "react-icons/fa";
import { FiBell } from "react-icons/fi"; // or FaBell from 'react-icons/fa'
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../../LanguageContext";

import UpperHeader from "../upperHeader/Upper_Header";
import HeaderLower from "../HeaderlowerNav/HeaderLower";
import imag from "../../../../public/NewLogo.png";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, storage } from "../../Firebase/FirebaseConfig";
import { Phone, profile_img } from "../../imagepath";
import { Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";

// import { storage } from "../../../FirebaseConfig"; // ✅ Correct path

import {
  FaCar,
  FaMobileAlt,
  FaTshirt,
  FaCouch,
  FaBriefcase,
  FaHome,
  FaTools,
  FaGamepad,
  FaPaw,
  FaBook,
  FaBullhorn,
  FaEnvelope,
  FaBell,
} from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { IoIosAddCircle } from "react-icons/io";
import { BiCategory } from "react-icons/bi";
import { MdManageAccounts } from "react-icons/md";
import Flag from "react-world-flags";
import useSearchStore from "../../../store/searchStore"; // adjust the path
import fallbackImage from "../../../../public/7309681.jpg";

const Header = ({ parms }) => {
  const { t, i18n } = useTranslation();
  const db = getFirestore();
  const location = useLocation();

  const [menu, setMenu] = useState(false);
  const [ImageURL, setImageURL] = useState(""); // ✅ Define the state
  var useraa = localStorage.getItem("user");
  const token = auth.currentUser;
  const [isOpen, setIsOpen] = useState(false);
  const [showBottomNav, setShowBottomNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Function to toggle the modal's visibility.
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const [notifications, setNotifications] = useState([]);
  // console.log(notifications, "notifications______");
  const formatDate = (createdAt) => {
    if (!createdAt || !createdAt._seconds) return "";
    const date = new Date(createdAt._seconds * 1000);
    return date.toLocaleString();
  };
  const unseenCount = notifications.filter(
    (note) => note.seen === false,
  ).length;

  const fetchNotifications = async () => {
    // Only fetch if user is logged in
    if (!useraa) {
      setNotifications([]);
      return;
    }

    try {
      const response = await fetch("/currentUserData/receivedMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: useraa,
        }),
      });

      // Check if response is ok before parsing
      if (!response.ok) {
        console.error("Notifications API error:", response.status);
        return;
      }

      const data = await response.json();
      setNotifications(data?.messages || []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setNotifications([]);
    }
  };

  useEffect(() => {
    // Only set up polling if user is logged in
    if (!useraa) {
      setNotifications([]);
      return;
    }

    // Fetch once on load
    fetchNotifications();

    // Set up polling every 5 seconds
    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 5000); // 5000ms = 5 seconds

    // Cleanup when component unmounts
    return () => clearInterval(intervalId);
  }, [useraa]); // Add useraa as dependency

  // Filter for unseen messages
  const unseenNotifications = notifications.filter((note) => !note.seen);
  // const unseenCount = unseenNotifications.length;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(
          collection(db, "messages"),
          where("recieverId", "==", user.uid),
        );

        const unsubscribeMessages = onSnapshot(q, (querySnapshot) => {
          const receivedMessages = [];
          querySnapshot.forEach((doc) => {
            receivedMessages.push({ id: doc.id, ...doc.data() });
          });
          // console.log("Received messages:", receivedMessages);
        });

        // Clean up Firestore listener
        return () => unsubscribeMessages();
      }
    });

    // Clean up auth listener
    return () => unsubscribe();
  }, []);

  // Handle scroll to show/hide bottom navigation on mobile
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show nav when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        // Scrolling up
        setShowBottomNav(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down and not at the very top
        setShowBottomNav(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Prevent background scroll when notification modal is open
  useEffect(() => {
    if (isOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      // Prevent scrolling on body
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      // Restore scrolling
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      // Restore scroll position
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  // console.log(token, "-------Token---------");
  const menuRef = useRef(null);
  const isSelecting = useRef(false);
  const getImageURL = async () => {
    const imageRef = ref(storage, "ksa4sale4 final file-01.png"); // image path inside storage

    try {
      const url = await getDownloadURL(imageRef);
      // console.log("Image URL:", url);

      return url;
    } catch (error) {
      // console.error("Error fetching image URL:", error);
      return null;
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getImageURL().then((url) => {
      if (url) {
        setImageURL(url);
        // Example usage
        // console.log("Direct public image link:", url);
      }
    });
  }, []);

  const navigate = useNavigate();
  const handleNotificationClick = () => {
    navigate("/messages");
  };
  const [userId, setUserId] = useState("");
  const [drops, setDrops] = useState(false);
  const [divideName, setDivideName] = useState(null);
  const [divideImage, setDivideImage] = useState(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [openCategories, setOpenCategories] = useState({});
  const [openSubcategories, setOpenSubcategories] = useState({});
  // const { searchText, setSearchText, results } = useSearchStore();
  const dropdownRef = useRef(null);

  const {
    searchText,
    setSearchText,
    results,
    setSelectedItem,
    showSuggestions,
  } = useSearchStore();

  // console.log(setSelectedItem, "user1111____911");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // console.log("user1111", user);
        setUserId(user.uid);
        setDivideName(user.displayName || "User");
        setDivideImage(user.photoURL || "User");
      } else {
        // console.log("No user is logged in.");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const onHandleMobileMenu = (e) => {
    e.stopPropagation();
    document.documentElement.classList.add("menu-opened");
    setMenu(true);
  };

  const onhandleCloseMenu = (e) => {
    e.stopPropagation();
    document.documentElement.classList.remove("menu-opened");
    setMenu(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleSubcategory = (subcategory) => {
    setOpenSubcategories((prev) => ({
      ...prev,
      [subcategory]: !prev[subcategory],
    }));
  };
  const { language: selectedLanguage, toggleLanguage } =
    React.useContext(LanguageContext);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleLanguageChange = (lang) => {
    toggleLanguage(lang);
    setIsDropdownVisible(false);
  };
  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };
  const [searchParams, setSearchParams] = useSearchParams();
  // useEffect(() => {
  //   setSearchText(searchParams.get("q"))
  // },[])
  const handleSearch = (e) => {
    e.preventDefault();
    useSearchStore.setState({ results: [], showSuggestions: false });
    navigate(`/search?q=${searchText}`);
    // Clear search input after navigation
    setTimeout(() => setSearchText(""), 0);
  };

  return (
    <>
      <header className="header">
        {/* <UpperHeader /> */}
        <div
          className="containerWrapper"
          style={{
            borderBottom: "1px solid #a0a0a0",
          }}
        >
          <div className="container">
            <nav
              className="navbar navbar-expand-lg header-nav"
              style={{
                height: window.innerWidth <= 576 ? "87px" : "111px",
              }}
            >
              <div
                className="top_log_header d-flex align-items-center justify-content-between"
                style={{ flexWrap: "nowrap" }}
              >
                <div className="navbar-header d-flex align-items-center">
                  <Link
                    to="/"
                    className="navbar-brand logo"
                    style={{
                      marginRight: "15px",
                    }}
                  >
                    <img
                      src={imag}
                      alt="Logo"
                      className="img-fluid"
                      style={{
                        width: window.innerWidth <= 575 ? "82px" : "110px",
                        height: "auto",
                      }}
                    />
                  </Link>
                  {/* <Link id="mobile_btn" to="#" onClick={toggleMobileMenu}>
                  <span className="bar-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </Link> */}
                  {token ? (
                    <button
                      id="mobile_btn"
                      type="button"
                      onClick={toggleMobileMenu}
                      className="menu-btn"
                      style={{
                        border: "none",
                        background: "#36a680",
                      }}
                    >
                      <span className="bar-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                    </button>
                  ) : (
                    ""
                  )}
                  <div
                    className="lang_dropdown"
                    style={{
                      position: "relative",
                      display: "flex",
                    }}
                  >
                    <button
                      className="btn dropdown-toggle"
                      onClick={toggleDropdown}
                      aria-expanded={isDropdownVisible ? "true" : "false"}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "5px 10px",
                        backgroundColor: "#fff",
                        // border: "1px solid #ddd",
                        cursor: "pointer",
                        gap: "2px",
                      }}
                    >
                      <Flag
                        code={selectedLanguage === "en" ? "GB" : "SA"}
                        className="flag-icon"
                        style={{
                          width: "27px",
                          marginRight: selectedLanguage === "en" ? "5px" : "0",
                          marginLeft: selectedLanguage === "ar" ? "8px" : "0",
                          fontFamily: "Inter",
                        }}
                      />
                      <span
                        style={{
                          marginRight: selectedLanguage === "en" ? "10px" : "0",
                          marginLeft: selectedLanguage === "ar" ? "10px" : "0",
                        }}
                      >
                        {selectedLanguage === "en" ? "EN" : "AR"}
                      </span>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownVisible && (
                      <ul
                        className="dropdown-menu show"
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "0",
                          zIndex: 1000,
                          display: "block",
                          minWidth: "160px",
                          backgroundColor: "#fff",
                          border: "1px solid #ddd",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          listStyle: "none",
                          padding: "0",
                          margin: "0",
                        }}
                      >
                        <li>
                          <button
                            className="dropdown-item"
                            style={{
                              fontFamily: "Inter",
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                              padding: "8px 12px",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              textAlign: "left",
                            }}
                            onClick={() => handleLanguageChange("en")}
                          >
                            <Flag
                              code="GB"
                              className="flag-icon"
                              style={{
                                width: "27px",
                                marginRight: "5px",
                              }}
                            />
                            English
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            style={{
                              fontFamily: "VIP Rawy",
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                              padding: "8px 12px",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              textAlign: "left",
                            }}
                            onClick={() => handleLanguageChange("ar")}
                          >
                            <Flag
                              code="SA"
                              className="flag-icon"
                              style={{
                                width: "27px",
                                marginRight: "5px",
                              }}
                            />
                            Arabic
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                  <Offcanvas
                    show={menu}
                    onHide={toggleMobileMenu}
                    placement="start"
                    className="custom-sidebar"
                  >
                    <Offcanvas.Header className="border-bottom">
                      <Offcanvas.Title className="fs-5 fw-bold">
                        {t("nav.menu")}
                      </Offcanvas.Title>
                      <FaTimes
                        className="close-icon"
                        onClick={toggleMobileMenu}
                      />
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <nav className="sidenav" style={{ marginTop: 70 }}>
                        {[
                          {
                            name: t("categories.motors"),
                            path: "/AutomotiveComp",
                            icon: <FaCar />,
                            subcategories: [
                              {
                                name: t("subcategories.motors.carsForSale"),
                                path: "/AutomotiveComp?subCatgory=Cars For Sale",
                              },
                              {
                                name: t("subcategories.motors.carRental"),
                                path: "/AutomotiveComp?subCatgory=Car Rental",
                              },
                              {
                                name: t("subcategories.motors.platesNumber"),
                                path: "/AutomotiveComp?subCatgory=Plates Number",
                              },
                              {
                                name: t("subcategories.motors.spareParts"),
                                path: "/AutomotiveComp?subCatgory=Spare Parts",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.motors.bodyParts",
                                    ),
                                    path: "/AutomotiveComp?NestedSubCategory=Body Parts",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.motors.mechanicalParts",
                                    ),
                                    path: "/AutomotiveComp?NestedSubCategory=Mechanical Parts",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.motors.spareParts",
                                    ),
                                    path: "/AutomotiveComp?NestedSubCategory=Spare Parts",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.motors.batteries",
                                    ),
                                    path: "/AutomotiveComp/?NestedSubCategory=Batteries",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.motors.others",
                                    ),
                                    path: "/AutomotiveComp/?NestedSubCategory=Others",
                                  },
                                ],
                              },
                              {
                                name: t("subcategories.motors.accessories"),
                                path: "/AutomotiveComp?subCatgory=Accessories",
                              },
                              {
                                name: t("subcategories.motors.wheelsAndRims"),
                                path: "/AutomotiveComp?subCatgory=Wheels Rims",
                              },
                              {
                                name: t(
                                  "subcategories.motors.trucksAndHeavyMachinery",
                                ),
                                path: "/AutomotiveComp?subCatgory=Trucks Heavy Machinery",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.motors.trucks",
                                    ),
                                    path: "/AutomotiveComp?NestedSubCategory=Trucks",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.motors.dumpTruck",
                                    ),
                                    path: "/AutomotiveComp?NestedSubCategory=Dump Truck",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.motors.wheelLoader",
                                    ),
                                    path: "/AutomotiveComp?NestedSubCategory=Wheel Loader",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.motors.recovery",
                                    ),
                                    path: "/AutomotiveComp?NestedSubCategory=Recovery",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.motors.agriculturalEquipment",
                                    ),
                                    path: "/AutomotiveComp?NestedSubCategory=Agricultural Equipment",
                                  },
                                  {
                                    name: t("nestedSubcategories.motors.crane"),
                                    path: "/AutomotiveComp?NestedSubCategory=Crane",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.motors.bulldozer",
                                    ),
                                    path: "/AutomotiveComp?NestedSubCategory=Bulldozer",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.motors.crusher",
                                    ),
                                    path: "/AutomotiveComp?NestedSubCategory=Crusher",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.motors.excavator",
                                    ),
                                    path: "/AutomotiveComp?NestedSubCategory=Excavator",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.motors.heavyEquipment",
                                    ),
                                    path: "/AutomotiveComp?NestedSubCategory=Heavy Equipment",
                                  },
                                ],
                              },
                              {
                                name: t("subcategories.motors.tshaleeh"),
                                path: "/AutomotiveComp?subCatgory=Tshaleeh",
                              },
                              {
                                name: t("subcategories.motors.boatsAndJetski"),
                                path: "/AutomotiveComp?subCatgory=Boats & Jet Ski",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.motors.motorboats",
                                    ),
                                    path: "/AutomotiveComp?NestedSubCategory=Motor boats",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.motors.jetSki",
                                    ),
                                    path: "/AutomotiveComp?NestedSubCategory=Jet-ski",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.motors.others",
                                    ),
                                    path: "/AutomotiveComp?NestedSubCategory=Others",
                                  },
                                ],
                              },
                              {
                                name: t("subcategories.motors.classicCars"),
                                path: "/AutomotiveComp?subCatgory=Classic Cars",
                              },
                              {
                                name: t("subcategories.motors.salvageCars"),
                                path: "/AutomotiveComp?subCatgory=Salvage Cars",
                              },
                              {
                                name: t("subcategories.motors.mortgagedCars"),
                                path: "/AutomotiveComp?subCatgory=Mortgaged Cars",
                              },
                              {
                                name: t("subcategories.motors.recovery"),
                                path: "/AutomotiveComp?subCatgory=Recovery",
                              },
                              {
                                name: t("subcategories.motors.foodTruck"),
                                path: "/AutomotiveComp?subCatgory=Food Truck",
                              },
                              {
                                name: t("subcategories.motors.caravans"),
                                path: "/AutomotiveComp?subCatgory=Caravans",
                              },
                              {
                                name: t("subcategories.motors.reports"),
                                path: "/AutomotiveComp?subCatgory=Reports",
                              },
                              {
                                name: t("subcategories.motors.carCleaning"),
                                path: "/AutomotiveComp?subCatgory=Car Cleaning",
                              },
                            ],
                          },
                          {
                            name: t("categories.electronics"),
                            path: "/ElectronicComp",
                            icon: <FaMobileAlt />,
                            subcategories: [
                              {
                                name: t(
                                  "subcategories.electronics.mobilePhones",
                                ),
                                path: "/ElectronicComp?subCatgory=Mobile Phones",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.smartWatches",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Smart Watches",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.headsets",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Headsets",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.chargersAndCables",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Chargers & Cables",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.coversAndProtectors",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Covers & Protectors",
                                  },
                                ],
                              },
                              {
                                name: t(
                                  "subcategories.electronics.tabletDevices",
                                ),
                                path: "/ElectronicComp?subCatgory=Tablet Devices",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.iPad",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=iPad",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.galaxyTab",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Galaxy Tab",
                                  },
                                ],
                              },
                              {
                                name: t(
                                  "subcategories.electronics.computersAndLaptops",
                                ),
                                path: "/ElectronicComp?subCatgory=Computers & Laptops",
                              },
                              {
                                name: t("subcategories.electronics.videoGames"),
                                path: "/ElectronicComp?subCatgory=Video Games",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.vrGlasses",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=VR Glasses",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.playstationDevices",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=PlayStation (PS) Devices",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.playstationGames",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=PlayStation (PS) Games",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.xboxDevices",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Xbox Devices",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.xboxGames",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Xbox Games",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.nintendo",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Nintendo",
                                  },
                                ],
                              },
                              {
                                name: t(
                                  "subcategories.electronics.televisionAndAudioSystem",
                                ),
                                path: "/ElectronicComp?subCatgory=Television & Audio System",
                              },
                              {
                                name: t(
                                  "subcategories.electronics.accountsAndSubscriptions",
                                ),
                                path: "/ElectronicComp?subCatgory=Accounts & Subscriptions",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.pubg",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=PUBG",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.fortnite",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Fortnite",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.fifa",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=FIFA",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.clashOfClans",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Clash of Clans",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.clashRoyale",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Clash Royale",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.instagramAccounts",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Instagram Accounts",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.twitterAccounts",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Twitter Accounts",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.tiktokAccounts",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=TikTok Accounts",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.snapchatAccounts",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Snapchat Accounts",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.facebookAccounts",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Facebook Accounts",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.youtubeAccounts",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=YouTub eAccounts",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.otherAccounts",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Other Accounts",
                                  },
                                ],
                              },
                              {
                                name: t(
                                  "subcategories.electronics.specialNumber",
                                ),
                                path: "/ElectronicComp?subCatgory=Special Number",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.stc",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=STC",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.mobily",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Mobily",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.zain",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Zain",
                                  },
                                ],
                              },
                              {
                                name: t(
                                  "subcategories.electronics.homeAndKitchenAppliance",
                                ),
                                path: "/ElectronicComp?subCatgory=Home & Kitchen Appliance",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.stovesAndOvens",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Stoves & Ovens",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.refrigeratorsAndCoolers",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Refrigerators & Coolers",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.mixersAndBlenders",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Mixers & Blenders",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.washingMachines",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Washing Machines",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.kettles",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Kettles",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.fryers",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Fryers",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.coffeeMachines",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Coffee Machines",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.microwavesAndToasters",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=MicrowavesS & Toasters",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.vacuumCleaners",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Vacuum Cleaners",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.clothingIrons",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Clothing Irons",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.airConditioners",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Air Conditioners",
                                  },
                                ],
                              },
                              {
                                name: t(
                                  "subcategories.electronics.motorsAndGenerators",
                                ),
                                path: "/ElectronicComp?subCatgory=Motors & Generators",
                              },
                              {
                                name: t("subcategories.electronics.cameras"),
                                path: "/ElectronicComp?subCatgory=Cameras",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.lenses",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Lenses",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.drone",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Drone",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.electronics.cameraAccessories",
                                    ),
                                    path: "/ElectronicComp?NestedSubCategory=Camera Accessories",
                                  },
                                ],
                              },
                              {
                                name: t(
                                  "subcategories.electronics.networkingDevices",
                                ),
                                path: "/ElectronicComp?subCatgory=Networking Devices",
                              },
                              {
                                name: t(
                                  "subcategories.electronics.screensAndProjectors",
                                ),
                                path: "/ElectronicComp?subCatgory=Screens & Projectors",
                              },
                              {
                                name: t(
                                  "subcategories.electronics.printerAndScanner",
                                ),
                                path: "/ElectronicComp?subCatgory=Printer & Scanner",
                              },
                              {
                                name: t(
                                  "subcategories.electronics.computerAccessories",
                                ),
                                path: "/ElectronicComp?subCatgory=Computer Accessories",
                              },
                            ],
                          },
                          {
                            name: t("categories.fashionStyle"),
                            path: "/FashionStyle",
                            icon: <FaTshirt />,
                            subcategories: [
                              {
                                name: t("subcategories.fashionStyle.watches"),
                                path: "/FashionStyle?subCatgory=Watches",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.otherWatches",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Other Watches",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.mensWatches",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Men' sWatches",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.womensWatches",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Women' sWatches",
                                  },
                                ],
                              },
                              {
                                name: t(
                                  "subcategories.fashionStyle.perfumesAndIncense",
                                ),
                                path: "/FashionStyle?subCatgory=Perfumes & Incense",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.otherPerfumes",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Other Perfumes",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.mensPerfumes",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Men's Perfumes",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.womensPerfumes",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Women's Perfumes",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.oudAndIncense",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Oud & Incense",
                                  },
                                ],
                              },
                              {
                                name: t(
                                  "subcategories.fashionStyle.sportsEquipment",
                                ),
                                path: "/FashionStyle?subCatgory=Sports Equipment",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.eyeglasses",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Eyeglasses",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.otherEyeglasses",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Other Eyeglasses",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.mensEyeglasses",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Men's Eyeglasses",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.womensEyeglasses",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Women's Eyeglasses",
                                  },
                                ],
                              },
                              {
                                name: t(
                                  "subcategories.fashionStyle.mensFashion",
                                ),
                                path: "/FashionStyle?subCatgory=Men's Fashion",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.mensShemaghs",
                                    ),
                                    path: "/FashionStyle?subCatgory=Men's Shemaghs",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.mensAccessories",
                                    ),
                                    path: "/FashionStyle?subCatgory=Men's Accessories",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.mensClothing",
                                    ),
                                    path: "//FashionStyle?subCatgory=Men's Clothing",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.mensJackets",
                                    ),
                                    path: "/FashionStyle?subCatgory=Men's Jackets",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.mensBags",
                                    ),
                                    path: "/FashionStyle?subCatgory=Men's Bags",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.mensShirtsAndTrousers",
                                    ),
                                    path: "/FashionStyle?subCatgory=Men's Shirts & Trousers",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.mensSportswear",
                                    ),
                                    path: "/FashionStyle?subCatgory=Men's Sportswear",
                                  },
                                ],
                              },
                              {
                                name: t(
                                  "subcategories.fashionStyle.womensFashion",
                                ),
                                path: "/FashionStyle?subCatgory=Women's Fashion",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.womensAccessoriesAndJewelry",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Women's Accessories & Jewelry",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.womensBlousesAndTshirts",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Women's Blouses & T-Shirts",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.womensSkirtsAndTrousers",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Women's Skirts & Trousers",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.womensJackets",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Women's Jackets",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.kaftans",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Kaftans",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.womensBags",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Women's Bags",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.abayas",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Abayas",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.dresses",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Dresses",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.lingerie",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Lingerie",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.womensSportswear",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Women's Sportswear",
                                  },
                                ],
                              },
                              {
                                name: t(
                                  "subcategories.fashionStyle.childrensClothingAndAccessories",
                                ),
                                path: "/FashionStyle?subCatgory=Children's Clothing & Accessories",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.babyCareProducts",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Baby Care Products",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.childrensAccessories",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Children's Accessories",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.toysForKids",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Toys for Kids",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.childrensCribsAndChairs",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Children's Cribs & Chairs",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.childrensBags",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Children's Bags",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.strollers",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Strollers",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.carSeatsForKids",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Car Seats for Kids",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.girlsClothing",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Girl's Clothing",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.boysClothing",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Boys's Clothing",
                                  },
                                ],
                              },
                              {
                                name: t("subcategories.fashionStyle.gifts"),
                                path: "/FashionStyle?subCatgory=Gifts",
                              },
                              {
                                name: t("subcategories.fashionStyle.luggage"),
                                path: "/FashionStyle?subCatgory=Luggage",
                              },
                              {
                                name: t(
                                  "subcategories.fashionStyle.healthAndBeauty",
                                ),
                                path: "/FashionStyle?subCatgory=Health & Beauty",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.skincare",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Skincare",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.hairCare",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Hair Care",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.makeup",
                                    ),
                                    path: "/FashionStyle?NestedSubCategory=Makeup",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.fashionStyle.otherBeautyProducts",
                                    ),
                                    path: "FashionStyle?NestedSubCategory=Other Beauty Products",
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            name: t("categories.homeFurniture"),
                            path: "/HealthCareComp",
                            icon: <FaCouch />,
                            icon: <FaStickyNote />,
                            subcategories: [
                              {
                                name: t(
                                  "subcategories.homeFurniture.outdoorFurniture",
                                ),
                                path: "/HealthCareComp?subCatgory=Outdoor Furniture",
                              },
                              {
                                name: t(
                                  "subcategories.homeFurniture.majlisAndSofas",
                                ),
                                path: "/HealthCareComp?subCatgory=Majlis & Sofas",
                              },
                              {
                                name: t(
                                  "subcategories.homeFurniture.cabinetsAndWardrobes",
                                ),
                                path: "/HealthCareComp?subCatgory=Cabinets & Wardrobes",
                              },
                              {
                                name: t(
                                  "subcategories.homeFurniture.bedsAndMattresses",
                                ),
                                path: "/HealthCareComp?subCatgory=Beds & Mattresses",
                              },
                              {
                                name: t(
                                  "subcategories.homeFurniture.tablesAndChairs",
                                ),
                                path: "/HealthCareComp?subCatgory=Tables & Chairs",
                              },
                              {
                                name: t("subcategories.homeFurniture.kitchens"),
                                path: "/HealthCareComp?subCatgory=Kitchens",
                              },
                              {
                                name: t(
                                  "subcategories.homeFurniture.bathrooms",
                                ),
                                path: "/HealthCareComp?subCatgory=Bathrooms",
                              },
                              {
                                name: t("subcategories.homeFurniture.carpets"),
                                path: "/HealthCareComp?subCatgory=Carpets",
                              },
                              {
                                name: t("subcategories.homeFurniture.curtains"),
                                path: "/HealthCareComp?subCatgory=Curtains",
                              },
                              {
                                name: t(
                                  "subcategories.homeFurniture.decorationAndAccessories",
                                ),
                                path: "/HealthCareComp?subCatgory=Decoration & Accessories",
                              },
                              {
                                name: t("subcategories.homeFurniture.lighting"),
                                path: "/HealthCareComp?subCatgory=Lighting",
                              },
                              {
                                name: t(
                                  "subcategories.homeFurniture.householdItems",
                                ),
                                path: "/HealthCareComp?subCatgory=Household Items",
                              },
                              {
                                name: t(
                                  "subcategories.homeFurniture.gardenPlants",
                                ),
                                path: "/HealthCareComp?subCatgory=Garden Plants",
                              },
                              {
                                name: t(
                                  "subcategories.homeFurniture.officeFurniture",
                                ),
                                path: "/HealthCareComp?subCatgory=Office Furniture",
                              },
                              {
                                name: t(
                                  "subcategories.homeFurniture.doorsWindowsAluminium",
                                ),
                                path: "/HealthCareComp?subCatgory=Doors Windows Aluminium",
                              },
                              {
                                name: t(
                                  "subcategories.homeFurniture.tilesAndFlooring",
                                ),
                                path: "/HealthCareComp?subCatgory=Tiles & Flooring",
                              },
                            ],
                          },
                          {
                            name: t("categories.jobBoard"),
                            path: "/JobBoard",
                            icon: <FaBriefcase />,
                            subcategories: [
                              {
                                name: t(
                                  "subcategories.jobBoard.administrativeJobs",
                                ),
                                path: "/JobBoard?subCatgory=Administrative Jobs",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.marketingAndSales",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Marketing & Sales",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.customerService",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Customer Service",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.secretary",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Secretary",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.tourismAndHospitality",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Tourism & Hospitality",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.accountant",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Accountant",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.deliveryRepresentative",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Delivery Representative",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.otherAdministrativeJobs",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Other Administrative Jobs",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.publicRelationsAndMedia",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Public Relations & Media",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.translator",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Translator",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.lawyerAndLegalJobs",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Lawyer & LegalJobs",
                                  },
                                ],
                              },
                              {
                                name: t(
                                  "subcategories.jobBoard.fashionAndBeautyJobs",
                                ),
                                path: "/JobBoard?subCatgory=Fashion & Beauty Jobs",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.tailor",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Tailor",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.femaleHairdresser",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Female Hair dresser",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.fashionDesigner",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Fashion Designer",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.model",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Model",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.makeupArtist",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Makeup Artist",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.hairStylist",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Hair Stylist",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.otherBeautyJobs",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Other Beauty Jobs",
                                  },
                                ],
                              },
                              {
                                name: t(
                                  "subcategories.jobBoard.securityAndSafetyJobs",
                                ),
                                path: "/JobBoard?subCatgory=Security & Safety Jobs",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.securityGuard",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Security Guard",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.safetyTechnician",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Safety Technician",
                                  },
                                ],
                              },
                              {
                                name: t("subcategories.jobBoard.teachingJobs"),
                                path: "/JobBoard?subCatgory=Teaching Jobs",
                              },
                              {
                                name: t(
                                  "subcategories.jobBoard.itAndDesignJobs",
                                ),
                                path: "/JobBoard?subCatgory=IT & DesignJobs",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.otherItJobs",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Other IT Jobs",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.networkAndTelecommunicationsSpecialist",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Network & Telecommunications Specialist",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.contentWriter",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Content Writer",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.programmer",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Programmer",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.mediaDesigner",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Media Designer",
                                  },
                                ],
                              },
                              {
                                name: t(
                                  "subcategories.jobBoard.agricultureAndFarmingJobs",
                                ),
                                path: "/JobBoard?subCatgory=Agriculture & Farming Jobs",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.farmWorker",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Farm Worker",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.otherAgriculturalJobs",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Other Agricultural Jobs",
                                  },
                                ],
                              },
                              {
                                name: t(
                                  "subcategories.jobBoard.industrialJobs",
                                ),
                                path: "/JobBoard?subCatgory=Industrial Jobs",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.bodyworkTechnician",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Bodywork Technician",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.autoElectrician",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Auto Electrician",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.carMechanic",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Car Mechanic",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.otherIndustrialJobs",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Other Industrial Jobs",
                                  },
                                ],
                              },
                              {
                                name: t(
                                  "subcategories.jobBoard.medicalAndNursingJobs",
                                ),
                                path: "/JobBoard?subCatgory=Medical & Nursing Jobs",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.pharmacist",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Pharmacist",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.doctor",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Doctor",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.physicalTherapyTechnician",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Physical Therapy Technician",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.massageTherapist",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Massage Therapist",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.nurse",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Nurse",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.otherMedicalJobs",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Other Medical Jobs",
                                  },
                                ],
                              },
                              {
                                name: t(
                                  "subcategories.jobBoard.architectureAndConstructionJobs",
                                ),
                                path: "/JobBoard?subCatgory=Architecture & Construction Jobs",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.buildingPainter",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Building Painter",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.acTechnician",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=AC Technician",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.decorator",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Decorator",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.buildingElectrician",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Building Electrician",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.tiler",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Tiler",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.buildingSupervisor",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Building Supervisor",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.buildingContractor",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Building Contractor",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.plasterer",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Plasterer",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.carpenter",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Carpenter",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.otherConstructionJobs",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Other Construction Jobs",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.plumber",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Plumber",
                                  },
                                ],
                              },
                              {
                                name: t(
                                  "subcategories.jobBoard.housekeepingJobs",
                                ),
                                path: "/JobBoard?subCatgory=Housekeeping Jobs",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.privateDriver",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Private Driver",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.householdWorker",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Household Worker",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.domesticWorker",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Domestic Worker",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.otherLaborJobs",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Other Labor Jobs",
                                  },
                                ],
                              },
                              {
                                name: t(
                                  "subcategories.jobBoard.restaurantJobs",
                                ),
                                path: "/JobBoard?subCatgory=Restaurant Jobs",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.chefAndCookInstructor",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Chef & Cook Instructor",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.waiterAndHost",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Waiter & Host",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.jobBoard.otherRestaurantJobs",
                                    ),
                                    path: "/JobBoard?NestedSubCategory=Other Restaurant Jobs",
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            name: t("categories.realEstate"),
                            path: "/RealEstateComp",
                            icon: <FaHome />,
                            subcategories: [
                              {
                                name: t(
                                  "subcategories.realEstate.apartmentsForRent",
                                ),
                                path: "/RealEstateComp?subCatgory=Apartments for Rent",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.apartmentsForSale",
                                ),
                                path: "/RealEstateComp?subCatgory=Apartments for Sale",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.buildingForRent",
                                ),
                                path: "/RealEstateComp?subCatgory=Building for Rent",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.buildingForSale",
                                ),
                                path: "/RealEstateComp?subCatgory=Building for Sale",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.campsForRent",
                                ),
                                path: "/RealEstateComp?subCatgory=Camps for Rent",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.chaletsForSale",
                                ),
                                path: "/RealEstateComp?subCatgory=Chalets for Sale",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.commercialLandsForSale",
                                ),
                                path: "/RealEstateComp?subCatgory=Commercial Lands for Sale",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.compoundForRent",
                                ),
                                path: "/RealEstateComp?subCatgory=Compound for Rent",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.compoundForSale",
                                ),
                                path: "/RealEstateComp?subCatgory=Compound for Sale",
                              },
                              {
                                name: t("subcategories.realEstate.farmForRent"),
                                path: "/RealEstateComp?subCatgory=Farm for Rent",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.farmsForSale",
                                ),
                                path: "/RealEstateComp?subCatgory=Farms for Sale",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.floorForSale",
                                ),
                                path: "/RealEstateComp?subCatgory=Floor for Sale",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.floorsForRent",
                                ),
                                path: "/RealEstateComp?subCatgory=Floors for Rent",
                              },
                              {
                                name: t("subcategories.realEstate.hallForRent"),
                                path: "/RealEstateComp?subCatgory=Hall for Rent",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.housesForRent",
                                ),
                                path: "/RealEstateComp?subCatgory=Houses for Rent",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.housesForSale",
                                ),
                                path: "/RealEstateComp?subCatgory=Houses for Sale",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.landsForSale",
                                ),
                                path: "/RealEstateComp?subCatgory=Lands for Sale",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.officesForRent",
                                ),
                                path: "/RealEstateComp?subCatgory=Offices for Rent",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.restHousesForRent",
                                ),
                                path: "/RealEstateComp?subCatgory=RestHouses for Rent",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.restHousesForSale",
                                ),
                                path: "/RealEstateComp?subCatgory=RestHouses for Sale",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.roomsForRent",
                                ),
                                path: "/RealEstateComp?subCatgory=Rooms for Rent",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.shopsForRent",
                                ),
                                path: "/RealEstateComp?subCatgory=Shops for Rent",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.shopsForTransfer",
                                ),
                                path: "/RealEstateComp?subCatgory=Shops for Transfer",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.villasForRent",
                                ),
                                path: "/RealEstateComp?subCatgory=Villas for Rent",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.villasForSale",
                                ),
                                path: "/RealEstateComp?subCatgory=Villas for Sale",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.warehouseForSale",
                                ),
                                path: "/RealEstateComp?subCatgory=Warehouse for Sale",
                              },
                              {
                                name: t(
                                  "subcategories.realEstate.warehouseForRent",
                                ),
                                path: "/RealEstateComp?subCatgory=Warehouse for Rent",
                              },
                            ],
                          },
                          {
                            name: t("categories.services"),
                            path: "/TravelComp",
                            icon: <FaTools />,
                            subcategories: [
                              {
                                name: t("subcategories.services.otherServices"),
                                path: "/TravelComp?subCatgory=Other Services",
                              },
                              {
                                name: t(
                                  "subcategories.services.contractingServices",
                                ),
                                path: "/TravelComp?subCatgory=Contracting Services",
                              },
                              {
                                name: t(
                                  "subcategories.services.governmentPaperworkServices",
                                ),
                                path: "/TravelComp?subCatgory=Government Paperwork Services",
                              },
                              {
                                name: t(
                                  "subcategories.services.deliveryServices",
                                ),
                                path: "/TravelComp?subCatgory=Delivery Services",
                              },
                              {
                                name: t(
                                  "subcategories.services.furnitureMovingServices",
                                ),
                                path: "/TravelComp?subCatgory=Furniture Moving Services",
                              },
                              {
                                name: t(
                                  "subcategories.services.cleaningServices",
                                ),
                                path: "/TravelComp?subCatgory=Cleaning Services",
                              },
                              {
                                name: t(
                                  "subcategories.services.internationalShoppingServices",
                                ),
                                path: "/TravelComp?subCatgory=International Shopping Services",
                              },
                              {
                                name: t("subcategories.services.legalServices"),
                                path: "/TravelComp?subCatgory=Legal Services",
                              },
                              {
                                name: t(
                                  "subcategories.services.accountingAndFinancialServices",
                                ),
                                path: "/TravelComp?subCatgory=Accounting & Financial Services",
                              },
                            ],
                          },
                          {
                            name: t("categories.sportGame"),
                            path: "/SportGamesComp",
                            icon: <FaGamepad />,
                            subcategories: [
                              {
                                name: t(
                                  "subcategories.sportGame.gamingConsoles",
                                ),
                                path: "/SportGamesComp?subCatgory=Gaming Consoles",
                              },
                              {
                                name: t("subcategories.sportGame.videoGames"),
                                path: "/SportGamesComp?subCatgory=Video Games",
                              },
                              {
                                name: t("subcategories.sportGame.controllers"),
                                path: "/SportGamesComp?subCatgory=Controllers",
                              },
                              {
                                name: t(
                                  "subcategories.sportGame.gamingAccessories",
                                ),
                                path: "/SportGamesComp?subCatgory=Gaming Accessories",
                              },
                              {
                                name: t("subcategories.sportGame.giftCards"),
                                path: "/SportGamesComp?subCatgory=Gift Cards",
                              },
                              {
                                name: t("subcategories.sportGame.accounts"),
                                path: "/SportGamesComp?subCatgory=Accounts",
                              },
                              {
                                name: t("subcategories.sportGame.toys"),
                                path: "/SportGamesComp?subCatgory=Toys",
                              },
                            ],
                          },
                          {
                            name: t("categories.petAnimals"),
                            path: "/PetAnimalsComp",
                            icon: <FaPaw />,
                            subcategories: [
                              {
                                name: t("subcategories.petAnimals.sheep"),
                                path: "/PetAnimalsComp?subCatgory=Sheep",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.barbarySheep",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Barbary Sheep",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.hureSheep",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Hure Sheep",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.romanianSheep",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Romanian Sheep",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.sawakniSheep",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Sawakni Sheep",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.najdiSheep",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Najdi Sheep",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.naemiSheep",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Naemi Sheep",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.rafidiSheep",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Rafidi Sheep",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.sheepSupplies",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Sheep Supplies",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.sheepProducts",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Sheep Products",
                                  },
                                ],
                              },
                              {
                                name: t("subcategories.petAnimals.goats"),
                                path: "/PetAnimalsComp?subCatgory=Goats",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.localGoats",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Local Goats",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.bishiGoats",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Bishi Goats",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.southernGoats",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Southern Goats",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.hejazGoats",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Hejaz Goats",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.shamiGoats",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Shami Goats",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.ardiGoats",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Ardi Goats",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.dutchGoats",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Dutch Goats",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.dwarfGoats",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Dwarf Goats",
                                  },
                                ],
                              },
                              {
                                name: t("subcategories.petAnimals.parrot"),
                                path: "/PetAnimalsComp?subCatgory=Parrot",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.amazoniParrot",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Amazoni Parrot",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.congoAfricanGreyParrot",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Congo African Grey Parrot",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.cockatooParrot",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Cockatoo Parrot",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.macawParrot",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Macaw Parrot",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.petBirds",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Pet Birds",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.birdSupplies",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Bird Supplies",
                                  },
                                ],
                              },
                              {
                                name: t("subcategories.petAnimals.dovePigeon"),
                                path: "/PetAnimalsComp?subCatgory=Dove & Pigeon",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.pakistaniPigeon",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Pakistani Pigeon",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.turkishPigeon",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Turkish Pigeon",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.homersPigeons",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Homers",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.sudanesePigeon",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Sudanese Pigeon",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.shamiPigeon",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Shami Pigeon",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.sanaaniPigeon",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Sanaani Pigeon",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.frenchPigeon",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=French Pigeon",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.egyptianPigeon",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Egyptian Pigeon",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.indianPigeon",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Indian Pigeon",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.dutchPigeon",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Dutch Pigeon",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.qatifiPigeon",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Qatifi Pigeon",
                                  },
                                ],
                              },
                              {
                                name: t("subcategories.petAnimals.cats"),
                                path: "/PetAnimalsComp?subCatgory=Cats",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.scottishCats",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Scottish Cats",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.persianCats",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Persian Cats",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.catsForAdoption",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Cats for Adoption",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.himalayanCats",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Himalayan Cats",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.catSupplies",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Cat Supplies",
                                  },
                                ],
                              },
                              {
                                name: t("subcategories.petAnimals.chickens"),
                                path: "/PetAnimalsComp?subCatgory=Chickens",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.brahmaChickens",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Brahma Chickens",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.localChickens",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Local Chickens",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.turkishChickens",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Turkish Chickens",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.turkeyChickens",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Turkey Chickens",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.persianChickens",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Persian Chickens",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.frenchChickens",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=French Chickens",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.fayoumiChickens",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Fayoumi Chickens",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.pakistaniChickens",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Pakistani Chickens",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.poultrySupplies",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Poultry Supplies",
                                  },
                                ],
                              },
                              {
                                name: t("subcategories.petAnimals.camels"),
                                path: "/PetAnimalsComp?subCatgory=Camels",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.bakarCamels",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Bakar Camels",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.studCamels",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Stud Camels",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.camelStallions",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Camel Stallions",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.femaleCamels",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=FemaleCamels",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.camelSupplies",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Camel Supplies",
                                  },
                                ],
                              },
                              {
                                name: t("subcategories.petAnimals.horses"),
                                path: "/PetAnimalsComp?subCatgory=Horses",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.popularHorses",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Popular Horses",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.mixedHorses",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Mixed Horses",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.wahhoHorses",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Wahho Horses",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.englishHorses",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=English Horses",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.horseSupplies",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Horse Supplies",
                                  },
                                ],
                              },
                              {
                                name: t("subcategories.petAnimals.dogs"),
                                path: "/PetAnimalsComp?subCatgory=Dogs",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.pitbullDogs",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Pitbull Dogs",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.pomeranianDogs",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Pomeranian Dogs",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.goldenRetrieverDogs",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Golden Retriever Dogs",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.germanShepherdDogs",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=German Shepherd Dogs",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.shihTzuDog",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=ShihTzu Dog",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.chihuahuaDog",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Chihuahua Dog",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.malteseDog",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Maltese Dog",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.huskyDog",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Husky Dog",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.dogSupplies",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Dog Supplies",
                                  },
                                ],
                              },
                              {
                                name: t("subcategories.petAnimals.cows"),
                                path: "/PetAnimalsComp?subCatgory=Cows",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.germanCows",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=German Cows",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.localCows",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Local Cows",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.jerseyCows",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Jersey Cows",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.swissCows",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Swiss Cows",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.dutchCows",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Dutch Cows",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.dairyProducts",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Dairy Products",
                                  },
                                ],
                              },
                              {
                                name: t(
                                  "subcategories.petAnimals.fishAndTurtles",
                                ),
                                path: "/PetAnimalsComp?subCatgory=Fish & Turtles",
                              },
                              {
                                name: t("subcategories.petAnimals.rabbits"),
                                path: "/PetAnimalsComp?subCatgory=Rabbits",
                              },
                              {
                                name: t("subcategories.petAnimals.ducks"),
                                path: "/PetAnimalsComp?subCatgory=Ducks",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.bikiniDucks",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Bikini Ducks",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.sharshariDucks",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Sharshari Ducks",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.geese",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Geese",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.fish",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Fish",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.bikiniDucks",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Bikini Ducks",
                                  },
                                ],
                              },
                              {
                                name: t("subcategories.petAnimals.squirrels"),
                                path: "/PetAnimalsComp?subCatgory=Squirrels",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.turtles",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Turtles",
                                  },
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.sharshariDucks",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Sharshari Ducks",
                                  },
                                ],
                              },
                              {
                                name: t("subcategories.petAnimals.hamsters"),
                                path: "/PetAnimalsComp?subCatgory=Hamsters",
                                subSubcategories: [
                                  {
                                    name: t(
                                      "nestedSubcategories.petAnimals.geese",
                                    ),
                                    path: "/PetAnimalsComp?NestedSubCategory=Geese",
                                  },
                                ],
                              },
                              {
                                name: t("subcategories.petAnimals.fur"),
                                path: "/PetAnimalsComp?subCatgory=Fur",
                              },
                            ],
                          },
                          {
                            name: t("categories.other"),
                            path: "/Education",
                            icon: <FaBook />,
                            subcategories: [
                              {
                                name: t("subcategories.other.huntingAndTrips"),
                                path: "/Education?subCatgory=Hunting & Trips",
                              },
                              {
                                name: t(
                                  "subcategories.other.gardeningAndAgriculture",
                                ),
                                path: "/Education?subCatgory=Gardening & Agriculture",
                              },
                              {
                                name: t("subcategories.other.partiesAndEvents"),
                                path: "/Education?subCatgory=Parties & Events",
                              },
                              {
                                name: t("subcategories.other.travelAndTourism"),
                                path: "/Education?subCatgory=Travel & Tourism",
                              },
                              {
                                name: t("subcategories.other.roommate"),
                                path: "/Education?subCatgory=Roommate",
                              },
                              {
                                name: t("subcategories.other.lostAndFound"),
                                path: "/Education?subCatgory=Lost & Found",
                              },
                              {
                                name: t(
                                  "subcategories.other.educationAndTraining",
                                ),
                                path: "/Education?subCatgory=Education & Training",
                              },
                              {
                                name: t("subcategories.other.sportsTraining"),
                                path: "/Education?subCatgory=Sports Training",
                              },
                              {
                                name: t(
                                  "subcategories.other.stockAndForexEducation",
                                ),
                                path: "/Education?subCatgory=Stock & Forex Education",
                              },
                              {
                                name: t("subcategories.other.drivingLessons"),
                                path: "/Education?subCatgory=Driving Lessons",
                              },
                              {
                                name: t("subcategories.other.privateTutoring"),
                                path: "/Education?subCatgory=Private Tutoring",
                              },
                              {
                                name: t("subcategories.other.trainingCourses"),
                                path: "/Education?subCatgory=Training Courses",
                              },
                              {
                                name: t(
                                  "subcategories.other.antiquesAndCollectibles",
                                ),
                                path: "/Education?subCatgory=Antiques & Collectibles",
                              },
                              {
                                name: t(
                                  "subcategories.other.projectsAndInvestments",
                                ),
                                path: "/Education?subCatgory=Projects & Investments",
                              },
                              {
                                name: t("subcategories.other.booksAndArts"),
                                path: "/Education?subCatgory=Books&Arts",
                              },
                              {
                                name: t(
                                  "subcategories.other.programmingAndDesign",
                                ),
                                path: "/Education?subCatgory=Programming & Design",
                              },
                              {
                                name: t("subcategories.other.foodAndBeverages"),
                                path: "/Education?subCatgory=Food & Beverages",
                              },
                            ],
                          },
                          {
                            name: t("categories.commercial"),
                            path: "/CommercialAdscom",
                            icon: <FaBullhorn />,
                            badge: t("common.new") || "New",
                          },
                        ].map((category, index) => (
                          <div key={index} className="sidebar-item-wrapper">
                            <div className="sidebar-item d-flex align-items-center">
                              <NavLink
                                to={category.path}
                                className="d-flex align-items-center w-100 text-decoration-none"
                                activeClassName="active"
                              >
                                <span className="sidebar-icon me-2">
                                  {category.icon}
                                </span>
                                <span className="fw-semibold">
                                  {category.name}
                                </span>
                                {category.badge && (
                                  <span
                                    className="badge bg-danger ms-2"
                                    style={{
                                      fontSize: "10px",
                                      padding: "3px 6px",
                                    }}
                                  >
                                    {category.badge}
                                  </span>
                                )}
                              </NavLink>
                              {category.subcategories && (
                                <span
                                  className="ms-auto dropdown-icon"
                                  onClick={() => toggleCategory(category.name)}
                                >
                                  {openCategories[category.name] ? (
                                    <FaChevronDown />
                                  ) : (
                                    <FaChevronRight />
                                  )}
                                </span>
                              )}
                            </div>
                            {category.subcategories &&
                              openCategories[category.name] && (
                                <div className="submenu">
                                  {category.subcategories.map(
                                    (sub, subIndex) => (
                                      <div
                                        key={subIndex}
                                        className="submenu-item-wrapper"
                                      >
                                        <div className="submenu-item d-flex align-items-center">
                                          <NavLink
                                            to={sub.path}
                                            className="d-flex align-items-center w-100 text-decoration-none"
                                            activeClassName="active"
                                          >
                                            <span className="submenu-icon me-2">
                                              •
                                            </span>
                                            <span>{sub.name}</span>
                                          </NavLink>
                                          {sub.subSubcategories && (
                                            <span
                                              className="ms-auto dropdown-icon"
                                              onClick={() =>
                                                toggleSubcategory(sub.name)
                                              }
                                            >
                                              {openSubcategories[sub.name] ? (
                                                <FaChevronDown />
                                              ) : (
                                                <FaChevronRight />
                                              )}
                                            </span>
                                          )}
                                        </div>
                                        {sub.subSubcategories &&
                                          openSubcategories[sub.name] && (
                                            <div className="submenu">
                                              {sub.subSubcategories.map(
                                                (subSub, subSubIndex) => (
                                                  <NavLink
                                                    key={subSubIndex}
                                                    to={subSub.path}
                                                    className="submenu-item d-flex align-items-center text-decoration-none"
                                                    activeClassName="active"
                                                  >
                                                    <span className="submenu-icon me-2">
                                                      -
                                                    </span>
                                                    <span>{subSub.name}</span>
                                                  </NavLink>
                                                ),
                                              )}
                                            </div>
                                          )}
                                      </div>
                                    ),
                                  )}
                                </div>
                              )}
                          </div>
                        ))}

                        {/* My Account Section */}
                        <div className="sidebar-section-divider mt-3 mb-2">
                          <span
                            className="fw-bold text-muted ps-3"
                            style={{ fontSize: "12px" }}
                          >
                            {t("footer.myAccount")}
                          </span>
                        </div>
                        <div className="sidebar-item-wrapper">
                          <div className="sidebar-item d-flex align-items-center">
                            <NavLink
                              to="/dashboard"
                              className="d-flex align-items-center w-100 text-decoration-none"
                              activeClassName="active"
                            >
                              <span className="sidebar-icon me-2">
                                <FaStickyNote />
                              </span>
                              <span className="fw-semibold">
                                {t("footer.dashboard")}
                              </span>
                            </NavLink>
                          </div>
                        </div>
                        <div className="sidebar-item-wrapper">
                          <div className="sidebar-item d-flex align-items-center">
                            <NavLink
                              to="/my-profile"
                              className="d-flex align-items-center w-100 text-decoration-none"
                              activeClassName="active"
                            >
                              <span className="sidebar-icon me-2">
                                <FaStickyNote />
                              </span>
                              <span className="fw-semibold">
                                {t("footer.profile")}
                              </span>
                            </NavLink>
                          </div>
                        </div>
                        <div className="sidebar-item-wrapper">
                          <div className="sidebar-item d-flex align-items-center">
                            <NavLink
                              to="/my-listing"
                              className="d-flex align-items-center w-100 text-decoration-none"
                              activeClassName="active"
                            >
                              <span className="sidebar-icon me-2">
                                <FaStickyNote />
                              </span>
                              <span className="fw-semibold">
                                {t("footer.myListing")}
                              </span>
                            </NavLink>
                          </div>
                        </div>
                        <div className="sidebar-item-wrapper">
                          <div className="sidebar-item d-flex align-items-center">
                            <NavLink
                              to="/BookMark"
                              className="d-flex align-items-center w-100 text-decoration-none"
                              activeClassName="active"
                            >
                              <span className="sidebar-icon me-2">
                                <FaStickyNote />
                              </span>
                              <span className="fw-semibold">
                                {t("footer.myFavourite")}
                              </span>
                            </NavLink>
                          </div>
                        </div>
                        <div className="sidebar-item-wrapper">
                          <div className="sidebar-item d-flex align-items-center">
                            <NavLink
                              to="/messages"
                              className="d-flex align-items-center w-100 text-decoration-none"
                              activeClassName="active"
                            >
                              <span className="sidebar-icon me-2">
                                <FaStickyNote />
                              </span>
                              <span className="fw-semibold">
                                {t("footer.messages")}
                              </span>
                            </NavLink>
                          </div>
                        </div>

                        {/* Ksa4sale Section */}
                        <div className="sidebar-section-divider mt-3 mb-2">
                          <span
                            className="fw-bold text-muted ps-3"
                            style={{ fontSize: "12px" }}
                          >
                            {t("footer.ksa4sale")}
                          </span>
                        </div>
                        <div className="sidebar-item-wrapper">
                          <div className="sidebar-item d-flex align-items-center">
                            <NavLink
                              to="/about"
                              className="d-flex align-items-center w-100 text-decoration-none"
                              activeClassName="active"
                            >
                              <span className="sidebar-icon me-2">
                                <FaStickyNote />
                              </span>
                              <span className="fw-semibold">
                                {t("footer.aboutUs")}
                              </span>
                            </NavLink>
                          </div>
                        </div>
                        <div className="sidebar-item-wrapper">
                          <div className="sidebar-item d-flex align-items-center">
                            <NavLink
                              to="/terms-condition"
                              className="d-flex align-items-center w-100 text-decoration-none"
                              activeClassName="active"
                            >
                              <span className="sidebar-icon me-2">
                                <FaStickyNote />
                              </span>
                              <span className="fw-semibold">
                                {t("footer.termsConditions")}
                              </span>
                            </NavLink>
                          </div>
                        </div>
                        <div className="sidebar-item-wrapper">
                          <div className="sidebar-item d-flex align-items-center">
                            <NavLink
                              to="/privacy-policy"
                              className="d-flex align-items-center w-100 text-decoration-none"
                              activeClassName="active"
                            >
                              <span className="sidebar-icon me-2">
                                <FaStickyNote />
                              </span>
                              <span className="fw-semibold">
                                {t("footer.privacyPolicy")}
                              </span>
                            </NavLink>
                          </div>
                        </div>
                        <div className="sidebar-item-wrapper">
                          <div className="sidebar-item d-flex align-items-center">
                            <NavLink
                              to="/copy_right_text"
                              className="d-flex align-items-center w-100 text-decoration-none"
                              activeClassName="active"
                            >
                              <span className="sidebar-icon me-2">
                                <FaStickyNote />
                              </span>
                              <span className="fw-semibold">
                                {t("footer.copyRights")}
                              </span>
                            </NavLink>
                          </div>
                        </div>

                        {/* Useful Links Section */}
                        <div className="sidebar-section-divider mt-3 mb-2">
                          <span
                            className="fw-bold text-muted ps-3"
                            style={{ fontSize: "12px" }}
                          >
                            {t("footer.usefulLinks")}
                          </span>
                        </div>
                        <div className="sidebar-item-wrapper">
                          <div className="sidebar-item d-flex align-items-center">
                            <NavLink
                              to="https://blogs.ksa4sale.net/directory/"
                              className="d-flex align-items-center w-100 text-decoration-none"
                              activeClassName="active"
                              rel="noopener noreferrer"
                            >
                              <span className="sidebar-icon me-2">
                                <FaFolderOpen />
                              </span>
                              <span className="fw-semibold">
                                {t("footer.directory")}
                              </span>
                            </NavLink>
                          </div>
                        </div>
                        <div className="sidebar-item-wrapper">
                          <div className="sidebar-item d-flex align-items-center">
                            <a
                              href="https://blog.mazhool.net/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="d-flex align-items-center w-100 text-decoration-none"
                            >
                              <span className="sidebar-icon me-2">
                                <FaStickyNote />
                              </span>
                              <span className="fw-semibold">
                                {t("footer.blog")}
                              </span>
                            </a>
                          </div>
                        </div>
                      </nav>
                      <div className="sidebar-footer text-center py-3 mt-3 border-top">
                        Mazhool
                      </div>
                    </Offcanvas.Body>
                  </Offcanvas>

                  {/* Custom CSS */}
                  <style>
                    {`
                   .custom-sidebar {
                    width: 280px !important;
                    background-color: #fff;
                    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
                  }
                  
                  .sidenav {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                  }
                  
                  .sidebar-item-wrapper {
                    margin-bottom: 1px;
                  }
                  
                  .sidebar-item {
                    padding: 10px 15px;
                    font-size: 16px;
                    color: #333;
                    border-radius: 6px;
                    transition: all 0.3s ease-in-out;
                    cursor: pointer;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                  }
                  
                  .sidebar-item:hover {
                    background-color: #f8f9fa;
                  }
                  
                  .sidebar-item .active {
                    background-color: #0056b3;
                    color: white !important;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    width: 100%; /* Ensure it takes full width */
                    height: 100%; /* Ensure it takes full height */
                    padding: 10px 15px; /* Match parent padding */
                    box-sizing: border-box; /* Prevent padding from increasing size */
                  }
                  
                  .submenu {
                    padding-left: 20px;
                    background-color: #f9f9f9;
                  }
                  
                  .submenu-item-wrapper {
                    margin-bottom: 5px;
                  }
                  
                  .submenu-item {
                    padding: 8px 15px;
                    font-size: 14px;
                    color: #555;
                    transition: background-color 0.3s;
                    display: flex;
                    align-items: center;
                  }
                  
                  .submenu-item:hover {
                    background-color: #f1f1f1;
                  }
                  
                  .submenu-item .active {
                    color: #0056b3 !important;
                    font-weight: 600;
                    width: 100%; /* Ensure it takes full width */
                    height: 100%; /* Ensure it takes full height */
                    padding: 8px 15px; /* Match parent padding */
                    box-sizing: border-box; /* Prevent padding from increasing size */
                  }
                  
                  .submenu-icon {
                    font-size: 12px;
                  }
                  
                  .close-icon {
                    font-size: 20px;
                    cursor: pointer;
                    color: #333;
                  }
                  
                  .menu-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    background: #36a680;
                    border-radius: 50%;
                    color: red;
                    cursor: pointer;
                  }
                  
                  .bar-icon span {
                    display: block;
                    width: 20px;
                    height: 2px;
                    background: white;
                    margin: 4px 0;
                  }
                  
                  .dropdown-icon {
                    cursor: pointer;
                    padding: 5px; /* Add padding to make the icon easier to click */
                  }
                  `}
                  </style>
                </div>

                {/* {!isMobile && ( */}
                <form
                  className="d-flex search-container"
                  style={{
                    flexGrow: 1,
                    maxWidth: "700px", // Increased width
                    margin: "0 20px",
                    position: "relative",
                    display: "flex",
                  }}
                  onSubmit={handleSearch}
                >
                  {/* <input
                    className="form-control search-input"
                    type="search"
                    placeholder="What are you looking for?"
                    aria-label="Search"
                    value={searchText}
                    onChange={(e) => {
                      const text = e.target.value;
                      const onlyAlphabets = text.replace(/[^a-zA-Z]/g, ""); // Remove non-alphabetic chars
                      if (!isSelecting.current && onlyAlphabets.length <= 10) {
                        setSearchText(onlyAlphabets);
                      }
                    }}
                    style={{
                      paddingRight: "40px",
                      borderRadius: "12px",
                      border: "1px solid #ccc",
                      width: "100%",
                      backgroundColor: "rgba(241, 241, 241,0.5)",
                      padding: "15px 15px",
                    }}
                  /> */}
                  <input
                    className="form-control search-input"
                    type="search"
                    placeholder={t("search.placeholder")}
                    aria-label="Search"
                    value={searchText}
                    onChange={(e) => {
                      const text = e.target.value;
                      const lettersAndSpaces = text.replace(/[^a-zA-Z\s]/g, ""); // Allow letters + spaces
                      if (
                        !isSelecting.current &&
                        lettersAndSpaces.length <= 50
                      ) {
                        // maybe increase limit from 10
                        setSearchText(lettersAndSpaces);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        useSearchStore.setState({
                          results: [],
                          showSuggestions: false,
                        });
                        navigate(`/search?q=${searchText}`);
                        // Clear search input after navigation
                        setTimeout(() => setSearchText(""), 0);
                      }
                    }}
                    style={{
                      paddingRight: "40px",
                      borderRadius: "12px",
                      border: "1px solid #ccc",
                      width: "100%",
                      backgroundColor: "rgba(241, 241, 241,0.5)",
                      padding: "15px 15px",
                    }}
                  />

                  {results.length > 0 && showSuggestions && (
                    <ul
                      className="list-unstyled position-absolute bg-white border rounded shadow-lg mt-1 w-100"
                      style={{
                        maxHeight: "240px",
                        overflowY: "auto",
                        zIndex: 1050,
                        top: "100%",
                        left: 0,
                        right: 0,
                        boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
                        border: "1px solid #dee2e6",
                      }}
                    >
                      {results.map((item) => (
                        <li
                          key={item.id}
                          className="border-bottom"
                          onClick={() => {
                            isSelecting.current = true;
                            useSearchStore.setState({ skipNextSearch: true }); // 🔥 force skip search
                            useSearchStore.setState({
                              results: [],
                              showSuggestions: false,
                            });
                            setSelectedItem(item);

                            // Map category to callingFrom parameter
                            const callingFromMap = {
                              Motors: "AutomotiveComp",
                              Automotive: "AutomotiveComp",
                              Electronics: "ElectronicComp",
                              "Fashion Style": "FashionStyle",
                              "Home & Furniture": "HealthCareComp",
                              "Home & Furnituer": "HealthCareComp",
                              "home & furniture": "HealthCareComp",
                              "home-furniture": "HealthCareComp",
                              HomeFurnitureContent: "HealthCareComp",
                              HEALTHCARE: "HealthCareComp",
                              "Job Board": "JobBoard",
                              Realestate: "RealEstateComp",
                              "Real Estate": "RealEstateComp",
                              Services: "TravelComp",
                              "Sport & Game": "SportGamesComp",
                              "Sports & Game": "SportGamesComp",
                              "Pet & Animals": "PetAnimalsComp",
                              Other: "Education",
                              Commercial: "Commercial",
                            };

                            const callingFrom =
                              callingFromMap[item.category] || "AutomotiveComp";

                            // Navigate to item detail page
                            navigate(
                              `/Dynamic_Route?id=${item.id}&callingFrom=${callingFrom}`,
                            );

                            // Clear search input after navigation
                            setTimeout(() => setSearchText(""), 0);

                            // Reset flag after short delay
                            setTimeout(() => {
                              isSelecting.current = false;
                            }, 200);
                          }}
                          style={{
                            padding: "12px 16px",
                            cursor: "pointer",
                            transition: "background-color 0.2s ease",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#f8f9fa")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "transparent")
                          }
                        >
                          <div className="d-flex align-items-center">
                            {item.image && (
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                className="me-3 rounded"
                                style={{
                                  width: "45px",
                                  height: "45px",
                                  objectFit: "cover",
                                }}
                              />
                            )}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div
                                className="fw-bold text-dark mb-1"
                                style={{
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {item.title}
                              </div>
                              <small
                                className="text-muted"
                                style={{
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  display: "block",
                                }}
                              >
                                in <em>{item.category}</em>
                                {item.subCategory && (
                                  <span> • {item.subCategory}</span>
                                )}
                              </small>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  <button
                    className="btn search-btn"
                    type="submit"
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "0px",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      borderRadius: "6px",
                      padding: "14px 14px",
                      backgroundColor: "#1E55B4",
                    }}
                  >
                    <FaSearch style={{ color: "#fff" }} />
                  </button>
                </form>
                {/* )} */}

                <ul
                  className=" header-navbar-rht d-flex align-items-center"
                  style={{
                    gap: window.innerWidth <= 576 ? "5px" : "15px",
                    marginBottom: 0,
                    flexShrink: 0,
                  }}
                >
                  {" "}
                  <>
                    <div className="position-relative d-inline-block">
                      <FiBell
                        onClick={toggleModal}
                        className="fs-4 text-primary cursor-pointer"
                      />
                      {/* Display the unseen count badge */}
                      {unseenCount > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {unseenCount}
                          <span className="visually-hidden">
                            unread messages
                          </span>
                        </span>
                      )}
                    </div>

                    {isOpen && (
                      <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center z-3">
                        <div
                          className="bg-white rounded-3 shadow-lg w-100 mx-3"
                          style={{
                            maxWidth: "480px",
                            animation: "fadeIn 0.3s ease-in-out",
                          }}
                        >
                          <div className="border-bottom d-flex justify-content-between align-items-center px-4 py-3">
                            <h5 className="mb-0 fw-semibold text-dark">
                              Notifications
                            </h5>
                            <button
                              onClick={() => setIsOpen(false)}
                              className="btn-close"
                            ></button>
                          </div>

                          <ul
                            className="list-unstyled overflow-auto"
                            style={{ maxHeight: "400px" }}
                          >
                            {notifications.map((note, index) => (
                              <li
                                onClick={handleNotificationClick}
                                key={note.id || index}
                                className={`mb-3 p-3 border rounded shadow-sm ${
                                  note.seen ? "bg-light" : "bg-warning-subtle"
                                }`}
                              >
                                <div className="d-flex justify-content-between mb-1 align-items-center">
                                  <span className="fw-medium text-dark">
                                    {note.name}
                                  </span>

                                  <div className="d-flex gap-2 align-items-center">
                                    {/* ✅ Show "Unseen" badge if not seen */}
                                    {!note.seen && (
                                      <span className="badge bg-danger text-white">
                                        1
                                      </span>
                                    )}
                                    <small className="text-muted">
                                      {formatDate(note.createdAt)}
                                    </small>
                                  </div>
                                </div>

                                <p className="mb-0 text-secondary">
                                  {note.text}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </>
                  {/* Adjust styling as needed */}
                  {auth.currentUser ? (
                    <ul
                      className="nav header-navbar-rht"
                      style={{ display: "flex", gap: "15px" }}
                    >
                      {!isMobile && (
                        <div
                          ref={menuRef}
                          className="lang_dropdown"
                          style={{
                            position: "relative",
                            display: "flex",
                          }}
                        >
                          <button
                            className="btn dropdown-toggle"
                            onClick={toggleDropdown}
                            aria-expanded={isDropdownVisible ? "true" : "false"}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "5px 10px",
                              backgroundColor: "#fff",
                              // border: "1px solid #ddd",
                              cursor: "pointer",
                            }}
                          >
                            <Flag
                              code={selectedLanguage === "en" ? "GB" : "SA"}
                              className="flag-icon"
                              style={{
                                width: "27px",
                                marginRight: "5px",
                                fontFamily: "Inter",
                              }}
                            />
                            {selectedLanguage === "en" ? "EN" : "AR"}
                          </button>

                          {/* Dropdown Menu */}
                          {isDropdownVisible && (
                            <ul
                              className="dropdown-menu show"
                              style={{
                                position: "absolute",
                                top: "100%",
                                left: "0",
                                zIndex: 1000,
                                display: "block",
                                minWidth: "160px",
                                backgroundColor: "#fff",
                                border: "1px solid #ddd",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                listStyle: "none",
                                padding: "0",
                                margin: "0",
                              }}
                            >
                              <li>
                                <button
                                  className="dropdown-item"
                                  style={{
                                    fontFamily: "Inter",
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                    padding: "8px 12px",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    textAlign: "left",
                                  }}
                                  onClick={() => handleLanguageChange("en")}
                                >
                                  <Flag
                                    code="GB"
                                    className="flag-icon"
                                    style={{
                                      width: "27px",
                                      marginRight: "5px",
                                    }}
                                  />
                                  English
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item"
                                  style={{
                                    fontFamily: "VIP Rawy",
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                    padding: "8px 12px",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    textAlign: "left",
                                  }}
                                  onClick={() => handleLanguageChange("ar")}
                                >
                                  <Flag
                                    code="SA"
                                    className="flag-icon"
                                    style={{
                                      width: "27px",
                                      marginRight: "5px",
                                    }}
                                  />
                                  Arabic
                                </button>
                              </li>
                            </ul>
                          )}
                        </div>
                      )}
                      {!isMobile && userId && (
                        <li>
                          <Link className="blue_btn" to="/listing">
                            {t("header.postAd")}
                          </Link>
                        </li>
                      )}
                      <li className="nav-item dropdown logged-item">
                        <Link
                          to="#"
                          className={`dropdown-toggle profile-userlink ${
                            drops ? "show" : ""
                          }`}
                          data-bs-toggle="dropdown"
                          aria-expanded={drops}
                          onClick={() => setDrops(!drops)}
                        >
                          <img
                            src={
                              divideImage && divideImage !== ""
                                ? divideImage
                                : fallbackImage
                            }
                            alt=""
                          />
                          <span style={{ marginRight: "8px" }}>
                            {divideName}
                          </span>
                        </Link>
                        <div
                          className={`dropdown-menu ${i18n.language === "ar" ? "dropdown-menu-start" : "dropdown-menu-end"} ${
                            drops ? "show" : ""
                          }`}
                          style={
                            i18n.language === "ar"
                              ? { right: "auto", left: "0" }
                              : {}
                          }
                        >
                          <Link className="dropdown-item" to="/dashboard">
                            {t("common.dashboard")}
                          </Link>
                          <Link className="dropdown-item" to="/profile">
                            {t("header.profileSettings")}
                          </Link>
                          <Link
                            className="dropdown-item"
                            to="#"
                            onClick={handleLogout}
                          >
                            {t("common.logout")}
                          </Link>
                        </div>
                      </li>
                    </ul>
                  ) : (
                    <ul
                      className="nav header-navbar-rht"
                      style={{ display: "flex", gap: "15px" }}
                    >
                      {!isMobile && (
                        <div
                          ref={menuRef}
                          className="lang_dropdown"
                          style={{
                            position: "relative",
                            display: "flex",
                          }}
                        >
                          <button
                            className="btn dropdown-toggle"
                            onClick={toggleDropdown}
                            aria-expanded={isDropdownVisible ? "true" : "false"}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "5px 10px",
                              backgroundColor: "#fff",
                              cursor: "pointer",
                            }}
                          >
                            <Flag
                              code={selectedLanguage === "en" ? "GB" : "SA"}
                              className="flag-icon"
                              style={{
                                width: "27px",
                                marginRight: "15px",
                                fontFamily: "Inter",
                              }}
                            />
                            {selectedLanguage === "en" ? "EN" : "AR"}
                          </button>

                          {/* Dropdown Menu */}
                          {isDropdownVisible && (
                            <ul
                              className="dropdown-menu show"
                              style={{
                                position: "absolute",
                                top: "100%",
                                left: "0",
                                zIndex: 1000,
                                display: "block",
                                minWidth: "160px",
                                backgroundColor: "#fff",
                                border: "1px solid #ddd",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                listStyle: "none",
                                padding: "0",
                                margin: "0",
                              }}
                            >
                              <li>
                                <button
                                  className="dropdown-item"
                                  style={{
                                    fontFamily: "Inter",
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                    padding: "8px 12px",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    textAlign: "left",
                                  }}
                                  onClick={() => handleLanguageChange("en")}
                                >
                                  <Flag
                                    code="GB"
                                    className="flag-icon"
                                    style={{
                                      width: "27px",
                                      marginRight: "5px",
                                    }}
                                  />
                                  English
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item"
                                  style={{
                                    fontFamily: "VIP Rawy",
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                    padding: "8px 12px",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    textAlign: "left",
                                  }}
                                  onClick={() => handleLanguageChange("ar")}
                                >
                                  <Flag
                                    code="SA"
                                    className="flag-icon"
                                    style={{
                                      width: "27px",
                                      marginRight: "5px",
                                    }}
                                  />
                                  Arabic
                                </button>
                              </li>
                            </ul>
                          )}
                        </div>
                      )}
                      <li className="nav-item dropdown logged-item">
                        <Link
                          to="#"
                          className={`dropdown-toggle profile-userlink ${
                            drops ? "show" : ""
                          }`}
                          data-bs-toggle="dropdown"
                          aria-expanded={drops}
                          onClick={() => setDrops(!drops)}
                        >
                          <img src={fallbackImage} alt="Guest" />
                          <span
                            style={{
                              marginRight: i18n.language === "en" ? "8px" : "0",
                              marginLeft: i18n.language === "ar" ? "8px" : "0",
                            }}
                          >
                            {t("common.guest")}
                          </span>
                        </Link>
                        <div
                          className={`dropdown-menu dropdown-menu-end ${
                            drops ? "show" : ""
                          }`}
                        >
                          <Link className="dropdown-item" to="/signup">
                            {t("common.signup")}
                          </Link>
                          <Link className="dropdown-item" to="/login">
                            {t("common.login")}
                          </Link>
                        </div>
                      </li>
                    </ul>
                  )}
                </ul>
              </div>
            </nav>
          </div>
        </div>
        {/* <hr
        style={{
          backgroundColor: "#000",
          width: window.innerWidth <= 576 ? "100%" : "74%",
          margin: "0 auto", // Centers the line horizontally
          border: "none",
          height: "2px",
        }}
      /> */}
        {!["/login", "/signup", "/forgot-password"].includes(
          location.pathname,
        ) && <HeaderLower />}
      </header>
      <div
        className={`mobile_header_bottom shadow-xl ${!showBottomNav ? "mobile_nav_hidden" : ""}`}
      >
        <nav className="mobile_nav">
          <ul>
            <li>
              <NavLink to="/messages">
                <FaEnvelope />
                <span>Messages</span>
              </NavLink>
            </li>

            <li>
              <NavLink onClick={toggleModal} to="#">
                <FaBell />
                <span>Notifications</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/listing">
                <GoPlus />
                <span>Add Ads</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/profile">
                <IoPersonOutline />
                <span>Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/">
                <FaHome />
                <span>Home</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
