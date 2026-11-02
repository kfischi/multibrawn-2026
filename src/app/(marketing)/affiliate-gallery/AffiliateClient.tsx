'use client';

import Image from 'next/image';
import { useState } from 'react';

interface AffiliateProperty {
  id: string;
  name: string;
  description: string;
  location: string;
  priceRange: string;
  images: string[];
  affiliate: {
    affiliateUrl: string;
    partnerId: string;
    commission: number;
  };
  features: string[];
  propertyType: string;
  capacity?: number;
  rating?: number;
}

function PropertyCard({ property }: { property: AffiliateProperty }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={property.affiliate.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl overflow-hidden transition-all duration-300 bg-white shadow-md hover:shadow-2xl"
      style={{
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-72 overflow-hidden">
        <Image
          src={property.images[0] || '/images/placeholder.jpg'}
          alt={property.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold">
          {property.propertyType}
        </div>

        {property.rating && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
            <span className="text-fuchsia-500">★</span>
            <span>{property.rating}</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="text-sm text-gray-600 mb-2 flex items-center gap-1">
          <span>📍</span>
          <span>{property.location}</span>
        </div>

        <h3 className="text-2xl font-bold mb-3 text-gray-900 line-clamp-2">
          {property.name}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {property.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {property.features.slice(0, 3).map((feature, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
            >
              {feature}
            </span>
          ))}
          {property.features.length > 3 && (
            <span className="text-gray-500 text-xs px-2 py-1">
              +{property.features.length - 3} עוד
            </span>
          )}
        </div>

        {property.capacity && (
          <div className="text-sm text-gray-600 mb-3">
            👥 עד {property.capacity} אורחים
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <div className="text-2xl font-bold text-cyan-600">
              {property.priceRange}
            </div>
            <div className="text-xs text-gray-500">ללילה</div>
          </div>
          <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
            צפה בנכס →
          </div>
        </div>
      </div>
    </a>
  );
}

export default function AffiliateGalleryPage() {
  const affiliateProperties: AffiliateProperty[] = [
    {
      id: '1',
      name: 'וילת יוקרה פנורמית בגליל',
      description: 'וילה מדהימה עם נוף פנורמי עוצר נשימה לכנרת, בריכה פרטית מחוממת, ג׳קוזי ספא ונופש מושלם למשפחות ולקבוצות',
      location: 'גליל עליון',
      priceRange: '₪2,500-4,500',
      images: ['https://res.cloudinary.com/dptyfvwyo/image/upload/v1234567890/sample-villa.jpg'],
      affiliate: {
        affiliateUrl: 'https://tzimer360.com/property-1',
        partnerId: 'tzimer360',
        commission: 10,
      },
      features: ['בריכה מחוממת', 'נוף לכנרת', 'ג׳קוזי ספא', 'ברביקיו'],
      propertyType: 'וילה',
      capacity: 12,
      rating: 4.9,
    },
    {
      id: '2',
      name: 'בקתת עץ רומנטית בכרמל',
      description: 'בקתה אינטימית וקסומה בלב היער, מושלמת לזוגות המחפשים רומנטיקה ופרטיות מוחלטת',
      location: 'כרמל',
      priceRange: '₪800-1,200',
      images: ['https://res.cloudinary.com/dptyfvwyo/image/upload/v1234567890/sample-cabin.jpg'],
      affiliate: {
        affiliateUrl: 'https://tzimer360.com/property-2',
        partnerId: 'tzimer360',
        commission: 10,
      },
      features: ['ג׳קוזי זוגי', 'אח בוערת', 'פינת מנגל', 'נוף יער'],
      propertyType: 'בקתה',
      capacity: 2,
      rating: 5.0,
    },
    {
      id: '3',
      name: 'סוויטת בוטיק במרכז ירושלים',
      description: 'סוויטה יוקרתית ומעוצבת בלב העיר העתיקה, צעד אחד מכל האטרקציות וההיסטוריה',
      location: 'ירושלים',
      priceRange: '₪1,200-1,800',
      images: ['https://res.cloudinary.com/dptyfvwyo/image/upload/v1234567890/sample-suite.jpg'],
      affiliate: {
        affiliateUrl: 'https://tzimer360.com/property-3',
        partnerId: 'tzimer360',
        commission: 10,
      },
      features: ['מיקום מרכזי', 'עיצוב יוקרתי', 'מרפסת פרטית', 'חניה'],
      propertyType: 'סוויטה',
      capacity: 4,
      rating: 4.8,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      <section className="relative bg-gradient-to-br from-cyan-600 via-purple-600 to-pink-600 text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }} />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            גלריית נכסי יוקרה
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-95 leading-relaxed">
            בחרו מתוך מבחר מנכסי הפרימיום המובחרים בישראל
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-bold text-lg">29+ נכסים</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-bold text-lg">⭐ 4.9 דירוג ממוצע</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-bold text-lg">✓ מיטב המחירים</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            המלצות מובילות
          </h2>
          <p className="text-lg text-gray-600">
            כל הנכסים שלנו נבחרו בקפידה ועברו אימות איכות מלא
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {affiliateProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105">
            טען עוד נכסים
          </button>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            למה לבחור ב-MULTIBRAWN?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl mb-4">🛡️</div>
              <h4 className="font-bold text-xl mb-2">ערבות מחיר</h4>
              <p className="text-gray-600">המחירים הטובים ביותר בשוק או החזר הפרש</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl mb-4">⚡</div>
              <h4 className="font-bold text-xl mb-2">הזמנה מהירה</h4>
              <p className="text-gray-600">תהליך הזמנה פשוט ואישור מיידי</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl mb-4">💎</div>
              <h4 className="font-bold text-xl mb-2">איכות מובטחת</h4>
              <p className="text-gray-600">כל הנכסים עברו בדיקה ואישור איכות</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
