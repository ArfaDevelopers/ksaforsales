import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HeaderLower = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  // Function to update the `isMobile` state based on window width
  const updateIsMobile = () => {
    setIsMobile(window.innerWidth <= 767);
  };
  useEffect(() => {
    // Set the initial value
    updateIsMobile();
    // Add event listener for window resize
    window.addEventListener("resize", updateIsMobile);
    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", updateIsMobile);
    };
  }, []);
  if (isMobile) {
    return null; // Don't render the component on mobile
  }
  return (
    <div className="header-lower container">
      <nav className="nav-links" style={{ fontFamily: "VIP Rawy Regular" }}>
        <NavLink
          to="/AutomotiveComp"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          {t("categories.motors")}
        </NavLink>
        <NavLink
          to="/ElectronicComp"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          {t("categories.electronics")}
        </NavLink>
        <NavLink
          to="/FashionStyle"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          {t("categories.fashionStyle")}
        </NavLink>
        <NavLink
          to="/HealthCareComp"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          {t("categories.homeFurniture")}
        </NavLink>
        <NavLink
          to="/JobBoard"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          {t("categories.jobBoard")}
        </NavLink>
        <NavLink
          to="/Education"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          {t("categories.other")}
        </NavLink>
        <NavLink
          to="/RealEstateComp"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          {t("categories.realEstate")}
        </NavLink>
        <NavLink
          to="/TravelComp"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          {t("categories.services")}
        </NavLink>
        <NavLink
          to="/SportGamesComp"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          {t("categories.sportGame")}
        </NavLink>
        <NavLink
          to="/PetAnimalsComp"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          {t("categories.petAnimals")}
        </NavLink>
        <NavLink
          to="/CommercialAdscom"
          className="nav-link d-inline-flex align-items-center "
          style={{
            textDecoration: "none",
            color: "black",
            padding: "10px 15px",
            fontSize: "16px",
            fontWeight: "bold",
            marginTop: "-0.6rem",
            whiteSpace: "nowrap",
          }}
        >
          {t("categories.commercial")}{" "}
          <span
            className="badge bg-danger ms-2"
            style={{
              fontSize: "10px",
              // verticalAlign: "middle",
              padding: "3px 6px",
            }}
          >
            New
          </span>
        </NavLink>
      </nav>
    </div>
  );
};
export default HeaderLower;
