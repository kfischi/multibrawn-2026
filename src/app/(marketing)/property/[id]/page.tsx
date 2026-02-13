// src/app/(marketing)/property/[id]/page.tsx
import { createServerClient } from '@/lib/supabase/server-build'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

// ✅ ייצוא דינמי של כל הדפים בזמן Build
export async function generateStaticParams() {
  const supabase = createServerClient()
  
  try {
    const { data: properties } = await supabase
      .from('affiliate_properties')
      .select('id')
      .eq('status', 'active')
    
    if (!properties || properties.length === 0) {
      // אם אין נכסים, תחזיר רשימה ידנית
      return [
        { id: 'tzimer-001' },
        { id: 'tzimer-002' },
        { id: 'tzimer-003' },
        { id: 'tzimer-004' },
        { id: 'tzimer-005' },
        { id: 'tzimer-006' },
        { id: 'tzimer-007' },
        { id: 'tzimer-008' },
        { id: 'tzimer-009' },
        { id: 'tzimer-010' },
      ]
    }
    
    return properties.map((property) => ({
      id: property.id,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    // Fallback לרשימה ידנית
    return [
      { id: 'tzimer-001' },
      { id: 'tzimer-002' },
      { id: 'tzimer-003' },
      { id: 'tzimer-004' },
      { id: 'tzimer-005' },
      { id: 'tzimer-006' },
      { id: 'tzimer-007' },
      { id: 'tzimer-008' },
      { id: 'tzimer-009' },
      { id: 'tzimer-010' },
    ]
  }
}

// ✅ הפוך את הדף לדינמי אם הנכס לא נמצא ב-build time
export const dynamicParams = true

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = createServerClient()

  const { data: property, error } = await supabase
    .from('affiliate_properties')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !property) {
    notFound()
  }

  const mainImage = property.images?.main || 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1/samples/landscapes/architecture-signs.jpg'
  const gallery = property.images?.gallery || []
  const affiliateUrl = property.affiliate?.affiliateUrl || '#'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/gallery" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            ← חזרה לגלריה
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-800">
              <Image
                src={mainImage}
                alt={property.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            
            {gallery.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {gallery.slice(0, 3).map((img: string, idx: number) => (
                  <div key={idx} className="relative aspect-video rounded-lg overflow-hidden bg-slate-800">
                    <Image
                      src={img}
                      alt={`${property.name} - תמונה ${idx + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Property Info */}
          <div className="space-y-6 text-white">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {property.name}
              </h1>
              <p className="text-xl text-gray-300">
                {property.location?.city}, {property.location?.area}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">{property.capacity}</div>
                <div className="text-sm text-gray-300">אורחים</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{property.rating || '5.0'}</div>
                <div className="text-sm text-gray-300">דירוג</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-xl font-bold text-pink-400">{property.property_type}</div>
                <div className="text-sm text-gray-300">סוג</div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-sm text-gray-300 mb-2">מחיר ללילה</div>
              <div className="text-3xl font-bold text-white">{property.price_range}</div>
            </div>

            {/* CTA Button */}
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white text-center py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              הזמן עכשיו ב-Tzimer360 →
            </a>
          </div>
        </div>

        {/* Description */}
        {property.description && (
          <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">אודות הנכס</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {property.description}
            </p>
          </div>
        )}

        {/* Features */}
        {property.features && property.features.length > 0 && (
          <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">מה כלול?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2 text-gray-300">
                  <span className="text-cyan-400">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
