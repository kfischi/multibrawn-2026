import { createClient } from '@supabase/supabase-js';
import PropertyCard from '@/components/gallery/PropertyCard';
import properties from '@/data/properties.json';
import styles from './Gallery.module.css';

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getAffiliateProperties() {
  try {
    const { data, error } = await supabase
      .from('affiliate_properties')
      .select('*')
      .eq('status', 'active')
      .order('rating', { ascending: false });

    if (error) {
      console.error('Error fetching affiliate properties:', error);
      return [];
    }

    // Transform affiliate properties to match PropertyCard format
    return (data || []).map((prop: any) => ({
      id: prop.id,
      name: prop.name,
      type: prop.property_type || 'צימר',
      location: prop.location?.city || 'צפון',
      guests: `עד ${prop.capacity || 4} אורחים`,
      features: prop.features || [],
      images: [
        prop.images?.main || 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1/placeholder.jpg',
        ...(prop.images?.gallery || [])
      ],
      videos: [],
      description: prop.description || '',
      // Add affiliate marker (will be used later for external link)
      isAffiliate: true,
      affiliateUrl: prop.affiliate?.affiliateUrl || '',
    }));
  } catch (error) {
    console.error('Failed to fetch affiliate properties:', error);
    return [];
  }
}

export default async function GalleryPage() {
  // Fetch affiliate properties
  const affiliateProps = await getAffiliateProperties();

  // Regular properties already in correct format
  const regularProps = properties.properties;

  // Combine all properties
  const allProperties = [...regularProps, ...affiliateProps];

  return (
    <div className={styles.galleryPage}>
      {/* Hero Section */}
      <section className={styles.galleryHero}>
        <div className={styles.heroContentInner}>
          <h1 className={styles.heroTitle}>הגלריה שלנו</h1>
          <p className={styles.heroSubtitle}>
            {allProperties.length} נכסים מדהימים מחכים לכם
          </p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.9 }}>
            {regularProps.length} נכסים שלנו + {affiliateProps.length} נכסים משותפים
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className={styles.gallerySection}>
        <div className={styles.propertiesGrid}>
          {allProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </div>
  );
}
