// ========================================
// NEW UNIFIED FILTER HOOK
// Created to provide filter logic to all category components
// All changes are marked with "// [NEW FILTER]" comments for easy removal
// ========================================

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { data } from "../utils/data";

/**
 * Custom hook for unified filter functionality across all category pages
 * @param {string} categoryPath - The path of the category (e.g., "/motors", "/electronics")
 * @returns {object} Filter state and handler functions
 */
export const useUnifiedFilter = (categoryPath) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState("");
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

  // Get current category filters from data.js
  let currentCategoryFilters = data.find((page) => page.path === categoryPath) ?? "";
  if (!currentCategoryFilters) {
    currentCategoryFilters = data.find((page) => page.path === "/search");
  }

  // Utility function to convert text to URL-friendly format
  const getUrlText = (text) => {
    return text
      .trim()
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // Utility function to convert URL text back to display format
  const getTextFromURL = (text) => {
    return text
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Handle search keyword submission
  const handleSearchKeyword = (e) => {
    e.preventDefault();
    // Search is already reactive via useEffect in parent component
  };

  // Handle subcategory and nested subcategory changes
  const handleSubcategoryChange = (e, selectType = "single") => {
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

  // Handle filter changes (checkboxes, selects, etc.)
  const handleFiltersChange = (e, selectType) => {
    const { name, value, checked, type } = e.target || e;
    const lowerCaseName = typeof name === "string" ? name.toLowerCase() : name;
    const lowerCaseValue = typeof value === "string" ? value.toLowerCase() : value;

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

  // Handle single input filters (like license number)
  const handleInputs = (e, name, value, selectType = "") => {
    e.preventDefault();
    handleFiltersChange({ name, value }, selectType);
    setFilterData((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle two input filters (like price range, year range)
  const handleTwoInputs = (e, names, values, selectType = "") => {
    e.preventDefault();
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (values.from) {
        newParams.set(names.from, values.from);
        setFilterData((prev) => ({ ...prev, [names.from]: "" }));
      } else {
        newParams.delete(names.from);
      }
      if (values.to) {
        newParams.set(names.to, values.to);
        setFilterData((prev) => ({ ...prev, [names.to]: "" }));
      } else {
        newParams.delete(names.to);
      }
      return newParams;
    });
  };

  return {
    searchParams,
    setSearchParams,
    searchKeyword,
    setSearchKeyword,
    filterData,
    setFilterData,
    currentCategoryFilters,
    getUrlText,
    getTextFromURL,
    handleSearchKeyword,
    handleSubcategoryChange,
    handleFiltersChange,
    handleInputs,
    handleTwoInputs,
  };
};

export default useUnifiedFilter;
