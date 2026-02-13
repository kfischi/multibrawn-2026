import { createClient as createBuildClient } from '@/lib/supabase/server-build';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;
  const supabase = createBuildClient();
  
  const { data: property } = await supabase
    .from('affiliate_properties')
    .select('*')
    .eq('id', id)
    .single();
  
  if (!property) notFound();
  
  const affiliateUrl = property.affiliate?.affiliateUrl || '#';
  
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">{property.name}</h1>
        <p className="text-xl text-gray-300 mb-8">{property.description}</p>
        <a 
          href={affiliateUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl text-lg hover:shadow-lg transition-all"
        >
          הזמן עכשיו בצימר360
        </a>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const supabase = createBuildClient();
  const { data } = await supabase.from('affiliate_properties').select('id');
  return data?.map(p => ({ id: p.id })) || [];
}
