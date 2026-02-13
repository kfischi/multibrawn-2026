// src/lib/supabase/server-build.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ulfwxmjerugxayuyliug.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZnd4bWplcnVneGF5dXlsaXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyNTk2NjgsImV4cCI6MjA1MTgzNTY2OH0.VEWdOUor4X1OXU3VfT19WO0E6eSj6xhUX2IqqSn8J9I'

export function createServerClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

// Default export for compatibility
export default createServerClient
