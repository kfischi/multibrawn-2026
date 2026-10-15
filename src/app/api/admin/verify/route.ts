import { NextRequest, NextResponse } from 'next/server';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'multibrawn-admin-2025';

export async function POST(req: NextRequest) {
  const { key } = await req.json().catch(() => ({ key: '' }));
  if (key === ADMIN_SECRET) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}
