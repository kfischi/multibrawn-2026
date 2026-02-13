'use client';

import { Coffee, UtensilsCrossed, Mountain, Compass } from 'lucide-react';

interface NearbyAttractionsProps {
  location: {
    city: string;
    area: string;
  };
}

const getAttractionsByArea = (area: string) => {
  const attractions: Record<string, any> = {
    'ים המלח': {
      restaurants: [
        { name: 'מסעדת קפטורה', type: 'מסעדה גורמה', distance: '5 ק״מ' },
        { name: 'בית קפה המלח', type: 'קפה ומאפים', distance: '2 ק״מ' },
      ],
      attractions: [
        { name: 'חוף עין גדי', type: 'חוף ים המלח', distance: '15 ק״מ' },
        { name: 'מצודת מצדה', type: 'אתר היסטורי', distance: '20 ק״מ' },
        { name: 'שמורת עין בוקק', type: 'טבע', distance: '10 ק״מ' },
      ],
      activities: [
        { name: 'טיפולי ספא', type: 'בריאות', distance: '3 ק״מ' },
        { name: 'ג\'יפים במדבר', type: 'אקסטרים', distance: '8 ק״מ' },
      ],
    },
  };

  return attractions[area] || { restaurants: [], attractions: [], activities: [] };
};

export default function NearbyAttractions({ location }: NearbyAttractionsProps) {
  const data = getAttractionsByArea(location.area);

  if (!data.attractions.length && !data.restaurants.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Compass className="w-6 h-6 text-[#00D4FF]" />
        <h2 className="text-2xl font-bold text-white">מה יש באזור?</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.restaurants.length > 0 && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <UtensilsCrossed className="w-5 h-5 text-[#FF4B8C]" />
              <h3 className="text-lg font-bold text-white">מסעדות</h3>
            </div>
            <div className="space-y-3">
              {data.restaurants.map((restaurant: any, idx: number) => (
                <div key={idx} className="space-y-1">
                  <p className="text-white font-semibold">{restaurant.name}</p>
                  <p className="text-gray-400 text-sm">{restaurant.type} · {restaurant.distance}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
