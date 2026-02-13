// src/app/api/scraper/run/route.ts
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  return NextResponse.json({ 
    message: 'Scraper endpoint',
    status: 'available' 
  })
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Use POST method',
    status: 'ready' 
  })
}
```

#### **ד. Commit:**
- **Commit to:** Multi-test branch ← **חשוב!**
- **Commit changes**

---

### **שלב 2: בדוק ב-Vercel**

Vercel יעשה **Preview Deploy** של Multi-test:
```
https://multibrawn-git-multi-test.vercel.app
