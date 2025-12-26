// src/app/(marketing)/layout.tsx
// העתק את כל התוכן הזה!

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ChatWidget from '@/components/ChatWidget';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh', paddingTop: '80px' }}>
        {children}
      </main>
      <Footer />
      
      {/* כפתורים צפים */}
      <FloatingWhatsApp />  {/* WhatsApp למעלה */}
      <ChatWidget />        {/* צ'אטבוט למטה */}
    </>
  );
}
