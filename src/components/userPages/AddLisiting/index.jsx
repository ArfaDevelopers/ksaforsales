import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/FirebaseConfig"; // Ensure the correct Firebase import
import { db } from "./../../Firebase/FirebaseConfig.jsx";
import { addDoc, collection } from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Select from "react-select";
import { Country, City, State } from "country-state-city";

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
  const [Make, setSelectedCityMake] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

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
  console.log(Category, "Category__________");
  const isFormValid = () => {
    const nonEmptyFields = Object.values(formData).filter(
      (value) => value !== "" && value !== "$$$"
    );
    const totalFields = Object.values(formData).length;
    return nonEmptyFields.length > 2 / 2;
  };

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
          Category === "Automotive"
            ? "Cars"
            : Category === "Electronics"
            ? "ELECTRONICS"
            : Category === "Fashion Style"
            ? "FASHION"
            : Category === "Health Care"
            ? "HEALTHCARE"
            : Category === "Job board"
            ? "JOBBOARD"
            : Category === "Education"
            ? "Education"
            : Category === "Real Estate"
            ? "REALESTATECOMP"
            : Category === "Travel"
            ? "TRAVEL"
            : Category === "Sports & Game"
            ? "SPORTSGAMESComp"
            : Category === "Pet & Animal"
            ? "PETANIMALCOMP"
            : Category === "Magazines"
            ? "Magazines"
            : Category === "Household"
            ? "Household"
            : "books";
        // Check if more than half of the form fields are filled
        if (isFormValid()) {
          // Save form data to Firestore under the 'adsListing' collection
          await addDoc(collection(db, Collection), {
            ...formData,
            mediaImgLogo: mediaImgLogo,
            Category: Category,
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
    formData.append("upload_preset", "dlfdvlmse"); // Replace with your actual preset
    formData.append("cloud_name", "dlfdvlmse"); // Replace with your actual cloud name

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dlfdvlmse/image/upload", // Your Cloudinary URL
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
      formData.append("upload_preset", "dlfdvlmse");
      formData.append("cloud_name", "dlfdvlmse");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dlfdvlmse/image/upload",
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
      formData.append("upload_preset", "dlfdvlmse"); // Replace with your Cloudinary preset
      formData.append("cloud_name", "dlfdvlmse"); // Replace with your actual cloud name

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dlfdvlmse/image/upload",
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

  const handleChangePhone = (e) => {
    const { name, value } = e.target;

    // Allow only numbers and "+" while typing
    if (/^[\d+]*$/.test(value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validatePhone = () => {
    if (formData.Phone && !saudiNumberRegex.test(formData.Phone)) {
      setSaudinummsg(
        "Please enter a valid Saudi number in format: +9665XXXXXXXX"
      );
      setFormData((prev) => ({ ...prev, Phone: "" })); // Clear invalid input
      setSaudinummsg(null);
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
        name: "Services",
        subcategories: [
          {
            name: "Home Services",
            subcategories: [{ name: "Cleaning" }, { name: "Maintenance" }],
          },
          {
            name: "Vehicle Services",
            subcategories: [{ name: "Repair" }, { name: "Detailing" }],
          },
          {
            name: "Personal Services",
            subcategories: [{ name: "Tutoring" }, { name: "Coaching" }],
          },
        ],
      },
      {
        name: "Contracting",
        subcategories: [
          {
            name: "Construction",
            subcategories: [],
          },
          // {
          //   name: "Renovation",
          //   subcategories: [],
          // },
          // {
          //   name: "Plumbing",
          //   subcategories: [],
          // },
          {
            name: "Electrical",
            subcategories: [],
          },
        ],
      },
      {
        name: "Health Care",
        subcategories: [
          {
            name: "Health Care",
            subcategories: [{ name: "Health Care" }, { name: "Health Care" }],
          },
        ],
      },
      {
        name: "Magazines",
        subcategories: [
          {
            name: "Magazines",
            subcategories: [{ name: "Magazines" }, { name: "Magazines" }],
          },
        ],
      },
      {
        name: "Sports & Game",
        subcategories: [
          {
            name: "Sports & Game",
            subcategories: [
              { name: "Sports & Game" },
              { name: "Sports & Game" },
            ],
          },
        ],
      },
      {
        name: "Travel",
        subcategories: [
          {
            name: "Travel",
            subcategories: [{ name: "Travel" }, { name: "Travel" }],
          },
        ],
      },
      {
        name: "Animals",
        subcategories: [
          {
            name: "Pets",
            subcategories: [
              { name: "Dogs" },
              { name: "Cats" },
              { name: "Birds" },
              { name: "Fish" },
            ],
          },
          {
            name: "Livestock",
            subcategories: [
              { name: "Cattle" },
              { name: "Sheep" },
              { name: "Goats" },
            ],
          },
          {
            name: "Exotic Animals",
            subcategories: [],
          },
        ],
      },
      // {
      //   name: "Family",
      //   subcategories: [
      //     {
      //       name: "Kids",
      //       subcategories: [{ name: "Clothing" }, { name: "Toys" }],
      //     },
      //     {
      //       name: "Baby Products",
      //       subcategories: [{ name: "Strollers" }, { name: "Maternity Wear" }],
      //     },
      //   ],
      // },
      {
        name: "Gifts",
        subcategories: [
          {
            name: "Occasions",
            subcategories: [
              { name: "Birthday" },
              { name: "Anniversary" },
              { name: "Wedding" },
            ],
          },
          {
            name: "Personalized Gifts",
            subcategories: [],
          },
          {
            name: "Gift Cards",
            subcategories: [],
          },
        ],
      },
      {
        name: "Furniture",
        subcategories: [
          {
            name: "Living Room",
            subcategories: [
              { name: "Sofas" },
              { name: "Coffee Tables" },
              { name: "TV Stands" },
            ],
          },
          {
            name: "Bedroom",
            subcategories: [
              { name: "Beds" },
              { name: "Wardrobes" },
              { name: "Dressers" },
            ],
          },
          {
            name: "Office",
            subcategories: [{ name: "Desks" }, { name: "Chairs" }],
          },
        ],
      },
      {
        name: "Jobs",
        subcategories: [
          { name: "Full-Time", subcategories: [] },
          { name: "Part-Time", subcategories: [] },
          { name: "Freelance", subcategories: [] },
          { name: "Internship", subcategories: [] },
        ],
      },
      {
        name: "Education",
        subcategories: [{ name: "Education", subcategories: [] }],
      },
      {
        name: "Property",
        subcategories: [
          {
            name: "For Sale",
            subcategories: [
              { name: "Houses" },
              { name: "Apartments" },
              { name: "Land" },
              { name: "Villas" },
            ],
          },
          {
            name: "For Rent",
            subcategories: [
              { name: "Houses" },
              { name: "Apartments" },
              { name: "Commercial Spaces" },
            ],
          },
          {
            name: "Commercial",
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
        name: "Automotive",
        subcategories: [
          {
            name: "Cars",
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
            name: "Auto Parts",
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
            name: "Computers",
            subcategories: [
              { name: "Laptops" },
              { name: "Desktops" },
              { name: "Accessories" },
            ],
          },

          {
            name: "TV & Audio",
            subcategories: [
              { name: "Televisions" },
              { name: "Speakers" },
              { name: "Home Theater" },
            ],
          },
        ],
      },
      // Add other categories here...
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

  return (
    <>
      <UserHeader parms={parms} />
      {/* Breadscrumb Section */}
      {/* <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">Add Listing</h2>
            </div>
          </div>
        </div>
      </div> */}
      {/* <nav aria-label="breadcrumb" className="page-breadcrumb text-black"> */}
      {/* <div class="container mt-3">
        <div class="row">
          <div class="col-12 text-start fw-bold">Home / Add Listing</div>
        </div>
      </div> */}

      {/* </nav> */}

      {/* /Breadscrumb Section */}
      {/* Profile Content */}

      <div
        className="dashboard-content "
        style={{
          marginTop: "1.5rem",
        }}
      >
        <div className="container">
          <div class="col-12 text-start text-dark ">Home / Add Listing</div>

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
              {/* <li>
                <Link to="/bookmarks">
                  <i className="fas fa-solid fa-heart" /> <span>Favourite</span>
                </Link>
              </li> */}
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
                                color: "red",
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
                        backgroundColor: "#007bff",
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
                      className="d-flex justify-content-between" // Use flexbox for horizontal alignment
                      style={{
                        // marginTop: "-1rem",
                        width: "100vw", // Ensures full viewport width
                        maxWidth: "100%", // Prevents overflow
                      }}
                    >
                      <div
                        className="d-flex justify-content-between gap-2"
                        style={{ width: "100%" }}
                      >
                        <div className="card w-50">
                          {" "}
                          {/* Set width to 50% for each card */}
                          <div
                            className="card-header"
                            // style={{ marginTop: "-1rem" }}
                          >
                            <h4>Select City</h4>
                          </div>
                          <div className="card-body">
                            <Select
                              options={citiesMake}
                              value={Make}
                              onChange={setSelectedCityMake}
                              placeholder="Select a city"
                              isClearable
                              className="w-100" // Ensures full width for Select component
                            />
                          </div>
                        </div>

                        <div className="card w-50" style={{ marginTop: "0" }}>
                          {" "}
                          {/* Set width to 50% for each card */}
                          <div
                            className="card-header"
                            // style={{ marginTop: "-1rem" }}
                          >
                            <h4>Select District</h4>
                          </div>
                          <div className="card-body">
                            <Select
                              options={[
                                {
                                  value: "Al Safa, Jeddah, Saudi Arabia",
                                  label: "Al Safa, Jeddah, Saudi Arabia",
                                },
                                {
                                  value: "Al Faisaliyah, Dammam, Saudi Arabia",
                                  label: "Al Faisaliyah, Dammam, Saudi Arabia",
                                },
                                {
                                  value:
                                    "North Ghurāb Lighthouse, Umarah Ibn Ghurab, Jeddah, Saudi Arabia",
                                  label:
                                    "North Ghurāb Lighthouse, Umarah Ibn Ghurab, Jeddah, Saudi Arabia",
                                },
                                {
                                  value:
                                    "Al Faisaliyah, Al Qurayyat, Saudi Arabia",
                                  label:
                                    "Al Faisaliyah, Al Qurayyat, Saudi Arabia",
                                },
                                {
                                  value:
                                    "Industrial Area No 1, Dammam, Saudi Arabia",
                                  label:
                                    "Industrial Area No 1, Dammam, Saudi Arabia",
                                },
                                {
                                  value: "Anak, Saudi Arabia",
                                  label: "Anak, Saudi Arabia",
                                },
                                {
                                  value:
                                    "Awwad, Ar Rayyan, Riyadh, Saudi Arabia",
                                  label:
                                    "Awwad, Ar Rayyan, Riyadh, Saudi Arabia",
                                },
                              ]}
                              value={formData.District} // Assuming formData.District is an object with value and label
                              onChange={(selectedOption) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  District: selectedOption
                                    ? selectedOption.value
                                    : "", // Update the value based on selection
                                }))
                              }
                              placeholder="Select a district"
                              isClearable
                              className="w-100" // Ensures full width for Select component
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
                      className="d-flex justify-content-between" // Use flexbox for horizontal alignment
                      style={{
                        marginTop: "1rem",
                        width: "100vw", // Ensures full viewport width
                        maxWidth: "100%", // Prevents overflow
                      }}
                    >
                      <div
                        className="d-flex justify-content-between gap-2"
                        style={{ width: "100%", marginTop: "-1rem" }}
                      >
                        <div className="card w-50">
                          {" "}
                          {/* Set width to 50% for each card */}
                          <div className="form-group">
                            <label className="col-form-label label-heading">
                              Category
                            </label>
                            <div className="row category-listing">
                              <Select
                                options={categoryOptions}
                                value={categoryOptions.find(
                                  (option) => option.value === formData.category
                                )}
                                onChange={handleCategoryChange}
                                className="basic-single"
                                classNamePrefix="select"
                                placeholder="Select Category"
                              />
                            </div>
                            {error && <p style={{ color: "red" }}>{error}</p>}{" "}
                            {/* ✅ Show error message */}
                          </div>
                        </div>

                        <div className="card w-50" style={{ marginTop: "0" }}>
                          {" "}
                          {/* Set width to 50% for each card */}
                          <div className="form-group">
                            {/* <label className="col-form-label">
                              Select SubCategory
                            </label> */}
                            {/* {subcategories.length > 0 && ( */}
                            <>
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
                            </>
                            {/* )} */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {Category.SubCategory === "Computers" ||
                    Category.SubCategory === "TV & Audio" ||
                    Category.SubCategory === "Electrical" ||
                    Category.SubCategory === "Mobile Phones" ? (
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
                                          formData.OperatingSystem === area.name
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
                                          formData.Storagecapacity === area.name
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
                                          formData.DisplayQuality === area.name
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
                                          formData.SpecialFeatures === area.name
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
                    ) : Category.SubCategory === "Cars" ||
                      Category.SubCategory === "Motorcycles" ||
                      Category.SubCategory === "Vehicle Services" ||
                      Category.SubCategory === "Auto Parts" ? (
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
                                            onChange={handleTransmissionChange} // ✅ Fixed function name
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
                                        checked={formData.Purpose === area.name}
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
                                          formData.SeatingCapacity === area.name
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
                    ) : Category.SubCategory === "Occasions" ||
                      Category.SubCategory === "Personalized Gifts" ||
                      Category.SubCategory === "Gift Cards" ? (
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
                                        checked={formData.Gender === area.name}
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
                                        checked={formData.Season === area.name}
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
                    ) : Category.SubCategory === "Health Care" ? (
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
                                        onChange={handleMeasurementRangeChange}
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
                                          formData.StorageCapacity === area.name
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
                                        onChange={handleMeasurementUnitsChange}
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
                    ) : Category.SubCategory === "Full-Time" ||
                      Category.SubCategory === "Part-Time" ||
                      Category.SubCategory === "Internship" ||
                      Category.SubCategory === "Freelance" ? (
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
                                        checked={formData.JobType === area.name}
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
                                        checked={formData.Company === area.name}
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
                                          formData.EmploymentType === area.name
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
                                          formData.ExperienceLevel === area.name
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
                                          formData.RequiredSkills === area.name
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
                    ) : Category.SubCategory === "Education" ? (
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
                                        onChange={handleSubjectCategoriesChange}
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
                    ) : Category.SubCategory === "For Sale" ||
                      Category.SubCategory === "Commercial" ||
                      Category.SubCategory === "For Rent" ||
                      Category.SubCategory === "Construction" ||
                      Category.SubCategory === "Living Room" ||
                      Category.SubCategory === "Bedroom" ||
                      Category.SubCategory === "Commercial" ||
                      Category.SubCategory === "Office" ||
                      Category.SubCategory === "Others" ? (
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
                                        checked={formData.Bedroom === area.name}
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
                                        onChange={handlePropertyFeaturesChange}
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
                    ) : Category.SubCategory === "Travel" ? (
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
                                        checked={formData.Checkin === area.name}
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
                    ) : Category.SubCategory === "Sports & Game" ? (
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
                                        checked={formData.Gender === area.name}
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
                    ) : Category.SubCategory === "Pets" ||
                      Category.SubCategory === "Livestock" ||
                      Category.SubCategory === "Exotic Animals" ? (
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
                                        checked={formData.Gender === area.name}
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
                    ) : Category === "Magazines" ? (
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
                                        onChange={handleMAGAZINESCategoryChange}
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
                                        onChange={handleSubscriptionTypeChange}
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
                                        checked={formData.BagType === area.name}
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
                                        checked={formData.BagType === area.name}
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
                    <div
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
                              backgroundColor: !showPhone ? "#ccc" : "#2196F3",
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
                    </div>

                    {/* {showPhone && ( */}
                    <>
                      <input
                        // type="text"
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
                    </>
                    {/* )} */}
                    {/* <div className="form-group">
                      <label className="col-form-label">
                        {showPrice && "Price"}{" "}
                      </label>
                      <button
                        type="button"
                        className="btn btn-secondary ml-3"
                        onClick={() => setShowPrice(!showPrice)}
                      >
                        {showPrice ? "Hide" : "Show"}
                      </button>
                 
                    </div> */}
                    <div
                      className="form-group formlast-input w-50 d-flex align-items-center"
                      style={{
                        padding: "20px 0 10px 0",
                      }}
                    >
                      <span className="me-auto">{"Price Range"}</span>
                      <div className="mx-auto d-flex align-items-center">
                        <label
                          style={{
                            position: "relative",
                            display: "inline-block",
                            width: "40px",
                            height: "23px",
                            width: "3rem",

                            marginRight: "10px",
                            marginBottom: "0", // Space between switch and text
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={!showPrice}
                            onChange={() => setShowPrice(!showPrice)}
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
                              backgroundColor: !showPrice ? "#ccc" : "#2196F3",
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
                                left: !showPrice ? "30px" : "4px",
                                bottom: "4px",
                                backgroundColor: "white",
                                transition: ".4s",
                                borderRadius: "50%",
                              }}
                            />
                          </span>
                        </label>
                        <span>
                          {showPrice ? "Check to hide" : "Check to show"}
                        </span>
                      </div>
                    </div>
                    {/* {showPrice && ( */}
                    <input
                      type={showPrice ? "text" : "password"} // Change type based on showPhone
                      // type="text"
                      name="Price"
                      className="form-control pass-input"
                      placeholder="Price"
                      value={formData.Price}
                      style={{ width: "50%" }}
                      onChange={handleChange}
                    />
                    {/* )} */}
                  </div>
                </div>

                <div className="card-body">
                  <div className="form-group">
                    <label
                      className="col-form-label"
                      style={{
                        padding: "10px 0 0 0",
                      }}
                    >
                      Listing Description <span>*</span>
                    </label>
                    <textarea
                      rows={6}
                      name="description"
                      className="form-control listingdescription"
                      placeholder="Message"
                      value={formData.description}
                      onChange={handleChange}
                    />
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
              {/* <div
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
                  style={{ margin: "0" }}
                />
                <label style={{ fontSize: "14px" }}>
                  Agree to terms of services
                </label>
              </div> */}
              {showPayment && (
                <Elements stripe={stripePromise}>
                  <PaymentForm />
                </Elements>
              )}
              <button
                onClick={saveToFirestore}
                disabled={uploading} // Disable unless checkbox is checked & not uploading
                className="btn btn-primary"
                type="button"
              >
                {" "}
                Submit
              </button>
              {error && (
                <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>
              )}{" "}
              {/* ✅ Show error message */}
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
