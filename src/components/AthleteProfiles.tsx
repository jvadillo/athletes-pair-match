import React, { useEffect, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Trophy, Lightbulb, Star, Sparkles, Clock, ExternalLink, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ATHLETE_PROFILES } from "@/data/athleteProfiles";

interface AthleteProfilesProps {
  onBack: () => void;
}

const AthleteProfiles: React.FC<AthleteProfilesProps> = ({ onBack }) => {
  const { t, language } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedIndex]);

  const total = ATHLETE_PROFILES.length;
  const athlete = selectedIndex !== null ? ATHLETE_PROFILES[selectedIndex] : null;

  const goTo = (offset: number) => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + offset + total) % total);
  };

  return (
    <div className="animate-fade-in bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-3xl mx-auto mt-4 sm:mt-0 text-left">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gamePurple">{t("meetTheAthletes")}</h2>
        <Button onClick={onBack} variant="outline" className="flex items-center gap-2 shrink-0">
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </Button>
      </div>

      {!athlete && (
        <>
          <p className="athlete-text text-gray-600 mb-6">{t("athletesIntro")}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {ATHLETE_PROFILES.map((profile, index) => (
              <button
                key={profile.personKey}
                onClick={() => setSelectedIndex(index)}
                className="group flex flex-col items-center rounded-xl border-2 bg-white p-4 text-center transition-all hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gamePurple"
                style={{ borderColor: profile.color }}
              >
                <span
                  className="mb-3 flex h-16 w-16 items-center justify-center rounded-full text-3xl transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${profile.color}33` }}
                  aria-hidden="true"
                >
                  {profile.emoji}
                </span>
                <span className="font-bold text-gray-800 leading-tight">{t(profile.personKey)}</span>
                <span className="mt-1 text-xs font-semibold" style={{ color: profile.color, filter: "brightness(0.75)" }}>
                  {profile.sport[language]}
                </span>
              </button>
            ))}
          </div>

          <p className="athlete-text mt-6 text-center text-xs text-gray-400">{t("athletesUpdated")}</p>
        </>
      )}

      {athlete && (
        <div key={athlete.personKey} className="animate-fade-in">
          <Button
            onClick={() => setSelectedIndex(null)}
            variant="ghost"
            className="mb-3 flex items-center gap-2 px-2 text-gamePurple hover:bg-gamePurple/10"
          >
            <LayoutGrid className="h-4 w-4" />
            {t("allAthletes")}
          </Button>

          <div
            className="mb-6 flex items-center gap-4 rounded-xl p-4 sm:p-5 text-white"
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(135deg, ${athlete.color}, #9334ea)`,
              textShadow: "0 1px 3px rgba(0, 0, 0, 0.35)"
            }}
          >
            <span
              className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full bg-white/90 text-4xl sm:text-5xl"
              aria-hidden="true"
            >
              {athlete.emoji}
            </span>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold leading-tight">{t(athlete.personKey)}</h3>
              <p className="font-semibold opacity-95">{athlete.sport[language]}</p>
              <p className="athlete-text text-sm opacity-90">{athlete.born[language]}</p>
            </div>
          </div>

          <section className="mb-6">
            <h4 className="mb-3 flex items-center gap-2 font-bold text-gray-800">
              <Trophy className="h-5 w-5" style={{ color: athlete.color }} />
              {t("athleteAchievements")}
            </h4>
            <ul className="space-y-2">
              {athlete.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
                  <Star className="mt-0.5 h-4 w-4 shrink-0" style={{ color: athlete.color }} fill="currentColor" />
                  <span className="athlete-text text-gray-700">{achievement[language]}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <section className="rounded-lg border p-4" style={{ borderColor: `${athlete.color}66` }}>
              <h4 className="mb-2 flex items-center gap-2 font-bold text-gray-800">
                <Lightbulb className="h-5 w-5" style={{ color: athlete.color }} />
                {t("athleteFunFact")}
              </h4>
              <p className="athlete-text text-gray-700">{athlete.funFact[language]}</p>
            </section>

            <section className="rounded-lg border p-4" style={{ borderColor: `${athlete.color}66` }}>
              <h4 className="mb-2 flex items-center gap-2 font-bold text-gray-800">
                <Clock className="h-5 w-5" style={{ color: athlete.color }} />
                {t("athleteToday")}
              </h4>
              <p className="athlete-text text-gray-700">{athlete.today[language]}</p>
            </section>
          </div>

          <section className="mb-6 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 p-4">
            <h4 className="mb-2 flex items-center gap-2 font-bold text-gamePurple">
              <Sparkles className="h-5 w-5" />
              {t("athleteInspiration")}
            </h4>
            <p className="athlete-text text-lg font-medium text-gray-800">{athlete.inspiration[language]}</p>
          </section>

          <section className="mb-6">
            <h4 className="mb-2 text-sm font-semibold text-gray-500">{t("athleteSources")}</h4>
            <div className="flex flex-wrap gap-2">
              {athlete.sources.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="athlete-text inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs text-gray-600 hover:bg-gray-50"
                >
                  {source.label}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
            <p className="athlete-text mt-2 text-xs text-gray-400">{t("athletesUpdated")}</p>
          </section>

          <div className="flex items-center justify-between gap-3">
            <Button onClick={() => goTo(-1)} variant="outline" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              {t("previousAthlete")}
            </Button>
            <span className="text-sm text-gray-400">
              {selectedIndex! + 1} / {total}
            </span>
            <Button onClick={() => goTo(1)} variant="outline" className="flex items-center gap-1">
              {t("nextAthlete")}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AthleteProfiles;
