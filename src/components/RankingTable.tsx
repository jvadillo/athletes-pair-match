
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface GameCompletion {
  id: string;
  player_name: string;
  completion_time: number;
  completed_at: string;
  moves: number;
}

interface RankingTableProps {
  onBack: () => void;
}

const RankingTable: React.FC<RankingTableProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [rankings, setRankings] = useState<GameCompletion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRankings() {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from("game_completions")
          .select("*")
          .order("completion_time", { ascending: true });

        if (error) {
          throw error;
        }

        setRankings(data || []);
      } catch (err) {
        console.error("Error fetching rankings:", err);
        setError(t("errorRankings"));
      } finally {
        setLoading(false);
      }
    }

    fetchRankings();
  }, [t]);

  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Format date to "X time ago"
  const formatDate = (dateString: string): string => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (err) {
      return "Unknown date";
    }
  };

  const renderPosition = (index: number) => {
    if (index === 0) {
      return <span className="text-yellow-500 font-bold">🥇 {t("first")}</span>;
    } else if (index === 1) {
      return <span className="text-gray-400 font-bold">🥈 {t("second")}</span>;
    } else if (index === 2) {
      return <span className="text-amber-700 font-bold">🥉 {t("third")}</span>;
    } else {
      return <span className="text-gray-600">{index + 1}{t("position")}</span>;
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl mx-auto ${isMobile ? 'mt-0' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gamePurple">{t("globalRankings")}</h2>
        <Button 
          onClick={onBack} 
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToGame")}
        </Button>
      </div>

      {loading && (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gamePurple mx-auto mb-4"></div>
          <p className="text-gray-500">{t("loadingRankings")}</p>
        </div>
      )}

      {error && (
        <div className="text-center py-10">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && rankings.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">{t("noRankings")}</p>
        </div>
      )}

      {!loading && !error && rankings.length > 0 && (
        <div className="overflow-x-auto">
          <table className={`w-full ${isMobile ? 'ranking-table-mobile' : ''}`}>
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left font-semibold text-gray-600">{t("rank")}</th>
                <th className="p-3 text-left font-semibold text-gray-600">{t("playerColumn")}</th>
                <th className="p-3 text-left font-semibold text-gray-600">{t("timeColumn")}</th>
                <th className="p-3 text-left font-semibold text-gray-600">{t("movesColumn")}</th>
                {!isMobile && (
                  <th className="p-3 text-left font-semibold text-gray-600">{t("completedColumn")}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {rankings.map((ranking, index) => (
                <tr 
                  key={ranking.id} 
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-3">
                    <div className="flex items-center">
                      {renderPosition(index)}
                    </div>
                  </td>
                  <td className="p-3 font-medium">{ranking.player_name}</td>
                  <td className="p-3">{formatTime(ranking.completion_time)}</td>
                  <td className="p-3">{ranking.moves}</td>
                  {!isMobile && (
                    <td className="p-3 text-gray-500 text-sm">{formatDate(ranking.completed_at)}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RankingTable;
