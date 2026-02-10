// src/lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

// Use environment variables for better security and flexibility
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ulfwxmjerugxayuyliug.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZnd4bWplcnVneGF5dXlsaXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyMDk5MjIsImV4cCI6MjA1Mzc4NTkyMn0.zApzkO9e_GGFj7qW_pn1N7H4xJrpPr3tyZDZdJsJ5no';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
