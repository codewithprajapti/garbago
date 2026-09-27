export type GroupSize = 'solo' | 'duo' | '3-5' | '6-10' | '10+';

export interface PlannerFormState {
  location: string;
  date: string;
  nightNumber: number;
  groupSize: GroupSize;
  vibes: string[];
  budgetPerPerson: number;
  foodPreference: string;
  travelMode: 'personal' | 'cab';
}

export interface ItineraryItem {
  time: string;
  title: string;
  phase: string;
  location: string;
  description: string;
  costPerPerson?: number;
  tip?: string;
  badge?: string;
  isPass?: boolean;
  passCode?: string;
}

export interface BudgetBreakdown {
  entry: number;
  food: number;
  travel: number;
  extras: number;
  total: number;
  totalGroup: number;
}

export interface PlannerResult {
  id?: string;
  title: string;
  summary: string;
  matchScore: number;
  date: string;
  location: string;
  groupSize: string;
  groupCount: number;
  vibe: string;
  venueHighlight: {
    name: string;
    area: string;
    price: number;
    image: string;
  };
  itinerary: ItineraryItem[];
  budget: BudgetBreakdown;
  outfit: {
    style: string;
    items: string[];
    colors: string[];
    tip?: string;
  };
  food: string[];
  tips: string[];
  trafficAlert: string;
  musicIntel: string;
  danceEnergy: {
    steps: number;
    calories: number;
  };
  createdAt?: string;
}

export interface GarbaEvent {
  id: string;
  name: string;
  tagline: string;
  area: string;
  distance: string;
  venue: string;
  dates: string;
  time: string;
  style: string;
  price: number;
  passType: string;
  matchScore: number;
  image: string;
  tags: string[];
  isTrending?: boolean;
  isHeritage?: boolean;
  about: string;
  whatToExpect: string[];
  dressCode: string;
  foodAvailability: string;
  parkingValet: string;
  travelAdvice: string;
  whyMatches: string;
  artists?: string[];
}

export interface OutfitLook {
  id: string;
  title: string;
  subtitle: string;
  aesthetic: string;
  occasion: string;
  gender: 'women' | 'men' | 'couple';
  clothing: string[];
  accessories: string[];
  footwear: string;
  hairstyle: string;
  fabricTip: string;
  colors: Array<{ name: string; hex: string; meaning: string }>;
  image: string;
}

export interface SavedPlan {
  id: string;
  title: string;
  date: string;
  groupSizeLabel: string;
  budgetPerPerson: number;
  totalCost: number;
  vibeLabel: string;
  location: string;
  result: PlannerResult;
  createdAt: string;
}

export interface UserProfile {
  name: string;
  location: string;
  phone: string;
  avatar: string;
  preferredVibe: string;
  budgetPreference: number;
  foodPreference: string;
  favoriteEventIds: string[];
}
