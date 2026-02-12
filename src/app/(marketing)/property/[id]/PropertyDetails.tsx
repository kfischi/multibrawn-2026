'use client';

import { Users, MapPin, Star, Calendar } from 'lucide-react';

interface PropertyDetailsProps {
  property: any;
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-[#00D4FF]">
          <MapPin className="w-5 h-5" />
          <span className="text-lg">{property.location.city}, {property.location.area}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          {property.name}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-gray-300">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-[#FFD700] fill-[#FFD700]" />
            <span className="font-semibold">{property.rating}</span>
          </div>

          {property.capacity && (
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#00D4FF]" />
              <span>עד {property.capacity} אורחים</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#FF4B8C]" />
            <span className="font-semibold text-[#FF4B8C]">{property.price_range}</span>
          </div>

          <span className="px-4 py-1 bg-gradient-to-r from-[#00D4FF] to-[#5E63D8] rounded-full text-white text-sm font-semibold">
            {property.property_type}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold text-white mb-4">אודות הנכס</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          {property.description}
        </p>
      </div>

      {/* Features */}
      {property.features && property.features.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">מתקנים ושירותים</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {property.features.map((feature: string, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#00D4FF]/50 transition-all"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-[#00D4FF] to-[#5E63D8] rounded-full" />
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}
