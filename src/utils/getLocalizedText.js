import { useContext } from "react";
import { LanguageContext } from "../LanguageContext";

/**
 * Custom hook to get localized text from database objects
 * Usage: const { getText } = useLocalizedText();
 *        const categoryName = getText(categoryObject, 'name');
 *
 * This will look for 'name_ar' or 'name_en' based on current language
 */
export const useLocalizedText = () => {
  const { language } = useContext(LanguageContext);

  const getText = (item, fieldName) => {
    if (!item) return "";

    // Try to get localized version (e.g., name_ar or name_en)
    const localizedField = `${fieldName}_${language}`;
    if (item[localizedField]) {
      return item[localizedField];
    }

    // Fallback to English
    const englishField = `${fieldName}_en`;
    if (item[englishField]) {
      return item[englishField];
    }

    // Fallback to field without suffix (for backward compatibility)
    return item[fieldName] || "";
  };

  return { getText };
};

/**
 * Non-hook version for use outside React components
 * Usage: getLocalizedText(categoryObject, 'name', 'ar')
 */
export const getLocalizedText = (item, fieldName, language = 'en') => {
  if (!item) return "";

  // Try to get localized version
  const localizedField = `${fieldName}_${language}`;
  if (item[localizedField]) {
    return item[localizedField];
  }

  // Fallback to English
  const englishField = `${fieldName}_en`;
  if (item[englishField]) {
    return item[englishField];
  }

  // Fallback to field without suffix
  return item[fieldName] || "";
};
