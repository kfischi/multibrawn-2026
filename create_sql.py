import json
import re

# קרא את ה-JSON
with open('properties.json', 'r', encoding='utf-8') as f:
    properties = json.load(f)

# סנן רק נכסים עם תמונות
valid_properties = [p for p in properties if p.get('images') and len(p['images']) > 0]

print(f"Found {len(valid_properties)} properties with images")

# יצירת SQL
sql_lines = []
sql_lines.append("-- MULTIBRAWN Properties from Tzimer360")
sql_lines.append("-- Generated automatically\n")

for i, prop in enumerate(valid_properties, 1):
    prop_id = prop.get('id', f'tzimer-{str(i).zfill(3)}')
    title = prop.get('title', 'נכס יוקרתי').replace("'", "''")
    url = prop.get('url', '')
    images = prop.get('images', [])[:4]
    price = prop.get('price', 'לפי פנייה').replace("'", "''")
    
    # חלק שם ייחודי
    unique_name = f"נכס יוקרתי במיקום מעולה #{i}"
    if 'ים המלח' in title or 'נווה זוהר' in title:
        unique_name = f"מתחם אירוח יוקרתי על ים המלח"
        property_type = 'מתחם אירועים'
        location_city = 'נווה זוהר'
        location_area = 'ים המלח'
        capacity = 30
    elif 'טבריה' in title or 'כנרת' in title:
        unique_name = f"סוויטות יוקרה בטבריה"
        property_type = 'מלון בוטיק'
        location_city = 'טבריה'
        location_area = 'כנרת'
        capacity = 20
    elif 'ירושלים' in title:
        unique_name = f"צימר יוקרתי בירושלים"
        property_type = 'צימר'
        location_city = 'ירושלים'
        location_area = 'מרכז'
        capacity = 4
    elif 'גליל' in title or 'אליפלט' in title:
        unique_name = f"בקתות מפוארות בגליל העליון"
        property_type = 'צימר'
        location_city = 'גליל עליון'
        location_area = 'צפון'
        capacity = 8
    elif 'תל אביב' in title or 'יפו' in title:
        unique_name = f"דירת נופש יוקרתית בתל אביב"
        property_type = 'דירת נופש'
        location_city = 'תל אביב'
        location_area = 'מרכז'
        capacity = 6
    elif 'בית ג' in title or "ג'ן" in title:
        unique_name = f"וילת אבן מפוארת בגליל"
        property_type = 'וילה'
        location_city = "בית ג'אן"
        location_area = 'גליל'
        capacity = 12
    elif 'מעלה עמוס' in title or 'שומרון' in title:
        unique_name = f"צימר רומנטי בשומרון"
        property_type = 'צימר'
        location_city = 'מעלה עמוס'
        location_area = 'שומרון'
        capacity = 4
    else:
        unique_name = f"נכס יוקרתי בישראל #{i}"
        property_type = 'צימר'
        location_city = 'ישראל'
        location_area = 'צפון'
        capacity = 6
    
    # תיאור עשיר
    description = f"נכס אירוח יוקרתי עם אווירה מפנקת ומתקנים ברמה גבוהה. מתאים במיוחד למשפחות וזוגות המחפשים חופשה איכותית ונופש בלתי נשכח."
    
    # בנה JSON לתמונות
    images_json = {
        "main": images[0] if images else "",
        "gallery": images[1:] if len(images) > 1 else []
    }
    
    sql = f"""
INSERT INTO affiliate_properties (
  id, name, property_type, location, images, affiliate,
  status, featured, rating, capacity, price_range, description, features
) VALUES (
  '{prop_id}',
  '{unique_name}',
  '{property_type}',
  '{{"city": "{location_city}", "area": "{location_area}"}}',
  '{json.dumps(images_json, ensure_ascii=False)}',
  '{{"affiliateUrl": "{url}"}}',
  'active',
  {str(i <= 5).lower()},
  {4.5 + (i % 5) * 0.1:.1f},
  {capacity},
  '{price}',
  '{description}',
  ARRAY['נוף מרהיב', 'מיקום מעולה', 'מתקנים מודרניים', 'פרטיות מלאה']
);"""
    
    sql_lines.append(sql)

# שמור SQL
with open('insert_properties.sql', 'w', encoding='utf-8') as f:
    f.write('\n'.join(sql_lines))

print(f"\n✅ Created SQL with {len(valid_properties)} properties")
print(f"📁 Saved to: insert_properties.sql")
