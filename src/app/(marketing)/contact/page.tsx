'use client';

import { useState } from 'react';
import styles from './Contact.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to WhatsApp
      const message = encodeURIComponent(
        `🆕 פנייה חדשה מאתר MULTIBRAWN\n\n` +
        `👤 שם: ${formData.name}\n` +
        `📱 טלפון: ${formData.phone}\n` +
        `📧 אימייל: ${formData.email}\n` +
        `🏠 סוג נכס: ${formData.propertyType}\n` +
        `💬 הודעה:\n${formData.message}`
      );
      
      window.open(`https://wa.me/972523983394?text=${message}`, '_blank');
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        propertyType: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.gradient}>יצירת קשר</span>
          </h1>
          <p className={styles.heroDescription}>
            נשמח לעזור לכם למצוא את המקום המושלם לחופשה
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Contact Info */}
            <div className={styles.infoColumn}>
              <h2 className={styles.columnTitle}>בואו נדבר!</h2>
              <p className={styles.columnDescription}>
                אנחנו זמינים עבורכם בכל דרך שנוחה לכם
              </p>

              <div className={styles.contactMethods}>
                {/* WhatsApp */}
                <a
                  href="https://wa.me/972523983394"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactMethod}
                >
                  <div className={styles.methodIcon} style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div className={styles.methodContent}>
                    <h3 className={styles.methodTitle}>WhatsApp</h3>
                    <p className={styles.methodText}>052-398-3394</p>
                    <span className={styles.methodBadge}>מומלץ ביותר ⭐</span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+972523983394"
                  className={styles.contactMethod}
                >
                  <div className={styles.methodIcon} style={{ background: 'var(--gradient-primary)' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className={styles.methodContent}>
                    <h3 className={styles.methodTitle}>טלפון</h3>
                    <p className={styles.methodText}>052-398-3394</p>
                    <span className={styles.methodBadge}>זמינים 24/7</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:info@multibrawn.co.il"
                  className={styles.contactMethod}
                >
                  <div className={styles.methodIcon} style={{ background: 'linear-gradient(135deg, #FF4B8C 0%, #C06C84 100%)' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className={styles.methodContent}>
                    <h3 className={styles.methodTitle}>אימייל</h3>
                    <p className={styles.methodText}>info@multibrawn.co.il</p>
                    <span className={styles.methodBadge}>מענה עד 24 שעות</span>
                  </div>
                </a>
              </div>

              {/* Hours */}
              <div className={styles.hours}>
                <h3 className={styles.hoursTitle}>שעות זמינות</h3>
                <div className={styles.hoursList}>
                  <div className={styles.hoursItem}>
                    <span className={styles.hoursDay}>ראשון - חמישי</span>
                    <span className={styles.hoursTime}>08:00 - 22:00</span>
                  </div>
                  <div className={styles.hoursItem}>
                    <span className={styles.hoursDay}>שישי</span>
                    <span className={styles.hoursTime}>08:00 - 15:00</span>
                  </div>
                  <div className={styles.hoursItem}>
                    <span className={styles.hoursDay}>שבת</span>
                    <span className={styles.hoursTime}>20:00 - 23:00</span>
                  </div>
                  <p className={styles.hoursNote}>
                    📱 בחירום? אנחנו זמינים בוואטסאפ 24/7
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={styles.formColumn}>
              <h2 className={styles.columnTitle}>שלחו הודעה</h2>
              <p className={styles.columnDescription}>
                מלאו את הפרטים ונחזור אליכם בהקדם
              </p>

              <form onSubmit={handleSubmit} className={styles.form}>
                {/* Name */}
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    שם מלא *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="איך קוראים לך?"
                  />
                </div>

                {/* Phone */}
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    טלפון *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    pattern="05\d{1}-?\d{7}"
                    className={styles.input}
                    placeholder="05X-XXXXXXX"
                  />
                </div>

                {/* Email */}
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    אימייל
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="email@example.com"
                  />
                </div>

                {/* Property Type */}
                <div className={styles.formGroup}>
                  <label htmlFor="propertyType" className={styles.label}>
                    סוג נכס
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="">בחר סוג נכס</option>
                    <option value="צימר">צימר רומנטי</option>
                    <option value="וילה">וילה משפחתית</option>
                    <option value="מלון">מלון בוטיק</option>
                    <option value="אירוע">מתחם אירועים</option>
                    <option value="אחר">אחר</option>
                  </select>
                </div>

                {/* Message */}
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>
                    הודעה *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={styles.textarea}
                    placeholder="ספרו לנו על החופשה שאתם מחפשים..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitButton}
                >
                  {isSubmitting ? 'שולח...' : 'שלח הודעה'}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className={styles.successMessage}>
                    ✅ ההודעה נשלחה בהצלחה! נחזור אליכם בקרוב.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className={styles.errorMessage}>
                    ❌ אופס! משהו השתבש. נסו שוב או צרו קשר בוואטסאפ.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
