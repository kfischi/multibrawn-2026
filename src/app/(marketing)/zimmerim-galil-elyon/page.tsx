import type { Metadata } from 'next';
import ZimmerimClient from './ZimmerimClient';

export const metadata: Metadata = {
  title: 'צימרים בגליל עליון | וילות ונכסים יוקרתיים',
  description: 'צימרים ווילות יוקרתיים בגליל העליון — בריכה פרטית, ג׳קוזי, נוף מדהים. הזמנה קלה דרך MULTIBRAWN.',
  alternates: { canonical: 'https://multibrawn.co.il/zimmerim-galil-elyon' },
  openGraph: {
    title: 'צימרים בגליל עליון | MULTIBRAWN',
    description: 'הנכסים הכי יפים בגליל העליון — לנופש רומנטי ומשפחתי.',
    url: 'https://multibrawn.co.il/zimmerim-galil-elyon',
    type: 'website',
  },
  keywords: ['צימרים גליל עליון', 'וילות גליל', 'נופש בגליל', 'צימר עם בריכה גליל'],
};

export default function ZimmerimGalilElyonPage() {
  return <ZimmerimClient />;
}
