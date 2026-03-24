import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cfulruffxneijmcvpclz.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmdWxydWZmeG5laWptY3ZwY2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMTE4MDAsImV4cCI6MjA0OTU4NzgwMH0.NeyDg6C8yeFfdHMFXrVVdkurO-9K-hon0E98yAWG-V0';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Client for public operations (INSERT from website)
export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey);

// Client for admin operations (full access) - falls back to anon key if service key not set
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey);
