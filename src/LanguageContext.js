import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); 

  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  const translateText = async (text, targetLang) => {
    if (targetLang === "en") return text; 

    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=YOUR_GOOGLE_API_KEY`,
        {
          q: text,
          source: "en",
          target: targetLang,
          format: "text",
        }
      );
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      return text; 
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translateText }}>
      {children}
    </LanguageContext.Provider>
  );
};