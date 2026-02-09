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

    // Transform affiliate properties to match regular property format
    return (data || []).map((prop: any) => ({
      id: prop.id,
      name: prop.name,
      description: prop.description,
      type: prop.property_type || 'צימר',
      location: prop.location?.city || 'צפון',
      region: prop.location?.region || 'ישראל',
      price: prop.price_range || 'לפי בקשה',
      capacity: prop.capacity || 4,
      rating: prop.rating || 4.5,
      images: [
        prop.images?.main || 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1/placeholder.jpg',
        ...(prop.images?.gallery || [])
      ],
      features: prop.features || [],
      // Mark as affiliate
      isAffiliate: true,
      affiliateUrl: prop.affiliate?.affiliateUrl || '',
      affiliateProvider: prop.affiliate?.provider || 'tzimer360',
      affiliateCtaText: prop.affiliate?.ctaText || 'צפה בנכס',
    }));
  } catch (error) {
    console.error('Failed to fetch affiliate properties:', error);
    return [];
  }
}

export default async function GalleryPage() {
  // Fetch affiliate properties
  const affiliateProps = await getAffiliateProperties();

  // Transform regular properties to include isAffiliate: false
  // FIX: Add .properties to access the array inside the JSON
  const regularProps = properties.properties.map(prop => ({
    ...prop,
    isAffiliate: false,
  }));

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
