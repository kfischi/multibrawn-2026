import { createClient } from '@supabase/supabase-js';

// שים לב: אנחנו כותבים את הכתובת ישירות בתוך הגרשיים!
// אל תשנה את זה למשתנה process.env
const supabaseUrl = 'https://ulfwxmjerugxayuyliug.supabase.co';

// את המפתח תדביק כאן במקום הטקסט בעברית
const supabaseKey = 'הדבק_כאן_את_המפתח_הארוך_שלך_מסופבייס';

console.log('🔌 Forced Supabase URL:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseKey);
