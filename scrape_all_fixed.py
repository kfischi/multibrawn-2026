import requests
from bs4 import BeautifulSoup
import json
import time
import re

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
        print(f"[{i}/{len(urls)}] Scraping {url}")
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        r = requests.get(url, timeout=15, headers=headers)
        r.encoding = 'utf-8'
        soup = BeautifulSoup(r.content, 'html.parser')
        
        # חלץ כותרת
        title_tag = soup.find('h1')
        title = title_tag.text.strip() if title_tag else f"נכס {i}"
        
        # חלץ תמונות - שיטה משופרת
        images = []
        seen = set()
        
        for img in soup.find_all('img'):
            try:
                src = img.get('src', '')
                # נקה את ה-URL
                if src and 'tours.tzimer360.co.il' in src:
                    # תקן backslashes
                    src = src.replace('\\', '/')
                    # הוסף https אם חסר
                    if not src.startswith('http'):
                        src = 'https://' + src.lstrip('/')
                    
                    if src not in seen:
                        images.append(src)
                        seen.add(src)
                        
                    if len(images) >= 4:
                        break
            except Exception as e:
                continue
        
        # חלץ מחיר
        price = "לפי פנייה"
        try:
            price_text = soup.find(text=re.compile(r'החל מ.*₪'))
            if price_text:
                price = price_text.strip()
        except:
            pass
        
        result = {
            'id': f"tzimer-{str(i).zfill(3)}",
            'url': url,
            'title': title,
            'images': images,
            'price': price
        }
        
        results.append(result)
        print(f"  ✓ {title[:40]}... ({len(images)} images)")
        
        time.sleep(1.5)
        
    except Exception as e:
        print(f"  ✗ Error: {str(e)}")
        results.append({
            'id': f"tzimer-{str(i).zfill(3)}",
            'url': url,
            'title': f"נכס {i}",
            'images': [],
            'price': 'לפי פנייה'
        })

# שמור JSON
with open('properties.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"\n{'='*60}")
print(f"✅ DONE! Scraped {len(results)} properties")
print(f"📁 Saved to: properties.json")
print(f"\n📊 Summary:")
successful = len([r for r in results if r['images']])
print(f"  Total: {len(results)}")
print(f"  With images: {successful}")
print(f"  Without images: {len(results) - successful}")
print(f"{'='*60}")
