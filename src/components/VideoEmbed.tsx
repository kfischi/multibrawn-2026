import Script from 'next/script';

interface VideoEmbedProps {
  /** מזהה הסרטון ביוטיוב */
  videoId: string;
  /** שם הסרטון כפי שהוא מופיע ביוטיוב (לסכמה ולנגישות) */
  videoName: string;
  /** תיאור קצר לסכמת VideoObject */
  description: string;
  /** תאריך ההעלאה ליוטיוב, בפורמט YYYY-MM-DD */
  uploadDate: string;
  /** כתובת העמוד שבו הסרטון מוטמע */
  pageUrl: string;
  /** כיתוב קצר שמוצג מתחת לסרטון */
  caption?: string;
}

/**
 * הטמעת שורט יוטיוב (9:16) עם סכמת VideoObject —
 * כך הסרטון זכאי להופיע בתוצאות החיפוש ובחיפוש הווידאו של גוגל.
 */
export default function VideoEmbed({
  videoId,
  videoName,
  description,
  uploadDate,
  pageUrl,
  caption,
}: VideoEmbedProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${pageUrl}#video-${videoId}`,
    name: videoName,
    description,
    thumbnailUrl: [`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`],
    uploadDate,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    inLanguage: 'he-IL',
    publisher: { '@id': 'https://multibrawn.co.il/#organization' },
  };

  return (
    <figure style={{ margin: '2rem auto', maxWidth: 340, textAlign: 'center' }}>
      <Script
        id={`schema-video-${videoId}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '9 / 16',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1.5px solid #A06BFF',
          boxShadow: '0 10px 30px rgba(91, 45, 142, 0.18)',
          background: '#000',
        }}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={videoName}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      </div>
      {caption && (
        <figcaption
          style={{ marginTop: '0.6rem', fontSize: '0.9rem', color: '#64748b', lineHeight: 1.5 }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
