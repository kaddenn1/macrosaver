"use client";

import { useState } from "react";
import Image from "next/image";
import ProductImageLightbox from "@/components/ProductImageLightbox";
import type { ProductPhoto } from "@/data/labelPhotos";

interface ProductImageGalleryProps {
  main: ProductPhoto;
  extras: ProductPhoto[];
}

export default function ProductImageGallery({ main, extras }: ProductImageGalleryProps) {
  const photos = [main, ...extras];
  const [active, setActive] = useState(0);
  const current = photos[active] ?? main;

  return (
    <>
      <div className="h-72 bg-[#111] border border-gray-800 rounded-xl flex items-center justify-center relative overflow-hidden">
        <ProductImageLightbox key={current.src} src={current.src} alt={current.alt} />
      </div>
      {extras.length > 0 && (
        <div className="mt-3 flex gap-2 flex-wrap" role="group" aria-label="Product photos">
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={index === 0 ? "Show product photo" : `Show label photo ${index}`}
              aria-pressed={index === active}
              className={`relative w-16 h-16 bg-[#111] rounded-lg overflow-hidden border transition-colors ${
                index === active ? "border-white" : "border-gray-800 hover:border-gray-500"
              }`}
            >
              <Image src={photo.src} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
