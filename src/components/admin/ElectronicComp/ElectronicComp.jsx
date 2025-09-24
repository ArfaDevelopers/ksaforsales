import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"; // Import Link from react-router-dom
import Header from "../../home/header"; // Ensure Header is correctly implemented and imported
import Footer from "../../home/footer/Footer";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import { IoLocationOutline } from "react-icons/io5";
import { Modal } from "bootstrap";

import WindowedSelect from "react-windowed-select";
import cityData from "../../../City.json";
import locationData from "../../../Location.json";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import profile from "../dyanmic_route/profileimage.png";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import Chat from "../../../components/admin/dyanmic_route/upperHeader/Chat";
import Loading1 from "../../../../public/Progress circle.png";
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
  getDoc,
  setDoc,
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";
import { auth, storage } from "../../Firebase/FirebaseConfig";
import { db } from "./../../Firebase/FirebaseConfig.jsx";
import { FaHeart, FaPhone, FaSearch, FaWhatsapp } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
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
import Mesagedeals from "../../../components/userPages/mesagedeals";
import { ref, getDownloadURL } from "firebase/storage";
import axios from "axios";

const ElectronicComp = () => {
  const parms = useLocation().pathname;
  const [isVisible, setIsVisible] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
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

  const [selectedRegion, setSelectedRegionId] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [isCityModalVisible, setIsCityModalVisible] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]); // Selected cities for filtering
  const [selectedEmirates, setSelectedEmirates] = useState([]); // Selected Emirates for filtering
  // const [Brand, setBrand] = useState([]);
  const [selectedSubCategory, setselectedSubCategory] = useState("");
  const [CityList, setCityList] = useState([]);
  const [cities, setCities] = useState([]);
  const [searchCityText, setSearchCityText] = useState("");
  const [productIds, setproductIds] = useState(null);

  console.log(selectedCities, "Fetched cities:1");
  console.log(cities, "Fetched cities:1cities");

  const [districts, setDistricts] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const cityModalRef = useRef(null);
  const regionPairs = [];
  const [showModalDistricts, setShowModalDistricts] = useState(false);
  const [searchDistrictText, setSearchDistrictText] = useState("");
  const handleDistrictCheckboxChange = async (option, isChecked) => {
    if (isChecked) {
      // ✅ Add to local state
      setSelectedDistricts((prev) => [
        ...prev,
        {
          REGION_ID: option.regionId,
          CITY_ID: option.cityId,
          DISTRICT_ID: option.value,
        },
      ]);

      // ✅ Firestore: increment district count
      try {
        const districtRef = doc(db, "districtIdSortData", String(option.value));
        const docSnap = await getDoc(districtRef);

        if (docSnap.exists()) {
          await updateDoc(districtRef, {
            count: (docSnap.data().count || 0) + 1,
          });
        } else {
          await setDoc(districtRef, {
            districtId: option.value,
            cityId: option.cityId,
            regionId: option.regionId,
            count: 1,
          });
        }
      } catch (err) {
        console.error("❌ Error updating district count:", err);
      }
    } else {
      // ❌ Just remove from local state (do not decrement in Firestore)
      setSelectedDistricts((prev) =>
        prev.filter((district) => district.DISTRICT_ID !== option.value)
      );
    }
  };
  const handleRegionClick = async (regionId, isChecked) => {
    try {
      const regionRef = doc(db, "regionIdSortData", String(regionId));
      const docSnap = await getDoc(regionRef);

      if (!isChecked) {
        // ✅ Region newly selected, increment count
        if (docSnap.exists()) {
          await updateDoc(regionRef, {
            count: (docSnap.data().count || 0) + 1,
          });
        } else {
          await setDoc(regionRef, {
            regionId,
            count: 1,
          });
        }
      }
      // ❌ If unchecked, do nothing (or you could also decrement if needed)
    } catch (err) {
      console.error("Error updating region count:", err);
    }
  };
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
  const cityOptions = cities.map((city) => ({
    value: city.CITY_ID,
    label: city["City En Name"],
    regionId: city.REGION_ID,
    cityId: city.CITY_ID,
  }));
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
  const handleCheckboxChange1 = async (option) => {
    const exists = selectedCities.some(
      (city) => city.CITY_ID === option.cityId
    );

    let updatedCities;
    if (exists) {
      // Unchecked -> remove from list
      updatedCities = selectedCities.filter(
        (city) => city.CITY_ID !== option.cityId
      );
    } else {
      // Checked -> add to list
      updatedCities = [
        ...selectedCities,
        { REGION_ID: option.regionId, CITY_ID: option.cityId },
      ];

      // ✅ Update Firestore count in new table
      try {
        const cityRef = doc(db, "cityIdSortData", String(option.cityId));
        const docSnap = await getDoc(cityRef);

        if (docSnap.exists()) {
          await updateDoc(cityRef, {
            count: (docSnap.data().count || 0) + 1,
          });
        } else {
          await setDoc(cityRef, {
            cityId: option.cityId,
            regionId: option.regionId,
            count: 1,
          });
        }
      } catch (err) {
        console.error("❌ Error updating city count:", err);
      }
    }

    setSelectedCities(updatedCities);
  };

  // const handleCheckboxChange1 = (option) => {
  //   const exists = selectedCities.some(
  //     (city) => city.CITY_ID === option.cityId
  //   );
  //   let updatedCities;
  //   if (exists) {
  //     updatedCities = selectedCities.filter(
  //       (city) => city.CITY_ID !== option.cityId
  //     );
  //   } else {
  //     updatedCities = [
  //       ...selectedCities,
  //       { REGION_ID: option.regionId, CITY_ID: option.cityId },
  //     ];
  //   }
  //   setSelectedCities(updatedCities);
  // };
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
  const [categories, setCategories] = useState([]);
  const [selectedSubCategory1, setSelectedSubCategory1] = useState("");
  console.log(selectedSubCategory1, "filteredCars_________category");

  useEffect(() => {
    axios
      .get("http://168.231.80.24:9002/route/electronicsSubCategories")
      .then((response) => {
        setCategories(response.data); // Store all categories with counts
      })
      .catch((error) => {
        console.error("Error fetching electronics categories:", error);
      });
  }, []);

  // Handle city selection
  const [carsData, setCars] = useState([]); // All cars data
  const [filteredCars, setFilteredCars] = useState([]); // Filtered cars based on search & city
  const [searchQuery, setSearchQuery] = useState(""); // Search query for title and city
  const [currentPageCars, setCurrentPageCars] = useState([]); // Cars to display on the current page

  console.log(filteredCars, "filteredCars_________");
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close if click is outside a phone button
      if (
        !event.target.closest(".call-now-wrapper") &&
        !event.target.closest(".call-now-link")
      ) {
        setActivePhoneIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const itemsPerPage = 3; // Number of items per page
  const [adsDetailImages, setAdsDetailImages] = useState([]);
  useEffect(() => {
    const fetchAdsDetailImages = async () => {
      try {
        const adsCollectionRef = collection(db, "cityIdSortData");
        const adsSnapshot = await getDocs(adsCollectionRef);

        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("📸 AdsdetailImages fetched11:", adsList);
      } catch (error) {
        console.error("❌ Error fetching AdsdetailImages:", error);
      }
    };

    fetchAdsDetailImages();
  }, [selectedCities]);
  console.log(adsDetailImages, "adsDetailImages________");
  useEffect(() => {
    const fetchAdsDetailImages = async () => {
      try {
        const adsCollectionRef = collection(db, "districtIdSortData");
        const adsSnapshot = await getDocs(adsCollectionRef);

        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("📸 AdsdetailImages fetched11:districtIdSortData", adsList);
      } catch (error) {
        console.error("❌ Error fetching AdsdetailImages:", error);
      }
    };

    fetchAdsDetailImages();
  }, [selectedCities]);
  useEffect(() => {
    const fetchAdsDetailImages = async () => {
      try {
        const adsCollectionRef = collection(db, "BodyContentElectronic");
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

  const [showAll, setShowAll] = useState(false);

  const handleCategoryCheck = (category) => {
    setSelectedSubCategory1((prev) => (prev === category ? "" : category));
  };

  // Show first 4 or all based on showAll state
  const visibleCategories = showAll ? categories : categories.slice(0, 4);
  console.log(visibleCategories, "visibleCategories___");
  useEffect(() => {
    setSearchQuery(searchText); // Update searchQuery from searchText
  }, [searchText]);
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
  const [brands, setBrands] = useState([]);
  const handleCheckboxBrand = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setBrands((prev) => [...prev, value]);
    } else {
      setBrands((prev) => prev.filter((brand) => brand !== value));
    }
  };

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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
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
  const [logSelectedPurpose, setlogSelectedPurpose] = useState([]); // use array

  const [selectedOptionVideoAvailability, setSelectedOptionVideoAvailability] =
    useState("");
  const [selectedOptionisFeatured, setSelectedOptionisFeatured] = useState("");
  const [storageType, setStorageType] = useState("");
  const [showModal, setShowModal] = useState(false);

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
  const [ads, setCarsData] = useState([]);
  const [userId, setUserId] = useState(""); // State for image preview
  const [error, setError] = useState(""); // ✅ Error state
  const [selectedCountry, setSelectedCountry] = useState(null);
  // const [selectedCities, setSelectedCities] = useState([]); // Array of selected cities
  const [Condition, setCondition] = useState([]);

  const [subCatgory, setsubCatgory] = useState("");
  const [nestedSubCategory, setNestedSubCategory] = useState("");
  console.log(nestedSubCategory, "subCatgory___________2233");
  console.log(subCatgory, "subCatgory___________1133");
  // const [searchQuery, setSearchQuery] = useState(""); // For search query, if any
  const [states, setStates] = useState([]);
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
  const [receiverId, setReceiverId] = useState(null);
  const [refresh, setRefresh] = useState(false); // Add loading state

  const user = auth.currentUser;
  const currentUserId = user?.uid;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    const callingFrom = getQueryParam("callingFrom");
    const subCatgory = getQueryParam("subCatgory");
    const NestedSubCategory = getQueryParam("NestedSubCategory");
    setNestedSubCategory(NestedSubCategory);
    const ids = getQueryParam("id");
    console.log("subCatgory___________9:ids", ids);
    console.log("subCatgory___________9 From:", callingFrom);
    console.log(subCatgory, "subCatgory___________933");
    console.log(NestedSubCategory, "subCatgory___________9122");
    setsubCatgory(subCatgory);
    setCallingFrom(callingFrom);
    setId(ids);
  }, [id, location, getQueryParam]);
  const [sortedRegions, setSortedRegions] = useState([]);

  useEffect(() => {
    const fetchAdsDetailImages = async () => {
      try {
        const adsCollectionRef = collection(db, "regionIdSortData");
        const adsSnapshot = await getDocs(adsCollectionRef);

        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 🔽 Sort by count DESC
        const sortedAds = adsList.sort((a, b) => b.count - a.count);

        // 🔽 Merge with regionOptions
        const mergedRegions = sortedAds
          .map((ad) => {
            const region = regionOptions.find(
              (r) => r.regionId === ad.regionId
            );
            return region ? { ...region, count: ad.count } : null;
          })
          .filter(Boolean);

        // 🔽 Add remaining regions (not in adsList) at the bottom
        const remainingRegions = regionOptions.filter(
          (r) => !sortedAds.some((ad) => ad.regionId === r.regionId)
        );

        const finalRegions = [...mergedRegions, ...remainingRegions];

        setSortedRegions(finalRegions); // Store in state for rendering
        console.log("✅ Final sorted regions:", finalRegions);
      } catch (error) {
        console.error("❌ Error fetching AdsdetailImages:", error);
      }
    };

    fetchAdsDetailImages();
  }, [selectedRegion]);
  // Format country data for React Select
  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedSubCategory1("");
    setBrands([]);
    setSelectedRegionId([]);
    setSelectedCities([]);
    setSelectedDistricts([]);
    setSelectedDistricts([]);
    setToValue("");
    setFromValue("");
    setCondition([]);
    setlogSelectedPurpose([]);
  };
  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));
  // const brandOptions = {
  //   "Mobile Phones": [
  //     "Apple",
  //     "iPhone",
  //     "iPod",
  //     "Apple Watch",
  //     "Samsung",
  //     "Galaxy S",
  //     "Galaxy Note",
  //     "Huawei",
  //     "Sony",
  //     "Xperia",
  //     "BlackBerry",
  //     "Nokia",
  //     "HTC",
  //     "Microsoft",
  //     "LG",
  //     "Hitachi",
  //     "Panasonic",
  //   ],
  //   "Computers & Laptops": [
  //     "MacBook",
  //     "Surface",
  //     "Sony Laptop",
  //     "Toshiba",
  //     "Dell",
  //     "Asus",
  //     "Acer",
  //   ],
  //   Cameras: ["Canon", "Fujifilm", "Olympus", "Samsung", "Nikon", "Sony"],
  // };

  // Handle country selection

  const brandOptions = [
    "Apple",
    "iPhone",
    "iPod",
    "Apple Watch",
    "Samsung",
    "Galaxy S",
    "Galaxy Note",
    "Huawei",
    "Sony",
    "Xperia",
    "BlackBerry",
    "Nokia",
    "HTC",
    "Microsoft",
    "LG",
    "Hitachi",
    "Panasonic",
    "MacBook",
    "Surface",
    "Sony Laptop",
    "Toshiba",
    "Dell",
    "Asus",
    "Acer",

    "Canon",
    "Fujifilm",
    "Olympus",
    "Samsung",
    "Nikon",
    "Sony",
  ];

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
  const handleCheckboxCondition = (label) => {
    setCondition(
      (prevSelected) =>
        prevSelected.includes(label)
          ? prevSelected.filter((item) => item !== label) // remove if already selected
          : [...prevSelected, label] // add if not selected
    );
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
  const handleCheckboxPurpose = (label) => {
    setlogSelectedPurpose((prevSelected) => {
      if (prevSelected.includes(label)) {
        // remove if already selected
        return prevSelected.filter((item) => item !== label);
      } else {
        // add if not selected
        return [...prevSelected, label];
      }
    });
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
      fetch(`http://168.231.80.24:9002/route/ELECTRONICS/${carId}/view`, {
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
      const carDocRef = doc(db, "ELECTRONICS", carId);
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

  useEffect(() => {
    const CITY_ID = selectedCities[0]?.CITY_ID;
    const DISTRICT_ID = selectedDistricts[0]?.DISTRICT_ID;

    const fetchElectronics = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        if (searchText) params.append("searchText", searchText);

        // ✅ Pass multiple regionId values
        if (selectedRegion.length) {
          selectedRegion.forEach((id) => params.append("regionId", id));
        }

        if (CITY_ID) params.append("CITY_ID", CITY_ID);
        if (DISTRICT_ID) params.append("DISTRICT_ID", DISTRICT_ID);

        // ✅ Pass SortBy
        if (SortBy) params.append("sortBy", SortBy);

        const response = await fetch(
          `http://168.231.80.24:9002/route/ELECTRONICS?${params.toString()}`
        );

        const electronicsData = await response.json();
        if (!response.ok) return;
        setCars(electronicsData);
        setFilteredCars(electronicsData);
        setLoading(false);

        console.log(electronicsData, "electronicsData_________");
      } catch (error) {
        console.error("Error getting ELECTRONICS:", error);
        setLoading(false);
      }
    };

    fetchElectronics();
  }, [
    searchText,
    selectedRegion,
    selectedCities,
    selectedDistricts,
    refresh,
    SortBy, // 🔹 re-fetch when SortBy changes
  ]);

  const handleShowModal = (userId, productIds) => {
    console.log("Opening modal for receiverId:", receiverId); // Debug
    console.log("Opening modal for Current User ID:", currentUserId); // Debug
    setReceiverId(userId);
    setproductIds(productIds);

    setShowModal(true);
    // You can store the userId in state if needed, e.g., setSelectedUserId(userId);
  };
  useEffect(() => {
    // Filter cars for the current page
    const startIndex = (activePage - 1) * carsPerPage;
    const endIndex = startIndex + carsPerPage;
    setCurrentPageCars(filteredCars.slice(startIndex, endIndex));
  }, [activePage, filteredCars]);

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
      selectedSubCategory1,

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
      nestedSubCategory,
      subCatgory,
      selectedSubCategory,
      logSelectedPurpose,
      Condition,
      brands,
      selectedCity,
      selectedDistrict
    );
  }, [
    searchQuery,
    selectedCities,

    selectedEmirates,
    selectedCarsMake,
    fromValue,
    selectedSubCategory1,
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
    nestedSubCategory,
    subCatgory,
    selectedSubCategory,
    logSelectedPurpose,
    Condition,
    brands,
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
      selectedEmirates,
      selectedCarsMake,
      fromValue,
      selectedSubCategory1,

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
      nestedSubCategory,
      subCatgory,
      selectedSubCategory,
      logSelectedPurpose,
      Condition,
      brands,
      selectedCity,
      selectedDistrict
    );
  };
  const filterCars = (
    query,
    cities,
    emirates,
    selectedCarsMake,
    fromValue,
    selectedSubCategory1,

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
    nestedSubCategory,
    subCatgory,
    selectedSubCategory,
    logSelectedPurpose,
    Condition,
    brands,
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
          car.make?.toLowerCase().includes(lowercasedQuery) ||
          car.Registeredin?.toLowerCase().includes(lowercasedQuery) ||
          car.Color?.toLowerCase().includes(lowercasedQuery) ||
          car.Transmission?.toLowerCase().includes(lowercasedQuery) ||
          car.EngineType?.toLowerCase().includes(lowercasedQuery) ||
          car.SubCategory?.toLowerCase().includes(lowercasedQuery) ||
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
          // car.brands?.toLowerCase().includes(lowercasedQuery) ||
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
          car.TrustedCars?.toLowerCase().includes(lowercasedQuery) ||
          car.NestedSubCategory?.toLowerCase().includes(lowercasedQuery) ||
          car.SubCategory?.toLowerCase().includes(lowercasedQuery) ||
          car.Purpose?.toLowerCase().includes(lowercasedQuery) ||
          car.Condition?.toLowerCase().includes(lowercasedQuery) ||
          car.brands?.toLowerCase().includes(lowercasedQuery) ||
          car.SubCategory?.toLowerCase().includes(lowercasedQuery) ||
          car.District?.toLowerCase().includes(lowercasedQuery)
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
    if (selectedCity && selectedCity.length > 0) {
      const selectedCityValues = selectedCity.map((city) => city.value); // Extract values, e.g., ["ny", "la"]
      filtered = filtered.filter((car) =>
        selectedCityValues.includes(car.City)
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
    if (ScreenSize?.length > 0) {
      filtered = filtered.filter((car) => ScreenSize.includes(car.ScreenSize));
    }
    if (subCatgory?.length > 0) {
      filtered = filtered.filter((car) => subCatgory.includes(car.SubCategory));
    }
    if (selectedSubCategory?.length > 0) {
      filtered = filtered.filter((car) =>
        selectedSubCategory.includes(car.SubCategory)
      );
    }
    if (selectedSubCategory1?.length > 0) {
      filtered = filtered.filter((car) =>
        selectedSubCategory1.includes(car.SubCategory)
      );
    }
    if (brands?.length > 0) {
      filtered = filtered.filter((car) => brands.includes(car.brands));
    }
    if (Condition?.length > 0) {
      filtered = filtered.filter((car) => Condition.includes(car.Condition));
    }
    if (logSelectedPurpose?.length > 0) {
      filtered = filtered.filter((car) =>
        logSelectedPurpose.includes(car.Purpose)
      );
    }
    if (nestedSubCategory?.length > 0) {
      filtered = filtered.filter((car) =>
        nestedSubCategory.includes(car.NestedSubCategory)
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
    // if (Brand?.length > 0) {
    //   filtered = filtered.filter((car) => Brand.includes(car.Brand));
    // }
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
    console.log(filtered, "filtered________");
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
                navigate("/ElectronicComp");
              }}
              className="btn"
              style={{
                background: window.innerWidth <= 576 ? "none" : "#E9EEFF",
                fontWeight: "500",
                // pointerEvents: "none",
                padding: window.innerWidth <= 576 ? "0px" : "10px 15px",
              }}
            >
              Electronics
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
            <Col
              lg={3}
              className=" filter_main_wrap style={{ height: '200px' }}"
            >
              <div className="side_bar_main_wrap">
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
                <Form className="filter_innerwrap">
                  <Row className="my-3">
                    <Col>
                      <div className="d-flex justify-content-between align-items-center">
                        <Form.Label
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            paddingLeft: "8px",
                            marginBottom: 0, // Keep aligned vertically
                          }}
                        >
                          Search by Keywords
                        </Form.Label>

                        <button
                          type="button"
                          className="blue_btn"
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

                  {/*  -------------  */}
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

                  {/*-------------------------------------*/}
                  {/* Accordion with Checkbox Selection for Color */}
                  <Accordion className="mt-3">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Ad Type</Accordion.Header>
                      <Accordion.Body>
                        <div style={{ maxWidth: "300px", margin: "20px" }}>
                          <Form.Group>
                            {["Rent", "Sell", "Wanted"].map((purpose) => (
                              <div
                                key={purpose}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "8px 0",
                                }}
                              >
                                <Form.Check
                                  type="checkbox"
                                  label={purpose}
                                  checked={logSelectedPurpose.includes(purpose)} // controlled checkbox
                                  onChange={() =>
                                    handleCheckboxPurpose(purpose)
                                  }
                                />
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
                      <Accordion.Header>Sub Categories</Accordion.Header>
                      <Accordion.Body>
                        <div style={{ maxWidth: "300px", margin: "20px" }}>
                          <Form.Group>
                            <Form.Label>Select a Category</Form.Label>
                            <>
                              {visibleCategories.map((item, index) => (
                                <div key={index} className="form-check mb-2">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`cat-${index}`}
                                    value={item.category}
                                    checked={
                                      selectedSubCategory1 === item.category
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
                  <Accordion className="mt-3">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Brands</Accordion.Header>
                      <Accordion.Body>
                        <div style={{ maxWidth: "300px", margin: "20px" }}>
                          <Form.Group>
                            {brandOptions.map((brand) => (
                              <div
                                key={brand}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "8px 0",
                                }}
                              >
                                <Form.Check
                                  type="checkbox"
                                  label={brand}
                                  value={brand}
                                  checked={brands.includes(brand)}
                                  onChange={handleCheckboxBrand}
                                />
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

                  {/*--------------------------------------*/}
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Select Region</Accordion.Header>
                      <Accordion.Body>
                        <Form.Group className="mb-3">
                          {/* <Form.Label>Select a Region</Form.Label> */}
                          <div className="mb-3">
                            {sortedRegions.slice(0, 6).map((region) => {
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
                                        handleRegionClick(region?.regionId);
                                        setSelectedRegionId((prev) =>
                                          prev.filter(
                                            (id) => id !== region.regionId
                                          )
                                        );
                                      } else {
                                        handleRegionClick(region?.regionId);
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
                                          {sortedRegions.map((region) => {
                                            const isChecked =
                                              selectedRegion.includes(
                                                region.regionId
                                              );

                                            return (
                                              <li>
                                                <label
                                                  className="d-flex align-items-center gap-2"
                                                  key={region.regionId}
                                                >
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`region-${region.regionId}`}
                                                    checked={isChecked}
                                                    onChange={() => {
                                                      if (isChecked) {
                                                        handleRegionClick(
                                                          region?.regionId
                                                        );

                                                        setSelectedRegionId(
                                                          (prev) =>
                                                            prev.filter(
                                                              (id) =>
                                                                id !==
                                                                region.regionId
                                                            )
                                                        );
                                                      } else {
                                                        handleRegionClick(
                                                          region?.regionId
                                                        );

                                                        setSelectedRegionId(
                                                          (prev) => [
                                                            ...prev,
                                                            region.regionId,
                                                          ]
                                                        );
                                                      }
                                                    }}
                                                  />
                                                  <span
                                                    className="form-check-label"
                                                    htmlFor={`region-${region.regionId}`}
                                                  >
                                                    {region.label}
                                                  </span>
                                                </label>
                                              </li>
                                            );
                                          })}
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

                              {/* Show More Link */}
                              {/* {cityOptions.length > 4 && (
                                            <button
                                              type="button"
                                              className="btn btn-link p-0"
                                              data-bs-toggle="modal"
                                              data-bs-target="#moreCitiesModal1"
                                            >
                                              Show more choices...
                                            </button>
                                          )} */}
                            </div>

                            {/* {cityOptions.length > 4 && ( */}
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
                                  {/* Header with search */}
                                  <div className="modal-header d-flex justify-content-between align-items-center flex-wrap gap-2">
                                    <h5
                                      className="modal-title mb-0"
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

                                  {/* Body with filtered cities */}
                                  <div className="modal-body">
                                    <input
                                      type="text"
                                      className="form-control mb-3"
                                      placeholder="Search cities..."
                                      style={{ maxWidth: "100%" }}
                                      value={searchCityText}
                                      onChange={(e) =>
                                        setSearchCityText(e.target.value)
                                      }
                                    />
                                    <div className="row">
                                      <ul className="more_choice_main_list">
                                        {cityOptions
                                          .filter((option) =>
                                            option.label
                                              ?.toLowerCase()
                                              .includes(
                                                searchCityText.toLowerCase()
                                              )
                                          )
                                          .map((option) => (
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
                                                    handleCheckboxChange1(
                                                      option
                                                    )
                                                  }
                                                />
                                                <span>{option.label}</span>
                                              </label>
                                            </li>
                                          ))}
                                      </ul>
                                    </div>
                                  </div>

                                  <div className="modal-footer bg-light border-top d-flex justify-content-between align-items-center">
                                    <div className="text-muted small">
                                      {selectedCities
                                        ? `${selectedCities.length} region selected`
                                        : "No region selected"}
                                    </div>
                                    <div className="d-flex gap-2">
                                      <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => {
                                          setSelectedCities([]);
                                        }}
                                      >
                                        Clear Selection
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-primary px-4"
                                        onClick={() =>
                                          setIsCityModalVisible(false)
                                        }
                                      >
                                        Done
                                      </button>
                                    </div>
                                  </div>

                                  {/* Footer */}
                                  {/* <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={() =>
                                        setIsCityModalVisible(false)
                                      }
                                    >
                                      Close
                                    </button>
                                  </div> */}
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
                          <Form.Label>Select a District</Form.Label>
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
                            {/* {districtOptions.slice(0, 6).map((option) => {
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
                            })} */}
                            {districtOptions.slice(0, 6).map((option) => {
                              const isChecked = selectedDistricts.some(
                                (district) =>
                                  district.DISTRICT_ID === option.value
                              );

                              return (
                                <label
                                  key={option.value}
                                  className="form-check d-flex align-items-center gap-2"
                                >
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={isChecked}
                                    onChange={(e) =>
                                      handleDistrictCheckboxChange(
                                        option,
                                        e.target.checked
                                      )
                                    }
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
                                  {/* Header with search input */}
                                  <div className="modal-header d-flex justify-content-between align-items-center flex-wrap gap-2">
                                    <h5 className="modal-title mb-0">
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
                                    <input
                                      type="text"
                                      className="form-control mb-3"
                                      placeholder="Search districts..."
                                      style={{ maxWidth: "100%" }}
                                      value={searchDistrictText}
                                      onChange={(e) =>
                                        setSearchDistrictText(e.target.value)
                                      }
                                    />
                                    <div className="row g-1 ml-4">
                                      <ul className="more_choice_main_list">
                                        {districtOptions
                                          .slice(6)
                                          .map((option) => {
                                            const isChecked =
                                              selectedDistricts.some(
                                                (district) =>
                                                  district.DISTRICT_ID ===
                                                  option.value
                                              );

                                            return (
                                              <label
                                                key={option.value}
                                                className="form-check d-flex align-items-center gap-2"
                                              >
                                                <input
                                                  type="checkbox"
                                                  className="form-check-input"
                                                  checked={isChecked}
                                                  onChange={(e) =>
                                                    handleDistrictCheckboxChange(
                                                      option,
                                                      e.target.checked
                                                    )
                                                  }
                                                />
                                                <span className="form-check-label">
                                                  {option.label}
                                                </span>
                                              </label>
                                            );
                                          })}
                                        {/* {districtOptions
                                          .filter((option) =>
                                            option.label
                                              .toLowerCase()
                                              .includes(
                                                searchDistrictText.toLowerCase()
                                              )
                                          )
                                          .map((option) => {
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
                                                    style={{
                                                      cursor: "pointer",
                                                    }}
                                                  >
                                                    {option.label}
                                                  </span>
                                                </label>
                                              </li>
                                            );
                                          })} */}
                                      </ul>
                                    </div>

                                    {/* Selection Count */}
                                    {/* {selectedDistricts.length > 0 && (
                                      <div className="mt-2 p-2 bg-light rounded">
                                        <small className="text-muted">
                                          {selectedDistricts.length} selected
                                        </small>
                                      </div>
                                    )} */}
                                  </div>
                                  <div className="modal-footer bg-light border-top d-flex justify-content-between align-items-center">
                                    <div className="text-muted small">
                                      {selectedDistricts
                                        ? `${selectedDistricts.length} region selected`
                                        : "No region selected"}
                                    </div>
                                    <div className="d-flex gap-2">
                                      <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => {
                                          setSelectedDistricts([]);
                                        }}
                                      >
                                        Clear Selection
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-primary px-4"
                                        onClick={() =>
                                          setShowModalDistricts(false)
                                        }
                                      >
                                        Done
                                      </button>
                                    </div>
                                  </div>
                                  {/* Footer */}
                                  {/* <div className="modal-footer py-2">
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
                                  </div> */}
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
                  {/*      ----------               */}

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
                              />
                            </Col>
                            <Col>
                              <Form.Control
                                type="text"
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
                                    checked={Condition.includes(condition)} // ✅ controlled checkbox
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
                        <Accordion.Header>Brand</Accordion.Header>
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
                                    checked={Condition.includes(condition)} // ✅ controlled checkbox
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
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
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
                                to={`/Dynamic_Route?id=${car.id}&callingFrom=ElectronicComp`}
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
                                    to={`/Dynamic_Route?id=${car.id}&callingFrom=ElectronicComp`}
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
                                    <div className="call-now-wrapper">
                                      {isActive ? (
                                        <a
                                          className="call-now-link"
                                          href={`tel:${car.Phone}`}
                                          onClick={(e) => {
                                            // Allow call to proceed
                                            setActivePhoneIndex(null); // Close after call
                                          }}
                                        >
                                          <button
                                            className={`sign-in-button expanded`}
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
                                              // Prevent this click from bubbling to body
                                              e.stopPropagation();
                                            }}
                                          >
                                            <FaPhoneAlt />
                                            <span className="fw-semibold">
                                              {car.Phone}
                                            </span>
                                          </button>
                                        </a>
                                      ) : (
                                        <button
                                          className={`blue_btn list_btn`}
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
                                            e.stopPropagation(); // prevent global listener
                                            setActivePhoneIndex(index); // show phone
                                          }}
                                        >
                                          <FaPhoneAlt />
                                          <span>Call Now</span>
                                        </button>
                                      )}
                                    </div>
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
                                  <div
                                    className={`modal fade ${
                                      showModal ? "show d-block" : "d-none"
                                    }`}
                                    tabIndex="-1"
                                    role="dialog"
                                    style={{ marginTop: 100 }} // Removed backgroundColor
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
                                            productIds={productIds}
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
        <LatestBlog />
      </div>

      <Footer />
    </>
  );
};

export default ElectronicComp;
