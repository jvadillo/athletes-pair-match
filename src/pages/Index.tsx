
import React from "react";
import GameBoard from "@/components/GameBoard";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "@/App.css"; // Import App.css to apply the uppercase styling

const IndexContent: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-2">
        <main className="h-full flex flex-col items-center justify-start">
          <GameBoard />
        </main>
      </div>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <LanguageProvider>
      <IndexContent />
    </LanguageProvider>
  );
};

export default Index;
