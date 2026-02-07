import { useMemo } from "react";

type AffiliateLink = {
  vendor: string;
  url: string;
};

type CoffeeAffiliateLinks = {
  [coffeeName: string]: AffiliateLink[];
};

type MinimalItem = {
  name: string;
  brand: string;
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
  affiliateLinks: CoffeeAffiliateLinks;
}) {
  const { item, affiliateLinks } = props;

  const coffeeLink = useMemo(() => {
    const links = affiliateLinks[item.name] || [];
    return links.find((link) => isValidHttpUrl(link.url));
  }, [affiliateLinks, item.name]);

  if (!coffeeLink) {
    return null;
  }

  return (
    <div className="mt-6 p-5 bg-gradient-to-br from-coffee/10 to-coffee/5 rounded-lg border-2 border-coffee/30 shadow-sm">
      <h4 className="font-bold text-lg text-ink mb-4">{"Buy " + item.brand + " " + item.name}</h4>

      <a
        href={coffeeLink.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-coffee text-white text-center py-3 px-4 rounded-lg hover:bg-coffee-dark transition-all font-semibold text-base shadow-md hover:shadow-lg"
      >
        View on Amazon
      </a>

      <p className="text-xs text-ink/50 mt-3 text-center">
        Ships from Amazon
      </p>
    </div>
  );
}
