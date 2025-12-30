/**
 * Utility function to convert English text to camelCase translation key
 * Example: "Cars For Sale" → "carsForSale"
 * Example: "Wheels & Rims" → "wheelsAndRims"
 * Example: "Sedan (Saloon)" → "sedan"
 */
const toCamelCase = (str) => {
  return str
    .replace(/\([^)]*\)/g, '') // Remove text in parentheses first (e.g., "(Saloon)", "(MPV)")
    .replace(/&/g, 'And') // Replace & with And before processing
    .replace(/[^a-zA-Z0-9\s]/g, '') // Remove other special characters
    .trim() // Remove leading/trailing spaces
    .split(' ')
    .filter(word => word.length > 0) // Remove empty strings from double spaces
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
};

/**
 * Translate a subcategory name
 */
export const translateSubcategory = (subcategoryName, categoryKey, t) => {
  if (!subcategoryName || !categoryKey) return subcategoryName;

  const key = toCamelCase(subcategoryName);
  const translationKey = `subcategories.${categoryKey}.${key}`;

  // Try to get translation, fallback to original if not found
  const translated = t(translationKey);
  return translated !== translationKey ? translated : subcategoryName;
};

/**
 * Translate a nested subcategory name
 */
export const translateNestedSubcategory = (nestedName, categoryKey, t) => {
  if (!nestedName || !categoryKey) return nestedName;

  const key = toCamelCase(nestedName);
  const translationKey = `nestedSubcategories.${categoryKey}.${key}`;

  // Try to get translation, fallback to original if not found
  const translated = t(translationKey);
  return translated !== translationKey ? translated : nestedName;
};

/**
 * Translate a filter name
 */
export const translateFilterName = (filterName, t) => {
  if (!filterName) return filterName;

  const key = toCamelCase(filterName);
  const translationKey = `filters.names.${key}`;

  // Try to get translation, fallback to original if not found
  const translated = t(translationKey);
  return translated !== translationKey ? translated : filterName;
};

/**
 * Translate a filter option
 */
export const translateFilterOption = (optionValue, filterType, t) => {
  if (!optionValue) return optionValue;

  const key = toCamelCase(optionValue);

  // Try different translation paths
  const translationPaths = [
    `filters.options.${filterType}.${key}`,
    `filters.options.colors.${key}`,
    `filters.options.regionalSpec.${key}`,
    `filters.options.fuelType.${key}`,
    `filters.options.insurance.${key}`,
    `filters.options.bodyType.${key}`,
    `filters.options.doors.${key}`,
    `filters.options.seatingCapacity.${key}`,
    `filters.options.frequency.${key}`,
    `filters.options.residenceType.${key}`,
    `filters.options.rooms.${key}`,
    `filters.options.bathrooms.${key}`,
    `filters.options.area.${key}`,
    `filters.options.furnished.${key}`,
    `filters.options.facade.${key}`,
    `filters.options.streetWidth.${key}`,
    `filters.options.floor.${key}`,
    `filters.options.amenities.${key}`,
    `filters.options.propertyAge.${key}`,
    `filters.options.petAge.${key}`,
    `filters.options.additionalFeatures.${key}`,
    `filters.options.condition.${key}`,
    `filters.options.adType.${key}`,
    `filters.options.sellerType.${key}`,
    `filters.options.paymentMethod.${key}`,
    `filters.options.transmission.${key}`,
  ];

  for (const path of translationPaths) {
    const translated = t(path);
    if (translated !== path) {
      return translated;
    }
  }

  // Fallback to original if no translation found
  return optionValue;
};

/**
 * Get translated data from data.js
 * This function takes the data array and translates all text based on current language
 */
export const getTranslatedData = (data, t) => {
  if (!data || !t) return data;

  // Map category names to translation keys
  const categoryKeyMap = {
    'Search': 'search',
    'Motors': 'motors',
    'Electronics': 'electronics',
    'Fashion Style': 'fashionStyle',
    'Home & Furniture': 'homeFurniture',
    'Job Board': 'jobBoard',
    'Real Estate': 'realEstate',
    'Services': 'services',
    'Sport & Game': 'sportGame',
    'Pet & Animals': 'petAnimals',
    'Other': 'other'
  };

  return data.map(category => {
    const categoryKey = categoryKeyMap[category.name];

    // Translate subcategories - keep original name for URLs, add displayName for UI
    const translatedSubcategories = category.subcategories?.map(sub => ({
      ...sub,
      originalName: sub.name, // Keep original English name for URL slugs
      displayName: translateSubcategory(sub.name, categoryKey, t), // Translated name for display
      name: sub.name, // Keep name as English for backwards compatibility
      nestedSubCategories: sub.nestedSubCategories?.map(nested => ({
        ...nested,
        originalName: nested.name, // Keep original English name
        displayName: translateNestedSubcategory(nested.name, categoryKey, t), // Translated name
        name: nested.name // Keep name as English for backwards compatibility
      }))
    }));

    // Translate filters
    const translatedFilters = category.filters ? translateFilters(category.filters, t) : undefined;

    return {
      ...category,
      subcategories: translatedSubcategories,
      filters: translatedFilters
    };
  });
};

/**
 * Translate filters object
 */
const translateFilters = (filters, t) => {
  if (!filters) return filters;

  const translatedFilters = {};

  Object.keys(filters).forEach(filterKey => {
    const filter = filters[filterKey];

    // Translate filter name
    const translatedName = translateFilterName(filter.name, t);

    // Translate filter options
    let translatedOptions = filter.options;

    if (Array.isArray(filter.options)) {
      // Simple array of strings
      if (typeof filter.options[0] === 'string') {
        translatedOptions = filter.options.map(option => ({
          originalValue: option, // Keep original English for URL slugs
          displayValue: translateFilterOption(option, filterKey, t), // Translated for display
          name: option // Keep name as English for backwards compatibility
        }));
      }
      // Array of objects (like brand with models)
      else if (typeof filter.options[0] === 'object') {
        translatedOptions = filter.options.map(optionObj => {
          const brandKey = toCamelCase(optionObj.name);
          const translationKey = `filters.options.brands.${brandKey}`;
          const translatedName = t(translationKey);

          return {
            ...optionObj,
            originalName: optionObj.name, // Keep original English name for URL slugs
            displayName: translatedName !== translationKey ? translatedName : optionObj.name, // Translated name for display
            name: optionObj.name // Keep name as English for backwards compatibility
          };
        });
      }
    }

    translatedFilters[filterKey] = {
      ...filter,
      name: translatedName,
      options: translatedOptions
    };
  });

  return translatedFilters;
};

/**
 * Get category key from category name (for mapping)
 */
export const getCategoryKey = (categoryName) => {
  const categoryKeyMap = {
    'Search': 'search',
    'Motors': 'motors',
    'Electronics': 'electronics',
    'Fashion Style': 'fashionStyle',
    'Home & Furniture': 'homeFurniture',
    'Job Board': 'jobBoard',
    'Real Estate': 'realEstate',
    'Services': 'services',
    'Sport & Game': 'sportGame',
    'Pet & Animals': 'petAnimals',
    'Other': 'other'
  };

  return categoryKeyMap[categoryName] || categoryName.toLowerCase();
};
