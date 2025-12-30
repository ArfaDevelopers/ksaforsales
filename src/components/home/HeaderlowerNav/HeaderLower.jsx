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
                          {subcategory.displayName || subcategory.name}
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
                                        {nestedSubcategory.displayName || nestedSubcategory.name}
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
