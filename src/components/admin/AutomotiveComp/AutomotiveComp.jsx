import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"; // Import Link from react-router-dom
import Header from "../../home/header"; // Ensure Header is correctly implemented and imported
import Footer from "../../../components/home/footer/Footer";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import Mesagedeals from "../../../components/userPages/mesagedeals";

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
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/FirebaseConfig"; // Ensure the correct Firebase import

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
  const [selectedCities, setSelectedCities] = useState([]); // Array of selected cities
  const [cities, setCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // For search query, if any
  const [states, setStates] = useState([]);
  const [selectedStates1, setSelectedStates1] = useState([]); // Selected states for filtering
  const [showModal, setShowModal] = useState(false);
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
  const [mileage, setMileage] = useState("");
  const [adsDetailImages, setAdsDetailImages] = useState([]);
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
  const handleCategorySelect = (e) => {
    setselectedSubCategory(e.target.value);
  };
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
  // Fetch cars data
  // useEffect(() => {
  //   const fetchCars = async () => {
  //     try {
  //       setLoading(true); // Show spinner
  //       const response = await fetch("http://168.231.80.24:9002/route/cars");
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
        setLoading(true); // Show spinner

        // Add searchText as query param if present
        const query = searchText
          ? `?searchText=${encodeURIComponent(searchText)}`
          : "";
        const response = await fetch(
          `http://168.231.80.24:9002/route/cars${query}`
        );
        const carsData = await response.json();

        setCars(carsData);
        setFilteredCars(carsData); // Initially show all or filtered
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
      AdditionalFeatures,
      selectedCity,
      selectedDistrict
    );
  }, [
    selectedCities,
    searchQuery,
    subCatgory,
    searchText,

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
    AdditionalFeatures,
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
      AdditionalFeatures,
      selectedCity,
      selectedDistrict
    );
  };
  const filterCars = (
    query,
    cities,
    subCatgory,
    searchText,

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
    AdditionalFeatures,
    selectedCity,
    selectedDistrict
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
          car.Make?.toLowerCase().includes(lowercasedQuery) ||
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
          car.TrustedCars?.toLowerCase().includes(lowercasedQuery) ||
          car.SubCategory?.toLowerCase().includes(lowercasedQuery) ||
          car.mileage?.toLowerCase().includes(lowercasedQuery) ||
          car.Purpose?.toLowerCase().includes(lowercasedQuery) ||
          car.RegionalSpec?.toLowerCase().includes(lowercasedQuery) ||
          car.Insurance?.toLowerCase().includes(lowercasedQuery) ||
          car.InteriorColor?.toLowerCase().includes(lowercasedQuery) ||
          car.Make?.toLowerCase().includes(lowercasedQuery) ||
          car.Model?.toLowerCase().includes(lowercasedQuery) ||
          car.Fueltype?.toLowerCase().includes(lowercasedQuery) ||
          car.Condition?.toLowerCase().includes(lowercasedQuery) ||
          // car.AdditionalFeatures?.toLowerCase().includes(lowercasedQuery) ||
          car.NestedSubCategory?.toLowerCase().includes(lowercasedQuery)
      );
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
              Automotive
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
            // marginLeft: window.innerWidth <= 576 ? "-0.3rem" : "9%",
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
                {/*   ------------------------------------------                            */}
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
                            {categories.map((category, index) => (
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
                {/*--------------------------------------*/}
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
                          placeholder="Select a City"
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
                {/*--------------------------------------*/}

                <Accordion className="mt-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Make</Accordion.Header>
                    <Accordion.Body>
                      <Form.Group className="mb-3">
                        <Row>
                          <div className="relative w-full max-w-md">
                            <input
                              type="text"
                              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Select car brand"
                              value={query}
                              onChange={(e) => {
                                setQuery(e.target.value);
                                setSelected(null); // clear selected value on change
                                setShowList(true);
                              }}
                              onFocus={() => setShowList(true)}
                              onBlur={() =>
                                setTimeout(() => setShowList(false), 150)
                              } // slight delay for selection
                            />
                            {showList && filteredBrands.length > 0 && (
                              <ul className="absolute z-10 w-full max-h-60 overflow-auto bg-white border border-gray-300 rounded-b-lg shadow-md">
                                {filteredBrands.map((brand) => (
                                  <li
                                    key={brand}
                                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                    onMouseDown={() => handleSelect(brand)} // use onMouseDown to avoid blur race condition
                                  >
                                    {brand}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          {selected === "Toyota" && (
                            <div className="mt-4">
                              <label className="block mb-2 text-sm font-medium text-gray-700">
                                Model
                              </label>
                              <select
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) =>
                                  setModel((prev) => ({
                                    ...prev,
                                    Model: e.target.value,
                                  }))
                                }
                              >
                                <option value="">Select Model</option>
                                {toyotaModels.map((model) => (
                                  <option key={model} value={model}>
                                    {model}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                          {selected === "Ford" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Model</option>
                                  {fordModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Chevrolet" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Model</option>
                                  {chevroletModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Nissan" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Model</option>
                                  {nissanModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Hyundai" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Model</option>
                                  {hyundaiModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Genesis" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Model</option>
                                  {genesisModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Lexus" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Model</option>
                                  {lexusModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "GMC" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Model</option>
                                  {gmcModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Mercedes" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Model</option>
                                  {mercedesModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Honda" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Model</option>
                                  {hondaModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "BMW" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Model</option>
                                  {bmwModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Motorcycles" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">
                                    Select Motorcycle Brand
                                  </option>
                                  {motorcycleBrands.map((brand) => (
                                    <option key={brand} value={brand}>
                                      {brand}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Kia" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Kia Model</option>
                                  {kiaModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Dodge" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Dodge Model</option>
                                  {dodgeModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Chrysler" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">
                                    Select Chrysler Model
                                  </option>
                                  {chryslerModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Jeep" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Jeep Model</option>
                                  {jeepModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Mitsubishi" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">
                                    Select Mitsubishi Model
                                  </option>
                                  {mitsubishiModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Mazda" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Mazda Model</option>
                                  {mazdaModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}

                          {selected === "Porsche" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Porsche Model</option>
                                  {porscheModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Audi" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Audi Model</option>
                                  {audiModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}

                          {selected === "Suzuki" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Suzuki Model</option>
                                  {suzukiModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Infiniti" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">
                                    Select Infiniti Model
                                  </option>
                                  {infinitiModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                  {selected === "Hummer" && (
                                    <>
                                      <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                        Model
                                      </label>

                                      <div className="mt-0">
                                        <select
                                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                          onChange={(e) =>
                                            setModel((prev) => ({
                                              ...prev,
                                              Model: e.target.value,
                                            }))
                                          }
                                        >
                                          <option value="">
                                            Select Hummer Model
                                          </option>
                                          {hummerModels.map((model) => (
                                            <option key={model} value={model}>
                                              {model}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </>
                                  )}
                                </select>
                              </div>
                            </>
                          )}

                          {selected === "Lincoln" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Lincoln Model</option>
                                  {lincolnModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Volkswagen" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">
                                    Select Volkswagen Model
                                  </option>
                                  {volkswagenModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Daihatsu" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">
                                    Select Daihatsu Model
                                  </option>
                                  {daihatsuModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Geely" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Geely Model</option>
                                  {geelyModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Mercury" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Mercury Model</option>
                                  {mercuryModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Volvo" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Volvo Model</option>
                                  {volvoModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Peugeot" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Peugeot Model</option>
                                  {peugeotModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Bentley" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Bentley Model</option>
                                  {bentleyModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Jaguar" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Jaguar Model</option>
                                  {jaguarModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Subaru" && (
                            <>
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>

                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Subaru Model</option>
                                  {subaruModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "MG" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select MG Model</option>
                                  {mgModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Changan" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Changan Model</option>
                                  {changanModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Renault" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Renault Model</option>
                                  {renaultModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Buick" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Buick Model</option>
                                  {buickModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Rolls-Royce" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">
                                    Select Rolls-Royce Model
                                  </option>
                                  {rollsRoyceModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Lamborghini" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">
                                    Select Lamborghini Model
                                  </option>
                                  {lamborghiniModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Opel" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Opel Model</option>
                                  {opelModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Skoda" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Skoda Model</option>
                                  {skodaModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Ferrari" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Ferrari Model</option>
                                  {ferrariModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Citroen" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Citroen Model</option>
                                  {citroenModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Chery" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Chery Model</option>
                                  {cheryModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}

                          {selected === "Daewoo" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Daewoo Model</option>
                                  {daewooModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "SABB" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select SABB Model</option>
                                  {sabbModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "SsangYong" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">
                                    Select SsangYong Model
                                  </option>
                                  {ssangYongModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Aston Martin" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">
                                    Select Aston Martin Model
                                  </option>
                                  {astonMartinModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Proton" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Proton Model</option>
                                  {protonModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Haval" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Haval Model</option>
                                  {havalModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "GAC" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select GAC Model</option>
                                  {gacModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Great Wall" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">
                                    Select Great Wall Model
                                  </option>
                                  {greatWallModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "FAW" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select FAW Model</option>
                                  {fawModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "BYD" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select BYD Model</option>
                                  {bydModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Alfa Romeo" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">
                                    Select Alfa Romeo Model
                                  </option>
                                  {alfaRomeoModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "TATA" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select TATA Model</option>
                                  {tataModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "JETOUR" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select JETOUR Model</option>
                                  {jetourModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "CMC" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select CMC Model</option>
                                  {cmcModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "VICTORY AUTO" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">
                                    Select Victory Auto Model
                                  </option>
                                  {victoryAutoModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "MAXUS" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Maxus Model</option>
                                  {maxusModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "BAIC" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Baic Model</option>
                                  {baicModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "DONGFENG" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">
                                    Select Dongfeng Model
                                  </option>
                                  {dongfengModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "EXEED" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select EXEED Model</option>
                                  {exeedModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Tank" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Tank Model</option>
                                  {tankModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Lynk & Co" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">
                                    Select Lynk & Co Model
                                  </option>
                                  {lynkCoModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "Lucid" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select Lucid Model</option>
                                  {lucidModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                          {selected === "INEOS" && (
                            <>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                                Model
                              </label>
                              <div className="mt-0">
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    setModel((prev) => ({
                                      ...prev,
                                      Model: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select INEOS Model</option>
                                  {ineosModels.map((model) => (
                                    <option key={model} value={model}>
                                      {model}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
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
                        <Form.Group>
                          <Form.Label>Mileage (in km)</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter mileage"
                            value={mileage}
                            onChange={(e) => setMileage(e.target.value)}
                            min="0"
                          />
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
                                  onChange={() => handleCheckboxPurpose(color)}
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
                              checked={selectedOptionTransmission === "Manual"}
                              onChange={() =>
                                handleCheckboxChangeTransmission("Manual")
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
                              label="Automatic"
                              checked={
                                selectedOptionTransmission === "Automatic"
                              }
                              onChange={() =>
                                handleCheckboxChangeTransmission("Automatic")
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
                                    // defaultChecked={color === "Grey"}
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
                            {featuresList.map((feature) => (
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
                                  style={{ fontWeight: "bold", color: "#333" }}
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
                      <Accordion.Header>Condition</Accordion.Header>
                      <Accordion.Body>
                        <div style={{ maxWidth: "300px", margin: "20px" }}>
                          <Form.Group>
                            {["New", "Used"].map((color) => (
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
                                    handleCheckboxCondition(color)
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
                                    // defaultChecked={color === "Grey"}
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
                                    handleCheckboxChangeRegionalSpec(color)
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
                  {/* Accordion with Checkbox Selection for Color */}
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
                                    handleCheckboxChangeInsurance(color)
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
                    <Accordion.Header>Engine Type</Accordion.Header>
                    <Accordion.Body>
                      <div style={{ maxWidth: "300px", margin: "20px" }}>
                        <Form.Group>
                          {[
                            "Inline-4 (I4) Engine",
                            "V6 Engine",
                            "V8 Engine",
                            "Inline-6 (I6) Engine",
                            "V12 Engine",
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
                                defaultChecked={engine === "V8 Engine"}
                                onChange={() =>
                                  handleCheckboxChangeEngineType(engine)
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
                </Accordion> */}
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
                <div>
                   <Accordion className="mt-3">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Engine Capacity</Accordion.Header>
                      <Accordion.Body>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Control
                                type="text"
                                placeholder="From"
                                value={fromCC}
                                onChange={handleFromChangeCC}
                              />
                            </Col>
                            <Col>
                              <Form.Control
                                type="text"
                                placeholder="To"
                                value={toCC}
                                onChange={handleToChangeCC}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div> */}
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
                    <Accordion.Header>Assembly</Accordion.Header>
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
                              label="Local"
                              onChange={() =>
                                handleCheckboxChangeAssembly("Local")
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
                              label="Imported"
                              onChange={() =>
                                handleCheckboxChangeAssembly("Imported")
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
              </Form>
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

              {/*                    */}
              <Accordion className="mt-3">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Body Type</Accordion.Header>
                  <Accordion.Body>
                    <div style={{ maxWidth: "300px", margin: "20px" }}>
                      <Form.Group>
                        {[
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
                        ].map((type) => (
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
                              onChange={() =>
                                handleCheckboxChangeBodyType(type)
                              }
                            />
                            <span style={{ fontWeight: "bold", color: "#333" }}>
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
                        {/* Checkbox for 4 */}
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
                            label="4"
                            onChange={() =>
                              handleCheckboxChangeNumberofDoors("4")
                            }
                          />
                          <span style={{ fontWeight: "bold", color: "#333" }}>
                            12345
                          </span>
                        </div>

                        {/* Checkbox for 5 */}
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
                            label="5"
                            onChange={() =>
                              handleCheckboxChangeNumberofDoors("5")
                            }
                          />
                          <span style={{ fontWeight: "bold", color: "#333" }}>
                            12345
                          </span>
                        </div>

                        {/* Checkbox for 2 (defaultChecked) */}
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
                            label="2"
                            onChange={() =>
                              handleCheckboxChangeNumberofDoors("2")
                            }
                          />
                          <span style={{ fontWeight: "bold", color: "#333" }}>
                            12345
                          </span>
                        </div>

                        {/* Checkbox for 3 */}
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
                            label="3"
                            onChange={() =>
                              handleCheckboxChangeNumberofDoors("3")
                            }
                          />
                          <span style={{ fontWeight: "bold", color: "#333" }}>
                            12345
                          </span>
                        </div>

                        {/* Checkbox for 0 */}
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
                            label="0"
                            onChange={() =>
                              handleCheckboxChangeNumberofDoors("0")
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
                  <Accordion.Header>Seat Capacity</Accordion.Header>
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
                            label="4"
                            onChange={() =>
                              handleCheckboxChangeSeatCapacity("4")
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
                            label="5"
                            onChange={() =>
                              handleCheckboxChangeSeatCapacity("5")
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
                            label="2"
                            onChange={() =>
                              handleCheckboxChangeSeatCapacity("2")
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
                            label="3"
                            onChange={() =>
                              handleCheckboxChangeSeatCapacity("3")
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
                            label="0"
                            onChange={() =>
                              handleCheckboxChangeSeatCapacity("0")
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
                  <Accordion.Header>Model Category</Accordion.Header>
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
                            label="A-Class (Compact)"
                            onChange={() =>
                              handleCheckboxChangeModelCategory(
                                "A-Class (Compact)"
                              )
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
                            label="C-Class (Compact Exe)"
                            onChange={() =>
                              handleCheckboxChangeModelCategory(
                                "C-Class (Compact Exe)"
                              )
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
                            label="E-Class (Executive)"
                            defaultChecked
                            onChange={() =>
                              handleCheckboxChangeModelCategory(
                                "E-Class (Executive)"
                              )
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
                            label="S-Class"
                            onChange={() =>
                              handleCheckboxChangeModelCategory("S-Class")
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
                            label="CLA (Compact Coupe)"
                            onChange={() =>
                              handleCheckboxChangeModelCategory(
                                "CLA (Compact Coupe)"
                              )
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
                            label="B-Class"
                            onChange={() =>
                              handleCheckboxChangeModelCategory("B-Class")
                            }
                          />
                          <span style={{ fontWeight: "bold", color: "#333" }}>
                            12345
                          </span>
                        </div>
                      </Form.Group>
                      <p style={{ color: "#2D4495" }}>More choices</p>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion> */}

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
                  <Accordion.Header>Seller Type</Accordion.Header>
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
                            label="Dealers"
                            onChange={(e) =>
                              handleCheckboxChangeSellerType(e, "Dealers")
                            }
                            checked={selectedCheckboxSellerType === "Dealers"}
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
                            label="Individuals"
                            onChange={(e) =>
                              handleCheckboxChangeSellerType(e, "Individuals")
                            }
                            checked={
                              selectedCheckboxSellerType === "Individuals"
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
              {/* 
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
              </Accordion> */}

              {/* <hr
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
              </Accordion> */}

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
                            checked={selectedOptionisFeatured === "Featured Ad"}
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
                                  to={`/Dynamic_Route?id=${car.id}&callingFrom=AutomotiveComp`}
                                >
                                  {car.title || "Car"}
                                </Link>
                              </Card.Title>
                              <Card.Text style={{ color: "black" }}>
                                <small className="text-muted">
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

                                {/* <br /> */}
                                {/* <small style={{ color: "black" }}>
                                {car.ManufactureYear || "Year"} |{" "}
                                {car.DrivenKm || "0"} Km |{" "}
                                {car.EngineType || "Engine Type"} |{" "}
                                {car.Transmission || "Transmission"}
                              </small> */}

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
                                    top: "-140px", // Adjust the top margin to place the price higher

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
                                    // fontSize: '12px',
                                    // color: "#6c757d",
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
                                    {car.Price
                                      ? `$${car.Price}`
                                      : "Price not available"}
                                  </p>

                                  {/* Small Image for small screens */}
                                  <Card.Img
                                    src={
                                      car?.galleryImages[0] ||
                                      "https://via.placeholder.com/150"
                                    }
                                    alt={car.title || "Car"}
                                    style={{
                                      width: "120px", // Adjust size for small screens
                                      height: "60px",
                                      objectFit: "fill",
                                      borderRadius: "6px",
                                    }}
                                  />
                                </div>
                              </Col>
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

              {/*           parent div end here                                    */}
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
      </div>
      <LatestBlog />
      <Footer />
    </>
  );
};

export default AutomotiveComp;
