/**
 * Cloudinary Setup — creates an unsigned upload preset for the admin panel.
 * Run once from your local machine:
 *   node scripts/setup-cloudinary.mjs
 */

const CLOUD_NAME   = 'dptyfvwyo';
const API_KEY      = '934877918715466';
const API_SECRET   = 'G696UefAbEc3JJ5qGql23quVaCg';
const PRESET_NAME  = 'multibrawn-uploads';

const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');

const res = await fetch(
  `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload_presets`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: PRESET_NAME,
      unsigned: true,
      folder: 'multibrawn',
      allowed_formats: 'jpg,jpeg,png,webp,gif,avif',
      max_file_size: 15728640,
    }),
  }
);

const data = await res.json();

if (res.ok) {
  console.log(`✅ Preset created: "${data.name}"`);
  console.log(`\nהוסף לסביבת Netlify:`);
  console.log(`  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET = ${PRESET_NAME}`);
} else if (data.message?.includes('already exists')) {
  console.log(`✅ Preset "${PRESET_NAME}" כבר קיים — הכל תקין.`);
} else {
  console.error('❌ שגיאה:', data.message || data.error?.message || JSON.stringify(data));
}
