'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Image from 'next/image';
import Link from 'next/link';

// --- סוגי נתונים ---
interface Property {
  id: string;
  name: string;
  type: string;
  location: string;
  price: string;
  capacity: number;
  rating: number;
  featured: boolean;
  images: string[];
  description: string;
}

interface AffiliateProperty {
  id: string;
  name: string;
  property_type: string;
  location: { city: string; area: string };
  capacity?: number;
  price_range?: string;
  rating?: number;
  featured?: boolean;
  images: { main: string; gallery: string[] };
  description?: string;
}

// --- 🔥 המנוע החכם של קלודינרי ---
// פונקציה זו לוקחת כל כתובת תמונה ומעבירה אותה דרך קלודינרי לאופטימיזציה
const cloudinaryLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  // החלף את זה ב-Cloud Name שלך אם הוא שונה
  const cloudName = 'decirk3zb'; 
  
  // פרמטרים לאופטימיזציה:
  // f_auto = פורמט אוטומטי (WebP/AVIF)
  // q_auto = איכות אוטומטית (כיווץ חכם)
  // w_${width} = גודל מותאם למסך (רספונסיביות)
  const params = [`f_auto`, `q_auto`, `w_${width}`];
  
  if (quality) {
    params.push(`q_${quality}`);
  }

  // שימוש ב-Fetch API של קלודינרי
  return `https://res.cloudinary.com/${cloudName}/image/fetch/${params.join(',')}/${src}`;
};

export default function GalleryPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
   
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const categories = [
    { id: 'all', name: 'הכל', icon: '✨' },
    { id: 'villa', name: 'וילות', icon: '🏛️' },
    { id: 'zimmer', name: 'צימרים', icon: '🏡' },
    { id: 'apartment', name: 'דירות', icon: '🏢' },
    { id: 'hotel', name: 'בוטיק', icon: '🏨' },
    { id: 'event', name: 'אירועים', icon: '💍' },
  ];

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('affiliate_properties')
          .select('*')
          .eq('status', 'active');

        if (error) throw error;

        const sorted = (data || []).sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.rating || 0) - (a.rating || 0);
        });

        const transformed: Property[] = sorted.map((item: AffiliateProperty) => ({
          id: item.id,
          name: item.name,
          type: mapPropertyType(item.property_type),
          location: `${item.location.city || item.location.area || 'ישראל'}`,
          price: item.price_range || 'לפי פנייה',
          capacity: item.capacity || 2,
          rating: item.rating || 0,
          featured: item.featured || false,
          images: [item.images.main, ...(item.images.gallery || [])].filter(Boolean),
          description: item.description || item.name,
        }));

        setProperties(transformed);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  function mapPropertyType(type: string): string {
    const map: Record<string, string> = {
      'צימר': 'zimmer', 'וילה': 'villa', 'דירת נופש': 'apartment',
      'דירה': 'apartment', 'מלון בוטיק': 'hotel', 'בוטיק': 'hotel',
      'מתחם אירועים': 'event', 'מתחם': 'event',
    };
    for (const [key, value] of Object.entries(map)) {
      if (type?.includes(key)) return value;
    }
    return 'zimmer';
  }

  const filteredProperties = selectedCategory === 'all' 
    ? properties 
    : properties.filter(p => p.type === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg font-light">טוען...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 font-sans" dir="rtl">
      
      {/* Hero Video Section */}
      <section className="relative h-[65vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className="w-full h-full object-cover"
          >
            <source src="https://res.cloudinary.com/decirk3zb/video/upload/v1771101549/Gallery_zlvjwx.mp4" type="video/mp4" />
          </video>
           
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>

        {!videoLoaded && (
          <div className="absolute inset-0 bg-slate-900 animate-pulse"></div>
        )}

        <div className="relative h-full flex items-center justify-center pb-10">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
                <span className="text-white/90 text-xs font-medium">אוסף נבחר 2026</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
                <span className="block mb-2">חופשה ברמה אחרת</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  חוויות יוקרה
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/80 font-light max-w-lg mx-auto">
                {properties.length} נכסים אקסקלוסיביים במיקומים הכי מבוקשים
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button 
                  onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-cyan-500/25 flex items-center gap-2 text-sm md:text-base"
                >
                  לצפייה בנכסים
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section id="properties" className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-white/5 shadow-2xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide touch-pan-x">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12 bg-slate-900">
        <div className="container mx-auto px-4">
          {filteredProperties.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-medium mb-2">לא נמצאו נכסים</h3>
              <p className="text-sm">נסו לשנות את הסינון</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map((property, index) => (
                <Link
                  key={property.id}
                  href={`/property/${property.id}`}
                  className="group block"
                  onMouseEnter={() => setHoveredCard(property.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <article className="bg-slate-800/50 rounded-xl overflow-hidden border border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-900/20 hover:-translate-y-1">
                    
                    {/* Image Container */}
                    <div className="relative h-56 overflow-hidden bg-slate-800">
                      
                      {/* 🔥 שימוש ב-Loader החדש של קלודינרי 🔥 */}
                      <Image
                        loader={cloudinaryLoader}
                        src={property.images[0] || '/placeholder.jpg'}
                        alt={property.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        // הסרתי את unoptimized כדי לאפשר ל-Loader לעבוד
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60"></div>
                      
                      {property.featured && (
                        <div className="absolute top-3 right-3 px-2 py-1 bg-amber-500/90 backdrop-blur-sm text-white text-xs font-bold rounded shadow-lg">
                          ⭐ מומלץ
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-sm font-bold border border-white/10">
                        {property.price}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-cyan-400 transition-colors">
                          {property.name}
                        </h3>
                        {property.rating > 0 && (
                          <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold bg-yellow-400/10 px-1.5 py-0.5 rounded">
                            <span>★</span> {property.rating}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-slate-400 text-sm mb-3">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span className="line-clamp-1">{property.location}</span>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                          <span>עד {property.capacity} אורחים</span>
                        </div>
                        <span className="group-hover:translate-x-[-4px] transition-transform text-cyan-500">
                          לפרטים ←
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
