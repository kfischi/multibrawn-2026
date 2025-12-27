import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import ChatBot from '@/components/layout/ChatBot/ChatBot';

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
      <ChatBot />
    </>
  );
}
