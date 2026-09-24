import {
  AirVent,
  Armchair,
  Bath,
  Bed,
  BookOpen,
  Briefcase,
  CalendarCheck,
  Car,
  Cctv,
  Clock,
  ConciergeBell,
  Coffee,
  CookingPot,
  Dumbbell,
  Fan,
  Fingerprint,
  GlassWater,
  Headset,
  KeyRound,
  LampDesk,
  Laptop,
  Lock,
  Martini,
  Moon,
  Plane,
  Presentation,
  Refrigerator,
  Salad,
  ShieldCheck,
  ShowerHead,
  Sofa,
  Sparkles,
  SquareParking,
  Sprout,
  Sun,
  Sunset,
  Trees,
  Tv,
  Utensils,
  UtensilsCrossed,
  WashingMachine,
  Waves,
  Wifi,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type Amenity = { label: string; icon: LucideIcon };

/**
 * Every amenity the portfolio offers, written once. Properties list keys rather
 * than labels, so the same facility reads the same way — and carries the same
 * icon — on every detail page.
 */
export const AMENITIES = {
  // Rooms
  furnished: { label: "Bed, mattress & wardrobe", icon: Bed },
  attachedBath: { label: "Attached bathroom", icon: Bath },
  ac: { label: "Air-conditioning", icon: AirVent },
  studyDesk: { label: "Study desk & chair", icon: LampDesk },
  workDesk: { label: "Work desk", icon: LampDesk },
  hotWater: { label: "24-hour hot water", icon: ShowerHead },
  rainShower: { label: "Rain shower", icon: ShowerHead },
  crossVent: { label: "Cross-ventilated rooms", icon: Fan },
  balcony: { label: "Private balcony", icon: Sun },
  kitchenette: { label: "Private kitchenette", icon: CookingPot },
  fridge: { label: "Refrigerator", icon: Refrigerator },
  minibar: { label: "Minibar", icon: Refrigerator },
  tv: { label: "Smart TV", icon: Tv },
  safe: { label: "In-room safe", icon: Lock },

  // Food
  allMeals: { label: "Breakfast, lunch & dinner", icon: Utensils },
  vegNonVeg: { label: "Veg & non-veg menu", icon: Salad },
  drinkingWater: { label: "RO drinking water", icon: GlassWater },
  breakfast: { label: "Breakfast included", icon: Coffee },
  restaurant: { label: "All-day restaurant", icon: UtensilsCrossed },
  roofRestaurant: { label: "Rooftop restaurant", icon: UtensilsCrossed },
  lateKitchen: { label: "Kitchen open till 1 AM", icon: Moon },
  cafe: { label: "All-day café", icon: Coffee },
  bar: { label: "Bar", icon: Martini },
  roomService: { label: "24-hour room service", icon: ConciergeBell },

  // Services
  wifi: { label: "High-speed Wi-Fi", icon: Wifi },
  housekeepingDaily: { label: "Daily housekeeping", icon: Sparkles },
  housekeepingWeekly: { label: "Weekly housekeeping", icon: Sparkles },
  laundry: { label: "Laundry service", icon: WashingMachine },
  powerBackup: { label: "Power backup", icon: Zap },
  maintenance: { label: "On-call maintenance", icon: Wrench },
  checkIn24: { label: "24-hour check-in", icon: Clock },
  airport: { label: "Airport transfer", icon: Plane },
  valet: { label: "Valet parking", icon: Car },
  parking: { label: "Parking", icon: SquareParking },
  coveredParking: { label: "Covered parking", icon: SquareParking },

  // Safety
  security: { label: "24/7 security", icon: ShieldCheck },
  cctv: { label: "CCTV in common areas", icon: Cctv },
  biometric: { label: "Biometric entry", icon: Fingerprint },
  keycard: { label: "Key-card access", icon: KeyRound },
  manager: { label: "Resident manager on site", icon: Headset },

  // Shared spaces and facilities
  lounge: { label: "Common lounge", icon: Sofa },
  residentsLounge: { label: "Residents' lounge", icon: Armchair },
  workLounge: { label: "Work-from-home lounge", icon: Laptop },
  courtyard: { label: "Courtyard garden", icon: Trees },
  gardenCourtyard: { label: "Garden courtyard", icon: Trees },
  plantedDeck: { label: "Planted deck", icon: Sprout },
  rooftop: { label: "Rooftop, open past midnight", icon: Sunset },
  readingRoom: { label: "Reading room", icon: BookOpen },
  gym: { label: "Gym", icon: Dumbbell },
  pool: { label: "Swimming pool", icon: Waves },
  businessLounge: { label: "Business lounge", icon: Briefcase },
  meetingRoom: { label: "Meeting room", icon: Presentation },
  eventFloors: { label: "Two event floors", icon: CalendarCheck },
} satisfies Record<string, Amenity>;

export type AmenityKey = keyof typeof AMENITIES;

/** One titled block on the detail page — "Your room", "Meals", "Safety". */
export type AmenityGroup = { title: string; items: AmenityKey[] };
