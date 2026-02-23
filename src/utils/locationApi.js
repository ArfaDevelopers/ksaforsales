// Location API utility for fetching regions, cities, and districts
const API_BASE_URL = "";

// Saudi Arabia Regions data
export const saudiRegions = [
  { id: "1", nameEn: "Riyadh", nameAr: "الرياض" },
  { id: "2", nameEn: "Makkah", nameAr: "مكة المكرمة" },
  { id: "3", nameEn: "Madinah", nameAr: "المدينة المنورة" },
  { id: "4", nameEn: "Eastern Province", nameAr: "الشرقية" },
  { id: "5", nameEn: "Asir", nameAr: "عسير" },
  { id: "6", nameEn: "Tabuk", nameAr: "تبوك" },
  { id: "7", nameEn: "Qassim", nameAr: "القصيم" },
  { id: "8", nameEn: "Hail", nameAr: "حائل" },
  { id: "9", nameEn: "Northern Borders", nameAr: "الحدود الشمالية" },
  { id: "10", nameEn: "Jazan", nameAr: "جازان" },
  { id: "11", nameEn: "Najran", nameAr: "نجران" },
  { id: "12", nameEn: "Al-Baha", nameAr: "الباحة" },
  { id: "13", nameEn: "Al-Jawf", nameAr: "الجوف" },
];

/**
 * Fetch cities based on selected region IDs
 * @param {string|string[]} regionIds - Single region ID or array of region IDs
 * @returns {Promise<Array>} Array of cities
 */
export const fetchCities = async (regionIds) => {
  try {
    if (!regionIds) {
      throw new Error("REGION_ID is required");
    }

    // Ensure regionIds is an array
    const idsArray = Array.isArray(regionIds) ? regionIds : [regionIds];

    // Create query string with multiple REGION_ID parameters
    const queryString = idsArray.map((id) => `REGION_ID=${id}`).join("&");

    const response = await fetch(`${API_BASE_URL}/api/cities?${queryString}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch cities: ${response.statusText}`);
    }

    const data = await response.json();
    return data.cities || [];
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};

/**
 * Fetch districts based on region ID and/or city ID
 * @param {Object} params - Object containing REGION_ID and/or CITY_ID
 * @returns {Promise<Array>} Array of districts
 */
export const fetchDistricts = async ({ REGION_ID, CITY_ID }) => {
  try {
    if (!REGION_ID && !CITY_ID) {
      throw new Error("At least REGION_ID or CITY_ID is required");
    }

    const queryParams = new URLSearchParams();
    if (REGION_ID) queryParams.append("REGION_ID", REGION_ID);
    if (CITY_ID) queryParams.append("CITY_ID", CITY_ID);

    const response = await fetch(
      `${API_BASE_URL}/api/districts?${queryParams.toString()}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch districts: ${response.statusText}`);
    }

    const data = await response.json();
    return data.districts || [];
  } catch (error) {
    console.error("Error fetching districts:", error);
    return [];
  }
};

/**
 * Get region name by ID
 * @param {string} regionId - The region ID
 * @returns {Object} Region object with id, nameEn, and nameAr
 */
export const getRegionById = (regionId) => {
  return saudiRegions.find((region) => region.id === String(regionId));
};

/**
 * Get region name (English) by ID
 * @param {string} regionId - The region ID
 * @returns {string} Region name in English
 */
export const getRegionName = (regionId) => {
  const region = getRegionById(regionId);
  return region ? region.nameEn : "";
};

/**
 * Get region name (Arabic) by ID
 * @param {string} regionId - The region ID
 * @returns {string} Region name in Arabic
 */
export const getRegionNameAr = (regionId) => {
  const region = getRegionById(regionId);
  return region ? region.nameAr : "";
};
