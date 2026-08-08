import { whatsappLink } from "@/lib/site-config";

/** Hyperlink anchors for the Ramadan meal delivery guide. */
export const RAMADAN_MEAL_DELIVERY_LINKS = [
  {
    anchor:
      "planning a weekly Ramadan menu in advance takes the stress out of both suhoor and iftar",
    url: "https://www.jhah.com/en/news-events/news-articles/healthy-ramadan-menu-ideas-suhoor-iftar-guide/",
  },
  {
    anchor:
      "the body needs nourishment that restores energy steadily without overwhelming digestion",
    url: "https://gulfnews.com/uae/ramadan/ramadan-2026-in-uae-what-to-eat-and-avoid-at-iftar-and-suhoor-1.500447039",
  },
  {
    anchor: "why NutriChef page",
    url: "https://www.nutrichef.ae/why-us",
  },
  {
    anchor: "live NutriChef menu",
    url: "https://www.nutrichef.ae/menu",
  },
  {
    anchor: "subscribe and save page",
    url: "https://www.nutrichef.ae/subscribe",
  },
  {
    anchor: "build your plan page",
    url: "https://www.nutrichef.ae/plans",
  },
  {
    anchor: "UAE coverage page",
    url: "https://www.nutrichef.ae/uae",
  },
  {
    anchor: "plans page",
    url: "https://www.nutrichef.ae/plans",
  },
  {
    anchor: "WhatsApp",
    url: whatsappLink(
      "Hi NutriChef, I'd like help starting a Ramadan meal plan.",
    ),
  },
] as const;
