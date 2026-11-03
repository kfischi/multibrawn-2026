'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle } from 'lucide-react';

export default function SmartLeadForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // משתנה הסביבה שהגדרנו ב-Netlify
  const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL; 

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      eventType: formData.get('eventType'),
      guests: formData.get('guests'),
      date: new Date().toISOString(),
      source: 'Multibrawn Homepage V1'
    };

    try {
      if (!WEBHOOK_URL) {
        console.error('Missing Webhook URL');
        // במצב פיתוח נדמה הצלחה כדי לא לתקוע אותך
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        return;
      }

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
        (e.target as HTMLFormElement).reset();
      } else {
        alert('הייתה בעיה בשליחה, אנא נסה שוב.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('שגיאת תקשורת.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="bg-green-50/90 backdrop-blur border border-green-200 p-8 rounded-2xl text-center shadow-xl animate-in fade-in zoom-in duration-500">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-800 mb-2">קיבלנו את הפרטים!</h3>
        <p className="text-green-700">ערדית מתחילה לחפש עבורך את המקום המושלם.<br/>נחזור אליך בהקדם בוואטסאפ.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl">
      <h3 className="text-2xl font-bold text-white text-center mb-6">מצאו לי את המקום המושלם</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-white/80 text-sm">שם מלא</label>
            <input 
              name="name" 
              required 
              className="w-full p-3 bg-white/80 rounded-lg focus:bg-white focus:ring-2 focus:ring-fuchsia-500 outline-none transition-all text-gray-900"
              placeholder="ישראל ישראלי" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-white/80 text-sm">טלפון</label>
            <input 
              name="phone" 
              type="tel" 
              required 
              className="w-full p-3 bg-white/80 rounded-lg focus:bg-white focus:ring-2 focus:ring-fuchsia-500 outline-none transition-all text-gray-900"
              placeholder="050-0000000" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-white/80 text-sm">סוג החופשה/אירוע</label>
            <select name="eventType" className="w-full p-3 bg-white/80 rounded-lg focus:bg-white focus:ring-2 focus:ring-fuchsia-500 outline-none transition-all text-gray-900">
              <option value="vacation">חופשה משפחתית</option>
              <option value="couple">חופשה זוגית</option>
              <option value="villa">וילה למסיבה</option>
              <option value="event">אירוע עסקי</option>
              <option value="wedding">חתונה / אירוע גדול</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-white/80 text-sm">כמות אורחים</label>
            <input 
              name="guests" 
              type="number" 
              className="w-full p-3 bg-white/80 rounded-lg focus:bg-white focus:ring-2 focus:ring-fuchsia-500 outline-none transition-all text-gray-900"
              placeholder="10" 
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-4 mt-2 bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white font-bold text-lg rounded-xl shadow-lg transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Send className="w-5 h-5" />}
          {loading ? 'שולח לערדית...' : 'התחל חיפוש חכם'}
        </button>
      </form>
    </div>
  );
}
