/**
 * Terms of Service Page
 * Path: /terms
 * Quick fix for 404 error
 */

export default function TermsPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '80px 24px',
      fontFamily: 'Assistant, sans-serif',
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '24px',
        padding: '48px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          תנאי שימוש
        </h1>

        <div style={{
          fontSize: '16px',
          lineHeight: '1.8',
          color: '#333',
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px' }}>
            1. כללי
          </h2>
          <p>
            ברוכים הבאים ל-MULTIBRAWN. השימוש באתר מהווה הסכמה מלאה לתנאי שימוש אלה.
          </p>

          <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px' }}>
            2. שירותי האתר
          </h2>
          <p>
            MULTIBRAWN מספק פלטפורמה לחיפוש והשוואת נכסי אירוח בישראל. האתר משמש כמתווך 
            בין המשתמשים לבין ספקי האירוח השונים.
          </p>

          <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px' }}>
            3. קישורי שותפים
          </h2>
          <p>
            האתר מכיל קישורי שותפים (affiliate links) לאתרי צד שלישי. בעת ביצוע הזמנה דרך 
            הקישורים הללו, MULTIBRAWN עשויה לקבל עמלה מהספק.
          </p>

          <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px' }}>
            4. מידע על נכסים
          </h2>
          <p>
            המידע המוצג באתר מסופק על ידי ספקי האירוח. MULTIBRAWN עושה מאמצים לוודא 
            את דיוק המידע, אך אינה אחראית לשינויים, טעויות או אי דיוקים.
          </p>

          <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px' }}>
            5. הזמנות ותשלומים
          </h2>
          <p>
            כל הזמנה מתבצעת באתר השותף הרלוונטי. MULTIBRAWN אינה מעבדת תשלומים ישירות 
            ואינה צד לעסקה בין המשתמש לבין ספק האירוח.
          </p>

          <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px' }}>
            6. ביטולים והחזרים
          </h2>
          <p>
            מדיניות הביטול וההחזרים נקבעת על ידי ספק האירוח. יש לעיין במדיניות הספק 
            לפני ביצוע הזמנה.
          </p>

          <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px' }}>
            7. אחריות
          </h2>
          <p>
            MULTIBRAWN אינה אחראית לאיכות השירות, זמינות, או כל נזק שייגרם כתוצאה משימוש 
            בשירותי ספקי האירוח.
          </p>

          <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px' }}>
            8. פרטיות
          </h2>
          <p>
            השימוש באתר כפוף גם למדיניות הפרטיות שלנו. לפרטים נוספים, עיינו במדיניות 
            הפרטיות.
          </p>

          <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px' }}>
            9. שינויים בתנאי השימוש
          </h2>
          <p>
            MULTIBRAWN שומרת לעצמה את הזכות לשנות תנאי שימוש אלה בכל עת. המשך השימוש 
            באתר לאחר ביצוע שינויים מהווה הסכמה לתנאים המעודכנים.
          </p>

          <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px' }}>
            10. יצירת קשר
          </h2>
          <p>
            לשאלות או הבהרות בנוגע לתנאי השימוש, ניתן ליצור קשר:
          </p>
          <ul style={{ marginTop: '12px', paddingRight: '24px' }}>
            <li>טלפון: 052-398-3394</li>
            <li>אימייל: info@multibrawn.co.il</li>
            <li>WhatsApp: 052-398-3394</li>
          </ul>

          <p style={{ 
            marginTop: '48px', 
            padding: '20px',
            background: '#f3f4f6',
            borderRadius: '12px',
            fontSize: '14px',
            color: '#666'
          }}>
            <strong>עדכון אחרון:</strong> פברואר 2026<br/>
            תנאי שימוש אלה כפופים לדיני מדינת ישראל.
          </p>
        </div>
      </div>
    </div>
  );
}
