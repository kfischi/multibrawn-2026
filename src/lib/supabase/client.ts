// src/lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

// Hardcoded credentials for production
const supabaseUrl = 'https://cfulruffxneijmcvpclz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmdWxydWZmeG5laWptY3ZwY2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMTE4MDAsImV4cCI6MjA0OTU4NzgwMH0.NeyDg6C8yeFfdHMFXrVVdkurO-9K-hon0E98yAWG-V0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
