'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface PropertyHeroProps {
  property: any;
}

export default function PropertyHero({ property }: PropertyHeroProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const images = property.images?.gallery || [];
  const mainImage = property.images?.main || '';
  const allImages = [mainImage, ...images].filter(Boolean);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <>
      <div className="relative h-[60vh] bg-black">
        <div className="grid grid-cols-4 gap-2 h-full p-2">
          <div 
            className="col-span-3 relative cursor-pointer group overflow-hidden rounded-lg"
            onClick={() => setShowGallery(true)}
          >
            <Image
              src={mainImage}
              alt={property.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>

          <div className="flex flex-col gap-2">
            {images.slice(0, 2).map((img: string, idx: number) => (
              <div
                key={idx}
                className="relative flex-1 cursor-pointer group overflow-hidden rounded-lg"
                onClick={() => {
                  setCurrentImage(idx + 1);
                  setShowGallery(true);
                }}
              >
                <Image
                  src={img}
                  alt={`${property.name} ${idx + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowGallery(true)}
          className="absolute bottom-6 right-6 px-6 py-3 bg-white/90 backdrop-blur-md text-black font-semibold rounded-full hover:bg-white transition-all shadow-xl"
        >
          צפה בכל התמונות ({allImages.length})
        </button>
      </div>

      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-6 right-6 z-10 p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white">
            {currentImage + 1} / {allImages.length}
          </div>

          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/10 backdrop-blur-md rounded-full"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/10 backdrop-blur-md rounded-full"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center p-12">
            <Image
              src={allImages[currentImage]}
              alt={`${property.name} ${currentImage + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
