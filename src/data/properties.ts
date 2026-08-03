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
};

export const heroProperties: Property[] = [
  {
    slug: "triya-house",
    name: "Triya House",
    location: "Banjara Hills",
    kind: "Residence",
    image: placeholder("triya-house", 900, 700),
    ratio: "5 / 4",
  },
  {
    slug: "the-terrace",
    name: "The Terrace",
    location: "Gachibowli",
    kind: "Hotel",
    image: placeholder("triya-terrace", 1000, 640),
    ratio: "16 / 10",
  },
  {
    slug: "kondapur-collective",
    name: "Kondapur Collective",
    location: "Kondapur",
    kind: "Residence",
    image: placeholder("triya-collective", 720, 960),
    ratio: "3 / 4",
  },
  {
    slug: "triya-court",
    name: "Triya Court",
    location: "Madhapur",
    kind: "Hotel",
    image: placeholder("triya-court", 880, 660),
    ratio: "4 / 3",
  },
  {
    slug: "the-annexe",
    name: "The Annexe",
    location: "Jubilee Hills",
    kind: "Residence",
    image: placeholder("triya-annexe", 1000, 620),
    ratio: "16 / 10",
  },
  {
    slug: "triya-pavilion",
    name: "Triya Pavilion",
    location: "Financial District",
    kind: "Hotel",
    image: placeholder("triya-pavilion", 1120, 630),
    ratio: "16 / 9",
  },
];
