import { createServerClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Property {
  id: string
  name: string
  description: string
  property_type: string
  capacity: number
  price_range: string
  rating: number
  location: {
    city: string
    area: string
  }
  images: {
    main: string
    gallery: string[]
  }
  affiliate: {
    affiliateUrl: string
  }
  features: string[]
  amenities: {
    featured: string[]
  }
}

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

  const typedProperty = property as unknown as Property

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #00D4FF 0%, #5E63D8 50%, #FF4B8C 100%)' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '60vh', overflow: 'hidden' }}>
        <Image
          src={typedProperty.images?.main || '/placeholder.jpg'}
          alt={typedProperty.name}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', background: 'rgba(0,0,0,0.7)', padding: '20px', borderRadius: '10px', color: 'white' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>{typedProperty.name}</h1>
          <p style={{ fontSize: '18px' }}>📍 {typedProperty.location?.city} • {typedProperty.location?.area}</p>
        </div>
      </div>

      {/* Gallery */}
      <div style={{ display: 'flex', gap: '10px', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {typedProperty.images?.gallery?.slice(0, 3).map((img: string, i: number) => (
          <div key={i} style={{ flex: 1, height: '200px', position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
            <Image src={img} alt={`Gallery ${i + 1}`} fill style={{ objectFit: 'cover' }} />
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#5E63D8' }}>👥 {typedProperty.capacity}</div>
            <div style={{ color: '#666', marginTop: '5px' }}>אורחים</div>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#5E63D8' }}>⭐ {typedProperty.rating || 4.5}</div>
            <div style={{ color: '#666', marginTop: '5px' }}>דירוג</div>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#5E63D8' }}>🏠</div>
            <div style={{ color: '#666', marginTop: '5px' }}>{typedProperty.property_type}</div>
          </div>
        </div>

        {/* Price & CTA */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '10px', marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>💰 {typedProperty.price_range}</div>
          <a 
            href={typedProperty.affiliate?.affiliateUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-block',
              background: 'linear-gradient(135deg, #00D4FF, #5E63D8)', 
              color: 'white', 
              padding: '15px 40px', 
              borderRadius: '50px', 
              fontSize: '18px', 
              fontWeight: 'bold',
              textDecoration: 'none',
              marginTop: '10px'
            }}
          >
            🔗 הזמן עכשיו ב-Tzimer360
          </a>
        </div>

        {/* Description */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '10px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>📝 תיאור</h2>
          <p style={{ lineHeight: '1.8', color: '#333' }}>{typedProperty.description || 'אין תיאור זמין'}</p>
        </div>

        {/* Features */}
        {typedProperty.features && typedProperty.features.length > 0 && (
          <div style={{ background: 'white', padding: '30px', borderRadius: '10px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>✨ מה כלול</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {typedProperty.features.map((feature: string, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#00D4FF', fontSize: '20px' }}>✓</span>
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
