import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/FirebaseConfig"; // Ensure the correct Firebase import
import { db } from "./../../Firebase/FirebaseConfig.jsx";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Select from "react-select";
import { Country, City, State } from "country-state-city";
import { useParams } from "react-router-dom";
import WindowedSelect from "react-windowed-select";
import locationData from "../../../Location.json";
import cityData from "../../../City.json";
import {
  gallerymedia_1,
  gallerymedia_2,
  gallerymedia_3,
  gallerymedia_4,
  gallerymedia_5,
  mediaimg_1,
  mediaimg_2,
} from "../../imagepath";
import Footer from "../../home/footer/Footer";
import UserHeader from "../Userheader";
import axios from "axios";
import PaymentForm from "./PaymentForm.jsx";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import CountryList from "../../../CountryList.json"; // Adjust the path as needed
import Header from "../../home/header";

const stripePromise = loadStripe(
  "pk_test_51Oqyo3Ap5li0mnBdxJiCZ4k0IEWVbOgGvyMbYB6XVUqYh1yNUEnRiX4e5UO1eces9kf9qZNZcF7ybjxg7MimKmUQ00a9s60Pa1"
);

const AddLisiting = () => {
  const MySwal = withReactContent(Swal);

  const parms = useLocation().pathname;
  const navigate = useNavigate();
  const [userId, setUserId] = useState(""); // State for image preview
  const [error, setError] = useState(""); // ✅ Error state
  const [isChecked, setIsChecked] = useState(false);
  const [displayName, setdisplayName] = useState(""); // State for image preview
  const [photoURL, setphotoURL] = useState(""); // State for image preview
  const [creationTime, setcreationTime] = useState(""); // State for image preview
  const [statesList, setStatesList] = useState([]);
  const [showPrice, setShowPrice] = useState(true);
  const [showPhone, setShowPhone] = useState(true);
  const [loading, setLoading] = useState(true);
  const [DataCatorgySHow, setDataCatorgySHow] = useState(""); // State for image preview

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };
  useEffect(() => {
    // Fetch states of Saudi Arabia (country code: "SA")
    const saudiStates = State.getStatesOfCountry("SA");
    if (saudiStates) {
      setStatesList(
        saudiStates.map((state) => ({
          value: state.name,
          label: state.name,
        }))
      );
    }
  }, []);

  const handleStateChange = (selectedOption) => {
    setFormData({ States: selectedOption ? selectedOption.value : "" });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        console.log("User ID Token:", token);
        console.log("User UID:", user.uid);
        console.log("User Display Name:", user.displayName); // Now it should not be null
        console.log("User Display creationTime:", user.metadata.creationTime); // Now it should not be null
        setcreationTime(user.metadata.creationTime);
        setdisplayName(user.displayName);
        setphotoURL(user.photoURL);

        setUserId(user.uid);
      } else {
        console.log("No user is logged in. Redirecting to /login...");
        navigate("/login", { replace: true });
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    streetWidth: "",
    Floor: "",
    PropertyAge: "",
    Featuers: "",

    kmDriven: "",
    Transmission: "",
    mileage: "",
    Insurance: "",
    InteriorColor: "",
    AdditionalFeatures: [],
    licenseNumber: "",

    Emirates: "",
    Furnished: "",
    Facade: "",

    Area: "",

    bathrooms: "",

    Fueltype: "",

    Model: "",

    Registeredin: "",
    TrustedCars: "",
    EngineType: "",
    EngineCapacity: "",
    ManufactureYear: "",
    Assembly: "",
    BodyType: "",
    Type: "",
    BuildingType: "",
    Accessibility: "",
    Checkin: "",
    RoomType: "",
    ShoeCategory: "",
    Breed: "",
    NoiseLevel: "",
    Capacity: "",
    PowerSource: "",
    BagType: "",
    SubCategory: "",
    NestedSubCategory: "",
    Facade:"",
    Featuers:"",
    Area:"",
    Furnished:"",
    Frequency:"",
    Bedroom: "",
    ResidenceType: "",
    bathrooms: "",
    licenseNumber: "",
    Condition:"",
    Floor:"",
    PropertyAge:"",
    Age: "",
    Temperament: "",
    HealthStatus: "",
    TrainingLevel: "",
    DietaryPreferences: "",
    MAGAZINESCategory: "",
    IssueType: "",
    AgeGroup: "",

    SubscriptionType: "",

    ColorOptions: "",

    Availability: "",
    galleryImages: [],
    NumberofDoors: "",
    SeatingCapacity: "",
    ModelCategory: "",
    MeasurementRange: "",
    BatteryType: "",
    Compatibility: "",
    StorageCapacity: "",
    MeasurementUnits: "",
    SpeedofMeasurement: "",
    JobTitle: "",
    JobType: "",
    Language: "",
    Duration: "",
    PropertyType: "",
    Amenities: "",
    PropertyFeatures: "",

    SkillLevel: "",
    ContentType: "",

    SubjectCategories: "",

    Company: "",
    JobDescription: "",

    RequiredSkills: "",

    EmploymentType: "",
    ExperienceLevel: "",

    Accuracy: "",
    Industry: "",

    CuffSize: "",
    DisplayType: "",

    SellerType: "",
    PictureAvailability: "",
    VideoAvailability: "",
    BatteryLife: "",
    DisplayQuality: "",
    Connectivity: "",
    SpecialFeatures: "",
    Features: "",
    Season: "",
    ExteriorColor: "",
    Purpose: "",
    Price: "",

    Gender: "",
    Size: "",
    Fit: "",
    Material: "",
    StyleDesign: "",
    ClosureType: "",
    CollarType: "",
    WashType: "",

    SleeveLength: "",

    FeaturedAds: "",
    States: "",
    District: "",
    ScreenSize: "",
    Condition: "",
    Color: "",
    RegionalSpec: "",

    OperatingSystem: "",
    Processor: "",
    RAM: "",
    StorageType: "",
    Storagecapacity: "",
    GraphicsCard: "",
    // Make: "", // ✅ make sure this exists

    // Make: "",
    tagline: "",
    City: "",

    priceRange: "",
    priceFrom: "65",
    priceTo: "120",
    selectedFeature: "",
    location: "",
    address: "8697-8747 Stirling Rd, Florida",
    mapAddress: "8697-8747 Stirling Rd, Florida",
    latitude: "26.045197767574102",
    longitude: "-80.26095677163161",
    Email: "",
    Website: "",
    Phone: "",
    facebook: "http://facebook.com",
    twitter: "http://twitter.com",
    googlePlus: "http://google.com",
    instagram: "http://instagram.com",
  });
  const [mediaImgLogo, setMediaImgLogo] = useState(""); // State for image preview
  const [galleryImages, setGalleryImages] = useState([]); // Store previews of selected images
  const [uploading, setUploading] = useState(false); // To prevent multiple uploads at once
  const [imageUrl, setImageUrl] = useState(null); // Store a single URL, initially null
  const [showPayment, setshowPayment] = useState(null); // Store a single URL, initially null
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [citiesMake, setcitiesMake] = useState([]);
  const [mileage, setMileage] = useState("");
  console.log(formData, "subcategories____1");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [Make, setSelectedCityMake] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  console.log(subcategories, "subcategories____");
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

  const tataModels = ["XENON"];
  const jetourModels = ["X70", "X70S", "X90", "Dashing"];
  const cmcModels = ["Foton", "Tunland"];

  const bydModels = ["F3", "F5", "F7", "S6", "S7"];
  const alfaRomeoModels = ["GIULIA", "GIULIETTA", "STELVIO"];
  const victoryAutoModels = ["Lifan"];
  const lucidModels = ["Air", "Gravity"];
  const ineosModels = ["Grenadier"];

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const [showList, setShowList] = useState(false);

  const filteredBrands =
    query === ""
      ? carBrands
      : carBrands.filter((brand) =>
          brand.toLowerCase().includes(query.toLowerCase())
        );

  const handleSelect = (brand) => {
    setQuery(brand);
    setSelected(brand);
    setShowList(false);

    // ✅ Only update the "Make" field in the existing formData object
    setFormData((prev) => ({
      ...prev,
      Make: brand,
    }));
  };
  const [locationList, setLocationList] = useState([]);

  useEffect(() => {
    // Assuming Location.json is like { "location": [ ... ] } or is an array itself
    if (locationData.location && Array.isArray(locationData.location)) {
      setLocationList(locationData.location);
    } else if (Array.isArray(locationData)) {
      setLocationList(locationData);
    } else {
      // fallback empty or log error
      setLocationList([]);
      console.error("Location JSON data is not in expected format");
    }
  }, []);

  const districtOptions = locationList.map((loc) => ({
    value: loc,
    label: loc,
  }));
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

  console.log(subcategories, "subcategories___________");
  useEffect(() => {
    // Fetch cities of Saudi Arabia
    const saudiCities = City.getCitiesOfCountry("SA");
    if (saudiCities) {
      setcitiesMake(
        saudiCities.map((city) => ({
          value: city.name,
          label: city.name,
        }))
      );
    }
  }, []);
  // Format country data for React Select
  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode, // Country code (e.g., "US", "IN")
    label: country.name, // Country name
  }));

  const handleCountryChange = (selected) => {
    setSelectedCountry(selected);
    setSelectedCity(null); // Reset selected city
    setFormData((prev) => ({ ...prev, City: "" })); // Reset City in formData

    // Fetch cities based on selected country
    if (selected) {
      const countryCities = City.getCitiesOfCountry(selected.value) || [];
      setCities(countryCities);
    } else {
      setCities([]); // Clear cities if no country is selected
    }
  };
  const [Category, setCategory] = useState(""); // Store a single URL, initially null
  const [Category1, setCategory1] = useState(""); // Store a single URL, initially null
  const [NestedSubCategory, setNestedSubCategory] = useState(""); // Store a single URL, initially null

  console.log(Category1, "Category__________");
  console.log(NestedSubCategory, "Category__________NestedSubCategory");

  console.log(Category, "Category__________1");

  const isFormValid = () => {
    const nonEmptyFields = Object.values(formData).filter(
      (value) => value !== "" && value !== "$$$"
    );
    const totalFields = Object.values(formData).length;
    return nonEmptyFields.length > 2 / 2;
  };

  const location = useLocation();

  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  console.log(itemData, "itemData______________111");
  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };
  const [_Id, setId] = useState(null); // State to store ads data
  console.log(_Id, "callingFrom____________");

  const [callingFrom, setCallingFrom] = useState(null); // State to store ads data
  console.log(callingFrom, "callingFrom____________");
  const link = getQueryParam("link") || window.location.href;
  useEffect(() => {
    const callingFrom = getQueryParam("callingFrom");
    const ids = getQueryParam("id");

    console.log("callingFrom______ID:ids", ids);
    console.log("callingFrom______Calling From:", callingFrom);
    setCallingFrom(callingFrom);
    setId(ids);
  }, [id, location]);

  const categoryMapping = {
    "Job board": "JOBBOARD",
    Education: "Education",
    Travel: "TRAVEL",
    Pet: "PETANIMALCOMP",

    Automotive: "Cars",
    Sports: "SPORTSGAMESComp",
    Electronics: "ELECTRONICS",
    "Fashion Style": "FASHION",
    "Job Board": "JOBBOARD",
    "Real Estate": "REALESTATECOMP",
    Other: "Education",
    Services: "TRAVEL",
    "Pet & Animal": "PETANIMALCOMP",
    Home: "HEALTHCARE",
  };
  const reverseCategoryMapping = Object.keys(categoryMapping).reduce(
    (acc, key) => {
      const formattedKey = key
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
      acc[formattedKey] = categoryMapping[key];
      return acc;
    },
    {}
  );

  // useEffect(() => {
  //   const fetchItem = async () => {
  //     setLoading(true);
  //     setError("");

  //     try {
  //       const callingFrom = getQueryParam("callingFrom");
  //       const itemId = getQueryParam("id") || id;

  //       if (!itemId || !callingFrom) {
  //         setError("Missing ID or category.");
  //         setLoading(false);
  //         return;
  //       }

  //       // Map formatted category to Firestore collection
  //       const collectionName = reverseCategoryMapping[callingFrom];
  //       if (!collectionName) {
  //         setError("Invalid category.");
  //         setLoading(false);
  //         return;
  //       }

  //       // Fetch document
  //       const docRef = doc(db, collectionName, itemId);
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         const data = docSnap.data();
  //         // Filter out empty, null, or undefined fields
  //         const filteredData = Object.fromEntries(
  //           Object.entries(data).filter(
  //             ([_, value]) =>
  //               value !== "" && value !== null && value !== undefined
  //           )
  //         );
  //         setItemData(filteredData);
  //       } else {
  //         setError("No item found with this ID.");
  //       }
  //     } catch (err) {
  //       console.error("Error fetching item:", err);
  //       setError("Failed to load item details.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchItem();
  // }, [id, location.search]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const itemId = _Id; // Prefer useParams id, fallback to query param
        const collectionName = reverseCategoryMapping[callingFrom] || "Cars"; // Fallback to "Cars"

        if (!itemId || !collectionName) {
          setError("Missing ID or invalid category.");
          setLoading(false);
          return;
        }

        const docRef = doc(db, collectionName, itemId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Document data:", data);
          setDataCatorgySHow(data.SubCategory);
          setFormData({
            Accessibility: data.Accessibility || "",
            Accuracy: data.Accuracy || "",
            Age: data.Age || "",
            AgeGroup: data.AgeGroup || "",
            Amenities: data.Amenities || "",
            Assembly: data.Assembly || "",
            Availability: data.Availability || "",
            BagType: data.BagType || "",
            BatteryLife: data.BatteryLife || "",
            BatteryType: data.BatteryType || "",
            Bedroom: data.Bedroom || "",
            ResidenceType: data.ResidenceType || "",
            bathrooms: data.bathrooms || "",
            licenseNumber: data.licenseNumber || "",
            Condition: data.Condition || "",
            Floor: data.Floor || "",
            PropertyAge: data.PropertyAge || "",

            Facade: data.Facade || "",
            Featuers: data.Featuers || "",
            Frequency: data.Frequency || "",
            Area: data.Area || "",
            Furnished: data.Furnished || "",
            BodyType: data.BodyType || "",
            Breed: data.Breed || "",
            BuildingType: data.BuildingType || "",
            Capacity: data.Capacity || "",
            Checkin: data.Checkin || "",
            City: data.City || "",
            ClosureType: data.ClosureType || "",
            CollarType: data.CollarType || "",
            Color: data.Color || "",
            ColorOptions: data.ColorOptions || "",
            Company: data.Company || "",
            Compatibility: data.Compatibility || "",
            Connectivity: data.Connectivity || "",
            ContentType: data.ContentType || "",
            CuffSize: data.CuffSize || "",
            DietaryPreferences: data.DietaryPreferences || "",
            DisplayQuality: data.DisplayQuality || "",
            DisplayType: data.DisplayType || "",
            District: data.District || "",
            Duration: data.Duration || "",
            Email: data.Email || "",
            Emirates: data.Emirates || "",
            EmploymentType: data.EmploymentType || "",
            EngineCapacity: data.EngineCapacity || "",
            EngineType: data.EngineType || "",
            ExperienceLevel: data.ExperienceLevel || "",
            ExteriorColor: data.ExteriorColor || "",
            FeaturedAds: data.FeaturedAds || "",
            Features: data.Features || "",
            Fit: data.Fit || "",
            Gender: data.Gender || "",
            GraphicsCard: data.GraphicsCard || "",
            Fueltype: data.Fueltype || "",
            mileage: data.mileage || "",
            Model: data.Model || "",

            Insurance: data.Insurance || "",
            InteriorColor: data.InteriorColor || "",
            ManufactureYear: data.ManufactureYear || "",
            ManufactureYear: data.ManufactureYear || "",
            ManufactureYear: data.ManufactureYear || "",

            RegionalSpec:data.RegionalSpec||"",
            HealthStatus: data.HealthStatus || "",
            Industry: data.Industry || "",
            IssueType: data.IssueType || "",
            JobDescription: data.JobDescription || "",
            JobTitle: data.JobTitle || "",
            JobType: data.JobType || "",
            Language: data.Language || "",
            MAGAZINESCategory: data.MAGAZINESCategory || "",
            // Make: data.Make || "",
            ManufactureYear: data.ManufactureYear || "",
            Material: data.Material || "",
            MeasurementRange: data.MeasurementRange || "",
            MeasurementUnits: data.MeasurementUnits || "",
            ModelCategory: data.ModelCategory || "",
            NestedSubCategory: data.NestedSubCategory || "",
            NoiseLevel: data.NoiseLevel || "",
            NumberofDoors: data.NumberofDoors || "",
            OperatingSystem: data.OperatingSystem || "",
            Phone: data.Phone || "",
            PictureAvailability: data.PictureAvailability || "",
            PowerSource: data.PowerSource || "",
            Price: data.Price || "",
            Processor: data.Processor || "",
            PropertyFeatures: data.PropertyFeatures || "",
            PropertyType: data.PropertyType || "",
            Purpose: data.Purpose || "",
            RAM: data.RAM || "",
            Registeredin: data.Registeredin || "",
            RequiredSkills: data.RequiredSkills || "",
            RoomType: data.RoomType || "",
            ScreenSize: data.ScreenSize || "",
            Season: data.Season || "",
            SeatingCapacity: data.SeatingCapacity || "",
            SellerType: data.SellerType || "",
            ShoeCategory: data.ShoeCategory || "",
            Size: data.Size || "",
            SkillLevel: data.SkillLevel || "",
            SleeveLength: data.SleeveLength || "",
            SpecialFeatures: data.SpecialFeatures || "",
            SpeedofMeasurement: data.SpeedofMeasurement || "",
            States: data.States || "",
            StorageCapacity: data.StorageCapacity || "",
            StorageType: data.StorageType || "",
            Storagecapacity: data.Storagecapacity || "",
            StyleDesign: data.StyleDesign || "",
            SubCategory: data.SubCategory || "",
            AdditionalFeatures: data.AdditionalFeatures || "",

            SubjectCategories: data.SubjectCategories || "",
            SubscriptionType: data.SubscriptionType || "",
            Temperament: data.Temperament || "",
            TrainingLevel: data.TrainingLevel || "",
            Transmission: data.Transmission || "",
            TrustedCars: data.TrustedCars || "",
            Type: data.Type || "",
            VideoAvailability: data.VideoAvailability || "",
            WashType: data.WashType || "",
            Website: data.Website || "",
            address: data.address || "",
            category: data.category || "",
            creationTime: data.creationTime || "",
            description: data.description || "",
            displayName: data.displayName || "",
            facebook: data.facebook || "",
            googlePlus: data.googlePlus || "",
            imageUrl: data.imageUrl || "",
            instagram: data.instagram || "",
            kmDriven: data.kmDriven || "",
            latitude: data.latitude || "",
            location: data.location || "",
            longitude: data.longitude || "",
            mapAddress: data.mapAddress || "",
            mediaImgLogo: data.mediaImgLogo || "",
            photoURL: data.photoURL || "",
            priceFrom: data.priceFrom || "",
            priceRange: data.priceRange || "",
            priceTo: data.priceTo || "",
            selectedFeature: data.selectedFeature || "",
            tagline: data.tagline || "",
            title: data.title || "",
            twitter: data.twitter || "",
            userId: data.userId || "",
            galleryImages: data.galleryImages || [],

          });

          setGalleryImages(data.galleryImages || []);

          const selectedCategory = subcategoriesMapping.categories.find(
            (category) => category.name === data.category
          );
          if (selectedCategory) {
            setSubcategories(
              selectedCategory.subcategories.map((sub) => ({
                value: sub.name,
                label: sub.name,
              }))
            );
          } else {
            setSubcategories([]);
          }
        } else {
          setError("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    if (_Id || callingFrom) {
      fetchData();
    }
  }, [_Id, callingFrom]);

  const saveToFirestore = async (
    db,
    auth,
    formData,
    mediaImgLogo,
    Category1,
    photoURL,
    creationTime,
    displayName,
    galleryImages,
    imageUrl,
    // Make,
    setError,
    isFormValid,
    MySwal,
    navigate
  ) => {
    try {
      // Get the current user from Firebase Auth
      const user = auth.currentUser;
      console.log(Category1,'Category1__________')
      if (user) {
        if (!Category1) {
          setError("Category is required!"); // Set error message if no category is selected
          return;
        }
        setError("");
        const Collection =
          Category1 === "Automotive"
            ? "Cars"
            : Category1 === "Electronics"
            ? "ELECTRONICS"
            : Category1 === "Fashion Style"
            ? "FASHION"
            : Category1 === "Home & Furnituer"
            ? "HEALTHCARE"
            : Category1 === "Job Board"
            ? "JOBBOARD"
            : Category1 === "Other"
            ? "Education"
            : Category1 === "Real Estate"
            ? "REALESTATECOMP"
            : Category1 === "Services"
            ? "TRAVEL"
            : Category1 === "Sports & Game"
            ? "SPORTSGAMESComp"
            : Category1 === "Pet & Animals"
            ? "PETANIMALCOMP"
            : Category1 === "Magazines"
            ? "Magazines"
            : Category1 === "Household"
            ? "Household"
            : "books";
        // Check if more than half of the form fields are filled
        if (isFormValid()) {
          // Save form data to Firestore under the specified collection
          await addDoc(collection(db, Collection), {
            ...formData,
            mediaImgLogo,
            category: Category1,
            photoURL,
            creationTime,
            displayName,
            galleryImages,
            imageUrl,
            // Make: Make?.value,
            userId: user.uid,
            createdAt: new Date(),
          });
          console.log("Data added successfully to Firestore!");
          MySwal.fire({
            title: "Added!",
            text: "Your listing has been added.",
            icon: "success",
            timer: 1000,
          }).then(() => {
            navigate("/dashboard");
          });
        } else {
          MySwal.fire({
            title: "Error!",
            text: "Please fill in at least half of the required fields.",
            icon: "error",
            timer: 2000,
          });
        }
      } else {
        console.log("User is not authenticated.");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const updateToFirestore = async (
    db,
    auth,
    _Id,
    formData,
    mediaImgLogo,
    Category1,
    photoURL,
    creationTime,
    displayName,
    galleryImages,
    imageUrl,
    // Make,
    setError,
    isFormValid,
    MySwal,
    navigate
  ) => {
    try {
      // Get the current user from Firebase Auth
      const user = auth.currentUser;
      if (user) {
        if (!Category1) {
          setError("Category is required!"); // Set error message if no category is selected
          return;
        }
        console.log("Category is required!_____",Category1); // Set error message if no category is selected

        setError("");
        const Collection =
          Category1 === "Automotive"
            ? "Cars"
            : Category1 === "Electronics"
            ? "ELECTRONICS"
            : Category1 === "Fashion Style"
            ? "FASHION"
            : Category1 === "Home & Furnituer"
            ? "HEALTHCARE"
            : Category1 === "Job Board"
            ? "JOBBOARD"
            : Category1 === "Other"
            ? "Education"
            : Category1 === "Real Estate"
            ? "REALESTATECOMP"
            : Category1 === "Services"
            ? "TRAVEL"
            : Category1 === "Sports & Game"
            ? "SPORTSGAMESComp"
            : Category1 === "Pet & Animals"
            ? "PETANIMALCOMP"
            : Category1 === "Magazines"
            ? "Magazines"
            : Category1 === "Household"
            ? "Household"
            : "books";
            console.log("Category is required!_____11",Collection); // Set error message if no category is selected

        // Check if more than half of the form fields are filled
        if (isFormValid()) {
          // Update the existing document in Firestore
          const docRef = doc(db, Collection, _Id);
          await updateDoc(docRef, {
            ...formData,
            mediaImgLogo,
            category: Category1,
            photoURL,
            creationTime,
            displayName,
            galleryImages,
            imageUrl,
            // Make: Make?.value,
            userId: user.uid,
            updatedAt: new Date(), // Store the update timestamp
          });
          console.log("Document updated successfully in Firestore!");
          MySwal.fire({
            title: "Updated!",
            text: "Your listing has been updated.",
            icon: "success",
            timer: 1000,
          }).then(() => {
            navigate("/dashboard");
          });
        } else {
          MySwal.fire({
            title: "Error!",
            text: "Please fill in at least half of the required fields.",
            icon: "error",
            timer: 2000,
          });
        }
      } else {
        console.log("User is not authenticated.");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  const handleSubmit = () => {
    if (_Id) {
      updateToFirestore(
        db,
        auth,
        _Id,
        formData,
        mediaImgLogo,
        Category1,
        photoURL,
        creationTime,
        displayName,
        galleryImages,
        imageUrl,
        // Make,
        setError,
        isFormValid,
        MySwal,
        navigate
      );
    } else {
      saveToFirestore(
        db,
        auth,
        formData,
        mediaImgLogo,
        Category1,
        photoURL,
        creationTime,
        displayName,
        galleryImages,
        imageUrl,
        // Make,
        setError,
        isFormValid,
        MySwal,
        navigate
      );
    }
  };
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Replace with your actual preset
    formData.append("cloud_name", "dv26wjoay"); // Replace with your actual cloud name

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dv26wjoay/image/upload", // Your Cloudinary URL
        formData
      );

      const uploadedUrl = response.data.secure_url;
      setImageUrl(uploadedUrl); // Update the state with the URL
      console.log("Uploaded Image URL:", uploadedUrl); // Log the URL to the console
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image."); // Or better error handling
    }
  };
  const handleDeleteImage = (indexToDelete) => {
    setGalleryImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToDelete)
    );
  };
  // Handle file change for multiple images
  // const handleGalleryChange = async (e) => {
  //   const files = e.target.files;

  //   if (files.length > 0 && !uploading) {
  //     setUploading(true); // Lock uploading until uploads finish
  //     let uploadedImages = [...galleryImages]; // Store uploaded image URLs

  //     for (let i = 0; i < files.length; i++) {
  //       const file = files[i];
  //       const formData = new FormData();
  //       formData.append("file", file);
  //       formData.append("upload_preset", "dlfdvlmse"); // Your Cloudinary preset
  //       formData.append("cloud_name", "dlfdvlmse"); // Replace with actual cloud name

  //       try {
  //         const response = await axios.post(
  //           "https://api.cloudinary.com/v1_1/dlfdvlmse/image/upload",
  //           formData
  //         );

  //         if (response.data.secure_url) {
  //           uploadedImages.push(response.data.secure_url); // Add image URL to array
  //           setGalleryImages([...uploadedImages]); // Update state with new image URLs
  //         }
  //       } catch (error) {
  //         console.error("Error uploading to Cloudinary", error);
  //       }
  //     }

  //     setUploading(false); // Reset the uploading state
  //   }
  // };
  const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/bmp",
  ];
  const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp"];

  const handleGalleryChange = async (e) => {
    const files = Array.from(e.target.files);

    // Filter valid images only (exclude SVGs and other non-raster types)
    const validImages = files.filter((file) => {
      const isValidType = ALLOWED_IMAGE_TYPES.includes(file.type);
      const isValidExt = ALLOWED_EXTENSIONS.some((ext) =>
        file.name.toLowerCase().endsWith(ext)
      );
      return isValidType && isValidExt;
    });

    if (validImages.length !== files.length) {
      alert("Only raster image files (JPG, PNG, GIF, WEBP, BMP) are allowed.");
      return;
    }

    if (uploading) return;

    let uploadedImages = [...galleryImages];

    if (uploadedImages.length + validImages.length > 20) {
      alert("You can only upload up to 20 images.");
      return;
    }

    setUploading(true);

    for (let i = 0; i < validImages.length; i++) {
      const file = validImages[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");
      formData.append("cloud_name", "dv26wjoay");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dv26wjoay/image/upload",
          formData
        );

        if (response.data.secure_url) {
          uploadedImages.push(response.data.secure_url);
          setGalleryImages([...uploadedImages]);

          if (uploadedImages.length >= 20) {
            alert("Image limit reached (20 images).");
            break;
          }
        }
      } catch (error) {
        console.error("Error uploading to Cloudinary", error);
      }
    }

    setUploading(false);
  };

  // Handle file change and preview
  const handleFileChangeLogo = async (e) => {
    const file = e.target.files[0];

    if (file) {
      // Create a preview for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        // setMediaImgLogo(reader.result); // Set the preview image
      };
      reader.readAsDataURL(file); // Read the file as a data URL

      // Prepare formData for uploading to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary preset
      formData.append("cloud_name", "dv26wjoay"); // Replace with your actual cloud name

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dv26wjoay/image/upload",
          formData
        );
        setMediaImgLogo(response.data.secure_url);
        console.log("Image uploaded:", response.data);
        // Handle the Cloudinary URL response here if needed
      } catch (error) {
        console.error("Error uploading to Cloudinary", error);
      }
    }
  };
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    handleImageUpload(file);
  };
  const handleFeatureChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, selectedFeature: name }));
  };
  const handleTransmissionChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Transmission: name }));
  };
  const handleCondition = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Condition: name }));
  };
  const handleCityChange = (selected) => {
    setSelectedCity(selected);
    setFormData((prev) => ({ ...prev, City: selected ? selected.label : "" }));
    console.log("Selected City:", selected ? selected.label : "None");
  };

  const handleMakeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Make: name }));
  };
  const handleEmiratesChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Emirates: name }));
  };
  const handleRegisteredinChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Registeredin: name }));
  };
  const handleTrustedCarsChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, TrustedCars: name }));
  };
  const handleDistrictChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, District: name }));
  };
  const handleNoiseLevelChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, NoiseLevel: name }));
  };
  const handleCapacityChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Capacity: name }));
  };
  const handleShoeCategoryChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, ShoeCategory: name }));
  };
  const handleSubjectCategoriesChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, SubjectCategories: name }));
  };
  const handleSkillLevelChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, SkillLevel: name }));
  };
  const handleContentTypeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, ContentType: name }));
  };
  const handleLanguageChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Language: name }));
  };
  const handleAgeGroupChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, AgeGroup: name }));
  };
  const handleDurationChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Duration: name }));
  };
  const handleJobTitleChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, JobTitle: name }));
  };
  const handlJobTypeeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, JobType: name }));
  };
  const handleEmploymentTypeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, EmploymentType: name }));
  };
  const handleExperienceLevelChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, ExperienceLevel: name }));
  };
  const handleIndustryChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Industry: name }));
  };
  const handleRequiredSkillsChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, RequiredSkills: name }));
  };
  const handleCompanyChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Company: name }));
  };
  const handleMeasurementRangeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, MeasurementRange: name }));
  };
  const handleAccuracyChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Accuracy: name }));
  };
  const handleTypedChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Type: name }));
  };
  const handlePowerSourceChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, PowerSource: name }));
  };
  const handleBagTypeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, BagType: name }));
  };
  const handleGenderChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Gender: name }));
  };
  const handleFitChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Fit: name }));
  };
  const handleMaterialChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Material: name }));
  };
  const handleSizeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Size: name }));
  };
  const handleAreaChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Area: name }));
  };
  const handleTemperamentChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Temperament: name }));
  };
  const handleHealthStatusChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, HealthStatus: name }));
  };
  const handleTrainingLevelChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, TrainingLevel: name }));
  };
  const handleDietaryPreferencesChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, DietaryPreferences: name }));
  };
  const handleAmenitiesChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Amenities: name }));
  };
  const handleFurnishedChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Furnished: name }));
  };
  const handleFacadeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Facade: name }));
  };
  const handlePropertyFeaturesChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, PropertyFeatures: name }));
  };
  const handleBuildingTypeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, BuildingType: name }));
  };
  const handleFloorChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Floor: name }));
  };
  const handleAccessibilityChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Accessibility: name }));
  };
  const handlePropertyAgeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, PropertyAge: name }));
  };
  const handleFeatuersChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Featuers: name }));
  };
  const handleOperatingSystemChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, OperatingSystem: name }));
  };
  const handleRAMChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, RAM: name }));
  };
  const handleStoragecapacityChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Storagecapacity: name }));
  };
  const handleGraphicsCardChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, GraphicsCard: name }));
  };
  const handleBatteryLifeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, BatteryLife: name }));
  };
  const handleDisplayQualityChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, DisplayQuality: name }));
  };
  const handleConnectivityChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Connectivity: name }));
  };
  const handleSpecialFeaturesChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, SpecialFeatures: name }));
  };
  const handleStorageTypeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, StorageType: name }));
  };
  const handleProcessorChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Processor: name }));
  };
  const handleScreenSizeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, ScreenSize: name }));
  };
  const handleStatesChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, States: name }));
  };
  const handleMAGAZINESCategoryChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, MAGAZINESCategory: name }));
  };
  const handleSubscriptionTypeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, SubscriptionType: name }));
  };
  const handleIssueTypeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, IssueType: name }));
  };
  const handleBreedChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Breed: name }));
  };
  const handleAgeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Age: name }));
  };
  const handleCheckinChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Checkin: name }));
  };
  const handleRoomTypeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, RoomType: name }));
  };
  const handlePropertyTypeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, PropertyType: name }));
  };
  const handleFrequency = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Frequency: name }));
  };
  const handleResidenceType = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, ResidenceType: name }));
  };
  const handleBedroomChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Bedroom: name }));
  };
  const handlebathroomsChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, bathrooms: name }));
  };
  const handleColorChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Color: name }));
  };
  const handleInteriorColor = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, InteriorColor: name }));
  };
  const handleRegionalSpecChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, RegionalSpec: name }));
  };
  const handleFueltype = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Fueltype: name }));
  };
  const handleInsuranceChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Insurance: name }));
  };
  const handlePurposeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Purpose: name }));
  };
  const handleExteriorColorChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Color: name }));
  };
  const handleStyleDesignChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, StyleDesign: name }));
  };
  const handleClosureTypeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, ClosureType: name }));
  };
  const handleCollarTypeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, CollarType: name }));
  };
  const handleSleeveLengthChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, SleeveLength: name }));
  };
  const handleWashTypeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, WashType: name }));
  };
  const handleFeaturesChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Features: name }));
  };
  const handleAvailabilityChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Availability: name }));
  };
  const handleColorOptionsChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, ColorOptions: name }));
  };
  const handleCuffSizeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, CuffSize: name }));
  };
  const handleDisplayTypeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, DisplayType: name }));
  };
  const handleBatteryTypeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, BatteryType: name }));
  };
  const handleCompatibilityChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Compatibility: name }));
  };
  const handleStorageCapacityChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, StorageCapacity: name }));
  };
  const handleMeasurementUnitsChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, MeasurementUnits: name }));
  };
  const handleSpeedofMeasurementChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, SpeedofMeasurement: name }));
  };
  const handleSeasonChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Season: name }));
  };
  const handleSellerTypeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, SellerType: name }));
  };
  const handleAdditionalFeatures = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => {
      const selected = prev.AdditionalFeatures || [];
      if (checked) {
        // Add feature if checked and not already present
        return {
          ...prev,
          AdditionalFeatures: [...selected, name],
        };
      } else {
        // Remove feature if unchecked
        return {
          ...prev,
          AdditionalFeatures: selected.filter((item) => item !== name),
        };
      }
    });
  };

  const handleBrandChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Brand: name }));
  };
  const SubCategoryCHange = (e) => {
    setFormData((prev) => ({ ...prev, SubCategory: e.target.value }));
  };

  const handleVideoAvailabilityChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, VideoAvailability: name }));
  };
  const handlePictureAvailabilityChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, PictureAvailability: name }));
  };
  const handleFeaturedAdsChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, FeaturedAds: name }));
  };
  const handleModelCategoryChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, ModelCategory: name }));
  };
  const handleNumberofDoorsChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, NumberofDoors: name }));
  };
  const handleSeatingCapacityChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, SeatingCapacity: name }));
  };
  const handleBodyTypeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, BodyType: name }));
  };
  const handleEngineTypeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, EngineType: name }));
  };
  const handleAssemblyChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Assembly: name }));
  };
  const handleChangemileage = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, mileage: name }));
  };
  useEffect(() => {
    console.log("Updated Form Data:", formData);
  }, [formData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(name, value);
  };

  const [Saudinummsg, setSaudinummsg] = useState(null); // Store a single file

  const saudiNumberRegex = /^\+9665\d{8}$/; // Saudi mobile number pattern

  // const handleChangePhone = (e) => {
  //   const { name, value } = e.target;

  //   // Allow only numbers and "+" while typing
  //   if (/^[\d+]*$/.test(value)) {
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //   }
  // };
  const handleChangePhone = (e) => {
    const { name, value } = e.target;

    // Allow only numeric characters and limit to 12 digits
    const numericValue = value.replace(/[^0-9+]/g, ""); // Remove non-numeric characters except +
    if (numericValue.length <= 13) {
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
      // Optionally reset error message
      setSaudinummsg("");
    } else {
      setSaudinummsg("Phone number cannot exceed 13 digits");
    }
  };
  const validatePhone = () => {
    const phone = formData.Phone;
    if (phone.length > 13) {
      setSaudinummsg("Phone number cannot exceed 13 digits");
    } else if (!phone.startsWith("+966") || phone.length !== 13) {
      setSaudinummsg(
        "Please enter a valid Saudi phone number (e.g., +9665XXXXXXXX)"
      );
    } else {
      setSaudinummsg("");
    }
  };

  const categories = [
    "Automotive",
    "Electronics",
    "Fashion Style",
    "Health Care",
    "Job board",
    "Education",
    "Real Estate",
    "Travel",
    "Sports & Game",
    "Magazines",
    "Pet & Animal",
    "Household",
  ];

  const options = categories.map((category) => ({
    value: category,
    label: category,
  }));
  // const optionsSubCategory = [
  //   { value: "Cars", label: "Cars" },
  //   { value: "ELECTRONICS", label: "ELECTRONICS" },
  //   { value: "Education", label: "Education" },
  //   { value: "FASHION", label: "FASHION" },
  //   { value: "HEALTHCARE", label: "HEALTHCARE" },
  //   { value: "JOBBOARD", label: "JOBBOARD" },
  //   { value: "REALESTATECOMP", label: "REALESTATECOMP" },
  //   { value: "SPORTSGAMESComp", label: "SPORTSGAMESComp" },
  // ];
  const subcategoriesMapping = {
    categories: [
      {
        name: "Automotive",
        subcategories: [
          {
            name: "Cars For Sale",
            subcategories: [
              { name: "Sedan" },
              { name: "SUV" },
              { name: "Coupe" },
              { name: "Convertible" },
              { name: "Truck" },
              { name: "Electric" },
            ],
          },
          {
            name: "Car Rental",
            subcategories: [
              { name: "Sedan" },
              { name: "SUV" },
              { name: "Coupe" },
              { name: "Convertible" },
              { name: "Truck" },
              { name: "Electric" },
            ],
          },
          {
            name: "Plates Number",
            subcategories: [
              { name: "Sedan" },
              { name: "SUV" },
              { name: "Coupe" },
              { name: "Convertible" },
              { name: "Truck" },
              { name: "Electric" },
            ],
          },
          {
            name: "Wheels & Rims",
            subcategories: [
              { name: "Sedan" },
              { name: "SUV" },
              { name: "Coupe" },
              { name: "Convertible" },
              { name: "Truck" },
              { name: "Electric" },
            ],
          },
          {
            name: "Spare Parts",
            subcategories: [
              { name: "Sedan" },
              { name: "SUV" },
              { name: "Coupe" },
              { name: "Convertible" },
              { name: "Truck" },
              { name: "Electric" },
            ],
          },
          {
            name: "Motorcycles",
            subcategories: [
              { name: "Sport" },
              { name: "Cruiser" },
              { name: "Off-road" },
            ],
          },
          {
            name: "Trucks & Heavy Machinery",
            subcategories: [
              { name: "Sport" },
              { name: "Cruiser" },
              { name: "Off-road" },
            ],
          },

          {
            name: "Accessories",
            subcategories: [
              { name: "Engine Components" },
              { name: "Brakes" },
              { name: "Tires & Wheels" },
            ],
          },
          {
            name: "Tshaleeh",
            subcategories: [
              { name: "Engine Components" },
              { name: "Brakes" },
              { name: "Tires & Wheels" },
            ],
          },
          {
            name: "Boats & Jet Ski",
            subcategories: [
              { name: "Engine Components" },
              { name: "Brakes" },
              { name: "Tires & Wheels" },
            ],
          },
          {
            name: "Classic Cars",
            subcategories: [
              { name: "Engine Components" },
              { name: "Brakes" },
              { name: "Tires & Wheels" },
            ],
          },
          {
            name: "Salvage Cars",
            subcategories: [
              { name: "Engine Components" },
              { name: "Brakes" },
              { name: "Tires & Wheels" },
            ],
          },
          {
            name: "Mortgaged Cars",
            subcategories: [
              { name: "Engine Components" },
              { name: "Brakes" },
              { name: "Tires & Wheels" },
            ],
          },
          {
            name: "Recovery",
            subcategories: [
              { name: "Engine Components" },
              { name: "Brakes" },
              { name: "Tires & Wheels" },
            ],
          },
          {
            name: "Food Truck",
            subcategories: [
              { name: "Engine Components" },
              { name: "Brakes" },
              { name: "Tires & Wheels" },
            ],
          },
          {
            name: "Caravans",
            subcategories: [
              { name: "Engine Components" },
              { name: "Brakes" },
              { name: "Tires & Wheels" },
            ],
          },
          {
            name: "Reports",
            subcategories: [
              { name: "Engine Components" },
              { name: "Brakes" },
              { name: "Tires & Wheels" },
            ],
          },
          {
            name: "Car Cleaning",
            subcategories: [
              { name: "Engine Components" },
              { name: "Brakes" },
              { name: "Tires & Wheels" },
            ],
          },
        ],
      },
      {
        name: "Electronics",
        subcategories: [
          {
            name: "Mobile Phones",
            subcategories: [
              { name: "Smartphones" },
              { name: "Feature Phones" },
            ],
          },

          {
            name: "Tablet Devices",
            subcategories: [
              { name: "Laptops" },
              { name: "Desktops" },
              { name: "Accessories" },
            ],
          },

          {
            name: "Computers & Laptops",
            subcategories: [
              { name: "Televisions" },
              { name: "Speakers" },
              { name: "Home Theater" },
            ],
          },
          {
            name: "Video Games",
            subcategories: [
              { name: "Televisions" },
              { name: "Speakers" },
              { name: "Home Theater" },
            ],
          },
          {
            name: "Television & Audio System",
            subcategories: [
              { name: "Televisions" },
              { name: "Speakers" },
              { name: "Home Theater" },
            ],
          },
          {
            name: "Accounts & Subscriptions",
            subcategories: [
              { name: "Televisions" },
              { name: "Speakers" },
              { name: "Home Theater" },
            ],
          },
          {
            name: "Computers & Laptops",
            subcategories: [
              { name: "Televisions" },
              { name: "Speakers" },
              { name: "Home Theater" },
            ],
          },
          {
            name: "Special Number",
            subcategories: [
              { name: "Televisions" },
              { name: "Speakers" },
              { name: "Home Theater" },
            ],
          },
          {
            name: "Home & Kitchen Appliance",
            subcategories: [
              { name: "Televisions" },
              { name: "Speakers" },
              { name: "Home Theater" },
            ],
          },

          {
            name: "Motors & Generators",
            subcategories: [
              { name: "Televisions" },
              { name: "Speakers" },
              { name: "Home Theater" },
            ],
          },
          {
            name: "Cameras",
            subcategories: [
              { name: "Televisions" },
              { name: "Speakers" },
              { name: "Home Theater" },
            ],
          },
          {
            name: "Networking Devices",
            subcategories: [
              { name: "Televisions" },
              { name: "Speakers" },
              { name: "Home Theater" },
            ],
          },
          {
            name: "Screens & Projectors",
            subcategories: [
              { name: "Televisions" },
              { name: "Speakers" },
              { name: "Home Theater" },
            ],
          },
          {
            name: "Printer & Scanner",
            subcategories: [
              { name: "Televisions" },
              { name: "Speakers" },
              { name: "Home Theater" },
            ],
          },
          {
            name: "Computer Accessories",
            subcategories: [
              { name: "Televisions" },
              { name: "Speakers" },
              { name: "Home Theater" },
            ],
          },
        ],
      },
      {
        name: "Fashion Style",
        subcategories: [
          {
            name: "Watches",
            subcategories: [
              { name: "Houses" },
              { name: "Apartments" },
              { name: "Land" },
              { name: "Villas" },
            ],
          },
          {
            name: "Perfumes & Incense",
            subcategories: [
              { name: "Houses" },
              { name: "Apartments" },
              { name: "Commercial Spaces" },
            ],
          },
          {
            name: "Sports Equipment",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Men's Fashion",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Women's Fashion",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Children's Clothing & Accessories",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },

          {
            name: "Sleepwear",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Gifts",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Luggage",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Health & Beauty",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },

          {
            name: "Others",
            subcategories: [{ name: "Miscellaneous", subcategories: [] }],
          },
        ],
      },
      {
        name: "Home & Furnituer",
        subcategories: [
          {
            name: "Outdoor Furniture",
            subcategories: [
              { name: "Houses" },
              { name: "Apartments" },
              { name: "Land" },
              { name: "Villas" },
            ],
          },
          {
            name: "Majlis & Sofas",
            subcategories: [
              { name: "Houses" },
              { name: "Apartments" },
              { name: "Commercial Spaces" },
            ],
          },
          {
            name: "Cabinets & Wardrobes",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Beds & Mattresses",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Tables & Chairs",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Kitchens",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },

          {
            name: "Sleepwear",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Bathrooms",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Carpets",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Curtains",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },

          {
            name: "Decoration & Accessories",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Lighting",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Decoration & Accessories",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Lighting",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Household Items",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Garden - Plants",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Office Furniture",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Doors - Windows - Aluminium",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Tiles & Flooring",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Others",
            subcategories: [{ name: "Miscellaneous", subcategories: [] }],
          },
        ],
      },
      {
        name: "Job Board",
        subcategories: [
          {
            name: "Administrative Jobs",
            subcategories: [
              { name: "Houses" },
              { name: "Apartments" },
              { name: "Land" },
              { name: "Villas" },
            ],
          },
          {
            name: "Fashion & Beauty Jobs",
            subcategories: [
              { name: "Houses" },
              { name: "Apartments" },
              { name: "Commercial Spaces" },
            ],
          },
          {
            name: "Security & Safety Jobs",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Teaching Jobs",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "IT & Design Jobs",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Agriculture & Farming Jobs",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },

          {
            name: "Industrial Jobs",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Medical & Nursing Jobs",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Architecture & Construction Jobs",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Industrial Jobs",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },

          {
            name: "Housekeeping Jobs",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Restaurant Jobs",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },

          {
            name: "Others",
            subcategories: [{ name: "Miscellaneous", subcategories: [] }],
          },
        ],
      },
      {
        name: "Real Estate",
        subcategories: [
          {
            name: "Apartments for Rent",
            subcategories: [
              { name: "Houses" },
              { name: "Apartments" },
              { name: "Land" },
              { name: "Villas" },
            ],
          },
          {
            name: "Apartments for Sale",
            subcategories: [
              { name: "Houses" },
              { name: "Apartments" },
              { name: "Commercial Spaces" },
            ],
          },
          {
            name: "Building for Rent",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },

          {
            name: "Building for Sale",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Camps for Rent",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Chalets for Sale",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Chalets for Sale",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Commercial Lands for Sale",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Compound for Rent",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Compound for Sale",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Farm for Rent",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Farms for Sale",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Floor for Sale",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Floors for Rent",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Hall for Rent",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Houses for Rent",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Houses for Sale",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Offices for Rent",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Rest Houses for Rent",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Rooms for Rent",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Shops for Rent",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Shops for Transfer",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Warehouse for Rent",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Villas for Sale",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },
          {
            name: "Villas for Rent",
            subcategories: [
              { name: "Office Spaces" },
              { name: "Retail" },
              { name: "Industrial" },
            ],
          },

          {
            name: "Camping",
            subcategories: [
              {
                name: "Tents",
                subcategories: [],
              },
              {
                name: "Sleeping Bags",
                subcategories: [],
              },
              {
                name: "Outdoor Gear",
                subcategories: [
                  { name: "Backpacking" },
                  { name: "Family Camping" },
                ],
              },
            ],
          },

          {
            name: "Others",
            subcategories: [{ name: "Miscellaneous", subcategories: [] }],
          },
        ],
      },
      {
        name: "Services",
        subcategories: [
          {
            name: "Other Services",
            subcategories: [{ name: "Cleaning" }, { name: "Maintenance" }],
          },
          {
            name: "Contracting Services",
            subcategories: [{ name: "Repair" }, { name: "Detailing" }],
          },
          {
            name: "Government Paperwork Services",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },
          {
            name: "Delivery Services",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },
          {
            name: "Furniture Moving Services",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },
          {
            name: "Cleaning Services",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },
          {
            name: "International Shopping Services",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },
          {
            name: "Legal Services",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },
          {
            name: "Accounting & Financial Services",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },
        ],
      },
      {
        name: "Sports & Game",
        subcategories: [
          {
            name: "Gaming Consoles",
            subcategories: [
              { name: "Sports & Game" },
              { name: "Sports & Game" },
            ],
          },
          {
            name: "Video Games",
            subcategories: [
              { name: "Sports & Game" },
              { name: "Sports & Game" },
            ],
          },
          {
            name: "Controllers",
            subcategories: [
              { name: "Sports & Game" },
              { name: "Sports & Game" },
            ],
          },
          {
            name: "Gaming Accessories",
            subcategories: [
              { name: "Sports & Game" },
              { name: "Sports & Game" },
            ],
          },
          {
            name: "Gift Cards",
            subcategories: [
              { name: "Sports & Game" },
              { name: "Sports & Game" },
            ],
          },
          {
            name: "Accounts",
            subcategories: [
              { name: "Sports & Game" },
              { name: "Sports & Game" },
            ],
          },
          {
            name: "Toys",
            subcategories: [
              { name: "Sports & Game" },
              { name: "Sports & Game" },
            ],
          },
        ],
      },
      {
        name: "Pet & Animals",
        subcategories: [
          {
            name: "Sheep",
            subcategories: [
              { name: "Dogs" },
              { name: "Cats" },
              { name: "Birds" },
              { name: "Fish" },
            ],
          },
          {
            name: "Goats",
            subcategories: [
              { name: "Cattle" },
              { name: "Sheep" },
              { name: "Goats" },
            ],
          },
          {
            name: "Parrot",
            subcategories: [],
          },

          {
            name: "Dove/Pigeon",
            subcategories: [
              { name: "Cattle" },
              { name: "Sheep" },
              { name: "Goats" },
            ],
          },
          {
            name: "Cats",
            subcategories: [
              { name: "Cattle" },
              { name: "Sheep" },
              { name: "Goats" },
            ],
          },
          {
            name: "Chickens",
            subcategories: [
              { name: "Cattle" },
              { name: "Sheep" },
              { name: "Goats" },
            ],
          },
          {
            name: "Camels",
            subcategories: [
              { name: "Cattle" },
              { name: "Sheep" },
              { name: "Goats" },
            ],
          },
          {
            name: "Horses",
            subcategories: [
              { name: "Cattle" },
              { name: "Sheep" },
              { name: "Goats" },
            ],
          },
          {
            name: "Dogs",
            subcategories: [
              { name: "Cattle" },
              { name: "Sheep" },
              { name: "Goats" },
            ],
          },
          {
            name: "Cows",
            subcategories: [
              { name: "Cattle" },
              { name: "Sheep" },
              { name: "Goats" },
            ],
          },
          {
            name: "Fish & Turtles",
            subcategories: [
              { name: "Cattle" },
              { name: "Sheep" },
              { name: "Goats" },
            ],
          },
          {
            name: "Rabbits",
            subcategories: [
              { name: "Cattle" },
              { name: "Sheep" },
              { name: "Goats" },
            ],
          },
          {
            name: "Ducks",
            subcategories: [
              { name: "Cattle" },
              { name: "Sheep" },
              { name: "Goats" },
            ],
          },
          {
            name: "Squirrels",
            subcategories: [
              { name: "Cattle" },
              { name: "Sheep" },
              { name: "Goats" },
            ],
          },
          {
            name: "Hamsters",
            subcategories: [
              { name: "Cattle" },
              { name: "Sheep" },
              { name: "Goats" },
            ],
          },
          {
            name: "Fur",
            subcategories: [
              { name: "Cattle" },
              { name: "Sheep" },
              { name: "Goats" },
            ],
          },
        ],
      },
      {
        name: "Other",
        subcategories: [
          {
            name: "Hunting & Trips",
            subcategories: [{ name: "Cleaning" }, { name: "Maintenance" }],
          },
          {
            name: "Gardening & Agriculture",
            subcategories: [{ name: "Repair" }, { name: "Detailing" }],
          },
          {
            name: "Parties & Events",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },
          {
            name: "Travel & Tourism",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },
          {
            name: "Roommate",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },
          {
            name: "Lost & Found",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },
          {
            name: "Education & Training",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },
          {
            name: "Sports Training",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },
          {
            name: "Stock & Forex Education",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },
          {
            name: "Driving Lessons",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },
          {
            name: "Private Tutoring",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },

          {
            name: "Training Courses",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },
          {
            name: "Antiques & Collectibles",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },
          {
            name: "Projects & Investments",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },
          {
            name: "Books & Arts",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },
          {
            name: "Programming & Design",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },

          {
            name: "Food & Beverages",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },
          {
            name: "Gardening & Agriculture",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },
          {
            name: "Hunting & Trips",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },
        ],
      },
    ],
  };

  const categoryOptions = subcategoriesMapping.categories.map((category) => ({
    value: category.name,
    label: category.name,
  }));

  const handleCategoryChange = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : "";
    setFormData((prev) => ({
      ...prev,
      category: selectedValue,
      SubCategory: "",
    }));

    // Find the selected category and set its subcategories
    const selectedCategory = subcategoriesMapping.categories.find(
      (category) => category.name === selectedValue
    );

    // If the selected category exists, set its subcategories
    if (selectedCategory) {
      setSubcategories(
        selectedCategory.subcategories.map((sub) => ({
          value: sub.name,
          label: sub.name,
        }))
      );
    } else {
      setSubcategories([]); // Reset if no subcategories exist
    }
  };

  const handleSubcategoryChange = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : "";
    setFormData((prev) => ({ ...prev, SubCategory: selectedValue }));
    setCategory((prev) => ({ ...prev, SubCategory: selectedValue }));
  };
  const SparePartsChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      NestedSubCategory: selectedOption.value,
    }));
    setNestedSubCategory((prevData) => ({
      ...prevData,
      NestedSubCategory: selectedOption.value,
    }));
  };
  const AccountsSubscriptions = [
    { value: "Skincare", label: "Skincare" },
    { value: "Hair Care", label: "Hair Care" },
    { value: "Makeup", label: "Makeup" },
    { value: "Other Beauty Products", label: "Other Beauty Products" },
  ];
  const HealthBeauty = [
    { value: "PUBG", label: "PUBG" },
    { value: "Fortnite", label: "Fortnite" },
    { value: "FIFA", label: "FIFA" },
    { value: "Clash of Clans", label: "Clash of Clans" },
    { value: "Clash Royale", label: "Clash Royale" },
    { value: "Instagram Accounts", label: "Instagram Accounts" },
    { value: "Twitter Accounts", label: "Twitter Accounts" },
    { value: "TikTok Accounts", label: "TikTok Accounts" },
    { value: "Snapchat Accounts", label: "Snapchat Accounts" },
    { value: "Facebook Accounts", label: "Facebook Accounts" },
    { value: "YouTube Accounts", label: "YouTube Accounts" },
    { value: "Other Accounts", label: "Other Accounts" },
  ];
  const FashionBeautyJobs = [
    { value: "Tailor", label: "Tailor" },
    { value: "Female Hairdresser", label: "Female Hairdresser" },
    { value: "Fashion Designer", label: "Fashion Designer" },
    { value: "Model", label: "Model" },
    { value: "Makeup Artist", label: "Makeup Artist" },
    { value: "Hair Stylist", label: "Hair Stylist" },
    { value: "Other Beauty Jobs", label: "Other Beauty Jobs" },
  ];
  const ITDesignJobs = [
    { value: "Other IT Jobs", label: "Other IT Jobs" },
    {
      value: "Network & Telecommunications Specialist",
      label: "Network & Telecommunications Specialist",
    },
    { value: "Content Writer", label: "Content Writer" },
    { value: "Programmer", label: "Programmer" },
    { value: "Media Designer", label: "Media Designer" },
  ];
  const SecuritySafetyJobs = [
    { value: "Security Guard", label: "Security Guard" },
    { value: "Safety Technician", label: "Safety Technician" },
  ];

  const AgricultureFarmingJobs = [
    { value: "Farm Worker", label: "Farm Worker" },
    { value: "Other Agricultural Jobs", label: "Other Agricultural Jobs" },
  ];
  const AdministrativeJobs = [
    { value: "Marketing & Sales", label: "Marketing & Sales" },
    { value: "Customer Service", label: "Customer Service" },
    { value: "Secretary", label: "Secretary" },
    { value: "Tourism & Hospitality", label: "Tourism & Hospitality" },
    { value: "Accountant", label: "Accountant" },
    { value: "Delivery Representative", label: "Delivery Representative" },
    { value: "Other Administrative Jobs", label: "Other Administrative Jobs" },
    { value: "Public Relations & Media", label: "Public Relations & Media" },
    { value: "Translator", label: "Translator" },
    { value: "Lawyer & Legal Jobs", label: "Lawyer & Legal Jobs" },
  ];
  const ChildrenClothingAccessories = [
    { value: "Baby Care Products", label: "Baby Care Products" },
    { value: "Children's Accessories", label: "Children's Accessories" },
    { value: "Toys for Kids", label: "Toys for Kids" },
    { value: "Children's Cribs & Chairs", label: "Children's Cribs & Chairs" },
    { value: "Children's Bags", label: "Children's Bags" },
    { value: "Strollers", label: "Strollers" },
    { value: "Car Seats for Kids", label: "Car Seats for Kids" },
    { value: "Girls' Clothing", label: "Girls' Clothing" },
    { value: "Boys' Clothing", label: "Boys' Clothing" },
  ];
  const WomenFashion = [
    {
      value: "Women's Accessories & Jewelry",
      label: "Women's Accessories & Jewelry",
    },
    {
      value: "Women's Blouses & T-Shirts",
      label: "Women's Blouses & T-Shirts",
    },
    { value: "Women's Skirts & Trousers", label: "Women's Skirts & Trousers" },
    { value: "Women's Jackets", label: "Women's Jackets" },
    { value: "Kaftans", label: "Kaftans" },
    { value: "Women's Bags", label: "Women's Bags" },
    { value: "Abayas", label: "Abayas" },
    { value: "Dresses", label: "Dresses" },
    { value: "Lingerie", label: "Lingerie" },
    { value: "Women's Sportswear", label: "Women's Sportswear" },
  ];
  const Watches = [
    { value: "Other Watches", label: "Other Watches" },
    { value: "Men's Watches", label: "Men's Watches" },
    { value: "Women's Watches", label: "Women's Watches" },
  ];

  const PerfumesIncense = [
    { value: "Other Perfumes", label: "Other Perfumes" },
    { value: "Men's Perfumes", label: "Men's Perfumes" },
    { value: "Women's Perfumes", label: "Women's Perfumes" },
    { value: "Oud & Incense", label: "Oud & Incense" },
  ];
  const IndustrialJobs = [
    { value: "Other Industrial Jobs", label: "Other Industrial Jobs" },
    { value: "Car Mechanic", label: "Car Mechanic" },
    { value: "Auto Electrician", label: "Auto Electrician" },
    { value: "Bodywork Technician", label: "Bodywork Technician" },
  ];
  const MedicalNursingJobs = [
    { value: "Pharmacist", label: "Pharmacist" },
    { value: "Doctor", label: "Doctor" },
    {
      value: "Physical Therapy Technician",
      label: "Physical Therapy Technician",
    },
    { value: "Massage Therapist", label: "Massage Therapist" },
    { value: "Nurse", label: "Nurse" },
    { value: "Other Medical Jobs", label: "Other Medical Jobs" },
  ];
  const SpecialNumber = [
    { value: "STC", label: "STC" },
    { value: "Mobily", label: "Mobily" },
    { value: "Zain", label: "Zain" },
  ];
  const Goats = [
    { value: "Local Goats", label: "Local Goats" },
    { value: "Hure Sheep", label: "Hure Sheep" },
    { value: "Romanian Sheep", label: "Romanian Sheep" },
    { value: "Sawakni Sheep", label: "Sawakni Sheep" },
    { value: "Najdi Sheep", label: "Najdi Sheep" },
    { value: "Naemi Sheep", label: "Naemi Sheep" },
    { value: "Rafidi Sheep", label: "Rafidi Sheep" },
    { value: "Sheep Supplies", label: "Sheep Supplies" },
    { value: "Sheep Products", label: "Sheep Products" },
  ];
  const Parrot = [
    { value: "Amazoni Parrot", label: "Amazoni Parrot" },
    { value: "Congo African Grey Parrot", label: "Congo African Grey Parrot" },
    { value: "Cockatoo Parrot", label: "Cockatoo Parrot" },
    { value: "Macaw Parrot", label: "Macaw Parrot" },
    { value: "Pet Birds", label: "Pet Birds" },
    { value: "Bird Supplies", label: "Bird Supplies" },
  ];
  const DovePigeon = [
    { value: "Pakistani Pigeon", label: "Pakistani Pigeon" },
    { value: "Turkish Pigeon", label: "Turkish Pigeon" },
    { value: "Homers (Pigeons)", label: "Homers (Pigeons)" },
    { value: "Sudanese Pigeon", label: "Sudanese Pigeon" },
    { value: "Shami Pigeon", label: "Shami Pigeon" },
    { value: "Sanaani Pigeon", label: "Sanaani Pigeon" },
    { value: "French Pigeon", label: "French Pigeon" },
    { value: "Egyptian Pigeon", label: "Egyptian Pigeon" },
    { value: "Dutch Pigeon", label: "Dutch Pigeon" },
    { value: "Qatifi Pigeon", label: "Qatifi Pigeon" },
  ];
  const Cats = [
    { value: "Scottish Cats", label: "Scottish Cats" },
    { value: "Persian Cats", label: "Persian Cats" },
    { value: "Cats for Adoption", label: "Cats for Adoption" },
    { value: "Himalayan Cats", label: "Himalayan Cats" },
    { value: "Cat Supplies", label: "Cat Supplies" },
  ];
  const Chickens = [
    { value: "Brahma Chickens", label: "Brahma Chickens" },
    { value: "Local Chickens", label: "Local Chickens" },
    { value: "Turkish Chickens", label: "Turkish Chickens" },
    { value: "Persian Chickens", label: "Persian Chickens" },
    { value: "French Chickens", label: "French Chickens" },

    { value: "Fayoumi Chickens", label: "Fayoumi Chickens" },
    { value: "Pakistani Chickens", label: "Pakistani Chickens" },
    { value: "Poultry Supplies", label: "Poultry Supplies" },
  ];
  const Camels = [
    { value: "Bakar Camels", label: "Bakar Camels" },
    { value: "Stud Camels", label: "Stud Camels" },
    { value: "Camel Stallions", label: "Camel Stallions" },
    { value: "Female Camels", label: "Female Camels" },
    { value: "Camel Supplies", label: "Camel Supplies" },
  ];
  const Horses = [
    { value: "Popular Horses", label: "Popular Horses" },
    { value: "Mixed Horses", label: "Mixed Horses" },
    { value: "Wahho Horses", label: "Wahho Horses" },
    { value: "English Horses", label: "English Horses" },
    { value: "Horse Supplies", label: "Horse Supplies" },
  ];
  const Cows = [
    { value: "German Cows", label: "German Cows" },
    { value: "Local Cows", label: "Local Cows" },
    { value: "Jersey Cows", label: "Jersey Cows" },
    { value: "Swiss Cows", label: "Swiss Cows" },
    { value: "Dutch Cows", label: "Dutch Cows" },
    { value: "Dairy Products", label: "Dairy Products" },
  ];
  const Squirrels = [
    { value: "Turtles", label: "Turtles" },
    { value: "Sharshari Ducks", label: "Sharshari Ducks" },
  ];
  const Hamsters = [{ value: "Geese", label: "Geese" }];
  const Ducks = [
    { value: "Bikini Ducks", label: "Bikini Ducks" },
    { value: "Sharshari Ducks", label: "Sharshari Ducks" },
    { value: "Geese", label: "Geese" },
    { value: "Fish", label: "Fish" },
    { value: "Bikini Ducks", label: "Bikini Ducks" },
  ];
  const Dogs = [
    { value: "Pitbull Dogs", label: "Pitbull Dogs" },
    { value: "Pomeranian Dogs", label: "Pomeranian Dogs" },
    { value: "Golden Retriever Dogs", label: "Golden Retriever Dogs" },
    { value: "German Shepherd Dogs", label: "German Shepherd Dogs" },
    { value: "Shih Tzu Dog", label: "Shih Tzu Dog" },
    { value: "Chihuahua Dog", label: "Chihuahua Dog" },
    { value: "Maltese Dog", label: "Maltese Dog" },
    { value: "Husky Dog", label: "Husky Dog" },
    { value: "Dog Supplies", label: "Dog Supplies" },
  ];
  const Sheep = [
    { value: "Barbary Sheep", label: "Barbary Sheep" },
    { value: "Hure Sheep", label: "Hure Sheep" },
    { value: "Romanian Sheep", label: "Romanian Sheep" },
    { value: "Sawakni Sheep", label: "Sawakni Sheep" },
    { value: "Najdi Sheep", label: "Najdi Sheep" },
    { value: "Naemi Sheep", label: "Naemi Sheep" },
    { value: "Rafidi Sheep", label: "Rafidi Sheep" },
    { value: "Sheep Supplies", label: "Sheep Supplies" },
    { value: "Sheep Products", label: "Sheep Products" },
  ];
  const RestaurantJobs = [
    { value: "Chef & Cook Instructor", label: "Chef & Cook Instructor" },
    { value: "Waiter & Host", label: "Waiter & Host" },
    { value: "Other Restaurant Jobs", label: "Other Restaurant Jobs" },
  ];
  const HousekeepingJobs = [
    { value: "Private Driver", label: "Private Driver" },
    { value: "Household Worker", label: "Household Worker" },
    { value: "Domestic Worker", label: "Domestic Worker" },
    { value: "Other Labor Jobs", label: "Other Labor Jobs" },
  ];
  const ArchitectureConstructionJobs = [
    { value: "Building Painter", label: "Building Painter" },
    { value: "AC Technician", label: "AC Technician" },
    { value: "Decorator", label: "Decorator" },
    { value: "Building Electrician", label: "Building Electrician" },
    { value: "Tiler", label: "Tiler" },
    { value: "Building Supervisor", label: "Building Supervisor" },
    { value: "Building Contractor", label: "Building Contractor" },
    { value: "Plasterer", label: "Plasterer" },
    { value: "Carpenter", label: "Carpenter" },
    { value: "Other Construction Jobs", label: "Other Construction Jobs" },
  ];
  const Cameras = [
    { value: "Lenses", label: "Lenses" },
    { value: "Drone", label: "Drone" },
    { value: "Camera Accessories", label: "Camera Accessories" },
  ];
  const SportsEquipment = [
    { value: "Eyeglasses", label: "Eyeglasses" },
    { value: "Other Eyeglasses", label: "Other Eyeglasses" },
    { value: "Men's Eyeglasses", label: "Men's Eyeglasses" },
    {
      value: "HeadsWomen's Eyeglassesets",
      label: "HeadsWomen's Eyeglassesets",
    },
    { value: "Sports Equipment", label: "Sports Equipment" },
  ];
  const HomeKitchenAppliance = [
    { value: "Stoves & Ovens", label: "Stoves & Ovens" },
    { value: "Refrigerators & Coolers", label: "Refrigerators & Coolers" },
    { value: "Mixers & Blenders", label: "Mixers & Blenders" },
    { value: "Washing Machines", label: "Washing Machines" },
    { value: "Kettles", label: "Kettles" },
    { value: "Fryers", label: "Fryers" },
    { value: "Coffee Machines", label: "Coffee Machines" },
    { value: "Microwaves & Toasters", label: "Microwaves & Toasters" },
    { value: "Vacuum Cleaners", label: "Vacuum Cleaners" },
    { value: "Clothing Irons", label: "Clothing Irons" },
    { value: "Air Conditioners", label: "Air Conditioners" },
  ];
  const MenFashion = [
    { value: "Men's Shemaghs", label: "Men's Shemaghs" },
    { value: "Men's Accessories", label: "Men's Accessories" },
    { value: "Men's Clothing", label: "Men's Clothing" },
    { value: "Men's Jackets", label: "Men's Jackets" },
    { value: "Men's Bags", label: "Men's Bags" },
    { value: "Men's Shirts & Trousers", label: "Men's Shirts & Trousers" },
    { value: "Men's Sportswear", label: "Men's Sportswear" },
  ];
  const SpareParts = [
    { value: "others", label: "Others" },
    { value: "batteries", label: "Batteries" },
    { value: "spareparts", label: "Spare Parts" },
    { value: "mechanicalparts", label: "Mechanical Parts" },
    { value: "bodyparts", label: "Body Parts" },
  ];
  const VideoGames = [
    { value: "VR Glasses", label: "VR Glasses" },
    { value: "PlayStation (PS) Devices", label: "PlayStation (PS) Devices" },
    { value: "PlayStation (PS) Games", label: "PlayStation (PS) Games" },
    { value: "Xbox Devices", label: "Xbox Devices" },
    { value: "Xbox Games", label: "Xbox Games" },
    { value: "Nintendo", label: "Nintendo" },
  ];
  const BoatsJetSki = [
    { value: "Others", label: "Others" },
    { value: "Jet-ski", label: "Jet-ski" },
    { value: "Motorboats", label: "Motorboats" },
  ];
  const TabletDevices = [
    { value: "iPad", label: "iPad" },
    { value: "Galaxy Tab", label: "Galaxy Tab" },
  ];
  const MobilePhones = [
    { value: "Smart Watches", label: "Smart Watches" },
    { value: "Headsets", label: "Headsets" },
    { value: "Chargers & Cables", label: "Chargers & Cables" },
    { value: "Covers & Protectors", label: "Covers & Protectors" },
  ];
  const TrucksHeavyMachinery = [
    { value: "Heavy Equipmen", label: "Heavy Equipmen" },
    { value: "Excavator", label: "Excavator" },
    { value: "Crusher", label: "Crusher" },
    { value: "Bulldozer", label: "Bulldozer" },
    { value: "Crane", label: "Crane" },
    { value: "Recovery", label: "Recovery" },
    { value: "Wheel Loader", label: "Wheel Loader" },
    { value: "Dump Truck", label: "Dump Truck" },
    { value: "Trucks", label: "Trucks" },
    { value: "Crane", label: "Crane" },

    { value: "Agricultural Equipment", label: "Agricultural Equipment" },
  ];

  // Function to flatten categories and subcategories
  const flattenOptions = (categories) => {
    const options = [];

    const recurse = (subcategories) => {
      subcategories.forEach((subcategory) => {
        options.push({ value: subcategory.name, label: subcategory.name });
        if (subcategory.subcategories && subcategory.subcategories.length > 0) {
          recurse(subcategory.subcategories);
        }
      });
    };

    categories.forEach((category) => {
      recurse(category.subcategories);
    });

    return options;
  };

  // const optionsSubCategory = flattenOptions(categoriesData.categories);
  useEffect(() => {
    console.log("Updated Form Data:", formData);
  }, [formData]);

  useEffect(() => {
    if (formData.FeaturedAds === "Featured Ads") {
      setshowPayment(true); // Show payment section if the selected feature is "accept-credit-card"
    } else {
      setshowPayment(false); // Hide payment section for other features
      console.log("Updated Feature:", formData.selectedFeature); // Log other selected features
    }
  }, [formData.FeaturedAds]);

  useEffect(() => {
    console.log("Updated Category:", formData.category);
    setCategory1(formData.category);
  }, [formData.category]);

  useEffect(() => {
    // Update iframe URL whenever the latitude or longitude changes
    if (formData.latitude && formData.longitude) {
      setMapUrl(
        `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.6461688381!2d${formData.longitude}!3d${formData.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9a862f9831459%3A0xafcb9384c02e8b75!2s8697%20Stirling%20Rd%2C%20Cooper%20City%2C%20FL%2033328%2C%20USA`
      );
    }
  }, [formData.latitude, formData.longitude]);

  const [mapUrl, setMapUrl] = useState(
    `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.6461688381!2d${formData.longitude}!3d${formData.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9a862f9831459%3A0xafcb9384c02e8b75!2s8697%20Stirling%20Rd%2C%20Cooper%20City%2C%20FL%2033328%2C%20USA`
  );

  const geocodeAddress = (address) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const location = results[0].geometry.location;
        setFormData({
          ...formData,
          latitude: location.lat(),
          longitude: location.lng(),
        });
      } else {
        console.error("Geocode failed due to: " + status);
      }
    });
  };

  const handleAddressSelect = (e) => {
    const address = e.target.value;
    setFormData({
      ...formData,
      mapAddress: address,
    });
    geocodeAddress(address);
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  //   const collectionName1 =
  // callingFrom === "AutomotiveComp"
  //   ? "Cars"
  //   : callingFrom === "ElectronicComp"
  //   ? "ELECTRONICS"
  //   : callingFrom === "FashionStyle"
  //   ? "FASHION"
  //   : callingFrom === "HealthCareComp"
  //   ? "HEALTHCARE"
  //   : callingFrom === "JobBoard"
  //   ? "JOBBOARD"
  //   : callingFrom === "Education"
  //   ? "Education"
  //   : callingFrom === "RealEstateComp"
  //   ? "REALESTATECOMP"
  //   : callingFrom === "TravelComp"
  //   ? "TRAVEL"
  //   : callingFrom === "SportGamesComp"
  //   ? "SPORTSGAMESComp"
  //   : callingFrom === "PetAnimalsComp"
  //   ? "PETANIMALCOMP"
  //   : "books";
  return (
    <>
      <div className="main-wrapper">
        <Header />

        <div
          className="dashboard-content"
          style={{
            marginTop: "5rem",
          }}
        >
          <div className="container">
            <div className="mt-1">
              <ul className="dashborad-menus">
                <li>
                  <Link to="/dashboard">
                    <i className="feather-grid" /> <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/profile">
                    <i className="fa-solid fa-user" /> <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to="/my-listing">
                    <i className="feather-list" /> <span>My Listing</span>
                  </Link>
                </li>
                <li>
                  <Link to="/bookmarks">
                    <i className="fas fa-solid fa-heart" />{" "}
                    <span>Favourite</span>
                  </Link>
                </li>
                <li>
                  <Link to="/messages">
                    <i className="fa-solid fa-comment-dots" />{" "}
                    <span>Messages</span>
                  </Link>
                </li>
                {/* <li>
                  <Link to="/reviews">
                    <i className="fas fa-solid fa-star" /> <span>Reviews</span>
                  </Link>
                </li> */}
                <li>
                  <Link to="/login">
                    <i className="fas fa-light fa-circle-arrow-left" />{" "}
                    <span>Logout</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="profile-content">
              <div className="messages-form">
                <div className="card gap-2">
                  <div
                    className="card-header"
                    style={{
                      boxShadow: "3px 5px 13px rgba(222, 226, 231, 0.44)",
                      padding: "20px 0 0 20px",
                    }}
                  >
                    <h4>Basic information</h4>
                  </div>
                  <div
                    className="card media-section"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      margin: "0",
                      padding: "0",
                      padding: "20px 0",
                    }}
                  >
                    <div
                      className="card-header"
                      style={{
                        textAlign: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <h4 style={{ margin: "0" }}>Media Information</h4>
                    </div>

                    <div
                      className="gallery-media"
                      style={{ width: "100%", textAlign: "center" }}
                    >
                      {/* <h6
                      className="media-title"
                      style={{ marginBottom: "10px" }}
                    >
                      Gallery
                    </h6> */}

                      <div
                        className="galleryimg-upload"
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          gap: "10px",
                        }}
                      >
                        {galleryImages.length > 0 ? (
                          galleryImages.map((image, index) => (
                            <div
                              key={index}
                              className="gallery-upload"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <img
                                src={image}
                                className="img-fluid"
                                alt={`Gallery image ${index + 1}`}
                                style={{
                                  maxWidth: "200px",
                                  maxHeight: "200px",
                                  borderRadius: "8px",
                                }}
                              />
                              <Link
                                to="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDeleteImage(index);
                                }}
                                className="profile-img-del"
                                style={{
                                  marginTop: "5px",
                                  textDecoration: "none",
                                  color: "white",
                                  fontWeight: "bold",
                                }}
                              >
                                <i className="feather-trash-2" />
                              </Link>
                            </div>
                          ))
                        ) : (
                          <p
                            style={{
                              margin: "10px 0",
                              fontSize: "14px",
                              color: "#555",
                              marginTop: "-2rem",
                            }}
                          >
                            No images selected
                          </p>
                        )}
                      </div>
                    </div>

                    <div
                      className="settings-upload-btn"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "-1rem",

                        marginTop: "10px",
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        className="hide-input image-upload"
                        id="file2"
                        multiple
                        onChange={handleGalleryChange}
                        style={{ display: "none" }}
                      />
                      <label
                        htmlFor="file2"
                        className="file-upload"
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "#2d4495",
                          color: "#fff",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontSize: "14px",
                          textAlign: "center",
                          marginTop: "-2rem",
                        }}
                      >
                        {uploading ? "Uploading..." : "Upload Files"}
                      </label>
                    </div>
                  </div>
                  <div className="  ">
                    <div className="mt-2 d-flex flex-column gap-2">
                      <div
                        className="d-flex justify-content-between"
                        style={{
                          width: "100vw",
                          maxWidth: "100%",
                        }}
                      >
                        <div
                          className="d-flex flex-column flex-md-row justify-content-between gap-2"
                          style={{ width: "100%" }}
                        >
                          <div className="card w-100 w-md-50">
                            <div className="card-header">
                              <h4>Select City</h4>
                            </div>
                            <div className="card-body">
                              <WindowedSelect
                                options={CityOptions}
                                value={
                                  CityOptions.find(
                                    (option) => option.value === formData.City
                                  ) || null
                                }
                                onChange={(selectedOption) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    City: selectedOption
                                      ? selectedOption.value
                                      : "",
                                  }))
                                }
                                placeholder="Select a City"
                                isClearable
                                className="w-100"
                                windowThreshold={100} // Render only 100 options at a time
                              />
                            </div>
                          </div>

                          <div className="card w-100 w-md-50">
                            <div className="card-header">
                              <h4>Select District</h4>
                            </div>
                            <div className="card-body">
                              <Select
                                options={districtOptions}
                                value={
                                  districtOptions.find(
                                    (option) =>
                                      option.value === formData.District
                                  ) || null
                                }
                                onChange={(selectedOption) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    District: selectedOption
                                      ? selectedOption.value
                                      : "",
                                  }))
                                }
                                placeholder="Select a district"
                                isClearable
                                className="w-100"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <div className="form-group mx-4"> */}
                      <div
                        className="form-group"
                        style={{
                          padding: "30px",
                          boxShadow: "3px 5px 13px rgba(222, 226, 231, 0.44)",
                        }}
                      >
                        <label className="col-form-label">
                          Listing Title <span>*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          className="form-control pass-input input-margin" // Add the new class here
                          placeholder="Title"
                          value={formData.title}
                          onChange={handleChange}
                        />
                      </div>
                      <div
                        className="d-flex justify-content-between"
                        style={{
                          marginTop: "1rem",
                          width: "100vw",
                          maxWidth: "100%",
                        }}
                      >
                        <div
                          className="d-flex flex-column flex-md-row justify-content-between gap-2"
                          style={{ width: "100%", marginTop: "-1rem" }}
                        >
                          <div className="card w-100 w-md-50">
                            <div className="form-group">
                              <label className="col-form-label label-heading">
                                Category
                              </label>
                              <div className="row category-listing">
                                <Select
                                  options={categoryOptions}
                                  value={categoryOptions.find(
                                    (option) =>
                                      option.value === formData.category
                                  )}
                                  onChange={handleCategoryChange}
                                  className="basic-single"
                                  classNamePrefix="select"
                                  placeholder="Select Category"
                                />
                              </div>
                              {error && <p style={{ color: "red" }}>{error}</p>}
                            </div>
                          </div>

                          <div className="card w-100 w-md-50">
                            <div className="form-group">
                              <label className="col-form-label label-heading">
                                Select SubCategory
                              </label>
                              <div className="row category-listing">
                                <Select
                                  options={subcategories}
                                  value={subcategories.find(
                                    (option) =>
                                      option.value === formData.SubCategory
                                  )}
                                  onChange={handleSubcategoryChange}
                                  className="basic-single"
                                  classNamePrefix="select"
                                  placeholder="Select Subcategory"
                                />
                              </div>
                            </div>
                          </div>

                          {Category.SubCategory === "Spare Parts" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={SpareParts}
                                    value={SpareParts.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory ===
                          "Trucks & Heavy Machinery" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={TrucksHeavyMachinery}
                                    value={TrucksHeavyMachinery.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Boats & Jet Ski" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={BoatsJetSki}
                                    value={BoatsJetSki.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Mobile Phones" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={MobilePhones}
                                    value={MobilePhones.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Tablet Devices" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={TabletDevices}
                                    value={TabletDevices.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Video Games" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={VideoGames}
                                    value={VideoGames.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          {Category.SubCategory ===
                          "Accounts & Subscriptions" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={AccountsSubscriptions}
                                    value={AccountsSubscriptions.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          {Category.SubCategory === "Special Number" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={SpecialNumber}
                                    value={SpecialNumber.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          {Category.SubCategory ===
                          "Home & Kitchen Appliance" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={HomeKitchenAppliance}
                                    value={HomeKitchenAppliance.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Watches" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={Watches}
                                    value={Watches.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Perfumes & Incense" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={PerfumesIncense}
                                    value={PerfumesIncense.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          {Category.SubCategory === "Cameras" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={Cameras}
                                    value={Cameras.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Sports Equipment" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={SportsEquipment}
                                    value={SportsEquipment.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Men's Fashion" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={MenFashion}
                                    value={MenFashion.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Women's Fashion" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={WomenFashion}
                                    value={WomenFashion.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory ===
                          "Children's Clothing & Accessories" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={ChildrenClothingAccessories}
                                    value={ChildrenClothingAccessories.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Health & Beauty" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={HealthBeauty}
                                    value={HealthBeauty.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Administrative Jobs" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={AdministrativeJobs}
                                    value={AdministrativeJobs.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Fashion & Beauty Jobs" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={FashionBeautyJobs}
                                    value={FashionBeautyJobs.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Security & Safety Jobs" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={SecuritySafetyJobs}
                                    value={SecuritySafetyJobs.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "IT & Design Jobs" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={ITDesignJobs}
                                    value={ITDesignJobs.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory ===
                          "Agriculture & Farming Jobs" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={AgricultureFarmingJobs}
                                    value={AgricultureFarmingJobs.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Industrial Jobs" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={IndustrialJobs}
                                    value={IndustrialJobs.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          {Category.SubCategory === "Medical & Nursing Jobs" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={MedicalNursingJobs}
                                    value={MedicalNursingJobs.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory ===
                          "Architecture & Construction Jobs" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={ArchitectureConstructionJobs}
                                    value={ArchitectureConstructionJobs.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Housekeeping Jobs" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={HousekeepingJobs}
                                    value={HousekeepingJobs.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Restaurant Jobs" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={RestaurantJobs}
                                    value={RestaurantJobs.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Sheep" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={Sheep}
                                    value={Sheep.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Goats" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={Goats}
                                    value={Goats.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Parrot" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={Parrot}
                                    value={Parrot.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Dove/Pigeon" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={DovePigeon}
                                    value={DovePigeon.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Cats" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={Cats}
                                    value={Cats.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Chickens" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={Chickens}
                                    value={Chickens.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Camels" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={Camels}
                                    value={Camels.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Horses" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={Horses}
                                    value={Horses.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          {Category.SubCategory === "Dogs" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={Dogs}
                                    value={Dogs.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          {Category.SubCategory === "Cows" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={Cows}
                                    value={Cows.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Hamsters" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={Hamsters}
                                    value={Hamsters.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Squirrels" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={Squirrels}
                                    value={Squirrels.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {Category.SubCategory === "Ducks" ? (
                            <div className="card w-100 w-md-50">
                              <div className="form-group">
                                <label className="col-form-label label-heading">
                                  Select Nested SubCategory
                                </label>
                                <div className="row category-listing">
                                  <Select
                                    options={Ducks}
                                    value={Ducks.find(
                                      (option) =>
                                        option.value ===
                                        formData.NestedSubCategory
                                    )}
                                    onChange={SparePartsChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select Subcategory"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      {[
                        "Mobile Phones",
                        "Tablet Devices",
                        "Computers & Laptops",
                        "Video Games",
                        "Television & Audio System",
                        "Accounts & Subscriptions",
                        "Special Number",
                        "Home & Kitchen Appliance",
                        "Motors & Generators",
                        "Cameras",
                        "Networking Devices",
                        "Screens & Projectors",
                        "Printer & Scanner",
                        "Computer Accessories",
                      ].some(
                        (item) =>
                          item === Category.SubCategory ||
                          item === DataCatorgySHow
                      ) ? (
                        <>
                          <div className="card">
                            <div className="card-header">
                              <h4>Add Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Sell", label: "Sell" },
                                    { name: "Rent", label: "Rent" },
                                    { name: "Wanted", label: "Wanted" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Purpose === area.name
                                          }
                                          onChange={handlePurposeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Condition</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "New",
                                      label: "New",
                                    },
                                    {
                                      name: "Used",
                                      label: "Used",
                                    },
                                    { name: "Manual", label: "Manual" },
                                  ].map((feature) => (
                                    <li key={feature.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={feature.name}
                                          checked={
                                            formData.Condition === feature.name
                                          }
                                          onChange={handleCondition} // ✅ Fixed function name
                                        />
                                        <span className="checkmark" />{" "}
                                        {feature.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Brand </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Dell", label: "Dell" },
                                    { name: "HP", label: "HP" },
                                    { name: "Apple", label: "Apple" },
                                    { name: "Lenovo", label: "Lenovo" },
                                    { name: "ASUS", label: "ASUS" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={formData.Brand === area.name}
                                          onChange={handleBrandChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                        </>
                      ) : [
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
                          "Vehicle Services",
                          "Cars",
                        ].some(
                          (item) =>
                            item === Category.SubCategory ||
                            item === DataCatorgySHow
                        ) ? (
                        <>
                          <div className="card gap-2">
                            <div className="card-header">
                              <h4>Basic Information</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group">
                                <label className="col-form-label">
                                  KM Driven
                                </label>
                                <input
                                  type="text"
                                  name="kmDriven"
                                  className="form-control pass-input"
                                  placeholder="Enter kilometers driven"
                                  value={formData.kmDriven}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="card">
                                <div className="card-header">
                                  <h4>Transmission</h4>
                                </div>
                                <div className="card-body">
                                  <div className="form-group featuresform-list mb-0">
                                    <ul>
                                      {[
                                        {
                                          name: "Automatic",
                                          label: "Automatic",
                                        },
                                        { name: "Manual", label: "Manual" },
                                      ].map((feature) => (
                                        <li key={feature.name}>
                                          <label className="custom_check">
                                            <input
                                              type="checkbox"
                                              name={feature.name}
                                              checked={
                                                formData.Transmission ===
                                                feature.name
                                              }
                                              onChange={
                                                handleTransmissionChange
                                              } // ✅ Fixed function name
                                            />
                                            <span className="checkmark" />{" "}
                                            {feature.label}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                    <div className="clearfix" />
                                  </div>
                                </div>
                              </div>
                              <div className="card">
                                <div className="card-header">
                                  <h4>Condition</h4>
                                </div>
                                <div className="card-body">
                                  <div className="form-group featuresform-list mb-0">
                                    <ul>
                                      {[
                                        {
                                          name: "New",
                                          label: "New",
                                        },
                                        {
                                          name: "Used",
                                          label: "Used",
                                        },
                                        { name: "Manual", label: "Manual" },
                                      ].map((feature) => (
                                        <li key={feature.name}>
                                          <label className="custom_check">
                                            <input
                                              type="checkbox"
                                              name={feature.name}
                                              checked={
                                                formData.Condition ===
                                                feature.name
                                              }
                                              onChange={handleCondition} // ✅ Fixed function name
                                            />
                                            <span className="checkmark" />{" "}
                                            {feature.label}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                    <div className="clearfix" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="form-group">
                                {" "}
                                <div className="card-header">
                                  <h4>Make</h4>
                                </div>
                                <input
                                  className="form-control pass-input"
                                  type="text"
                                  // className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                  <div className="card-header">
                                    <h4>Model</h4>
                                  </div>
                                  {/* <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label> */}
                                  <select
                                    className="form-control pass-input"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="form-control pass-input"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Chevrolet" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Nissan" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Hyundai" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}

                              {selected === "Genesis" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Lexus" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "GMC" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Mercedes" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Honda" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "BMW" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Motorcycles" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Brand
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Kia" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Dodge" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Chrysler" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Jeep" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Mitsubishi" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Mazda" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Porsche" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        Model: e.target.value,
                                      }))
                                    }
                                  >
                                    <option value="">
                                      Select Porsche Model
                                    </option>
                                    {porscheModels.map((model) => (
                                      <option key={model} value={model}>
                                        {model}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                              {selected === "Audi" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Suzuki" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        Model: e.target.value,
                                      }))
                                    }
                                  >
                                    <option value="">
                                      Select Suzuki Model
                                    </option>
                                    {suzukiModels.map((model) => (
                                      <option key={model} value={model}>
                                        {model}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                              {selected === "Infiniti" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                                  </select>
                                </div>
                              )}
                              {selected === "Hummer" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Lincoln" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        Model: e.target.value,
                                      }))
                                    }
                                  >
                                    <option value="">
                                      Select Lincoln Model
                                    </option>
                                    {lincolnModels.map((model) => (
                                      <option key={model} value={model}>
                                        {model}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                              {selected === "Volkswagen" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Daihatsu" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Geely" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Mercury" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        Model: e.target.value,
                                      }))
                                    }
                                  >
                                    <option value="">
                                      Select Mercury Model
                                    </option>
                                    {mercuryModels.map((model) => (
                                      <option key={model} value={model}>
                                        {model}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                              {selected === "Volvo" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Peugeot" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        Model: e.target.value,
                                      }))
                                    }
                                  >
                                    <option value="">
                                      Select Peugeot Model
                                    </option>
                                    {peugeotModels.map((model) => (
                                      <option key={model} value={model}>
                                        {model}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                              {selected === "Bentley" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        Model: e.target.value,
                                      }))
                                    }
                                  >
                                    <option value="">
                                      Select Bentley Model
                                    </option>
                                    {bentleyModels.map((model) => (
                                      <option key={model} value={model}>
                                        {model}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                              {selected === "Jaguar" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        Model: e.target.value,
                                      }))
                                    }
                                  >
                                    <option value="">
                                      Select Jaguar Model
                                    </option>
                                    {jaguarModels.map((model) => (
                                      <option key={model} value={model}>
                                        {model}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                              {selected === "Subaru" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        Model: e.target.value,
                                      }))
                                    }
                                  >
                                    <option value="">
                                      Select Subaru Model
                                    </option>
                                    {subaruModels.map((model) => (
                                      <option key={model} value={model}>
                                        {model}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                              {selected === "MG" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Changan" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        Model: e.target.value,
                                      }))
                                    }
                                  >
                                    <option value="">
                                      Select Changan Model
                                    </option>
                                    {changanModels.map((model) => (
                                      <option key={model} value={model}>
                                        {model}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                              {selected === "Renault" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        Model: e.target.value,
                                      }))
                                    }
                                  >
                                    <option value="">
                                      Select Renault Model
                                    </option>
                                    {renaultModels.map((model) => (
                                      <option key={model} value={model}>
                                        {model}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                              {selected === "Buick" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Rolls-Royce" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Lamborghini" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Opel" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Skoda" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Ferrari" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        Model: e.target.value,
                                      }))
                                    }
                                  >
                                    <option value="">
                                      Select Ferrari Model
                                    </option>
                                    {ferrariModels.map((model) => (
                                      <option key={model} value={model}>
                                        {model}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                              {selected === "Citroen" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        Model: e.target.value,
                                      }))
                                    }
                                  >
                                    <option value="">
                                      Select Citroen Model
                                    </option>
                                    {citroenModels.map((model) => (
                                      <option key={model} value={model}>
                                        {model}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                              {selected === "Chery" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}

                              {selected === "Daewoo" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        Model: e.target.value,
                                      }))
                                    }
                                  >
                                    <option value="">
                                      Select Daewoo Model
                                    </option>
                                    {daewooModels.map((model) => (
                                      <option key={model} value={model}>
                                        {model}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                              {selected === "SABB" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "SsangYong" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Aston Martin" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Proton" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        Model: e.target.value,
                                      }))
                                    }
                                  >
                                    <option value="">
                                      Select Proton Model
                                    </option>
                                    {protonModels.map((model) => (
                                      <option key={model} value={model}>
                                        {model}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                              {selected === "Haval" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "GAC" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Great Wall" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "FAW" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "BYD" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Alfa Romeo" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "TATA" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "JETOUR" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        Model: e.target.value,
                                      }))
                                    }
                                  >
                                    <option value="">
                                      Select JETOUR Model
                                    </option>
                                    {jetourModels.map((model) => (
                                      <option key={model} value={model}>
                                        {model}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                              {selected === "CMC" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "VICTORY AUTO" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "MAXUS" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "BAIC" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "DONGFENG" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "EXEED" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Tank" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Lynk & Co" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "Lucid" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                              {selected === "INEOS" && (
                                <div className="mt-4">
                                  <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Model
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                      setFormData((prev) => ({
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
                              )}
                            </div>
                            <div className="card-body">
                              <div className="form-group">
                                <label className="col-form-label">
                                  Mileage
                                </label>
                                <input
                                  type="text"
                                  name="mileage"
                                  className="form-control pass-input"
                                  placeholder="Enter mileage"
                                  value={formData.mileage}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>

                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Emirates </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Downtown Dubai",
                                      label: "Downtown Dubai",
                                    },
                                    {
                                      name: "Dubai Marina",
                                      label: "Dubai Marina",
                                    },
                                    { name: "Jumeirah", label: "Jumeirah" },
                                    { name: "Deira", label: "Deira" },
                                    {
                                      name: "Business Bay",
                                      label: "Business Bay",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Emirates === area.name
                                          }
                                          onChange={handleEmiratesChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}

                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Registered In </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Downtown Dubai",
                                      label: "Downtown Dubai",
                                    },
                                    {
                                      name: "Dubai Marina",
                                      label: "Dubai Marina",
                                    },
                                    { name: "Jumeirah", label: "Jumeirah" },
                                    { name: "Deira", label: "Deira" },
                                    {
                                      name: "Business Bay",
                                      label: "Business Bay",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Registeredin === area.name
                                          }
                                          onChange={handleRegisteredinChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Trusted Cars </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Toyota", label: "Toyota" },
                                    {
                                      name: "Mercedes-Benz",
                                      label: "Mercedes-Benz",
                                    },
                                    { name: "Nissan", label: "Nissan" },
                                    { name: "BMW", label: "BMW" },
                                    {
                                      name: "Lamborghini",
                                      label: "Lamborghini",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.TrustedCars === area.name
                                          }
                                          onChange={handleTrustedCarsChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                          <div className="card">
                            <div className="card-header">
                              <h4>Regional Specs</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "GCC", label: "GCC Specs" },
                                    {
                                      name: "American",
                                      label: "American Specs",
                                    },
                                    {
                                      name: "Japanese",
                                      label: "Japanese Specs",
                                    },
                                    {
                                      name: "European",
                                      label: "European Specs",
                                    },
                                    {
                                      name: "Canadian",
                                      label: "Canadian Specs",
                                    },
                                  ].map((spec) => (
                                    <li key={spec.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={spec.name}
                                          checked={
                                            formData.RegionalSpec === spec.name
                                          }
                                          onChange={handleRegionalSpecChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {spec.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Fuel type</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    // Added fuel types below
                                    { name: "petrol", label: "Petrol" },
                                    { name: "diesel", label: "Diesel" },
                                    { name: "electric", label: "Electric" },
                                    { name: "hybrid", label: "Hybrid" },
                                    { name: "lpg", label: "LPG" },
                                    { name: "cng", label: "CNG" },
                                  ].map((spec) => (
                                    <li key={spec.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={spec.name}
                                          checked={
                                            formData.Fueltype === spec.name
                                          }
                                          onChange={handleFueltype}
                                        />
                                        <span className="checkmark" />{" "}
                                        {spec.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Insurance</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Comprehensive",
                                      label: "Comprehensive Insurance",
                                    },
                                    {
                                      name: "ThirdParty",
                                      label: "Third-Party Insurance",
                                    },
                                    {
                                      name: "No Insurance",
                                      label: "No Insurance",
                                    },
                                  ].map((insurance) => (
                                    <li key={insurance.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={insurance.name}
                                          checked={
                                            formData.Insurance ===
                                            insurance.name
                                          }
                                          onChange={handleInsuranceChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {insurance.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>

                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Color </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "White", label: "White" },
                                    { name: "Black", label: "Black" },
                                    { name: "Grey", label: "Grey" },
                                    { name: "Red", label: "Red" },
                                    { name: "Yellow", label: "Yellow" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={formData.Color === area.name}
                                          onChange={handleColorChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                          <div className="card">
                            <div className="card-header">
                              <h4>Interior Color </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "White", label: "White" },
                                    { name: "Black", label: "Black" },
                                    { name: "Grey", label: "Grey" },
                                    { name: "Red", label: "Red" },
                                    { name: "Yellow", label: "Yellow" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.InteriorColor === area.name
                                          }
                                          onChange={handleInteriorColor}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Add Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Sell", label: "Sell" },
                                    { name: "Rent", label: "Rent" },
                                    { name: "Wanted", label: "Wanted" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Purpose === area.name
                                          }
                                          onChange={handlePurposeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Exterior Color: </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "White", label: "White" },
                                    { name: "Black", label: "Black" },
                                    { name: "Grey", label: "Grey" },
                                    { name: "Red", label: "Red" },
                                    { name: "Yellow", label: "Yellow" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={formData.Color === area.name}
                                          onChange={handleExteriorColorChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Additional Features </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "fullOption",
                                      label: "Full option",
                                    },
                                    { name: "insured", label: "Insured" },
                                    {
                                      name: "selfParking",
                                      label: "Self Parking",
                                    },
                                    {
                                      name: "alarmSystem",
                                      label: "Alarm System",
                                    },
                                    { name: "dealership", label: "Dealership" },
                                    {
                                      name: "quickSelling",
                                      label: "Quick Selling",
                                    },
                                    { name: "navigation", label: "Navigation" },
                                    {
                                      name: "temperatureSeats",
                                      label: "Temperature Controlled Seats",
                                    },
                                    { name: "inspected", label: "Inspected" },
                                    {
                                      name: "parkingSensors",
                                      label: "Parking Sensors",
                                    },
                                    { name: "bluetooth", label: "Bluetooth" },
                                    {
                                      name: "sunroof",
                                      label: "Sunroof/Moonroof",
                                    },
                                    {
                                      name: "leatherSeats",
                                      label: "Leather Seats",
                                    },
                                    {
                                      name: "backupCamera",
                                      label: "Backup Camera",
                                    },
                                    {
                                      name: "heatedSeats",
                                      label: "Heated Seats",
                                    },
                                    {
                                      name: "keylessEntry",
                                      label: "Keyless Entry",
                                    },
                                    {
                                      name: "remoteStart",
                                      label: "Remote Start",
                                    },
                                    {
                                      name: "adaptiveCruise",
                                      label: "Adaptive Cruise Control",
                                    },
                                    {
                                      name: "laneDeparture",
                                      label: "Lane Departure Warning",
                                    },
                                    {
                                      name: "blindSpot",
                                      label: "Blind Spot Monitoring",
                                    },
                                    {
                                      name: "premiumSound",
                                      label: "Premium Sound System",
                                    },
                                    { name: "awd", label: "All-Wheel Drive" },
                                    {
                                      name: "touchscreen",
                                      label: "Touchscreen Display",
                                    },
                                    {
                                      name: "carPlay",
                                      label: "Apple CarPlay/Android Auto",
                                    },
                                    {
                                      name: "ledHeadlights",
                                      label: "LED Headlights",
                                    },
                                    {
                                      name: "towPackage",
                                      label: "Tow Package",
                                    },
                                    {
                                      name: "powerLiftgate",
                                      label: "Power Liftgate",
                                    },
                                    {
                                      name: "headUpDisplay",
                                      label: "Head-Up Display",
                                    },
                                    {
                                      name: "rainWipers",
                                      label: "Rain-Sensing Wipers",
                                    },
                                    {
                                      name: "emergencyBraking",
                                      label: "Automatic Emergency Braking",
                                    },
                                    {
                                      name: "ambientLighting",
                                      label: "Ambient Lighting",
                                    },
                                  ].map((feature) => (
                                    <li key={feature.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={feature.name}
                                          checked={formData.AdditionalFeatures?.includes(
                                            feature.name
                                          )}
                                          onChange={handleAdditionalFeatures}
                                        />
                                        <span className="checkmark" />{" "}
                                        {feature.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>

                          <div className="card">
                            <div className="card-header">
                              <h4>Seller Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Dealers", label: "Dealers" },
                                    {
                                      name: "Individuals",
                                      label: "Individuals",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.SellerType === area.name
                                          }
                                          onChange={handleSellerTypeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>

                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Model Category </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "A-Class (Compact)",
                                      label: "A-Class (Compact)",
                                    },
                                    {
                                      name: "C-Class (Compact Exe)",
                                      label: "C-Class (Compact Exe)",
                                    },
                                    {
                                      name: "E-Class (Executive)",
                                      label: "E-Class (Executive)",
                                    },
                                    { name: "S-Class", label: "S-Class" },
                                    {
                                      name: "CLA (Compact Coupe)",
                                      label: "CLA (Compact Coupe)",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.ModelCategory === area.name
                                          }
                                          onChange={handleModelCategoryChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                          <div className="card">
                            <div className="card-header">
                              <h4>Number of Doors </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "4", label: "4" },
                                    { name: "5", label: "5" },
                                    { name: "2", label: "2" },
                                    { name: "3", label: "3" },
                                    { name: "0", label: "0" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.NumberofDoors === area.name
                                          }
                                          onChange={handleNumberofDoorsChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>

                          <div className="card">
                            <div className="card-header">
                              <h4>Seating Capacity </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "4", label: "4" },
                                    { name: "5", label: "5" },
                                    { name: "2", label: "2" },
                                    { name: "3", label: "3" },
                                    { name: "0", label: "0" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.SeatingCapacity ===
                                            area.name
                                          }
                                          onChange={handleSeatingCapacityChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Engine Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Inline-4 (I4) Engine",
                                      label: "Inline-4 (I4) Engine",
                                    },
                                    {
                                      name: "V6 Engine",
                                      label: "V6 Engine",
                                    },
                                    {
                                      name: "V8 Engine",
                                      label: "V8 Engine",
                                    },
                                    {
                                      name: "Inline-6 (I6) Engine",
                                      label: "Inline-6 (I6) Engine",
                                    },
                                    {
                                      name: "V12 Engine",
                                      label: "V12 Engine",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.EngineType === area.name
                                          }
                                          onChange={handleEngineTypeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}

                          <div className="card">
                            <div className="card-header">
                              <h4>Body Type</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Coupe", label: "Coupe" },
                                    {
                                      name: "Sedan (Saloon)",
                                      label: "Sedan (Saloon)",
                                    },
                                    { name: "SUV", label: "SUV" },
                                    { name: "Hatchback", label: "Hatchback" },
                                    {
                                      name: "Convertible",
                                      label: "Convertible",
                                    },
                                    {
                                      name: "Wagon (Estate)",
                                      label: "Wagon (Estate)",
                                    },
                                    {
                                      name: "Pickup Truck",
                                      label: "Pickup Truck",
                                    },
                                    { name: "Crossover", label: "Crossover" },
                                    {
                                      name: "Minivan (MPV)",
                                      label: "Minivan (MPV)",
                                    },
                                    { name: "Roadster", label: "Roadster" },
                                    { name: "Fastback", label: "Fastback" },
                                    { name: "Liftback", label: "Liftback" },
                                    { name: "Van", label: "Van" },
                                    { name: "Microcar", label: "Microcar" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.BodyType === area.name
                                          }
                                          onChange={handleBodyTypeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>

                          {/* <div className="form-group">
                            <label className="col-form-label">
                              Engine Capacity
                            </label>
                            <input
                              type="text"
                              name="EngineCapacity"
                              className="form-control"
                              value={formData.EngineCapacity}
                              onChange={handleChange} // Ensures changes are handled
                            />
                          </div> */}
                          <div className="form-group">
                            <label className="col-form-label">
                              Manufacture Year{" "}
                            </label>
                            <input
                              type="text"
                              name="ManufactureYear"
                              className="form-control pass-input"
                              placeholder="Manufacture Year"
                              value={formData.ManufactureYear}
                              onChange={handleChange}
                            />
                          </div>
                        </>
                      ) : [
                          "Watches",
                          "Perfumes & Incense",
                          "Sports Equipment",
                          "Men's Fashion",
                          "Women's Fashion",
                          "Children's Clothing & Accessories",
                          "Sleepwear",
                          "Gifts",
                          "Luggage",
                          "Health & Beauty",
                        ].some(
                          (item) =>
                            item === Category.SubCategory ||
                            item === DataCatorgySHow
                        ) ? (
                        <>
                          {" "}
                          {/* <div className="card">
                    <div className="card-header">
                      <h4>States </h4>
                    </div>
                    <div className="card-body">
                      <div className="form-group featuresform-list mb-0">
                        <ul>
                          {[
                            { name: "California", label: "California" },
                            { name: "Texas", label: "Texas" },
                            { name: "Newyork", label: "Newyork" },
                            { name: "Florida", label: "Florida" },
                            { name: "Illinois", label: "Illinois" },
                          ].map((area) => (
                            <li key={area.name}>
                              <label className="custom_check">
                                <input
                                  type="checkbox"
                                  name={area.name}
                                  checked={formData.States === area.name}
                                  onChange={handleStatesChange}
                                />
                                <span className="checkmark" /> {area.label}
                              </label>
                            </li>
                          ))}
                        </ul>
                        <div className="clearfix" />
                      </div>
                    </div>
                  </div> */}
                          <div className="card">
                            <div className="card-header">
                              <h4>Brand </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Nike", label: "Nike" },
                                    { name: "Adidas", label: "Adidas" },
                                    { name: "Zara", label: "Zara" },
                                    { name: "H&M", label: "H&M" },
                                    { name: "Gucci", label: "Gucci" },
                                    { name: "Prada", label: "Prada" },
                                    { name: "Levis", label: "Levi's" },
                                    { name: "Uniqlo", label: "Uniqlo" },
                                    {
                                      name: "LouisVuitton",
                                      label: "Louis Vuitton",
                                    },
                                    { name: "Balenciaga", label: "Balenciaga" },
                                    {
                                      name: "UnderArmour",
                                      label: "Under Armour",
                                    },
                                    { name: "Puma", label: "Puma" },
                                    { name: "Versace", label: "Versace" },
                                    {
                                      name: "TommyHilfiger",
                                      label: "Tommy Hilfiger",
                                    },
                                    {
                                      name: "DolceGabbana",
                                      label: "Dolce & Gabbana",
                                    },
                                    { name: "Armani", label: "Armani" },
                                    {
                                      name: "CalvinKlein",
                                      label: "Calvin Klein",
                                    },
                                    { name: "OffWhite", label: "Off-White" },
                                    { name: "Burberry", label: "Burberry" },
                                    { name: "Shein", label: "Shein" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={formData.Brand === area.name}
                                          onChange={handleBrandChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Add Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Sell", label: "Sell" },
                                    { name: "Rent", label: "Rent" },
                                    { name: "Wanted", label: "Wanted" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Purpose === area.name
                                          }
                                          onChange={handlePurposeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Condition</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "New",
                                      label: "New",
                                    },
                                    {
                                      name: "Used",
                                      label: "Used",
                                    },
                                    { name: "Manual", label: "Manual" },
                                  ].map((feature) => (
                                    <li key={feature.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={feature.name}
                                          checked={
                                            formData.Condition === feature.name
                                          }
                                          onChange={handleCondition} // ✅ Fixed function name
                                        />
                                        <span className="checkmark" />{" "}
                                        {feature.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Gender </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Women", label: "Women" },
                                    { name: "Kids", label: "Kids" },
                                    { name: "Men", label: "Men" },
                                    { name: "Unisex", label: "Unisex" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Gender === area.name
                                          }
                                          onChange={handleGenderChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                          <div className="card">
                            <div className="card-header">
                              <h4>Size </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "XS", label: "XS" },
                                    { name: "M", label: "M" },
                                    { name: "L", label: "L" },
                                    { name: "XL", label: "XL" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={formData.Size === area.name}
                                          onChange={handleSizeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Fit </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Regular fit",
                                      label: "Regular fit",
                                    },
                                    { name: "Slim fit", label: "Slim fit" },
                                    {
                                      name: "Oversized",
                                      label: "Oversized",
                                    },
                                    {
                                      name: "Relaxed fit",
                                      label: "Relaxed fit",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={formData.Fit === area.name}
                                          onChange={handleFitChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Material </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Cotton blend",
                                      label: "Cotton blend",
                                    },
                                    {
                                      name: "Stretch denim",
                                      label: "Stretch denim",
                                    },
                                    {
                                      name: "Raw denim",
                                      label: "Raw denim",
                                    },
                                    {
                                      name: "Recycled denim",
                                      label: "Recycled denim",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Material === area.name
                                          }
                                          onChange={handleMaterialChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                          <div className="card">
                            <div className="card-header">
                              <h4>Color </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Blue", label: "Blue" },
                                    { name: "Black", label: "Black" },
                                    { name: "Grey", label: "Grey" },
                                    { name: "White", label: "White" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={formData.Color === area.name}
                                          onChange={handleColorChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Style/Design </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Classic", label: "Classic" },
                                    {
                                      name: "Distressed",
                                      label: "Distressed",
                                    },
                                    { name: "Vintage", label: "Vintage" },
                                    { name: "Ripped", label: "Ripped" },
                                    {
                                      name: "Stone-washed",
                                      label: "Stone-washed",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.StyleDesign === area.name
                                          }
                                          onChange={handleStyleDesignChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Closure Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Button-down",
                                      label: "Button-down",
                                    },
                                    { name: "Zipper", label: "Zipper" },
                                    {
                                      name: "Snap closure",
                                      label: "Snap closure",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.ClosureType === area.name
                                          }
                                          onChange={handleClosureTypeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Collar Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Standard", label: "Standard" },
                                    { name: "Spread", label: "Spread" },
                                    { name: "Pointed", label: "Pointed" },
                                    {
                                      name: "Shawl collar",
                                      label: "Shawl collar",
                                    },
                                    {
                                      name: "No collar",
                                      label: "No collar",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.CollarType === area.name
                                          }
                                          onChange={handleCollarTypeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Sleeve Length </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Long sleeve",
                                      label: "Long sleeve",
                                    },
                                    {
                                      name: "Short sleeve",
                                      label: "Short sleeve",
                                    },
                                    {
                                      name: "Sleeveless",
                                      label: "Sleeveless",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.SleeveLength === area.name
                                          }
                                          onChange={handleSleeveLengthChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Wash Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Acid-wash",
                                      label: "Acid-wash",
                                    },
                                    {
                                      name: "Stone-wash",
                                      label: "Stone-wash",
                                    },
                                    {
                                      name: "Light-wash",
                                      label: "Light-wash",
                                    },
                                    {
                                      name: "Dark-wash",
                                      label: "Dark-wash",
                                    },
                                    {
                                      name: "Black-wash",
                                      label: "Black-wash",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.WashType === area.name
                                          }
                                          onChange={handleWashTypeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Features </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Pockets (Chest, Side)",
                                      label: "Pockets (Chest, Side)",
                                    },
                                    { name: "Patches", label: "Patches" },
                                    {
                                      name: "Embroidery",
                                      label: "Embroidery",
                                    },
                                    { name: "Studded", label: "Studded" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Features === area.name
                                          }
                                          onChange={handleFeaturesChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Season </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Spring",
                                      label: "Spring",
                                    },
                                    { name: "Summer", label: "Summer" },
                                    { name: "Fall", label: "Fall" },
                                    { name: "Winter", label: "Winter" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Season === area.name
                                          }
                                          onChange={handleSeasonChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Seller Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Brand Seller",
                                      label: "Brand Seller",
                                    },
                                    {
                                      name: "Individuals",
                                      label: "Individuals",
                                    },
                                    { name: "Retailer", label: "Retailer" },
                                    {
                                      name: "Marketplace",
                                      label: "Marketplace",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.SellerType === area.name
                                          }
                                          onChange={handleSellerTypeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                        </>
                      ) : [
                          "Outdoor Furniture",
                          "Majlis & Sofas",
                          "Cabinets & Wardrobes",
                          "Beds & Mattresses",
                          "Tables & Chairs",
                          "Kitchens",
                          "Bathrooms",
                          "Carpets",
                          "Curtains",
                          "Decoration & Accessories",
                          "Lighting",
                          "Household Items",
                          "Garden - Plants",
                          "Office Furniture",
                          "Doors - Windows - Aluminium",
                          "Tiles & Flooring",
                        ].some(
                          (item) =>
                            item === Category.SubCategory ||
                            item === DataCatorgySHow
                        ) ? (
                        <>
                          {/* <div className="card">
                    <div className="card-header">
                      <h4>States </h4>
                    </div>
                    <div className="card-body">
                      <div className="form-group featuresform-list mb-0">
                        <ul>
                          {[
                            { name: "California", label: "California" },
                            { name: "Texas", label: "Texas" },
                            { name: "Newyork", label: "Newyork" },
                            { name: "Florida", label: "Florida" },
                            { name: "Illinois", label: "Illinois" },
                          ].map((area) => (
                            <li key={area.name}>
                              <label className="custom_check">
                                <input
                                  type="checkbox"
                                  name={area.name}
                                  checked={formData.States === area.name}
                                  onChange={handleStatesChange}
                                />
                                <span className="checkmark" /> {area.label}
                              </label>
                            </li>
                          ))}
                        </ul>
                        <div className="clearfix" />
                      </div>
                    </div>
                  </div> */}
                          <div className="card">
                            <div className="card-header">
                              <h4>Add Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Sell", label: "Sell" },
                                    { name: "Rent", label: "Rent" },
                                    { name: "Wanted", label: "Wanted" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Purpose === area.name
                                          }
                                          onChange={handlePurposeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Condition</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "New",
                                      label: "New",
                                    },
                                    {
                                      name: "Used",
                                      label: "Used",
                                    },
                                    { name: "Manual", label: "Manual" },
                                  ].map((feature) => (
                                    <li key={feature.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={feature.name}
                                          checked={
                                            formData.Condition === feature.name
                                          }
                                          onChange={handleCondition} // ✅ Fixed function name
                                        />
                                        <span className="checkmark" />{" "}
                                        {feature.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Brand </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Omron", label: "Omron" },
                                    { name: "Withings", label: "Withings" },
                                    { name: "Wellue", label: "Wellue" },
                                    { name: "Beurer", label: "Beurer" },
                                    { name: "iHealth", label: "iHealth" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={formData.Brand === area.name}
                                          onChange={handleBrandChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Upper arm monitor",
                                      label: "Upper arm monitor",
                                    },
                                    {
                                      name: "Wrist monitor",
                                      label: "Wrist monitor",
                                    },
                                    {
                                      name: "Finger monitor",
                                      label: "Finger monitor",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={formData.Type === area.name}
                                          onChange={handleTypedChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4> Measurement Range </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "90-230 mmHg",
                                      label: "90-230 mmHg",
                                    },
                                    {
                                      name: "60-180 mmHg",
                                      label: "60-180 mmHg",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.MeasurementRange ===
                                            area.name
                                          }
                                          onChange={
                                            handleMeasurementRangeChange
                                          }
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4> Accuracy</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "±3 mmHg",
                                      label: "±3 mmHg",
                                    },
                                    { name: "±5 mmHg", label: "±5 mmHg" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Accuracy === area.name
                                          }
                                          onChange={handleAccuracyChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Features </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Automatic inflation",
                                      label: "Automatic inflation",
                                    },
                                    {
                                      name: "Smart connectivity",
                                      label: "Smart connectivity",
                                    },
                                    {
                                      name: "LCD Display",
                                      label: "LCD Display",
                                    },
                                    {
                                      name: "Talking function",
                                      label: "Talking function",
                                    },
                                    {
                                      name: "Irregular heartbeat ",
                                      label: "Irregular heartbeat ",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Features === area.name
                                          }
                                          onChange={handleFeaturesChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Cuff Size </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Standard (22-42 cm)",
                                      label: "Standard (22-42 cm)",
                                    },
                                    {
                                      name: "Large (32-50 cm)",
                                      label: "Large (32-50 cm)",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.CuffSize === area.name
                                          }
                                          onChange={handleCuffSizeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Display Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Digital",
                                      label: "Digital",
                                    },
                                    {
                                      name: "Analog",
                                      label: "Analog",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.DisplayType === area.name
                                          }
                                          onChange={handleDisplayTypeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Battery Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "AA batteries",
                                      label: "AA batteries",
                                    },
                                    {
                                      name: "Rechargeable battery",
                                      label: "Rechargeable battery",
                                    },
                                    {
                                      name: "USB charging",
                                      label: "USB charging",
                                    },
                                    {
                                      name: "Disposable batteries",
                                      label: "Disposable batteries",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.BatteryType === area.name
                                          }
                                          onChange={handleBatteryTypeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Compatibility </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Mobile app compatibility",
                                      label: "Mobile app compatibility",
                                    },
                                    {
                                      name: "Non-app compatible",
                                      label: "Non-app compatible",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Compatibility === area.name
                                          }
                                          onChange={handleCompatibilityChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Storage Capacity </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "30 readings",
                                      label: "30 readings",
                                    },
                                    {
                                      name: "50 readings",
                                      label: "50 readings",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.StorageCapacity ===
                                            area.name
                                          }
                                          onChange={handleStorageCapacityChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Measurement Units </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "mmHg",
                                      label: "mmHg",
                                    },
                                    {
                                      name: "kPa",
                                      label: "kPa",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.MeasurementUnits ===
                                            area.name
                                          }
                                          onChange={
                                            handleMeasurementUnitsChange
                                          }
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Speed of Measurement </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Quick",
                                      label: "Quick",
                                    },
                                    {
                                      name: "Standard",
                                      label: "Standard",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.SpeedofMeasurement ===
                                            area.name
                                          }
                                          onChange={
                                            handleSpeedofMeasurementChange
                                          }
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Seller Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Brand Seller",
                                      label: "Brand Seller",
                                    },
                                    {
                                      name: "Individuals",
                                      label: "Individuals",
                                    },
                                    { name: "Retailer", label: "Retailer" },
                                    {
                                      name: "Marketplace",
                                      label: "Marketplace",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.SellerType === area.name
                                          }
                                          onChange={handleSellerTypeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                        </>
                      ) : [
                          "Administrative Jobs",
                          "Fashion & Beauty Jobs",
                          "Security & Safety Jobs",
                          "Teaching Jobs",
                          "IT & Design Jobs",
                          "Agriculture & Farming Jobs",
                          "Industrial Jobs",
                          "Medical & Nursing Jobs",
                          "Architecture & Construction Jobs",
                          "Housekeeping Jobs",
                          "Restaurant Jobs",
                        ].some(
                          (item) =>
                            item === Category.SubCategory ||
                            item === DataCatorgySHow
                        ) ? (
                        <>
                          {" "}
                          {/* <div className="card">
                    <div className="card-header">
                      <h4>States </h4>
                    </div>
                    <div className="card-body">
                      <div className="form-group featuresform-list mb-0">
                        <ul>
                          {[
                            { name: "California", label: "California" },
                            { name: "Texas", label: "Texas" },
                            { name: "Newyork", label: "Newyork" },
                            { name: "Florida", label: "Florida" },
                            { name: "Illinois", label: "Illinois" },
                          ].map((area) => (
                            <li key={area.name}>
                              <label className="custom_check">
                                <input
                                  type="checkbox"
                                  name={area.name}
                                  checked={formData.States === area.name}
                                  onChange={handleStatesChange}
                                />
                                <span className="checkmark" /> {area.label}
                              </label>
                            </li>
                          ))}
                        </ul>
                        <div className="clearfix" />
                      </div>
                    </div>
                  </div> */}
                          {/* <div className="card ">
                            <div className="card-header">
                              <h4>Brand </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Omron", label: "Omron" },
                                    { name: "Withings", label: "Withings" },
                                    { name: "Wellue", label: "Wellue" },
                                    { name: "Beurer", label: "Beurer" },
                                    { name: "iHealth", label: "iHealth" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={formData.Brand === area.name}
                                          onChange={handleBrandChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Job Title </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Full Stack",
                                      label: "Full Stack",
                                    },
                                    {
                                      name: "Software Engineer",
                                      label: "Software Engineer",
                                    },
                                    {
                                      name: "Front-end Developer",
                                      label: "Front-end Developer",
                                    },
                                    {
                                      name: "Data Scientist",
                                      label: "Data Scientist",
                                    },
                                    {
                                      name: "Backend Engineer",
                                      label: "Backend Engineer",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.JobTitle === area.name
                                          }
                                          onChange={handleJobTitleChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Job Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Remote", label: "Remote" },
                                    { name: "Hybrid", label: "Hybrid" },
                                    { name: "On-site", label: "On-site" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.JobType === area.name
                                          }
                                          onChange={handlJobTypeeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Company </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Google", label: "Google" },
                                    {
                                      name: "Microsoft",
                                      label: "Microsoft",
                                    },
                                    { name: "Apple", label: "Apple" },
                                    { name: "Amazon", label: "Amazon" },
                                    { name: "Facebook", label: "Facebook" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Company === area.name
                                          }
                                          onChange={handleCompanyChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Employment Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Full-time",
                                      label: "Full-time",
                                    },
                                    {
                                      name: "Part-time",
                                      label: "Part-time",
                                    },
                                    {
                                      name: "Temporary",
                                      label: "Temporary",
                                    },
                                    {
                                      name: "Internship",
                                      label: "Internship",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.EmploymentType ===
                                            area.name
                                          }
                                          onChange={handleEmploymentTypeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Experience Level </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Entry-level",
                                      label: "Entry-level",
                                    },
                                    {
                                      name: "Mid-level",
                                      label: "Mid-level",
                                    },
                                    {
                                      name: "Senior-level",
                                      label: "Senior-level",
                                    },
                                    {
                                      name: "Executive",
                                      label: "Executive",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.ExperienceLevel ===
                                            area.name
                                          }
                                          onChange={handleExperienceLevelChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Industry </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Finance", label: "Finance" },
                                    {
                                      name: "Information Technology",
                                      label: "Information Technology",
                                    },
                                    {
                                      name: "Education",
                                      label: "Education",
                                    },
                                    {
                                      name: "Consulting",
                                      label: "Consulting",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Industry === area.name
                                          }
                                          onChange={handleIndustryChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Required Skills </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Programming Languages",
                                      label: "Programming Languages",
                                    },
                                    {
                                      name: "Frameworks/Tools",
                                      label: "Frameworks/Tools",
                                    },
                                    {
                                      name: "Databases",
                                      label: "Databases",
                                    },
                                    {
                                      name: "Soft Skills",
                                      label: "Soft Skills",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.RequiredSkills ===
                                            area.name
                                          }
                                          onChange={handleRequiredSkillsChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-form-label">
                              Job Description
                            </label>
                            <input
                              type="text"
                              name="JobDescription"
                              className="form-control"
                              value={formData.JobDescription}
                              onChange={handleChange} // Ensures changes are handled
                            />
                          </div> */}
                        </>
                      ) : [
                          "Hunting & Trips",
                          "Gardening & Agriculture",
                          "Parties & Events",
                          "Travel & Tourism",
                          "Roommate",
                          "Lost & Found",
                          "Education & Training",
                          "Sports Training",
                          "Stock & Forex Education",
                          "Driving Lessons",
                          "Private Tutoring",
                          "Training Courses",
                          "Antiques & Collectibles",
                          "Projects & Investments",
                          "Books & Arts",
                          "Programming & Design",
                          "Food & Beverages",
                        ].some(
                          (item) =>
                            item === Category.SubCategory ||
                            item === DataCatorgySHow
                        ) ? (
                        <>
                          {" "}
                          {/* <div className="card">
                    <div className="card-header">
                      <h4>States </h4>
                    </div>
                    <div className="card-body">
                      <div className="form-group featuresform-list mb-0">
                        <ul>
                          {[
                            { name: "California", label: "California" },
                            { name: "Texas", label: "Texas" },
                            { name: "Newyork", label: "Newyork" },
                            { name: "Florida", label: "Florida" },
                            { name: "Illinois", label: "Illinois" },
                          ].map((area) => (
                            <li key={area.name}>
                              <label className="custom_check">
                                <input
                                  type="checkbox"
                                  name={area.name}
                                  checked={formData.States === area.name}
                                  onChange={handleStatesChange}
                                />
                                <span className="checkmark" /> {area.label}
                              </label>
                            </li>
                          ))}
                        </ul>
                        <div className="clearfix" />
                      </div>
                    </div>
                  </div> */}
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Subject Categories </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Business", label: "Business" },
                                    {
                                      name: "Computer Science",
                                      label: "Computer Science",
                                    },
                                    {
                                      name: "Arts & Humanities",
                                      label: "Arts & Humanities",
                                    },
                                    {
                                      name: "Personal Development",
                                      label: "Personal Development",
                                    },
                                    {
                                      name: "Health & Fitness",
                                      label: "Health & Fitness",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.SubjectCategories ===
                                            area.name
                                          }
                                          onChange={
                                            handleSubjectCategoriesChange
                                          }
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Skill Level</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Beginner", label: "Beginner" },
                                    {
                                      name: "Intermediate",
                                      label: "Intermediate",
                                    },
                                    {
                                      name: "Advanced",
                                      label: "Advanced",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.SkillLevel === area.name
                                          }
                                          onChange={handleSkillLevelChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Content Type</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Courses", label: "Courses" },
                                    {
                                      name: "Guided Projects",
                                      label: "Guided Projects",
                                    },
                                    {
                                      name: "Specializations",
                                      label: "Specializations",
                                    },
                                    {
                                      name: "Degrees",
                                      label: "Degrees",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.ContentType === area.name
                                          }
                                          onChange={handleContentTypeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Language</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "English", label: "English" },
                                    {
                                      name: "Spanish",
                                      label: "Spanish",
                                    },
                                    {
                                      name: "French",
                                      label: "French",
                                    },
                                    {
                                      name: "Other",
                                      label: "Other",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Language === area.name
                                          }
                                          onChange={handleLanguageChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Duration</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Short-term",
                                      label: "Short-term",
                                    },
                                    {
                                      name: "Medium-term",
                                      label: "Medium-term",
                                    },
                                    {
                                      name: "Long-term",
                                      label: "Long-term",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Duration === area.name
                                          }
                                          onChange={handleDurationChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                        </>
                      ) : [
                          "Apartments for Rent",
                          "Apartments for Sale",
                          "Building for Rent",
                          "Building for Sale",
                          "Camps for Rent",
                          "Chalets for Sale",
                          "Commercial Lands for Sale",
                          "Compound for Rent",
                          "Compound for Sale",
                          "Farm for Rent",
                          "Farms for Sale",
                          "Floor for Sale",
                          "Floors for Rent",
                          "Hall for Rent",
                          "Houses for Rent",
                          "Houses for Sale",
                        ].some(
                          (item) =>
                            item === Category.SubCategory ||
                            item === DataCatorgySHow
                        ) ? (
                        <>
                          {" "}
                          {/* <div className="card">
                    <div className="card-header">
                      <h4>States </h4>
                    </div>
                    <div className="card-body">
                      <div className="form-group featuresform-list mb-0">
                        <ul>
                          {[
                            { name: "California", label: "California" },
                            { name: "Texas", label: "Texas" },
                            { name: "Newyork", label: "Newyork" },
                            { name: "Florida", label: "Florida" },
                            { name: "Illinois", label: "Illinois" },
                          ].map((area) => (
                            <li key={area.name}>
                              <label className="custom_check">
                                <input
                                  type="checkbox"
                                  name={area.name}
                                  checked={formData.States === area.name}
                                  onChange={handleStatesChange}
                                />
                                <span className="checkmark" /> {area.label}
                              </label>
                            </li>
                          ))}
                        </ul>
                        <div className="clearfix" />
                      </div>
                    </div>
                  </div> */}
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Property Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "House", label: "House" },
                                    {
                                      name: "Apartment",
                                      label: "Apartment",
                                    },
                                    {
                                      name: "Townhouse",
                                      label: "Townhouse",
                                    },
                                    { name: "Condo", label: "Condo" },
                                    { name: "Studio", label: "Studio" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.PropertyType === area.name
                                          }
                                          onChange={handlePropertyTypeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                          <div className="card">
                            <div className="card-header">
                              <h4>Frequency </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Dailly", label: "Dailly" },
                                    {
                                      name: "Weekly",
                                      label: "Weekly",
                                    },
                                    {
                                      name: "Montly",
                                      label: "Montly",
                                    },
                                    { name: "Yearly", label: "Yearly" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Frequency === area.name
                                          }
                                          onChange={handleFrequency}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Add Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Sell", label: "Sell" },
                                    { name: "Rent", label: "Rent" },
                                    { name: "Wanted", label: "Wanted" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Purpose === area.name
                                          }
                                          onChange={handlePurposeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Condition</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "New",
                                      label: "New",
                                    },
                                    {
                                      name: "Used",
                                      label: "Used",
                                    },
                                    { name: "Manual", label: "Manual" },
                                  ].map((feature) => (
                                    <li key={feature.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={feature.name}
                                          checked={
                                            formData.Condition === feature.name
                                          }
                                          onChange={handleCondition} // ✅ Fixed function name
                                        />
                                        <span className="checkmark" />{" "}
                                        {feature.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                          <div className="card">
                            <div className="card-header">
                              <h4>Residence Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Single", label: "Single" },
                                    {
                                      name: "Families",
                                      label: "Families",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.ResidenceType === area.name
                                          }
                                          onChange={handleResidenceType}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Number of rooms </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "1 Bedroom",
                                      label: "1 Bedroom",
                                    },
                                    {
                                      name: "2 Bedroom",
                                      label: "2 Bedroom",
                                    },
                                    {
                                      name: "3 Bedroom",
                                      label: "3 Bedroom",
                                    },
                                    {
                                      name: "4 Bedroom",
                                      label: "4 Bedroom",
                                    },
                                    {
                                      name: "5 Bedroom",
                                      label: "5 Bedroom",
                                    },
                                    {
                                      name: "5+ Bedrooms",
                                      label: "5+ Bedrooms",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Bedroom === area.name
                                          }
                                          onChange={handleBedroomChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Number of bathrooms </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "1 bathrooms",
                                      label: "1 bathrooms",
                                    },
                                    {
                                      name: "2 bathrooms",
                                      label: "2 bathrooms",
                                    },
                                    {
                                      name: "3 bathrooms",
                                      label: "3 bathrooms",
                                    },
                                    {
                                      name: "4 bathrooms",
                                      label: "4 bathrooms",
                                    },
                                    {
                                      name: "5 bathrooms",
                                      label: "5 bathrooms",
                                    },
                                    {
                                      name: "5+ bathroomss",
                                      label: "5+ bathroomss",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.bathrooms === area.name
                                          }
                                          onChange={handlebathroomsChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Area </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Under 50 sq.m",
                                      label: "Under 50 sq.m",
                                    },
                                    {
                                      name: "50 - 100 sq.m",
                                      label: "50 - 100 sq.m",
                                    },

                                    {
                                      name: "100 - 150 sq.m",
                                      label: "100 - 150 sq.m",
                                    },
                                    {
                                      name: "150 - 200 sq.m",
                                      label: "150 - 200 sq.m",
                                    },
                                    {
                                      name: "200+ sq.m",
                                      label: "200+ sq.m",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={formData.Area === area.name}
                                          onChange={handleAreaChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Furnished </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Furnished",
                                      label: "Furnished",
                                    },
                                    {
                                      name: "Unfurnished",
                                      label: "Unfurnished",
                                    },
                                    {
                                      name: "Partially Furnished",
                                      label: "Partially Furnished",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Furnished === area.name
                                          }
                                          onChange={handleFurnishedChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Facade </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "East Facing",
                                      label: "East Facing",
                                    },
                                    {
                                      name: "West Facing",
                                      label: "West Facing",
                                    },
                                    {
                                      name: "North Facing",
                                      label: "North Facing",
                                    },
                                    {
                                      name: "South Facing",
                                      label: "South Facing",
                                    },
                                    {
                                      name: "North-East Facing",
                                      label: "North-East Facing",
                                    },
                                    {
                                      name: "North-West Facing",
                                      label: "North-West Facing",
                                    },
                                    {
                                      name: "South-East Facing",
                                      label: "South-East Facing",
                                    },
                                    {
                                      name: "South-West Facing",
                                      label: "South-West Facing",
                                    },
                                    {
                                      name: "Partially Furnished",
                                      label: "Partially Furnished",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Facade === area.name
                                          }
                                          onChange={handleFacadeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Property Features </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Year built",
                                      label: "Year built",
                                    },
                                    {
                                      name: "Unfurnished",
                                      label: "Unfurnished",
                                    },
                                    {
                                      name: "Furnished",
                                      label: "Furnished",
                                    },
                                    {
                                      name: "Smart home",
                                      label: "Smart home",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.PropertyFeatures ===
                                            area.name
                                          }
                                          onChange={
                                            handlePropertyFeaturesChange
                                          }
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                          <div className="card">
                            <div className="card-header">
                              <h4>License Number</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group">
                                <label htmlFor="licenseNumberInput">
                                  Enter License Number
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="licenseNumberInput"
                                  placeholder="License Number"
                                  value={formData.licenseNumber}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      licenseNumber: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          {/* <label>Property Age</label>
                          <select
                            value={formData.propertyAge}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                propertyAge: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select Age</option>
                            <option value="New (0-1 year)">
                              New (0–1 year)
                            </option>
                            <option value="1-5 years">1–5 years</option>
                            <option value="6-10 years">6–10 years</option>
                            <option value="11-15 years">11–15 years</option>
                            <option value="16-20 years">16–20 years</option>
                            <option value="21-30 years">21–30 years</option>
                            <option value="31+ years">31+ years</option>
                            <option value="Under Construction">
                              Under Construction
                            </option>
                          </select> */}
                          <div className="card">
                            <div className="card-header">
                              <h4>Floor </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Basement",
                                      label: "Basement",
                                    },
                                    {
                                      name: "Ground Floor",
                                      label: "Ground Floor",
                                    },
                                    {
                                      name: "1st Floor",
                                      label: "1st Floor",
                                    },
                                    {
                                      name: "2nd Floor",
                                      label: "2nd Floor",
                                    },
                                    {
                                      name: "3rd Floor",
                                      label: "3rd Floor",
                                    },
                                    {
                                      name: "4th Floor",
                                      label: "4th Floor",
                                    },
                                    {
                                      name: "5th Floor",
                                      label: "5th Floor",
                                    },
                                    {
                                      name: "6th Floor",
                                      label: "6th Floor",
                                    },
                                    {
                                      name: "7th Floor",
                                      label: "7th Floor",
                                    },
                                    {
                                      name: "8th Floor",
                                      label: "8th Floor",
                                    },
                                    {
                                      name: "9th Floor",
                                      label: "9th Floor",
                                    },
                                    {
                                      name: "10th Floor",
                                      label: "10th Floor",
                                    },
                                    {
                                      name: "10+ Floors",
                                      label: "10+ Floors",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={formData.Floor === area.name}
                                          onChange={handleFloorChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Condition</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "New",
                                      label: "New",
                                    },
                                    {
                                      name: "Used",
                                      label: "Used",
                                    },
                                    { name: "Manual", label: "Manual" },
                                  ].map((feature) => (
                                    <li key={feature.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={feature.name}
                                          checked={
                                            formData.Condition === feature.name
                                          }
                                          onChange={handleCondition} // ✅ Fixed function name
                                        />
                                        <span className="checkmark" />{" "}
                                        {feature.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Property Age </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "New (0-1 year)",
                                      label: "New (0-1 year)",
                                    },
                                    {
                                      name: "1-5 years",
                                      label: "1-5 years",
                                    },
                                    {
                                      name: "6-10 years",
                                      label: "6-10 years",
                                    },
                                    {
                                      name: "11-15 years",
                                      label: "11-15 years",
                                    },
                                    {
                                      name: "16-20 years",
                                      label: "16-20 years",
                                    },
                                    {
                                      name: "21-30 years",
                                      label: "21-30 years",
                                    },
                                    {
                                      name: "31+ years",
                                      label: "31+ years",
                                    },
                                    {
                                      name: "Under Construction",
                                      label: "Under Construction",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.PropertyAge === area.name
                                          }
                                          onChange={handlePropertyAgeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Featuers </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Seprate  Entrances",
                                      label: "Seprate  Entrances",
                                    },
                                    {
                                      name: "Private Entrance",
                                      label: "Private Entrance",
                                    },
                                    {
                                      name: "In a Villa",
                                      label: "In a Villa",
                                    },
                                    {
                                      name: "With roof",
                                      label: "With roof",
                                    },
                                    {
                                      name: "AC",
                                      label: "AC",
                                    },
                                    {
                                      name: "Car Parking",
                                      label: "Car Parking",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Featuers === area.name
                                          }
                                          onChange={handleFeatuersChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Seller Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Direct owner",
                                      label: "Direct owner",
                                    },
                                    {
                                      name: "Real estate agent",
                                      label: "Real estate agent",
                                    },
                                    {
                                      name: "Developer",
                                      label: "Developer",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.SellerType === area.name
                                          }
                                          onChange={handleSellerTypeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                        </>
                      ) : [
                          "Other Services",
                          "Contracting Services",
                          "Government Paperwork Services",
                          "Delivery Services",
                          "Furniture Moving Services",
                          "Cleaning Services",
                          "International Shopping Services",
                          "Legal Services",
                          "Accounting & Financial Services",
                        ].some(
                          (item) =>
                            item === Category.SubCategory ||
                            item === DataCatorgySHow
                        ) ? (
                        <>
                          {" "}
                          {/* <div className="card">
                    <div className="card-header">
                      <h4>States </h4>
                    </div>
                    <div className="card-body">
                      <div className="form-group featuresform-list mb-0">
                        <ul>
                          {[
                            { name: "California", label: "California" },
                            { name: "Texas", label: "Texas" },
                            { name: "Newyork", label: "Newyork" },
                            { name: "Florida", label: "Florida" },
                            { name: "Illinois", label: "Illinois" },
                          ].map((area) => (
                            <li key={area.name}>
                              <label className="custom_check">
                                <input
                                  type="checkbox"
                                  name={area.name}
                                  checked={formData.States === area.name}
                                  onChange={handleStatesChange}
                                />
                                <span className="checkmark" /> {area.label}
                              </label>
                            </li>
                          ))}
                        </ul>
                        <div className="clearfix" />
                      </div>
                    </div>
                  </div> */}
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Check-in/Check-out Dates </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Specific dates",
                                      label: "Specific dates",
                                    },
                                    {
                                      name: "flexible date options",
                                      label: "flexible date options",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Checkin === area.name
                                          }
                                          onChange={handleCheckinChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Room Type</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Single", label: "Single" },
                                    {
                                      name: "double",
                                      label: "double",
                                    },
                                    {
                                      name: "Family room",
                                      label: "Family room",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.RoomType === area.name
                                          }
                                          onChange={handleRoomTypeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Amenities </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Free Wi-Fi",
                                      label: "Free Wi-Fi",
                                    },
                                    {
                                      name: "pool",
                                      label: "pool",
                                    },
                                    {
                                      name: "gym",
                                      label: "gym",
                                    },
                                    {
                                      name: "parking",
                                      label: "parking",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Amenities === area.name
                                          }
                                          onChange={handleAmenitiesChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Property Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Hotel", label: "Hotel" },
                                    { name: "Resort", label: "Resort" },
                                    { name: "Villa", label: "Villa" },
                                    { name: "Hostel", label: "Hostel" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.PropertyType === area.name
                                          }
                                          onChange={handlePropertyTypeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                        </>
                      ) : [
                          "Gaming Consoles",
                          "Video Games",
                          "Controllers",
                          "Gaming Accessories",
                          "Gift Cards",
                          "Accounts",
                          "Toys",
                        ].some(
                          (item) =>
                            item === Category.SubCategory ||
                            item === DataCatorgySHow
                        ) ? (
                        <>
                          {/* <div className="card">
                    <div className="card-header">
                      <h4>States </h4>
                    </div>
                    <div className="card-body">
                      <div className="form-group featuresform-list mb-0">
                        <ul>
                          {[
                            { name: "California", label: "California" },
                            { name: "Texas", label: "Texas" },
                            { name: "Newyork", label: "Newyork" },
                            { name: "Florida", label: "Florida" },
                            { name: "Illinois", label: "Illinois" },
                          ].map((area) => (
                            <li key={area.name}>
                              <label className="custom_check">
                                <input
                                  type="checkbox"
                                  name={area.name}
                                  checked={formData.States === area.name}
                                  onChange={handleStatesChange}
                                />
                                <span className="checkmark" /> {area.label}
                              </label>
                            </li>
                          ))}
                        </ul>
                        <div className="clearfix" />
                      </div>
                    </div>
                  </div> */}
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Brand </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Adidas", label: "Adidas" },
                                    { name: "Nike", label: "Nike" },
                                    {
                                      name: "Under Armour",
                                      label: "Under Armour",
                                    },
                                    {
                                      name: "New Balance",
                                      label: "New Balance",
                                    },
                                    { name: "Puma", label: "Puma" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={formData.Brand === area.name}
                                          onChange={handleBrandChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Category </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Running Shoes",
                                      label: "Running Shoes",
                                    },
                                    {
                                      name: "Walking Shoes",
                                      label: "Walking Shoes",
                                    },
                                    {
                                      name: "Athletic Shoes",
                                      label: "Athletic Shoes",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.ShoeCategory === area.name
                                          }
                                          onChange={handleShoeCategoryChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Size </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Men: 6–15 (US)",
                                      label: "Men: 6–15 (US)",
                                    },
                                    {
                                      name: "Women: 5–12 (US)",
                                      label: "Women: 5–12 (US)",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={formData.Size === area.name}
                                          onChange={handleSizeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Material </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Mesh Upper",
                                      label: "Mesh Upper",
                                    },
                                    {
                                      name: "Foam Midsole",
                                      label: "Foam Midsole",
                                    },
                                    {
                                      name: "Rubber Outsole",
                                      label: "Rubber Outsole",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Material === area.name
                                          }
                                          onChange={handleMaterialChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Gender </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Men's Shoes",
                                      label: "Men's Shoes",
                                    },
                                    { name: "Unisex", label: "Unisex" },
                                    {
                                      name: "Women's Shoes",
                                      label: "Women's Shoes",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Gender === area.name
                                          }
                                          onChange={handleGenderChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Features </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Lightweight",
                                      label: "Lightweight",
                                    },
                                    {
                                      name: "Breathable",
                                      label: "Breathable",
                                    },
                                    {
                                      name: "Water-Resistant",
                                      label: "Water-Resistant",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Features === area.name
                                          }
                                          onChange={handleFeaturesChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Availability </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "In Stock",
                                      label: "In Stock",
                                    },
                                    {
                                      name: "Limited Edition",
                                      label: "Limited Edition",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Availability === area.name
                                          }
                                          onChange={handleAvailabilityChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Color Options </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Black/White",
                                      label: "Black/White",
                                    },
                                    {
                                      name: "Blue/Yellow",
                                      label: "Blue/Yellow",
                                    },
                                    {
                                      name: "Red/Gray",
                                      label: "Red/Gray",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.ColorOptions === area.name
                                          }
                                          onChange={handleColorOptionsChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                          <div className="card">
                            <div className="card-header">
                              <h4>Add Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Sell", label: "Sell" },
                                    { name: "Rent", label: "Rent" },
                                    { name: "Wanted", label: "Wanted" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Purpose === area.name
                                          }
                                          onChange={handlePurposeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Condition</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "New",
                                      label: "New",
                                    },
                                    {
                                      name: "Used",
                                      label: "Used",
                                    },
                                    { name: "Manual", label: "Manual" },
                                  ].map((feature) => (
                                    <li key={feature.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={feature.name}
                                          checked={
                                            formData.Condition === feature.name
                                          }
                                          onChange={handleCondition} // ✅ Fixed function name
                                        />
                                        <span className="checkmark" />{" "}
                                        {feature.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Seller Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Brand Seller",
                                      label: "Brand Seller",
                                    },
                                    {
                                      name: "Individuals",
                                      label: "Individuals",
                                    },
                                    { name: "Retailer", label: "Retailer" },
                                    {
                                      name: "Marketplace",
                                      label: "Marketplace",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.SellerType === area.name
                                          }
                                          onChange={handleSellerTypeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                        </>
                      ) : [
                          "Sheep",
                          "Goats",
                          "Parrot",
                          "Dove/Pigeon",
                          "Cats",
                          "Chickens",
                          "Camels",
                          "Horses",
                          "Dogs",
                          "Cows",
                          "Fish & Turtles",
                          "Rabbits",
                          "Ducks",
                          "Squirrels",
                          "Hamsters",
                          "Fur",
                        ].some(
                          (item) =>
                            item === Category.SubCategory ||
                            item === DataCatorgySHow
                        ) ? (
                        <>
                          {" "}
                          {/* <div className="card">
                    <div className="card-header">
                      <h4>States </h4>
                    </div>
                    <div className="card-body">
                      <div className="form-group featuresform-list mb-0">
                        <ul>
                          {[
                            { name: "California", label: "California" },
                            { name: "Texas", label: "Texas" },
                            { name: "Newyork", label: "Newyork" },
                            { name: "Florida", label: "Florida" },
                            { name: "Illinois", label: "Illinois" },
                          ].map((area) => (
                            <li key={area.name}>
                              <label className="custom_check">
                                <input
                                  type="checkbox"
                                  name={area.name}
                                  checked={formData.States === area.name}
                                  onChange={handleStatesChange}
                                />
                                <span className="checkmark" /> {area.label}
                              </label>
                            </li>
                          ))}
                        </ul>
                        <div className="clearfix" />
                      </div>
                    </div>
                  </div> */}
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Breed </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "German Shepherd",
                                      label: "German Shepherd",
                                    },
                                    {
                                      name: "Labrador Retriever",
                                      label: "Labrador Retriever",
                                    },
                                    {
                                      name: "Golden Retriever",
                                      label: "Golden Retriever",
                                    },
                                    { name: "Beagle", label: "Beagle" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={formData.Breed === area.name}
                                          onChange={handleBreedChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                          <div className="card">
                            <div className="card-header">
                              <h4>Age </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Puppy (0–1 year)",
                                      label: "Puppy (0–1 year)",
                                    },
                                    {
                                      name: "Young (1–3 years)",
                                      label: "Young (1–3 years)",
                                    },
                                    {
                                      name: "Adult (3–6 years)",
                                      label: "Adult (3–6 years)",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={formData.Age === area.name}
                                          onChange={handleAgeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Add Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Sell", label: "Sell" },
                                    { name: "Exchange", label: "Exchange" },
                                    { name: "Wanted", label: "Wanted" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Purpose === area.name
                                          }
                                          onChange={handlePurposeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Gender </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Male", label: "Male" },
                                    { name: "Female", label: "Female" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Gender === area.name
                                          }
                                          onChange={handleGenderChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Color </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Yellow", label: "Yellow" },
                                    { name: "Black", label: "Black" },
                                    {
                                      name: "Chocolate",
                                      label: "Chocolate",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={formData.Color === area.name}
                                          onChange={handleColorChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Size </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Small (10–20 lbs)",
                                      label: "Small (10–20 lbs)",
                                    },
                                    {
                                      name: "Medium (20–50 lbs)",
                                      label: "Medium (20–50 lbs)",
                                    },
                                    {
                                      name: "Large (50–80 lbs)",
                                      label: "Large (50–80 lbs)",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={formData.Size === area.name}
                                          onChange={handleSizeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Temperament </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Friendly",
                                      label: "Friendly",
                                    },
                                    {
                                      name: "Protective",
                                      label: "Protective",
                                    },
                                    {
                                      name: "Playful",
                                      label: "Playful",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Temperament === area.name
                                          }
                                          onChange={handleTemperamentChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Health Status </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Spayed/Neutered",
                                      label: "Spayed/Neutered",
                                    },
                                    {
                                      name: "Vaccinated",
                                      label: "Vaccinated",
                                    },
                                    {
                                      name: "Dewormed",
                                      label: "Dewormed",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.HealthStatus === area.name
                                          }
                                          onChange={handleHealthStatusChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Training Level </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Untrained",
                                      label: "Untrained",
                                    },
                                    {
                                      name: "Basic Commands",
                                      label: "Basic Commands",
                                    },
                                    {
                                      name: "Fully Trained",
                                      label: "Fully Trained",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.TrainingLevel === area.name
                                          }
                                          onChange={handleTrainingLevelChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Dietary Preferences </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Grain-Free Diet",
                                      label: "Grain-Free Diet",
                                    },
                                    {
                                      name: "Standard Dog Food",
                                      label: "Standard Dog Food",
                                    },
                                    {
                                      name: "Organic Food",
                                      label: "Organic Food",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.DietaryPreferences ===
                                            area.name
                                          }
                                          onChange={
                                            handleDietaryPreferencesChange
                                          }
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Seller Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Brand Seller",
                                      label: "Brand Seller",
                                    },
                                    {
                                      name: "Individuals",
                                      label: "Individuals",
                                    },
                                    { name: "Retailer", label: "Retailer" },
                                    {
                                      name: "Marketplace",
                                      label: "Marketplace",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.SellerType === area.name
                                          }
                                          onChange={handleSellerTypeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                        </>
                      ) : [
                          "Watches",
                          "Perfumes & Incense",
                          "Sports Equipment",
                          "Men's Fashion",
                          "Women's Fashion",
                          "Children's Clothing & Accessories",
                          "Sleepwear",
                          "Gifts",
                          "Luggage",
                          "Health & Beauty",
                        ].some(
                          (item) =>
                            item === Category.SubCategory ||
                            item === DataCatorgySHow
                        ) ? (
                        <>
                          {/* <div className="card">
                    <div className="card-header">
                      <h4>States </h4>
                    </div>
                    <div className="card-body">
                      <div className="form-group featuresform-list mb-0">
                        <ul>
                          {[
                            { name: "California", label: "California" },
                            { name: "Texas", label: "Texas" },
                            { name: "Newyork", label: "Newyork" },
                            { name: "Florida", label: "Florida" },
                            { name: "Illinois", label: "Illinois" },
                          ].map((area) => (
                            <li key={area.name}>
                              <label className="custom_check">
                                <input
                                  type="checkbox"
                                  name={area.name}
                                  checked={formData.States === area.name}
                                  onChange={handleStatesChange}
                                />
                                <span className="checkmark" /> {area.label}
                              </label>
                            </li>
                          ))}
                        </ul>
                        <div className="clearfix" />
                      </div>
                    </div>
                  </div> */}
                          <div className="card">
                            <div className="card-header">
                              <h4>Category </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Nature & Wildlife",
                                      label: "Nature & Wildlife",
                                    },
                                    {
                                      name: "History & Culture",
                                      label: "History & Culture",
                                    },
                                    {
                                      name: "Science & Technology",
                                      label: "Science & Technology",
                                    },
                                    {
                                      name: "Travel & Adventure",
                                      label: "Travel & Adventure",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.MAGAZINESCategory ===
                                            area.name
                                          }
                                          onChange={
                                            handleMAGAZINESCategoryChange
                                          }
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Subscription Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Digital",
                                      label: "Digital",
                                    },
                                    {
                                      name: "Print",
                                      label: "Print",
                                    },
                                    {
                                      name: "Combo",
                                      label: "Combo",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.SubscriptionType ===
                                            area.name
                                          }
                                          onChange={
                                            handleSubscriptionTypeChange
                                          }
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Issue Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Special Editions",
                                      label: "Special Editions",
                                    },
                                    {
                                      name: "Back Issues",
                                      label: "Back Issues",
                                    },
                                    {
                                      name: "Current Issue",
                                      label: "Current Issue",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.IssueType === area.name
                                          }
                                          onChange={handleIssueTypeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Language</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "English", label: "English" },
                                    {
                                      name: "Spanish",
                                      label: "Spanish",
                                    },
                                    {
                                      name: "French",
                                      label: "French",
                                    },
                                    {
                                      name: "Other",
                                      label: "Other",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Language === area.name
                                          }
                                          onChange={handleLanguageChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Age Group</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Kids", label: "Kids" },
                                    {
                                      name: "Adults",
                                      label: "Adults",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.AgeGroup === area.name
                                          }
                                          onChange={handleAgeGroupChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Seller Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Brand Seller",
                                      label: "Brand Seller",
                                    },
                                    {
                                      name: "Individuals",
                                      label: "Individuals",
                                    },
                                    { name: "Retailer", label: "Retailer" },
                                    {
                                      name: "Marketplace",
                                      label: "Marketplace",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.SellerType === area.name
                                          }
                                          onChange={handleSellerTypeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                        </>
                      ) : Category.SubCategory === "Home Services" ||
                        Category.SubCategory === "Personal Services" ? (
                        //  Category === "Household"

                        <>
                          {/* <div className="card">
                    <div className="card-header">
                      <h4>States </h4>
                    </div>
                    <div className="card-body">
                      <div className="form-group featuresform-list mb-0">
                        <ul>
                          {[
                            { name: "California", label: "California" },
                            { name: "Texas", label: "Texas" },
                            { name: "Newyork", label: "Newyork" },
                            { name: "Florida", label: "Florida" },
                            { name: "Illinois", label: "Illinois" },
                          ].map((area) => (
                            <li key={area.name}>
                              <label className="custom_check">
                                <input
                                  type="checkbox"
                                  name={area.name}
                                  checked={formData.States === area.name}
                                  onChange={handleStatesChange}
                                />
                                <span className="checkmark" /> {area.label}
                              </label>
                            </li>
                          ))}
                        </ul>
                        <div className="clearfix" />
                      </div>
                    </div>
                  </div> */}
                          <div className="card">
                            <div className="card-header">
                              <h4>Brand </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Dyson", label: "Dyson" },
                                    { name: "Shark", label: "Shark" },
                                    { name: "Bissell", label: "Bissell" },
                                    { name: "Hoover", label: "Hoover" },
                                    { name: "Miele", label: "Miele" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={formData.Brand === area.name}
                                          onChange={handleBrandChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Noise Level </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Silent (<60 dB)",
                                      label: "Silent (<60 dB)",
                                    },
                                    {
                                      name: "Moderate (60-75 dB)",
                                      label: "Moderate (60-75 dB)",
                                    },
                                    {
                                      name: "Loud (>75 dB)",
                                      label: "Loud (>75 dB)",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.NoiseLevel === area.name
                                          }
                                          onChange={handleNoiseLevelChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Capacity </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Small (up to 1L)",
                                      label: "Small (up to 1L)",
                                    },
                                    {
                                      name: "Medium (1-3L)",
                                      label: "Medium (1-3L)",
                                    },
                                    {
                                      name: "Large (above 3L)",
                                      label: "Large (above 3L)",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Capacity === area.name
                                          }
                                          onChange={handleCapacityChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Upright",
                                      label: "Upright",
                                    },
                                    { name: "Canister", label: "Canister" },
                                    { name: "Handheld", label: "Handheld" },
                                    { name: "Stick", label: "Stick" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={formData.Type === area.name}
                                          onChange={handleTypedChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Power Source </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Corded",
                                      label: "Corded",
                                    },
                                    { name: "Cordless", label: "Cordless" },
                                    {
                                      name: "Battery-Powered",
                                      label: "Battery-Powered",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.PowerSource === area.name
                                          }
                                          onChange={handlePowerSourceChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Bag Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Bagged",
                                      label: "Bagged",
                                    },
                                    { name: "Bagless", label: "Bagless" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.BagType === area.name
                                          }
                                          onChange={handleBagTypeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Surface Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Carpet",
                                      label: "Carpet",
                                    },
                                    { name: "Hardwood", label: "Hardwood" },
                                    { name: "Tile", label: "Tile" },
                                    {
                                      name: "Multi-surface",
                                      label: "Multi-surface",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.BagType === area.name
                                          }
                                          onChange={handleBagTypeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Features </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "HEPA filter",
                                      label: "HEPA filter",
                                    },
                                    {
                                      name: "Pet Hair Cleaning",
                                      label: "Pet Hair Cleaning",
                                    },
                                    {
                                      name: "Lightweight",
                                      label: "Lightweight",
                                    },
                                    {
                                      name: "Smart App Control",
                                      label: "Smart App Control",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Features === area.name
                                          }
                                          onChange={handleFeaturesChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Color </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "White", label: "White" },
                                    { name: "Black", label: "Black" },
                                    { name: "Grey", label: "Grey" },
                                    { name: "Red", label: "Red" },
                                    { name: "Yellow", label: "Yellow" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={formData.Color === area.name}
                                          onChange={handleColorChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          {/* <div className="card">
                            <div className="card-header">
                              <h4>Seller Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Direct owner",
                                      label: "Direct owner",
                                    },
                                    {
                                      name: "Individuals",
                                      label: "Individuals",
                                    },
                                    { name: "Brand", label: "Brand" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.SellerType === area.name
                                          }
                                          onChange={handleSellerTypeChange}
                                        />
                                        <span className="checkmark" />{" "}
                                        {area.label}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div> */}
                        </>
                      ) : (
                        ""
                      )}
                      {/* <div
                        className="form-group formlast-input w-50 d-flex align-items-center"
                        style={{
                          padding: "20px 0 10px 0",
                        }}
                      >
                        <span className="me-auto">
                          {"Phone "}&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                        </span>
                        <div className="mx-auto d-flex align-items-center">
                          <label
                            style={{
                              position: "relative",
                              display: "inline-block",
                              width: "40px",
                              height: "23px",
                              marginRight: "10px",
                              width: "3rem",
                              marginBottom: "0", // Space between switch and text
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={!showPhone}
                              onChange={() => setShowPhone(!showPhone)}
                              style={{
                                opacity: 0,
                                width: 0,
                                height: 0,
                              }}
                            />
                            <span
                              style={{
                                position: "absolute",
                                cursor: "pointer",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: !showPhone
                                  ? "#ccc"
                                  : "#2d4495",
                                transition: ".4s",
                                borderRadius: "34px",
                                height: "24px",
                              }}
                            >
                              <span
                                style={{
                                  position: "absolute",
                                  height: "16px",
                                  width: "16px",
                                  left: !showPhone ? "30px" : "4px",
                                  bottom: "4px",
                                  backgroundColor: "white",
                                  transition: ".4s",
                                  borderRadius: "50%",
                                }}
                              />
                            </span>
                          </label>
                          <span>
                            {showPhone ? "Check to hide" : "Check to show"}
                          </span>
                        </div>
                      </div> */}

                      {/* {showPhone && ( */}
                      {/* <>
                        <input
                          type={showPhone ? "text" : "password"} // Change type based on showPhone
                          name="Phone"
                          value={formData.Phone}
                          onChange={handleChangePhone}
                          onBlur={validatePhone} // Validate when user leaves input
                          className="form-control"
                          style={{ width: "50%" }}
                          placeholder="+9665XXXXXXXX"
                          required
                        />
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {Saudinummsg}
                        </p>
                      </> */}

                      <div className="card-body">
                        <div className="row">
                          {/* Phone Field - 6 columns on medium screens and above */}
                          <div className="col-md-6">
                            <div className="form-group">
                              <label
                                className="col-form-label"
                                style={{
                                  padding: "10px 0 0 0",
                                  fontWeight: "bold",
                                  fontSize: "18px",
                                }}
                              >
                                Phone
                              </label>
                              <div
                                style={{ position: "relative", width: "100%" }}
                              >
                                <input
                                  type={showPhone ? "text" : "password"} // Toggle type based on showPhone
                                  name="Phone"
                                  value={formData.Phone}
                                  onChange={handleChangePhone}
                                  onBlur={validatePhone} // Validate when user leaves input
                                  className="form-control"
                                  placeholder="+9665XXXXXXXX"
                                  maxLength="13" // Restrict input to 13 characters
                                  required
                                  style={{
                                    paddingRight: "30px", // Make space for the icon
                                    paddingLeft: "10px", // Add left padding for better appearance
                                    width: "100%", // Ensure input takes full width
                                    boxSizing: "border-box", // Prevent padding from affecting width
                                    height: "48px", // Default height (~24px) doubled to 48px
                                    fontSize: "16px", // Ensure text remains readable
                                    lineHeight: "48px", // Vertically center text in the taller input
                                  }}
                                />
                                <span
                                  onClick={() => setShowPhone(!showPhone)}
                                  style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    color: "#666",
                                  }}
                                >
                                  {showPhone ? "👁️‍🗨️" : "👁️"}{" "}
                                  {/* Unicode eye icons */}
                                </span>
                              </div>
                              <p style={{ color: "red", fontSize: "12px" }}>
                                {Saudinummsg}
                              </p>
                            </div>
                          </div>

                          {/* Price Range Field - 6 columns on medium screens and above */}
                          <div className="col-md-6">
                            <div className="form-group">
                              <label
                                className="col-form-label"
                                style={{
                                  padding: "10px 0 0 0",
                                  fontWeight: "bold",
                                  fontSize: "18px",
                                }}
                              >
                                Price Range
                              </label>
                              <div
                                style={{ position: "relative", width: "100%" }}
                              >
                                <input
                                  type={showPrice ? "text" : "password"} // Toggle type based on showPrice
                                  name="Price"
                                  value={formData.Price}
                                  onChange={handleChange}
                                  placeholder="Price"
                                  maxLength="13" // Restrict input to 13 characters
                                  required
                                  style={{
                                    paddingRight: "30px", // Make space for the icon
                                    paddingLeft: "10px", // Optional: Add left padding for better appearance
                                    width: "100%", // Full width as previously set
                                    boxSizing: "border-box", // Prevent padding from affecting width
                                    height: "48px", // Default height (~24px) doubled to 48px
                                    fontSize: "16px", // Ensure text remains readable
                                    lineHeight: "48px", // Vertically center text in the taller input
                                  }}
                                />
                                <span
                                  onClick={() => setShowPrice(!showPrice)}
                                  style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    color: "#666",
                                  }}
                                >
                                  {showPrice ? "👁️‍🗨️" : "👁️"}{" "}
                                  {/* Unicode eye icons */}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="form-group">
                      <label
                        className="col-form-label"
                        style={{
                          padding: "10px 0 0 0",
                          fontWeight: "bold",
                          fontSize: "18px",
                        }}
                      >
                        Listing Description :
                      </label>
                      <textarea
                        rows={6}
                        name="description"
                        className="form-control listingdescription"
                        placeholder="Message"
                        value={formData.description}
                        onChange={(e) => {
                          const text = e.target.value;
                          // Count only alphabetic characters (a-z, A-Z)
                          const alphaCount = (text.match(/[a-zA-Z]/g) || [])
                            .length;
                          if (alphaCount <= 1000) {
                            handleChange(e); // Update state only if within limit
                          }
                        }}
                      />
                      {/* Display alphabetic character count and warning */}
                      <div style={{ marginTop: "5px", fontSize: "12px" }}>
                        <span>
                          Characters:{" "}
                          {
                            (formData.description.match(/[a-zA-Z]/g) || [])
                              .length
                          }
                          /1000
                        </span>
                        {(formData.description.match(/[a-zA-Z]/g) || [])
                          .length > 1000 && (
                          <span style={{ color: "red", marginLeft: "10px" }}>
                            Alphabetic character limit exceeded! Maximum 100
                            allowed.
                          </span>
                        )}
                      </div>
                    </div>

                    {/* <div className="row">
                    <div className="p-4" style={{ marginTop: "-1rem" }}>
                      <h4 className="text-lg font-bold mb-2">
                        Select a Country
                      </h4>
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
                          <h5 className="text-md font-semibold mb-2">
                            Cities in {selectedCountry.label}
                          </h5>
                          <Select
                            options={cities.map((city) => ({
                              value: city.name,
                              label: city.name,
                            }))}
                            value={selectedCity}
                            onChange={handleCityChange}
                            placeholder="Select a city..."
                            isClearable
                            className="w-full"
                          />
                        </div>
                      )}
                    </div>
                  </div> */}
                  </div>
                </div>
                <div className="card" style={{ marginTop: "5px" }}>
                  <div className="card-header">
                    <h4>Featured </h4>
                  </div>
                  <div className="card-body">
                    <div className="form-group featuresform-list mb-0">
                      <ul>
                        {[
                          { name: "Featured Ads", label: "Featured Ads" },
                          {
                            name: "Not Featured Ads",
                            label: "Not Featured Ads",
                          },
                        ].map((area) => (
                          <li key={area.name}>
                            <label className="custom_check">
                              <input
                                type="checkbox"
                                name={area.name}
                                checked={formData.FeaturedAds === area.name}
                                onChange={handleFeaturedAdsChange}
                              />
                              <span className="checkmark" /> {area.label}
                            </label>
                          </li>
                        ))}
                      </ul>
                      <div className="clearfix" />
                    </div>
                  </div>
                </div>

                {showPayment && (
                  <Elements stripe={stripePromise}>
                    <PaymentForm 
                    getpaymentSuccess={setPaymentSuccess}
            />
                  </Elements>
                )}
                <div
                  className="settings-upload-btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked((prev) => !prev)}
                    style={{
                      marginTop: "15px",
                      width: "20px", // Increase the width
                      height: "20px", // Increase the height
                    }}
                  />
                  <label
                    style={{
                      fontSize: "24px",
                      marginTop: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    <Link
                      to="/TermsAndConditions"
                      style={{
                        textDecoration: "underline",
                        color: "#2d4495", // Blue color to indicate a link
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.textDecoration = "none")
                      } // Remove underline on hover
                      onMouseLeave={(e) =>
                        (e.target.style.textDecoration = "underline")
                      } // Restore underline
                    >
                      Agree to terms and conditions
                    </Link>
                  </label>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={uploading || !isChecked || (showPayment && !paymentSuccess)} // Disable if uploading or checkbox is unchecked
                  className="btn"
                  style={{ backgroundColor: "#2d4495", color: "white" }}
                  type="button"
                >
                  {_Id ? "Update" : "Submit"}
                </button>
                {/* {error && (
  <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>
)} */}
                {/* ✅ Show error message */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Profile Content */}
      <Footer />
    </>
  );
};
export default AddLisiting;
