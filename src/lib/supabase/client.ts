import { createClient } from '@supabase/supabase-js';

// הכתובת החדשה
const supabaseUrl = 'https://ulfwxmjerugxayuyliug.supabase.co';

// המפתח ששלחת עכשיו (Anon Public Key)
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZnd4bWplcnVneGF5dXlsaXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3Njg3ODksImV4cCI6MjA4NDM0NDc4OX0._-zdlFQx5c0ToJNiH2HM3DygCn4dHvkCAoeVj0GV42g';

// יצירת החיבור
export const supabase = createClient(supabaseUrl, supabaseKey);
