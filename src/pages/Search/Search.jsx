import React, { useEffect, useState, useRef } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category")
    ? searchParams.get("category")
    : "";

  // Map category parameter to display name
  const categoryMap = {
    motors: "Motors",
    automotive: "Motors",
    electronics: "Electronics",
    "fashion-style": "Fashion Style",
    "home-and-furniture": "Home & Furniture",
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

  const categoryDisplayName = category
    ? categoryMap[category.toLowerCase()]
    : "";

  let currentCategoryFilters =
    data.find((page) => page.path === `/${category}`) ?? "";
  if (!currentCategoryFilters && categoryDisplayName) {
    // Create a temporary filter object with the category name
    currentCategoryFilters = {
      name: categoryDisplayName,
      path: `/search?category=${category}`,
      filters: data.find((page) => page.path === `/search`)?.filters || {},
    };
  } else if (!currentCategoryFilters) {
    currentCategoryFilters = data.find((page) => page.path === `/search`);
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
  useEffect(() => {
    const urlSearchQuery = searchParams.get("q") || "";
    if (urlSearchQuery !== searchKeyword) {
      setSearchKeyword(urlSearchQuery);
    }
  }, [searchParams]);

  const getUrlText = (text) => {
    return text
      .trim()
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const getTextFromURL = (text) => {
    return text
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

  // Location filter states
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);

  // Modal states
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [showDistrictModal, setShowDistrictModal] = useState(false);
  const [searchTermRegion, setSearchTermRegion] = useState("");
  const [searchTermCity, setSearchTermCity] = useState("");
  const [searchTermDistrict, setSearchTermDistrict] = useState("");

  // Brand Model states
  const [showBrandModelModal, setShowBrandModelModal] = useState(false);
  const [searchTermBrandModel, setSearchTermBrandModel] = useState("");
  const [availableBrandModels, setAvailableBrandModels] = useState([]);

  // Brand states
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [searchTermBrand, setSearchTermBrand] = useState("");

  // Ref to track scroll position
  const filterSectionRef = useRef(null);

  const parms = useLocation().pathname;
  const navigate = useNavigate();

  // Fetch cities when regions are selected
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

  // Fetch districts when cities are selected
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

  // Initialize location filters from URL parameters
  useEffect(() => {
    const regionParams = searchParams.getAll("region");
    const cityParams = searchParams.getAll("city");
    const districtParams = searchParams.getAll("district");

    if (regionParams.length > 0) setSelectedRegions(regionParams);
    if (cityParams.length > 0) {
      // Parse city params to include REGION_ID
      const cityObjs = cityParams.map((cityId) => ({
        CITY_ID: cityId,
        REGION_ID: "",
      }));
      setSelectedCities(cityObjs);
    }
    if (districtParams.length > 0) {
      // Parse district params
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
        console.log("Starting to fetch ads from Firebase collections...");

        const collections = [
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
          { name: "banneradsimg", category: null }, // General banner ads for all categories
        ];

        let allAdsArray = [];
        for (const col of collections) {
          try {
            const adsCollection = collection(db, col.name);
            const adsSnapshot = await getDocs(adsCollection);
            const adsList = adsSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              category:
                doc.data().category || doc.data().ModalCategory || col.category,
              ModalCategory:
                doc.data().ModalCategory || doc.data().category || col.category,
              collectionSource: col.name,
            }));
            console.log(`Fetched ${adsList.length} ads from ${col.name}`);
            allAdsArray = [...allAdsArray, ...adsList];
          } catch (error) {
            console.error(`Error fetching from ${col.name}:`, error);
          }
        }

        if (allAdsArray.length > 0) {
          const uniqueCategories = [
            ...new Set(allAdsArray.map((ad) => ad.category)),
          ];
          console.log("ALL unique category values:", uniqueCategories);
        }

        // Ensure all ads have Purpose field with default value "Sell" if not present
        const adsWithPurpose = allAdsArray.map((ad) => {
          if (!ad.Purpose && !ad.AdType) {
            return { ...ad, Purpose: "Sell" };
          }
          return ad;
        });

        console.log(`📊 Total ads loaded: ${adsWithPurpose.length}`);
        console.log(`📊 Ads with Purpose field:`, adsWithPurpose.filter(ad => ad.Purpose).length);
        console.log(`📊 Ads with AdType field:`, adsWithPurpose.filter(ad => ad.AdType).length);
        console.log(`📊 Sample ads:`, adsWithPurpose.slice(0, 3).map(ad => ({ id: ad.id, Purpose: ad.Purpose, AdType: ad.AdType, category: ad.category })));
        
        // Log unique Purpose values to see what we're dealing with
        const uniquePurposes = [...new Set(adsWithPurpose.map(ad => ad.Purpose).filter(p => p))];
        const uniqueAdTypes = [...new Set(adsWithPurpose.map(ad => ad.AdType).filter(a => a))];
        console.log(`📊 Unique Purpose values in database:`, uniquePurposes);
        console.log(`📊 Unique AdType values in database:`, uniqueAdTypes);

        setAllAds(adsWithPurpose);
        setFilteredAds(adsWithPurpose);
      } catch (error) {
        alert("Failed to load ads: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllAds();
  }, []);

  useEffect(() => {
    if (allAds.length === 0) {
      setFilteredAds([]);
      return;
    }

    let filtered = [...allAds];

    if (category) {
      const categoryValue = categoryMap[category.toLowerCase()];
      console.log("🔍 Filtering by category:", categoryValue);

      if (categoryValue) {
        filtered = filtered.filter((ad) => {
          // Handle category name variations and typos
          const categoryVariations = [categoryValue];
          if (categoryValue === "Sport & Game") {
            categoryVariations.push("Sports & Game");
          }
          if (categoryValue === "Home & Furniture") {
            categoryVariations.push("Home & Furnituer"); // Handle typo in add-listing form
          }

          const matches = categoryVariations.some(
            (variation) =>
              ad.category === variation || ad.ModalCategory === variation
          );
          return matches;
        });
      }
    }
    // Handle multiple subcategories
    const subCategoryParams = searchParams.getAll("subcategory");
    if (subCategoryParams.length > 0) {
      filtered = filtered.filter((ad) => {
        const adSubCategory = getUrlText(ad.SubCategory || "");
        return subCategoryParams.includes(adSubCategory);
      });
      console.log("After subcategory filter:", filtered.length);
    }
    const nestedSubCategoryParam = searchParams.get("nestedSubCategory");
    if (nestedSubCategoryParam) {
      filtered = filtered.filter((ad) => {
        const adNestedSubCategory = getUrlText(ad.NestedSubCategory || "");
        return adNestedSubCategory === nestedSubCategoryParam;
      });
      console.log("After nested subcategory filter:", filtered.length);
    }
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase();
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
      console.log("After featured ads filter:", filtered.length);
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
      // Real Estate filters
      "frequency",
      "residenceType",
      "noOfRooms", // data.js uses "noOfRooms" not "numberOfRooms"
      "noOfBathrooms", // data.js uses "noOfBathrooms" not "numberOfBathrooms"
      "area",
      "furnished",
      "licenseNumber",
      "streetWidth",
      "floor",
      "amenities",
      "propertyAge",
      "facade",
    ];

    // Map filter parameter names to actual Firebase field names
    const fieldNameMap = {
      brand: ["Brand", "Make", "brand", "manufacturer", "Manufacturer"], // Add-listing uses "Brand", Cars uses "Make"
      brandModel: ["Model", "model"],
      transmission: ["Transmission"],
      fuelType: ["Fueltype", "FuelType"], // Add-listing uses "Fueltype", Cars.jsx uses "FuelType"
      bodyType: ["BodyType", "bodyType"],
      exteriorColor: ["Color", "ExteriorColor"],
      interiorColor: ["InteriorColor"],
      sellerType: ["SellerType", "sellerType"],
      paymentMethod: ["PaymentMethod"],
      regionalSpec: ["RegionalSpec"],
      insurance: ["Insurance"],
      addType: ["Purpose", "AdType"], // Purpose & AdType field contain "Rent", "Sell", "Wanted"
      additionalFeatures: ["AdditionalFeatures", "Features"],
      noOfDoors: ["NumberofDoors", "NumberOfDoors", "Doors"], // Add-listing uses "NumberofDoors", Cars.jsx uses "NumberOfDoors"
      seatingCapacity: ["SeatingCapacity"],
      condition: ["Condition", "condition"],
      age: ["Age", "age"], // Pet & Animals age filter
      // Real Estate field mappings
      frequency: ["Frequency", "frequency"],
      residenceType: ["ResidenceType", "residenceType"],
      noOfRooms: ["Bedroom", "NumberofRooms", "NumberOfRooms", "noOfRooms"], // Real Estate uses "Bedroom" in DB
      noOfBathrooms: [
        "bathrooms",
        "NumberofBathrooms",
        "NumberOfBathrooms",
        "noOfBathrooms",
      ], // Real Estate uses "bathrooms" in DB
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
        console.log(`🔍 Filtering by ${param}:`, paramValues);

        filtered = filtered.filter((ad) => {
          // Get possible field names from the map, or use default case variations
          const possibleFieldNames = fieldNameMap[param] || [
            param.charAt(0).toUpperCase() + param.slice(1),
            param,
            param.toUpperCase(),
          ];

          // Try to find the field value using any of the possible field names
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

          // Check if adValue is falsy or an empty array
          if (!adValue || (Array.isArray(adValue) && adValue.length === 0)) {
            return false;
          }

          // Handle array fields (like additionalFeatures)
          if (Array.isArray(adValue)) {
            const matches = paramValues.some((pv) =>
              adValue.some(
                (av) =>
                  getUrlText(av) === pv || av.toLowerCase() === pv.toLowerCase()
              )
            );
            if (matches) {
              console.log(`Ad ${ad.id} matches ${param}: ${adValue}`);
            }
            return matches;
          }

          // Handle string/number fields
          const matches = paramValues.some(
            (pv) =>
              getUrlText(adValue) === pv ||
              adValue.toLowerCase() === pv.toLowerCase()
          );

          if (matches) {
            console.log(`Ad ${ad.id} matches ${param}: ${adValue}`);
          }

          return matches;
        });
        console.log(`After ${param} filter:`, filtered.length);
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
      console.log("After year filter:", filtered.length);
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
      console.log("After mileage filter:", filtered.length);
    }

    // Location filters
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
      console.log("After region filter:", filtered.length);
    }

    if (cityParams.length > 0) {
      filtered = filtered.filter((ad) => {
        return cityParams.some(
          (cityId) =>
            String(ad.CITY_ID) === String(cityId) ||
            String(ad.cityId) === String(cityId)
        );
      });
      console.log("After city filter:", filtered.length);
    }

    if (districtParams.length > 0) {
      filtered = filtered.filter((ad) => {
        return districtParams.some(
          (districtId) =>
            String(ad.District_ID) === String(districtId) ||
            String(ad.districtId) === String(districtId)
        );
      });
      console.log("After district filter:", filtered.length);
    }

    console.log("Final filtered count:", filtered.length);
    setCurrentPage(1);
    setFilteredAds(filtered);
  }, [allAds, category, subCategoryParam, searchParams, searchKeyword]);
  const toggleBookmark = async (adId) => {
    if (!currentUser) {
      alert("Please login to bookmark ads");
      return;
    }

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const isBookmarked = bookmarkedAds.includes(adId);

      if (isBookmarked) {
        await updateDoc(userDocRef, {
          heartedby: arrayRemove(adId),
        });
        setBookmarkedAds(bookmarkedAds.filter((id) => id !== adId));
        console.log("Removed bookmark for ad:", adId);
      } else {
        await updateDoc(userDocRef, {
          heartedby: arrayUnion(adId),
        });
        setBookmarkedAds([...bookmarkedAds, adId]);
        console.log("Added bookmark for ad:", adId);
      }
      const ad = allAds.find((a) => a.id === adId);
      const collectionName = ad?.collectionSource;
      if (collectionName) {
        try {
          const adDocRef = doc(db, collectionName, adId);
          const adDocSnap = await getDoc(adDocRef);

          if (adDocSnap.exists()) {
            if (isBookmarked) {
              await updateDoc(adDocRef, {
                heartedby: arrayRemove(currentUser.uid),
              });
            } else {
              await updateDoc(adDocRef, {
                heartedby: arrayUnion(currentUser.uid),
              });
            }
            console.log(`Updated ad document in ${collectionName} collection`);
            setAllAds((prevAds) =>
              prevAds.map((a) =>
                a.id === adId
                  ? {
                      ...a,
                      heartedby: isBookmarked
                        ? (a.heartedby || []).filter(
                            (id) => id !== currentUser.uid
                          )
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
                        ? (a.heartedby || []).filter(
                            (id) => id !== currentUser.uid
                          )
                        : [...(a.heartedby || []), currentUser.uid],
                    }
                  : a
              )
            );
          } else {
            console.log(
              `Ad document not found in ${collectionName}, skipping ad update`
            );
          }
        } catch (adError) {
          console.log("Could not update ad document:", adError.message);
        }
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      alert("Failed to update bookmark. Please try again.");
    }
  };

  // Sorting logic
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

  // Function to count occurrences of a value in filtered ads
  const getCountForOption = (fieldNames, value) => {
    if (!Array.isArray(fieldNames)) {
      fieldNames = [fieldNames];
    }

    // Convert value to string for comparison
    const stringValue = String(value).trim();
    
    console.log(`🔍 getCountForOption called: value="${value}", fieldNames=${JSON.stringify(fieldNames)}, stringValue="${stringValue}"`);

    const matchingAds = allAds.filter((ad) => {
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
        const urlMatch = getUrlText(stringAdValue) === getUrlText(stringValue);
        const lowerMatch = stringAdValue.toLowerCase() === stringValue.toLowerCase();
        
        if (urlMatch || lowerMatch) {
          console.log(`   ✅ Found match: Field="${fieldName}", DBValue="${adValue}", SearchFor="${stringValue}", urlMatch=${urlMatch}, lowerMatch=${lowerMatch}`);
        }
        
        return urlMatch || lowerMatch;
      });
    });
    
    console.log(`🔍 Result: Found ${matchingAds.length} matching ads for "${value}"`);
    
    return matchingAds.length;
  };

  // Function to count regions with sorting
  const getRegionsWithCounts = () => {
    return saudiRegions
      .map((region) => ({
        ...region,
        count: getCountForOption(["REGION_ID", "regionId"], region.id),
      }))
      .sort((a, b) => b.count - a.count);
  };

  // Function to count cities with sorting
  const getCitiesWithCounts = () => {
    return cities
      .map((city) => ({
        ...city,
        count: getCountForOption(["CITY_ID", "cityId"], city.CITY_ID),
      }))
      .sort((a, b) => b.count - a.count);
  };

  // Function to count districts with sorting
  const getDistrictsWithCounts = () => {
    return districts
      .map((district) => ({
        ...district,
        count: getCountForOption(
          ["District_ID", "districtId"],
          district.District_ID
        ),
      }))
      .sort((a, b) => b.count - a.count);
  };

  // Function to get brands with counts
  const getBrandsWithCounts = () => {
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
  };

  // Function to get models with counts
  const getModelsWithCounts = () => {
    return availableBrandModels
      .map((model) => ({
        name: model,
        count: getCountForOption(["Model", "model"], model),
      }))
      .sort((a, b) => b.count - a.count);
  };

  // Pagination logic
  const sortedAds = sortAds(filteredAds, sortBy);
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = sortedAds.slice(indexOfFirstAd, indexOfLastAd);
  const totalPages = Math.ceil(filteredAds.length / adsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle search keyword
  const handleSearchKeyword = (e) => {
    e.preventDefault();
    // Search is already reactive via useEffect
  };

  // const [ImageURL, setImageURL] = useState(""); // ✅ Define the state

  // const getImageURL = async () => {
  //   const imageRef = ref(storage, "blank-profile-picture.webp"); // image path inside storage

  //   try {
  //     const url = await getDownloadURL(imageRef);
  //     console.log("Image URL:", url);

  //     return url;
  //   } catch (error) {
  //     console.error("Error fetching image URL:", error);
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   getImageURL().then((url) => {
  //     if (url) {
  //       setImageURL(url);
  //     }
  //   });
  // }, []);

  // handle change for subcategory and nested subcategory
  const handleSubcategoryChange = (e, selectType = "multiple") => {
    e.preventDefault?.(); // Prevent default behavior
    const { name, value, checked } = e.target;
    console.log("subcaegory name...", name);
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
    e.preventDefault?.(); // Prevent default behavior
    const { name, value, checked, type } = e.target || e;
    console.log("Name: ", name, "SelectType", selectType, "value: ", value);
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
    console.log("Name: ", name, "SelectType", selectType, "value: ", value);
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

  // Location filter handlers
  const handleRegionChange = (regionId) => {
    setSelectedRegions((prev) => {
      const isSelected = prev.includes(regionId);
      const newRegions = isSelected
        ? prev.filter((id) => id !== regionId)
        : [...prev, regionId];

      // Update URL params
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

      // Update URL params
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

      // Update URL params
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

  // Update available brand models when brand selection changes
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

  // Prevent scroll jumping when filters change
  const scrollPositionRef = useRef(0);
  const windowScrollRef = useRef(0);

  useEffect(() => {
    // Track both filter section scroll and window scroll
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
    // Restore scroll positions after state updates
    requestAnimationFrame(() => {
      // Restore filter section scroll
      if (filterSectionRef.current && scrollPositionRef.current > 0) {
        filterSectionRef.current.scrollTop = scrollPositionRef.current;
      }

      // Restore window scroll
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
              {currentCategoryFilters.name}
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
                  Show Results by: <strong>{filteredAds.length}</strong>
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
                          Search by Keywords
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
                          Clear
                        </button>
                      </div>

                      <div className="position-relative mt-2">
                        <div onSubmit={handleSearchKeyword}>
                          <input
                            type="search"
                            placeholder="Search by title, make, model..."
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
                      <Accordion.Header>Category</Accordion.Header>
                      <Accordion.Body>
                        <div
                          style={{
                            maxWidth: "300px",
                            margin: "20px",
                          }}
                        >
                          {categoryData.options.map((cat) => (
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
                                  {cat}
                                </label>
                              </div>
                            </Form.Group>
                          ))}
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <HorizantalLine />

                  {/* subcategories */}
                  {currentCategoryFilters.subcategories &&
                    currentCategoryFilters.subcategories.length > 0 && (
                      <>
                        {" "}
                        <Accordion className="mt-3">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>Sub Categories</Accordion.Header>
                            <Accordion.Body>
                              <div
                                style={{ maxWidth: "300px", margin: "20px" }}
                              >
                                {currentCategoryFilters.subcategories.map(
                                  (subcat) => {
                                    const urlSubCategory = getUrlText(
                                      subcat.name
                                    );
                                    const selectedSubCategories =
                                      searchParams.getAll("subcategory");
                                    const isSelected =
                                      selectedSubCategories.includes(
                                        urlSubCategory
                                      );
                                    return (
                                      <Form.Group key={subcat.name}>
                                        <div className="form-check mb-2">
                                          <input
                                            id={subcat.name}
                                            name="subcategory"
                                            className="form-check-input"
                                            type="checkbox"
                                            value={subcat.name}
                                            onChange={handleSubcategoryChange}
                                            checked={isSelected}
                                            style={{ cursor: "pointer" }}
                                          />
                                          <label
                                            htmlFor={subcat.name}
                                            className="form-check-label"
                                            style={{ cursor: "pointer" }}
                                          >
                                            {subcat.name}
                                          </label>
                                        </div>

                                        {/* Show nested subcategories only when parent is selected */}
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
                                                Nested Categories
                                              </Form.Label>
                                              {subcat.nestedSubCategories.map(
                                                (nestedSubCat) => {
                                                  const params =
                                                    searchParams.getAll(
                                                      "nestedSubCategory"
                                                    );
                                                  return (
                                                    <div
                                                      key={nestedSubCat.name}
                                                      className="form-check mb-2"
                                                    >
                                                      <input
                                                        id={nestedSubCat.name}
                                                        name="nestedSubCategory"
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={
                                                          nestedSubCat.name
                                                        }
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
                                                                nestedSubCat.name
                                                              )
                                                          )
                                                        }
                                                        style={{
                                                          cursor: "pointer",
                                                        }}
                                                      />

                                                      <label
                                                        htmlFor={
                                                          nestedSubCat.name
                                                        }
                                                        className="form-check-label"
                                                        style={{
                                                          cursor: "pointer",
                                                        }}
                                                      >
                                                        {nestedSubCat.name}
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

                  {/* Region Filter */}
                  <Accordion className="mt-3">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Select Region</Accordion.Header>
                      <Accordion.Body>
                        <Form.Group className="mb-3">
                          <div className="mb-3">
                            {getRegionsWithCounts()
                              .slice(0, 6)
                              .map((region) => {
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
                                      {region.nameEn}{" "}
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
                              Show more choices...
                            </button>

                            {/* Region Modal */}
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
                                        {getRegionsWithCounts()
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
                                                    {region.nameEn} (
                                                    {region.nameAr}){" "}
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

                  {/* City Filter */}
                  <Accordion className="mt-3">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Select City</Accordion.Header>
                      <Accordion.Body>
                        <Form.Group className="mb-3">
                          <div className="grid grid-cols-1 gap-2">
                            {loadingCities ? (
                              <p style={{ textAlign: "center", color: "#666" }}>
                                Loading cities...
                              </p>
                            ) : (
                              <>
                                {getCitiesWithCounts()
                                  .slice(0, 6)
                                  .map((city) => {
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
                                          {city["City En Name"]} (
                                          {city["City Ar Name"]}){" "}
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
                                    Show more choices...
                                  </button>
                                )}
                              </>
                            )}

                            {/* City Modal */}
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
                                          {getCitiesWithCounts()
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
                                                      {city["City En Name"]} (
                                                      {city["City Ar Name"]}){" "}
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

                  {/* District Filter */}
                  <Accordion className="mt-3">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Select District</Accordion.Header>
                      <Accordion.Body>
                        <Form.Group className="mb-3">
                          <div className="grid grid-cols-1 gap-2">
                            {loadingDistricts ? (
                              <p style={{ textAlign: "center", color: "#666" }}>
                                Loading districts...
                              </p>
                            ) : (
                              <>
                                {getDistrictsWithCounts()
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
                                          {district["District En Name"]} (
                                          {district["District Ar Name"]}){" "}
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
                                    More choices...
                                  </button>
                                )}
                              </>
                            )}

                            {/* District Modal */}
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
                                            {getDistrictsWithCounts()
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
                                                        {
                                                          district[
                                                            "District En Name"
                                                          ]
                                                        }{" "}
                                                        (
                                                        {
                                                          district[
                                                            "District Ar Name"
                                                          ]
                                                        }
                                                        ){" "}
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

                  {/* Brand Modal - Shared modal for all brand selections */}
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
                            <h5 className="modal-title">Select More Brands</h5>
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
                                placeholder="Search brands..."
                                value={searchTermBrand}
                                onChange={(e) =>
                                  setSearchTermBrand(e.target.value)
                                }
                              />
                            </div>
                            <div className="row g-2">
                              {getBrandsWithCounts()
                                .filter((brandOption) => {
                                  const label = brandOption.name || brandOption;
                                  return label
                                    .toLowerCase()
                                    .includes(searchTermBrand.toLowerCase());
                                })
                                .map((brandOption, index) => {
                                  const label = brandOption.name || brandOption;
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
                                          {label}{" "}
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
                              {searchParams.getAll("brand").length} brand(s)
                              selected
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
                                Clear Selection
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary px-4"
                                onClick={() => setShowBrandModal(false)}
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Brand Model Modal - Shared modal for all brand model selections */}
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
                              {getModelsWithCounts()
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

                  {/* filters */}
                  {Object.entries(currentCategoryFilters.filters || {}).map(
                    ([filterKey, filterValue], filterIndex) => (
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
                                      ? getBrandsWithCounts()
                                      : filterValue.options
                                    )
                                      .slice(
                                        0,
                                        filterKey === "brand"
                                          ? 5
                                          : filterValue.options.length
                                      )
                                      .map((value, valueIndex) => {
                                        const id =
                                          value.name &&
                                          typeof value.name === "string"
                                            ? value.name.toLowerCase()
                                            : typeof value === "string"
                                            ? value.toLowerCase()
                                            : "";

                                        const label = value.name
                                          ? value.name
                                          : value;

                                        const count =
                                          value.count !== undefined
                                            ? value.count
                                            : getCountForOption(
                                                filterKey === "brand"
                                                  ? ["Brand", "Make"]
                                                  : filterKey === "condition"
                                                  ? ["Condition"]
                                                  : filterKey === "transmission"
                                                  ? ["Transmission"]
                                                  : filterKey === "fuelType"
                                                  ? ["Fueltype", "FuelType"]
                                                  : filterKey === "bodyType"
                                                  ? ["BodyType"]
                                                  : filterKey ===
                                                    "exteriorColor"
                                                  ? ["Color", "ExteriorColor"]
                                                  : filterKey ===
                                                    "interiorColor"
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
                                                  : filterKey ===
                                                    "paymentMethod"
                                                  ? ["PaymentMethod"]
                                                  : filterKey === "addType"
                                                  ? ["Purpose", "AdType"]
                                                  : label
                                              );

                                        if (filterKey === "addType") {
                                          console.log(`🎯 addType filter: label="${label}", count=${count}, allAds.length=${allAds.length}`);
                                        }

                                        const paramValues =
                                          searchParams.getAll(filterKey);

                                        const checkedFilter =
                                          filterValue.select === "multiple"
                                            ? paramValues &&
                                              paramValues.find(
                                                (val) =>
                                                  val === getUrlText(label)
                                              )
                                            : searchParams.get(filterKey) ===
                                              getUrlText(label);
                                        return (
                                          <Form.Group
                                            key={`${filterKey}-${id}-${valueIndex}`}
                                          >
                                            <div className="form-check mb-2">
                                              <input
                                                id={label}
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
                                                          getUrlText(label)
                                                      )
                                                    : searchParams.get(
                                                        filterKey
                                                      ) === getUrlText(label)
                                                }
                                                value={label}
                                                onChange={(e) =>
                                                  handleFiltersChange(
                                                    e,
                                                    filterValue.select
                                                  )
                                                }
                                                style={{ cursor: "pointer" }}
                                              />
                                              <label
                                                htmlFor={label}
                                                className="form-check-label"
                                                style={{ cursor: "pointer" }}
                                              >
                                                {label}{" "}
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
                                          Show more choices...
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
                                      onChange={handleFiltersChange}
                                      style={{ cursor: "pointer" }}
                                    >
                                      {filterValue.options.map((option) => (
                                        <option
                                          selected={
                                            searchParams.get(filterKey) ===
                                            getUrlText(option)
                                          }
                                          key={option}
                                          value={option}
                                          style={{ cursor: "pointer" }}
                                        >
                                          {option}
                                        </option>
                                      ))}
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
                                              // Only accept numeric values for Price, Year, and Mileage
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
                                                // Year only accepts integers, no decimals
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
                                              // Only accept numeric values for Price, Year, and Mileage
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
                                                // Year only accepts integers, no decimals
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

                        {/* Show Brand Model filter right after Brand filter */}
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
                                        {getModelsWithCounts()
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
                    )
                  )}
                </Form>
              </div>
            </Col>

            {/* Results Section */}
            <Col lg={9}>
              <div className="results_section">
                {/* Loading State */}
                {loading && (
                  <div
                    className="text-center"
                    style={{
                      padding: "50px 20px",
                      fontSize: "18px",
                      color: "#2D4495",
                      fontWeight: "500",
                    }}
                  >
                    Loading...
                  </div>
                )}

                {/* No Results */}
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

                {/* Results */}
                {!loading && currentAds.length > 0 && (
                  <>
                    <div
                      style={{
                        backgroundColor: "white",
                        borderRadius: "12px",
                        padding: "10px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      {/* Sort Dropdown inside cards container */}
                      <Row
                        className="mb-3"
                        style={{ marginTop: "10px", marginRight: "1px" }}
                      >
                        <Col xs={12} sm={6} md={4} className="ms-auto">
                          <Form.Select
                            aria-label="Sort options"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                          >
                            <option value="Sort by: Most Relevant">
                              Sort by: Most Relevant
                            </option>
                            <option value="Price: Low to High">
                              Price: Low to High
                            </option>
                            <option value="Price: High to Low">
                              Price: High to Low
                            </option>
                          </Form.Select>
                        </Col>
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
                          <FaArrowLeft className="me-1" /> Previous
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
                          Next <FaArrowRight className="ms-1" />
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
