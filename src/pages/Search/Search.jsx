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
import { FaSearch, FaArrowLeft, FaArrowRight, FaTimes, FaFilter, FaChevronDown } from "react-icons/fa";
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
  setDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  saudiRegions,
  fetchCities,
  fetchDistricts,
} from "../../utils/locationApi";
import Swal from "sweetalert2";
import "../../assets/css/mobile-filters.css";

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
  const [allAdsForCounts, setAllAdsForCounts] = useState([]); // Unfiltered ads for count calculations
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
  }, [searchParams.toString(), searchKeyword]);

  const getUrlText = (text) => {
    if (!text) return "";

    // Convert to string first to ensure .trim() works
    const textStr = String(text);

    // Special case for "Home & Furniture" to convert to "home-furniture"
    if (textStr.trim().toLowerCase() === "home & furniture") {
      return "home-furniture";
    }

    return textStr
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

  // Mobile Filters State - Track which filter modal is open
  const [activeFilterModal, setActiveFilterModal] = useState(null); // null, 'category', 'subcategory', 'region', 'city', 'price', 'year', 'brand'
  const filterSectionRef = useRef(null);

  const location = useLocation();
  const parms = location.pathname;
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

          // Deduplicate districts based on district name but preserve all District_IDs for counting
          const districtMap = new Map();

          flattenedDistricts.forEach((district) => {
            const key = `${district["District En Name"]}_${district["District Ar Name"]}`;

            if (!districtMap.has(key)) {
              // First occurrence - store the district with an array of IDs
              districtMap.set(key, {
                ...district,
                allDistrictIds: [district.District_ID]
              });
            } else {
              // Duplicate name - add the ID to the existing district's ID array
              const existing = districtMap.get(key);
              if (!existing.allDistrictIds.includes(district.District_ID)) {
                existing.allDistrictIds.push(district.District_ID);
              }
            }
          });

          const uniqueDistricts = Array.from(districtMap.values());
          setDistricts(uniqueDistricts);
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

  // Track last processed bookmark change to prevent duplicate processing
  const lastProcessedTimestampRef = useRef(0);
  // Store pending bookmark change to apply after data is loaded
  const pendingBookmarkChangeRef = useRef(null);

  // Check for pending bookmark changes and apply them
  const applyPendingBookmarkChange = useCallback(() => {
    const bookmarkChangeStr = sessionStorage.getItem("last_bookmark_change");

    if (!bookmarkChangeStr || !currentUser?.uid) {
      return false;
    }

    try {
      const bookmarkChange = JSON.parse(bookmarkChangeStr);

      // Skip if we already processed this change
      if (bookmarkChange.timestamp <= lastProcessedTimestampRef.current) {
        return false;
      }

      const currentUserId = currentUser.uid;
      console.log("🔄 Search page: Applying bookmark change:", bookmarkChange);

      // Mark as processed
      lastProcessedTimestampRef.current = bookmarkChange.timestamp;

      // Update local state if this item is in our list
      setAllAds((prevAds) => {
        const updated = prevAds.map((ad) => {
          if (ad.id === bookmarkChange.id) {
            console.log(`✅ Updating ad ${ad.id} - removed: ${bookmarkChange.removed}`);
            return {
              ...ad,
              heartedby: bookmarkChange.removed
                ? (ad.heartedby || []).filter((id) => id !== currentUserId)
                : [...(ad.heartedby || []), currentUserId],
            };
          }
          return ad;
        });
        return updated;
      });

      setFilteredAds((prevAds) =>
        prevAds.map((ad) => {
          if (ad.id === bookmarkChange.id) {
            return {
              ...ad,
              heartedby: bookmarkChange.removed
                ? (ad.heartedby || []).filter((id) => id !== currentUserId)
                : [...(ad.heartedby || []), currentUserId],
            };
          }
          return ad;
        })
      );

      // Update bookmarkedAds state
      if (bookmarkChange.removed) {
        setBookmarkedAds((prev) => prev.filter((id) => id !== bookmarkChange.id));
      } else {
        setBookmarkedAds((prev) => [...prev, bookmarkChange.id]);
      }

      // Clear the bookmark change flag
      sessionStorage.removeItem("last_bookmark_change");
      console.log("✅ Bookmark synced and cleared");
      return true;
    } catch (error) {
      console.error("Error syncing bookmark:", error);
      return false;
    }
  }, [currentUser?.uid]);

  // Apply bookmark changes AFTER data is loaded
  useEffect(() => {
    // Only try to apply if we have data loaded
    if (allAds.length > 0 && currentUser?.uid) {
      applyPendingBookmarkChange();
    }
  }, [allAds.length, currentUser?.uid, applyPendingBookmarkChange]);

  // Also listen for navigation events
  useEffect(() => {
    const handlePopState = () => {
      console.log("🔙 Browser back/forward detected");
      // Will be applied by the allAds.length useEffect above
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && allAds.length > 0 && currentUser?.uid) {
        console.log("👁️ Page became visible, checking bookmarks...");
        applyPendingBookmarkChange();
      }
    };

    window.addEventListener("popstate", handlePopState);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [allAds.length, currentUser?.uid, applyPendingBookmarkChange]);

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
        // Reduced cache duration to 30 seconds for faster updates when listings are enabled/disabled
        const CACHE_DURATION = 30 * 1000; // 30 seconds

        const cachedData = sessionStorage.getItem(cacheKey);
        const cachedTime = sessionStorage.getItem(cacheTimestamp);

        // Check if there's a pending bookmark change, listing status change, or profile photo update - if so, skip cache
        const hasPendingBookmarkChange = sessionStorage.getItem("last_bookmark_change") !== null;
        const hasListingStatusChange = sessionStorage.getItem("listing_status_changed") !== null;
        const hasProfilePhotoUpdate = sessionStorage.getItem("profile_photo_updated") !== null;

        if (cachedData && cachedTime && !hasPendingBookmarkChange && !hasListingStatusChange && !hasProfilePhotoUpdate) {
          const age = Date.now() - parseInt(cachedTime);
          if (age < CACHE_DURATION) {
            await new Promise(resolve => setTimeout(resolve, 400));
            // ℹ️ Note: Cached data already has disabled listings filtered out
            const parsedData = JSON.parse(cachedData);
            setAllAds(parsedData);
            setFilteredAds(parsedData);
            setLoading(false);
            return;
          }
        } else if (hasPendingBookmarkChange) {
          console.log("⚡ Pending bookmark change detected, skipping cache");
        } else if (hasProfilePhotoUpdate) {
          console.log("⚡ Profile photo updated, clearing cache and reloading");
          sessionStorage.removeItem("profile_photo_updated");
          Object.keys(sessionStorage).forEach(key => {
            if (key.startsWith("ads_")) {
              sessionStorage.removeItem(key);
            }
          });
        } else if (hasListingStatusChange) {
          console.log("⚡ Listing status changed, clearing cache and reloading");
          // Clear the flag after detecting it
          sessionStorage.removeItem("listing_status_changed");
          // Clear all cached ads to force fresh fetch
          Object.keys(sessionStorage).forEach(key => {
            if (key.startsWith("ads_")) {
              sessionStorage.removeItem(key);
            }
          });
        }

        const collectionsToLoad = currentCategory
          ? allCollections.filter((col) => col.category === currentCategory)
          : allCollections;

        // Fetch ALL ads from ALL collections for accurate count calculations
        const fetchAllForCounts = allCollections.map(async (col) => {
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

        // Process ALL ads for count calculations
        const resultsForCounts = await Promise.all(fetchAllForCounts);
        const allAdsArrayForCounts = resultsForCounts.flat();
        const adsWithPurposeForCounts = allAdsArrayForCounts.map((ad) => {
          if (!ad.Purpose && !ad.AdType) {
            return { ...ad, Purpose: "Sell" };
          }
          return ad;
        });
        const activeAdsForCounts = adsWithPurposeForCounts.filter((ad) => {
          const isActive = ad.isActive;
          return isActive !== true && isActive !== "true";
        });

        const adsWithPurpose = allAdsArray.map((ad) => {
          if (!ad.Purpose && !ad.AdType) {
            return { ...ad, Purpose: "Sell" };
          }
          return ad;
        });

        // ⚠️ IMPORTANT: REVERSED LOGIC - Filter out disabled listings
        // Due to backend bug, we use reversed isActive logic:
        // - isActive: false = Active (show in search) ✅
        // - isActive: true = Not Active/Disabled (hide from search) ❌
        // Only show listings where isActive !== true (active listings in reversed logic)
        const activeAdsOnly = adsWithPurpose.filter((ad) => {
          const isActive = ad.isActive;
          return isActive !== true && isActive !== "true";
        });

        // Only cache if there's no pending bookmark change
        // This ensures we don't cache potentially stale data
        if (!hasPendingBookmarkChange) {
          sessionStorage.setItem(cacheKey, JSON.stringify(activeAdsOnly));
          sessionStorage.setItem(cacheTimestamp, Date.now().toString());
        } else {
          console.log("⚠️ Skipping cache storage due to pending bookmark change");
        }

        setAllAds(activeAdsOnly);
        setAllAdsForCounts(activeAdsForCounts); // Set unfiltered ads for count calculations
        setFilteredAds(activeAdsOnly);
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

        // Try exact match first
        let matches = subCategoryParams.includes(adSubCategory);

        // If no match, try flexible matching to handle apostrophe variations
        // e.g., "Women's Fashion" -> "womens-fashion" should match "women-fashion"
        if (!matches && ad.SubCategory) {
          matches = subCategoryParams.some(param => {
            // Normalize both by removing standalone 's' after hyphens
            const normalizeText = (text) => text.replace(/s-/g, '-');
            return normalizeText(param) === normalizeText(adSubCategory);
          });
        }

        return matches;
      });
    }
    // Check both camelCase and lowercase versions of the parameter for backward compatibility
    const nestedSubCategoryParam = searchParams.get("nestedSubCategory") || searchParams.get("nestedsubcategory");
    if (nestedSubCategoryParam) {
      filtered = filtered.filter((ad) => {
        const adNestedSubCategory = getUrlText(ad.NestedSubCategory || "");

        // Try exact match first
        let matches = adNestedSubCategory === nestedSubCategoryParam;

        // If no match, try flexible matching to handle apostrophe variations
        // e.g., "Women's Bags" -> "womens-bags" should match "women-bags"
        if (!matches && ad.NestedSubCategory) {
          const normalizeText = (text) => text.replace(/s-/g, '-');
          matches = normalizeText(nestedSubCategoryParam) === normalizeText(adNestedSubCategory);
        }

        return matches;
      });
    }
    // Use searchKeyword from state if available, otherwise use URL parameter
    const activeSearchKeyword = (typeof searchKeyword === 'string' ? searchKeyword.trim() : '') || searchParams.get("q") || "";
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
        if (ad.imageUrl && typeof ad.imageUrl === 'string' && ad.imageUrl.trim() !== "") return true;
        if (ad.photoURL && typeof ad.photoURL === 'string' && ad.photoURL.trim() !== "") return true;
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
  }, [allAds, category, subCategoryParam, searchKeyword, searchParams.toString()]);

  // Reset to page 1 only when filter criteria change (not when allAds updates)
  useEffect(() => {
    setCurrentPage(1);
  }, [category, subCategoryParam, searchKeyword, searchParams.toString()]);
  const toggleBookmark = async (adId) => {
    if (!currentUser) {
      Swal.fire({
        icon: "warning",
        title: t("common.loginRequired") || "Login Required",
        text: t("common.loginToFavorite") || "Please login to add items to favorites",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
      return;
    }

    // Capture current state before any updates
    const isBookmarked = bookmarkedAds.includes(adId);
    const originalBookmarkedAds = [...bookmarkedAds];
    const ad = allAds.find((a) => a.id === adId);
    const collectionName = ad?.collectionSource;

    console.log("🔖 Toggle Bookmark Debug:", {
      adId,
      isBookmarked,
      collectionName,
      ad: ad ? { id: ad.id, title: ad.title, collectionSource: ad.collectionSource } : null,
    });

    if (!collectionName) {
      console.error("❌ ERROR: collectionName is missing!", ad);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Cannot bookmark this item. Collection name is missing.",
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
      return;
    }

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
      console.log("📝 Updating user document...");
      const userDocRef = doc(db, "users", currentUser.uid);

      // Update user's favorites document
      try {
        await updateDoc(userDocRef, {
          heartedby: isBookmarked ? arrayRemove(adId) : arrayUnion(adId),
        });
        console.log("✅ User document updated successfully");
      } catch (userError) {
        console.error("❌ Error updating user document:", userError);
        // If user document doesn't exist, create it
        if (userError.code === 'not-found') {
          console.log("Creating new user document...");
          await setDoc(userDocRef, {
            heartedby: [adId],
            uid: currentUser.uid,
          });
          console.log("✅ New user document created");
        } else {
          throw userError;
        }
      }

      // Update ad document's heartedby array, bookmarked field, and per-user bookmark
      console.log(`📝 Updating ad document in ${collectionName}/${adId}...`);
      console.log(`📝 Current user ID: ${currentUser.uid}`);
      console.log(`📝 Is currently bookmarked: ${isBookmarked}`);
      console.log(`📝 Will ${isBookmarked ? 'REMOVE from' : 'ADD to'} heartedby array`);

      const adDocRef = doc(db, collectionName, adId);
      await updateDoc(adDocRef, {
        heartedby: isBookmarked
          ? arrayRemove(currentUser.uid)
          : arrayUnion(currentUser.uid),
        bookmarked: !isBookmarked, // Update bookmarked field
        [`userBookmarks.${currentUser.uid}`]: !isBookmarked, // Track per-user bookmark status
      });

      // Verify the update by reading back
      const verifyDoc = await getDoc(adDocRef);
      const verifyData = verifyDoc.data();
      console.log("✅ Ad document updated successfully");
      console.log("✅ Verification - heartedby array:", verifyData.heartedby);
      console.log("✅ Verification - bookmarked:", verifyData.bookmarked);
      console.log("✅ Verification - userBookmarks:", verifyData.userBookmarks);

      // Store the bookmark change for other pages
      const bookmarkChange = {
        id: adId,
        category: ad?.category || ad?.ModalCategory || "Unknown",
        tableName: collectionName,
        removed: isBookmarked,
        timestamp: Date.now(),
      };
      sessionStorage.setItem("last_bookmark_change", JSON.stringify(bookmarkChange));

      console.log("✅ All favorites saved to database successfully!");
      Swal.fire({
        icon: "success",
        title: isBookmarked ? t("common.removedFromFavorites") || "Removed from favorites" : t("common.addedToFavorites") || "Added to favorites",
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    } catch (error) {
      console.error("❌ Error updating favorites:", error);
      console.error("Error details:", {
        code: error.code,
        message: error.message,
        stack: error.stack,
      });
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to update favorite: ${error.message}`,
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
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

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to update favorite. Please try again.",
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
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
        // Sort by creation date - newest first (default behavior)
        return sortedAds.sort((a, b) => {
          // Try multiple possible timestamp field names
          const timeA = a.createdAt || a.timestamp || a.dateAdded || a.created || 0;
          const timeB = b.createdAt || b.timestamp || b.dateAdded || b.created || 0;

          // Handle Firestore Timestamp objects
          const getTimeValue = (time) => {
            if (!time) return 0;
            if (time.toDate) return time.toDate().getTime(); // Firestore Timestamp
            if (time.seconds) return time.seconds * 1000; // Firestore Timestamp object
            if (typeof time === 'number') return time;
            if (time instanceof Date) return time.getTime();
            return 0;
          };

          return getTimeValue(timeB) - getTimeValue(timeA); // Descending order (newest first)
        });
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
        const keyword = String(activeSearchKeyword).toLowerCase().trim();
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
    [allAds, category, categoryToEnglishMap, searchKeyword]
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
      .map((district) => {
        // If the district has multiple IDs (deduplicated), sum up counts for all IDs
        const count = district.allDistrictIds
          ? district.allDistrictIds.reduce((total, districtId) => {
              return total + getCountForOption(["District_ID", "districtId"], districtId);
            }, 0)
          : getCountForOption(["District_ID", "districtId"], district.District_ID);

        return {
          ...district,
          count: count,
        };
      })
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
    const keyword = typeof searchKeyword === 'string' ? searchKeyword.trim() : '';
    if (keyword) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("q", keyword);
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
            newParams.delete("nestedsubcategory");
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
      // Get all IDs to check/add/remove (either from allDistrictIds or single District_ID)
      const idsToHandle = districtOption.allDistrictIds || [districtOption.District_ID];

      // Check if any of the IDs are already selected
      const isSelected = prev.some((district) =>
        idsToHandle.includes(district.District_ID)
      );

      let newDistricts;
      if (isSelected) {
        // Remove all IDs associated with this district
        newDistricts = prev.filter(
          (district) => !idsToHandle.includes(district.District_ID)
        );
      } else {
        // Add all IDs associated with this district
        const districtsToAdd = idsToHandle.map((districtId) => ({
          District_ID: districtId,
          CITY_ID: districtOption.CITY_ID,
          REGION_ID: districtOption.REGION_ID,
        }));
        newDistricts = [...prev, ...districtsToAdd];
      }

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
  }, [searchParams.toString(), currentCategoryFilters]);
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
  }, [searchParams.toString(), availableBrandModels]);
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

        {/* Mobile Filter Chips */}
        <div className="mobile-filter-chips-container">
          {/* Results Count & Clear All Section */}
          <div className="mobile-filters-results-bar">
            <div className="mobile-filters-results-count">
              <span className="results-label">{t("search.showResults")}: </span>
              <span className="results-number">{filteredAds.length}</span>
            </div>
            {(category || selectedRegions.length > 0 || selectedCities.length > 0 ||
              selectedDistricts.length > 0 || searchParams.toString()) && (
              <button
                className="mobile-filters-clear-all-btn"
                onClick={() => {
                  setSearchParams({});
                  setSearchKeyword("");
                  setSelectedRegions([]);
                  setSelectedCities([]);
                  setSelectedDistricts([]);
                }}
              >
                {t("search.clear")}
              </button>
            )}
          </div>

          <div className="mobile-filter-chips-wrapper">
            {/* Category Filter Chip */}
            <div
              className={`filter-chip ${category ? 'active' : ''}`}
              onClick={() => setActiveFilterModal('category')}
            >
              <span>{t("filters.labels.category")}</span>
              {category && <span className="filter-chip-count">1</span>}
              <FaChevronDown className="filter-chip-arrow" />
            </div>

            {/* Subcategory Filter Chip */}
            {currentCategoryFilters.subcategories && currentCategoryFilters.subcategories.length > 0 && (
              <div
                className={`filter-chip ${searchParams.get("subcategory") ? 'active' : ''}`}
                onClick={() => setActiveFilterModal('subcategory')}
              >
                <span>{t("filters.labels.subCategories")}</span>
                {searchParams.get("subcategory") && <span className="filter-chip-count">1</span>}
                <FaChevronDown className="filter-chip-arrow" />
              </div>
            )}

            {/* Region Filter Chip */}
            <div
              className={`filter-chip ${selectedRegions.length > 0 ? 'active' : ''}`}
              onClick={() => setActiveFilterModal('region')}
            >
              <span>{t("filters.labels.selectRegion")}</span>
              {selectedRegions.length > 0 && <span className="filter-chip-count">{selectedRegions.length}</span>}
              <FaChevronDown className="filter-chip-arrow" />
            </div>

            {/* City Filter Chip - Only show if regions are selected */}
            {selectedRegions.length > 0 && cities.length > 0 && (
              <div
                className={`filter-chip ${selectedCities.length > 0 ? 'active' : ''}`}
                onClick={() => setActiveFilterModal('city')}
              >
                <span>{t("filters.labels.selectCity")}</span>
                {selectedCities.length > 0 && <span className="filter-chip-count">{selectedCities.length}</span>}
                <FaChevronDown className="filter-chip-arrow" />
              </div>
            )}

            {/* District Filter Chip - Only show if cities are selected */}
            {selectedCities.length > 0 && districts.length > 0 && (
              <div
                className={`filter-chip ${selectedDistricts.length > 0 ? 'active' : ''}`}
                onClick={() => setActiveFilterModal('district')}
              >
                <span>{t("filters.labels.selectDistrict")}</span>
                {selectedDistricts.length > 0 && <span className="filter-chip-count">{selectedDistricts.length}</span>}
                <FaChevronDown className="filter-chip-arrow" />
              </div>
            )}

            {/* Featured Ads Filter Chip */}
            <div
              className={`filter-chip ${searchParams.get("featuredAds") ? 'active' : ''}`}
              onClick={() => setActiveFilterModal('featuredAds')}
            >
              <span>Featured Ads</span>
              <FaChevronDown className="filter-chip-arrow" />
            </div>

            {/* Dynamic Category-Specific Filter Chips */}
            {Object.entries(currentCategoryFilters.filters || {}).map(([filterKey, filterValue]) => {
              const isLandSubcategory = searchParams.get("subcategory") === "lands-for-sale" || searchParams.get("subcategory") === "commercial-lands-for-sale";
              const isRentSubcategory = searchParams.get("subcategory")?.includes("rent");
              const filtersToHideForLand = ["residenceType", "noOfRooms", "noOfBathrooms", "furnished", "facade", "licenseNumber", "streetWidth", "floor", "amenities", "condition", "propertyAge"];

              if (isLandSubcategory && filtersToHideForLand.includes(filterKey)) {
                return null;
              }

              if (filterKey === "frequency" && !isRentSubcategory) {
                return null;
              }

              const isRangeFilter = filterValue.type === "range";
              const isCheckboxFilter = filterValue.type === "checkbox";
              let activeCount = 0;
              let isActive = false;

              if (isRangeFilter) {
                const fromParam = searchParams.get(`from${filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}`);
                const toParam = searchParams.get(`to${filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}`);
                isActive = !!(fromParam || toParam);
              } else if (isCheckboxFilter) {
                activeCount = searchParams.getAll(filterKey).length;
                isActive = activeCount > 0;
              }

              return (
                <div
                  key={filterKey}
                  className={`filter-chip ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveFilterModal(filterKey)}
                >
                  <span>{filterValue.name}</span>
                  {activeCount > 0 && <span className="filter-chip-count">{activeCount}</span>}
                  <FaChevronDown className="filter-chip-arrow" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Filter Modal */}
        {activeFilterModal === 'category' && (
          <div className="mobile-filter-modal-backdrop" onClick={() => setActiveFilterModal(null)}>
            <div className="mobile-filters-modal" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-filters-header">
                <h2>{t("filters.labels.category")}</h2>
                <button className="mobile-filters-close-btn" onClick={() => setActiveFilterModal(null)}>
                  <FaTimes />
                </button>
              </div>
              <div className="mobile-filters-body">
                <div className="mobile-filter-options">
                  {["Motors", "Electronics", "Fashion Style", "Home & Furniture", "Job Board", "Real Estate", "Services", "Sport & Game", "Pet & Animals", "Other"].map((cat) => {
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

                    // Calculate count for this category using unfiltered ads
                    const categoryCount = allAdsForCounts.filter((ad) => {
                      const categoryVariations = [cat];
                      if (cat === "Sport & Game") {
                        categoryVariations.push("Sports & Game");
                      }
                      if (cat === "Home & Furniture") {
                        categoryVariations.push("Home & Furnituer");
                      }
                      return categoryVariations.some(
                        (variation) => ad.category === variation || ad.ModalCategory === variation
                      );
                    }).length;

                    return (
                      <div className="mobile-filter-option" key={cat}>
                        <input
                          type="radio"
                          id={`mobile-cat-${cat}`}
                          name="category"
                          checked={getUrlText(cat) === searchParams.get("category")}
                          onChange={() => {
                            navigate(`/search?category=${getUrlText(cat)}`);
                            setActiveFilterModal(null);
                          }}
                        />
                        <label htmlFor={`mobile-cat-${cat}`}>
                          {translatedCategoryName}
                          <span className="mobile-filter-option-count">({categoryCount})</span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mobile-filters-footer">
                <button className="mobile-filters-clear-btn" onClick={() => {
                  navigate("/search");
                  setActiveFilterModal(null);
                }}>
                  {t("search.clear")}
                </button>
                <button className="mobile-filters-apply-btn" onClick={() => setActiveFilterModal(null)}>
                  {t("filters.labels.done")}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Subcategory Filter Modal */}
        {activeFilterModal === 'subcategory' && currentCategoryFilters.subcategories && currentCategoryFilters.subcategories.length > 0 && (
          <div className="mobile-filter-modal-backdrop" onClick={() => setActiveFilterModal(null)}>
            <div className="mobile-filters-modal" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-filters-header">
                <h2>{t("filters.labels.subCategories")}</h2>
                <button className="mobile-filters-close-btn" onClick={() => setActiveFilterModal(null)}>
                  <FaTimes />
                </button>
              </div>
              <div className="mobile-filters-body">
                <div className="mobile-filter-options">
                  {currentCategoryFilters.subcategories.map((subcat) => {
                    const englishName = subcat.name;
                    const urlSubCategory = getUrlText(englishName);
                    const selectedSubCategories = searchParams.getAll("subcategory");
                    const isSelected = selectedSubCategories.includes(urlSubCategory);
                    const displayName = subcat.displayName || subcat.name;

                    // Calculate count for this subcategory using unfiltered ads
                    const subcategoryCount = allAdsForCounts.filter((ad) => {
                      const adSubCategory = getUrlText(ad.SubCategory || "");
                      return adSubCategory === urlSubCategory;
                    }).length;

                    return (
                      <div className="mobile-filter-option" key={englishName}>
                        <input
                          type="radio"
                          id={`mobile-subcat-${englishName}`}
                          name="subcategory"
                          checked={isSelected}
                          onChange={(e) => {
                            handleSubcategoryChange(e);
                            setTimeout(() => setActiveFilterModal(null), 100);
                          }}
                          value={urlSubCategory}
                        />
                        <label htmlFor={`mobile-subcat-${englishName}`}>
                          {displayName}
                          <span className="mobile-filter-option-count">({subcategoryCount})</span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mobile-filters-footer">
                <button className="mobile-filters-clear-btn" onClick={() => {
                  setSearchParams((params) => {
                    const newParams = new URLSearchParams(params);
                    newParams.delete("subcategory");
                    newParams.delete("nestedSubCategory");
                    newParams.delete("nestedsubcategory");
                    return newParams;
                  });
                  setActiveFilterModal(null);
                }}>
                  {t("search.clear")}
                </button>
                <button className="mobile-filters-apply-btn" onClick={() => setActiveFilterModal(null)}>
                  {t("filters.labels.done")}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Region Filter Modal */}
        {activeFilterModal === 'region' && (
          <div className="mobile-filter-modal-backdrop" onClick={() => setActiveFilterModal(null)}>
            <div className="mobile-filters-modal" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-filters-header">
                <h2>{t("filters.labels.selectRegion")}</h2>
                <button className="mobile-filters-close-btn" onClick={() => setActiveFilterModal(null)}>
                  <FaTimes />
                </button>
              </div>

              <div className="mobile-filters-body">
                <div className="mobile-filter-options">
                  {saudiRegions.map((region) => {
                    const regionCount = allAdsForCounts.filter((ad) =>
                      String(ad.regionId) === String(region.id) ||
                      String(ad.REGION_ID) === String(region.id)
                    ).length;
                    return (
                      <div className="mobile-filter-option" key={region.id}>
                        <input
                          type="checkbox"
                          id={`mobile-region-${region.id}`}
                          checked={selectedRegions.includes(region.id)}
                          onChange={() => handleRegionChange(region.id)}
                        />
                        <label htmlFor={`mobile-region-${region.id}`}>
                          {i18n.language === 'ar' ? region.nameAr : region.nameEn}
                          <span className="mobile-filter-option-count">({regionCount})</span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mobile-filters-footer">
                <button className="mobile-filters-clear-btn" onClick={() => {
                  setSelectedRegions([]);
                  setSearchParams((params) => {
                    const newParams = new URLSearchParams(params);
                    newParams.delete("region");
                    return newParams;
                  });
                }}>
                  {t("search.clear")}
                </button>
                <button className="mobile-filters-apply-btn" onClick={() => setActiveFilterModal(null)}>
                  {t("filters.labels.done")}
                </button>
              </div>
            </div>
          </div>
        )}


        {/* Brand Filter Modal */}
        {activeFilterModal === 'brand' && currentCategoryFilters.filters?.brand && (
          <div className="mobile-filter-modal-backdrop" onClick={() => setActiveFilterModal(null)}>
            <div className="mobile-filters-modal" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-filters-header">
                <h2>{t("filters.labels.brand")}</h2>
                <button className="mobile-filters-close-btn" onClick={() => setActiveFilterModal(null)}>
                  <FaTimes />
                </button>
              </div>
              <div className="mobile-filters-body">
                <div className="mobile-filter-options">
                  {currentCategoryFilters.filters.brand.options.map((brandOption, index) => {
                    const label = typeof brandOption === 'object' ? brandOption.name : brandOption;
                    const displayLabel = typeof brandOption === 'object'
                      ? (brandOption.displayName || brandOption.name)
                      : brandOption;
                    const brandCount = typeof brandOption === 'object' ? brandOption.count : 0;
                    const isChecked = searchParams.getAll("brand").includes(getUrlText(label));

                    return (
                      <div className="mobile-filter-option" key={`brand-${index}`}>
                        <input
                          type="checkbox"
                          id={`mobile-brand-${index}`}
                          checked={isChecked}
                          onChange={(e) => handleFiltersChange(e, "multiple")}
                          name="brand"
                          value={getUrlText(label)}
                        />
                        <label htmlFor={`mobile-brand-${index}`}>
                          {displayLabel}
                          <span className="mobile-filter-option-count">({brandCount})</span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mobile-filters-footer">
                <button className="mobile-filters-clear-btn" onClick={() => {
                  setSearchParams((params) => {
                    const newParams = new URLSearchParams(params);
                    newParams.delete("brand");
                    return newParams;
                  });
                }}>
                  {t("search.clear")}
                </button>
                <button className="mobile-filters-apply-btn" onClick={() => setActiveFilterModal(null)}>
                  {t("filters.labels.done")}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* City Filter Modal */}
        {activeFilterModal === 'city' && cities.length > 0 && (
          <div className="mobile-filter-modal-backdrop" onClick={() => setActiveFilterModal(null)}>
            <div className="mobile-filters-modal" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-filters-header">
                <h2>{t("filters.labels.selectCity")}</h2>
                <button className="mobile-filters-close-btn" onClick={() => setActiveFilterModal(null)}>
                  <FaTimes />
                </button>
              </div>
              <div className="mobile-filters-body">
                {loadingCities ? (
                  <div className="mobile-filter-loading">
                    <div className="mobile-filter-loading-spinner"></div>
                    <span>Loading cities...</span>
                  </div>
                ) : (
                  <div className="mobile-filter-options">
                    {getCitiesWithCounts.map((city) => {
                      const isChecked = selectedCities.some((c) => c.CITY_ID === city.CITY_ID);
                      return (
                        <div className="mobile-filter-option" key={city.CITY_ID}>
                          <input
                            type="checkbox"
                            id={`mobile-city-${city.CITY_ID}`}
                            checked={isChecked}
                            onChange={() => handleCityChange({ CITY_ID: city.CITY_ID, REGION_ID: city.REGION_ID })}
                          />
                          <label htmlFor={`mobile-city-${city.CITY_ID}`}>
                            {i18n.language === 'ar' ? city["City Ar Name"] : city["City En Name"]}
                            <span className="mobile-filter-option-count">({city.count})</span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="mobile-filters-footer">
                <button className="mobile-filters-clear-btn" onClick={() => {
                  setSelectedCities([]);
                  setSearchParams((params) => {
                    const newParams = new URLSearchParams(params);
                    newParams.delete("city");
                    return newParams;
                  });
                }}>
                  {t("search.clear")}
                </button>
                <button className="mobile-filters-apply-btn" onClick={() => setActiveFilterModal(null)}>
                  {t("filters.labels.done")}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* District Filter Modal */}
        {activeFilterModal === 'district' && districts.length > 0 && (
          <div className="mobile-filter-modal-backdrop" onClick={() => setActiveFilterModal(null)}>
            <div className="mobile-filters-modal" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-filters-header">
                <h2>{t("filters.labels.selectDistrict")}</h2>
                <button className="mobile-filters-close-btn" onClick={() => setActiveFilterModal(null)}>
                  <FaTimes />
                </button>
              </div>
              <div className="mobile-filters-body">
                {loadingDistricts ? (
                  <div className="mobile-filter-loading">
                    <div className="mobile-filter-loading-spinner"></div>
                    <span>Loading districts...</span>
                  </div>
                ) : (
                  <div className="mobile-filter-options">
                    {getDistrictsWithCounts.map((district) => {
                      const idsToCheck = district.allDistrictIds || [district.District_ID];
                      const isChecked = selectedDistricts.some((d) => idsToCheck.includes(d.District_ID));
                      return (
                        <div className="mobile-filter-option" key={district.District_ID}>
                          <input
                            type="checkbox"
                            id={`mobile-district-${district.District_ID}`}
                            checked={isChecked}
                            onChange={() => handleDistrictChange({
                              District_ID: district.District_ID,
                              CITY_ID: district.CITY_ID,
                              REGION_ID: district.REGION_ID,
                              allDistrictIds: district.allDistrictIds,
                            })}
                          />
                          <label htmlFor={`mobile-district-${district.District_ID}`}>
                            {i18n.language === 'ar' ? district["District Ar Name"] : district["District En Name"]}
                            <span className="mobile-filter-option-count">({district.count})</span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="mobile-filters-footer">
                <button className="mobile-filters-clear-btn" onClick={() => {
                  setSelectedDistricts([]);
                  setSearchParams((params) => {
                    const newParams = new URLSearchParams(params);
                    newParams.delete("district");
                    return newParams;
                  });
                }}>
                  {t("search.clear")}
                </button>
                <button className="mobile-filters-apply-btn" onClick={() => setActiveFilterModal(null)}>
                  {t("filters.labels.done")}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Featured Ads Filter Modal */}
        {activeFilterModal === 'featuredAds' && (
          <div className="mobile-filter-modal-backdrop" onClick={() => setActiveFilterModal(null)}>
            <div className="mobile-filters-modal" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-filters-header">
                <h2>Featured Ads</h2>
                <button className="mobile-filters-close-btn" onClick={() => setActiveFilterModal(null)}>
                  <FaTimes />
                </button>
              </div>
              <div className="mobile-filters-body">
                <div className="mobile-filter-options">
                  <div className="mobile-filter-option">
                    <input
                      type="checkbox"
                      id="mobile-featured-ads"
                      checked={searchParams.get("featuredAds") === "true"}
                      onChange={(e) => {
                        setSearchParams((params) => {
                          const newParams = new URLSearchParams(params);
                          if (e.target.checked) {
                            newParams.set("featuredAds", "true");
                          } else {
                            newParams.delete("featuredAds");
                          }
                          return newParams;
                        });
                      }}
                    />
                    <label htmlFor="mobile-featured-ads">Show Featured Ads Only</label>
                  </div>
                </div>
              </div>
              <div className="mobile-filters-footer">
                <button className="mobile-filters-clear-btn" onClick={() => {
                  setSearchParams((params) => {
                    const newParams = new URLSearchParams(params);
                    newParams.delete("featuredAds");
                    return newParams;
                  });
                }}>
                  {t("search.clear")}
                </button>
                <button className="mobile-filters-apply-btn" onClick={() => setActiveFilterModal(null)}>
                  {t("filters.labels.done")}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Category-Specific Filter Modals */}
        {Object.entries(currentCategoryFilters.filters || {}).map(([filterKey, filterValue]) => {
          if (activeFilterModal !== filterKey) return null;

          // Known range filters
          const knownRangeFilters = ['price', 'year', 'mileage', 'kilometer', 'kilometers'];

          // Check if it's a range filter (case-insensitive type check or known range filter)
          const isRangeFilter =
            filterValue.type?.toLowerCase() === "range" ||
            knownRangeFilters.includes(filterKey.toLowerCase());

          // Check if it's a checkbox filter or has options array
          const isCheckboxFilter =
            filterValue.type?.toLowerCase() === "checkbox" ||
            (Array.isArray(filterValue.options) && filterValue.options.length > 0);

          return (
            <div key={filterKey} className="mobile-filter-modal-backdrop" onClick={() => setActiveFilterModal(null)}>
              <div className="mobile-filters-modal" onClick={(e) => e.stopPropagation()}>
                <div className="mobile-filters-header">
                  <h2>{filterValue.name || filterKey}</h2>
                  <button className="mobile-filters-close-btn" onClick={() => setActiveFilterModal(null)}>
                    <FaTimes />
                  </button>
                </div>
                <div className="mobile-filters-body">
                  {isRangeFilter ? (
                    <div className="mobile-filter-range">
                      <input
                        type="number"
                        placeholder={t("filters.labels.from")}
                        value={searchParams.get(`from${filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}`) || ""}
                        onChange={(e) => {
                          setSearchParams((params) => {
                            const newParams = new URLSearchParams(params);
                            if (e.target.value) {
                              newParams.set(`from${filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}`, e.target.value);
                            } else {
                              newParams.delete(`from${filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}`);
                            }
                            return newParams;
                          });
                        }}
                      />
                      <span className="mobile-filter-range-separator">-</span>
                      <input
                        type="number"
                        placeholder={t("filters.labels.to")}
                        value={searchParams.get(`to${filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}`) || ""}
                        onChange={(e) => {
                          setSearchParams((params) => {
                            const newParams = new URLSearchParams(params);
                            if (e.target.value) {
                              newParams.set(`to${filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}`, e.target.value);
                            } else {
                              newParams.delete(`to${filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}`);
                            }
                            return newParams;
                          });
                        }}
                      />
                    </div>
                  ) : isCheckboxFilter ? (
                    <div className="mobile-filter-options">
                      {filterValue.options?.map((opt, index) => {
                        const isString = typeof opt === "string";
                        const englishValue = opt.originalValue || (isString ? opt : opt.name || opt);
                        const displayName = isString ? (opt.displayName || opt) : (opt.displayName || opt.name || opt);
                        const isChecked = searchParams.getAll(filterKey).includes(getUrlText(englishValue));

                        // Calculate count for this option
                        const fieldNames =
                          filterKey === "brand" ? ["Brand", "Make", "brand", "manufacturer", "Manufacturer"] :
                          filterKey === "brandModel" ? ["Model", "model"] :
                          filterKey === "transmission" ? ["Transmission"] :
                          filterKey === "fuelType" ? ["Fueltype", "FuelType"] :
                          filterKey === "bodyType" ? ["BodyType", "bodyType"] :
                          filterKey === "exteriorColor" ? ["Color", "ExteriorColor"] :
                          filterKey === "interiorColor" ? ["InteriorColor"] :
                          filterKey === "sellerType" ? ["SellerType", "sellerType"] :
                          filterKey === "paymentMethod" ? ["PaymentMethod"] :
                          filterKey === "regionalSpec" ? ["RegionalSpec"] :
                          filterKey === "insurance" ? ["Insurance"] :
                          filterKey === "addType" ? ["Purpose", "AdType"] :
                          filterKey === "additionalFeatures" ? ["AdditionalFeatures", "Features"] :
                          filterKey === "noOfDoors" ? ["NumberofDoors", "NumberOfDoors", "Doors"] :
                          filterKey === "seatingCapacity" ? ["SeatingCapacity"] :
                          filterKey === "condition" ? ["Condition", "condition"] :
                          filterKey === "age" ? ["Age", "age"] :
                          filterKey === "frequency" ? ["Frequency", "frequency"] :
                          filterKey === "residenceType" ? ["ResidenceType", "residenceType"] :
                          filterKey === "noOfRooms" ? ["Bedroom", "NumberofRooms", "NumberOfRooms", "noOfRooms"] :
                          filterKey === "noOfBathrooms" ? ["bathrooms", "NumberofBathrooms", "NumberOfBathrooms", "noOfBathrooms"] :
                          filterKey === "area" ? ["Area", "area"] :
                          filterKey === "furnished" ? ["Furnished", "furnished"] :
                          filterKey === "licenseNumber" ? ["LicenseNumber", "licenseNumber", "LicenceNumber"] :
                          filterKey === "streetWidth" ? ["streetWidth", "StreetWidth"] :
                          filterKey === "floor" ? ["Floor", "floor"] :
                          filterKey === "amenities" ? ["Amenities", "amenities"] :
                          filterKey === "propertyAge" ? ["PropertyAge", "propertyAge"] :
                          filterKey === "facade" ? ["Facade", "facade"] :
                          [filterKey.charAt(0).toUpperCase() + filterKey.slice(1), filterKey, filterKey.toUpperCase()];

                        const optionCount = getCountForOption(fieldNames, englishValue);

                        return (
                          <div className="mobile-filter-option" key={`${filterKey}-${index}`}>
                            <input
                              type="checkbox"
                              id={`mobile-${filterKey}-${index}`}
                              checked={isChecked}
                              onChange={(e) => handleFiltersChange(e, "multiple")}
                              name={filterKey}
                              value={getUrlText(englishValue)}
                            />
                            <label htmlFor={`mobile-${filterKey}-${index}`}>
                              {displayName}
                              <span className="mobile-filter-option-count">({optionCount})</span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="mobile-filter-options">
                      <p style={{ color: "#999", textAlign: "center", padding: "20px" }}>
                        No options available
                      </p>
                    </div>
                  )}
                </div>
                <div className="mobile-filters-footer">
                  <button className="mobile-filters-clear-btn" onClick={() => {
                    setSearchParams((params) => {
                      const newParams = new URLSearchParams(params);
                      if (isRangeFilter) {
                        newParams.delete(`from${filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}`);
                        newParams.delete(`to${filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}`);
                      } else {
                        newParams.delete(filterKey);
                      }
                      return newParams;
                    });
                  }}>
                    {t("search.clear")}
                  </button>
                  <button className="mobile-filters-apply-btn" onClick={() => setActiveFilterModal(null)}>
                    {t("filters.labels.done")}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <Container
          className="parent-main category"
          style={{
            color: "black",
          marginTop: window.innerWidth < 990 ? "1rem" : "12rem",
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
              marginTop: window.innerWidth < 768 ? "-17px" : "15px",
              marginBottom: "10px",
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

            {/* Nested Subcategory Breadcrumb */}
            {(searchParams.get("nestedsubcategory") || searchParams.get("nestedSubCategory")) && (
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
                  {getTextFromURL(searchParams.get("nestedsubcategory") || searchParams.get("nestedSubCategory"))}
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
                                    // Check if any of the district IDs are selected
                                    const idsToCheck = district.allDistrictIds || [district.District_ID];
                                    const isChecked = selectedDistricts.some((d) =>
                                      idsToCheck.includes(d.District_ID)
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
                                              allDistrictIds: district.allDistrictIds,
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
                                                // Check if any of the district IDs are selected
                                                const idsToCheck = district.allDistrictIds || [district.District_ID];
                                                const isChecked = selectedDistricts.some((d) =>
                                                  idsToCheck.includes(d.District_ID)
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
                                                            allDistrictIds: district.allDistrictIds,
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

            <Col xs={12} lg={9}>
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
                      <div className="d-flex align-items-center justify-content-center my-4 search-pagination">
                        <Button
                          variant="#2d4495"
                          className="d-flex align-items-center mx-2 pagination-prev-btn"
                          disabled={currentPage === 1}
                          onClick={() => handlePageChange(currentPage - 1)}
                          style={{
                            backgroundColor: "#2d4495",
                            color: "white",
                            border: "none",
                            transition: "none",
                          }}
                        >
                          <FaArrowLeft className="me-1" /> <span className="pagination-text">{t("pagination.previous")}</span>
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
                          className="d-flex align-items-center mx-2 pagination-next-btn"
                          disabled={currentPage === totalPages}
                          onClick={() => handlePageChange(currentPage + 1)}
                          style={{
                            backgroundColor: "#2d4495",
                            color: "white",
                            border: "none",
                            transition: "none",
                          }}
                        >
                          <span className="pagination-text">{t("pagination.next")}</span> <FaArrowRight className="ms-1" />
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
