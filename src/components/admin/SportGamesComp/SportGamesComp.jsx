import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"; // Import Link from react-router-dom
import Header from "../../home/header"; // Ensure Header is correctly implemented and imported
import Footer from "../../home/footer/Footer";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import { MdKeyboardArrowRight } from "react-icons/md";
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
import Chat from "../../../components/admin/dyanmic_route/upperHeader/Chat";
import Loading1 from "../../../../public/Progress circle.png";
import WindowedSelect from "react-windowed-select";
import cityData from "../../../City.json";
import locationData from "../../../Location.json";
import image1 from "../../../assets/img/banner/bannerimage1.png";
import image3 from "../../../assets/img/banner/bannerimage3.png";
import image4 from "../../../assets/img/banner/bannerimage4.png";
import Mesagedeals from "../../../components/userPages/mesagedeals";

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
import useSearchStore from "../../../store/searchStore"; // adjust the path

const SPORTSGAMESComp = () => {
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
  const [activePhoneIndex, setActivePhoneIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [receiverId, setReceiverId] = useState(null);

  const user = auth.currentUser;
  const currentUserId = user?.uid;
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
  const [SubjectCategories, setSubjectCategories] = useState(""); // Search query for title and city
  const [SkillLevel, setSkillLevel] = useState(""); // Search query for title and city
  const [ContentType, setContentType] = useState(""); // Search query for title and city
  const [Language, setLanguage] = useState(""); // Search query for title and city
  const [Duration, setDuration] = useState(""); // Search query for title and city
  const [Category, setCategory] = useState(""); // Search query for title and city
  const [Size, setSize] = useState(""); // Search query for title and city
  const [Material, setMaterial] = useState(""); // Search query for title and city
  const [Gender, setGender] = useState(""); // Search query for title and city
  const [Features, setFeatures] = useState(""); // Search query for title and city
  const [Availability, setAvailability] = useState(""); // Search query for title and city
  const [ColorOptions, setColorOptions] = useState(""); // Search query for title and city
  const [SellerType, setSellerType] = useState(""); // Search query for title and city
  const [ads, setCarsData] = useState([]);
  const [userId, setUserId] = useState(""); // State for image preview
  const [error, setError] = useState(""); // ✅ Error state
  const [selectedCountry, setSelectedCountry] = useState(null);
  // const [selectedCities, setSelectedCities] = useState([]); // Array of selected cities
  const [cities, setCities] = useState([]);
  // const [searchQuery, setSearchQuery] = useState(""); // For search query, if any
  const [states, setStates] = useState([]);
  const [subCatgory, setsubCatgory] = useState("");
  const [nestedSubCategory, setNestedSubCategory] = useState("");
  const [adsDetailImages, setAdsDetailImages] = useState([]);
  console.log(adsDetailImages, "adsDetailImages________");
  useEffect(() => {
    const fetchAdsDetailImages = async () => {
      try {
        const adsCollectionRef = collection(db, "SportGamesContent");
        const adsSnapshot = await getDocs(adsCollectionRef);

        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAdsDetailImages(adsList);
        console.log("📸 AdsdetailImages fetched:", adsList);
      } catch (error) {
        console.error("❌ Error fetching AdsdetailImages:", error);
      }
    };

    fetchAdsDetailImages();
  }, []);
  console.log(nestedSubCategory, "subCatgory___________2222");
  console.log(subCatgory, "subCatgory___________1111___");
  const { searchText } = useSearchStore();
  useEffect(() => {
    setSearchQuery(searchText); // Update searchQuery from searchText
  }, [searchText]);
  const updateIsMobile = () => {
    setIsMobile(window.innerWidth <= 767);
  };
  const { id } = useParams();
  const getQueryParam = (param) => {
    const hash = location.hash;
    const queryIndex = hash.indexOf("?");
    if (queryIndex === -1) return null;

    const queryString = hash.substring(queryIndex + 1);
    const searchParams = new URLSearchParams(queryString);
    return searchParams.get(param);
  };
  const [_Id, setId] = useState(null); // State to store ads data
  const [callingFrom, setCallingFrom] = useState(null); // State to store ads data
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    const callingFrom = getQueryParam("callingFrom");
    const subCatgory = getQueryParam("subCatgory");
    const NestedSubCategory = getQueryParam("NestedSubCategory");

    setsubCatgory(subCatgory);
    setNestedSubCategory(NestedSubCategory);
    const ids = getQueryParam("id");
    console.log("callingFrom______ID:ids11", ids);
    console.log("callingFrom______Calling From:11", callingFrom);

    setCallingFrom(callingFrom);
    setId(ids);
  }, [id, location, getQueryParam]);

  // Format country data for React Select
  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const [selectedSubCategory, setselectedSubCategory] = useState("");
  const handleCategorySelect = (e) => {
    setselectedSubCategory(e.target.value);
  };
  const [CityList, setCityList] = useState([]);

  useEffect(() => {
    // Assuming Location.json is like { "location": [ ... ] } or is an array itself
    if (cityData.City && Array.isArray(cityData.City)) {
      setCityList(cityData.City);
    } else if (Array.isArray(cityData)) {
      setCityList(cityData);
    } else {
      // fallback empty or log error
      setCityList([]);
      console.error("City JSON data is not in expected format");
    }
  }, []);

  const CityOptions = useMemo(
    () =>
      CityList.map((city) => ({
        value: city, // Adjust based on your cityData structure
        label: city,
      })),
    [CityList]
  );

  const [DistrictList, setDistrictList] = useState([]);
  console.log("_________________", DistrictList);

  useEffect(() => {
    if (locationData.Dis && Array.isArray(locationData.Dis)) {
      setDistrictList(locationData.Dis);
    } else if (Array.isArray(locationData)) {
      setDistrictList(locationData);
    } else {
      setDistrictList([]);
      console.error("Dis JSON data is not in expected format");
    }
  }, []);

  const DistrictOptions = useMemo(
    () =>
      DistrictList.map((Dis) => ({
        value: Dis,
        label: Dis,
      })),
    [DistrictList]
  );
  const [selectedCity, setselectedCity] = useState(null);
  const [selectedDistrict, setselectedDistrict] = useState(null);

  console.log(selectedCity, "selectedSubCategory________");

  const [formData, setFormData] = useState({
    City: "",
    District: "",
  });
  const handleCitySelect = (selectedOptions) => {
    console.log("Selected Options:", selectedOptions); // Debug
    setselectedCity(selectedOptions || []); // Update selectedCity state to an array
    setFormData((prev) => ({
      ...prev,
      City: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [], // Store array of city values
    }));
  };
  console.log("Selected City:", selectedCity);

  const handleDistrictSelect = (selectedOption1) => {
    console.log("Selected Option:", selectedOption1); // Debug
    setselectedDistrict(selectedOption1); // Update selectedCity state
    setFormData((prev) => ({
      ...prev,
      District: selectedOption1 ? selectedOption1.value : "", // Fallback to empty string
    }));
  };
  console.log("Selected district:", selectedDistrict);
  const [selectedConditions, setSelectedConditions] = useState([]);

  // Handler for Condition checkboxes
  const handleConditionChange = (condition) => (event) => {
    const isChecked = event.target.checked;
    setSelectedConditions((prev) => {
      const newConditions = isChecked
        ? [...prev, condition]
        : prev.filter((c) => c !== condition);
      console.log("Selected Conditions:", newConditions);
      return newConditions;
    });
  };
  const categories1 = [
    "Gaming Consoles",
    "Video Games",
    "Controllers",
    "Gaming Accessories",
    "Gift Cards",
    "Accounts",
    "Toys",
  ];

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

  const handleCheckboxChangeColorOptions1 = (event) => {
    const carLabel = event.target.name; // Use the name attribute to identify the checkbox
    if (event.target.checked) {
      // Add the label to the state if checked
      setSellerType((prev) => [...prev, carLabel]);
    } else {
      // Remove the label from the state if unchecked
      setSellerType((prev) => prev.filter((car) => car !== carLabel));
    }
  };

  const handleCheckboxChangeColorOptions = (event) => {
    const carLabel = event.target.name; // Use the name attribute to identify the checkbox
    if (event.target.checked) {
      // Add the label to the state if checked
      setColorOptions((prev) => [...prev, carLabel]);
    } else {
      // Remove the label from the state if unchecked
      setColorOptions((prev) => prev.filter((car) => car !== carLabel));
    }
  };
  const handleCheckboxChangeAvailability = (event) => {
    const carLabel = event.target.name; // Use the name attribute to identify the checkbox
    if (event.target.checked) {
      // Add the label to the state if checked
      setAvailability((prev) => [...prev, carLabel]);
    } else {
      // Remove the label from the state if unchecked
      setAvailability((prev) => prev.filter((car) => car !== carLabel));
    }
  };
  const handleCheckboxChangeFeatures = (event) => {
    const carLabel = event.target.name; // Use the name attribute to identify the checkbox
    if (event.target.checked) {
      // Add the label to the state if checked
      setFeatures((prev) => [...prev, carLabel]);
    } else {
      // Remove the label from the state if unchecked
      setFeatures((prev) => prev.filter((car) => car !== carLabel));
    }
  };
  const handleCheckboxChangeGender = (event) => {
    const carLabel = event.target.name; // Use the name attribute to identify the checkbox
    if (event.target.checked) {
      // Add the label to the state if checked
      setGender((prev) => [...prev, carLabel]);
    } else {
      // Remove the label from the state if unchecked
      setGender((prev) => prev.filter((car) => car !== carLabel));
    }
  };
  const handleCheckboxChangeMaterial = (event) => {
    const carLabel = event.target.name; // Use the name attribute to identify the checkbox
    if (event.target.checked) {
      // Add the label to the state if checked
      setMaterial((prev) => [...prev, carLabel]);
    } else {
      // Remove the label from the state if unchecked
      setMaterial((prev) => prev.filter((car) => car !== carLabel));
    }
  };
  const handleCheckboxChangeSize = (event) => {
    const carLabel = event.target.name; // Use the name attribute to identify the checkbox
    if (event.target.checked) {
      // Add the label to the state if checked
      setSize((prev) => [...prev, carLabel]);
    } else {
      // Remove the label from the state if unchecked
      setSize((prev) => prev.filter((car) => car !== carLabel));
    }
  };
  const handleCheckboxChangeCategory = (event) => {
    const carLabel = event.target.name; // Use the name attribute to identify the checkbox
    if (event.target.checked) {
      // Add the label to the state if checked
      setCategory((prev) => [...prev, carLabel]);
    } else {
      // Remove the label from the state if unchecked
      setCategory((prev) => prev.filter((car) => car !== carLabel));
    }
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
  const handleCheckboxChangeDuration = (event) => {
    const carLabel = event.target.name; // Use the name attribute to identify the checkbox
    if (event.target.checked) {
      // Add the label to the state if checked
      setDuration((prev) => [...prev, carLabel]);
    } else {
      // Remove the label from the state if unchecked
      setDuration((prev) => prev.filter((car) => car !== carLabel));
    }
  };
  const handleCheckboxChangeLanguage = (event) => {
    const carLabel = event.target.name; // Use the name attribute to identify the checkbox
    if (event.target.checked) {
      // Add the label to the state if checked
      setLanguage((prev) => [...prev, carLabel]);
    } else {
      // Remove the label from the state if unchecked
      setLanguage((prev) => prev.filter((car) => car !== carLabel));
    }
  };
  const handleCheckboxChangeContentType = (event) => {
    const carLabel = event.target.name; // Use the name attribute to identify the checkbox
    if (event.target.checked) {
      // Add the label to the state if checked
      setContentType((prev) => [...prev, carLabel]);
    } else {
      // Remove the label from the state if unchecked
      setContentType((prev) => prev.filter((car) => car !== carLabel));
    }
  };
  const handleCheckboxChangeSkillLevel = (event) => {
    const carLabel = event.target.name; // Use the name attribute to identify the checkbox
    if (event.target.checked) {
      // Add the label to the state if checked
      setSkillLevel((prev) => [...prev, carLabel]);
    } else {
      // Remove the label from the state if unchecked
      setSkillLevel((prev) => prev.filter((car) => car !== carLabel));
    }
  };
  const handleCheckboxChangeSubjectCategories = (event) => {
    const carLabel = event.target.name; // Use the name attribute to identify the checkbox
    if (event.target.checked) {
      // Add the label to the state if checked
      setSubjectCategories((prev) => [...prev, carLabel]);
    } else {
      // Remove the label from the state if unchecked
      setSubjectCategories((prev) => prev.filter((car) => car !== carLabel));
    }
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]);
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
        const isActive = i === activePage;
        pages.push(
          <button
            key={i}
            style={{
              backgroundColor: isActive ? "#2d4495" : "white",
              color: isActive ? "white" : "black",
              border: "1px solid #ccc", // Subtle border for non-active buttons
              padding: "6px 12px",
              margin: "0 4px",
              cursor: "pointer",
              outline: "none",
              fontSize: "1rem",
              lineHeight: "1.5",
              borderRadius: "4px",
              fontWeight: isActive ? "bold" : "normal",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = isActive
                ? "#2d4495"
                : "white";
              e.currentTarget.style.color = isActive ? "white" : "black";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = isActive
                ? "#2d4495"
                : "white";
              e.currentTarget.style.color = isActive ? "white" : "black";
            }}
            onFocus={(e) => {
              e.currentTarget.style.backgroundColor = isActive
                ? "#2d4495"
                : "white";
              e.currentTarget.style.color = isActive ? "white" : "black";
            }}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        );
      } else if (i === activePage - 2 || i === activePage + 2) {
        pages.push(
          <span
            key={`ellipsis-${i}`}
            style={{
              margin: "0 4px",
              color: "#333",
              display: "inline-flex",
              alignItems: "center",
              verticalAlign: "middle",
              fontSize: "1rem",
              lineHeight: "1.5",
            }}
          >
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

  const [logSelectedPurpose, setlogSelectedPurpose] = useState("");

  const handleCheckboxPurpose = (label) => {
    setlogSelectedPurpose((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
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

  const handleCheckboxChangeSellerType = (event, label) => {
    const isChecked = event.target.checked;
    const selectedLabel = isChecked ? label : "";
    // setSellerType(selectedLabel);
    console.log(`Selected: ${selectedLabel}`);
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

  const handleView = (carId) => {
    const now = Date.now();
    const cooldownPeriod = 30 * 1000; // 30 seconds
    const viewedCars = JSON.parse(localStorage.getItem("viewedCars") || "{}");

    // Check if the car has been viewed recently
    if (!viewedCars[carId] || now - viewedCars[carId] > cooldownPeriod) {
      // If it's not in the cooldown period, increment the view count on the server
      fetch(`http://168.231.80.24:9002/route/SPORTSGAMESComp/${carId}/view`, {
        method: "PATCH",
      });

      // Update the last viewed timestamp for that car in localStorage
      viewedCars[carId] = now;
      localStorage.setItem("viewedCars", JSON.stringify(viewedCars));
    } else {
      console.log(`Please wait 30 seconds before viewing this car again.`);
    }
  };
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
      const carDocRef = doc(db, "SPORTSGAMESComp", carId);
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
  // useEffect(() => {
  //   const fetchCars = async () => {
  //     try {
  //       const carsCollectionRef = collection(db, "SPORTSGAMESComp");
  //       const querySnapshot = await getDocs(carsCollectionRef);
  //       const carsData = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       console.log(carsData, "carsData_____SPORTSGAMESComp");
  //       setCars(carsData);
  //       setFilteredCars(carsData); // Initially, show all cars
  //     } catch (error) {
  //       console.error("Error getting cars:", error);
  //     }
  //   };

  //   fetchCars();
  // }, [bookmarkedCar]);
  // useEffect(() => {
  //   const fetchCars = async () => {
  //     try {
  //       setLoading(true); // Show spinner
  //       const response = await fetch(
  //         "http://168.231.80.24:9002/route/SPORTSGAMESComp"
  //       );
  //       const carsData = await response.json();

  //       setCars(carsData);
  //       setFilteredCars(carsData); // Initially, show all cars
  //       setLoading(false);

  //       console.log(carsData, "carsData_________");
  //     } catch (error) {
  //       console.error("Error getting cars:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchCars();
  // }, [bookmarkedCar]);
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const query = searchText
          ? `?searchText=${encodeURIComponent(searchText)}`
          : "";
        const response = await fetch(
          `http://168.231.80.24:9002/route/SPORTSGAMESComp${query}`
        );
        const carsData = await response.json();

        setCars(carsData);
        setFilteredCars(carsData);
        setLoading(false);

        console.log(carsData, "carsData_________");
      } catch (error) {
        console.error("Error getting cars:", error);
        setLoading(false);
      }
    };

    fetchCars();
  }, [searchText, bookmarkedCar]);
  const handleShowModal = (userId) => {
    console.log("Opening modal for receiverId:", receiverId); // Debug
    console.log("Opening modal for Current User ID:", currentUserId); // Debug
    setReceiverId(userId);
    setShowModal(true);
    // You can store the userId in state if needed, e.g., setSelectedUserId(userId);
  };
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
      SubjectCategories,
      SkillLevel,
      ContentType,
      Language,
      Duration,
      Category,
      Size,
      Material,
      Gender,
      Features,
      Availability,
      ColorOptions,
      SellerType,
      subCatgory,
      selectedSubCategory,
      selectedCity,
      selectedDistrict,
      selectedConditions,
      logSelectedPurpose
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
    SubjectCategories,
    SkillLevel,
    ContentType,
    Language,
    Duration,
    Category,
    Size,
    Material,
    Gender,
    Features,
    Availability,
    ColorOptions,
    SellerType,
    subCatgory,
    selectedSubCategory,
    selectedCity,
    selectedDistrict,
    selectedConditions,
    logSelectedPurpose,
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
      SubjectCategories,
      SkillLevel,
      ContentType,
      Language,
      Duration,
      Category,
      Size,
      Material,
      Gender,
      Features,
      Availability,
      ColorOptions,
      SellerType,
      subCatgory,
      selectedSubCategory,
      selectedCity,
      selectedDistrict,
      selectedConditions,
      logSelectedPurpose
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
    SubjectCategories,
    SkillLevel,
    ContentType,
    Language,
    Duration,
    Category,
    Size,
    Material,
    Gender,
    Features,
    Availability,
    ColorOptions,
    SellerType,
    subCatgory,
    selectedSubCategory,
    selectedCity,
    selectedDistrict,
    selectedConditions,
    logSelectedPurpose
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
          car.SubjectCategories?.toLowerCase().includes(lowercasedQuery) ||
          car.SkillLevel?.toLowerCase().includes(lowercasedQuery) ||
          car.ContentType?.toLowerCase().includes(lowercasedQuery) ||
          car.Language?.toLowerCase().includes(lowercasedQuery) ||
          car.Duration?.toLowerCase().includes(lowercasedQuery) ||
          car.Category?.toLowerCase().includes(lowercasedQuery) ||
          car.Size?.toLowerCase().includes(lowercasedQuery) ||
          car.Material?.toLowerCase().includes(lowercasedQuery) ||
          car.Gender?.toLowerCase().includes(lowercasedQuery) ||
          car.Features?.toLowerCase().includes(lowercasedQuery) ||
          car.Availability?.toLowerCase().includes(lowercasedQuery) ||
          car.ColorOptions?.toLowerCase().includes(lowercasedQuery) ||
          car.SellerType?.toLowerCase().includes(lowercasedQuery) ||
          car.SubCategory?.toLowerCase().includes(lowercasedQuery) ||
          car.Condition?.toLowerCase().includes(lowercasedQuery) ||
          car.District?.toLowerCase().includes(lowercasedQuery) ||
          car.Purpose?.toLowerCase().includes(lowercasedQuery) ||
          car.TrustedCars?.toLowerCase().includes(lowercasedQuery)
      );
    }
    setLoading(false);
    if (Duration?.length > 0) {
      filtered = filtered.filter((car) => Duration.includes(car.Duration));
    }
    if (subCatgory?.length > 0) {
      filtered = filtered.filter((car) => subCatgory.includes(car.SubCategory));
    }
    if (SellerType?.length > 0) {
      filtered = filtered.filter((car) => SellerType.includes(car.SellerType));
    }
    if (selectedSubCategory?.length > 0) {
      filtered = filtered.filter((car) =>
        selectedSubCategory.includes(car.SubCategory)
      );
    }
    if (Array.isArray(selectedConditions) && selectedConditions.length > 0) {
      filtered = filtered.filter((car) => {
        if (!car?.Condition || typeof car.Condition !== "string") {
          console.warn("Invalid car Condition from database:", car);
          return false;
        }
        return selectedConditions.includes(car.Condition);
      });
    }
    if (selectedCity && selectedCity.length > 0) {
      const selectedCityValues = selectedCity.map((city) => city.value); // Extract values, e.g., ["ny", "la"]
      filtered = filtered.filter((car) =>
        selectedCityValues.includes(car.City)
      );
    }
    if (selectedDistrict) {
      filtered = filtered.filter(
        (car) => car.District === selectedDistrict.value
      );
    }
    if (logSelectedPurpose?.length > 0) {
      filtered = filtered.filter((car) =>
        logSelectedPurpose.includes(car.Purpose)
      );
    }
    if (ColorOptions?.length > 0) {
      filtered = filtered.filter((car) =>
        ColorOptions.includes(car.ColorOptions)
      );
    }
    if (searchQuery?.length > 0) {
      filtered = filtered.filter((car) => {
        // Ensure car.title exists and is a string
        if (!car?.title || typeof car.title !== "string") {
          console.warn("Invalid car title:", car);
          return false;
        }
        // Case-insensitive search
        return car.title.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }
    if (Availability?.length > 0) {
      filtered = filtered.filter((car) =>
        Availability.includes(car.Availability)
      );
    }
    if (Features?.length > 0) {
      filtered = filtered.filter((car) => Features.includes(car.Features));
    }
    if (Gender?.length > 0) {
      filtered = filtered.filter((car) => Gender.includes(car.Gender));
    }
    if (Material?.length > 0) {
      filtered = filtered.filter((car) => Material.includes(car.Material));
    }
    if (Size?.length > 0) {
      filtered = filtered.filter((car) => Size.includes(car.Size));
    }
    if (Category?.length > 0) {
      filtered = filtered.filter((car) => Category.includes(car.Category));
    }
    if (ScreenSize?.length > 0) {
      filtered = filtered.filter((car) => ScreenSize.includes(car.ScreenSize));
    }
    if (Language?.length > 0) {
      filtered = filtered.filter((car) => Language.includes(car.Language));
    }
    if (ContentType?.length > 0) {
      filtered = filtered.filter((car) =>
        ContentType.includes(car.ContentType)
      );
    }
    if (SkillLevel?.length > 0) {
      filtered = filtered.filter((car) => SkillLevel.includes(car.SkillLevel));
    }
    if (SubjectCategories?.length > 0) {
      filtered = filtered.filter((car) =>
        SubjectCategories.includes(car.SubjectCategories)
      );
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
    if (selectedOptionisFeatured) {
      filtered = filtered.filter((car) => {
        if (!car?.FeaturedAds || typeof car.FeaturedAds !== "string") {
          console.warn("Invalid car FeaturedAds:", car);
          return false; // Skip cars with invalid FeaturedAds
        }
        return car.FeaturedAds === selectedOptionisFeatured;
      });
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
        // Use car.Price instead of car.price
        const carPrice = parseFloat(car?.Price);
        if (isNaN(carPrice)) {
          console.warn("Invalid car Price:", car);
          return false; // Skip cars with invalid Price
        }

        // Convert fromValue and toValue to numbers, use appropriate defaults
        const minPrice = fromValue ? parseFloat(fromValue) : -Infinity; // Allow all prices if no min
        const maxPrice = toValue ? parseFloat(toValue) : Infinity; // Allow all prices if no max

        // Ensure minPrice and maxPrice are valid
        if (isNaN(minPrice) || isNaN(maxPrice)) {
          console.warn("Invalid price range:", { fromValue, toValue });
          return true; // Skip price filtering if inputs are invalid
        }

        return carPrice >= minPrice && carPrice <= maxPrice;
      });
    }
    if (SortBy === "Price: Low to High") {
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.Price) || 0;
        const priceB = parseFloat(b.Price) || 0;
        return priceB - priceA; // Ascending order (low to high)
      });
    }
    if (SortBy === "Price: High to Low") {
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.Price) || 0;
        const priceB = parseFloat(b.Price) || 0;
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
    console.log(filtered, "Sports and Games");
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

  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [existingImageId, setExistingImageId] = useState("");

  useEffect(() => {
    const fetchExistingImage = async () => {
      const querySnapshot = await getDocs(collection(db, "HeroBanner"));
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0];
        setExistingImageId(docData.id);
        setPreview(docData.data().imageUrl);
        console.log(docData.data().imageUrl, "___________________");
      }
    };
    fetchExistingImage();
  }, []);
  return (
    <>
      <div className="main-wrapper">
        <Header parms={parms} />
        <div className="main-wrapper">
          <Header />
        </div>
        <Container
          className="parent-main"
          style={{
            paddingLeft: "2px", // Padding on the left side
            paddingRight: "2px", // Padding on the right side
            color: "black", // Text color
            maxWidth: "1430px", // Optional: Add max-width to ensure padding is visible
            margin: "0 auto", // Optional: Center the container if desired
            marginTop: window.innerWidth <= 576 ? "7rem" : "11rem",
          }}
        >
          <div
            className="adsCategory_head"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginLeft: window.innerWidth <= 576 ? "0.7rem" : "0.7%",
              marginBottom: window.innerWidth <= 576 ? "10px" : "20px",
              marginTop: "40px",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => {
                navigate("/");
              }}
              className="btn"
              style={{
                background: window.innerWidth <= 576 ? "none" : "#E9EEFF",
                fontWeight: "500",
                // pointerEvents: "none",
                padding: window.innerWidth <= 576 ? "0px" : "10px 15px",
              }}
            >
              Home
            </button>
            <span>
              <MdKeyboardArrowRight />
            </span>

            <button
              onClick={() => {
                navigate("/SPORTSGAMESComp");
              }}
              className="btn"
              style={{
                background: window.innerWidth <= 576 ? "none" : "#E9EEFF",
                fontWeight: "500",
                // pointerEvents: "none",
                padding: window.innerWidth <= 576 ? "0px" : "10px 15px",
              }}
            >
              Sports & Games
            </button>
            {subCatgory &&
              typeof subCatgory === "string" &&
              subCatgory.trim() !== "" && (
                <>
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
                    {subCatgory}
                  </button>
                </>
              )}
            {nestedSubCategory &&
              typeof nestedSubCategory === "string" &&
              nestedSubCategory.trim() !== "" && (
                <>
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
                    {nestedSubCategory}
                  </button>
                </>
              )}
          </div>

          <div>
            {(nestedSubCategory || subCatgory) && (
              <h1
                style={{
                  marginLeft: window.innerWidth <= 576 ? "0.7rem" : "0.7%",
                  marginTop: window.innerWidth <= 576 ? "10px" : "20px",
                  fontSize: "24px",
                }}
              >
                {nestedSubCategory || subCatgory}
              </h1>
            )}
          </div>
        </Container>
        <Container
          fluid
          style={{
            paddingLeft: "10px", // Padding on the left side
            paddingRight: "1px", // Padding on the right side
            color: "black", // Text color
            maxWidth: "1410px", // Optional: Add max-width to ensure padding is visible
            margin: "0 auto", // Optional: Center the container if desired
            // marginLeft: window.innerWidth <= 576 ? "-0.3rem" : "13%",
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
                  paddingLeft: "12px",
                  paddingTop: "12px",
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
                        placeholder="Search here"
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
                <Accordion className="mt-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Sub Categories</Accordion.Header>
                    <Accordion.Body>
                      <div style={{ maxWidth: "300px", margin: "20px" }}>
                        <Form.Group>
                          <Form.Label>Select a Category</Form.Label>
                          <Form.Select
                            value={selectedSubCategory}
                            onChange={handleCategorySelect}
                          >
                            <option value="">-- Select --</option>
                            {categories1.map((category, index) => (
                              <option key={index} value={category}>
                                {category}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
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
                {/*      ----------               */}
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Select City</Accordion.Header>
                    <Accordion.Body>
                      <Form.Group className="mb-3">
                        <Form.Label>Select a City</Form.Label>
                        <WindowedSelect
                          options={CityOptions}
                          value={selectedCity}
                          onChange={handleCitySelect}
                          placeholder="Select a City"
                          isClearable
                          isMulti // Enable multiple selections
                          className="w-100"
                          windowThreshold={100} // Render only 100 options at a time
                        />
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
                    <Accordion.Header>Select District</Accordion.Header>
                    <Accordion.Body>
                      <Form.Group className="mb-3">
                        <Form.Label>Select a District</Form.Label>

                        <WindowedSelect
                          options={DistrictOptions}
                          value={selectedDistrict}
                          onChange={handleDistrictSelect}
                          placeholder="Select a District"
                          isClearable
                          className="w-100"
                          windowThreshold={100} // Render only 100 options at a time
                        />
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

                {/*      ----------               */}

                {/*      ----------               */}

                {/*--------------------------------------*/}

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
              </Form>

              <Accordion className="mt-3">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Ad Type</Accordion.Header>
                  <Accordion.Body>
                    <div style={{ maxWidth: "300px", margin: "20px" }}>
                      <Form.Group>
                        {["Sell", "Rent", "Wanted"].map((color) => (
                          <div
                            key={color}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "8px 0",
                            }}
                          >
                            <Form.Check
                              type="checkbox"
                              label={color}
                              // defaultChecked={color === "Grey"}
                              onChange={() => handleCheckboxPurpose(color)}
                            />
                          </div>
                        ))}
                      </Form.Group>
                      {/* <p
                                       style={{ color: "#2D4495", cursor: "pointer" }}
                                       onClick={() => handleMoreChoicesToggle()}
                                     >
                                       More choices
                                     </p> */}
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
                  <Accordion.Header>Condition</Accordion.Header>
                  <Accordion.Body>
                    <div style={{ maxWidth: "300px", margin: "20px" }}>
                      <Form.Group>
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
                            label="New"
                            onChange={handleConditionChange("New")}
                            checked={selectedConditions.includes("New")}
                          />
                        </div>
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
                            label="Used"
                            onChange={handleConditionChange("Used")}
                            checked={selectedConditions.includes("Used")}
                          />
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
            </Col>

            <Col md={9} className="p-3">
              <Row className="mb-3">
                <Col>
                  {/* <Form.Check type="checkbox" label="With Photos" /> */}
                </Col>
                <Col>
                  {/* <Form.Check type="checkbox" label="With Price" /> */}
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
                ) : filteredCars.length > 0 ? (
                  getPaginatedCars().map((car, index) => {
                    const isActive = activePhoneIndex === index;

                    return (
                      <Card
                        key={index}
                        className="mt-3"
                        style={{
                          padding:
                            window.innerWidth <= 576
                              ? "10px 10px"
                              : "30px 20px",
                        }}
                      >
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
                                // padding: "5px 10px",
                                fontWeight: "bold",
                                borderRadius: "5px",
                                zIndex: 2, // Ensure it's above the image
                              }}
                            >
                               {
                              car.FeaturedAds?"Featured":''
                            } 
                            </div>

                            {/* Heart Icon */}
                            <div
                              style={{
                                position: "absolute",
                                top: "15%",
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
                              />{" "}
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
                              onClick={() => handleView(car.id)}
                              //  to={`/car-details/${ad.id}`}
                              to={`/Dynamic_Route?id=${car.id}&callingFrom=SportGamesComp`}
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
                                  objectFit: "cover",
                                  borderTopLeftRadius: "20px",
                                  borderBottomLeftRadius: "20px",
                                }}
                              />
                            </Link>
                          </Col>

                          <Col md={8}>
                            <Card.Body>
                              <Card.Title
                                style={{
                                  color: "#2D4495",
                                  marginTop:
                                    window.innerWidth <= 576 ? "-2px" : "0px",
                                }}
                              >
                                <Link
                                  //  to={`/car-details/${ad.id}`}
                                  to={`/Dynamic_Route?id=${car.id}&callingFrom=SportGamesComp`}
                                >
                                  {car.title || "Car"}
                                </Link>
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
                                {car.description ||
                                  "Description not available."}
                              </Card.Text>

                              <Col
                                className="align-items-center"
                                style={{
                                  position: "relative",
                                  marginTop:
                                    window.innerWidth <= 576 ? "-10px" : "30px",
                                }}
                              >
                                {/* Price displayed above the image */}
                                <p
                                  style={{
                                    position: "absolute",
                                    top: "-120px", // Adjust the top margin to place the price higher
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

                                <div>
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
                                  ) : (
                                    ads.map((cars) => (
                                      <div
                                        style={{
                                          position: "absolute",
                                          top: "-70px",
                                          left: "470px",
                                          fontWeight: "bold",
                                          fontSize: "20px",
                                          zIndex: 2,
                                          color: "#2D4495",
                                        }}
                                      >
                                        {car.photoURL ? (
                                          <img
                                            src={car.photoURL}
                                            // alt={car.title || "No Image"}
                                            style={{
                                              width: "100px",
                                              height: "100px",
                                              objectFit: "cover",
                                              borderRadius: "50%",
                                              border: "2px solid white",
                                              boxShadow:
                                                "0 0 10px rgba(0,0,0,0.1)",
                                              display: "block",
                                            }}
                                          />
                                        ) : (
                                          <div
                                            style={{
                                              width: "110px",
                                              height: "110px",
                                              borderRadius: "50%",
                                              border: "2px solid white",
                                              boxShadow:
                                                "0 0 10px rgba(0,0,0,0.1)",
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "center",
                                              backgroundColor: "#f0f0f0", // optional background color
                                              textAlign: "center",
                                              padding: "10px", // optional padding
                                            }}
                                          >
                                            {"No Image"}
                                          </div>
                                        )}
                                      </div>
                                    ))
                                  )}
                                </div>

                                {/* Updated text at the bottom-right corner */}
                                <p
                                  style={{
                                    position: "absolute",
                                    right: "5px",
                                    marginTop:
                                      window.innerWidth <= 576
                                        ? "35px"
                                        : "54px",
                                    marginLeft:
                                      window.innerWidth <= 576
                                        ? "10rem"
                                        : "0rem",
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
                                      car.img ||
                                      "https://via.placeholder.com/150"
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
                                    className={`sign-in-button ${
                                      isActive ? "expanded" : ""
                                    }`}
                                    style={{
                                      marginTop:
                                        window.innerWidth <= 576
                                          ? "10px"
                                          : "50px",
                                      width:
                                        window.innerWidth <= 576
                                          ? "150px"
                                          : "auto",
                                    }}
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
                                  className={`sign-in-button ${
                                    isActive ? "icon-only" : ""
                                  }`}
                                  style={{
                                    marginTop:
                                      window.innerWidth <= 576 ? "5px" : "50px",
                                    width:
                                      window.innerWidth <= 576
                                        ? "150px"
                                        : "auto",
                                  }}
                                  onClick={() => handleShowModal(car.userId)}
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
                                    className={`sign-in-button ${
                                      isActive ? "icon-only" : ""
                                    }`}
                                    style={{
                                      marginTop:
                                        window.innerWidth <= 576
                                          ? "5px"
                                          : "50px",
                                      width:
                                        window.innerWidth <= 576
                                          ? "150px"
                                          : "auto",
                                    }}
                                  >
                                    <FaWhatsapp />
                                    <span className="button-text">
                                      WhatsApp
                                    </span>
                                  </button>
                                </a>

                                <button
                                  className={`sign-in-button`}
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
                                    marginRight:
                                      window.innerWidth <= 576
                                        ? "20px"
                                        : "60px",

                                    marginTop:
                                      window.innerWidth <= 576 ? "5px" : "50px",
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
                              <div>
                                <div
                                  className={`modal fade ${
                                    showModal ? "show d-block" : "d-none"
                                  }`}
                                  tabIndex="-1"
                                  role="dialog"
                                  style={{
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    marginTop: 100,
                                  }} // Backdrop effect
                                >
                                  <div
                                    className="modal-dialog modal-dialog-centered"
                                    role="document"
                                  >
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5 className="modal-title">
                                          Send Message
                                        </h5>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          onClick={() => setShowModal(false)}
                                        ></button>
                                      </div>
                                      {userId && receiverId ? (
                                        <Mesagedeals
                                          userId={userId}
                                          recieverId={receiverId}
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
                                          {currentUserId && receiverId ? (
                                            <Chat
                                              userId={currentUserId}
                                              recieverId={receiverId}
                                            />
                                          ) : (
                                            <div className="flex items-center justify-center h-40 bg-gray-100 rounded-md">
                                              <p className="text-lg font-semibold text-gray-600">
                                                Please log in to start
                                                messaging.
                                              </p>
                                            </div>
                                          )}
                                        </div>
                                      </div> */}
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
                            </Card.Body>
                          </Col>
                        </Row>
                      </Card>
                    );
                  })
                ) : (
                  "No Record Found"
                )}
              </div>
              <div className="d-flex align-items-center justify-content-center my-4">
                <Button
                  variant="#2d4495"
                  className="d-flex align-items-center mx-2"
                  disabled={activePage === 1}
                  onClick={() => handlePageClick(activePage - 1)}
                  style={{
                    backgroundColor: "#2d4495",
                    color: "white",
                    border: "none",
                    transition: "none",
                  }}
                >
                  <FaArrowLeft className="me-1" /> Previous
                </Button>

                <ButtonGroup>{renderPageNumbers()}</ButtonGroup>

                <Button
                  variant="#2d4495"
                  className="d-flex align-items-center mx-2"
                  disabled={activePage === totalPages}
                  onClick={() => handlePageClick(activePage + 1)}
                  style={{
                    backgroundColor: "#2d4495",
                    color: "white",
                    border: "none",
                    transition: "none",
                  }}
                >
                  Next <FaArrowRight className="ms-1" />
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
        <div
          className="container"
          style={{
            color: "black",
            maxWidth: "100%",
            margin: "0 auto",
            marginLeft: window.innerWidth <= 576 ? "-2.5rem" : "0rem",
            marginTop: window.innerWidth <= 576 ? "-2.5rem" : "0rem",

            height: "auto",
            paddingLeft: "13%",
            paddingRight: "10%",
            paddingTop: "20px",
            paddingBottom: "30px",
          }}
        >
          <div className="cars data">
            {adsDetailImages.map((item) => (
              <div
                key={item.id}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            ))}
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 768px) {
            .container-parent {
              padding-left: 5%; // Reduce padding on smaller screens
              padding-right: 5%;
            }
            .responsive-row {
              margin: 0 10px;
            }
          }
          @media (max-width: 480px) {
            .container-parent {
              padding-left: 0%; // No left padding on very small screens
              padding-right: 0%; // No right padding on very small screens
            }
            .responsive-row {
              margin: 0;
            }
            h2 {
              font-size: 1.2rem; // Smaller font size for headings on mobile
            }
          }
        `}</style>
        <ComercialsAds />
        <LatestBlog />
      </div>

      <Footer />
    </>
  );
};

export default SPORTSGAMESComp;
