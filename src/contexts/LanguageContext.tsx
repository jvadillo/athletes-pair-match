
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { allTranslations } from "@/translations";

// Define supported languages
export type Language = "en" | "es" | "eu" | "ca" | "gl";

// Translation system type definition
export type Translations = {
  [key: string]: {
    [lang in Language]: string;
  };
};

// Define the context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string; // Translation function
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "es", // Changed default to Spanish
  setLanguage: () => {},
  t: (key) => key,
});

// Language provider props
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get stored language or default to Spanish
  const [language, setLanguage] = useState<Language>(() => {
    const storedLang = localStorage.getItem("language");
    return (storedLang as Language) || "es";
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (!allTranslations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return allTranslations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using language
export const useLanguage = () => useContext(LanguageContext);
