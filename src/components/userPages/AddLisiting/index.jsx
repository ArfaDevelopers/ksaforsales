import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/FirebaseConfig"; // Ensure the correct Firebase import
import { db } from "./../../Firebase/FirebaseConfig.jsx";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Select from "react-select";
import { Country, City, State } from "country-state-city";
import {  useParams } from "react-router-dom";


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
    kmDriven: "",
    Transmission: "",
    Emirates: "",
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

    Bedroom: "",

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
    Color: "",
    OperatingSystem: "",
    Processor: "",
    RAM: "",
    StorageType: "",
    Storagecapacity: "",
    GraphicsCard: "",

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
  console.log(citiesMake,'subcategories____1')

  const [Make, setSelectedCityMake] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  console.log(subcategories,'subcategories____')
  // const districtOptions = [
  //   {
  //     value: "Al Safa, Jeddah, Saudi Arabia",
  //     label: "Al Safa, Jeddah, Saudi Arabia",
  //   },
  //   {
  //     value: "Al Faisaliyah, Dammam, Saudi Arabia",
  //     label: "Al Faisaliyah, Dammam, Saudi Arabia",
  //   },
  //   {
  //     value: "North Ghurāb Lighthouse, Umarah Ibn Ghurab, Jeddah, Saudi Arabia",
  //     label: "North Ghurāb Lighthouse, Umarah Ibn Ghurab, Jeddah, Saudi Arabia",
  //   },
  //   {
  //     value: "Al Faisaliyah, Al Qurayyat, Saudi Arabia",
  //     label: "Al Faisaliyah, Al Qurayyat, Saudi Arabia",
  //   },
  //   {
  //     value: "Industrial Area No 1, Dammam, Saudi Arabia",
  //     label: "Industrial Area No 1, Dammam, Saudi Arabia",
  //   },
  //   {
  //     value: "Anak, Saudi Arabia",
  //     label: "Anak, Saudi Arabia",
  //   },
  //   {
  //     value: "Awwad, Ar Rayyan, Riyadh, Saudi Arabia",
  //     label: "Awwad, Ar Rayyan, Riyadh, Saudi Arabia",
  //   },
  // ];

const districtOptions = [
  { value: "Al Nakhil", label: "Al Nakhil" },
  { value: "King Abdulaziz", label: "King Abdulaziz" },
  { value: "Khurda and Ushayran", label: "Khurda and Ushayran" },
  { value: "Al Qadisiyah", label: "Al Qadisiyah" },
  { value: "An Nahdah", label: "An Nahdah" },
  { value: "Al Wurud", label: "Al Wurud" },
  { value: "Al Sahrah", label: "Al Sahrah" },
  { value: "Zamiqa", label: "Zamiqa" },
  { value: "Al Quds", label: "Al Quds" },
  { value: "Al Muntazah", label: "Al Muntazah" },
  { value: "Ar Rawdah", label: "Ar Rawdah" },
  { value: "Al Qatar", label: "Al Qatar" },
  { value: "Al Mustaqbal", label: "Al Mustaqbal" },
  { value: "Al Jufaidariyah", label: "Al Jufaidariyah" },
  { value: "Al Andalus", label: "Al Andalus" },
  { value: "King Faisal", label: "King Faisal" },
  { value: "Dst C14", label: "Dst C14" },
  { value: "Subdivision No. 1452", label: "Subdivision No. 1452" },
  { value: "Qubbiban", label: "Qubbiban" },
  { value: "Subdivision No. 802", label: "Subdivision No. 802" },
  { value: "Subdivision No. 1141", label: "Subdivision No. 1141" },
  { value: "Sahara", label: "Sahara" },
  { value: "Al Zaeiba", label: "Al Zaeiba" },
  { value: "Mishrifah", label: "Mishrifah" },
  { value: "Al Uaybah", label: "Al Uaybah" },
  { value: "Al Khalil", label: "Al Khalil" },
  { value: "King Fahd", label: "King Fahd" },
  { value: "King Abdullah", label: "King Abdullah" },
  { value: "Al Jamarah", label: "Al Jamarah" },
  { value: "Ad Dar Al Baida", label: "Ad Dar Al Baida" },
  { value: "Industrial", label: "Industrial" },
  { value: "Ar Rifa", label: "Ar Rifa" },
  { value: "Najd", label: "Najd" },
  { value: "Al Yarmuk", label: "Al Yarmuk" },
  { value: "Al Mathnah", label: "Al Mathnah" },
  { value: "An Nuzhah", label: "An Nuzhah" },
  { value: "King Abdullah1", label: "King Abdullah1" },
  { value: "Ishbilliyah", label: "Ishbilliyah" },
  { value: "Al Faisaliyah", label: "Al Faisaliyah" },
  { value: "Al Malik", label: "Al Malik" },
  { value: "Al Olaya", label: "Al Olaya" },
  { value: "Al Masif", label: "Al Masif" },
  { value: "second industrial", label: "second industrial" },
  { value: "Al Basirah", label: "Al Basirah" },
  { value: "Al Yarmuk", label: "Al Yarmuk" },
  { value: "Alkah", label: "Alkah" },
  { value: "Al Faisaliyah", label: "Al Faisaliyah" },
  { value: "Al Masil", label: "Al Masil" },
  { value: "Al Mithalliah", label: "Al Mithalliah" },
  { value: "Al Wahah", label: "Al Wahah" },
  { value: "Hijrat Salim", label: "Hijrat Salim" },
  { value: "Ash Shifa", label: "Ash Shifa" },
  { value: "Al Jazirah", label: "Al Jazirah" },
  { value: "Al Masif", label: "Al Masif" },
  { value: "Al Qirawan", label: "Al Qirawan" },
  { value: "Ar Rabwah", label: "Ar Rabwah" },
  { value: "Al Fursan", label: "Al Fursan" },
  { value: "Down Town", label: "Down Town" },
  { value: "Al Mujial", label: "Al Mujial" },
  { value: "Al Muruj", label: "Al Muruj" },
  { value: "Barq Al Khayl", label: "Barq Al Khayl" },
  { value: "As Saadah", label: "As Saadah" },
  { value: "An Nahdah", label: "An Nahdah" },
  { value: "Al Baladiyah Subdivision", label: "Al Baladiyah Subdivision" },
  { value: "Al Mustaqbal", label: "Al Mustaqbal" },
  { value: "Al Urania", label: "Al Urania" },
  { value: "Subdivision No. 1209", label: "Subdivision No. 1209" },
  { value: "Al Marqab", label: "Al Marqab" },
  { value: "Al Andalus", label: "Al Andalus" },
  { value: "Al Cladisiyah", label: "Al Cladisiyah" },
  { value: "Subdivision 638", label: "Subdivision 638" },
  { value: "subdivision 1075", label: "subdivision 1075" },
  { value: "Al Nakhil", label: "Al Nakhil" },
  { value: "Al Ghadir", label: "Al Ghadir" },
  { value: "Al Muntazah", label: "Al Muntazah" },
  { value: "Al Mufjir", label: "Al Mufjir" },
  { value: "Ad Dirah", label: "Ad Dirah" },
  { value: "Al Nakhil", label: "Al Nakhil" },
  { value: "Subdivision No. 0832", label: "Subdivision No. 0832" },
  { value: "Umm Samra", label: "Umm Samra" },
  { value: "East Administrative", label: "East Administrative" },
  { value: "Al Sharaqa", label: "Al Sharaqa" },
  { value: "Al Zuwayra", label: "Al Zuwayra" },
  { value: "An Nada", label: "An Nada" },
  { value: "King Fahd", label: "King Fahd" },
  { value: "Al Andalus", label: "Al Andalus" },
  { value: "King Salman", label: "King Salman" },
  { value: "Urierah", label: "Urierah" },
  { value: "Al Faisaliyah", label: "Al Faisaliyah" },
  { value: "Al Ghidab", label: "Al Ghidab" },
  { value: "Al Tadmun", label: "Al Tadmun" },
  { value: "Al Farah Al Shamali", label: "Al Farah Al Shamali" },
  { value: "Al Majd", label: "Al Majd" },
  { value: "Al Malqa", label: "Al Malqa" },
  { value: "Meakal", label: "Meakal" },
  { value: "West Naseem", label: "West Naseem" },
  { value: "Ar Rayah", label: "Ar Rayah" },
  { value: "Ar Rahbah", label: "Ar Rahbah" },
  { value: "Badr", label: "Badr" },
  { value: "An Nuzhah", label: "An Nuzhah" },
  { value: "An Nahdah", label: "An Nahdah" },
  { value: "Al Majd", label: "Al Majd" },
  { value: "Ar Rayaan", label: "Ar Rayaan" },
  { value: "Al Aziziyah", label: "Al Aziziyah" },
  { value: "Al Awaimer", label: "Al Awaimer" },
  { value: "Al Hazm", label: "Al Hazm" },
  { value: "Al Salem", label: "Al Salem" },
  { value: "Al Muhammadiyah", label: "Al Muhammadiyah" },
  { value: "Al Farah Al Sharqia", label: "Al Farah Al Sharqia" },
  { value: "Al Luluah", label: "Al Luluah" },
  { value: "Al Riyn Al Aelaa", label: "Al Riyn Al Aelaa" },
  { value: "Al Sahab", label: "Al Sahab" },
  { value: "Ar Rimal", label: "Ar Rimal" },
  { value: "King Abdullah City for Energy", label: "King Abdullah City for Energy" },
  { value: "Al Basatin", label: "Al Basatin" },
  { value: "Al Maizialah", label: "Al Maizialah" },
  { value: "New Industrial", label: "New Industrial" },
  { value: "Al Lidam Al Shamali", label: "Al Lidam Al Shamali" },
  { value: "Sinaiyah Al Sharafa", label: "Sinaiyah Al Sharafa" },
  { value: "As Saudia", label: "As Saudia" },
  { value: "Ar Rawabi", label: "Ar Rawabi" },
  { value: "Al Khair", label: "Al Khair" },
  { value: "Subdivision 326", label: "Subdivision 326" },
  { value: "Ninety", label: "Ninety" },
  { value: "Ash Shrouk", label: "Ash Shrouk" },
  { value: "Ohod", label: "Ohod" },
  { value: "Al Farouk", label: "Al Farouk" },
  { value: "Al Yamamah", label: "Al Yamamah" },
  { value: "Al Dubiyah", label: "Al Dubiyah" },
  { value: "Al Nadwah", label: "Al Nadwah" },
  { value: "Al Sholah", label: "Al Sholah" },
  { value: "Al Lidam Al Janubi", label: "Al Lidam Al Janubi" },
  { value: "Nieam", label: "Nieam" },
  { value: "Al Muetala", label: "Al Muetala" },
  { value: "As Sulaymaniyah University City", label: "As Sulaymaniyah University City" },
  { value: "Subdivision No. 980", label: "Subdivision No. 980" },
  { value: "Subdivision No. 250 A", label: "Subdivision No. 250 A" },
  { value: "Ad Darib", label: "Ad Darib" },
  { value: "Al Uraija", label: "Al Uraija" },
  { value: "Mansuriyah", label: "Mansuriyah" },
{ value: "Al Falah", label: "Al Falah" },
{ value: "Ar Rawabi", label: "Ar Rawabi" },
{ value: "Al Jamiah", label: "Al Jamiah" },
{ value: "Al Khalidiyah", label: "Al Khalidiyah" },
{ value: "Al Qura", label: "Al Qura" },
{ value: "An Nuzhah", label: "An Nuzhah" },
{ value: "Al Quds", label: "Al Quds" },
{ value: "Al Iskan Al Khairi", label: "Al Iskan Al Khairi" },
{ value: "An Nahdah", label: "An Nahdah" },
{ value: "Jareer", label: "Jareer" },
{ value: "Manfuhah", label: "Manfuhah" },
{ value: "Al Mursalat", label: "Al Mursalat" },
{ value: "Mazal", label: "Mazal" },
{ value: "Al Khuzama", label: "Al Khuzama" },
{ value: "Al Yasmin", label: "Al Yasmin" },
{ value: "Subdivision No. 913", label: "Subdivision No. 913" },
{ value: "An Nahdah", label: "An Nahdah" },
{ value: "Al Aziziyah", label: "Al Aziziyah" },
{ value: "Al Khalidiyah", label: "Al Khalidiyah" },
{ value: "Al Mashriq", label: "Al Mashriq" },
{ value: "Assafarat", label: "Assafarat" },
{ value: "Ash Shumu", label: "Ash Shumu" },
{ value: "Az Zahra", label: "Az Zahra" },
{ value: "King Fahd", label: "King Fahd" },
{ value: "Ar Rawdah", label: "Ar Rawdah" },
{ value: "Al Wahah", label: "Al Wahah" },
{ value: "An Nada", label: "An Nada" },
{ value: "Industrial Saqra", label: "Industrial Saqra" },
{ value: "Al Khalidiyah", label: "Al Khalidiyah" },
{ value: "Al Khalij", label: "Al Khalij" },
{ value: "Al Olaya", label: "Al Olaya" },
{ value: "Al Wurud", label: "Al Wurud" },
{ value: "Faydat Al Fawazin", label: "Faydat Al Fawazin" },
{ value: "Ad Danah", label: "Ad Danah" },
{ value: "Dst C5", label: "Dst C5" },
{ value: "The northern fiftieths", label: "The northern fiftieths" },
{ value: "Al Khuzama", label: "Al Khuzama" },
{ value: "King Faisal", label: "King Faisal" },
{ value: "Qurtubah", label: "Qurtubah" },
{ value: "As Salam", label: "As Salam" },
{ value: "Al Hilali", label: "Al Hilali" },
{ value: "Bihady", label: "Bihady" },
{ value: "Al Usaylah", label: "Al Usaylah" },
{ value: "As Safa", label: "As Safa" },
{ value: "Al Hoymel", label: "Al Hoymel" },
{ value: "Al Fath", label: "Al Fath" },
{ value: "Subdivision 699", label: "Subdivision 699" },
{ value: "Subdivision No. 247", label: "Subdivision No. 247" },
{ value: "As Safa", label: "As Safa" },
{ value: "Ar Rabie", label: "Ar Rabie" },
{ value: "Al Oud", label: "Al Oud" },
{ value: "Al Hazm", label: "Al Hazm" },
{ value: "Al Masani", label: "Al Masani" },
{ value: "An Nuzhah", label: "An Nuzhah" },
{ value: "Al Munisiyah", label: "Al Munisiyah" },
{ value: "Industrial Subdivision No. 232", label: "Industrial Subdivision No. 232" },
{ value: "Al Diriyah", label: "Al Diriyah" },
{ value: "Al Farouk", label: "Al Farouk" },
{ value: "Al Muntazah", label: "Al Muntazah" },
{ value: "Al Raed", label: "Al Raed" },
{ value: "As Salam", label: "As Salam" },
{ value: "Al Muruj", label: "Al Muruj" },
{ value: "Al Khalij", label: "Al Khalij" },
{ value: "Al Wahah", label: "Al Wahah" },
{ value: "Al Khalidiyah", label: "Al Khalidiyah" },
{ value: "Al Quds", label: "Al Quds" },
{ value: "King Fahd", label: "King Fahd" },
{ value: "Qurtubah", label: "Qurtubah" },
{ value: "An Noor", label: "An Noor" },
{ value: "Al Zuhur", label: "Al Zuhur" },
{ value: "Al Iskan", label: "Al Iskan" },
{ value: "Ar Rif", label: "Ar Rif" },
{ value: "Dst C3", label: "Dst C3" },
{ value: "An Nuzhah", label: "An Nuzhah" },
{ value: "King Abdulaziz", label: "King Abdulaziz" },
{ value: "King Fahd", label: "King Fahd" },
{ value: "Al Muruj Military College", label: "Al Muruj Military College" },
{ value: "Al Fayha", label: "Al Fayha" },
{ value: "As Sunbulah", label: "As Sunbulah" },
{ value: "Ghabira", label: "Ghabira" },
{ value: "An Noor", label: "An Noor" },
{ value: "Umm Al Hamam Western", label: "Umm Al Hamam Western" },
{ value: "Al Mathar", label: "Al Mathar" },
{ value: "Manfuha Al Jadidah", label: "Manfuha Al Jadidah" },
{ value: "King Salman", label: "King Salman" },
{ value: "As Salam", label: "As Salam" },
{ value: "Al Qumaysh", label: "Al Qumaysh" },
{ value: "Subdivision No. 725", label: "Subdivision No. 725" },
{ value: "Al Jarradiyah", label: "Al Jarradiyah" },
{ value: "Al Muhammadiyah", label: "Al Muhammadiyah" },
{ value: "Al Fakhriyah", label: "Al Fakhriyah" },
{ value: "Ad Dirah", label: "Ad Dirah" },
{ value: "Al Iskan", label: "Al Iskan" },
{ value: "Al Aziziyah", label: "Al Aziziyah" },
{ value: "Al Marqab", label: "Al Marqab" },
{ value: "Laban", label: "Laban" },
{ value: "Utayqah", label: "Utayqah" },
{ value: "Ar Rayaan", label: "Ar Rayaan" },
{ value: "Skirinah", label: "Skirinah" },
{ value: "An Nada", label: "An Nada" },
{ value: "Al Ghannamiyah", label: "Al Ghannamiyah" },
{ value: "Ohod", label: "Ohod" },
{ value: "An Nahdah", label: "An Nahdah" },
{ value: "Al Ain", label: "Al Ain" },
{ value: "Ash Shifa", label: "Ash Shifa" },
{ value: "Al Izdihar", label: "Al Izdihar" },
{ value: "Al Zuhur", label: "Al Zuhur" },
{ value: "Al Bajadia", label: "Al Bajadia" },
{ value: "Al Yasmin", label: "Al Yasmin" },
{ value: "Al Quds", label: "Al Quds" },
{ value: "Al Badiah", label: "Al Badiah" },
{ value: "Dhahrat Al Awdat Sharq", label: "Dhahrat Al Awdat Sharq" },
{ value: "Al Nakhil", label: "Al Nakhil" },
{ value: "Al Humaydan", label: "Al Humaydan" },
{ value: "Al Tahyif and Al Hadeeb", label: "Al Tahyif and Al Hadeeb" },
{ value: "Subdivision 1041/1043", label: "Subdivision 1041/1043" },
{ value: "As Salhiyah", label: "As Salhiyah" },
{ value: "Ash Shalaal", label: "Ash Shalaal" },
{ value: "Al Msbeh", label: "Al Msbeh" },
{ value: "Ar Rawdah", label: "Ar Rawdah" },
{ value: "An Nasriyah", label: "An Nasriyah" },
{ value: "Ar Rawabi", label: "Ar Rawabi" },
{ value: "Nawara", label: "Nawara" },
{ value: "Al Sabieaa", label: "Al Sabieaa" },
{ value: "Al Ghuwaiba", label: "Al Ghuwaiba" },
{ value: "Nazwaa", label: "Nazwaa" },
{ value: "Dst C8", label: "Dst C8" },
{ value: "Al Shubaanan", label: "Al Shubaanan" },
{ value: "Al Mathnah", label: "Al Mathnah" },
{ value: "As Sahn", label: "As Sahn" },
{ value: "Al Muruj", label: "Al Muruj" },
{ value: "An Nahdah", label: "An Nahdah" },
{ value: "Subdivision No. 120", label: "Subdivision No. 120" },
{ value: "Al Muhammadiyah Warehouse Area", label: "Al Muhammadiyah Warehouse Area" },
{ value: "Banban", label: "Banban" },
{ value: "Al Dhayabia", label: "Al Dhayabia" },
{ value: "As Salhiyah", label: "As Salhiyah" },
{ value: "Ash Shifa", label: "Ash Shifa" },
{ value: "Al Hanabija", label: "Al Hanabija" },
{ value: "Al Khalidiyah", label: "Al Khalidiyah" },
{ value: "Irqah", label: "Irqah" },
{ value: "Ash Shifa", label: "Ash Shifa" },
{ value: "Al Marzoukia", label: "Al Marzoukia" },
{ value: "Al Hamad", label: "Al Hamad" },
{ value: "An Nuzhah", label: "An Nuzhah" },
{ value: "Markh", label: "Markh" },
{ value: "Al Jamiyin", label: "Al Jamiyin" },
{ value: "Ghirnatah", label: "Ghirnatah" },
{ value: "Al Badai'", label: "Al Badai'" },
{ value: "Al Aqabani", label: "Al Aqabani" },
{ value: "Dst C13", label: "Dst C13" },
{ value: "Ad Dirah", label: "Ad Dirah" },
{ value: "Al Yasmin", label: "Al Yasmin" },
{ value: "Al Andalus", label: "Al Andalus" },
{ value: "Al Yasmin", label: "Al Yasmin" },
{ value: "Al Yasmin", label: "Al Yasmin" },
{ value: "Al Nakhil", label: "Al Nakhil" },
{ value: "Al Naseem", label: "Al Naseem" },
{ value: "Al Adel", label: "Al Adel" },
{ value: "Al Mithawia", label: "Al Mithawia" },
{ value: "Al Yasmin", label: "Al Yasmin" },
{ value: "Al Jazirah", label: "Al Jazirah" },
{ value: "Ar Rayaan", label: "Ar Rayaan" },
{ value: "Ar Rabie", label: "Ar Rabie" },
{ value: "Al Saadah", label: "Al Saadah" },
{ value: "Al Rawama", label: "Al Rawama" },
{ value: "Prince Sultan", label: "Prince Sultan" },
{ value: "Al Malaz", label: "Al Malaz" },
{ value: "Dirab", label: "Dirab" },
{ value: "Al Saadah", label: "Al Saadah" },
{ value: "Al Fayha", label: "Al Fayha" },
{ value: "Al Yasmin", label: "Al Yasmin" },
{ value: "Ar Rafiah", label: "Ar Rafiah" },
{ value: "Umm Aneq", label: "Umm Aneq" },
{ value: "Ar Rawdah", label: "Ar Rawdah" },
{ value: "Al Wurud", label: "Al Wurud" },
{ value: "Al Saadah", label: "Al Saadah" },
{ value: "Al Wurud", label: "Al Wurud" },
{ value: "Umm Sariha", label: "Umm Sariha" },
{ value: "At Taawun", label: "At Taawun" },
{ value: "Al Dahou", label: "Al Dahou" },
{ value: "Al Khalij", label: "Al Khalij" },
{ value: "Al Awaly", label: "Al Awaly" },
{ value: "Ar Rafiah", label: "Ar Rafiah" },
{ value: "Taibah", label: "Taibah" },
{ value: "Jabrah", label: "Jabrah" },
{ value: "Al Hilah", label: "Al Hilah" },
{ value: "Asfil Al Batin North", label: "Asfil Al Batin North" },
{ value: "Al Sahafah", label: "Al Sahafah" },
{ value: "Al Badiah", label: "Al Badiah" },
{ value: "Al Aqiq", label: "Al Aqiq" },
{ value: "Ar Rabwah", label: "Ar Rabwah" },
{ value: "Al Masarir", label: "Al Masarir" },
{ value: "Al Muetala", label: "Al Muetala" },
{ value: "Subdivision 525", label: "Subdivision 525" },
{ value: "Subdivision 794", label: "Subdivision 794" },
{ value: "Subdivision 433", label: "Subdivision 433" },
{ value: "Subdivision 331", label: "Subdivision 331" },
{ value: "Ziyad Khudar", label: "Ziyad Khudar" },
{ value: "Al Wizarat", label: "Al Wizarat" },
{ value: "Al Batha", label: "Al Batha" },
{ value: "Al Qadisiyah", label: "Al Qadisiyah" },
{ value: "King Faisal", label: "King Faisal" },
{ value: "At Taawun", label: "At Taawun" },
{ value: "Al Marajim", label: "Al Marajim" },
{ value: "Subdivision 1029", label: "Subdivision 1029" },
{ value: "Ar Rayaan", label: "Ar Rayaan" },
{ value: "Al Khalij", label: "Al Khalij" },
{ value: "Dst 2C", label: "Dst 2C" },
{ value: "Al Ferdous", label: "Al Ferdous" },
{ value: "An Nahdah", label: "An Nahdah" },
{ value: "Al Jazirah", label: "Al Jazirah" },
{ value: "Al Andalus", label: "Al Andalus" },
{ value: "Military School King Abdullah", label: "Military School King Abdullah" },
{ value: "Subdivision 607", label: "Subdivision 607" },
{ value: "Al Faydah 1", label: "Al Faydah 1" },
{ value: "Subdivision No. 653", label: "Subdivision No. 653" },
{ value: "Ar Rabie", label: "Ar Rabie" },
{ value: "Al Yamamah", label: "Al Yamamah" },
{ value: "Ad Dirah", label: "Ad Dirah" },
{ value: "Al Khuzama", label: "Al Khuzama" },
{ value: "Ghirnatah", label: "Ghirnatah" },
{ value: "Hittin", label: "Hittin" },
{ value: "Government Departments King Abdulaziz", label: "Government Departments King Abdulaziz" },
{ value: "Al Hazimia", label: "Al Hazimia" },
{ value: "Al Ghadir", label: "Al Ghadir" },
{ value: "Al Qarina Al Jadida", label: "Al Qarina Al Jadida" },
{ value: "Industrial Al Qadisiyah", label: "Industrial Al Qadisiyah" },
{ value: "Al Hamra", label: "Al Hamra" },
{ value: "As Sulaymaniyah Government Departments", label: "As Sulaymaniyah Government Departments" },
{ value: "Najd", label: "Najd" },
{ value: "Ash Shalaal", label: "Ash Shalaal" },
{ value: "Al Fayha", label: "Al Fayha" },
{ value: "Subdivision 1023", label: "Subdivision 1023" },
{ value: "Al Frosyah", label: "Al Frosyah" },
{ value: "Subdivision No. 1083", label: "Subdivision No. 1083" },
{ value: "Al Fayha", label: "Al Fayha" },
{ value: "Subdivision 1101", label: "Subdivision 1101" },
{ value: "Al Janadriyah", label: "Al Janadriyah" },
{ value: "King Fahd", label: "King Fahd" },
{ value: "An Nafl", label: "An Nafl" },
{ value: "King Abdullah", label: "King Abdullah" },
{ value: "Al Riyn Al Qadim", label: "Al Riyn Al Qadim" },
{ value: "Subdivision No. 621", label: "Subdivision No. 621" },
{ value: "Al Sulay", label: "Al Sulay" },
{ value: "Az Zahir", label: "Az Zahir" },
{ value: "Al Ula", label: "Al Ula" },
{ value: "Al Nakhbah", label: "Al Nakhbah" },
{ value: "Jafara Al Saadan", label: "Jafara Al Saadan" },
{ value: "aistirahat Hamad Al Jibrin", label: "aistirahat Hamad Al Jibrin" },
{ value: "Dst C1", label: "Dst C1" },
{ value: "Al Izdihar", label: "Al Izdihar" },
{ value: "An Narjis", label: "An Narjis" },
{ value: "Al Wadi", label: "Al Wadi" },
{ value: "Al Adhaar", label: "Al Adhaar" },
{ value: "Al Hilah Al Taalieia", label: "Al Hilah Al Taalieia" },
{ value: "Subdivision No. 1039", label: "Subdivision No. 1039" },
{ value: "Subdivision 749", label: "Subdivision 749" },
{ value: "Al Rimayah", label: "Al Rimayah" },
{ value: "Al Murjan", label: "Al Murjan" },
{ value: "Ad Danah", label: "Ad Danah" },
{ value: "Al Haer", label: "Al Haer" },
{ value: "Al Amaar", label: "Al Amaar" },
{ value: "Ar Rahmanyah", label: "Ar Rahmanyah" },
{ value: "Ghirnatah", label: "Ghirnatah" },
{ value: "East Naseem", label: "East Naseem" },
{ value: "Imam Muhammed Bin Saud Islamic University", label: "Imam Muhammed Bin Saud Islamic University" },
{ value: "Al Rafaye", label: "Al Rafaye" },
{ value: "Asfil Al Batin", label: "Asfil Al Batin" },
{ value: "Ar Rawdah", label: "Ar Rawdah" },
{ value: "Subdivision 665", label: "Subdivision 665" },
{ value: "Subdivision No. 1033", label: "Subdivision No. 1033" },
{ value: "Subdivision No. 985", label: "Subdivision No. 985" },
{ value: "Subdivision 1077", label: "Subdivision 1077" },
{ value: "Industrial Al Huzaymiyyah", label: "Industrial Al Huzaymiyyah" },
{ value: "Al Izdihar", label: "Al Izdihar" },
{ value: "Al Qadisiyah", label: "Al Qadisiyah" },
{ value: "Al Olab", label: "Al Olab" },
{ value: "Industrial Mishyrifah", label: "Industrial Mishyrifah" },
{ value: "Al Arid", label: "Al Arid" },
{ value: "Al Manar", label: "Al Manar" },
{ value: "Ar Rafiah", label: "Ar Rafiah" },
{ value: "Al Wurud", label: "Al Wurud" },
{ value: "Al Hisham", label: "Al Hisham" },
{ value: "Al Hazm", label: "Al Hazm" },
{ value: "Hijrat Buda", label: "Hijrat Buda" },
{ value: "Qaedaba", label: "Qaedaba" },
{ value: "Al Sharara Center", label: "Al Sharara Center" },
{ value: "Al Wakf", label: "Al Wakf" },
{ value: "King Saud", label: "King Saud" },
{ value: "Al Muhammadiyah", label: "Al Muhammadiyah" },
{ value: "Suq Al Mashiya", label: "Suq Al Mashiya" },
{ value: "Prince Sultan bin Abdulaziz", label: "Prince Sultan bin Abdulaziz" },
{ value: "Al Fakhriyah", label: "Al Fakhriyah" },
{ value: "Barzan", label: "Barzan" },
{ value: "Al Aziziyah", label: "Al Aziziyah" },
{ value: "Al Raml", label: "Al Raml" },
{ value: "Prince Sultan", label: "Prince Sultan" },
{ value: "Al Midrajia", label: "Al Midrajia" },
{ value: "Qurtubah", label: "Qurtubah" },
{ value: "Al Izdihar", label: "Al Izdihar" },
{ value: "Ar Rayaan", label: "Ar Rayaan" },
{ value: "Subdivision No. 62", label: "Subdivision No. 62" },
{ value: "Al Badi Al Gharbi", label: "Al Badi Al Gharbi" },
{ value: "Al Aziziyah", label: "Al Aziziyah" },
{ value: "Suq Al Mashiya", label: "Suq Al Mashiya" },
{ value: "Ar Raja", label: "Ar Raja" },
{ value: "Al Izdihar", label: "Al Izdihar" },
{ value: "Prince Sultan", label: "Prince Sultan" },
{ value: "King Abdullah", label: "King Abdullah" },
{ value: "Ar Rawdah", label: "Ar Rawdah" },
{ value: "Bahja", label: "Bahja" },
{ value: "Al Tiqniya", label: "Al Tiqniya" },
{ value: "Al Hunu", label: "Al Hunu" },
{ value: "Al Tadamun", label: "Al Tadamun" },
{ value: "Industrial Ad Dirah", label: "Industrial Ad Dirah" },
{ value: "Al Asemah", label: "Al Asemah" },
{ value: "Dst C19", label: "Dst C19" },
{ value: "Umm Selim", label: "Umm Selim" },
{ value: "Dst C11", label: "Dst C11" },
{ value: "Al Qaran", label: "Al Qaran" },
{ value: "Al Hilah", label: "Al Hilah" },
{ value: "Al Zafer", label: "Al Zafer" },
{ value: "Al Tuwbad", label: "Al Tuwbad" },
{ value: "Al Yasmin", label: "Al Yasmin" },
{ value: "Al Olaya", label: "Al Olaya" },
{ value: "Dst C16", label: "Dst C16" },
{ value: "Al Wadaein", label: "Al Wadaein" },
{ value: "Al Nakhil", label: "Al Nakhil" },
{ value: "Thulaim", label: "Thulaim" },
{ value: "Al Hamra", label: "Al Hamra" },
{ value: "Al Khuzama", label: "Al Khuzama" },
{ value: "Ar Rabwah", label: "Ar Rabwah" },
{ value: "Al Yamamah", label: "Al Yamamah" },
{ value: "As Sih", label: "As Sih" },
{ value: "Al Balad", label: "Al Balad" },
{ value: "Al Wusta", label: "Al Wusta" },
{ value: "Al Qadisiyah", label: "Al Qadisiyah" },
{ value: "Tuwaiq", label: "Tuwaiq" },
{ value: "Al Washm", label: "Al Washm" },
{ value: "As Salam", label: "As Salam" },
{ value: "Al Khuzama", label: "Al Khuzama" },
{ value: "Al Faisaliyah", label: "Al Faisaliyah" },
{ value: "Ghirnatah", label: "Ghirnatah" },
{ value: "Hittin", label: "Hittin" },
{ value: "Ar Rafiah", label: "Ar Rafiah" },
{ value: "Al Yasmin", label: "Al Yasmin" },
{ value: "Al Frosyah", label: "Al Frosyah" },
{ value: "Ash Shifa", label: "Ash Shifa" },
{ value: "Al Faisaliyah", label: "Al Faisaliyah" },
{ value: "Al Kharayiq", label: "Al Kharayiq" },
{ value: "Ar Rabie", label: "Ar Rabie" },
{ value: "Al Jazirah", label: "Al Jazirah" },
{ value: "Prince Naif", label: "Prince Naif" },
{ value: "As Sediq", label: "As Sediq" },
{ value: "Al Wurud", label: "Al Wurud" },
{ value: "Dst C9", label: "Dst C9" },
{ value: "Al Hazm", label: "Al Hazm" },
{ value: "Al Wurud", label: "Al Wurud" },
{ value: "Taibah", label: "Taibah" },
{ value: "Al Wasata", label: "Al Wasata" },
{ value: "Sultanah", label: "Sultanah" },
{ value: "Al Qura", label: "Al Qura" },
{ value: "An Namudhajiyah", label: "An Namudhajiyah" },
{ value: "An Narjis", label: "An Narjis" },
{ value: "Ar Risalah", label: "Ar Risalah" },
{ value: "King Khalid International Airport", label: "King Khalid International Airport" },
{ value: "King Faisal", label: "King Faisal" },
{ value: "Al Andalus", label: "Al Andalus" },
{ value: "Al Mishael", label: "Al Mishael" },
{ value: "Namar", label: "Namar" },
{ value: "Olaishah", label: "Olaishah" },
{ value: "Al Suwaidi Al Gharbi", label: "Al Suwaidi Al Gharbi" },
{ value: "Al Aziziyah1", label: "Al Aziziyah1" },
{ value: "Al Bakr", label: "Al Bakr" },
{ value: "Al Masif", label: "Al Masif" },
{ value: "Al Falah", label: "Al Falah" },
{ value: "Subdivision No. 814", label: "Subdivision No. 814" },
{ value: "Al Ammariyah", label: "Al Ammariyah" },
{ value: "An Nuzhah", label: "An Nuzhah" },
{ value: "Al Marja", label: "Al Marja" },
{ value: "Al Masif", label: "Al Masif" },
{ value: "Al Jazirah", label: "Al Jazirah" },
{ value: "Asfil Al Batin Southern", label: "Asfil Al Batin Southern" },
{ value: "Al Wadi", label: "Al Wadi" },
{ value: "Al Nakhil", label: "Al Nakhil" },
{ value: "Al Rashid and Shaye Sahab", label: "Al Rashid and Shaye Sahab" },
{ value: "Al Nakhil", label: "Al Nakhil" },
{ value: "Ar Rayaan", label: "Ar Rayaan" },
{ value: "Ad Dirah Al Qadimah", label: "Ad Dirah Al Qadimah" },
{ value: "Al Faisaliyah", label: "Al Faisaliyah" },
{ value: "Al Muntazah West Administrative", label: "Al Muntazah West Administrative" },
{ value: "Al Wahid", label: "Al Wahid" },
{ value: "Al Quayz", label: "Al Quayz" },
{ value: "Ad Danah Gaslah", label: "Ad Danah Gaslah" },
{ value: "Al Aziziyah", label: "Al Aziziyah" },
{ value: "Subdivision 144", label: "Subdivision 144" },
{ value: "Fireat Al Rumaithi Subdivision", label: "Fireat Al Rumaithi Subdivision" },
{ value: "An Nahdah", label: "An Nahdah" },
{ value: "Qaryuh", label: "Qaryuh" },
{ value: "Al Utifa", label: "Al Utifa" },
{ value: "1st Industrial Al Wurud", label: "1st Industrial Al Wurud" },
{ value: "Al Fayhaniyah", label: "Al Fayhaniyah" },
{ value: "Al Nakhil", label: "Al Nakhil" },
{ value: "Al Wurud", label: "Al Wurud" },
{ value: "Al Muealiq", label: "Al Muealiq" },
{ value: "Subdivision Al Faisaliyah Industrial", label: "Subdivision Al Faisaliyah Industrial" },
{ value: "Al Dabab", label: "Al Dabab" },
{ value: "Al Khalidiyah", label: "Al Khalidiyah" },
{ value: "Al Uyun", label: "Al Uyun" },
{ value: "Al Arid", label: "Al Arid" },
{ value: "Subdivision No. 822", label: "Subdivision No. 822" },
{ value: "An Nahdah", label: "An Nahdah" },
{ value: "Al Fayha", label: "Al Fayha" },
{ value: "Al Qabali", label: "Al Qabali" },
{ value: "Southern Al Muetala", label: "Southern Al Muetala" },
{ value: "Al Wahah", label: "Al Wahah" },
{ value: "Subdivision 1051", label: "Subdivision 1051" },
{ value: "Al Naseem", label: "Al Naseem" },
{ value: "Al Wurud", label: "Al Wurud" },
{ value: "Ash Sharafiyah", label: "Ash Sharafiyah" },
{ value: "Subdivision 94", label: "Subdivision 94" },
{ value: "As Salam Industrial", label: "As Salam Industrial" },
{ value: "Al Aqarn", label: "Al Aqarn" },
{ value: "Subdivision 315", label: "Subdivision 315" },
{ value: "As Salam", label: "As Salam" },
{ value: "Al Silmia", label: "Al Silmia" },
{ value: "Al Wurud", label: "Al Wurud" },
{ value: "Al Yarmuk", label: "Al Yarmuk" },
{ value: "Ar Raihan", label: "Ar Raihan" },
{ value: "Al Rafaye", label: "Al Rafaye" },
{ value: "Al Jamiah", label: "Al Jamiah" },
{ value: "Al Wahah", label: "Al Wahah" },
{ value: "White Land Organization Subdivision1", label: "White Land Organization Subdivision1" },
{ value: "White Land Organization Subdivision2", label: "White Land Organization Subdivision2" },
{ value: "White Land Organization Subdivision3", label: "White Land Organization Subdivision3" },
{ value: "Private Areas Zamzam", label: "Private Areas Zamzam" },
{ value: "Al Muhammadiyah Goverment Departments", label: "Al Muhammadiyah Goverment Departments" },
{ value: "Al Khalidiyah", label: "Al Khalidiyah" },
{ value: "Al Faisaliyah Industrial Area", label: "Al Faisaliyah Industrial Area" },
{ value: "Subdivision 820", label: "Subdivision 820" },
{ value: "Subdivision 908", label: "Subdivision 908" },
{ value: "Subdivision 740", label: "Subdivision 740" },
{ value: "Subdivision 884", label: "Subdivision 884" },
{ value: "King Salman1", label: "King Salman1" },
{ value: "Ad Dirah Al Qadimah1", label: "Ad Dirah Al Qadimah1" },
{ value: "Ar Rawdah", label: "Ar Rawdah" },
{ value: "Ad Dirah Al Duraihemiyah", label: "Ad Dirah Al Duraihemiyah" },
{ value: "Subdivision No. 4", label: "Subdivision No. 4" },
{ value: "Refinement No. 133", label: "Refinement No. 133" },
{ value: "Refinement No. 133", label: "Refinement No. 133" },
{ value: "Subdivision 87", label: "Subdivision 87" },
{ value: "Al Nakhil", label: "Al Nakhil" },
{ value: "Al Aziziyah", label: "Al Aziziyah" },
{ value: "Al Aqiq", label: "Al Aqiq" },
{ value: "Subdivision 886", label: "Subdivision 886" },
{ value: "Subdivision 880", label: "Subdivision 880" },
{ value: "Subdivision 906", label: "Subdivision 906" },
{ value: "Ashuhada", label: "Ashuhada" },
{ value: "Subdivision No. 144", label: "Subdivision No. 144" },
{ value: "Al Fayha", label: "Al Fayha" },
{ value: "Subdivision No. 210", label: "Subdivision No. 210" },
{ value: "Al Khazzan", label: "Al Khazzan" },
{ value: "Ashuhada2", label: "Ashuhada2" },
{ value: "Al Sahafah", label: "Al Sahafah" },
{ value: "Al Awash", label: "Al Awash" },
{ value: "Al Mansurah", label: "Al Mansurah" },
{ value: "Al Iskan", label: "Al Iskan" },
{ value: "Al Khalidiyah", label: "Al Khalidiyah" },
{ value: "King Abdullah", label: "King Abdullah" },
{ value: "Al Khalidiyah", label: "Al Khalidiyah" },
{ value: "East Industrial Area1", label: "East Industrial Area1" },
{ value: "Ash Shifa", label: "Ash Shifa" },
{ value: "Al Aziziyah", label: "Al Aziziyah" },
{ value: "An Nahdah", label: "An Nahdah" },
{ value: "Al Saadah", label: "Al Saadah" },
{ value: "Ash Shamali", label: "Ash Shamali" },
{ value: "Sultanah", label: "Sultanah" },
{ value: "Ar Rafiah", label: "Ar Rafiah" },
{ value: "Al Jamiah", label: "Al Jamiah" },
{ value: "Al Janadriyah", label: "Al Janadriyah" },
{ value: "Al Wadi", label: "Al Wadi" },
{ value: "Al Wasam", label: "Al Wasam" },
{ value: "Al Badiah", label: "Al Badiah" },
{ value: "Government Lands Subdivision2", label: "Government Lands Subdivision2" },
{ value: "Al Mubarraz", label: "Al Mubarraz" },
{ value: "Aqraba'", label: "Aqraba'" },
{ value: "An Nuzhah", label: "An Nuzhah" },
{ value: "Dst C17", label: "Dst C17" },
{ value: "Ashuhada", label: "Ashuhada" },
{ value: "Al Masif", label: "Al Masif" },
{ value: "Al Basatin", label: "Al Basatin" },
{ value: "An Nafl", label: "An Nafl" },
{ value: "Badr", label: "Badr" },
{ value: "An Noor", label: "An Noor" },
{ value: "Samhan", label: "Samhan" },
{ value: "Subdivision 557", label: "Subdivision 557" },
{ value: "Subdivision 415", label: "Subdivision 415" },
{ value: "Al Khalidiyah", label: "Al Khalidiyah" },
{ value: "Al Khalij", label: "Al Khalij" },
{ value: "Al Ruwaysa", label: "Al Ruwaysa" },
{ value: "An Namudhajiyah", label: "An Namudhajiyah" },
{ value: "Al Dabiea", label: "Al Dabiea" },
{ value: "Subdivision 923", label: "Subdivision 923" },
{ value: "Subdivision 543", label: "Subdivision 543" },
{ value: "Subdivision 476", label: "Subdivision 476" },
{ value: "As Salam", label: "As Salam" },
{ value: "Subdivision 1045", label: "Subdivision 1045" },
{ value: "Lubib", label: "Lubib" },
{ value: "Industrial Al Khalij", label: "Industrial Al Khalij" },
{ value: "Al Barqah", label: "Al Barqah" },
{ value: "Al Faisaliyah", label: "Al Faisaliyah" },
{ value: "Al Muutaridah", label: "Al Muutaridah" },
{ value: "Al Faisaliyah Farzan", label: "Al Faisaliyah Farzan" },
{ value: "Al Bada", label: "Al Bada" },
{ value: "Al Yamamah", label: "Al Yamamah" },
{ value: "Al Ghadir", label: "Al Ghadir" },
{ value: "Ar Rayaan", label: "Ar Rayaan" },
{ value: "An Nasifah", label: "An Nasifah" },
{ value: "Ar Rayaan", label: "Ar Rayaan" },
{ value: "Umm Asalam", label: "Umm Asalam" },
{ value: "Eiblia", label: "Eiblia" },
{ value: "Al Andalus", label: "Al Andalus" },
{ value: "Mishrif", label: "Mishrif" },
{ value: "Al Hada", label: "Al Hada" },
{ value: "Al Sahba", label: "Al Sahba" },
{ value: "Al Yarmuk", label: "Al Yarmuk" },
{ value: "Al Muntazah", label: "Al Muntazah" },
{ value: "Al Muruj", label: "Al Muruj" },
{ value: "Al Arima", label: "Al Arima" },
{ value: "Tuwaiq", label: "Tuwaiq" },
{ value: "Al Hadhal", label: "Al Hadhal" },
{ value: "Ashuhada", label: "Ashuhada" },
{ value: "Industrial Az Zahir", label: "Industrial Az Zahir" },
{ value: "Al Afajh", label: "Al Afajh" },
{ value: "Al Qitar", label: "Al Qitar" },
{ value: "An Nasifah", label: "An Nasifah" },
{ value: "Al Farah", label: "Al Farah" },
{ value: "Najd", label: "Najd" },
{ value: "Al Manar", label: "Al Manar" },
{ value: "Al Maizialah", label: "Al Maizialah" },
{ value: "Jamalin", label: "Jamalin" },
{ value: "Subdivision No. 359", label: "Subdivision No. 359" },
{ value: "Al Yamamah", label: "Al Yamamah" },
{ value: "Al Usfayr", label: "Al Usfayr" },
{ value: "An Nahdah", label: "An Nahdah" },
{ value: "Al Adamah", label: "Al Adamah" },
{ value: "Al Khalidiyah", label: "Al Khalidiyah" },
{ value: "Al Aliyah", label: "Al Aliyah" },
{ value: "Al Badi Al Sharqi", label: "Al Badi Al Sharqi" },
{ value: "Village Badida Ealu Ghuthatan", label: "Village Badida Ealu Ghuthatan" },
{ value: "Kumet", label: "Kumet" },
{ value: "Al Rubea", label: "Al Rubea" },
{ value: "Al Wurud", label: "Al Wurud" },
{ value: "Al Wahah", label: "Al Wahah" },
{ value: "At Taawun", label: "At Taawun" },
{ value: "Al Khalidiyah", label: "Al Khalidiyah" },
{ value: "Salam", label: "Salam" },
{ value: "North Mathar", label: "North Mathar" },
{ value: "New Industrial City", label: "New Industrial City" },
{ value: "Al Wusayta", label: "Al Wusayta" },
{ value: "Ashuhada", label: "Ashuhada" },
{ value: "Al Marqab", label: "Al Marqab" },
{ value: "Industrial Ar Rawdah", label: "Industrial Ar Rawdah" },
{ value: "As Sad", label: "As Sad" },
{ value: "Shukhib", label: "Shukhib" },
{ value: "Dst C4", label: "Dst C4" },
{ value: "An Nada", label: "An Nada" },
{ value: "Tuwaiq Airport", label: "Tuwaiq Airport" },
{ value: "Subdivision 590", label: "Subdivision 590" },
{ value: "Ad Dirah", label: "Ad Dirah" },
{ value: "Jfara Al Jubeiry", label: "Jfara Al Jubeiry" },
{ value: "King Fahd", label: "King Fahd" },
{ value: "Al Wadi Industrial Area", label: "Al Wadi Industrial Area" },
{ value: "Subdivision 907 Musharafa", label: "Subdivision 907 Musharafa" },
{ value: "Rawafa", label: "Rawafa" },
{ value: "Ash Shrouk", label: "Ash Shrouk" },
{ value: "Ar Rabie", label: "Ar Rabie" },
{ value: "Al Dhubbat", label: "Al Dhubbat" },
{ value: "Al Sabakhah", label: "Al Sabakhah" },
{ value: "Al Muruj", label: "Al Muruj" },
{ value: "Al Khalifah", label: "Al Khalifah" },
{ value: "Al Hazm", label: "Al Hazm" },
{ value: "Al Yamamah", label: "Al Yamamah" },
{ value: "Tuwaiq", label: "Tuwaiq" },
{ value: "Subdivision 517", label: "Subdivision 517" },
{ value: "Al Baladiyah", label: "Al Baladiyah" },
{ value: "Al Ra'aniyah", label: "Al Ra'aniyah" },
{ value: "Badr", label: "Badr" },
{ value: "Al Muruj", label: "Al Muruj" },
{ value: "University Hospital", label: "University Hospital" },
{ value: "1st Industrial Ad Dirah", label: "1st Industrial Ad Dirah" },
{ value: "Masida", label: "Masida" },
{ value: "Ghirnatah", label: "Ghirnatah" },
{ value: "Al Maarid", label: "Al Maarid" },
{ value: "Al Blaida", label: "Al Blaida" },
{ value: "Ar Radifah", label: "Ar Radifah" },
{ value: "Al Faisaliyah", label: "Al Faisaliyah" },
{ value: "Al Shatinia", label: "Al Shatinia" },
{ value: "Mishrifah", label: "Mishrifah" },
{ value: "Al Ealawat", label: "Al Ealawat" },
{ value: "Al Ferdous", label: "Al Ferdous" },
{ value: "An Nahdah", label: "An Nahdah" },
{ value: "Ad Dara", label: "Ad Dara" },
{ value: "Al Qaisiya", label: "Al Qaisiya" },
{ value: "Al Aziziyah", label: "Al Aziziyah" },
{ value: "Al Andalus", label: "Al Andalus" },
{ value: "At Taawun", label: "At Taawun" },
{ value: "Al Hadidia", label: "Al Hadidia" },
{ value: "Abu Sleem", label: "Abu Sleem" },
{ value: "Ad Dirah Al Qadimah", label: "Ad Dirah Al Qadimah" },
{ value: "Al Aziziyah", label: "Al Aziziyah" },
{ value: "Al Olaya", label: "Al Olaya" },
{ value: "Ar Rawdah", label: "Ar Rawdah" },
{ value: "Sinaiyah Al Hadidia", label: "Sinaiyah Al Hadidia" },
{ value: "Ar Rukiyah", label: "Ar Rukiyah" },
{ value: "Industrial Suq Al Mashiya1", label: "Industrial Suq Al Mashiya1" },
{ value: "Al Muruj", label: "Al Muruj" },
{ value: "Al Ammajiyah", label: "Al Ammajiyah" },
{ value: "Al Olaya", label: "Al Olaya" },
{ value: "Umm Selim", label: "Umm Selim" },
{ value: "Al Jazur", label: "Al Jazur" },
{ value: "Al Wusayta", label: "Al Wusayta" },
{ value: "Netica", label: "Netica" },
{ value: "Wasila", label: "Wasila" },
{ value: "Al Yarmuk", label: "Al Yarmuk" },
{ value: "Al Wurud", label: "Al Wurud" },
{ value: "King Abdullah", label: "King Abdullah" },
{ value: "Ad Dirah", label: "Ad Dirah" },
{ value: "Ishbiliyah", label: "Ishbiliyah" },
{ value: "Ad Difa", label: "Ad Difa" },
{ value: "Al Murabba", label: "Al Murabba" },
{ value: "Al Faydat Al Qadim", label: "Al Faydat Al Qadim" },
{ value: "Subdivision 423", label: "Subdivision 423" },
{ value: "Subdivision 303", label: "Subdivision 303" },
{ value: "Al Hada", label: "Al Hada" },
{ value: "West Al Uraija", label: "West Al Uraija" },
{ value: "Al Faisaliyah", label: "Al Faisaliyah" },
{ value: "Al Aqiq", label: "Al Aqiq" },
{ value: "Al Khalidiyah", label: "Al Khalidiyah" },
{ value: "Al Wisham", label: "Al Wisham" },
{ value: "Al Yasmin", label: "Al Yasmin" },
{ value: "Al Manakh", label: "Al Manakh" },
{ value: "An Nafl", label: "An Nafl" },
{ value: "Ar Rawdah", label: "Ar Rawdah" },
{ value: "Dhahrat Al Awdat Gharb", label: "Dhahrat Al Awdat Gharb" },
{ value: "Al Saayghia", label: "Al Saayghia" },
{ value: "Al Nakhil", label: "Al Nakhil" },
{ value: "Az Zahra", label: "Az Zahra" },
{ value: "Subdivision No. 1067", label: "Subdivision No. 1067" },
{ value: "Al Qasima", label: "Al Qasima" },
{ value: "King Salman", label: "King Salman" },
{ value: "Ar Rafiah", label: "Ar Rafiah" },
{ value: "Subdivision 144", label: "Subdivision 144" },
{ value: "Al Wurud", label: "Al Wurud" },
{ value: "Al Faydah", label: "Al Faydah" },
{ value: "Al Hazm", label: "Al Hazm" },
{ value: "Ushayra", label: "Ushayra" },
{ value: "Subdivision 739", label: "Subdivision 739" },
{ value: "Subdivision 541", label: "Subdivision 541" },
{ value: "Subdivision No. 1111", label: "Subdivision No. 1111" },
{ value: "Dst C18", label: "Dst C18" },
{ value: "Al Turaif", label: "Al Turaif" },
{ value: "Al Thilaima", label: "Al Thilaima" },
{ value: "An Nahdah", label: "An Nahdah" },
{ value: "Al Ghataght", label: "Al Ghataght" },
{ value: "Hadar", label: "Hadar" },
{ value: "Ar Rabwah", label: "Ar Rabwah" },
{ value: "Al Yasmin", label: "Al Yasmin" },
{ value: "Saqra Al Shamali", label: "Saqra Al Shamali" },
{ value: "Al Yasmin", label: "Al Yasmin" },
{ value: "Ar Rawdah", label: "Ar Rawdah" },
{ value: "Industrial Al Khalidiyah", label: "Industrial Al Khalidiyah" },
{ value: "Al Manar", label: "Al Manar" },
{ value: "Industrial Al Sharman", label: "Industrial Al Sharman" },
{ value: "Ar Rawdah", label: "Ar Rawdah" },
{ value: "Al Haramain", label: "Al Haramain" },
{ value: "Al Khalidiyah", label: "Al Khalidiyah" },
{ value: "Dst C7", label: "Dst C7" },
{ value: "Al Nowema", label: "Al Nowema" },
{ value: "Ghirnatah", label: "Ghirnatah" },
{ value: "Al Wurud", label: "Al Wurud" },
{ value: "King Abdullah", label: "King Abdullah" },
{ value: "Al Nakhil", label: "Al Nakhil" },
{ value: "Al Zuhur", label: "Al Zuhur" },
{ value: "Al Khalidiyah", label: "Al Khalidiyah" },
{ value: "Al Hazm", label: "Al Hazm" },
{ value: "Al Wurud", label: "Al Wurud" },
{ value: "Ohod", label: "Ohod" },
{ value: "Ar Rawabi", label: "Ar Rawabi" },
{ value: "Al Quds", label: "Al Quds" },
{ value: "Badr", label: "Badr" },
{ value: "Al Suwaidi", label: "Al Suwaidi" },
{ value: "King Abdullah", label: "King Abdullah" },
{ value: "As Salam", label: "As Salam" },
{ value: "Al Wurud", label: "Al Wurud" },
{ value: "Subdivision No. 603", label: "Subdivision No. 603" },
{ value: "Ishbiliyah", label: "Ishbiliyah" },
{ value: "Badr", label: "Badr" },
{ value: "Ar Rashidyah", label: "Ar Rashidyah" },
{ value: "Industrial Al Maslakh", label: "Industrial Al Maslakh" },
{ value: "Al Dar Al Baida", label: "Al Dar Al Baida" },
{ value: "Al Farah", label: "Al Farah" },
{ value: "As Sulaymaniyah", label: "As Sulaymaniyah" },
{ value: "An Nahdah", label: "An Nahdah" },
{ value: "Az Zahrah", label: "Az Zahrah" },
{ value: "Al Manar", label: "Al Manar" },
{ value: "Hittin", label: "Hittin" },
{ value: "Al Marwah", label: "Al Marwah" },
{ value: "Al Bayan", label: "Al Bayan" },
{ value: "Al Wasam", label: "Al Wasam" },
{ value: "Dhahrat Laban", label: "Dhahrat Laban" },
{ value: "Al Aziziyah", label: "Al Aziziyah" },
{ value: "Al Mazraa", label: "Al Mazraa" },
{ value: "Industrial Subdivision No. 946", label: "Industrial Subdivision No. 946" },
{ value: "Al Faisaliyah", label: "Al Faisaliyah" },
{ value: "Al Hada", label: "Al Hada" },
{ value: "Al Nakhil1", label: "Al Nakhil1" },
{ value: "Al Muruj", label: "Al Muruj" },
{ value: "Al Qarina Al Qadima", label: "Al Qarina Al Qadima" },
{ value: "Al Idhaah", label: "Al Idhaah" },
{ value: "Qurtubah", label: "Qurtubah" },
{ value: "As Sulaymaniyah", label: "As Sulaymaniyah" },
{ value: "Ash'ari", label: "Ash'ari" },
{ value: "Subdivision Al Rumaythi", label: "Subdivision Al Rumaythi" },
{ value: "Subdivision Ar Rayaan", label: "Subdivision Ar Rayaan" },
{ value: "Al Batiyn", label: "Al Batiyn" },
{ value: "Uqaz", label: "Uqaz" },
{ value: "As Salam", label: "As Salam" },
{ value: "Al Ghadir", label: "Al Ghadir" },
{ value: "Al Muntazah", label: "Al Muntazah" },
{ value: "Al Yasmin", label: "Al Yasmin" },
{ value: "Al Allawah", label: "Al Allawah" },
{ value: "An Nahdah", label: "An Nahdah" },
{ value: "Al Masif", label: "Al Masif" },
{ value: "Al Jamiah", label: "Al Jamiah" },
{ value: "Al Yamamah", label: "Al Yamamah" },
{ value: "Al Nakhil", label: "Al Nakhil" },
{ value: "Tuwaiq", label: "Tuwaiq" },
{ value: "Al Muntazah", label: "Al Muntazah" },
{ value: "Semnan", label: "Semnan" },
{ value: "Ash Shifa", label: "Ash Shifa" },
{ value: "Subdivision No. 1037", label: "Subdivision No. 1037" },
{ value: "Al Olaya", label: "Al Olaya" },
{ value: "Al Wurud", label: "Al Wurud" },
{ value: "Al Hadah", label: "Al Hadah" },
{ value: "Al Waqian", label: "Al Waqian" },
{ value: "Al Yamamah", label: "Al Yamamah" },
{ value: "As Suquriyyah", label: "As Suquriyyah" },
{ value: "Al Andalus", label: "Al Andalus" },
{ value: "Al Yamamah", label: "Al Yamamah" },
{ value: "Al Frosyah", label: "Al Frosyah" },
{ value: "Al Khalij", label: "Al Khalij" },
{ value: "Al Yasmin", label: "Al Yasmin" },
{ value: "Al Uthmaniyah", label: "Al Uthmaniyah" },
{ value: "Al Andalus", label: "Al Andalus" },
{ value: "Umm Talha", label: "Umm Talha" },
{ value: "Subdivision No. 32", label: "Subdivision No. 32" },
{ value: "Al Wahah", label: "Al Wahah" },
{ value: "As Sulaymaniyah", label: "As Sulaymaniyah" },
{ value: "Al Khuzimi", label: "Al Khuzimi" },
{ value: "Ghusaiba", label: "Ghusaiba" },
{ value: "As Salhiyah", label: "As Salhiyah" },
{ value: "Al Aziziyah", label: "Al Aziziyah" },
{ value: "Umm Sariha", label: "Umm Sariha" },
{ value: "Al Janubi", label: "Al Janubi" },
{ value: "An Nuzhah", label: "An Nuzhah" },
{ value: "Dst C10", label: "Dst C10" },
{ value: "Ar Rabwah", label: "Ar Rabwah" },
{ value: "Industrial Dst C12", label: "Industrial Dst C12" },
{ value: "Ad Dirah Al Qadimah", label: "Ad Dirah Al Qadimah" },
{ value: "Al Sidrah", label: "Al Sidrah" },
{ value: "Shubra", label: "Shubra" },
{ value: "As Salhiyah", label: "As Salhiyah" },
{ value: "Siyah", label: "Siyah" },
{ value: "Al Amal", label: "Al Amal" },
{ value: "Al Mutamarat", label: "Al Mutamarat" },
{ value: "Middle Al Uraija", label: "Middle Al Uraija" },
{ value: "Al Zuhur", label: "Al Zuhur" },
{ value: "Al Tadamun", label: "Al Tadamun" },
{ value: "Al Mahdiyah", label: "Al Mahdiyah" },
{ value: "Subdivision No. 456", label: "Subdivision No. 456" },
{ value: "Al Ferdous", label: "Al Ferdous" },
{ value: "Subdivision No. 0941", label: "Subdivision No. 0941" },
{ value: "Subdivision No. 0824", label: "Subdivision No. 0824" },
{ value: "Subdivision No. 126", label: "Subdivision No. 126" },
{ value: "King Abdullah", label: "King Abdullah" },
{ value: "Al Shaaifan", label: "Al Shaaifan" },
{ value: "Khashm Al An Hyt", label: "Khashm Al An Hyt" },
{ value: "Al Dabih", label: "Al Dabih" },
{ value: "Al Bariyah", label: "Al Bariyah" },
{ value: "Al Sarhiyah", label: "Al Sarhiyah" },
{ value: "Al Malqa", label: "Al Malqa" },
{ value: "Al Wurud", label: "Al Wurud" },
{ value: "Southern Fifties", label: "Southern Fifties" },
{ value: "Al Andalus", label: "Al Andalus" },
{ value: "Al Nahsh", label: "Al Nahsh" },
{ value: "Umm Al Hamam Eastern", label: "Umm Al Hamam Eastern" },
{ value: "Al Mughrazat", label: "Al Mughrazat" },
{ value: "King Abdulaziz", label: "King Abdulaziz" },
{ value: "Al Muruj", label: "Al Muruj" },
{ value: "Ar Rehab", label: "Ar Rehab" },
{ value: "King Salman", label: "King Salman" },
{ value: "Al Nakhil", label: "Al Nakhil" },
{ value: "Al Fahd", label: "Al Fahd" },
{ value: "Subdivision No. 18", label: "Subdivision No. 18" },
{ value: "Dst 1156", label: "Dst 1156" },
{ value: "Subdivision 555", label: "Subdivision 555" },
{ value: "Al Umda", label: "Al Umda" },
{ value: "Sinaiyah", label: "Sinaiyah" },
{ value: "Mazal", label: "Mazal" },
{ value: "Industrial Rumaythan", label: "Industrial Rumaythan" },
{ value: "Al Masif", label: "Al Masif" },
{ value: "Dst C15", label: "Dst C15" },
{ value: "Al Hafuf", label: "Al Hafuf" },
{ value: "Al Fahil", label: "Al Fahil" },
{ value: "Al Izdihar", label: "Al Izdihar" },
{ value: "Al Maeni", label: "Al Maeni" },
{ value: "Subdivision 1149", label: "Subdivision 1149" },
{ value: "Munifa", label: "Munifa" },
{ value: "Subdivision Al Jaffuniyyah", label: "Subdivision Al Jaffuniyyah" },
{ value: "Al Zuhur", label: "Al Zuhur" },
{ value: "Al Zuhur", label: "Al Zuhur" },
{ value: "Al Yasmin", label: "Al Yasmin" },
{ value: "Zubada", label: "Zubada" },
{ value: "King Saud University", label: "King Saud University" },
{ value: "Subdivision No. 24", label: "Subdivision No. 24" },
{ value: "Subdivision Al Sultan", label: "Subdivision Al Sultan" },
{ value: "Sultanah", label: "Sultanah" },
{ value: "Ar Rabwah", label: "Ar Rabwah" },
{ value: "Al Ferdous", label: "Al Ferdous" },
{ value: "Subdivision No. 956", label: "Subdivision No. 956" },
{ value: "Umm Al Shaeal", label: "Umm Al Shaeal" },
{ value: "Al Yamamah", label: "Al Yamamah" },
{ value: "Al Wahah", label: "Al Wahah" },
{ value: "Al Falah", label: "Al Falah" },
{ value: "King Fahd", label: "King Fahd" },
{ value: "Al Dahim", label: "Al Dahim" },
{ value: "An Nadheem", label: "An Nadheem" },
{ value: "Dahiyat Namar", label: "Dahiyat Namar" },
{ value: "Oraid", label: "Oraid" },
{ value: "Al Walamin", label: "Al Walamin" },
{ value: "Al Jazirah", label: "Al Jazirah" },
{ value: "Dst C6", label: "Dst C6" },
{ value: "Ar Rabie", label: "Ar Rabie" },
{ value: "King Abdullah", label: "King Abdullah" },
{ value: "King Fahd", label: "King Fahd" },
{ value: "Al Misfat", label: "Al Misfat" },
{ value: "Ar Rabiyah", label: "Ar Rabiyah" },
{ value: "Al Muqabil", label: "Al Muqabil" },
{ value: "The Hospital", label: "The Hospital" },
{ value: "Ad Dirah", label: "Ad Dirah" },
{ value: "Al Shueayba", label: "Al Shueayba" },
{ value: "Ash Shifa", label: "Ash Shifa" },
{ value: "Salam", label: "Salam" },
{ value: "Al Wasil", label: "Al Wasil" },
{ value: "Al Bustan", label: "Al Bustan" },
{ value: "Al Ghadir", label: "Al Ghadir" },
{ value: "Al Khathlan", label: "Al Khathlan" },
{ value: "Al Hamra", label: "Al Hamra" },
{ value: "King Faisal", label: "King Faisal" },
{ value: "Subdivision 679", label: "Subdivision 679" },
{ value: "An Nasriyah", label: "An Nasriyah" },
{ value: "Ash Sharafiyah", label: "Ash Sharafiyah" },
{ value: "Al Taraf", label: "Al Taraf" },
{ value: "Subdivision No. 30", label: "Subdivision No. 30" },
{ value: "Subdivision No. 242", label: "Subdivision No. 242" },
{ value: "Subdivision No. 214", label: "Subdivision No. 214" },
{ value: "Mishyrifah", label: "Mishyrifah" },
{ value: "As Salam", label: "As Salam" },
{ value: "Al Sadr", label: "Al Sadr" },
{ value: "Subdivision No. 333", label: "Subdivision No. 333" },
{ value: "Al Gharibia", label: "Al Gharibia" },
{ value: "Al Naqieuh", label: "Al Naqieuh" },
{ value: "Al Ghadir", label: "Al Ghadir" },
{ value: "Al Suwmaria", label: "Al Suwmaria" },
{ value: "City Center", label: "City Center" },
{ value: "Al Qirawan", label: "Al Qirawan" },
{ value: "Ar Rehab", label: "Ar Rehab" },
{ value: "Sharaf", label: "Sharaf" },
{ value: "Al Uyun", label: "Al Uyun" },
{ value: "Al Yarmuk", label: "Al Yarmuk" },
{ value: "Al Madinah Al Jadidah", label: "Al Madinah Al Jadidah" },
{ value: "Ar Rabwah", label: "Ar Rabwah" },
{ value: "Al Hanabija", label: "Al Hanabija" },
{ value: "Dhahrat Al Badeah", label: "Dhahrat Al Badeah" },
{ value: "Al Hadia", label: "Al Hadia" },
{ value: "Ash Shamaliyah", label: "Ash Shamaliyah" },
{ value: "Al Aqishiya", label: "Al Aqishiya" },
{ value: "Subdivision No. 995", label: "Subdivision No. 995" },
{ value: "Qurtubah", label: "Qurtubah" },
{ value: "Al Hada", label: "Al Hada" },
{ value: "Ar Rayaan", label: "Ar Rayaan" },
{ value: "Al Shumaisi", label: "Al Shumaisi" },
{ value: "Industrial Al Futah", label: "Industrial Al Futah" },
{ value: "Subdivision No. 198", label: "Subdivision No. 198" },
{ value: "Al Ghadir", label: "Al Ghadir" },
{ value: "Al Musamayat 2", label: "Al Musamayat 2" },
{ value: "Al Kada", label: "Al Kada" },
{ value: "Al Atyan", label: "Al Atyan" },
{ value: "Al Musamayat 1", label: "Al Musamayat 1" },
{ value: "Al Hulwa", label: "Al Hulwa" },
{ value: "Al Hazm", label: "Al Hazm" },
{ value: "Al Khuzama", label: "Al Khuzama" },
{ value: "Al Qawye", label: "Al Qawye" },
{ value: "Al Kris", label: "Al Kris" },
{ value: "حي المغترة", label: "حي المغترة" },
{ value: "الربوة", label: "الربوة" },
{ value: "حي مخطط مصلى العيدين", label: "حي مخطط مصلى العيدين" },
{ value: "حي الحفاير", label: "حي الحفاير" },
{ value: "حي الهيرة", label: "حي الهيرة" },
{ value: "حي العبيديات", label: "حي العبيديات" },
{ value: "حي أم سليم", label: "حي أم سليم" },
{ value: "مركز مصدة", label: "مركز مصدة" },
{ value: "حي بوضان", label: "حي بوضان" },
{ value: "حي الثميلة", label: "حي الثميلة" },
{ value: "حي الساحبة", label: "حي الساحبة" },
{ value: "قرية الرجبة", label: "قرية الرجبة" },
{ value: "حي الطوال", label: "حي الطوال" },
{ value: "قرية النهيتية", label: "قرية النهيتية" },
{ value: "حي الوسيطا", label: "حي الوسيطا" },
{ value: "حي آل هادي", label: "حي آل هادي" },
{ value: "حي ام حرمل", label: "حي ام حرمل" },
{ value: "حي الحيانية القديمة", label: "حي الحيانية القديمة" },
{ value: "حي الحيانية الشمالية", label: "حي الحيانية الشمالية" },
{ value: "المجد", label: "المجد" },
{ value: "أحد الشهداء", label: "أحد الشهداء" },
{ value: "الشرق", label: "الشرق" },
{ value: "الراية", label: "الراية" },
{ value: "نجد", label: "نجد" },
{ value: "الإزدهار", label: "الإزدهار" },
{ value: "العقيق", label: "العقيق" },
{ value: "البساتين", label: "البساتين" },
{ value: "الريف", label: "الريف" },
{ value: "العارض", label: "العارض" },
{ value: "السيح", label: "السيح" },
{ value: "القيروان", label: "القيروان" },
{ value: "بدر", label: "بدر" },
{ value: "الرحاب", label: "الرحاب" },
{ value: "طويق", label: "طويق" },
{ value: "النرجس", label: "النرجس" },
{ value: "المنار", label: "المنار" },
{ value: "النسيم", label: "النسيم" },
{ value: "الثليماء", label: "الثليماء" },
{ value: "الرفاع", label: "الرفاع" },
{ value: "الرمال", label: "الرمال" },
{ value: "التعاون", label: "التعاون" },
{ value: "الندى", label: "الندى" },
{ value: "النفل", label: "النفل" },
{ value: "النخيل", label: "النخيل" },
{ value: "غياضة", label: "غياضة" },
{ value: "الملقا", label: "الملقا" },
{ value: "الصافي", label: "الصافي" },
{ value: "حي_001022088", label: "حي_001022088" },
{ value: "البشائر", label: "البشائر" },
{ value: "حي_001022142", label: "حي_001022142" },
{ value: "حي_001022143", label: "حي_001022143" },
{ value: "الملك سلمان", label: "الملك سلمان" },
{ value: "سدرة", label: "سدرة" },
{ value: "منطقة مفتوحة تابعة لبلدية نمار", label: "منطقة مفتوحة تابعة لبلدية نمار" },
{ value: "الحزم", label: "الحزم" },
{ value: "المنار", label: "المنار" },
{ value: "الغروب", label: "الغروب" },
{ value: "الريان", label: "الريان" },
{ value: "حي الصناعية الاولي", label: "حي الصناعية الاولي" },
{ value: "حي الصناعية الثانية", label: "حي الصناعية الثانية" },
{ value: "مدينة الانعام", label: "مدينة الانعام" },
{ value: "Al Tarwia", label: "Al Tarwia" },
{ value: "Umm Al Jud", label: "Umm Al Jud" },
{ value: "Ash Shubayka", label: "Ash Shubayka" },
{ value: "Al Jadid", label: "Al Jadid" },
{ value: "Al Mursalat", label: "Al Mursalat" },
{ value: "Al Ukayshiyah", label: "Al Ukayshiyah" },
{ value: "Al Khalidiyah", label: "Al Khalidiyah" },
{ value: "Al Hijrah", label: "Al Hijrah" },
{ value: "Batha Quraysh", label: "Batha Quraysh" },
{ value: "Al Hindawiyah", label: "Al Hindawiyah" },
{ value: "Haram visions", label: "Haram visions" },
{ value: "As Suq Al Jadid", label: "As Suq Al Jadid" },
{ value: "An Nawwariyah", label: "An Nawwariyah" },
{ value: "Qurtubah", label: "Qurtubah" },
{ value: "Al Jamiah", label: "Al Jamiah" },
{ value: "Ashuhada", label: "Ashuhada" },
{ value: "Kudy", label: "Kudy" },
{ value: "Al Hujun", label: "Al Hujun" },
{ value: "An Naqa Al Jadid", label: "An Naqa Al Jadid" },
{ value: "Tawa", label: "Tawa" },
{ value: "Shaeb Amir Al Jadid", label: "Shaeb Amir Al Jadid" },
{ value: "Ad Diyafah", label: "Ad Diyafah" },
{ value: "At Taqwa", label: "At Taqwa" },
{ value: "At Tanim", label: "At Tanim" },
{ value: "As Salamah", label: "As Salamah" },
{ value: "Zamzam", label: "Zamzam" },
{ value: "Al Kakiyah", label: "Al Kakiyah" },
{ value: "Al Barakah", label: "Al Barakah" },
{ value: "Taibah", label: "Taibah" },
{ value: "Al Falaq Al Jadid", label: "Al Falaq Al Jadid" },
{ value: "Jarana", label: "Jarana" },
{ value: "Al Yamamah", label: "Al Yamamah" },
{ value: "As Salam", label: "As Salam" },
{ value: "Al Hatim", label: "Al Hatim" },
{ value: "Hanin", label: "Hanin" },
{ value: "Al Judriah Al Jadid", label: "Al Judriah Al Jadid" },
{ value: "Al Bayban", label: "Al Bayban" },
{ value: "Jabal An Noor", label: "Jabal An Noor" },
{ value: "Ar Rawabi", label: "Ar Rawabi" },
{ value: "Al Qararat Al Jadid", label: "Al Qararat Al Jadid" },
{ value: "King Fahd", label: "King Fahd" },
{ value: "Al Basatin", label: "Al Basatin" },
{ value: "Al Jummayzah", label: "Al Jummayzah" },
{ value: "Al Husainiyah", label: "Al Husainiyah" },
{ value: "Dar AI Salaam", label: "Dar AI Salaam" },
{ value: "Az Zahir", label: "Az Zahir" },
{ value: "Al Kawthar", label: "Al Kawthar" },
{ value: "Al Fath", label: "Al Fath" },
{ value: "Al Marwah", label: "Al Marwah" },
{ value: "Rie Adhakhir", label: "Rie Adhakhir" },
{ value: "Al Hamra", label: "Al Hamra" },
{ value: "Al misyal Al Jadid", label: "Al misyal Al Jadid" },
{ value: "Wadi Jalil", label: "Wadi Jalil" },
{ value: "Al Maeabiduh", label: "Al Maeabiduh" },
{ value: "Al Adel", label: "Al Adel" },
{ value: "Muead", label: "Muead" },
{ value: "Al Khadraa", label: "Al Khadraa" },
{ value: "Al Aziziyah", label: "Al Aziziyah" },
{ value: "Ar Rusayfah", label: "Ar Rusayfah" },
{ value: "Al Misfalah", label: "Al Misfalah" },
{ value: "Al Awaly", label: "Al Awaly" },
{ value: "As safwa", label: "As safwa" },
{ value: "Jarwal", label: "Jarwal" },
{ value: "Shaeb Ali Al Jadid", label: "Shaeb Ali Al Jadid" },
{ value: "Al Hajla Al Jadid", label: "Al Hajla Al Jadid" },
{ value: "Az Zahra", label: "Az Zahra" },
{ value: "Al Naseem", label: "Al Naseem" },
{ value: "Ash Shawqiyah", label: "Ash Shawqiyah" },
{ value: "Al Khansa", label: "Al Khansa" },
{ value: "Al Andalus", label: "Al Andalus" },
{ value: "Ohod", label: "Ohod" },
{ value: "Al Mughamas", label: "Al Mughamas" },
{ value: "Al Shumaisi", label: "Al Shumaisi" },
{ value: "Harat Al Bab Al Jadid", label: "Harat Al Bab Al Jadid" },
{ value: "Ash Shamiya Al Jadid", label: "Ash Shamiya Al Jadid" },
{ value: "Al Qashashia Al Jadid", label: "Al Qashashia Al Jadid" },
{ value: "Al Buhayrat", label: "Al Buhayrat" },
{ value: "As Sanabel", label: "As Sanabel" },
{ value: "Ar Rashidiyyah", label: "Ar Rashidiyyah" },
{ value: "At Taysir", label: "At Taysir" },
{ value: "Al Muhammadiyah", label: "Al Muhammadiyah" },
{ value: "Al Furqan", label: "Al Furqan" },
{ value: "Al Thania", label: "Al Thania" },
{ value: "Al Maqam", label: "Al Maqam" },
{ value: "Al Hudaybiyah", label: "Al Hudaybiyah" },
{ value: "Asharai", label: "Asharai" },
{ value: "Al Bayea", label: "Al Bayea" },
{ value: "As Safa", label: "As Safa" },
{ value: "Al Usaylah", label: "Al Usaylah" },
{ value: "Badr", label: "Badr" },
{ value: "Al Aqaba", label: "Al Aqaba" },
{ value: "Ar Rawdah", label: "Ar Rawdah" },
{ value: "Al Abidiyah", label: "Al Abidiyah" },
{ value: "Al Mudae Al Jadid", label: "Al Mudae Al Jadid" },
{ value: "Al Umrah", label: "Al Umrah" },
{ value: "Al Ghaza Al Jadid", label: "Al Ghaza Al Jadid" },
{ value: "Al Utaybiyah", label: "Al Utaybiyah" },
{ value: "An Nuzhah", label: "An Nuzhah" },
{ value: "Ajjad", label: "Ajjad" },
{ value: "Industrial City", label: "Industrial City" },
{ value: "An Nahdah", label: "An Nahdah" },
{ value: "Al Qaa 2", label: "Al Qaa 2" },
{ value: "Al Burj", label: "Al Burj" },
{ value: "Ash Shati 2", label: "Ash Shati 2" },
{ value: "Ash Shati 3", label: "Ash Shati 3" },
{ value: "Al Ziyad 2", label: "Al Ziyad 2" },
{ value: "Central Services", label: "Central Services" },
{ value: "Ohod Bani Zayd", label: "Ohod Bani Zayd" },
{ value: "Al Quoz", label: "Al Quoz" },
{ value: "Unaykar", label: "Unaykar" },
{ value: "Al Jubail-Qanbour", label: "Al Jubail-Qanbour" },
{ value: "Al Jard", label: "Al Jard" },
{ value: "Mishrif", label: "Mishrif" },
{ value: "Al Jumaymat", label: "Al Jumaymat" },
{ value: "Thulatha' ybaah", label: "Thulatha' ybaah" },
{ value: "Al Habila", label: "Al Habila" },
{ value: "Hashima", label: "Hashima" },
{ value: "As Sumra", label: "As Sumra" },
{ value: "Al Manadil", label: "Al Manadil" },
{ value: "Central Services Subdivision", label: "Central Services Subdivision" },
{ value: "Al Qahman", label: "Al Qahman" },
{ value: "Al Faisaliyah", label: "Al Faisaliyah" },
{ value: "Al Barqa", label: "Al Barqa" },
{ value: "Al Magharbah", label: "Al Magharbah" },
{ value: "Al Wadi", label: "Al Wadi" },
{ value: "At Talaah 1", label: "At Talaah 1" },
{ value: "An Nuzhah", label: "An Nuzhah" },
{ value: "Gharan", label: "Gharan" },
{ value: "Al Yamania", label: "Al Yamania" },
{ value: "Sinaiyah Al Yamania", label: "Sinaiyah Al Yamania" },
{ value: "Al Hijrah 2", label: "Al Hijrah 2" },
{ value: "Al Hijrah 1", label: "Al Hijrah 1" },
{ value: "Ar Rabwah", label: "Ar Rabwah" },
{ value: "At Talaah 2", label: "At Talaah 2" },
{ value: "Al Hura", label: "Al Hura" },
{ value: "Al Harazat", label: "Al Harazat" },
{ value: "Ar Rayaan", label: "Ar Rayaan" },
{ value: "Al Buhayrat", label: "Al Buhayrat" },
{ value: "Jawharat Thul Al Maerifa", label: "Jawharat Thul Al Maerifa" },
{ value: "Al Khalij", label: "Al Khalij" },
{ value: "Al Qaws", label: "Al Qaws" },
{ value: "Industrial1", label: "Industrial1" },
{ value: "Al Muzayraa", label: "Al Muzayraa" },
{ value: "Governmental3", label: "Governmental3" },
{ value: "Ar Rabiyah", label: "Ar Rabiyah" },
{ value: "Al Ushiria", label: "Al Ushiria" },
{ value: "Al Hazaeia", label: "Al Hazaeia" },
{ value: "Al Mursalat", label: "Al Mursalat" },
{ value: "Al Muruj", label: "Al Muruj" },
{ value: "Al Khalidiyah B", label: "Al Khalidiyah B" },
{ value: "Al Gharbia", label: "Al Gharbia" },
{ value: "Al Khalidiyah A", label: "Al Khalidiyah A" },
{ value: "Sharqia", label: "Sharqia" },
{ value: "Umrat", label: "Umrat" },
{ value: "Al Salhi", label: "Al Salhi" },
{ value: "Al Qaa 1", label: "Al Qaa 1" },
{ value: "Al Ziyad 1", label: "Al Ziyad 1" },
{ value: "Al Kurnaish", label: "Al Kurnaish" },
{ value: "Rahman", label: "Rahman" },
{ value: "Al daadi", label: "Al daadi" },
{ value: "Wadi Haroun", label: "Wadi Haroun" },
{ value: "Al Mustaqbal", label: "Al Mustaqbal" },
{ value: "Ash Shati 1", label: "Ash Shati 1" },
{ value: "Al Sadr", label: "Al Sadr" },
{ value: "Ad Duf", label: "Ad Duf" },
{ value: "Darbin Jeddah", label: "Darbin Jeddah" },
{ value: "Al Murjan", label: "Al Murjan" },
{ value: "Ash Shiyukh", label: "Ash Shiyukh" },
{ value: "As Salam", label: "As Salam" },
{ value: "As Salmiya", label: "As Salmiya" },
{ value: "Al Iskan", label: "Al Iskan" },
{ value: "Al Basatin", label: "Al Basatin" },
{ value: "King Fahd bin Abdulaziz", label: "King Fahd bin Abdulaziz" },
{ value: "Al Jamiah", label: "Al Jamiah" },
{ value: "Ar Rabie", label: "Ar Rabie" },
{ value: "Al Hafna", label: "Al Hafna" },
{ value: "Al Hijaz", label: "Al Hijaz" },
{ value: "Al Aziziyah", label: "Al Aziziyah" },
{ value: "Al Wiam", label: "Al Wiam" },
{ value: "Ath Thaalibah", label: "Ath Thaalibah" },
{ value: "Al Bawadi", label: "Al Bawadi" },
{ value: "Al Mahamid", label: "Al Mahamid" },
{ value: "Al Mustaqbal", label: "Al Mustaqbal" },
{ value: "Al Qouzeen", label: "Al Qouzeen" },
{ value: "Al Hada", label: "Al Hada" },
{ value: "King Abdulaziz International Airport", label: "King Abdulaziz International Airport" },
{ value: "Al Hijrah", label: "Al Hijrah" },
{ value: "Ar Rawasi", label: "Ar Rawasi" },
{ value: "Industrial", label: "Industrial" },
{ value: "Al Muntazah", label: "Al Muntazah" },
{ value: "Al Barakah", label: "Al Barakah" },
{ value: "Ar Rahmah", label: "Ar Rahmah" },
{ value: "Prince Abdulmajeed", label: "Prince Abdulmajeed" },
{ value: "Al Karamah", label: "Al Karamah" },
{ value: "Al Tadamun", label: "Al Tadamun" },
{ value: "Al Mutanazahat", label: "Al Mutanazahat" },
{ value: "Al Jawharah", label: "Al Jawharah" },
{ value: "Mraykh", label: "Mraykh" },
{ value: "Quba", label: "Quba" },
{ value: "Al Fanar", label: "Al Fanar" },
{ value: "Al Gharbia", label: "Al Gharbia" },
{ value: "Ar Rawabi", label: "Ar Rawabi" },
{ value: "Al Kawthar", label: "Al Kawthar" },
{ value: "Al Marwah", label: "Al Marwah" },
{ value: "An Nuzhah", label: "An Nuzhah" },
{ value: "An Nada", label: "An Nada" },
{ value: "Al Bashaer", label: "Al Bashaer" },
{ value: "Al Mahjar", label: "Al Mahjar" },
{ value: "Al Hamra", label: "Al Hamra" },
{ value: "As Surooriyah", label: "As Surooriyah" },
{ value: "As Safha", label: "As Safha" },
{ value: "Dhahban Town", label: "Dhahban Town" },
{ value: "Ash Shuwaidi", label: "Ash Shuwaidi" },
{ value: "Al Durra", label: "Al Durra" },
{ value: "Al Najma", label: "Al Najma" },
{ value: "Al Khomrah", label: "Al Khomrah" },
{ value: "Ash Shamayil", label: "Ash Shamayil" },
{ value: "Salita", label: "Salita" },
{ value: "Al Moulysaa", label: "Al Moulysaa" },
{ value: "Al Wahah", label: "Al Wahah" },
{ value: "Industrial2", label: "Industrial2" },
{ value: "Az Zahra", label: "Az Zahra" },
{ value: "Ad Dahiah", label: "Ad Dahiah" },
{ value: "As Sahifah", label: "As Sahifah" },
{ value: "Ar Rughamah", label: "Ar Rughamah" },
{ value: "Al Manarat", label: "Al Manarat" },
{ value: "Al Kurnaish", label: "Al Kurnaish" },
{ value: "Al Jazirah", label: "Al Jazirah" },
{ value: "As Salamah", label: "As Salamah" },
{ value: "Ar Rahmanyah", label: "Ar Rahmanyah" },
{ value: "King Faisal Naval Base", label: "King Faisal Naval Base" },
{ value: "As Sahil", label: "As Sahil" },
{ value: "Al Widad", label: "Al Widad" },
{ value: "Al Balad", label: "Al Balad" },
{ value: "Al Waziriyah", label: "Al Waziriyah" },
{ value: "Al Qryniah", label: "Al Qryniah" },
{ value: "An Nahdah", label: "An Nahdah" },
{ value: "Petromin", label: "Petromin" },
{ value: "As Safa", label: "As Safa" },
{ value: "Umm Asalam", label: "Umm Asalam" },
{ value: "Ar Ruwais", label: "Ar Ruwais" },
{ value: "Abhur Al Janubiyah", label: "Abhur Al Janubiyah" },
{ value: "Al Naseem", label: "Al Naseem" },
{ value: "Al Falah", label: "Al Falah" },
{ value: "Ar Rehab", label: "Ar Rehab" },
{ value: "Al Ferdous", label: "Al Ferdous" },
{ value: "Bani Malik", label: "Bani Malik" },
{ value: "Bryman", label: "Bryman" },
{ value: "University", label: "University" },
{ value: "Al Furqan", label: "Al Furqan" },
{ value: "Tabah", label: "Tabah" },
{ value: "Ash Shifa", label: "Ash Shifa" },
{ value: "Al Olaya", label: "Al Olaya" },
{ value: "Abu Jaala", label: "Abu Jaala" },
{ value: "Al Muhammadiyah", label: "Al Muhammadiyah" },
{ value: "Al Yaqoot", label: "Al Yaqoot" },
{ value: "Umm Sidra", label: "Umm Sidra" },
{ value: "Madain Al Fahd", label: "Madain Al Fahd" },
{ value: "Al Mawada", label: "Al Mawada" },
{ value: "Al Andalus", label: "Al Andalus" },
{ value: "Al Amwaj", label: "Al Amwaj" },
{ value: "Prince Fawaz Al Janoubi", label: "Prince Fawaz Al Janoubi" },
{ value: "Kittanah", label: "Kittanah" },
{ value: "Umm Hablain Al Sharqia", label: "Umm Hablain Al Sharqia" },
{ value: "Al Talal", label: "Al Talal" },
{ value: "Al Budur", label: "Al Budur" },
{ value: "Al Asala", label: "Al Asala" },
{ value: "Mishrifah", label: "Mishrifah" },
{ value: "Ar Rabwah", label: "Ar Rabwah" },
{ value: "Prince Fawaz Al Shamali", label: "Prince Fawaz Al Shamali" },
{ value: "Al Adel", label: "Al Adel" },
{ value: "As Sarawat", label: "As Sarawat" },
{ value: "Al Yusr", label: "Al Yusr" },
{ value: "Al Zuhur", label: "Al Zuhur" },
{ value: "Al Majd", label: "Al Majd" },
{ value: "Al Farouk", label: "Al Farouk" },
{ value: "Al Baghdadiyah Al Sharqiyah", label: "Al Baghdadiyah Al Sharqiyah" },
{ value: "Al Ajwad", label: "Al Ajwad" },
{ value: "Ghulail", label: "Ghulail" },
{ value: "Al Fadeylah", label: "Al Fadeylah" },
{ value: "Al Faisaliyah", label: "Al Faisaliyah" },
{ value: "As Sanabel", label: "As Sanabel" },
{ value: "Al Kandarah", label: "Al Kandarah" },
{ value: "Al Frosyah", label: "Al Frosyah" },
{ value: "Al Mawj", label: "Al Mawj" },
{ value: "An Nazlah Al Yamaniyah", label: "An Nazlah Al Yamaniyah" },
{ value: "Ath Thaghr", label: "Ath Thaghr" },
{ value: "As Sabil", label: "As Sabil" },
{ value: "Al Hindawiyah", label: "Al Hindawiyah" },
{ value: "Al Marsaa", label: "Al Marsaa" },
{ value: "Al Usaylah", label: "Al Usaylah" },
{ value: "Al Ulaa", label: "Al Ulaa" },
{ value: "Al Ajaweed", label: "Al Ajaweed" },
{ value: "Thule Town", label: "Thule Town" },
{ value: "Asharai", label: "Asharai" },
{ value: "Al Maizialah", label: "Al Maizialah" },
{ value: "Umm Hablain Al Gharbia", label: "Umm Hablain Al Gharbia" },
{ value: "Al Quraiyat", label: "Al Quraiyat" },
{ value: "Al Murjan", label: "Al Murjan" },
{ value: "King Abdulaziz University", label: "King Abdulaziz University" },
{ value: "Al Wurud", label: "Al Wurud" },
{ value: "Ash Sharafiyah", label: "Ash Sharafiyah" },
{ value: "Al Fayha", label: "Al Fayha" },
{ value: "Al Aqiq", label: "Al Aqiq" },
{ value: "Al Usalaa", label: "Al Usalaa" },
{ value: "Al Wasami", label: "Al Wasami" },
{ value: "An Nazlah Ash Sharqiyah", label: "An Nazlah Ash Sharqiyah" },
{ value: "Al Bahja", label: "Al Bahja" },
{ value: "Ar Rimal", label: "Ar Rimal" },
{ value: "Al Muruj", label: "Al Muruj" },
{ value: "Al Wudiya", label: "Al Wudiya" },
{ value: "Al Wadi", label: "Al Wadi" },
{ value: "At Taawun", label: "At Taawun" },
{ value: "Al Abeer", label: "Al Abeer" },
{ value: "Al Athir", label: "Al Athir" },
{ value: "Taibah", label: "Taibah" },
{ value: "Al Sahl", label: "Al Sahl" },
{ value: "Ar Riyadh", label: "Ar Riyadh" },
{ value: "Governmental3", label: "Governmental3" },
{ value: "Al Basatin", label: "Al Basatin" },
{ value: "Az Zomorod", label: "Az Zomorod" },
{ value: "Al Tawfiq", label: "Al Tawfiq" },
{ value: "Al Jamiah", label: "Al Jamiah" },
{ value: "Al Bayan", label: "Al Bayan" },
{ value: "Rahna'", label: "Rahna'" },
{ value: "Ash Shrouk", label: "Ash Shrouk" },
{ value: "As Samir", label: "As Samir" },
{ value: "Al Bawadir", label: "Al Bawadir" },
{ value: "Al Hamadaniyah", label: "Al Hamadaniyah" },
{ value: "Ash Sheraa", label: "Ash Sheraa" },
{ value: "Al Ammariyah", label: "Al Ammariyah" },
{ value: "Jeddah Eslamic Seaport", label: "Jeddah Eslamic Seaport" },
{ value: "An Naim", label: "An Naim" },
{ value: "Al Ghadir", label: "Al Ghadir" },
{ value: "Sharqia", label: "Sharqia" },
{ value: "Radwa", label: "Radwa" },
{ value: "Al Majamie", label: "Al Majamie" },
{ value: "Governmental1", label: "Governmental1" },
{ value: "Governmental2", label: "Governmental2" },
{ value: "Al Nakhil", label: "Al Nakhil" },
{ value: "Al Baghdadiyah Al Gharbiyah", label: "Al Baghdadiyah Al Gharbiyah" },
{ value: "An Noor", label: "An Noor" },
{ value: "Al Masarah", label: "Al Masarah" },
{ value: "As Sulaymaniyah", label: "As Sulaymaniyah" },
{ value: "Ar Rawdah", label: "Ar Rawdah" },
{ value: "Entertaining", label: "Entertaining" },
{ value: "Al Fadel", label: "Al Fadel" },
{ value: "Ash Shati", label: "Ash Shati" },
{ value: "As Salhiyah", label: "As Salhiyah" },
{ value: "Abhur Ash Shamaliyah", label: "Abhur Ash Shamaliyah" },
{ value: "Al Sawari", label: "Al Sawari" },
{ value: "Al Marj", label: "Al Marj" },
{ value: "Al Wafa", label: "Al Wafa" },
{ value: "Governmental1", label: "Governmental1" },
{ value: "Governmental2", label: "Governmental2" },
{ value: "Al Loaloa", label: "Al Loaloa" },
{ value: "Al Manar", label: "Al Manar" },
{ value: "As safwa", label: "As safwa" },
{ value: "Al Uwayjaa", label: "Al Uwayjaa" },
{ value: "Al Khalidiyah", label: "Al Khalidiyah" },
{ value: "Al Wasilia", label: "Al Wasilia" },
{ value: "Ar Rahbah", label: "Ar Rahbah" },
{ value: "Al Yusra", label: "Al Yusra" },
{ value: "Al Yasmin", label: "Al Yasmin" },
{ value: "Ishbiliyah", label: "Ishbiliyah" },
{ value: "Al Fayha", label: "Al Fayha" },
{ value: "Awala", label: "Awala" },
{ value: "Al Sir", label: "Al Sir" },
{ value: "Al Jafar", label: "Al Jafar" },
{ value: "Ar Rawabi", label: "Ar Rawabi" },
{ value: "Al Faisaliyah", label: "Al Faisaliyah" },
{ value: "Ar Rayaan", label: "Ar Rayaan" },
{ value: "Masrah", label: "Masrah" },
{ value: "Al Ruwaidaf", label: "Al Ruwaidaf" },
{ value: "Guard Housing", label: "Guard Housing" },
{ value: "Al Jawharah", label: "Al Jawharah" },
{ value: "Kalakh", label: "Kalakh" },
{ value: "Al Muhammadiyah", label: "Al Muhammadiyah" },
{ value: "Al Qutbiah Al Gharbia", label: "Al Qutbiah Al Gharbia" },
{ value: "Al Wakra", label: "Al Wakra" },
{ value: "Al Mudhbah", label: "Al Mudhbah" },
{ value: "As Snah", label: "As Snah" },
{ value: "An Nuzhah", label: "An Nuzhah" },
{ value: "Al Naseem", label: "Al Naseem" },
{ value: "As Safa", label: "As Safa" },
{ value: "An Naim", label: "An Naim" },
{ value: "Al Jamiah", label: "Al Jamiah" },
{ value: "Al Marwah", label: "Al Marwah" },
{ value: "Suq Ukadh", label: "Suq Ukadh" },
{ value: "Maashi", label: "Maashi" },
{ value: "Nakhab", label: "Nakhab" },
{ value: "Sultanah", label: "Sultanah" },
{ value: "Al Duhaa", label: "Al Duhaa" },
{ value: "Al Dabiea", label: "Al Dabiea" },
{ value: "Al Aziziyah", label: "Al Aziziyah" },
{ value: "Al Basatin", label: "Al Basatin" },
{ value: "Weather Station", label: "Weather Station" },
{ value: "Ar Rabwah", label: "Ar Rabwah" },
{ value: "Industrial", label: "Industrial" },
{ value: "Al Wurud", label: "Al Wurud" },
{ value: "As Safra", label: "As Safra" },
{ value: "Al Wasit", label: "Al Wasit" },
{ value: "Al Dahmaa", label: "Al Dahmaa" },
{ value: "Al Quaysam", label: "Al Quaysam" },
{ value: "Wildlife", label: "Wildlife" },
{ value: "An Nahdah", label: "An Nahdah" },
{ value: "Al Murjaniyah", label: "Al Murjaniyah" },
{ value: "Qarn Al Manazil", label: "Qarn Al Manazil" },
{ value: "Al Awajia", label: "Al Awajia" },
{ value: "Liat Al Ulya", label: "Liat Al Ulya" },
{ value: "Al Khalidiyah", label: "Al Khalidiyah" },
{ value: "Historic District", label: "Historic District" },
{ value: "Al Hazm", label: "Al Hazm" },
{ value: "Al Ghumayr", label: "Al Ghumayr" },
{ value: "Al Qadirah", label: "Al Qadirah" },
{ value: "Al Moulysaa", label: "Al Moulysaa" },
{ value: "Al Quds", label: "Al Quds" },
{ value: "Taibah", label: "Taibah" },
{ value: "Al Judia", label: "Al Judia" },
{ value: "Eastern Al Urafa", label: "Eastern Al Urafa" },
{ value: "Al Halqah Al Gharbia", label: "Al Halqah Al Gharbia" },
{ value: "Al Qayam Al Aala", label: "Al Qayam Al Aala" },
{ value: "Ash Shifa", label: "Ash Shifa" },
{ value: "Air Defense", label: "Air Defense" },
{ value: "Al Halah", label: "Al Halah" },
{ value: "Qami", label: "Qami" },
{ value: "Riha", label: "Riha" },
{ value: "Al Huwaya", label: "Al Huwaya" },
{ value: "Eudwan", label: "Eudwan" },
{ value: "Al Qumariyyah", label: "Al Qumariyyah" },
{ value: "Ashuhada Alshamaliyyah", label: "Ashuhada Alshamaliyyah" },
{ value: "As Sail Al Kabeer", label: "As Sail Al Kabeer" },
{ value: "Al Halqah Asharqiyyah", label: "Al Halqah Asharqiyyah" },
{ value: "Ash Sharafiyah", label: "Ash Sharafiyah" },
{ value: "Al Qayam Al Asfal", label: "Al Qayam Al Asfal" },
{ value: "Al Jal", label: "Al Jal" },
{ value: "Sharqia", label: "Sharqia" },
{ value: "Al Ablaa", label: "Al Ablaa" },
{ value: "Al Iskan oasis", label: "Al Iskan oasis" },
{ value: "Shubra", label: "Shubra" },
{ value: "Al Bawadi", label: "Al Bawadi" },
{ value: "Camel Field", label: "Camel Field" },
{ value: "Ar Rabwah", label: "Ar Rabwah" },
{ value: "New International Airport", label: "New International Airport" },
{ value: "Al Hada", label: "Al Hada" },
{ value: "Qena Mountains", label: "Qena Mountains" },
{ value: "Al Kudaa", label: "Al Kudaa" },
{ value: "Wadi Muharam Al Asfal", label: "Wadi Muharam Al Asfal" },
{ value: "Ar Ruddaf", label: "Ar Ruddaf" },
{ value: "Umm Al Durub", label: "Umm Al Durub" },
{ value: "Umm Al Atf", label: "Umm Al Atf" },
{ value: "Dahiyat AI Iskan", label: "Dahiyat AI Iskan" },
{ value: "As Sulaymaniyah", label: "As Sulaymaniyah" },
{ value: "Al Quhaib", label: "Al Quhaib" },
{ value: "Eayan Shams", label: "Eayan Shams" },
{ value: "Al Ghaziat", label: "Al Ghaziat" },
{ value: "As Salam", label: "As Salam" },
{ value: "Ashuhada", label: "Ashuhada" },
{ value: "Al Sudr", label: "Al Sudr" },
{ value: "As Salamah", label: "As Salamah" },
{ value: "Al Naqabah", label: "Al Naqabah" },
{ value: "Abo Aurwa", label: "Abo Aurwa" },
{ value: "Al Fath", label: "Al Fath" },
{ value: "Al Naseem", label: "Al Naseem" },
{ value: "As Safa", label: "As Safa" },
{ value: "Al Nakhil", label: "Al Nakhil" },
{ value: "Hada'", label: "Hada'" },
{ value: "Al Basatin", label: "Al Basatin" },
{ value: "Al Asala", label: "Al Asala" },
{ value: "Al Mustaqbal", label: "Al Mustaqbal" },
{ value: "Al Ain", label: "Al Ain" },
{ value: "Al Aziziyah", label: "Al Aziziyah" },
{ value: "Al Fanar", label: "Al Fanar" },
{ value: "AlOthoba", label: "AlOthoba" },
{ value: "Al Shurfa", label: "Al Shurfa" },
{ value: "Industrial", label: "Industrial" },
{ value: "Al Hadaek", label: "Al Hadaek" },
{ value: "Umm Al Sabaa", label: "Umm Al Sabaa" },
{ value: "Al Washha", label: "Al Washha" },
{ value: "Al Maarid", label: "Al Maarid" },
{ value: "Al Mathnah", label: "Al Mathnah" },
{ value: "Industrial Area", label: "Industrial Area" },
{ value: "Al Qurashiaat", label: "Al Qurashiaat" },
{ value: "Sudayrah", label: "Sudayrah" },
{ value: "Qurwa", label: "Qurwa" },
{ value: "An Narjis", label: "An Narjis" },
{ value: "Huwaya Ash Shamaliyyah", label: "Huwaya Ash Shamaliyyah" },
{ value: "An Naim", label: "An Naim" },
{ value: "An Nuzhah", label: "An Nuzhah" },
{ value: "Liat Al Sufli", label: "Liat Al Sufli" },
{ value: "Alqrahin", label: "Alqrahin" },
{ value: "Taif International Airport", label: "Taif International Airport" },
{ value: "Al Hamidiyah", label: "Al Hamidiyah" },
{ value: "Masmla", label: "Masmla" },
{ value: "Al Qutbiah Al Sharqia", label: "Al Qutbiah Al Sharqia" },
{ value: "Al Farida", label: "Al Farida" },
{ value: "The Air Base", label: "The Air Base" },
{ value: "Al Jafijif", label: "Al Jafijif" },
{ value: "Jabajib", label: "Jabajib" },
{ value: "District No. 8", label: "District No. 8" },
{ value: "District No. 1", label: "District No. 1" },
{ value: "District No. 3", label: "District No. 3" },
{ value: "Ashuhada Aljanubiyyah", label: "Ashuhada Aljanubiyyah" },
{ value: "Shihar", label: "Shihar" },
{ value: "Al Marwah", label: "Al Marwah" },
{ value: "Dst C1", label: "Dst C1" },
{ value: "District No. 9", label: "District No. 9" },
{ value: "District No. 6", label: "District No. 6" },
{ value: "District No. 10", label: "District No. 10" },
{ value: "District No. 4", label: "District No. 4" },
{ value: "District No. 5", label: "District No. 5" },
{ value: "District No. 7", label: "District No. 7" },
{ value: "District No. 2", label: "District No. 2" },
{ value: "Al Rumeida", label: "Al Rumeida" },
{ value: "Ataf Al Wizran", label: "Ataf Al Wizran" },
{ value: "Al Urj Al Aala", label: "Al Urj Al Aala" },
{ value: "Al Urj Al Asfal", label: "Al Urj Al Asfal" },
{ value: "Al Aghar", label: "Al Aghar" },
{ value: "The Hospital", label: "The Hospital" },
{ value: "Bani Seheem", label: "Bani Seheem" },
{ value: "Ghulail", label: "Ghulail" },
{ value: "Al Madarat Subdivision", label: "Al Madarat Subdivision" },
{ value: "Al Sabghan", label: "Al Sabghan" },
{ value: "Al Khuzama", label: "Al Khuzama" },
{ value: "Dst 2C", label: "Dst 2C" },
{ value: "Al Dhanbuh", label: "Al Dhanbuh" },
{ value: "South Building", label: "South Building" },
{ value: "Al Bark", label: "Al Bark" },
{ value: "North Building", label: "North Building" },
{ value: "Namaruh", label: "Namaruh" },
{ value: "South Namrah Subdivision", label: "South Namrah Subdivision" },
{ value: "Al Sulam", label: "Al Sulam" },
  { value: "Al Judr Al Gharbi", label: "Al Judr Al Gharbi" },
  { value: "Al Maleab", label: "Al Maleab" },
  { value: "Aktan", label: "Aktan" },
  { value: "Ar Rehab", label: "Ar Rehab" },
  { value: "An Nuzhah", label: "An Nuzhah" },
  { value: "North Extension", label: "North Extension" },
  { value: "Al Muliha 2", label: "Al Muliha 2" },
  { value: "Al Nutuf", label: "Al Nutuf" },
  { value: "Al Aziziyah", label: "Al Aziziyah" },
  { value: "Kuaykib", label: "Kuaykib" },
  { value: "Badr", label: "Badr" },
  { value: "Umm Thamam", label: "Umm Thamam" },
  { value: "Western Al Urafa", label: "Western Al Urafa" },
  { value: "Taif National Park in Sisad", label: "Taif National Park in Sisad" },
  { value: "Al Judr Al Sharqiu", label: "Al Judr Al Sharqiu" },
  { value: "Ar Rawdah", label: "Ar Rawdah" },
  { value: "Umm Rakah", label: "Umm Rakah" },
  { value: "Dst C4", label: "Dst C4" },
  { value: "Al Khalij", label: "Al Khalij" },
  { value: "An Nasriyah", label: "An Nasriyah" },
  { value: "Al Khalidiyah", label: "Al Khalidiyah" },
  { value: "Al Hazm", label: "Al Hazm" },
  { value: "As Suq Al Qadim", label: "As Suq Al Qadim" },
  { value: "New Taif University", label: "New Taif University" },
  { value: "Al Hujayra", label: "Al Hujayra" },
  { value: "Qanat and Qdan", label: "Qanat and Qdan" },
  { value: "Al Muhammadiyah", label: "Al Muhammadiyah" },
  { value: "Umm Hashana", label: "Umm Hashana" },
  { value: "Al Maizialah", label: "Al Maizialah" },
  { value: "Al Hijrah", label: "Al Hijrah" },
  { value: "Dst C1", label: "Dst C1" },
  { value: "Al Akhbab", label: "Al Akhbab" },
  { value: "National Guard", label: "National Guard" },
  { value: "Al Bihita", label: "Al Bihita" },
  { value: "Umm Al Rasf", label: "Umm Al Rasf" },
  { value: "Qaleat Shanqal", label: "Qaleat Shanqal" },
  { value: "Al Iskan", label: "Al Iskan" },
  { value: "Dahiyat Al-Quway'iyah", label: "Dahiyat Al-Quway'iyah" },
  { value: "Dahiyat Ha'iriyah", label: "Dahiyat Ha'iriyah" },
  { value: "Jabrah", label: "Jabrah" },
  { value: "Al Aqiq", label: "Al Aqiq" },
  { value: "Ghirnatah", label: "Ghirnatah" },
  { value: "Al Labt", label: "Al Labt" },
  { value: "Al Naseem", label: "Al Naseem" },
  { value: "Western Al Eilawah", label: "Western Al Eilawah" },
  { value: "As Sulaymaniyah", label: "As Sulaymaniyah" },
  { value: "Al Khalidiyah", label: "Al Khalidiyah" },
  { value: "An Nahdah", label: "An Nahdah" },
  { value: "Al Qult", label: "Al Qult" },
  { value: "Khada Al Haji", label: "Khada Al Haji" },
  { value: "Industrial", label: "Industrial" },
  { value: "Eastern Al Eilawah", label: "Eastern Al Eilawah" },
  { value: "Wadi Jalil", label: "Wadi Jalil" },
  { value: "Wadi Muharam Al Aaela", label: "Wadi Muharam Al Aaela" },
  { value: "Ash Shuqra", label: "Ash Shuqra" },
  { value: "At Tahliyah", label: "At Tahliyah" },
  { value: "Semnan", label: "Semnan" },
  { value: "Al Jamiah", label: "Al Jamiah" },
  { value: "Ar Rawabi", label: "Ar Rawabi" },
  { value: "Al Qadim", label: "Al Qadim" },
  { value: "As Salam", label: "As Salam" },
  { value: "Al Siana", label: "Al Siana" },
  { value: "Awdah", label: "Awdah" },
  { value: "Huwaya Al Janoubiyah", label: "Huwaya Al Janoubiyah" },
  { value: "Technology Oasis", label: "Technology Oasis" },
  { value: "Hadera", label: "Hadera" },
  { value: "Umm Alarad", label: "Umm Alarad" },
  { value: "Eikrima", label: "Eikrima" },
  { value: "Ghadeer Al Banat", label: "Ghadeer Al Banat" },
  { value: "Ben Swailem", label: "Ben Swailem" },
  { value: "Al Khamayel", label: "Al Khamayel" },
  { value: "Al Thaabitia", label: "Al Thaabitia" },
  { value: "Hittin", label: "Hittin" },
  { value: "Al Akhadir", label: "Al Akhadir" },
  { value: "Wadi Al Shurb", label: "Wadi Al Shurb" },
  { value: "Al Armiya", label: "Al Armiya" },
  { value: "As Sadad", label: "As Sadad" },
  { value: "As Sukhayrah", label: "As Sukhayrah" },
  { value: "Al Muutarid", label: "Al Muutarid" },
  { value: "Dahiyat Al Arfa", label: "Dahiyat Al Arfa" },
  { value: "الأصيل", label: "الأصيل" },
  { value: "العروس", label: "العروس" },
  { value: "حي الجدر", label: "حي الجدر" },
  { value: "السوق القديم", label: "السوق القديم" },
  { value: "حي ملهي", label: "حي ملهي" },
  { value: "الحزم", label: "الحزم" },
  { value: "حى السلم القديم", label: "حى السلم القديم" },
  { value: "البروج", label: "البروج" },
  { value: "الملحة 1", label: "الملحة 1" },
  { value: "حي الجزء الشمالي", label: "حي الجزء الشمالي" },
  { value: "الصالحية", label: "الصالحية" },
  { value: "الدعيكة", label: "الدعيكة" },
  { value: "حي حوقان", label: "حي حوقان" },
  { value: "حي سوق الانعام", label: "حي سوق الانعام" },
  { value: "حي الصناعية", label: "حي الصناعية" },
  { value: "الحي الصناعي", label: "الحي الصناعي" },
  { value: "الدغمية", label: "الدغمية" },
  { value: "حي الإسكان", label: "حي الإسكان" },
  { value: "حى رياض الدغمية", label: "حى رياض الدغمية" },
  { value: "حي الحديقة", label: "حي الحديقة" },
  { value: "حى الدغمية القديمة", label: "حى الدغمية القديمة" },
  { value: "حى الدبيلة", label: "حى الدبيلة" },
  { value: "حي التنمية الحضاري", label: "حي التنمية الحضاري" },
  { value: "حي الفصيلية", label: "حي الفصيلية" },
  { value: "حي الصالحية", label: "حي الصالحية" },
  { value: "حي النزهة", label: "حي النزهة" },
  { value: "حي السلامة", label: "حي السلامة" },
  { value: "حي الغدير", label: "حي الغدير" },
  { value: "حي النسيم", label: "حي النسيم" },
  { value: "حي الخالدية", label: "حي الخالدية" },
  { value: "حي الفيصلية", label: "حي الفيصلية" },
  { value: "حي العزيزية", label: "حي العزيزية" },
  { value: "حي المنتزة", label: "حي المنتزة" },
  { value: "حي الريان", label: "حي الريان" },
  { value: "حي جرهم الشمالي", label: "حي جرهم الشمالي" },
  { value: "حي الصفرة", label: "حي الصفرة" },
  { value: "حي حنين الشمالي", label: "حي حنين الشمالي" },
  { value: "حي السليمانية الشرقي", label: "حي السليمانية الشرقي" },
  { value: "حي السليمانية الغربي", label: "حي السليمانية الغربي" },
  { value: "حي المروة الشمالي", label: "حي المروة الشمالي" },
  { value: "حي العقبة الشمالي", label: "حي العقبة الشمالي" },
  { value: "حي جرهم الجنوبي", label: "حي جرهم الجنوبي" },
  { value: "Shizat", label: "Shizat" },
  { value: "Al Aziziyah", label: "Al Aziziyah" },
  { value: "Al Ghazud", label: "Al Ghazud" },
  { value: "Al Amarah", label: "Al Amarah" },
  { value: "Dst C4", label: "Dst C4" },
  { value: "Al Hawra", label: "Al Hawra" },
  { value: "Qurtubah", label: "Qurtubah" },
  { value: "Al Murjan", label: "Al Murjan" },
  { value: "Ar Rawabi", label: "Ar Rawabi" },
  { value: "Al Eilm", label: "Al Eilm" },
  { value: "Industrial Area", label: "Industrial Area" },
  { value: "Dst 2C", label: "Dst 2C" },
  { value: "Ar Rawdah", label: "Ar Rawdah" },
  { value: "Al Uyun", label: "Al Uyun" },
  { value: "Al Wadi", label: "Al Wadi" },
  { value: "Al Aziziyah", label: "Al Aziziyah" },
  { value: "Industrial Area 2", label: "Industrial Area 2" },
  { value: "Al Ghazlani", label: "Al Ghazlani" },
  { value: "Al Minah J", label: "Al Minah J" },
  { value: "Al Andalus", label: "Al Andalus" },
  { value: "Al Ruzaiqiah", label: "Al Ruzaiqiah" },
  { value: "Al Qitar", label: "Al Qitar" },
  { value: "Al Naseem", label: "Al Naseem" },
  { value: "Al Nakhil", label: "Al Nakhil" },
  { value: "Abyar Al Mashi", label: "Abyar Al Mashi" },
  { value: "Idman Al Sharqi", label: "Idman Al Sharqi" },
  { value: "Al Adwah", label: "Al Adwah" },
  { value: "Qaraqir", label: "Qaraqir" },
  { value: "Al Udhib", label: "Al Udhib" },
  { value: "Services Area 2", label: "Services Area 2" },
  { value: "Al Aqiq", label: "Al Aqiq" },
  { value: "Al Naseem", label: "Al Naseem" },
  { value: "Al Khushbi", label: "Al Khushbi" },
  { value: "Al Suwaydra", label: "Al Suwaydra" },
  { value: "Ar Rehab", label: "Ar Rehab" },
  { value: "Ar Rawdah", label: "Ar Rawdah" },
  { value: "As Safa", label: "As Safa" },
  { value: "Al Lajayn", label: "Al Lajayn" },
  { value: "Ad Danah", label: "Ad Danah" },
  { value: "Saq", label: "Saq" },
  { value: "Ar Rawdah", label: "Ar Rawdah" },
  { value: "As Salam", label: "As Salam" },
  { value: "Al Mahafr", label: "Al Mahafr" },
  { value: "Ar Rawdah", label: "Ar Rawdah" },
  { value: "Al Mutanazahat", label: "Al Mutanazahat" },
  { value: "Al Ghizlani Subdivision", label: "Al Ghizlani Subdivision" },
  { value: "Al Marwah", label: "Al Marwah" },
  { value: "Dst C5", label: "Dst C5" },
  { value: "Ash Shifa", label: "Ash Shifa" },
  { value: "Al Wurud", label: "Al Wurud" },
  { value: "Ayn Al Khif", label: "Ayn Al Khif" },
  { value: "Idman Al Gharbi", label: "Idman Al Gharbi" },
  { value: "Al Mafriq Al Khas", label: "Al Mafriq Al Khas" },
  { value: "Al Qalah", label: "Al Qalah" },
  { value: "Al Talal", label: "Al Talal" },
  { value: "Industrial Area", label: "Industrial Area" },
  { value: "An Naim", label: "An Naim" },
  { value: "An Nujayl", label: "An Nujayl" },
  { value: "Al Manar", label: "Al Manar" },
  { value: "Al Wurud", label: "Al Wurud" },
  { value: "Al Khalij", label: "Al Khalij" },
  { value: "Al Dhahab", label: "Al Dhahab" },
  { value: "Al Ghadir", label: "Al Ghadir" },
  { value: "Al Faisaliyah", label: "Al Faisaliyah" },
  { value: "Ghirnatah", label: "Ghirnatah" },
  { value: "Al Suraif", label: "Al Suraif" },
  { value: "Western Batihan", label: "Western Batihan" },
  { value: "Al Mafriq", label: "Al Mafriq" },
  { value: "Al Uqdah", label: "Al Uqdah" },
  { value: "Al Minah B", label: "Al Minah B" },
  { value: "Dst 2C", label: "Dst 2C" },
  { value: "Dst C3", label: "Dst C3" },
  { value: "Dst C1", label: "Dst C1" },
  { value: "Al Khalidiyah", label: "Al Khalidiyah" },
  { value: "Al Yasmin", label: "Al Yasmin" },
  { value: "Prince Abdulmohsen bin Abdulaziz Airport", label: "Prince Abdulmohsen bin Abdulaziz Airport" },
  { value: "Al Buhayrah", label: "Al Buhayrah" },
  { value: "Dst C9", label: "Dst C9" },
  { value: "Al Nakhil", label: "Al Nakhil" },
  { value: "Mishrifah", label: "Mishrifah" },
  { value: "Al Jar", label: "Al Jar" },
  { value: "Al Yaqoot", label: "Al Yaqoot" },
  { value: "An Nahdah", label: "An Nahdah" },
  { value: "Ash Shrouk", label: "Ash Shrouk" },
  { value: "Al Shiraeiba", label: "Al Shiraeiba" },
  { value: "Dst C5", label: "Dst C5" },
  { value: "Ad Dirah", label: "Ad Dirah" },
  { value: "Ad Dawhah", label: "Ad Dawhah" },
  { value: "As Sukhayrat", label: "As Sukhayrat" },
  { value: "Al Jamiah", label: "Al Jamiah" },
  { value: "Al Mansheya", label: "Al Mansheya" },
  { value: "Sadr Al Gharbaiyah", label: "Sadr Al Gharbaiyah" },
  { value: "Al Hajar", label: "Al Hajar" },
  { value: "Services Area 3", label: "Services Area 3" },
  { value: "Al Wadi", label: "Al Wadi" },
  { value: "As Samir", label: "As Samir" },
  { value: "Al Aziziyah", label: "Al Aziziyah" },
  { value: "Al Wahah", label: "Al Wahah" },
  { value: "Al Jamiah", label: "Al Jamiah" },
  { value: "As Salam", label: "As Salam" },
  { value: "Radwa", label: "Radwa" },
  { value: "Ar Rawdah", label: "Ar Rawdah" },
  { value: "Ashuhada", label: "Ashuhada" },
  { value: "Al Ghazwah", label: "Al Ghazwah" },
  { value: "Dst C3", label: "Dst C3" },
  { value: "Ar Riyadh", label: "Ar Riyadh" },
  { value: "Services Area 1", label: "Services Area 1" },
  { value: "Dst C8", label: "Dst C8" },
  { value: "Deposit and Re-export Area", label: "Deposit and Re-export Area" },
  { value: "Government Services Area", label: "Government Services Area" },
  { value: "Al Firaysh", label: "Al Firaysh" },
  { value: "Ar Rabiyah", label: "Ar Rabiyah" },
  { value: "As Samira", label: "As Samira" },
  { value: "Al Majd", label: "Al Majd" },
  { value: "Ar Rabie", label: "Ar Rabie" },
  { value: "Al Muruj", label: "Al Muruj" },
  { value: "Mangrove Reserve", label: "Mangrove Reserve" },
  { value: "Ash Shifa", label: "Ash Shifa" },
  { value: "Al Ferdous", label: "Al Ferdous" },
  { value: "Hadawda", label: "Hadawda" },
  { value: "Al Barakah", label: "Al Barakah" },
  { value: "Abu Markha", label: "Abu Markha" },
  { value: "As Sadiqiyah", label: "As Sadiqiyah" },
  { value: "Al Uyun", label: "Al Uyun" },
  { value: "Al Mughaisilah", label: "Al Mughaisilah" },
  { value: "Jabal Eir", label: "Jabal Eir" },
  { value: "Qurban", label: "Qurban" },
  { value: "Al Aqoul", label: "Al Aqoul" },
  { value: "Industrial City", label: "Industrial City" },
  { value: "Taibah", label: "Taibah" },
  { value: "Al Jamiah", label: "Al Jamiah" },
  { value: "Warqan", label: "Warqan" },
  { value: "Harat Al Wabara", label: "Harat Al Wabara" },
  { value: "As Suqya", label: "As Suqya" },
  { value: "Khakh", label: "Khakh" },
  { value: "Shuran", label: "Shuran" },
  { value: "Al Usayfirin", label: "Al Usayfirin" },
  { value: "Abu Sidr", label: "Abu Sidr" },
  { value: "Al Anabis", label: "Al Anabis" },
  { value: "Ashuhada", label: "Ashuhada" },
  { value: "Al Khalidiyah", label: "Al Khalidiyah" },
  { value: "Bani Zafar", label: "Bani Zafar" },
  { value: "Al Aziziyah", label: "Al Aziziyah" },
  { value: "Al Balqa", label: "Al Balqa" },
  { value: "As Salam", label: "As Salam" },
  { value: "Wadi al humd", label: "Wadi al humd" },
  { value: "Bir Uthman", label: "Bir Uthman" },
  { value: "Al Hadra", label: "Al Hadra" },
  { value: "Bani Muawiyah", label: "Bani Muawiyah" },
  { value: "Asharai", label: "Asharai" },
  { value: "Ash Shuraybat", label: "Ash Shuraybat" },
  { value: "Umm Al Suywf", label: "Umm Al Suywf" },
  { value: "Kittanah", label: "Kittanah" },
  { value: "Badaah", label: "Badaah" },
  { value: "Al Usbah", label: "Al Usbah" },
  { value: "Bani Al Najjar", label: "Bani Al Najjar" },
  { value: "Al Jassah", label: "Al Jassah" },
  { value: "Ad Dar", label: "Ad Dar" },
  { value: "Al Hadiqah", label: "Al Hadiqah" },
  { value: "Wairah", label: "Wairah" },
  { value: "Al Jummah", label: "Al Jummah" },
  { value: "Al Qabiba", label: "Al Qabiba" },
  { value: "King Fahd", label: "King Fahd" },
  { value: "Jabal Uhud", label: "Jabal Uhud" },
  { value: "Az Zahirah", label: "Az Zahirah" },
  { value: "Raht", label: "Raht" },
  { value: "Al Muzayayn", label: "Al Muzayayn" },
  { value: "As Sikkah Al Hadid", label: "As Sikkah Al Hadid" },
  { value: "Ad Difa", label: "Ad Difa" },
  { value: "Ar Rawabi", label: "Ar Rawabi" },
  { value: "Wadi Mahzur", label: "Wadi Mahzur" },
  { value: "Al Nuqame", label: "Al Nuqame" },
    { value: "Ad Duwaikhilah", label: "Ad Duwaikhilah" },
    { value: "Urwah", label: "Urwah" },
    { value: "Jama Umm Khaled", label: "Jama Umm Khaled" },
    { value: "Al Jabirah", label: "Al Jabirah" },
    { value: "Ash Shahba", label: "Ash Shahba" },
    { value: "Al Masani", label: "Al Masani" },
    { value: "Al Manakhah", label: "Al Manakhah" },
    { value: "Bani Abdul Ashhal", label: "Bani Abdul Ashhal" },
    { value: "Al Iskan", label: "Al Iskan" },
    { value: "An Naqa", label: "An Naqa" },
    { value: "Nubala", label: "Nubala" },
    { value: "Ash Shafiyah", label: "Ash Shafiyah" },
    { value: "Wadi Al Battan", label: "Wadi Al Battan" },
    { value: "Al Jamawat", label: "Al Jamawat" },
    { value: "Al Mufrahat", label: "Al Mufrahat" },
    { value: "Al Hafya", label: "Al Hafya" },
    { value: "As Sih", label: "As Sih" },
    { value: "As Sad", label: "As Sad" },
    { value: "Al Khatim", label: "Al Khatim" },
    { value: "Ar Ranuna", label: "Ar Ranuna" },
    { value: "Al Sahwa", label: "Al Sahwa" },
    { value: "Al Anahi", label: "Al Anahi" },
    { value: "Bani Bayadah", label: "Bani Bayadah" },
    { value: "Ad Duwaimah", label: "Ad Duwaimah" },
    { value: "Al Asheyrah", label: "Al Asheyrah" },
    { value: "Ar Rimal", label: "Ar Rimal" },
    { value: "Al Masif", label: "Al Masif" },
    { value: "Az Zahrah", label: "Az Zahrah" },
    { value: "Al Yarmuk", label: "Al Yarmuk" },
    { value: "Al Jabriyah", label: "Al Jabriyah" },
    { value: "Al Bathnah", label: "Al Bathnah" },
    { value: "Al Dabab", label: "Al Dabab" },
    { value: "Ar Rayaan", label: "Ar Rayaan" },
    { value: "Al Bandar", label: "Al Bandar" },
    { value: "As Safa", label: "As Safa" },
    { value: "Yanbu Commercial Seaport", label: "Yanbu Commercial Seaport" },
    { value: "Al Hadaek", label: "Al Hadaek" },
    { value: "Old landfill Area", label: "Old landfill Area" },
    { value: "Al Ihn", label: "Al Ihn" },
    { value: "Ad Dara", label: "Ad Dara" },
    { value: "Abu Kabir", label: "Abu Kabir" },
    { value: "Al Wadi", label: "Al Wadi" },
    { value: "Sad Al Ghaba", label: "Sad Al Ghaba" },
    { value: "As Sakb", label: "As Sakb" },
    { value: "Al Hussa", label: "Al Hussa" },
    { value: "Ar Rayah", label: "Ar Rayah" },
    { value: "Bani Harithah", label: "Bani Harithah" },
    { value: "Al Mabuth", label: "Al Mabuth" },
    { value: "Bani Khidrah", label: "Bani Khidrah" },
    { value: "Al Khadraa", label: "Al Khadraa" },
    { value: "Al Qaswa", label: "Al Qaswa" },
    { value: "Al Fath", label: "Al Fath" },
    { value: "Al Mundasa", label: "Al Mundasa" },
    { value: "Al Sahluj", label: "Al Sahluj" },
    { value: "Dhu Al Hulayfah", label: "Dhu Al Hulayfah" },
    { value: "Abu Burayqa", label: "Abu Burayqa" },
    { value: "Al Nakhil", label: "Al Nakhil" },
    { value: "Josham", label: "Josham" },
    { value: "Wadi Muzaynib", label: "Wadi Muzaynib" },
    { value: "Al Faisaliyah", label: "Al Faisaliyah" },
    { value: "Government Services Area", label: "Government Services Area" },
    { value: "Al Sawaiq", label: "Al Sawaiq" },
    { value: "Al Osaili", label: "Al Osaili" },
    { value: "Industrial Area", label: "Industrial Area" },
    { value: "Ar Rabwah", label: "Ar Rabwah" },
    { value: "Airport", label: "Airport" },
    { value: "Industrial", label: "Industrial" },
    { value: "Al Ariyd", label: "Al Ariyd" },
    { value: "Al Mulialih", label: "Al Mulialih" },
    { value: "Al Luluah", label: "Al Luluah" },
    { value: "Al Urubah", label: "Al Urubah" },
    { value: "Al Biqa", label: "Al Biqa" },
    { value: "Ash Shati", label: "Ash Shati" },
    { value: "An Nuzhah", label: "An Nuzhah" },
    { value: "Al Falah", label: "Al Falah" },
    { value: "Al Fayha", label: "Al Fayha" },
    { value: "Al Sholah", label: "Al Sholah" },
    { value: "Al Qadisiyah", label: "Al Qadisiyah" },
    { value: "An Nahdah", label: "An Nahdah" },
    { value: "Ar Rawabi", label: "Ar Rawabi" },
    { value: "Al Zuhur", label: "Al Zuhur" },
    { value: "Al Marsaa", label: "Al Marsaa" },
    { value: "Yanbu Al Balad", label: "Yanbu Al Balad" },
    { value: "Al Azhar", label: "Al Azhar" },
    { value: "Al Gharaa", label: "Al Gharaa" },
    { value: "Ar Rumanah", label: "Ar Rumanah" },
    { value: "Al Taliea", label: "Al Taliea" },
    { value: "Al Ghabah", label: "Al Ghabah" },
    { value: "Al Qiblatayn", label: "Al Qiblatayn" },
    { value: "Al Haram", label: "Al Haram" },
    { value: "حي مخطط المفرق للدخل المحدود", label: "حي مخطط المفرق للدخل المحدود" },
    { value: "مخطط الآمتداد الغربي", label: "مخطط الآمتداد الغربي" },
    { value: "حي حزرة الجنوب", label: "حي حزرة الجنوب" },
    { value: "مخطط وزارة الإسكان", label: "مخطط وزارة الإسكان" },
    { value: "مخطط البطيحان", label: "مخطط البطيحان" },
    { value: "حي الضريس", label: "حي الضريس" },
    { value: "مخطط المنح", label: "مخطط المنح" },
    { value: "حي غراب", label: "حي غراب" },
    { value: "مخطط الحناكية العام", label: "مخطط الحناكية العام" },
    { value: "حي البطيحان الشرقي", label: "حي البطيحان الشرقي" },
  { value: "حي ضعة", label: "حي ضعة" },
  { value: "حي الضميرية", label: "حي الضميرية" },
  { value: "حي المسبعة", label: "حي المسبعة" },
  { value: "مخطط الآمتداد العمراني", label: "مخطط الآمتداد العمراني" },
  { value: "حي الحمادة", label: "حي الحمادة" },
  { value: "مخطط الاستيطان", label: "مخطط الاستيطان" },
  { value: "حى الوادى", label: "حى الوادى" },
  { value: "حى الصفق الأحمر", label: "حى الصفق الأحمر" },
  { value: "حى النهضة", label: "حى النهضة" },
  { value: "حى سلطانة", label: "حى سلطانة" },
  { value: "حى الطوالعة", label: "حى الطوالعة" },
  { value: "المطار والصناعية", label: "المطار والصناعية" },
  { value: "حى الجديدة", label: "حى الجديدة" },
  { value: "ج 6", label: "ج 6" },
  { value: "المنح ا", label: "المنح ا" },
  { value: "Al Olaya", label: "Al Olaya" },
  { value: "Al Marqab", label: "Al Marqab" },
  { value: "Ramat", label: "Ramat" },
  { value: "Ar Rawdah", label: "Ar Rawdah" },
  { value: "Al Ubaylah", label: "Al Ubaylah" },
  { value: "Al Andalus", label: "Al Andalus" },
  { value: "Ar Rayaan", label: "Ar Rayaan" },
  { value: "Al Qabaeia", label: "Al Qabaeia" },
  { value: "Al Manar", label: "Al Manar" },
  { value: "Umm Talea", label: "Umm Talea" },
  { value: "An Nahdah", label: "An Nahdah" },
  { value: "Al Khalij", label: "Al Khalij" },
  { value: "King Fahd", label: "King Fahd" },
  { value: "Ad Dirah", label: "Ad Dirah" },
  { value: "Az Zahrah", label: "Az Zahrah" },
  { value: "Al Yasmin", label: "Al Yasmin" },
  { value: "Al Dihla", label: "Al Dihla" },
  { value: "Qurtubah", label: "Qurtubah" },
  { value: "Al Asfar", label: "Al Asfar" },
  { value: "As Sulaymaniyah", label: "As Sulaymaniyah" },
  { value: "Al Muntazah", label: "Al Muntazah" },
  { value: "Ruwad", label: "Ruwad" },
  { value: "Al Iskan", label: "Al Iskan" },
  { value: "Al Naseem", label: "Al Naseem" },
  { value: "An Nada", label: "An Nada" },
  { value: "As Salam", label: "As Salam" },
  { value: "Ishbiliyah", label: "Ishbiliyah" },
  { value: "Al Jamiah", label: "Al Jamiah" },
  { value: "Al Badiah", label: "Al Badiah" },
  { value: "Al Majd", label: "Al Majd" },
  { value: "Ar Rabie", label: "Ar Rabie" },
  { value: "Al Basatin", label: "Al Basatin" },
  { value: "Al Qadisiyah", label: "Al Qadisiyah" },
  { value: "Al Baida", label: "Al Baida" },
  { value: "Ar Rabwah", label: "Ar Rabwah" },
  { value: "Industrial", label: "Industrial" },
  { value: "Al Amal", label: "Al Amal" },
  { value: "As Siha", label: "As Siha" },
  { value: "Al Ufuq", label: "Al Ufuq" },
  { value: "Awthal", label: "Awthal" },
  { value: "East Uthal", label: "East Uthal" },
  { value: "West Uthal", label: "West Uthal" },
  { value: "An Noor", label: "An Noor" },
  { value: "Ar Riyadh", label: "Ar Riyadh" },
  { value: "Al Hijrah", label: "Al Hijrah" },
  { value: "Ghirnatah", label: "Ghirnatah" },
  { value: "Al Muhammadiyah", label: "Al Muhammadiyah" },
  { value: "Al Mutiwi Center", label: "Al Mutiwi Center" },
  { value: "Qaryat Al Rumthiya", label: "Qaryat Al Rumthiya" },
  { value: "Al Abdaliah", label: "Al Abdaliah" },
  { value: "Al Faisaliyah", label: "Al Faisaliyah" },
  { value: "Ar Rafiah", label: "Ar Rafiah" },
  { value: "Ghaf Al Jiwaa", label: "Ghaf Al Jiwaa" },
  { value: "Rawd Al Jawa'", label: "Rawd Al Jawa'" },
  { value: "Al Mawta", label: "Al Mawta" },
  { value: "Al Janub", label: "Al Janub" },
  { value: "As Salmiya", label: "As Salmiya" },
  { value: "Al Anwar", label: "Al Anwar" },
  { value: "Al Rabiyah", label: "Al Rabiyah" },
  { value: "Mabrukah", label: "Mabrukah" },
  { value: "Khub Al Jutaily", label: "Khub Al Jutaily" },
  { value: "An Noor", label: "An Noor" },
  { value: "Qurtubah", label: "Qurtubah" },
  { value: "Ad Dahi Al Sharqi", label: "Ad Dahi Al Sharqi" },
  { value: "Al Maarid", label: "Al Maarid" },
  { value: "Al Wurud", label: "Al Wurud" },
  { value: "Ar Rabwah", label: "Ar Rabwah" },
  { value: "Al Zarqa", label: "Al Zarqa" },
  { value: "Khadira Al Janubiyah", label: "Khadira Al Janubiyah" },
  { value: "Al Quwaie", label: "Al Quwaie" },
  { value: "Al Wasie", label: "Al Wasie" },
  { value: "Al Mateeniyat", label: "Al Mateeniyat" },
  { value: "Al Hadyah Al Janubiyah", label: "Al Hadyah Al Janubiyah" },
  { value: "Ar Rawdah", label: "Ar Rawdah" },
  { value: "Al Jarad", label: "Al Jarad" },
  { value: "Wahtan", label: "Wahtan" },
  { value: "Al Qadisiyah", label: "Al Qadisiyah" },
  { value: "Khub Al Buraydi", label: "Khub Al Buraydi" },
  { value: "An Nuzhah", label: "An Nuzhah" },
  { value: "Al Izdihar", label: "Al Izdihar" },
  { value: "Al Marqab", label: "Al Marqab" },
  { value: "Al Maharees", label: "Al Maharees" },
  { value: "Al Quwayteer", label: "Al Quwayteer" },
  { value: "An Narjis", label: "An Narjis" },
  { value: "Al Hadyah Al Shamaliya", label: "Al Hadyah Al Shamaliya" },
  { value: "Al Tawfiq", label: "Al Tawfiq" },
  { value: "Al Manakh", label: "Al Manakh" },
  { value: "Al Badi", label: "Al Badi" },
  { value: "Al Khabib", label: "Al Khabib" },
  { value: "Al Budur", label: "Al Budur" },
  { value: "Al Salam Al Gharbi", label: "Al Salam Al Gharbi" },
  { value: "Taibah", label: "Taibah" },
  { value: "Al Safra", label: "Al Safra" },
  { value: "Al Hilal", label: "Al Hilal" },
  { value: "Al Liwan", label: "Al Liwan" },
  { value: "Al Sadah", label: "Al Sadah" },
  { value: "Al Qaa Al Barid", label: "Al Qaa Al Barid" },
  { value: "Al Diya", label: "Al Diya" },
  { value: "Al Falah", label: "Al Falah" },
  { value: "Al Muraydeesiyah Al Shamaliyah", label: "Al Muraydeesiyah Al Shamaliyah" },
  { value: "Al Muntazah Al Sharqi", label: "Al Muntazah Al Sharqi" },
  { value: "Al Qusayah", label: "Al Qusayah" },
  { value: "Ar Rawabi", label: "Ar Rawabi" },
  { value: "Khadira Al Shamaliyah", label: "Khadira Al Shamaliyah" },
  { value: "Rawaq Al Gharbi", label: "Rawaq Al Gharbi" },
  { value: "Al Quds", label: "Al Quds" },
  { value: "Al Nakhil", label: "Al Nakhil" },
  { value: "Al Sabbakh", label: "Al Sabbakh" },
  { value: "Al Radwan", label: "Al Radwan" },
  { value: "Al Sawamie", label: "Al Sawamie" },
  { value: "Al Basatin Al Gharbi", label: "Al Basatin Al Gharbi" },
  { value: "Al Amal", label: "Al Amal" },
  { value: "Al Naziyah", label: "Al Naziyah" },
  { value: "Ar Raihan", label: "Ar Raihan" },
  { value: "Al Ferdous", label: "Al Ferdous" },
  { value: "Ash Shrouk", label: "Ash Shrouk" },
  { value: "At Taysir", label: "At Taysir" },
  { value: "Jubarah", label: "Jubarah" },
  { value: "Al Rashidiyyat", label: "Al Rashidiyyat" },
  { value: "Khub Ath Thanyan", label: "Khub Ath Thanyan" },
  { value: "Al Naqa Al Sharqi", label: "Al Naqa Al Sharqi" },
  { value: "Al Khudar", label: "Al Khudar" },
  { value: "Al Mulayda", label: "Al Mulayda" },
  { value: "Al Mursalat", label: "Al Mursalat" },
  { value: "Al Khuzama", label: "Al Khuzama" },
  { value: "Al Hamra", label: "Al Hamra" },
  { value: "Al Muntazah Al Gharbi", label: "Al Muntazah Al Gharbi" },
  { value: "Al Shiqah", label: "Al Shiqah" },
  { value: "Al Naqeeb Al Janubi", label: "Al Naqeeb Al Janubi" },
  { value: "Al Shafaq", label: "Al Shafaq" },
  { value: "Ayn Hamzah", label: "Ayn Hamzah" },
  { value: "Al Subayhiyyah", label: "Al Subayhiyyah" },
  { value: "Al Farouk", label: "Al Farouk" },
  { value: "Al Watah", label: "Al Watah" },
  { value: "Al Salam Al Sharqi", label: "Al Salam Al Sharqi" },
  { value: "Khub Al Qabar", label: "Khub Al Qabar" },
  { value: "Dst C21", label: "Dst C21" },
  { value: "Al Mukaili", label: "Al Mukaili" },
  { value: "Al Hazm", label: "Al Hazm" },
  { value: "Al Khulud", label: "Al Khulud" },
  { value: "Al Naqeeb Al Shamali", label: "Al Naqeeb Al Shamali" },
  { value: "An Nahdah", label: "An Nahdah" },
  { value: "Ar Rimal", label: "Ar Rimal" },
  { value: "Al Marwah", label: "Al Marwah" },
  { value: "Al Humar Al Shamali", label: "Al Humar Al Shamali" },
  { value: "Huwailan", label: "Huwailan" },
  { value: "An Nafl", label: "An Nafl" },
  { value: "At Taalim", label: "At Taalim" },
  { value: "As Safra", label: "As Safra" },
  { value: "Al Manar", label: "Al Manar" },
  { value: "Al Wahah", label: "Al Wahah" },
  { value: "Al Wusayta", label: "Al Wusayta" },
  { value: "Ar Rayaan", label: "Ar Rayaan" },
  { value: "Al Jamiah", label: "Al Jamiah" },
  { value: "Al Khalij", label: "Al Khalij" },
  { value: "Al Masani", label: "Al Masani" },
  { value: "Al Shammas", label: "Al Shammas" },
  { value: "Al Maida", label: "Al Maida" },
  { value: "Al Shiqah Al Ulya", label: "Al Shiqah Al Ulya" },
  { value: "Al Naqa Al Gharbi", label: "Al Naqa Al Gharbi" },
  { value: "Al Amn", label: "Al Amn" },
  { value: "Az Zahrah", label: "Az Zahrah" },
  { value: "Al Takhassusi", label: "Al Takhassusi" },
  { value: "Al Fakhriyah", label: "Al Fakhriyah" },
  { value: "Ar Rabie", label: "Ar Rabie" },
  { value: "Al Mansurah", label: "Al Mansurah" },
  { value: "Ar Rehab", label: "Ar Rehab" },
  { value: "As Sulaymaniyah", label: "As Sulaymaniyah" },
  { value: "Dst C25", label: "Dst C25" },
  { value: "Dst C22", label: "Dst C22" },
  { value: "As Salam", label: "As Salam" },
  { value: "As Salhiyah", label: "As Salhiyah" },
  { value: "Dst C20", label: "Dst C20" },
  { value: "Al Khalidiyah", label: "Al Khalidiyah" },
  { value: "Dst C19", label: "Dst C19" },
  { value: "Ar Rayaan", label: "Ar Rayaan" },
  { value: "Al Ujaybah", label: "Al Ujaybah" },
  { value: "Al Yarmuk", label: "Al Yarmuk" },
  { value: "Al Lusayb", label: "Al Lusayb" },
  { value: "Al Uraymidi Al Shamali", label: "Al Uraymidi Al Shamali" },
  { value: "Darij", label: "Darij" },
  { value: "Old Airport", label: "Old Airport" },
  { value: "North Uthal", label: "North Uthal" },
  { value: "Al Olaya", label: "Al Olaya" },
  { value: "Al Fayziyah", label: "Al Fayziyah" },
  { value: "Al Yasmin", label: "Al Yasmin" },
  { value: "Al Yatimah", label: "Al Yatimah" },
  { value: "Ar Rafiah", label: "Ar Rafiah" },
  { value: "Al Batin", label: "Al Batin" },
  { value: "Al Akhdar", label: "Al Akhdar" },
  { value: "Al Humar Al Janubi", label: "Al Humar Al Janubi" },
  { value: "Alaihtifalat", label: "Alaihtifalat" },
  { value: "King Faisal", label: "King Faisal" },
  { value: "Al Madinah", label: "Al Madinah" },
  { value: "Industrial", label: "Industrial" },
  { value: "Bahja", label: "Bahja" },
  { value: "Al Faisaliyah", label: "Al Faisaliyah" },
  { value: "King Abdulaziz", label: "King Abdulaziz" },
  { value: "Az Zahrah", label: "Az Zahrah" },
  { value: "King Khalid", label: "King Khalid" },
  { value: "Airport", label: "Airport" },
  { value: "Al Manar", label: "Al Manar" },
  { value: "Al Hawta", label: "Al Hawta" },
  { value: "Al Hazm", label: "Al Hazm" },
  { value: "Ar Rabie", label: "Ar Rabie" },
  { value: "As Salam", label: "As Salam" },
  { value: "At Taalim", label: "At Taalim" },
  { value: "Al Qadisiyah", label: "Al Qadisiyah" },
  { value: "Al Muntazah", label: "Al Muntazah" },
  { value: "Al Naseem", label: "Al Naseem" },
  { value: "Ashuhada", label: "Ashuhada" },
  { value: "Al Khalij", label: "Al Khalij" },
  { value: "Al Jandal", label: "Al Jandal" },
  { value: "Ash Shifa", label: "Ash Shifa" },
  { value: "Ar Rawdah", label: "Ar Rawdah" },
  { value: "Al Quds", label: "Al Quds" },
  { value: "Almatiuh", label: "Almatiuh" },
  { value: "An Nahdah", label: "An Nahdah" },
  { value: "Taibah", label: "Taibah" },
  { value: "Wadi Alruma", label: "Wadi Alruma" },
  { value: "Alshannanuh Ash Shamaliyah", label: "Alshannanuh Ash Shamaliyah" },
  { value: "Al Hamra", label: "Al Hamra" },
  { value: "Al Masif", label: "Al Masif" },
  { value: "As Sad", label: "As Sad" },
  { value: "Al Obayel", label: "Al Obayel" },
  { value: "Al Gareef", label: "Al Gareef" },
  { value: "Al Andalus", label: "Al Andalus" },
  { value: "Al Nakhil", label: "Al Nakhil" },
  { value: "Ar Rawabi", label: "Ar Rawabi" },
  { value: "Al Saadah", label: "Al Saadah" },
  { value: "Al Gharbi", label: "Al Gharbi" },
  { value: "Al Muruj", label: "Al Muruj" },
  { value: "Alshannanuh Al Janubiyah", label: "Alshannanuh Al Janubiyah" },
  { value: "Al Wahah", label: "Al Wahah" },
  { value: "Al Wurud", label: "Al Wurud" },
  { value: "Suq Al Mashiya", label: "Suq Al Mashiya" },
  { value: "Al Muraydeesiyah Al Janubiyah", label: "Al Muraydeesiyah Al Janubiyah" },
  { value: "Al Basatin Al Sharqi", label: "Al Basatin Al Sharqi" },
  { value: "Al Quds", label: "Al Quds" },
  { value: "Ar Rawdah", label: "Ar Rawdah" },
  { value: "Industrial", label: "Industrial" },
  { value: "Al Qadisiyah", label: "Al Qadisiyah" },
  { value: "Al Ufuq", label: "Al Ufuq" },
  { value: "Al Masif", label: "Al Masif" },
  { value: "Al Jardah", label: "Al Jardah" },
  { value: "Al Naseem", label: "Al Naseem" },
  { value: "Al Uraymidi Al Janubi", label: "Al Uraymidi Al Janubi" },
  { value: "Al Oud", label: "Al Oud" },
  { value: "Ad Dahi Al Gharbi", label: "Ad Dahi Al Gharbi" },
  { value: "At Talaah", label: "At Talaah" },
  { value: "As Safa", label: "As Safa" },
  { value: "Al Qirawan", label: "Al Qirawan" },
  { value: "Wasit", label: "Wasit" },
  { value: "Al Butah", label: "Al Butah" },
  { value: "Rawaq Al Sharqi", label: "Rawaq Al Sharqi" },
  { value: "Al Jazirah", label: "Al Jazirah" },
  { value: "Al Manar", label: "Al Manar" },
  { value: "Al Iskan", label: "Al Iskan" },
  { value: "Al Zaytunah", label: "Al Zaytunah" },
  { value: "Al Ghadir", label: "Al Ghadir" },
  { value: "An Nahdah", label: "An Nahdah" },
  { value: "Al Hazm", label: "Al Hazm" },
  { value: "Ar Rabwah", label: "Ar Rabwah" },
  { value: "An Nuzhah", label: "An Nuzhah" },
  { value: "Al Yarmuk", label: "Al Yarmuk" },
  { value: "Al Jazirah", label: "Al Jazirah" },
  { value: "Al Fayha", label: "Al Fayha" },
  { value: "Hittin", label: "Hittin" },
  { value: "Alashrafia", label: "Alashrafia" },
  { value: "Al Hamra", label: "Al Hamra" },
  { value: "Taibah", label: "Taibah" },
  { value: "Al Jamiah", label: "Al Jamiah" },
  { value: "Ohod", label: "Ohod" },
  { value: "Industrial", label: "Industrial" },
  { value: "Al Yamamah", label: "Al Yamamah" },
  { value: "An Nadheem", label: "An Nadheem" },
  { value: "Al Marwah", label: "Al Marwah" },
  { value: "Ash Shrouk", label: "Ash Shrouk" },
  { value: "As Safa", label: "As Safa" },
  { value: "King Fahd", label: "King Fahd" },
  { value: "Samah", label: "Samah" },
  { value: "Al Muruj", label: "Al Muruj" },
  { value: "Al Jawharah", label: "Al Jawharah" },
  { value: "As Sulaymaniyah", label: "As Sulaymaniyah" },
  { value: "Al Wafa", label: "Al Wafa" },
  { value: "Ghirnatah", label: "Ghirnatah" },
  { value: "Al Qirawan", label: "Al Qirawan" },
  { value: "King Khalid", label: "King Khalid" },
  { value: "Ar Rayah", label: "Ar Rayah" },
  { value: "Aj Jilda", label: "Aj Jilda" },
  { value: "Al Jamie", label: "Al Jamie" },
  { value: "An Narjis", label: "An Narjis" },
  { value: "Al Manar", label: "Al Manar" },
  { value: "Al Bustan", label: "Al Bustan" },
  { value: "Sports", label: "Sports" },
  { value: "Al Wahah", label: "Al Wahah" },
  { value: "Al Durra", label: "Al Durra" },
  { value: "Al Andalus", label: "Al Andalus" },
  { value: "Al Olaya", label: "Al Olaya" },
  { value: "As Salhiyah", label: "As Salhiyah" },
  { value: "Al Jamiyin", label: "Al Jamiyin" },
  { value: "Ar Rayaan", label: "Ar Rayaan" },
  { value: "Ash Shifa", label: "Ash Shifa" },
  { value: "Al Fakhriyah", label: "Al Fakhriyah" },
  { value: "As Salam", label: "As Salam" },
  { value: "Al Khazzan", label: "Al Khazzan" },
  { value: "At Taawun", label: "At Taawun" },
  { value: "Zubaydah", label: "Zubaydah" },
  { value: "Al Quds", label: "Al Quds" },
  { value: "Al Nafid", label: "Al Nafid" },
  { value: "Al Wadi", label: "Al Wadi" },
  { value: "Al Safra", label: "Al Safra" },
  { value: "Al Buaiten", label: "Al Buaiten" },
  { value: "King Salman bin Abdulaziz", label: "King Salman bin Abdulaziz" },
  { value: "City Center", label: "City Center" },
  { value: "Al Maali", label: "Al Maali" },
  { value: "Al Wahlan", label: "Al Wahlan" },
  { value: "Ar Rimal", label: "Ar Rimal" },
  { value: "Al Awniyah", label: "Al Awniyah" },
  { value: "Al Masif", label: "Al Masif" },
  { value: "Al-Hajib", label: "Al-Hajib" },
  { value: "Ad Dawhah", label: "Ad Dawhah" },
  { value: "Ar Raaysia", label: "Ar Raaysia" },
  { value: "Al Khalidiyah", label: "Al Khalidiyah" },
  { value: "Ar Rawdah", label: "Ar Rawdah" },
  { value: "Sonam", label: "Sonam" },
  { value: "Al Hufayrah", label: "Al Hufayrah" },
  { value: "Al Muhandisin", label: "Al Muhandisin" },
  { value: "Ar Rawabi", label: "Ar Rawabi" },
  { value: "Al Khuzama", label: "Al Khuzama" },
  { value: "Al Qadisiyah", label: "Al Qadisiyah" },
  { value: "Ar Rahmanyah", label: "Ar Rahmanyah" },
  { value: "Ar Rafiah", label: "Ar Rafiah" },
  { value: "حي القلعة", label: "حي القلعة" },
  { value: "حي الأندلس", label: "حي الأندلس" },
  { value: "حي المئوية", label: "حي المئوية" },
  { value: "حي البدع", label: "حي البدع" },
  { value: "حي برزة", label: "حي برزة" },
  { value: "حي الواسط", label: "حي الواسط" },
  { value: "حي الصناعية", label: "حي الصناعية" },
  { value: "حي المتوكل", label: "حي المتوكل" },
  { value: "حي الصفاء", label: "حي الصفاء" },
  { value: "حي السلام", label: "حي السلام" },
  { value: "حي القادسية", label: "حي القادسية" },
  { value: "حي النخيل", label: "حي النخيل" },
  { value: "حي الرفيعة", label: "حي الرفيعة" },
  { value: "حي الوزير", label: "حي الوزير" },
  { value: "حي العقدة", label: "حي العقدة" },
  { value: "حي الفاروق", label: "حي الفاروق" },
  { value: "حي المملكة", label: "حي المملكة" },
  { value: "حي الخبيب", label: "حي الخبيب" },
  { value: "حي الغرسات", label: "حي الغرسات" },
  { value: "حي الجال", label: "حي الجال" },
  { value: "حي الشماس", label: "حي الشماس" },
  { value: "حي البلاد", label: "حي البلاد" },
  { value: "حي القدس", label: "حي القدس" },
  { value: "حي الشفاء", label: "حي الشفاء" },
  { value: "حي المتحف", label: "حي المتحف" },
  { value: "حي العزيزية", label: "حي العزيزية" },
  { value: "حي الاستراحات", label: "حي الاستراحات" },
  { value: "حي الربوة", label: "حي الربوة" },
  { value: "حي الروضة", label: "حي الروضة" },
  { value: "حي الازهار", label: "حي الازهار" },
  { value: "حي العليا", label: "حي العليا" },
  { value: "حي النزهة", label: "حي النزهة" },
  { value: "حي الجزيرة", label: "حي الجزيرة" },
  { value: "حي المنتزة", label: "حي المنتزة" },
  { value: "حي البساتين", label: "حي البساتين" },
  { value: "حي الزهرة", label: "حي الزهرة" },
  { value: "حي النهضة", label: "حي النهضة" },
  { value: "حى النخيل", label: "حى النخيل" },
  { value: "حى البرقاء", label: "حى البرقاء" },
  { value: "قصر العبدالله", label: "قصر العبدالله" },
  { value: "عين ابن فهيد", label: "عين ابن فهيد" },
  { value: "طريف الأسياح", label: "طريف الأسياح" },
  { value: "التنومة", label: "التنومة" },
  { value: "البرود", label: "البرود" },
  { value: "خصيبة", label: "خصيبة" },
  { value: "حى العيون", label: "حى العيون" },
  { value: "حى الفهيد", label: "حى الفهيد" },
  { value: "حى السلام", label: "حى السلام" },
  { value: "حى التعاون", label: "حى التعاون" },
  { value: "حي عين بن فهيد", label: "حي عين بن فهيد" },
  { value: "حى الرياض", label: "حى الرياض" },
  { value: "الشنانة", label: "الشنانة" },
  { value: "الشورقية", label: "الشورقية" },
  { value: "الجحانية", label: "الجحانية" },
  { value: "الجراية", label: "الجراية" },
  { value: "العليا والهيشة", label: "العليا والهيشة" },
  { value: "نبعة", label: "نبعة" },
  { value: "الديرة القديمة", label: "الديرة القديمة" },
  { value: "المروج", label: "المروج" },
  { value: "قليطة", label: "قليطة" },
  { value: "الملك عبدالله", label: "الملك عبدالله" },
  { value: "المقاطر", label: "المقاطر" },
  { value: "سهلة المطلق", label: "سهلة المطلق" },
  { value: "النويديس", label: "النويديس" },
  { value: "حي المقبرة", label: "حي المقبرة" },
  { value: "محطة معالجة", label: "محطة معالجة" },
  { value: "ام عشيرة", label: "ام عشيرة" },
  { value: "قرطبة", label: "قرطبة" },
  { value: "اللصافة", label: "اللصافة" },
  { value: "صفية", label: "صفية" },
  { value: "الرفيعة", label: "الرفيعة" },
  { value: "النسيم", label: "النسيم" },
  { value: "السليمية", label: "السليمية" },
  { value: "مزارع العدان", label: "مزارع العدان" },
  { value: "الفايزية", label: "الفايزية" },
  { value: "مزرعة جنوب", label: "مزرعة جنوب" },
  { value: "المنار", label: "المنار" },
  { value: "أم الحمام", label: "أم الحمام" },
  { value: "القاع", label: "القاع" },
  { value: "شورقية الجارالله", label: "شورقية الجارالله" },
  { value: "منتزهات خرطم", label: "منتزهات خرطم" },
  { value: "الورود", label: "الورود" },
  { value: "مزرعة شمال", label: "مزرعة شمال" },
  { value: "المجصة", label: "المجصة" },
  { value: "الحصان", label: "الحصان" },
  { value: "عين العقيلي", label: "عين العقيلي" },
  { value: "البستان", label: "البستان" },
  { value: "القادسية", label: "القادسية" },
  { value: "الدوائر الحكومي", label: "الدوائر الحكومي" },
  { value: "الجادة", label: "الجادة" },
  { value: "الروضة", label: "الروضة" },
  { value: "سمحة", label: "سمحة" },
  { value: "النهير", label: "النهير" },
  { value: "الحزم", label: "الحزم" },
  { value: "الجديدة", label: "الجديدة" },
  { value: "عسيلة", label: "عسيلة" },
  { value: "الخزان", label: "الخزان" },
  { value: "التحلية", label: "التحلية" },
  { value: "الرميلة", label: "الرميلة" },
  { value: "مزارع السفالة", label: "مزارع السفالة" },
  { value: "الصناعية", label: "الصناعية" },
  { value: "النصيرة", label: "النصيرة" },
  { value: "النخيل", label: "النخيل" },
  { value: "العلاوة", label: "العلاوة" },
  { value: "خزامى", label: "خزامى" },
  { value: "الاندلس", label: "الاندلس" },
  { value: "المنتزة", label: "المنتزة" },
  { value: "المنيقع", label: "المنيقع" },
  { value: "القفيفة", label: "القفيفة" },
  { value: "الثليماء", label: "الثليماء" },
  { value: "شيحة", label: "شيحة" },
  { value: "الفضيلة", label: "الفضيلة" },
  { value: "حي الملك عبد العزيز", label: "حي الملك عبد العزيز" },
  { value: "حي الملك سلمان", label: "حي الملك سلمان" },
  { value: "حي الامير فهد الفيصل", label: "حي الامير فهد الفيصل" },
  { value: "حي الملك عبدالله", label: "حي الملك عبدالله" },
  { value: "حي الملك خالد", label: "حي الملك خالد" },
  { value: "حي الملك سعود", label: "حي الملك سعود" },
  { value: "حي الملك فهد", label: "حي الملك فهد" },
  { value: "حي الملك فيصل", label: "حي الملك فيصل" },
  { value: "33ج", label: "33ج" },
  { value: "الامية", label: "الامية" },
  { value: "الغماس2", label: "الغماس2" },
  { value: "الغماس1", label: "الغماس1" },
  { value: "ضب روضان", label: "ضب روضان" },
  { value: "34ج", label: "34ج" },
  { value: "البصر3", label: "البصر3" },
  { value: "الجديدات", label: "الجديدات" },
  { value: "ضراس", label: "ضراس" },
  { value: "العقيلات", label: "العقيلات" },
  { value: "31ج", label: "31ج" },
  { value: "الدعيشة", label: "الدعيشة" },
  { value: "البصر2", label: "البصر2" },
  { value: "العاقول", label: "العاقول" },
  { value: "البصر1", label: "البصر1" },
  { value: "غرناطة", label: "غرناطة" },
  { value: "الريان", label: "الريان" },
  { value: "البستان", label: "البستان" },
  { value: "الخالدية", label: "الخالدية" },
  { value: "المصيف", label: "المصيف" },
  { value: "النرجس", label: "النرجس" },
  { value: "حي الورود", label: "حي الورود" },
  { value: "حي النخيل", label: "حي النخيل" },
  { value: "حي الياسمين", label: "حي الياسمين" },
  { value: "حي الازدهار", label: "حي الازدهار" },
  { value: "حي الملك فهد", label: "حي الملك فهد" },
  { value: "حي النهضة", label: "حي النهضة" },
  { value: "حي السلام", label: "حي السلام" },
  { value: "حي القدس", label: "حي القدس" },
  { value: "حي الملك عبدالله", label: "حي الملك عبدالله" },
  { value: "حي الربوة", label: "حي الربوة" },
  { value: "حي الأندلس", label: "حي الأندلس" },
  { value: "المنار", label: "المنار" },
  { value: "المرقب", label: "المرقب" },
  { value: "البساتين", label: "البساتين" },
  { value: "الورود", label: "الورود" },
  { value: "الوادي", label: "الوادي" },
  { value: "السلام", label: "السلام" },
  { value: "الندى", label: "الندى" },
  { value: "التراثي", label: "التراثي" },
  { value: "Al Khalidiyah Al Janubiyah", label: "Al Khalidiyah Al Janubiyah" },
  { value: "Al Zuhur", label: "Al Zuhur" },
  { value: "Bab As Sab", label: "Bab As Sab" },
  { value: "Ash Shura", label: "Ash Shura" },
  { value: "Al Qadih", label: "Al Qadih" },
  { value: "As Sahil", label: "As Sahil" },
  { value: "Ar Rawabi", label: "Ar Rawabi" },
  { value: "Al Badiah", label: "Al Badiah" },
  { value: "Al Sawari", label: "Al Sawari" },
  { value: "An Naqa", label: "An Naqa" },
  { value: "Halat Mahish", label: "Halat Mahish" },
  { value: "Kuwaikib", label: "Kuwaikib" },
  { value: "Ar Rimal", label: "Ar Rimal" },
  { value: "Al Yaqoot", label: "Al Yaqoot" },
  { value: "Umm As Sahik", label: "Umm As Sahik" },
  { value: "Al Khisab", label: "Al Khisab" },
  { value: "Al Ghadir", label: "Al Ghadir" },
  { value: "Ar Rehab", label: "Ar Rehab" },
  { value: "Al Amal", label: "Al Amal" },
  { value: "Az Zomorod1", label: "Az Zomorod1" },
  { value: "Industrial1", label: "Industrial1" },
  { value: "Al Masudiyah", label: "Al Masudiyah" },
  { value: "Qatif Beach", label: "Qatif Beach" },
  { value: "Al Muruj", label: "Al Muruj" },
  { value: "Umm Al Hamam", label: "Umm Al Hamam" },
  { value: "Ar Rabeiyah", label: "Ar Rabeiyah" },
  { value: "Al Fath", label: "Al Fath" },
  { value: "Al Andalus", label: "Al Andalus" },
  { value: "Ash Shamasiyyah", label: "Ash Shamasiyyah" },
  { value: "Al Masif", label: "Al Masif" },
  { value: "Al Iskan", label: "Al Iskan" },
  { value: "Ad Dababiyyah", label: "Ad Dababiyyah" },
  { value: "Al Qalah", label: "Al Qalah" },
  { value: "Al Kawthar", label: "Al Kawthar" },
  { value: "Hazm", label: "Hazm" },
  { value: "Al Jabal", label: "Al Jabal" },
  { value: "Al Majidiyah", label: "Al Majidiyah" },
  { value: "Ash Shweikah", label: "Ash Shweikah" },
  { value: "Al Murjan", label: "Al Murjan" },
  { value: "Al Khalij", label: "Al Khalij" },
  { value: "Al Marwah", label: "Al Marwah" },
  { value: "Al Jawharah", label: "Al Jawharah" },
  { value: "Ar Rif", label: "Ar Rif" },
  { value: "Al Badi", label: "Al Badi" },
  { value: "An Narjis", label: "An Narjis" },
  { value: "Al Manar", label: "Al Manar" },
  { value: "Al Aziziyah", label: "Al Aziziyah" },
  { value: "Ar Rabie", label: "Ar Rabie" },
  { value: "An Narjis1", label: "An Narjis1" },
  { value: "Al Bahari", label: "Al Bahari" },
  { value: "Al Wadiah", label: "Al Wadiah" },
  { value: "Al Muhammadiyah", label: "Al Muhammadiyah" },
  { value: "As Salam", label: "As Salam" },
  { value: "Abu Main", label: "Abu Main" },
  { value: "Al Khamisah", label: "Al Khamisah" },
  { value: "Al Yamamah", label: "Al Yamamah" },
  { value: "Al Khatrashiyah", label: "Al Khatrashiyah" },
  { value: "Darin", label: "Darin" },
  { value: "Al Khalij", label: "Al Khalij" },
  { value: "Al Jazirah", label: "Al Jazirah" },
  { value: "Ar Ruwaihah", label: "Ar Ruwaihah" },
  { value: "Al Nakhil", label: "Al Nakhil" },
  { value: "Al Naseem", label: "Al Naseem" },
  { value: "Ghirnatah", label: "Ghirnatah" },
  { value: "Ar Rida", label: "Ar Rida" },
  { value: "Al Jish", label: "Al Jish" },
  { value: "Al Manakh", label: "Al Manakh" },
  { value: "An Noor", label: "An Noor" },
  { value: "Al Madinah", label: "Al Madinah" },
  { value: "Az Zour", label: "Az Zour" },
  { value: "Al Mahar", label: "Al Mahar" },
  { value: "Al Urubah", label: "Al Urubah" },
  { value: "Ar Raihan", label: "Ar Raihan" },
  { value: "Az Zarah", label: "Az Zarah" },
  { value: "Al Jarudiyah", label: "Al Jarudiyah" },
  { value: "Warehouse Area", label: "Warehouse Area" },
  { value: "Al Ferdous", label: "Al Ferdous" },
  { value: "At Tawbi", label: "At Tawbi" },
  { value: "Al Khuzama", label: "Al Khuzama" },
  { value: "Al Madaris", label: "Al Madaris" },
  { value: "Badiah Al Basri", label: "Badiah Al Basri" },
  { value: "Ash Shahba", label: "Ash Shahba" },
  { value: "Ash Shariah", label: "Ash Shariah" },
  { value: "Al Bawadi", label: "Al Bawadi" },
  { value: "Al Milaha", label: "Al Milaha" },
  { value: "Al Mashtal", label: "Al Mashtal" },
  { value: "Az Zahra", label: "Az Zahra" },
  { value: "Al Zuhur", label: "Al Zuhur" },
  { value: "Al Husain", label: "Al Husain" },
  { value: "Mayyas", label: "Mayyas" },
  { value: "Al Wurud", label: "Al Wurud" },
  { value: "Al Maha", label: "Al Maha" },
  { value: "Al Aqiq", label: "Al Aqiq" },
  { value: "Al Jamiyin", label: "Al Jamiyin" },
  { value: "Industrial2", label: "Industrial2" },
  { value: "Al Wasadah", label: "Al Wasadah" },
  { value: "Al Muntazah", label: "Al Muntazah" },
  { value: "Al Anwar", label: "Al Anwar" },
  { value: "Umm Al Jazm", label: "Umm Al Jazm" },
  { value: "Az Zomorod2", label: "Az Zomorod2" },
  { value: "Al Bustan2", label: "Al Bustan2" },
  { value: "Al Wahah", label: "Al Wahah" },
  { value: "Al Awamiyah", label: "Al Awamiyah" },
  { value: "Al Jarrari", label: "Al Jarrari" },
  { value: "Qurtubah", label: "Qurtubah" },
  { value: "At Tif", label: "At Tif" },
  { value: "Al Talal", label: "Al Talal" },
  { value: "Anak", label: "Anak" },
  { value: "Al Fayha", label: "Al Fayha" },
  { value: "Al Bahar", label: "Al Bahar" },
  { value: "Ar Rayah", label: "Ar Rayah" },
  { value: "Al Aujam", label: "Al Aujam" },
  { value: "Al Jumaimah", label: "Al Jumaimah" },
  { value: "Ar Rabiah", label: "Ar Rabiah" },
  { value: "Al Khuwaildiyah", label: "Al Khuwaildiyah" },
  { value: "Ad Doij", label: "Ad Doij" },
  { value: "Al Madani", label: "Al Madani" },
  { value: "An Nuzhah1", label: "An Nuzhah1" },
  { value: "Sanabis", label: "Sanabis" },
  { value: "An Nabiyah", label: "An Nabiyah" },
  { value: "Al Ferdous", label: "Al Ferdous" },
  { value: "An Nahdah", label: "An Nahdah" },
  { value: "Al Andalus", label: "Al Andalus" },
  { value: "Airport", label: "Airport" },
  { value: "As Safa", label: "As Safa" },
  { value: "Ar Rabie", label: "Ar Rabie" },
  { value: "Ar Rawdah", label: "Ar Rawdah" },
  { value: "As Salam", label: "As Salam" },
  { value: "Al Wahah", label: "Al Wahah" },
  { value: "Qurtubah", label: "Qurtubah" },
  { value: "Industrial", label: "Industrial" },
  { value: "An Nasirah", label: "An Nasirah" },
  { value: "Ar Rabiyah", label: "Ar Rabiyah" },
  { value: "Ar Rawdah", label: "Ar Rawdah" },
  { value: "Industrial", label: "Industrial" },
  { value: "Al Zuhur", label: "Al Zuhur" },
  { value: "Al Faisaliyah", label: "Al Faisaliyah" },
  { value: "Ar Rayaan", label: "Ar Rayaan" },
  { value: "Al Wurud", label: "Al Wurud" },
  { value: "Al Basatin", label: "Al Basatin" },
  { value: "South Demig", label: "South Demig" },
  { value: "North Damig", label: "North Damig" },
  { value: "As Salam", label: "As Salam" },
  { value: "Ohod", label: "Ohod" },
  { value: "Ar Rabie", label: "Ar Rabie" },
  { value: "Al Zuhur", label: "Al Zuhur" },
  { value: "An Noor", label: "An Noor" },
  { value: "Ghirnatah", label: "Ghirnatah" },
  { value: "Ar Rabiyah", label: "Ar Rabiyah" },
  { value: "Ar Rayaan", label: "Ar Rayaan" },
  { value: "Al Wahah", label: "Al Wahah" },
  { value: "Taibah", label: "Taibah" },
  { value: "Industrial", label: "Industrial" },
  { value: "An Nuzhah", label: "An Nuzhah" },
  { value: "Down Town", label: "Down Town" },
  { value: "Al Majd", label: "Al Majd" },
  { value: "Ghirnatah", label: "Ghirnatah" },
  { value: "Al Andalus", label: "Al Andalus" },
  { value: "Al Muruj", label: "Al Muruj" },
  { value: "Al Naseem", label: "Al Naseem" },
  { value: "Al Kawthar", label: "Al Kawthar" },
  { value: "Al Wahah", label: "Al Wahah" },
  { value: "Al Muruj", label: "Al Muruj" },
  { value: "Ar Rabwah", label: "Ar Rabwah" },
  { value: "Al Yasmin1", label: "Al Yasmin1" },
  { value: "Al Nakhil", label: "Al Nakhil" },
  { value: "Al Falah", label: "Al Falah" },
  { value: "Al Izdihar", label: "Al Izdihar" },
  { value: "Al Khalidiyah", label: "Al Khalidiyah" },
  { value: "Nayef", label: "Nayef" },
  { value: "The Hospital", label: "The Hospital" },
  { value: "Ash Shifa", label: "Ash Shifa" },
  { value: "Al Iskan", label: "Al Iskan" },
  { value: "Al Faisaliyah", label: "Al Faisaliyah" },
  { value: "Al Jawharah", label: "Al Jawharah" },
  { value: "Al Qazaz", label: "Al Qazaz" },
  { value: "Al Anwar", label: "Al Anwar" },
  { value: "Al Buhayrah", label: "Al Buhayrah" },
  { value: "Ar Rawabi", label: "Ar Rawabi" },
  { value: "Al Badi", label: "Al Badi" },
  { value: "Al Jalawiyah", label: "Al Jalawiyah" },
  { value: "Al Adamah", label: "Al Adamah" },
  { value: "Ar Rayaan", label: "Ar Rayaan" },
  { value: "As Sahil", label: "As Sahil" },
  { value: "Ghirnatah", label: "Ghirnatah" },
  { value: "An Nasriyah", label: "An Nasriyah" },
  { value: "At Tubayshi", label: "At Tubayshi" },
  { value: "Al Basatin", label: "Al Basatin" },
  { value: "King Faisal University City", label: "King Faisal University City" },
  { value: "Al Hada", label: "Al Hada" },
  { value: "Al Qashlah", label: "Al Qashlah" },
  { value: "Al Buhayrah", label: "Al Buhayrah" },
  { value: "Al Aziziyah", label: "Al Aziziyah" },
  { value: "An Noor", label: "An Noor" },
  { value: "Al Khalidiyah Ash Shamaliyah", label: "Al Khalidiyah Ash Shamaliyah" },
  { value: "Al Fanar", label: "Al Fanar" },
  { value: "Al Muntazah", label: "Al Muntazah" },
  { value: "Gharb Adh Dhahran", label: "Gharb Adh Dhahran" },
  { value: "Ad Danah Ash Shamaliyah", label: "Ad Danah Ash Shamaliyah" },
  { value: "Ath Thuqbah", label: "Ath Thuqbah" },
  { value: "King Fahd University of Petroleum", label: "King Fahd University of Petroleum" },
  { value: "Al Hamra", label: "Al Hamra" },
  { value: "Al Ferdous", label: "Al Ferdous" },
  { value: "Ar Rawdah", label: "Ar Rawdah" },
  { value: "Sinaiyah Ath Thuqbah", label: "Sinaiyah Ath Thuqbah" },
  { value: "Al Maha", label: "Al Maha" },
  { value: "Al Zuhur", label: "Al Zuhur" },
  { value: "Qurtubah", label: "Qurtubah" },
  { value: "Al Khawr", label: "Al Khawr" },
  { value: "As Suq", label: "As Suq" },
  { value: "Al Itsalat Subdivision", label: "Al Itsalat Subdivision" },
  { value: "Al Wahah", label: "Al Wahah" },
  { value: "As Saif", label: "As Saif" },
  { value: "Al Amwaj", label: "Al Amwaj" },
  { value: "Ad Dawhah Ash Shamaliyah", label: "Ad Dawhah Ash Shamaliyah" },
  { value: "Al Durra", label: "Al Durra" },
  { value: "Ash Shati Ash Sharqi", label: "Ash Shati Ash Sharqi" },
  { value: "Al Sholah", label: "Al Sholah" },
  { value: "Dahiyat Al Malik Fahd", label: "Dahiyat Al Malik Fahd" },
  { value: "Al Bustan", label: "Al Bustan" },
  { value: "Al Ekhaa", label: "Al Ekhaa" },
  { value: "Yubrin", label: "Yubrin" },
  { value: "Ar Rabie", label: "Ar Rabie" },
  { value: "Goverment Departments", label: "Goverment Departments" },
  { value: "Ash Shrouk", label: "Ash Shrouk" },
  { value: "Al Muruj", label: "Al Muruj" },
  { value: "Al Yasmin", label: "Al Yasmin" },
  { value: "Al Andalus", label: "Al Andalus" },
  { value: "At Taawun", label: "At Taawun" },
  { value: "Al Amamrah", label: "Al Amamrah" },
  { value: "Al Nakhil", label: "Al Nakhil" },
  { value: "Support Services", label: "Support Services" },
  { value: "Sinaiyah Al Fawaziyah", label: "Sinaiyah Al Fawaziyah" },
  { value: "Al Yarmuk", label: "Al Yarmuk" },
  { value: "Al Fayha", label: "Al Fayha" },
  { value: "Prince Muhammad bin Saud", label: "Prince Muhammad bin Saud" },
  { value: "Al Iskan", label: "Al Iskan" },
  { value: "Al Badiyah", label: "Al Badiyah" },
  { value: "Al Jamiyin", label: "Al Jamiyin" },
  { value: "1st Industrial", label: "1st Industrial" },
  { value: "An Nahdah", label: "An Nahdah" },
  { value: "As Safa", label: "As Safa" },
  { value: "Al Naseem", label: "Al Naseem" },
  { value: "Al Kawthar", label: "Al Kawthar" },
  { value: "Al Jamiah", label: "Al Jamiah" },
  { value: "Al Amanah", label: "Al Amanah" },
  { value: "Ash Shati Al Gharbi", label: "Ash Shati Al Gharbi" },
  { value: "As Salam", label: "As Salam" },
  { value: "Al Dabab", label: "Al Dabab" },
  { value: "Ohod", label: "Ohod" },
  { value: "Airport", label: "Airport" },
  { value: "Al Mazruiyah", label: "Al Mazruiyah" },
  { value: "Qasr Al Khalij", label: "Qasr Al Khalij" },
  { value: "Al Hussam", label: "Al Hussam" },
  { value: "Tihamah", label: "Tihamah" },
  { value: "Al Bandariyah", label: "Al Bandariyah" },
  { value: "Al Fursan", label: "Al Fursan" },
  { value: "Taibah", label: "Taibah" },
  { value: "Al Anud", label: "Al Anud" },
  { value: "Madinat Al Ummal", label: "Madinat Al Ummal" },
  { value: "Al Qadisiyah", label: "Al Qadisiyah" },
  { value: "Al Aqrabiyah", label: "Al Aqrabiyah" },
  { value: "Ishbiliyah", label: "Ishbiliyah" },
  { value: "Al Aqiq", label: "Al Aqiq" },
  { value: "Al Olaya", label: "Al Olaya" },
  { value: "Ad Danah Al Janubiyah", label: "Ad Danah Al Janubiyah" },
  { value: "Al Loaloa", label: "Al Loaloa" },
  { value: "Al Hizam Al Akhdar", label: "Al Hizam Al Akhdar" },
  { value: "Ar Rajaa", label: "Ar Rajaa" },
  { value: "Al Jisr", label: "Al Jisr" },
  { value: "Ar Rabie", label: "Ar Rabie" },
  { value: "Ad Danah", label: "Ad Danah" },
  { value: "An Nuzhah", label: "An Nuzhah" },
  { value: "An Nada", label: "An Nada" },
  { value: "An Nawras", label: "An Nawras" },
  { value: "National Guard", label: "National Guard" },
  { value: "Ar Rakah Al Janubiyah", label: "Ar Rakah Al Janubiyah" },
  { value: "Al Khuzama", label: "Al Khuzama" },
  { value: "Madinat Al Ummal", label: "Madinat Al Ummal" },
  { value: "Al Bahar", label: "Al Bahar" },
  { value: "Al Urubah", label: "Al Urubah" },
  { value: "Ad Dawhah Al Janubiyah", label: "Ad Dawhah Al Janubiyah" },
  { value: "Industrial", label: "Industrial" },
  { value: "Al Athir", label: "Al Athir" },
  { value: "Al Khabra Ash Shamalia", label: "Al Khabra Ash Shamalia" },
  { value: "Al Hadabah", label: "Al Hadabah" },
  { value: "Al Muhammadiyah", label: "Al Muhammadiyah" },
  { value: "Ar Rakah Ash Shamaliyah", label: "Ar Rakah Ash Shamaliyah" },
  { value: "Al Wasam", label: "Al Wasam" },
  { value: "Ash Shifa", label: "Ash Shifa" },
  { value: "Al Kuthriah", label: "Al Kuthriah" },
  { value: "Al Murjan", label: "Al Murjan" },
  { value: "Al Khubar Al Janubiyah", label: "Al Khubar Al Janubiyah" },
  { value: "Ibn Sina", label: "Ibn Sina" },
  { value: "Al Hamra", label: "Al Hamra" },
  { value: "Ad Dawasir", label: "Ad Dawasir" },
  { value: "Sports City", label: "Sports City" },
  { value: "King Abdulaziz Seaport", label: "King Abdulaziz Seaport" },
  { value: "Al Sawari", label: "Al Sawari" },
  { value: "Al Manar", label: "Al Manar" },
  { value: "Al Kurnaish", label: "Al Kurnaish" },
  { value: "Al Hazm", label: "Al Hazm" },
  { value: "At Tahliyah", label: "At Tahliyah" },
  { value: "Al Jawharah", label: "Al Jawharah" },
  { value: "Al Qusor", label: "Al Qusor" },
  { value: "Al Hizam Adh Dhahabi", label: "Al Hizam Adh Dhahabi" },
  { value: "Ibn Khaldun", label: "Ibn Khaldun" },
  { value: "Ash Sheraa", label: "Ash Sheraa" },
  { value: "As Sadafah", label: "As Sadafah" },
  { value: "Ar Rawdah", label: "Ar Rawdah" },
  { value: "Ar Rabwah", label: "Ar Rabwah" },
  { value: "Ad Duraydi", label: "Ad Duraydi" },
  { value: "Ghirnatah", label: "Ghirnatah" },
  { value: "Al Bustan1", label: "Al Bustan1" },
  { value: "An Nuzhah2", label: "An Nuzhah2" },
  { value: "West Al Aziziyah", label: "West Al Aziziyah" },
  { value: "Ad Dirah1", label: "Ad Dirah1" },
  { value: "Ad Dirah2", label: "Ad Dirah2" },
  { value: "Badr", label: "Badr" },
  { value: "Ar Rabiyah", label: "Ar Rabiyah" },
  { value: "Ash Shrouk", label: "Ash Shrouk" },
  { value: "Al Khalij", label: "Al Khalij" },
  { value: "Al Muraikabat", label: "Al Muraikabat" },
  { value: "As Sadafah", label: "As Sadafah" },
  { value: "Hajr", label: "Hajr" },
  { value: "As Sufun", label: "As Sufun" },
  { value: "Al Badr", label: "Al Badr" },
  { value: "Bab Madinah Ash Shamal", label: "Bab Madinah Ash Shamal" },
  { value: "Al Budur", label: "Al Budur" },
  { value: "Ath Thuraiya", label: "Ath Thuraiya" },
  { value: "Al Amal", label: "Al Amal" },
  { value: "Al Faisaliyah", label: "Al Faisaliyah" },
  { value: "Al Jawahir", label: "Al Jawahir" },
  { value: "Gharb An Nabiyah", label: "Gharb An Nabiyah" },
  { value: "Al Badriyah", label: "Al Badriyah" },
  { value: "Al Qara Town", label: "Al Qara Town" },
  { value: "Quba", label: "Quba" },
  { value: "Ar Ruqaiqah", label: "Ar Ruqaiqah" },
  { value: "Al Olaya1", label: "Al Olaya1" },
  { value: "Al Bustan1", label: "Al Bustan1" },
  { value: "Qaryat Al Omran West", label: "Qaryat Al Omran West" },
  { value: "Taibah", label: "Taibah" },
  { value: "At Taawun", label: "At Taawun" },
  { value: "Al Jawharah", label: "Al Jawharah" },
  { value: "Al Safat", label: "Al Safat" },
  { value: "Ar Rabwah", label: "Ar Rabwah" },
  { value: "Al Bustan", label: "Al Bustan" },
  { value: "Al Hamra", label: "Al Hamra" },
  { value: "Al Bahar", label: "Al Bahar" },
  { value: "Al Tawyah", label: "Al Tawyah" },
  { value: "Al Merqab", label: "Al Merqab" }
];

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
console.log(itemData,"itemData______________111")
  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };
  const [_Id, setId] = useState(null); // State to store ads data
  console.log(_Id,"callingFrom____________")

  const [callingFrom, setCallingFrom] = useState(null); // State to store ads data
  console.log(callingFrom,"callingFrom____________")
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
    "Pet": "PETANIMALCOMP",


    "Automotive": "Cars",
    "Sports": "SPORTSGAMESComp",
    "Electronics": "ELECTRONICS",
    "Fashion Style": "FASHION",
    "Job Board": "JOBBOARD",
    "Real Estate": "REALESTATECOMP",
    "Other": "Education",
    "Services": "TRAVEL",
    "Pet & Animal": "PETANIMALCOMP",
    "Home": "HEALTHCARE",
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
setDataCatorgySHow(data.SubCategory)
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
            HealthStatus: data.HealthStatus || "",
            Industry: data.Industry || "",
            IssueType: data.IssueType || "",
            JobDescription: data.JobDescription || "",
            JobTitle: data.JobTitle || "",
            JobType: data.JobType || "",
            Language: data.Language || "",
            MAGAZINESCategory: data.MAGAZINESCategory || "",
            Make: data.Make || "",
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

    if ( _Id || callingFrom) {
      fetchData();
    }
  }, [_Id, callingFrom]);









  

  const saveToFirestore = async () => {
    try {
      // Get the current user from Firebase Auth
      const user = auth.currentUser;
      if (user) {
        if (!Category) {
          setError("Category is required!"); // ✅ Set error message if no category is selected
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
          // Save form data to Firestore under the 'adsListing' collection
          await addDoc(collection(db, Collection), {
            ...formData,
            mediaImgLogo: mediaImgLogo,
            category: Category1,
            photoURL: photoURL,
            creationTime: creationTime,
            displayName: displayName,
            galleryImages: galleryImages,
            imageUrl: imageUrl,
            Make: Make?.value,
            userId: user.uid, // Optional: save the user's UID for reference
            createdAt: new Date(), // Store the timestamp
          });
          console.log("Data added successfully to Firestore!");
          MySwal.fire({
            title: "Added!",
            text: "Your listing has been added.",
            icon: "success",
            timer: 1000,
          }).then(() => {
            // Navigate to the dashboard after the alert closes
            navigate('/dashboard');
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
  const handleGalleryChange = async (e) => {
    const files = Array.from(e.target.files);
    if (uploading) return;

    let uploadedImages = [...galleryImages];

    // Restrict total images to 20
    if (uploadedImages.length + files.length > 20) {
      alert("You can only upload up to 20 images.");
      return;
    }

    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
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

          // Stop uploading if limit is reached
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
  const handlePropertyFeaturesChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, PropertyFeatures: name }));
  };
  const handleBuildingTypeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, BuildingType: name }));
  };
  const handleAccessibilityChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Accessibility: name }));
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
  const handleBedroomChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Bedroom: name }));
  };
  const handleColorChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Color: name }));
  };
  const handlePurposeChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, Purpose: name }));
  };
  const handleExteriorColorChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, ExteriorColor: name }));
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
    const numericValue = value.replace(/[^0-9+]/g, ''); // Remove non-numeric characters except +
    if (numericValue.length <= 13) {
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
      // Optionally reset error message
      setSaudinummsg('');
    } else {
      setSaudinummsg('Phone number cannot exceed 13 digits');
    }
  };
  const validatePhone = () => {
    const phone = formData.Phone;
    if (phone.length > 13) {
      setSaudinummsg('Phone number cannot exceed 13 digits');
    } else if (!phone.startsWith('+966') || phone.length !== 13) {
      setSaudinummsg('Please enter a valid Saudi phone number (e.g., +9665XXXXXXXX)');
    } else {
      setSaudinummsg('');
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
  return (
    <>
      <div className="main-wrapper">
        <Header />

        <div
          className="dashboard-content"
          style={{
            marginTop: "8rem",
          }}
        >
          <div className="container">
            <div
              class="col-12 text-start text-dark "
              style={{ fontSize: 26, fontWeight: 500 }}
            >
              Home / Add Listing
            </div>

            <div className="mt-3">
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
                  <i className="fas fa-solid fa-heart" /> <span>Favourite</span>
                </Link>
              </li>
                <li>
                  <Link to="/messages">
                    <i className="fa-solid fa-comment-dots" />{" "}
                    <span>Messages</span>
                  </Link>
                </li>
                <li>
                  <Link to="/reviews">
                    <i className="fas fa-solid fa-star" /> <span>Reviews</span>
                  </Link>
                </li>
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
                              <Select
                                options={citiesMake}
                                value={Make}
                                onChange={setSelectedCityMake}
                                placeholder="Select a city"
                                isClearable
                                className="w-100"
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
                      ].some(item => item === Category.SubCategory || item === DataCatorgySHow) ? (
                        <>
                          <div className="card">
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
                          </div>

                          <div className="card">
                            <div className="card-header">
                              <h4>Operating System </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Windows", label: "Windows" },
                                    { name: "macOS", label: "macOS" },
                                    { name: "Chrome", label: "Chrome" },
                                    { name: "OS", label: "OS" },
                                    { name: "Linus", label: "Linus" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.OperatingSystem ===
                                            area.name
                                          }
                                          onChange={handleOperatingSystemChange}
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
                              <h4>RAM </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "4GB", label: "4GB" },
                                    { name: "8GB", label: "8GB" },
                                    { name: "16GB", label: "16GB" },
                                    { name: "32GB", label: "32GB" },
                                    { name: "64GB", label: "64GB" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={formData.RAM === area.name}
                                          onChange={handleRAMChange}
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
                              <h4>Storage Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "SSD (Solid State Drive)",
                                      label: "SSD (Solid State Drive)",
                                    },
                                    {
                                      name: "HDD (Hard Disk Drive)",
                                      label: "HDD (Hard Disk Drive)",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.StorageType === area.name
                                          }
                                          onChange={handleStorageTypeChange}
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
                              <h4>Processor (CPU) </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Intel Core i3, i5, i7, i9",
                                      label: "Intel Core i3, i5, i7, i9",
                                    },
                                    {
                                      name: "AMD Ryzen 3, 5, 7, 9",
                                      label: "AMD Ryzen 3, 5, 7, 9",
                                    },
                                    { name: "Apple M1", label: "Apple M1" },
                                    { name: "Apple M2", label: "Apple M2" },
                                    { name: "Apple M3", label: "Apple M3" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Processor === area.name
                                          }
                                          onChange={handleProcessorChange}
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
                              <h4>Screen Size </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "11-inch", label: "11-inch" },
                                    { name: "13-inch", label: "13-inch" },
                                    { name: "14-inch", label: "14-inch" },
                                    { name: "15-inch", label: "15-inch" },
                                    { name: "17-inch", label: "17-inch" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.ScreenSize === area.name
                                          }
                                          onChange={handleScreenSizeChange}
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
                              <h4>Storage capacity </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "256GB", label: "256GB" },
                                    { name: "512GB", label: "512GB" },
                                    { name: "1TB", label: "1TB" },
                                    { name: "2TB", label: "2TB" },
                                    { name: "2TB", label: "2TB" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Storagecapacity ===
                                            area.name
                                          }
                                          onChange={handleStoragecapacityChange}
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
                              <h4>Graphics Card </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Intel", label: "Intel" },
                                    { name: "UHD", label: "UHD" },
                                    {
                                      name: "AMD Radeon",
                                      label: "AMD Radeon",
                                    },
                                    {
                                      name: "NVIDIA GeForce GTX",
                                      label: "NVIDIA GeForce GTX",
                                    },
                                    { name: "RTX", label: "RTX" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.GraphicsCard === area.name
                                          }
                                          onChange={handleGraphicsCardChange}
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
                              <h4>Battery Life </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "5 hours", label: "5 hours" },
                                    {
                                      name: "5-8 hours",
                                      label: "5-8 hours",
                                    },
                                    {
                                      name: "8-12 hours",
                                      label: "8-12 hours",
                                    },
                                    {
                                      name: "12 hours",
                                      label: "12 hours",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.BatteryLife === area.name
                                          }
                                          onChange={handleBatteryLifeChange}
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
                              <h4>Display Quality </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Full HD", label: "Full HD" },
                                    {
                                      name: "Retina Display",
                                      label: "Retina Display",
                                    },
                                    {
                                      name: "Touchscreen",
                                      label: "Touchscreen",
                                    },
                                    {
                                      name: "OLED",
                                      label: "OLED",
                                    },
                                    {
                                      name: "IPS",
                                      label: "IPS",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.DisplayQuality ===
                                            area.name
                                          }
                                          onChange={handleDisplayQualityChange}
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
                              <h4>Connectivity </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Wi-Fi 5", label: "Wi-Fi 5" },
                                    { name: "Wi-Fi 6", label: "Wi-Fi 6" },
                                    {
                                      name: "Bluetooth 4.0",
                                      label: "Bluetooth 4.0",
                                    },
                                    {
                                      name: "Bluetooth 5.0",
                                      label: "Bluetooth 5.0",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Connectivity === area.name
                                          }
                                          onChange={handleConnectivityChange}
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
                              <h4>Special Features </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Convertible",
                                      label: "Convertible",
                                    },
                                    {
                                      name: "Backlit keyboard",
                                      label: "Backlit keyboard",
                                    },
                                    {
                                      name: "Fingerprint scanner",
                                      label: "Fingerprint scanner",
                                    },
                                    {
                                      name: "Face recognition",
                                      label: "Face recognition",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.SpecialFeatures ===
                                            area.name
                                          }
                                          onChange={handleSpecialFeaturesChange}
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
                        ].some(item => item === Category.SubCategory || item === DataCatorgySHow) ? (
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
                            </div>
                          </div>

                          <div className="card">
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
                          </div>
                          <div className="card">
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
                          </div>
                          <div className="card">
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
                          <div className="card">
                            <div className="card-header">
                              <h4>Purpose </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Sell", label: "Sell" },
                                    { name: "Rent", label: "Rent" },
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
                                          checked={
                                            formData.ExteriorColor === area.name
                                          }
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

                          <div className="card">
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
                          </div>
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
                          <div className="card">
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
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Assembly </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    { name: "Imported", label: "Imported" },
                                    { name: "Local", label: "Local" },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Assembly === area.name
                                          }
                                          onChange={handleAssemblyChange}
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
                              <h4>Body Type </h4>
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
                                    {
                                      name: "Hatchback",
                                      label: "Hatchback",
                                    },
                                    {
                                      name: "Convertible",
                                      label: "Convertible",
                                    },
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
                          <div className="form-group">
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
                          </div>
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
                        ].some(item => item === Category.SubCategory || item === DataCatorgySHow) ? (
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
                          </div>
                          <div className="card">
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
                          </div>
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
                          <div className="card">
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
                          </div>
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
                          <div className="card">
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
                          </div>
                          <div className="card">
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
                          </div>
                          <div className="card">
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
                          </div>
                          <div className="card">
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
                          </div>
                          <div className="card">
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
                          </div>
                          <div className="card">
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
                          </div>
                          <div className="card">
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
                          </div>
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
                        ].some(item => item === Category.SubCategory || item === DataCatorgySHow) ? (
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
                          </div>
                          <div className="card">
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
                          </div>
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
                        ].some(item => item === Category.SubCategory || item === DataCatorgySHow) ? (
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
                          <div className="card ">
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
                          </div>
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
                        ].some(item => item === Category.SubCategory || item === DataCatorgySHow) ? (
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
                          </div>
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
                        ].some(item => item === Category.SubCategory || item === DataCatorgySHow) ? (
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
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Bedroom </h4>
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
                              <h4>Size </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "500–1,500 sq. ft.",
                                      label: "500–1,500 sq. ft.",
                                    },
                                    {
                                      name: "500–1,500 sq. ft.",
                                      label: "500–1,500 sq. ft.",
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
                              <h4>Amenities </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Parking space",
                                      label: "Parking space",
                                    },
                                    {
                                      name: "Gym",
                                      label: "Gym",
                                    },
                                    {
                                      name: "Swimming pool",
                                      label: "Swimming pool",
                                    },
                                    {
                                      name: "Pet-friendly",
                                      label: "Pet-friendly",
                                    },
                                    {
                                      name: "Balcony or terrace",
                                      label: "Balcony or terrace",
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
                          </div>
                          <div className="card">
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
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h4>Building Type </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Single-family",
                                      label: "Single-family",
                                    },
                                    {
                                      name: "Multi-family",
                                      label: "Multi-family",
                                    },
                                    {
                                      name: "High-rise",
                                      label: "High-rise",
                                    },
                                    {
                                      name: "Low Rise",
                                      label: "Low Rise",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.BuildingType === area.name
                                          }
                                          onChange={handleBuildingTypeChange}
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
                              <h4>Accessibility </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group featuresform-list mb-0">
                                <ul>
                                  {[
                                    {
                                      name: "Elevator availability",
                                      label: "Elevator availability",
                                    },
                                    {
                                      name: "Wheelchair access",
                                      label: "Wheelchair access",
                                    },
                                  ].map((area) => (
                                    <li key={area.name}>
                                      <label className="custom_check">
                                        <input
                                          type="checkbox"
                                          name={area.name}
                                          checked={
                                            formData.Accessibility === area.name
                                          }
                                          onChange={handleAccessibilityChange}
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
                          </div>
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
                        ].some(item => item === Category.SubCategory || item === DataCatorgySHow) ? (
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
                          </div>
                          <div className="card">
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
                          </div>
                        </>
                      ) : [
                          "Gaming Consoles",
                          "Video Games",
                          "Controllers",
                          "Gaming Accessories",
                          "Gift Cards",
                          "Accounts",
                          "Toys",
                        ].some(item => item === Category.SubCategory || item === DataCatorgySHow) ? (
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
                          </div>
                          <div className="card">
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
                          </div>
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
                        ].some(item => item === Category.SubCategory || item === DataCatorgySHow) ? (
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
                          </div>
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
                          </div>
                          <div className="card">
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
                          </div>
                          <div className="card">
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
                        ].some(item => item === Category.SubCategory || item === DataCatorgySHow) ? (
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
                          <div className="card">
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
                          </div>
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
                          <div className="card">
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
                          </div>
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
            fontWeight:"bold",
            fontSize:"18px"
          }}
        >
          Phone
        </label>
        <div style={{ position: "relative", width: "100%" }}>
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
            {showPhone ? "👁️‍🗨️" : "👁️"} {/* Unicode eye icons */}
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
            fontWeight:"bold",
            fontSize:"18px"

          }}
        >
          Price Range
        </label>
        <div style={{ position: "relative", width: "100%" }}>
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
            {showPrice ? "👁️‍🗨️" : "👁️"} {/* Unicode eye icons */}
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
      const alphaCount = (text.match(/[a-zA-Z]/g) || []).length;
      if (alphaCount <= 1000) {
        handleChange(e); // Update state only if within limit
      }
    }}
  />
  {/* Display alphabetic character count and warning */}
  <div style={{ marginTop: "5px", fontSize: "12px" }}>
    <span>
      Characters: {(formData.description.match(/[a-zA-Z]/g) || []).length}/1000
    </span>
    {(formData.description.match(/[a-zA-Z]/g) || []).length > 1000 && (
      <span style={{ color: "red", marginLeft: "10px" }}>
        Alphabetic character limit exceeded! Maximum 100 allowed.
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
                    <h4>Ad Type </h4>
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
                    <PaymentForm />
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
  <label style={{ fontSize: "24px", marginTop: "20px", fontWeight: "bold" }}>
    <Link
      to="/TermsAndConditions"
      style={{
        textDecoration: "underline",
        color: "#2d4495", // Blue color to indicate a link
      }}
      onMouseEnter={(e) => (e.target.style.textDecoration = "none")} // Remove underline on hover
      onMouseLeave={(e) => (e.target.style.textDecoration = "underline")} // Restore underline
    >
      Agree to terms and conditions
    </Link>
  </label>
</div>
               <button
  onClick={saveToFirestore}
  disabled={uploading || !isChecked} // Disable if uploading or checkbox is unchecked
  className="btn"
  style={{ backgroundColor: "#2d4495", color: "white" }}
  type="button"
>
  Submit
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
