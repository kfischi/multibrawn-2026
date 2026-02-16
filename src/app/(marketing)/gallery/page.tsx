import { Suspense } from 'react';
import GalleryContent from './GalleryContent';

export default function GalleryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">טוען...</p>
        </div>
      </div>
    }>
      <GalleryContent />
    </Suspense>
  );
}
