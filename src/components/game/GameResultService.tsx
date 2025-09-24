
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const saveGameResult = async (playerName: string, time: number, moves: number) => {
  try {
    const { error } = await supabase.from("game_completions").insert({
      player_name: playerName,
      completion_time: time,
      moves: moves
    });
    
    if (error) throw error;
    
    toast.success("Your score has been saved!");
    return true;
  } catch (error) {
    console.error("Error saving game result:", error);
    toast.error("Failed to save your score. Please try again.");
    return false;
  }
};
