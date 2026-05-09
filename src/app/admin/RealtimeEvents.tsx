'use client';

import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { ToastMsg } from './Toast';

// Browser-side Supabase client for Realtime subscriptions (anon key is fine)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Props {
  addToast: (text: string, type?: ToastMsg['type']) => void;
}

export function RealtimeEvents({ addToast }: Props) {
  useEffect(() => {
    const channel = supabase
      .channel('inbound-events-admin')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'inbound_events' },
        ({ new: row }) => {
          const r = row as { event_type: string; platform: string };
          addToast(`אירוע חדש: ${r.event_type} מ-${r.platform}`, 'info');
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [addToast]);

  return null; // side-effect only, renders nothing
}
