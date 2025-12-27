'use client';

export default function ZimmerimGalilElyon() {
  const handleChatClick = () => {
    const chatbot = document.querySelector('[data-chatbot]') as HTMLButtonElement;
    if (chatbot) chatbot.click();
  };

  // Cloudinary optimized URLs
  const heroImageUrl = 'https://res.cloudinary.com/decirk3zb/image/upload/w_1600,h_800,c_fill,q_auto:good,f_auto/v1766873966/%D7%90%D7%94%D7%91%D7%94_%D7%91%D7%92%D7%9C%D7%99%D7%9C_fc6nwy.png';
  
  return (
    <>
      <style jsx>{`
        .landing { min-height: 100vh; }
        
        .hero {
          position: relative;
          height: 600px;
          background-image: url('${heroImageUrl}');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .heroOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
        }
        
        .h1 {
          font-size: 3rem;
          font-weight: 800;
          color: white;
          margin: 0 0 1.5rem 0;
          text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }
        
        .heroSubtitle {
          font-size: 1.5rem;
          color: white;
          margin: 0 0 2rem 0;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        }
        
        .ctaButtons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .primaryButton {
          padding: 18px 48px;
          background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%);
          color: white;
          border: none;
          border-radius: 30px;
          font-weight: 700;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(6, 182, 212, 0.4);
          font-family: inherit;
        }
        
        .primaryButton:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(6, 182, 212, 0.5);
        }
        
        .secondaryButton {
          padding: 18px 48px;
          background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
          color: white;
          text-decoration: none;
          border-radius: 30px;
          font-weight: 700;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.3);
          display: inline-block;
        }
        
        .secondaryButton:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
        }
        
        .content {
          padding: 80px 0;
          background: linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%);
        }
        
        .article {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          padding: 60px;
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }
        
        .article h2 {
          font-size: 2.2rem;
          font-weight: 700;
          color: #1a202c;
          margin: 3rem 0 1.5rem 0;
          padding-bottom: 1rem;
          border-bottom: 3px solid #06b6d4;
        }
        
        .article h2:first-of-type { margin-top: 0; }
        
        .article h3 {
          font-size: 1.8rem;
          font-weight: 600;
          color: #2d3748;
          margin: 2rem 0 1rem 0;
        }
        
        .article p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #4a5568;
          margin: 0 0 1.5rem 0;
        }
        
        .article ul {
          margin: 1.5rem 0;
          padding-right: 2rem;
        }
        
        .article li {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #4a5568;
          margin: 0.75rem 0;
        }
        
        .article strong {
          color: #1a202c;
          font-weight: 700;
        }
        
        .cta {
          margin: 4rem 0 2rem 0;
          padding: 3rem;
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
          border-radius: 20px;
          text-align: center;
        }
        
        .cta h3 {
          font-size: 2rem;
          color: #1a202c;
          margin: 0 0 2rem 0;
        }
        
        @media (max-width: 768px) {
          .hero { height: 500px; }
          .h1 { font-size: 2rem; }
          .heroSubtitle { font-size: 1.2rem; }
          .ctaButtons { flex-direction: column; }
          .primaryButton, .secondaryButton {
            width: 100%;
            font-size: 1.1rem;
            padding: 16px 32px;
          }
          .article { padding: 40px 24px; }
          .article h2 { font-size: 1.8rem; }
          .article h3 { font-size: 1.5rem; }
          .article p, .article li { font-size: 1rem; }
          .cta { padding: 2rem 1.5rem; }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'צימרים בגליל העליון',
            description: 'צימרים רומנטיים ומפנקים בגליל העליון',
            image: 'https://res.cloudinary.com/decirk3zb/image/upload/w_1200,h_630,c_fill,q_auto:good,f_auto/v1766873966/%D7%90%D7%94%D7%91%D7%94_%D7%91%D7%92%D7%9C%D7%99%D7%9C_fc6nwy.png',
            mainEntity: {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'כמה עולה צימר בגליל העליון?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'מחיר צימר בגליל העליון נע בין ₪800-₪2,500 ללילה.'
                  }
                }
              ]
            }
          })
        }}
      />
      
      <div className="landing">
        <section className="hero">
          <div className="heroOverlay">
            <div className="container">
              <h1 className="h1">צימרים בגליל העליון - חופשה רומנטית בלב הטבע</h1>
              <p className="heroSubtitle">
                גלו את הצימרים הכי מפנקים ורומנטיים בגליל העליון ⭐ ג'קוזי פרטי, בריכה מחוממת, נוף מדהים
              </p>
              <div className="ctaButtons">
                <button onClick={handleChatClick} className="primaryButton">
                  מצאו את הצימר המושלם שלכם
                </button>
                <a 
                  href="https://wa.me/972523983394"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="secondaryButton"
                >
                  דברו איתנו ב-WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="content">
          <div className="container">
            <article className="article">
              <h2>למה לבחור צימרים בגליל העליון?</h2>
              
              <p>
                הגליל העליון הוא אחד היעדים הפופולריים ביותר לבילוי זוגי ורומנטי בישראל. 
                השילוב המושלם של נופים עוצרי נשימה, אוויר צלול, צימרים יוקרתיים ואטרקציות 
                מגוונות הופך את האזור למקום האידיאלי לחופשה מרעננת.
              </p>

              <h2>מה מייחד את הצימרים בגליל העליון?</h2>
              
              <h3>1. נוף מדהים ואווירה רומנטית</h3>
              <p>
                הצימרים בגליל העליון ממוקמים בנקודות תצפית מרהיבות המשקיפות על ההרים הירוקים, 
                העמקים הפסטורליים וכנרת הנוצצת. כל בוקר תתעוררו לנוף שמשאיר את הפה פעור.
              </p>

              <h3>2. ג'קוזי פרטי ומתקנים מפנקים</h3>
              <p>
                רוב הצימרים בגליל העליון מצוידים בג'קוזי פרטי מחומם, חלקם אפילו בבריכה פרטית. 
                תוכלו ליהנות מעיסוי מפנק בג'קוזי, מסאונה, ומיטת קינג מפנקת.
              </p>

              <h3>3. קרבה לאטרקציות מובילות</h3>
              <p>הגליל העליון מציע מגוון עשיר של אטרקציות:</p>
              <ul>
                <li><strong>שמורות טבע:</strong> בניאס, חרמון, תל דן, יהודיה</li>
                <li><strong>יקבים:</strong> יקבי גולן, רמת הגולן, ברקן</li>
                <li><strong>טיולי ג'יפים:</strong> סיורים מודרכים ברמת הגולן</li>
                <li><strong>מסעדות גורמה:</strong> מסעדות שף ברמה בינלאומית</li>
              </ul>

              <h2>סוגי צימרים בגליל העליון</h2>

              <h3>צימרים רומנטיים לזוגות</h3>
              <p>
                צימרים אינטימיים המיועדים לזוגות המחפשים רומנטיקה ופרטיות. כוללים ג'קוזי פרטי, 
                מיטת קינג, אמבטיית ספא, ולעיתים בריכה מחוממת פרטית.
              </p>

              <h3>צימרים משפחתיים</h3>
              <p>
                צימרים גדולים יותר המתאימים למשפחות עם ילדים. כוללים מספר חדרי שינה, סלון מרווח, 
                מטבח מאובזר וחצר גדולה.
              </p>

              <h2>מחירים - כמה עולה צימר בגליל העליון?</h2>
              <ul>
                <li><strong>צימר בסיסי:</strong> ₪800-₪1,200 ללילה</li>
                <li><strong>צימר יוקרתי:</strong> ₪1,200-₪1,800 ללילה</li>
                <li><strong>צימר VIP עם בריכה:</strong> ₪1,800-₪2,500 ללילה</li>
              </ul>

              <h2>שאלות נפוצות</h2>

              <h3>כמה עולה צימר בגליל העליון?</h3>
              <p>
                מחיר צימר בגליל העליון נע בין ₪800 ל-₪2,500 ללילה, תלוי בסוג הצימר ובעונה.
              </p>

              <h3>מתי הכי כדאי להגיע?</h3>
              <p>
                כל עונה יפה! אביב מושלם לנופים ירוקים, קיץ נעים, סתיו שקט, וחורף עם שלג.
              </p>

              <div className="cta">
                <h3>מוכנים למצוא את הצימר המושלם?</h3>
                <div className="ctaButtons">
                  <button onClick={handleChatClick} className="primaryButton">
                    שוחחו עם ערדית עכשיו
                  </button>
                  <a 
                    href="https://wa.me/972523983394"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="secondaryButton"
                  >
                    או דברו איתנו ב-WhatsApp
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </>
  );
}
