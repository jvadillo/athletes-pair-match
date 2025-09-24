
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe, ArrowLeft } from "lucide-react";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LanguageSelectorProps {
  standalone?: boolean;
  onClose?: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  standalone = false,
  onClose
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Updated languages array with new order: Spanish, Basque, Catalan, Galician, English
  const languages = [
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "eu", name: "Euskara", flag: "🏴" },
    { code: "ca", name: "Català", flag: "🏴" },
    { code: "gl", name: "Galego", flag: "🏴" },
    { code: "en", name: "English", flag: "🇬🇧" },
  ];

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  if (standalone) {
    return (
      <div className="mx-auto max-w-md w-full">
        <div className="animate-fade-in flex flex-col items-center rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-6 text-xl font-bold text-gamePurple">
            {t("selectLanguage")}
          </h2>
          
          <div className="grid gap-4 py-4 w-full">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                className={`flex items-center justify-between py-6 px-4 ${
                  language === lang.code
                    ? "bg-gamePurple text-white"
                    : "bg-transparent hover:bg-gamePurple/10"
                }`}
                variant={language === lang.code ? "default" : "outline"}
                onClick={() => handleSelectLanguage(lang.code as Language)}
              >
                <span className="flex-1 text-left">{lang.name}</span>
                {language === lang.code && (
                  <span className="ml-2">✓</span>
                )}
              </Button>
            ))}
          </div>
          
          {onClose && (
            <Button 
              onClick={onClose}
              className="mt-4 w-full"
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              {t("back")}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="flex items-center justify-center gap-2 mt-2 w-full border border-gamePurple/50 text-gamePurple hover:bg-gamePurple/10"
      >
        <Globe className="h-4 w-4" />
        {t("selectLanguage")}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-gamePurple">
              {t("selectLanguage")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                className={`flex items-center justify-between py-6 px-4 ${
                  language === lang.code
                    ? "bg-gamePurple text-white"
                    : "bg-transparent hover:bg-gamePurple/10"
                }`}
                variant={language === lang.code ? "default" : "outline"}
                onClick={() => handleSelectLanguage(lang.code as Language)}
              >
                <span className="flex-1 text-left">{lang.name}</span>
                {language === lang.code && (
                  <span className="ml-2">✓</span>
                )}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LanguageSelector;
