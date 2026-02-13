'use client';
import { ExternalLink } from 'lucide-react';

interface PropertyCTAProps {
  property: any;
}

export default function PropertyCTA({ property }: PropertyCTAProps) {
  const affiliateUrl = property.affiliate?.affiliateUrl || '#';

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

          
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 px-6 bg-gradient-to-r from-[#00D4FF] via-[#5E63D8] to-[#FF4B8C] text-white font-bold rounded-xl hover:shadow-lg transition-all text-center"
          >
            הזמן עכשיו
          </a>

          
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-[#00D4FF] hover:text-[#5E63D8] transition-colors text-sm"
          >
            <span>צפה בפרטים בצימר360</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
