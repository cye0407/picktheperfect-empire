// src/data/affiliateLinks.ts
// SeedsNow = bare root plants (US)
// West Coast Seeds = seeds (US/Canada)

export type Region = "US" | "EU";

export interface AffiliateLink {
  vendor: string;
  url: string;
  region: Region;
}

export interface StrawberryAffiliateLinks {
  [strawberryName: string]: AffiliateLink[];
}

const SEEDSNOW_REF = "?rfsn=8958863.0984050&utm_source=refersion&utm_medium=affiliate&utm_campaign=8958863.0984050";
const WCS_REF = "?rfsn=8639095.6ec160";

const affiliateLinks: StrawberryAffiliateLinks = {
  // SeedsNow varieties (bare root plants)
  "Seascape": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/products/strawberry-roots-bundles-seascape${SEEDSNOW_REF}`, region: "US" }],
  "San Andreas": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/products/san-andreas-strawberry-roots-bundles${SEEDSNOW_REF}`, region: "US" }],
  "Jewel": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/products/jewel-strawberry-roots${SEEDSNOW_REF}`, region: "US" }],

  // West Coast Seeds varieties (seeds)
  "Fresca": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/products/fresca${WCS_REF}`, region: "US" }],
  "Mignonette": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/products/mignonette${WCS_REF}`, region: "US" }],
  "Yellow Wonder": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/products/yellow-wonder-alpine${WCS_REF}`, region: "US" }],
  "Regina": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/products/regina${WCS_REF}`, region: "US" }],
  "Rose Berries Galore F1": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/products/rose-berries-galore-f1${WCS_REF}`, region: "US" }],
  "Hot Pink Berri Basket F1": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/products/hot-pink-berri-basket-f1${WCS_REF}`, region: "US" }],
};

export default affiliateLinks;
