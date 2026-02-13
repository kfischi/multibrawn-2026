'use client';

import { MapPin } from 'lucide-react';

interface PropertyMapProps {
  location: {
    city: string;
    area: string;
  };
  propertyName: string;
}

export default function PropertyMap({ location }: PropertyMapProps) {
  const mapQuery = encodeURIComponent(`${location.city}, ${location.area}, Israel`);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-6 h-6 text-[#00D4FF]" />
          <h3 className="text-xl font-bold text-white">מיקום</h3>
        </div>
        <div className="space-y-2">
          <p className="text-gray-300 font-semibold">{location.city}</p>
          <p className="text-gray-400">{location.area}</p>
        </div>
      </div>

      <div className="h-64 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center border-t border-white/10">
        <div className="text-center space-y-2 p-6">
          <MapPin className="w-12 h-12 text-[#00D4FF] mx-auto" />
          <p className="text-gray-400">{location.city}, {location.area}</p>
          
            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-[#00D4FF] text-white rounded-lg hover:bg-[#00B8E6] transition-colors text-sm font-semibold"
          >
            פתח במפות
          </a>
        </div>
      </div>
    </div>
  );
}
