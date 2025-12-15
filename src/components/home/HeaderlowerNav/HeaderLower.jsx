import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./../../Firebase/FirebaseConfig";
import { data as categoriesData } from "./../../../utils/data";

const HeaderLower = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Firebase category title states
  const [OurCategoryAutomativeTitle, setOurCategoryAutomativeTitle] =
    useState("");
  const [ElectronicsTitle, setElectronicsTitle] = useState("");
  const [FashionStyleTitle, setFashionStyleTitle] = useState("");
  const [OurCategoryHealthCareTitle, setOurCategoryHealthCareTitle] =
    useState("");
  const [OurCategoryJobBoardTitle, setOurCategoryJobBoardTitle] = useState("");
  const [OurCategoryRealEstateTitle, setOurCategoryRealEstateTitle] =
    useState("");
  const [OurCategoryTravelTitle, setOurCategoryTravelTitle] = useState("");
  const [OurCategorySportGamesTitle, setOurCategorySportGamesTitle] =
    useState("");
  const [OurCategoryPetAnimalsTitle, setOurCategoryPetAnimalsTitle] =
    useState("");
  const [OurCategoryEducationTitle, setOurCategoryEducationTitle] =
    useState("");

  // Function to update mobile state
  const updateIsMobile = () => {
    setIsMobile(window.innerWidth <= 767);
  };

  // Fetch category titles from Firebase
  useEffect(() => {
    const fetchCategoryTitles = async () => {
      try {
        const collections = [
          ["OurCategoryAutomativeTitle", setOurCategoryAutomativeTitle],
          ["ElectronicsTitle", setElectronicsTitle],
          ["FashionStyleTitle", setFashionStyleTitle],
          ["OurCategoryHealthCareTitle", setOurCategoryHealthCareTitle],
          ["OurCategoryJobBoardTitle", setOurCategoryJobBoardTitle],
          ["OurCategoryRealEstateTitle", setOurCategoryRealEstateTitle],
          ["OurCategoryTravelTitle", setOurCategoryTravelTitle],
          ["OurCategorySportGamesTitle", setOurCategorySportGamesTitle],
          ["OurCategoryPetAnimalsTitle", setOurCategoryPetAnimalsTitle],
          ["OurCategoryEducationTitle", setOurCategoryEducationTitle],
        ];

        for (const [collName, setterFunc] of collections) {
          try {
            const snapshot = await getDocs(collection(db, collName));
            const docs = snapshot.docs.map((doc) => doc.data());
            if (docs.length > 0) {
              setterFunc(docs[0].name || "");
            }
          } catch (error) {
            console.log(`Error fetching ${collName}:`, error);
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategoryTitles();
  }, []);

  // Handle resize
  useEffect(() => {
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  // Create category title map
  const categoryTitleMap = {
    Motors: OurCategoryAutomativeTitle,
    Electronics: ElectronicsTitle,
    "Fashion Style": FashionStyleTitle,
    "Home & Furniture": OurCategoryHealthCareTitle,
    "Job Board": OurCategoryJobBoardTitle,
    "Real Estate": OurCategoryRealEstateTitle,
    Services: OurCategoryTravelTitle,
    "Sport & Games": OurCategorySportGamesTitle,
    "Pet & Animals": OurCategoryPetAnimalsTitle,
    Other: OurCategoryEducationTitle,
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
    "Sport & Games": "sport-and-game",
    "Pet & Animals": "pet-and-animals",
    Other: "other",
  };

  // Build categories from data.js
  const categories = categoriesData
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
        displayName: "Commercial",
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
                const isActiveCategory = currentCategory === category.slug;
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
                          {subcategory.name}
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
                                        {nestedSubcategory.name}
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
