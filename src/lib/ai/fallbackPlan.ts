import { PlannerFormState, PlannerResult } from '../../types';

export function generateFallbackPlan(form: PlannerFormState): PlannerResult {
  const isHeritage = form.vibes.some(v => v.toLowerCase().includes('sheri') || v.toLowerCase().includes('traditional'));
  const isClub = form.vibes.some(v => v.toLowerCase().includes('club') || v.toLowerCase().includes('premium'));
  const isModern = form.vibes.some(v => v.toLowerCase().includes('modern') || v.toLowerCase().includes('dj'));

  let groupCount = 4;
  let groupLabel = '3–5 Friends';
  if (form.groupSize === 'solo') {
    groupCount = 1;
    groupLabel = 'Solo Reveler';
  } else if (form.groupSize === 'duo') {
    groupCount = 2;
    groupLabel = 'Duo / Couple';
  } else if (form.groupSize === '3-5') {
    groupCount = 4;
    groupLabel = '3–5 Friends';
  } else if (form.groupSize === '6-10') {
    groupCount = 8;
    groupLabel = '6–10 Family & Pals';
  } else {
    groupCount = 12;
    groupLabel = '10+ Big Mandal';
  }

  // Budget calculations
  const totalBudget = form.budgetPerPerson || 1200;
  const entry = Math.round(totalBudget * 0.42);
  const food = Math.round(totalBudget * 0.32);
  const travel = Math.round(totalBudget * 0.16);
  const extras = Math.max(100, totalBudget - (entry + food + travel));
  const finalPerPerson = entry + food + travel + extras;

  let venueName = 'Bodakdev Heritage Garba Ground';
  let venueArea = 'Judges Bungalow Rd, Bodakdev';
  let venueImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFgP3Arqv2G1Xw8lW1U4W7gtMOBQE8HJFaS1tjgk3ZqYo9t3vjpgAPTP6kayh3QKGBkOVutmlF3vlQlhQyUN8bfhx2GZGkUAOI-MWuRNdnhWoV2IKX_5K2CoxpPCLqCVdqYAP48etDtgG5T6WgrsWsfsEbteYm9GiXMlh7efZD1FIzxMcowN1CIrI5PfSEOZqe_K_-qnzGI2u6gsd47M8oV0UBw2tSBf_lhanGCr2pbQ6jn_QUt0Z9';

  if (isClub) {
    venueName = 'Karnavati Club Heritage Arena';
    venueArea = 'SG Highway Corridor';
    venueImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXHq4CZBcbKQinCgMBHCySjWcxXSZMAouil7chPMgL40hFkPRr1EFh8hHODnCpW1DsIo4uyxWKqg60Nw1LLKAOVBGUSY9NXvkC2PCsKRZBASDE3PI2kdgxpsqFQj_FjpfqFIQvGMZ8ieZ0G7ofIWZgBNPHVQTiAycxKsYfmnSSssWOMhnMnQ_FlId61vt7p1RFSC9uIvnUPnAJlasSuqp5bfxxSvHpavyy6kwQ293IXPHkuu1ci8R1';
  } else if (isHeritage && form.location.includes('Heritage')) {
    venueName = 'Mandvi ni Pol Heritage Sheri Garba';
    venueArea = 'UNESCO Walled City, Old Amdavad';
    venueImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBRvkZL0ZqLk9MKeOlVWez8i_8hpzHYJyShO9JeAoedzZ2vroW0ZtOchYIGRuj0zNPBL5Wrkj2Ql2JuPsNFvvf3onpvHhUZQWzJGYLd0beE9N1uGj1PezZcBhr-1YM3PuRlV7UjRMfV_WckQ1vUKP7-JGZdFb3oG2Cie2alKnApQNKtd1_2E1VjSgd70n9dmunmym9TbWfiRCyhCtp-SHgKhsy42I_trST2FVEp3krrc6PVjI2fkD7';
  }

  const primaryVibe = form.vibes[0] || 'Traditional Garba';

  return {
    title: `${primaryVibe} Night in Ahmedabad`,
    summary: `An energetic Gujarati evening with authentic Raas-Garba, pure Saurashtra brass-drum orchestration, and a starlit midnight feast at historic Manek Chowk tailored for ${groupLabel}.`,
    matchScore: 94,
    date: form.date || 'Saturday, 18 Oct 2025',
    location: form.location,
    groupSize: groupLabel,
    groupCount,
    vibe: primaryVibe,
    venueHighlight: {
      name: venueName,
      area: venueArea,
      price: entry,
      image: venueImage
    },
    itinerary: [
      {
        time: '06:30 PM',
        title: 'Get Ready in Authentic Amdavad Attire',
        phase: 'Prep Phase',
        location: 'Home / Hotel',
        description: 'Adorn traditional Gujarati look: Royal purple silk Chaniya Choli or Kediyu with intricate abhala mirror-work and Gamthi embroidery. Ensure oxidized silver jewelry is securely pinned for high-movement dancing.',
        tip: 'Pack Dandiya sticks, extra safety pins, and comfortable flat Mojdis in your car trunk for late-night transitions.'
      },
      {
        time: '07:30 PM',
        title: 'Pre-Garba Energy Feast',
        phase: 'Dinner',
        location: 'Gordhan Thal or Sasumaa Gujarati Dining, SG Highway',
        description: `Enjoy wholesome and light Navratri-friendly fare crafted to fuel cardio endurance: Gujarati sweet-sour Kadhi, Rajgira Puris, Khichdi, Farali Pattice, and spiced digestive Chaas tailored to your ${form.foodPreference} preference.`,
        costPerPerson: food,
        badge: 'Fast table turnover guaranteed via GarbaGo Express reservation alert'
      },
      {
        time: '08:30 PM',
        title: `Garba: ${venueName}`,
        phase: 'Core Experience',
        location: `${venueName}, ${venueArea}`,
        description: 'Sacred Aarti at 9:00 PM followed by 3-Taali, Dodhiya, and Heench rounds under festive illuminations with live Saurashtra dhol percussion.',
        costPerPerson: entry,
        isPass: true,
        passCode: `GG-AMDV-${Math.floor(1000 + Math.random() * 9000)}-2025`
      },
      {
        time: '11:45 PM',
        title: 'Midnight Refreshments & Street Food',
        phase: 'Midnight Ritual',
        location: 'Manek Chowk Night Food Market or Sindhu Bhavan Kesar Milk Hub',
        description: 'Relish steaming hot Jalebi straight from the kadai, crunchy besan Fafda with spicy green papaya sambharo, and saffron-laced warm Kesar Dry Fruit milk served in clay kulhads.',
        costPerPerson: extras
      },
      {
        time: '12:15 AM',
        title: 'Head Home & Wind Down',
        phase: 'Departure',
        location: form.travelMode === 'personal' ? 'SP Ring Road Clearance' : 'Designated Cab Drop-off Bay',
        description: 'Route recommendation: Divert through Sardar Patel Ring Road to bypass SG Highway post-midnight bottleneck. Ambient temperature: a crisp 25°C.'
      }
    ],
    budget: {
      entry,
      food,
      travel,
      extras,
      total: finalPerPerson,
      totalGroup: finalPerPerson * groupCount
    },
    outfit: {
      style: 'Traditional Gujarati Heritage',
      items: [
        'Mirror-work Chaniya Choli or Royal Kediyu',
        'Oxidized silver tribal jewellery & Kamarbandh',
        'Cushioned arch-support flat Mojdi footwear',
        'Bandhani front-pallu Dupatta'
      ],
      colors: ['Royal Purple (Jamli)', 'Soneri Gold', 'Kesari Saffron'],
      tip: 'Night 8 honors Goddess Mahagauri: Royal Purple (Jamli) or peacock blue creates auspicious harmony with heritage venues.'
    },
    food: [
      'Gujarati Thali with Kadhi & Khichdi',
      'Manek Chowk hot Fafda-Jalebi with Papaya Sambharo',
      'Kulhad Kesar Badam Doodh',
      'Farali Pattice & Sabudana Vada'
    ],
    tips: [
      'Arrive strictly by 8:15 PM to evade peak turnstile queues at Gate 3.',
      'SG Highway experiences heavy congestion between 11:30 PM and 1:00 AM; take internal Bodakdev roads.',
      'Carry small change or UPI QR shortcuts for instant street snacks in Manek Chowk.'
    ],
    trafficAlert: 'Designated valet parking is available via Gate 2. Expect heavy SG Highway congestion between 11:30 PM and 1:00 AM; our dynamic routing engine advises returning via internal Bodakdev roads.',
    musicIntel: 'Live orchestral performance tonight featuring celebrated folk revival artists in the spirit of Atul Purohit & Bhoomi Trivedi — 100% acoustic Gujarati Dhol, Shehnai, and high-energy Sanedo anthems.',
    danceEnergy: {
      steps: 4800,
      calories: 650
    },
    createdAt: new Date().toISOString()
  };
}
