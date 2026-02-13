import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import PropertyHero from './PropertyHero';
import PropertyDetails from './PropertyDetails';
import PropertyCTA from './PropertyCTA';
import PropertyMap from './PropertyMap';
import NearbyAttractions from './NearbyAttractions';

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
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a]">
      <PropertyHero property={property} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PropertyDetails property={property} />
            <NearbyAttractions location={property.location} />
          </div>

          <div className="space-y-6">
            <PropertyCTA property={property} />
            <PropertyMap location={property.location} propertyName={property.name} />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const supabase = createClient();
  
  const { data: properties } = await supabase
    .from('affiliate_properties')
    .select('id');

  return properties?.map((property) => ({
    id: property.id,
  })) || [];
}
