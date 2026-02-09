import { createClient } from '@supabase/supabase-js';

// שימוש במשתני סביבה (Environment Variables) במקום כתיבה קשיחה
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
