export interface FoodItem {
  id: string;
  name: string;
  gujaratiName: string;
  category: 'Midnight Street Food' | 'Traditional Dinner' | 'Farali Fasting' | 'Beverages';
  location: string;
  area: string;
  pricePerPerson: number;
  timing: string;
  description: string;
  mustTry: string;
  isManekChowkSpecial?: boolean;
  image: string;
}

export const MOCK_FOOD_ITEMS: FoodItem[] = [
  {
    id: 'manek-chowk-fafda-jalebi',
    name: 'Piping Hot Jalebi & Crunchy Fafda',
    gujaratiName: 'ગરમા ગરમ ફાફડા અને જલેબી',
    category: 'Midnight Street Food',
    location: 'Shree Murli Jalebi Fafda House, Manek Chowk',
    area: 'Heritage Walled City',
    pricePerPerson: 180,
    timing: '10:00 PM – 3:30 AM',
    description: 'Crisp golden besan fafda fresh from large iron kadhais, paired with spirals of saffron-infused hot jalebi and pungent fried green chilies with raw papaya sambharo.',
    mustTry: 'Pure desi ghee Jalebi with hot kadhi and papaya chutney',
    isManekChowkSpecial: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpi-NAdup7pvDfXefdzTVFh57k1LtK8pGaH2A9vwOs07yTFkbAJoEfB1UWJ5Fd9osfiio_wXZJ6tSNW95MJU-2U2_YgGutOdkfjiSLs_mIPuNcdNbSMfvCjzJ6mAYEB5RCmSzK0Li2xOjijxXY8Aec1B1wJ3eHlI7FYppwdWzlpSA1S6s8lBP1R6RwROtoGUvmvnk5wA-CTIkz7dcQtDF9MXpKEQfgeBJh9ZTcjWmQv0PdRz5DEKWQ'
  },
  {
    id: 'kesar-dry-fruit-doodh',
    name: 'Ashapura Kesar Hot Dry Fruit Milk',
    gujaratiName: 'આશાપુરા કેસર મસાલા દૂધ',
    category: 'Beverages',
    location: 'Ashapura Kesar Milk Stall, Near Teen Darwaza',
    area: 'Heritage Walled City',
    pricePerPerson: 80,
    timing: '8:00 PM – 3:00 AM',
    description: 'Rich, creamy whole milk slow-simmered in colossal copper handis with Kashmiri saffron strands, crushed almonds, pistachios, cardamom, and nutmeg served in terracotta kulhads.',
    mustTry: 'Kulhad Kesar Badam Doodh with thick malai layer',
    isManekChowkSpecial: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpi-NAdup7pvDfXefdzTVFh57k1LtK8pGaH2A9vwOs07yTFkbAJoEfB1UWJ5Fd9osfiio_wXZJ6tSNW95MJU-2U2_YgGutOdkfjiSLs_mIPuNcdNbSMfvCjzJ6mAYEB5RCmSzK0Li2xOjijxXY8Aec1B1wJ3eHlI7FYppwdWzlpSA1S6s8lBP1R6RwROtoGUvmvnk5wA-CTIkz7dcQtDF9MXpKEQfgeBJh9ZTcjWmQv0PdRz5DEKWQ'
  },
  {
    id: 'farali-pattice-thali',
    name: 'Authentic Farali Fasting Platter',
    gujaratiName: 'નવરાત્રિ ફરાળી થાળી',
    category: 'Farali Fasting',
    location: 'Gordhan Thal & Sasumaa Express Counter',
    area: 'SG Highway & Bodakdev',
    pricePerPerson: 350,
    timing: '7:00 PM – 12:30 AM',
    description: 'Special fasting-compliant gourmet meal: coconut-stuffed potato Farali pattice, crispy Sabudana vada, Moraiya khichdi with peanut kadhi, Rajgira puris, and sweet shrikhand.',
    mustTry: 'Farali Pattice with spicy sweet-sour green mint chutney',
    isManekChowkSpecial: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXHq4CZBcbKQinCgMBHCySjWcxXSZMAouil7chPMgL40hFkPRr1EFh8hHODnCpW1DsIo4uyxWKqg60Nw1LLKAOVBGUSY9NXvkC2PCsKRZBASDE3PI2kdgxpsqFQj_FjpfqFIQvGMZ8ieZ0G7ofIWZgBNPHVQTiAycxKsYfmnSSssWOMhnMnQ_FlId61vt7p1RFSC9uIvnUPnAJlasSuqp5bfxxSvHpavyy6kwQ293IXPHkuu1ci8R1'
  },
  {
    id: 'manek-chowk-butter-dosa',
    name: 'Amdavadi Gwalior Butter Dosa',
    gujaratiName: 'માણેક ચોક ગ્વાલિયર બટર ઢોંસા',
    category: 'Midnight Street Food',
    location: 'Mahalaxmi Gwalior Dosa, Manek Chowk Center',
    area: 'Heritage Walled City',
    pricePerPerson: 220,
    timing: '10:00 PM – 3:30 AM',
    description: 'Thin crispy paper roast dosa crowned with a generous slab of melting Amul butter, spiced Mysore bhaji, and finely grated cheese, served with coconut chutney.',
    mustTry: 'Cheese Butter Gwalior Dosa with hot vegetable sambar',
    isManekChowkSpecial: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpi-NAdup7pvDfXefdzTVFh57k1LtK8pGaH2A9vwOs07yTFkbAJoEfB1UWJ5Fd9osfiio_wXZJ6tSNW95MJU-2U2_YgGutOdkfjiSLs_mIPuNcdNbSMfvCjzJ6mAYEB5RCmSzK0Li2xOjijxXY8Aec1B1wJ3eHlI7FYppwdWzlpSA1S6s8lBP1R6RwROtoGUvmvnk5wA-CTIkz7dcQtDF9MXpKEQfgeBJh9ZTcjWmQv0PdRz5DEKWQ'
  }
];
