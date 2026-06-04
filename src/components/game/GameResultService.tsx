
import { saveGameCompletion } from "@/lib/api-client";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

export const saveGameResult = async (playerName: string, time: number, moves: number, t: (key: string) => string) => {
  try {
    const { data, error } = await saveGameCompletion(playerName, time, moves);
    
    if (error || !data) {
      throw new Error(error?.detail || "Failed to save game result");
    }
    
    toast.success(t("scoreHasBeenSaved"));
    return true;
  } catch (error) {
    console.error("Error saving game result:", error);
    toast.error(t("failedToSaveScore"));
    return false;
  }
};
