import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HeaderLower = () => {
  const { t } = useTranslation();

  // Directly check window width on initial render
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 767;

  if (isMobile) {
    return null; // Don't render the component on mobile
  }

  const categories = [
    { name: t("categories.motors"), path: "/" },
    { name: t("categories.electronics"), path: "/" },
    { name: t("categories.fashionStyle"), path: "/" },
    { name: t("categories.homeFurniture"), path: "/" },
    { name: t("categories.jobBoard"), path: "/JobBoard" },
    { name: t("categories.other"), path: "/" },
    { name: t("categories.realEstate"), path: "/" },
    { name: t("categories.services"), path: "/" },
    { name: t("categories.sportGame"), path: "/" },
    { name: t("categories.petAnimals"), path: "/" },
  ];

  return (
    <div className="header-lower container">
      <nav className="nav-links" style={{ fontFamily: "VIP Rawy Regular" }}>
        {categories.map((category, index) => (
          <NavLink
            key={index}
            to={category.path}
            className="nav-link"
            style={{
              position: "relative",
              textDecoration: "none",
              color: "#1E55B4",
              padding: "7px 7px",
              fontSize: "18px",
              display: "inline-block",
            }}
          >
            {category.name}
            <span
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: "2px",
                width: "0%",
                backgroundColor: "#1E55B4",
                transition: "width 0.3s ease",
              }}
              className="hover-underline"
            />
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default HeaderLower;
