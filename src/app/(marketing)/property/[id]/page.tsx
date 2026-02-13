// src/app/(marketing)/property/[id]/page.tsx
import { createServerClient } from '@/lib/supabase/server-build'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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

  const mainImage = property.images?.main || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200'
  const gallery = property.images?.gallery || []
  const affiliateUrl = `https://www.tzimer360.co.il/Location/${property.affiliate?.code || ''}?t=affiliate26`

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/gallery" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            ← חזרה לגלריה
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-800">
              <Image
                src={mainImage}
                alt={property.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            
            {gallery.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {gallery.slice(0, 3).map((img: string, idx: number) => (
                  <div key={idx} className="relative aspect-video rounded-lg overflow-hidden bg-slate-800">
                    <Image
                      src={img}
                      alt={`תמונה ${idx + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6 text-white">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {property.name}
              </h1>
              <p className="text-xl text-gray-300">
                {property.location?.city}, {property.location?.area}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">{property.capacity || 4}</div>
                <div className="text-sm text-gray-300">אורחים</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{property.rating || '5.0'}</div>
                <div className="text-sm text-gray-300">דירוג</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-lg font-bold text-pink-400">{property.property_type || 'צימר'}</div>
                <div className="text-sm text-gray-300">סוג</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-sm text-gray-300 mb-2">מחיר ללילה</div>
              <div className="text-3xl font-bold text-white">{property.price_range || '₪800-1,500'}</div>
            </div>

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

        {property.description && (
          <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">אודות הנכס</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {property.description}
            </p>
          </div>
        )}

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
