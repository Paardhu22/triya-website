import { placeholder } from "@/lib/placeholder";

export type PropertyKind = "Hotel" | "Residence";

export type Property = {
  slug: string;
  name: string;
  location: string;
  kind: PropertyKind;
  /** Placeholder source. Swap for a local /properties/*.jpg once shoots are delivered. */
  image: string;
  /** Intrinsic ratio the hero strip lays the frame out with. */
  ratio: string;
  tagline: string;
  /** Two lines at most — this is what the full-height listing band carries. */
  summary: string;
  /** The long version, for the detail takeover. */
  description: string;
  stats: { label: string; value: string }[];
  amenities: string[];
  /** [0] is the detail hero; [0] and [1] are the pair the listing band clusters. */
  gallery: string[];
};

/**
 * Ordered residence/hotel/residence/hotel so `heroProperties` — the first six —
 * comes out mixed without a second hand-written list.
 */
export const properties: Property[] = [
  {
    slug: "triya-house",
    name: "Triya House",
    location: "Banjara Hills",
    kind: "Residence",
    image: placeholder("triya-house", 900, 700),
    ratio: "5 / 4",
    tagline: "Managed living, five minutes from Road No. 12",
    summary:
      "A restored bungalow reworked into twenty-two private rooms around a shared courtyard.",
    description:
      "A restored bungalow reworked into twenty-two private rooms around a shared courtyard. Meals, housekeeping and a quiet common floor are built into the stay, so the day starts without errands. The original mango tree stayed; everything around it was rebuilt.",
    stats: [
      { label: "Rooms", value: "22" },
      { label: "Opened", value: "2019" },
      { label: "Minimum stay", value: "1 month" },
      { label: "From", value: "₹18,000 / mo" },
    ],
    amenities: [
      "All meals included",
      "Daily housekeeping",
      "High-speed Wi-Fi",
      "Laundry",
      "24/7 security",
      "Common lounge",
    ],
    gallery: [
      placeholder("triya-house-a", 1600, 900),
      placeholder("triya-house-b", 900, 1125),
      placeholder("triya-house-c", 900, 700),
      placeholder("triya-house-d", 900, 700),
    ],
  },
  {
    slug: "the-terrace",
    name: "The Terrace",
    location: "Gachibowli",
    kind: "Hotel",
    image: placeholder("triya-terrace", 1000, 640),
    ratio: "16 / 10",
    tagline: "A business hotel built for the financial district",
    summary:
      "Forty-eight rooms and a rooftop kitchen, a short walk from the Gachibowli tech corridor.",
    description:
      "Forty-eight rooms and a rooftop restaurant a short walk from the Gachibowli tech corridor. Built for short stays that still feel considered — fast check-in, quiet floors, and a kitchen that runs late enough for a flight that landed at midnight.",
    stats: [
      { label: "Rooms", value: "48" },
      { label: "Opened", value: "2021" },
      { label: "Check-in", value: "24 hours" },
      { label: "From", value: "₹6,400 / night" },
    ],
    amenities: [
      "Rooftop restaurant",
      "Airport transfer",
      "Business lounge",
      "Gym",
      "Valet parking",
      "Room service",
    ],
    gallery: [
      placeholder("triya-terrace-a", 1600, 900),
      placeholder("triya-terrace-b", 900, 1125),
      placeholder("triya-terrace-c", 900, 700),
      placeholder("triya-terrace-d", 900, 700),
    ],
  },
  {
    slug: "kondapur-collective",
    name: "Kondapur Collective",
    location: "Kondapur",
    kind: "Residence",
    image: placeholder("triya-collective", 720, 960),
    ratio: "3 / 4",
    tagline: "Shared residences for people building a career here",
    summary:
      "Sixty beds around a mess kitchen and a rooftop that stays open past midnight.",
    description:
      "Sixty beds across single and twin rooms, built around a mess kitchen and a rooftop that stays open past midnight. Kondapur Collective is priced for people early in a career, without cutting the parts that actually matter — the mattress, the water pressure, the Wi-Fi.",
    stats: [
      { label: "Beds", value: "60" },
      { label: "Opened", value: "2020" },
      { label: "Minimum stay", value: "1 month" },
      { label: "From", value: "₹11,500 / mo" },
    ],
    amenities: [
      "All meals included",
      "Daily housekeeping",
      "Rooftop deck",
      "High-speed Wi-Fi",
      "Laundry",
      "24/7 security",
    ],
    gallery: [
      placeholder("triya-collective-a", 1600, 900),
      placeholder("triya-collective-b", 900, 1125),
      placeholder("triya-collective-c", 900, 700),
      placeholder("triya-collective-d", 900, 700),
    ],
  },
  {
    slug: "triya-court",
    name: "Triya Court",
    location: "Madhapur",
    kind: "Hotel",
    image: placeholder("triya-court", 880, 660),
    ratio: "4 / 3",
    tagline: "A quieter address inside HITEC City",
    summary:
      "Thirty-six rooms set back from the main road, arranged around an internal garden.",
    description:
      "Thirty-six rooms set back from the main road, built around a small internal garden. Triya Court trades scale for quiet — the kind of hotel you can hear yourself think in after a long day of meetings on the other side of the flyover.",
    stats: [
      { label: "Rooms", value: "36" },
      { label: "Opened", value: "2022" },
      { label: "Check-in", value: "2 PM" },
      { label: "From", value: "₹5,800 / night" },
    ],
    amenities: [
      "Garden courtyard",
      "Breakfast included",
      "Gym",
      "Meeting room",
      "Valet parking",
      "Room service",
    ],
    gallery: [
      placeholder("triya-court-a", 1600, 900),
      placeholder("triya-court-b", 900, 1125),
      placeholder("triya-court-c", 900, 700),
      placeholder("triya-court-d", 900, 700),
    ],
  },
  {
    slug: "the-annexe",
    name: "The Annexe",
    location: "Jubilee Hills",
    kind: "Residence",
    image: placeholder("triya-annexe", 1000, 620),
    ratio: "16 / 10",
    tagline: "Private studios on one of the city's quietest streets",
    summary:
      "Eighteen self-contained studios inside a converted residence, built for longer stays.",
    description:
      "Eighteen self-contained studios inside a converted residence on a tree-lined street. The Annexe suits longer stays — a proper kitchenette in every room, a management team that answers the phone, and no shared corridors to negotiate.",
    stats: [
      { label: "Studios", value: "18" },
      { label: "Opened", value: "2023" },
      { label: "Minimum stay", value: "3 months" },
      { label: "From", value: "₹32,000 / mo" },
    ],
    amenities: [
      "Private kitchenette",
      "Weekly housekeeping",
      "High-speed Wi-Fi",
      "Laundry",
      "24/7 security",
      "Covered parking",
    ],
    gallery: [
      placeholder("triya-annexe-a", 1600, 900),
      placeholder("triya-annexe-b", 900, 1125),
      placeholder("triya-annexe-c", 900, 700),
      placeholder("triya-annexe-d", 900, 700),
    ],
  },
  {
    slug: "triya-pavilion",
    name: "Triya Pavilion",
    location: "Financial District",
    kind: "Hotel",
    image: placeholder("triya-pavilion", 1120, 630),
    ratio: "16 / 9",
    tagline: "The flagship, built for stays that run long",
    summary:
      "Seventy-two rooms across nine floors, carrying the portfolio's full programme.",
    description:
      "Seventy-two rooms across nine floors, anchoring the portfolio's largest address. Triya Pavilion carries the full programme — restaurant, bar, gym, pool and two event floors — for stays measured in weeks rather than nights.",
    stats: [
      { label: "Rooms", value: "72" },
      { label: "Opened", value: "2024" },
      { label: "Check-in", value: "24 hours" },
      { label: "From", value: "₹8,900 / night" },
    ],
    amenities: [
      "Restaurant & bar",
      "Two event floors",
      "Gym & pool",
      "Airport transfer",
      "Business lounge",
      "Room service",
    ],
    gallery: [
      placeholder("triya-pavilion-a", 1600, 900),
      placeholder("triya-pavilion-b", 900, 1125),
      placeholder("triya-pavilion-c", 900, 700),
      placeholder("triya-pavilion-d", 900, 700),
    ],
  },
  {
    slug: "the-grove",
    name: "The Grove",
    location: "Kokapet",
    kind: "Residence",
    image: placeholder("triya-grove", 900, 700),
    ratio: "5 / 4",
    tagline: "The newest residence, and the greenest",
    summary:
      "Thirty rooms wrapped around a planted deck, on the quiet edge of Kokapet.",
    description:
      "Thirty rooms wrapped around a planted deck on the quiet edge of Kokapet. The Grove was designed around its shade — deep balconies, cross-ventilation on every floor, and a courtyard that stays usable through May.",
    stats: [
      { label: "Rooms", value: "30" },
      { label: "Opened", value: "2025" },
      { label: "Minimum stay", value: "1 month" },
      { label: "From", value: "₹21,000 / mo" },
    ],
    amenities: [
      "All meals included",
      "Daily housekeeping",
      "Planted deck",
      "High-speed Wi-Fi",
      "Laundry",
      "24/7 security",
    ],
    gallery: [
      placeholder("triya-grove-a", 1600, 900),
      placeholder("triya-grove-b", 900, 1125),
      placeholder("triya-grove-c", 900, 700),
      placeholder("triya-grove-d", 900, 700),
    ],
  },
  {
    slug: "triya-reserve",
    name: "Triya Reserve",
    location: "Begumpet",
    kind: "Hotel",
    image: placeholder("triya-reserve", 1000, 640),
    ratio: "16 / 10",
    tagline: "A small hotel in the oldest part of the portfolio's map",
    summary:
      "Twenty-four rooms in a 1960s building, kept intact and brought back into use.",
    description:
      "Twenty-four rooms in a 1960s building near the old airport road, kept intact and brought back into use. Triya Reserve is the smallest hotel in the group and the one with the most original detail left standing — terrazzo, teak, and a staircase worth the walk.",
    stats: [
      { label: "Rooms", value: "24" },
      { label: "Opened", value: "2023" },
      { label: "Check-in", value: "2 PM" },
      { label: "From", value: "₹5,200 / night" },
    ],
    amenities: [
      "All-day café",
      "Breakfast included",
      "Reading room",
      "Airport transfer",
      "Parking",
      "Room service",
    ],
    gallery: [
      placeholder("triya-reserve-a", 1600, 900),
      placeholder("triya-reserve-b", 900, 1125),
      placeholder("triya-reserve-c", 900, 700),
      placeholder("triya-reserve-d", 900, 700),
    ],
  },
];

/** The strip in the hero lays out exactly six frames. */
export const heroProperties = properties.slice(0, 6);

export const byKind = (kind: PropertyKind) =>
  properties.filter((property) => property.kind === kind);

export type Category = {
  kind: PropertyKind;
  /** Section anchor, so the takeover menu's links still land somewhere. */
  id: string;
  label: string;
  blurb: string;
  image: string;
};

export const categories: Category[] = [
  {
    kind: "Residence",
    id: "residences",
    label: "Residences",
    blurb:
      "Long-stay homes with meals, housekeeping and security folded into the rent — for people who moved here to work, not to keep house.",
    image: placeholder("triya-cat-residences", 1920, 1080),
  },
  {
    kind: "Hotel",
    id: "hotels",
    label: "Hotels",
    blurb:
      "Short-stay properties across the western corridor, each one small enough that the front desk still recognises a returning guest.",
    image: placeholder("triya-cat-hotels", 1920, 1080),
  },
];
