
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

export const saveGameResult = async (playerName: string, time: number, moves: number, t: (key: string) => string) => {
  try {
    const { error } = await supabase.from("game_completions").insert({
      player_name: playerName,
      completion_time: time,
      moves: moves
    });
    
    if (error) throw error;
    
    toast.success(t("scoreHasBeenSaved"));
    return true;
  } catch (error) {
    console.error("Error saving game result:", error);
    toast.error(t("failedToSaveScore"));
    return false;
  }
};
