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

const AutomotiveComp = () => {
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
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered cities based on search
  const filteredCities = cityOptions
    .slice(6)
    .filter((option) =>
      option.label?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
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
  const [logSelectedPurpose, setlogSelectedPurpose] = useState([]);

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
  const [showModalCarBrand, setShowModalCarBrand] = useState(false);

  const [receiverId, setReceiverId] = useState(null);
  const [productIds, setproductIds] = useState(null);
  const [fromMileage, setFromMileage] = useState("");
  const [toMileage, setToMileage] = useState("");
  console.log(fromMileage, "__________", toMileage);
  const handleFromMileageChange = (e) => {
    setFromMileage(e.target.value);
  };

  const handleToMileageChange = (e) => {
    setToMileage(e.target.value);
  };

  // useEffect(() => {
  //   setSearchQuery(searchText); // Update searchQuery from searchText
  // }, [searchText]);
  // const categories = [
  //   "Cars For Sale",
  //   "Car Rental",
  //   "Plates Number",
  //   "Spare Parts",
  //   "Accessories",
  //   "Wheels & Rims",
  //   "Trucks & Heavy Machinery",
  //   "Tshaleeh",
  //   "Boats & Jet Ski",
  //   "Classic Cars",
  //   "Salvage Cars",
  //   "Mortgaged Cars",
  //   "Recovery",
  //   "Food Truck",
  //   "Caravans",
  //   "Reports",
  //   "Car Cleaning",
  // ];
  const [categories, setCategories] = useState([]);
  const [selectedSubCategory1, setSelectedSubCategory1] = useState("");
  useEffect(() => {
    axios
      .get("http://168.231.80.24:9002/route/carsSubCategories")
      .then((response) => {
        setCategories(response.data); // store all categories, including count === 0
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // const handleCategoryCheck = (category) => {
  //   setSelectedSubCategory((prev) => (prev === category ? "" : category));
  // };

  // const handleCategoryCheck = (category) => {
  //   setSelectedSubCategory((prev) => (prev === category ? "" : category));
  // };

  // const visibleCategories = showAll
  //   ? categories
  //   : categories.slice(0, 4);

  const user = auth.currentUser;
  const currentUserId = user?.uid;

  // Format country data for React Select
  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedSubCategory, setselectedSubCategory] = useState("");
  const [selectedRegion, setSelectedRegionId] = useState([]);
  console.log(selectedRegion, "adsDetailImages________1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef1 = useRef(null);
  const modalInstanceRef = useRef(null);

  const [mileage, setMileage] = useState("");
  const [adsDetailImages, setAdsDetailImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  // Group regions into pairs for two-column layout
  const regionPairs = [];
  for (let i = 0; i < regionOptions.length; i += 2) {
    regionPairs.push(regionOptions.slice(i, i + 2));
  }
  // ✅ Renamed refs as per your request
  const regionModalRef = useRef(null);
  const regionModalInstanceRef = useRef(null);

  // ✅ Setup Bootstrap Modal once
  useEffect(() => {
    if (regionModalRef.current) {
      regionModalInstanceRef.current = new Modal(regionModalRef.current, {
        backdrop: "static",
      });
    }
  }, []);

  // ✅ Control modal open/close based on modalVisible state
  useEffect(() => {
    if (modalVisible) {
      regionModalInstanceRef.current?.show();
    } else {
      regionModalInstanceRef.current?.hide();
    }
  }, [modalVisible]);
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

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedRegion.length === 0) return;

      try {
        const queryString = selectedRegion
          .map((id) => `REGION_ID=${id}`)
          .join("&");

        const response = await fetch(
          `http://168.231.80.24:9002/api/cities?${queryString}`
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

  // useEffect(() => {
  //   const fetchCities = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://168.231.80.24:9002/api/cities?REGION_ID=${selectedRegion}`
  //       );
  //       const data = await response.json();

  //       if (data.cities) {
  //         setCities(data.cities);
  //         console.log("Fetched cities:", data.cities);
  //       } else {
  //         console.warn("No cities found");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching cities:", error);
  //     }
  //   };

  //   fetchCities();
  // }, [selectedRegion]);

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
  const toyotaModalRef = useRef(null);
  const toyotaModalInstanceRef = useRef(null);

  useEffect(() => {
    if (toyotaModalRef.current) {
      toyotaModalInstanceRef.current = new Modal(toyotaModalRef.current);
    }
  }, []);

  const openToyotaModal = () => {
    toyotaModalInstanceRef.current?.show();
  };

  const closeToyotaModal = () => {
    toyotaModalInstanceRef.current?.hide();
  };
  const [searchTermDistrict, setSearchTermDistrict] = useState("");

  // Filter district options based on search term
  const filteredDistricts = districtOptions
    .slice(4)
    .filter((option) =>
      option.label?.toLowerCase().includes(searchTermDistrict?.toLowerCase())
    );

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

  console.log(State, "State____________");
  const [showList, setShowList] = useState(false);
  let modalInstance = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      modalInstance.current = new Modal(modalRef.current);
    }
  }, []);

  const openModal = () => {
    modalInstance.current?.show();
  };

  const closeModal = () => {
    modalInstance.current?.hide();
  };
  const filteredBrands =
    query === ""
      ? carBrands
      : carBrands.filter((brand) =>
          brand?.toLowerCase().includes(query?.toLowerCase())
        );
  console.log("Selected:______", filteredBrands);
  console.log("Selected:______1", selected);
  console.log("Selected:______2", query);
  const carBrandModalRef = useRef(null);
  const carBrandModalInstance = useRef(null);

  useEffect(() => {
    if (carBrandModalRef.current) {
      carBrandModalInstance.current = new Modal(carBrandModalRef.current);
    }
  }, []);

  const openCarBrandModal = () => {
    carBrandModalInstance.current?.show();
  };

  const closeCarBrandModal = () => {
    carBrandModalInstance.current?.hide();
  };
  const handleSelect = (brand) => {
    setQuery(brand);
    setSelected(brand);
    setShowList(false);
    closeCarBrandModal();

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
  console.log(getPaginatedCars, "messages_____getPaginatedCars");
  console.log(filteredCars, "messages_____getPaginatedCarsfilteredCars");

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
        ? prevSelected.filter((item) => item !== label) // remove
        : [...prevSelected, label]; // add

      console.log("Selected Numbers:", updatedSelection);
      return updatedSelection;
    });
  };
  const handleCheckboxChangeBodyType = (label) => {
    setSelectedCarsBodyType((prevSelected) => {
      const isChecked = prevSelected.includes(label);
      const updatedSelection = isChecked
        ? prevSelected.filter((item) => item !== label) // remove
        : [...prevSelected, label]; // add

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
        return prevSelected.filter((item) => item !== label); // remove
      } else {
        return [...prevSelected, label]; // add
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
        return prevSelected.filter((item) => item !== label); // remove
      } else {
        return [...prevSelected, label]; // add
      }
    });
  };

  const handleCheckboxInteriorColor = (label) => {
    setInteriorColor((prevSelected) => {
      if (prevSelected.includes(label)) {
        return prevSelected.filter((item) => item !== label); // remove
      } else {
        return [...prevSelected, label]; // add
      }
    });
  };
  const handleCheckboxChangeRegionalSpec = (label) => {
    setRegionalSpec((prevSelected) => {
      if (prevSelected.includes(label)) {
        return prevSelected.filter((item) => item !== label); // remove
      } else {
        return [...prevSelected, label]; // add
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
        return prevSelected.filter((item) => item !== label); // remove
      } else {
        return [...prevSelected, label]; // add
      }
    });
  };
  // handle checkbox toggle
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
    const DISTRICT_ID = selectedDistricts[0]?.DISTRICT_ID;

    const fetchCars = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        if (searchText) params.append("searchText", searchText);

        if (selectedRegion.length) {
          selectedRegion.forEach((id) => params.append("regionId", id));
        }

        if (CITY_ID) params.append("CITY_ID", CITY_ID);
        if (DISTRICT_ID) params.append("DISTRICT_ID", DISTRICT_ID);

        if (fromMileage) params.append("fromMileage", fromMileage);
        if (toMileage) params.append("toMileage", toMileage);

        // ✅ Pass SortBy
        if (SortBy) params.append("sortBy", SortBy);

        const response = await fetch(
          `http://168.231.80.24:9002/route/cars?${params.toString()}`
        );

        const carsData = await response.json();
        setCars(carsData);
        setFilteredCars(carsData);
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
    selectedRegion,
    selectedCities,
    selectedDistricts,
    refresh,
    fromMileage,
    toMileage,
    SortBy, // 🔹 re-fetch on SortBy change
  ]);

  // useEffect(() => {
  //   const CITY_ID = selectedCities[0]?.CITY_ID;
  //   const DISTRICT_ID = selectedDistricts[0]?.DISTRICT_ID; // ✅ Get first DISTRICT_ID

  //   const fetchCars = async () => {
  //     try {
  //       setLoading(true);

  //       const params = new URLSearchParams();
  //       if (searchText) params.append("searchText", searchText);
  //       if (selectedRegion) params.append("regionId", selectedRegion);
  //       if (CITY_ID) params.append("CITY_ID", CITY_ID);
  //       if (DISTRICT_ID) params.append("DISTRICT_ID", DISTRICT_ID); // ✅ Add DISTRICT_ID

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
  // }, [
  //   searchText,
  //   // bookmarkedCar,
  //   selectedRegion,
  //   selectedCities,
  //   selectedDistricts,
  //   refresh,
  // ]);
  const handleShowModal = (userId, productIds) => {
    console.log("Opening modal for receiverId:", receiverId); // Debug
    console.log("Opening modal for Current User ID:", currentUserId); // Debug
    setReceiverId(userId);
    setproductIds(productIds);

    setShowModal(true);
    // You can store the userId in state if needed, e.g., setSelectedUserId(userId);
  };

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
  const fordModalInstance = useRef(null);
  const fordModalRef = useRef(null);

  useEffect(() => {
    if (fordModalRef.current) {
      fordModalInstance.current = new Modal(fordModalRef.current);
    }
  }, []);

  const openFordModal = () => {
    fordModalInstance.current?.show();
  };

  const closeFordModal = () => {
    fordModalInstance.current?.hide();
  };
  const chevroletModalRef = useRef(null);
  const chevroletModalInstance = useRef(null);

  useEffect(() => {
    if (chevroletModalRef.current) {
      chevroletModalInstance.current = new Modal(chevroletModalRef.current);
    }
  }, []);

  const openChevroletModal = () => {
    chevroletModalInstance.current?.show();
  };

  const closeChevroletModal = () => {
    chevroletModalInstance.current?.hide();
  };
  const nissanModalRef = useRef(null);
  const nissanModalInstance = useRef(null);

  useEffect(() => {
    if (nissanModalRef.current) {
      nissanModalInstance.current = new Modal(nissanModalRef.current);
    }
  }, []);

  const openNissanModal = () => {
    nissanModalInstance.current?.show();
  };

  const closeNissanModal = () => {
    nissanModalInstance.current?.hide();
  };
  const hyundaiModalRef = useRef(null);
  const hyundaiModalInstance = useRef(null);

  useEffect(() => {
    if (hyundaiModalRef.current) {
      hyundaiModalInstance.current = new Modal(hyundaiModalRef.current);
    }
  }, []);

  const openHyundaiModal = () => {
    hyundaiModalInstance.current?.show();
  };

  const closeHyundaiModal = () => {
    hyundaiModalInstance.current?.hide();
  };
  const genesisModalRef = useRef(null);
  const genesisModalInstance = useRef(null);

  useEffect(() => {
    if (genesisModalRef.current) {
      genesisModalInstance.current = new Modal(genesisModalRef.current);
    }
  }, []);

  const openGenesisModal = () => {
    genesisModalInstance.current?.show();
  };

  const closeGenesisModal = () => {
    genesisModalInstance.current?.hide();
  };
  const lexusModalRef = useRef(null);
  const lexusModalInstance = useRef(null);

  useEffect(() => {
    if (lexusModalRef.current) {
      lexusModalInstance.current = new Modal(lexusModalRef.current);
    }
  }, []);

  const openLexusModal = () => {
    lexusModalInstance.current?.show();
  };

  const closeLexusModal = () => {
    lexusModalInstance.current?.hide();
  };
  const gmcModalRef = useRef(null);
  const gmcModalInstance = useRef(null);

  useEffect(() => {
    if (gmcModalRef.current) {
      gmcModalInstance.current = new Modal(gmcModalRef.current);
    }
  }, []);

  const openGmcModal = () => {
    gmcModalInstance.current?.show();
  };

  const closeGmcModal = () => {
    gmcModalInstance.current?.hide();
  };
  const mercedesModalRef = useRef(null);
  const mercedesModalInstance = useRef(null);

  useEffect(() => {
    if (mercedesModalRef.current) {
      mercedesModalInstance.current = new Modal(mercedesModalRef.current);
    }
  }, []);

  const openMercedesModal = () => {
    mercedesModalInstance.current?.show();
  };

  const closeMercedesModal = () => {
    mercedesModalInstance.current?.hide();
  };

  const hondaModalRef = useRef(null);
  const hondaModalInstance = useRef(null);

  useEffect(() => {
    if (hondaModalRef.current) {
      hondaModalInstance.current = new Modal(hondaModalRef.current);
    }
  }, []);

  const openHondaModal = () => {
    hondaModalInstance.current?.show();
  };

  const closeHondaModal = () => {
    hondaModalInstance.current?.hide();
  };
  const bmwModalRef = useRef(null);
  const bmwModalInstance = useRef(null);

  useEffect(() => {
    if (bmwModalRef.current) {
      bmwModalInstance.current = new Modal(bmwModalRef.current);
    }
  }, []);

  const openBmwModal = () => {
    bmwModalInstance.current?.show();
  };

  const closeBmwModal = () => {
    bmwModalInstance.current?.hide();
  };

  const motorcycleModalRef = useRef(null);
  const motorcycleModalInstance = useRef(null);

  useEffect(() => {
    if (motorcycleModalRef.current) {
      motorcycleModalInstance.current = new Modal(motorcycleModalRef.current);
    }
  }, []);

  const openMotorcycleModal = () => {
    motorcycleModalInstance.current?.show();
  };

  const closeMotorcycleModal = () => {
    motorcycleModalInstance.current?.hide();
  };
  const kiaModalRef = useRef(null);
  const kiaModalInstance = useRef(null);

  useEffect(() => {
    if (kiaModalRef.current) {
      kiaModalInstance.current = new Modal(kiaModalRef.current);
    }
  }, []);

  const openKiaModal = () => {
    kiaModalInstance.current?.show();
  };

  const closeKiaModal = () => {
    kiaModalInstance.current?.hide();
  };
  const dodgeModalRef = useRef(null);
  const dodgeModalInstance = useRef(null);

  useEffect(() => {
    if (dodgeModalRef.current) {
      dodgeModalInstance.current = new Modal(dodgeModalRef.current);
    }
  }, []);

  const openDodgeModal = () => {
    dodgeModalInstance.current?.show();
  };

  const closeDodgeModal = () => {
    dodgeModalInstance.current?.hide();
  };
  const chryslerModalRef = useRef(null);
  const chryslerModalInstance = useRef(null);

  useEffect(() => {
    if (chryslerModalRef.current) {
      chryslerModalInstance.current = new Modal(chryslerModalRef.current);
    }
  }, []);

  const openChryslerModal = () => {
    chryslerModalInstance.current?.show();
  };

  const closeChryslerModal = () => {
    chryslerModalInstance.current?.hide();
  };
  const jeepModalRef = useRef(null);
  const jeepModalInstance = useRef(null);

  useEffect(() => {
    if (jeepModalRef.current) {
      jeepModalInstance.current = new Modal(jeepModalRef.current);
    }
  }, []);

  const openJeepModal = () => {
    jeepModalInstance.current?.show();
  };

  const closeJeepModal = () => {
    jeepModalInstance.current?.hide();
  };
  const mitsubishiModalRef = useRef(null);
  const mitsubishiModalInstance = useRef(null);

  useEffect(() => {
    if (mitsubishiModalRef.current) {
      mitsubishiModalInstance.current = new Modal(mitsubishiModalRef.current);
    }
  }, []);

  const openMitsubishiModal = () => {
    mitsubishiModalInstance.current?.show();
  };

  const closeMitsubishiModal = () => {
    mitsubishiModalInstance.current?.hide();
  };
  const mazdaModalRef = useRef(null);
  const mazdaModalInstance = useRef(null);

  useEffect(() => {
    if (mazdaModalRef.current) {
      mazdaModalInstance.current = new Modal(mazdaModalRef.current);
    }
  }, []);

  const openMazdaModal = () => {
    mazdaModalInstance.current?.show();
  };

  const closeMazdaModal = () => {
    mazdaModalInstance.current?.hide();
  };
  const porscheModalRef = useRef(null);
  const porscheModalInstance = useRef(null);

  useEffect(() => {
    if (porscheModalRef.current) {
      porscheModalInstance.current = new Modal(porscheModalRef.current);
    }
  }, []);

  const openPorscheModal = () => {
    porscheModalInstance.current?.show();
  };

  const closePorscheModal = () => {
    porscheModalInstance.current?.hide();
  };
  const audiModalRef = useRef(null);
  const audiModalInstance = useRef(null);

  useEffect(() => {
    if (audiModalRef.current) {
      audiModalInstance.current = new Modal(audiModalRef.current);
    }
  }, []);

  const openAudiModal = () => {
    audiModalInstance.current?.show();
  };

  const closeAudiModal = () => {
    audiModalInstance.current?.hide();
  };
  const suzukiModalRef = useRef(null);
  const suzukiModalInstance = useRef(null);

  useEffect(() => {
    if (suzukiModalRef.current) {
      suzukiModalInstance.current = new Modal(suzukiModalRef.current);
    }
  }, []);

  const openSuzukiModal = () => {
    suzukiModalInstance.current?.show();
  };

  const closeSuzukiModal = () => {
    suzukiModalInstance.current?.hide();
  };
  const infinitiModalRef = useRef(null);
  const hummerModalRef = useRef(null);
  // Top of your component
  const lincolnModalRef = useRef(null);
  const lincolnModalInstance = useRef(null);

  useEffect(() => {
    if (lincolnModalRef.current) {
      lincolnModalInstance.current = new Modal(lincolnModalRef.current);
    }
  }, []);

  const openLincolnModal = () => {
    lincolnModalInstance.current?.show();
  };

  const closeLincolnModal = () => {
    lincolnModalInstance.current?.hide();
  };

  useEffect(() => {
    if (infinitiModalRef.current)
      infinitiModalInstance.current = new Modal(infinitiModalRef.current);
    if (hummerModalRef.current)
      hummerModalInstance.current = new Modal(hummerModalRef.current);
  }, []);

  const infinitiModalInstance = useRef(null);
  const openInfinitiModal = () => infinitiModalInstance.current?.show();
  const closeInfinitiModal = () => infinitiModalInstance.current?.hide();

  const hummerModalInstance = useRef(null);
  const openHummerModal = () => hummerModalInstance.current?.show();
  const closeHummerModal = () => hummerModalInstance.current?.hide();
  const volkswagenModalRef = useRef(null);
  const volkswagenModalInstance = useRef(null);

  useEffect(() => {
    if (volkswagenModalRef.current) {
      volkswagenModalInstance.current = new Modal(volkswagenModalRef.current);
    }
  }, []);

  const openVolkswagenModal = () => {
    volkswagenModalInstance.current?.show();
  };

  const closeVolkswagenModal = () => {
    volkswagenModalInstance.current?.hide();
  };
  const daihatsuModalRef = useRef(null);
  const daihatsuModalInstance = useRef(null);

  useEffect(() => {
    if (daihatsuModalRef.current) {
      daihatsuModalInstance.current = new Modal(daihatsuModalRef.current);
    }
  }, []);

  const openDaihatsuModal = () => {
    daihatsuModalInstance.current?.show();
  };

  const closeDaihatsuModal = () => {
    daihatsuModalInstance.current?.hide();
  };
  const geelyModalRef = useRef(null);
  const geelyModalInstance = useRef(null);

  useEffect(() => {
    if (geelyModalRef.current) {
      geelyModalInstance.current = new Modal(geelyModalRef.current);
    }
  }, []);

  const openGeelyModal = () => {
    geelyModalInstance.current?.show();
  };

  const closeGeelyModal = () => {
    geelyModalInstance.current?.hide();
  };
  const mercuryModalRef = useRef(null);
  const mercuryModalInstance = useRef(null);

  useEffect(() => {
    if (mercuryModalRef.current) {
      mercuryModalInstance.current = new Modal(mercuryModalRef.current);
    }
  }, []);

  const openMercuryModal = () => {
    mercuryModalInstance.current?.show();
  };

  const closeMercuryModal = () => {
    mercuryModalInstance.current?.hide();
  };
  const volvoModalRef = useRef(null);
  const volvoModalInstance = useRef(null);

  useEffect(() => {
    if (volvoModalRef.current) {
      volvoModalInstance.current = new Modal(volvoModalRef.current);
    }
  }, []);

  const openVolvoModal = () => {
    volvoModalInstance.current?.show();
  };

  const closeVolvoModal = () => {
    volvoModalInstance.current?.hide();
  };
  const peugeotModalRef = useRef(null);
  const peugeotModalInstance = useRef(null);

  useEffect(() => {
    if (peugeotModalRef.current) {
      peugeotModalInstance.current = new Modal(peugeotModalRef.current);
    }
  }, []);

  const openPeugeotModal = () => {
    peugeotModalInstance.current?.show();
  };

  const closePeugeotModal = () => {
    peugeotModalInstance.current?.hide();
  };
  const bentleyModalRef = useRef(null);
  const bentleyModalInstance = useRef(null);

  useEffect(() => {
    if (bentleyModalRef.current) {
      bentleyModalInstance.current = new Modal(bentleyModalRef.current);
    }
  }, []);

  const openBentleyModal = () => {
    bentleyModalInstance.current?.show();
  };

  const closeBentleyModal = () => {
    bentleyModalInstance.current?.hide();
  };
  const jaguarModalRef = useRef(null);
  const jaguarModalInstance = useRef(null);

  useEffect(() => {
    if (jaguarModalRef.current) {
      jaguarModalInstance.current = new Modal(jaguarModalRef.current);
    }
  }, []);

  const openJaguarModal = () => {
    jaguarModalInstance.current?.show();
  };

  const closeJaguarModal = () => {
    jaguarModalInstance.current?.hide();
  };
  const subaruModalRef = useRef(null);
  const subaruModalInstance = useRef(null);

  useEffect(() => {
    if (subaruModalRef.current) {
      subaruModalInstance.current = new Modal(subaruModalRef.current);
    }
  }, []);

  const openSubaruModal = () => {
    subaruModalInstance.current?.show();
  };

  const closeSubaruModal = () => {
    subaruModalInstance.current?.hide();
  };
  const mgModalRef = useRef(null);
  const mgModalInstance = useRef(null);

  useEffect(() => {
    if (mgModalRef.current) {
      mgModalInstance.current = new Modal(mgModalRef.current);
    }
  }, []);

  const openMgModal = () => {
    mgModalInstance.current?.show();
  };

  const closeMgModal = () => {
    mgModalInstance.current?.hide();
  };
  const changanModalRef = useRef(null);
  const changanModalInstance = useRef(null);

  useEffect(() => {
    if (changanModalRef.current) {
      changanModalInstance.current = new Modal(changanModalRef.current);
    }
  }, []);

  const openChanganModal = () => {
    changanModalInstance.current?.show();
  };

  const closeChanganModal = () => {
    changanModalInstance.current?.hide();
  };
  const renaultModalRef = useRef(null);
  const renaultModalInstance = useRef(null);

  useEffect(() => {
    if (renaultModalRef.current) {
      renaultModalInstance.current = new Modal(renaultModalRef.current);
    }
  }, []);

  const openRenaultModal = () => {
    renaultModalInstance.current?.show();
  };

  const closeRenaultModal = () => {
    renaultModalInstance.current?.hide();
  };
  const buickModalRef = useRef(null);
  const buickModalInstance = useRef(null);

  useEffect(() => {
    if (buickModalRef.current) {
      buickModalInstance.current = new Modal(buickModalRef.current);
    }
  }, []);

  const openBuickModal = () => {
    buickModalInstance.current?.show();
  };

  const closeBuickModal = () => {
    buickModalInstance.current?.hide();
  };
  const rollsRoyceModalRef = useRef(null);
  const rollsRoyceModalInstance = useRef(null);

  useEffect(() => {
    if (rollsRoyceModalRef.current) {
      rollsRoyceModalInstance.current = new Modal(rollsRoyceModalRef.current);
    }
  }, []);

  const openRollsRoyceModal = () => {
    rollsRoyceModalInstance.current?.show();
  };

  const closeRollsRoyceModal = () => {
    rollsRoyceModalInstance.current?.hide();
  };
  const lamborghiniModalRef = useRef(null);
  const lamborghiniModalInstance = useRef(null);

  useEffect(() => {
    if (lamborghiniModalRef.current) {
      lamborghiniModalInstance.current = new Modal(lamborghiniModalRef.current);
    }
  }, []);

  const openLamborghiniModal = () => {
    lamborghiniModalInstance.current?.show();
  };

  const closeLamborghiniModal = () => {
    lamborghiniModalInstance.current?.hide();
  };
  const opelModalRef = useRef(null);
  const opelModalInstance = useRef(null);

  useEffect(() => {
    if (opelModalRef.current) {
      opelModalInstance.current = new Modal(opelModalRef.current);
    }
  }, []);

  const openOpelModal = () => {
    opelModalInstance.current?.show();
  };

  const closeOpelModal = () => {
    opelModalInstance.current?.hide();
  };
  const skodaModalRef = useRef(null);
  const skodaModalInstance = useRef(null);

  useEffect(() => {
    if (skodaModalRef.current) {
      skodaModalInstance.current = new Modal(skodaModalRef.current);
    }
  }, []);

  const openSkodaModal = () => {
    skodaModalInstance.current?.show();
  };

  const closeSkodaModal = () => {
    skodaModalInstance.current?.hide();
  };
  const ferrariModalRef = useRef(null);
  const ferrariModalInstance = useRef(null);

  useEffect(() => {
    if (ferrariModalRef.current) {
      ferrariModalInstance.current = new Modal(ferrariModalRef.current);
    }
  }, []);

  const openFerrariModal = () => {
    ferrariModalInstance.current?.show();
  };

  const closeFerrariModal = () => {
    ferrariModalInstance.current?.hide();
  };
  const citroenModalRef = useRef(null);
  const citroenModalInstance = useRef(null);

  useEffect(() => {
    if (citroenModalRef.current) {
      citroenModalInstance.current = new Modal(citroenModalRef.current);
    }
  }, []);

  const openCitroenModal = () => {
    citroenModalInstance.current?.show();
  };

  const closeCitroenModal = () => {
    citroenModalInstance.current?.hide();
  };
  const cheryModalRef = useRef(null);
  const cheryModalInstance = useRef(null);

  useEffect(() => {
    if (cheryModalRef.current) {
      cheryModalInstance.current = new Modal(cheryModalRef.current);
    }
  }, []);

  const openCheryModal = () => {
    cheryModalInstance.current?.show();
  };

  const closeCheryModal = () => {
    cheryModalInstance.current?.hide();
  };
  const daewooModalRef = useRef(null);
  const daewooModalInstance = useRef(null);

  useEffect(() => {
    if (daewooModalRef.current) {
      daewooModalInstance.current = new Modal(daewooModalRef.current);
    }
  }, []);

  const openDaewooModal = () => {
    daewooModalInstance.current?.show();
  };

  const closeDaewooModal = () => {
    daewooModalInstance.current?.hide();
  };
  const sabbModalRef = useRef(null);
  const sabbModalInstance = useRef(null);

  useEffect(() => {
    if (sabbModalRef.current) {
      sabbModalInstance.current = new Modal(sabbModalRef.current);
    }
  }, []);

  const openSabbModal = () => {
    sabbModalInstance.current?.show();
  };

  const closeSabbModal = () => {
    sabbModalInstance.current?.hide();
  };
  const ssangYongModalRef = useRef(null);
  const ssangYongModalInstance = useRef(null);

  useEffect(() => {
    if (ssangYongModalRef.current) {
      ssangYongModalInstance.current = new Modal(ssangYongModalRef.current);
    }
  }, []);

  const openSsangYongModal = () => {
    ssangYongModalInstance.current?.show();
  };

  const closeSsangYongModal = () => {
    ssangYongModalInstance.current?.hide();
  };
  const astonMartinModalRef = useRef(null);
  const astonMartinModalInstance = useRef(null);

  useEffect(() => {
    if (astonMartinModalRef.current) {
      astonMartinModalInstance.current = new Modal(astonMartinModalRef.current);
    }
  }, []);

  const openAstonMartinModal = () => {
    astonMartinModalInstance.current?.show();
  };

  const closeAstonMartinModal = () => {
    astonMartinModalInstance.current?.hide();
  };
  const protonModalRef = useRef(null);
  const protonModalInstance = useRef(null);

  useEffect(() => {
    if (protonModalRef.current) {
      protonModalInstance.current = new Modal(protonModalRef.current);
    }
  }, []);

  const openProtonModal = () => {
    protonModalInstance.current?.show();
  };

  const closeProtonModal = () => {
    protonModalInstance.current?.hide();
  };
  const havalModalRef = useRef(null);
  const havalModalInstance = useRef(null);

  useEffect(() => {
    if (havalModalRef.current) {
      havalModalInstance.current = new Modal(havalModalRef.current);
    }
  }, []);

  const openHavalModal = () => {
    havalModalInstance.current?.show();
  };

  const closeHavalModal = () => {
    havalModalInstance.current?.hide();
  };
  const gacModalRef = useRef(null);
  const gacModalInstance = useRef(null);

  useEffect(() => {
    if (gacModalRef.current) {
      gacModalInstance.current = new Modal(gacModalRef.current);
    }
  }, []);

  const openGacModal = () => {
    gacModalInstance.current?.show();
  };

  const closeGacModal = () => {
    gacModalInstance.current?.hide();
  };
  const greatWallModalRef = useRef(null);
  const greatWallModalInstance = useRef(null);

  useEffect(() => {
    if (greatWallModalRef.current) {
      greatWallModalInstance.current = new Modal(greatWallModalRef.current);
    }
  }, []);

  const openGreatWallModal = () => {
    greatWallModalInstance.current?.show();
  };

  const closeGreatWallModal = () => {
    greatWallModalInstance.current?.hide();
  };
  const fawModalRef = useRef(null);
  const fawModalInstance = useRef(null);

  useEffect(() => {
    if (fawModalRef.current) {
      fawModalInstance.current = new Modal(fawModalRef.current);
    }
  }, []);

  const openFawModal = () => {
    fawModalInstance.current?.show();
  };

  const closeFawModal = () => {
    fawModalInstance.current?.hide();
  };
  const bydModalRef = useRef(null);
  const bydModalInstance = useRef(null);

  useEffect(() => {
    if (bydModalRef.current) {
      bydModalInstance.current = new Modal(bydModalRef.current);
    }
  }, []);

  const openBydModal = () => {
    bydModalInstance.current?.show();
  };

  const closeBydModal = () => {
    bydModalInstance.current?.hide();
  };
  const alfaModalRef = useRef(null);
  const alfaModalInstance = useRef(null);

  useEffect(() => {
    if (alfaModalRef.current) {
      alfaModalInstance.current = new Modal(alfaModalRef.current);
    }
  }, []);

  const openAlfaModal = () => {
    alfaModalInstance.current?.show();
  };

  const closeAlfaModal = () => {
    alfaModalInstance.current?.hide();
  };
  const tataModalRef = useRef(null);
  const tataModalInstance = useRef(null);

  useEffect(() => {
    if (tataModalRef.current) {
      tataModalInstance.current = new Modal(tataModalRef.current);
    }
  }, []);

  const openTataModal = () => {
    tataModalInstance.current?.show();
  };

  const closeTataModal = () => {
    tataModalInstance.current?.hide();
  };
  const jetourModalRef = useRef(null);
  const jetourModalInstance = useRef(null);

  useEffect(() => {
    if (jetourModalRef.current) {
      jetourModalInstance.current = new Modal(jetourModalRef.current);
    }
  }, []);

  const openJetourModal = () => {
    jetourModalInstance.current?.show();
  };

  const closeJetourModal = () => {
    jetourModalInstance.current?.hide();
  };
  const cmcModalRef = useRef(null);
  const cmcModalInstance = useRef(null);

  useEffect(() => {
    if (cmcModalRef.current) {
      cmcModalInstance.current = new Modal(cmcModalRef.current);
    }
  }, []);

  const openCmcModal = () => {
    cmcModalInstance.current?.show();
  };

  const closeCmcModal = () => {
    cmcModalInstance.current?.hide();
  };
  const victoryAutoModalRef = useRef(null);
  const victoryAutoModalInstance = useRef(null);

  useEffect(() => {
    if (victoryAutoModalRef.current) {
      victoryAutoModalInstance.current = new Modal(victoryAutoModalRef.current);
    }
  }, []);

  const openVictoryAutoModal = () => {
    victoryAutoModalInstance.current?.show();
  };

  const closeVictoryAutoModal = () => {
    victoryAutoModalInstance.current?.hide();
  };
  const maxusModalRef = useRef(null);
  const maxusModalInstance = useRef(null);

  useEffect(() => {
    if (maxusModalRef.current) {
      maxusModalInstance.current = new Modal(maxusModalRef.current);
    }
  }, []);

  const openMaxusModal = () => {
    maxusModalInstance.current?.show();
  };

  const closeMaxusModal = () => {
    maxusModalInstance.current?.hide();
  };
  const baicModalRef = useRef(null);
  const baicModalInstance = useRef(null);

  useEffect(() => {
    if (baicModalRef.current) {
      baicModalInstance.current = new Modal(baicModalRef.current);
    }
  }, []);

  const openBaicModal = () => {
    baicModalInstance.current?.show();
  };

  const closeBaicModal = () => {
    baicModalInstance.current?.hide();
  };
  const dongfengModalRef = useRef(null);
  const dongfengModalInstance = useRef(null);

  useEffect(() => {
    if (dongfengModalRef.current) {
      dongfengModalInstance.current = new Modal(dongfengModalRef.current);
    }
  }, []);

  const openDongfengModal = () => {
    dongfengModalInstance.current?.show();
  };

  const closeDongfengModal = () => {
    dongfengModalInstance.current?.hide();
  };
  const exeedModalRef = useRef(null);
  const exeedModalInstance = useRef(null);

  useEffect(() => {
    if (exeedModalRef.current) {
      exeedModalInstance.current = new Modal(exeedModalRef.current);
    }
  }, []);

  const openExeedModal = () => {
    exeedModalInstance.current?.show();
  };

  const closeExeedModal = () => {
    exeedModalInstance.current?.hide();
  };
  const tankModalRef = useRef(null);
  const tankModalInstance = useRef(null);

  useEffect(() => {
    if (tankModalRef.current) {
      tankModalInstance.current = new Modal(tankModalRef.current);
    }
  }, []);

  const openTankModal = () => {
    tankModalInstance.current?.show();
  };

  const closeTankModal = () => {
    tankModalInstance.current?.hide();
  };
  const lynkModalRef = useRef(null);
  const lynkModalInstance = useRef(null);

  useEffect(() => {
    if (lynkModalRef.current) {
      lynkModalInstance.current = new Modal(lynkModalRef.current);
    }
  }, []);

  const openLynkModal = () => {
    lynkModalInstance.current?.show();
  };

  const closeLynkModal = () => {
    lynkModalInstance.current?.hide();
  };
  const lucidModalRef = useRef(null);
  const lucidModalInstance = useRef(null);

  useEffect(() => {
    if (lucidModalRef.current) {
      lucidModalInstance.current = new Modal(lucidModalRef.current);
    }
  }, []);

  const openLucidModal = () => {
    lucidModalInstance.current?.show();
  };

  const closeLucidModal = () => {
    lucidModalInstance.current?.hide();
  };
  const ineosModalRef = useRef(null);
  const ineosModalInstance = useRef(null);

  useEffect(() => {
    if (ineosModalRef.current) {
      ineosModalInstance.current = new Modal(ineosModalRef.current);
    }
  }, []);

  const openIneosModal = () => {
    ineosModalInstance.current?.show();
  };

  const closeIneosModal = () => {
    ineosModalInstance.current?.hide();
  };

  const [Model, setModel] = useState([]);
  console.log(Model, "Model___________");
  const toggleBookmark = async (carId) => {
    try {
      // Find the selected car
      const selectedCar = carsData.find((car) => car.id === carId);
      if (!selectedCar) return;
      const user = auth.currentUser;
      if (!user) {
        setPopoverCarId(carId); // Show popover only for this car
        setTimeout(() => setPopoverCarId(null), 3000); // Hide after 3 seconds
        return;
      }

      const userId = user.uid; // Replace with the actual userId you want to filter by

      // Toggle bookmark status
      const newBookmarkedStatus = !(selectedCar.bookmarked || false);

      // Update local state
      setBookmarkedCar({ bookmarked: newBookmarkedStatus, id: carId });

      // Update Firestore
      const carDocRef = doc(db, "Cars", carId);
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
      setRefresh(!refresh);
      console.log(`Car ${carId} bookmarked: ${newBookmarkedStatus}`);
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };
  // const handleCityChange = (selectedOptions) => {
  //   // Extract city names from the selected options
  //   const cityNames = selectedOptions
  //     ? selectedOptions.map((option) => option.label)
  //     : [];
  //   setSelectedCities(cityNames);
  //   filterCars(searchQuery, cityNames); // Apply the filter
  // };

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
      Model,

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

      toMileage,
      fromMileage,
      logSelectedPurpose,
      RegionalSpec,
      Insurance,
      InteriorColor,
      selected,
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
    Model,

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
    toMileage,
    fromMileage,
    logSelectedPurpose,
    RegionalSpec,
    Insurance,
    InteriorColor,
    selected,
    Fueltype,
    Condition,
    selectedCity,
    selectedDistrict,
  ]);
  // 👉 define this function inside your component
  const handleClearSearch = () => {
    setSearchQuery("");
    setselectedSubCategory("");
    setSelectedRegionId([]);
    setSelectedCities([]);
    setSelectedDistricts([]);
    setSelected("");
    setQuery("");
    setToValue("");
    setFromValue("");
    setToDate("");
    setFromDate("");
    setMileage("");
    setlogSelectedPurpose([]);
    setSelectedOptionTransmission("");
    setlogSelectedColor([]);
    setAdditionalFeatures([]);
    setCondition([]);
    setRegionalSpec([]);
    setInsurance([]); // ✅ clear insurance checkboxes
    setSelectedCarsBodyType([]); // ✅ clear body type checkboxes
    setSelectedNumbersNumberofDoors([]); // ✅ clear number of doors checkboxes
    setSelectedOptionisFeatured(""); // ✅ clear featured option
    setInteriorColor([]); // ✅ clear interior color checkboxes
  };

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
      Model,

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
      toMileage,
      fromMileage,
      logSelectedPurpose,
      RegionalSpec,
      Insurance,
      InteriorColor,
      selected,
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
    Model,

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
          car.Model,

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
    if (fromMileage || toMileage) {
      filtered = filtered.filter((car) => {
        // Make sure mileage exists and is numeric
        if (!car.mileage) return false;

        const carMileage = Number(car.mileage);
        const from = fromMileage ? Number(fromMileage) : null;
        const to = toMileage ? Number(toMileage) : null;

        if (from !== null && to !== null) {
          return carMileage >= from && carMileage <= to;
        }
        if (from !== null) {
          return carMileage >= from;
        }
        if (to !== null) {
          return carMileage <= to;
        }
        return true;
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
              Motors
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
                      <div className="d-flex justify-content-between align-items-center">
                        <Form.Label
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            paddingLeft: "8px",
                            marginBottom: 0, // keep inline with button
                          }}
                        >
                          Search by Keywords
                        </Form.Label>

                        <button
                          type="button"
                          className="blue_btn "
                          onClick={handleClearSearch}
                        >
                          Clear
                        </button>
                      </div>

                      <div className="position-relative mt-2">
                        <input
                          type="search"
                          placeholder="Search here"
                          className="form-control rounded-pill pe-5 input_feild search_by_keyword"
                          id="example-search-input"
                          value={searchQuery}
                          onChange={handleSearchChange}
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

                            <>
                              {visibleCategories.map((item, index) => (
                                <div key={index} className="form-check mb-2">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`cat-${index}`}
                                    value={item.category}
                                    checked={
                                      selectedSubCategory === item.category
                                    }
                                    onChange={() =>
                                      handleCategoryCheck(item.category)
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`cat-${index}`}
                                  >
                                    {item.category} ({item.count})
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
                            </>
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
                            {regionOptions.slice(0, 6).map((region) => {
                              const isChecked = selectedRegion.includes(
                                region.regionId
                              );

                              return (
                                <div
                                  className="form-check"
                                  key={region.regionId}
                                >
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`region-${region.regionId}`}
                                    checked={isChecked}
                                    onChange={() => {
                                      if (isChecked) {
                                        setSelectedRegionId((prev) =>
                                          prev.filter(
                                            (id) => id !== region.regionId
                                          )
                                        );
                                      } else {
                                        setSelectedRegionId((prev) => [
                                          ...prev,
                                          region.regionId,
                                        ]);
                                      }
                                    }}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`region-${region.regionId}`}
                                  >
                                    {region.label}
                                  </label>
                                </div>
                              );
                            })}
                            <button
                              type="button"
                              className="btn btn-link p-0"
                              onClick={() => setModalVisible(true)}
                            >
                              Show more choices...
                            </button>

                            {/* ✅ Modal */}
                            <div>
                              <div
                                className="modal fade more_optn_modal_main"
                                id="regionModal11"
                                tabIndex="-1"
                                ref={regionModalRef} // ✅ updated ref
                                aria-labelledby="regionModalLabel"
                                aria-hidden="true"
                              >
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

                                      <ul className="more_choice_main_list">
                                        {regionOptions
                                          .slice(6)
                                          .map((region) => {
                                            const isChecked =
                                              selectedRegion.includes(
                                                region.regionId
                                              );

                                            return (
                                              <div
                                                className="form-check"
                                                key={region.regionId}
                                              >
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id={`region-${region.regionId}`}
                                                  checked={isChecked}
                                                  onChange={() => {
                                                    if (isChecked) {
                                                      setSelectedRegionId(
                                                        (prev) =>
                                                          prev.filter(
                                                            (id) =>
                                                              id !==
                                                              region.regionId
                                                          )
                                                      );
                                                    } else {
                                                      setSelectedRegionId(
                                                        (prev) => [
                                                          ...prev,
                                                          region.regionId,
                                                        ]
                                                      );
                                                    }
                                                  }}
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor={`region-${region.regionId}`}
                                                >
                                                  {region.label}
                                                </label>
                                              </div>
                                            );
                                          })}
                                      </ul>
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
                                          onClick={() =>
                                            setSelectedRegionId("")
                                          }
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
                              {cityOptions.slice(0, 6).map((option) => (
                                <div key={option.value} className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={selectedCities.some(
                                      (city) => city.CITY_ID === option.cityId
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange1(option)
                                    }
                                  />
                                  <label className="form-check-label">
                                    {option.label}
                                  </label>
                                </div>
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
                                    {/* Search Input Field */}
                                    <div className="mb-3">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search cities..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                          setSearchTerm(e.target.value)
                                        }
                                      />
                                    </div>

                                    <div className="row">
                                      <ul className="more_choice_main_list">
                                        {filteredCities.map((option) => (
                                          <li>
                                            <label
                                              key={option.value}
                                              className="d-flex align-items-center gap-2"
                                            >
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
                            {districtOptions.slice(0, 6).map((option) => {
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

                                  {/* Body */}
                                  <div className="modal-body">
                                    {/* Search Input */}
                                    <div className="mb-3">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search districts..."
                                        value={searchTermDistrict}
                                        onChange={(e) =>
                                          setSearchTermDistrict(e.target.value)
                                        }
                                      />
                                    </div>

                                    {/* List */}
                                    <div className="row g-1 ml-4">
                                      <ul className="more_choice_main_list">
                                        {filteredDistricts.map((option) => {
                                          const isChecked =
                                            selectedDistricts.some(
                                              (district) =>
                                                district.DISTRICT_ID ===
                                                option.value
                                            );

                                          return (
                                            <li key={option.value}>
                                              <label className="d-flex align-items-center gap-2">
                                                <input
                                                  type="checkbox"
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
                                                  style={{ cursor: "pointer" }}
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
                      <Accordion.Header>Make</Accordion.Header>
                      <Accordion.Body>
                        <Form.Group className="mb-3">
                          <Row>
                            <>
                              <div className="relative w-full max-w-md d-flex  ">
                                <div className="position-relative w-100 border  rounded  ">
                                  {filteredBrands.slice(0, 4).map((brand) => (
                                    <>
                                      <div
                                        className="form-check bg-transparent"
                                        key={brand}
                                      >
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          checked={selected === brand}
                                          onChange={() => {
                                            handleSelect(brand);
                                          }}
                                          id={`check-${brand}`}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor={`check-${brand}`}
                                        >
                                          {brand}
                                        </label>
                                      </div>
                                    </>
                                  ))}

                                  {filteredBrands.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openCarBrandModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>

                                <div
                                  onClick={() => {
                                    setSelected("");

                                    setQuery("");
                                    setSelected("");
                                    setShowList(false);
                                  }}
                                >
                                  {query.length > 0 ? (
                                    <span className="btn btn-link p-0  text-decoration-none">
                                      Clear
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>

                              {/* Bootstrap Modal with ref */}
                              <div
                                className="modal fade more_optn_modal_main"
                                id="modalCarBrand"
                                ref={carBrandModalRef}
                                tabIndex="-1"
                                aria-labelledby="modalCarBrandLabel"
                                aria-hidden="true"
                              >
                                <div className="modal-dialog modal-dialog-scrollable">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5
                                        className="modal-title"
                                        id="modalCarBrandLabel"
                                      >
                                        Select Car Brands
                                      </h5>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Close"
                                        onClick={closeCarBrandModal}
                                      ></button>
                                    </div>
                                    <div className="modal-body">
                                      <ul className="more_choice_main_list">
                                        {filteredBrands
                                          .slice(4)
                                          .map((brand) => (
                                            <li
                                              className="form-check"
                                              key={brand}
                                            >
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={selected === brand}
                                                onChange={() =>
                                                  handleSelect(brand)
                                                }
                                                id={`modal-carbrand-${brand}`}
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor={`modal-carbrand-${brand}`}
                                              >
                                                {brand}
                                              </label>
                                            </li>
                                          ))}
                                      </ul>
                                    </div>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={closeCarBrandModal}
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>

                            <>
                              {selected === "Toyota" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>

                                  <div className="relative w-full max-w-md d-flex">
                                    <div className="border rounded p-0 bg-transparent">
                                      {toyotaModels.slice(0, 4).map((model) => (
                                        <div className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() => {
                                              if (Model.includes(model)) {
                                                setModel((prev) =>
                                                  prev.filter(
                                                    (m) => m !== model
                                                  )
                                                );
                                              } else {
                                                setModel((prev) => [
                                                  ...prev,
                                                  model,
                                                ]);
                                              }
                                            }}
                                            id={`check-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`check-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </div>
                                      ))}

                                      {toyotaModels.length > 4 && (
                                        <button
                                          type="button"
                                          className="btn btn-link p-0 mt-2"
                                          onClick={openToyotaModal}
                                        >
                                          Show more...
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* ✅ Toyota Modal with updated ref and ID */}
                              <div
                                className="modal fade more_optn_modal_main"
                                id="toyotaModelModal"
                                ref={toyotaModalRef}
                                tabIndex="-1"
                                aria-labelledby="toyotaModelModalLabel"
                                aria-hidden="true"
                              >
                                <div className="modal-dialog modal-dialog-scrollable">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5
                                        className="modal-title"
                                        id="toyotaModelModalLabel"
                                      >
                                        Select Toyota Model
                                      </h5>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Close"
                                        onClick={closeToyotaModal}
                                      ></button>
                                    </div>

                                    <div className="modal-body">
                                      <ul className="more_choice_main_list">
                                        {toyotaModels.slice(4).map((model) => (
                                          <li
                                            className="form-check"
                                            key={model}
                                          >
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              checked={Model.includes(model)}
                                              onChange={() => {
                                                if (Model.includes(model)) {
                                                  setModel((prev) =>
                                                    prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  );
                                                } else {
                                                  setModel((prev) => [
                                                    ...prev,
                                                    model,
                                                  ]);
                                                }
                                              }}
                                              id={`modal-check-${model}`}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor={`modal-check-${model}`}
                                            >
                                              {model}
                                            </label>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={closeToyotaModal}
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>

                            {selected === "Ford" && (
                              <>
                                <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                  Model
                                </label>

                                {/* First 4 Ford Models */}
                                <div className="border rounded bg-transparent  p-0 px-3">
                                  {fordModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() => {
                                          if (Model.includes(model)) {
                                            setModel((prev) =>
                                              prev.filter((m) => m !== model)
                                            );
                                          } else {
                                            setModel((prev) => [
                                              ...prev,
                                              model,
                                            ]);
                                          }
                                        }}
                                        id={`ford-check-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`ford-check-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {fordModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openFordModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalFord"
                              ref={fordModalRef}
                              tabIndex="-1"
                              aria-labelledby="modalFordLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalFordLabel"
                                    >
                                      Select Ford Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      aria-label="Close"
                                      onClick={closeFordModal}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {fordModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() => {
                                              if (Model.includes(model)) {
                                                setModel((prev) =>
                                                  prev.filter(
                                                    (m) => m !== model
                                                  )
                                                );
                                              } else {
                                                setModel((prev) => [
                                                  ...prev,
                                                  model,
                                                ]);
                                              }
                                            }}
                                            id={`modal-ford-check-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-ford-check-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeFordModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Chevrolet" && (
                              <>
                                <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                  Model
                                </label>

                                {/* First 4 Chevrolet Models */}
                                <div className="border rounded bg-transparent  p-0 px-3">
                                  {chevroletModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() => {
                                          if (Model.includes(model)) {
                                            setModel((prev) =>
                                              prev.filter((m) => m !== model)
                                            );
                                          } else {
                                            setModel((prev) => [
                                              ...prev,
                                              model,
                                            ]);
                                          }
                                        }}
                                        id={`chevrolet-check-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`chevrolet-check-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {chevroletModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openChevroletModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalChevrolet"
                              ref={chevroletModalRef}
                              tabIndex="-1"
                              aria-labelledby="modalChevroletLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalChevroletLabel"
                                    >
                                      Select Chevrolet Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      aria-label="Close"
                                      onClick={closeChevroletModal}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {chevroletModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() => {
                                              if (Model.includes(model)) {
                                                setModel((prev) =>
                                                  prev.filter(
                                                    (m) => m !== model
                                                  )
                                                );
                                              } else {
                                                setModel((prev) => [
                                                  ...prev,
                                                  model,
                                                ]);
                                              }
                                            }}
                                            id={`modal-chevrolet-check-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-chevrolet-check-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeChevroletModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Nissan" && (
                              <>
                                <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0 px-3">
                                  {nissanModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() => {
                                          if (Model.includes(model)) {
                                            setModel((prev) =>
                                              prev.filter((m) => m !== model)
                                            );
                                          } else {
                                            setModel((prev) => [
                                              ...prev,
                                              model,
                                            ]);
                                          }
                                        }}
                                        id={`nissan-check-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`nissan-check-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {nissanModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openNissanModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalNissan"
                              ref={nissanModalRef}
                              tabIndex="-1"
                              aria-labelledby="modalNissanLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalNissanLabel"
                                    >
                                      Select Nissan Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      aria-label="Close"
                                      onClick={closeNissanModal}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {nissanModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() => {
                                              if (Model.includes(model)) {
                                                setModel((prev) =>
                                                  prev.filter(
                                                    (m) => m !== model
                                                  )
                                                );
                                              } else {
                                                setModel((prev) => [
                                                  ...prev,
                                                  model,
                                                ]);
                                              }
                                            }}
                                            id={`modal-nissan-check-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-nissan-check-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeNissanModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Hyundai" && (
                              <>
                                <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0 px-3">
                                  {hyundaiModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() => {
                                          if (Model.includes(model)) {
                                            setModel((prev) =>
                                              prev.filter((m) => m !== model)
                                            );
                                          } else {
                                            setModel((prev) => [
                                              ...prev,
                                              model,
                                            ]);
                                          }
                                        }}
                                        id={`hyundai-check-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`hyundai-check-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {hyundaiModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openHyundaiModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalHyundai"
                              ref={hyundaiModalRef}
                              tabIndex="-1"
                              aria-labelledby="modalHyundaiLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalHyundaiLabel"
                                    >
                                      Select Hyundai Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      aria-label="Close"
                                      onClick={closeHyundaiModal}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {hyundaiModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() => {
                                              if (Model.includes(model)) {
                                                setModel((prev) =>
                                                  prev.filter(
                                                    (m) => m !== model
                                                  )
                                                );
                                              } else {
                                                setModel((prev) => [
                                                  ...prev,
                                                  model,
                                                ]);
                                              }
                                            }}
                                            id={`modal-hyundai-check-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-hyundai-check-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeHyundaiModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Genesis" && (
                              <>
                                <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0 px-3">
                                  {genesisModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() => {
                                          if (Model.includes(model)) {
                                            setModel((prev) =>
                                              prev.filter((m) => m !== model)
                                            );
                                          } else {
                                            setModel((prev) => [
                                              ...prev,
                                              model,
                                            ]);
                                          }
                                        }}
                                        id={`genesis-check-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`genesis-check-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {genesisModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openGenesisModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalGenesis"
                              ref={genesisModalRef}
                              tabIndex="-1"
                              aria-labelledby="modalGenesisLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalGenesisLabel"
                                    >
                                      Select Genesis Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      aria-label="Close"
                                      onClick={closeGenesisModal}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {genesisModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() => {
                                              if (Model.includes(model)) {
                                                setModel((prev) =>
                                                  prev.filter(
                                                    (m) => m !== model
                                                  )
                                                );
                                              } else {
                                                setModel((prev) => [
                                                  ...prev,
                                                  model,
                                                ]);
                                              }
                                            }}
                                            id={`modal-genesis-check-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-genesis-check-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeGenesisModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {selected === "Lexus" && (
                              <>
                                <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0 px-3">
                                  {lexusModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() => {
                                          if (Model.includes(model)) {
                                            setModel((prev) =>
                                              prev.filter((m) => m !== model)
                                            );
                                          } else {
                                            setModel((prev) => [
                                              ...prev,
                                              model,
                                            ]);
                                          }
                                        }}
                                        id={`lexus-check-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`lexus-check-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {lexusModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openLexusModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalLexus"
                              ref={lexusModalRef}
                              tabIndex="-1"
                              aria-labelledby="modalLexusLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalLexusLabel"
                                    >
                                      Select Lexus Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      aria-label="Close"
                                      onClick={closeLexusModal}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {lexusModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() => {
                                              if (Model.includes(model)) {
                                                setModel((prev) =>
                                                  prev.filter(
                                                    (m) => m !== model
                                                  )
                                                );
                                              } else {
                                                setModel((prev) => [
                                                  ...prev,
                                                  model,
                                                ]);
                                              }
                                            }}
                                            id={`modal-lexus-check-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-lexus-check-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeLexusModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "GMC" && (
                              <>
                                <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0 px-3">
                                  {gmcModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() => {
                                          if (Model.includes(model)) {
                                            setModel((prev) =>
                                              prev.filter((m) => m !== model)
                                            );
                                          } else {
                                            setModel((prev) => [
                                              ...prev,
                                              model,
                                            ]);
                                          }
                                        }}
                                        id={`gmc-check-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`gmc-check-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {gmcModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openGmcModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalGMC"
                              ref={gmcModalRef}
                              tabIndex="-1"
                              aria-labelledby="modalGMCLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalGMCLabel"
                                    >
                                      Select GMC Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      aria-label="Close"
                                      onClick={closeGmcModal}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {gmcModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() => {
                                              if (Model.includes(model)) {
                                                setModel((prev) =>
                                                  prev.filter(
                                                    (m) => m !== model
                                                  )
                                                );
                                              } else {
                                                setModel((prev) => [
                                                  ...prev,
                                                  model,
                                                ]);
                                              }
                                            }}
                                            id={`modal-gmc-check-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-gmc-check-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeGmcModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {selected === "Mercedes" && (
                              <>
                                <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0 px-3">
                                  {mercedesModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() => {
                                          if (Model.includes(model)) {
                                            setModel((prev) =>
                                              prev.filter((m) => m !== model)
                                            );
                                          } else {
                                            setModel((prev) => [
                                              ...prev,
                                              model,
                                            ]);
                                          }
                                        }}
                                        id={`mercedes-check-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`mercedes-check-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {mercedesModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openMercedesModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalMercedes"
                              ref={mercedesModalRef}
                              tabIndex="-1"
                              aria-labelledby="modalMercedesLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalMercedesLabel"
                                    >
                                      Select Mercedes Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      aria-label="Close"
                                      onClick={closeMercedesModal}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {mercedesModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() => {
                                              if (Model.includes(model)) {
                                                setModel((prev) =>
                                                  prev.filter(
                                                    (m) => m !== model
                                                  )
                                                );
                                              } else {
                                                setModel((prev) => [
                                                  ...prev,
                                                  model,
                                                ]);
                                              }
                                            }}
                                            id={`modal-mercedes-check-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-mercedes-check-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeMercedesModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Honda" && (
                              <>
                                <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0 px-3">
                                  {hondaModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() => {
                                          if (Model.includes(model)) {
                                            setModel((prev) =>
                                              prev.filter((m) => m !== model)
                                            );
                                          } else {
                                            setModel((prev) => [
                                              ...prev,
                                              model,
                                            ]);
                                          }
                                        }}
                                        id={`honda-check-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`honda-check-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {hondaModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openHondaModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalHonda"
                              ref={hondaModalRef}
                              tabIndex="-1"
                              aria-labelledby="modalHondaLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalHondaLabel"
                                    >
                                      Select Honda Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      aria-label="Close"
                                      onClick={closeHondaModal}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {hondaModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() => {
                                              if (Model.includes(model)) {
                                                setModel((prev) =>
                                                  prev.filter(
                                                    (m) => m !== model
                                                  )
                                                );
                                              } else {
                                                setModel((prev) => [
                                                  ...prev,
                                                  model,
                                                ]);
                                              }
                                            }}
                                            id={`modal-honda-check-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-honda-check-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeHondaModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "BMW" && (
                              <>
                                <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {bmwModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() => {
                                          if (Model.includes(model)) {
                                            setModel((prev) =>
                                              prev.filter((m) => m !== model)
                                            );
                                          } else {
                                            setModel((prev) => [
                                              ...prev,
                                              model,
                                            ]);
                                          }
                                        }}
                                        id={`bmw-check-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`bmw-check-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {bmwModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openBmwModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalBMW"
                              ref={bmwModalRef}
                              tabIndex="-1"
                              aria-labelledby="modalBMWLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalBMWLabel"
                                    >
                                      Select BMW Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      aria-label="Close"
                                      onClick={closeBmwModal}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {bmwModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() => {
                                              if (Model.includes(model)) {
                                                setModel((prev) =>
                                                  prev.filter(
                                                    (m) => m !== model
                                                  )
                                                );
                                              } else {
                                                setModel((prev) => [
                                                  ...prev,
                                                  model,
                                                ]);
                                              }
                                            }}
                                            id={`modal-bmw-check-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-bmw-check-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeBmwModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {selected === "Motorcycles" && (
                              <>
                                <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {motorcycleBrands.slice(0, 4).map((brand) => (
                                    <div className="form-check" key={brand}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(brand)}
                                        onChange={() => {
                                          if (Model.includes(brand)) {
                                            setModel((prev) =>
                                              prev.filter((m) => m !== brand)
                                            );
                                          } else {
                                            setModel((prev) => [
                                              ...prev,
                                              brand,
                                            ]);
                                          }
                                        }}
                                        id={`motorcycle-check-${brand}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`motorcycle-check-${brand}`}
                                      >
                                        {brand}
                                      </label>
                                    </div>
                                  ))}

                                  {motorcycleBrands.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openMotorcycleModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalMotorcycle"
                              ref={motorcycleModalRef}
                              tabIndex="-1"
                              aria-labelledby="modalMotorcycleLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalMotorcycleLabel"
                                    >
                                      Select Motorcycle Brands
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      aria-label="Close"
                                      onClick={closeMotorcycleModal}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {motorcycleBrands
                                        .slice(4)
                                        .map((brand) => (
                                          <li
                                            className="form-check"
                                            key={brand}
                                          >
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              checked={Model.includes(brand)}
                                              onChange={() => {
                                                if (Model.includes(brand)) {
                                                  setModel((prev) =>
                                                    prev.filter(
                                                      (m) => m !== brand
                                                    )
                                                  );
                                                } else {
                                                  setModel((prev) => [
                                                    ...prev,
                                                    brand,
                                                  ]);
                                                }
                                              }}
                                              id={`modal-motorcycle-check-${brand}`}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor={`modal-motorcycle-check-${brand}`}
                                            >
                                              {brand}
                                            </label>
                                          </li>
                                        ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeMotorcycleModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {selected === "Kia" && (
                              <>
                                <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {kiaModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() => {
                                          if (Model.includes(model)) {
                                            setModel((prev) =>
                                              prev.filter((m) => m !== model)
                                            );
                                          } else {
                                            setModel((prev) => [
                                              ...prev,
                                              model,
                                            ]);
                                          }
                                        }}
                                        id={`kia-check-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`kia-check-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {kiaModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openKiaModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalKia"
                              ref={kiaModalRef}
                              tabIndex="-1"
                              aria-labelledby="modalKiaLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalKiaLabel"
                                    >
                                      Select Kia Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      aria-label="Close"
                                      onClick={closeKiaModal}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {kiaModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() => {
                                              if (Model.includes(model)) {
                                                setModel((prev) =>
                                                  prev.filter(
                                                    (m) => m !== model
                                                  )
                                                );
                                              } else {
                                                setModel((prev) => [
                                                  ...prev,
                                                  model,
                                                ]);
                                              }
                                            }}
                                            id={`modal-kia-check-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-kia-check-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeKiaModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Dodge" && (
                              <>
                                <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {dodgeModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() => {
                                          if (Model.includes(model)) {
                                            setModel((prev) =>
                                              prev.filter((m) => m !== model)
                                            );
                                          } else {
                                            setModel((prev) => [
                                              ...prev,
                                              model,
                                            ]);
                                          }
                                        }}
                                        id={`dodge-check-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`dodge-check-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {dodgeModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openDodgeModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalDodge"
                              ref={dodgeModalRef}
                              tabIndex="-1"
                              aria-labelledby="modalDodgeLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalDodgeLabel"
                                    >
                                      Select Dodge Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      aria-label="Close"
                                      onClick={closeDodgeModal}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {dodgeModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() => {
                                              if (Model.includes(model)) {
                                                setModel((prev) =>
                                                  prev.filter(
                                                    (m) => m !== model
                                                  )
                                                );
                                              } else {
                                                setModel((prev) => [
                                                  ...prev,
                                                  model,
                                                ]);
                                              }
                                            }}
                                            id={`modal-dodge-check-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-dodge-check-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeDodgeModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {selected === "Chrysler" && (
                              <>
                                <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {chryslerModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() => {
                                          if (Model.includes(model)) {
                                            setModel((prev) =>
                                              prev.filter((m) => m !== model)
                                            );
                                          } else {
                                            setModel((prev) => [
                                              ...prev,
                                              model,
                                            ]);
                                          }
                                        }}
                                        id={`chrysler-check-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`chrysler-check-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {chryslerModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openChryslerModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalChrysler"
                              ref={chryslerModalRef}
                              tabIndex="-1"
                              aria-labelledby="modalChryslerLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalChryslerLabel"
                                    >
                                      Select Chrysler Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      aria-label="Close"
                                      onClick={closeChryslerModal}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {chryslerModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() => {
                                              if (Model.includes(model)) {
                                                setModel((prev) =>
                                                  prev.filter(
                                                    (m) => m !== model
                                                  )
                                                );
                                              } else {
                                                setModel((prev) => [
                                                  ...prev,
                                                  model,
                                                ]);
                                              }
                                            }}
                                            id={`modal-chrysler-check-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-chrysler-check-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeChryslerModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Jeep" && (
                              <>
                                <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {jeepModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() => {
                                          if (Model.includes(model)) {
                                            setModel((prev) =>
                                              prev.filter((m) => m !== model)
                                            );
                                          } else {
                                            setModel((prev) => [
                                              ...prev,
                                              model,
                                            ]);
                                          }
                                        }}
                                        id={`jeep-check-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`jeep-check-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {jeepModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openJeepModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalJeep"
                              ref={jeepModalRef}
                              tabIndex="-1"
                              aria-labelledby="modalJeepLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalJeepLabel"
                                    >
                                      Select Jeep Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      aria-label="Close"
                                      onClick={closeJeepModal}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {jeepModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() => {
                                              if (Model.includes(model)) {
                                                setModel((prev) =>
                                                  prev.filter(
                                                    (m) => m !== model
                                                  )
                                                );
                                              } else {
                                                setModel((prev) => [
                                                  ...prev,
                                                  model,
                                                ]);
                                              }
                                            }}
                                            id={`modal-jeep-check-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-jeep-check-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeJeepModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Mitsubishi" && (
                              <>
                                <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {mitsubishiModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() => {
                                          if (Model.includes(model)) {
                                            setModel((prev) =>
                                              prev.filter((m) => m !== model)
                                            );
                                          } else {
                                            setModel((prev) => [
                                              ...prev,
                                              model,
                                            ]);
                                          }
                                        }}
                                        id={`mitsubishi-check-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`mitsubishi-check-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {mitsubishiModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openMitsubishiModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalMitsubishi"
                              ref={mitsubishiModalRef}
                              tabIndex="-1"
                              aria-labelledby="modalMitsubishiLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalMitsubishiLabel"
                                    >
                                      Select Mitsubishi Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeMitsubishiModal}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {mitsubishiModels
                                        .slice(4)
                                        .map((model) => (
                                          <li
                                            className="form-check"
                                            key={model}
                                          >
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              checked={Model.includes(model)}
                                              onChange={() => {
                                                if (Model.includes(model)) {
                                                  setModel((prev) =>
                                                    prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  );
                                                } else {
                                                  setModel((prev) => [
                                                    ...prev,
                                                    model,
                                                  ]);
                                                }
                                              }}
                                              id={`modal-mitsubishi-check-${model}`}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor={`modal-mitsubishi-check-${model}`}
                                            >
                                              {model}
                                            </label>
                                          </li>
                                        ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeMitsubishiModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Mazda" && (
                              <>
                                <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {mazdaModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() => {
                                          if (Model.includes(model)) {
                                            setModel((prev) =>
                                              prev.filter((m) => m !== model)
                                            );
                                          } else {
                                            setModel((prev) => [
                                              ...prev,
                                              model,
                                            ]);
                                          }
                                        }}
                                        id={`mazda-check-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`mazda-check-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {mazdaModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openMazdaModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalMazda"
                              ref={mazdaModalRef}
                              tabIndex="-1"
                              aria-labelledby="modalMazdaLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalMazdaLabel"
                                    >
                                      Select Mazda Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeMazdaModal}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {mazdaModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() => {
                                              if (Model.includes(model)) {
                                                setModel((prev) =>
                                                  prev.filter(
                                                    (m) => m !== model
                                                  )
                                                );
                                              } else {
                                                setModel((prev) => [
                                                  ...prev,
                                                  model,
                                                ]);
                                              }
                                            }}
                                            id={`modal-mazda-check-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-mazda-check-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeMazdaModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Porsche" && (
                              <>
                                <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {porscheModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() => {
                                          if (Model.includes(model)) {
                                            setModel((prev) =>
                                              prev.filter((m) => m !== model)
                                            );
                                          } else {
                                            setModel((prev) => [
                                              ...prev,
                                              model,
                                            ]);
                                          }
                                        }}
                                        id={`porsche-check-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`porsche-check-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {porscheModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openPorscheModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalPorsche"
                              ref={porscheModalRef}
                              tabIndex="-1"
                              aria-labelledby="modalPorscheLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalPorscheLabel"
                                    >
                                      Select Porsche Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closePorscheModal}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {porscheModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() => {
                                              if (Model.includes(model)) {
                                                setModel((prev) =>
                                                  prev.filter(
                                                    (m) => m !== model
                                                  )
                                                );
                                              } else {
                                                setModel((prev) => [
                                                  ...prev,
                                                  model,
                                                ]);
                                              }
                                            }}
                                            id={`modal-porsche-check-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-porsche-check-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closePorscheModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Audi" && (
                              <>
                                <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {audiModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() => {
                                          if (Model.includes(model)) {
                                            setModel((prev) =>
                                              prev.filter((m) => m !== model)
                                            );
                                          } else {
                                            setModel((prev) => [
                                              ...prev,
                                              model,
                                            ]);
                                          }
                                        }}
                                        id={`audi-check-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`audi-check-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {audiModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openAudiModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalAudi"
                              ref={audiModalRef}
                              tabIndex="-1"
                              aria-labelledby="modalAudiLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalAudiLabel"
                                    >
                                      Select Audi Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeAudiModal}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {audiModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() => {
                                              if (Model.includes(model)) {
                                                setModel((prev) =>
                                                  prev.filter(
                                                    (m) => m !== model
                                                  )
                                                );
                                              } else {
                                                setModel((prev) => [
                                                  ...prev,
                                                  model,
                                                ]);
                                              }
                                            }}
                                            id={`modal-audi-check-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-audi-check-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeAudiModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Suzuki" && (
                              <>
                                <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {suzukiModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() => {
                                          if (Model.includes(model)) {
                                            setModel((prev) =>
                                              prev.filter((m) => m !== model)
                                            );
                                          } else {
                                            setModel((prev) => [
                                              ...prev,
                                              model,
                                            ]);
                                          }
                                        }}
                                        id={`suzuki-check-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`suzuki-check-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {suzukiModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openSuzukiModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalSuzuki"
                              ref={suzukiModalRef}
                              tabIndex="-1"
                              aria-labelledby="modalSuzukiLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalSuzukiLabel"
                                    >
                                      Select Suzuki Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeSuzukiModal}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {suzukiModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() => {
                                              if (Model.includes(model)) {
                                                setModel((prev) =>
                                                  prev.filter(
                                                    (m) => m !== model
                                                  )
                                                );
                                              } else {
                                                setModel((prev) => [
                                                  ...prev,
                                                  model,
                                                ]);
                                              }
                                            }}
                                            id={`modal-suzuki-check-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-suzuki-check-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeSuzukiModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Infiniti" && (
                              <>
                                <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {infinitiModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() => {
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          );
                                        }}
                                        id={`infiniti-check-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`infiniti-check-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {infinitiModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openInfinitiModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>

                                {/* Infiniti Modal */}
                                <div
                                  className="modal fade more_optn_modal_main"
                                  id="modalInfiniti"
                                  ref={infinitiModalRef}
                                  tabIndex="-1"
                                  aria-labelledby="modalInfinitiLabel"
                                  aria-hidden="true"
                                >
                                  <div className="modal-dialog modal-dialog-scrollable">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5
                                          className="modal-title"
                                          id="modalInfinitiLabel"
                                        >
                                          Select Infiniti Models
                                        </h5>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          onClick={closeInfinitiModal}
                                        ></button>
                                      </div>
                                      <div className="modal-body">
                                        <ul className="more_choice_main_list">
                                          {infinitiModels
                                            .slice(4)
                                            .map((model) => (
                                              <li
                                                className="form-check"
                                                key={model}
                                              >
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  checked={Model.includes(
                                                    model
                                                  )}
                                                  onChange={() => {
                                                    setModel((prev) =>
                                                      prev.includes(model)
                                                        ? prev.filter(
                                                            (m) => m !== model
                                                          )
                                                        : [...prev, model]
                                                    );
                                                  }}
                                                  id={`modal-infiniti-check-${model}`}
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor={`modal-infiniti-check-${model}`}
                                                >
                                                  {model}
                                                </label>
                                              </li>
                                            ))}
                                        </ul>
                                      </div>
                                      <div className="modal-footer">
                                        <button
                                          type="button"
                                          className="btn btn-secondary"
                                          onClick={closeInfinitiModal}
                                        >
                                          Close
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                            {selected === "Hummer" && (
                              <>
                                <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {hummerModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() => {
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          );
                                        }}
                                        id={`hummer-check-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`hummer-check-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {hummerModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openHummerModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>

                                {/* Hummer Modal */}
                                <div
                                  className="modal fade more_optn_modal_main"
                                  id="modalHummer"
                                  ref={hummerModalRef}
                                  tabIndex="-1"
                                  aria-labelledby="modalHummerLabel"
                                  aria-hidden="true"
                                >
                                  <div className="modal-dialog modal-dialog-scrollable">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5
                                          className="modal-title"
                                          id="modalHummerLabel"
                                        >
                                          Select Hummer Models
                                        </h5>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          onClick={closeHummerModal}
                                        ></button>
                                      </div>
                                      <div className="modal-body">
                                        <ul className="more_choice_main_list">
                                          {hummerModels
                                            .slice(4)
                                            .map((model) => (
                                              <li
                                                className="form-check"
                                                key={model}
                                              >
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  checked={Model.includes(
                                                    model
                                                  )}
                                                  onChange={() => {
                                                    setModel((prev) =>
                                                      prev.includes(model)
                                                        ? prev.filter(
                                                            (m) => m !== model
                                                          )
                                                        : [...prev, model]
                                                    );
                                                  }}
                                                  id={`modal-hummer-check-${model}`}
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor={`modal-hummer-check-${model}`}
                                                >
                                                  {model}
                                                </label>
                                              </li>
                                            ))}
                                        </ul>
                                      </div>
                                      <div className="modal-footer">
                                        <button
                                          type="button"
                                          className="btn btn-secondary"
                                          onClick={closeHummerModal}
                                        >
                                          Close
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                            {selected === "Lincoln" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0 ">
                                  <ul className="more_choice_main_list">
                                    {lincolnModels.slice(0, 4).map((model) => (
                                      <li className="form-check" key={model}>
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          checked={Model.includes(model)}
                                          onChange={() =>
                                            setModel((prev) =>
                                              prev.includes(model)
                                                ? prev.filter(
                                                    (m) => m !== model
                                                  )
                                                : [...prev, model]
                                            )
                                          }
                                          id={`check-lincoln-${model}`}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor={`check-lincoln-${model}`}
                                        >
                                          {model}
                                        </label>
                                      </li>
                                    ))}
                                  </ul>
                                  <button
                                    type="button"
                                    className="btn btn-link p-0 mt-2"
                                    onClick={openLincolnModal}
                                  >
                                    Show more...
                                  </button>
                                </div>
                              </div>
                            )}
                            {/* Modal is outside so it's always in the DOM */}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalLincolnModel"
                              tabIndex="-1"
                              aria-labelledby="modalLincolnModelLabel"
                              aria-hidden="true"
                              ref={lincolnModalRef} // <-- important!
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalLincolnModelLabel"
                                    >
                                      Select Lincoln Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeLincolnModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    {selected === "Lincoln" &&
                                      lincolnModels.slice(4).map((model) => (
                                        <div className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-lincoln-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-lincoln-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </div>
                                      ))}
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeLincolnModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {selected === "Volkswagen" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                {/* First 4 Volkswagen Models */}
                                <div className="border rounded bg-transparent  p-0">
                                  {volkswagenModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-volkswagen-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-volkswagen-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {volkswagenModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openVolkswagenModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalVolkswagen"
                              tabIndex="-1"
                              aria-labelledby="modalVolkswagenLabel"
                              aria-hidden="true"
                              ref={volkswagenModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalVolkswagenLabel"
                                    >
                                      Select Volkswagen Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeVolkswagenModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {volkswagenModels
                                        .slice(4)
                                        .map((model) => (
                                          <li
                                            className="form-check"
                                            key={model}
                                          >
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              checked={Model.includes(model)}
                                              onChange={() =>
                                                setModel((prev) =>
                                                  prev.includes(model)
                                                    ? prev.filter(
                                                        (m) => m !== model
                                                      )
                                                    : [...prev, model]
                                                )
                                              }
                                              id={`modal-check-volkswagen-${model}`}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor={`modal-check-volkswagen-${model}`}
                                            >
                                              {model}
                                            </label>
                                          </li>
                                        ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeVolkswagenModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {selected === "Daihatsu" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                {/* First 4 Daihatsu Models as checkboxes */}
                                <div className="border rounded bg-transparent  p-0">
                                  {daihatsuModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-daihatsu-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-daihatsu-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {daihatsuModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openDaihatsuModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalDaihatsu"
                              tabIndex="-1"
                              aria-labelledby="modalDaihatsuLabel"
                              aria-hidden="true"
                              ref={daihatsuModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalDaihatsuLabel"
                                    >
                                      Select Daihatsu Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeDaihatsuModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {daihatsuModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-daihatsu-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-daihatsu-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeDaihatsuModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Geely" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                {/* First 4 Geely Models as checkboxes */}
                                <div className="border rounded bg-transparent  p-0">
                                  {geelyModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-geely-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-geely-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {geelyModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openGeelyModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalGeely"
                              tabIndex="-1"
                              aria-labelledby="modalGeelyLabel"
                              aria-hidden="true"
                              ref={geelyModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalGeelyLabel"
                                    >
                                      Select Geely Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeGeelyModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {geelyModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-geely-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-geely-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeGeelyModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Mercury" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                {/* First 4 Mercury Models as checkboxes */}
                                <div className="border rounded bg-transparent  p-0 ">
                                  {mercuryModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-mercury-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-mercury-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {mercuryModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openMercuryModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalMercury"
                              tabIndex="-1"
                              aria-labelledby="modalMercuryLabel"
                              aria-hidden="true"
                              ref={mercuryModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalMercuryLabel"
                                    >
                                      Select Mercury Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeMercuryModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {mercuryModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-mercury-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-mercury-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeMercuryModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Volvo" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                {/* First 4 Volvo Models as checkboxes */}
                                <div className="border rounded bg-transparent  p-0">
                                  {volvoModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-volvo-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-volvo-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {volvoModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openVolvoModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalVolvoModel"
                              tabIndex="-1"
                              aria-labelledby="modalVolvoModelLabel"
                              aria-hidden="true"
                              ref={volvoModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalVolvoModelLabel"
                                    >
                                      Select Volvo Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeVolvoModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {volvoModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-volvo-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-volvo-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeVolvoModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Peugeot" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                {/* First 4 Peugeot Models as checkboxes */}
                                <div className="border rounded bg-transparent  p-0">
                                  {peugeotModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-peugeot-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-peugeot-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {peugeotModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openPeugeotModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalPeugeotModel"
                              tabIndex="-1"
                              aria-labelledby="modalPeugeotModelLabel"
                              aria-hidden="true"
                              ref={peugeotModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalPeugeotModelLabel"
                                    >
                                      Select Peugeot Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closePeugeotModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {peugeotModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-peugeot-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-peugeot-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closePeugeotModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {selected === "Bentley" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                {/* First 4 Bentley Models as checkboxes */}
                                <div className="border rounded bg-transparent  p-0 ">
                                  {bentleyModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-bentley-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-bentley-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {bentleyModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openBentleyModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalBentleyModel"
                              tabIndex="-1"
                              aria-labelledby="modalBentleyModelLabel"
                              aria-hidden="true"
                              ref={bentleyModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalBentleyModelLabel"
                                    >
                                      Select Bentley Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeBentleyModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {bentleyModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-bentley-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-bentley-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeBentleyModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Jaguar" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                {/* First 4 Jaguar Models as checkboxes */}
                                <div className="border rounded bg-transparent  p-0">
                                  {jaguarModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-jaguar-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-jaguar-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {jaguarModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openJaguarModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalJaguarModel"
                              tabIndex="-1"
                              aria-labelledby="modalJaguarModelLabel"
                              aria-hidden="true"
                              ref={jaguarModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalJaguarModelLabel"
                                    >
                                      Select Jaguar Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeJaguarModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {jaguarModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-jaguar-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-jaguar-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeJaguarModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {selected === "Subaru" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                {/* First 4 Subaru Models as checkboxes */}
                                <div className="border rounded bg-transparent  p-0 ">
                                  {subaruModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-subaru-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-subaru-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {subaruModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openSubaruModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalSubaruModel"
                              tabIndex="-1"
                              aria-labelledby="modalSubaruModelLabel"
                              aria-hidden="true"
                              ref={subaruModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalSubaruModelLabel"
                                    >
                                      Select Subaru Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeSubaruModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {subaruModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-subaru-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-subaru-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeSubaruModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {selected === "MG" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {mgModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-mg-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-mg-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {mgModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openMgModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalMgModel"
                              tabIndex="-1"
                              aria-labelledby="modalMgModelLabel"
                              aria-hidden="true"
                              ref={mgModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalMgModelLabel"
                                    >
                                      Select MG Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeMgModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {mgModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-mg-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-mg-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeMgModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {selected === "Changan" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {changanModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-changan-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-changan-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {changanModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openChanganModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalChanganModel"
                              tabIndex="-1"
                              aria-labelledby="modalChanganModelLabel"
                              aria-hidden="true"
                              ref={changanModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalChanganModelLabel"
                                    >
                                      Select Changan Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeChanganModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {changanModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-changan-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-changan-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeChanganModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Renault" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {renaultModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-renault-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-renault-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {renaultModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openRenaultModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalRenaultModel"
                              tabIndex="-1"
                              aria-labelledby="modalRenaultModelLabel"
                              aria-hidden="true"
                              ref={renaultModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalRenaultModelLabel"
                                    >
                                      Select Renault Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeRenaultModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {renaultModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-renault-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-renault-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeRenaultModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Buick" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {buickModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-buick-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-buick-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {buickModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openBuickModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalBuickModel"
                              tabIndex="-1"
                              aria-labelledby="modalBuickModelLabel"
                              aria-hidden="true"
                              ref={buickModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalBuickModelLabel"
                                    >
                                      Select Buick Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeBuickModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {buickModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-buick-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-buick-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeBuickModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Rolls-Royce" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {rollsRoyceModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-rolls-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-rolls-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {rollsRoyceModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openRollsRoyceModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalRollsRoyceModel"
                              tabIndex="-1"
                              aria-labelledby="modalRollsRoyceModelLabel"
                              aria-hidden="true"
                              ref={rollsRoyceModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalRollsRoyceModelLabel"
                                    >
                                      Select Rolls-Royce Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeRollsRoyceModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {rollsRoyceModels
                                        .slice(4)
                                        .map((model) => (
                                          <li
                                            className="form-check"
                                            key={model}
                                          >
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              checked={Model.includes(model)}
                                              onChange={() =>
                                                setModel((prev) =>
                                                  prev.includes(model)
                                                    ? prev.filter(
                                                        (m) => m !== model
                                                      )
                                                    : [...prev, model]
                                                )
                                              }
                                              id={`modal-check-rolls-${model}`}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor={`modal-check-rolls-${model}`}
                                            >
                                              {model}
                                            </label>
                                          </li>
                                        ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeRollsRoyceModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {selected === "Lamborghini" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {lamborghiniModels
                                    .slice(0, 4)
                                    .map((model) => (
                                      <div className="form-check" key={model}>
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          checked={Model.includes(model)}
                                          onChange={() =>
                                            setModel((prev) =>
                                              prev.includes(model)
                                                ? prev.filter(
                                                    (m) => m !== model
                                                  )
                                                : [...prev, model]
                                            )
                                          }
                                          id={`check-lamborghini-${model}`}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor={`check-lamborghini-${model}`}
                                        >
                                          {model}
                                        </label>
                                      </div>
                                    ))}

                                  {lamborghiniModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openLamborghiniModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalLamborghiniModel"
                              tabIndex="-1"
                              aria-labelledby="modalLamborghiniModelLabel"
                              aria-hidden="true"
                              ref={lamborghiniModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalLamborghiniModelLabel"
                                    >
                                      Select Lamborghini Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeLamborghiniModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {lamborghiniModels
                                        .slice(4)
                                        .map((model) => (
                                          <li
                                            className="form-check"
                                            key={model}
                                          >
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              checked={Model.includes(model)}
                                              onChange={() =>
                                                setModel((prev) =>
                                                  prev.includes(model)
                                                    ? prev.filter(
                                                        (m) => m !== model
                                                      )
                                                    : [...prev, model]
                                                )
                                              }
                                              id={`modal-check-lamborghini-${model}`}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor={`modal-check-lamborghini-${model}`}
                                            >
                                              {model}
                                            </label>
                                          </li>
                                        ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeLamborghiniModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {selected === "Opel" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {opelModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-opel-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-opel-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {opelModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openOpelModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalOpelModel"
                              tabIndex="-1"
                              aria-labelledby="modalOpelModelLabel"
                              aria-hidden="true"
                              ref={opelModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalOpelModelLabel"
                                    >
                                      Select Opel Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeOpelModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {opelModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-opel-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-opel-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeOpelModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Skoda" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0 px-3">
                                  {skodaModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-skoda-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-skoda-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {skodaModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openSkodaModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalSkodaModel"
                              tabIndex="-1"
                              aria-labelledby="modalSkodaModelLabel"
                              aria-hidden="true"
                              ref={skodaModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalSkodaModelLabel"
                                    >
                                      Select Skoda Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeSkodaModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {skodaModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-skoda-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-skoda-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeSkodaModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Ferrari" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {ferrariModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-ferrari-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-ferrari-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {ferrariModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openFerrariModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalFerrariModel"
                              tabIndex="-1"
                              aria-labelledby="modalFerrariModelLabel"
                              aria-hidden="true"
                              ref={ferrariModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalFerrariModelLabel"
                                    >
                                      Select Ferrari Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeFerrariModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {ferrariModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-ferrari-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-ferrari-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeFerrariModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Citroen" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {citroenModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-citroen-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-citroen-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {citroenModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openCitroenModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalCitroenModel"
                              tabIndex="-1"
                              aria-labelledby="modalCitroenModelLabel"
                              aria-hidden="true"
                              ref={citroenModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalCitroenModelLabel"
                                    >
                                      Select Citroen Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeCitroenModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {citroenModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-citroen-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-citroen-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeCitroenModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Chery" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {cheryModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-chery-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-chery-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {cheryModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openCheryModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalCheryModel"
                              tabIndex="-1"
                              aria-labelledby="modalCheryModelLabel"
                              aria-hidden="true"
                              ref={cheryModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalCheryModelLabel"
                                    >
                                      Select Chery Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeCheryModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {cheryModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-chery-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-chery-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeCheryModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Daewoo" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {daewooModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-daewoo-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-daewoo-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {daewooModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openDaewooModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalDaewooModel"
                              tabIndex="-1"
                              aria-labelledby="modalDaewooModelLabel"
                              aria-hidden="true"
                              ref={daewooModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalDaewooModelLabel"
                                    >
                                      Select Daewoo Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeDaewooModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {daewooModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-daewoo-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-daewoo-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeDaewooModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {selected === "SABB" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {sabbModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-sabb-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-sabb-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {sabbModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openSabbModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalSabbModel"
                              tabIndex="-1"
                              aria-labelledby="modalSabbModelLabel"
                              aria-hidden="true"
                              ref={sabbModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalSabbModelLabel"
                                    >
                                      Select SABB Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeSabbModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {sabbModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-sabb-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-sabb-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeSabbModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {selected === "SsangYong" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {ssangYongModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-ssangyong-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-ssangyong-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {ssangYongModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openSsangYongModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalSsangYongModel"
                              tabIndex="-1"
                              aria-labelledby="modalSsangYongModelLabel"
                              aria-hidden="true"
                              ref={ssangYongModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalSsangYongModelLabel"
                                    >
                                      Select SsangYong Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeSsangYongModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {ssangYongModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-ssangyong-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-ssangyong-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeSsangYongModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Aston Martin" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {astonMartinModels
                                    .slice(0, 4)
                                    .map((model) => (
                                      <div className="form-check" key={model}>
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          checked={Model.includes(model)}
                                          onChange={() =>
                                            setModel((prev) =>
                                              prev.includes(model)
                                                ? prev.filter(
                                                    (m) => m !== model
                                                  )
                                                : [...prev, model]
                                            )
                                          }
                                          id={`check-aston-${model}`}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor={`check-aston-${model}`}
                                        >
                                          {model}
                                        </label>
                                      </div>
                                    ))}

                                  {astonMartinModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openAstonMartinModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalAstonMartinModel"
                              tabIndex="-1"
                              aria-labelledby="modalAstonMartinModelLabel"
                              aria-hidden="true"
                              ref={astonMartinModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalAstonMartinModelLabel"
                                    >
                                      Select Aston Martin Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeAstonMartinModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {astonMartinModels
                                        .slice(4)
                                        .map((model) => (
                                          <li
                                            className="form-check"
                                            key={model}
                                          >
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              checked={Model.includes(model)}
                                              onChange={() =>
                                                setModel((prev) =>
                                                  prev.includes(model)
                                                    ? prev.filter(
                                                        (m) => m !== model
                                                      )
                                                    : [...prev, model]
                                                )
                                              }
                                              id={`modal-check-aston-${model}`}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor={`modal-check-aston-${model}`}
                                            >
                                              {model}
                                            </label>
                                          </li>
                                        ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeAstonMartinModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Proton" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {protonModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-proton-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-proton-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {protonModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openProtonModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalProtonModel"
                              tabIndex="-1"
                              aria-labelledby="modalProtonModelLabel"
                              aria-hidden="true"
                              ref={protonModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalProtonModelLabel"
                                    >
                                      Select Proton Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeProtonModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {protonModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-proton-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-proton-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeProtonModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Haval" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {havalModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-haval-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-haval-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {havalModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openHavalModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalHavalModel"
                              tabIndex="-1"
                              aria-labelledby="modalHavalModelLabel"
                              aria-hidden="true"
                              ref={havalModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalHavalModelLabel"
                                    >
                                      Select Haval Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeHavalModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {havalModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-haval-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-haval-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeHavalModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "GAC" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {gacModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-gac-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-gac-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {gacModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openGacModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalGacModel"
                              tabIndex="-1"
                              aria-labelledby="modalGacModelLabel"
                              aria-hidden="true"
                              ref={gacModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalGacModelLabel"
                                    >
                                      Select GAC Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeGacModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {gacModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-gac-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-gac-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeGacModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Great Wall" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {greatWallModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-greatwall-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-greatwall-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {greatWallModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openGreatWallModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalGreatWallModel"
                              tabIndex="-1"
                              aria-labelledby="modalGreatWallModelLabel"
                              aria-hidden="true"
                              ref={greatWallModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalGreatWallModelLabel"
                                    >
                                      Select Great Wall Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeGreatWallModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {greatWallModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-greatwall-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-greatwall-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeGreatWallModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "FAW" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {fawModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-faw-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-faw-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {fawModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openFawModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalFawModel"
                              tabIndex="-1"
                              aria-labelledby="modalFawModelLabel"
                              aria-hidden="true"
                              ref={fawModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalFawModelLabel"
                                    >
                                      Select FAW Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeFawModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {fawModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-faw-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-faw-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeFawModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "BYD" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {bydModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-byd-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-byd-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {bydModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openBydModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalBydModel"
                              tabIndex="-1"
                              aria-labelledby="modalBydModelLabel"
                              aria-hidden="true"
                              ref={bydModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalBydModelLabel"
                                    >
                                      Select BYD Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeBydModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {bydModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-byd-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-byd-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeBydModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalAlfaModel"
                              tabIndex="-1"
                              aria-labelledby="modalAlfaModelLabel"
                              aria-hidden="true"
                              ref={alfaModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalAlfaModelLabel"
                                    >
                                      Select Alfa Romeo Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeAlfaModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    {alfaRomeoModels.slice(4).map((model) => (
                                      <div className="form-check" key={model}>
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          checked={Model.includes(model)}
                                          onChange={() =>
                                            setModel((prev) =>
                                              prev.includes(model)
                                                ? prev.filter(
                                                    (m) => m !== model
                                                  )
                                                : [...prev, model]
                                            )
                                          }
                                          id={`modal-check-alfa-${model}`}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor={`modal-check-alfa-${model}`}
                                        >
                                          {model}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeAlfaModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Alfa Romeo" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {alfaRomeoModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-alfa-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-alfa-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {alfaRomeoModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openAlfaModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalAlfaModel"
                              tabIndex="-1"
                              aria-labelledby="modalAlfaModelLabel"
                              aria-hidden="true"
                              ref={alfaModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalAlfaModelLabel"
                                    >
                                      Select Alfa Romeo Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeAlfaModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {alfaRomeoModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-alfa-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-alfa-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeAlfaModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "TATA" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {tataModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-tata-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-tata-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {tataModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openTataModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalTataModel"
                              tabIndex="-1"
                              aria-labelledby="modalTataModelLabel"
                              aria-hidden="true"
                              ref={tataModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalTataModelLabel"
                                    >
                                      Select TATA Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeTataModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {tataModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-tata-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-tata-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeTataModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "JETOUR" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {jetourModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-jetour-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-jetour-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {jetourModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openJetourModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalJetourModel"
                              tabIndex="-1"
                              aria-labelledby="modalJetourModelLabel"
                              aria-hidden="true"
                              ref={jetourModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalJetourModelLabel"
                                    >
                                      Select JETOUR Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeJetourModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {jetourModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-jetour-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-jetour-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeJetourModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "CMC" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {cmcModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-cmc-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-cmc-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {cmcModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openCmcModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalCmcModel"
                              tabIndex="-1"
                              aria-labelledby="modalCmcModelLabel"
                              aria-hidden="true"
                              ref={cmcModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalCmcModelLabel"
                                    >
                                      Select CMC Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeCmcModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {cmcModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-cmc-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-cmc-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeCmcModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "VICTORY AUTO" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {victoryAutoModels
                                    .slice(0, 4)
                                    .map((model) => (
                                      <div className="form-check" key={model}>
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          checked={Model.includes(model)}
                                          onChange={() =>
                                            setModel((prev) =>
                                              prev.includes(model)
                                                ? prev.filter(
                                                    (m) => m !== model
                                                  )
                                                : [...prev, model]
                                            )
                                          }
                                          id={`check-victoryauto-${model}`}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor={`check-victoryauto-${model}`}
                                        >
                                          {model}
                                        </label>
                                      </div>
                                    ))}

                                  {victoryAutoModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openVictoryAutoModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalVictoryAutoModel"
                              tabIndex="-1"
                              aria-labelledby="modalVictoryAutoModelLabel"
                              aria-hidden="true"
                              ref={victoryAutoModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalVictoryAutoModelLabel"
                                    >
                                      Select Victory Auto Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeVictoryAutoModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {victoryAutoModels
                                        .slice(4)
                                        .map((model) => (
                                          <li
                                            className="form-check"
                                            key={model}
                                          >
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              checked={Model.includes(model)}
                                              onChange={() =>
                                                setModel((prev) =>
                                                  prev.includes(model)
                                                    ? prev.filter(
                                                        (m) => m !== model
                                                      )
                                                    : [...prev, model]
                                                )
                                              }
                                              id={`modal-check-victoryauto-${model}`}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor={`modal-check-victoryauto-${model}`}
                                            >
                                              {model}
                                            </label>
                                          </li>
                                        ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeVictoryAutoModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "MAXUS" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {maxusModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-maxus-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-maxus-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {maxusModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openMaxusModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalMaxusModel"
                              tabIndex="-1"
                              aria-labelledby="modalMaxusModelLabel"
                              aria-hidden="true"
                              ref={maxusModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalMaxusModelLabel"
                                    >
                                      Select Maxus Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeMaxusModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {maxusModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-maxus-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-maxus-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeMaxusModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "BAIC" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {baicModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-baic-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-baic-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {baicModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openBaicModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalBaicModel"
                              tabIndex="-1"
                              aria-labelledby="modalBaicModelLabel"
                              aria-hidden="true"
                              ref={baicModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalBaicModelLabel"
                                    >
                                      Select BAIC Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeBaicModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {baicModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-baic-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-baic-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeBaicModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {selected === "DONGFENG" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {dongfengModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-dongfeng-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-dongfeng-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {dongfengModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openDongfengModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalDongfengModel"
                              tabIndex="-1"
                              aria-labelledby="modalDongfengModelLabel"
                              aria-hidden="true"
                              ref={dongfengModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalDongfengModelLabel"
                                    >
                                      Select Dongfeng Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeDongfengModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {dongfengModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-dongfeng-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-dongfeng-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeDongfengModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "EXEED" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {exeedModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-exeed-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-exeed-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {exeedModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openExeedModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalExeedModel"
                              tabIndex="-1"
                              aria-labelledby="modalExeedModelLabel"
                              aria-hidden="true"
                              ref={exeedModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalExeedModelLabel"
                                    >
                                      Select EXEED Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeExeedModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {exeedModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-exeed-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-exeed-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeExeedModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Tank" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {tankModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-tank-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-tank-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {tankModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openTankModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalTankModel"
                              tabIndex="-1"
                              aria-labelledby="modalTankModelLabel"
                              aria-hidden="true"
                              ref={tankModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalTankModelLabel"
                                    >
                                      Select Tank Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeTankModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {tankModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-tank-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-tank-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeTankModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {selected === "Lynk & Co" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {lynkCoModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-lynk-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-lynk-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {lynkCoModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openLynkModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalLynkModel"
                              tabIndex="-1"
                              aria-labelledby="modalLynkModelLabel"
                              aria-hidden="true"
                              ref={lynkModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalLynkModelLabel"
                                    >
                                      Select Lynk & Co Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeLynkModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {lynkCoModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-lynk-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-lynk-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeLynkModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selected === "Lucid" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {lucidModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-lucid-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-lucid-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {lucidModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openLucidModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalLucidModel"
                              tabIndex="-1"
                              aria-labelledby="modalLucidModelLabel"
                              aria-hidden="true"
                              ref={lucidModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalLucidModelLabel"
                                    >
                                      Select Lucid Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeLucidModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {lucidModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-lucid-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-lucid-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeLucidModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {selected === "INEOS" && (
                              <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                  Model
                                </label>

                                <div className="border rounded bg-transparent  p-0">
                                  {ineosModels.slice(0, 4).map((model) => (
                                    <div className="form-check" key={model}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={Model.includes(model)}
                                        onChange={() =>
                                          setModel((prev) =>
                                            prev.includes(model)
                                              ? prev.filter((m) => m !== model)
                                              : [...prev, model]
                                          )
                                        }
                                        id={`check-ineos-${model}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`check-ineos-${model}`}
                                      >
                                        {model}
                                      </label>
                                    </div>
                                  ))}

                                  {ineosModels.length > 4 && (
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 mt-2"
                                      onClick={openIneosModal}
                                    >
                                      Show more...
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade more_optn_modal_main"
                              id="modalIneosModel"
                              tabIndex="-1"
                              aria-labelledby="modalIneosModelLabel"
                              aria-hidden="true"
                              ref={ineosModalRef}
                            >
                              <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modalIneosModelLabel"
                                    >
                                      Select INEOS Models
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={closeIneosModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ul className="more_choice_main_list">
                                      {ineosModels.slice(4).map((model) => (
                                        <li className="form-check" key={model}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={Model.includes(model)}
                                            onChange={() =>
                                              setModel((prev) =>
                                                prev.includes(model)
                                                  ? prev.filter(
                                                      (m) => m !== model
                                                    )
                                                  : [...prev, model]
                                              )
                                            }
                                            id={`modal-check-ineos-${model}`}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`modal-check-ineos-${model}`}
                                          >
                                            {model}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={closeIneosModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Row>
                        </Form.Group>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  {/*--------------------------------------*/}
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
                      <Accordion.Header>Price</Accordion.Header>
                      <Accordion.Body>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Control
                                type="text"
                                placeholder="From"
                                value={fromValue}
                                onChange={handleFromChange}
                                min="0" // Prevent negative prices
                              />
                            </Col>
                            <Col>
                              <Form.Control
                                type="text"
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
                  {/* <hr
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
                    <Accordion.Header> Make</Accordion.Header>
                    <Accordion.Body>
                      <Form.Group className="mb-3">
                         <div style={{ maxWidth: "300px", marginTop: "20px" }}>
                          {[
                            "Toyota",
                            "Mercedes-Benz",
                            "Nissan",
                            "BMW",
                            "Lamborghini",
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
                                onChange={handleCheckboxChange}
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
                </Accordion> */}
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
                              <Col className="col-6">
                                <Form.Control
                                  as="select"
                                  value={fromDate}
                                  onChange={handleFromDateChange}
                                >
                                  <option value="">From</option>
                                  {Array.from({ length: 30 }, (_, i) => {
                                    const year = 2000 + i; // generate years from 2000 onwards
                                    return (
                                      <option key={year} value={year}>
                                        {year}
                                      </option>
                                    );
                                  })}
                                </Form.Control>
                              </Col>

                              <Col className="col-6">
                                <Form.Control
                                  as="select"
                                  value={toDate}
                                  onChange={handleToDateChange}
                                >
                                  <option value="">To</option>
                                  {Array.from({ length: 30 }, (_, i) => {
                                    const year = 2000 + i;
                                    return (
                                      <option key={year} value={year}>
                                        {year}
                                      </option>
                                    );
                                  })}
                                </Form.Control>
                              </Col>
                            </Row>
                          </Form.Group>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                  {/* <hr
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
                    <Accordion.Header>Registered in</Accordion.Header>
                    <Accordion.Body>
                       <div style={{ maxWidth: "300px", margin: "20px" }}>
                        <Form.Group>
                           <div>
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
                                label="Downtown Dubai"
                                onChange={(e) =>
                                  handleToyotaChange(e, "Downtown Dubai")
                                }
                              />
                              <span
                                style={{ fontWeight: "bold", color: "#333" }}
                              >
                                12345
                              </span>
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
                                label="Dubai Marina"
                                onChange={(e) =>
                                  handleToyotaChange(e, "Dubai Marina")
                                }
                              />
                              <span
                                style={{ fontWeight: "bold", color: "#333" }}
                              >
                                12345
                              </span>
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
                                label="Jumeirah"
                                defaultChecked
                                onChange={(e) =>
                                  handleToyotaChange(e, "Jumeirah")
                                }
                              />
                              <span
                                style={{ fontWeight: "bold", color: "#333" }}
                              >
                                12345
                              </span>
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
                                label="Deira"
                                onChange={(e) => handleToyotaChange(e, "Deira")}
                              />
                              <span
                                style={{ fontWeight: "bold", color: "#333" }}
                              >
                                12345
                              </span>
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
                                label="Business Bay"
                                onChange={(e) =>
                                  handleToyotaChange(e, "Business Bay")
                                }
                              />
                              <span
                                style={{ fontWeight: "bold", color: "#333" }}
                              >
                                12345
                              </span>
                            </div>
                          </div>
                        </Form.Group>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion> */}
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
                      <Accordion.Header>Mileage</Accordion.Header>
                      <Accordion.Body>
                        <div style={{ maxWidth: "300px", margin: "20px" }}>
                          <Form.Group className="mb-3">
                            <Form.Label>Mileage (in km)</Form.Label>
                            <Row>
                              <Col className="col-6">
                                <Form.Control
                                  type="text"
                                  placeholder="From"
                                  value={fromMileage}
                                  onChange={handleFromMileageChange}
                                  min="0"
                                />
                              </Col>
                              <Col className="col-6">
                                <Form.Control
                                  type="text"
                                  placeholder="To"
                                  value={toMileage}
                                  onChange={handleToMileageChange}
                                  min="0"
                                />
                              </Col>
                            </Row>
                          </Form.Group>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

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
                              {["Rent", "Sell", "Wanted"].map((option) => (
                                <div
                                  key={option}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "8px 0",
                                  }}
                                >
                                  <Form.Check
                                    type="checkbox"
                                    label={option}
                                    checked={logSelectedPurpose.includes(
                                      option
                                    )} // ✅ keep state synced
                                    onChange={() =>
                                      handleCheckboxPurpose(option)
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
                  {/* <Accordion className="mt-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Trusted Car</Accordion.Header>
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
                              label="Toyota"
                              onChange={(e) => handleCarChange(e, "Toyota")}
                            />
                            <span style={{ fontWeight: "bold", color: "#333" }}>
                              12345
                            </span>
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
                              label="Mercedes-Benz"
                              onChange={(e) =>
                                handleCarChange(e, "Mercedes-Benz")
                              }
                            />
                            <span style={{ fontWeight: "bold", color: "#333" }}>
                              12345
                            </span>
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
                              label="Nissan"
                               onChange={(e) => handleCarChange(e, "Nissan")}
                            />
                            <span style={{ fontWeight: "bold", color: "#333" }}>
                              12345
                            </span>
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
                              label="BMW"
                              onChange={(e) => handleCarChange(e, "BMW")}
                            />
                            <span style={{ fontWeight: "bold", color: "#333" }}>
                              12345
                            </span>
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
                              label="Lamborghini"
                              onChange={(e) =>
                                handleCarChange(e, "Lamborghini")
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
                </Accordion> */}
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
                      <Accordion.Header>Transmission</Accordion.Header>
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
                                label="Manual"
                                checked={
                                  selectedOptionTransmission === "Manual"
                                }
                                onChange={() =>
                                  handleCheckboxChangeTransmission("Manual")
                                }
                              />
                              <span
                                style={{ fontWeight: "bold", color: "#333" }}
                              >
                                12345
                              </span>
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
                                label="Automatic"
                                checked={
                                  selectedOptionTransmission === "Automatic"
                                }
                                onChange={() =>
                                  handleCheckboxChangeTransmission("Automatic")
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
                        <Accordion.Header>Exterior Color</Accordion.Header>
                        <Accordion.Body>
                          <div style={{ maxWidth: "300px", margin: "20px" }}>
                            <Form.Group>
                              {["White", "Black", "Grey", "Red", "Yellow"].map(
                                (color) => (
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
                                      checked={logSelectedColor.includes(color)} // ✅ sync state
                                      onChange={() =>
                                        handleCheckboxChangeColor(color)
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
                                )
                              )}
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
                  <div>
                    <Accordion className="mt-3">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Additional Features</Accordion.Header>
                        <Accordion.Body>
                          <div style={{ maxWidth: "300px", margin: "20px" }}>
                            <Form.Group>
                              {(showAllFeatures
                                ? featuresList
                                : featuresList.slice(0, 4)
                              ).map((feature) => (
                                <div
                                  key={feature.name}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "8px 0",
                                  }}
                                >
                                  <Form.Check
                                    type="checkbox"
                                    label={feature.label}
                                    checked={AdditionalFeatures.includes(
                                      feature.name
                                    )}
                                    onChange={() =>
                                      handleCheckboxAdditionalFeatures(
                                        feature.name
                                      )
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

                            {featuresList.length > 4 && (
                              <p
                                onClick={() =>
                                  setShowAllFeatures((prev) => !prev)
                                }
                                style={{
                                  color: "#2D4495",
                                  marginTop: "10px",
                                  cursor: "pointer",
                                  fontWeight: "bold",
                                }}
                              >
                                {showAllFeatures
                                  ? "Show less..."
                                  : "Show more..."}
                              </p>
                            )}
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
                  <div>
                    {/* Accordion with Checkbox Selection for Color */}
                    <Accordion className="mt-3">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Condition</Accordion.Header>
                        <Accordion.Body>
                          <div style={{ maxWidth: "300px", margin: "20px" }}>
                            <Form.Group>
                              {["New", "Used"].map((condition) => (
                                <div
                                  key={condition}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "8px 0",
                                  }}
                                >
                                  <Form.Check
                                    type="checkbox"
                                    label={condition}
                                    checked={Condition.includes(condition)} // ✅ sync with state
                                    onChange={() =>
                                      handleCheckboxCondition(condition)
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
                  <div>
                    {/* Accordion with Checkbox Selection for Color */}
                    <Accordion className="mt-3">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Interior Color </Accordion.Header>
                        <Accordion.Body>
                          <div style={{ maxWidth: "300px", margin: "20px" }}>
                            <Form.Group>
                              {["White", "Black", "Grey", "Red", "Yellow"].map(
                                (color) => (
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
                                      checked={InteriorColor.includes(color)} // ✅ bind state
                                      onChange={() =>
                                        handleCheckboxInteriorColor(color)
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
                                )
                              )}
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
                  <div>
                    {/* Accordion with Checkbox Selection for Color */}
                    <Accordion className="mt-3">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Regional Spec</Accordion.Header>
                        <Accordion.Body>
                          <div style={{ maxWidth: "300px", margin: "20px" }}>
                            <Form.Group>
                              {[
                                "Canadian",
                                "European",
                                "Japanese",
                                "American",
                              ].map((spec) => (
                                <div
                                  key={spec}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "8px 0",
                                  }}
                                >
                                  <Form.Check
                                    type="checkbox"
                                    label={spec}
                                    checked={RegionalSpec.includes(spec)} // ✅ controlled state
                                    onChange={() =>
                                      handleCheckboxChangeRegionalSpec(spec)
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

                  <div>
                    {/* Accordion with Checkbox Selection for Color */}
                    <Accordion className="mt-3">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Fuel type</Accordion.Header>
                        <Accordion.Body>
                          <div style={{ maxWidth: "300px", margin: "20px" }}>
                            <Form.Group>
                              {[
                                "petrol",
                                "diesel",
                                "electric",
                                "hybrid",
                                "lpg",
                                "cng",
                              ].map((color) => (
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
                                      handleCheckboxChangeFueltype(color)
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
                  <div>
                    <Accordion className="mt-3">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Insurance </Accordion.Header>
                        <Accordion.Body>
                          <div style={{ maxWidth: "300px", margin: "20px" }}>
                            <Form.Group>
                              {[
                                "No Insurance",
                                "ThirdParty",
                                "Comprehensive",
                              ].map((insuranceType) => (
                                <div
                                  key={insuranceType}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "8px 0",
                                  }}
                                >
                                  <Form.Check
                                    type="checkbox"
                                    label={insuranceType}
                                    checked={Insurance.includes(insuranceType)} // ✅ controlled state
                                    onChange={() =>
                                      handleCheckboxChangeInsurance(
                                        insuranceType
                                      )
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
                      <Accordion.Header>Body Type</Accordion.Header>
                      <Accordion.Body>
                        <div style={{ maxWidth: "300px", margin: "20px" }}>
                          <Form.Group>
                            {(showAllBodyTypes
                              ? bodyTypeList
                              : bodyTypeList.slice(0, 4)
                            ).map((type) => (
                              <div
                                key={type}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "8px 0",
                                }}
                              >
                                <Form.Check
                                  type="checkbox"
                                  label={type}
                                  checked={selectedCarsBodyType.includes(type)} // ✅ controlled state
                                  onChange={() =>
                                    handleCheckboxChangeBodyType(type)
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

                          {bodyTypeList.length > 4 && (
                            <p
                              onClick={() =>
                                setShowAllBodyTypes((prev) => !prev)
                              }
                              style={{
                                color: "#2D4495",
                                marginTop: "10px",
                                cursor: "pointer",
                                fontWeight: "bold",
                              }}
                            >
                              {showAllBodyTypes
                                ? "Show less..."
                                : "Show more..."}
                            </p>
                          )}
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
                      <Accordion.Header>Number of Doors</Accordion.Header>
                      <Accordion.Body>
                        <div style={{ maxWidth: "300px", margin: "20px" }}>
                          <Form.Group>
                            {["4", "5", "2", "3", "0"].map((num) => (
                              <div
                                key={num}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "8px 0",
                                }}
                              >
                                <Form.Check
                                  type="checkbox"
                                  label={num}
                                  checked={selectedNumbersNumberofDoors.includes(
                                    num
                                  )} // ✅ controlled
                                  onChange={() =>
                                    handleCheckboxChangeNumberofDoors(num)
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
              <div className="filter_card_inner_wrap_block">
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
                  ) : filteredCars.length > 0 ? (
                    getPaginatedCars().map((car, index) => {
                      const isActive = activePhoneIndex === index;

                      return (
                        <Card
                          key={index}
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
                                    boxShadow:
                                      "0px 2px 10px rgba(0, 0, 0, 0.2)",
                                  }}
                                >
                                  Please log in to bookmark
                                </div>
                              )}
                              <Link
                                onClick={() => handleView(car.id)}
                                //  to={`/car-details/${ad.id}`}
                                to={`/Dynamic_Route?id=${car.id}&callingFrom=AutomotiveComp`}
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
                                    to={`/Dynamic_Route?id=${car.id}&callingFrom=AutomotiveComp`}
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
                                    {car.Price ? (
                                      <>
                                        <img
                                          src="https://www.sama.gov.sa/ar-sa/Currency/Documents/Saudi_Riyal_Symbol-2.svg"
                                          alt="Saudi Riyal Symbol"
                                          style={{
                                            height: "1em", // Adjust the size as needed
                                            verticalAlign: "middle",
                                            marginRight: "5px", // Add a small space between the symbol and the price
                                          }}
                                        />
                                        {car.Price}
                                      </>
                                    ) : (
                                      "Price not available"
                                    )}
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
                                      window.innerWidth <= 576
                                        ? "-10px"
                                        : "30px",
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
                                        {/* <img
                                          src={Loading1}
                                          alt="Loading..."
                                          style={{
                                            width: "200px",
                                            height: "200px",
                                            animation:
                                              "spin 1s linear infinite", // Apply the spin animation
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
                                      src={car.photoURL || ImageURL}
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
                                    Updated {timeAgo(car.createdAt)}
                                  </p>
                                  {/* Responsive layout for small screens */}
                                </Col>
                                <div className="d-flex align-items-center gap-2 mt-3 innerContainer2 head2btflex card_btn_wrap">
                                  {/* Call Now Button */}
                                  {car.showNumberChecked ? (
                                    ""
                                  ) : (
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
                                  )}{" "}
                                  {/* Message Button */}
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
                                    onClick={() =>
                                      handleShowModal(car.userId, car.id)
                                    }
                                  >
                                    <MdMessage />
                                    <span className="button-text">Message</span>
                                  </button>
                                  {/* WhatsApp Button */}
                                  {car.showNumberChecked ? (
                                    ""
                                  ) : (
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
                                  )}
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
                                        window.innerWidth <= 576
                                          ? "5px"
                                          : "50px",
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
                                  {/* Modal */}
                                  <div
                                    className={`modal fade ${
                                      showModal ? "show d-block" : "d-none"
                                    }`}
                                    tabIndex="-1"
                                    role="dialog"
                                    style={{
                                      pointerEvents: showModal
                                        ? "auto"
                                        : "none", // allows interaction only when shown
                                    }}
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
                                            productId={car.id}
                                            productIds={productIds}
                                            userId={userId}
                                            recieverId={receiverId}
                                            fullWidth={true}
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

                                  {/* ✅ Remove this manual backdrop */}
                                  {/* {showModal && (
    <div
      className="modal-backdrop fade show"
      onClick={() => setShowModal(false)}
    ></div>
  )} */}
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

export default AutomotiveComp;
