'use client';

import { ExternalLink, ArrowLeft } from 'lucide-react';

interface PropertyCTAProps {
  property: any;
}

export default function PropertyCTA({ property }: PropertyCTAProps) {
  const affiliateUrl = property.affiliate?.affiliateUrl || '#';

  const handleBooking = () => {
    window.open(affiliateUrl, '_blank');
  };

  return (
    <div className="sticky top-24 space-y-6">
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-8 rounded-2xl border border-white/10 shadow-2xl">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-gray-400 text-sm">מחיר ללילה</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-[#00D4FF] via-[#5E63D8] to-[#FF4B8C] bg-clip-text text-transparent">
              {property.price_range}
            </p>
          </div>

          <button
            onClick={handleBooking}
            className="w-full py-4 px-6 bg-gradient-to-r from-[#00D4FF] via-[#5E63D8] to-[#FF4B8C] text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-3 group"
          >
            <span>הזמן עכשיו</span>
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>

          
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-[#00D4FF] hover:text-[#5E63D8] transition-colors text-sm"
          >
            <span>צפה בפרטים מלאים בצימר360</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#00D4FF] to-[#5E63D8] rounded-lg flex items-center justify-center">
            <span className="text-2xl">✓</span>
          </div>
          <div>
            <p className="text-white font-semibold">הזמנה מאובטחת</p>
            <p className="text-gray-400 text-sm">דרך צימר360</p>
          </div>
        </div>
      </div>
    </div>
  );
}
