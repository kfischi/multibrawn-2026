// lib/supabase/client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';

// Client-side Supabase client
export const supabase = createClientComponentClient();

// Server-side Supabase client (with service role)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Types
export type Property = {
  id: string;
  name: string;
  type: string;
  location: string;
  area: string;
  capacity: number;
  image: string;
  amenities: string[];
  description: string;
  price_range: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type ActivityLog = {
  id: string;
  user_id: string;
  action: string;
  details: Record<string, any>;
  created_at: string;
};

export type ChatBotLead = {
  id: string;
  name: string;
  phone: string;
  property_type: string;
  location: string;
  guest_count: string;
  dates: string;
  budget: string;
  additional_info: Record<string, any>;
  created_at: string;
};
