import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export function createClient() {
  return createSupabaseClient(
    'https://ulfwxmjerugxayuyliug.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZnd4bWplcnVneGF5dXlsaXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5MTIyODAsImV4cCI6MjA1MTQ4ODI4MH0.ZjWpPuONqc1o7LXYnXvGI8hWUm2wvgvh-5tDkf6aGMQ'
  );
}
