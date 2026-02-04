import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./../../Firebase/FirebaseConfig";
import { data as categoriesData } from "./../../../utils/data";
import { useTranslation } from "react-i18next";
import { useLocalizedText } from "../../../utils/getLocalizedText";
import { getTranslatedData } from "../../../utils/translateData";

const HeaderLower = () => {
  const { t } = useTranslation();
  const { getText } = useLocalizedText();
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Helper function to translate subcategory names
  const translateSubcategory = (name) => {
    if (!name) return "";
    const subcategoryTranslations = {
      // Motors subcategories
      "Cars For Sale": t("subcategories.motors.carsForSale"),
      "Car Rental": t("subcategories.motors.carRental"),
      "Plates Number": t("subcategories.motors.platesNumber"),
      "Spare Parts": t("subcategories.motors.spareParts"),
      "Accessories": t("subcategories.motors.accessories"),
      "Wheels & Rims": t("subcategories.motors.wheelsAndRims"),
      "Trucks & Heavy Machinery": t("subcategories.motors.trucksAndHeavyMachinery"),
      "Tshaleeh": t("subcategories.motors.tshaleeh"),
      "Boats & Jet Ski": t("subcategories.motors.boatsAndJetski"),
      "Classic Cars": t("subcategories.motors.classicCars"),
      // Home & Furniture subcategories
      "Outdoor Furniture": t("subcategories.homeFurniture.outdoorFurniture"),
      "Majlis & Sofas": t("subcategories.homeFurniture.majlisAndSofas"),
      "Cabinets & Wardrobes": t("subcategories.homeFurniture.cabinetsAndWardrobes"),
      "Beds & Mattresses": t("subcategories.homeFurniture.bedsAndMattresses"),
      "Tables & Chairs": t("subcategories.homeFurniture.tablesAndChairs"),
      "Kitchens": t("subcategories.homeFurniture.kitchens"),
      "Bathrooms": t("subcategories.homeFurniture.bathrooms"),
      "Carpets": t("subcategories.homeFurniture.carpets"),
      "Curtains": t("subcategories.homeFurniture.curtains"),
      "Decoration & Accessories": t("subcategories.homeFurniture.decorationAndAccessories"),
      "Lighting": t("subcategories.homeFurniture.lighting"),
      "Household Items": t("subcategories.homeFurniture.householdItems"),
      "Garden - Plants": t("subcategories.homeFurniture.gardenPlants"),
      "Office Furniture": t("subcategories.homeFurniture.officeFurniture"),
      "Doors - Windows - Aluminium": t("subcategories.homeFurniture.doorsWindowsAluminium"),
      "Tiles & Flooring": t("subcategories.homeFurniture.tilesAndFlooring"),
      // Electronics subcategories
      "Mobile Phones": t("subcategories.electronics.mobilePhones"),
      "Tablet Devices": t("subcategories.electronics.tabletDevices"),
      "Computers & Laptops": t("subcategories.electronics.computersAndLaptops"),
      "Video Games": t("subcategories.electronics.videoGames"),
      "Television & Audio System": t("subcategories.electronics.televisionAndAudioSystem"),
      "Accounts & Subscriptions": t("subcategories.electronics.accountsAndSubscriptions"),
      "Special Number": t("subcategories.electronics.specialNumber"),
      "Home & Kitchen Appliance": t("subcategories.electronics.homeAndKitchenAppliance"),
      "Motors & Generators": t("subcategories.electronics.motorsAndGenerators"),
      "Cameras": t("subcategories.electronics.cameras"),
      "Networking Devices": t("subcategories.electronics.networkingDevices"),
      "Screens & Projectors": t("subcategories.electronics.screensAndProjectors"),
      "Printer & Scanner": t("subcategories.electronics.printerAndScanner"),
      "Computer Accessories": t("subcategories.electronics.computerAccessories"),
      // Fashion subcategories
      "Women's Fashion": t("subcategories.fashion.womensFashion"),
      "Men's Fashion": t("subcategories.fashion.mensFashion"),
      "Children's Clothing & Accessories": t("subcategories.fashion.childrensClothing"),
      "Women's Accessories & Jewelry": t("subcategories.fashion.womensAccessories"),
      "Women's Blouses & T-Shirts": t("subcategories.fashion.womensBlouses"),
      "Women's Skirts & Trousers": t("subcategories.fashion.womensSkirts"),
      "Women's Jackets": t("subcategories.fashion.womensJackets"),
      "Women's Bags": t("subcategories.fashion.womensBags"),
      "Women's Sportswear": t("subcategories.fashion.womensSportswear"),
      "Kaftans": t("subcategories.fashion.kaftans"),
      "Abayas": t("subcategories.fashion.abayas"),
      "Dresses": t("subcategories.fashion.dresses"),
      "Lingerie": t("subcategories.fashion.lingerie"),
      "Baby Care Products": t("subcategories.fashion.babyCareProducts"),
      "Children's Accessories": t("subcategories.fashion.childrensAccessories"),
      "Toys for Kids": t("subcategories.fashion.toysForKids"),
      "Children's Cribs & Chairs": t("subcategories.fashion.childrensCribs"),
      "Children's Bags": t("subcategories.fashion.childrensBags"),
      "Strollers": t("subcategories.fashion.strollers"),
      "Car Seats for Kids": t("subcategories.fashion.carSeatsForKids"),
      "Watches": t("subcategories.fashionStyle.watches"),
      "Perfumes & Incense": t("subcategories.fashionStyle.perfumesAndIncense"),
      "Sports Equipment": t("subcategories.fashionStyle.sportsEquipment"),
      "Gifts": t("subcategories.fashionStyle.gifts"),
      "Luggage": t("subcategories.fashionStyle.luggage"),
      "Health & Beauty": t("subcategories.fashionStyle.healthAndBeauty"),
      // Job Board subcategories
      "Administrative Jobs": t("subcategories.jobBoard.administrativeJobs"),
      "Fashion & Beauty Jobs": t("subcategories.jobBoard.fashionAndBeautyJobs"),
      "Security & Safety Jobs": t("subcategories.jobBoard.securityAndSafetyJobs"),
      "Teaching Jobs": t("subcategories.jobBoard.teachingJobs"),
      "IT & Design Jobs": t("subcategories.jobBoard.itAndDesignJobs"),
      "Agriculture & Farming Jobs": t("subcategories.jobBoard.agricultureAndFarmingJobs"),
      "Industrial Jobs": t("subcategories.jobBoard.industrialJobs"),
      "Medical & Nursing Jobs": t("subcategories.jobBoard.medicalAndNursingJobs"),
      "Architecture & Construction Jobs": t("subcategories.jobBoard.architectureAndConstructionJobs"),
      "Housekeeping Jobs": t("subcategories.jobBoard.housekeepingJobs"),
      "Restaurant Jobs": t("subcategories.jobBoard.restaurantJobs"),
      // Real Estate subcategories
      "Apartments for Rent": t("subcategories.realEstate.apartmentsForRent"),
      "Apartments for Sale": t("subcategories.realEstate.apartmentsForSale"),
      "Building for Rent": t("subcategories.realEstate.buildingForRent"),
      "Building for Sale": t("subcategories.realEstate.buildingForSale"),
      "Camps for Rent": t("subcategories.realEstate.campsForRent"),
      "Chalets for Sale": t("subcategories.realEstate.chaletsForSale"),
      "Commercial Lands for Sale": t("subcategories.realEstate.commercialLandsForSale"),
      "Compound for Rent": t("subcategories.realEstate.compoundForRent"),
      "Compound for Sale": t("subcategories.realEstate.compoundForSale"),
      "Farm for Rent": t("subcategories.realEstate.farmForRent"),
      "Farms for Sale": t("subcategories.realEstate.farmsForSale"),
      "Floor for Sale": t("subcategories.realEstate.floorForSale"),
      "Floors for Rent": t("subcategories.realEstate.floorsForRent"),
      "Hall for Rent": t("subcategories.realEstate.hallForRent"),
      "Houses for Rent": t("subcategories.realEstate.housesForRent"),
      "Houses for Sale": t("subcategories.realEstate.housesForSale"),
      "Lands for Sale": t("subcategories.realEstate.landsForSale"),
      "Lands for Rent": t("subcategories.realEstate.landsForRent"),
      "Offices for Rent": t("subcategories.realEstate.officesForRent"),
      // Other category subcategories
      "Hunting & Trips": t("subcategories.other.huntingAndTrips"),
      "Gardening & Agriculture": t("subcategories.other.gardeningAndAgriculture"),
      "Parties & Events": t("subcategories.other.partiesAndEvents"),
      "Travel & Tourism": t("subcategories.other.travelAndTourism"),
      "Roommate": t("subcategories.other.roommate"),
      "Books": t("subcategories.other.books"),
      "Business & Industrial": t("subcategories.other.businessAndIndustrial"),
      "Music & Musical Instruments": t("subcategories.other.musicAndMusicalInstruments"),
      "Food & Restaurants": t("subcategories.other.foodAndRestaurants"),
      "Miscellaneous": t("subcategories.other.miscellaneous"),
      "Lost & Found": t("subcategories.other.lostAndFound"),
      "Freebies": t("subcategories.other.freebies"),
      "Free Stuff": t("subcategories.other.freeStuff"),
    };
    return subcategoryTranslations[name] || name;
  };

  // Firebase category data states (now storing full objects with name_en and name_ar)
  const [OurCategoryAutomativeData, setOurCategoryAutomativeData] =
    useState(null);
  const [ElectronicsData, setElectronicsData] = useState(null);
  const [FashionStyleData, setFashionStyleData] = useState(null);
  const [OurCategoryHealthCareData, setOurCategoryHealthCareData] =
    useState(null);
  const [OurCategoryJobBoardData, setOurCategoryJobBoardData] = useState(null);
  const [OurCategoryRealEstateData, setOurCategoryRealEstateData] =
    useState(null);
  const [OurCategoryTravelData, setOurCategoryTravelData] = useState(null);
  const [OurCategorySportGamesData, setOurCategorySportGamesData] =
    useState(null);
  const [OurCategoryPetAnimalsData, setOurCategoryPetAnimalsData] =
    useState(null);
  const [OurCategoryEducationData, setOurCategoryEducationData] =
    useState(null);

  // Function to update mobile state
  const updateIsMobile = () => {
    setIsMobile(window.innerWidth <= 767);
  };

  // Fetch category data from Firebase (with bilingual support)
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const collections = [
          ["OurCategoryAutomativeTitle", setOurCategoryAutomativeData],
          ["ElectronicsTitle", setElectronicsData],
          ["FashionStyleTitle", setFashionStyleData],
          ["OurCategoryHealthCareTitle", setOurCategoryHealthCareData],
          ["OurCategoryJobBoardTitle", setOurCategoryJobBoardData],
          ["OurCategoryRealEstateTitle", setOurCategoryRealEstateData],
          ["OurCategoryTravelTitle", setOurCategoryTravelData],
          ["OurCategorySportGamesTitle", setOurCategorySportGamesData],
          ["OurCategoryPetAnimalsTitle", setOurCategoryPetAnimalsData],
          ["OurCategoryEducationTitle", setOurCategoryEducationData],
        ];

        for (const [collName, setterFunc] of collections) {
          try {
            const snapshot = await getDocs(collection(db, collName));
            const docs = snapshot.docs.map((doc) => doc.data());
            if (docs.length > 0) {
              // Store the full document object (which should contain name_en and name_ar)
              setterFunc(docs[0]);
            }
          } catch (error) {
            console.log(`Error fetching ${collName}:`, error);
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategoryData();
  }, []);

  // Handle resize
  useEffect(() => {
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  // Translation key map
  const categoryTranslationMap = {
    Motors: "categories.motors",
    Electronics: "categories.electronics",
    "Fashion Style": "categories.fashionStyle",
    "Home & Furniture": "categories.homeFurniture",
    "Job Board": "categories.jobBoard",
    "Real Estate": "categories.realEstate",
    Services: "categories.services",
    "Sport & Game": "categories.sportGame",
    "Sport & Games": "categories.sportGame",
    "Pet & Animals": "categories.petAnimals",
    Other: "categories.other",
    Commercial: "categories.commercial",
  };

  // Create category title map (use bilingual Firebase data if exists, otherwise use translation)
  const categoryTitleMap = {
    Motors: getText(OurCategoryAutomativeData, "name") || t("categories.motors"),
    Electronics: getText(ElectronicsData, "name") || t("categories.electronics"),
    "Fashion Style": getText(FashionStyleData, "name") || t("categories.fashionStyle"),
    "Home & Furniture": getText(OurCategoryHealthCareData, "name") || t("categories.homeFurniture"),
    "Job Board": getText(OurCategoryJobBoardData, "name") || t("categories.jobBoard"),
    "Real Estate": getText(OurCategoryRealEstateData, "name") || t("categories.realEstate"),
    Services: getText(OurCategoryTravelData, "name") || t("categories.services"),
    "Sport & Game": getText(OurCategorySportGamesData, "name") || t("categories.sportGame"),
    "Sport & Games": getText(OurCategorySportGamesData, "name") || t("categories.sportGame"),
    "Pet & Animals": getText(OurCategoryPetAnimalsData, "name") || t("categories.petAnimals"),
    Other: getText(OurCategoryEducationData, "name") || t("categories.other"),
  };

  // Category name to URL slug mapping
  const categorySlugMap = {
    Motors: "motors",
    Electronics: "electronics",
    "Fashion Style": "fashion-style",
    "Home & Furniture": "home-furniture",
    "Job Board": "job-board",
    "Real Estate": "real-estate",
    Services: "services",
    "Sport & Game": "sport-and-game",
    "Pet & Animals": "pet-and-animals",
    Other: "other",
  };

  // Get translated data based on current language
  const translatedData = getTranslatedData(categoriesData, t);

  // Build categories from translated data
  const categories = translatedData
    .slice(1) // Skip "Search" category
    .map((category) => ({
      ...category,
      displayName: categoryTitleMap[category.name] || category.name,
      slug: categorySlugMap[category.name] || category.name,
      subcategories:
        category.subcategories?.map((sub) => ({
          ...sub,
          nestedSubcategories: sub.nestedSubCategories || [],
        })) || [],
    }))
    .concat([
      {
        name: "Commercial",
        path: "/CommercialAdscom",
        displayName: t("categories.commercial"),
        slug: "commercial",
        subcategories: [],
      },
    ]);

  if (isMobile) {
    return null;
  }

  return (
    <div className="header-lower container">
      <nav className="nav-links" style={{ fontFamily: "VIP Rawy Regular" }}>
        {categories.map((category, index) => (
          <div
            key={index}
            className="nav-link-wrapper"
            onMouseEnter={() => setOpenDropdown(category.name)}
            onMouseLeave={() => {
              setOpenDropdown(null);
              setOpenSubDropdown(null);
            }}
          >
            <NavLink
              to={
                category.name === "Commercial"
                  ? category.path
                  : `/search?category=${category.slug}`
              }
              className={() => {
                const currentCategory = searchParams.get("category");
                let isActiveCategory = false;

                if (category.name === "Commercial") {
                  // For Commercial, check hash for CommercialAdscom
                  const currentHash = window.location.hash;
                  isActiveCategory = currentHash.includes("CommercialAdscom");
                } else {
                  // For others, check category query param
                  isActiveCategory = currentCategory === category.slug;
                }

                return isActiveCategory ? "nav-link active-link" : "nav-link";
              }}
            >
              {category.displayName}
            </NavLink>

            {openDropdown === category.name &&
              category.subcategories?.length > 0 && (
                <div className="mega-menu">
                  <ul
                    className={`submenu-list ${
                      category.name === "Real Estate"
                        ? "real-estate-scroll"
                        : ""
                    }`}
                  >
                    {category.subcategories?.map((subcategory) => (
                      <li
                        key={subcategory.name}
                        className="submenu-item"
                        onMouseEnter={() =>
                          setOpenSubDropdown(subcategory.name)
                        }
                        onMouseLeave={() => setOpenSubDropdown(null)}
                      >
                        <NavLink
                          to={`/search?category=${category.slug}&subcategory=${
                            subcategory.path
                              .split("subcategory=")[1]
                              ?.split("&")[0] || ""
                          }`}
                          className={({ isActive }) =>
                            isActive
                              ? "submenu-link active-link"
                              : "submenu-link"
                          }
                        >
                          {translateSubcategory(subcategory.displayName || subcategory.name)}
                          {subcategory.nestedSubcategories &&
                            subcategory.nestedSubcategories.length > 0 && (
                              <span className="arrow"> </span>
                            )}
                        </NavLink>

                        {subcategory.nestedSubcategories &&
                          subcategory.nestedSubcategories.length > 0 &&
                          openSubDropdown === subcategory.name && (
                            <div className="sub-submenu">
                              <ul className="submenu-list">
                                {subcategory.nestedSubcategories?.map(
                                  (nestedSubcategory) => (
                                    <li
                                      key={nestedSubcategory.name}
                                      className="submenu-item"
                                    >
                                      <NavLink
                                        to={`/search?category=${
                                          category.slug
                                        }&subcategory=${
                                          subcategory.path
                                            .split("subcategory=")[1]
                                            ?.split("&")[0] || ""
                                        }&nestedsubcategory=${
                                          nestedSubcategory.path.split(
                                            "nestedsubcategory="
                                          )[1] || ""
                                        }`}
                                        className={({ isActive }) =>
                                          isActive
                                            ? "submenu-link active-link"
                                            : "submenu-link"
                                        }
                                      >
                                        {translateSubcategory(nestedSubcategory.displayName || nestedSubcategory.name)}
                                      </NavLink>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default HeaderLower;
