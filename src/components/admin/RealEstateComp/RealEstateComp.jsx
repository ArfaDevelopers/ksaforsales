import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import Header from "../../home/header"; // Ensure Header is correctly implemented and imported
import Footer from "../../home/footer/Footer";
// import { ChevronLeft, ChevronRight } from "lucide-react";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import profile from "../dyanmic_route/profileimage.png";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import automative from "../../home/automative.png";
import electronic from "../../home/electronic.png";
import fashion from "../../home/fashion.png";
import healthcare from "../../home/healthcare.png";
import job from "../../home/job.png";
import education from "../../home/education.png";
import realestate from "../../home/realestate (2).png";
import travel from "../../home/travel.png";
import sport from "../../home/sportandgames.png";
import magazine from "../../home/magazine.png";
import pet from "../../home/pet .png";
import iron from "../../home/iron.png";
import image1 from "../../../assets/img/banner/bannerimage1.png";
import image3 from "../../../assets/img/banner/bannerimage3.png";
import image4 from "../../../assets/img/banner/bannerimage4.png";
import { MdKeyboardArrowRight } from "react-icons/md";
// import LatestBlog from "../../blog/BlogList/LatestBlog/LatestBlog.jsx";
import image2 from "../../../assets/img/banner/bannerimage2.png";
import xIcon from "../../home/x.png";
import insta from "../../home/insta.png";
import fb from "../../home/fb.png";
import tiktok from "../../home/tiktoc.png";
import whatapp from "../../home/whatapp (3).png";
import Carousel from "../../home/slider/Carousel";
import AutomativeCarosuel from "../..//home/slider/AutomativeCarousel.jsx";
import RealEstateCarousel from "../..//home/slider/RealEstateCarousel.jsx";
import ElectronicCarousel from "../..//home/slider/ElectronicCarousel.jsx";
import HealthCareCarousel from "../..//home/slider/HealthCareCarousel.jsx";
import SportandgameCarouseCarousel from "../..//home/slider/SportandgameCarouseCarousel.jsx";
import ComercialsAds from "../../home/ComercialsAds/ComercialsAds.jsx";
import LatestBlog from "../../blog/BlogList/LatestBlog/LatestBlog.jsx";
import popup from "../../home/popup_image.png";
import { Accordion } from "react-bootstrap";
import { IoLocationSharp } from "react-icons/io5";
import { BsChat } from "react-icons/bs";
import Select from "react-select";
import { Country, City, State } from "country-state-city";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./../../Firebase/FirebaseConfig.jsx";
import { FaHeart, FaPhone, FaSearch, FaWhatsapp } from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  ButtonGroup,
  Badge,
} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/FirebaseConfig"; // Ensure the correct Firebase import

const RealEstateComp = () => {
  const parms = useLocation().pathname;
  const [isVisible, setIsVisible] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  // Handle city selection
  const [carsData, setCars] = useState([]); // All cars data
  const [filteredCars, setFilteredCars] = useState([]); // Filtered cars based on search & city
  const [searchQuery, setSearchQuery] = useState(""); // Search query for title and city
  const [currentPageCars, setCurrentPageCars] = useState([]); // Cars to display on the current page
  console.log(filteredCars, "filteredCars_________");
  const itemsPerPage = 3; // Number of items per page

  const [selectedCities, setSelectedCities] = useState([]); // Selected cities for filtering
  const [selectedEmirates, setSelectedEmirates] = useState([]); // Selected Emirates for filtering
  const [Brand, setBrand] = useState([]);
  const [selectedCarsMake, setSelectedCarsMake] = useState([]);

  console.log(selectedCarsMake, "selectedCarsMake______");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [ScreenSize, setScreenSize] = useState("");

  const [selectedToyotaLocations, setSelectedToyotaLocations] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const [selectedMercedesBenzLocations, setSelectedMercedesBenzLocations] =
    useState([]);

  // Handle checkbox change for Toyota locations
  const [selectedCars1, setSelectedCars1] = useState([]);
  const [selectedOptionTransmission, setSelectedOptionTransmission] =
    useState("");
  const [logSelectedColor, setlogSelectedColor] = useState([]);
  const [selectedEngines, setSelectedEngines] = useState([]);
  const [OperatingSystem, setOperatingSystem] = useState([]);
  const [activePhoneIndex, setActivePhoneIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [fromCC, setFromCC] = useState("");
  const [toCC, setToCC] = useState("");
  const [selectedAssembly, setSelectedAssembly] = useState([]);
  const [selectedCarsBodyType, setSelectedCarsBodyType] = useState([]);
  const [selectedNumbersNumberofDoors, setSelectedNumbersNumberofDoors] =
    useState([]);
  const [selectedValuesSeatCapacity, setSelectedValuesSeatCapacity] = useState(
    []
  );
  const [selectedClassesModelCategory, setSelectedClassesModelCategory] =
    useState([]);
  const [selectedCheckboxSellerType, setSelectedCheckboxSellerType] =
    useState("");
  const [pictureAvailability, setPictureAvailability] = useState("");
  const [selectedOptionVideoAvailability, setSelectedOptionVideoAvailability] =
    useState("");
  const [selectedOptionisFeatured, setSelectedOptionisFeatured] = useState("");
  const [storageType, setStorageType] = useState("");

  const [selectedStates1, setSelectedStates1] = useState([]); // Selected states for filtering
  const [fromValueMileage, setFromCCMileage] = useState("");
  const [toValueMileage, setToCCMileage] = useState("");
  const [SortBy, setSortBy] = useState(""); // Search query for title and city
  const [Processor, setProcessor] = useState(""); // Search query for title and city
  const [RAM, setRAM] = useState(""); // Search query for title and city
  const [storagecapacity, setStoragecapacity] = useState(""); // Search query for title and city
  const [GraphicsCard, setGraphicsCard] = useState("");
  const [BatteryLife, setBatteryLife] = useState("");
  const [DisplayQuality, setDisplayQuality] = useState("");
  const [Connectivity, setConnectivity] = useState(""); // Search query for title and city
  const [SpecialFeatures, setSpecialFeatures] = useState(""); // Search query for title and city
  const [Gender, setGender] = useState("");
  const [Size, setSize] = useState("");
  const [Fit, setFit] = useState("");
  const [Material, setMaterial] = useState("");
  const [Color, setColor] = useState("");
  const [StyleDesign, setStyleDesign] = useState("");
  const [ClosureType, setClosureType] = useState("");
  const [CollarType, setCollarType] = useState("");
  const [SleeveLength, setSleeveLength] = useState("");
  const [WashType, setWashType] = useState("");
  const [Features, setFeatures] = useState("");
  const [Season, setSeason] = useState("");
  const [Type, setType] = useState("");
  const [MeasurementRange, setMeasurementRange] = useState("");
  const [Accuracy, setAccuracy] = useState("");
  const [CuffSize, setCuffSize] = useState("");
  const [DisplayType, setDisplayType] = useState("");
  const [BatteryType, setBatteryType] = useState("");
  const [Compatibility, setCompatibility] = useState("");
  const [StorageCapacity, setStorageCapacity] = useState("");
  const [MeasurementUnits, setMeasurementUnits] = useState("");
  const [SpeedofMeasurement, setSpeedofMeasurement] = useState("");
  const [SellerType, setSellerType] = useState("");
  const [PropertyType, setPropertyType] = useState("");
  const [Amenities, setAmenities] = useState([]);
  const [PropertyFeatures, setPropertyFeatures] = useState([]);
  const [BuildingType, setBuildingType] = useState([]);
  const [Accessibility, setAccessibility] = useState([]);
  const [ads, setCarsData] = useState([]);
  const [userId, setUserId] = useState(""); // State for image preview
  const [error, setError] = useState(""); // ✅ Error state
  const [selectedCountry, setSelectedCountry] = useState(null);
  // const [selectedCities, setSelectedCities] = useState([]); // Array of selected cities
  const [cities, setCities] = useState([]);
  // const [searchQuery, setSearchQuery] = useState(""); // For search query, if any
  const [states, setStates] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  // Format country data for React Select
  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  // Handle country selection
  const handleCountryChange = (selected) => {
    setSelectedCountry(selected);
    setSelectedCities([]); // Reset cities when country changes
    setSelectedStates1([]); // Reset states when country changes

    if (selected && selected.value) {
      // Get states of the selected country
      const countryStates = State.getStatesOfCountry(selected.value) || [];
      setStates(countryStates);

      // Get cities of the selected country
      const countryCities = City.getCitiesOfCountry(selected.value) || [];
      setCities(countryCities);
    } else {
      setStates([]);
      setCities([]);
    }
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleCityChange = (selectedOptions) => {
    const cityNames = selectedOptions
      ? selectedOptions.map((option) => option.label)
      : [];
    setSelectedCities(cityNames);
    filterCars(searchQuery, cityNames, selectedStates1); // Apply the filter
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
        // navigate("/login", { replace: true }); // Redirect to login page
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const carsCollectionRef = collection(db, "banneradsimg");
        const querySnapshot = await getDocs(carsCollectionRef);
        const cars = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCarsData(cars); // Set the state with fetched data
      } catch (error) {
        console.error("Error getting cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);
  function timeAgo(timestamp) {
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    const now = new Date();
    const difference = Math.abs(now - date); // Difference in milliseconds
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "Just now";
  }

  const handleCheckboxChangeAccessibility = (event) => {
    const carLabel = event.target.name; // Use the name attribute to identify the checkbox
    if (event.target.checked) {
      // Add the selected checkbox to the array
      setAccessibility((prevAmenities) => [...prevAmenities, carLabel]);
    } else {
      // Remove the unchecked checkbox from the array
      setAccessibility((prevAmenities) =>
        prevAmenities.filter((item) => item !== carLabel)
      );
    }
  };
  const handleCheckboxChangeBuildingType = (event) => {
    const carLabel = event.target.name; // Use the name attribute to identify the checkbox
    if (event.target.checked) {
      // Add the selected checkbox to the array
      setBuildingType((prevAmenities) => [...prevAmenities, carLabel]);
    } else {
      // Remove the unchecked checkbox from the array
      setBuildingType((prevAmenities) =>
        prevAmenities.filter((item) => item !== carLabel)
      );
    }
  };
  const handleCheckboxChangePropertyFeatures = (event) => {
    const carLabel = event.target.name; // Use the name attribute to identify the checkbox
    if (event.target.checked) {
      // Add the selected checkbox to the array
      setPropertyFeatures((prevAmenities) => [...prevAmenities, carLabel]);
    } else {
      // Remove the unchecked checkbox from the array
      setPropertyFeatures((prevAmenities) =>
        prevAmenities.filter((item) => item !== carLabel)
      );
    }
  };
  const handleCheckboxChangeAmenities = (event) => {
    const carLabel = event.target.name; // Use the name attribute to identify the checkbox
    if (event.target.checked) {
      // Add the selected checkbox to the array
      setAmenities((prevAmenities) => [...prevAmenities, carLabel]);
    } else {
      // Remove the unchecked checkbox from the array
      setAmenities((prevAmenities) =>
        prevAmenities.filter((item) => item !== carLabel)
      );
    }
  };

  const handleCheckboxChangeSize = (event) => {
    const carLabel = event.target.name; // Use the name attribute to identify the checkbox
    if (event.target.checked) {
      // Only allow one checkbox to be checked
      setSize([carLabel]);
    } else {
      // If unchecked, clear the state
      setSize([]);
    }
  };

  const handleCheckboxChangePropertyType = (event) => {
    const carLabel = event.target.name; // Use the name attribute to identify the checkbox
    if (event.target.checked) {
      // Add the label to the state if checked
      setPropertyType((prev) => [...prev, carLabel]);
    } else {
      // Remove the label from the state if unchecked
      setPropertyType((prev) => prev.filter((car) => car !== carLabel));
    }
  };
  const handleCheckboxChangeSellerType = (label) => {
    setSellerType((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangeSpeedofMeasurement = (label) => {
    setSpeedofMeasurement((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };

  const handleCheckboxChangeMeasurementUnits = (label) => {
    setMeasurementUnits((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };

  const handleCheckboxChangeStorageCapacity = (label) => {
    setStorageCapacity((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  // Search query for title and city
  // Search query for title and city
  // Search query for title and city
  // Search query for title and city
  // Search query for title and city
  // Search query for title and city
  // Search query for title and city
  const handleCheckboxChangeCompatibility = (label) => {
    setCompatibility((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangeBatteryType = (label) => {
    setBatteryType((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangeDisplayType = (label) => {
    setDisplayType((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangeCuffSize = (label) => {
    setCuffSize((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangeFeatures = (label) => {
    setFeatures((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangeAccuracy = (label) => {
    setAccuracy((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangeMeasurementRange = (label) => {
    setMeasurementRange((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangeType = (label) => {
    setType((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangeSeason = (label) => {
    setSeason((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };

  const handleCheckboxChangeWashType = (label) => {
    setWashType((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangeSleeveLength = (label) => {
    setSleeveLength((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangStyleClosureCollarType = (label) => {
    setCollarType((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangStyleClosureType = (label) => {
    setClosureType((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangStyleDesign = (label) => {
    setStyleDesign((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangColor = (label) => {
    setColor((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangMaterial = (label) => {
    setMaterial((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangFit = (label) => {
    setFit((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };

  const handleCheckboxChangeGender = (label) => {
    setGender((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  // Search query for title and city
  // Search query for title and city
  const handleCheckboxChangeSpecialFeatures = (label) => {
    setSpecialFeatures((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  // Search query for title and city
  const handleCheckboxChangeConnectivity = (label) => {
    setConnectivity((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangeDisplayQuality = (label) => {
    setDisplayQuality((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangeBatteryLife = (label) => {
    setBatteryLife((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangeGraphicsCard = (label) => {
    setGraphicsCard((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangeStoragecapacity = (label) => {
    setStoragecapacity((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangeStorageType = (label) => {
    setStorageType((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangeProcessor = (label) => {
    setProcessor((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangeRAM = (label) => {
    setRAM((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangeScreenSize = (label) => {
    setScreenSize((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleFromChangeMileage = (e) => {
    setFromCCMileage(e.target.value);
    console.log("From Date:__", e.target.value);
  };

  // Handle changes for "To" input
  const handleToChangMileagee = (e) => {
    setToCCMileage(e.target.value);
    console.log("From Date:___To Date:", e.target.value);
  };

  const handleStateChange1 = (selectedOptions) => {
    // Extract state names from the selected options
    const stateNames = selectedOptions
      ? selectedOptions.map((option) => option.label)
      : [];
    setSelectedStates1(stateNames);
    filterCars(searchQuery, selectedCities, stateNames); // Apply the filter
  };

  const [activePage, setActivePage] = useState(1);
  console.log(activePage, "activePage_________");
  const handlePageClick = (page) => {
    setActivePage(page);
  };
  const carsPerPage = 6;

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= activePage - 1 && i <= activePage + 1)
      ) {
        pages.push(
          <Button
            key={i}
            variant={i === activePage ? "primary" : "outline-primary"}
            className="mx-1"
            onClick={() => handlePageClick(i)}
          >
            {i}
          </Button>
        );
      } else if (i === activePage - 2 || i === activePage + 2) {
        pages.push(
          <span key={`ellipsis-${i}`} className="mx-1">
            ...
          </span>
        );
      }
    }
    return pages;
  };

  const getPaginatedCars = () => {
    const startIndex = (activePage - 1) * carsPerPage;
    const endIndex = startIndex + carsPerPage;
    return filteredCars.slice(startIndex, endIndex);
  };

  const handleCheckboxChangeisFeatured = (event) => {
    const isChecked = event.target.checked;
    const value = isChecked ? "Featured Ad" : "Not Featured Ad";
    setSelectedOptionisFeatured(value);
    console.log(`Selected Option:____ ${value}`);
  };

  const handleCheckboxChangeVideoAvailability = (event) => {
    const isChecked = event.target.checked;
    const value = isChecked ? "With Video" : "Without Video";
    setSelectedOptionVideoAvailability(value);
    console.log(`Selected Option: ${value}`);
  };
  const handleCheckboxChangePictureAvailability = (event) => {
    const checked = event.target.checked;
    const value = checked ? "With Pictures" : "Without Pictures";
    setPictureAvailability(value);
    console.log(`PictureAvailability: ${value}`);
  };

  const handleCheckboxChangeModelCategory = (label) => {
    setSelectedClassesModelCategory((prevSelected) => {
      const isChecked = prevSelected.includes(label);
      const updatedSelection = isChecked
        ? prevSelected.filter((item) => item !== label) // Remove if unchecked
        : [...prevSelected, label]; // Add if checked

      console.log("Selected Classes:", updatedSelection);
      return updatedSelection;
    });
  };

  const handleCheckboxChangeSeatCapacity = (label) => {
    setSelectedValuesSeatCapacity((prevSelected) => {
      const isChecked = prevSelected.includes(label);
      const updatedSelection = isChecked
        ? prevSelected.filter((item) => item !== label) // Remove if unchecked
        : [...prevSelected, label]; // Add if checked

      console.log("Selected Values:", updatedSelection);
      return updatedSelection;
    });
  };
  const handleCheckboxChangeNumberofDoors = (label) => {
    setSelectedNumbersNumberofDoors((prevSelected) => {
      const isChecked = prevSelected.includes(label);
      const updatedSelection = isChecked
        ? prevSelected.filter((item) => item !== label) // Remove if unchecked
        : [...prevSelected, label]; // Add if checked

      console.log("Selected Numbers:", updatedSelection);
      return updatedSelection;
    });
  };
  const handleCheckboxChangeBodyType = (label) => {
    setSelectedCarsBodyType((prevSelected) => {
      const isChecked = prevSelected.includes(label);
      const updatedSelection = isChecked
        ? prevSelected.filter((item) => item !== label) // Remove if unchecked
        : [...prevSelected, label]; // Add if checked

      console.log("Selected Car Types:", updatedSelection);
      return updatedSelection;
    });
  };
  const handleCheckboxChangeAssembly = (label) => {
    setSelectedAssembly((prevSelected) => {
      const isChecked = prevSelected.includes(label);
      const updatedSelection = isChecked
        ? prevSelected.filter((item) => item !== label) // Remove if unchecked
        : [...prevSelected, label]; // Add if checked

      console.log("Selected Items:", updatedSelection);
      return updatedSelection;
    });
  };
  // Handle changes for "From" input
  const handleFromChangeCC = (e) => {
    setFromCC(e.target.value);
    console.log("From Date:__", e.target.value);
  };

  // Handle changes for "To" input
  const handleToChangeCC = (e) => {
    setToCC(e.target.value);
    console.log("From Date:___To Date:", e.target.value);
  };

  const handleCheckboxChangeEngineType = (label) => {
    setSelectedEngines((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangeOperatingSystem = (label) => {
    setOperatingSystem((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };

  console.log("Selected Engines:", selectedEngines);

  const handleCheckboxChangeColor = (label) => {
    setlogSelectedColor((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };

  console.log("Selected Items:", logSelectedColor);
  const handleCheckboxChangeTransmission = (label) => {
    setSelectedOptionTransmission(label);
    console.log("Selected option:", label);
  };

  // Handle checkbox change
  const handleCarChange = (e, car) => {
    if (e.target.checked) {
      // Add the car to the selected list
      setSelectedCars1((prev) => [...prev, car]);
    } else {
      // Remove the car from the selected list
      setSelectedCars1((prev) => prev.filter((item) => item !== car));
    }
  };

  // Log selected cars to the console whenever the state changes
  console.log("Selected Cars:1", selectedCars1);
  const handleToyotaChange = (e, location) => {
    const isChecked = e.target.checked;
    setSelectedMercedesBenzLocations((prevState) => {
      const newToyotaLocations = isChecked
        ? [...prevState, location]
        : prevState.filter((loc) => loc !== location);
      return newToyotaLocations;
    });
  };

  // Handle checkbox change for Mercedes-Benz locations
  const handleMercedesBenzChange = (e, location) => {
    const isChecked = e.target.checked;
    setSelectedMercedesBenzLocations((prevState) => {
      const newMercedesBenzLocations = isChecked
        ? [...prevState, location]
        : prevState.filter((loc) => loc !== location);
      return newMercedesBenzLocations;
    });
  };

  // Log selected locations whenever state changes
  console.log("Selected______ Toyota Locations:", selectedToyotaLocations);
  console.log(
    "Selected______ Mercedes-Benz Locations:",
    selectedMercedesBenzLocations
  );
  // Handle changes to the "From" and "To" input fields
  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  // Log the selected dates
  console.log("fromDate__Select", fromDate);
  console.log("fromDate__Select1111:", toDate);

  // Handle change for 'from' input
  const handleFromChange = (e) => {
    setFromValue(e.target.value);
  };

  // Handle change for 'to' input
  const handleToChange = (e) => {
    setToValue(e.target.value);
  };

  const handleCheckboxChangeBrand = (event) => {
    const carLabel = event.target.name; // Use the name attribute to identify the checkbox
    if (event.target.checked) {
      // Add the label to the state if checked
      setBrand((prev) => [...prev, carLabel]);
    } else {
      // Remove the label from the state if unchecked
      setBrand((prev) => prev.filter((car) => car !== carLabel));
    }
  };
  const handleCheckboxChange = (event) => {
    const carLabel = event.target.name; // Use the name attribute to identify the checkbox
    if (event.target.checked) {
      // Add the label to the state if checked
      setSelectedCarsMake((prev) => [...prev, carLabel]);
    } else {
      // Remove the label from the state if unchecked
      setSelectedCarsMake((prev) => prev.filter((car) => car !== carLabel));
    }
  };
  const handleEmiratesChange = (e, emirate) => {
    if (e.target.checked) {
      setSelectedEmirates((prevEmirates) => {
        const updatedEmirates = [...prevEmirates, emirate];
        filterCars(searchQuery, updatedEmirates); // Apply the filter
        return updatedEmirates;
      });
    } else {
      setSelectedEmirates((prevEmirates) => {
        const updatedEmirates = prevEmirates.filter((item) => item !== emirate);
        filterCars(searchQuery, updatedEmirates); // Apply the filter
        return updatedEmirates;
      });
    }
  };
  useEffect(() => {
    filterCars(searchQuery, selectedEmirates);
  }, [selectedEmirates, searchQuery]);
  useEffect(() => {
    console.log("Selected Emirates: ", selectedEmirates);
  }, [selectedEmirates]);
  // Fetch cars data
  const [bookmarkedCar, setBookmarkedCar] = useState({
    bookmarked: false,
    id: null,
  });
  console.log(bookmarkedCar, "bookmarkedCars__________");
  const [popoverCarId, setPopoverCarId] = useState(null); // Store the specific car's ID

  const toggleBookmark = async (carId) => {
    try {
      // Find the selected car
      const selectedCar = carsData.find((car) => car.id === carId);
      if (!selectedCar) return;

      // Toggle bookmark status
      const newBookmarkedStatus = !(selectedCar.bookmarked || false);

      // Update local state
      setBookmarkedCar({ bookmarked: newBookmarkedStatus, id: carId });
      const user = auth.currentUser;
      if (!user) {
        setPopoverCarId(carId); // Show popover only for this car
        setTimeout(() => setPopoverCarId(null), 3000); // Hide after 3 seconds
        return;
      }
      const userId = user.uid;
      // Update Firestore
      const carDocRef = doc(db, "REALESTATECOMP", carId);
      await updateDoc(carDocRef, {
        bookmarked: newBookmarkedStatus,
        userId: userId,
      });

      // Update local cars state
      setCars((prevCars) =>
        prevCars.map((car) =>
          car.id === carId ? { ...car, bookmarked: newBookmarkedStatus } : car
        )
      );

      console.log(`Car ${carId} bookmarked: ${newBookmarkedStatus}`);
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };
  useEffect(() => {
    setLoading(true);

    const fetchCars = async () => {
      try {
        const carsCollectionRef = collection(db, "REALESTATECOMP");
        const querySnapshot = await getDocs(carsCollectionRef);
        const carsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(carsData, "carsData_____SPORTSGAMESComp11");
        setCars(carsData);
        setFilteredCars(carsData); // Initially, show all cars
        setLoading(false);
      } catch (error) {
        console.error("Error getting cars:", error);
      }
    };

    fetchCars();
  }, [bookmarkedCar]);

  useEffect(() => {
    // Filter cars for the current page
    const startIndex = (activePage - 1) * carsPerPage;
    const endIndex = startIndex + carsPerPage;
    setCurrentPageCars(filteredCars.slice(startIndex, endIndex));
  }, [activePage, filteredCars]);

  // const handleCityChange = (e, city) => {
  //   if (e.target.checked) {
  //     setSelectedCities((prevCities) => {
  //       const updatedCities = [...prevCities, city];
  //       filterCars(searchQuery, updatedCities); // Apply the filter
  //       return updatedCities;
  //     });
  //   } else {
  //     setSelectedCities((prevCities) => {
  //       const updatedCities = prevCities.filter((item) => item !== city);
  //       filterCars(searchQuery, updatedCities); // Apply the filter
  //       return updatedCities;
  //     });
  //   }
  // };
  useEffect(() => {
    console.log("Selected Cities: ", selectedCities);
  }, [selectedCities]);

  useEffect(() => {
    setLoading(true);

    filterCars(
      searchQuery,
      selectedCities,
      selectedEmirates,
      selectedCarsMake,
      fromValue,
      toValue,
      fromDate,
      toDate,
      selectedMercedesBenzLocations,
      selectedCars1,
      selectedOptionTransmission,
      logSelectedColor,
      selectedEngines,
      fromCC,
      toCC,
      selectedAssembly,
      selectedCarsBodyType,
      selectedNumbersNumberofDoors,
      selectedValuesSeatCapacity,
      selectedClassesModelCategory,
      selectedCheckboxSellerType,
      pictureAvailability,
      selectedOptionVideoAvailability,
      selectedOptionisFeatured,
      selectedStates1,
      fromValueMileage,
      toValueMileage,
      SortBy,
      Brand,
      OperatingSystem,
      ScreenSize,
      Processor,
      RAM,
      storageType,
      storagecapacity,
      GraphicsCard,
      BatteryLife,
      DisplayQuality,
      Connectivity,
      SpecialFeatures,
      Gender,

      Fit,
      Material,
      Color,
      StyleDesign,
      ClosureType,
      CollarType,
      SleeveLength,
      WashType,
      Features,
      Season,
      Type,
      MeasurementRange,
      Accuracy,
      CuffSize,
      DisplayType,
      BatteryType,
      Compatibility,
      StorageCapacity,
      MeasurementUnits,
      SpeedofMeasurement,
      SellerType,
      PropertyType,
      Size,
      Amenities,
      PropertyFeatures,
      BuildingType,
      Accessibility
    );
  }, [
    selectedCities,
    searchQuery,
    selectedEmirates,
    selectedCarsMake,
    fromValue,
    toValue,
    toDate,
    fromDate,
    selectedMercedesBenzLocations,
    selectedCars1,
    selectedOptionTransmission,
    logSelectedColor,
    selectedEngines,
    fromCC,
    toCC,
    selectedAssembly,
    selectedCarsBodyType,
    selectedNumbersNumberofDoors,
    selectedValuesSeatCapacity,
    selectedClassesModelCategory,
    selectedCheckboxSellerType,
    pictureAvailability,
    selectedOptionVideoAvailability,
    selectedOptionisFeatured,
    selectedStates1,
    fromValueMileage,
    toValueMileage,
    SortBy,
    Brand,
    OperatingSystem,
    ScreenSize,
    Processor,
    RAM,
    storageType,
    storagecapacity,
    GraphicsCard,
    BatteryLife,
    DisplayQuality,
    Connectivity,
    SpecialFeatures,
    Gender,

    Fit,
    Material,
    Color,
    StyleDesign,
    ClosureType,
    CollarType,
    SleeveLength,
    WashType,
    Features,
    Season,
    Type,
    MeasurementRange,
    Accuracy,
    CuffSize,
    DisplayType,
    BatteryType,
    Compatibility,
    StorageCapacity,
    MeasurementUnits,
    SpeedofMeasurement,
    SellerType,
    PropertyType,
    Size,
    Amenities,
    PropertyFeatures,
    BuildingType,
    Accessibility,
  ]);

  // Handle search input change
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter cars based on the search query and selected cities
    filterCars(
      query,
      selectedCities,
      selectedEmirates,
      selectedCarsMake,
      fromValue,
      toValue,
      toDate,
      fromDate,
      selectedMercedesBenzLocations,
      selectedCars1,
      selectedOptionTransmission,
      logSelectedColor,
      selectedEngines,
      fromCC,
      toCC,
      selectedAssembly,
      selectedCarsBodyType,
      selectedNumbersNumberofDoors,
      selectedValuesSeatCapacity,
      selectedClassesModelCategory,
      selectedCheckboxSellerType,
      pictureAvailability,
      selectedOptionVideoAvailability,
      selectedOptionisFeatured,
      selectedStates1,
      fromValueMileage,
      toValueMileage,
      SortBy,
      Brand,
      OperatingSystem,
      ScreenSize,
      Processor,
      RAM,
      storageType,
      storagecapacity,
      GraphicsCard,
      BatteryLife,
      DisplayQuality,
      Connectivity,
      SpecialFeatures,
      Gender,

      Fit,
      Material,
      Color,
      StyleDesign,
      ClosureType,
      CollarType,
      SleeveLength,
      WashType,
      Features,
      Season,
      Type,
      MeasurementRange,
      Accuracy,
      CuffSize,
      DisplayType,
      BatteryType,
      Compatibility,
      StorageCapacity,
      MeasurementUnits,
      SpeedofMeasurement,
      SellerType,
      PropertyType,
      Size,
      Amenities,
      PropertyFeatures,
      BuildingType,
      Accessibility
    );
  };
  const filterCars = (
    query,
    cities,
    emirates,
    selectedCarsMake,
    fromValue,
    toValue,
    fromDate,
    toDate,
    selectedMercedesBenzLocations,
    selectedCars1,
    selectedOptionTransmission,
    logSelectedColor,
    selectedEngines,
    fromCC,
    toCC,
    selectedAssembly,
    selectedCarsBodyType,
    selectedNumbersNumberofDoors,
    selectedValuesSeatCapacity,
    selectedClassesModelCategory,
    selectedCheckboxSellerType,
    pictureAvailability,
    selectedOptionVideoAvailability,
    selectedOptionisFeatured,
    selectedStates1,
    fromValueMileage,
    toValueMileage,
    SortBy,
    Brand,
    OperatingSystem,
    ScreenSize,
    Processor,
    RAM,
    storageType,
    storagecapacity,
    GraphicsCard,
    BatteryLife,
    DisplayQuality,
    Connectivity,
    SpecialFeatures,
    Gender,

    Fit,
    Material,
    Color,
    StyleDesign,
    ClosureType,
    CollarType,
    SleeveLength,
    WashType,
    Features,
    Season,
    Type,
    MeasurementRange,
    Accuracy,
    CuffSize,
    DisplayType,
    BatteryType,
    Compatibility,
    StorageCapacity,
    MeasurementUnits,
    SpeedofMeasurement,
    SellerType,
    PropertyType,
    Size,
    Amenities,
    PropertyFeatures,
    BuildingType,
    Accessibility
  ) => {
    let filtered = carsData;

    // Filter by search query
    if (query.trim() !== "") {
      const lowercasedQuery = query?.toLowerCase();
      filtered = filtered.filter(
        (car) =>
          car.title?.toLowerCase().includes(lowercasedQuery) ||
          car.City?.toLowerCase().includes(lowercasedQuery) ||
          car.Emirates?.toLowerCase().includes(lowercasedQuery) ||
          car.make?.toLowerCase().includes(lowercasedQuery) ||
          car.Registeredin?.toLowerCase().includes(lowercasedQuery) ||
          car.Color?.toLowerCase().includes(lowercasedQuery) ||
          car.Transmission?.toLowerCase().includes(lowercasedQuery) ||
          car.EngineType?.toLowerCase().includes(lowercasedQuery) ||
          car.Assembly?.toLowerCase().includes(lowercasedQuery) ||
          car.BodyType?.toLowerCase().includes(lowercasedQuery) ||
          car.NumberOfDoors?.toLowerCase().includes(lowercasedQuery) ||
          car.SeatingCapacity?.toLowerCase().includes(lowercasedQuery) ||
          car.ModalCategory?.toLowerCase().includes(lowercasedQuery) ||
          car.SellerType?.toLowerCase().includes(lowercasedQuery) ||
          car.PictureAvailability?.toLowerCase().includes(lowercasedQuery) ||
          car.VideoAvailability?.toLowerCase().includes(lowercasedQuery) ||
          car.AdType?.toLowerCase().includes(lowercasedQuery) ||
          car.States?.toLowerCase().includes(lowercasedQuery) ||
          car.Brand?.toLowerCase().includes(lowercasedQuery) ||
          car.OperatingSystem?.toLowerCase().includes(lowercasedQuery) ||
          car.ScreenSize?.toLowerCase().includes(lowercasedQuery) ||
          car.Processor?.toLowerCase().includes(lowercasedQuery) ||
          car.RAM?.toLowerCase().includes(lowercasedQuery) ||
          car.StorageType?.toLowerCase().includes(lowercasedQuery) ||
          car.Storagecapacity?.toLowerCase().includes(lowercasedQuery) ||
          car.GraphicsCard?.toLowerCase().includes(lowercasedQuery) ||
          car.BatteryLife?.toLowerCase().includes(lowercasedQuery) ||
          car.DisplayQuality?.toLowerCase().includes(lowercasedQuery) ||
          car.Connectivity?.toLowerCase().includes(lowercasedQuery) ||
          car.SpecialFeatures?.toLowerCase().includes(lowercasedQuery) ||
          car.Gender?.toLowerCase().includes(lowercasedQuery) ||
          car.Size?.toLowerCase().includes(lowercasedQuery) ||
          car.Fit?.toLowerCase().includes(lowercasedQuery) ||
          car.Material?.toLowerCase().includes(lowercasedQuery) ||
          car.Color?.toLowerCase().includes(lowercasedQuery) ||
          car.StyleDesign?.toLowerCase().includes(lowercasedQuery) ||
          car.ClosureType?.toLowerCase().includes(lowercasedQuery) ||
          car.CollarType?.toLowerCase().includes(lowercasedQuery) ||
          car.SleeveLength?.toLowerCase().includes(lowercasedQuery) ||
          car.WashType?.toLowerCase().includes(lowercasedQuery) ||
          car.Features?.toLowerCase().includes(lowercasedQuery) ||
          car.Season?.toLowerCase().includes(lowercasedQuery) ||
          car.Type?.toLowerCase().includes(lowercasedQuery) ||
          car.MeasurementRange?.toLowerCase().includes(lowercasedQuery) ||
          car.Accuracy?.toLowerCase().includes(lowercasedQuery) ||
          car.CuffSize?.toLowerCase().includes(lowercasedQuery) ||
          car.DisplayType?.toLowerCase().includes(lowercasedQuery) ||
          car.BatteryType?.toLowerCase().includes(lowercasedQuery) ||
          car.Compatibility?.toLowerCase().includes(lowercasedQuery) ||
          car.StorageCapacity?.toLowerCase().includes(lowercasedQuery) ||
          car.MeasurementUnits?.toLowerCase().includes(lowercasedQuery) ||
          car.SpeedofMeasurement?.toLowerCase().includes(lowercasedQuery) ||
          car.PropertyType?.toLowerCase().includes(lowercasedQuery) ||
          car.Amenities?.toLowerCase().includes(lowercasedQuery) ||
          car.PropertyFeatures?.toLowerCase().includes(lowercasedQuery) ||
          car.BuildingType?.toLowerCase().includes(lowercasedQuery) ||
          car.Accessibility?.toLowerCase().includes(lowercasedQuery) ||
          car.TrustedCars?.toLowerCase().includes(lowercasedQuery)
      );
    }
    setLoading(false);
    if (BuildingType?.length > 0) {
      filtered = filtered.filter((car) =>
        BuildingType.includes(car.BuildingType)
      );
    }
    if (Accessibility?.length > 0) {
      filtered = filtered.filter((car) =>
        Accessibility.includes(car.Accessibility)
      );
    }
    if (ScreenSize?.length > 0) {
      filtered = filtered.filter((car) => ScreenSize.includes(car.ScreenSize));
    }
    if (PropertyFeatures?.length > 0) {
      filtered = filtered.filter((car) =>
        PropertyFeatures.includes(car.PropertyFeatures)
      );
    }
    if (Amenities?.length > 0) {
      filtered = filtered.filter((car) => Amenities.includes(car.Amenities));
    }
    if (PropertyType?.length > 0) {
      filtered = filtered.filter((car) =>
        PropertyType.includes(car.PropertyType)
      );
    }
    if (SellerType?.length > 0) {
      filtered = filtered.filter((car) => SellerType.includes(car.SellerType));
    }
    if (SpeedofMeasurement?.length > 0) {
      filtered = filtered.filter((car) =>
        SpeedofMeasurement.includes(car.SpeedofMeasurement)
      );
    }
    if (MeasurementUnits?.length > 0) {
      filtered = filtered.filter((car) =>
        MeasurementUnits.includes(car.MeasurementUnits)
      );
    }
    if (StorageCapacity?.length > 0) {
      filtered = filtered.filter((car) =>
        StorageCapacity.includes(car.StorageCapacity)
      );
    }
    if (Compatibility?.length > 0) {
      filtered = filtered.filter((car) =>
        Compatibility.includes(car.Compatibility)
      );
    }
    if (BatteryType?.length > 0) {
      filtered = filtered.filter((car) =>
        BatteryType.includes(car.BatteryType)
      );
    }
    if (DisplayType?.length > 0) {
      filtered = filtered.filter((car) =>
        DisplayType.includes(car.DisplayType)
      );
    }
    if (CuffSize?.length > 0) {
      filtered = filtered.filter((car) => CuffSize.includes(car.CuffSize));
    }
    if (Accuracy?.length > 0) {
      filtered = filtered.filter((car) => Accuracy.includes(car.Accuracy));
    }
    if (MeasurementRange?.length > 0) {
      filtered = filtered.filter((car) =>
        MeasurementRange.includes(car.MeasurementRange)
      );
    }
    if (Type?.length > 0) {
      filtered = filtered.filter((car) => Type.includes(car.Type));
    }
    if (Season?.length > 0) {
      filtered = filtered.filter((car) => Season.includes(car.Season));
    }
    if (Features?.length > 0) {
      filtered = filtered.filter((car) => Features.includes(car.Features));
    }
    if (WashType?.length > 0) {
      filtered = filtered.filter((car) => WashType.includes(car.WashType));
    }
    if (SleeveLength?.length > 0) {
      filtered = filtered.filter((car) =>
        SleeveLength.includes(car.SleeveLength)
      );
    }
    if (CollarType?.length > 0) {
      filtered = filtered.filter((car) => CollarType.includes(car.CollarType));
    }
    if (ClosureType?.length > 0) {
      filtered = filtered.filter((car) =>
        ClosureType.includes(car.ClosureType)
      );
    }
    if (StyleDesign?.length > 0) {
      filtered = filtered.filter((car) =>
        StyleDesign.includes(car.StyleDesign)
      );
    }
    if (Color?.length > 0) {
      filtered = filtered.filter((car) => Color.includes(car.Color));
    }
    if (Material?.length > 0) {
      filtered = filtered.filter((car) => Material.includes(car.Material));
    }
    if (Fit?.length > 0) {
      filtered = filtered.filter((car) => Fit.includes(car.Fit));
    }
    if (Size?.length > 0) {
      filtered = filtered.filter((car) => Size.includes(car.Size));
    }
    if (Gender?.length > 0) {
      filtered = filtered.filter((car) => Gender.includes(car.Gender));
    }
    if (SpecialFeatures?.length > 0) {
      filtered = filtered.filter((car) =>
        SpecialFeatures.includes(car.SpecialFeatures)
      );
    }
    if (Connectivity?.length > 0) {
      filtered = filtered.filter((car) =>
        Connectivity.includes(car.Connectivity)
      );
    }
    if (DisplayQuality?.length > 0) {
      filtered = filtered.filter((car) =>
        DisplayQuality.includes(car.DisplayQuality)
      );
    }
    if (BatteryLife?.length > 0) {
      filtered = filtered.filter((car) =>
        BatteryLife.includes(car.BatteryLife)
      );
    }
    if (GraphicsCard?.length > 0) {
      filtered = filtered.filter((car) =>
        GraphicsCard.includes(car.GraphicsCard)
      );
    }
    if (storagecapacity?.length > 0) {
      filtered = filtered.filter((car) =>
        storagecapacity.includes(car.Storagecapacity)
      );
    }
    if (storageType?.length > 0) {
      filtered = filtered.filter((car) =>
        storageType.includes(car.StorageType)
      );
    }
    if (RAM?.length > 0) {
      filtered = filtered.filter((car) => RAM.includes(car.RAM));
    }
    if (Processor?.length > 0) {
      filtered = filtered.filter((car) => Processor.includes(car.Processor));
    }
    // Filter by selected cities
    if (selectedOptionVideoAvailability?.length > 0) {
      filtered = filtered.filter((car) =>
        selectedOptionVideoAvailability.includes(car.VideoAvailability)
      );
    }
    if (OperatingSystem?.length > 0) {
      filtered = filtered.filter((car) =>
        OperatingSystem.includes(car.OperatingSystem)
      );
    }
    // Filter by selected cities
    if (Brand?.length > 0) {
      filtered = filtered.filter((car) => Brand.includes(car.Brand));
    }
    if (selectedStates1?.length > 0) {
      filtered = filtered.filter((car) => selectedStates1.includes(car.States));
    }
    // Filter by selected cities
    if (selectedOptionisFeatured?.length > 0) {
      filtered = filtered.filter((car) =>
        selectedOptionisFeatured.includes(car.AdType)
      );
    }
    // Filter by selected cities
    if (pictureAvailability?.length > 0) {
      filtered = filtered.filter((car) =>
        pictureAvailability.includes(car.PictureAvailability)
      );
    }
    if (selectedCheckboxSellerType?.length > 0) {
      filtered = filtered.filter((car) =>
        selectedCheckboxSellerType.includes(car.SellerType)
      );
    }
    if (selectedClassesModelCategory?.length > 0) {
      filtered = filtered.filter((car) =>
        selectedClassesModelCategory.includes(car.ModalCategory)
      );
    }
    if (selectedValuesSeatCapacity?.length > 0) {
      filtered = filtered.filter((car) =>
        selectedValuesSeatCapacity.includes(car.SeatingCapacity)
      );
    }
    // Filter by selected cities
    if (cities?.length > 0) {
      filtered = filtered.filter((car) => cities.includes(car.City));
    }
    if (selectedCarsBodyType?.length > 0) {
      filtered = filtered.filter((car) =>
        selectedCarsBodyType.includes(car.BodyType)
      );
    }
    if (selectedEngines?.length > 0) {
      filtered = filtered.filter((car) =>
        selectedEngines.includes(car.EngineType)
      );
    }
    if (selectedAssembly?.length > 0) {
      filtered = filtered.filter((car) =>
        selectedAssembly.includes(car.Assembly)
      );
    }
    // Filter by selected cities
    if (logSelectedColor?.length > 0) {
      filtered = filtered.filter((car) => logSelectedColor.includes(car.Color));
    }
    if (selectedOptionTransmission?.length > 0) {
      filtered = filtered.filter((car) =>
        selectedOptionTransmission.includes(car.Transmission)
      );
    }
    // Filter by selected cities
    if (selectedCars1?.length > 0) {
      filtered = filtered.filter((car) =>
        selectedCars1.includes(car.TrustedCars)
      );
    }
    if (selectedMercedesBenzLocations?.length > 0) {
      filtered = filtered.filter((car) =>
        selectedMercedesBenzLocations.includes(car.Registeredin)
      );
    }
    // Filter by selected Emirates
    if (emirates?.length > 0) {
      filtered = filtered.filter((car) => emirates.includes(car.Emirates));
    }

    // Filter by selected car makes
    if (selectedCarsMake?.length > 0) {
      filtered = filtered.filter((car) => selectedCarsMake.includes(car.make));
    }

    // Filter by price range
    if (fromValue || toValue) {
      filtered = filtered.filter((car) => {
        const carPrice = parseFloat(car.price); // Assuming price is a number or string
        const minPrice = fromValue ? parseFloat(fromValue) : 0; // Default to 0 if no fromValue
        const maxPrice = toValue ? parseFloat(toValue) : Infinity; // Default to Infinity if no toValue

        // Ensure that car's price is between minPrice and maxPrice
        return carPrice >= minPrice && carPrice <= maxPrice;
      });
    }
    if (SortBy === "Price: Low to High") {
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.price) || 0;
        const priceB = parseFloat(b.price) || 0;
        return priceB - priceA; // Ascending order (low to high)
      });
    }
    if (SortBy === "Price: High to Low") {
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.price) || 0;
        const priceB = parseFloat(b.price) || 0;
        return priceA - priceB; // Ascending order (low to high)
      });
    }
    if (SortBy === "Sort by: Most Relevant") {
      filtered.sort((a, b) => {
        const dateA = new Date(a.timeAgo);
        const dateB = new Date(b.timeAgo);
        return dateB.getTime() - dateA.getTime(); // Descending order (latest first)
      });
    }
    if (fromCC || toCC) {
      filtered = filtered.filter((car) => {
        const EngineCapacity = parseFloat(car.EngineCapacity); // Assuming price is a number or string
        const minPrice = fromCC ? parseFloat(fromCC) : 0; // Default to 0 if no fromValue
        const maxPrice = toCC ? parseFloat(toCC) : Infinity; // Default to Infinity if no toValue

        // Ensure that car's price is between minPrice and maxPrice
        return EngineCapacity >= minPrice && EngineCapacity <= maxPrice;
      });
    }
    if (fromValueMileage || toValueMileage) {
      filtered = filtered.filter((car) => {
        const EngineCapacity = parseFloat(car.mileage); // Assuming price is a number or string
        const minPrice = fromValueMileage ? parseFloat(fromValueMileage) : 0; // Default to 0 if no fromValue
        const maxPrice = toValueMileage ? parseFloat(toValueMileage) : Infinity; // Default to Infinity if no toValue

        // Ensure that car's price is between minPrice and maxPrice
        return EngineCapacity >= minPrice && EngineCapacity <= maxPrice;
      });
    }
    if (fromValue || toValue) {
      filtered = filtered.filter((car) => {
        const carPrice = parseFloat(car.price); // Assuming price is a number or string
        const minPrice = fromValue ? parseFloat(fromValue) : 0; // Default to 0 if no fromValue
        const maxPrice = toValue ? parseFloat(toValue) : Infinity; // Default to Infinity if no toValue

        // Ensure that car's price is between minPrice and maxPrice
        return carPrice >= minPrice && carPrice <= maxPrice;
      });
    }

    // Filter by ManufactureYear range (fromDate to toDate)
    if (fromDate || toDate) {
      filtered = filtered.filter((car) => {
        const manufactureYear = new Date(car.ManufactureYear); // Assuming ManufactureYear is in a valid date format (yyyy-mm-dd)
        const minDate = fromDate ? new Date(fromDate) : new Date("1900-01-01"); // Default to a very old date if no fromDate
        const maxDate = toDate ? new Date(toDate) : new Date(); // Default to today's date if no toDate

        // Ensure that car's manufacture year is between minDate and maxDate
        return manufactureYear >= minDate && manufactureYear <= maxDate;
      });
    }
    console.log(filtered, "REAL ESTATE");
    setFilteredCars(filtered);
    setActivePage(1);
  };

  const carListings = [
    {
      id: 1,
      title: "Mercedes Benz",
      location: "Dubai",
      year: "2022",
      mileage: "6,000km",
      fuel: "Petrol",
      transmission: "Automatic",
      price: "$350",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-18%20at%2012.17.13%20AM-9swmdy24UAjXDGPDqNLHRFu1i77caw.jpeg",
      featured: true,
    },
    // More listings can be added here
  ];

  const [selectedCars, setSelectedCars] = useState(["Mercedes-Benz"]);

  const handleCarSelection = (brand) => {
    setSelectedCars((prev) =>
      prev.includes(brand)
        ? prev.filter((car) => car !== brand)
        : [...prev, brand]
    );
  };

  const handleClose = () => {
    setIsVisible(false);
  };
  const handleDropdownClick = () => {
    setShowSuggestions(!showSuggestions);
  };
  const headingStyle = {
    backgroundColor: "#2D4495",
    color: "white",
    fontSize: "30px",
    padding: "2px",
    borderRadius: "1%",
  };

  return (
    <>
      <div className="main-wrapper">
        <Header parms={parms} />
        <div className="main-wrapper">
          <Header />
          <section className="category-section" style={{ padding: "0px" }}>
            <div className="container">
              <div className="allMedia_Icons d-none d-md-flex">
                <div>
                  <img src={xIcon} alt="Xicon" />
                </div>
                <div>
                  <img src={insta} alt="instagram" />
                </div>
                <div>
                  <img src={fb} alt="facebook" />
                </div>
                <div>
                  <img src={tiktok} alt="tiktok" />
                </div>
                <div>
                  <img src={whatapp} alt="whatsapp" />
                </div>
              </div>
            </div>
          </section>

        </div>
        <Container
          className="parent-main"
          style={{
            paddingLeft: "2px", // Padding on the left side
            paddingRight: "2px", // Padding on the right side
            color: "black", // Text color
            maxWidth: "1530px", // Optional: Add max-width to ensure padding is visible
            margin: "0 auto", // Optional: Center the container if desired
            marginTop: window.innerWidth <= 576 ? "9rem" : "13rem",

          }}
        >
          <div
            className="adsCategory_head"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginLeft: window.innerWidth <= 576 ? "0.7rem" : "7.7%",
              marginTop: "40px",
              alignItems: "center",
            }}
          >
            <button
              className="btn"
              style={{
                background: "#E9EEFF",
                fontWeight: "500",
                pointerEvents: "none",
                padding: "10px 15px",
              }}
            >
              Home
            </button>
            <span>
              <MdKeyboardArrowRight />
            </span>

            <button
              className="btn"
              style={{
                background: "#E9EEFF",
                fontWeight: "500",
                pointerEvents: "none",
                padding: "10px 15px",
              }}
            >
              Apartment
            </button>
            <span>
              <MdKeyboardArrowRight />
            </span>

            <button
              className="btn"
              style={{
                background: "#E9EEFF",
                fontWeight: "500",
                pointerEvents: "none",
                padding: "10px 15px",
              }}
            >
              All Cities
            </button>
            <span>
              <MdKeyboardArrowRight />
            </span>

            <button
              className="btn"
              style={{
                background: "#E9EEFF",
                fontWeight: "500",
                pointerEvents: "none",
                padding: "10px 15px",
              }}
            >
              Used Apartment for Sale
            </button>
            <span>
              <MdKeyboardArrowRight />
            </span>

            <button
              className="btn"
              style={{
                background: "#E9EEFF",
                fontWeight: "500",
                pointerEvents: "none",
                padding: "10px 15px",
              }}
            >
              Modern Apartment in Downtown
            </button>
          </div>

          <div>
            <h1
              style={{ marginLeft: window.innerWidth <= 576 ? "0.7rem" : "7.7%", marginTop: "20px", fontSize: "24px" }}
            >
              Used Blood Pressure Monitor for Sale
            </h1>
          </div>

          <div
            className="CategoryInfodiv_btn2container"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginLeft: window.innerWidth <= 576 ? "0.7rem" : "7.7%",
              marginBottom: "40px",
              marginTop: "20px",
            }}
          >
            <button
              onClick={() => {
                navigate("/AutomotiveComp");
              }}
              className="head2btn"
              style={{
                backgroundColor: "white",
                border: "1px solid #2D4495",
                padding: "10px 15px",
                textAlign: "center",
              }}
            >
              Cars
            </button>
            <button
              onClick={() => {
                navigate("/JobBoard");
              }}
              className="head2btn"
              style={{
                backgroundColor: "white",
                border: "1px solid #2D4495",
                padding: "10px 15px",
                textAlign: "center",
              }}
            >
              Jobs
            </button>
            <button
              onClick={() => {
                navigate("/RealEstateComp");
              }}
              className="head2btn"
              style={{
                backgroundColor: "white",
                border: "1px solid #2D4495",
                padding: "10px 15px",
                textAlign: "center",
              }}
            >
              Real Estate for Rent
            </button>
            <button
              className="head2btn"
              style={{
                backgroundColor: "white",
                border: "1px solid #2D4495",
                padding: "10px 15px",
                textAlign: "center",
              }}
            >
              Home & Garden
            </button>
            <button
              onClick={() => {
                navigate("/ElectronicComp");
              }}
              className="head2btn"
              style={{
                backgroundColor: "white",
                border: "1px solid #2D4495",
                padding: "10px 15px",
                textAlign: "center",
              }}
            >
              Electronics
            </button>
          </div>
        </Container>
        <Container
          fluid
          style={{
            paddingLeft: "10px", // Padding on the left side
            paddingRight: "1px", // Padding on the right side
            color: "black", // Text color
            maxWidth: "1300px", // Optional: Add max-width to ensure padding is visible
            margin: "0 auto", // Optional: Center the container if desired
            marginLeft: window.innerWidth <= 576 ? "-0.3rem" : "16%",
          }}
        >
          <Row>
            {/* Sidebar */}
            <Col md={3} className="bg-light p-3 style={{ height: '200px' }}">
              <h5
                style={{
                  borderTopLeftRadius: "5px",
                  borderTopRightRadius: "5px",
                  backgroundColor: "#2D4495",
                  color: "white",
                  width: "auto",
                  height: "49.66px",
                  paddingLeft: "6px",
                  paddingTop: "6px",
                }}
              >
                Show Results by:
              </h5>

              <Form>
                <Row className="my-3">
                  <Col>
                    <Form.Label
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        paddingLeft: "8px",
                      }}
                    >
                      Search by Keywords
                    </Form.Label>
                    <div className="position-relative">
                      <input
                        type="search"
                        placeholder="E.g. Apartment in America"
                        className="form-control rounded-pill pe-5"
                        id="example-search-input"
                        value={searchQuery} // Bind value to searchQuery state
                        onChange={handleSearchChange} // Call the handler on input change
                      />
                      <FaSearch
                        className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                        style={{ pointerEvents: "none" }}
                      />
                    </div>
                  </Col>
                </Row>
                {/*  -------------                          */}
                <style>{`
    .form-check-input:checked {
      background-color: #2D4495 !important; 
      border-color: black !important; 
    }
  `}</style>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Select City</Accordion.Header>
                    <Accordion.Body>
                      <Form.Group className="mb-3">
                        <div className="p-4">
                          <h2 className="text-lg font-bold mb-2">
                            Select a Country
                          </h2>

                          <Select
                            options={countryOptions}
                            value={selectedCountry}
                            onChange={handleCountryChange}
                            placeholder="Select a country..."
                            isClearable
                            className="w-full mb-4"
                          />

                          {selectedCountry && cities.length > 0 && (
                            <div className="mt-4">
                              <h3 className="text-md font-semibold mb-2">
                                Cities in {selectedCountry.label}
                              </h3>
                              <Select
                                options={cities.map((city) => ({
                                  value: city.name,
                                  label: city.name,
                                }))}
                                isMulti
                                onChange={handleCityChange}
                                value={cities
                                  .filter((city) =>
                                    selectedCities.includes(city.name)
                                  )
                                  .map((city) => ({
                                    value: city.name,
                                    label: city.name,
                                  }))}
                                placeholder="Select cities..."
                                className="w-full"
                              />
                            </div>
                          )}
                        </div>

                      
                      </Form.Group>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <hr
                  style={{
                    width: "100%",
                    height: "0px",
                    top: "1310.01px",
                    left: "239.88px",
                    gap: "0px",
                    borderTop: "1px solid #000000",
                    opacity: "0.5", // Adjust opacity for visibility
                    transform: "rotate(0deg)",
                    margin: "20px 0",
                    borderColor: "#000000", // Set border color to black
                  }}
                />
                {/*      ----------               */}
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>States </Accordion.Header>
                    <Accordion.Body>
                      <Form.Group className="mb-3">
                        {selectedCountry && states.length > 0 ? (
                          <div className="mt-4">
                            <h3 className="text-md font-semibold mb-2">
                              States in {selectedCountry.label}
                            </h3>
                            <Select
                              options={states.map((state) => ({
                                value: state.isoCode,
                                label: state.name,
                              }))}
                              isMulti
                              onChange={handleStateChange1}
                              value={states
                                .filter((state) =>
                                  selectedStates1.includes(state.name)
                                )
                                .map((state) => ({
                                  value: state.isoCode,
                                  label: state.name,
                                }))}
                              placeholder="Select states..."
                              className="w-full"
                            />
                          </div>
                        ) : (
                          <spna style={{ color: "red" }}>
                            Please select country
                          </spna>
                        )}
                      </Form.Group>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <hr
                  style={{
                    width: "100%",
                    height: "0px",
                    top: "1310.01px",
                    left: "239.88px",
                    gap: "0px",
                    borderTop: "1px solid #000000",
                    opacity: "0.5", // Adjust opacity for visibility
                    transform: "rotate(0deg)",
                    margin: "20px 0",
                    borderColor: "#000000", // Set border color to black
                  }}
                />
                {/*--------------------------------------*/}

                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Property Type</Accordion.Header>
                    <Accordion.Body>
                      <Form.Group className="mb-3">
                        {/* Checkbox Selection */}
                        <div style={{ maxWidth: "300px", marginTop: "20px" }}>
                          {[
                            "House",
                            "Apartment",
                            "Townhouse",
                            "Condo",
                            "Studio",
                          ].map((car, index) => (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "8px 0",
                              }}
                            >
                              <Form.Check
                                type="checkbox"
                                label={car}
                                name={car} // Use the name attribute for identification
                                onChange={handleCheckboxChangePropertyType}
                                // defaultChecked={car === "Nissan"} // Pre-check Nissan
                              />
                              <span
                                style={{ fontWeight: "bold", color: "#333" }}
                              >
                                12345
                              </span>
                            </div>
                          ))}
                        </div>
                      </Form.Group>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <hr
                  style={{
                    width: "100%",
                    height: "0px",
                    top: "1310.01px",
                    left: "239.88px",
                    gap: "0px",
                    borderTop: "1px solid #000000",
                    opacity: "0.5", // Adjust opacity for visibility
                    transform: "rotate(0deg)",
                    margin: "20px 0",
                    borderColor: "#000000", // Set border color to black
                  }}
                />

                {/*                  */}

                <Accordion className="mt-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Price Range</Accordion.Header>
                    <Accordion.Body>
                      <Form.Group className="mb-3">
                        <Row>
                          <Col>
                            <Form.Control
                              type="number"
                              placeholder="From"
                              value={fromValue}
                              onChange={handleFromChange}
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              type="number"
                              placeholder="To"
                              value={toValue}
                              onChange={handleToChange}
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <hr
                  style={{
                    width: "100%",
                    height: "0px",
                    top: "1310.01px",
                    left: "239.88px",
                    gap: "0px",
                    borderTop: "1px solid #000000",
                    opacity: "0.5", // Adjust opacity for visibility
                    transform: "rotate(0deg)",
                    margin: "20px 0",
                    borderColor: "#000000", // Set border color to black
                  }}
                />

                <Accordion className="mt-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Type</Accordion.Header>
                    <Accordion.Body>
                      <div style={{ maxWidth: "300px", margin: "20px" }}>
                        <Form.Group>
                          {[
                            "Upper arm monitor",
                            "Wrist monitor",
                            "Finger monitor",
                          ].map((engine, index) => (
                            <div
                              key={engine}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "8px 0",
                              }}
                            >
                              <Form.Check
                                type="checkbox"
                                label={engine}
                                // defaultChecked={engine === "V8 Engine"}
                                onChange={() =>
                                  handleCheckboxChangeType(engine)
                                }
                              />
                              <span
                                style={{ fontWeight: "bold", color: "#333" }}
                              >
                                12345
                              </span>
                            </div>
                          ))}
                        </Form.Group>
                        <p style={{ color: "#2D4495" }}>More choices</p>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <hr
                  style={{
                    width: "100%",
                    height: "0px",
                    top: "1310.01px",
                    left: "239.88px",
                    gap: "0px",
                    borderTop: "1px solid #000000",
                    opacity: "0.5", // Adjust opacity for visibility
                    transform: "rotate(0deg)",
                    margin: "20px 0",
                    borderColor: "#000000", // Set border color to black
                  }}
                />

                <Accordion className="mt-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header> Size</Accordion.Header>
                    <Accordion.Body>
                      <div style={{ maxWidth: "300px", margin: "20px" }}>
                        <Form.Group>
                          {["500–1,500 sq. ft.", "1,500–3,000 sq. ft."].map(
                            (engine) => (
                              <div
                                key={engine}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "8px 0",
                                }}
                              >
                                <Form.Check
                                  type="checkbox"
                                  label={engine}
                                  name={engine} // Set the name attribute
                                  checked={Size.includes(engine)} // Control the checked state
                                  onChange={handleCheckboxChangeSize} // Pass the event object
                                />
                                <span
                                  style={{ fontWeight: "bold", color: "#333" }}
                                >
                                  12345
                                </span>
                              </div>
                            )
                          )}
                        </Form.Group>
                        <p style={{ color: "#2D4495" }}>More choices</p>
                      </div>
                      ;
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <hr
                  style={{
                    width: "100%",
                    height: "0px",
                    top: "1310.01px",
                    left: "239.88px",
                    gap: "0px",
                    borderTop: "1px solid #000000",
                    opacity: "0.5", // Adjust opacity for visibility
                    transform: "rotate(0deg)",
                    margin: "20px 0",
                    borderColor: "#000000", // Set border color to black
                  }}
                />

                <Accordion className="mt-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header> Amenities</Accordion.Header>
                    <Accordion.Body>
                      <div style={{ maxWidth: "300px", margin: "20px" }}>
                        <Form.Group>
                          {[
                            "Parking space",
                            "Gym",
                            "Swimming pool",
                            "Pet-friendly",
                            "Balcony or terrace",
                          ].map((engine) => (
                            <div
                              key={engine}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "8px 0",
                              }}
                            >
                              <Form.Check
                                type="checkbox"
                                label={engine}
                                name={engine} // Set the name attribute
                                checked={Amenities.includes(engine)} // Control the checked state
                                onChange={handleCheckboxChangeAmenities} // Pass the event object
                              />
                              <span
                                style={{ fontWeight: "bold", color: "#333" }}
                              >
                                12345
                              </span>
                            </div>
                          ))}
                        </Form.Group>
                        <p style={{ color: "#2D4495" }}>More choices</p>
                        <div>
                          <strong>Selected Amenities:</strong>{" "}
                          {Amenities.join(", ")}
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                <hr
                  style={{
                    width: "100%",
                    height: "0px",
                    top: "1310.01px",
                    left: "239.88px",
                    gap: "0px",
                    borderTop: "1px solid #000000",
                    opacity: "0.5", // Adjust opacity for visibility
                    transform: "rotate(0deg)",
                    margin: "20px 0",
                    borderColor: "#000000", // Set border color to black
                  }}
                />

                <Accordion className="mt-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header> Property Features</Accordion.Header>
                    <Accordion.Body>
                      <div style={{ maxWidth: "300px", margin: "20px" }}>
                        <Form.Group>
                          {[
                            "Year built",
                            "Unfurnished",
                            "Furnished",
                            "Smart home",
                          ].map((engine) => (
                            <div
                              key={engine}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "8px 0",
                              }}
                            >
                              <Form.Check
                                type="checkbox"
                                label={engine}
                                name={engine} // Set the name attribute
                                checked={PropertyFeatures.includes(engine)} // Control the checked state
                                onChange={handleCheckboxChangePropertyFeatures} // Pass the event object
                              />
                              <span
                                style={{ fontWeight: "bold", color: "#333" }}
                              >
                                12345
                              </span>
                            </div>
                          ))}
                        </Form.Group>
                        <p style={{ color: "#2D4495" }}>More choices</p>
                        <div>
                          <strong>Selected Amenities:</strong>{" "}
                          {Amenities.join(", ")}
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <hr
                  style={{
                    width: "100%",
                    height: "0px",
                    top: "1310.01px",
                    left: "239.88px",
                    gap: "0px",
                    borderTop: "1px solid #000000",
                    opacity: "0.5", // Adjust opacity for visibility
                    transform: "rotate(0deg)",
                    margin: "20px 0",
                    borderColor: "#000000", // Set border color to black
                  }}
                />

                <Accordion className="mt-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header> Building Type</Accordion.Header>
                    <Accordion.Body>
                      <div style={{ maxWidth: "300px", margin: "20px" }}>
                        <Form.Group>
                          {[
                            "Single-family",
                            "Multi-family",
                            "High-rise",
                            "Low Rise",
                          ].map((engine) => (
                            <div
                              key={engine}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "8px 0",
                              }}
                            >
                              <Form.Check
                                type="checkbox"
                                label={engine}
                                name={engine} // Set the name attribute
                                checked={BuildingType.includes(engine)} // Control the checked state
                                onChange={handleCheckboxChangeBuildingType} // Pass the event object
                              />
                              <span
                                style={{ fontWeight: "bold", color: "#333" }}
                              >
                                12345
                              </span>
                            </div>
                          ))}
                        </Form.Group>
                        <p style={{ color: "#2D4495" }}>More choices</p>
                        <div>
                          <strong>Selected Amenities:</strong>{" "}
                          {Amenities.join(", ")}
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <hr
                  style={{
                    width: "100%",
                    height: "0px",
                    top: "1310.01px",
                    left: "239.88px",
                    gap: "0px",
                    borderTop: "1px solid #000000",
                    opacity: "0.5", // Adjust opacity for visibility
                    transform: "rotate(0deg)",
                    margin: "20px 0",
                    borderColor: "#000000", // Set border color to black
                  }}
                />

                <Accordion className="mt-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header> Accessibility</Accordion.Header>
                    <Accordion.Body>
                      <div style={{ maxWidth: "300px", margin: "20px" }}>
                        <Form.Group>
                          {["Elevator availability", "Wheelchair access"].map(
                            (engine) => (
                              <div
                                key={engine}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "8px 0",
                                }}
                              >
                                <Form.Check
                                  type="checkbox"
                                  label={engine}
                                  name={engine} // Set the name attribute
                                  checked={Accessibility.includes(engine)} // Control the checked state
                                  onChange={handleCheckboxChangeAccessibility} // Pass the event object
                                />
                                <span
                                  style={{ fontWeight: "bold", color: "#333" }}
                                >
                                  12345
                                </span>
                              </div>
                            )
                          )}
                        </Form.Group>
                        <p style={{ color: "#2D4495" }}>More choices</p>
                        <div>
                          <strong>Selected Amenities:</strong>{" "}
                          {Amenities.join(", ")}
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                <hr
                  style={{
                    width: "100%",
                    height: "0px",
                    top: "1310.01px",
                    left: "239.88px",
                    gap: "0px",
                    borderTop: "1px solid #000000",
                    opacity: "0.5", // Adjust opacity for visibility
                    transform: "rotate(0deg)",
                    margin: "20px 0",
                    borderColor: "#000000", // Set border color to black
                  }}
                />

                <Accordion className="mt-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header> Seller Type</Accordion.Header>
                    <Accordion.Body>
                      <div style={{ maxWidth: "300px", margin: "20px" }}>
                        <Form.Group>
                          {[
                            "Direct owner",
                            "Real estate agent",
                            "Developer",

                            "Marketplace",
                          ].map((engine, index) => (
                            <div
                              key={engine}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "8px 0",
                              }}
                            >
                              <Form.Check
                                type="checkbox"
                                label={engine}
                                // defaultChecked={engine === "V8 Engine"}
                                onChange={() =>
                                  handleCheckboxChangeSellerType(engine)
                                }
                              />
                              <span
                                style={{ fontWeight: "bold", color: "#333" }}
                              >
                                12345
                              </span>
                            </div>
                          ))}
                        </Form.Group>
                        <p style={{ color: "#2D4495" }}>More choices</p>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                <hr
                  style={{
                    width: "100%",
                    height: "0px",
                    top: "1310.01px",
                    left: "239.88px",
                    gap: "0px",
                    borderTop: "1px solid #000000",
                    opacity: "0.5", // Adjust opacity for visibility
                    transform: "rotate(0deg)",
                    margin: "20px 0",
                    borderColor: "#000000", // Set border color to black
                  }}
                />

                <hr
                  style={{
                    width: "100%",
                    height: "1px",
                    borderTop: "1px solid #000000",
                    opacity: "0.5", // Adjust opacity for visibility
                    margin: "20px 0",
                    borderColor: "#000000", // Set border color to black
                  }}
                />

                <Accordion className="mt-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Picture Availability</Accordion.Header>
                    <Accordion.Body>
                      <div style={{ maxWidth: "300px", margin: "20px" }}>
                        <Form.Group>
                          {/* Local Checkbox */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "8px 0",
                            }}
                          >
                            <Form.Check
                              type="checkbox"
                              label="With Pictures"
                              onChange={handleCheckboxChangePictureAvailability}
                              checked={pictureAvailability === "With Pictures"}
                            />
                            <span style={{ fontWeight: "bold", color: "#333" }}>
                              12345
                            </span>
                          </div>
                        </Form.Group>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <hr
                  style={{
                    width: "100%",
                    height: "1px",
                    borderTop: "1px solid #000000",
                    opacity: "0.5", // Adjust opacity for visibility
                    margin: "20px 0",
                    borderColor: "#000000", // Set border color to black
                  }}
                />

                <Accordion className="mt-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Video Availability</Accordion.Header>
                    <Accordion.Body>
                      <div style={{ maxWidth: "300px", margin: "20px" }}>
                        <Form.Group>
                          {/* Local Checkbox */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "8px 0",
                            }}
                          >
                            <Form.Check
                              type="checkbox"
                              label="With Video"
                              onChange={handleCheckboxChangeVideoAvailability}
                              checked={
                                selectedOptionVideoAvailability === "With Video"
                              }
                            />
                            <span style={{ fontWeight: "bold", color: "#333" }}>
                              12345
                            </span>
                          </div>
                        </Form.Group>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <hr
                  style={{
                    width: "100%",
                    height: "1px",
                    borderTop: "1px solid #000000",
                    opacity: "0.5", // Adjust opacity for visibility
                    margin: "20px 0",
                    borderColor: "#000000", // Set border color to black
                  }}
                />

                <Accordion className="mt-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Ad Type</Accordion.Header>
                    <Accordion.Body>
                      <div style={{ maxWidth: "300px", margin: "20px" }}>
                        <Form.Group>
                          {/* Local Checkbox */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "8px 0",
                            }}
                          >
                            <Form.Check
                              type="checkbox"
                              label="Featured Ad"
                              onChange={handleCheckboxChangeisFeatured}
                              checked={
                                selectedOptionisFeatured === "Featured Ad"
                              }
                            />
                            <span style={{ fontWeight: "bold", color: "#333" }}>
                              12345
                            </span>
                          </div>
                        </Form.Group>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                {/*-------------------------------------*/}
              </Form>
            </Col>

            <Col md={9} className="p-3">
              <Row className="mb-3">
                <Col>
                  <Form.Check type="checkbox" label="With Photos" />
                </Col>
                <Col>
                  <Form.Check type="checkbox" label="With Price" />
                </Col>
                <Col xs={12} sm={6} md={4} className="text-end">
                  <Form.Select
                    aria-label="Sort options"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setSortBy(e.target.value);
                    }}
                  >
                    <option>Sort by: Most Relevant</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </Form.Select>
                </Col>
              </Row>
              <div>
                {loading ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "100vh" }}
                  >
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                ) : filteredCars.length > 0 ? (
                  getPaginatedCars().map((car, index) => {

                    const isActive = activePhoneIndex === index;

                    return (
                    <Card key={index} className="mt-3">
                      <Row className="g-0">
                        <Col md={4} style={{ position: "relative" }}>
                          {/* Featured Label */}
                          <div
                            style={{
                              position: "absolute",
                              top: "10px",
                              left: "10px",
                              backgroundColor: "#36A680",
                              color: "white",
                              padding: "5px 10px",
                              fontWeight: "bold",
                              borderRadius: "5px",
                              zIndex: 2, // Ensure it's above the image
                            }}
                          >
                            Featured
                          </div>

                          {/* Heart Icon */}
                          <div
                            style={{
                              position: "absolute",
                              top: "11%",
                              left: "90%",
                              transform: "translate(-50%, -50%)",
                              borderRadius: "50%",
                              padding: "10px",
                              zIndex: 3,
                              cursor: "pointer",
                            }}
                            onClick={() => toggleBookmark(car.id)}
                          >
                            <FaHeart
                               style={{
                                color:
                                  car.bookmarked === true &&
                                  car.userId === userId
                                    ? "red"
                                    : "gray",
                                fontSize: "30px",
                              }}
                            />
                          </div>
                          {popoverCarId === car.id && (
    <div
      style={{
        position: "absolute",
        top: "-30px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#333",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: "5px",
        fontSize: "14px",
        whiteSpace: "nowrap",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      Please log in to bookmark
    </div>
  )}
                          <Link
                            //  to={`/car-details/${ad.id}`}
                            to={`/Dynamic_Route?id=${car.id}&callingFrom=RealEstateComp`}
                          >
                            {/* Image */}
                            <Card.Img
                              src={
                                car.galleryImages[0] ||
                                "https://via.placeholder.com/150"
                              }
                              alt={car.title || "Car"}
                              style={{
                                width: "100%", // Make the image responsive
                                height: "250px",
                                borderTopLeftRadius: "20px",
                                borderBottomLeftRadius: "20px",
                              }}
                            />
                          </Link>
                        </Col>

                        <Col md={8}>
                          <Card.Body>
                            <Card.Title style={{ color: "#2D4495" }}>
                              {car.title || "Car"}
                            </Card.Title>
                            <Card.Text>
                              <small
                                className="text-muted"
                                style={{ color: "black" }}
                              >
                                <i
                                  className="fas fa-map-marker-alt"
                                  style={{
                                    marginRight: "5px",
                                    color: "#6c757d",
                                  }}
                                ></i>
                                <span style={{ color: "black" }}>
                                  {car.City || "Location"}
                                </span>
                              </small>
                              <br />
                              {/* <small style={{ color: "black" }}>
                                {car.BuildingType || "BuildingType"} |{" "}
                                {car.PropertyFeatures || "PropertyFeatures"} |{" "}
                                {car.PropertyType || "PropertyType"} |{" "}
                                {car.Size || "Size"}
                              </small> */}
                              <br />
                              {car.description || "Description not available."}
                            </Card.Text>

                            <Col
                              className="align-items-center"
                              style={{ position: "relative" }}
                            >
                              {/* Price displayed above the image */}
                              <p
                                style={{
                                  position: "absolute",
                                  top: "-110px", // Adjust the top margin to place the price higher
                                  left: "500px",
                                  fontWeight: "bold",
                                  fontSize: "20px",
                                  zIndex: 2, // Ensure the price text stays above the image
                                  color: "#2D4495",
                                }}
                              >
                                {car.Price
                                  ? `$${car.Price}`
                                  : "Price not available"}
                              </p>

                              {/* Small Image on the Right with Top Margin */}
                              <div>
                                {loading ? (
                                  <p>Loading...</p>
                                ) : (
                                  ads.map((car) => (
                                    <div
                                    style={{
                                      position: "absolute",
                                      top: "-70px", // Adjust the top margin to place the price higher
                                      left: "500px",
                                      fontWeight: "bold",
                                      fontSize: "20px",
                                      zIndex: 2, // Ensure the price text stays above the image
                                      color: "#2D4495",
                                    }} >            
                      <img
                        src={profile}
                        alt="Profile"
                        className="img-fluid rounded-circle"
                      />
                  </div>
                                  ))
                                )}
                              </div>

                              {/* Updated text at the bottom-right corner */}
                              <p
                                style={{
                                  position: "absolute",
                                  right: "5px",
                                  marginTop: window.innerWidth <= 576 ? "35px" : "54px",
                                  marginLeft: window.innerWidth <= 576 ? "10rem" : "0rem",
                                  color: "black",
                                }}
                              >
                                Updated about {timeAgo(car.createdAt)}
                              </p>

                              {/* Responsive layout for small screens */}
                              <div
                                className="d-block d-sm-none"
                                style={{
                                  position: "relative",
                                  marginTop: "10px",
                                }}
                              >
                                {/* Price for small screens */}
                                <p
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                    marginBottom: "5px",
                                  }}
                                >
                                  {car.price
                                    ? `$${car.price}`
                                    : "Price not available"}
                                </p>

                                {/* Small Image for small screens */}
                                <Card.Img
                                  src={
                                    car.img || "https://via.placeholder.com/150"
                                  }
                                  alt={car.title || "Car"}
                                  style={{
                                    width: "120px", // Adjust size for small screens
                                    height: "60px",
                                    objectFit: "cover",
                                    borderRadius: "6px",
                                  }}
                                />
                              </div>
                            </Col>

                            {/* Responsive Grid for Small Screens */}
                            <div className="d-flex align-items-center gap-2 mt-3 innerContainer2 head2btflex">
   {/* Call Now Button */}
  <a href={`tel:${car.Phone}`}>
    <button
      className={`sign-in-button ${isActive ? "expanded" : ""}`}
      style={{ marginTop: window.innerWidth <= 576 ? "15px" : "50px",width: window.innerWidth <= 576 ? "150px" : "90px",  }}
      onClick={(e) => {
        if (!isActive) {
          e.preventDefault(); // Only prevent if not active
          setActivePhoneIndex(index);
        }
      }}
    >
      <FaPhoneAlt />
      <span className="fw-semibold">
        {isActive ? car.Phone : "Call Now"}
      </span>
    </button>
  </a>

  {/* Message Button */}
  <button
    className={`sign-in-button ${isActive ? "icon-only" : ""}`}
    style={{ marginTop: window.innerWidth <= 576 ? "15px" : "50px",width: window.innerWidth <= 576 ? "150px" : "90px",  }}
    onClick={() => setShowModal(true)}
  >
    <MdMessage />
    <span className="button-text">Message</span>
  </button>
  {/* WhatsApp Button */}
  <a
    href={`https://wa.me/${car.whatsapp}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <button
      className={`sign-in-button ${isActive ? "icon-only" : ""}`}
      style={{ marginTop: window.innerWidth <= 576 ? "15px" : "50px",width: window.innerWidth <= 576 ? "150px" : "90px",  }}
    >
      <FaWhatsapp />
      <span className="button-text">WhatsApp</span>
    </button>
  </a>

 
  <button className={`sign-in-button`}
                                    style={{
                                      border: "1px solid #2D4495",
                                      backgroundColor: "white",
                                      borderRadius: "5px",
                                      cursor: "pointer",
                                      color: "#2D4495",
                                      width: "fit-content",
                                      height: "fit-content",
                                      padding: "8px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      margin: "5px",
                                      marginRight: window.innerWidth <= 576 ? "20px" : "60px",

                                      marginTop: window.innerWidth <= 576 ? "15px" : "50px",


                                      
                                    }}
                                  >
                                    {/* <FaHeart
                              style={{
                                color:  "white",
                                fontSize: "30px",
                              }}
                            />{" "} */}
                                    <FaRegHeart
                                      onClick={() => toggleBookmark(car.id)}
                                      style={{
                                        color:
                                          car.bookmarked === true &&
                                          car.userId === userId
                                            ? "red"
                                            : "#2D4495",
                                        fontSize: "20px",

                                      }}
                                    />
                                  </button>

  {/* Consolidated styles for all buttons */}
  <style jsx>{`
    .sign-in-button {
      background-color: #0055a5; /* Blue background color matching the image */
      color: white; /* White text color */
      font-size: 12px; /* Approximate font size */
      font-weight: bold; /* Bold text */
      // width: 90px; /* Default fixed width */
      height: 40px; /* Fixed height */
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
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  )})
                ) : (
                  "No Record Found"
                )}
              </div>
              <div className="d-flex align-items-center justify-content-center my-4">
                <Button
                  variant="outline-primary"
                  className="d-flex align-items-center mx-2"
                  disabled={activePage === 1}
                  onClick={() => handlePageClick(activePage - 1)}
                >
                  <FaArrowLeft className="me-1" /> Previous
                </Button>

                <ButtonGroup>{renderPageNumbers()}</ButtonGroup>

                <Button
                  variant="outline-primary"
                  className="d-flex align-items-center mx-2"
                  disabled={activePage === totalPages}
                  onClick={() => handlePageClick(activePage + 1)}
                >
                  Next <FaArrowRight className="ms-1" />
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div
        className="container-parent"
        style={{
          color: "black",
          maxWidth: "100%", // Ensure content fits screen width
          margin: "0 auto",
          marginLeft: window.innerWidth <= 576 ? "-3.5rem" : "-1rem",
          marginTop: window.innerWidth <= 576 ? "-2.5rem" : "0rem",

          height: "auto", // Allow height to adjust dynamically
          paddingLeft: "16%", // Adjusted padding for responsiveness
          paddingRight: "5%",
          paddingTop: "20px",
          paddingBottom: "30px",
        }}
      >
        <div
          className="cars data"
          style={{ paddingLeft: "20px", paddingRight: "20px" }}
        >
          <h2>Apartment for Sale in Newyork</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur. Lacus lacus est praesent
            gravida quam urna arcu integer. Semper vitae velit sed quisque felis
            sed in. Quis vulputate euismod consequat feugiat vulputate fames.
            Vitae arcu eu et non tristique diam viverra purus vel. Tortor amet
            tristique proin turpis massa potenti. Quisque nullam velit sem
            semper ultrices odio. Egestas feugiat nec id aenean.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur. Lacus lacus est praesent
            gravida quam urna arcu integer. Semper vitae velit sed quisque felis
            sed in. Quis vulputate euismod consequat feugiat vulputate fames.
            Vitae arcu eu et non tristique diam viverra purus vel. Tortor amet
            tristique proin turpis massa potenti. Quisque nullam velit sem
            semper ultrices odio. Egestas feugiat nec id aenean.
          </p>
          <h2>Used Apartment for Sale in Newyork</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur. Lacus lacus est praesent
            gravida quam urna arcu integer. Semper vitae velit sed quisque felis
            sed in. Quis vulputate euismod consequat feugiat vulputate fames.
            Vitae arcu eu et non tristique diam viverra purus vel. Tortor amet
            tristique proin turpis massa potenti. Quisque nullam velit sem
            semper ultrices odio. Egestas feugiat nec id aenean.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur. Lacus lacus est praesent
            gravida quam urna arcu integer. Semper vitae velit sed quisque felis
            sed in. Quis vulputate euismod consequat feugiat vulputate fames.
            Vitae arcu eu et non tristique diam viverra purus vel. Tortor amet
            tristique proin turpis massa potenti. Quisque nullam velit sem
            semper ultrices odio. Egestas feugiat nec id aenean.
          </p>
          <h2>Browse More Used Apartment</h2>
          <p style={{ color: "#2d4fad" }}>View Apartment by Cities</p>
          <Row style={{ color: "#2d4fad" }}>
            <Col sm={3}>
              <div>Newyork (123456)</div>
              <div>Newyork (123456)</div>
              <div>Newyork (123456)</div>
              <div>Newyork (123456)</div>
            </Col>
            <Col sm={3}>
              <div>Newyork (123456)</div>
              <div>Newyork (123456)</div>
              <div>Newyork (123456)</div>
              <div>Newyork (123456)</div>
            </Col>
            <Col sm={3}>
              <div>Newyork (123456)</div>
              <div>Newyork (123456)</div>
              <div>Newyork (123456)</div>
              <div>Newyork (123456)</div>
            </Col>
            <Col sm={3}>
              <div>Newyork (123456)</div>
              <div>Newyork (123456)</div>
              <div>Newyork (123456)</div>
              <div>Newyork (123456)</div>
            </Col>
          </Row>
        </div>
      </div>
      <ComercialsAds />
      <LatestBlog />
      <Footer />
    </>
  );
};

export default RealEstateComp;
