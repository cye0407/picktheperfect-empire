import { useState, useEffect } from "react";
import type { Coffee, CoffeePreferences, FlavorNote } from "../types/coffee";
import affiliateLinks from "../data/affiliateLinks";
import { coffeeCrop } from "../crops/coffee";
import { scoreCoffee, coffeeReasons } from "../crops/coffeeScoring";
import { runMatching } from "../engine/match";
import {
  COFFEE_BREW_METHODS,
  COFFEE_ROAST_LEVELS,
  COFFEE_ORIGIN_TYPES,
  COFFEE_BUDGETS,
  COFFEE_CAFFEINE_LEVELS,
  COFFEE_GRIND_TYPES,
} from "../crops/coffeeEnums";
import { AffiliateCTA } from "./AffiliateCTA";
import { renderStars } from "../utils/stars";
import { getProfileBySlug } from "../data/searchProfiles";

const ProducePicker = () => {
  const defaultPreferences = coffeeCrop.defaultPreferences;
  const allFlavorNotes = coffeeCrop.flavorNotes;
  const coffeeData = coffeeCrop.items;

  const [preferences, setPreferences] = useState<CoffeePreferences>(defaultPreferences as CoffeePreferences);
  const [matchedCoffees, setMatchedCoffees] = useState<Coffee[]>([]);
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | null>(null);
  const [showTopMatches, setShowTopMatches] = useState(false);
  const [showGoodMatches, setShowGoodMatches] = useState(false);
  const [isProfileLoad, setIsProfileLoad] = useState(false);

  const handleFlavorChange = (flavor: FlavorNote, isChecked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      flavorProfile: isChecked
        ? [...prev.flavorProfile, flavor]
        : prev.flavorProfile.filter(item => item !== flavor),
    }));
  };

  const numericFields = new Set(["intensityPreference"]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: numericFields.has(name) ? Number(value) : value }));
  };

  const resetPreferences = () => {
    setPreferences({ ...defaultPreferences } as CoffeePreferences);
    setMatchedCoffees([]);
    setSelectedCoffee(null);
  };

  const findMatches = () => {
    const sorted = runMatching({ items: coffeeData as Coffee[], preferences, scoreItem: scoreCoffee, getReasons: coffeeReasons });
    setMatchedCoffees(sorted as Coffee[]);
    setSelectedCoffee(sorted[0] ?? null);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("profile");
    if (slug) {
      const profile = getProfileBySlug(slug);
      if (profile?.preset) {
        setIsProfileLoad(true);
        setPreferences({ ...defaultPreferences, ...profile.preset } as CoffeePreferences);
      }
    }
  }, []);

  useEffect(() => { if (isProfileLoad) { findMatches(); setIsProfileLoad(false); } }, [preferences]);

  const topMatches = matchedCoffees.filter(s => (s as any).matchTier === "Top match");
  const goodMatches = matchedCoffees.filter(s => (s as any).matchTier === "Good match");

  const getMatchBadgeClass = (tier: string) => {
    if (tier === "Top match") return "bg-coffee text-white";
    if (tier === "Good match") return "bg-coffee-light text-ink";
    return "bg-gray-300 text-ink";
  };

  const roastLabel = (roast: string) => {
    const labels: Record<string, string> = {
      light: "Light", medium: "Medium", medium_dark: "Medium-Dark", dark: "Dark",
    };
    return labels[roast] || roast;
  };

  const budgetLabel = (budget: string) => {
    const labels: Record<string, string> = {
      budget: "$10-20", mid_range: "$20-35", premium: "$35-50", luxury: "$50+",
    };
    return labels[budget] || budget;
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 py-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 border-t-4 border-coffee">
        <div className="flex items-center justify-center mb-6">
          <span className="text-3xl mr-2">{"☕"}</span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-ink">Pick the Perfect Coffee</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preferences */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-coffee/20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-coffee">Your Preferences</h2>
              <button onClick={resetPreferences} className="text-sm bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md">Reset</button>
            </div>

            <div className="mb-4 p-3 bg-coffee-cream border border-coffee-light rounded-md">
              <label className="block text-sm font-medium mb-2">Brew Method
                <select name="brewMethod" value={preferences.brewMethod} onChange={handleChange} className="mt-1 block w-full p-3 border rounded-md">
                  <option value="No preference">No preference</option>
                  {COFFEE_BREW_METHODS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                </select>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Roast Level
                <select name="roastLevel" value={preferences.roastLevel} onChange={handleChange} className="mt-1 block w-full p-3 border rounded-md">
                  <option value="No preference">No preference</option>
                  {COFFEE_ROAST_LEVELS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Origin Type
                <select name="originType" value={preferences.originType} onChange={handleChange} className="mt-1 block w-full p-3 border rounded-md">
                  <option value="No preference">No preference</option>
                  {COFFEE_ORIGIN_TYPES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Flavor Profile
                <div className="grid grid-cols-2 gap-2 mt-1 border rounded-md p-3">
                  {allFlavorNotes.map(flavor => (
                    <div key={flavor} className="flex items-center">
                      <input type="checkbox" id={`flavor-${flavor}`} checked={preferences.flavorProfile.includes(flavor as FlavorNote)} onChange={e => handleFlavorChange(flavor as FlavorNote, e.target.checked)} className="mr-2 w-4 h-4" />
                      <label htmlFor={`flavor-${flavor}`} className="text-sm capitalize">{flavor}</label>
                    </div>
                  ))}
                </div>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Intensity Preference (1-10)
                <input type="range" name="intensityPreference" min="1" max="10" value={preferences.intensityPreference} onChange={handleChange} className="w-full mt-2" />
                <div className="text-center">{preferences.intensityPreference}/10</div>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Budget
                <select name="budget" value={preferences.budget} onChange={handleChange} className="mt-1 block w-full p-3 border rounded-md">
                  <option value="No preference">No preference</option>
                  {COFFEE_BUDGETS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                </select>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Caffeine Preference
                <select name="caffeinePreference" value={preferences.caffeinePreference} onChange={handleChange} className="mt-1 block w-full p-3 border rounded-md">
                  <option value="No preference">No preference</option>
                  {COFFEE_CAFFEINE_LEVELS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Grind Preference
                <select name="grindPreference" value={preferences.grindPreference} onChange={handleChange} className="mt-1 block w-full p-3 border rounded-md">
                  <option value="No preference">No preference</option>
                  {COFFEE_GRIND_TYPES.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                </select>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Organic
                <select name="organicPreference" value={preferences.organicPreference} onChange={handleChange} className="mt-1 block w-full p-3 border rounded-md">
                  <option value="No preference">No preference</option>
                  <option value="Yes">Must be organic</option>
                </select>
              </label>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Fair Trade
                <select name="fairTradePreference" value={preferences.fairTradePreference} onChange={handleChange} className="mt-1 block w-full p-3 border rounded-md">
                  <option value="No preference">No preference</option>
                  <option value="Yes">Must be Fair Trade</option>
                </select>
              </label>
            </div>

            <button onClick={findMatches} className="w-full bg-coffee text-white p-4 rounded-md hover:bg-coffee-dark font-semibold text-lg">
              {"☕ Find My Perfect Coffee"}
            </button>
          </div>

          {/* Results */}
          <div>
            {selectedCoffee ? (
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4 border border-ink/10">
                <div className="flex justify-between items-start gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-ink">{selectedCoffee.brand} {selectedCoffee.name}</h3>
                  </div>
                  <span className={`text-sm px-3 py-1 rounded-full ${getMatchBadgeClass((selectedCoffee as any).matchTier ?? "")}`}>
                    {(selectedCoffee as any).matchTier}
                  </span>
                </div>
                <p className="text-sm italic mb-4 text-ink/70">{selectedCoffee.description}</p>

                {(selectedCoffee as any).matchReasons?.length > 0 && (
                  <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <h4 className="text-sm font-semibold text-amber-900 mb-2">Why this match?</h4>
                    <ul className="text-sm space-y-1">
                      {(selectedCoffee as any).matchReasons.map((r: string, i: number) => <li key={i}>{"• " + r}</li>)}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div><span className="font-medium">Brand:</span> {selectedCoffee.brand}</div>
                  <div><span className="font-medium">Origin:</span> {selectedCoffee.origin}</div>
                  <div><span className="font-medium">Roast:</span> {roastLabel(selectedCoffee.roastLevel)}</div>
                  <div><span className="font-medium">Type:</span> <span className="capitalize">{selectedCoffee.originType.replace(/_/g, " ")}</span></div>
                  <div><span className="font-medium">Intensity:</span> {renderStars(selectedCoffee.intensity)} ({selectedCoffee.intensity}/10)</div>
                  <div><span className="font-medium">Acidity:</span> {renderStars(selectedCoffee.acidity)} ({selectedCoffee.acidity}/10)</div>
                  <div><span className="font-medium">Body:</span> {renderStars(selectedCoffee.body)} ({selectedCoffee.body}/10)</div>
                  <div><span className="font-medium">Price:</span> {budgetLabel(selectedCoffee.budget)}</div>
                  <div><span className="font-medium">Caffeine:</span> <span className="capitalize">{selectedCoffee.caffeineLevel.replace(/_/g, " ")}</span></div>
                  <div><span className="font-medium">Grind:</span> <span className="capitalize">{selectedCoffee.grindOptions.map(g => g.replace(/_/g, " ")).join(", ")}</span></div>
                  <div><span className="font-medium">Organic:</span> {selectedCoffee.organic ? "Yes" : "No"}</div>
                  <div><span className="font-medium">Fair Trade:</span> {selectedCoffee.fairTrade ? "Yes" : "No"}</div>
                  <div className="col-span-2"><span className="font-medium">Flavors:</span> <span className="capitalize">{selectedCoffee.flavorNotes.join(", ")}</span></div>
                  <div className="col-span-2"><span className="font-medium">Best For:</span> <span className="capitalize">{selectedCoffee.brewMethods.map(b => b.replace(/_/g, " ")).join(", ")}</span></div>
                </div>

                <AffiliateCTA item={selectedCoffee} affiliateLinks={affiliateLinks} />
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <p className="text-ink/60">{"Click \"Find My Perfect Coffee\" to see matches!"}</p>
              </div>
            )}

            {topMatches.length > 1 && (
              <div className="mt-4">
                <button onClick={() => setShowTopMatches(!showTopMatches)} className="w-full bg-coffee text-white p-3 rounded-md font-medium flex justify-between items-center">
                  <span>Top Matches ({topMatches.length - 1} more)</span>
                  <span>{showTopMatches ? "\u2212" : "+"}</span>
                </button>
                {showTopMatches && <div className="mt-3 space-y-2">{topMatches.slice(1).map(s => (
                  <div key={s.id} onClick={() => { setSelectedCoffee(s); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`p-3 rounded-lg border cursor-pointer ${selectedCoffee?.id === s.id ? "bg-coffee-cream border-coffee/50" : "bg-white border-ink/10 hover:shadow-md"}`}>
                    <div className="flex justify-between"><h4 className="font-semibold">{s.brand} {s.name}</h4><span className={`text-xs px-2 py-1 rounded-full ${getMatchBadgeClass((s as any).matchTier)}`}>{(s as any).matchTier}</span></div>
                    <p className="text-sm text-ink/70 line-clamp-1">{s.description}</p>
                  </div>
                ))}</div>}
              </div>
            )}

            {goodMatches.length > 0 && (
              <div className="mt-4">
                <button onClick={() => setShowGoodMatches(!showGoodMatches)} className="w-full bg-coffee-light text-ink p-3 rounded-md font-medium flex justify-between items-center">
                  <span>Good Matches ({goodMatches.length})</span>
                  <span>{showGoodMatches ? "\u2212" : "+"}</span>
                </button>
                {showGoodMatches && <div className="mt-3 space-y-2">{goodMatches.map(s => (
                  <div key={s.id} onClick={() => { setSelectedCoffee(s); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="p-3 rounded-lg border bg-white border-ink/10 hover:shadow-md cursor-pointer">
                    <div className="flex justify-between"><h4 className="font-semibold">{s.brand} {s.name}</h4><span className={`text-xs px-2 py-1 rounded-full ${getMatchBadgeClass((s as any).matchTier)}`}>{(s as any).matchTier}</span></div>
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
          <strong>Disclaimer:</strong> Coffee descriptions are approximations. Taste is subjective and may vary by batch and freshness.
        </p>
        <p className="text-center text-xs text-ink/50 mt-2">{"\u00A9 " + new Date().getFullYear() + " Pick The Perfect Coffee"}</p>
      </div>
    </div>
  );
};

export default ProducePicker;
