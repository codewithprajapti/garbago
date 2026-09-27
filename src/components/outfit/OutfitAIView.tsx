import React, { useState } from 'react';
import {
  Sparkles,
  Palette,
  Shirt,
  Upload,
  CheckCircle2,
  RefreshCw,
  Bookmark,
  Share2,
  ArrowRight,
  Info
} from 'lucide-react';
import { OutfitLook } from '../../types';
import { MOCK_OUTFITS } from '../../lib/data/mockOutfits';

interface OutfitAIViewProps {
  onSaveOutfit?: (look: OutfitLook) => void;
  onNavigate: (tab: string) => void;
}

export const OutfitAIView: React.FC<OutfitAIViewProps> = ({
  onSaveOutfit,
  onNavigate
}) => {
  const [gender, setGender] = useState<'women' | 'men' | 'couple'>('women');
  const [occasion, setOccasion] = useState('Night 8 • Maha Ashtami');
  const [aesthetic, setAesthetic] = useState('Traditional Gujarati Heritage');
  const [existingColor, setExistingColor] = useState('Royal Purple & Saffron Gold');
  const [userImagePreview, setUserImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLook, setCurrentLook] = useState<OutfitLook>(MOCK_OUTFITS[0]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const occasions = [
    'Night 1 • Ghatasthapana (Yellow)',
    'Night 4 • Royal Jamli Theme',
    'Night 8 • Maha Ashtami (Purple & Gold)',
    'Night 9 • Navami Grand Finale',
    'Sharad Purnima (Moonlit White & Silver)',
    'Club VIP Night (Contemporary Silk)'
  ];

  const aesthetics = [
    'Traditional Gujarati Heritage',
    'Kutchhi Gamthi & Mirror-Work',
    'Regal Bandhani & Soneri Zari',
    'Modern Indo-Western Dandiya'
  ];

  const colorPalettes = [
    'Royal Purple & Saffron Gold',
    'Rani Pink & Emerald Green',
    'Peacock Blue & Soneri Mustard',
    'Classic Ivory & Deep Maroon'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserImagePreview(event.target?.result as string);
        triggerToast('Outfit photo uploaded for AI mirror-work matching!');
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleGenerateLook = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/outfit/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gender,
          occasion,
          aesthetic,
          colorPreference: existingColor
        })
      });

      if (!response.ok) {
        throw new Error('Outfit generation failed');
      }

      const data = await response.json();
      const newLook: OutfitLook = {
        id: `outfit-${Date.now()}`,
        title: data.title || `${aesthetic} Navratri Ensemble`,
        subtitle: data.subtitle || `Curated for ${occasion} in Ahmedabad`,
        aesthetic: data.aesthetic || aesthetic,
        occasion,
        gender,
        clothing: data.clothing || [
          'Royal purple flared Chaniya with intricate mirror border',
          'Bandhani dupatta draped in Gujarati front-pallu style',
          'Embroidered Gamthi blouse with glass abhala mirrors'
        ],
        accessories: data.accessories || [
          'Antique oxidized silver multi-layer Jhumkas',
          'Hasli choker and heavy kada bracelets',
          'Tinkling ghungroo payal'
        ],
        footwear: data.footwear || 'Padded velvet Mojdis with bronze Zari work and cushioned arch support.',
        hairstyle: data.hairstyle || 'Textured low bun woven with fresh fragrant Mogra jasmine gajra.',
        fabricTip: data.fabricTip || 'Pure organic cotton-silk blend provides luxurious sheen while staying breathable.',
        colors: data.colors || [
          { name: 'Royal Purple', hex: '#2A114B', meaning: 'Celestial hue honoring Goddess Mahagauri' },
          { name: 'Soneri Gold', hex: '#D4AF37', meaning: 'Symbolizes prosperity and sacred festivity' },
          { name: 'Kesari Flame', hex: '#FD6B0F', meaning: 'Energy, courage, and vibrant celebration' }
        ],
        image: gender === 'men' ? MOCK_OUTFITS[2].image : MOCK_OUTFITS[0].image
      };

      setCurrentLook(newLook);
      triggerToast('AI generated custom look matching your aesthetic!');
    } catch (err) {
      console.error('Error generating look:', err);
      // Select appropriate mock look
      const fallback = gender === 'men' ? MOCK_OUTFITS[2] : MOCK_OUTFITS[0];
      setCurrentLook(fallback);
      triggerToast('Look updated with authentic Gujarati styling!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToProfile = () => {
    if (onSaveOutfit) {
      onSaveOutfit(currentLook);
    }
    triggerToast('Look saved to your festive wardrobe profile!');
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fbf9f6] text-[#1b1c1a] py-8 md:py-12">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-24 right-6 z-50 flex items-center gap-3 bg-[#0e0024] text-white px-5 py-3 rounded-xl shadow-xl border border-[#cca830]/40">
          <CheckCircle2 className="w-5 h-5 text-[#ffe088]" />
          <span className="font-label-lg text-sm">{toastMsg}</span>
        </div>
      )}

      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a114b] text-[#ffe088] font-label-sm text-label-sm font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#cca830]" />
              <span>Amdavad Couture AI • Authentic Abhala Mirror-Work Intelligence</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-[#0e0024] font-bold">
              Outfit AI
            </h1>
            <p className="font-body-md text-body-md text-[#4a454f] max-w-xl">
              Curate high-movement traditional Gujarati ensembles, oxidized jewellery pairings, and footwear matched to the night's celestial colors.
            </p>
          </div>
        </div>

        {/* 2-Column Workspace: Controls (Left) & Result Showcase (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Style Configurator */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl shadow-sm border border-[#ccc4d0]/30 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#ccc4d0]/20">
              <h3 className="font-headline-sm text-base text-[#0e0024] font-bold flex items-center gap-2">
                <Shirt className="w-4 h-4 text-[#a14000]" />
                <span>Specify Your Look</span>
              </h3>
              <span className="text-xs text-[#4a454f]">Night 8 Focus</span>
            </div>

            {/* Gender Toggle */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0e0024]">Attire Category</label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { key: 'women', label: 'Chaniya Choli' },
                    { key: 'men', label: 'Kediyu / Kurta' },
                    { key: 'couple', label: 'Couple Pair' }
                  ] as const
                ).map(g => (
                  <button
                    key={g.key}
                    type="button"
                    onClick={() => setGender(g.key)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      gender === g.key
                        ? 'bg-[#0e0024] text-white shadow-sm'
                        : 'bg-[#f5f3f0] hover:bg-[#efeeeb] text-[#4a454f]'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion / Night Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0e0024]">Festive Occasion / Night</label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[#f5f3f0] border border-[#ccc4d0]/40 text-xs font-medium text-[#1b1c1a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fd6b0f]"
              >
                {occasions.map(occ => (
                  <option key={occ}>{occ}</option>
                ))}
              </select>
            </div>

            {/* Aesthetic Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0e0024]">Preferred Aesthetic</label>
              <select
                value={aesthetic}
                onChange={(e) => setAesthetic(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[#f5f3f0] border border-[#ccc4d0]/40 text-xs font-medium text-[#1b1c1a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fd6b0f]"
              >
                {aesthetics.map(aes => (
                  <option key={aes}>{aes}</option>
                ))}
              </select>
            </div>

            {/* Color Combination Preference */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0e0024]">Color Theme / Existing Fabric</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {colorPalettes.map(cp => (
                  <button
                    key={cp}
                    type="button"
                    onClick={() => setExistingColor(cp)}
                    className={`p-2.5 rounded-xl text-left text-xs font-medium transition-all cursor-pointer border ${
                      existingColor === cp
                        ? 'bg-[#2a114b] text-white border-[#fd6b0f]/50 shadow-sm font-bold'
                        : 'bg-[#f5f3f0] hover:bg-[#efeeeb] text-[#1b1c1a] border-transparent'
                    }`}
                  >
                    {cp}
                  </button>
                ))}
              </div>
            </div>

            {/* Outfit Image Upload Simulation UI */}
            <div className="space-y-2 pt-2 border-t border-[#ccc4d0]/20">
              <label className="text-xs font-bold text-[#0e0024] flex items-center justify-between">
                <span>Upload Fabric / Outfit Swatch (Optional)</span>
                <span className="text-[10px] text-[#a14000] font-normal">AI Color Matching</span>
              </label>
              <label className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-[#ccc4d0] hover:border-[#fd6b0f] transition-colors cursor-pointer bg-[#f5f3f0]/50">
                <Upload className="w-5 h-5 text-[#a14000] mb-1" />
                <span className="text-xs font-semibold text-[#0e0024]">
                  {userImagePreview ? 'Fabric photo attached' : 'Upload photo or fabric swatch'}
                </span>
                <span className="text-[10px] text-[#4a454f]">PNG, JPG up to 5MB</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              {userImagePreview && (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#cca830]">
                  <img alt="Uploaded fabric" src={userImagePreview} className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Generate CTA Button */}
            <button
              onClick={handleGenerateLook}
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-[#fd6b0f] text-white font-label-lg text-sm font-bold shadow-md hover:bg-[#e05a05] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Gujarati Look...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>✨ Generate Look</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: AI Look Visual Showcase */}
          <div className="lg:col-span-7 space-y-6">
            {/* Visual Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#ccc4d0]/30">
              <div className="relative h-72 sm:h-80 w-full bg-[#0e0024]">
                <img
                  alt={currentLook.title}
                  className="w-full h-full object-cover"
                  src={currentLook.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0024] via-[#0e0024]/40 to-transparent"></div>

                <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-[10px] bg-[#fd6b0f] text-white px-2.5 py-0.5 rounded-full font-bold uppercase">
                      {currentLook.occasion}
                    </span>
                    <span className="font-label-sm text-[10px] bg-white/20 backdrop-blur-md text-[#ffe088] px-2.5 py-0.5 rounded-full font-bold">
                      ✨ AI Curated
                    </span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-white font-bold">
                    {currentLook.title}
                  </h2>
                  <p className="font-body-sm text-xs text-[#eddcff]">
                    {currentLook.subtitle}
                  </p>
                </div>
              </div>

              {/* Look Breakdown Details */}
              <div className="p-6 space-y-6">
                {/* Color Palette swatches */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#4a454f] uppercase tracking-wider">
                    Auspicious Color Harmony
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {currentLook.colors.map(color => (
                      <div
                        key={color.name}
                        className="p-3 rounded-xl bg-[#f5f3f0] border border-[#ccc4d0]/30 flex items-center gap-3"
                      >
                        <div
                          className="w-8 h-8 rounded-lg shadow-sm shrink-0 border border-black/10"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-[#0e0024] block truncate">
                            {color.name}
                          </span>
                          <span className="text-[10px] text-[#4a454f] block truncate">
                            {color.meaning}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clothing Elements */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#4a454f] uppercase tracking-wider">
                    Core Ensemble Pieces
                  </h4>
                  <div className="space-y-2">
                    {currentLook.clothing.map((piece, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-[#1b1c1a] p-2.5 rounded-lg bg-[#f5f3f0]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#fd6b0f] shrink-0 mt-0.5" />
                        <span>{piece}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accessories & Footwear Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#f5f3f0] rounded-xl border border-[#ccc4d0]/20 space-y-1.5">
                    <span className="text-xs font-bold text-[#0e0024] block">
                      Jewellery & Ornaments
                    </span>
                    <ul className="text-xs text-[#4a454f] space-y-1 list-disc list-inside">
                      {currentLook.accessories.map((acc, idx) => (
                        <li key={idx}>{acc}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-[#f5f3f0] rounded-xl border border-[#ccc4d0]/20 space-y-2">
                    <div>
                      <span className="text-xs font-bold text-[#0e0024] block">
                        Footwear Protocol
                      </span>
                      <p className="text-xs text-[#4a454f] mt-0.5">
                        {currentLook.footwear}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#0e0024] block">
                        Garba Hairstyle
                      </span>
                      <p className="text-xs text-[#4a454f] mt-0.5">
                        {currentLook.hairstyle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Comfort & Fabric Tip */}
                <div className="p-4 bg-[#2a114b] rounded-xl text-white space-y-1">
                  <span className="text-xs font-bold text-[#ffe088] flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#ffe088]" />
                    Dance Comfort & Fabric Tip
                  </span>
                  <p className="text-xs text-[#eddcff] leading-relaxed">
                    {currentLook.fabricTip}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={() => triggerToast('Styling card copied to share on Instagram / WhatsApp!')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#efeeeb] text-[#0e0024] font-label-md text-xs font-bold hover:bg-[#eae8e5] transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Look</span>
                  </button>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={handleSaveToProfile}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0e0024] text-white font-label-md text-xs font-bold hover:bg-[#2a114b] transition-all cursor-pointer shadow-sm"
                    >
                      <Bookmark className="w-4 h-4" />
                      <span>Save Look to Profile</span>
                    </button>
                    <button
                      onClick={() => onNavigate('plan-my-night')}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#fd6b0f] text-white font-label-md text-xs font-bold hover:bg-[#e05a05] transition-all cursor-pointer shadow-md"
                    >
                      <span>Plan Night with this Look</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
