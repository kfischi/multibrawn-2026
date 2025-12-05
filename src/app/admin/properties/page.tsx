'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import styles from './Properties.module.css';

type Property = {
  id: string;
  name: string;
  type: 'villa' | 'zimmer' | 'apartment' | 'hotel' | 'event';
  location: string;
  description: string;
  image: string;
  video?: string;
  featured: boolean;
};

function PropertiesContent() {
  const searchParams = useSearchParams();
  const action = searchParams.get('action');

  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      name: 'וילה מפוארת בצפון',
      type: 'villa',
      location: 'הגליל העליון',
      description: 'וילה יוקרתית עם בריכה פרטית',
      image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/22_tt9jvz.jpg',
      featured: true,
    },
    {
      id: '2',
      name: 'צימר רומנטי',
      type: 'zimmer',
      location: 'הגולן',
      description: 'צימר עם ג\'קוזי ונוף מדהים',
      image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/AA_s4nej0.jpg',
      featured: true,
    },
  ]);

  const [showModal, setShowModal] = useState(action === 'new');
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    type: 'villa' as Property['type'],
    location: '',
    description: '',
    image: '',
    video: '',
    featured: false,
  });

  useEffect(() => {
    if (action === 'new') {
      setShowModal(true);
    }
  }, [action]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); // Replace with your Cloudinary preset
    formData.append('cloud_name', 'dptyfvwyo');

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dptyfvwyo/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      setFormData(prev => ({ ...prev, image: data.secure_url }));
    } catch (error) {
      console.error('Upload error:', error);
      alert('שגיאה בהעלאת תמונה');
    } finally {
      setUploading(false);
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');
    formData.append('cloud_name', 'dptyfvwyo');
    formData.append('resource_type', 'video');

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dptyfvwyo/video/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      setFormData(prev => ({ ...prev, video: data.secure_url }));
    } catch (error) {
      console.error('Upload error:', error);
      alert('שגיאה בהעלאת וידאו');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProperty) {
      // Update existing
      setProperties(prev =>
        prev.map(p => (p.id === editingProperty.id ? { ...p, ...formData } : p))
      );
    } else {
      // Add new
      const newProperty: Property = {
        ...formData,
        id: Date.now().toString(),
      };
      setProperties(prev => [...prev, newProperty]);
    }

    // Reset form
    setFormData({
      name: '',
      type: 'villa',
      location: '',
      description: '',
      image: '',
      video: '',
      featured: false,
    });
    setShowModal(false);
    setEditingProperty(null);

    alert('הנכס נשמר בהצלחה! ✅');
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      name: property.name,
      type: property.type,
      location: property.location,
      description: property.description,
      image: property.image,
      video: property.video || '',
      featured: property.featured,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('האם אתה בטוח שברצונך למחוק נכס זה?')) {
      setProperties(prev => prev.filter(p => p.id !== id));
      alert('הנכס נמחק! 🗑️');
    }
  };

  const typeLabels = {
    villa: '🏛️ וילה',
    zimmer: '🏡 צימר',
    apartment: '🏙️ דירה',
    hotel: '🏨 מלון',
    event: '💍 אירוע',
  };

  return (
    <div className={styles.propertiesPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>ניהול נכסים</h1>
          <p className={styles.subtitle}>כאן תוכל להוסיף, לערוך ולמחוק נכסים</p>
        </div>
        <button
          className={styles.addBtn}
          onClick={() => {
            setEditingProperty(null);
            setFormData({
              name: '',
              type: 'villa',
              location: '',
              description: '',
              image: '',
              video: '',
              featured: false,
            });
            setShowModal(true);
          }}
        >
          <i className="fas fa-plus"></i> נכס חדש
        </button>
      </div>

      {/* Properties Grid */}
      <div className={styles.propertiesGrid}>
        {properties.map(property => (
          <div key={property.id} className={styles.propertyCard}>
            <div className={styles.propertyImage}>
              <Image
                src={property.image}
                alt={property.name}
                fill
                className={styles.image}
              />
              {property.featured && (
                <span className={styles.featuredBadge}>⭐ מומלץ</span>
              )}
            </div>
            <div className={styles.propertyContent}>
              <div className={styles.propertyType}>{typeLabels[property.type]}</div>
              <h3 className={styles.propertyName}>{property.name}</h3>
              <p className={styles.propertyLocation}>📍 {property.location}</p>
              <p className={styles.propertyDescription}>{property.description}</p>
            </div>
            <div className={styles.propertyActions}>
              <button
                className={styles.editBtn}
                onClick={() => handleEdit(property)}
              >
                <i className="fas fa-edit"></i> ערוך
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(property.id)}
              >
                <i className="fas fa-trash"></i> מחק
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className={styles.modal} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {editingProperty ? 'עריכת נכס' : 'נכס חדש'}
              </h2>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>שם הנכס *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                  placeholder="וילה מפוארת בצפון"
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>סוג *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className={styles.select}
                    required
                  >
                    <option value="villa">וילה</option>
                    <option value="zimmer">צימר</option>
                    <option value="apartment">דירה</option>
                    <option value="hotel">מלון</option>
                    <option value="event">אירוע</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>מיקום *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                    placeholder="הגליל העליון"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>תיאור *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={styles.textarea}
                  rows={4}
                  required
                  placeholder="תיאור מפורט של הנכס..."
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>תמונה ראשית *</label>
                <div className={styles.uploadArea}>
                  {formData.image ? (
                    <div className={styles.preview}>
                      <Image
                        src={formData.image}
                        alt="Preview"
                        fill
                        className={styles.previewImage}
                      />
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ) : (
                    <label className={styles.uploadLabel}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className={styles.fileInput}
                        disabled={uploading}
                      />
                      {uploading ? (
                        <div className={styles.uploading}>
                          <i className="fas fa-spinner fa-spin"></i> מעלה...
                        </div>
                      ) : (
                        <>
                          <i className="fas fa-cloud-upload-alt"></i>
                          <p>לחץ להעלאת תמונה</p>
                        </>
                      )}
                    </label>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>וידאו (אופציונלי)</label>
                <div className={styles.uploadArea}>
                  {formData.video ? (
                    <div className={styles.videoPreview}>
                      <video src={formData.video} controls className={styles.video} />
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => setFormData(prev => ({ ...prev, video: '' }))}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ) : (
                    <label className={styles.uploadLabel}>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className={styles.fileInput}
                        disabled={uploading}
                      />
                      {uploading ? (
                        <div className={styles.uploading}>
                          <i className="fas fa-spinner fa-spin"></i> מעלה וידאו...
                        </div>
                      ) : (
                        <>
                          <i className="fas fa-video"></i>
                          <p>לחץ להעלאת וידאו</p>
                        </>
                      )}
                    </label>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className={styles.checkbox}
                  />
                  <span>נכס מומלץ</span>
                </label>
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.submitBtn} disabled={uploading}>
                  <i className="fas fa-save"></i>{' '}
                  {editingProperty ? 'עדכן נכס' : 'שמור נכס'}
                </button>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowModal(false)}
                >
                  ביטול
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div style={{padding: '2rem', textAlign: 'center'}}>טוען...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
