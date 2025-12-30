import React, { createContext, useState, useEffect } from "react";
import i18n from "./i18n/i18n";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  console.log("🟣 LanguageProvider render - current language:", language);

  const toggleLanguage = (lang) => {
    console.log("🔵 toggleLanguage called with:", lang);
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    console.log("✅ Language toggled to:", lang);
  };

  useEffect(() => {
    // Set initial language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLanguage);

    // Set HTML lang attribute only (no direction changes)
    document.documentElement.setAttribute("lang", language);

    // Don't change direction - keep layout as LTR always
    // document.documentElement.setAttribute("dir", "ltr");

    // Don't add RTL class - keep layout the same for both languages
    // document.body.classList.remove("rtl");
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};