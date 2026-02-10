import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// --- המלכודת: הדפסה לקונסול ---
// זה יגיד לנו איזה כתובת המערכת *באמת* רואה ברגע זה
if (typeof window !== 'undefined') {
  console.log('🔍 DEBUG SUPABASE URL:', supabaseUrl); 
}
// ------------------------------

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
