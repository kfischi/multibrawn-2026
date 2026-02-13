import json

with open('properties_clean.json', 'r', encoding='utf-8') as f:
    props = json.load(f)

names = [
    "מתחם אירוח יוקרתי על ים המלח",
    "בקתות מפוארות בגליל העליון", 
    "וילת אבן מרהיבה בגליל",
    "וילה יוקרתית בנווה זוהר",
    "סוויטות בוטיק בטבריה",
    "סוויטה רומנטית בשומרון",
    "צימר יוקרתי במעלה עמוס",
    "דירת נופש יוקרתית בתל אביב"
]

for i, p in enumerate(props):
    imgs = p['images'][:4]
    main = imgs[0] if imgs else ""
    gallery = imgs[1:] if len(imgs) > 1 else []
    
    print(f"""
INSERT INTO affiliate_properties (id, name, property_type, location, images, affiliate, status, featured, rating)
VALUES (
  '{p['id']}',
  '{names[i]}',
  'צימר',
  '{{"city": "ישראל", "area": "צפון"}}',
  '{{"main": "{main}", "gallery": {json.dumps(gallery)}}}',
  '{{"affiliateUrl": "{p['url']}"}}',
  'active',
  true,
  4.{i+5}
);""")
