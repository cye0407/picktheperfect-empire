import { useState, useEffect } from "react";
import type { Region, Flower, FlowerPreferences } from "../types/flower";
import affiliateLinks from "../data/affiliateLinks";
import { flowerCrop } from "../crops/flower";
import { scoreFlower, flowerReasons } from "../crops/flowerScoring";
import { runMatching } from "../engine/match";
import type { FlowerUseCase } from "../crops/flowerEnums";
import {
  FLOWER_LIFESPANS,
  FLOWER_PRIMARY_COLORS,
  FLOWER_BLOOM_SEASONS,
  FLOWER_SUN_REQUIREMENTS,
  FLOWER_WATER_NEEDS,
  FLOWER_DIFFICULTY_LEVELS,
} from "../crops/flowerEnums";
import { AffiliateCTA } from "./AffiliateCTA";
import { renderStars } from "../utils/stars";
import { getProfileBySlug } from "../data/searchProfiles";

const ProducePicker = () => {
  const defaultPreferences = flowerCrop.defaultPreferences;
  const allUseCases = flowerCrop.useCases;
  const flowerData = flowerCrop.items;

  const [preferences, setPreferences] = useState<FlowerPreferences>(defaultPreferences as FlowerPreferences);
  const [matchedFlowers, setMatchedFlowers] = useState<Flower[]>([]);
  const [selectedFlower, setSelectedFlower] = useState<Flower | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region>("US");
  const [showTopMatches, setShowTopMatches] = useState(false);
  const [showGoodMatches, setShowGoodMatches] = useState(false);
  const [isProfileLoad, setIsProfileLoad] = useState(false);

  const handleUseCaseChange = (use: FlowerUseCase, isChecked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      useCase: isChecked ? [...prev.useCase, use] : prev.useCase.filter(item => item !== use)
    }));
  };

  const numericFields = new Set(["fragranceIntensity"]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: numericFields.has(name) ? Number(value) : value }));
  };

  const resetPreferences = () => {
    setPreferences({ ...defaultPreferences } as FlowerPreferences);
    setMatchedFlowers([]);
    setSelectedFlower(null);
  };

  const findMatches = () => {
    const sorted = runMatching({ items: flowerData as Flower[], preferences, scoreItem: scoreFlower, getReasons: flowerReasons });
    setMatchedFlowers(sorted as Flower[]);
    setSelectedFlower(sorted[0] ?? null);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("profile");
    if (slug) {
      const profile = getProfileBySlug(slug);
      if (profile?.preset) {
        setIsProfileLoad(true);
        setPreferences({ ...defaultPreferences, ...profile.preset } as FlowerPreferences);
      }
    }
  }, []);

  useEffect(() => { if (isProfileLoad) { findMatches(); setIsProfileLoad(false); } }, [preferences]);

  const topMatches = matchedFlowers.filter(s => (s as any).matchTier === "Top match");
  const goodMatches = matchedFlowers.filter(s => (s as any).matchTier === "Good match");

  const getMatchBadgeClass = (tier: string) => {
    if (tier === "Top match") return "bg-leaf-green text-white";
    if (tier === "Good match") return "bg-flower-pink text-ink";
    return "bg-gray-300 text-ink";
  };

  const sunLabel = (sun: string) => {
    const labels: Record<string, string> = {
      full_sun: "Full Sun", part_sun: "Part Sun", part_shade: "Part Shade",
      full_shade: "Full Shade", sun_to_part_shade: "Sun to Part Shade",
    };
    return labels[sun] || sun;
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 py-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 border-t-4 border-flower">
        <div className="flex items-center justify-center mb-6">
          <span className="text-3xl mr-2">{"🌸"}</span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-ink">Pick the Perfect Flower</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preferences */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-flower/20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-flower">Your Preferences</h2>
              <button onClick={resetPreferences} className="text-sm bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md">Reset</button>
            </div>

            <div className="mb-4 p-3 bg-flower-light border border-flower-pink rounded-md">
              <label className="block text-sm font-medium mb-2">Lifespan
                <select name="lifespan" value={preferences.lifespan} onChange={handleChange} className="mt-1 block w-full p-3 border rounded-md">
                  <option value="No preference">No preference</option>
                  {FLOWER_LIFESPANS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Primary Color
                <select name="primaryColor" value={preferences.primaryColor} onChange={handleChange} className="mt-1 block w-full p-3 border rounded-md">
                  <option value="No preference">No preference</option>
                  {FLOWER_PRIMARY_COLORS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Bloom Season
                <select name="bloomSeason" value={preferences.bloomSeason} onChange={handleChange} className="mt-1 block w-full p-3 border rounded-md">
                  <option value="No preference">No preference</option>
                  {FLOWER_BLOOM_SEASONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Fragrance Preference (1-10)
                <input type="range" name="fragranceIntensity" min="1" max="10" value={preferences.fragranceIntensity} onChange={handleChange} className="w-full mt-2" />
                <div className="text-center">{preferences.fragranceIntensity}/10</div>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Primary Uses
                <div className="grid grid-cols-2 gap-2 mt-1 border rounded-md p-3">
                  {allUseCases.map(use => (
                    <div key={use} className="flex items-center">
                      <input type="checkbox" id={`use-${use}`} checked={preferences.useCase.includes(use)} onChange={e => handleUseCaseChange(use, e.target.checked)} className="mr-2 w-4 h-4" />
                      <label htmlFor={`use-${use}`} className="text-sm capitalize">{use.replace(/_/g, " ")}</label>
                    </div>
                  ))}
                </div>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Sun Requirement
                <select name="sunRequirement" value={preferences.sunRequirement} onChange={handleChange} className="mt-1 block w-full p-3 border rounded-md">
                  <option value="No preference">No preference</option>
                  {FLOWER_SUN_REQUIREMENTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Water Needs
                <select name="waterNeeds" value={preferences.waterNeeds} onChange={handleChange} className="mt-1 block w-full p-3 border rounded-md">
                  <option value="No preference">No preference</option>
                  {FLOWER_WATER_NEEDS.map(w => <option key={w.value} value={w.value}>{w.label}</option>)}
                </select>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Deer Resistant
                <select name="deerResistant" value={preferences.deerResistant} onChange={handleChange} className="mt-1 block w-full p-3 border rounded-md">
                  <option value="No preference">No preference</option>
                  <option value="Yes">Must be deer-resistant</option>
                </select>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Container Growing
                <select name="containerFriendly" value={preferences.containerFriendly} onChange={handleChange} className="mt-1 block w-full p-3 border rounded-md">
                  <option value="No preference">No preference</option>
                  <option value="Yes">Must be container-friendly</option>
                </select>
              </label>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Experience Level
                <select name="difficulty" value={preferences.difficulty} onChange={handleChange} className="mt-1 block w-full p-3 border rounded-md">
                  <option value="No preference">No preference</option>
                  {FLOWER_DIFFICULTY_LEVELS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>
              </label>
            </div>

            <button onClick={findMatches} className="w-full bg-flower text-white p-4 rounded-md hover:bg-flower-dark font-semibold text-lg">
              {"🌸 Find My Perfect Flower"}
            </button>
          </div>

          {/* Results */}
          <div>
            {selectedFlower ? (
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4 border border-ink/10">
                <div className="flex justify-between items-start gap-2 mb-3">
                  <h3 className="text-xl font-bold text-ink">{selectedFlower.name}</h3>
                  <span className={`text-sm px-3 py-1 rounded-full ${getMatchBadgeClass((selectedFlower as any).matchTier ?? "")}`}>
                    {(selectedFlower as any).matchTier}
                  </span>
                </div>
                <p className="text-sm italic mb-4 text-ink/70">{selectedFlower.description}</p>

                {(selectedFlower as any).matchReasons?.length > 0 && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                    <h4 className="text-sm font-semibold text-green-900 mb-2">Why this match?</h4>
                    <ul className="text-sm space-y-1">
                      {(selectedFlower as any).matchReasons.map((r: string, i: number) => <li key={i}>{"• " + r}</li>)}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div><span className="font-medium">Type:</span> <span className="capitalize">{selectedFlower.lifespan.replace(/_/g, " ")}</span></div>
                  <div><span className="font-medium">Colors:</span> <span className="capitalize">{selectedFlower.primaryColors.join(", ")}</span></div>
                  <div><span className="font-medium">Bloom:</span> <span className="capitalize">{selectedFlower.bloomSeason.map(s => s.replace(/_/g, " ")).join(", ")}</span></div>
                  <div><span className="font-medium">Fragrance:</span> {renderStars(selectedFlower.fragranceIntensity)} ({selectedFlower.fragranceIntensity}/10)</div>
                  <div><span className="font-medium">Height:</span> {selectedFlower.matureHeightCm_min}-{selectedFlower.matureHeightCm_max}cm</div>
                  <div><span className="font-medium">Sun:</span> {sunLabel(selectedFlower.sunRequirement)}</div>
                  <div><span className="font-medium">Water:</span> <span className="capitalize">{selectedFlower.waterNeeds}</span></div>
                  <div><span className="font-medium">Difficulty:</span> <span className="capitalize">{selectedFlower.difficulty}</span></div>
                  <div><span className="font-medium">Container:</span> {selectedFlower.containerFriendly ? "Yes" : "No"}</div>
                  <div><span className="font-medium">Deer Resistant:</span> {selectedFlower.deerResistant ? "Yes" : "No"}</div>
                  <div><span className="font-medium">Cut Flower:</span> {renderStars(selectedFlower.cutFlowerQuality)} ({selectedFlower.cutFlowerQuality}/10)</div>
                  <div><span className="font-medium">Pollinators:</span> {renderStars(selectedFlower.pollinatorValue)} ({selectedFlower.pollinatorValue}/10)</div>
                  <div className="col-span-2"><span className="font-medium">Best Uses:</span> {selectedFlower.bestUses.join(", ").replace(/_/g, " ")}</div>
                </div>

                <AffiliateCTA item={selectedFlower} selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} affiliateLinks={affiliateLinks} />
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <p className="text-ink/60">{"Click \"Find My Perfect Flower\" to see matches!"}</p>
              </div>
            )}

            {topMatches.length > 1 && (
              <div className="mt-4">
                <button onClick={() => setShowTopMatches(!showTopMatches)} className="w-full bg-leaf-green text-white p-3 rounded-md font-medium flex justify-between items-center">
                  <span>Top Matches ({topMatches.length - 1} more)</span>
                  <span>{showTopMatches ? "\u2212" : "+"}</span>
                </button>
                {showTopMatches && <div className="mt-3 space-y-2">{topMatches.slice(1).map(s => (
                  <div key={s.id} onClick={() => { setSelectedFlower(s); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`p-3 rounded-lg border cursor-pointer ${selectedFlower?.id === s.id ? "bg-flower-light border-flower/50" : "bg-white border-ink/10 hover:shadow-md"}`}>
                    <div className="flex justify-between"><h4 className="font-semibold">{s.name}</h4><span className={`text-xs px-2 py-1 rounded-full ${getMatchBadgeClass((s as any).matchTier)}`}>{(s as any).matchTier}</span></div>
                    <p className="text-sm text-ink/70 line-clamp-1">{s.description}</p>
                  </div>
                ))}</div>}
              </div>
            )}

            {goodMatches.length > 0 && (
              <div className="mt-4">
                <button onClick={() => setShowGoodMatches(!showGoodMatches)} className="w-full bg-flower-pink text-ink p-3 rounded-md font-medium flex justify-between items-center">
                  <span>Good Matches ({goodMatches.length})</span>
                  <span>{showGoodMatches ? "\u2212" : "+"}</span>
                </button>
                {showGoodMatches && <div className="mt-3 space-y-2">{goodMatches.map(s => (
                  <div key={s.id} onClick={() => { setSelectedFlower(s); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="p-3 rounded-lg border bg-white border-ink/10 hover:shadow-md cursor-pointer">
                    <div className="flex justify-between"><h4 className="font-semibold">{s.name}</h4><span className={`text-xs px-2 py-1 rounded-full ${getMatchBadgeClass((s as any).matchTier)}`}>{(s as any).matchTier}</span></div>
                    <p className="text-sm text-ink/70 line-clamp-1">{s.description}</p>
                  </div>
                ))}</div>}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 mt-4 border border-ink/10">
        <p className="text-xs text-ink/60 text-center">
          <strong>Disclaimer:</strong> Variety descriptions are approximations. Results may vary based on growing conditions.
        </p>
        <p className="text-center text-xs text-ink/50 mt-2">{"\u00A9 " + new Date().getFullYear() + " Pick The Perfect Flower"}</p>
      </div>
    </div>
  );
};

export default ProducePicker;
