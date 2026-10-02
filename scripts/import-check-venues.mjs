#!/usr/bin/env node
// MULTIBRAWN CHECK — ייבוא רשימת המקומות לטבלת check_venues.
//
// שימוש:
//   NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... \
//     node scripts/import-check-venues.mjs [path/to/file.csv] [--dry-run]
//
// ברירת המחדל: scripts/data/mekomot-eruim-venues.csv (773 מקומות מהאתר "מקומות לאירועים").
// הייבוא בטוח להרצה חוזרת: מקום מזוהה לפי הקישור שלו (source_url).
// בהרצה חוזרת מתעדכנים רק שדות הקטלוג (שם, סוג, יישוב, אזור, קיבולת, קטגוריות).
// השדות שערדית מנהלת בפאנל (פעיל, הכשר, אימות, איש קשר, הסכם, הערות) לא נדרסים.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createClient } from '@supabase/supabase-js';

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const csvPath = args.find(a => !a.startsWith('--')) || join(here, 'data', 'mekomot-eruim-venues.csv');

const REGION_CODES = {
  'צפון': 'north',
  'שרון': 'sharon',
  'מרכז': 'center',
  'ירושלים והסביבה': 'jerusalem',
  'דרום': 'south',
};

/** מפענח CSV לפי RFC 4180 (שדות במירכאות, מירכאות כפולות, שורות חדשות בתוך שדה). */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  const src = text.replace(/^﻿/, '');
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ',') { row.push(field); field = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && src[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.some(c => c !== '')) rows.push(row);
      row = [];
    } else field += ch;
  }
  if (field !== '' || row.length) { row.push(field); if (row.some(c => c !== '')) rows.push(row); }
  const [header, ...body] = rows;
  return body.map(r => Object.fromEntries(header.map((h, i) => [h.trim(), (r[i] ?? '').trim()])));
}

/** "עד 300" -> {max:300} · "30-120" -> {min:30,max:120} · "100+" -> {min:100} */
export function parseCapacity(text) {
  const t = (text || '').trim();
  if (!t) return { min: null, max: null };
  const range = /^(\d+)\s*-\s*(\d+)$/.exec(t);
  if (range) return { min: Number(range[1]), max: Number(range[2]) };
  const upTo = /^עד\s*(\d+)$/.exec(t);
  if (upTo) return { min: null, max: Number(upTo[1]) };
  const plus = /^(\d+)\+$/.exec(t);
  if (plus) return { min: Number(plus[1]), max: null };
  return { min: null, max: null };
}

export function toVenueRow(r) {
  const cap = parseCapacity(r['קיבולת']);
  return {
    name: r['שם המקום'],
    venue_type: r['סוג'] || null,
    city: r['יישוב'] || null,
    region: REGION_CODES[r['אזור']] || null,
    capacity_min: cap.min,
    capacity_max: cap.max,
    capacity_text: r['קיבולת'] || null,
    categories: r['קטגוריות באתר'] || null,
    source_url: r['קישור'] || null,
    // ההכשר נשמר כטקסט גולמי בלבד. הקוד המדויק (kashrut) נקבע רק אחרי אימות מול המקום.
    kashrut_raw: r['כשרות'] || null,
  };
}

async function main() {
  const records = parseCsv(readFileSync(csvPath, 'utf8'));
  const venues = records.map(toVenueRow).filter(v => v.name && v.source_url);
  console.log(`נקראו ${records.length} שורות, ${venues.length} מקומות תקינים לייבוא.`);

  if (dryRun) {
    const byRegion = {};
    for (const v of venues) byRegion[v.region || 'ללא אזור'] = (byRegion[v.region || 'ללא אזור'] || 0) + 1;
    console.log('הרצת בדיקה בלבד, לא נכתב כלום. לפי אזור:', byRegion);
    console.log('דוגמה:', venues[0]);
    return;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('חסר NEXT_PUBLIC_SUPABASE_URL או SUPABASE_SERVICE_ROLE_KEY.');
    process.exit(1);
  }
  const db = createClient(url, key, { auth: { persistSession: false } });

  let done = 0;
  for (let i = 0; i < venues.length; i += 200) {
    const batch = venues.slice(i, i + 200);
    // upsert שולח רק את שדות הקטלוג, ולכן active / kashrut / contact_* של שורות קיימות נשארים כמו שהם.
    const { error } = await db.from('check_venues').upsert(batch, { onConflict: 'source_url' });
    if (error) {
      console.error(`הייבוא נכשל בשורות ${i + 1}-${i + batch.length}:`, error.message);
      process.exit(1);
    }
    done += batch.length;
    console.log(`יובאו ${done}/${venues.length}`);
  }
  console.log('הייבוא הסתיים. כל מקום חדש נכנס כלא פעיל; מפעילים עד 10 בכל אזור מתוך הפאנל.');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch(e => { console.error(e); process.exit(1); });
}
