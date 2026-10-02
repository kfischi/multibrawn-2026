import type { Metadata } from 'next';
import ReplyClient from './ReplyClient';

export const metadata: Metadata = {
  title: 'בקשה חדשה מ-MULTIBRAWN',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
};

export default async function ReplyPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <ReplyClient token={token} />;
}
