import React, { createContext, useState, useEffect } from "react";
import i18n from "./i18n/i18n";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "ar"
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
    // Set initial language from localStorage or default to 'ar'
    const savedLanguage = localStorage.getItem("language") || "ar";
    i18n.changeLanguage(savedLanguage);

    // Set HTML lang attribute
    document.documentElement.setAttribute("lang", language);

    // Set direction based on language
    if (language === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
      document.body.classList.add("rtl");
      console.log("✅ RTL mode enabled for Arabic");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.body.classList.remove("rtl");
      console.log("✅ LTR mode enabled for", language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};