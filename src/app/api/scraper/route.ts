import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({ message: 'Scraper disabled' })
}

export async function POST() {
  return NextResponse.json({ message: 'Scraper disabled' })
}
```

### **3. Commit:**
```
Message: Fix scraper endpoint - disable completely
Branch: Multi-test
