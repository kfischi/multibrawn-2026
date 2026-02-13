import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ulfwxmjerugxayuyliug.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZnd4bWplcnVneGF5dXlsaXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5MTIyODAsImV4cCI6MjA1MTQ4ODI4MH0.ZjWpPuONqc1o7LXYnXvGI8hWUm2wvgvh-5tDkf6aGMQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
