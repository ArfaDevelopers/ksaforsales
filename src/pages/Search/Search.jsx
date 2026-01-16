import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../components/home/header";
import Footer from "../../components/home/footer/Footer";
import { MdKeyboardArrowRight } from "react-icons/md";
import { ref, getDownloadURL } from "firebase/storage";
import ComercialsAds from "../../components/home/ComercialsAds/ComercialsAds.jsx";
import LatestBlog from "../../components/blog/BlogList/LatestBlog/LatestBlog.jsx";
import {
  Accordion,
  Spinner,
  Pagination,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Container, Row, Col, Form } from "react-bootstrap";
import { storage } from "../../components/Firebase/FirebaseConfig";
import { db, auth } from "../../components/Firebase/FirebaseConfig";
import { data } from "../../utils/data";
import { getTranslatedData } from "../../utils/translateData";
import HorizantalLine from "../../components/HorizantalLine";
import SearchResultCard from "../../components/SearchResults/SearchResultCard";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  saudiRegions,
  fetchCities,
  fetchDistricts,
} from "../../utils/locationApi";

const Search = () => {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCityIds = searchParams.getAll("city");
  const category = searchParams.get("category")
    ? searchParams.get("category")
    : "";

  // Map URL slugs to English category names (for database filtering)
  const categoryToEnglishMap = {
    motors: "Motors",
    automotive: "Motors",
    electronics: "Electronics",
    "fashion-style": "Fashion Style",
    "home-furniture": "Home & Furniture",
    "job-board": "Job Board",
    realestate: "Real Estate",
    "real-estate": "Real Estate",
    services: "Services",
    "sport-&-game": "Sport & Game",
    "sport-and-game": "Sport & Game",
    "sport-game": "Sport & Game",
    "pet-&-animals": "Pet & Animals",
    "pet-and-animals": "Pet & Animals",
    "pet-animals": "Pet & Animals",
    other: "Other",
  };

  // Map URL slugs to translated display names (for UI)
  const categoryToDisplayMap = {
    motors: t("categories.motors"),
    automotive: t("categories.motors"),
    electronics: t("categories.electronics"),
    "fashion-style": t("categories.fashionStyle"),
    "home-furniture": t("categories.homeFurniture"),
    "job-board": t("categories.jobBoard"),
    realestate: t("categories.realEstate"),
    "real-estate": t("categories.realEstate"),
    services: t("categories.services"),
    "sport-&-game": t("categories.sportGame"),
    "sport-and-game": t("categories.sportGame"),
    "sport-game": t("categories.sportGame"),
    "pet-&-animals": t("categories.petAnimals"),
    "pet-and-animals": t("categories.petAnimals"),
    "pet-animals": t("categories.petAnimals"),
    other: t("categories.other"),
  };

  // English category name for database filtering
  const categoryEnglishName = category
    ? categoryToEnglishMap[category.toLowerCase()]
    : "";

  // Translated display name for UI
  const categoryDisplayName = category
    ? categoryToDisplayMap[category.toLowerCase()]
    : "";

  // Get translated data based on current language
  const translatedData = getTranslatedData(data, t);

  let currentCategoryFilters =
    translatedData.find((page) => page.path === `/${category}`) ||
    translatedData.find(
      (page) =>
        page.name?.toLowerCase() === categoryDisplayName?.toLowerCase()
    );

  if (!currentCategoryFilters && categoryDisplayName) {
    currentCategoryFilters = {
      name: categoryDisplayName,
      path: `/search?category=${category}`,
      filters: translatedData.find((page) => page.path === `/search`)?.filters || {},
    };
  } else if (!currentCategoryFilters) {
    currentCategoryFilters = translatedData.find((page) => page.path === `/search`);
  }
  const [allAds, setAllAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [bookmarkedAds, setBookmarkedAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const adsPerPage = 10;
  const [sortBy, setSortBy] = useState("Sort by: Most Relevant");

  const qParam = searchParams.get("q") || "";
  const [searchKeyword, setSearchKeyword] = useState(qParam);
  // Track if we're on initial load to sync URL to state only once
  const isInitialMount = React.useRef(true);

  useEffect(() => {
    const urlSearchQuery = searchParams.get("q") || "";

    // Sync URL to state on initial mount
    if (isInitialMount.current) {
      setSearchKeyword(urlSearchQuery);
      isInitialMount.current = false;
    }
    // Also clear searchKeyword state when URL no longer has "q" parameter
    // This happens when user changes category or clears filters
    else if (!urlSearchQuery && searchKeyword) {
      setSearchKeyword("");
    }
  }, [searchParams, searchKeyword]);

  const getUrlText = (text) => {
    if (!text) return "";

    // Special case for "Home & Furniture" to convert to "home-furniture"
    if (text.trim().toLowerCase() === "home & furniture") {
      return "home-furniture";
    }

    return String(text)
      .trim()
      .toLowerCase()
      .replace(/–/g, "-")
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const getTextFromURL = (text) => {
    if (!text) return "";
    return String(text)
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const [subcategory, setSubcategory] = useState("");
  const subCategoryParam = searchParams.get("subcategory")
    ? searchParams.get("subcategory")
    : "";
  const [oneInput, setOneInput] = useState("");
  const [filterData, setFilterData] = useState({
    subCategory: "",
    nestedSubCategory: [],
    region: "",
    district: "",
    city: "",
    brand: "",
    brandModel: [],
    fromPrice: "",
    toPrice: "",
    fromYear: "",
    toYear: "",
    fromMileage: "",
    toMileage: "",
    addType: [],
    transmission: [],
    exteriorColor: [],
    interiorColor: [],
    additionalFeatures: [],
    condition: [],
    regionalSpec: [],
    fuelType: [],
    insurance: [],
    bodyType: [],
    noOfDoors: [],
    frequency: [],
    residenceType: [],
    noOfRooms: [],
    noOfBathrooms: [],
    area: [],
    furnished: [],
    facade: [],
    licenseNumber: "",
    streetWidth: "",
    floor: [],
    amenities: [],
    propertyAge: [],
    age: [],
  });
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [showDistrictModal, setShowDistrictModal] = useState(false);
  const [searchTermRegion, setSearchTermRegion] = useState("");
  const [searchTermCity, setSearchTermCity] = useState("");
  const [searchTermDistrict, setSearchTermDistrict] = useState("");
  const [showBrandModelModal, setShowBrandModelModal] = useState(false);
  const [searchTermBrandModel, setSearchTermBrandModel] = useState("");
  const [availableBrandModels, setAvailableBrandModels] = useState([]);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [searchTermBrand, setSearchTermBrand] = useState("");
  const filterSectionRef = useRef(null);

  const parms = useLocation().pathname;
  const navigate = useNavigate();
  useEffect(() => {
    const loadCities = async () => {
      if (selectedRegions.length > 0) {
        setLoadingCities(true);
        try {
          const allCities = await Promise.all(
            selectedRegions.map((regionId) => fetchCities(regionId))
          );
          const flattenedCities = allCities.flat();
          setCities(flattenedCities);
        } catch (error) {
          console.error("Error loading cities:", error);
          setCities([]);
        } finally {
          setLoadingCities(false);
        }
      } else {
        setCities([]);
      }
    };

    loadCities();
  }, [selectedRegions]);
  useEffect(() => {
    const loadDistricts = async () => {
      if (selectedCities.length > 0) {
        setLoadingDistricts(true);
        try {
          const allDistricts = await Promise.all(
            selectedCities.map((city) =>
              fetchDistricts({
                REGION_ID: city.REGION_ID,
                CITY_ID: city.CITY_ID,
              })
            )
          );
          const flattenedDistricts = allDistricts.flat();
          setDistricts(flattenedDistricts);
        } catch (error) {
          console.error("Error loading districts:", error);
          setDistricts([]);
        } finally {
          setLoadingDistricts(false);
        }
      } else {
        setDistricts([]);
      }
    };

    loadDistricts();
  }, [selectedCities]);

  useEffect(() => {
    const regionParams = searchParams.getAll("region");
    const cityParams = searchParams.getAll("city");
    const districtParams = searchParams.getAll("district");

    if (regionParams.length > 0) setSelectedRegions(regionParams);
    if (cityParams.length > 0) {
      const cityObjs = cityParams.map((cityId) => ({
        CITY_ID: cityId,
        REGION_ID: "",
      }));
      setSelectedCities(cityObjs);
    }
    if (districtParams.length > 0) {
      const districtObjs = districtParams.map((districtId) => ({
        District_ID: districtId,
      }));
      setSelectedDistricts(districtObjs);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setBookmarkedAds(userData.heartedby || []);
          }
        } catch (error) {
          console.error("Error fetching bookmarks:", error);
        }
      } else {
        setCurrentUser(null);
        setBookmarkedAds([]);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchAllAds = async () => {
      try {
        setLoading(true);

        const allCollections = [
          { name: "Cars", category: "Motors" },
          { name: "ELECTRONICS", category: "Electronics" },
          { name: "FASHION", category: "Fashion Style" },
          { name: "BodyContentFashion", category: "Fashion Style" },
          { name: "HEALTHCARE", category: "Home & Furniture" },
          { name: "HomeFurnitureContent", category: "Home & Furniture" },
          { name: "JOBBOARD", category: "Job Board" },
          { name: "Education", category: "Other" },
          { name: "OtherContent", category: "Other" },
          { name: "REALESTATECOMP", category: "Real Estate" },
          { name: "TRAVEL", category: "Services" },
          { name: "SPORTSGAMESComp", category: "Sport & Game" },
          { name: "PETANIMALCOMP", category: "Pet & Animals" },
        ];

        // Use English category name for database filtering (not translated display name)
        const currentCategory = categoryEnglishName;
        const cacheKey = currentCategory ? `ads_${currentCategory}` : "ads_all";
        const cacheTimestamp = `${cacheKey}_timestamp`;
        const CACHE_DURATION = 5 * 60 * 1000;

        const cachedData = sessionStorage.getItem(cacheKey);
        const cachedTime = sessionStorage.getItem(cacheTimestamp);

        if (cachedData && cachedTime) {
          const age = Date.now() - parseInt(cachedTime);
          if (age < CACHE_DURATION) {
            await new Promise(resolve => setTimeout(resolve, 400));
            const parsedData = JSON.parse(cachedData);
            setAllAds(parsedData);
            setFilteredAds(parsedData);
            setLoading(false);
            return;
          }
        }

        const collectionsToLoad = currentCategory
          ? allCollections.filter((col) => col.category === currentCategory)
          : allCollections;

        const fetchPromises = collectionsToLoad.map(async (col) => {
          try {
            const adsCollection = collection(db, col.name);
            const adsSnapshot = await getDocs(adsCollection);
            return adsSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              category:
                doc.data().category || doc.data().ModalCategory || col.category,
              ModalCategory:
                doc.data().ModalCategory || doc.data().category || col.category,
              collectionSource: col.name,
            }));
          } catch (error) {
            console.error(`Error fetching from ${col.name}:`, error);
            return [];
          }
        });

        const results = await Promise.all(fetchPromises);
        const allAdsArray = results.flat();

        const adsWithPurpose = allAdsArray.map((ad) => {
          if (!ad.Purpose && !ad.AdType) {
            return { ...ad, Purpose: "Sell" };
          }
          return ad;
        });

        sessionStorage.setItem(cacheKey, JSON.stringify(adsWithPurpose));
        sessionStorage.setItem(cacheTimestamp, Date.now().toString());

        setAllAds(adsWithPurpose);
        setFilteredAds(adsWithPurpose);
      } catch (error) {
        alert("Failed to load ads: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllAds();
  }, [categoryEnglishName]);

  useEffect(() => {
    if (allAds.length === 0) {
      setFilteredAds([]);
      return;
    }

    let filtered = [...allAds];

    if (category) {
      // Use English category name for filtering (not translated display name)
      const categoryValue = categoryToEnglishMap[category.toLowerCase()];

      if (categoryValue) {
        filtered = filtered.filter((ad) => {
          const categoryVariations = [categoryValue];
          if (categoryValue === "Sport & Game") {
            categoryVariations.push("Sports & Game");
          }
          if (categoryValue === "Home & Furniture") {
            categoryVariations.push("Home & Furnituer");
          }

          const matches = categoryVariations.some(
            (variation) =>
              ad.category === variation || ad.ModalCategory === variation
          );
          return matches;
        });
      }
    }
    const subCategoryParams = searchParams.getAll("subcategory");
    if (subCategoryParams.length > 0) {
      filtered = filtered.filter((ad) => {
        const adSubCategory = getUrlText(ad.SubCategory || "");
        return subCategoryParams.includes(adSubCategory);
      });
    }
    const nestedSubCategoryParam = searchParams.get("nestedSubCategory");
    if (nestedSubCategoryParam) {
      filtered = filtered.filter((ad) => {
        const adNestedSubCategory = getUrlText(ad.NestedSubCategory || "");
        return adNestedSubCategory === nestedSubCategoryParam;
      });
    }
    // Use searchKeyword from state if available, otherwise use URL parameter
    const activeSearchKeyword = searchKeyword.trim() || searchParams.get("q") || "";
    if (activeSearchKeyword) {
      const keyword = activeSearchKeyword.toLowerCase();
      filtered = filtered.filter(
        (ad) =>
          (ad.title && ad.title.toLowerCase().includes(keyword)) ||
          (ad.description && ad.description.toLowerCase().includes(keyword)) ||
          (ad.Make && ad.Make.toLowerCase().includes(keyword)) ||
          (ad.Model && ad.Model.toLowerCase().includes(keyword)) ||
          (ad.brand && ad.brand.toLowerCase().includes(keyword)) ||
          (ad.City && ad.City.toLowerCase().includes(keyword)) ||
          (ad.Emirates && ad.Emirates.toLowerCase().includes(keyword)) ||
          (ad.SubCategory && ad.SubCategory.toLowerCase().includes(keyword)) ||
          (ad.NestedSubCategory &&
            ad.NestedSubCategory.toLowerCase().includes(keyword)) ||
          (ad.category && ad.category.toLowerCase().includes(keyword)) ||
          (ad.ModalCategory && ad.ModalCategory.toLowerCase().includes(keyword))
      );
    }
    const featuredAdsParam = searchParams.get("featuredAds");
    if (featuredAdsParam) {
      filtered = filtered.filter((ad) => ad.FeaturedAds === "Featured Ads");
    }

    if (searchParams.get("withPhotos") === "true") {
      filtered = filtered.filter((ad) => {
        if (Array.isArray(ad.galleryImages) && ad.galleryImages.length > 0)
          return true;
        if (ad.imageUrl && ad.imageUrl.trim() !== "") return true;
        if (ad.photoURL && ad.photoURL.trim() !== "") return true;
        return false;
      });
    }

    if (searchParams.get("withPrice") === "true") {
      filtered = filtered.filter((ad) => ad.Price && Number(ad.Price) > 0);
    }
    const filterParams = [
      "condition",
      "brand",
      "transmission",
      "fuelType",
      "bodyType",
      "exteriorColor",
      "interiorColor",
      "sellerType",
      "paymentMethod",
      "regionalSpec",
      "insurance",
      "brandModel",
      "addType",
      "additionalFeatures",
      "noOfDoors",
      "seatingCapacity",
      "age",
      "frequency",
      "residenceType",
      "noOfRooms",
      "noOfBathrooms",
      "area",
      "furnished",
      "licenseNumber",
      "streetWidth",
      "floor",
      "amenities",
      "propertyAge",
      "facade",
    ];
    const fieldNameMap = {
      brand: ["Brand", "Make", "brand", "manufacturer", "Manufacturer"],
      brandModel: ["Model", "model"],
      transmission: ["Transmission"],
      fuelType: ["Fueltype", "FuelType"],
      bodyType: ["BodyType", "bodyType"],
      exteriorColor: ["Color", "ExteriorColor"],
      interiorColor: ["InteriorColor"],
      sellerType: ["SellerType", "sellerType"],
      paymentMethod: ["PaymentMethod"],
      regionalSpec: ["RegionalSpec"],
      insurance: ["Insurance"],
      addType: ["Purpose", "AdType"],
      additionalFeatures: ["AdditionalFeatures", "Features"],
      noOfDoors: ["NumberofDoors", "NumberOfDoors", "Doors"],
      seatingCapacity: ["SeatingCapacity"],
      condition: ["Condition", "condition"],
      age: ["Age", "age"],
      frequency: ["Frequency", "frequency"],
      residenceType: ["ResidenceType", "residenceType"],
      noOfRooms: ["Bedroom", "NumberofRooms", "NumberOfRooms", "noOfRooms"],
      noOfBathrooms: [
        "bathrooms",
        "NumberofBathrooms",
        "NumberOfBathrooms",
        "noOfBathrooms",
      ],
      area: ["Area", "area"],
      furnished: ["Furnished", "furnished"],
      licenseNumber: ["LicenseNumber", "licenseNumber", "LicenceNumber"],
      streetWidth: ["streetWidth", "StreetWidth"],
      floor: ["Floor", "floor"],
      amenities: ["Amenities", "amenities"],
      propertyAge: ["PropertyAge", "propertyAge"],
      facade: ["Facade", "facade"],
    };

    filterParams.forEach((param) => {
      const paramValues = searchParams.getAll(param);
      if (paramValues.length > 0) {
        filtered = filtered.filter((ad) => {
          const possibleFieldNames = fieldNameMap[param] || [
            param.charAt(0).toUpperCase() + param.slice(1),
            param,
            param.toUpperCase(),
          ];
          let adValue = null;
          for (const fieldName of possibleFieldNames) {
            if (
              ad[fieldName] !== undefined &&
              ad[fieldName] !== null &&
              ad[fieldName] !== ""
            ) {
              adValue = ad[fieldName];
              break;
            }
          }
          if (!adValue || (Array.isArray(adValue) && adValue.length === 0)) {
            return false;
          }
          if (Array.isArray(adValue)) {
            const matches = paramValues.some((pv) =>
              adValue.some(
                (av) =>
                  getUrlText(av) === pv || av.toLowerCase() === pv.toLowerCase()
              )
            );
            if (matches) {
            }
            return matches;
          }
          const matches = paramValues.some(
            (pv) =>
              getUrlText(adValue) === pv ||
              adValue.toLowerCase() === pv.toLowerCase()
          );

          if (matches) {
          }

          return matches;
        });
      }
    });
    const fromPrice = searchParams.get("fromPrice");
    const toPrice = searchParams.get("toPrice");
    if (fromPrice || toPrice) {
      filtered = filtered.filter((ad) => {
        const price = parseFloat(ad.Price);
        if (isNaN(price)) return false;
        if (fromPrice && price < parseFloat(fromPrice)) return false;
        if (toPrice && price > parseFloat(toPrice)) return false;
        return true;
      });
    }
    const fromYear = searchParams.get("fromYear");
    const toYear = searchParams.get("toYear");
    if (fromYear || toYear) {
      filtered = filtered.filter((ad) => {
        const yearStr = String(ad.ManufactureYear || "");
        const year = parseInt(yearStr);
        if (isNaN(year)) return false;
        if (fromYear && year < parseInt(fromYear)) return false;
        if (toYear && year > parseInt(toYear)) return false;
        return true;
      });
    }
    const fromMileage = searchParams.get("fromMileage");
    const toMileage = searchParams.get("toMileage");
    if (fromMileage || toMileage) {
      filtered = filtered.filter((ad) => {
        const mileage = parseFloat(ad.mileage || ad.Mileage);
        if (isNaN(mileage)) return false;
        if (fromMileage && mileage < parseFloat(fromMileage)) return false;
        if (toMileage && mileage > parseFloat(toMileage)) return false;
        return true;
      });
    }
    const regionParams = searchParams.getAll("region");
    const cityParams = searchParams.getAll("city");
    const districtParams = searchParams.getAll("district");

    if (regionParams.length > 0) {
      filtered = filtered.filter((ad) => {
        return regionParams.some(
          (regionId) =>
            String(ad.regionId) === String(regionId) ||
            String(ad.REGION_ID) === String(regionId)
        );
      });
    }

    if (cityParams.length > 0) {
      filtered = filtered.filter((ad) => {
        return cityParams.some(
          (cityId) =>
            String(ad.CITY_ID) === String(cityId) ||
            String(ad.cityId) === String(cityId)
        );
      });
    }

    if (districtParams.length > 0) {
      filtered = filtered.filter((ad) => {
        return districtParams.some(
          (districtId) =>
            String(ad.District_ID) === String(districtId) ||
            String(ad.districtId) === String(districtId)
        );
      });
    }

    setFilteredAds(filtered);
  }, [allAds, category, subCategoryParam, searchParams, searchKeyword]);

  // Reset to page 1 only when filter criteria change (not when allAds updates)
  useEffect(() => {
    setCurrentPage(1);
  }, [category, subCategoryParam, searchParams, searchKeyword]);
  const toggleBookmark = async (adId) => {
    if (!currentUser) {
      alert("Please login to bookmark ads");
      return;
    }

    // Capture current state before any updates
    const isBookmarked = bookmarkedAds.includes(adId);
    const originalBookmarkedAds = [...bookmarkedAds];
    const ad = allAds.find((a) => a.id === adId);
    const collectionName = ad?.collectionSource;

    // 🚀 STEP 1: Optimistically update UI immediately (instant feedback)
    if (isBookmarked) {
      setBookmarkedAds(bookmarkedAds.filter((id) => id !== adId));
    } else {
      setBookmarkedAds([...bookmarkedAds, adId]);
    }

    setAllAds((prevAds) =>
      prevAds.map((a) =>
        a.id === adId
          ? {
              ...a,
              heartedby: isBookmarked
                ? (a.heartedby || []).filter((id) => id !== currentUser.uid)
                : [...(a.heartedby || []), currentUser.uid],
            }
          : a
      )
    );

    setFilteredAds((prevAds) =>
      prevAds.map((a) =>
        a.id === adId
          ? {
              ...a,
              heartedby: isBookmarked
                ? (a.heartedby || []).filter((id) => id !== currentUser.uid)
                : [...(a.heartedby || []), currentUser.uid],
            }
          : a
      )
    );

    // 🔄 STEP 2: Update Firestore (await to ensure persistence)
    try {
      const userDocRef = doc(db, "users", currentUser.uid);

      // Update user's favorites document
      await updateDoc(userDocRef, {
        heartedby: isBookmarked ? arrayRemove(adId) : arrayUnion(adId),
      });

      // Update ad document's heartedby array
      if (collectionName) {
        const adDocRef = doc(db, collectionName, adId);
        await updateDoc(adDocRef, {
          heartedby: isBookmarked
            ? arrayRemove(currentUser.uid)
            : arrayUnion(currentUser.uid),
        });
      }

      console.log("✅ Favorites saved to database");
    } catch (error) {
      console.error("❌ Error updating favorites:", error);
      // Rollback to original state on error
      setBookmarkedAds(originalBookmarkedAds);

      setAllAds((prevAds) =>
        prevAds.map((a) =>
          a.id === adId
            ? {
                ...a,
                heartedby: isBookmarked
                  ? [...(a.heartedby || []), currentUser.uid]
                  : (a.heartedby || []).filter((id) => id !== currentUser.uid),
              }
            : a
        )
      );

      setFilteredAds((prevAds) =>
        prevAds.map((a) =>
          a.id === adId
            ? {
                ...a,
                heartedby: isBookmarked
                  ? [...(a.heartedby || []), currentUser.uid]
                  : (a.heartedby || []).filter((id) => id !== currentUser.uid),
              }
            : a
        )
      );

      alert("Failed to update favorite. Please try again.");
    }
  };

  const sortAds = (ads, sortType) => {
    const sortedAds = [...ads];
    switch (sortType) {
      case "Price: Low to High":
        return sortedAds.sort(
          (a, b) => parseFloat(a.Price || 0) - parseFloat(b.Price || 0)
        );
      case "Price: High to Low":
        return sortedAds.sort(
          (a, b) => parseFloat(b.Price || 0) - parseFloat(a.Price || 0)
        );
      case "Sort by: Most Relevant":
      default:
        return sortedAds;
    }
  };

  const getCountForOption = useCallback(
    (fieldNames, value) => {
      if (!Array.isArray(fieldNames)) {
        fieldNames = [fieldNames];
      }
      const stringValue = String(value).trim();
      let baseAds = [...allAds];
      if (category) {
        const categoryValue = categoryToEnglishMap[category.toLowerCase()];
        if (categoryValue) {
          baseAds = baseAds.filter((ad) => {
            const categoryVariations = [categoryValue];
            if (categoryValue === "Sport & Game") {
              categoryVariations.push("Sports & Game");
            }
            if (categoryValue === "Home & Furniture") {
              categoryVariations.push("Home & Furnituer");
            }
            return categoryVariations.some(
              (variation) =>
                ad.category === variation || ad.ModalCategory === variation
            );
          });
        }
      }
      // Use searchKeyword from state if available, otherwise use URL parameter
      const activeSearchKeyword = searchKeyword?.trim() || searchParams.get("q") || "";
      if (activeSearchKeyword) {
        const keyword = activeSearchKeyword.toLowerCase().trim();
        baseAds = baseAds.filter((ad) => {
          const searchableText = [
            ad.Title,
            ad.title,
            ad.Description,
            ad.description,
            ad.Brand,
            ad.Make,
            ad.Model,
            ad.model,
          ]
            .filter((text) => text)
            .join(" ")
            .toLowerCase();
          return searchableText.includes(keyword);
        });
      }
      const matchingAds = baseAds.filter((ad) => {
        return fieldNames.some((fieldName) => {
          const adValue = ad[fieldName];

          if (!adValue && adValue !== 0) {
            return false;
          }

          if (Array.isArray(adValue)) {
            return adValue.some((av) => {
              const stringAv = String(av).trim();
              return (
                getUrlText(stringAv) === getUrlText(stringValue) ||
                stringAv.toLowerCase() === stringValue.toLowerCase()
              );
            });
          }

          const stringAdValue = String(adValue).trim();
          const urlMatch =
            getUrlText(stringAdValue) === getUrlText(stringValue);
          const lowerMatch =
            stringAdValue.toLowerCase() === stringValue.toLowerCase();

          return urlMatch || lowerMatch;
        });
      });

      return matchingAds.length;
    },
    [allAds, category, categoryToEnglishMap, searchParams, searchKeyword]
  );

  const getRegionsWithCounts = useMemo(() => {
    return saudiRegions
      .map((region) => ({
        ...region,
        count: getCountForOption(["REGION_ID", "regionId"], region.id),
      }))
      .sort((a, b) => b.count - a.count);
  }, [getCountForOption]);

  const getCitiesWithCounts = useMemo(() => {
    return cities
      .map((city) => ({
        ...city,
        count: getCountForOption(["CITY_ID", "cityId"], city.CITY_ID),
      }))
      .sort((a, b) => b.count - a.count);
  }, [cities, getCountForOption]);

  const getDistrictsWithCounts = useMemo(() => {
    return districts
      .map((district) => ({
        ...district,
        count: getCountForOption(
          ["District_ID", "districtId"],
          district.District_ID
        ),
      }))
      .sort((a, b) => b.count - a.count);
  }, [districts, getCountForOption]);

  const getBrandsWithCounts = useMemo(() => {
    if (!currentCategoryFilters.filters?.brand) return [];

    const fieldNames = [
      "Brand",
      "Make",
      "brand",
      "manufacturer",
      "Manufacturer",
    ];
    return currentCategoryFilters.filters.brand.options
      .map((option) => ({
        ...option,
        count: getCountForOption(fieldNames, option.name || option),
      }))
      .sort((a, b) => b.count - a.count);
  }, [currentCategoryFilters, getCountForOption]);

  const getModelsWithCounts = useMemo(() => {
    return availableBrandModels
      .map((model) => ({
        name: model,
        count: getCountForOption(["Model", "model"], model),
      }))
      .sort((a, b) => b.count - a.count);
  }, [availableBrandModels, getCountForOption]);

  const sortedAds = sortAds(filteredAds, sortBy);
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = sortedAds.slice(indexOfFirstAd, indexOfLastAd);
  const totalPages = Math.ceil(filteredAds.length / adsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchKeyword = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("q", searchKeyword.trim());
        return newParams;
      });
      // Clear the search input after setting the URL parameter
      setSearchKeyword("");
    }
  };

  const handleSubcategoryChange = (e, selectType = "multiple") => {
    e.preventDefault?.();
    const { name, value, checked } = e.target;

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      const currentValues = newParams.getAll(name);
      if (selectType === "multiple") {
        const currentValue = currentValues.find(
          (val) => val === getUrlText(value) || ""
        );
        if (checked) {
          if (!currentValue) {
            newParams.append(name, getUrlText(value));
          }
        } else {
          newParams.delete(name);
          currentValues
            .filter((val) => val !== getUrlText(value))
            .forEach((val) => newParams.append(name, val));
        }
      } else {
        if (checked) {
          newParams.set(name, getUrlText(value));
        } else {
          newParams.delete(name);
          if (name === "subcategory") {
            newParams.delete("nestedSubCategory");
          }
        }
      }
      return newParams;
    });
  };

  const handleFiltersChange = (e, selectType) => {
    e.preventDefault?.();
    const { name, value, checked, type } = e.target || e;

    const lowerCaseName = typeof name === "string" ? name.toLowerCase() : name;
    const lowerCaseValue =
      typeof value === "string" ? value.toLowerCase() : value;
    setFilterData((prevData) => {
      return {
        ...prevData,
        [name]:
          type === "checkbox"
            ? checked
              ? lowerCaseValue
              : ""
            : lowerCaseValue,
      };
    });

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (selectType === "multiple") {
        const currentValues = newParams.getAll(name);
        const currentValue = currentValues.find(
          (val) => val === getUrlText(value)
        );
        if (checked) {
          if (!currentValue) {
            newParams.append(name, getUrlText(value));
          }
        } else {
          newParams.delete(name);
          currentValues
            .filter((val) => val !== getUrlText(value))
            .forEach((val) => newParams.append(name, val));
        }
      } else if (selectType === "single") {
        if (checked) {
          newParams.set(name, getUrlText(lowerCaseValue));
        } else {
          newParams.delete(name);
          if (name === "brand") {
            newParams.delete("brandModel");
          }
        }
      } else {
        if (value) {
          newParams.set(name, getUrlText(lowerCaseValue));
        } else {
          newParams.delete(name);
        }
      }
      return newParams;
    });
  };
  const handleInputs = (e, name, value, selectType = "") => {
    e.preventDefault();

    handleFiltersChange({ name, value }, selectType);
    setFilterData((prev) => ({ ...prev, [name]: "" }));
  };

  const handleTwoInputs = (e, names, values, selectType = "") => {
    e.preventDefault();

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (values.from) {
        newParams.set(names.from, values.from);
      } else {
        newParams.delete(names.from);
      }
      if (values.to) {
        newParams.set(names.to, values.to);
      } else {
        newParams.delete(names.to);
      }
      return newParams;
    });
  };

  const handleRegionChange = (regionId) => {
    setSelectedRegions((prev) => {
      const isSelected = prev.includes(regionId);
      const newRegions = isSelected
        ? prev.filter((id) => id !== regionId)
        : [...prev, regionId];

      setSearchParams((params) => {
        const newParams = new URLSearchParams(params);
        newParams.delete("region");
        newRegions.forEach((id) => newParams.append("region", id));
        return newParams;
      });

      return newRegions;
    });
  };

  const handleCityChange = (cityOption) => {
    setSelectedCities((prev) => {
      const isSelected = prev.some(
        (city) => city.CITY_ID === cityOption.CITY_ID
      );
      const newCities = isSelected
        ? prev.filter((city) => city.CITY_ID !== cityOption.CITY_ID)
        : [
            ...prev,
            { CITY_ID: cityOption.CITY_ID, REGION_ID: cityOption.REGION_ID },
          ];
      setSearchParams((params) => {
        const newParams = new URLSearchParams(params);
        newParams.delete("city");
        newCities.forEach((city) => newParams.append("city", city.CITY_ID));
        return newParams;
      });

      return newCities;
    });
  };

  const handleDistrictChange = (districtOption) => {
    setSelectedDistricts((prev) => {
      const isSelected = prev.some(
        (district) => district.District_ID === districtOption.District_ID
      );
      const newDistricts = isSelected
        ? prev.filter(
            (district) => district.District_ID !== districtOption.District_ID
          )
        : [
            ...prev,
            {
              District_ID: districtOption.District_ID,
              CITY_ID: districtOption.CITY_ID,
              REGION_ID: districtOption.REGION_ID,
            },
          ];

      setSearchParams((params) => {
        const newParams = new URLSearchParams(params);
        newParams.delete("district");
        newDistricts.forEach((district) =>
          newParams.append("district", district.District_ID)
        );
        return newParams;
      });

      return newDistricts;
    });
  };

  useEffect(() => {
    const selectedBrands = searchParams.getAll("brand");
    if (selectedBrands.length > 0 && currentCategoryFilters.filters?.brand) {
      const brandFilter = currentCategoryFilters.filters.brand;
      const allModels = [];

      brandFilter.options.forEach((brandOption) => {
        if (brandOption.models) {
          const brandName = brandOption.name || brandOption;
          const urlBrandName = getUrlText(brandName);

          if (selectedBrands.includes(urlBrandName)) {
            allModels.push(...brandOption.models);
          }
        }
      });

      setAvailableBrandModels(allModels);
    } else {
      setAvailableBrandModels([]);
    }
  }, [searchParams, currentCategoryFilters]);
  const scrollPositionRef = useRef(0);
  const windowScrollRef = useRef(0);

  useEffect(() => {
    const element = filterSectionRef.current;

    const handleFilterScroll = () => {
      if (element) {
        scrollPositionRef.current = element.scrollTop;
      }
    };

    const handleWindowScroll = () => {
      windowScrollRef.current =
        window.pageYOffset || document.documentElement.scrollTop;
    };

    if (element) {
      element.addEventListener("scroll", handleFilterScroll);
    }
    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleFilterScroll);
      }
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (filterSectionRef.current && scrollPositionRef.current > 0) {
        filterSectionRef.current.scrollTop = scrollPositionRef.current;
      }
      if (windowScrollRef.current > 0) {
        window.scrollTo(0, windowScrollRef.current);
      }
    });
  }, [searchParams, availableBrandModels]);
  const categoryData = {
    name: "Category",
    type: "checkbox",
    select: "single",
    options: [
      "Motors",
      "Electronics",
      "Fashion Style",
      "Home & Furniture",
      "Job Board",
      "Real Estate",
      "Services",
      "Sport & Game",
      "Pet & Animals",
      "Other",
    ],
  };

const selectedCityNames = cities
  .filter((city) => selectedCityIds.includes(String(city.CITY_ID)))
  .map((city) => city["City En Name"])
  .filter(Boolean);

const cityText =
  selectedCityNames.length > 0
    ? ` ${t("search.in")} ${selectedCityNames.join(", ")}`
    : "";

let h1Title = t("search.allListings");

if (categoryDisplayName) {
  h1Title = `${categoryDisplayName} ${t("listing.forSale")}${cityText}`;
}

// Use searchKeyword from state if available, otherwise use URL parameter for display
const displaySearchKeyword = searchKeyword || searchParams.get("q") || "";
if (displaySearchKeyword) {
  h1Title = `${t("search.searchResultsFor")} "${displaySearchKeyword}"${cityText}`;
}

  return (
    <>
      <div className="main-wrapper">
        <Header parms={parms} />

        <Container
          className="parent-main category"
          style={{
            color: "black",
            marginTop: window.innerWidth <= 768 ? "8rem" : "12rem",
          }}
        >
 <h1
  className="search-page-h1"
  style={{
    fontSize: "1.4rem",
    fontWeight: 700,         
    marginBottom: "1.25rem",
    lineHeight: 1.3,
    color: "#1f2937", 
    letterSpacing: "0.5px",
    textShadow: "0 1px 2px rgba(0,0,0,0.05)",
  }}
>
  {h1Title}
</h1>


          <div
            className="adsCategory_head"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
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
                padding: window.innerWidth <= 576 ? "0px" : "10px 15px",
              }}
            >
              {t("nav.home")}
            </button>
            <span>
              <MdKeyboardArrowRight />
            </span>

            <button
              onClick={() => {
                navigate(
                  currentCategoryFilters.name === "Search"
                    ? `/search`
                    : `/search?category=${getUrlText(
                        currentCategoryFilters.name
                      )}`
                );
              }}
              className="btn"
              style={{
                background: window.innerWidth <= 576 ? "none" : "#E9EEFF",
                fontWeight: "500",
                padding: window.innerWidth <= 576 ? "0px" : "10px 15px",
              }}
            >
              {(() => {
                if (currentCategoryFilters.name === "Search") {
                  return t("search.search");
                }
                const categoryMap = {
                  "Motors": "categories.motors",
                  "Electronics": "categories.electronics",
                  "Fashion Style": "categories.fashionStyle",
                  "Home & Furniture": "categories.homeFurniture",
                  "Job Board": "categories.jobBoard",
                  "Real Estate": "categories.realEstate",
                  "Services": "categories.services",
                  "Sport & Game": "categories.sportGame",
                  "Pet & Animals": "categories.petAnimals",
                  "Other": "categories.other"
                };
                return t(categoryMap[currentCategoryFilters.name] || currentCategoryFilters.name);
              })()}
            </button>

            {subCategoryParam && (
              <>
                {" "}
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
                  {getTextFromURL(subCategoryParam)}
                </button>{" "}
              </>
            )}
          </div>
        </Container>
        <Container
          style={{
            color: "black",
          }}
        >
          <Row className="filter_outterwrap">
            <Col
              lg={3}
              className="filter_main_wrap style={{ height: '200px' }}"
            >
              <div className="side_bar_main_wrap" ref={filterSectionRef}>
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
                  {t("search.showResultsBy")} <strong>{filteredAds.length}</strong>
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
                            marginBottom: 0,
                          }}
                        >
                          {t("search.searchByKeywords")}
                        </Form.Label>

                        <button
                          onClick={() => {
                            setSearchParams({});
                            setSelectedRegions([]);
                            setSelectedCities([]);
                            setSelectedDistricts([]);
                          }}
                          type="button"
                          className="blue_btn"
                        >
                          {t("search.clear")}
                        </button>
                      </div>

                      <div className="position-relative mt-2">
                        <div onSubmit={handleSearchKeyword}>
                          <input
                            type="search"
                            placeholder={t("search.searchHere")}
                            className="form-control rounded-pill pe-5 input_feild search_by_keyword"
                            id="example-search-input"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleSearchKeyword(e);
                              }
                            }}
                          />
                          <FaSearch
                            className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                            style={{ pointerEvents: "none" }}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <HorizantalLine />
                  <Accordion className="mt-3">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>{t("filters.labels.category")}</Accordion.Header>
                      <Accordion.Body>
                        <div
                          style={{
                            maxWidth: "300px",
                            margin: "20px",
                          }}
                        >
                          {categoryData.options.map((cat) => {
                            // Map category names to translation keys
                            const categoryTranslationMap = {
                              "Motors": "categories.motors",
                              "Electronics": "categories.electronics",
                              "Fashion Style": "categories.fashionStyle",
                              "Home & Furniture": "categories.homeFurniture",
                              "Job Board": "categories.jobBoard",
                              "Real Estate": "categories.realEstate",
                              "Services": "categories.services",
                              "Sport & Game": "categories.sportGame",
                              "Pet & Animals": "categories.petAnimals",
                              "Other": "categories.other"
                            };
                            const translatedCategoryName = t(categoryTranslationMap[cat] || cat);

                            return (
                            <Form.Group key={cat}>
                              <div className="form-check mb-2">
                                <input
                                  id={cat}
                                  name={cat}
                                  className="form-check-input"
                                  type="checkbox"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  checked={
                                    getUrlText(cat) ===
                                    searchParams.get("category")
                                  }
                                  value={cat}
                                  onChange={(e) => {
                                    if (e.target.value) {
                                      setSearchParams({
                                        category: getUrlText(e.target.value),
                                      });
                                    } else {
                                      setSearchParams({});
                                    }
                                  }}
                                />
                                <label
                                  htmlFor={cat}
                                  className="form-check-label"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                >
                                  {translatedCategoryName}
                                </label>
                              </div>
                            </Form.Group>
                          )})}
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <HorizantalLine />

                  {currentCategoryFilters.subcategories &&
                    currentCategoryFilters.subcategories.length > 0 && (
                      <>
                        {" "}
                        <Accordion className="mt-3">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>{t("filters.labels.subCategories")}</Accordion.Header>
                            <Accordion.Body>
                              <div
                                style={{ maxWidth: "300px", margin: "20px" }}
                              >
                                {currentCategoryFilters.subcategories.map(
                                  (subcat) => {
                                    // Use English name for URL slug (language-independent)
                                    const englishName = subcat.name || subcat.originalName;
                                    const urlSubCategory = getUrlText(englishName);
                                    const selectedSubCategories =
                                      searchParams.getAll("subcategory");
                                    const isSelected =
                                      selectedSubCategories.includes(
                                        urlSubCategory
                                      );
                                    // Use displayName for UI, fallback to name if not available
                                    const displayName = subcat.displayName || subcat.name;
                                    return (
                                      <Form.Group key={englishName}>
                                        <div className="form-check mb-2">
                                          <input
                                            id={englishName}
                                            name="subcategory"
                                            className="form-check-input"
                                            type="checkbox"
                                            value={englishName}
                                            onChange={handleSubcategoryChange}
                                            checked={isSelected}
                                            style={{ cursor: "pointer" }}
                                          />
                                          <label
                                            htmlFor={englishName}
                                            className="form-check-label"
                                            style={{ cursor: "pointer" }}
                                          >
                                            {displayName}
                                          </label>
                                        </div>
                                        {isSelected &&
                                          subcat.nestedSubCategories &&
                                          subcat.nestedSubCategories.length >
                                            0 && (
                                            <div
                                              style={{
                                                marginLeft: "20px",
                                                marginTop: "10px",
                                              }}
                                            >
                                              <Form.Label>
                                                {t("filters.labels.nestedCategories")}
                                              </Form.Label>
                                              {subcat.nestedSubCategories.map(
                                                (nestedSubCat) => {
                                                  // Use English name for URL slug (language-independent)
                                                  const nestedEnglishName = nestedSubCat.name || nestedSubCat.originalName;
                                                  const nestedDisplayName = nestedSubCat.displayName || nestedSubCat.name;
                                                  const params =
                                                    searchParams.getAll(
                                                      "nestedSubCategory"
                                                    );
                                                  return (
                                                    <div
                                                      key={nestedEnglishName}
                                                      className="form-check mb-2"
                                                    >
                                                      <input
                                                        id={nestedEnglishName}
                                                        name="nestedSubCategory"
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={nestedEnglishName}
                                                        onChange={(e) =>
                                                          handleSubcategoryChange(
                                                            e,
                                                            "multiple"
                                                          )
                                                        }
                                                        checked={
                                                          params &&
                                                          params.find(
                                                            (val) =>
                                                              val ===
                                                              getUrlText(
                                                                nestedEnglishName
                                                              )
                                                          )
                                                        }
                                                        style={{
                                                          cursor: "pointer",
                                                        }}
                                                      />

                                                      <label
                                                        htmlFor={nestedEnglishName}
                                                        className="form-check-label"
                                                        style={{
                                                          cursor: "pointer",
                                                        }}
                                                      >
                                                        {nestedDisplayName}
                                                      </label>
                                                    </div>
                                                  );
                                                }
                                              )}
                                            </div>
                                          )}
                                      </Form.Group>
                                    );
                                  }
                                )}
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                        <HorizantalLine />{" "}
                      </>
                    )}
                  <Accordion className="mt-3">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>{t("filters.labels.selectRegion")}</Accordion.Header>
                      <Accordion.Body>
                        <Form.Group className="mb-3">
                          <div className="mb-3">
                            {getRegionsWithCounts.slice(0, 6).map((region) => {
                              const isChecked = selectedRegions.includes(
                                region.id
                              );
                              return (
                                <div className="form-check" key={region.id}>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`region-${region.id}`}
                                    checked={isChecked}
                                    onChange={() =>
                                      handleRegionChange(region.id)
                                    }
                                    style={{ cursor: "pointer" }}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`region-${region.id}`}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {i18n.language === 'ar' ? region.nameAr : region.nameEn}{" "}
                                    <span
                                      style={{
                                        color: "#888",
                                        fontSize: "0.9em",
                                      }}
                                    >
                                      ({region.count})
                                    </span>
                                  </label>
                                </div>
                              );
                            })}
                            <button
                              type="button"
                              className="btn btn-link p-0"
                              onClick={() => setShowRegionModal(true)}
                            >
                              {t("filters.labels.showMoreChoices")}
                            </button>
                            {showRegionModal && (
                              <div
                                className="modal fade show"
                                style={{
                                  display: "block",
                                  backgroundColor: "rgba(0,0,0,0.5)",
                                }}
                                tabIndex="-1"
                              >
                                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
                                  <div className="modal-content border-0 shadow-lg">
                                    <div className="modal-header bg-light border-bottom">
                                      <h5 className="modal-title">
                                        Select a Region
                                      </h5>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() =>
                                          setShowRegionModal(false)
                                        }
                                      ></button>
                                    </div>
                                    <div className="modal-body p-3">
                                      <div className="mb-2">
                                        <input
                                          type="text"
                                          className="form-control mb-3"
                                          placeholder="Search regions..."
                                          value={searchTermRegion}
                                          onChange={(e) =>
                                            setSearchTermRegion(e.target.value)
                                          }
                                        />
                                      </div>
                                      <div className="row g-2">
                                        {getRegionsWithCounts
                                          .filter(
                                            (region) =>
                                              region.nameEn
                                                .toLowerCase()
                                                .includes(
                                                  searchTermRegion.toLowerCase()
                                                ) ||
                                              region.nameAr.includes(
                                                searchTermRegion
                                              )
                                          )
                                          .map((region) => {
                                            const isChecked =
                                              selectedRegions.includes(
                                                region.id
                                              );
                                            return (
                                              <div
                                                className="col-6"
                                                key={region.id}
                                              >
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`region-modal-${region.id}`}
                                                    checked={isChecked}
                                                    onChange={() =>
                                                      handleRegionChange(
                                                        region.id
                                                      )
                                                    }
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor={`region-modal-${region.id}`}
                                                  >
                                                    {i18n.language === 'ar' ? region.nameAr : region.nameEn}{" "}
                                                    <span
                                                      style={{
                                                        color: "#888",
                                                        fontSize: "0.9em",
                                                      }}
                                                    >
                                                      ({region.count})
                                                    </span>
                                                  </label>
                                                </div>
                                              </div>
                                            );
                                          })}
                                      </div>
                                    </div>
                                    <div className="modal-footer bg-light border-top">
                                      <div className="text-muted small">
                                        {selectedRegions.length} region(s)
                                        selected
                                      </div>
                                      <div className="d-flex gap-2">
                                        <button
                                          type="button"
                                          className="btn btn-outline-secondary"
                                          onClick={() => {
                                            setSelectedRegions([]);
                                            setSearchParams((params) => {
                                              const newParams =
                                                new URLSearchParams(params);
                                              newParams.delete("region");
                                              return newParams;
                                            });
                                            setShowRegionModal(false);
                                          }}
                                        >
                                          Clear Selection
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-primary px-4"
                                          onClick={() =>
                                            setShowRegionModal(false)
                                          }
                                        >
                                          Done
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
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
                      borderTop: "1px solid #000000",
                      opacity: "0.5",
                      margin: "20px 0",
                    }}
                  />
                  <Accordion className="mt-3">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>{t("filters.labels.selectCity")}</Accordion.Header>
                      <Accordion.Body>
                        <Form.Group className="mb-3">
                          <div className="grid grid-cols-1 gap-2">
                            {loadingCities ? (
                              <p style={{ textAlign: "center", color: "#666" }}>
                                Loading cities...
                              </p>
                            ) : (
                              <>
                                {getCitiesWithCounts.slice(0, 6).map((city) => {
                                  const isChecked = selectedCities.some(
                                    (c) => c.CITY_ID === city.CITY_ID
                                  );
                                  return (
                                    <div
                                      key={city.CITY_ID}
                                      className="form-check"
                                    >
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`city-${city.CITY_ID}`}
                                        checked={isChecked}
                                        onChange={() =>
                                          handleCityChange({
                                            CITY_ID: city.CITY_ID,
                                            REGION_ID: city.REGION_ID,
                                          })
                                        }
                                        style={{ cursor: "pointer" }}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`city-${city.CITY_ID}`}
                                        style={{ cursor: "pointer" }}
                                      >
                                        {i18n.language === 'ar' ? city["City Ar Name"] : city["City En Name"]}{" "}
                                        <span
                                          style={{
                                            color: "#888",
                                            fontSize: "0.9em",
                                          }}
                                        >
                                          ({city.count})
                                        </span>
                                      </label>
                                    </div>
                                  );
                                })}
                                {cities.length > 0 && (
                                  <button
                                    type="button"
                                    className="btn btn-link p-0"
                                    onClick={() => setShowCityModal(true)}
                                  >
                                    {t("filters.labels.showMoreChoices")}
                                  </button>
                                )}
                              </>
                            )}
                            {showCityModal && (
                              <div
                                className="modal fade show more_optn_modal_main"
                                style={{
                                  display: "block",
                                  backgroundColor: "rgba(0,0,0,0.5)",
                                }}
                                tabIndex="-1"
                              >
                                <div className="modal-dialog modal-dialog-scrollable">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5 className="modal-title">
                                        Select More Cities
                                      </h5>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowCityModal(false)}
                                      ></button>
                                    </div>
                                    <div className="modal-body">
                                      <div className="mb-3">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Search cities..."
                                          value={searchTermCity}
                                          onChange={(e) =>
                                            setSearchTermCity(e.target.value)
                                          }
                                        />
                                      </div>
                                      <div className="row">
                                        <ul className="more_choice_main_list">
                                          {getCitiesWithCounts
                                            .filter(
                                              (city) =>
                                                city["City En Name"]
                                                  .toLowerCase()
                                                  .includes(
                                                    searchTermCity.toLowerCase()
                                                  ) ||
                                                city["City Ar Name"]
                                                  .toLowerCase()
                                                  .includes(
                                                    searchTermCity.toLowerCase()
                                                  )
                                            )
                                            .map((city) => {
                                              const isChecked =
                                                selectedCities.some(
                                                  (c) =>
                                                    c.CITY_ID === city.CITY_ID
                                                );
                                              return (
                                                <li key={city.CITY_ID}>
                                                  <label className="d-flex align-items-center gap-2">
                                                    <input
                                                      type="checkbox"
                                                      checked={isChecked}
                                                      onChange={() =>
                                                        handleCityChange({
                                                          CITY_ID: city.CITY_ID,
                                                          REGION_ID:
                                                            city.REGION_ID,
                                                        })
                                                      }
                                                    />
                                                    <span>
                                                      {i18n.language === 'ar' ? city["City Ar Name"] : city["City En Name"]}{" "}
                                                      <span
                                                        style={{
                                                          color: "#888",
                                                          fontSize: "0.9em",
                                                        }}
                                                      >
                                                        ({city.count})
                                                      </span>
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
                                        {selectedCities.length} City selected
                                      </div>
                                      <div className="d-flex gap-2">
                                        <button
                                          type="button"
                                          className="btn btn-outline-secondary"
                                          onClick={() => {
                                            setSelectedCities([]);
                                            setSearchParams((params) => {
                                              const newParams =
                                                new URLSearchParams(params);
                                              newParams.delete("city");
                                              return newParams;
                                            });
                                            setShowCityModal(false);
                                          }}
                                        >
                                          Clear Selection
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-primary px-4"
                                          onClick={() =>
                                            setShowCityModal(false)
                                          }
                                        >
                                          Done
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
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
                      borderTop: "1px solid #000000",
                      opacity: "0.5",
                      margin: "20px 0",
                    }}
                  />
                  <Accordion className="mt-3">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>{t("filters.labels.selectDistrict")}</Accordion.Header>
                      <Accordion.Body>
                        <Form.Group className="mb-3">
                          <div className="grid grid-cols-1 gap-2">
                            {loadingDistricts ? (
                              <p style={{ textAlign: "center", color: "#666" }}>
                                Loading districts...
                              </p>
                            ) : (
                              <>
                                {getDistrictsWithCounts
                                  .slice(0, 6)
                                  .map((district) => {
                                    const isChecked = selectedDistricts.some(
                                      (d) =>
                                        d.District_ID === district.District_ID
                                    );
                                    return (
                                      <label
                                        key={district.District_ID}
                                        className="form-check d-flex align-items-center gap-2"
                                      >
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          checked={isChecked}
                                          onChange={() =>
                                            handleDistrictChange({
                                              District_ID: district.District_ID,
                                              CITY_ID: district.CITY_ID,
                                              REGION_ID: district.REGION_ID,
                                            })
                                          }
                                          style={{ cursor: "pointer" }}
                                        />
                                        <span
                                          className="form-check-label"
                                          style={{ cursor: "pointer" }}
                                        >
                                          {i18n.language === 'ar' ? district["District Ar Name"] : district["District En Name"]}{" "}
                                          <span
                                            style={{
                                              color: "#888",
                                              fontSize: "0.9em",
                                            }}
                                          >
                                            ({district.count})
                                          </span>
                                        </span>
                                      </label>
                                    );
                                  })}
                                {districts.length > 0 && (
                                  <button
                                    type="button"
                                    className="btn btn-link p-0 mt-2"
                                    onClick={() => setShowDistrictModal(true)}
                                  >
                                    {t("filters.labels.showMoreChoices")}
                                  </button>
                                )}
                              </>
                            )}
                            <div className="container">
                              {showDistrictModal && (
                                <div
                                  className="modal fade show more_optn_modal_main"
                                  tabIndex="-1"
                                  style={{
                                    display: "block",
                                    backgroundColor: "rgba(0,0,0,0.5)",
                                  }}
                                  role="dialog"
                                >
                                  <div className="modal-dialog modal-dialog-scrollable modal-lg">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5 className="modal-title">
                                          Select More Districts
                                        </h5>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          onClick={() =>
                                            setShowDistrictModal(false)
                                          }
                                        ></button>
                                      </div>
                                      <div className="modal-body">
                                        <div className="mb-3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search districts..."
                                            value={searchTermDistrict}
                                            onChange={(e) =>
                                              setSearchTermDistrict(
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                        <div className="row g-1 ml-4">
                                          <ul className="more_choice_main_list">
                                            {getDistrictsWithCounts
                                              .filter(
                                                (district) =>
                                                  district["District En Name"]
                                                    .toLowerCase()
                                                    .includes(
                                                      searchTermDistrict.toLowerCase()
                                                    ) ||
                                                  district["District Ar Name"]
                                                    .toLowerCase()
                                                    .includes(
                                                      searchTermDistrict.toLowerCase()
                                                    )
                                              )
                                              .map((district) => {
                                                const isChecked =
                                                  selectedDistricts.some(
                                                    (d) =>
                                                      d.District_ID ===
                                                      district.District_ID
                                                  );
                                                return (
                                                  <li
                                                    key={district.District_ID}
                                                  >
                                                    <label className="d-flex align-items-center gap-2">
                                                      <input
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={() =>
                                                          handleDistrictChange({
                                                            District_ID:
                                                              district.District_ID,
                                                            CITY_ID:
                                                              district.CITY_ID,
                                                            REGION_ID:
                                                              district.REGION_ID,
                                                          })
                                                        }
                                                      />
                                                      <span
                                                        style={{
                                                          cursor: "pointer",
                                                        }}
                                                      >
                                                        {i18n.language === 'ar' ? district["District Ar Name"] : district["District En Name"]}{" "}
                                                        <span
                                                          style={{
                                                            color: "#888",
                                                            fontSize: "0.9em",
                                                          }}
                                                        >
                                                          ({district.count})
                                                        </span>
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
                                          {selectedDistricts.length} district(s)
                                          selected
                                        </div>
                                        <div className="d-flex gap-2">
                                          <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => {
                                              setSelectedDistricts([]);
                                              setSearchParams((params) => {
                                                const newParams =
                                                  new URLSearchParams(params);
                                                newParams.delete("district");
                                                return newParams;
                                              });
                                              setShowDistrictModal(false);
                                            }}
                                          >
                                            Clear Selection
                                          </button>
                                          <button
                                            type="button"
                                            className="btn btn-primary px-4"
                                            onClick={() =>
                                              setShowDistrictModal(false)
                                            }
                                          >
                                            Done
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </Form.Group>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <hr
                    style={{
                      width: "100%",
                      borderTop: "1px solid #000000",
                      opacity: "0.5",
                      margin: "20px 0",
                    }}
                  />
                  {showBrandModal && currentCategoryFilters.filters?.brand && (
                    <div
                      className="modal fade show more_optn_modal_main"
                      style={{
                        display: "block",
                        backgroundColor: "rgba(0,0,0,0.5)",
                      }}
                      tabIndex="-1"
                    >
                      <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">{t("filters.labels.selectMoreBrands")}</h5>
                            <button
                              type="button"
                              className="btn-close"
                              onClick={() => setShowBrandModal(false)}
                            ></button>
                          </div>
                          <div className="modal-body">
                            <div className="mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("filters.labels.searchBrands")}
                                value={searchTermBrand}
                                onChange={(e) =>
                                  setSearchTermBrand(e.target.value)
                                }
                              />
                            </div>
                            <div className="row g-2">
                              {getBrandsWithCounts
                                .filter((brandOption) => {
                                  const label = brandOption.originalName || brandOption.name || brandOption;
                                  const displayLabel = brandOption.displayName || brandOption.name || brandOption;
                                  return displayLabel
                                    .toLowerCase()
                                    .includes(searchTermBrand.toLowerCase());
                                })
                                .map((brandOption, index) => {
                                  const label = brandOption.originalName || brandOption.name || brandOption;
                                  const displayLabel = brandOption.displayName || brandOption.name || brandOption;
                                  const brandCount = brandOption.count;
                                  const isChecked = searchParams
                                    .getAll("brand")
                                    .includes(getUrlText(label));
                                  return (
                                    <div
                                      key={`${label}-modal-${index}`}
                                      className="col-6"
                                    >
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          id={`brand-modal-${label}-${index}`}
                                          checked={isChecked}
                                          onChange={(e) => {
                                            handleFiltersChange(
                                              {
                                                target: {
                                                  name: "brand",
                                                  value: label,
                                                  checked: e.target.checked,
                                                },
                                              },
                                              currentCategoryFilters.filters
                                                .brand.select
                                            );
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor={`brand-modal-${label}-${index}`}
                                        >
                                          {displayLabel}{" "}
                                          <span
                                            style={{
                                              color: "#888",
                                              fontSize: "0.9em",
                                            }}
                                          >
                                            ({brandCount})
                                          </span>
                                        </label>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                          <div className="modal-footer bg-light border-top d-flex justify-content-between align-items-center">
                            <div className="text-muted small">
                              {searchParams.getAll("brand").length} {t("filters.labels.brandsSelected")}
                            </div>
                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => {
                                  setSearchParams((params) => {
                                    const newParams = new URLSearchParams(
                                      params
                                    );
                                    newParams.delete("brand");
                                    newParams.delete("brandModel");
                                    return newParams;
                                  });
                                  setShowBrandModal(false);
                                }}
                              >
                                {t("filters.labels.clearSelection")}
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary px-4"
                                onClick={() => setShowBrandModal(false)}
                              >
                                {t("filters.labels.done")}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {showBrandModelModal && (
                    <div
                      className="modal fade show more_optn_modal_main"
                      style={{
                        display: "block",
                        backgroundColor: "rgba(0,0,0,0.5)",
                      }}
                      tabIndex="-1"
                    >
                      <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Select More Models</h5>
                            <button
                              type="button"
                              className="btn-close"
                              onClick={() => setShowBrandModelModal(false)}
                            ></button>
                          </div>
                          <div className="modal-body">
                            <div className="mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search models..."
                                value={searchTermBrandModel}
                                onChange={(e) =>
                                  setSearchTermBrandModel(e.target.value)
                                }
                              />
                            </div>
                            <div className="row g-2">
                              {getModelsWithCounts
                                .filter((modelObj) =>
                                  modelObj.name
                                    .toLowerCase()
                                    .includes(
                                      searchTermBrandModel.toLowerCase()
                                    )
                                )
                                .map((modelObj, index) => {
                                  const model = modelObj.name;
                                  const modelCount = modelObj.count;
                                  const isChecked = searchParams
                                    .getAll("brandModel")
                                    .includes(getUrlText(model));
                                  return (
                                    <div
                                      key={`${model}-modal-${index}`}
                                      className="col-12"
                                    >
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          id={`model-modal-${model}-${index}`}
                                          checked={isChecked}
                                          onChange={() => {
                                            const selectedModels =
                                              searchParams.getAll("brandModel");
                                            const modelUrl = getUrlText(model);

                                            setSearchParams((params) => {
                                              const newParams =
                                                new URLSearchParams(params);
                                              newParams.delete("brandModel");

                                              if (
                                                selectedModels.includes(
                                                  modelUrl
                                                )
                                              ) {
                                                selectedModels
                                                  .filter((m) => m !== modelUrl)
                                                  .forEach((m) =>
                                                    newParams.append(
                                                      "brandModel",
                                                      m
                                                    )
                                                  );
                                              } else {
                                                [
                                                  ...selectedModels,
                                                  modelUrl,
                                                ].forEach((m) =>
                                                  newParams.append(
                                                    "brandModel",
                                                    m
                                                  )
                                                );
                                              }

                                              return newParams;
                                            });
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor={`model-modal-${model}-${index}`}
                                        >
                                          {model}{" "}
                                          <span
                                            style={{
                                              color: "#888",
                                              fontSize: "0.9em",
                                            }}
                                          >
                                            ({modelCount})
                                          </span>
                                        </label>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                          <div className="modal-footer bg-light border-top d-flex justify-content-between align-items-center">
                            <div className="text-muted small">
                              {searchParams.getAll("brandModel").length}{" "}
                              model(s) selected
                            </div>
                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => {
                                  setSearchParams((params) => {
                                    const newParams = new URLSearchParams(
                                      params
                                    );
                                    newParams.delete("brandModel");
                                    return newParams;
                                  });
                                  setShowBrandModelModal(false);
                                }}
                              >
                                Clear Selection
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary px-4"
                                onClick={() => setShowBrandModelModal(false)}
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {Object.entries(currentCategoryFilters.filters || {}).map(
                    ([filterKey, filterValue], filterIndex) => {
                      const isLandSubcategory = subCategoryParam === "lands-for-sale" || subCategoryParam === "commercial-lands-for-sale";
                      const isRentSubcategory = subCategoryParam && subCategoryParam.includes("rent");
                      const filtersToHideForLand = ["residenceType", "noOfRooms", "noOfBathrooms", "furnished", "facade", "licenseNumber", "streetWidth", "floor", "amenities", "condition", "propertyAge"];

                      if (isLandSubcategory && filtersToHideForLand.includes(filterKey)) {
                        return null;
                      }

                      if (filterKey === "frequency" && !isRentSubcategory) {
                        return null;
                      }

                      return (
                      <React.Fragment key={filterKey}>
                        <Accordion className="mt-3">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>
                              {filterValue.name}
                            </Accordion.Header>
                            <Accordion.Body>
                              <div
                                style={{
                                  maxWidth: "300px",
                                  margin: "20px",
                                }}
                              >
                                {filterValue.type === "checkbox" ? (
                                  <>
                                    {(filterKey === "brand"
                                      ? getBrandsWithCounts
                                      : filterValue.options
                                          .map((opt) => {
                                            const isString =
                                              typeof opt === "string";
                                            // Use originalValue if available (new format), otherwise use old format
                                            const englishValue = opt.originalValue || (isString ? opt : opt.name || opt);
                                            const count = getCountForOption(
                                              filterKey === "condition"
                                                ? ["Condition", "condition"]
                                                : filterKey === "transmission"
                                                ? ["Transmission"]
                                                : filterKey === "fuelType"
                                                ? ["Fueltype", "FuelType"]
                                                : filterKey === "bodyType"
                                                ? ["BodyType"]
                                                : filterKey === "exteriorColor"
                                                ? ["Color", "ExteriorColor"]
                                                : filterKey === "interiorColor"
                                                ? ["InteriorColor"]
                                                : filterKey === "sellerType"
                                                ? ["SellerType"]
                                                : filterKey === "regionalSpec"
                                                ? ["RegionalSpec"]
                                                : filterKey === "insurance"
                                                ? ["Insurance"]
                                                : filterKey ===
                                                  "additionalFeatures"
                                                ? ["AdditionalFeatures"]
                                                : filterKey === "noOfDoors"
                                                ? ["NumberofDoors"]
                                                : filterKey ===
                                                  "seatingCapacity"
                                                ? ["SeatingCapacity"]
                                                : filterKey === "age"
                                                ? ["Age"]
                                                : filterKey === "paymentMethod"
                                                ? ["PaymentMethod"]
                                                : filterKey === "addType"
                                                ? ["Purpose", "AdType"]
                                                : filterKey === "frequency"
                                                ? ["Frequency", "frequency"]
                                                : filterKey === "residenceType"
                                                ? ["ResidenceType", "residenceType"]
                                                : filterKey === "noOfRooms"
                                                ? ["Bedroom", "NumberofRooms", "NumberOfRooms", "noOfRooms"]
                                                : filterKey === "noOfBathrooms"
                                                ? ["bathrooms", "NumberofBathrooms", "NumberOfBathrooms", "noOfBathrooms"]
                                                : filterKey === "area"
                                                ? ["Area", "area"]
                                                : filterKey === "furnished"
                                                ? ["Furnished", "furnished"]
                                                : filterKey === "licenseNumber"
                                                ? ["LicenseNumber", "licenseNumber", "LicenceNumber"]
                                                : filterKey === "streetWidth"
                                                ? ["streetWidth", "StreetWidth"]
                                                : filterKey === "floor"
                                                ? ["Floor", "floor"]
                                                : filterKey === "amenities"
                                                ? ["Amenities", "amenities"]
                                                : filterKey === "propertyAge"
                                                ? ["PropertyAge", "propertyAge"]
                                                : filterKey === "facade"
                                                ? ["Facade", "facade"]
                                                : [String(englishValue)],
                                              englishValue
                                            );
                                            return isString
                                              ? { ...opt, name: opt.originalValue || opt, count }
                                              : { ...opt, count };
                                          })
                                          .sort((a, b) => b.count - a.count)
                                    )
                                      .slice(
                                        0,
                                        filterKey === "brand"
                                          ? 5
                                          : filterValue.options.length
                                      )
                                      .map((value, valueIndex) => {
                                        // Handle both old format (string/object with name) and new format (object with originalValue/displayValue/displayName)
                                        const englishValue = value.originalValue || value.originalName || value.name || value;
                                        const displayValue = value.displayValue || value.displayName || value.name || value;

                                        const id =
                                          typeof englishValue === "string"
                                            ? englishValue.toLowerCase()
                                            : "";

                                        const count = value.count;

                                        const paramValues =
                                          searchParams.getAll(filterKey);

                                        const checkedFilter =
                                          filterValue.select === "multiple"
                                            ? paramValues &&
                                              paramValues.find(
                                                (val) =>
                                                  val === getUrlText(englishValue)
                                              )
                                            : searchParams.get(filterKey) ===
                                              getUrlText(englishValue);
                                        return (
                                          <Form.Group
                                            key={`${filterKey}-${id}-${valueIndex}`}
                                          >
                                            <div className="form-check mb-2">
                                              <input
                                                id={englishValue}
                                                name={String(filterKey)}
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={
                                                  filterValue.select ===
                                                  "multiple"
                                                    ? paramValues &&
                                                      paramValues.find(
                                                        (val) =>
                                                          val ===
                                                          getUrlText(englishValue)
                                                      )
                                                    : searchParams.get(
                                                        filterKey
                                                      ) === getUrlText(englishValue)
                                                }
                                                value={englishValue}
                                                onChange={(e) =>
                                                  handleFiltersChange(
                                                    e,
                                                    filterValue.select
                                                  )
                                                }
                                                style={{ cursor: "pointer" }}
                                              />
                                              <label
                                                htmlFor={englishValue}
                                                className="form-check-label"
                                                style={{ cursor: "pointer" }}
                                              >
                                                {displayValue}{" "}
                                                <span
                                                  style={{
                                                    color: "#888",
                                                    fontSize: "0.9em",
                                                  }}
                                                >
                                                  ({count})
                                                </span>
                                              </label>
                                            </div>
                                          </Form.Group>
                                        );
                                      })}
                                    {filterKey === "brand" &&
                                      filterValue.options.length > 5 && (
                                        <button
                                          type="button"
                                          className="btn btn-link p-0"
                                          onClick={() =>
                                            setShowBrandModal(true)
                                          }
                                        >
                                          {t("filters.labels.showMoreChoices")}
                                        </button>
                                      )}
                                  </>
                                ) : filterValue.type === "select" ? (
                                  <Form.Group
                                    controlId="formStreetWidth"
                                    style={{
                                      maxWidth: "300px",
                                      marginTop: "20px",
                                    }}
                                  >
                                    {filterValue.label && (
                                      <Form.Label>
                                        {filterValue.label}
                                      </Form.Label>
                                    )}
                                    <Form.Select
                                      name={filterKey}
                                      value={(() => {
                                        const found = filterValue.options.find(
                                          (opt) => getUrlText(opt) === searchParams.get(filterKey)
                                        );
                                        if (!found) return "";
                                        return typeof found === 'object'
                                          ? (found.originalValue || found.name || found)
                                          : found;
                                      })()}
                                      onChange={handleFiltersChange}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <option value="">
                                        All
                                      </option>
                                      {filterValue.options.map((option) => {
                                        const optionValue = typeof option === 'object'
                                          ? (option.originalValue || option.name || option)
                                          : option;
                                        const displayValue = typeof option === 'object'
                                          ? (option.displayValue || option.name || option)
                                          : option;

                                        return (
                                          <option
                                            key={optionValue}
                                            value={optionValue}
                                            style={{ cursor: "pointer" }}
                                          >
                                            {displayValue}
                                          </option>
                                        );
                                      })}
                                    </Form.Select>
                                  </Form.Group>
                                ) : filterValue.type === "oneInput" ? (
                                  <Form.Group className="mb-3">
                                    {filterValue.label && (
                                      <Form.Label>
                                        {filterValue.label}
                                      </Form.Label>
                                    )}
                                    <Row>
                                      <Col>
                                        <Form.Control
                                          type="text"
                                          name={filterKey}
                                          placeholder={filterValue.name}
                                          value={filterData[filterKey]}
                                          onChange={(e) =>
                                            setFilterData((prev) => ({
                                              ...prev,
                                              [e.target.name]: e.target.value,
                                            }))
                                          }
                                          min="0"
                                        />
                                        <button
                                          onClick={(e) =>
                                            handleInputs(
                                              e,
                                              filterKey,
                                              filterData[filterKey],
                                              filterValue.select
                                            )
                                          }
                                          type="button"
                                          className="blue_btn"
                                          style={{
                                            marginTop: "10px",
                                            width: "100%",
                                            cursor: "pointer",
                                          }}
                                        >
                                          Apply
                                        </button>
                                      </Col>
                                    </Row>
                                  </Form.Group>
                                ) : (
                                  filterValue.type === "twoInput" && (
                                    <Form.Group className="mb-3">
                                      {filterValue.label && (
                                        <Form.Label>
                                          {filterValue.label}
                                        </Form.Label>
                                      )}
                                      <Row>
                                        <Col>
                                          <Form.Control
                                            name={`from${filterValue.name}`}
                                            type="text"
                                            placeholder="From"
                                            value={
                                              filterData[
                                                `from${filterValue.name}`
                                              ]
                                            }
                                            onChange={(e) => {
                                              const value = e.target.value;

                                              if (
                                                filterValue.name === "Price" ||
                                                filterValue.name === "Mileage"
                                              ) {
                                                if (
                                                  value === "" ||
                                                  /^\d*\.?\d*$/.test(value)
                                                ) {
                                                  setFilterData((prev) => ({
                                                    ...prev,
                                                    [e.target.name]: value,
                                                  }));
                                                }
                                              } else if (
                                                filterValue.name === "Year"
                                              ) {
                                                if (
                                                  value === "" ||
                                                  /^\d*$/.test(value)
                                                ) {
                                                  setFilterData((prev) => ({
                                                    ...prev,
                                                    [e.target.name]: value,
                                                  }));
                                                }
                                              } else {
                                                setFilterData((prev) => ({
                                                  ...prev,
                                                  [e.target.name]: value,
                                                }));
                                              }
                                            }}
                                            min="0"
                                          />
                                        </Col>
                                        <Col>
                                          <Form.Control
                                            name={`to${filterValue.name}`}
                                            type="text"
                                            placeholder="To"
                                            value={
                                              filterData[
                                                `to${filterValue.name}`
                                              ]
                                            }
                                            onChange={(e) => {
                                              const value = e.target.value;

                                              if (
                                                filterValue.name === "Price" ||
                                                filterValue.name === "Mileage"
                                              ) {
                                                if (
                                                  value === "" ||
                                                  /^\d*\.?\d*$/.test(value)
                                                ) {
                                                  setFilterData((prev) => ({
                                                    ...prev,
                                                    [e.target.name]: value,
                                                  }));
                                                }
                                              } else if (
                                                filterValue.name === "Year"
                                              ) {
                                                if (
                                                  value === "" ||
                                                  /^\d*$/.test(value)
                                                ) {
                                                  setFilterData((prev) => ({
                                                    ...prev,
                                                    [e.target.name]: value,
                                                  }));
                                                }
                                              } else {
                                                setFilterData((prev) => ({
                                                  ...prev,
                                                  [e.target.name]: value,
                                                }));
                                              }
                                            }}
                                            min="0"
                                          />
                                        </Col>
                                      </Row>
                                      <Row className="g-2">
                                        <Col>
                                          <button
                                            onClick={(e) =>
                                              handleTwoInputs(
                                                e,
                                                {
                                                  from: `from${filterValue.name}`,
                                                  to: `to${filterValue.name}`,
                                                },
                                                {
                                                  from: filterData[
                                                    `from${filterValue.name}`
                                                  ],
                                                  to: filterData[
                                                    `to${filterValue.name}`
                                                  ],
                                                },
                                                filterValue.select
                                              )
                                            }
                                            type="button"
                                            className="blue_btn"
                                            style={{
                                              marginTop: "10px",
                                              width: "100%",
                                              cursor: "pointer",
                                            }}
                                          >
                                            Apply
                                          </button>
                                        </Col>
                                        <Col>
                                          <button
                                            onClick={() => {
                                              setFilterData((prev) => ({
                                                ...prev,
                                                [`from${filterValue.name}`]: "",
                                                [`to${filterValue.name}`]: "",
                                              }));
                                              setSearchParams((prev) => {
                                                const newParams =
                                                  new URLSearchParams(prev);
                                                newParams.delete(
                                                  `from${filterValue.name}`
                                                );
                                                newParams.delete(
                                                  `to${filterValue.name}`
                                                );
                                                return newParams;
                                              });
                                            }}
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            style={{
                                              marginTop: "10px",
                                              width: "100%",
                                              cursor: "pointer",
                                            }}
                                          >
                                            Clear
                                          </button>
                                        </Col>
                                      </Row>
                                    </Form.Group>
                                  )
                                )}
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                        <HorizantalLine />
                        {filterKey === "brand" &&
                          availableBrandModels.length > 0 && (
                            <>
                              <Accordion className="mt-3">
                                <Accordion.Item eventKey="0">
                                  <Accordion.Header>
                                    Select Model
                                  </Accordion.Header>
                                  <Accordion.Body>
                                    <Form.Group className="mb-3">
                                      <div className="row">
                                        {getModelsWithCounts
                                          .slice(0, 5)
                                          .map((modelObj, index) => {
                                            const model = modelObj.name;
                                            const modelCount = modelObj.count;
                                            const isChecked = searchParams
                                              .getAll("brandModel")
                                              .includes(getUrlText(model));
                                            return (
                                              <div
                                                key={`${model}-${index}`}
                                                className="col-12"
                                              >
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`model-inline-${model}-${index}`}
                                                    checked={isChecked}
                                                    onChange={() => {
                                                      const selectedModels =
                                                        searchParams.getAll(
                                                          "brandModel"
                                                        );
                                                      const modelUrl =
                                                        getUrlText(model);

                                                      setSearchParams(
                                                        (params) => {
                                                          const newParams =
                                                            new URLSearchParams(
                                                              params
                                                            );
                                                          newParams.delete(
                                                            "brandModel"
                                                          );

                                                          if (
                                                            selectedModels.includes(
                                                              modelUrl
                                                            )
                                                          ) {
                                                            selectedModels
                                                              .filter(
                                                                (m) =>
                                                                  m !== modelUrl
                                                              )
                                                              .forEach((m) =>
                                                                newParams.append(
                                                                  "brandModel",
                                                                  m
                                                                )
                                                              );
                                                          } else {
                                                            [
                                                              ...selectedModels,
                                                              modelUrl,
                                                            ].forEach((m) =>
                                                              newParams.append(
                                                                "brandModel",
                                                                m
                                                              )
                                                            );
                                                          }

                                                          return newParams;
                                                        }
                                                      );
                                                    }}
                                                    style={{
                                                      cursor: "pointer",
                                                    }}
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor={`model-inline-${model}-${index}`}
                                                    style={{
                                                      cursor: "pointer",
                                                    }}
                                                  >
                                                    {model}{" "}
                                                    <span
                                                      style={{
                                                        color: "#888",
                                                        fontSize: "0.9em",
                                                      }}
                                                    >
                                                      ({modelCount})
                                                    </span>
                                                  </label>
                                                </div>
                                              </div>
                                            );
                                          })}
                                        {availableBrandModels.length > 5 && (
                                          <div className="col-12">
                                            <button
                                              type="button"
                                              className="btn btn-link p-0"
                                              onClick={() =>
                                                setShowBrandModelModal(true)
                                              }
                                            >
                                              Show more choices...
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    </Form.Group>
                                  </Accordion.Body>
                                </Accordion.Item>
                              </Accordion>
                              <HorizantalLine />
                            </>
                          )}
                      </React.Fragment>
                      );
                    }
                  )}
                </Form>
              </div>
            </Col>

            <Col lg={9}>
              <div className="results_section">
                {loading && (
                  <div style={{ padding: "20px 0" }}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: "20px",
                          padding: "20px",
                          marginBottom: "20px",
                          display: "flex",
                          gap: "20px",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        <div
                          style={{
                            width: "250px",
                            height: "230px",
                            backgroundColor: "#f0f0f0",
                            borderRadius: "20px",
                            animation: "pulse 1.5s ease-in-out infinite",
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              height: "30px",
                              backgroundColor: "#f0f0f0",
                              borderRadius: "8px",
                              marginBottom: "15px",
                              width: "60%",
                              animation: "pulse 1.5s ease-in-out infinite",
                            }}
                          />
                          <div
                            style={{
                              height: "20px",
                              backgroundColor: "#f0f0f0",
                              borderRadius: "8px",
                              marginBottom: "10px",
                              width: "40%",
                              animation: "pulse 1.5s ease-in-out infinite",
                            }}
                          />
                          <div
                            style={{
                              height: "15px",
                              backgroundColor: "#f0f0f0",
                              borderRadius: "8px",
                              marginBottom: "8px",
                              width: "80%",
                              animation: "pulse 1.5s ease-in-out infinite",
                            }}
                          />
                          <div
                            style={{
                              height: "15px",
                              backgroundColor: "#f0f0f0",
                              borderRadius: "8px",
                              width: "70%",
                              animation: "pulse 1.5s ease-in-out infinite",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {!loading && filteredAds.length === 0 && (
                  <div
                    className="text-center"
                    style={{
                      padding: "50px 20px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "8px",
                    }}
                  >
                    <FaSearch
                      style={{
                        fontSize: "3rem",
                        color: "#ccc",
                        marginBottom: "20px",
                      }}
                    />
                    <h4 style={{ color: "#666" }}>No Ads Found</h4>
                    <p style={{ color: "#999" }}>
                      Try adjusting your search filters or search in a different
                      category
                    </p>
                    <button
                      onClick={() => {
                        setSearchParams({});
                        setSearchKeyword("");
                      }}
                      className="blue_btn"
                      style={{ marginTop: "15px" }}
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
                {!loading && currentAds.length > 0 && (
                  <>
                    <div
                      className="fade-in-ads"
                      style={{
                        backgroundColor: "white",
                        borderRadius: "12px",
                        padding: "10px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Row
                        className="mb-3"
                        style={{ marginTop: "10px", marginRight: "1px" }}
                      >
                        <div className="image-price0-filter d-flex align-items-center justify-between py-[10px] pr-0 pl-[20px]">
                          <div className="d-flex gap-3 align-items-center pt-3">
                            <Form.Check
                              type="checkbox"
                              id="withPhotos"
                              label={t("search.withPhotos")}
                              checked={
                                searchParams.get("withPhotos") === "true"
                              }
                              onChange={(e) => {
                                const params = new URLSearchParams(
                                  searchParams
                                );
                                e.target.checked
                                  ? params.set("withPhotos", "true")
                                  : params.delete("withPhotos");
                                setSearchParams(params);
                              }}
                            />

                            <Form.Check
                              type="checkbox"
                              id="withPrice"
                              label={t("search.withPrice")}
                              checked={searchParams.get("withPrice") === "true"}
                              onChange={(e) => {
                                const params = new URLSearchParams(
                                  searchParams
                                );
                                e.target.checked
                                  ? params.set("withPrice", "true")
                                  : params.delete("withPrice");
                                setSearchParams(params);
                              }}
                            />
                          </div>

                          <Col xs={12} sm={6} md={4} className="ms-auto">
                            <Form.Select
                              aria-label="Sort options"
                              value={sortBy}
                              onChange={(e) => setSortBy(e.target.value)}
                            >
                              <option value="Sort by: Most Relevant">
                                {t("search.sortBy")} {t("search.mostRelevant")}
                              </option>
                              <option value="Price: Low to High">
                                {t("search.priceLowToHigh")}
                              </option>
                              <option value="Price: High to Low">
                                {t("search.priceHighToLow")}
                              </option>
                            </Form.Select>
                          </Col>
                        </div>
                      </Row>

                      {currentAds.map((ad) => (
                        <SearchResultCard
                          key={ad.id}
                          ad={ad}
                          onToggleBookmark={toggleBookmark}
                          isBookmarked={bookmarkedAds.includes(ad.id)}
                          currentUserId={currentUser?.uid}
                        />
                      ))}
                    </div>
                    {totalPages > 1 && (
                      <div className="d-flex align-items-center justify-content-center my-4">
                        <Button
                          variant="#2d4495"
                          className="d-flex align-items-center mx-2"
                          disabled={currentPage === 1}
                          onClick={() => handlePageChange(currentPage - 1)}
                          style={{
                            backgroundColor: "#2d4495",
                            color: "white",
                            border: "none",
                            transition: "none",
                          }}
                        >
                          <FaArrowLeft className="me-1" /> {t("pagination.previous")}
                        </Button>

                        <ButtonGroup>
                          {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            if (
                              pageNumber === 1 ||
                              pageNumber === totalPages ||
                              (pageNumber >= currentPage - 1 &&
                                pageNumber <= currentPage + 1)
                            ) {
                              const isActive = pageNumber === currentPage;
                              return (
                                <button
                                  key={pageNumber}
                                  onClick={() => handlePageChange(pageNumber)}
                                  style={{
                                    backgroundColor: isActive
                                      ? "#2d4495"
                                      : "#f8f9fa",
                                    color: isActive ? "white" : "#2d4495",
                                    border: "1px solid #2d4495",
                                    padding: "8px 16px",
                                    margin: "0 2px",
                                    cursor: "pointer",
                                    borderRadius: "4px",
                                    fontWeight: isActive ? "bold" : "normal",
                                    transition: "none",
                                  }}
                                >
                                  {pageNumber}
                                </button>
                              );
                            } else if (
                              pageNumber === currentPage - 2 ||
                              pageNumber === currentPage + 2
                            ) {
                              return (
                                <span
                                  key={pageNumber}
                                  style={{
                                    padding: "8px 12px",
                                    color: "#6c757d",
                                  }}
                                >
                                  ...
                                </span>
                              );
                            }
                            return null;
                          })}
                        </ButtonGroup>

                        <Button
                          variant="#2d4495"
                          className="d-flex align-items-center mx-2"
                          disabled={currentPage === totalPages}
                          onClick={() => handlePageChange(currentPage + 1)}
                          style={{
                            backgroundColor: "#2d4495",
                            color: "white",
                            border: "none",
                            transition: "none",
                          }}
                        >
                          {t("pagination.next")} <FaArrowRight className="ms-1" />
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>

        <ComercialsAds />
        <LatestBlog />
      </div>

      <Footer />
    </>
  );
};

export default Search;
