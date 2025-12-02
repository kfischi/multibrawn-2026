# 🌟 MULTIBRAWN - אתר חיפוש מקומות נופש

אתר Next.js מתקדם למציאת צימרים, וילות, מלונות בוטיק ומתחמי אירועים בישראל.

---

## 🚀 **תכונות עיקריות**

- ✅ **Homepage** - דף בית עם Hero, Stats, Features
- ✅ **Gallery** - גלריית נכסים עם פילטרים וחיפוש
- ✅ **Tips** - סרטוני טיפים בסגנון Netflix
- ✅ **About** - סיפור ערדית + וידאו
- ✅ **Contact** - טופס יצירת קשר + פרטים
- ✅ **ChatBot AI** - צ'אטבוט חכם עם Gemini AI (11 שלבים)
- ✅ **WhatsApp Button** - כפתור צף עם הודעה מוכנה
- ✅ **Accessibility Menu** - תפריט נגישות מלא
- ✅ **Privacy Policy** - מדיניות פרטיות
- ✅ **Accessibility Statement** - הצהרת נגישות

---

## 🛠️ **טכנולוגיות**

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules
- **AI:** Google Gemini API
- **Images:** Cloudinary
- **Fonts:** Heebo, Assistant (Google Fonts)

---

## 📦 **התקנה**

### 1. Clone הפרויקט
```bash
git clone <repository-url>
cd multibrawn-next
```

### 2. התקן תלויות
```bash
npm install
```

### 3. הגדר Environment Variables
```bash
cp .env.example .env.local
```

ערוך את `.env.local` והוסף:
```bash
GEMINI_API_KEY=your_actual_key_here
NEXT_PUBLIC_WHATSAPP_NUMBER=972523983394
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dptyfvwyo
```

### 4. הרץ בDev Mode
```bash
npm run dev
```

פתח [http://localhost:3000](http://localhost:3000)

---

## 🔑 **API Keys**

### Gemini API Key (חובה לChatBot)
1. לך ל: https://makersuite.google.com/app/apikey
2. התחבר עם חשבון Google
3. לחץ "Create API Key"
4. העתק והדבק ב-`.env.local`

**חינמי!** 15 requests/minute, 1500 requests/day

---

## 🌐 **פריסה (Deployment)**

### Vercel (מומלץ - חינמי)

1. **צור חשבון ב-Vercel:**
   - https://vercel.com
   - Sign up with GitHub

2. **Import Project:**
   - New Project → Import Git Repository
   - בחר את הrepo
   - Framework Preset: Next.js

3. **הוסף Environment Variables:**
   ```
   GEMINI_API_KEY=your_key
   NEXT_PUBLIC_WHATSAPP_NUMBER=972523983394
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dptyfvwyo
   ```

4. **Deploy!**
   - לחץ Deploy
   - חכה 2-3 דקות
   - האתר באוויר!

### חיבור דומיין (multibrawn.co.il)

1. **ב-Vercel:**
   - Settings → Domains
   - Add: multibrawn.co.il

2. **ב-DNS Provider שלך:**
   - הוסף CNAME record:
     ```
     Type: CNAME
     Name: @
     Value: cname.vercel-dns.com
     ```
   - או A record (ל-Vercel IP)

3. **חכה 24-48 שעות** לעדכון DNS

---

## 📁 **מבנה הפרויקט**

```
multibrawn-next/
├── src/
│   ├── app/                    # Pages (App Router)
│   │   ├── (marketing)/        # Marketing pages
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── gallery/        # Gallery page
│   │   │   ├── tips/           # Tips page
│   │   │   ├── about/          # About page
│   │   │   ├── contact/        # Contact page
│   │   │   ├── privacy/        # Privacy policy
│   │   │   └── accessibility-statement/
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   │   ├── layout/             # Layout components
│   │   │   ├── Header/         # Header + Navigation
│   │   │   ├── Footer/         # Footer
│   │   │   └── ChatBot/        # AI ChatBot
│   │   ├── ui/                 # UI components
│   │   │   ├── WhatsAppButton/ # WhatsApp floating button
│   │   │   ├── AccessibilityMenu/
│   │   │   └── SocialLinks/    # Social media links
│   │   ├── gallery/            # Gallery components
│   │   └── home/               # Homepage components
│   ├── lib/                    # Libraries & utilities
│   │   ├── chatbot/            # ChatBot logic
│   │   ├── data.ts             # Data fetchers
│   │   └── gemini.ts           # Gemini AI integration
│   ├── data/                   # JSON data
│   │   ├── properties.json     # 29 properties
│   │   ├── tips.json           # 4 video tips
│   │   └── about.json          # About content
│   └── types/                  # TypeScript types
├── public/                     # Static files
├── .env.local                  # Environment variables (local)
├── .env.example               # Environment variables (template)
└── package.json               # Dependencies

📊 Total: 48 files, 9,089+ lines of code
```

---

## 🎨 **Brand Colors**

```css
--color-cyan: #00D4FF;
--color-purple: #5E63D8;
--color-pink: #FF4B8C;
--gradient-primary: linear-gradient(135deg, #00D4FF 0%, #5E63D8 50%, #FF4B8C 100%);
```

---

## 📱 **Responsive Breakpoints**

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## ♿ **נגישות**

האתר תומך ב:
- ✅ WCAG 2.1 AA
- ✅ תקן ישראלי 5568
- ✅ ניווט מקלדת מלא
- ✅ תמיכה ב-Screen Readers
- ✅ תפריט נגישות (גופן, ניגודיות, מרווחים)
- ✅ RTL Hebrew support

---

## 📞 **יצירת קשר**

- **WhatsApp:** 052-398-3394
- **Phone:** 052-398-3394
- **Email:** info@multibrawn.co.il
- **Website:** multibrawn.co.il

---

## 📝 **Scripts**

```bash
npm run dev          # Run development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

---

## 🔒 **Security**

- ✅ Environment variables מוגנים
- ✅ API Keys לא נחשפים ל-client
- ✅ HTTPS בפריסה
- ✅ `.env.local` ב-.gitignore

---

## 📈 **Performance**

- ✅ Next.js Image optimization
- ✅ Code splitting
- ✅ CSS Modules (scoped styles)
- ✅ Lazy loading
- ✅ ISR (Incremental Static Regeneration)

---

## 🐛 **Troubleshooting**

### ChatBot לא עובד
- בדוק ש-`GEMINI_API_KEY` קיים ב-`.env.local`
- בדוק שה-API Key תקין
- בדוק Console לשגיאות

### תמונות לא נטענות
- בדוק ש-Cloudinary URL תקין
- בדוק שהתמונות קיימות ב-Cloudinary
- בדוק Network tab

### Build נכשל
```bash
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

---

## 📄 **License**

© 2024 MULTIBRAWN. All rights reserved.

---

## 👨‍💻 **Developer**

Built with ❤️ by Claude + Ererit

**Version:** 1.0.0  
**Last Updated:** December 2024
