'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// --- הגדרות ---
const supabase = createClient(
  'https://ulfwxmjerugxayuyliug.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZnd4bWplcnVneGF5dXlsaXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3Njg3ODksImV4cCI6MjA4NDM0NDc4OX0._-zdlFQx5c0ToJNiH2HM3DygCn4dHvkCAoeVj0GV42g'
);

// 🔥 המנוע החכם של קלודינרי (חובה לביצועים)
const cloudinaryLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  const cloudName = 'decirk3zb'; 
  const params = [`f_auto`, `q_auto`, `w_${width}`];
  if (quality) params.push(`q_${quality}`);
  return `https://res.cloudinary.com/${cloudName}/image/fetch/${params.join(',')}/${src}`;
};

export default function PropertyPage() {
  const params = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const { data, error } = await supabase
          .from('affiliate_properties')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) throw error;
        if (data) setProperty(data);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }
     
    fetchProperty();

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-2xl font-light text-slate-400">טוען...</div>
        </div>
      </div>
    );
  }

  if (!property) return notFound();

  const allImages = [property.images?.main, ...(property.images?.gallery || [])].filter(Boolean);
  const affiliateCode = property.affiliate?.code || property.id?.split('-')[1] || '';
  const affiliateUrl = `https://www.tzimer360.co.il/Location/C${affiliateCode}?t=affiliate26`;

  const getAreaData = () => {
    const area = property.location?.area || '';
    const city = property.location?.city || '';
     
    if (area === 'דרום' || city.includes('ים המלח') || city.includes('נווה זוהר')) {
      return {
        attractions: [
          { name: 'ים המלח', distance: '5 דקות', icon: '🌊' },
          { name: 'שמורת עין גדי', distance: '15 דקות', icon: '🏞️' },
          { name: 'מצדה', distance: '20 דקות', icon: '🏰' },
          { name: 'עין בוקק', distance: '10 דקות', icon: '💆' },
        ],
        restaurants: [
          { name: 'קפה קומה', type: 'קפה', price: '₪₪' },
          { name: 'מסעדת המלון', type: 'ישראלית', price: '₪₪₪' },
        ],
        hikes: [
          { name: 'נחל דוד', difficulty: 'קל', duration: '2-3 שעות' },
          { name: 'נחל ערוגות', difficulty: 'בינוני', duration: '3-4 שעות' },
        ]
      };
    }
     
    if (area === 'צפון' || city.includes('טבריה') || city.includes('כנרת') || city.includes('גליל')) {
      return {
        attractions: [
          { name: 'כנרת', distance: '10 דקות', icon: '🌊' },
          { name: 'חמת טבריה', distance: '5 דקות', icon: '♨️' },
          { name: 'טיילת טבריה', distance: '10 דקות', icon: '🚶' },
          { name: 'הר ארבל', distance: '20 דקות', icon: '⛰️' },
        ],
        restaurants: [
          { name: 'דקל', type: 'דגים', price: '₪₪₪' },
          { name: 'גיא אונליינר', type: 'בשרים', price: '₪₪₪₪' },
        ],
        hikes: [
          { name: 'נחל עמוד', difficulty: 'קל', duration: '2 שעות' },
          { name: 'הר ארבל', difficulty: 'בינוני', duration: '3 שעות' },
        ]
      };
    }
     
    return { attractions: [], restaurants: [], hikes: [] };
  };

  const areaData = getAreaData();

  return (
    <div className="min-h-screen bg-white font-sans" dir="rtl">
      
      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/gallery" className="text-slate-600 hover:text-cyan-600 transition-colors flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">חזרה לגלריה</span>
          </Link>
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-cyan-500/30 shadow-lg"
          >
            הזמן עכשיו
          </a>
        </div>
      </header>

      {/* Hero Gallery */}
      <section className="relative h-[80vh] md:h-screen">
        <div className="absolute inset-0 bg-slate-900">
          {allImages[activeImage] && (
            <Image
              loader={cloudinaryLoader} 
              src={allImages[activeImage]}
              alt={property.name}
              fill
              className="object-cover opacity-90"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>

        {/* Image Navigation Dots */}
        {allImages.length > 1 && (
          <div className="absolute bottom-40 left-0 right-0 flex justify-center gap-3 px-6 z-20">
            {allImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`transition-all duration-300 rounded-full shadow-lg ${
                  idx === activeImage 
                    ? 'bg-cyan-400 w-12 h-3' 
                    : 'bg-white/50 w-3 h-3 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 pb-12 md:pb-24 z-10">
          <div className="container mx-auto">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                {property.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90 text-lg md:text-xl">
                <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                  <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {property.location?.city}, {property.location?.area}
                </span>
                {property.rating > 0 && (
                  <span className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {property.rating}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-3 gap-16">
          
          {/* Content Column */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* About Section */}
            <section>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-cyan-500 rounded-full"></span>
                אודות הנכס
              </h2>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 whitespace-pre-line">
                {property.description || 'נכס יוקרתי המציע חוויית אירוח ייחודית במיקום מעולה'}
              </p>
              
              <div className="grid grid-cols-3 gap-4 md:gap-6">
                <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100 hover:border-cyan-200 transition-colors">
                  <div className="text-4xl mb-3">👥</div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">{property.capacity || 2}</div>
                  <div className="text-slate-500 text-sm">אורחים</div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100 hover:border-purple-200 transition-colors">
                  <div className="text-4xl mb-3">⭐</div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">{property.rating || '5.0'}</div>
                  <div className="text-slate-500 text-sm">דירוג</div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100 hover:border-amber-200 transition-colors">
                  <div className="text-4xl mb-3">🏠</div>
                  <div className="text-lg font-bold text-slate-900 mb-1">{property.property_type}</div>
                  <div className="text-slate-500 text-sm">סוג נכס</div>
                </div>
              </div>
            </section>

            {/* Attractions */}
            {areaData.attractions.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                   <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                   אטרקציות באזור
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {areaData.attractions.map((attraction, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-white border border-slate-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-4xl bg-slate-50 p-3 rounded-lg">{attraction.icon}</div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-800">{attraction.name}</h3>
                        <p className="text-cyan-600 text-sm font-medium">{attraction.distance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Restaurants */}
            {areaData.restaurants.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                   <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
                   מסעדות מומלצות
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {areaData.restaurants.map((restaurant, idx) => (
                    <div key={idx} className="bg-white border border-slate-100 rounded-xl p-6 hover:border-amber-200 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">{restaurant.name}</h3>
                          <p className="text-slate-500">{restaurant.type}</p>
                        </div>
                        <div className="text-amber-500 font-bold">{restaurant.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Hiking */}
            {areaData.hikes.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                   <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                   מסלולי טיול
                </h2>
                <div className="space-y-4">
                  {areaData.hikes.map((hike, idx) => (
                    <div key={idx} className="bg-white border border-slate-100 rounded-xl p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{hike.name}</h3>
                        <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {hike.duration}
                        </div>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                        hike.difficulty === 'קל' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {hike.difficulty}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky Sidebar Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl shadow-slate-200/50">
              {property.price_range && (
                <div className="text-center mb-8 pb-8 border-b border-slate-100">
                  <div className="text-5xl font-bold text-slate-900 mb-2 font-mono tracking-tight">
                    {property.price_range}
                  </div>
                  <div className="text-slate-400 text-sm font-medium uppercase tracking-wide">מחיר ללילה (הערכה)</div>
                </div>
              )}

              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-center py-5 rounded-2xl font-bold text-xl hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mb-4 shadow-cyan-500/30"
              >
                לבדיקת זמינות והזמנה 📅
              </a>

              <div className="text-center text-xs text-slate-400 mb-8">
                ההזמנה מתבצעת בצורה מאובטחת דרך צימר360
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-3">
                <a 
                  href={`https://wa.me/972523983394?text=שלום, אני מתעניין בנכס ${property.name}`} 
                  target="_blank"
                  className="flex items-center justify-center gap-3 p-3 rounded-xl bg-green-50 text-green-700 font-bold hover:bg-green-100 transition-colors w-full"
                >
                  {/* תיקנתי את ה-SVG השבור כאן */}
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.913.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-2.846-.828-.305-.124-.577-.281-.577-.281s-.073-.016-.073-.016c-.765-.804-1.26-1.547-1.236-2.094.029-.64.453-.866.564-.866.113 0 .366 0 .546.012.164.01.236.016.353.308.136.335.539 1.309.585 1.405.045.096.064.223.006.336-.058.113-.087.164-.176.262-.088.098-.184.218-.262.296-.089.088-.182.184-.078.363.104.179.46.746 1.01 1.235.688.611 1.296.817 1.492.905.196.088.312.078.43-.057.118-.135.508-.59.645-.794.137-.204.275-.17.46-.102.185.068 1.17.553 1.369.652.199.099.332.148.379.231.047.083.047.476-.097.881z"/>
                  </svg>
                  התייעצות ב-WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-40">
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-center py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-shadow"
        >
          בדיקת זמינות ולקטלוג המלא 📅
        </a>
      </div>

      {/* Final CTA */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">עדיין מתלבטים?</h2>
          <p className="text-xl mb-12 opacity-80 font-light max-w-2xl mx-auto">הצוות שלנו מכיר את כל הנכסים באופן אישי וישמח לעזור לכם למצוא את החופשה המושלמת</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-cyan-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-cyan-400 hover:scale-105 transition-all duration-300"
            >
              המשך להזמנה באתר →
            </a>
            <a 
              href="https://wa.me/972523983394"
              className="inline-block bg-transparent border border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300"
            >
               דבר עם נציג
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
