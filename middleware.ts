import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Block direct access to /api/admin/* from non-server origins
  if (pathname.startsWith('/api/admin/') && pathname !== '/api/admin/verify') {
    const secret = req.headers.get('x-admin-secret') || req.nextUrl.searchParams.get('key');
    const expected = process.env.ADMIN_SECRET || 'multibrawn-admin-2025';
    if (!secret || secret !== expected) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/admin/:path*'],
};
