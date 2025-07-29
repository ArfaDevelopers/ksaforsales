import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"; // Import Link from react-router-dom
import Header from "../../home/header"; // Ensure Header is correctly implemented and imported
import Footer from "../../../components/home/footer/Footer";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import Mesagedeals from "../../../components/userPages/mesagedeals";
import { Modal } from "bootstrap";
import { IoLocationOutline } from "react-icons/io5";

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
import profile from "../dyanmic_route/profileimage.png";
import { MdMessage } from "react-icons/md";
import Chat from "../../../components/admin/dyanmic_route/upperHeader/Chat";
import Loading1 from "../../../../public/Progress circle.png";
import WindowedSelect from "react-windowed-select";
import cityData from "../../../City.json";
import locationData from "../../../Location.json";
import image3 from "../../../assets/img/banner/bannerimage3.png";
import image4 from "../../../assets/img/banner/bannerimage4.png";
import { FaRegHeart } from "react-icons/fa";
import Select from "react-select";
import { Country, City, State } from "country-state-city";
// import LatestBlog from "../../blog/BlogList/LatestBlog/LatestBlog.jsx";
import image2 from "../../../assets/img/banner/bannerimage2.png";
import xIcon from "../../home/x.png";
import insta from "../../home/insta.png";
import fb from "../../home/fb.png";
import tiktok from "../../home/tiktoc.png";
import whatapp from "../../home/whatapp (3).png";
import { FaPhoneAlt } from "react-icons/fa";

import Carousel from "../../home/slider/Carousel";
import AutomativeCarosuel from "../..//home/slider/AutomativeCarousel.jsx";
import RealEstateCarousel from "../..//home/slider/RealEstateCarousel.jsx";
import ElectronicCarousel from "../..//home/slider/ElectronicCarousel.jsx";
import HealthCareCarousel from "../..//home/slider/HealthCareCarousel.jsx";
import SportandgameCarouseCarousel from "../..//home/slider/SportandgameCarouseCarousel.jsx";
import ComercialsAds from "../../home/ComercialsAds/ComercialsAds.jsx";
import LatestBlog from "../../blog/BlogList/LatestBlog/LatestBlog.jsx";
import { ref, getDownloadURL } from "firebase/storage";

import popup from "../../home/popup_image.png";
import { Accordion } from "react-bootstrap";
import { IoLocationSharp } from "react-icons/io5";
import { BsChat } from "react-icons/bs";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth, storage } from "../../Firebase/FirebaseConfig"; // Ensure the correct Firebase import

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
import useSearchStore from "../../../store/searchStore"; // adjust the path
import axios from "axios";

const Userinfo = () => {
  const parms = useLocation().pathname;
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const location = useLocation();
  const [subCatgory, setsubCatgory] = useState("");
  // console.log(nestedSubCategory, "subCatgory___________2");
  const [nestedSubCategory, setNestedSubCategory] = useState("");
  console.log(subCatgory, "subCatgory___________1");
  console.log(nestedSubCategory, "subCatgory___________2");
  const { searchText } = useSearchStore();
  const [ImageURL, setImageURL] = useState(""); // ✅ Define the state

  const getImageURL = async () => {
    const imageRef = ref(storage, "blank-profile-picture.webp"); // image path inside storage

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
    getImageURL().then((url) => {
      if (url) {
        setImageURL(url);
        // Example usage
        console.log("Direct public image link:", url);
      }
    });
  }, []);
  // const scrollRef = useRef();
  const updateIsMobile = () => {
    setIsMobile(window.innerWidth <= 767);
  };
  const { id } = useParams();
  const getQueryParam = (param) => {
    const hash = window.location.hash;
    const queryIndex = hash.indexOf("?");
    if (queryIndex === -1) return null;

    const queryString = hash.substring(queryIndex + 1); // Extract query part after ?
    const searchParams = new URLSearchParams(queryString);
    return searchParams.get(param);
  };

  const [_Id, setId] = useState(null); // State to store ads data
  const [callingFrom, setCallingFrom] = useState(null); // State to store ads data
  const [refresh, setRefresh] = useState(false); // Add loading state

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    const callingFrom = getQueryParam("callingFrom");
    const subCatgoryParam = getQueryParam("subCatgory");
    const nestedSubCategoryParam = getQueryParam("NestedSubCategory");
    const ids = getQueryParam("id");
    setsubCatgory(subCatgoryParam);
    setNestedSubCategory(nestedSubCategoryParam);
    console.log(nestedSubCategoryParam, "subCatgory___________5");
    console.log(subCatgoryParam, "subCatgory___________5");
    console.log(callingFrom, "subCatgory___________6");

    console.log("callingFrom_____ID:ids11", ids);
    console.log("callingFrom From:11", callingFrom);

    setCallingFrom(callingFrom);
    setId(ids);
  }, [id, location, getQueryParam]);
  const [CityList, setCityList] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  console.log(selectedCities, "Fetched cities:1");
  console.log(cities, "Fetched cities:1cities");

  const [districts, setDistricts] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  console.log(selectedDistricts, "selectedDistricts___________");
  const [isCityModalVisible, setIsCityModalVisible] = useState(false);
  const cityModalRef = useRef(null);
  useEffect(() => {
    const modalEl = cityModalRef.current;
    if (!modalEl) return;

    const bsModal = Modal.getOrCreateInstance(modalEl);

    if (isCityModalVisible) {
      bsModal.show();
    } else {
      bsModal.hide();
    }

    return () => {
      try {
        bsModal.hide();
      } catch (e) {}
    };
  }, [isCityModalVisible]);

  const handleCheckboxChange1 = (option) => {
    const exists = selectedCities.some(
      (city) => city.CITY_ID === option.cityId
    );
    let updatedCities;
    if (exists) {
      updatedCities = selectedCities.filter(
        (city) => city.CITY_ID !== option.cityId
      );
    } else {
      updatedCities = [
        ...selectedCities,
        { REGION_ID: option.regionId, CITY_ID: option.cityId },
      ];
    }
    setSelectedCities(updatedCities);
  };
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!selectedCities.length) return;

      const REGION_ID = selectedCities[0]?.REGION_ID;
      const CITY_ID = selectedCities[0]?.CITY_ID;

      try {
        const response = await fetch(
          `http://168.231.80.24:9002/api/districts?REGION_ID=${REGION_ID}&CITY_ID=${CITY_ID}`
        );
        const data = await response.json();
        if (data.districts) {
          setDistricts(data.districts);
          console.log("Districts fetched:", data.districts);
        }
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchDistricts();
  }, [selectedCities]);

  const districtOptions = districts.map((district) => ({
    value: district.District_ID,
    label: district["District En Name"],
    regionId: district.REGION_ID,
    cityId: district.CITY_ID,
  }));
  console.log(districtOptions, "cityOptions________1");
  // useEffect(() => {
  //   // Assuming Location.json is like { "location": [ ... ] } or is an array itself
  //   if (cityData.City && Array.isArray(cityData.City)) {
  //     setCityList(cityData.City);
  //   } else if (Array.isArray(cityData)) {
  //     setCityList(cityData);
  //   } else {
  //     // fallback empty or log error
  //     setCityList([]);
  //     console.error("City JSON data is not in expected format");
  //   }
  // }, []);

  const regionOptions = [
    {
      value: 1,
      label: "Riyadh",
      regionId: 1,
      regionEn: "Riyadh",
      // regionAr: "الرياض",
      latitude: 24.63651,
      longitude: 46.718845,
    },
    {
      value: 2,
      label: "Makkah",
      regionId: 2,
      regionEn: "Makkah",
      // regionAr: "مكة المكرمة",
      latitude: 21.406328,
      longitude: 39.809088,
    },
    {
      value: 3,
      label: "Al Madinah",
      regionId: 3,
      regionEn: "Al Madinah",
      // regionAr: "المدينة المنورة",
      latitude: 24.427145,
      longitude: 39.649658,
    },
    {
      value: 4,
      label: "Al Qassim",
      regionId: 4,
      regionEn: "Al Qassim",
      // regionAr: "القصيم",
      latitude: 26.338499,
      longitude: 43.965396,
    },
    {
      value: 5,
      label: "Eastern",
      regionId: 5,
      regionEn: "Eastern",
      // regionAr: "المنطقة الشرقية",
      latitude: 26.372185,
      longitude: 49.993286,
    },
    {
      value: 6,
      label: "Asir",
      regionId: 6,
      regionEn: "Asir",
      // regionAr: "عسير",
      latitude: 18.20848,
      longitude: 42.533569,
    },
    {
      value: 7,
      label: "Tabuk",
      regionId: 7,
      regionEn: "Tabuk",
      // regionAr: "تبوك",
      latitude: 28.401064,
      longitude: 36.573486,
    },
    {
      value: 8,
      label: "Hail",
      regionId: 8,
      regionEn: "Hail",
      // regionAr: "حائل",
      latitude: 27.527758,
      longitude: 41.698608,
    },
    {
      value: 9,
      label: "Northern Borders",
      regionId: 9,
      regionEn: "Northern Borders",
      // regionAr: "الحدود الشماليه",
      latitude: 30.977609,
      longitude: 41.011962,
    },
    {
      value: 10,
      label: "Jazan",
      regionId: 10,
      regionEn: "Jazan",
      // regionAr: "جازان",
      latitude: 16.890959,
      longitude: 42.548375,
    },
    {
      value: 11,
      label: "Najran",
      regionId: 11,
      regionEn: "Najran",
      // regionAr: "نجران",
      latitude: 17.489489,
      longitude: 44.134333,
    },
    {
      value: 12,
      label: "Al Bahah",
      regionId: 12,
      regionEn: "Al Bahah",
      // regionAr: "الباحة",
      latitude: 20.014645,
      longitude: 41.456909,
    },
    {
      value: 13,
      label: "Al Jawf",
      regionId: 13,
      regionEn: "Al Jawf",
      // regionAr: "الجوف",
      latitude: 29.971888,
      longitude: 40.200476,
    },
  ];

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
  const cityOptions = cities.map((city) => ({
    value: city.CITY_ID,
    label: city["City En Name"],
    regionId: city.REGION_ID,
    cityId: city.CITY_ID,
  }));

  console.log(cityOptions, "cityOptions________2");
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

  // Handle city selection
  const [carsData, setCars] = useState([]); // All cars data
  console.log(carsData, "selectedCarsMake______1");
  const featuresList = [
    { name: "fullOption", label: "Full option" },
    { name: "insured", label: "Insured" },
    { name: "selfParking", label: "Self Parking" },
    { name: "alarmSystem", label: "Alarm System" },
    { name: "dealership", label: "Dealership" },
    { name: "quickSelling", label: "Quick Selling" },
    { name: "navigation", label: "Navigation" },
    { name: "temperatureSeats", label: "Temperature Controlled Seats" },
    { name: "inspected", label: "Inspected" },
    { name: "parkingSensors", label: "Parking Sensors" },
    { name: "bluetooth", label: "Bluetooth" },
    { name: "sunroof", label: "Sunroof/Moonroof" },
    { name: "leatherSeats", label: "Leather Seats" },
    { name: "backupCamera", label: "Backup Camera" },
    { name: "heatedSeats", label: "Heated Seats" },
    { name: "keylessEntry", label: "Keyless Entry" },
    { name: "remoteStart", label: "Remote Start" },
    { name: "adaptiveCruise", label: "Adaptive Cruise Control" },
    { name: "laneDeparture", label: "Lane Departure Warning" },
    { name: "blindSpot", label: "Blind Spot Monitoring" },
    { name: "premiumSound", label: "Premium Sound System" },
    { name: "awd", label: "All-Wheel Drive" },
    { name: "touchscreen", label: "Touchscreen Display" },
    { name: "carPlay", label: "Apple CarPlay/Android Auto" },
    { name: "ledHeadlights", label: "LED Headlights" },
    { name: "towPackage", label: "Tow Package" },
    { name: "powerLiftgate", label: "Power Liftgate" },
    { name: "headUpDisplay", label: "Head-Up Display" },
    { name: "rainWipers", label: "Rain-Sensing Wipers" },
    { name: "emergencyBraking", label: "Automatic Emergency Braking" },
    { name: "ambientLighting", label: "Ambient Lighting" },
  ];

  const [filteredCars, setFilteredCars] = useState([]); // Filtered cars based on search & city
  // const [searchQuery, setSearchQuery] = useState("");
  const [SortBy, setSortBy] = useState(""); // Search query for title and city
  // Search query for title and city
  // const [selectedCities, setSelectedCities] = useState([]); // Selected cities for filtering
  const [selectedEmirates, setSelectedEmirates] = useState([]); // Selected Emirates for filtering
  const [selectedCarsMake, setSelectedCarsMake] = useState([]);
  console.log(SortBy, "selectedCarsMake______");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedToyotaLocations, setSelectedToyotaLocations] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const [selectedMercedesBenzLocations, setSelectedMercedesBenzLocations] =
    useState([]);

  // Handle checkbox change for Toyota locations
  const [selectedCars1, setSelectedCars1] = useState([]);
  const [selectedOptionTransmission, setSelectedOptionTransmission] =
    useState("");
  const [logSelectedColor, setlogSelectedColor] = useState([]);
  const [AdditionalFeatures, setAdditionalFeatures] = useState([]);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  console.log(AdditionalFeatures, "AdditionalFeatures_______");
  const [Condition, setCondition] = useState([]);

  const [InteriorColor, setInteriorColor] = useState([]);

  const [RegionalSpec, setRegionalSpec] = useState([]);
  const [Fueltype, setFueltype] = useState([]);

  const [Insurance, setInsurance] = useState([]);

  const [selectedEngines, setSelectedEngines] = useState([]);
  const [fromCC, setFromCC] = useState("");
  const [toCC, setToCC] = useState("");
  const [selectedAssembly, setSelectedAssembly] = useState([]);
  const [selectedCarsBodyType, setSelectedCarsBodyType] = useState([]);
  const [showAllBodyTypes, setShowAllBodyTypes] = useState(false);

  const bodyTypeList = [
    "Coupe",
    "Sedan (Saloon)",
    "SUV",
    "Hatchback",
    "Convertible",
    "Wagon (Estate)",
    "Pickup Truck",
    "Crossover",
    "Minivan (MPV)",
    "Roadster",
    "Fastback",
    "Liftback",
    "Van",
    "Microcar",
  ];

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
  const [logSelectedPurpose, setlogSelectedPurpose] = useState("");

  const [selectedOptionVideoAvailability, setSelectedOptionVideoAvailability] =
    useState("");
  const [selectedOptionisFeatured, setSelectedOptionisFeatured] = useState("");
  const [activePage, setActivePage] = useState(1);
  console.log(logSelectedPurpose, "activePage____________");
  const [ads, setCarsData] = useState([]);
  const [userId, setUserId] = useState(""); // State for image preview
  const [error, setError] = useState(""); // ✅ Error state
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // For search query, if any
  const [states, setStates] = useState([]);
  const [selectedStates1, setSelectedStates1] = useState([]); // Selected states for filtering
  const [showModal, setShowModal] = useState(false);
  const [showModalDistricts, setShowModalDistricts] = useState(false);

  const [receiverId, setReceiverId] = useState(null);
  // useEffect(() => {
  //   setSearchQuery(searchText); // Update searchQuery from searchText
  // }, [searchText]);
  const categories = [
    "Cars For Sale",
    "Car Rental",
    "Plates Number",
    "Spare Parts",
    "Accessories",
    "Wheels & Rims",
    "Trucks & Heavy Machinery",
    "Tshaleeh",
    "Boats & Jet Ski",
    "Classic Cars",
    "Salvage Cars",
    "Mortgaged Cars",
    "Recovery",
    "Food Truck",
    "Caravans",
    "Reports",
    "Car Cleaning",
  ];
  const user = auth.currentUser;
  const currentUserId = user?.uid;

  // Format country data for React Select
  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedSubCategory, setselectedSubCategory] = useState("");
  const [selectedRegion, setSelectedRegionId] = useState("");
  console.log(selectedRegion, "adsDetailImages________1");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [mileage, setMileage] = useState("");
  const [adsDetailImages, setAdsDetailImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  // Group regions into pairs for two-column layout
  const regionPairs = [];
  for (let i = 0; i < regionOptions.length; i += 2) {
    regionPairs.push(regionOptions.slice(i, i + 2));
  }
  useEffect(() => {
    if (modalVisible && modalRef.current) {
      modalRef.current.style.display = "block";
      modalRef.current.classList.add("show");
      document.body.classList.add("modal-open");

      // Add backdrop
      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop fade show";
      backdrop.id = "modal-backdrop";
      document.body.appendChild(backdrop);
    } else if (modalRef.current) {
      modalRef.current.style.display = "none";
      modalRef.current.classList.remove("show");
      document.body.classList.remove("modal-open");

      // Remove backdrop
      const backdrop = document.getElementById("modal-backdrop");
      if (backdrop) {
        backdrop.remove();
      }
    }

    return () => {
      document.body.classList.remove("modal-open");
      const backdrop = document.getElementById("modal-backdrop");
      if (backdrop) {
        backdrop.remove();
      }
    };
  }, [modalVisible]);

  // useEffect(() => {
  //   const modalElement = modalRef.current;

  //   if (modalElement) {
  //     const bsModal = new Modal(modalElement);

  //     if (modalVisible) {
  //       bsModal.show();
  //     } else {
  //       bsModal.hide();
  //     }

  //     // Optional: return cleanup
  //     return () => {
  //       try {
  //         bsModal.hide();
  //       } catch (e) {}
  //     };
  //   }
  // }, [modalVisible]);

  // store array of REGION_ID + CITY_ID
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          `http://168.231.80.24:9002/api/cities?REGION_ID=${selectedRegion}`
        );
        const data = await response.json();

        if (data.cities) {
          setCities(data.cities);
          console.log("Fetched cities:", data.cities);
        } else {
          console.warn("No cities found");
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [selectedRegion]);

  console.log(adsDetailImages, "adsDetailImages________");
  useEffect(() => {
    const fetchAdsDetailImages = async () => {
      try {
        const adsCollectionRef = collection(db, "BodyContent");
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

  const carBrands = [
    "Toyota",
    "Ford",
    "Chevrolet",
    "Nissan",
    "Hyundai",
    "Genesis",
    "Lexus",
    "GMC",
    "Mercedes",
    "Honda",
    "BMW",
    "Motorcycles",
    "Kia",
    "Dodge",
    "Chrysler",
    "Jeep",
    "Mitsubishi",
    "Mazda",
    "Porsche",
    "Audi",
    "Suzuki",
    "Infinity",
    "Hummer",
    "Lincoln",
    "Volkswagen",
    "Daihatsu",
    "Geely",
    "Mercury",
    "Volvo",
    "Peugeot",
    "Bentley",
    "Jaguar",
    "Subaru",
    "MG",
    "ZXAUTO",
    "Changan",
    "Renault",
    "Buick",
    "Rolls-Royce",
    "Lamborghini",
    "Opel",
    "Skoda",
    "Ferrari",
    "Citroen",
    "Chery",
    "Seat",
    "Daewoo",
    "SABB",
    "SsangYong",
    "Aston Martin",
    "Proton",
    "Haval",
    "GAC",
    "Great Wall",
    "FAW",
    "BYD",
    "Alfa Romeo",
    "TATA",
    "JMC",
    "JETOUR",
    "CMC",
    "VICTORY AUTO",
    "MAXUS",
    "McLaren",
    "JAC",
    "Baic",
    "Dongfeng",
    "EXEED",
    "Tesla",
    "Soueaste",
    "Mahindra",
    "Zotye",
    "Hongqi",
    "SMART",
    "Tank",
    "Lynk & Co",
    "Lucid",
    "INEOS",
  ];
  const toyotaModels = [
    "Land Cruiser",
    "Camry",
    "Avalon",
    "Hilux",
    "Corolla",
    "FJ Cruiser",
    "Land Cruiser 70 Series",
    "Land Cruiser 70 Series Pick up",
    "Yaris",
    "Land Cruiser Prado",
    "Fortuner",
    "Aurion",
    "Cressida",
    "Sequoia",
    "Bus",
    "Innova",
    "RAV4",
    "XA",
    "Eco",
    "Tundra",
    "Previa",
    "Supra",
    "Toyota 86",
    "Avanza",
    "Highlander",
    "Prius",
    "Rush",
    "Granvia",
    "C-HR",
    "Corolla Cross",
    "Raize",
    "Crown",
    "Urban Cruiser",
  ];
  const fordModels = [
    "Crown Victoria",
    "Grand Marquis",
    "Explorer",
    "Taurus",
    "Expedition",
    "Mustang",
    "Edge",
    "f150",
    "Fusion",
    "Windstar",
    "Flex",
    "Fox",
    "Mondeo",
    "f250",
    "f350",
    "Ranger",
    "X Corgan",
    "Pick up",
    "Escape",
    "Splash",
    "Panther",
    "Thunderbird",
    "F450",
    "F550",
    "Escort",
    "Ecosport",
    "vans ford",
    "Figo",
    "Bronco",
    "Territory",
    "Everest",
  ];
  const chevroletModels = [
    "Caprice",
    "Tahoe",
    "Suburban",
    "Lumina",
    "Salvador",
    "Camaro",
    "Blazer",
    "Epica",
    "Malibu",
    "Aveo",
    "Cruze",
    "Optra",
    "Trail Blazer",
    "Avalanche",
    "Corvette",
    "فان",
    "Impala",
    "Traverse",
    "Uplander",
    "Express Van",
    "فنشر",
    "Captiva",
    "Astro Van",
    "Sonic",
    "Spark",
    "Caravan",
    "Cavalier",
    "Colorado",
    "جي فان",
    "Equinox",
    "Bolt",
    "Groove",
    "Trax",
  ];
  const nissanModels = [
    "Patrol",
    "DDSEN",
    "Tama",
    "Maxima",
    "Pathfinder",
    "Sunny",
    "Armada",
    "Xterra",
    "Class Z",
    "Nissan Shass",
    "Navara",
    "Murano",
    "Tiida",
    "Orphan",
    "Skyline",
    "Sentra",
    "X Trail",
    "Gloria",
    "Primera",
    "Terrano",
    "Qashqai",
    "Juke",
    "Kicks",
    "370Z",
    "GTR",
    "Civilian",
    "Patrol Safari",
    "Cedric",
    "Patrol NISMO",
  ];
  const hyundaiModels = [
    "Sonata",
    "Elantra",
    "Accent",
    "Azera",
    "Hyundai H1",
    "Sentavi",
    "Tucson",
    "Veloster",
    "Trajet",
    "i40",
    "Centennial",
    "Coupe",
    "i10",
    "Veracruz",
    "Terracan",
    "Matrix",
    "Galloper",
    "Kona",
    "Creta",
    "Palisade",
    "Grand Santa Fe",
    "i30",
    "Venue",
    "Staria",
    "Stargazer",
  ];
  const genesisModels = ["G70", "G80", "G90", "GV80", "GV70"];
  const lexusModels = [
    "LS",
    "LX",
    "ES",
    "GS",
    "IS",
    "RX",
    "GX",
    "SC",
    "NX",
    "LC",
    "RC",
    "RCF",
    "UX",
    "GSF",
  ];
  const gmcModels = [
    "Yukon",
    "Superban",
    "Sierra",
    "Pick up",
    "Envoy",
    "Acadia",
    "Van",
    "Savana",
    "Safari",
    "Terrain",
    "Jimmy",
  ];
  const mercedesModels = [
    "S",
    "E",
    "SE",
    "SEL",
    "AMG",
    "Mercedes-Benz G",
    "C",
    "SL",
    "CLS",
    "ML",
    "CL",
    "CLK",
    "SEC",
    "SLK",
    "A-Class",
    "GLS",
    "GLE",
    "GLC",
    "GLA",
    "CLA",
    "V-Class",
    "B",
    "GL",
    "GLK",
    "GT",
    "GTS",
    "R",
    "SLC",
    "Van Sprinter",
    "Maybach",
    "GLB",
    "EQA",
    "EQB",
    "EQE",
    "EQS",
  ];
  const hondaModels = [
    "Accord",
    "Civic",
    "Odyssey",
    "CRV",
    "Baylott",
    "City",
    "Legends",
    "Brielle",
    "Integra",
    "HRV",
    "ZRV",
  ];
  const bmwModels = [
    "Series VII",
    "Fifth Series",
    "Series X",
    "Series III",
    "Series VI",
    "Series 1st",
    "Series M",
    "Mini Cooper",
    "Series Z",
    "Series i",
    "Series 8",
    "Series 2",
    "Series 4",
  ];
  const motorcycleBrands = [
    "Suzuki",
    "Yamaha Motorcycles",
    "Chinese Motorcycle",
    "Honda Motorcycles",
    "Harley Motorcycles",
    "Ram's Motorcycles",
    "Kuzaki Motorcycles",
    "Jet Ski",
    "BMW Motorcycle",
    "KTM Motorcycles",
    "indian Motorcycle",
    "Buggy Car",
    "Polaris Bike",
    "can am",
    "Karting",
    "Haojue Motorcycle",
  ];
  const kiaModels = [
    "Optima",
    "Cerato",
    "Rio",
    "Carnival",
    "Sportage",
    "Cadenza",
    "Opirus",
    "Sorento",
    "Cairns",
    "Picanto",
    "Mohave",
    "Corres",
    "Soul",
    "Sephia",
    "K900",
    "Pegas",
    "Telluride",
    "Stinger",
    "Seltos",
    "Niro",
    "K5",
    "Sonet",
    "NS",
  ];
  const dodgeModels = [
    "Charger",
    "Gallinger",
    "Durango",
    "Caravan",
    "Archer",
    "Nitro",
    "Caliber",
    "Fiber",
    "Dodge Pickup",
    "Voyager",
    "Interpid",
    "Neon",
  ];
  const chryslerModels = [
    "M300",
    "C300",
    "Grand Voyager",
    "Concorde",
    "Crossfire",
    "C200",
    "PT Cruiser",
    "Imperial",
    "Plymouth",
    "Pacifica",
  ];
  const jeepModels = [
    "Cherokee",
    "Grand Cherokee",
    "Wrangler",
    "Liberty",
    "Renegade",
    "Compass",
    "Geladiator",
  ];
  const mitsubishiModels = [
    "Pajero",
    "Lancer",
    "L200",
    "Nativa",
    "Galant",
    "Colt",
    "Magna",
    "Sigma",
    "ASX",
    "Attrage",
    "Eclipse Cross",
    "Outlander",
    "Space Star",
    "Montero",
    "Xpander",
    "Grandis",
  ];
  const mazdaModels = [
    "Mazda 6",
    "CX9",
    "Mazda 3",
    "323",
    "626",
    "CX7",
    "BT50",
    "MPV",
    "CX5",
    "CX2",
    "RX8",
    "MX-5",
    "CX3",
    "Mazda 2",
    "Mazda 5",
    "CX30",
    "CX60",
    "CX90",
  ];
  const porscheModels = [
    "Cayenne",
    "Panamera",
    "911",
    "Carrera",
    "Cayman",
    "Boxster",
    "Turbo",
    "GT",
    "Macan",
    "718",
  ];
  const audiModels = [
    "A8",
    "A6",
    "Q7",
    "Q5",
    "A4",
    "A5",
    "A7",
    "S8",
    "TT",
    "A3",
    "Q3",
    "Q8",
    "R8",
    "RS",
    "S3",
  ];
  const suzukiModels = [
    "Vitara",
    "Samurai",
    "Swift",
    "Jimny",
    "Liana",
    "SX4",
    "Ertiga",
    "Baleno",
    "Grand Vitara",
    "Ciaz",
    "Celerio",
    "APV Pickup",
    "APV van",
    "Dzire",
    "Kizashi",
    "Fronx",
  ];
  const infinitiModels = [
    "FX",
    "QX",
    "G",
    "Q",
    "M",
    "Q30",
    "Q50",
    "Q60",
    "Q70",
    "QX50",
    "QX60",
    "QX70",
    "QX80",
    "QX56",
  ];
  const hummerModels = ["H3", "H2", "H1"];
  const lincolnModels = [
    "Town Car",
    "Navigator",
    "MKS",
    "S",
    "Continental",
    "Nautilus",
    "Aviator",
    "Corsair",
  ];
  const volkswagenModels = [
    "Passat",
    "Touareg",
    "Golf",
    "Beetle",
    "Polo",
    "Jetta",
    "Scirocco",
    "Tiguan",
    "Teramont",
    "T-roc",
    "Arteon",
  ];
  const daihatsuModels = ["Sirion", "Taurus", "Materia"];
  const geelyModels = [
    "EC7",
    "EC8",
    "LC Panda",
    "Emgrand 7",
    "Emgrand GS",
    "Emgrand X7",
    "Binray",
    "Coolray",
    "Azkarra",
    "Tugella",
    "Okavango",
    "Monjaro",
    "Preface",
    "Geometry c",
    "Starray",
  ];
  const mercuryModels = ["Mountaineer", "Marauder"];
  const volvoModels = [
    "S 80",
    "850",
    "XC90",
    "S 60R",
    "S 40",
    "960",
    "S 70",
    "V 70XC",
    "C 70",
    "S60",
    "S90",
    "XC40",
    "XC60",
  ];
  const peugeotModels = [
    "307",
    "407",
    "206",
    "508",
    "406",
    "Partner",
    "607",
    "404",
    "3008",
    "301",
    "5008",
    "Boxer",
    "Expert",
    "2008",
    "208",
    "408",
    "504",
    "Traveller",
    "Rifter",
    "Landtrek",
  ];
  const bentleyModels = [
    "Continental Flying Spur",
    "Continental GT",
    "Arnage",
    "Azure",
    "Continental GTC",
    "Brooklands Coupe",
    "Bentayga",
    "Mulsanne",
  ];
  const jaguarModels = [
    "XJ",
    "X type",
    "S type",
    "Suv Virgen",
    "Daimler",
    "E pace",
    "F pace",
    "F type",
    "I pace",
    "XE",
    "XF",
  ];
  const subaruModels = [
    "Legacy",
    "Impreza",
    "Forrester",
    "Outback",
    "WRX",
    "WRX STI",
    "XV",
  ];
  const mgModels = [
    "5",
    "6",
    "HS",
    "MG RX8",
    "RX5",
    "ZS",
    "T60",
    "MG GT",
    "HS PHEV",
    "MG 1",
    "MG 3",
    "WHALE",
  ];
  const changanModels = [
    "Eado",
    "CS35",
    "CS75",
    "CS95",
    "Changan V7",
    "CS85",
    "Alsvin",
    "Hunter",
    "CS35 Plus",
    "CS75 Plus",
    "UNI-T",
    "UNI-K",
    "UNI-V",
  ];
  const renaultModels = [
    "Megane",
    "Fluence",
    "Safrane",
    "Laguna",
    "Clio",
    "Talisman",
    "Duster",
    "Dokker Van",
    "Symbol",
    "Capture",
    "Koleos",
    "Master",
    "Megane GT",
    "Megane RS",
  ];
  const buickModels = [
    "Encore",
    "Encore GX",
    "Enclave",
    "Envision",
    "LaCrosse",
    "Regal",
    "Verano",
    "Lucerne",
    "Cascada",
    "Century",
    "Rainier",
    "Park Avenue",
    "Rendezvous",
  ];
  const rollsRoyceModels = ["Phantom", "Quest", "Dawn", "Wraith", "Cullinan"];
  const lamborghiniModels = ["Aventador", "Urus", "Huracan", "Gallardo"];
  const opelModels = ["Astra", "Rekord"];
  const skodaModels = [
    "Octavia",
    "Rapid",
    "Superb",
    "Fabia",
    "Karoq",
    "Kodiaq",
  ];
  const ferrariModels = [
    "488 PISTA",
    "812",
    "Break up",
    "GTC4",
    "MONZA",
    "Roma",
    "SF90",
  ];
  const citroenModels = [
    "C3",
    "C4",
    "C6",
    "Xara",
    "C2",
    "C1",
    "Regency",
    "Berlingo",
  ];
  const cheryModels = [
    "QQ",
    "Chery A5",
    "EASTAR",
    "Quinn",
    "Chery A3",
    "Chery A1",
    "Arezzo 3",
    "Arezzo 6",
    "Tiggo 2",
    "Tiggo 7",
    "Tiggo 8",
    "Tiggo 4",
    "Arrizo 5",
    "Arrizo 8",
  ];
  const daewooModels = ["Leganza", "Lanos", "Mats", "Nubira"];
  const sabbModels = [
    "Fiat",
    "Dolce Vita",
    "Fiat 500",
    "Fiat 500X",
    "Fiorino",
    "Linea",
  ];
  const ssangYongModels = [
    "Actyon",
    "Musso",
    "Korando",
    "XLV",
    "Tivoli",
    "Rexton",
  ];
  const astonMartinModels = ["DB11", "DBS", "Rapide S", "Vantage"];
  const protonModels = ["GEN•2", "Persona", "Waja"];
  const havalModels = [
    "Haval H2",
    "Haval H6",
    "Haval H9",
    "Jolion",
    "Dargo",
    "H6 GT",
  ];
  const gacModels = [
    "GA3",
    "GA4",
    "GA8",
    "GS3",
    "GS4",
    "GS8",
    "GN6",
    "GN8",
    "GS5",
    "GA6",
    "EMPOW",
    "EMZOOM",
    "EMKOO",
  ];
  const greatWallModels = ["Wingle 5", "Wingle 6", "Wingle 7", "POER"];
  const fawModels = [
    "T80",
    "V80",
    "Oley",
    "Besturn B50",
    "Besturn B70",
    "Besturn X80",
    "T77",
    "X40",
    "T33",
    "T99",
  ];
  const bydModels = ["F3", "F5", "F7", "S6", "S7"];
  const alfaRomeoModels = ["GIULIA", "GIULIETTA", "STELVIO"];
  const tataModels = ["XENON"];
  const jetourModels = ["X70", "X70S", "X90", "Dashing"];
  const victoryAutoModels = ["Lifan"];
  const cmcModels = ["Foton", "Tunland"];
  const maxusModels = [
    "D90",
    "Maxus V80",
    "Maxus T60",
    "V90",
    "T70",
    "G50",
    "G10",
    "D90 Pro",
    "D60",
    "60 Tornado",
    "Maxus G90",
    "Maxus T90",
  ];
  const baicModels = [
    "D50",
    "X35",
    "X7",
    "BJ80",
    "BJ40SE",
    "BJ40S",
    "BJ40 Plus",
    "BJ40F",
    "BJ40 C",
  ];
  const dongfengModels = [
    "A30",
    "A60 MAX",
    "AX7",
    "AX7 MACH",
    "C31",
    "C32",
    "C35",
    "E32",
    "T5 Evo",
  ];
  const exeedModels = ["txl", "VX", "Exeed LX"];
  const tankModels = ["Tank 300", "Tank 500"];
  const lynkCoModels = ["1", "3", "03 plus", "5", "9"];
  const lucidModels = ["Air", "Gravity"];
  const ineosModels = ["Grenadier"];

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const [Model, setModel] = useState("");

  const [showList, setShowList] = useState(false);

  const filteredBrands =
    query === ""
      ? carBrands
      : carBrands.filter((brand) =>
          brand.toLowerCase().includes(query.toLowerCase())
        );
  console.log("Selected:______", filteredBrands);
  console.log("Selected:______1", selected);
  console.log("Selected:______2", query);

  const handleSelect = (brand) => {
    setQuery(brand);
    setSelected(brand);
    setShowList(false);
    console.log("Selected:", brand);
  };

  console.log(selectedSubCategory, "selectedSubCategory________");
  const [showAll, setShowAll] = useState(false);

  const handleCategoryCheck = (category) => {
    setselectedSubCategory((prev) => (prev === category ? "" : category));
  };

  const visibleCategories = showAll ? categories : categories.slice(0, 4);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
  const handleStateChange1 = (selectedOptions) => {
    // Extract state names from the selected options
    const stateNames = selectedOptions
      ? selectedOptions.map((option) => option.label)
      : [];
    setSelectedStates1(stateNames);
    filterCars(searchQuery, selectedCities, stateNames); // Apply the filter
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
    let date;
    if (timestamp instanceof Date) {
      date = timestamp;
    } else if (timestamp?._seconds) {
      date = new Date(timestamp._seconds * 1000);
    } else if (typeof timestamp === "number") {
      date = new Date(timestamp);
    } else {
      return "Invalid time";
    }
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "Just now";
  }
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
  // const [bookmarkedCars, setBookmarkedCars] = useState({});
  const [showPhone, setShowPhone] = useState(false);
  const [activePhoneIndex, setActivePhoneIndex] = useState(null);

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

  const handleCheckboxChangeSellerType = (event, label) => {
    const isChecked = event.target.checked;
    const selectedLabel = isChecked ? label : "";
    setSelectedCheckboxSellerType(selectedLabel);
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
        ? prevSelected.filter((item) => item !== label)
        : [...prevSelected, label];

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

  const handleCheckboxAdditionalFeatures = (name) => {
    setAdditionalFeatures((prevSelected) =>
      prevSelected.includes(name)
        ? prevSelected.filter((item) => item !== name)
        : [...prevSelected, name]
    );
  };

  const handleCheckboxCondition = (label) => {
    setCondition((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };

  const handleCheckboxInteriorColor = (label) => {
    setInteriorColor((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangeRegionalSpec = (label) => {
    setRegionalSpec((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangeFueltype = (label) => {
    setFueltype((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
  const handleCheckboxChangeInsurance = (label) => {
    setInsurance((prevSelected) => {
      if (prevSelected.includes(label)) {
        // Remove the label if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // Add the label to the selected array
        return [...prevSelected, label];
      }
    });
  };
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
    filterCars(searchQuery, selectedEmirates, searchText);
  }, [selectedEmirates, searchQuery, searchText]);
  useEffect(() => {
    console.log("Selected Emirates: ", selectedEmirates);
  }, [selectedEmirates]);
  const [bookmarkedCar, setBookmarkedCar] = useState({
    bookmarked: false,
    id: null,
  });
  console.log(bookmarkedCar, "bookmarkedCars__________");
  useEffect(() => {
    const CITY_ID = selectedCities[0]?.CITY_ID;
    const DISTRICT_ID = selectedDistricts[0]?.DISTRICT_ID; // ✅ Get first DISTRICT_ID

    const fetchCars = async () => {
      try {
        setLoading(true);
        console.log("callingFrom_____ID:ids11__________-", _Id);

        const params = new URLSearchParams();
        if (searchText) params.append("searchText", searchText);
        if (selectedRegion) params.append("regionId", selectedRegion);
        if (CITY_ID) params.append("CITY_ID", CITY_ID);
        if (_Id) params.append("id", _Id);

        if (DISTRICT_ID) params.append("DISTRICT_ID", DISTRICT_ID); // ✅ Add DISTRICT_ID

        const response = await fetch(
          `http://168.231.80.24:9002/api/fetchCars?${params.toString()}`
        );

        const carsData = await response.json();
        setCars(carsData.data);
        setFilteredCars(carsData.data);
        setLoading(false);

        console.log(carsData, "carsData_________cars");
      } catch (error) {
        console.error("Error getting cars:", error);
        setLoading(false);
      }
    };

    fetchCars();
  }, [
    searchText,
    // bookmarkedCar,
    selectedRegion,
    selectedCities,
    selectedDistricts,
    refresh,
  ]); // ✅ Include selectedDistricts

  // useEffect(() => {
  //    const CITY_ID = selectedCities[0]?.CITY_ID;
  //   const fetchCars = async () => {
  //     try {
  //       setLoading(true);

  //       // Build query params
  //       const params = new URLSearchParams();
  //       if (searchText) params.append("searchText", searchText);
  //       if (selectedRegion) params.append("regionId", selectedRegion);

  //       const response = await fetch(
  //         `http://168.231.80.24:9002/route/cars?${params.toString()}`
  //       );

  //       const carsData = await response.json();
  //       setCars(carsData);
  //       setFilteredCars(carsData);
  //       setLoading(false);

  //       console.log(carsData, "carsData_________cars");
  //     } catch (error) {
  //       console.error("Error getting cars:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchCars();
  // }, [searchText, bookmarkedCar, selectedRegion, selectedCities]);

  // useEffect(() => {
  //   const fetchCars = async () => {
  //     try {
  //       setLoading(true); // Show spinner

  //       // Add searchText as query param if present
  //       const query = searchText
  //         ? `?searchText=${encodeURIComponent(searchText)}`
  //         : "";
  //       const response = await fetch(
  //         `http://168.231.80.24:9002/route/cars${query}&regionId=&{selectedRegion}`
  //       );
  //       const carsData = await response.json();

  //       setCars(carsData);
  //       setFilteredCars(carsData); // Initially show all or filtered
  //       setLoading(false);

  //       console.log(carsData, "carsData_________cars");
  //     } catch (error) {
  //       console.error("Error getting cars:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchCars();
  // }, [searchText, bookmarkedCar,selectedRegion]);
  const handleShowModal = (userId) => {
    console.log("Opening modal for receiverId:", receiverId); // Debug
    console.log("Opening modal for Current User ID:", currentUserId); // Debug
    setReceiverId(userId);
    setShowModal(true);
    // You can store the userId in state if needed, e.g., setSelectedUserId(userId);
  };
  const [userData, setUserData] = useState(null);
  console.log("Fetched User:___", userData);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.post(
          "http://168.231.80.24:9002/currentUserData/userData",
          {
            userId: "KP1YqEjam3gC3osBxSiQBzfMKq83",
          }
        );

        setUserData(res.data.user);
      } catch (error) {
        console.error(
          "Fetch user failed:",
          error.response?.data || error.message
        );
      }
    };

    fetchUserData();
  }, []);

  const [showPopover, setShowPopover] = useState(false);
  const [popoverCarId, setPopoverCarId] = useState(null); // Store the specific car's ID
  // const handleView = (carId) => {
  //   const now = Date.now();
  //   const viewedCars = JSON.parse(localStorage.getItem("viewedCars") || "{}");

  //   const lastViewed = viewedCars[carId];

  //   // If never viewed OR 30 seconds (30000 ms) have passed
  //   if (!lastViewed || now - lastViewed > 30 * 1000) {
  //     fetch(`http://168.231.80.24:9002/route/cars/${carId}/view`, {
  //       method: "PATCH",
  //     });

  //     viewedCars[carId] = now;
  //     localStorage.setItem("viewedCars", JSON.stringify(viewedCars));
  //   }
  // };
  const formatCategory = (category) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  };

  const handleView = (carId) => {
    const now = Date.now();
    const cooldownPeriod = 30 * 1000; // 30 seconds
    const viewedCars = JSON.parse(localStorage.getItem("viewedCars") || "{}");

    // Check if the car has been viewed recently
    if (!viewedCars[carId] || now - viewedCars[carId] > cooldownPeriod) {
      // If it's not in the cooldown period, increment the view count on the server
      fetch(`http://168.231.80.24:9002/route/cars/${carId}/view`, {
        method: "PATCH",
      });

      // Update the last viewed timestamp for that car in localStorage
      viewedCars[carId] = now;
      localStorage.setItem("viewedCars", JSON.stringify(viewedCars));
    } else {
      console.log(`Please wait 30 seconds before viewing this car again.`);
    }
  };

  // const toggleBookmark = async (carId) => {
  //   try {
  //     // Find the selected car
  //     const selectedCar = carsData.find((car) => car.id === carId);
  //     if (!selectedCar) return;
  //     const user = auth.currentUser;
  //     if (!user) {
  //       setPopoverCarId(carId); // Show popover only for this car
  //       setTimeout(() => setPopoverCarId(null), 3000); // Hide after 3 seconds
  //       return;
  //     }

  //     const userId = user.uid; // Replace with the actual userId you want to filter by

  //     // Toggle bookmark status
  //     const newBookmarkedStatus = !(selectedCar.bookmarked || false);

  //     // Update local state
  //     setBookmarkedCar({ bookmarked: newBookmarkedStatus, id: carId });

  //     // Update Firestore
  //     const carDocRef = doc(db, "Cars", carId);
  //     await updateDoc(carDocRef, {
  //       bookmarked: newBookmarkedStatus,
  //       userId: userId,
  //     });

  //     // Update local cars state
  //     setCars((prevCars) =>
  //       prevCars.map((car) =>
  //         car.id === carId ? { ...car, bookmarked: newBookmarkedStatus } : car
  //       )
  //     );
  //     setRefresh(!refresh);
  //     console.log(`Car ${carId} bookmarked: ${newBookmarkedStatus}`);
  //   } catch (error) {
  //     console.error("Error updating bookmark:", error);
  //   }
  // };
  // const handleCityChange = (selectedOptions) => {
  //   // Extract city names from the selected options
  //   const cityNames = selectedOptions
  //     ? selectedOptions.map((option) => option.label)
  //     : [];
  //   setSelectedCities(cityNames);
  //   filterCars(searchQuery, cityNames); // Apply the filter
  // };
  const toggleBookmark = async (itemId, collectionName) => {
    console.log(
      "Toggling bookmark for itemnot found in :",
      itemId,
      "in collection:",
      collectionName
    );
    try {
      const user = auth.currentUser;
      if (!user) {
        setPopoverCarId(itemId);
        setTimeout(() => setPopoverCarId(null), 3000);
        return;
      }

      const userId = user.uid;

      // 🔁 Map display category name to Firestore collection name
      const collectionMap = {
        Motors: "Cars",
        Automotive: "Cars",
        Other: "Education",
        Services: "TRAVEL",
        "Pet & Animals": "PETANIMALCOMP",
        "Home & Furniture": "HEALTHCARE",

        "Sports & Game": "SPORTSGAMESComp",
        "Real Estate": "REALESTATECOMP",
        "Home & Furnituer": "HEALTHCARE",

        "Fashion Style": "FASHION",
        "Job Board": "JOBBOARD",
        Electronics: "ELECTRONICS",
      };

      const firestoreCollection =
        collectionMap[collectionName] || collectionName;

      // Reference to the document
      const itemDocRef = doc(db, firestoreCollection, itemId);

      // Read current bookmark status from Firestore
      const itemSnapshot = await getDoc(itemDocRef);
      if (!itemSnapshot.exists()) {
        console.warn(
          `Toggling bookmark forItem ${itemId} not found in ${firestoreCollection}`
        );
        return;
      }

      const currentData = itemSnapshot.data();
      const newBookmarkedStatus = !(currentData.bookmarked || false);

      // Set UI state only if needed
      setBookmarkedCar({ bookmarked: newBookmarkedStatus, id: itemId });

      // Update Firestore
      await updateDoc(itemDocRef, {
        bookmarked: newBookmarkedStatus,
        userId: userId,
      });

      // Optional: refresh trigger for parent
      setRefresh((prev) => !prev);

      console.log(
        `Toggling bookmark for ${collectionName} (${firestoreCollection}) item ${itemId} bookmarked: ${newBookmarkedStatus}`
      );
    } catch (error) {
      console.error(`Error updating bookmark in ${collectionName}:`, error);
    }
  };
  useEffect(() => {
    console.log("Selected Cities: ", selectedCities);
  }, [selectedCities]);

  useEffect(() => {
    setLoading(true);

    filterCars(
      searchQuery,
      selectedCities,
      subCatgory,
      searchText,
      AdditionalFeatures,

      nestedSubCategory,
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
      SortBy,
      selectedSubCategory,
      mileage,
      logSelectedPurpose,
      RegionalSpec,
      Insurance,
      InteriorColor,
      selected,
      Model,
      Fueltype,
      Condition,
      selectedCity,
      selectedDistrict
    );
  }, [
    selectedCities,
    searchQuery,
    subCatgory,
    searchText,
    AdditionalFeatures,

    nestedSubCategory,
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
    SortBy,
    selectedSubCategory,
    mileage,
    logSelectedPurpose,
    RegionalSpec,
    Insurance,
    InteriorColor,
    selected,
    Model,
    Fueltype,
    Condition,
    selectedCity,
    selectedDistrict,
  ]);

  // Handle search input change
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter cars based on the search query and selected cities
    filterCars(
      query,
      selectedCities,
      subCatgory,
      searchText,
      AdditionalFeatures,

      nestedSubCategory,
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
      SortBy,
      selectedSubCategory,
      mileage,
      logSelectedPurpose,
      RegionalSpec,
      Insurance,
      InteriorColor,
      selected,
      Model,
      Fueltype,
      Condition,
      selectedCity,
      selectedDistrict
    );
  };
  const filterCars = (
    query,
    cities,
    subCatgory,
    searchText,
    AdditionalFeatures,

    nestedSubCategory,
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
    SortBy,
    selectedSubCategory,
    mileage,
    logSelectedPurpose,
    RegionalSpec,
    Insurance,
    InteriorColor,
    selected,
    Model,
    Fueltype,
    Condition,
    selectedCity,
    selectedDistrict
  ) => {
    let filtered = carsData;

    // Filter by search query
    if (query.trim() !== "") {
      const lowercasedQuery = query?.toLowerCase();
      filtered = filtered.filter((car) => {
        const fieldsToSearch = [
          car.title,
          car.City,
          car.Emirates,
          car.Make,
          car.Registeredin,
          car.AdditionalFeatures,

          car.Color,
          car.Transmission,
          car.EngineType,
          car.Assembly,
          car.BodyType,
          car.NumberOfDoors,
          car.SeatingCapacity,
          car.ModalCategory,
          car.SellerType,
          car.PictureAvailability,
          car.VideoAvailability,
          car.AdType,
          car.TrustedCars,
          car.SubCategory,
          car.mileage,
          car.Purpose,
          car.RegionalSpec,
          car.Insurance,
          car.InteriorColor,
          car.Model,
          car.Fueltype,
          car.Condition,
          car.NestedSubCategory,
          car.NumberofDoors,
        ];

        return fieldsToSearch.some(
          (field) =>
            typeof field === "string" &&
            field.toLowerCase().includes(lowercasedQuery)
        );
      });

      // filtered = filtered.filter(
      //   (car) =>
      //     car.title?.toLowerCase().includes(lowercasedQuery) ||
      //     car.City?.toLowerCase().includes(lowercasedQuery) ||
      //     car.Emirates?.toLowerCase().includes(lowercasedQuery) ||
      //     car.Make?.toLowerCase().includes(lowercasedQuery) ||
      //     car.Registeredin?.toLowerCase().includes(lowercasedQuery) ||
      //     car.Color?.toLowerCase().includes(lowercasedQuery) ||
      //     car.Transmission?.toLowerCase().includes(lowercasedQuery) ||
      //     car.EngineType?.toLowerCase().includes(lowercasedQuery) ||
      //     car.Assembly?.toLowerCase().includes(lowercasedQuery) ||
      //     car.BodyType?.toLowerCase().includes(lowercasedQuery) ||
      //     car.NumberOfDoors?.toLowerCase().includes(lowercasedQuery) ||
      //     car.SeatingCapacity?.toLowerCase().includes(lowercasedQuery) ||
      //     car.ModalCategory?.toLowerCase().includes(lowercasedQuery) ||
      //     car.SellerType?.toLowerCase().includes(lowercasedQuery) ||
      //     car.PictureAvailability?.toLowerCase().includes(lowercasedQuery) ||
      //     car.VideoAvailability?.toLowerCase().includes(lowercasedQuery) ||
      //     car.AdType?.toLowerCase().includes(lowercasedQuery) ||
      //     car.TrustedCars?.toLowerCase().includes(lowercasedQuery) ||
      //     car.SubCategory?.toLowerCase().includes(lowercasedQuery) ||
      //     car.mileage?.toLowerCase().includes(lowercasedQuery) ||
      //     car.Purpose?.toLowerCase().includes(lowercasedQuery) ||
      //     car.RegionalSpec?.toLowerCase().includes(lowercasedQuery) ||
      //     car.Insurance?.toLowerCase().includes(lowercasedQuery) ||
      //     car.InteriorColor?.toLowerCase().includes(lowercasedQuery) ||
      //     car.Make?.toLowerCase().includes(lowercasedQuery) ||
      //     car.Model?.toLowerCase().includes(lowercasedQuery) ||
      //     car.Fueltype?.toLowerCase().includes(lowercasedQuery) ||
      //     car.Condition?.toLowerCase().includes(lowercasedQuery) ||
      //     // car.AdditionalFeatures?.toLowerCase().includes(lowercasedQuery) ||
      //     car.NestedSubCategory?.toLowerCase().includes(lowercasedQuery)
      // );
    }
    setLoading(false);
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
    if (searchText?.length > 0) {
      filtered = filtered.filter((car) => {
        // Ensure car.title exists and is a string
        if (!car?.title || typeof car.title !== "string") {
          console.warn("Invalid car title:", car);
          return false;
        }
        // Case-insensitive search
        return car.title.toLowerCase().includes(searchText.toLowerCase());
      });
    }
    // Filter by selected cities
    if (cities?.length > 0) {
      filtered = filtered.filter((car) => cities.includes(car.City));
    }
    // Filter by selected cities
    if (selectedNumbersNumberofDoors?.length > 0) {
      filtered = filtered.filter((car) =>
        selectedNumbersNumberofDoors.includes(car.NumberofDoors)
      );
    }

    if (nestedSubCategory) {
      filtered = filtered.filter((car) =>
        nestedSubCategory.toLowerCase().includes(car.NestedSubCategory)
      );
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
    if (AdditionalFeatures?.length > 0) {
      filtered = filtered.filter((car) =>
        AdditionalFeatures.includes(car.AdditionalFeatures)
      );
    }
    if (Condition?.length > 0) {
      filtered = filtered.filter((car) => Condition.includes(car.Condition));
    }

    if (Fueltype?.length > 0) {
      filtered = filtered.filter((car) => Fueltype.includes(car.Fueltype));
    }
    if (Model?.length > 0) {
      filtered = filtered.filter((car) => Model.includes(car.Model));
    }
    if (selected?.length > 0) {
      filtered = filtered.filter((car) => selected.includes(car.Make));
    }
    if (InteriorColor?.length > 0) {
      filtered = filtered.filter((car) =>
        InteriorColor.includes(car.InteriorColor)
      );
    }
    if (RegionalSpec?.length > 0) {
      filtered = filtered.filter((car) =>
        RegionalSpec.includes(car.RegionalSpec)
      );
    }
    if (Insurance?.length > 0) {
      filtered = filtered.filter((car) => Insurance.includes(car.Insurance));
    }
    if (subCatgory?.length > 0) {
      filtered = filtered.filter((car) => subCatgory.includes(car.SubCategory));
    }
    if (selectedSubCategory?.length > 0) {
      filtered = filtered.filter((car) =>
        selectedSubCategory.includes(car.SubCategory)
      );
    }

    if (logSelectedPurpose?.length > 0) {
      filtered = filtered.filter((car) =>
        logSelectedPurpose.includes(car.Purpose)
      );
    }
    if (mileage?.length > 0) {
      filtered = filtered.filter((car) => mileage.includes(car.mileage));
    }
    // Filter by selected cities
    else if (selectedOptionVideoAvailability?.length > 0) {
      filtered = filtered.filter((car) =>
        selectedOptionVideoAvailability.includes(car.VideoAvailability)
      );
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
      filtered = filtered.filter((car) => selectedCarsMake.includes(car.Make));
    }

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

    setFilteredCars(filtered);
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

        <Container
          className="parent-main category"
          style={{
            color: "black", // Text color
            marginTop: window.innerWidth <= 768 ? "8rem" : "12rem",
          }}
        >
          <div
            className="adsCategory_head"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "40px",
              marginBottom: "20px",
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
                // background: "#E9EEFF",
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
                navigate("/AutomotiveComp");
              }}
              className="btn"
              style={{
                background: window.innerWidth <= 576 ? "none" : "#E9EEFF",
                fontWeight: "500",
                // pointerEvents: "none",
                padding: window.innerWidth <= 576 ? "0px" : "10px 15px",
              }}
            >
              User Listing
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
          style={{
            color: "black", // Text color
          }}
        >
          <Row className="filter_outterwrap">
            {/* Sidebar */}
            <Col lg={3} className="filter_main_wrap">
              <div className="side_bar_main_wrap">
                <h5
                  style={{
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px",
                    backgroundColor: "#2D4495",
                    color: "white",
                    width: "auto",
                    paddingLeft: "14px",
                    paddingTop: "9px",
                    paddingBottom: "9px",
                  }}
                >
                  Show Results by:
                </h5>
                <Form className="filter_innerwrap">
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
                          className="form-control rounded-pill pe-5 input_feild"
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
                  {/*   ------------------------------------------                            */}
                  <Accordion className="mt-3">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Sub Categories</Accordion.Header>
                      <Accordion.Body>
                        <div style={{ maxWidth: "300px", margin: "20px" }}>
                          <Form.Group>
                            {/* <Form.Label>Select a Category</Form.Label> */}

                            {visibleCategories.map((category, index) => (
                              <div key={index} className="form-check mb-2">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`cat-${index}`}
                                  value={category}
                                  checked={selectedSubCategory === category}
                                  onChange={() => handleCategoryCheck(category)}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`cat-${index}`}
                                >
                                  {category}
                                </label>
                              </div>
                            ))}

                            {categories.length > 4 && (
                              <Button
                                variant="link"
                                onClick={() => setShowAll((prev) => !prev)}
                                className="p-0 mt-2"
                              >
                                {showAll ? "Show less..." : "Show more..."}
                              </Button>
                            )}
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
                  {/*--------------------------------------*/}
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Select Region</Accordion.Header>
                      <Accordion.Body>
                        <Form.Group className="mb-3">
                          {/* <Form.Label>Select a Region</Form.Label> */}
                          <div className="mb-3">
                            {regionOptions.slice(0, 4).map((region) => (
                              <div className="form-check" key={region.regionId}>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`region-${region.regionId}`}
                                  checked={selectedRegion === region.regionId}
                                  onChange={() =>
                                    setSelectedRegionId(
                                      selectedRegion === region.regionId
                                        ? ""
                                        : region.regionId
                                    )
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`region-${region.regionId}`}
                                >
                                  {region.label}
                                </label>
                              </div>
                            ))}
                            <button
                              type="button"
                              className="btn btn-link p-0"
                              onClick={() => setModalVisible(true)}
                            >
                              Show more choices...
                            </button>
                            <div className="">
                              <div
                                className="modal fade more_optn_modal_main"
                                id="regionModal11"
                                tabIndex="-1"
                                ref={modalRef}
                                aria-labelledby="regionModalLabel"
                                aria-hidden="true"
                              >
                                {/* <div className="modal-dialog modal-dialog-scrollable modal-lg"> */}
                                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
                                  <div className="modal-content border-0 shadow-lg">
                                    <div className="modal-header bg-light border-bottom">
                                      <div className="d-flex align-items-center">
                                        <i className="bi bi-geo-alt-fill text-primary me-2 fs-5"></i>
                                        <h5
                                          className="modal-title fw-semibold mb-0"
                                          id="regionModalLabel"
                                        >
                                          Select a Region
                                        </h5>
                                      </div>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setModalVisible(false)}
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                    <div className="modal-body p-3">
                                      <div className="mb-2">
                                        <small className="text-muted">
                                          Choose your preferred region from the
                                          options below
                                        </small>
                                      </div>
                                      <div className="row g-2">
                                        <ul className="more_choice_main_list">
                                          {regionOptions.map((region) => (
                                            <li
                                              className=""
                                              key={region.regionId}
                                            >
                                              <label
                                                className="form-check-label"
                                                htmlFor={`modal-region-${region.regionId}`}
                                              >
                                                <input
                                                  className="form-check-input me-2 mt-1"
                                                  type="checkbox"
                                                  id={`modal-region-${region.regionId}`}
                                                  checked={
                                                    selectedRegion ===
                                                    region.regionId
                                                  }
                                                  onChange={() =>
                                                    setSelectedRegionId(
                                                      selectedRegion ===
                                                        region.regionId
                                                        ? ""
                                                        : region.regionId
                                                    )
                                                  }
                                                />
                                                <span className="fw-medium text-dark">
                                                  {region.regionEn}
                                                </span>
                                              </label>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="modal-footer bg-light border-top d-flex justify-content-between align-items-center">
                                      <div className="text-muted small">
                                        {selectedRegion
                                          ? "1 region selected"
                                          : "No region selected"}
                                      </div>
                                      <div className="d-flex gap-2">
                                        <button
                                          type="button"
                                          className="btn btn-outline-secondary"
                                          onClick={() => {
                                            setSelectedRegionId("");
                                          }}
                                        >
                                          Clear Selection
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-primary px-4"
                                          onClick={() => setModalVisible(false)}
                                        >
                                          Done
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <style jsx>{`
                                .hover-shadow {
                                  transition: all 0.15s ease-in-out;
                                }
                                .hover-shadow:hover {
                                  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
                                  transform: translateY(-0.5px);
                                }
                                .cursor-pointer {
                                  cursor: pointer;
                                }
                                .transition-all {
                                  transition: all 0.15s ease-in-out;
                                }
                                .form-check:has(.form-check-input:checked) {
                                  background-color: #f8f9fa;
                                  border-color: #0d6efd !important;
                                }
                                .form-check:has(.form-check-input:checked)
                                  .form-check-label {
                                  color: #0d6efd;
                                }
                              `}</style>
                            </div>
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

                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Select City</Accordion.Header>
                      <Accordion.Body>
                        <Form.Group className="mb-3">
                          {/* <Form.Label>Select a City</Form.Label> */}

                          <>
                            {/* First 4 Checkboxes */}
                            <div className="grid grid-cols-1 gap-2">
                              {cityOptions.slice(0, 4).map((option) => (
                                <label
                                  key={option.value}
                                  className="d-flex align-items-center gap-2"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedCities.some(
                                      (city) => city.CITY_ID === option.cityId
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange1(option)
                                    }
                                  />
                                  <span>{option.label}</span>
                                </label>
                              ))}
                            </div>

                            <button
                              type="button"
                              className="btn btn-link p-0"
                              onClick={() => setIsCityModalVisible(true)}
                            >
                              Show more choices...
                            </button>

                            <div
                              className="modal fade more_optn_modal_main"
                              id="moreCitiesModal1"
                              tabIndex="-1"
                              ref={cityModalRef}
                              aria-labelledby="moreCitiesModalLabel1"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="moreCitiesModalLabel1"
                                    >
                                      Select More Cities
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={() =>
                                        setIsCityModalVisible(false)
                                      }
                                    ></button>
                                  </div>

                                  <div className="modal-body">
                                    <div className="row">
                                      <ul className="more_choice_main_list">
                                        {cityOptions.slice(4).map((option) => (
                                          <li className="" key={option.value}>
                                            <label className="d-flex align-items-center gap-2">
                                              <input
                                                type="checkbox"
                                                checked={selectedCities.some(
                                                  (city) =>
                                                    city.CITY_ID ===
                                                    option.cityId
                                                )}
                                                onChange={() =>
                                                  handleCheckboxChange1(option)
                                                }
                                              />
                                              <span>{option.label}</span>
                                            </label>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>

                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={() =>
                                        setIsCityModalVisible(false)
                                      }
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
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
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Select District</Accordion.Header>
                      <Accordion.Body>
                        <Form.Group className="mb-3">
                          {/* <Form.Label>Select a District</Form.Label> */}
                          {/* <WindowedSelect
                          options={districtOptions}
                          isMulti
                          placeholder="Select Districts"
                          className="w-100"
                          onChange={(selected) => {
                            const selectedInfo = selected.map((item) => ({
                              REGION_ID: item.regionId,
                              CITY_ID: item.cityId,
                              DISTRICT_ID: item.value,
                            }));
                            setSelectedDistricts(selectedInfo);
                            console.log("Selected Districts:", selectedInfo);
                          }}
                        /> */}
                          <div className="grid grid-cols-1 gap-2">
                            {districtOptions.slice(0, 4).map((option) => {
                              const isChecked = selectedDistricts.some(
                                (district) =>
                                  district.DISTRICT_ID === option.value
                              );

                              return (
                                <label
                                  key={option.value}
                                  className="form-check d-flex align-items-center gap-2"
                                  style={{ display: "flex" }}
                                >
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={isChecked}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedDistricts((prev) => [
                                          ...prev,
                                          {
                                            REGION_ID: option.regionId,
                                            CITY_ID: option.cityId,
                                            DISTRICT_ID: option.value,
                                          },
                                        ]);
                                      } else {
                                        setSelectedDistricts((prev) =>
                                          prev.filter(
                                            (district) =>
                                              district.DISTRICT_ID !==
                                              option.value
                                          )
                                        );
                                      }
                                    }}
                                  />
                                  <span className="form-check-label">
                                    {option.label}
                                  </span>
                                </label>
                              );
                            })}

                            <button
                              type="button"
                              className="btn btn-link p-0 mt-2"
                              onClick={() => setShowModalDistricts(true)}
                            >
                              More choices...
                            </button>
                          </div>

                          <div className="container ">
                            <div
                              className="modal fade show more_optn_modal_main"
                              tabIndex="-1"
                              style={{
                                display: showModalDistricts ? "block" : "none",
                                backgroundColor: "rgba(0,0,0,0.5)",
                              }}
                              role="dialog"
                            >
                              <div className="modal-dialog modal-dialog-scrollable modal-lg">
                                <div className="modal-content">
                                  {/* Header */}
                                  <div className="modal-header">
                                    <h5 className="modal-title">
                                      Select More Districts
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={() =>
                                        setShowModalDistricts(false)
                                      }
                                    ></button>
                                  </div>

                                  {/* Compact Body */}
                                  <div className="modal-body">
                                    <div className="row g-1 ml-4">
                                      <ul className="more_choice_main_list">
                                        {districtOptions
                                          .slice(4)
                                          .map((option) => {
                                            const isChecked =
                                              selectedDistricts.some(
                                                (district) =>
                                                  district.DISTRICT_ID ===
                                                  option.value
                                              );

                                            return (
                                              <li
                                                key={option.value}
                                                className=""
                                              >
                                                <label className="d-flex align-items-center gap-2">
                                                  <input
                                                    type="checkbox"
                                                    className=""
                                                    checked={isChecked}
                                                    onChange={(e) => {
                                                      if (e.target.checked) {
                                                        setSelectedDistricts(
                                                          (prev) => [
                                                            ...prev,
                                                            {
                                                              REGION_ID:
                                                                option.regionId,
                                                              CITY_ID:
                                                                option.cityId,
                                                              DISTRICT_ID:
                                                                option.value,
                                                            },
                                                          ]
                                                        );
                                                      } else {
                                                        setSelectedDistricts(
                                                          (prev) =>
                                                            prev.filter(
                                                              (district) =>
                                                                district.DISTRICT_ID !==
                                                                option.value
                                                            )
                                                        );
                                                      }
                                                    }}
                                                  />
                                                  <span
                                                    className=""
                                                    style={{
                                                      cursor: "pointer",
                                                    }}
                                                  >
                                                    {option.label}
                                                  </span>
                                                </label>
                                              </li>
                                            );
                                          })}
                                      </ul>
                                    </div>

                                    {/* Selection Count */}
                                    {selectedDistricts.length > 0 && (
                                      <div className="mt-2 p-2 bg-light rounded">
                                        <small className="text-muted">
                                          {selectedDistricts.length} selected
                                        </small>
                                      </div>
                                    )}
                                  </div>

                                  {/* Footer */}
                                  <div className="modal-footer py-2">
                                    <button
                                      type="button"
                                      className="btn btn-outline-secondary"
                                      onClick={() =>
                                        setShowModalDistricts(false)
                                      }
                                    >
                                      Close
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-primary"
                                      onClick={() =>
                                        setShowModalDistricts(false)
                                      }
                                    >
                                      Apply
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Minimal Custom Styles */}
                            <style jsx>{`
                              .hover-bg:hover {
                                background-color: #f8f9fa;
                              }
                              .form-check {
                                margin-bottom: 0;
                                min-height: auto;
                              }
                              .form-check-input {
                                margin-top: 0;
                              }
                              .text-truncate {
                                max-width: 100%;
                              }
                            `}</style>
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
                  {/*--------------------------------------*/}

                  <Accordion className="mt-3">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Price</Accordion.Header>
                      <Accordion.Body>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Control
                                type="number"
                                placeholder="From"
                                value={fromValue}
                                onChange={handleFromChange}
                                min="0" // Prevent negative prices
                              />
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                placeholder="To"
                                value={toValue}
                                onChange={handleToChange}
                                min="0" // Prevent negative prices
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
                  {/*                  */}
                  <div>
                    {/* Accordion for Year Range */}
                    <Accordion className="mt-3">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Year</Accordion.Header>
                        <Accordion.Body>
                          <Form.Group className="mb-3">
                            <Row>
                              <Col>
                                <Form.Control
                                  type="date"
                                  placeholder="From"
                                  value={fromDate}
                                  onChange={handleFromDateChange}
                                />
                              </Col>
                              <Col>
                                <Form.Control
                                  type="date"
                                  placeholder="To"
                                  value={toDate}
                                  onChange={handleToDateChange}
                                />
                              </Col>
                            </Row>
                          </Form.Group>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>

                  {/*-------------------------------------*/}
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
                  <div>
                    {/* Accordion with Checkbox Selection for Color */}
                    <Accordion className="mt-3">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Ad Type</Accordion.Header>
                        <Accordion.Body>
                          <div style={{ maxWidth: "300px", margin: "20px" }}>
                            <Form.Group>
                              {["Rent", "Sell", "Wanted"].map((color) => (
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
                                    onChange={() =>
                                      handleCheckboxPurpose(color)
                                    }
                                  />
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                      color: "#333",
                                    }}
                                  >
                                    12345
                                  </span>
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
                  </div>

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
                      <Accordion.Header>Featued Ads </Accordion.Header>
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
                              <span
                                style={{ fontWeight: "bold", color: "#333" }}
                              >
                                12345
                              </span>
                            </div>
                          </Form.Group>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Form>
              </div>
            </Col>
            <Col lg={9} className="filter_card_main_wrap">
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
                            {car.FeaturedAds === "Featured Ads" && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "10px",
                                  left: "10px",
                                  backgroundColor: "#36A680",
                                  color: "white",
                                  padding: "6px 12px",
                                  fontWeight: "bold",
                                  borderRadius: "8px",
                                  border: "2px solid #2c8e6f",
                                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
                                  fontSize: "14px",
                                  zIndex: 2,
                                }}
                              >
                                Featured
                              </div>
                            )}
                            {/* Heart Icon */}
                            <div
                              style={{
                                position: "absolute",
                                top: "10%",
                                left: "90%",
                                transform: "translate(-50%, -50%)",
                                borderRadius: "50%",
                                padding: "10px",
                                zIndex: 3,
                                cursor: "pointer",
                              }}
                              // onClick={() => toggleBookmark(car.id)}
                              onClick={() =>
                                toggleBookmark(car.id, car.category)
                              }
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
                              // to={`/Dynamic_Route?id=${car.id}&callingFrom=AutomotiveComp`}
                              to={`/Dynamic_Route?id=${
                                car.id
                              }&callingFrom=${formatCategory(
                                car.category === "Motors"
                                  ? "AutomotiveComp"
                                  : car.category === "Automotive"
                                  ? "AutomotiveComp"
                                  : car.category === "Services"
                                  ? "TravelComp"
                                  : car.category == "RealEstate"
                                  ? "RealEstateComp"
                                  : car.category == "Real Estate"
                                  ? "RealEstateComp"
                                  : car.category === "Other"
                                  ? "Education"
                                  : car.category === "Electronics"
                                  ? "ElectronicComp"
                                  : car.category === "Electronics"
                                  ? "ElectronicComp"
                                  : car.category === "Sports&Game"
                                  ? "SportGamesComp"
                                  : car.category === "Home & Furnituer"
                                  ? "HealthCareComp"
                                  : car.category === "Home & Furnituer"
                                  ? "HealthCareComp"
                                  : car.category
                              )}`}
                            >
                              {/* Image */}
                              <Card.Img
                                src={
                                  car?.galleryImages[0] ||
                                  "https://via.placeholder.com/150"
                                }
                                alt={car.title || "Car"}
                                style={{
                                  width: "100%",
                                  height: "230px",
                                  objectFit: "cover",
                                  borderTopLeftRadius: "20px",
                                  borderBottomLeftRadius: "20px",
                                }}
                              />
                            </Link>
                          </Col>

                          <Col md={8} className="filter_card_main">
                            <Card.Body>
                              <Card.Title
                                className="title_head"
                                style={{
                                  color: "#2D4495",
                                  marginTop:
                                    window.innerWidth <= 576 ? "-2px" : "0px",
                                }}
                              >
                                <Link
                                  //  to={`/car-details/${ad.id}`}
                                  // to={`/Dynamic_Route?id=${car.id}&callingFrom=AutomotiveComp`}
                                  to={`/Dynamic_Route?id=${
                                    car.id
                                  }&callingFrom=${formatCategory(
                                    // car.category === "Motors"
                                    //   ? "AutomotiveComp"
                                    //   : car.category
                                    car.category === "Motors"
                                      ? "AutomotiveComp"
                                      : car.category === "Services"
                                      ? "TravelComp"
                                      : car.category == "RealEstate"
                                      ? "RealEstateComp"
                                      : car.category == "Real Estate"
                                      ? "RealEstateComp"
                                      : car.category === "Automotive"
                                      ? "AutomotiveComp"
                                      : car.category === "Other"
                                      ? "Education"
                                      : car.category === "Electronics"
                                      ? "ElectronicComp"
                                      : car.category.trim() === "Sports & Game"
                                      ? "SportGamesComp"
                                      : car.category === "Home & Furnituer"
                                      ? "HealthCareComp"
                                      : car.category
                                  )}`}
                                >
                                  {car.title || "Car"}
                                </Link>
                                <p
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                    color: "#2D4495",
                                  }}
                                >
                                  {car.Price
                                    ? `$${car.Price}`
                                    : "Price not available"}
                                </p>
                              </Card.Title>
                              <Card.Text style={{ color: "black" }}>
                                <small className="text-muted">
                                  <IoLocationOutline
                                    style={{
                                      marginRight: "5px",
                                      color: "#6c757d",
                                    }}
                                  />
                                  <span style={{ color: "black" }}>
                                    {car.City || "Location"}
                                  </span>
                                </small>

                                {/* <br /> */}
                                {/* <small style={{ color: "black" }}>
                                {car.ManufactureYear || "Year"} |{" "}
                                {car.DrivenKm || "0"} Km |{" "}
                                {car.EngineType || "Engine Type"} |{" "}
                                {car.Transmission || "Transmission"}
                              </small> */}

                                <br />
                                <p className="car_desc">
                                  {car.description ||
                                    "Description not available."}
                                </p>
                              </Card.Text>
                              <Col
                                className="align-items-center user_profile_block"
                                style={{
                                  marginTop:
                                    window.innerWidth <= 576 ? "-10px" : "30px",
                                }}
                              >
                                {/* Price displayed above the image */}
                                {/* Small Image on the Right with Top Margin */}
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
                                    ads.map((cars) => "")
                                  )}
                                </div>
                                <div
                                  className="profile_image_block"
                                  style={{
                                    // position: "absolute",
                                    // top: "-70px",
                                    // left: "470px",
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                    zIndex: 2,
                                    color: "#2D4495",
                                  }}
                                >
                                  <img
                                    src={userData?.photoURL || ImageURL}
                                    alt="User profile"
                                    onError={(e) => {
                                      e.target.onerror = null; // prevent infinite loop
                                      e.target.src = ImageURL;
                                    }}
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      objectFit: "cover",
                                      borderRadius: "50%",
                                      border: "2px solid white",
                                      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                                      display: "block",
                                    }}
                                  />
                                </div>
                                {/* Updated text at the bottom-right corner */}
                                <p
                                  style={{
                                    marginTop:
                                      window.innerWidth <= 1100
                                        ? "5px"
                                        : "54px",
                                    // marginLeft:
                                    // 	window.innerWidth <= 576
                                    // 		? "10rem"
                                    // 		: "0rem",
                                    color: "black",
                                  }}
                                >
                                  Updated about {timeAgo(car.createdAt)}
                                </p>
                                {/* Responsive layout for small screens */}
                              </Col>
                              <div className="d-flex align-items-center gap-2 mt-3 innerContainer2 head2btflex card_btn_wrap">
                                {/* Call Now Button */}
                                <a href={`tel:${car.Phone}`}>
                                  <button
                                    className={`blue_btn list_btn ${
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
                                    <span>
                                      {isActive ? car.Phone : "Call Now"}
                                    </span>
                                  </button>
                                </a>

                                {/* Message Button */}
                                <button
                                  className={`blue_btn list_btn ${
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
                                    className={`blue_btn list_btn ${
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
                                    padding: "9px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "5px",
                                    marginBottom: "0px",

                                    // marginRight:
                                    // 	window.innerWidth <= 576
                                    // 		? "20px"
                                    // 		: "60px",

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

              {/*           parent div end here                                    */}
            </Col>
          </Row>
        </Container>
        <div
          className="container"
          style={{
            color: "black",
            paddingTop: "20px",
            paddingBottom: "30px",
          }}
        >
          <Row>
            <Col>
              <div className="cars data">
                {adsDetailImages.map((item) => (
                  <div
                    key={item.id}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                ))}
              </div>
            </Col>
          </Row>
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
      </div>
      <LatestBlog />
      <Footer />
    </>
  );
};

export default Userinfo;
