'use client';

import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { ToastMsg } from './Toast';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cfulruffxneijmcvpclz.supabase.co';
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = SUPABASE_ANON
  ? createClient(SUPABASE_URL, SUPABASE_ANON)
  : null;

interface Props {
  addToast: (text: string, type?: ToastMsg['type']) => void;
}

export function RealtimeEvents({ addToast }: Props) {
  useEffect(() => {
    if (!supabase) return;

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
