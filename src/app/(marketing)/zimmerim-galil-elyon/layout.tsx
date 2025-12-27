import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'צימרים בגליל העליון | צימרים רומנטיים עם ג\'קוזי ונוף | MULTIBRAWN',
  description: 'צימרים בגליל העליון ⭐ צימרים רומנטיים עם ג\'קוזי פרטי, בריכה ונוף מדהים. מגוון צימרים יוקרתיים ומפנקים בגליל העליון. הזמינו עכשיו!',
  keywords: 'צימרים בגליל העליון, צימרים רומנטיים, צימר עם ג\'קוזי, צימרים בצפון, גליל עליון',
  openGraph: {
    title: 'צימרים בגליל העליון | צימרים רומנטיים ומפנקים',
    description: 'צימרים יוקרתיים בגליל העליון עם ג\'קוזי פרטי, בריכה ונוף. הזמינו את החופשה המושלמת!',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
