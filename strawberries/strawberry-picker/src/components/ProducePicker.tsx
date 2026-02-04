import { useState, useEffect } from "react";
import type { Region, Strawberry, StrawberryPreferences } from "../types/strawberry";
import affiliateLinks from "../data/affiliateLinks";
import { strawberryCrop } from "../crops/strawberry";
import { scoreStrawberry, strawberryReasons } from "../crops/strawberryScoring";
import { runMatching } from "../engine/match";
import type { StrawberryUseCase } from "../crops/strawberryEnums";
import { STRAWBERRY_TYPES, FLAVOR_CATEGORIES, TEXTURE_CATEGORIES, SIZE_CATEGORIES, HARVEST_WINDOWS, YIELD_POTENTIALS, CLIMATES, DIFFICULTY_LEVELS } from "../crops/strawberryEnums";
import { AffiliateCTA } from "./AffiliateCTA";
import { renderStars } from "../utils/stars";
import { getProfileBySlug } from "../data/searchProfiles";

const ProducePicker = () => {
  const defaultPreferences = strawberryCrop.defaultPreferences;
  const allUseCases = strawberryCrop.useCases;
  const strawberryData = strawberryCrop.items;

  const [preferences, setPreferences] = useState<StrawberryPreferences>(defaultPreferences as StrawberryPreferences);
  const [matchedStrawberries, setMatchedStrawberries] = useState<Strawberry[]>([]);
  const [selectedStrawberry, setSelectedStrawberry] = useState<Strawberry | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region>("US");
  const [showTopMatches, setShowTopMatches] = useState(false);
  const [showGoodMatches, setShowGoodMatches] = useState(false);
  const [isProfileLoad, setIsProfileLoad] = useState(false);

  const handleUseCaseChange = (use: StrawberryUseCase, isChecked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      useCase: isChecked ? [...prev.useCase, use] : prev.useCase.filter(item => item !== use)
    }));
  };

  const numericFields = new Set(["sweetness", "tartness"]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: numericFields.has(name) ? Number(value) : value }));
  };

  const resetPreferences = () => {
    setPreferences({ ...defaultPreferences } as StrawberryPreferences);
    setMatchedStrawberries([]);
    setSelectedStrawberry(null);
  };

  const findMatches = () => {
    const sorted = runMatching({ items: strawberryData as Strawberry[], preferences, scoreItem: scoreStrawberry, getReasons: strawberryReasons });
    setMatchedStrawberries(sorted as Strawberry[]);
    setSelectedStrawberry(sorted[0] ?? null);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("profile");
    if (slug) {
      const profile = getProfileBySlug(slug);
      if (profile?.preset) {
        setIsProfileLoad(true);
        setPreferences({ ...defaultPreferences, ...profile.preset } as StrawberryPreferences);
      }
    }
  }, []);

  useEffect(() => { if (isProfileLoad) { findMatches(); setIsProfileLoad(false); } }, [preferences]);

  const topMatches = matchedStrawberries.filter(s => (s as any).matchTier === "Top match");
  const goodMatches = matchedStrawberries.filter(s => (s as any).matchTier === "Good match");

  const getMatchBadgeClass = (tier: string) => {
    if (tier === "Top match") return "bg-leaf-green text-white";
    if (tier === "Good match") return "bg-strawberry-pink text-ink";
    return "bg-gray-300 text-ink";
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 py-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 border-t-4 border-strawberry-red">
        <div className="flex items-center justify-center mb-6">
          <span className="text-3xl mr-2">🍓</span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-ink">Pick the Perfect Strawberry</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preferences */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-strawberry-red/20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-strawberry-red">Your Preferences</h2>
              <button onClick={resetPreferences} className="text-sm bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md">Reset</button>
            </div>

            <div className="mb-4 p-3 bg-strawberry-light border border-strawberry-pink rounded-md">
              <label className="block text-sm font-medium mb-2">Strawberry Type
                <select name="strawberryType" value={preferences.strawberryType} onChange={handleChange} className="mt-1 block w-full p-3 border rounded-md">
                  <option value="No preference">No preference</option>
                  {STRAWBERRY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
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
              <label className="block text-sm font-medium mb-2">Sweetness (1-10)
                <input type="range" name="sweetness" min="1" max="10" value={preferences.sweetness} onChange={handleChange} className="w-full mt-2" />
                <div className="text-center">{preferences.sweetness}/10</div>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Tartness (1-10)
                <input type="range" name="tartness" min="1" max="10" value={preferences.tartness} onChange={handleChange} className="w-full mt-2" />
                <div className="text-center">{preferences.tartness}/10</div>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Berry Size
                <select name="sizeCategory" value={preferences.sizeCategory} onChange={handleChange} className="mt-1 block w-full p-3 border rounded-md">
                  <option value="No preference">No preference</option>
                  {SIZE_CATEGORIES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Harvest Window
                <select name="harvestWindow" value={preferences.harvestWindow} onChange={handleChange} className="mt-1 block w-full p-3 border rounded-md">
                  <option value="No preference">No preference</option>
                  {HARVEST_WINDOWS.map(h => <option key={h.value} value={h.value}>{h.label}</option>)}
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
                  {DIFFICULTY_LEVELS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>
              </label>
            </div>

            <button onClick={findMatches} className="w-full bg-strawberry-red text-white p-4 rounded-md hover:bg-strawberry-red/90 font-semibold text-lg">
              🍓 Find My Perfect Strawberry
            </button>
          </div>

          {/* Results */}
          <div>
            {selectedStrawberry ? (
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4 border border-ink/10">
                <div className="flex justify-between items-start gap-2 mb-3">
                  <h3 className="text-xl font-bold text-ink">{selectedStrawberry.name}</h3>
                  <span className={`text-sm px-3 py-1 rounded-full ${getMatchBadgeClass((selectedStrawberry as any).matchTier ?? "")}`}>
                    {(selectedStrawberry as any).matchTier}
                  </span>
                </div>
                <p className="text-sm italic mb-4 text-ink/70">{selectedStrawberry.description}</p>

                {(selectedStrawberry as any).matchReasons?.length > 0 && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                    <h4 className="text-sm font-semibold text-green-900 mb-2">Why this match?</h4>
                    <ul className="text-sm space-y-1">
                      {(selectedStrawberry as any).matchReasons.map((r: string, i: number) => <li key={i}>• {r}</li>)}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div><span className="font-medium">Type:</span> <span className="capitalize">{selectedStrawberry.type.replace("_", " ")}</span></div>
                  <div><span className="font-medium">Size:</span> <span className="capitalize">{selectedStrawberry.sizeCategory.replace("_", " ")}</span></div>
                  <div><span className="font-medium">Sweetness:</span> {renderStars(selectedStrawberry.sweetness)} ({selectedStrawberry.sweetness}/10)</div>
                  <div><span className="font-medium">Tartness:</span> {renderStars(selectedStrawberry.tartness)} ({selectedStrawberry.tartness}/10)</div>
                  <div><span className="font-medium">Harvest:</span> <span className="capitalize">{selectedStrawberry.harvestWindow}</span></div>
                  <div><span className="font-medium">Yield:</span> <span className="capitalize">{selectedStrawberry.yieldPotential.replace("_", " ")}</span></div>
                  <div><span className="font-medium">Difficulty:</span> <span className="capitalize">{selectedStrawberry.difficulty}</span></div>
                  <div><span className="font-medium">Container:</span> {selectedStrawberry.containerFriendly ? "✅ Yes" : "❌ No"}</div>
                  <div className="col-span-2"><span className="font-medium">Best Uses:</span> {selectedStrawberry.bestUses.join(", ").replace(/_/g, " ")}</div>
                </div>

                <AffiliateCTA item={selectedStrawberry} selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} affiliateLinks={affiliateLinks} />
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <p className="text-ink/60">Click "Find My Perfect Strawberry" to see matches!</p>
              </div>
            )}

            {topMatches.length > 1 && (
              <div className="mt-4">
                <button onClick={() => setShowTopMatches(!showTopMatches)} className="w-full bg-leaf-green text-white p-3 rounded-md font-medium flex justify-between items-center">
                  <span>Top Matches ({topMatches.length - 1} more)</span>
                  <span>{showTopMatches ? "−" : "+"}</span>
                </button>
                {showTopMatches && <div className="mt-3 space-y-2">{topMatches.slice(1).map(s => (
                  <div key={s.id} onClick={() => { setSelectedStrawberry(s); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`p-3 rounded-lg border cursor-pointer ${selectedStrawberry?.id === s.id ? "bg-strawberry-light border-strawberry-red/50" : "bg-white border-ink/10 hover:shadow-md"}`}>
                    <div className="flex justify-between"><h4 className="font-semibold">{s.name}</h4><span className={`text-xs px-2 py-1 rounded-full ${getMatchBadgeClass((s as any).matchTier)}`}>{(s as any).matchTier}</span></div>
                    <p className="text-sm text-ink/70 line-clamp-1">{s.description}</p>
                  </div>
                ))}</div>}
              </div>
            )}

            {goodMatches.length > 0 && (
              <div className="mt-4">
                <button onClick={() => setShowGoodMatches(!showGoodMatches)} className="w-full bg-strawberry-pink text-ink p-3 rounded-md font-medium flex justify-between items-center">
                  <span>Good Matches ({goodMatches.length})</span>
                  <span>{showGoodMatches ? "−" : "+"}</span>
                </button>
                {showGoodMatches && <div className="mt-3 space-y-2">{goodMatches.map(s => (
                  <div key={s.id} onClick={() => { setSelectedStrawberry(s); window.scrollTo({ top: 0, behavior: "smooth" }); }}
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
        <p className="text-center text-xs text-ink/50 mt-2">© {new Date().getFullYear()} Pick The Perfect Strawberry</p>
      </div>
    </div>
  );
};

export default ProducePicker;
