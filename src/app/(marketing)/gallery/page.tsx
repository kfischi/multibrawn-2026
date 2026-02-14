'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Image from 'next/image';
import Link from 'next/link';

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
      if (type.includes(key)) return value;
    }
    return 'zimmer';
  }

  const filteredProperties = selectedCategory === 'all' 
    ? properties 
    : properties.filter(p => p.type === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-white text-xl font-light">טוען חוויות יוקרה...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900" dir="rtl">
      {/* Hero Video Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Video Background */}
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
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 via-transparent to-purple-900/30"></div>
        </div>

        {/* Loading Placeholder */}
        {!videoLoaded && (
          <div className="absolute inset-0 bg-slate-900 animate-pulse"></div>
        )}

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                <span className="text-white/90 text-sm font-medium">אוסף נבחר של נכסי יוקרה</span>
              </div>

              {/* Main Title */}
              <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight">
                <span className="block">חוויות נופש</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  בלתי נשכחות
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-2xl md:text-3xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
                {properties.length} נכסים יוקרתיים במיקומים הכי מבוקשים בישראל
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                <button 
                  onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-3"
                >
                  <span>גלה את הנכסים</span>
                  <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                
                <a
                  href="https://wa.me/972523983394"
                  className="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                >
                  דברו איתנו
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">{properties.length}+</div>
                  <div className="text-white/60 text-sm">נכסים</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">9+</div>
                  <div className="text-white/60 text-sm">שנות ניסיון</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">100%</div>
                  <div className="text-white/60 text-sm">שביעות רצון</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Categories Filter */}
      <section id="properties" className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50 scale-105'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <span>{cat.name}</span>
                {selectedCategory === cat.id && (
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    {filteredProperties.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {filteredProperties.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🏠</div>
              <h3 className="text-2xl font-bold text-white mb-4">לא נמצאו נכסים</h3>
              <p className="text-white/60">נסו לבחור קטגוריה אחרת</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property, index) => (
                <Link
                  key={property.id}
                  href={`/property/${property.id}`}
                  className="group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHoveredCard(property.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <article className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                    {/* Image */}
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={property.images[0] || '/placeholder.jpg'}
                        alt={property.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        unoptimized
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      
                      {/* Featured Badge */}
                      {property.featured && (
                        <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg">
                          ⭐ מומלץ
                        </div>
                      )}

                      {/* Rating */}
                      {property.rating > 0 && (
                        <div className="absolute top-4 left-4 px-4 py-2 bg-white/10 backdrop-blur-md text-white text-sm font-bold rounded-full border border-white/20 flex items-center gap-2">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {property.rating}
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-cyan-500/40 to-transparent transition-opacity duration-300 ${
                        hoveredCard === property.id ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold shadow-2xl transform transition-all duration-300 group-hover:scale-110">
                            צפה בנכס →
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                        {property.name}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-white/60 mb-4">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{property.location}</span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2 text-white/60">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span className="text-sm">עד {property.capacity} אורחים</span>
                        </div>
                        
                        <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                          {property.price}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMTJjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAtMjRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              מוכנים לחוויה בלתי נשכחת?
            </h2>
            <p className="text-2xl text-white/90 mb-12 font-light">
              צוות המומחים שלנו כאן כדי לעזור לכם למצוא את הנכס המושלם
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/972523983394"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>דברו איתנו ב-WhatsApp</span>
              </a>
              <a
                href="/contact"
                className="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-full font-bold text-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300"
              >
                טופס יצירת קשר
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
