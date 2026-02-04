// src/data/affiliateLinks.ts
// SeedsNow (SeedSow) = seeds (US)
// West Coast Seeds = seeds (US/Canada)

export type Region = "US" | "EU";

export interface AffiliateLink {
  vendor: string;
  url: string;
  region: Region;
}

export interface FlowerAffiliateLinks {
  [flowerName: string]: AffiliateLink[];
}

const SEEDSNOW_REF = "?rfsn=8958863.0984050&utm_source=refersion&utm_medium=affiliate&utm_campaign=8958863.0984050";
const WCS_REF = "?rfsn=8639095.6ec160";

const affiliateLinks: FlowerAffiliateLinks = {
  // === Both vendors ===
  "Alyssum": [
    { vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/alyssum${SEEDSNOW_REF}`, region: "US" },
    { vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/alyssum-seeds${WCS_REF}`, region: "US" },
  ],
  "Aster": [
    { vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/aster${SEEDSNOW_REF}`, region: "US" },
    { vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/aster-seeds${WCS_REF}`, region: "US" },
  ],
  "Baby Blue Eyes": [
    { vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/baby-blue-eyes${SEEDSNOW_REF}`, region: "US" },
    { vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/nemophila-seeds${WCS_REF}`, region: "US" },
  ],
  "Baby's Breath": [
    { vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/babys-breath${SEEDSNOW_REF}`, region: "US" },
    { vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/gypsophila-seeds${WCS_REF}`, region: "US" },
  ],
  "Columbine": [
    { vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/columbine${SEEDSNOW_REF}`, region: "US" },
    { vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/columbine-seeds${WCS_REF}`, region: "US" },
  ],
  "Coneflower": [
    { vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/coneflowers${SEEDSNOW_REF}`, region: "US" },
    { vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/echinacea-seeds${WCS_REF}`, region: "US" },
  ],
  "Coreopsis": [
    { vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/coreopsis${SEEDSNOW_REF}`, region: "US" },
    { vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/coreopsis-seeds${WCS_REF}`, region: "US" },
  ],
  "Cosmos": [
    { vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/cosmos${SEEDSNOW_REF}`, region: "US" },
    { vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/cosmos-seeds${WCS_REF}`, region: "US" },
  ],
  "Daisy": [
    { vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/daisy${SEEDSNOW_REF}`, region: "US" },
    { vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/daisy-seeds${WCS_REF}`, region: "US" },
  ],
  "Echinacea": [
    { vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/echinacea${SEEDSNOW_REF}`, region: "US" },
    { vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/echinacea-seeds${WCS_REF}`, region: "US" },
  ],
  "Flax": [
    { vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/flax${SEEDSNOW_REF}`, region: "US" },
    { vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/flax-seeds${WCS_REF}`, region: "US" },
  ],
  "Foxglove": [
    { vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/foxglove${SEEDSNOW_REF}`, region: "US" },
    { vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/foxglove-seeds${WCS_REF}`, region: "US" },
  ],
  "Gaillardia": [
    { vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/gaillardia${SEEDSNOW_REF}`, region: "US" },
    { vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/gaillardia-seeds${WCS_REF}`, region: "US" },
  ],
  "Hollyhock": [
    { vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/hollyhock${SEEDSNOW_REF}`, region: "US" },
    { vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/hollyhocks-seeds${WCS_REF}`, region: "US" },
  ],
  "Marigold": [
    { vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/marigold-herb${SEEDSNOW_REF}`, region: "US" },
    { vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/marigold-seeds${WCS_REF}`, region: "US" },
  ],
  "Milkweed": [
    { vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/milkweed${SEEDSNOW_REF}`, region: "US" },
    { vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/milkweed-seeds${WCS_REF}`, region: "US" },
  ],
  "Nasturtium": [
    { vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/nasturtium${SEEDSNOW_REF}`, region: "US" },
    { vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/nasturtium-seeds${WCS_REF}`, region: "US" },
  ],
  "Phacelia": [
    { vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/phacelia${SEEDSNOW_REF}`, region: "US" },
    { vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/phacelia-seeds${WCS_REF}`, region: "US" },
  ],
  "Snapdragon": [
    { vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/snapdragon${SEEDSNOW_REF}`, region: "US" },
    { vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/snapdragon-seeds${WCS_REF}`, region: "US" },
  ],
  "Sunflower": [
    { vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/sunflower-collection${SEEDSNOW_REF}`, region: "US" },
    { vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/sunflower-seeds${WCS_REF}`, region: "US" },
  ],
  "Zinnia": [
    { vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/zinnia${SEEDSNOW_REF}`, region: "US" },
    { vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/zinnia-seeds${WCS_REF}`, region: "US" },
  ],
  "Lupine": [
    { vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/lupine${SEEDSNOW_REF}`, region: "US" },
    { vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/lupin-seeds${WCS_REF}`, region: "US" },
  ],

  // === SeedsNow only ===
  "Black-Eyed Susan": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/black-eyed-susan${SEEDSNOW_REF}`, region: "US" }],
  "Blazing Star": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/blazing-star${SEEDSNOW_REF}`, region: "US" }],
  "Borage": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/borage${SEEDSNOW_REF}`, region: "US" }],
  "Candytuft": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/candytuft${SEEDSNOW_REF}`, region: "US" }],
  "Catmint": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/catmint${SEEDSNOW_REF}`, region: "US" }],
  "Chamomile": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/chamomile${SEEDSNOW_REF}`, region: "US" }],
  "Dandelion": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/dandelion${SEEDSNOW_REF}`, region: "US" }],
  "Evening Primrose": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/evening-primrose${SEEDSNOW_REF}`, region: "US" }],
  "Forget-Me-Not": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/forget-me-not${SEEDSNOW_REF}`, region: "US" }],
  "Globe Gilia": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/globe-gilia${SEEDSNOW_REF}`, region: "US" }],
  "Hyssop": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/hyssop${SEEDSNOW_REF}`, region: "US" }],
  "Larkspur": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/larkspur${SEEDSNOW_REF}`, region: "US" }],
  "Lavender": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/lavender${SEEDSNOW_REF}`, region: "US" }],
  "Love-in-a-Mist": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/love-in-a-mist${SEEDSNOW_REF}`, region: "US" }],
  "Lunaria": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/lunaria-silver-dollar${SEEDSNOW_REF}`, region: "US" }],
  "Marjoram": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/marjoram${SEEDSNOW_REF}`, region: "US" }],
  "Nodding Catchfly": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/nodding-catchfly${SEEDSNOW_REF}`, region: "US" }],
  "Queen Anne's Lace": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/queen-annes-lace${SEEDSNOW_REF}`, region: "US" }],
  "Scarlet Sage": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/scarlet-sage${SEEDSNOW_REF}`, region: "US" }],
  "Soapwort": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/soapwort${SEEDSNOW_REF}`, region: "US" }],
  "Spotted Bee Balm": [{ vendor: "SeedsNow", url: `https://www.seedsnow.com/collections/spotted-bee-balm${SEEDSNOW_REF}`, region: "US" }],

  // === West Coast Seeds only ===
  "Agastache": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/agastache-seeds${WCS_REF}`, region: "US" }],
  "Amaranth": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/amaranth-seeds${WCS_REF}`, region: "US" }],
  "Calendula": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/calendula-seeds${WCS_REF}`, region: "US" }],
  "California Poppy": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/california-poppy-seeds${WCS_REF}`, region: "US" }],
  "Campanula": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/campanula-seeds${WCS_REF}`, region: "US" }],
  "Celosia": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/celosia-seeds${WCS_REF}`, region: "US" }],
  "Cleome": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/cleome-seeds${WCS_REF}`, region: "US" }],
  "Cornflower": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/cornflower-seeds${WCS_REF}`, region: "US" }],
  "Delphinium": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/delphinium-seeds${WCS_REF}`, region: "US" }],
  "Dianthus": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/dianthus-seeds${WCS_REF}`, region: "US" }],
  "Eucalyptus": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/eucalyptus-seeds${WCS_REF}`, region: "US" }],
  "Lavatera": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/lavatera-seeds${WCS_REF}`, region: "US" }],
  "Lobelia": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/lobelia-seeds${WCS_REF}`, region: "US" }],
  "Morning Glory": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/morning-glory-seeds${WCS_REF}`, region: "US" }],
  "Nicotiana": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/nicotiana-seeds${WCS_REF}`, region: "US" }],
  "Nigella": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/nigella-seeds${WCS_REF}`, region: "US" }],
  "Pansy": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/viola-seeds${WCS_REF}`, region: "US" }],
  "Petunia": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/petunia-seeds${WCS_REF}`, region: "US" }],
  "Poppy": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/poppy-seeds${WCS_REF}`, region: "US" }],
  "Rudbeckia": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/rudbeckia-seeds${WCS_REF}`, region: "US" }],
  "Salvia": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/salvia-seeds${WCS_REF}`, region: "US" }],
  "Scabiosa": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/scabiosa-seeds${WCS_REF}`, region: "US" }],
  "Statice": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/statice-seeds${WCS_REF}`, region: "US" }],
  "Stock": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/stock-seeds${WCS_REF}`, region: "US" }],
  "Strawflower": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/strawflower-seeds${WCS_REF}`, region: "US" }],
  "Sweet Pea": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/sweet-pea-seeds${WCS_REF}`, region: "US" }],
  "Yarrow": [{ vendor: "West Coast Seeds", url: `https://www.westcoastseeds.com/collections/yarrow-seeds${WCS_REF}`, region: "US" }],
};

export default affiliateLinks;
