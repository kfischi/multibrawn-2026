import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'צימרים בגליל העליון | צימרים רומנטיים עם ג\'קוזי ונוף',
  description: 'צימרים בגליל העליון ⭐ צימרים רומנטיים עם ג\'קוזי פרטי, בריכה ונוף מדהים. מגוון צימרים יוקרתיים ומפנקים בגליל העליון. הזמינו עכשיו!',
  keywords: 'צימרים בגליל העליון, צימרים רומנטיים, צימר עם ג\'קוזי, צימרים בצפון, גליל עליון',
  openGraph: {
    title: 'צימרים בגליל העליון | צימרים רומנטיים ומפנקים',
    description: 'צימרים יוקרתיים בגליל העליון עם ג\'קוזי פרטי, בריכה ונוף. הזמינו את החופשה המושלמת!',
    images: [
      {
        url: 'https://res.cloudinary.com/decirk3zb/image/upload/w_1200,h_630,c_fill,q_auto:good,f_auto/v1766873966/%D7%90%D7%94%D7%91%D7%94_%D7%91%D7%92%D7%9C%D7%99%D7%9C_fc6nwy.png',
        width: 1200,
        height: 630,
        alt: 'אהבה בגליל - צימרים רומנטיים בגליל העליון',
      },
    ],
    locale: 'he_IL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'צימרים בגליל העליון | צימרים רומנטיים ומפנקים',
    description: 'צימרים יוקרתיים בגליל העליון עם ג\'קוזי פרטי, בריכה ונוף מדהים',
    images: ['https://res.cloudinary.com/decirk3zb/image/upload/w_1200,h_630,c_fill,q_auto:good,f_auto/v1766873966/%D7%90%D7%94%D7%91%D7%94_%D7%91%D7%92%D7%9C%D7%99%D7%9C_fc6nwy.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
