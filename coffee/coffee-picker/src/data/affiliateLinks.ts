// src/data/affiliateLinks.ts
// Amazon affiliate links — tag will be replaced with the real one later

export interface AffiliateLink {
  vendor: string;
  url: string;
}

export interface CoffeeAffiliateLinks {
  [coffeeName: string]: AffiliateLink[];
}

const AMAZON_TAG = "PLACEHOLDER";

function amazonUrl(asin: string): string {
  return `https://amazon.com/dp/${asin}?tag=${AMAZON_TAG}`;
}

const affiliateLinks: CoffeeAffiliateLinks = {
  "Super Crema": [
    { vendor: "Amazon", url: amazonUrl("B000SDKDM4") },
  ],
  "Qualita Oro": [
    { vendor: "Amazon", url: amazonUrl("B0014CVEH6") },
  ],
  "Classico Medium Roast": [
    { vendor: "Amazon", url: amazonUrl("B001E4S05A") },
  ],
  "Intenso Dark Roast": [
    { vendor: "Amazon", url: amazonUrl("B07NQKL14G") },
  ],
  "Hair Bender": [
    { vendor: "Amazon", url: amazonUrl("B00B5GJMBC") },
  ],
  "Holler Mountain": [
    { vendor: "Amazon", url: amazonUrl("B00B5GP2EY") },
  ],
  "Three Africas": [
    { vendor: "Amazon", url: amazonUrl("B071JM3LJ3") },
  ],
  "Bella Donovan": [
    { vendor: "Amazon", url: amazonUrl("B071JM2DT5") },
  ],
  "Big Trouble": [
    { vendor: "Amazon", url: amazonUrl("B07FKQGXSD") },
  ],
  "Hologram": [
    { vendor: "Amazon", url: amazonUrl("B07FKNQ7GR") },
  ],
  "Major Dickason's Blend": [
    { vendor: "Amazon", url: amazonUrl("B001GVISJM") },
  ],
  "Big Bang Medium Roast": [
    { vendor: "Amazon", url: amazonUrl("B07DFF1M2S") },
  ],
  "Death Wish": [
    { vendor: "Amazon", url: amazonUrl("B006CQ1ZHI") },
  ],
  "Black Cat Classic Espresso": [
    { vendor: "Amazon", url: amazonUrl("B079YB4NV6") },
  ],
  "Frequency Blend": [
    { vendor: "Amazon", url: amazonUrl("B079YCJXLZ") },
  ],
  "Kick Ass Dark Roast": [
    { vendor: "Amazon", url: amazonUrl("B00ERI55YI") },
  ],
  "Three Sisters Medium Roast": [
    { vendor: "Amazon", url: amazonUrl("B00ERI55K8") },
  ],
  "Ethiopian Yirgacheffe": [
    { vendor: "Amazon", url: amazonUrl("B003U5TLHO") },
  ],
  "Colombian Supremo": [
    { vendor: "Amazon", url: amazonUrl("B003U5TLIU") },
  ],
  "Dek Decaf Espresso": [
    { vendor: "Amazon", url: amazonUrl("B08BLYV4VZ") },
  ],
  "Decaf Swiss Water Process": [
    { vendor: "Amazon", url: amazonUrl("B00ERI55IU") },
  ],
  "Subtle Earth Organic": [
    { vendor: "Amazon", url: amazonUrl("B01I4EF9PU") },
  ],
  "Cold Brew Reserve": [
    { vendor: "Amazon", url: amazonUrl("B014M5FJ2Y") },
  ],
  "Organic Cold Brew Blend": [
    { vendor: "Amazon", url: amazonUrl("B0727ZQFL5") },
  ],
  "Dark Roast Whole Bean": [
    { vendor: "Amazon", url: amazonUrl("B00JSMAQ66") },
  ],
  "French Roast": [
    { vendor: "Amazon", url: amazonUrl("B01KFVKWF8") },
  ],
  "Medium Roast": [
    { vendor: "Amazon", url: amazonUrl("B07W1BQPCS") },
  ],
  "Decaf Major Dickason's Blend": [
    { vendor: "Amazon", url: amazonUrl("B001KIE2DO") },
  ],
  "The Original": [
    { vendor: "Amazon", url: amazonUrl("B008YB0L6O") },
  ],
  "Colombia Medium Roast": [
    { vendor: "Amazon", url: amazonUrl("B071K8FZFL") },
  ],
  "Estate Medium Roast Kona": [
    { vendor: "Amazon", url: amazonUrl("B0716GXSHJ") },
  ],
  "Costa Rica Light Roast": [
    { vendor: "Amazon", url: amazonUrl("B001E50TSG") },
  ],
  "Fog Chaser": [
    { vendor: "Amazon", url: amazonUrl("B00H25FAEY") },
  ],
  "Decaffeinato Medium Roast": [
    { vendor: "Amazon", url: amazonUrl("B001E4S04Q") },
  ],
  "Sunday Morning Decaf": [
    { vendor: "Amazon", url: amazonUrl("B00ZR10XEO") },
  ],
  "Half Ass Medium Roast": [
    { vendor: "Amazon", url: amazonUrl("B078YNK4GG") },
  ],
  "Electric Unicorn Fruity Cereal": [
    { vendor: "Amazon", url: amazonUrl("B07JZRXZ7Z") },
  ],
  "Gran Espresso": [
    { vendor: "Amazon", url: amazonUrl("B000SDKDM4") },
  ],
  "Jaguar Espresso": [
    { vendor: "Amazon", url: amazonUrl("B08N5WRQHK") },
  ],
};

export default affiliateLinks;
