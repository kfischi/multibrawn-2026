import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
<<<<<<< HEAD
import PropertyHero from './PropertyHero';
import PropertyDetails from './PropertyDetails';
import PropertyMap from './PropertyMap';
import PropertyCTA from './PropertyCTA';
import NearbyAttractions from './NearbyAttractions';
=======
>>>>>>> 5aa991e (Add basic property landing page)

interface PropertyPageProps {
  params: {
    id: string;
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const supabase = createClient();
  
  const { data: property, error } = await supabase
    .from('affiliate_properties')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !property) {
    notFound();
  }

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a]">
      {/* Hero Section with Gallery */}
      <PropertyHero property={property} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            <PropertyDetails property={property} />
            <NearbyAttractions location={property.location} />
          </div>

          {/* Right Column - Sticky CTA + Map */}
          <div className="space-y-6">
            <PropertyCTA property={property} />
            <PropertyMap location={property.location} propertyName={property.name} />
          </div>
=======
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">{property.name}</h1>
        <p className="text-gray-300 text-lg">{property.description}</p>
        
        <div className="mt-8">
          
            href={property.affiliate?.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#00D4FF] via-[#5E63D8] to-[#FF4B8C] text-white font-bold rounded-xl hover:shadow-lg transition-all"
          >
            הזמן עכשיו
          </a>
>>>>>>> 5aa991e (Add basic property landing page)
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
// Generate static params for all properties
=======
>>>>>>> 5aa991e (Add basic property landing page)
export async function generateStaticParams() {
  const supabase = createClient();
  
  const { data: properties } = await supabase
    .from('affiliate_properties')
    .select('id');

  return properties?.map((property) => ({
    id: property.id,
  })) || [];
}
