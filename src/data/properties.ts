import { placeholder } from "@/lib/placeholder";
import type { AmenityGroup } from "./amenities";

export type PropertyKind = "Hotel" | "Residence";

export type Photo = {
  src: string;
  /** Printed under the frame on the detail page; doubles as its alt text. */
  caption: string;
};

/** Photographs keep their own proportions — every frame crops with `object-cover`. */
const photo = (id: string, caption: string): Photo => ({
  src: placeholder(id, 1800),
  caption,
});

export type Property = {
  slug: string;
  name: string;
  location: string;
  kind: PropertyKind;
  /** Cover shot for the hero strip. Placeholder — swap for a local /properties/*.jpg once shoots are delivered. */
  image: string;
  /** Intrinsic ratio the hero strip lays the frame out with. */
  ratio: string;
  tagline: string;
  /** Two lines at most — this is what the full-height listing band carries. */
  summary: string;
  /** The long version, for the detail takeover. */
  description: string;
  stats: { label: string; value: string }[];
  /** Grouped the way a guest scans them: the room, food, services, safety. */
  amenities: AmenityGroup[];
  /**
   * [0] is the detail hero; [1] and [2] are the pair the listing band
   * clusters; everything after [0] is the detail page's captioned gallery.
   */
  gallery: Photo[];
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
    image: placeholder("1788145749384-f91374d3bb99", 1000),
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
      {
        title: "Your room",
        items: ["furnished", "attachedBath", "ac", "studyDesk", "hotWater"],
      },
      { title: "Meals", items: ["allMeals", "vegNonVeg", "drinkingWater"] },
      {
        title: "Services",
        items: ["wifi", "housekeepingDaily", "laundry", "powerBackup"],
      },
      { title: "Safety", items: ["security", "cctv", "biometric", "manager"] },
      { title: "Shared spaces", items: ["lounge", "courtyard"] },
    ],
    gallery: [
      photo("1788145749384-f91374d3bb99", "The bungalow, from the garden"),
      photo("1765464184843-105e144bd54b", "Private room"),
      photo("1715523609055-fad02a8651da", "The courtyard"),
      photo("1589778655375-3e622a9fc91c", "Lunch in the dining room"),
      photo("1680965075873-64356db057fb", "Common floor"),
      photo("1674162406360-df5ec5eb97e4", "A study desk in every room"),
      photo("1626806819282-2c1dc01a5e0c", "Laundry room"),
    ],
  },
  {
    slug: "the-terrace",
    name: "The Terrace",
    location: "Gachibowli",
    kind: "Hotel",
    image: placeholder("1645497781181-d6684ebd1863", 1000),
    ratio: "16 / 10",
    tagline: "A business hotel built for the financial district",
    summary:
      "Forty-eight rooms and a rooftop kitchen, a short walk from the Gachibowli tech corridor.",
    description:
      "Forty-eight rooms and a rooftop restaurant a short walk from the Gachibowli tech corridor. Built for short stays that still feel considered: fast check-in, quiet floors, and a kitchen that runs late enough for a flight that landed at midnight.",
    stats: [
      { label: "Rooms", value: "48" },
      { label: "Opened", value: "2021" },
      { label: "Check-in", value: "24 hours" },
      { label: "From", value: "₹6,400 / night" },
    ],
    amenities: [
      {
        title: "In the room",
        items: ["ac", "tv", "workDesk", "rainShower", "minibar"],
      },
      {
        title: "Dining",
        items: ["roofRestaurant", "lateKitchen", "roomService"],
      },
      { title: "Facilities", items: ["businessLounge", "gym", "wifi"] },
      {
        title: "Services",
        items: ["checkIn24", "airport", "valet", "laundry"],
      },
    ],
    gallery: [
      photo("1621275471769-e6aa344546d5", "Rooftop restaurant"),
      photo("1631049307264-da0ec9d70304", "Deluxe king room"),
      photo("1758448500688-3ababa93fd67", "Lobby and 24-hour front desk"),
      photo("1648383228240-6ed939727ad6", "Twin room"),
      photo("1718894070114-6de0e98449a2", "Rain-shower bathroom"),
      photo("1604328727766-a151d1045ab4", "Business lounge"),
      photo("1740895307943-7878df384db1", "Gym"),
    ],
  },
  {
    slug: "kondapur-collective",
    name: "Kondapur Collective",
    location: "Kondapur",
    kind: "Residence",
    image: placeholder("1642426020136-8a90aa58d31e", 1000),
    ratio: "3 / 4",
    tagline: "Shared residences for people building a career here",
    summary:
      "Sixty beds around a mess kitchen and a rooftop that stays open past midnight.",
    description:
      "Sixty beds across single and twin rooms, built around a mess kitchen and a rooftop that stays open past midnight. Kondapur Collective is priced for people early in a career, without cutting the parts that actually matter: the mattress, the water pressure, the Wi-Fi.",
    stats: [
      { label: "Beds", value: "60" },
      { label: "Opened", value: "2020" },
      { label: "Minimum stay", value: "1 month" },
      { label: "From", value: "₹11,500 / mo" },
    ],
    amenities: [
      {
        title: "Your room",
        items: ["furnished", "attachedBath", "studyDesk", "hotWater"],
      },
      { title: "Meals", items: ["allMeals", "vegNonVeg", "drinkingWater"] },
      {
        title: "Services",
        items: ["wifi", "housekeepingDaily", "laundry", "powerBackup"],
      },
      { title: "Safety", items: ["security", "cctv", "biometric", "manager"] },
      { title: "Shared spaces", items: ["rooftop", "workLounge"] },
    ],
    gallery: [
      photo("1719569332255-030dd517952f", "Twin-sharing room"),
      photo("1635108196981-f21e87e4cc1f", "Single room"),
      photo("1546833999-b9f581a1996d", "Lunch from the mess kitchen"),
      photo("1762195804066-2fece9b24496", "The rooftop"),
      photo("1667388968964-4aa652df0a9b", "Dining hall"),
      photo("1604328698692-f76ea9498e76", "Work-from-home lounge"),
      photo("1646592474094-342fbc28736c", "Laundry room"),
    ],
  },
  {
    slug: "triya-court",
    name: "Triya Court",
    location: "Madhapur",
    kind: "Hotel",
    image: placeholder("1772028284145-d66956bf2b91", 1000),
    ratio: "4 / 3",
    tagline: "A quieter address inside HITEC City",
    summary:
      "Thirty-six rooms set back from the main road, arranged around an internal garden.",
    description:
      "Thirty-six rooms set back from the main road, built around a small internal garden. Triya Court trades scale for quiet: the kind of hotel you can hear yourself think in after a long day of meetings on the other side of the flyover.",
    stats: [
      { label: "Rooms", value: "36" },
      { label: "Opened", value: "2022" },
      { label: "Check-in", value: "2 PM" },
      { label: "From", value: "₹5,800 / night" },
    ],
    amenities: [
      {
        title: "In the room",
        items: ["ac", "tv", "workDesk", "rainShower", "safe"],
      },
      { title: "Dining", items: ["breakfast", "roomService"] },
      {
        title: "Facilities",
        items: ["gardenCourtyard", "gym", "meetingRoom", "wifi"],
      },
      { title: "Services", items: ["housekeepingDaily", "laundry", "valet"] },
    ],
    gallery: [
      photo("1772028284145-d66956bf2b91", "The garden courtyard"),
      photo("1776500587913-6e55907a738e", "Garden-view twin room"),
      photo("1759038085950-1234ca8f5fed", "Reception"),
      photo("1578704311587-4fbd590630d5", "Breakfast, included in every stay"),
      photo("1662385930165-49ebaa03b152", "Superior king room"),
      photo("1431540015161-0bf868a2d407", "Meeting room"),
      photo("1740895307920-0ba63bffc1c9", "Gym"),
    ],
  },
  {
    slug: "the-annexe",
    name: "The Annexe",
    location: "Jubilee Hills",
    kind: "Residence",
    image: placeholder("1642667670006-6b3059ccf96d", 1000),
    ratio: "16 / 10",
    tagline: "Private studios on one of the city's quietest streets",
    summary:
      "Eighteen self-contained studios inside a converted residence, built for longer stays.",
    description:
      "Eighteen self-contained studios inside a converted residence on a tree-lined street. The Annexe suits longer stays: a proper kitchenette in every room, a management team that answers the phone, and no shared corridors to negotiate.",
    stats: [
      { label: "Studios", value: "18" },
      { label: "Opened", value: "2023" },
      { label: "Minimum stay", value: "3 months" },
      { label: "From", value: "₹32,000 / mo" },
    ],
    amenities: [
      {
        title: "Your studio",
        items: ["kitchenette", "fridge", "attachedBath", "ac", "workDesk", "balcony"],
      },
      {
        title: "Services",
        items: ["wifi", "housekeepingWeekly", "laundry", "powerBackup", "maintenance"],
      },
      { title: "Safety", items: ["security", "cctv", "keycard"] },
      { title: "Shared spaces", items: ["residentsLounge", "coveredParking"] },
    ],
    gallery: [
      photo("1642667670006-6b3059ccf96d", "The house, from the street"),
      photo("1787507470186-deb4523d46cb", "Studio with kitchenette"),
      photo("1584132905271-512c958d674a", "Studio bedroom"),
      photo("1770757587087-766db2874c21", "Kitchenette"),
      photo("1769184618473-58c1f0e294f4", "Residents' lounge"),
      photo("1763741208003-cb6968d343fa", "Balcony"),
      photo("1630835016331-1a9b60581820", "Bedside"),
    ],
  },
  {
    slug: "triya-pavilion",
    name: "Triya Pavilion",
    location: "Financial District",
    kind: "Hotel",
    image: placeholder("1601785491008-d1153dfadd57", 1000),
    ratio: "16 / 9",
    tagline: "The flagship, built for stays that run long",
    summary:
      "Seventy-two rooms across nine floors, carrying the portfolio's full programme.",
    description:
      "Seventy-two rooms across nine floors, anchoring the portfolio's largest address. Triya Pavilion carries the full programme: restaurant, bar, gym, pool and two event floors, for stays measured in weeks rather than nights.",
    stats: [
      { label: "Rooms", value: "72" },
      { label: "Opened", value: "2024" },
      { label: "Check-in", value: "24 hours" },
      { label: "From", value: "₹8,900 / night" },
    ],
    amenities: [
      {
        title: "In the room",
        items: ["ac", "tv", "rainShower", "minibar", "safe"],
      },
      {
        title: "Dining",
        items: ["restaurant", "bar", "breakfast", "roomService"],
      },
      {
        title: "Facilities",
        items: ["pool", "gym", "eventFloors", "businessLounge"],
      },
      {
        title: "Services",
        items: ["checkIn24", "airport", "valet", "laundry"],
      },
    ],
    gallery: [
      photo("1772127822607-2343696cf82e", "Pool deck"),
      photo("1731336478850-6bce7235e320", "Premier king room"),
      photo("1729394405518-eaf2a0203aa7", "All-day restaurant"),
      photo("1531973968078-9bb02785f13d", "The bar"),
      photo("1646991761123-d83ce47c30c9", "Lobby lounge"),
      photo("1744095407215-66e40734e23a", "Boardroom on the event floors"),
      photo("1722477936580-84aa10762b0b", "Breakfast buffet"),
    ],
  },
  {
    slug: "the-grove",
    name: "The Grove",
    location: "Kokapet",
    kind: "Residence",
    image: placeholder("1782846027810-9129a9894463", 1000),
    ratio: "5 / 4",
    tagline: "The newest residence, and the greenest",
    summary:
      "Thirty rooms wrapped around a planted deck, on the quiet edge of Kokapet.",
    description:
      "Thirty rooms wrapped around a planted deck on the quiet edge of Kokapet. The Grove was designed around its shade: deep balconies, cross-ventilation on every floor, and a courtyard that stays usable through May.",
    stats: [
      { label: "Rooms", value: "30" },
      { label: "Opened", value: "2025" },
      { label: "Minimum stay", value: "1 month" },
      { label: "From", value: "₹21,000 / mo" },
    ],
    amenities: [
      {
        title: "Your room",
        items: ["furnished", "attachedBath", "crossVent", "balcony", "studyDesk"],
      },
      { title: "Meals", items: ["allMeals", "vegNonVeg", "drinkingWater"] },
      {
        title: "Services",
        items: ["wifi", "housekeepingDaily", "laundry", "powerBackup"],
      },
      { title: "Safety", items: ["security", "cctv", "biometric", "manager"] },
      { title: "Shared spaces", items: ["plantedDeck", "courtyard"] },
    ],
    gallery: [
      photo("1781910472670-0c79a533e654", "The planted deck"),
      photo("1759139445627-5ce9d5fac8f9", "Twin-sharing room"),
      photo("1783835541306-e23689140c12", "Deep balconies on every floor"),
      photo("1773847469674-189153e5e32d", "Dining room"),
      photo("1742281257687-092746ad6021", "Dinner thali"),
      photo("1749703810919-1f979a9a3982", "Reading corner"),
      photo("1767034243123-5a5c45269597", "The courtyard, shaded through May"),
    ],
  },
  {
    slug: "triya-reserve",
    name: "Triya Reserve",
    location: "Begumpet",
    kind: "Hotel",
    image: placeholder("1775811091644-69162fa36ea1", 1000),
    ratio: "16 / 10",
    tagline: "A small hotel in the oldest part of the portfolio's map",
    summary:
      "Twenty-four rooms in a 1960s building, kept intact and brought back into use.",
    description:
      "Twenty-four rooms in a 1960s building near the old airport road, kept intact and brought back into use. Triya Reserve is the smallest hotel in the group and the one with the most original detail left standing: terrazzo, teak, and a staircase worth the walk.",
    stats: [
      { label: "Rooms", value: "24" },
      { label: "Opened", value: "2023" },
      { label: "Check-in", value: "2 PM" },
      { label: "From", value: "₹5,200 / night" },
    ],
    amenities: [
      { title: "In the room", items: ["ac", "tv", "workDesk", "rainShower"] },
      { title: "Dining", items: ["cafe", "breakfast", "roomService"] },
      { title: "Facilities", items: ["readingRoom", "wifi", "parking"] },
      { title: "Services", items: ["airport", "housekeepingDaily", "laundry"] },
    ],
    gallery: [
      photo("1775811091644-69162fa36ea1", "The courtyard, after dark"),
      photo("1662411394768-77db7c7b62e8", "Heritage king room"),
      photo("1697032217861-46327ba5f5d2", "The original staircase"),
      photo("1544031064-9de80864ade5", "All-day café"),
      photo("1783663556097-6bc76c5d4c88", "Reading room"),
      photo("1741506131058-533fcf894483", "Twin room"),
      photo("1771575521341-415ec739be67", "Original terrazzo"),
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
      "Long-stay homes with meals, housekeeping and security folded into the rent, for people who moved here to work, not to keep house.",
    image: placeholder("1787396032419-3f26e9710244", 1400),
  },
  {
    kind: "Hotel",
    id: "hotels",
    label: "Hotels",
    blurb:
      "Short-stay properties across the western corridor, each one small enough that the front desk still recognises a returning guest.",
    image: placeholder("1759038086832-795644825e3a", 1400),
  },
];
