import requests
from bs4 import BeautifulSoup
import json
import time
import re

# רק הנכסים שעבדו
urls = [
    "https://www.tzimer360.co.il/Location/C4642?t=affiliate26",  # ביאנכיני
    "https://www.tzimer360.co.il/Location/C4655?t=affiliate26",  # אליפלט
    "https://www.tzimer360.co.il/Location/C4658?t=affiliate26",  # בית ג'ן
    "https://www.tzimer360.co.il/Location/C4671?t=affiliate26",  # נווה זוהר 2
    "https://www.tzimer360.co.il/Location/C4675?t=affiliate26",  # טבריה
    "https://www.tzimer360.co.il/Location/C4676?t=affiliate26",  # מעלה עמוס 1
    "https://www.tzimer360.co.il/Location/C4677?t=affiliate26",  # מעלה עמוס 2
    "https://www.tzimer360.co.il/Location/C4678?t=affiliate26",  # תל אביב
]

results = []
for i, url in enumerate(urls, 1):
    try:
        print(f"[{i}/8] {url}")
        headers = {'User-Agent': 'Mozilla/5.0'}
        r = requests.get(url, timeout=15, headers=headers)
        soup = BeautifulSoup(r.content, 'html.parser')
        
        title = soup.find('h1').text.strip() if soup.find('h1') else f"נכס {i}"
        
        images = []
        for img in soup.find_all('img'):
            src = img.get('src', '')
            if 'tours.tzimer360.co.il' in src:
                src = src.replace('\\', '/')
                if not src.startswith('http'):
                    src = 'https://' + src.lstrip('/')
                images.append(src)
                if len(images) >= 4:
                    break
        
        results.append({
            'id': f'tzimer-{str(i).zfill(3)}',
            'url': url,
            'title': title,
            'images': images
        })
        
        print(f"  ✓ {title[:50]} ({len(images)} images)")
        time.sleep(1)
        
    except Exception as e:
        print(f"  ✗ {e}")

with open('properties_clean.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"\n✅ {len(results)} properties saved")
