import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getTranslatedField } from "../../utils/autoTranslate";
import Footer from "./../home/footer/Footer";
import Header from "../home/header";
import img from "./home-07.jpg";
import tick from "./tick.png";
import bullet from "./bullet.png";
import profile from "./profileimage.png";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { MdMessage } from "react-icons/md";
import Loading1 from "../../../public/Progress circle.png";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { FaMobile } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { useParams, useLocation } from "react-router";
import { useMyContext } from "../store/Contexxt.store";
import arrow from "./Vector.png";
import left from "./left.png";
import right from "./right.png";
import share from "./sahere.png";
import report from "./report.png";
import carimg from "./carimg.png";
import image1 from "../../assets/img/banner/bannerimage1.png";
import { Container, Row, Col, Card, ButtonGroup, Badge } from "react-bootstrap";
import { HiMiniSlash } from "react-icons/hi2";
import { Link } from "react-router-dom";
import image2 from "../../assets/img/banner/bannerimage2.png";
import image3 from "../../assets/img/banner/bannerimage3.png";
import image4 from "../../assets/img/banner/bannerimage4.png";
import ads from "./adsimg.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import {
  getDocs,
  collection,
  query,
  where,
  getDoc,
  doc,
  updateDoc,
  onSnapshot,
  or,
} from "firebase/firestore";
import { auth, db } from "../Firebase/FirebaseConfig";
import { formatDistanceToNow } from "date-fns";
import { onAuthStateChanged } from "firebase/auth";
import { Modal, Button, Form } from "react-bootstrap";
import { io } from "socket.io-client";
import axios from "axios";
import Swal from "sweetalert2";
import Chat from "../../components/admin/dyanmic_route/upperHeader/Chat";
let socket;
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../../components/userPages/AddLisiting/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { FaBuysellads } from "react-icons/fa";
import SuggestedAds from "../../components/home/SuggestedAds/SuggestedAds";

import RatingAndReviews from "../../components/admin/RatingSection/RatingSection";
import SwiperSlider from "../../components/admin/SwiperSlider/SwiperSlider";
import Relateddata from "../../components/admin/dyanmic_route/upperHeader/Relateddata";

const stripePromise = loadStripe(
  "pk_test_51Oqyo3Ap5li0mnBdxJiCZ4k0IEWVbOgGvyMbYB6XVUqYh1yNUEnRiX4e5UO1eces9kf9qZNZcF7ybjxg7MimKmUQ00a9s60Pa1"
);
const Dynamic_Routes = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const location = useLocation(); // Access the full location object

  // Helper function to translate field labels
  const translateFieldLabel = (fieldName) => {
    // Map field names to translation keys
    const fieldMap = {
      "Seller Type": t("detailsPage.sellerType"),
      "Duration": t("detailsPage.duration"),
      "Registered City": t("detailsPage.registeredCity"),
      "Assembly": t("detailsPage.assembly"),
      "Accuracy": t("detailsPage.accuracy"),
      "Battery Type": t("detailsPage.batteryType"),
      "Compatibility": t("detailsPage.compatibility"),
      "CuffSize": t("detailsPage.cuffSize"),
      "Display Type": t("detailsPage.displayType"),
      "Features": t("detailsPage.features"),
      "MeasurementRange": t("detailsPage.measurementRange"),
      "MeasurementUnits": t("detailsPage.measurementUnits"),
      "Wash Type": t("detailsPage.washType"),
      "Type": t("detailsPage.type"),
      "RAM": t("detailsPage.ram"),
      "bodyType": t("detailsPage.bodyType"),
      "Brand": t("detailsPage.brand"),
      "Operating System": t("detailsPage.operatingSystem"),
      "type": t("detailsPage.type"),
      "Screen Size": t("detailsPage.screenSize"),
      "Registeredin": t("detailsPage.registeredin"),
      "EngineCapacity": t("detailsPage.engineCapacity"),
      "BodyType": t("detailsPage.bodyType"),
      "ExteriorColor": t("detailsPage.exteriorColor"),
      "Condition": t("detailsPage.condition"),
      "Purpose": t("detailsPage.purpose"),
      "ClosureType": t("detailsPage.closureType"),
      "Material": t("detailsPage.material"),
      "CollarType": t("detailsPage.collarType"),
      "Season": t("detailsPage.season"),
      "StyleDesign": t("detailsPage.styleDesign"),
      "Fit": t("detailsPage.fit"),
      "City": t("detailsPage.city"),
      "District": t("detailsPage.district"),
      "Company": t("detailsPage.company"),
      "EmploymentType": t("detailsPage.employmentType"),
      "ExperienceLevel": t("detailsPage.experienceLevel"),
      "Industry": t("detailsPage.industry"),
      "SalaryRange": t("detailsPage.salaryRange"),
      "Sallary From": t("detailsPage.sallaryFrom"),
      "Sallary To": t("detailsPage.sallaryTo"),
      "Content Type": t("detailsPage.contentType"),
      "Language": t("detailsPage.language"),
      "SkillLevel": t("detailsPage.skillLevel"),
      "States": t("detailsPage.states"),
      "Subject Categories": t("detailsPage.subjectCategories"),
      "assembly": t("detailsPage.assembly"),
      "purpose": t("detailsPage.purpose"),
      "Accessibility": t("detailsPage.accessibility"),
      "Amenities": t("detailsPage.amenities"),
      "Building Type": t("detailsPage.buildingType"),
      "Property Features": t("detailsPage.propertyFeatures"),
      "Property Type": t("detailsPage.propertyType"),
      "Size": t("detailsPage.size"),
      "Checkin": t("detailsPage.checkin"),
      "RoomType": t("detailsPage.roomType"),
      "Availability": t("detailsPage.availability"),
      "ColorOptions": t("detailsPage.colorOptions"),
      "Age": t("detailsPage.age"),
      "Breed": t("detailsPage.breed"),
      "Color": t("detailsPage.color"),
      "Dietary Preferences": t("detailsPage.dietaryPreferences"),
      "Health Status": t("detailsPage.healthStatus"),
      "Temperament": t("detailsPage.temperament"),
      "Training Level": t("detailsPage.trainingLevel"),
      "Engine Capacity": t("detailsPage.engineCapacity"),
      "Make": t("detailsPage.make"),
      "Body Type": t("detailsPage.bodyType"),
      "ContentType": t("detailsPage.contentType"),
      "Last Updated": t("detailsPage.lastUpdated"),
      "Exterior Color": t("detailsPage.exteriorColor"),
      "Model": t("detailsPage.model"),
      "Price From": t("detailsPage.priceFrom"),
      "Price To": t("detailsPage.priceTo"),
      "Skill Level": t("detailsPage.skillLevel"),
      "Website": t("detailsPage.website"),
      "Phone": t("detailsPage.phone"),
      "Email": t("detailsPage.email"),
      "Address": t("detailsPage.address"),
      "Location": t("detailsPage.location"),
      "Manufacture Year": t("detailsPage.manufactureYear"),
      "Processor": t("detailsPage.processor"),
      "Display Quality": t("detailsPage.displayQuality"),
      "Storage Capacity": t("detailsPage.storageCapacity"),
      "Storage Type": t("detailsPage.storageType"),
      "Battery Life": t("detailsPage.batteryLife"),
      "Connectivity": t("detailsPage.connectivity"),
      "Graphics Card": t("detailsPage.graphicsCard"),
      "Special Features": t("detailsPage.specialFeatures"),
      "Picture Availability": t("detailsPage.pictureAvailability"),
      "Video Availability": t("detailsPage.videoAvailability"),
      "Featured Ads": t("detailsPage.featuredAds"),
      "Category": t("detailsPage.category"),
      "State": t("detailsPage.state"),
      "Created At": t("detailsPage.createdAt"),
      "Regional Spec": t("detailsPage.regionalSpec"),
      "Insurance": t("detailsPage.insurance"),
      "Interior Color": t("detailsPage.interiorColor"),
      "Transmission": t("detailsPage.transmission"),
      "transmission": t("detailsPage.transmission"),
      "SeatingCapacity": t("detailsPage.seatingCapacity"),
      "Seating Capacity": t("detailsPage.seatingCapacity"),
      "NumberOfDoors": t("detailsPage.numberOfDoors"),
      "Number of Doors": t("detailsPage.numberOfDoors"),
      "Mileage": t("detailsPage.mileage"),
      "mileage": t("detailsPage.mileage"),
      "PaymentMethod": t("detailsPage.paymentMethod"),
      "Payment Method": t("detailsPage.paymentMethod")
    };
    return fieldMap[fieldName] || fieldName;
  };

  // Helper function to translate field values (for dropdown/enum values)
  const translateFieldValue = (value) => {
    if (!value) return value;

    const valueStr = String(value).trim();
    const valueLower = valueStr.toLowerCase();

    // Condition values
    if (valueLower === "new") return t("filters.options.condition.new");
    if (valueLower === "used") return t("filters.options.condition.used");

    // Seller Type values
    if (valueLower === "dealers") return t("filters.options.sellerType.dealers");
    if (valueLower === "individuals") return t("filters.options.sellerType.individuals");

    // Purpose/Ad Type values
    if (valueLower === "sell") return t("filters.options.adType.sell");
    if (valueLower === "rent") return t("filters.options.adType.rent");
    if (valueLower === "wanted") return t("filters.options.adType.wanted");

    // Payment Method values
    if (valueLower === "cash") return t("filters.options.paymentMethod.cash");
    if (valueLower === "mortgage") return t("filters.options.paymentMethod.mortgage");
    if (valueLower.includes("installment") && valueLower.includes("without")) return t("filters.options.paymentMethod.installmentsWithoutBank");

    // Transmission values
    if (valueLower === "manual") return t("filters.options.transmission.manual");
    if (valueLower === "automatic") return t("filters.options.transmission.automatic");

    // Color values
    if (valueLower === "white") return t("filters.options.colors.white");
    if (valueLower === "black") return t("filters.options.colors.black");
    if (valueLower === "grey" || valueLower === "gray") return t("filters.options.colors.grey");
    if (valueLower === "red") return t("filters.options.colors.red");
    if (valueLower === "yellow") return t("filters.options.colors.yellow");
    if (valueLower === "blue") return t("filters.options.colors.blue");
    if (valueLower === "green") return t("filters.options.colors.green");
    if (valueLower === "silver") return t("filters.options.colors.silver");

    // Regional Spec values
    if (valueLower === "gcc") return t("filters.options.regionalSpec.gcc");
    if (valueLower === "european") return t("filters.options.regionalSpec.european");
    if (valueLower === "japanese") return t("filters.options.regionalSpec.japanese");
    if (valueLower === "american") return t("filters.options.regionalSpec.american");

    // Fuel Type values
    if (valueLower === "petrol") return t("filters.options.fuelType.petrol");
    if (valueLower === "diesel") return t("filters.options.fuelType.diesel");
    if (valueLower === "electric") return t("filters.options.fuelType.electric");
    if (valueLower === "hybrid") return t("filters.options.fuelType.hybrid");
    if (valueLower === "lpg") return t("filters.options.fuelType.lpg");
    if (valueLower === "cng") return t("filters.options.fuelType.cng");

    // Insurance values
    if (valueLower === "no insurance") return t("filters.options.insurance.noInsurance");
    if (valueLower === "thirdparty" || valueLower === "third party") return t("filters.options.insurance.thirdParty");
    if (valueLower === "comprehensive") return t("filters.options.insurance.comprehensive");

    // Body Type values
    if (valueLower === "coupe") return t("filters.options.bodyType.coupe");
    if (valueLower === "sedan") return t("filters.options.bodyType.sedan");
    if (valueLower === "suv") return t("filters.options.bodyType.suv");
    if (valueLower === "hatchback") return t("filters.options.bodyType.hatchback");
    if (valueLower === "convertible") return t("filters.options.bodyType.convertible");
    if (valueLower === "wagon") return t("filters.options.bodyType.wagon");
    if (valueLower.includes("pickup")) return t("filters.options.bodyType.pickupTruck");
    if (valueLower === "crossover") return t("filters.options.bodyType.crossover");
    if (valueLower === "minivan") return t("filters.options.bodyType.minivan");

    // Additional Features values
    if (valueLower.includes("fulloption") || valueLower.includes("full option")) return t("filters.options.additionalFeatures.fullOption");
    if (valueLower === "insured") return t("filters.options.additionalFeatures.insured");
    if (valueLower.includes("self") && valueLower.includes("park")) return t("filters.options.additionalFeatures.selfParking");
    if (valueLower.includes("alarm")) return t("filters.options.additionalFeatures.alarmSystem");
    if (valueLower === "dealership") return t("filters.options.additionalFeatures.dealership");
    if (valueLower.includes("quick") && valueLower.includes("sell")) return t("filters.options.additionalFeatures.quickSelling");
    if (valueLower === "navigation") return t("filters.options.additionalFeatures.navigation");
    if (valueLower === "inspected") return t("filters.options.additionalFeatures.inspected");
    if (valueLower.includes("parking") && valueLower.includes("sensor")) return t("filters.options.additionalFeatures.parkingSensors");
    if (valueLower === "bluetooth") return t("filters.options.additionalFeatures.bluetooth");
    if (valueLower.includes("sunroof") || valueLower.includes("moonroof")) return t("filters.options.additionalFeatures.sunroofMoonroof");
    if (valueLower.includes("leather") && valueLower.includes("seat")) return t("filters.options.additionalFeatures.leatherSeats");
    if (valueLower.includes("backup") && valueLower.includes("camera")) return t("filters.options.additionalFeatures.backupCamera");
    if (valueLower.includes("heated") && valueLower.includes("seat")) return t("filters.options.additionalFeatures.heatedSeats");
    if (valueLower.includes("keyless")) return t("filters.options.additionalFeatures.keylessEntry");
    if (valueLower.includes("remote") && valueLower.includes("start")) return t("filters.options.additionalFeatures.remoteStart");
    if (valueLower.includes("touchscreen")) return t("filters.options.additionalFeatures.touchscreenDisplay");
    if (valueLower.includes("carplay") || valueLower.includes("android auto")) return t("filters.options.additionalFeatures.appleCarplayAndroidAuto");
    if (valueLower.includes("led") && valueLower.includes("headlight")) return t("filters.options.additionalFeatures.ledHeadlights");
    if (valueLower.includes("all") && valueLower.includes("wheel")) return t("filters.options.additionalFeatures.allWheelDrive");

    // Return original value if no translation found
    return value;
  };

  // Helper function to translate category names
  const translateCategory = (category) => {
    if (!category) return "";
    const categoryMap = {
      "Motors": t("categories.motors"),
      "Automotive": t("categories.motors"),
      "automotive": t("categories.motors"),
      "AutomotiveComp": t("categories.motors"),
      "Electronics": t("categories.electronics"),
      "ElectronicComp": t("categories.electronics"),
      "Electronic": t("categories.electronics"),
      "Fashion Style": t("categories.fashionStyle"),
      "FashionStyle": t("categories.fashionStyle"),
      "Home & Furniture": t("categories.homeFurniture"),
      "Job Board": t("categories.jobBoard"),
      "JobBoard": t("categories.jobBoard"),
      "Real Estate": t("categories.realEstate"),
      "RealEstate": t("categories.realEstate"),
      "RealEstateComp": t("categories.realEstate"),
      "Services": t("categories.services"),
      "TravelComp": t("categories.services"),
      "Sport & Game": t("categories.sportGame"),
      "SportGamesComp": t("categories.sportGame"),
      "GamesSport": t("categories.sportGame"),
      "Pet & Animals": t("categories.petAnimals"),
      "PetAnimalsComp": t("categories.petAnimals"),
      "Other": t("categories.other"),
      "Education": t("categories.other"),
      "HealthCare": t("categories.other"),
      "HealthCareComp": t("categories.other"),
      "Commercial": t("categories.commercial"),
      "ComercialsAds": t("categories.commercial")
    };
    return categoryMap[category] || category;
  };

  // Helper function to translate subcategory names
  const translateSubcategory = (name) => {
    if (!name) return "";
    const subcategoryTranslations = {
      // Motors subcategories
      "Cars For Sale": t("subcategories.motors.carsForSale"),
      "Car Rental": t("subcategories.motors.carRental"),
      "Plates Number": t("subcategories.motors.platesNumber"),
      "Spare Parts": t("subcategories.motors.spareParts"),
      "Accessories": t("subcategories.motors.accessories"),
      "Wheels & Rims": t("subcategories.motors.wheelsAndRims"),
      "Trucks & Heavy Machinery": t("subcategories.motors.trucksAndHeavyMachinery"),
      "Tshaleeh": t("subcategories.motors.tshaleeh"),
      "Boats & Jet Ski": t("subcategories.motors.boatsAndJetski"),
      "Classic Cars": t("subcategories.motors.classicCars"),
      // Add more as needed
    };
    return subcategoryTranslations[name] || name;
  };

  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };
  const [_Id, setId] = useState(null); // State to store ads data
  const [callingFrom, setCallingFrom] = useState(null); // State to store ads data
  const link = getQueryParam("link") || window.location.href;

  useEffect(() => {
    const callingFrom = getQueryParam("callingFrom");
    const ids = getQueryParam("id");

    console.log("callingFrom______ID:ids", ids);
    console.log("callingFrom______Calling From:", callingFrom);
    setCallingFrom(callingFrom);
    setId(ids);
  }, [id, location]);
  const [showPhone, setShowPhone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] = useState(
    "d38e0cee-daa7-46e2-bfd1-d7f9c4683546"
  );
  const [receiverId, setReceiverId] = useState("3");
  const [chatId, setChatId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [itemData, setItemData] = useState(null); // State to store ads data
  const [loading, setLoading] = useState(true); // Loading state
  const [userId, setUserId] = useState(null);
  const [showModal1, setShowModal1] = useState(false);
  const [FeaturedAds, setFeaturedAds] = useState(false);
  const [showReport, setshowReport] = useState(false);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleFavourite = async (e, id, category) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("🔍 handleFavourite called with:", { id, category });

    try {
      // 🔁 Map category to actual Firestore collection name
      const collectionMap = {
        Motors: "Cars",
        motors: "Cars",
        Automotive: "Cars",
        automotive: "Cars",
        Electronics: "ELECTRONICS",
        electronics: "ELECTRONICS",
        Services: "TRAVEL",
        services: "TRAVEL",
        Other: "Education",
        other: "Education",
        Education: "Education",
        education: "Education",
        "Pet & Animals": "PETANIMALCOMP",
        "pet & animals": "PETANIMALCOMP",
        "Sports & Game": "SPORTSGAMESComp",
        "sports & game": "SPORTSGAMESComp",
        "Fashion Style": "FASHION",
        "fashion style": "FASHION",
        "Job Board": "JOBBOARD",
        "job board": "JOBBOARD",
        "Real Estate": "REALESTATECOMP",
        "real estate": "REALESTATECOMP",
        RealEstate: "REALESTATECOMP",
        realestate: "REALESTATECOMP",
        RealEstateComp: "REALESTATECOMP",
        HealthCare: "HEALTHCARE",
        healthcare: "HEALTHCARE",
        HealthCareComp: "HEALTHCARE",
        TravelComp: "TRAVEL",
        travelcomp: "TRAVEL",
        SportGamesComp: "SPORTSGAMESComp",
        sportgamescomp: "SPORTSGAMESComp",
        GamesSport: "SPORTSGAMESComp",
        gamessport: "SPORTSGAMESComp",
        PetAnimalsComp: "PETANIMALCOMP",
        petanimalscomp: "PETANIMALCOMP",
        ElectronicComp: "ELECTRONICS",
        electroniccomp: "ELECTRONICS",
        Electronic: "ELECTRONICS",
        electronic: "ELECTRONICS",
        AutomotiveComp: "Cars",
        automotivecomp: "Cars",
        FashionStyle: "FASHION",
        fashionstyle: "FASHION",
        JobBoard: "JOBBOARD",
        jobboard: "JOBBOARD",
        ComercialsAds: "ComercialsAds",
        comercialsads: "ComercialsAds",
      };

      const firestoreCollection = collectionMap[category] || category;

      // 🔍 Get current document
      const docRef = doc(db, firestoreCollection, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.warn(
          `Document with ID ${id} not found in ${firestoreCollection}`
        );
        return;
      }

      const currentData = docSnap.data();
      const currentBookmarkStatus = currentData.bookmarked || false;

      // ✅ Toggle the bookmark field
      await updateDoc(docRef, {
        bookmarked: !currentBookmarkStatus,
      });

      // Update itemData state directly without triggering full re-fetch
      setItemData(prev => ({
        ...prev,
        bookmarked: !currentBookmarkStatus
      }));

      console.log(
        `✅ Bookmark toggled for ${id} in ${firestoreCollection} — Now: ${!currentBookmarkStatus}`
      );
    } catch (error) {
      console.error("❌ Error toggling bookmark:", error);
    }
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFullScreen) return;
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "Escape") handleCloseFullScreen();
    };

    // Disable body scrolling when full-screen is active
    if (isFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto"; // Re-enable scrolling on cleanup
    };
  }, [isFullScreen, selectedImage]);

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
  };
  const handleFullScreen = (image) => {
    setSelectedImage(image);
    setIsFullScreen(true);
  };

  const handleCheckboxChangePromote = () => {
    setFeaturedAds((prev) => {
      const newState = !prev;
      if (newState) {
        console.log("True");
        console.log("Featured Ads");
      } else {
        console.log("Not Featured Ads");
      }
      return newState;
    });
  };

  const handleShowReport = () => {
    setshowReport(true);
  };

  const copyToClipboard = async () => {
    try {
      // Try modern clipboard API first (works on HTTPS and localhost)
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(link);
        Swal.fire({
          icon: "success",
          title: "Copied!",
          text: "Link copied to clipboard!",
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
      } else {
        // Fallback for browsers without clipboard support
        copyLinkFallback(link);
      }
    } catch (err) {
      console.error("Clipboard API failed:", err);
      // If clipboard API fails, use fallback
      copyLinkFallback(link);
    }
  };

  // Fallback method for copying to clipboard
  const copyLinkFallback = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        Swal.fire({
          icon: "success",
          title: "Copied!",
          text: "Link copied to clipboard!",
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Failed to copy the link. Please try again.",
          timer: 3000,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
      }
    } catch (err) {
      console.error("Fallback copy failed:", err);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Failed to copy the link. Please try again.",
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    }

    document.body.removeChild(textArea);
  };
  const collectionName1 =
    callingFrom === "AutomotiveComp"
      ? "Cars"
      : callingFrom === "ElectronicComp"
      ? "ELECTRONICS"
      : callingFrom === "FashionStyle"
      ? "FASHION"
      : callingFrom === "HealthCareComp"
      ? "HEALTHCARE"
      : callingFrom === "JobBoard"
      ? "JOBBOARD"
      : callingFrom === "Education"
      ? "Education"
      : callingFrom === "RealEstateComp"
      ? "REALESTATECOMP"
      : callingFrom === "TravelComp"
      ? "TRAVEL"
      : callingFrom === "SportGamesComp"
      ? "SPORTSGAMESComp"
      : callingFrom === "PetAnimalsComp"
      ? "PETANIMALCOMP"
      : "books";
  console.log(itemData, "111111111111111111111111111");
  const handleCall = async (phoneNumber) => {
    try {
      const response = await axios.post("http://localhost:9002/api/call", {
        to: phoneNumber,
      });
      console.log("Call Initiated:", response.data);
    } catch (error) {
      console.error("Error making the call:", error);
    }
  };
  console.log("Fetched messages:receivedMessages", receivedMessages);

  const handleSend = async () => {
    const user = auth.currentUser;
    const userId = user?.uid;

    if (message.trim() && userId && itemData.userId) {
      try {
        const response = await fetch("http://168.231.80.24:9002/api/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: message,
            sender: userId,
            receiver: itemData.userId,
            from: "client",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        const data = await response.json();
        console.log("Message sent:", data);
        setRefresh(!refresh);
        setMessage("");
        // setShowModal(false); // Close modal
      } catch (error) {
        console.error("Error sending message:", error);
        alert("Failed to send message. Please try again.");
      }
    } else {
      alert("Message content and sender/receiver IDs are required.");
    }
  };
  const user = auth.currentUser;
  //  const userId = user?.uid;
  const recieverId = itemData?.userId;

  const [chatIds, setChatIds] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const fetchChatIds = async () => {
      try {
        const messagesRef = collection(db, "messages");

        // Query to get messages where sender-receiver pair exists in either order
        const q = query(
          messagesRef,
          or(
            where("sender", "==", userId),
            where("receiver", "==", userId),
            where("sender", "==", recieverId),
            where("receiver", "==", recieverId)
          )
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const chatIdsArray = querySnapshot.docs.map(
            (doc) => doc.data().chat_id
          );
          console.log("No chats foundchatIdsArray__________", chatIdsArray);

          setChatIds(chatIdsArray);
        } else {
          console.log("No chats found1");
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    if (userId && recieverId) {
      fetchChatIds();
    }
  }, [userId, recieverId]);

  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     const user = auth.currentUser;
  //     const userId = user?.uid;
  //     if (!userId) {
  //       console.warn("User ID is missing, skipping API call");
  //       return;
  //     }

  //     try {
  //       const { data } = await axios.get(
  //         `http://168.231.80.24:9002/api/messages/${userId}`
  //       );
  //       setReceivedMessages(data?.data || []);
  //       console.log("Fetched messages:", data?.data);
  //     } catch (error) {
  //       console.error("Error fetching messages:", error);
  //     }
  //   };

  //   fetchMessages();
  // }, [refresh, userId]);
  useEffect(() => {
    const fetchChatIdAndMessages = async () => {
      if (!userId || !itemData?.userId) {
        return; // Don't fetch if userId or itemData.userId is not available
      }
      try {
        const { data: chatData } = await axios.get(
          `http://168.231.80.24:9002/api/chat-id/${userId}/${itemData.userId}`
        );

        if (!chatData.success) {
          console.log("No chat found");
          return;
        }

        const chatId = chatData.chatId;

        // Now fetch messages using chatId
        const { data: messagesData } = await axios.get(
          `http://168.231.80.24:9002/api/messages/${chatId}`
        );

        setReceivedMessages(messagesData?.data || []);
        console.log("Fetched messages:", messagesData);
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };

    fetchChatIdAndMessages();
  }, [refresh, itemData?.userId, userId]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          "http://168.231.80.24:9002/route/api/users"
        );
        setUsers(data);
      } catch (error) {
        // Only log once to avoid console flooding
        if (error.response?.status === 404) {
          console.warn("Users API endpoint not available (404)");
        } else {
          console.error("Error fetching users:", error);
        }
      }
    };

    // Connect socket with reconnection limits to prevent 404 flooding
    socket = io("http://168.231.80.24:9002", {
      reconnectionAttempts: 3,
      reconnectionDelay: 5000,
      timeout: 10000,
    });

    socket.on("connect_error", (error) => {
      console.warn("Socket connection failed:", error.message);
    });

    socket.on("message", (msg) => {
      setReceivedMessages((prevMessages) => [
        ...prevMessages,
        { senderId: msg.sender, content: msg.content },
      ]);
    });

    fetchUsers();

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);
  const [adsDetailImagesContent, setAdsdetailImagesContent] = useState([]);
  console.log(adsDetailImagesContent, "adsDetailImagesContent_____________");
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "AdsdetailImages"), // Fetch data from the "AdsdetailImages" table/collection
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched AdsdetailImages data:", data);
        setAdsdetailImagesContent(data); // Assuming you have a state setter for AdsdetailImages
      },
      (error) => {
        console.error("Error fetching AdsdetailImages data:", error);
      }
    );
    return () => unsubscribe();
  }, []);
  const fetchChats = async (userId) => {
    try {
      const { data } = await axios.get(
        `http://168.231.80.24:9002/route/api/chats/${userId}`
      );
      setChats(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const { data } = await axios.get(
        `http://168.231.80.24:9002/route/api/messages/${chatId}`
      );
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Go to previous page
    } else {
      // Optionally redirect to Home or disable button
      console.log("Already on the first page!");
      // window.location.href = "/home"; // Uncomment if Home redirect is desired
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1); // Go to next page
  };
  // const handleSend = () => {
  //   console.log("Message:", message);
  //   setMessage(""); // Clear input after sending
  //   setShowModal(false); // Close modal
  // };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A"; // Handle undefined or null timestamps
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // Format it into a readable string
  };
  const [userData, setUserData] = useState([]);
  const [show, setShow] = useState(false);
  const [reportText, setReportText] = useState("");
  const [selectedReports, setSelectedReports] = useState([]);

  // Sticky header state for mobile
  const [showStickyHeader, setShowStickyHeader] = useState(false); // Hidden initially, shows on scroll
  const [heroSectionPassed, setHeroSectionPassed] = useState(false);

  const reportTypes = [
    t("listing.reportTypes.sexual"),
    t("listing.reportTypes.illegal"),
    t("listing.reportTypes.abusive"),
    t("listing.reportTypes.harassment"),
    t("listing.reportTypes.fraud"),
    t("listing.reportTypes.spam"),
  ];
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleImageSelect = (image) => setSelectedImage(image);
  const [showAllThumbnails, setShowAllThumbnails] = useState(false); // State to toggle thumbnails

  const handleNextImage = () => {
    const images = itemData?.galleryImages?.length
      ? itemData.galleryImages
      : [img];
    const currentIndex = images.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };
  const handlePrevImage = () => {
    const images = itemData?.galleryImages?.length
      ? itemData.galleryImages
      : [img];
    const currentIndex = images.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };
  const handleCheckboxChange = (type) => {
    setSelectedReports((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };
  console.log(itemData?.category, "itemData.category______");
  const handleSubmit = async () => {
    console.log("Report Submitted:", { reportText, selectedReports });

    const collectionName =
      itemData.category === "AutomotiveComp"
        ? "Cars"
        : itemData.category === "Electronics"
        ? "ELECTRONICS"
        : itemData.category === "FashionStyle"
        ? "FASHION"
        : itemData.category === "Health Care"
        ? "HEALTHCARE"
        : itemData.category === "JobBoard"
        ? "JOBBOARD"
        : itemData.category === "Education"
        ? "Education"
        : itemData.category === "Real Estate"
        ? "REALESTATECOMP"
        : itemData.category === "TravelComp"
        ? "TRAVEL"
        : itemData.category === "Sports & Game"
        ? "SPORTSGAMESComp"
        : itemData.category === "PetAnimalsComp"
        ? "PETANIMALCOMP"
        : "books";
    console.log(collectionName, "collectionName________________-");
    try {
      const adsCollection = collection(db, collectionName);

      if (!itemData.id) {
        console.error("Error: itemData.id is missing.");
        return;
      }

      const docRef = doc(adsCollection, itemData.id); // Ensure itemData.id is a valid string

      // Fetch existing document
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const existingData = docSnapshot.data();

        // Ensure existingData.reportTypes is an array
        const currentReports = Array.isArray(existingData.reportTypes)
          ? existingData.reportTypes
          : [];

        // Ensure selectedReports is an array
        const newReports = Array.isArray(selectedReports)
          ? selectedReports
          : [];

        // Merge arrays while avoiding duplicates
        const updatedReportTypes = [
          ...new Set([...currentReports, ...newReports]),
        ];

        // Update only the reportTypes field
        await updateDoc(docRef, {
          reportTypes: updatedReportTypes,
          reportText: reportText || "",
        });

        console.log("Document updated successfully:", updatedReportTypes);
      } else {
        console.log("Document does not exist.");
      }

      handleClose();
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        console.log("User ID Token:", token);
        console.log("User UID:", user.uid);
        setUserId(user.uid);

        // Fetch user-specific data from Firestore
        try {
          const userQuery = query(
            collection(db, "users"), // Replace 'users' with your collection name
            where("userId", "==", "N2mN6BG5Q2gtxqLSWfNgAzl48Ik1") // Query based on the userId field
          );
          const querySnapshot = await getDocs(userQuery);

          // Assuming the data is stored in the collection and each document has a `timestamp` or `createdAt` field
          const fetchedData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt
              ? formatDistanceToNow(doc.data().createdAt.toDate())
              : "N/A", // Format the timestamp if exists
          }));
          console.log(fetchedData, "userDataitem Data_________fetchedData");
          setUserData(fetchedData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No user is logged in. Redirecting to /login...");
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Sticky header scroll handling for mobile
  // Sticky header scroll handling for mobile
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      console.log("Scroll position:", currentScrollY, "showStickyHeader:", currentScrollY > 300);

      // Show sticky header when scrolled past 100px
      if (currentScrollY > 300) {
        setShowStickyHeader(true);
      } else {
        setShowStickyHeader(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array - only run once on mount

  console.log(userData, "userDataitem Data__________-");
  // const NewId = callingFrom === "automotive" || "RealEstate" ? _Id : id;
  const NewId =
    callingFrom === "automotive"
      ? _Id
      : callingFrom === "RealEstate"
      ? _Id
      : callingFrom === "Electronic"
      ? _Id
      : callingFrom === "HealthCare"
      ? _Id
      : callingFrom === "GamesSport"
      ? _Id
      : callingFrom === "ComercialsAds"
      ? _Id
      : callingFrom === "Education"
      ? _Id
      : id;

  // useEffect(() => {
  //   const fetchItem = async () => {
  //     setLoading(true); // Start loading
  //     try {
  //       const collectionName =
  //         callingFrom === "automotive"
  //           ? "Cars"
  //           : callingFrom === "RealEstate"
  //           ? "REALESTATECOMP"
  //           : callingFrom === "Electronic"
  //           ? "ELECTRONICS"
  //           : callingFrom === "HealthCare"
  //           ? "HEALTHCARE"
  //           : callingFrom === "GamesSport"
  //           ? "SPORTSGAMESComp"
  //           : callingFrom === "ComercialsAds"
  //           ? "ComercialsAds"
  //           : callingFrom === "Education"
  //           ? "Education"
  //           : "books";
  //       // Determine collection based on `callingFrom`
  //       // const collectionName = callingFrom === "automotive" ? "carData" : "books";
  //       const adsCollection = collection(db, collectionName); // Reference to dynamic collection
  //       const adsSnapshot = await getDocs(adsCollection); // Fetch all documents
  //       const adsList = adsSnapshot.docs.map((doc) => ({
  //         id: doc.id, // Include document ID
  //         ...doc.data(), // Spread document data
  //       }));

  //       console.log(adsList, "item Data__________adsList");

  //       // Find the ad that matches the `id` from the URL
  //       const selectedAd = adsList.find((ad) => ad.id === _Id);
  //       if (selectedAd) {
  //         setItemData({
  //           ...selectedAd,
  //           timeAgo: selectedAd.createdAt
  //             ? formatDistanceToNow(selectedAd.createdAt.toDate(), {
  //                 addSuffix: true,
  //               })
  //             : "Unknown time",
  //         });
  //       } else {
  //         setItemData(null);
  //       }

  //       setLoading(false); // Stop loading
  //     } catch (error) {
  //       console.error("Error fetching item:", error);
  //       setError("Failed to fetch data");
  //       setLoading(false); // Stop loading on error
  //     }
  //   };

  //   fetchItem(); // Call the fetch function
  // }, [id, callingFrom, db, refresh, _Id,location]); // Re-run if `id` changes
  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        // Fetch directly from Firestore to get all fields including translations
        const docRef = doc(db, callingFrom, _Id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("🔍 Details page - Fetched data from Firestore:", {
            title: data.title,
            title_en: data.title_en,
            title_ar: data.title_ar,
            description: data.description,
            description_en: data.description_en,
            description_ar: data.description_ar,
          });
          setItemData({
            id: docSnap.id,
            ...data,
            timeAgo: data.createdAt
              ? formatDistanceToNow(data.createdAt.toDate(), {
                  addSuffix: true,
                })
              : "Unknown time",
          });
        } else {
          setItemData(null);
          console.log("No document found!");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching item:", error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    if (_Id && callingFrom) fetchItem();
  }, [_Id, callingFrom, refresh, db]);

  if (loading) {
    return (
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
    ); // Display loading state
  }

  if (!itemData) {
    return <p>No item found for the given ID.</p>; // Handle case where no item matches the `id`
  }

  const postedTime = itemData.createdAt?.toDate
    ? itemData.createdAt.toDate()
    : null;
  const timeAgo = postedTime
    ? formatDistanceToNow(postedTime, { addSuffix: true })
    : "Unknown time";

  const images = itemData?.galleryImages || [];
  const featuresData = [
    ["Ads", "Normal Condition", "Immobilizer Key", "Power Mirrors"],
    ["Ads", "Normal Condition", "Immobilizer Key", "Power Mirrors"],
    ["Ads", "Normal Condition", "Immobilizer Key", "Power Mirrors"],
  ];
  const visibleImages = showAllThumbnails ? images : images.slice(0, 5); // Show 5 or all
  return (
    <>
      <div className="main-wrapper">
        <Header />

        {/* Mobile Sticky Header - Shows title and price when scrolled */}
        {console.log("showStickyHeader state:", showStickyHeader, "itemData:", itemData?.title)}
        {showStickyHeader && (
          <div className="mobile-sticky-price-header">
            <div className="sticky-header-top">
              <h6 className="sticky-title">{itemData?.title || "Test Title"}</h6>
              <div className="sticky-price">
                <img
                  src="https://www.sama.gov.sa/ar-sa/Currency/Documents/Saudi_Riyal_Symbol-2.svg"
                  alt="SAR"
                />
                {itemData?.Price || itemData?.price || "999"}
              </div>
            </div>
            <div className="sticky-header-actions">
              <a
                href={`tel:${itemData?.Phone}`}
                className="sticky-action-btn"
                style={{ pointerEvents: itemData?.showNumberChecked ? 'none' : 'auto', opacity: itemData?.showNumberChecked ? 0.5 : 1 }}
              >
                <FaPhoneAlt />
              </a>
              <a
                href={`https://wa.me/${itemData?.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="sticky-action-btn"
              >
                <FaWhatsapp />
              </a>
              <button
                className="sticky-action-btn"
                onClick={() => setShowModal(true)}
              >
                <MdMessage />
              </button>
            </div>
          </div>
        )}

        <Container
          className="parent-main"
          style={{
            color: "black", // Text color
            marginTop: window.innerWidth <= 576 ? "7rem" : "11rem",
          }}
        >
          <div
            className="adsCategory_head"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "40px",
              alignItems: "center",
            }}
          >
            <button
              className="btn"
              style={{
                background: window.innerWidth <= 576 ? "none" : "#E9EEFF",
                // background: "#E9EEFF",
                fontWeight: "500",
                pointerEvents: "none",
                padding: window.innerWidth <= 576 ? "0px" : "10px 15px",
              }}
            >
              {t("nav.home")}
            </button>
            <span>
              <MdKeyboardArrowRight />
            </span>
            <button
              className="btn"
              style={{
                background: window.innerWidth <= 576 ? "none" : "#E9EEFF",
                fontWeight: "500",
                pointerEvents: "none",
                padding: window.innerWidth <= 576 ? "0px" : "10px 15px",
              }}
            >
              {translateCategory(callingFrom)}{" "}
            </button>
          </div>
          <hr
            style={{
              color: "#000000",
              marginTop: "14.83px",
              marginBottom: "14.3px",
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <div>
            <div
              style={{
                marginTop: window.innerWidth <= 576 ? "10px" : "20px",
                marginBottom: window.innerWidth <= 576 ? "10px" : "20px",
                fontSize: window.innerWidth <= 768 ? "24px" : "40px",
                fontWeight: "bold",
              }}
            >
              {translateSubcategory(itemData?.SubCategory) || itemData?.SubCategory || "Default Title"}{" "}
            </div>
          </div>
          <div
            className="CategoryInfodiv_btn2container"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: window.innerWidth <= 576 ? "10px" : "0px",
              marginTop: window.innerWidth <= 576 ? "10px" : "0px",
            }}
          >
            <button
              type="button"
              className="head2btn"
              style={{
                backgroundColor: "white",
                border: "1px solid #2D4495",
                padding: window.innerWidth <= 576 ? "5px" : "10px 15px",
                textAlign: "center",
                width: window.innerWidth <= 576 ? "47%" : "auto",
              }}
              onClick={(e) => handleFavourite(e, itemData?.id, callingFrom)}
            >
              <span style={{ color: itemData?.bookmarked ? "red" : "gray" }}>
                {itemData?.bookmarked ? <FaHeart /> : <FaRegHeart />}
              </span>{" "}
              {t("listing.favourite")}
            </button>
            {/* <button
              className="head2btn"
              style={{
                backgroundColor: "white",
                border: "1px solid #2D4495",
                padding: window.innerWidth <= 576 ? "5px" : "10px 15px",
                textAlign: "center",
                width: window.innerWidth <= 576 ? "47%" : "auto",
              }}
            >
              <Link to="/bookmarks">
                <span>
                   <FaRegHeart />
                </span>{" "}
                Favourite
              </Link>
            </button> */}
            <>
              {/* Button to open modal */}
              <button
                className="head2btn"
                onClick={() => setShowModal1(true)}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #2D4495",
                  padding: window.innerWidth <= 576 ? "5px" : "10px 15px",
                  textAlign: "center",
                  width: window.innerWidth <= 576 ? "47%" : "auto",
                }}
              >
                <span>
                  <img src={share} alt="share" />
                </span>
                {t("listing.share")}
              </button>

              {/* Modal */}
              {showModal1 && (
                <>
                  <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100vw",
                      height: "100vh",
                      backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
                      zIndex: 1050,
                    }}
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">{t("listing.share")}</h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShowModal1(false)}
                          ></button>
                        </div>
                        <div className="modal-body">
                          <div style={{ wordBreak: "break-all" }}>{link}</div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="blue_btn"
                            onClick={copyToClipboard}
                          >
                            {t("listing.copy")}
                          </button>
                          <button
                            type="button"
                            className="blue_btn"
                            onClick={() => setShowModal1(false)}
                          >
                            {t("listing.close")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
            {itemData.userId === userId ? (
              <button
                className="head2btn"
                onClick={handleShowReport}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #2D4495",
                  padding: window.innerWidth <= 576 ? "5px" : "10px 15px",
                  textAlign: "center",
                  width: window.innerWidth <= 576 ? "47%" : "auto",
                }}
              >
                <span>
                  {/* <img src="your-report-image-source" alt="promote" /> */}
                  <FaBuysellads />
                </span>
                {t("listing.promote")}
              </button>
            ) : (
              ""
            )}
            {/* <button className="head2btn mt-4" onClick={handleShowReport}>
                  <span>
                     <FaBuysellads />
                  </span>
                  Promote
                </button> */}

            {/* Modal */}
            {showReport && (
              <div
                className="modal fade show d-block"
                tabIndex="-1"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
                  zIndex: 1050,
                }}
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">{t("listing.promote")}</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setshowReport(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      {/* <label>
                            <input
                              type="checkbox"
                              checked={FeaturedAds}
                              onChange={handleCheckboxChangePromote}
                            />
                            Featured Ads
                          </label> */}
                      <Elements stripe={stripePromise}>
                        <PaymentForm
                          _Id={_Id}
                          collectionName1={collectionName1}
                          getpaymentSuccess={setFeaturedAds}
                        />
                      </Elements>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setshowReport(false)}
                      >
                        {t("listing.close")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <button
              className="head2btn"
              style={{
                backgroundColor: "white",
                border: "1px solid #2D4495",
                padding: window.innerWidth <= 576 ? "5px" : "10px 15px",
                textAlign: "center",
                width: window.innerWidth <= 576 ? "47%" : "auto",
              }}
              onClick={handleShow}
            >
              <span>
                <img src={report} alt="report" />
              </span>
              {t("listing.report")}
            </button>

            <Modal
              style={{ marginTop: window.innerWidth <= 576 ? 60 : 20 }}
              show={show}
              onHide={handleClose}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>{t("listing.submitReport")}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="reportText">
                    <Form.Label>{t("listing.reportDetails")}</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder={t("listing.describeIssue")}
                      value={reportText}
                      onChange={(e) => setReportText(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label>{t("listing.reportType")}</Form.Label>
                    {reportTypes.map((type, index) => (
                      <Form.Check
                        key={index}
                        type="checkbox"
                        label={type}
                        checked={selectedReports.includes(type)}
                        onChange={() => handleCheckboxChange(type)}
                      />
                    ))}
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  style={{
                    backgroundColor: "#2d4495",
                    color: "#fff",
                    border: "none",
                    fontWeight: "bold",
                    borderRadius: 10,
                    transition: "none", // Disable transitions
                    outline: "none", // Remove focus outline
                    boxShadow: "none", // Remove any shadow changes
                    cursor: "pointer", // Maintain clickable appearance
                  }}
                  onClick={handleClose}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#2d4495"; // Force same background
                    e.currentTarget.style.color = "#fff"; // Force same text color
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#2d4495"; // Restore same background
                    e.currentTarget.style.color = "#fff"; // Restore same text color
                  }}
                >
                  {t("listing.close")}
                </Button>
                <Button
                  style={{
                    backgroundColor: "#2d4495",
                    color: "#fff",
                    border: "none",
                    fontWeight: "bold",
                    borderRadius: 10,
                    transition: "none", // Disable transitions
                    outline: "none", // Remove focus outline
                    boxShadow: "none", // Remove any shadow changes
                    cursor: "pointer", // Maintain clickable appearance
                  }}
                  onClick={handleSubmit}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#2d4495"; // Force same background
                    e.currentTarget.style.color = "#fff"; // Force same text color
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#2d4495"; // Restore same background
                    e.currentTarget.style.color = "#fff"; // Restore same text color
                  }}
                  // disabled={!reportText || selectedReports.length === 0}
                  // disabled={selectedReports.length === 0}
                >
                  {t("listing.submitReport")}
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Container>
        <Container
          style={{
            marginBottom: window.innerWidth <= 576 ? "2rem" : "3rem",
          }}
        >
          <div className="d-flex flex-wrap justify-content-end">
            <p
              style={{
                color: "black",
                fontWeight: "400",
                marginBottom: "10px",
              }}
            >
              {t("detailsPage.posted")} {itemData?.timeAgo || "Loading..."}
            </p>
          </div>
          <Row>
            {/* Sidebar */}
            <Col xl={8}>
              <div>
                <div
                  style={{
                    position: "relative",
                    textAlign: "center",
                  }}
                ></div>

                {isFullScreen && (
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100vw",
                      height: "100vh",
                      background: "rgba(0, 0, 0, 0.9)",
                      zIndex: 9999,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      margin: 0,
                      padding: 0,
                      overflow: "hidden",
                    }}
                  >
                    {/* Header Section with Title, Price, and Buttons */}
                    <div
                      style={{
                        position: "absolute",
                        top: "20px",
                        width: "100%",
                        padding: "0 20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        zIndex: 10000,
                      }}
                    >
                      {/* Left Side: Title, Price, and Images Link */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft:
                            window.innerWidth <= 576 ? "0px" : "270px",
                          alignItems: "flex-start",
                        }}
                      >
                        <h2
                          style={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            color: "white",
                            margin: 0,
                            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          {getTranslatedField(itemData, 'title', i18n.language) || "آلة غسيل أطباق"}
                        </h2>
                        <p
                          style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            color: "white",
                            margin: "5px 0",
                            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          ${itemData?.Price || "N/A"}
                        </p>
                      </div>

                      {/* Right Side: Call, WhatsApp, Message Buttons */}
                      <div className="d-flex align-items-center gap-2">
                        {/* Call, WhatsApp, Message Buttons */}
                        <div
                          className="d-flex align-items-center gap-2 head2btflex"
                          style={{
                            marginRight:
                              window.innerWidth <= 576 ? "0px" : "270px",
                            marginTop:
                              window.innerWidth <= 576 ? "70px" : "0px",
                          }}
                        >
                          {itemData.showNumberChecked ? (
                            ""
                          ) : (
                            <a
                              disabled={itemData.showNumberChecked}
                              href={`tel:${itemData.Phone}`}
                            >
                              <button
                                disabled={itemData.showNumberChecked}
                                className={`blue_btn list_btn ${
                                  showPhone ? "expanded" : ""
                                }`}
                                onClick={() => setShowPhone(true)}
                              >
                                <FaPhoneAlt />
                                <span>
                                  {showPhone ? itemData.Phone : t("listing.callNow")}
                                </span>
                              </button>
                            </a>
                          )}{" "}
                          <a
                            href={`https://wa.me/${itemData.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button
                              className={`blue_btn list_btn ${
                                showPhone ? "icon-only" : ""
                              }`}
                            >
                              <FaWhatsapp />
                              <span className="button-text">{t("listing.whatsapp")}</span>
                            </button>
                          </a>
                          <button
                            className={`blue_btn list_btn ${
                              showPhone ? "icon-only" : ""
                            }`}
                            onClick={() => setShowModal(true)}
                          >
                            <MdMessage />
                            <span className="button-text">{t("listing.message")}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Full-Screen Image */}

                    {/* Image Counter */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "20px",
                        background: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        padding: "5px 10px",
                        borderRadius: "15px",
                        fontSize: "16px",
                        zIndex: 10000,
                      }}
                    ></div>

                    {/* Message Modal */}
                    {showModal && (
                      <>
                        <div
                          className={`modal fade ${
                            showModal ? "show d-block" : "d-none"
                          }`}
                          tabIndex="-1"
                          role="dialog"
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            zIndex: 10001,
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                          }}
                        >
                          <div
                            className="modal-dialog modal-dialog-centered"
                            role="document"
                          >
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title">{t("listing.sendMessage")}</h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  onClick={() => setShowModal(false)}
                                ></button>
                              </div>
                              {userId && recieverId ? (
                                <Mesagedeals
                                  productIds={itemData.id}
                                  userId={userId}
                                  recieverId={recieverId}
                                  fullWidth={true} // :point_left: Add this prop
                                />
                              ) : (
                                <div className="flex items-center justify-center h-40 bg-gray-100 rounded-md">
                                  <p className="text-lg font-semibold text-gray-600">
                                    Please log in to start messaging.
                                  </p>
                                </div>
                              )}
                              {/* <div className="modal-body">
                <div className="p-4 w-full max-w-lg mx-auto">
                  {userId && recieverId ? (
                    <Chat userId={userId} recieverId={recieverId} />
                  ) : (
                    <div className="flex items-center justify-center h-40 bg-gray-100 rounded-md">
                      <p className="text-lg font-semibold text-gray-600">
                        Please log in to start messaging.
                      </p>
                    </div>
                  )}
                </div>
              </div> */}
                            </div>
                          </div>
                        </div>
                        <div
                          className="modal-backdrop fade show"
                          onClick={() => setShowModal(false)}
                          style={{ zIndex: 10000 }}
                        ></div>
                      </>
                    )}
                  </div>
                )}
                <div
                  className="multiplesimage-wrapper"
                  style={{
                    gap: "10px",
                    marginTop: "0rem",
                    overflow: "hidden",
                  }}
                >
                  <SwiperSlider images={images} />
                </div>
              </div>
              <div
                className="border-none info_wrapper"
                style={{
                  marginLeft: window.innerWidth <= 576 ? "0rem" : "-0.7rem",
                }}
              >
                <div className="col">
                  <div className="table-responsive info_table">
                    <div className="product_Detail_main">
                      <ul className="product_Detail_inner">
                        {Object.entries({
                          "Seller Type": itemData?.SellerType,
                          District: itemData?.District,
                          Duration: itemData?.Duration,
                          "Registered City": itemData?.Registeredin,
                          Assembly: itemData?.Assembly,
                          Accuracy: itemData?.Accuracy,
                          "Battery Type": itemData?.BatteryType,
                          Compatibility: itemData?.Compatibility,
                          CuffSize: itemData?.CuffSize,
                          "Display Type": itemData?.DisplayType,
                          Features: itemData?.Features,
                          MeasurementRange: itemData?.MeasurementRange,
                          MeasurementUnits: itemData?.MeasurementUnits,
                          "Wash Type": itemData?.WashType,
                          Type: itemData?.Type,
                          RAM: itemData?.RAM,
                          bodyType: itemData?.bodyType,
                          Brand: itemData?.Brand,
                          "Operating System": itemData?.OperatingSystem,
                          type: itemData?.type,
                          "Screen Size": itemData?.ScreenSize,
                          Registeredin: itemData?.Registeredin,
                          EngineCapacity: itemData?.EngineCapacity,
                          BodyType: itemData?.BodyType,
                          Transmission: itemData?.Transmission,
                          "Regional Spec": itemData?.RegionalSpec,
                          Insurance: itemData?.Insurance,
                          "Seating Capacity": itemData?.SeatingCapacity,
                          "Number of Doors": itemData?.NumberOfDoors,
                          Mileage: itemData?.Mileage,
                          "Payment Method": itemData?.PaymentMethod,
                          "Interior Color": itemData?.InteriorColor,
                          ExteriorColor: itemData?.ExteriorColor,
                          Condition: itemData?.Condition,
                          Purpose: itemData?.Purpose,
                          ClosureType: itemData?.ClosureType,
                          Material: itemData?.Material,
                          CollarType: itemData?.CollarType,
                          Season: itemData?.Season,
                          StyleDesign: itemData?.StyleDesign,
                          Fit: itemData?.Fit,
                          City: itemData?.City,
                          Company: itemData?.Company,
                          EmploymentType: itemData?.EmploymentType,
                          ExperienceLevel: itemData?.ExperienceLevel,
                          Industry: itemData?.Industry,
                          SalaryRange: itemData?.SalaryRange,
                          "Sallary From": itemData?.SallaryFromRange,
                          "Sallary To": itemData?.SallaryToRange,
                          "Content Type": itemData?.ContentType,
                          Language: itemData?.Language,
                          SkillLevel: itemData?.SkillLevel,
                          States: itemData?.States,
                          "Subject Categories": itemData?.SubjectCategories,
                          assembly: itemData?.assembly,
                          purpose: itemData?.purpose,
                          Accessibility: itemData?.Accessibility,
                          Amenities: itemData?.Amenities,
                          "Building Type": itemData?.BuildingType,
                          "Property Features": itemData?.PropertyFeatures,
                          "Property Type": itemData?.PropertyType,
                          Size: itemData?.Size,
                          Checkin: itemData?.Checkin,
                          RoomType: itemData?.RoomType,
                          Availability: itemData?.Availability,
                          ColorOptions: itemData?.ColorOptions,
                          Material: itemData?.Material,
                          Age: itemData?.Age,
                          Breed: itemData?.Breed,
                          Color: itemData?.Color,
                          "Dietary Preferences": itemData?.DietaryPreferences,
                          "Health Status": itemData?.HealthStatus,
                          Temperament: itemData?.Temperament,
                          "Training Level": itemData?.TrainingLevel,
                          "Engine Capacity": itemData?.EngineCapacity,
                          Make: itemData?.Make,
                          Language: itemData?.Language,
                          "Body Type": itemData?.BodyType,
                          ContentType: itemData?.ContentType,
                          "Last Updated": itemData?.timeAgo,
                          Condition: itemData?.Condition,
                          "Exterior Color": itemData?.ExteriorColor,
                          Purpose: itemData?.Purpose,
                          Model: itemData?.Model,
                          Color: itemData?.Color,
                          "Price From": itemData?.priceFrom,
                          "Price To": itemData?.priceTo,
                          "Skill Level": itemData?.SkillLevel,
                          Website: itemData?.Website,
                          Phone: itemData?.Phone,
                          Email: itemData?.Email,
                          Address: itemData?.address,
                          Location: itemData?.location,
                          "Manufacture Year": itemData?.ManufactureYear,
                          Processor: itemData?.Processor,
                          "Display Quality": itemData?.DisplayQuality,
                          "Storage Capacity": itemData?.Storagecapacity,
                          "Storage Type": itemData?.StorageType,
                          "Battery Life": itemData?.BatteryLife,
                          Connectivity: itemData?.Connectivity,
                          "Graphics Card": itemData?.GraphicsCard,
                          "Special Features": itemData?.SpecialFeatures,
                          "Screen Size": itemData?.ScreenSize,
                          "Picture Availability": itemData?.PictureAvailability,
                          "Video Availability": itemData?.VideoAvailability,
                          "Featured Ads": itemData?.FeaturedAds,
                          Category: itemData?.category,
                          State: itemData?.States,
                          "Created At": itemData?.createdAt
                            ? formatTimestamp(itemData.createdAt)
                            : undefined,
                        })
                          .filter(
                            ([_, value]) =>
                              value !== undefined &&
                              value !== null &&
                              value !== ""
                          ) // Strict filter
                          .map(([label, value], index) => (
                            <li key={index} className="product_Detail_block">
                              <span className="detail_text">{translateFieldLabel(label)}:</span>
                              <span className="detail_text">{translateFieldValue(value)}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                  <div className="dynamic-route-container">
                    {/* Features Section */}
                    <div className="section">
                      <h1 className="section-title dynamic_route">{t("detailsPage.features")}</h1>
                      <ul className="descriptions-wrapper">
                        {itemData?.AdditionalFeatures?.length > 0 ? (
                          itemData.AdditionalFeatures.map((feature, index) => (
                            <li key={index} className="feature-item">
                              {translateFieldValue(feature)}
                            </li>
                          ))
                        ) : (
                          <li className="no-data">N/A</li>
                        )}
                      </ul>
                    </div>

                    {/* Description Section */}
                    <div className="section m-0">
                      <h1 className="section-title section-title-description dynamic_route">
                        {t("detailsPage.description")}
                      </h1>
                      <pre className="descriptions-para">
                        {getTranslatedField(itemData, 'description', i18n.language)?.trim() || "No description"}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div
                className="adsCategory_head"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  marginLeft: window.innerWidth <= 576 ? "0px" : "-5px",
                  alignItems: "center",
                }}
              >
                <RatingAndReviews
                  currentAdId={_Id}
                  listingUserId={itemData?.userId}
                />
              </div> */}
            </Col>

            <Col xl={4}>
              <Col xs={12}>
                <Card
                  style={{
                    position: "relative",
                    minHeight: "100px",
                    borderRadius: "12px",
                    width: window.innerWidth <= 576 ? "100%" : "100%",
                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <Card.Body
                    className="p-0"
                    style={{
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "60px",
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "#2d4495",
                        marginBottom: 20,
                      }}
                    >
                      {itemData?.Price ? (
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
                          {itemData.Price}
                        </>
                      ) : (
                        "N/A"
                      )}
                    </div>
                    <h5>{t("listing.safetyTips")}</h5>
                    <ul
                      style={{
                        listStyleImage: `url(${bullet})`,
                        marginLeft: "1.1rem",
                      }}
                    >
                      <li className="safteytip_para">
                        {t("listing.safetyTip1")}
                      </li>
                      <li className="safteytip_para">
                        {t("listing.safetyTip2")}
                      </li>
                      <li className="safteytip_para">
                        {t("listing.safetyTip3")}
                      </li>
                    </ul>
                    <hr
                      style={{
                        border: "none",
                        borderTop: "3px solid #000",
                      }}
                    />

                    <div className="col-md">
                      <h1 className="sallerinfo_para">{t("listing.sellerInformation")}</h1>
                      <div className="row profileinner_container ">
                        <div className="col-4 profileimg">
                          <Link
                            to={`/Userinfo?id=${itemData.userId}&callingFrom=${callingFrom}`}
                          >
                            <img
                              src={itemData.photoURL}
                              alt="Profile"
                              className="img-fluid rounded-circle"
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                              }} // Adjust size as needed
                            />
                          </Link>
                        </div>
                        <div className="col-8 profile_rightbarTags">
                          <p className="sallerInfo_para">
                            {itemData.displayName}
                          </p>
                          <p className="sallerInfo_para">
                            {new Date(itemData.creationTime).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </p>

                          <p className="s allerInfo_para">
                            <Link
                             className="view-all-ads-link"
                              to={`/Userinfo?id=${itemData.userId}&callingFrom=${callingFrom}`}
                            >
                              {t("listing.viewAllAds")}
                            </Link>
                          </p>
                        </div>

                        <div className="col mt-3 innerContainer2">
                          <div className="d-flex align-items-center gap-2 innerContainer2 head2btflex">
                            {itemData.showNumberChecked ? (
                              ""
                            ) : (
                              <a
                                disabled={itemData.showNumberChecked}
                                href={`tel:${itemData.Phone}`}
                              >
                                <button
                                  disabled={itemData.showNumberChecked}
                                  className={`blue_btn list_btn ${
                                    showPhone ? "expanded" : ""
                                  }`}
                                  onClick={() => setShowPhone(true)}
                                >
                                  <FaPhoneAlt />
                                  <span>
                                    {showPhone ? itemData.Phone : t("listing.callNow")}
                                  </span>
                                </button>
                              </a>
                            )}{" "}
                            {itemData.showNumberChecked ? (
                              ""
                            ) : (
                              <a
                                href={`https://wa.me/${itemData.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <button
                                  className={`blue_btn list_btn ${
                                    showPhone ? "icon-only" : ""
                                  }`}
                                >
                                  <FaWhatsapp />
                                  <span className="button-text">{t("listing.whatsapp")}</span>
                                </button>
                              </a>
                            )}
                            <button
                              className={`blue_btn list_btn ${
                                showPhone ? "icon-only" : ""
                              }`}
                              onClick={() => setShowModal(true)}
                            >
                              <MdMessage />
                              <span className="button-text">{t("listing.message")}</span>
                            </button>
                            <style>{`
                              .sign-in-button {
                                background-color: #0055a5; /* Blue background color matching the image */
                                color: white; /* White text color */
                                font-size: 18px; /* Approximate font size */
                                font-weight: bold; /* Bold text */
                                width: 120px; /* Default fixed width */
                                height: 50px; /* Fixed height */
                                border: none; /* No border */
                                border-radius: 10px; /* Rounded corners */
                                cursor: pointer; /* Hand cursor on hover */
                                text-transform: capitalize; /* Capitalize the text like in the image */
                                display: flex; /* Use flexbox to center icon and text */
                                align-items: center; /* Vertically center */
                                justify-content: center; /* Horizontally center */
                                gap: 8px; /* Space between icon and text */
                                transition: width 0.3s ease; /* Smooth transition for width change */
                              }

                              .sign-in-button:hover {
                                background-color: #004080; /* Slightly darker blue on hover for feedback */
                              }

                              /* Expanded state for Call Now button */
                              .expanded {
                                width: 200px; /* Larger width when showing phone number */
                                font-size: 16px; /* Slightly smaller font to fit the number */
                              }

                              /* Icon-only state for WhatsApp and Message buttons */
                              .icon-only {
                                width: 50px; /* Smaller width to fit just the icon */
                              }

                              /* Hide text in icon-only state */
                              .icon-only .button-text {
                                display: none; /* Hide the text */
                              }

                              /* Remove underline from <a> tags */
                              a {
                                text-decoration: none;
                              }
                            `}</style>
                          </div>
                          <div>
                            <div
                              className={`modal fade ${
                                showModal ? "show d-block" : "d-none"
                              }`}
                              tabIndex="-1"
                              role="dialog"
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              <div
                                className="modal-dialog modal-dialog-centered"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title">
                                      {t("listing.sendMessage")}
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={() => setShowModal(false)}
                                    ></button>
                                  </div>

                                  <div className="modal-body">
                                    <div className="p-4 w-full max-w-lg mx-auto">
                                      {userId && recieverId ? (
                                        <Chat
                                          userId={userId}
                                          recieverId={recieverId}
                                        />
                                      ) : (
                                        <div className="flex items-center justify-center h-40 bg-gray-100 rounded-md">
                                          <p className="text-lg font-semibold text-gray-600">
                                            Please log in to start messaging.
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {showModal && (
                              <div
                                className="modal-backdrop fade show"
                                onClick={() => setShowModal(false)}
                              ></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <h4 className="mt-2 mb-2">{t("listing.location")}</h4>

                    <button className="location_btn ">{itemData.City} </button>
                  </Card.Body>
                </Card>
                <Card
                  style={{
                    position: "relative",
                    minHeight: "100px",
                    borderRadius: "12px",
                    width: window.innerWidth <= 576 ? "100%" : "100%",
                    marginLeft: window.innerWidth <= 576 ? "0rem" : "0rem",
                    marginTop: 18,
                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <Card.Body
                    style={{
                      position: "relative",
                      padding: "0",
                    }}
                  >
                    <div className="d-flex flex-column gap-3 ms-0">
                      {adsDetailImagesContent.length > 0 &&
                        adsDetailImagesContent[0].imageUrls.map(
                          (imageUrl, index) => {
                            const link =
                              adsDetailImagesContent[0].links[index]?.trim(); // remove any extra spaces
                            return (
                              <a
                                key={index}
                                href={link || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: "none" }}
                              >
                                <img
                                  src={imageUrl}
                                  alt={`Image ${index + 1}`}
                                  className="rounded shadow"
                                  style={{
                                    width:
                                      window.innerWidth <= 576
                                        ? "100%"
                                        : "100%",
                                    height: "300px",
                                    objectFit: "cover",
                                    cursor: "pointer",
                                  }}
                                />
                              </a>
                            );
                          }
                        )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Col>
          </Row>
          {/* <SuggestedAds callingFrom={callingFrom} currentAdId={_Id} /> */}
          <Relateddata itemData={itemData} />
        </Container>

        <Footer />
      </div>
    </>
  );
};

export default Dynamic_Routes;
