// src/app/(marketing)/property/[slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const supabase = createClient(
  'https://ulfwxmjerugxayuyliug.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZnd4bWplcnVneGF5dXlsaXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyNTk2NjgsImV4cCI6MjA1MTgzNTY2OH0.VEWdOUor4X1OXU3VfT19WO0E6eSj6xhUX2IqqSn8J9I'
);

export default function PropertyPage() {
  const params = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    async function fetchProperty() {
      const { data, error } = await supabase
        .from('affiliate_properties')
        .select('*')
        .eq('id', params.slug)
        .single();

      if (data) {
        setProperty(data);
      }
      setLoading(false);
    }

    fetchProperty();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-2xl">טוען...</div>
      </div>
    );
  }

  if (!property) {
    return notFound();
  }

  const allImages = [property.images.main, ...(property.images.gallery || [])].filter(Boolean);
  const affiliateUrl = `https://www.tzimer360.co.il/Location/${property.affiliate?.code}?t=affiliate26`;

  // Area attractions based on location
  const getAttractions = () => {
    const area = property.location?.area;
    if (area === 'דרום' || property.location?.city?.includes('נווה זוהר')) {
      return [
        { name: 'ים המלח', distance: '5 דקות', icon: '🌊' },
        { name: 'עין גדי', distance: '15 דקות', icon: '🏞️' },
        { name: 'מצדה', distance: '20 דקות', icon: '🏰' },
        { name: 'עין בוקק', distance: '10 דקות', icon: '💆' },
        { name: 'חוף קליה', distance: '25 דקות', icon: '🏖️' },
      ];
    }
    return [];
  };

  const getRestaurants = () => {
    const area = property.location?.area;
    if (area === 'דרום' || property.location?.city?.includes('נווה זוהר')) {
      return [
        { name: 'קפה קומה', type: 'קפה ומאפים', price: '₪₪' },
        { name: 'מסעדת המלון', type: 'ישראלית', price: '₪₪₪' },
        { name: 'ביסטרו צוקים', type: 'בשרים', price: '₪₪₪₪' },
      ];
    }
    return [];
  };

  const getHikes = () => {
    const area = property.location?.area;
    if (area === 'דרום' || property.location?.city?.includes('נווה זוהר')) {
      return [
        { name: 'נחל דוד', difficulty: 'קל', duration: '2-3 שעות', suitable: 'משפחות' },
        { name: 'נחל ערוגות', difficulty: 'בינוני', duration: '3-4 שעות', suitable: 'זוגות' },
        { name: 'שביל ישראל - קטע ים המלח', difficulty: 'מאתגר', duration: '5-6 שעות', suitable: 'מנוסים' },
      ];
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white" dir="rtl">
      {/* Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 p-4 shadow-2xl z-50 md:hidden">
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white text-purple-600 text-center py-3 rounded-xl font-bold"
        >
          🎯 הזמן עכשיו
        </a>
      </div>

      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/affiliate-gallery" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            ← חזרה לגלריה
          </Link>
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-2xl transition-shadow"
          >
            🎯 הזמן עכשיו
          </a>
        </div>
      </header>

      {/* Hero Gallery */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image
          src={allImages[activeImage]}
          alt={property.name}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Image Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {allImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === activeImage ? 'bg-cyan-400 w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-20 left-0 right-0 px-6">
          <div className="container mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {property.name}
            </h1>
            <div className="flex items-center gap-4 text-xl">
              <span className="flex items-center gap-2">
                <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {property.location?.city}, {property.location?.area}
              </span>
              <span>⭐ {property.rating || '5.0'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* About */}
            <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="text-4xl">ℹ️</span>
                אודות הנכס
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                {property.description || 'נכס יוקרתי עם כל השירותים והמתקנים'}
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-2">👥</div>
                  <div className="text-3xl font-bold text-cyan-400">{property.capacity}</div>
                  <div className="text-gray-300">אורחים</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-2">⭐</div>
                  <div className="text-3xl font-bold text-purple-400">{property.rating || '5.0'}</div>
                  <div className="text-gray-300">דירוג</div>
                </div>
                <div className="bg-gradient-to-br from-pink-500/20 to-cyan-500/20 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-2">🏠</div>
                  <div className="text-xl font-bold text-pink-400">{property.property_type}</div>
                  <div className="text-gray-300">סוג נכס</div>
                </div>
              </div>
            </section>

            {/* Attractions */}
            {getAttractions().length > 0 && (
              <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-4xl">🎯</span>
                  אטרקציות באזור
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {getAttractions().map((attraction, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl p-6 hover:scale-105 transition-transform">
                      <div className="text-5xl">{attraction.icon}</div>
                      <div>
                        <div className="text-xl font-bold text-white">{attraction.name}</div>
                        <div className="text-cyan-400">{attraction.distance}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Restaurants */}
            {getRestaurants().length > 0 && (
              <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-4xl">🍽️</span>
                  מסעדות מומלצות
                </h2>
                <div className="space-y-4">
                  {getRestaurants().map((restaurant, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6">
                      <div>
                        <div className="text-xl font-bold text-white">{restaurant.name}</div>
                        <div className="text-gray-400">{restaurant.type}</div>
                      </div>
                      <div className="text-2xl text-cyan-400">{restaurant.price}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Hiking Trails */}
            {getHikes().length > 0 && (
              <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-4xl">🥾</span>
                  מסלולי טיול
                </h2>
                <div className="space-y-4">
                  {getHikes().map((hike, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-xl font-bold text-white">{hike.name}</div>
                        <div className="px-4 py-1 bg-cyan-500/20 rounded-full text-cyan-400 text-sm">{hike.difficulty}</div>
                      </div>
                      <div className="flex gap-6 text-gray-300">
                        <span>⏱️ {hike.duration}</span>
                        <span>👥 מתאים ל-{hike.suitable}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Local Tips */}
            <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="text-4xl">💡</span>
                טיפים מקומיים
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <span className="text-gray-300">הגיעו מוקדם בבוקר להימנע מהמון</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <span className="text-gray-300">הביאו מים בשפע - האקלים יבש</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <span className="text-gray-300">שעות השקיעה הן הכי יפות</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <span className="text-gray-300">חניה חינם זמינה ליד הנכס</span>
                </li>
              </ul>
            </section>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="text-center mb-8">
                {property.price_range && (
                  <div>
                    <div className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                      {property.price_range}
                    </div>
                    <div className="text-gray-400">ללילה</div>
                  </div>
                )}
              </div>

              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white text-center py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all mb-4"
              >
                🎯 הזמן עכשיו
              </a>

              <div className="text-center text-sm text-gray-400 mb-6">
                בשיתוף עם צימר360
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">📱</span>
                  <div>
                    <div className="font-bold">צריכים עזרה?</div>
                    <a href="https://wa.me/972523983394" className="text-cyan-400 hover:text-cyan-300">
                      WhatsApp →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-extrabold mb-6">מוכנים לחוויה בלתי נשכחת?</h2>
          <p className="text-2xl mb-8 opacity-90">הזמינו עכשיו והתחילו לחלום</p>
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-purple-600 px-12 py-5 rounded-2xl font-bold text-2xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            🎯 להזמנה ב-Tzimer360
          </a>
          <div className="mt-4 text-sm opacity-75">
            בשיתוף עם צימר360
          </div>
        </div>
      </section>
    </div>
  );
}
