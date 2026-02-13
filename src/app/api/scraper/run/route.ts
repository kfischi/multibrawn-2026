// src/app/api/scraper/run/route.ts
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    // ✅ פשוט החזר תשובה - לא צריך את זה בbuild time
    return NextResponse.json({ 
      message: 'Scraper endpoint available',
      status: 'ready' 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET method גם כן
export async function GET() {
  return NextResponse.json({ 
    message: 'Scraper endpoint - use POST',
    status: 'ready' 
  })
}
