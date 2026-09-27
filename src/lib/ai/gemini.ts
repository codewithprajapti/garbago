import { GoogleGenAI, Type } from '@google/genai';
import { generateFallbackPlan } from './fallbackPlan.ts';
import { PlannerResult, PlannerFormState, GroupSize } from '../../types/index.ts';
import { MOCK_EVENTS } from '../data/mockEvents.ts';

// Structured response interface as requested by specifications
export interface StructuredGeminiPlannerResponse {
  title: string;
  summary: string;
  matchScore: number;
  itinerary: Array<{
    time: string;
    title: string;
    description: string;
  }>;
  budget: {
    entry: number;
    food: number;
    travel: number;
    extras: number;
    total: number;
  };
  outfit: {
    style: string;
    items: string[];
    colors: string[];
  };
  food: string[];
  tips: string[];
}

export interface RawPlannerInput {
  location?: string;
  date?: string;
  groupSize?: string | number;
  budget?: number;
  budgetPerPerson?: number;
  garbaStyle?: string;
  vibes?: string[];
  foodPreference?: string;
  transportation?: string;
  travelMode?: 'personal' | 'cab';
  nightNumber?: number;
}

// Server-side Gemini SDK client
const apiKey = process.env.GEMINI_API_KEY || '';
let genAIInstance: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI | null {
  if (!apiKey) return null;
  if (!genAIInstance) {
    genAIInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIInstance;
}

/**
 * Validates the raw structured JSON response from Gemini
 */
export function validateStructuredGeminiResponse(raw: any): StructuredGeminiPlannerResponse {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Invalid Gemini output: Root must be an object');
  }

  const title = typeof raw.title === 'string' && raw.title.trim().length > 0
    ? raw.title.trim()
    : 'Traditional Garba Night in Ahmedabad';

  const summary = typeof raw.summary === 'string' && raw.summary.trim().length > 0
    ? raw.summary.trim()
    : 'An authentic festive evening in Ahmedabad filled with Raas-Garba, traditional folk melodies, and midnight delicacies.';

  const matchScore = typeof raw.matchScore === 'number' && !isNaN(raw.matchScore)
    ? Math.min(99, Math.max(70, Math.round(raw.matchScore)))
    : 95;

  // Validate itinerary array
  if (!Array.isArray(raw.itinerary) || raw.itinerary.length === 0) {
    throw new Error('Invalid Gemini output: itinerary must be a non-empty array');
  }

  const itinerary = raw.itinerary.map((item: any, idx: number) => {
    if (!item || typeof item !== 'object') {
      return {
        time: idx === 0 ? '07:00 PM' : '09:00 PM',
        title: 'Navratri Experience Step',
        description: 'Authentic Garba celebration in Ahmedabad.',
      };
    }
    return {
      time: typeof item.time === 'string' && item.time.trim() ? item.time.trim() : `${7 + idx}:00 PM`,
      title: typeof item.title === 'string' && item.title.trim() ? item.title.trim() : 'Garba Celebration',
      description: typeof item.description === 'string' && item.description.trim() ? item.description.trim() : 'Enjoy authentic traditional festivities.',
    };
  });

  // Validate budget object
  const b = raw.budget || {};
  const entry = typeof b.entry === 'number' && !isNaN(b.entry) ? Math.max(0, Math.round(b.entry)) : 500;
  const food = typeof b.food === 'number' && !isNaN(b.food) ? Math.max(0, Math.round(b.food)) : 400;
  const travel = typeof b.travel === 'number' && !isNaN(b.travel) ? Math.max(0, Math.round(b.travel)) : 200;
  const extras = typeof b.extras === 'number' && !isNaN(b.extras) ? Math.max(0, Math.round(b.extras)) : 150;
  const total = typeof b.total === 'number' && !isNaN(b.total) ? Math.max(0, Math.round(b.total)) : (entry + food + travel + extras);

  const budget = {
    entry,
    food,
    travel,
    extras,
    total,
  };

  // Validate outfit object
  const o = raw.outfit || {};
  const outfitStyle = typeof o.style === 'string' && o.style.trim() ? o.style.trim() : 'Traditional Gujarati Heritage';
  const outfitItems = Array.isArray(o.items) && o.items.length > 0
    ? o.items.filter((it: any) => typeof it === 'string')
    : ['Mirror-work Chaniya Choli or Kediyu', 'Oxidized silver jewelry', 'Padded flat Mojdi'];
  const outfitColors = Array.isArray(o.colors) && o.colors.length > 0
    ? o.colors.filter((c: any) => typeof c === 'string')
    : ['Royal Purple', 'Soneri Gold', 'Kesari Flame'];

  const outfit = {
    style: outfitStyle,
    items: outfitItems,
    colors: outfitColors,
  };

  // Validate food and tips arrays
  const foodList = Array.isArray(raw.food) && raw.food.length > 0
    ? raw.food.filter((f: any) => typeof f === 'string')
    : ['Manek Chowk Fafda-Jalebi', 'Warm Kesar Dry Fruit Milk', 'Gujarati Kathiyawadi Thali'];

  const tipsList = Array.isArray(raw.tips) && raw.tips.length > 0
    ? raw.tips.filter((t: any) => typeof t === 'string')
    : [
        'Arrive at the arena before 8:15 PM to breeze through Gate turnstiles.',
        'Wear breathable cotton underneath heavy mirror-work embroidery.',
        'Keep UPI payment ready for midnight street food stalls in the heritage pols.',
      ];

  return {
    title,
    summary,
    matchScore,
    itinerary,
    budget,
    outfit,
    food: foodList,
    tips: tipsList,
  };
}

/**
 * Normalizes input and connects Gemini structured response to full PlannerResult
 * to ensure all UI components in ResultView render without broken elements.
 */
export function adaptStructuredResponseToResult(
  structured: StructuredGeminiPlannerResponse,
  rawInput: RawPlannerInput
): PlannerResult {
  const location = rawInput.location || 'Ahmedabad';
  const date = rawInput.date || 'Saturday, 18 Oct 2025';
  const garbaStyle = rawInput.garbaStyle || (rawInput.vibes && rawInput.vibes[0]) || 'Traditional Garba';

  // Group parsing
  let groupCount = 4;
  let groupSizeLabel = '3–5 Friends';
  if (typeof rawInput.groupSize === 'number') {
    groupCount = rawInput.groupSize;
    groupSizeLabel = `${groupCount} Revelers`;
  } else if (typeof rawInput.groupSize === 'string') {
    const s = rawInput.groupSize.toLowerCase();
    if (s.includes('solo') || s === '1') {
      groupCount = 1;
      groupSizeLabel = 'Solo Reveler';
    } else if (s.includes('duo') || s.includes('couple') || s === '2') {
      groupCount = 2;
      groupSizeLabel = 'Duo / Couple';
    } else if (s.includes('3-5') || s.includes('3') || s.includes('4') || s.includes('5')) {
      groupCount = 4;
      groupSizeLabel = '3–5 Friends';
    } else if (s.includes('6-10') || s.includes('6') || s.includes('7') || s.includes('8')) {
      groupCount = 8;
      groupSizeLabel = '6–10 Friends & Family';
    } else {
      groupCount = 10;
      groupSizeLabel = '10+ Big Mandal';
    }
  }

  // Pick matching mock venue from sample catalog to prevent hallucinating non-existent real-world venues
  let matchingVenue = MOCK_EVENTS[0]; // Karnavati Club
  const styleLower = garbaStyle.toLowerCase();
  const locLower = location.toLowerCase();

  if (styleLower.includes('sheri') || locLower.includes('heritage') || locLower.includes('pol') || locLower.includes('walled')) {
    const polVenue = MOCK_EVENTS.find(e => e.id === 'mandvi-ni-pol');
    if (polVenue) matchingVenue = polVenue;
  } else if (styleLower.includes('energy') || styleLower.includes('youth') || locLower.includes('bodakdev') || locLower.includes('vastrapur')) {
    const bodakdevVenue = MOCK_EVENTS.find(e => e.id === 'bodakdev-heritage');
    if (bodakdevVenue) matchingVenue = bodakdevVenue;
  } else if (styleLower.includes('vip') || styleLower.includes('dandiya') || styleLower.includes('glam')) {
    const rajpathVenue = MOCK_EVENTS.find(e => e.id === 'rajpath-club');
    if (rajpathVenue) matchingVenue = rajpathVenue;
  }

  const entryCost = structured.budget.entry || Math.round(structured.budget.total * 0.4);
  const foodCost = structured.budget.food || Math.round(structured.budget.total * 0.3);
  const travelCost = structured.budget.travel || Math.round(structured.budget.total * 0.18);
  const extrasCost = structured.budget.extras || Math.max(100, structured.budget.total - (entryCost + foodCost + travelCost));
  const totalPerPerson = structured.budget.total || (entryCost + foodCost + travelCost + extrasCost);

  // Map timeline items to rich UI timeline elements
  const phases = ['Prep Phase', 'Dinner', 'Core Experience', 'Midnight Ritual', 'Wind Down'];
  const locations = [
    'Home / Hotel',
    'Sindhu Bhavan / SG Highway Eatery',
    matchingVenue.venue,
    'Manek Chowk Heritage Market',
    'SG Highway Bypass / SP Ring Road',
  ];

  const enrichedItinerary = structured.itinerary.map((item, idx) => {
    const phase = phases[idx] || (idx === 0 ? 'Prep Phase' : idx === 1 ? 'Pre-Garba' : idx === 2 ? 'Core Experience' : 'Midnight');
    const loc = locations[idx] || (idx === 2 ? matchingVenue.name : location);
    const isCore = idx === 2 || item.title.toLowerCase().includes('garba') || item.title.toLowerCase().includes('dance');
    const isDinner = idx === 1 || item.title.toLowerCase().includes('food') || item.title.toLowerCase().includes('dinner');

    return {
      time: item.time,
      title: item.title,
      phase,
      location: loc,
      description: item.description,
      costPerPerson: isCore ? entryCost : isDinner ? foodCost : undefined,
      tip: idx === 0
        ? 'Wear comfortable padded footwear for continuous 3-taali spins.'
        : idx === 1
        ? 'Arrive 30 mins before peak dining rush to ensure timely entry.'
        : idx === 2
        ? 'Aarti commences at Mataji shrine promptly before high-tempo rounds.'
        : undefined,
      badge: isDinner ? 'Fast table turnover' : undefined,
      isPass: isCore,
      passCode: isCore ? `GG-AMDV-${Math.floor(1000 + Math.random() * 9000)}-2025` : undefined,
    };
  });

  return {
    id: `plan-${Date.now()}`,
    title: structured.title,
    summary: structured.summary,
    matchScore: structured.matchScore,
    date,
    location,
    groupSize: groupSizeLabel,
    groupCount,
    vibe: garbaStyle,
    venueHighlight: {
      name: matchingVenue.name,
      area: matchingVenue.area,
      price: entryCost,
      image: matchingVenue.image,
    },
    itinerary: enrichedItinerary,
    budget: {
      entry: entryCost,
      food: foodCost,
      travel: travelCost,
      extras: extrasCost,
      total: totalPerPerson,
      totalGroup: totalPerPerson * groupCount,
    },
    outfit: {
      style: structured.outfit.style,
      items: structured.outfit.items,
      colors: structured.outfit.colors,
      tip: 'Coordinate mirror-work abhala tones with oxidized jewelry.',
    },
    food: structured.food,
    tips: structured.tips,
    trafficAlert:
      rawInput.transportation?.toLowerCase().includes('cab') || rawInput.travelMode === 'cab'
        ? 'Cab drop-off bay active on SG Highway service lane. Expect surge pricing between 11:45 PM – 1:15 AM; booking early is recommended.'
        : 'Designated parking available at Gate 2. Expect heavy SG Highway congestion near Pakwan Cross Road after 11:30 PM; use internal Bodakdev ring roads.',
    musicIntel: `Live acoustic Gujarati folk orchestra featuring Dhol, Shehnai, Kanshi, and energetic Sanedo rounds. Ground certified for authentic Raas choreography.`,
    danceEnergy: {
      steps: 5200,
      calories: 680,
    },
    createdAt: new Date().toISOString(),
  };
}

/**
 * Primary server-side AI Service to generate a personalized Navratri Plan via Gemini
 */
export async function generateNavratriPlan(rawInput: RawPlannerInput): Promise<PlannerResult> {
  const location = rawInput.location || 'Ahmedabad';
  const date = rawInput.date || 'Saturday, 18 Oct 2025';
  const budget = rawInput.budget || rawInput.budgetPerPerson || 1200;
  const garbaStyle = rawInput.garbaStyle || (rawInput.vibes && rawInput.vibes[0]) || 'Traditional Garba';
  const foodPreference = rawInput.foodPreference || 'Gujarati Traditional';
  const transportation = rawInput.transportation || (rawInput.travelMode === 'personal' ? 'Personal Vehicle / Car' : 'Cab');
  const groupSize = rawInput.groupSize ? String(rawInput.groupSize) : '3-5 Friends';

  const client = getGeminiClient();

  if (!client) {
    console.log('[GarbaGo AI Service] No GEMINI_API_KEY detected. Using authentic cultural fallback plan.');
    const formState: PlannerFormState = {
      location,
      date,
      nightNumber: rawInput.nightNumber || 8,
      groupSize: (typeof rawInput.groupSize === 'string' && ['solo', 'duo', '3-5', '6-10', '10+'].includes(rawInput.groupSize) ? rawInput.groupSize : '3-5') as GroupSize,
      vibes: rawInput.vibes || [garbaStyle],
      budgetPerPerson: budget,
      foodPreference,
      travelMode: rawInput.travelMode || (transportation.toLowerCase().includes('personal') ? 'personal' : 'cab'),
    };
    return generateFallbackPlan(formState);
  }

  // System instruction and prompt incorporating Data Integrity rule
  const prompt = `You are the GarbaGo Amdavad Navratri AI Engine. You are an expert on authentic Gujarat Navratri celebrations, Garba traditions, crowd flow, attire, and midnight cuisine in Ahmedabad.

CRITICAL DATA INTEGRITY & GROUNDING RULE:
The platform's events, venues, and foods are SAMPLE/DEMO mock data representing authentic Ahmedabad Navratri experiences (such as Karnavati Club on SG Highway, Bodakdev Heritage Garba Ground, Mandvi ni Pol Heritage Sheri Garba in Old Ahmedabad, and Rajpath Club). DO NOT invent or hallucinate non-existent commercial venues, fictitious ticket prices, or deceptive addresses as real-world facts. Reference and personalize the experience within these authentic cultural traditions.

USER PREFERENCES:
- Target Location / Hub: ${location}
- Festive Date / Night: ${date}
- Group Size: ${groupSize}
- Preferred Garba Style / Atmosphere: ${garbaStyle}
- Budget per person: ₹${budget}
- Food Preference: ${foodPreference}
- Transportation: ${transportation}

REQUIREMENTS:
Generate a personalized, authentic Ahmedabad Navratri plan matching the requested JSON schema.
- Title: A festive, evocative title.
- Summary: 1-2 sentence lively summary with Gujarati cultural flavor.
- MatchScore: Integer between 85 and 98 based on user preference fit.
- Itinerary: Exactly 4 or 5 chronological steps covering preparation, pre-Garba dinner, the core Garba experience (with 3-Taali and Dodhiya), midnight food trail (Manek Chowk or Sindhu Bhavan), and wind-down departure.
- Budget: Allocate realistic estimates matching the user's budget of ₹${budget} per person across entry, food, travel, and extras, ensuring the sum matches the total.
- Outfit: Suggest traditional Gujarati attire matching the Garba style (e.g. Chaniya Choli with mirror-work/Abhala, Kediyu, Bandhani dupatta, oxidized jewelry).
- Food: List 3-4 specific Ahmedabad dishes (e.g. Manek Chowk Fafda-Jalebi, Kesar Dry Fruit Milk, Farali Pattice, Gujarati sweet-sour Kadhi).
- Tips: 3 practical local tips on arrival timing, footwear comfort for Garba spins, and parking/traffic routing.
`;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: 'Title for the personalized Navratri night plan (e.g. Traditional Garba Night in Ahmedabad)',
            },
            summary: {
              type: Type.STRING,
              description: '1-2 sentence lively summary with authentic Gujarati cultural context and personalization',
            },
            matchScore: {
              type: Type.NUMBER,
              description: 'Match score between 80 and 99 reflecting how well the plan fits user preferences',
            },
            itinerary: {
              type: Type.ARRAY,
              description: 'Chronological timeline of activities for the Navratri evening',
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING, description: 'Time of activity, e.g. 06:30 PM, 08:30 PM' },
                  title: { type: Type.STRING, description: 'Title of the step' },
                  description: { type: Type.STRING, description: 'Detailed guidance for this phase of the evening' },
                },
                required: ['time', 'title', 'description'],
              },
            },
            budget: {
              type: Type.OBJECT,
              description: 'Itemized estimated budget per person in INR',
              properties: {
                entry: { type: Type.NUMBER, description: 'Garba venue entry pass cost per person in INR' },
                food: { type: Type.NUMBER, description: 'Dinner, snacks, and midnight treats per person in INR' },
                travel: { type: Type.NUMBER, description: 'Travel, cab/fuel, and parking fees per person in INR' },
                extras: { type: Type.NUMBER, description: 'Miscellaneous, Dandiya sticks, water per person in INR' },
                total: { type: Type.NUMBER, description: 'Total budget per person in INR' },
              },
              required: ['entry', 'food', 'travel', 'extras', 'total'],
            },
            outfit: {
              type: Type.OBJECT,
              description: 'Curated traditional Gujarati outfit recommendation',
              properties: {
                style: { type: Type.STRING, description: 'Attire style name' },
                items: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Key wardrobe elements and accessories',
                },
                colors: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Recommended festival color palette',
                },
              },
              required: ['style', 'items', 'colors'],
            },
            food: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Recommended Navratri delicacies and midnight street food items in Ahmedabad',
            },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Practical Ahmedabad local insider tips (timing, traffic, parking, comfort)',
            },
          },
          required: ['title', 'summary', 'matchScore', 'itinerary', 'budget', 'outfit', 'food', 'tips'],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Gemini API returned an empty text payload');
    }

    const rawParsed = JSON.parse(text);
    const structuredValidated = validateStructuredGeminiResponse(rawParsed);
    return adaptStructuredResponseToResult(structuredValidated, rawInput);
  } catch (err) {
    console.error('[GarbaGo AI Service] Gemini generation failed, invoking resilient fallback:', err);
    const formState: PlannerFormState = {
      location,
      date,
      nightNumber: rawInput.nightNumber || 8,
      groupSize: (typeof rawInput.groupSize === 'string' && ['solo', 'duo', '3-5', '6-10', '10+'].includes(rawInput.groupSize) ? rawInput.groupSize : '3-5') as GroupSize,
      vibes: rawInput.vibes || [garbaStyle],
      budgetPerPerson: budget,
      foodPreference,
      travelMode: rawInput.travelMode || (transportation.toLowerCase().includes('personal') ? 'personal' : 'cab'),
    };
    return generateFallbackPlan(formState);
  }
}

/**
 * Server-side AI Service for Outfit Recommendations
 */
export async function generateOutfitWithGemini(params: {
  gender?: string;
  occasion?: string;
  aesthetic?: string;
  colorPreference?: string;
}) {
  const {
    gender = 'women',
    occasion = 'Maha Ashtami',
    aesthetic = 'Traditional Gujarati Heritage',
    colorPreference = 'Purple & Gold',
  } = params;

  const client = getGeminiClient();

  if (!client) {
    return {
      title: `${aesthetic} Navratri Ensemble`,
      subtitle: `Curated for ${occasion} in Ahmedabad`,
      aesthetic,
      occasion,
      gender,
      clothing: [
        gender === 'women'
          ? 'Pure silk Royal Purple (Jamli) Chaniya with intricate golden Zari borders'
          : 'Ivory flared Kediyu with authentic Kutch mirror-work and tie-up strings',
        gender === 'women'
          ? 'Embroidered Gamthi blouse with glass abhala mirrors and cowrie accents'
          : 'Traditional pleated Chorno gathered at ankles for unrestrained Garba steps',
        gender === 'women'
          ? 'Mustard gold Bandhani dupatta draped in traditional Gujarati front-pallu style'
          : 'Contrasting bandhani paghadi / turban with hand-embroidered border',
      ],
      accessories: [
        'Antique oxidized silver multi-layer Jhumkas and ear chains',
        'Traditional Hasli collar choker and heavy engraved kada',
        'Tinkling ghungroo payal (anklets) tuned to Garba taals',
        'Traditional black round Chandlo (Bindi) at the forehead',
      ],
      footwear: 'Handcrafted genuine leather Mojdis with padded inner soles for zero friction during 3-taali spins.',
      hairstyle: 'Intricate braided crown or low textured bun woven with fragrant Mogra jasmine gajra.',
      fabricTip: 'Pure organic cotton-silk blend provides luxurious sheen while staying breathable under humid night air.',
      colors: [
        { name: 'Royal Jamli (Purple)', hex: '#2A114B', meaning: 'Celestial hue dedicated to Maa Mahagauri on Maha Ashtami' },
        { name: 'Soneri Gold', hex: '#D4AF37', meaning: 'Symbolizes prosperity, sacred diyas, and festive brilliance' },
        { name: 'Kesari Saffron', hex: '#FD6B0F', meaning: 'Energy, passion, and vibrant Amdavadi celebration' },
      ],
    };
  }

  const prompt = `Generate a structured traditional Navratri outfit recommendation for:
Gender: ${gender}
Occasion: ${occasion}
Aesthetic: ${aesthetic}
Color Preference: ${colorPreference}

Ground the advice in genuine Gujarat Navratri festival customs (mirror-work, oxidized jewelry, Bandhani, Mojdi footwear comfort).`;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subtitle: { type: Type.STRING },
            aesthetic: { type: Type.STRING },
            occasion: { type: Type.STRING },
            gender: { type: Type.STRING },
            clothing: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            accessories: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            footwear: { type: Type.STRING },
            hairstyle: { type: Type.STRING },
            fabricTip: { type: Type.STRING },
            colors: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  hex: { type: Type.STRING },
                  meaning: { type: Type.STRING },
                },
                required: ['name', 'hex', 'meaning'],
              },
            },
          },
          required: ['title', 'subtitle', 'clothing', 'accessories', 'footwear', 'colors'],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error('Empty text from Gemini');
    return JSON.parse(text);
  } catch (err) {
    console.error('[GarbaGo AI] Outfit generator error:', err);
    throw err;
  }
}
