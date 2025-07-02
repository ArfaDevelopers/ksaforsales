import React, { useState, useRef, useEffect } from "react";
import {
  FaSearch,
  FaThLarge,
  FaStickyNote,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import UpperHeader from "../upperHeader/Upper_Header";
import HeaderLower from "../HeaderlowerNav/HeaderLower";
import { Image } from "../../../../public/ksa4sale4.png";
import { Link, useNavigate } from "react-router-dom";
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
} from "react-icons/fa";
import Flag from "react-world-flags";
import useSearchStore from "../../../store/searchStore"; // adjust the path
import fallbackImage from "../../../../public/7309681.jpg";
const Header = ({ parms }) => {
  const [menu, setMenu] = useState(false);
  const [ImageURL, setImageURL] = useState(""); // ✅ Define the state

  const menuRef = useRef(null);
  const isSelecting = useRef(false);
  const getImageURL = async () => {
    const imageRef = ref(storage, "ksa4sale4.png"); // image path inside storage

    try {
      const url = await getDownloadURL(imageRef);
      console.log("Image URL:", url);

      return url;
    } catch (error) {
      console.error("Error fetching image URL:", error);
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
        console.log("Direct public image link:", url);
      }
    });
  }, []);

  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [drops, setDrops] = useState(false);
  const [divideName, setDivideName] = useState(null);
  const [divideImage, setDivideImage] = useState(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [openCategories, setOpenCategories] = useState({});
  const [openSubcategories, setOpenSubcategories] = useState({});
  // const { searchText, setSearchText, results } = useSearchStore();
  const dropdownRef = useRef(null);

  const { searchText, setSearchText, results, setSelectedItem } =
    useSearchStore();

  console.log(setSelectedItem, "user1111____911");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("user1111", user);
        setUserId(user.uid);
        setDivideName(user.displayName || "User");
        setDivideImage(user.photoURL || "User");
      } else {
        console.log("No user is logged in.");
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
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setIsDropdownVisible(false);
  };
  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };
  return (
    <header className="header">
      {/* <UpperHeader /> */}
      <div className="containerWrapper">
        <div className="container">
          <nav className="navbar navbar-expand-lg header-nav">
            <div
              className="container-fluid d-flex align-items-center justify-content-between"
              style={{ flexWrap: "nowrap" }}
            >
              <div className="navbar-header d-flex align-items-center">
                {/* <Link id="mobile_btn" to="#" onClick={toggleMobileMenu}>
                  <span className="bar-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </Link> */}
                <Link
                  id="mobile_btn"
                  to="#"
                  onClick={toggleMobileMenu}
                  className="menu-btn"
                >
                  <span className="bar-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </Link>

                <Offcanvas
                  show={menu}
                  onHide={toggleMobileMenu}
                  placement="start"
                  className="custom-sidebar"
                >
                  <Offcanvas.Header className="border-bottom">
                    <Offcanvas.Title className="fs-5 fw-bold">
                      Contrast Light
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
                          name: "Automotive",
                          path: "/AutomotiveComp",
                          icon: <FaCar />,
                          subcategories: [
                            {
                              name: "Cars For Sale",
                              path: "/AutomotiveComp?subCatgory=Cars For Sale",
                            },
                            {
                              name: "Car Rental",
                              path: "/AutomotiveComp?subCatgory=Car Rental",
                            },
                            {
                              name: "Plates Number",
                              path: "/AutomotiveComp?subCatgory=Plates Number",
                            },
                            {
                              name: "Spare Parts",
                              path: "/AutomotiveComp?subCatgory=Spare Parts",
                              subSubcategories: [
                                {
                                  name: "Body Parts",
                                  path: "/AutomotiveComp?NestedSubCategory=Body Parts",
                                },
                                {
                                  name: "Mechanical Parts",
                                  path: "/AutomotiveComp?NestedSubCategory=Mechanical Parts",
                                },
                                {
                                  name: "Spare Parts",
                                  path: "/AutomotiveComp?NestedSubCategory=Spare Parts",
                                },
                                {
                                  name: "Batteries",
                                  path: "/AutomotiveComp/?NestedSubCategory=Batteries",
                                },
                                {
                                  name: "Others",
                                  path: "/AutomotiveComp/?NestedSubCategory=Others",
                                },
                              ],
                            },
                            {
                              name: "Accessories",
                              path: "/AutomotiveComp?subCatgory=Accessories",
                            },
                            {
                              name: "Wheels & Rims",
                              path: "/AutomotiveComp?subCatgory=Wheels Rims",
                            },
                            {
                              name: "Trucks & Heavy Machinery",
                              path: "/AutomotiveComp?subCatgory=Trucks Heavy Machinery",
                              subSubcategories: [
                                {
                                  name: "Trucks",
                                  path: "/AutomotiveComp?NestedSubCategory=Trucks",
                                },
                                {
                                  name: "Dump Truck",
                                  path: "/AutomotiveComp?NestedSubCategory=Dump Truck",
                                },
                                {
                                  name: "Wheel Loader",
                                  path: "/AutomotiveComp?NestedSubCategory=Wheel Loader",
                                },
                                {
                                  name: "Recovery",
                                  path: "/AutomotiveComp?NestedSubCategory=Recovery",
                                },
                                {
                                  name: "Agricultural Equipment",
                                  path: "/AutomotiveComp?NestedSubCategory=Agricultural Equipment",
                                },
                                {
                                  name: "Crane",
                                  path: "/AutomotiveComp?NestedSubCategory=Crane",
                                },
                                {
                                  name: "Bulldozer",
                                  path: "/AutomotiveComp?NestedSubCategory=Bulldozer",
                                },
                                {
                                  name: "Crusher",
                                  path: "/AutomotiveComp?NestedSubCategory=Crusher",
                                },
                                {
                                  name: "Excavator",
                                  path: "/AutomotiveComp?NestedSubCategory=Excavator",
                                },
                                {
                                  name: "Heavy Equipment",
                                  path: "/AutomotiveComp?NestedSubCategory=Heavy Equipment",
                                },
                              ],
                            },
                            {
                              name: "Tshaleeh",
                              path: "/AutomotiveComp?subCatgory=Tshaleeh",
                            },
                            {
                              name: "Boats & Jet Ski",
                              path: "/AutomotiveComp?subCatgory=Boats & Jet Ski",
                              subSubcategories: [
                                {
                                  name: "Motorboats",
                                  path: "/AutomotiveComp?NestedSubCategory=Motor boats",
                                },
                                {
                                  name: "Jet-ski",
                                  path: "/AutomotiveComp?NestedSubCategory=Jet-ski",
                                },
                                {
                                  name: "Others",
                                  path: "/AutomotiveComp?NestedSubCategory=Others",
                                },
                              ],
                            },
                            {
                              name: "Classic Cars",
                              path: "/AutomotiveComp?subCatgory=Classic Cars",
                            },
                            {
                              name: "Salvage Cars",
                              path: "/AutomotiveComp?subCatgory=Salvage Cars",
                            },
                            {
                              name: "Mortgaged Cars",
                              path: "/AutomotiveComp?subCatgory=Mortgaged Cars",
                            },
                            {
                              name: "Recovery",
                              path: "/AutomotiveComp?subCatgory=Recovery",
                            },
                            {
                              name: "Food Truck",
                              path: "/AutomotiveComp?subCatgory=Food Truck",
                            },
                            {
                              name: "Caravans",
                              path: "/AutomotiveComp?subCatgory=Caravans",
                            },
                            {
                              name: "Reports",
                              path: "/AutomotiveComp?subCatgory=Reports",
                            },
                            {
                              name: "Car Cleaning",
                              path: "/AutomotiveComp?subCatgory=Car Cleaning",
                            },
                          ],
                        },
                        {
                          name: "Electronics",
                          path: "/ElectronicComp",
                          icon: <FaMobileAlt />,
                          subcategories: [
                            {
                              name: "Mobile Phones",
                              path: "/ElectronicComp?subCatgory=Mobile Phones",
                              subSubcategories: [
                                {
                                  name: "Smart Watches",
                                  path: "/ElectronicComp?NestedSubCategory=Smart Watches",
                                },
                                {
                                  name: "Headsets",
                                  path: "/ElectronicComp?NestedSubCategory=Headsets",
                                },
                                {
                                  name: "Chargers & Cables",
                                  path: "/ElectronicComp?NestedSubCategory=Chargers & Cables",
                                },
                                {
                                  name: "Covers & Protectors",
                                  path: "/ElectronicComp?NestedSubCategory=Covers & Protectors",
                                },
                              ],
                            },
                            {
                              name: "Tablet Devices",
                              path: "/ElectronicComp?subCatgory=Tablet Devices",
                              subSubcategories: [
                                {
                                  name: "iPad",
                                  path: "/ElectronicComp?NestedSubCategory=iPad",
                                },
                                {
                                  name: "Galaxy Tab",
                                  path: "/ElectronicComp?NestedSubCategory=Galaxy Tab",
                                },
                              ],
                            },
                            {
                              name: "Computers & Laptops",
                              path: "/ElectronicComp?subCatgory=Computers & Laptops",
                            },
                            {
                              name: "Video Games",
                              path: "/ElectronicComp?subCatgory=Video Games",
                              subSubcategories: [
                                {
                                  name: "VR Glasses",
                                  path: "/ElectronicComp?NestedSubCategory=VR Glasses",
                                },
                                {
                                  name: "PlayStation (PS) Devices",
                                  path: "/ElectronicComp?NestedSubCategory=PlayStation (PS) Devices",
                                },
                                {
                                  name: "PlayStation (PS) Games",
                                  path: "/ElectronicComp?NestedSubCategory=PlayStation (PS) Games",
                                },
                                {
                                  name: "Xbox Devices",
                                  path: "/ElectronicComp?NestedSubCategory=Xbox Devices",
                                },
                                {
                                  name: "Xbox Games",
                                  path: "/ElectronicComp?NestedSubCategory=Xbox Games",
                                },
                                {
                                  name: "Nintendo",
                                  path: "/ElectronicComp?NestedSubCategory=Nintendo",
                                },
                              ],
                            },
                            {
                              name: "Television & Audio System",
                              path: "/ElectronicComp?subCatgory=Television & Audio System",
                            },
                            {
                              name: "Accounts & Subscriptions",
                              path: "/ElectronicComp?subCatgory=Accounts & Subscriptions",
                              subSubcategories: [
                                {
                                  name: "PUBG",
                                  path: "/ElectronicComp?NestedSubCategory=PUBG",
                                },
                                {
                                  name: "Fortnite",
                                  path: "/ElectronicComp?NestedSubCategory=Fortnite",
                                },
                                {
                                  name: "FIFA",
                                  path: "/ElectronicComp?NestedSubCategory=FIFA",
                                },
                                {
                                  name: "Clash of Clans",
                                  path: "/ElectronicComp?NestedSubCategory=Clash of Clans",
                                },
                                {
                                  name: "Clash Royale",
                                  path: "/ElectronicComp?NestedSubCategory=Clash Royale",
                                },
                                {
                                  name: "Instagram Accounts",
                                  path: "/ElectronicComp?NestedSubCategory=Instagram Accounts",
                                },
                                {
                                  name: "Twitter Accounts",
                                  path: "/ElectronicComp?NestedSubCategory=Twitter Accounts",
                                },
                                {
                                  name: "TikTok Accounts",
                                  path: "/ElectronicComp?NestedSubCategory=TikTok Accounts",
                                },
                                {
                                  name: "Snapchat Accounts",
                                  path: "/ElectronicComp?NestedSubCategory=Snapchat Accounts",
                                },
                                {
                                  name: "Facebook Accounts",
                                  path: "/ElectronicComp?NestedSubCategory=Facebook Accounts",
                                },
                                {
                                  name: "YouTube Accounts",
                                  path: "/ElectronicComp?NestedSubCategory=YouTub eAccounts",
                                },
                                {
                                  name: "Other Accounts",
                                  path: "/ElectronicComp?NestedSubCategory=Other Accounts",
                                },
                              ],
                            },
                            {
                              name: "Special Number",
                              path: "/ElectronicComp?subCatgory=Special Number",
                              subSubcategories: [
                                {
                                  name: "STC",
                                  path: "/ElectronicComp?NestedSubCategory=STC",
                                },
                                {
                                  name: "Mobily",
                                  path: "/ElectronicComp?NestedSubCategory=Mobily",
                                },
                                {
                                  name: "Zain",
                                  path: "/ElectronicComp?NestedSubCategory=Zain",
                                },
                              ],
                            },
                            {
                              name: "Home & Kitchen Appliance",
                              path: "/ElectronicComp?subCatgory=Home & Kitchen Appliance",
                              subSubcategories: [
                                {
                                  name: "Stoves & Ovens",
                                  path: "/ElectronicComp?NestedSubCategory=Stoves & Ovens",
                                },
                                {
                                  name: "Refrigerators & Coolers",
                                  path: "/ElectronicComp?NestedSubCategory=Refrigerators & Coolers",
                                },
                                {
                                  name: "Mixers & Blenders",
                                  path: "/ElectronicComp?NestedSubCategory=Mixers & Blenders",
                                },
                                {
                                  name: "Washing Machines",
                                  path: "/ElectronicComp?NestedSubCategory=Washing Machines",
                                },
                                {
                                  name: "Kettles",
                                  path: "/ElectronicComp?NestedSubCategory=Kettles",
                                },
                                {
                                  name: "Fryers",
                                  path: "/ElectronicComp?NestedSubCategory=Fryers",
                                },
                                {
                                  name: "Coffee Machines",
                                  path: "/ElectronicComp?NestedSubCategory=Coffee Machines",
                                },
                                {
                                  name: "Microwaves & Toasters",
                                  path: "/ElectronicComp?NestedSubCategory=MicrowavesS & Toasters",
                                },
                                {
                                  name: "Vacuum Cleaners",
                                  path: "/ElectronicComp?NestedSubCategory=Vacuum Cleaners",
                                },
                                {
                                  name: "Clothing Irons",
                                  path: "/ElectronicComp?NestedSubCategory=Clothing Irons",
                                },
                                {
                                  name: "Air Conditioners",
                                  path: "/ElectronicComp?NestedSubCategory=Air Conditioners",
                                },
                              ],
                            },
                            {
                              name: "Motors & Generators",
                              path: "/ElectronicComp?subCatgory=Motors & Generators",
                            },
                            {
                              name: "Cameras",
                              path: "/ElectronicComp?subCatgory=Cameras",
                              subSubcategories: [
                                {
                                  name: "Lenses",
                                  path: "/ElectronicComp?NestedSubCategory=Lenses",
                                },
                                {
                                  name: "Drone",
                                  path: "/ElectronicComp?NestedSubCategory=Drone",
                                },
                                {
                                  name: "Camera Accessories",
                                  path: "/ElectronicComp?NestedSubCategory=Camera Accessories",
                                },
                              ],
                            },
                            {
                              name: "Networking Devices",
                              path: "/ElectronicComp?subCatgory=Networking Devices",
                            },
                            {
                              name: "Screens & Projectors",
                              path: "/ElectronicComp?subCatgory=Screens & Projectors",
                            },
                            {
                              name: "Printer & Scanner",
                              path: "/ElectronicComp?subCatgory=Printer & Scanner",
                            },
                            {
                              name: "Computer Accessories",
                              path: "/ElectronicComp?subCatgory=Computer Accessories",
                            },
                          ],
                        },
                        {
                          name: "Fashion Style",
                          path: "/FashionStyle",
                          icon: <FaTshirt />,
                          subcategories: [
                            {
                              name: "Watches",
                              path: "/FashionStyle?subCatgory=Watches",
                              subSubcategories: [
                                {
                                  name: "Other Watches",
                                  path: "/FashionStyle?NestedSubCategory=Other Watches",
                                },
                                {
                                  name: "Men's Watches",
                                  path: "/FashionStyle?NestedSubCategory=Men' sWatches",
                                },
                                {
                                  name: "Women's Watches",
                                  path: "/FashionStyle?NestedSubCategory=Women' sWatches",
                                },
                              ],
                            },
                            {
                              name: "Perfumes & Incense",
                              path: "/FashionStyle?subCatgory=Perfumes & Incense",
                              subSubcategories: [
                                {
                                  name: "Other Perfumes",
                                  path: "/FashionStyle?NestedSubCategory=Other Perfumes",
                                },
                                {
                                  name: "Men's Perfumes",
                                  path: "/FashionStyle?NestedSubCategory=Men's Perfumes",
                                },
                                {
                                  name: "Women's Perfumes",
                                  path: "/FashionStyle?NestedSubCategory=Women's Perfumes",
                                },
                                {
                                  name: "Oud & Incense",
                                  path: "/FashionStyle?NestedSubCategory=Oud & Incense",
                                },
                              ],
                            },
                            {
                              name: "Sports Equipment",
                              path: "/FashionStyle?subCatgory=Sports Equipment",
                              subSubcategories: [
                                {
                                  name: "Eyeglasses",
                                  path: "/FashionStyle?NestedSubCategory=Eyeglasses",
                                },
                                {
                                  name: "Other Eyeglasses",
                                  path: "/FashionStyle?NestedSubCategory=Other Eyeglasses",
                                },
                                {
                                  name: "Men's Eyeglasses",
                                  path: "/FashionStyle?NestedSubCategory=Men's Eyeglasses",
                                },
                                {
                                  name: "Women's Eyeglasses",
                                  path: "/FashionStyle?NestedSubCategory=Women's Eyeglasses",
                                },
                              ],
                            },
                            {
                              name: "Men's Fashion",
                              path: "/FashionStyle?subCatgory=Men's Fashion",
                              subSubcategories: [
                                {
                                  name: "Men's Shemaghs",
                                  path: "/FashionStyle?subCatgory=Men's Shemaghs",
                                },
                                {
                                  name: "Men's Accessories",
                                  path: "/FashionStyle?subCatgory=Men's Accessories",
                                },
                                {
                                  name: "Men's Clothing",
                                  path: "//FashionStyle?subCatgory=Men's Clothing",
                                },
                                {
                                  name: "Men's Jackets",
                                  path: "/FashionStyle?subCatgory=Men's Jackets",
                                },
                                {
                                  name: "Men's Bags",
                                  path: "/FashionStyle?subCatgory=Men's Bags",
                                },
                                {
                                  name: "Men's Shirts & Trousers",
                                  path: "/FashionStyle?subCatgory=Men's Shirts & Trousers",
                                },
                                {
                                  name: "Men's Sportswear",
                                  path: "/FashionStyle?subCatgory=Men's Sportswear",
                                },
                              ],
                            },
                            {
                              name: "Women's Fashion",
                              path: "/FashionStyle?subCatgory=Women's Fashion",
                              subSubcategories: [
                                {
                                  name: "Women's Accessories & Jewelry",
                                  path: "/FashionStyle?NestedSubCategory=Women's Accessories & Jewelry",
                                },
                                {
                                  name: "Women's Blouses & T-Shirts",
                                  path: "/FashionStyle?NestedSubCategory=Women's Blouses & T-Shirts",
                                },
                                {
                                  name: "Women's Skirts & Trousers",
                                  path: "/FashionStyle?NestedSubCategory=Women's Skirts & Trousers",
                                },
                                {
                                  name: "Women's Jackets",
                                  path: "/FashionStyle?NestedSubCategory=Women's Jackets",
                                },
                                {
                                  name: "Kaftans",
                                  path: "/FashionStyle?NestedSubCategory=Kaftans",
                                },
                                {
                                  name: "Women's Bags",
                                  path: "/FashionStyle?NestedSubCategory=Women's Bags",
                                },
                                {
                                  name: "Abayas",
                                  path: "/FashionStyle?NestedSubCategory=Abayas",
                                },
                                {
                                  name: "Dresses",
                                  path: "/FashionStyle?NestedSubCategory=Dresses",
                                },
                                {
                                  name: "Lingerie",
                                  path: "/FashionStyle?NestedSubCategory=Lingerie",
                                },
                                {
                                  name: "Women's Sportswear",
                                  path: "/FashionStyle?NestedSubCategory=Women's Sportswear",
                                },
                              ],
                            },
                            {
                              name: "Children's Clothing & Accessories",
                              path: "/FashionStyle?subCatgory=Children's Clothing & Accessories",
                              subSubcategories: [
                                {
                                  name: "Baby Care Products",
                                  path: "/FashionStyle?NestedSubCategory=Baby Care Products",
                                },
                                {
                                  name: "Children's Accessories",
                                  path: "/FashionStyle?NestedSubCategory=Children's Accessories",
                                },
                                {
                                  name: "Toys for Kids",
                                  path: "/FashionStyle?NestedSubCategory=Toys for Kids",
                                },
                                {
                                  name: "Children's Cribs & Chairs",
                                  path: "/FashionStyle?NestedSubCategory=Children's Cribs & Chairs",
                                },
                                {
                                  name: "Children's Bags",
                                  path: "/FashionStyle?NestedSubCategory=Children's Bags",
                                },
                                {
                                  name: "Strollers",
                                  path: "/FashionStyle?NestedSubCategory=Strollers",
                                },
                                {
                                  name: "Car Seats for Kids",
                                  path: "/FashionStyle?NestedSubCategory=Car Seats for Kids",
                                },
                                {
                                  name: "Girls' Clothing",
                                  path: "/FashionStyle?NestedSubCategory=Girl's Clothing",
                                },
                                {
                                  name: "Boys' Clothing",
                                  path: "/FashionStyle?NestedSubCategory=Boys's Clothing",
                                },
                              ],
                            },
                            {
                              name: "Sleepwear",
                              path: "/FashionStyle?subCatgory=Sleepwear",
                            },
                            {
                              name: "Gifts",
                              path: "/FashionStyle?subCatgory=Gifts",
                            },
                            {
                              name: "Luggage",
                              path: "/FashionStyle?subCatgory=Luggage",
                            },
                            {
                              name: "Health & Beauty",
                              path: "/FashionStyle?subCatgory=Health & Beauty",
                              subSubcategories: [
                                {
                                  name: "Skincare",
                                  path: "/FashionStyle?NestedSubCategory=Skincare",
                                },
                                {
                                  name: "Hair Care",
                                  path: "/FashionStyle?NestedSubCategory=Hair Care",
                                },
                                {
                                  name: "Makeup",
                                  path: "/FashionStyle?NestedSubCategory=Makeup",
                                },
                                {
                                  name: "Other Beauty Products",
                                  path: "FashionStyle?NestedSubCategory=Other Beauty Products",
                                },
                              ],
                            },
                          ],
                        },
                        {
                          name: "Home & Furniture",
                          path: "/HealthCareComp",
                          icon: <FaCouch />,
                          icon: <FaStickyNote />,
                          subcategories: [
                            {
                              name: "Outdoor Furniture",
                              path: "/HealthCareComp?subCatgory=Outdoor Furniture",
                            },
                            {
                              name: "Majlis & Sofas",
                              path: "/HealthCareComp?subCatgory=Majlis & Sofas",
                            },
                            {
                              name: "Cabinets & Wardrobes",
                              path: "/HealthCareComp?subCatgory=Cabinets & Wardrobes",
                            },
                            {
                              name: "Beds & Mattresses",
                              path: "/HealthCareComp?subCatgory=Beds & Mattresses",
                            },
                            {
                              name: "Tables & Chairs",
                              path: "/HealthCareComp?subCatgory=Tables & Chairs",
                            },
                            {
                              name: "Kitchens",
                              path: "/HealthCareComp?subCatgory=Kitchens",
                            },
                            {
                              name: "Bathrooms",
                              path: "/HealthCareComp?subCatgory=Bathrooms",
                            },
                            {
                              name: "Carpets",
                              path: "/HealthCareComp?subCatgory=Carpets",
                            },
                            {
                              name: "Curtains",
                              path: "/HealthCareComp?subCatgory=Curtains",
                            },
                            {
                              name: "Decoration & Accessories",
                              path: "/HealthCareComp?subCatgory=Decoration & Accessories",
                            },
                            {
                              name: "Lighting",
                              path: "/HealthCareComp?subCatgory=Lighting",
                            },
                            {
                              name: "Household Items",
                              path: "/HealthCareComp?subCatgory=Household Items",
                            },
                            {
                              name: "Garden - Plants",
                              path: "/HealthCareComp?subCatgory=Garden Plants",
                            },
                            {
                              name: "Office Furniture",
                              path: "/HealthCareComp?subCatgory=Office Furniture",
                            },
                            {
                              name: "Doors - Windows - Aluminium",
                              path: "/HealthCareComp?subCatgory=Doors Windows Aluminium",
                            },
                            {
                              name: "Tiles & Flooring",
                              path: "/HealthCareComp?subCatgory=Tiles & Flooring",
                            },
                          ],
                        },
                        {
                          name: "Job Board",
                          path: "/JobBoard",
                          icon: <FaBriefcase />,
                          subcategories: [
                            {
                              name: "Administrative Jobs",
                              path: "/JobBoard?subCatgory=Administrative Jobs",
                              subSubcategories: [
                                {
                                  name: "Marketing & Sales",
                                  path: "/JobBoard?NestedSubCategory=Marketing & Sales",
                                },
                                {
                                  name: "Customer Service",
                                  path: "/JobBoard?NestedSubCategory=Customer Service",
                                },
                                {
                                  name: "Secretary",
                                  path: "/JobBoard?NestedSubCategory=Secretary",
                                },
                                {
                                  name: "Tourism & Hospitality",
                                  path: "/JobBoard?NestedSubCategory=Tourism & Hospitality",
                                },
                                {
                                  name: "Accountant",
                                  path: "/JobBoard?NestedSubCategory=Accountant",
                                },
                                {
                                  name: "Delivery Representative",
                                  path: "/JobBoard?NestedSubCategory=Delivery Representative",
                                },
                                {
                                  name: "Other Administrative Jobs",
                                  path: "/JobBoard?NestedSubCategory=Other Administrative Jobs",
                                },
                                {
                                  name: "Public Relations & Media",
                                  path: "/JobBoard?NestedSubCategory=Public Relations & Media",
                                },
                                {
                                  name: "Translator",
                                  path: "/JobBoard?NestedSubCategory=Translator",
                                },
                                {
                                  name: "Lawyer & Legal Jobs",
                                  path: "/JobBoard?NestedSubCategory=Lawyer & LegalJobs",
                                },
                              ],
                            },
                            {
                              name: "Fashion & Beauty Jobs",
                              path: "/JobBoard?subCatgory=Fashion & Beauty Jobs",
                              subSubcategories: [
                                {
                                  name: "Tailor",
                                  path: "/JobBoard?NestedSubCategory=Tailor",
                                },
                                {
                                  name: "Female Hairdresser",
                                  path: "/JobBoard?NestedSubCategory=Female Hair dresser",
                                },
                                {
                                  name: "Fashion Designer",
                                  path: "/JobBoard?NestedSubCategory=Fashion Designer",
                                },
                                {
                                  name: "Model",
                                  path: "/JobBoard?NestedSubCategory=Model",
                                },
                                {
                                  name: "Makeup Artist",
                                  path: "/JobBoard?NestedSubCategory=Makeup Artist",
                                },
                                {
                                  name: "Hair Stylist",
                                  path: "/JobBoard?NestedSubCategory=Hair Stylist",
                                },
                                {
                                  name: "Other Beauty Jobs",
                                  path: "/JobBoard?NestedSubCategory=Other Beauty Jobs",
                                },
                              ],
                            },
                            {
                              name: "Security & Safety Jobs",
                              path: "/JobBoard?subCatgory=Security & Safety Jobs",
                              subSubcategories: [
                                {
                                  name: "Security Guard",
                                  path: "/JobBoard?NestedSubCategory=Security Guard",
                                },
                                {
                                  name: "Safety Technician",
                                  path: "/JobBoard?NestedSubCategory=Safety Technician",
                                },
                              ],
                            },
                            {
                              name: "Teaching Jobs",
                              path: "/JobBoard?subCatgory=Teaching Jobs",
                            },
                            {
                              name: "IT & Design Jobs",
                              path: "/JobBoard?subCatgory=IT & DesignJobs",
                              subSubcategories: [
                                {
                                  name: "Other IT Jobs",
                                  path: "/JobBoard?NestedSubCategory=Other IT Jobs",
                                },
                                {
                                  name: "Network & Telecommunications Specialist",
                                  path: "/JobBoard?NestedSubCategory=Network & Telecommunications Specialist",
                                },
                                {
                                  name: "Content Writer",
                                  path: "/JobBoard?NestedSubCategory=Content Writer",
                                },
                                {
                                  name: "Programmer",
                                  path: "/JobBoard?NestedSubCategory=Programmer",
                                },
                                {
                                  name: "Media Designer",
                                  path: "/JobBoard?NestedSubCategory=Media Designer",
                                },
                              ],
                            },
                            {
                              name: "Agriculture & Farming Jobs",
                              path: "/JobBoard?subCatgory=Agriculture & Farming Jobs",
                              subSubcategories: [
                                {
                                  name: "Farm Worker",
                                  path: "/JobBoard?NestedSubCategory=Farm Worker",
                                },
                                {
                                  name: "Other Agricultural Jobs",
                                  path: "/JobBoard?NestedSubCategory=Other Agricultural Jobs",
                                },
                              ],
                            },
                            {
                              name: "Industrial Jobs",
                              path: "/JobBoard?subCatgory=Industrial Jobs",
                              subSubcategories: [
                                {
                                  name: "Bodywork Technician",
                                  path: "/JobBoard?NestedSubCategory=Bodywork Technician",
                                },
                                {
                                  name: "Auto Electrician",
                                  path: "/JobBoard?NestedSubCategory=Auto Electrician",
                                },
                                {
                                  name: "Car Mechanic",
                                  path: "/JobBoard?NestedSubCategory=Car Mechanic",
                                },
                                {
                                  name: "Other Industrial Jobs",
                                  path: "/JobBoard?NestedSubCategory=Other Industrial Jobs",
                                },
                              ],
                            },
                            {
                              name: "Medical & Nursing Jobs",
                              path: "/JobBoard?subCatgory=Medical & Nursing Jobs",
                              subSubcategories: [
                                {
                                  name: "Pharmacist",
                                  path: "/JobBoard?NestedSubCategory=Pharmacist",
                                },
                                {
                                  name: "Doctor",
                                  path: "/JobBoard?NestedSubCategory=Doctor",
                                },
                                {
                                  name: "Physical Therapy Technician",
                                  path: "/JobBoard?NestedSubCategory=Physical Therapy Technician",
                                },
                                {
                                  name: "Massage Therapist",
                                  path: "/JobBoard?NestedSubCategory=Massage Therapist",
                                },
                                {
                                  name: "Nurse",
                                  path: "/JobBoard?NestedSubCategory=Nurse",
                                },
                                {
                                  name: "Other Medical Jobs",
                                  path: "/JobBoard?NestedSubCategory=Other Medical Jobs",
                                },
                              ],
                            },
                            {
                              name: "Architecture & Construction Jobs",
                              path: "/JobBoard?subCatgory=Architecture & Construction Jobs",
                              subSubcategories: [
                                {
                                  name: "Building Painter",
                                  path: "/JobBoard?NestedSubCategory=Building Painter",
                                },
                                {
                                  name: "AC Technician",
                                  path: "/JobBoard?NestedSubCategory=AC Technician",
                                },
                                {
                                  name: "Decorator",
                                  path: "/JobBoard?NestedSubCategory=Decorator",
                                },
                                {
                                  name: "Building Electrician",
                                  path: "/JobBoard?NestedSubCategory=Building Electrician",
                                },
                                {
                                  name: "Tiler",
                                  path: "/JobBoard?NestedSubCategory=Tiler",
                                },
                                {
                                  name: "Building Supervisor",
                                  path: "/JobBoard?NestedSubCategory=Building Supervisor",
                                },
                                {
                                  name: "Building Contractor",
                                  path: "/JobBoard?NestedSubCategory=Building Contractor",
                                },
                                {
                                  name: "Plasterer",
                                  path: "/JobBoard?NestedSubCategory=Plasterer",
                                },
                                {
                                  name: "Carpenter",
                                  path: "/JobBoard?NestedSubCategory=Carpenter",
                                },
                                {
                                  name: "Other Construction Jobs",
                                  path: "/JobBoard?NestedSubCategory=Other Construction Jobs",
                                },
                                {
                                  name: "Plumber",
                                  path: "/JobBoard?NestedSubCategory=Plumber",
                                },
                              ],
                            },
                            {
                              name: "Housekeeping Jobs",
                              path: "/JobBoard?subCatgory=Housekeeping Jobs",
                              subSubcategories: [
                                {
                                  name: "Private Driver",
                                  path: "/JobBoard?NestedSubCategory=Private Driver",
                                },
                                {
                                  name: "Household Worker",
                                  path: "/JobBoard?NestedSubCategory=Household Worker",
                                },
                                {
                                  name: "Domestic Worker",
                                  path: "/JobBoard?NestedSubCategory=Domestic Worker",
                                },
                                {
                                  name: "Other Labor Jobs",
                                  path: "/JobBoard?NestedSubCategory=Other Labor Jobs",
                                },
                              ],
                            },
                            {
                              name: "Restaurant Jobs",
                              path: "/JobBoard?subCatgory=Restaurant Jobs",
                              subSubcategories: [
                                {
                                  name: "Chef & Cook Instructor",
                                  path: "/JobBoard?NestedSubCategory=Chef & Cook Instructor",
                                },
                                {
                                  name: "Waiter & Host",
                                  path: "/JobBoard?NestedSubCategory=Waiter & Host",
                                },
                                {
                                  name: "Other Restaurant Jobs",
                                  path: "/JobBoard?NestedSubCategory=Other Restaurant Jobs",
                                },
                              ],
                            },
                          ],
                        },
                        {
                          name: "Real Estate",
                          path: "/RealEstateComp",
                          icon: <FaHome />,
                          subcategories: [
                            {
                              name: "Apartments for Rent",
                              path: "/RealEstateComp?subCatgory=Apartments for Rent",
                            },
                            {
                              name: "Apartments for Sale",
                              path: "/RealEstateComp?subCatgory=Apartments for Sale",
                            },
                            {
                              name: "Building for Rent",
                              path: "/RealEstateComp?subCatgory=Building for Rent",
                            },
                            {
                              name: "Building for Sale",
                              path: "/RealEstateComp?subCatgory=Building for Sale",
                            },
                            {
                              name: "Camps for Rent",
                              path: "/RealEstateComp?subCatgory=Camps for Rent",
                            },
                            {
                              name: "Chalets for Sale",
                              path: "/RealEstateComp?subCatgory=Chalets for Sale",
                            },
                            {
                              name: "Commercial Lands for Sale",
                              path: "/RealEstateComp?subCatgory=Commercial Lands for Sale",
                            },
                            {
                              name: "Compound for Rent",
                              path: "/RealEstateComp?subCatgory=Compound for Rent",
                            },
                            {
                              name: "Compound for Sale",
                              path: "/RealEstateComp?subCatgory=Compound for Sale",
                            },
                            {
                              name: "Farm for Rent",
                              path: "/RealEstateComp?subCatgory=Farm for Rent",
                            },
                            {
                              name: "Farms for Sale",
                              path: "/RealEstateComp?subCatgory=Farms for Sale",
                            },
                            {
                              name: "Floor for Sale",
                              path: "/RealEstateComp?subCatgory=Floor for Sale",
                            },
                            {
                              name: "Floors for Rent",
                              path: "/RealEstateComp?subCatgory=Floors for Rent",
                            },
                            {
                              name: "Hall for Rent",
                              path: "/RealEstateComp?subCatgory=Hall for Rent",
                            },
                            {
                              name: "Houses for Rent",
                              path: "/RealEstateComp?subCatgory=Houses for Rent",
                            },
                            {
                              name: "Houses for Sale",
                              path: "/RealEstateComp?subCatgory=Houses for Sale",
                            },
                            {
                              name: "Lands for Sale",
                              path: "/RealEstateComp?subCatgory=Lands for Sale",
                            },
                            {
                              name: "Offices for Rent",
                              path: "/RealEstateComp?subCatgory=Offices for Rent",
                            },
                            {
                              name: "Rest Houses for Rent",
                              path: "/RealEstateComp?subCatgory=RestHouses for Rent",
                            },
                            {
                              name: "Rest Houses for Sale",
                              path: "/RealEstateComp?subCatgory=RestHouses for Sale",
                            },
                            {
                              name: "Rooms for Rent",
                              path: "/RealEstateComp?subCatgory=Rooms for Rent",
                            },
                            {
                              name: "Shops for Rent",
                              path: "/RealEstateComp?subCatgory=Shops for Rent",
                            },
                            {
                              name: "Shops for Transfer",
                              path: "/RealEstateComp?subCatgory=Shops for Transfer",
                            },
                            {
                              name: "Villas for Rent",
                              path: "/RealEstateComp?subCatgory=Villas for Rent",
                            },
                            {
                              name: "Villas for Sale",
                              path: "/RealEstateComp?subCatgory=Villas for Sale",
                            },
                            {
                              name: "Warehouse for Sale",
                              path: "/RealEstateComp?subCatgory=Warehouse for Sale",
                            },
                            {
                              name: "Warehouse for Rent",
                              path: "/RealEstateComp?subCatgory=Warehouse for Rent",
                            },
                          ],
                        },
                        {
                          name: "Services",
                          path: "/TravelComp",
                          icon: <FaTools />,
                          subcategories: [
                            {
                              name: "Other Services",
                              path: "/TravelComp?subCatgory=Other Services",
                            },
                            {
                              name: "Contracting Services",
                              path: "/TravelComp?subCatgory=Contracting Services",
                            },
                            {
                              name: "Government Paperwork Services",
                              path: "/TravelComp?subCatgory=Government Paperwork Services",
                            },
                            {
                              name: "Delivery Services",
                              path: "/TravelComp?subCatgory=Delivery Services",
                            },
                            {
                              name: "Furniture Moving Services",
                              path: "/TravelComp?subCatgory=Furniture Moving Services",
                            },
                            {
                              name: "Cleaning Services",
                              path: "/TravelComp?subCatgory=Cleaning Services",
                            },
                            {
                              name: "International Shopping Services",
                              path: "/TravelComp?subCatgory=International Shopping Services",
                            },
                            {
                              name: "Legal Services",
                              path: "/TravelComp?subCatgory=Legal Services",
                            },
                            {
                              name: "Accounting & Financial Services",
                              path: "/TravelComp?subCatgory=Accounting & Financial Services",
                            },
                          ],
                        },
                        {
                          name: "Sport & Games",
                          path: "/SportGamesComp",
                          icon: <FaGamepad />,
                          subcategories: [
                            {
                              name: "Gaming Consoles",
                              path: "/SportGamesComp?subCatgory=Gaming Consoles",
                            },
                            {
                              name: "Video Games",
                              path: "/SportGamesComp?subCatgory=Video Games",
                            },
                            {
                              name: "Controllers",
                              path: "/SportGamesComp?subCatgory=Controllers",
                            },
                            {
                              name: "Gaming Accessories",
                              path: "/SportGamesComp?subCatgory=Gaming Accessories",
                            },
                            {
                              name: "Gift Cards",
                              path: "/SportGamesComp?subCatgory=Gift Cards",
                            },
                            {
                              name: "Accounts",
                              path: "/SportGamesComp?subCatgory=Accounts",
                            },
                            {
                              name: "Toys",
                              path: "/SportGamesComp?subCatgory=Toys",
                            },
                          ],
                        },
                        {
                          name: "Pet & Animals",
                          path: "/PetAnimalsComp",
                          icon: <FaPaw />,
                          subcategories: [
                            {
                              name: "Sheep",
                              path: "/PetAnimalsComp?subCatgory=Sheep",
                              subSubcategories: [
                                {
                                  name: "Barbary Sheep",
                                  path: "/PetAnimalsComp?NestedSubCategory=Barbary Sheep",
                                },
                                {
                                  name: "Hure Sheep",
                                  path: "/PetAnimalsComp?NestedSubCategory=Hure Sheep",
                                },
                                {
                                  name: "Romanian Sheep",
                                  path: "/PetAnimalsComp?NestedSubCategory=Romanian Sheep",
                                },
                                {
                                  name: "Sawakni Sheep",
                                  path: "/PetAnimalsComp?NestedSubCategory=Sawakni Sheep",
                                },
                                {
                                  name: "Najdi Sheep",
                                  path: "/PetAnimalsComp?NestedSubCategory=Najdi Sheep",
                                },
                                {
                                  name: "Naemi Sheep",
                                  path: "/PetAnimalsComp?NestedSubCategory=Naemi Sheep",
                                },
                                {
                                  name: "Rafidi Sheep",
                                  path: "/PetAnimalsComp?NestedSubCategory=Rafidi Sheep",
                                },
                                {
                                  name: "Sheep Supplies",
                                  path: "/PetAnimalsComp?NestedSubCategory=Sheep Supplies",
                                },
                                {
                                  name: "Sheep Products",
                                  path: "/PetAnimalsComp?NestedSubCategory=Sheep Products",
                                },
                              ],
                            },
                            {
                              name: "Goats",
                              path: "/PetAnimalsComp?subCatgory=Goats",
                              subSubcategories: [
                                {
                                  name: "Local Goats",
                                  path: "/PetAnimalsComp?NestedSubCategory=Local Goats",
                                },
                                {
                                  name: "Bishi Goats",
                                  path: "/PetAnimalsComp?NestedSubCategory=Bishi Goats",
                                },
                                {
                                  name: "Southern Goats",
                                  path: "/PetAnimalsComp?NestedSubCategory=Southern Goats",
                                },
                                {
                                  name: "Hejaz Goats",
                                  path: "/PetAnimalsComp?NestedSubCategory=Hejaz Goats",
                                },
                                {
                                  name: "Shami Goats",
                                  path: "/PetAnimalsComp?NestedSubCategory=Shami Goats",
                                },
                                {
                                  name: "Ardi Goats",
                                  path: "/PetAnimalsComp?NestedSubCategory=Ardi Goats",
                                },
                                {
                                  name: "Dutch Goats",
                                  path: "/PetAnimalsComp?NestedSubCategory=Dutch Goats",
                                },
                                {
                                  name: "Dwarf Goats",
                                  path: "/PetAnimalsComp?NestedSubCategory=Dwarf Goats",
                                },
                              ],
                            },
                            {
                              name: "Parrot",
                              path: "/PetAnimalsComp?subCatgory=Parrot",
                              subSubcategories: [
                                {
                                  name: "Amazoni Parrot",
                                  path: "/PetAnimalsComp?NestedSubCategory=Amazoni Parrot",
                                },
                                {
                                  name: "Congo African Grey Parrot",
                                  path: "/PetAnimalsComp?NestedSubCategory=Congo African Grey Parrot",
                                },
                                {
                                  name: "Cockatoo Parrot",
                                  path: "/PetAnimalsComp?NestedSubCategory=Cockatoo Parrot",
                                },
                                {
                                  name: "Macaw Parrot",
                                  path: "/PetAnimalsComp?NestedSubCategory=Macaw Parrot",
                                },
                                {
                                  name: "Pet Birds",
                                  path: "/PetAnimalsComp?NestedSubCategory=Pet Birds",
                                },
                                {
                                  name: "Bird Supplies",
                                  path: "/PetAnimalsComp?NestedSubCategory=Bird Supplies",
                                },
                              ],
                            },
                            {
                              name: "Dove/Pigeon",
                              path: "/PetAnimalsComp?subCatgory=Dove & Pigeon",
                              subSubcategories: [
                                {
                                  name: "Pakistani Pigeon",
                                  path: "/PetAnimalsComp?NestedSubCategory=Pakistani Pigeon",
                                },
                                {
                                  name: "Turkish Pigeon",
                                  path: "/PetAnimalsComp?NestedSubCategory=Turkish Pigeon",
                                },
                                {
                                  name: "Homers (Pigeons)",
                                  path: "/PetAnimalsComp?NestedSubCategory=Homers",
                                },
                                {
                                  name: "Sudanese Pigeon",
                                  path: "/PetAnimalsComp?NestedSubCategory=Sudanese Pigeon",
                                },
                                {
                                  name: "Shami Pigeon",
                                  path: "/PetAnimalsComp?NestedSubCategory=Shami Pigeon",
                                },
                                {
                                  name: "Sanaani Pigeon",
                                  path: "/PetAnimalsComp?NestedSubCategory=Sanaani Pigeon",
                                },
                                {
                                  name: "French Pigeon",
                                  path: "/PetAnimalsComp?NestedSubCategory=French Pigeon",
                                },
                                {
                                  name: "Egyptian Pigeon",
                                  path: "/PetAnimalsComp?NestedSubCategory=Egyptian Pigeon",
                                },
                                {
                                  name: "Indian Pigeon",
                                  path: "/PetAnimalsComp?NestedSubCategory=Indian Pigeon",
                                },
                                {
                                  name: "Dutch Pigeon",
                                  path: "/PetAnimalsComp?NestedSubCategory=Dutch Pigeon",
                                },
                                {
                                  name: "Qatifi Pigeon",
                                  path: "/PetAnimalsComp?NestedSubCategory=Qatifi Pigeon",
                                },
                              ],
                            },
                            {
                              name: "Cats",
                              path: "/PetAnimalsComp?subCatgory=Cats",
                              subSubcategories: [
                                {
                                  name: "Scottish Cats",
                                  path: "/PetAnimalsComp?NestedSubCategory=Scottish Cats",
                                },
                                {
                                  name: "Persian Cats",
                                  path: "/PetAnimalsComp?NestedSubCategory=Persian Cats",
                                },
                                {
                                  name: "Cats for Adoption",
                                  path: "/PetAnimalsComp?NestedSubCategory=Cats for Adoption",
                                },
                                {
                                  name: "Himalayan Cats",
                                  path: "/PetAnimalsComp?NestedSubCategory=Himalayan Cats",
                                },
                                {
                                  name: "Cat Supplies",
                                  path: "/PetAnimalsComp?NestedSubCategory=Cat Supplies",
                                },
                              ],
                            },
                            {
                              name: "Chickens",
                              path: "/PetAnimalsComp?subCatgory=Chickens",
                              subSubcategories: [
                                {
                                  name: "Brahma Chickens",
                                  path: "/PetAnimalsComp?NestedSubCategory=Brahma Chickens",
                                },
                                {
                                  name: "Local Chickens",
                                  path: "/PetAnimalsComp?NestedSubCategory=Local Chickens",
                                },
                                {
                                  name: "Turkish Chickens",
                                  path: "/PetAnimalsComp?NestedSubCategory=Turkish Chickens",
                                },
                                {
                                  name: "Turkey Chickens",
                                  path: "/PetAnimalsComp?NestedSubCategory=Turkey Chickens",
                                },
                                {
                                  name: "Persian Chickens",
                                  path: "/PetAnimalsComp?NestedSubCategory=Persian Chickens",
                                },
                                {
                                  name: "French Chickens",
                                  path: "/PetAnimalsComp?NestedSubCategory=French Chickens",
                                },
                                {
                                  name: "Fayoumi Chickens",
                                  path: "/PetAnimalsComp?NestedSubCategory=Fayoumi Chickens",
                                },
                                {
                                  name: "Pakistani Chickens",
                                  path: "/PetAnimalsComp?NestedSubCategory=Pakistani Chickens",
                                },
                                {
                                  name: "Poultry Supplies",
                                  path: "/PetAnimalsComp?NestedSubCategory=Poultry Supplies",
                                },
                              ],
                            },
                            {
                              name: "Camels",
                              path: "/PetAnimalsComp?subCatgory=Camels",
                              subSubcategories: [
                                {
                                  name: "Bakar Camels",
                                  path: "/PetAnimalsComp?NestedSubCategory=Bakar Camels",
                                },
                                {
                                  name: "Stud Camels",
                                  path: "/PetAnimalsComp?NestedSubCategory=Stud Camels",
                                },
                                {
                                  name: "Camel Stallions",
                                  path: "/PetAnimalsComp?NestedSubCategory=Camel Stallions",
                                },
                                {
                                  name: "Female Camels",
                                  path: "/PetAnimalsComp?NestedSubCategory=FemaleCamels",
                                },
                                {
                                  name: "Camel Supplies",
                                  path: "/PetAnimalsComp?NestedSubCategory=Camel Supplies",
                                },
                              ],
                            },
                            {
                              name: "Horses",
                              path: "/PetAnimalsComp?subCatgory=Horses",
                              subSubcategories: [
                                {
                                  name: "Popular Horses",
                                  path: "/PetAnimalsComp?NestedSubCategory=Popular Horses",
                                },
                                {
                                  name: "Mixed Horses",
                                  path: "/PetAnimalsComp?NestedSubCategory=Mixed Horses",
                                },
                                {
                                  name: "Wahho Horses",
                                  path: "/PetAnimalsComp?NestedSubCategory=Wahho Horses",
                                },
                                {
                                  name: "English Horses",
                                  path: "/PetAnimalsComp?NestedSubCategory=English Horses",
                                },
                                {
                                  name: "Horse Supplies",
                                  path: "/PetAnimalsComp?NestedSubCategory=Horse Supplies",
                                },
                              ],
                            },
                            {
                              name: "Dogs",
                              path: "/PetAnimalsComp?subCatgory=Dogs",
                              subSubcategories: [
                                {
                                  name: "Pitbull Dogs",
                                  path: "/PetAnimalsComp?NestedSubCategory=Pitbull Dogs",
                                },
                                {
                                  name: "Pomeranian Dogs",
                                  path: "/PetAnimalsComp?NestedSubCategory=Pomeranian Dogs",
                                },
                                {
                                  name: "Golden Retriever Dogs",
                                  path: "/PetAnimalsComp?NestedSubCategory=Golden Retriever Dogs",
                                },
                                {
                                  name: "German Shepherd Dogs",
                                  path: "/PetAnimalsComp?NestedSubCategory=German Shepherd Dogs",
                                },
                                {
                                  name: "Shih Tzu Dog",
                                  path: "/PetAnimalsComp?NestedSubCategory=ShihTzu Dog",
                                },
                                {
                                  name: "Chihuahua Dog",
                                  path: "/PetAnimalsComp?NestedSubCategory=Chihuahua Dog",
                                },
                                {
                                  name: "Maltese Dog",
                                  path: "/PetAnimalsComp?NestedSubCategory=Maltese Dog",
                                },
                                {
                                  name: "Husky Dog",
                                  path: "/PetAnimalsComp?NestedSubCategory=Husky Dog",
                                },
                                {
                                  name: "Dog Supplies",
                                  path: "/PetAnimalsComp?NestedSubCategory=Dog Supplies",
                                },
                              ],
                            },
                            {
                              name: "Cows",
                              path: "/PetAnimalsComp?subCatgory=Cows",
                              subSubcategories: [
                                {
                                  name: "German Cows",
                                  path: "/PetAnimalsComp?NestedSubCategory=German Cows",
                                },
                                {
                                  name: "Local Cows",
                                  path: "/PetAnimalsComp?NestedSubCategory=Local Cows",
                                },
                                {
                                  name: "Jersey Cows",
                                  path: "/PetAnimalsComp?NestedSubCategory=Jersey Cows",
                                },
                                {
                                  name: "Swiss Cows",
                                  path: "/PetAnimalsComp?NestedSubCategory=Swiss Cows",
                                },
                                {
                                  name: "Dutch Cows",
                                  path: "/PetAnimalsComp?NestedSubCategory=Dutch Cows",
                                },
                                {
                                  name: "Dairy Products",
                                  path: "/PetAnimalsComp?NestedSubCategory=Dairy Products",
                                },
                              ],
                            },
                            {
                              name: "Fish & Turtles",
                              path: "/PetAnimalsComp?subCatgory=Fish & Turtles",
                            },
                            {
                              name: "Rabbits",
                              path: "/PetAnimalsComp?subCatgory=Rabbits",
                            },
                            {
                              name: "Ducks",
                              path: "/PetAnimalsComp?subCatgory=Ducks",
                              subSubcategories: [
                                {
                                  name: "Bikini Ducks",
                                  path: "/PetAnimalsComp?NestedSubCategory=Bikini Ducks",
                                },
                                {
                                  name: "Sharshari Ducks",
                                  path: "/PetAnimalsComp?NestedSubCategory=Sharshari Ducks",
                                },
                                {
                                  name: "Geese",
                                  path: "/PetAnimalsComp?NestedSubCategory=Geese",
                                },
                                {
                                  name: "Fish",
                                  path: "/PetAnimalsComp?NestedSubCategory=Fish",
                                },
                                {
                                  name: "Bikini Ducks",
                                  path: "/PetAnimalsComp?NestedSubCategory=Bikini Ducks",
                                },
                              ],
                            },
                            {
                              name: "Squirrels",
                              path: "/PetAnimalsComp?subCatgory=Squirrels",
                              subSubcategories: [
                                {
                                  name: "Turtles",
                                  path: "/PetAnimalsComp?NestedSubCategory=Turtles",
                                },
                                {
                                  name: "Sharshari Ducks",
                                  path: "/PetAnimalsComp?NestedSubCategory=Sharshari Ducks",
                                },
                              ],
                            },
                            {
                              name: "Hamsters",
                              path: "/PetAnimalsComp?subCatgory=Hamsters",
                              subSubcategories: [
                                {
                                  name: "Geese",
                                  path: "/PetAnimalsComp?NestedSubCategory=Geese",
                                },
                              ],
                            },
                            {
                              name: "Fur",
                              path: "/PetAnimalsComp?subCatgory=Fur",
                            },
                          ],
                        },
                        {
                          name: "Other",
                          path: "/Education",
                          icon: <FaBook />,
                          subcategories: [
                            {
                              name: "Hunting & Trips",
                              path: "/Education?subCatgory=Hunting & Trips",
                            },
                            {
                              name: "Gardening & Agriculture",
                              path: "/Education?subCatgory=Gardening & Agriculture",
                            },
                            {
                              name: "Parties & Events",
                              path: "/Education?subCatgory=Parties & Events",
                            },
                            {
                              name: "Travel & Tourism",
                              path: "/Education?subCatgory=Travel & Tourism",
                            },
                            {
                              name: "Roommate",
                              path: "/Education?subCatgory=Roommate",
                            },
                            {
                              name: "Lost & Found",
                              path: "/Education?subCatgory=Lost & Found",
                            },
                            {
                              name: "Education & Training",
                              path: "/Education?subCatgory=Education & Training",
                            },
                            {
                              name: "Sports Training",
                              path: "/Education?subCatgory=Sports Training",
                            },
                            {
                              name: "Stock & Forex Education",
                              path: "/Education?subCatgory=Stock & Forex Education",
                            },
                            {
                              name: "Driving Lessons",
                              path: "/Education?subCatgory=Driving Lessons",
                            },
                            {
                              name: "Private Tutoring",
                              path: "/Education?subCatgory=Private Tutoring",
                            },
                            {
                              name: "Training Courses",
                              path: "/Education?subCatgory=Training Courses",
                            },
                            {
                              name: "Antiques & Collectibles",
                              path: "/Education?subCatgory=Antiques & Collectibles",
                            },
                            {
                              name: "Projects & Investments",
                              path: "/Education?subCatgory=Projects & Investments",
                            },
                            {
                              name: "Books & Arts",
                              path: "/Education?subCatgory=Books&Arts",
                            },
                            {
                              name: "Programming & Design",
                              path: "/Education?subCatgory=Programming & Design",
                            },
                            {
                              name: "Food & Beverages",
                              path: "/Education?subCatgory=Food & Beverages",
                            },
                          ],
                        },
                        {
                          name: "Commercial",
                          path: "/CommercialAdscom",
                          icon: <FaBullhorn />,
                          badge: "New",
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
                                {category.subcategories.map((sub, subIndex) => (
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
                                            )
                                          )}
                                        </div>
                                      )}
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      ))}
                    </nav>
                    <div className="sidebar-footer text-center py-3 mt-3 border-top">
                      KSA4Sale
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
                <Link
                  to="/"
                  className="navbar-brand logo"
                  style={{
                    marginLeft: window.innerWidth <= 576 ? "33px" : "-10px",
                    width: "auto", // Let the image width be handled by the img itself
                  }}
                >
                  <img
                    src={ImageURL}
                    alt="Logo"
                    className="img-fluid"
                    style={{ width: "80px", height: "auto" }} // 👈 adjust as needed
                  />
                </Link>
              </div>
              {!isMobile && (
                <form
                  className="d-flex search-container"
                  style={{
                    flexGrow: 1,
                    maxWidth: "700px", // Increased width
                    margin: "0 20px",
                    position: "relative",
                    display: "flex",
                  }}
                >
                  <input
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
                      borderRadius: "20px",
                      border: "1px solid #ccc",
                      width: "100%",
                      backgroundColor: "#f1f1f1",
                    }}
                  />

                  {results.length > 0 && (
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
                            setSearchText(item.title);
                            setSelectedItem(item);
                            useSearchStore.setState({ results: [] });

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
                            <div>
                              <div className="fw-bold text-dark mb-1">
                                {item.title}
                              </div>
                              <small className="text-muted">
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
                      right: "10px",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      border: "none",
                      padding: 0,
                    }}
                  >
                    <FaSearch style={{ color: "#0056b3" }} />
                  </button>
                </form>
              )}
              <ul
                className="nav header-navbar-rht d-flex align-items-center"
                style={{
                  gap: window.innerWidth <= 576 ? "0" : "15px",
                  marginBottom: 0,
                  flexShrink: 0,
                }}
              >
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
                    {/* {!isMobile && userId && ( */}
                    <li>
                      <Link
                        to="/listing"
                        style={{
                          backgroundColor: "#2d4495",
                          color: "#fff",
                          border: "none",
                          fontWeight: "bold",
                          borderRadius: 10,
                          transition: "none",
                          outline: "none",
                          boxShadow: "none",
                          cursor: "pointer",
                          padding:
                            window.innerWidth <= 576 ? "6px 15px" : "12px 24px",
                          fontSize: window.innerWidth <= 576 ? "12px" : "16px",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = "#2d4495";
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = "#2d4495";
                          e.currentTarget.style.color = "#fff";
                        }}
                      >
                        <i className="fa-solid fa-plus" /> Post Ad
                      </Link>
                    </li>
                    {/* // )} */}
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
                        <span>{divideName}</span>
                      </Link>
                      <div
                        className={`dropdown-menu dropdown-menu-end ${
                          drops ? "show" : ""
                        }`}
                      >
                        <Link className="dropdown-item" to="/dashboard">
                          Dashboard
                        </Link>
                        <Link className="dropdown-item" to="/profile">
                          Profile Settings
                        </Link>
                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </div>
                    </li>
                  </ul>
                ) : (
                  <>
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
                    <li>
                      <Link
                        to="/signup"
                        style={{
                          backgroundColor: "#2d4495",
                          color: "#fff",
                          border: "none",
                          fontWeight: "bold",
                          borderRadius: 10,
                          transition: "none",
                          outline: "none",
                          boxShadow: "none",
                          cursor: "pointer",
                          padding:
                            window.innerWidth <= 576 ? "6px 15px" : "12px 24px",
                          fontSize: window.innerWidth <= 576 ? "12px" : "16px",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = "#2d4495";
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = "#2d4495";
                          e.currentTarget.style.color = "#fff";
                        }}
                      >
                        <i className="fa-solid fa-plus" /> Sign Up
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        style={{
                          backgroundColor: "#2d4495",
                          color: "#fff",
                          border: "none",
                          fontWeight: "bold",
                          borderRadius: 10,
                          transition: "none",
                          outline: "none",
                          boxShadow: "none",
                          cursor: "pointer",
                          padding:
                            window.innerWidth <= 576 ? "6px 15px" : "12px 24px",
                          fontSize: window.innerWidth <= 576 ? "12px" : "16px",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = "#2d4495";
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = "#2d4495";
                          e.currentTarget.style.color = "#fff";
                        }}
                      >
                        <i className="fa-solid fa-plus" /> Sign In
                      </Link>
                    </li>
                    {!isMobile && userId && (
                      <li>
                        <Link
                          to="/listing"
                          style={{
                            backgroundColor: "#2d4495",
                            color: "#fff",
                            border: "none",
                            fontWeight: "bold",
                            borderRadius: 10,
                            transition: "none",
                            outline: "none",
                            boxShadow: "none",
                            cursor: "pointer",
                            padding: "12px 24px", // Increased padding for larger size
                            fontSize: "16px", // Increased font size
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = "#2d4495";
                            e.currentTarget.style.color = "#fff";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = "#2d4495";
                            e.currentTarget.style.color = "#fff";
                          }}
                        >
                          <i className="fa-solid fa-plus" /> Post Ad
                        </Link>
                      </li>
                    )}
                  </>
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
      {userId ? <HeaderLower /> : ""}
    </header>
  );
};

export default Header;
