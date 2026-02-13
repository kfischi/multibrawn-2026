import requests
from bs4 import BeautifulSoup
import json
import time

urls = [
    "https://www.tzimer360.co.il/Location/C4642?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4647?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4655?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4658?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4659?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4660?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4661?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4662?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4663?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4664?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4665?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4666?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4667?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4668?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4669?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4670?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4671?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4672?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4673?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4674?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4675?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4676?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4677?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4678?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4679?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4680?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4681?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4682?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4683?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4684?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4685?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4686?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4687?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4688?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4689?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4690?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4691?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4692?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4693?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4694?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4695?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4696?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4697?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4698?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4699?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4700?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4701?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4702?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4703?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4704?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4705?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4706?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4707?t=affiliate26",
    "https://www.tzimer360.co.il/Location/C4708?t=affiliate26",
]

results = []
for i, url in enumerate(urls, 1):
    try:
        print(f"Scraping {i}/{len(urls)}... {url}")
        r = requests.get(url, timeout=15)
        soup = BeautifulSoup(r.content, 'html.parser')
        
        # חלץ כותרת
        title_tag = soup.find('h1')
        title = title_tag.text.strip() if title_tag else f"נכס {i}"
        
        # חלץ תמונות
        images = []
        for img in soup.find_all('img'):
            src = img.get('src', '')
            if 'tours.tzimer360.co.il/Images' in src and src not in images:
                images.append(src)
                if len(images) >= 4:
                    break
        
        # חלץ מחיר
        price = "לפי פנייה"
        price_elements = soup.find_all(text=lambda t: t and '₪' in str(t))
        if price_elements:
            for p in price_elements:
                if 'החל מ' in str(p):
                    price = str(p).strip()
                    break
        
        results.append({
            'url': url,
            'title': title,
            'images': images,
            'price': price
        })
        
        print(f"  ✓ {title[:50]}... ({len(images)} images)")
        time.sleep(2)  # הפסקה בין בקשות
        
    except Exception as e:
        print(f"  ✗ Error: {e}")
        results.append({
            'url': url,
            'title': f"נכס {i}",
            'images': [],
            'price': 'לפי פנייה'
        })

# שמור JSON
with open('properties.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"\n✅ Done! Scraped {len(results)} properties")
print(f"📁 Saved to: properties.json")

# הדפס סיכום
successful = len([r for r in results if r['images']])
print(f"\n📊 Summary:")
print(f"  Total: {len(results)}")
print(f"  With images: {successful}")
print(f"  Without images: {len(results) - successful}")
