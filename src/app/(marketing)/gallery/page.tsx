import { createServerClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Gallery.module.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Property {
  id: string
  name: string
  description: string
  property_type: string
  location: {
    city: string
    area: string
    region: string
  }
  images: {
    main: string
    gallery: string[]
  }
  capacity: number
  price_range: string
  rating: number
  featured: boolean
  status: string
}

export default async function GalleryPage() {
  const supabase = createServerClient()
  
  const { data: properties, error } = await supabase
    .from('affiliate_properties')
    .select('*')
    .eq('status', 'active')
    .order('featured', { ascending: false })
    .order('rating', { ascending: false })

  if (error) {
    console.error('Gallery fetch error:', error)
  }

  const galleryProperties = (properties || []) as Property[]

  return (
    <div className={styles.galleryPage}>
      {/* Hero Section */}
      <div className={styles.galleryHero}>
        <div className={styles.heroContentInner}>
          <h1 className={styles.heroTitle}>גלריית הנכסים שלנו</h1>
          <p className={styles.heroSubtitle}>צימרים, וילות ומתחמי אירועים מובחרים בכל הארץ</p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className={styles.gallerySection}>
        <div className={styles.galleryGrid}>
          {galleryProperties.length === 0 ? (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '4rem 2rem',
              color: '#666'
            }}>
              <p style={{ fontSize: '1.2rem' }}>אין נכסים זמינים כרגע</p>
            </div>
          ) : (
            galleryProperties.map((property) => (
              <Link 
                key={property.id}
                href={`/property/${property.id}`}
                className={styles.galleryItem}
              >
                <div className={styles.imageWrapper}>
                  {property.images?.main ? (
                    <Image
                      src={property.images.main}
                      alt={property.name}
                      fill
                      className={styles.galleryImage}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, #00D4FF 0%, #5E63D8 50%, #FF4B8C 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '3rem'
                    }}>
                      🏠
                    </div>
                  )}
                </div>
                <div className={styles.itemContent}>
                  <h3 className={styles.itemTitle}>{property.name}</h3>
                  <p className={styles.itemDescription}>
                    📍 {property.location?.city || 'ישראל'} • {property.property_type || 'צימר'}
                  </p>
                  {property.rating && (
                    <p style={{ fontSize: '0.9rem', color: '#FFB800', marginTop: '0.5rem' }}>
                      ⭐ {property.rating.toFixed(1)}
                    </p>
                  )}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
