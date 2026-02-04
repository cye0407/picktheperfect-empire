import React, { useMemo } from "react";
import type { Region } from "../types/strawberry";

type AffiliateLink = {
  vendor: string;
  url: string;
  region: Region;
};

type StrawberryAffiliateLinks = {
  [strawberryName: string]: AffiliateLink[];
};

type MinimalItem = {
  name: string;
  containerFriendly?: boolean;
};

function isValidHttpUrl(url?: string) {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function AffiliateCTA(props: {
  item: MinimalItem;
  selectedRegion: Region;
  setSelectedRegion: React.Dispatch<React.SetStateAction<Region>>;
  affiliateLinks: StrawberryAffiliateLinks;
}) {
  const { item, affiliateLinks } = props;

  const strawberryLink = useMemo(() => {
    const links = affiliateLinks[item.name] || [];
    return links.find((link) => isValidHttpUrl(link.url));
  }, [affiliateLinks, item.name]);

  if (!strawberryLink) {
    return null;
  }

  return (
    <div className="mt-6 p-5 bg-gradient-to-br from-leaf-green/10 to-leaf-green/5 rounded-lg border-2 border-leaf-green/30 shadow-sm">
      <h4 className="font-bold text-lg text-ink mb-4">🌱 Grow {item.name}</h4>

      <a
        href={strawberryLink.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-strawberry-red text-white text-center py-3 px-4 rounded-lg hover:bg-strawberry-red/90 transition-all font-semibold text-base shadow-md hover:shadow-lg"
      >
        🍓 Buy Plants/Seeds
      </a>

      <p className="text-xs text-ink/50 mt-3 text-center">
        Ships to US & Canada
      </p>
    </div>
  );
}
