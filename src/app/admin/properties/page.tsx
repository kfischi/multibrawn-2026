// src/app/admin/properties/page.tsx
'use client';

import { useState } from 'react';
import propertiesData from '@/data/properties.json';
import styles from './Properties.module.css';

// CRITICAL: Force dynamic rendering
export const dynamic = 'force-dynamic';

// Get the array from the JSON
const allProperties = propertiesData.properties;

export default function PropertiesPage() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    area: '',
    capacity: '',
    image: '',
    description: '',
    priceRange: '',
    featured: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save to Supabase when ready
    console.log('Property data:', formData);
    setShowModal(false);
    alert('שמירה ל-Supabase תתווסף בשלב הבא');
  };

  return (
    <div className={styles.propertiesPage}>
      <div className={styles.header}>
        <h1>ניהול נכסים</h1>
        <button 
          onClick={() => setShowModal(true)}
          className={styles.addButton}
        >
          + הוסף נכס חדש
        </button>
      </div>

      <div className={styles.propertiesGrid}>
        {allProperties.map((property: any) => (
          <div key={property.id} className={styles.propertyCard}>
            <img 
              src={property.image} 
              alt={property.name}
              className={styles.propertyImage}
            />
            <div className={styles.propertyInfo}>
              <h3>{property.name}</h3>
              <p className={styles.propertyType}>{property.type}</p>
              <p className={styles.propertyLocation}>📍 {property.location}</p>
              <div className={styles.propertyActions}>
                <button className={styles.editButton}>✏️ ערוך</button>
                <button className={styles.deleteButton}>🗑️ מחק</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>הוסף נכס חדש</h2>
              <button 
                onClick={() => setShowModal(false)}
                className={styles.closeButton}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>שם הנכס</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>סוג</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  required
                >
                  <option value="">בחר סוג</option>
                  <option value="צימר">צימר</option>
                  <option value="וילה">וילה</option>
                  <option value="מתחם אירועים">מתחם אירועים</option>
                  <option value="דירת נופש">דירת נופש</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>מיקום</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>אזור</label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>קיבולת</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>URL תמונה</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>תיאור</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                />
              </div>

              <div className={styles.formGroup}>
                <label>טווח מחירים</label>
                <input
                  type="text"
                  value={formData.priceRange}
                  onChange={(e) => setFormData({...formData, priceRange: e.target.value})}
                  placeholder="₪500-800"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  />
                  נכס מומלץ
                </label>
              </div>

              <div className={styles.formActions}>
                <button type="button" onClick={() => setShowModal(false)} className={styles.cancelButton}>
                  ביטול
                </button>
                <button type="submit" className={styles.submitButton}>
                  שמור נכס
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
