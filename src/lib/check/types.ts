import type { RequestStatus } from './constants';

export interface CheckVenue {
  id: string;
  name: string;
  venue_type: string | null;
  city: string | null;
  region: string | null;
  capacity_min: number | null;
  capacity_max: number | null;
  capacity_text: string | null;
  kashrut: string | null;
  kashrut_raw: string | null;
  kashrut_verified: boolean;
  contact_name: string | null;
  contact_phone: string | null;
  virtual_tour_url: string | null;
  source_url: string | null;
  categories: string | null;
  agreement_signed: boolean;
  active: boolean;
  notes: string | null;
}

export interface CheckRequestVenue {
  id: string;
  request_id: string;
  venue_id: string;
  token: string;
  response: 'pending' | 'available' | 'unavailable';
  price_text: string | null;
  venue_note: string | null;
  responded_at: string | null;
  customer_details_shared: boolean;
  venue?: Pick<CheckVenue, 'id' | 'name' | 'city' | 'contact_name' | 'contact_phone' | 'agreement_signed'> | null;
}

export interface CheckRequest {
  id: string;
  created_at: string;
  requester_type: 'private' | 'producer';
  business_name: string | null;
  event_type: string;
  event_date: string | null;
  date_text: string | null;
  date_flexible: boolean;
  guest_count: number;
  region: string;
  budget_amount: number | null;
  budget_unit: 'per_guest' | 'total' | null;
  kashrut: string;
  must_haves: string[];
  notes: string | null;
  name: string;
  phone: string;
  summary: string;
  status: RequestStatus;
  fee_paid: boolean;
  admin_notes: string | null;
  venues?: CheckRequestVenue[];
}

/** מה שהמקום רואה בעמוד התשובה. בלי שם, טלפון או הערות פנימיות. */
export interface VenueReplyView {
  venueName: string;
  summary: string;
  eventType: string;
  guestCount: number;
  dateLabel: string;
  regionLabel: string;
  budgetLabel: string;
  kashrutLabel: string;
  mustHaves: string[];
  notes: string | null;
  requesterType: 'private' | 'producer';
  response: 'pending' | 'available' | 'unavailable';
  priceText: string | null;
  venueNote: string | null;
  /** הבקשה נסגרה או נדחתה: מציגים אותה, אבל אי אפשר לענות. */
  closed: boolean;
}
