"use client";
import { useState } from "react";
import Image from "next/image";

export default function ImageHero({ media, defaultVideo, title }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);



  const imageSrc = media?.['hero']?.media_type === 'image'
    ? `${process.env.NEXT_PUBLIC_API_URL}${media['hero'].file_path}`
    : defaultVideo;

 

  const titleParts = title.split(' ');
  const firstWord = titleParts[0] || '';
  const restOfTitle = titleParts.slice(1).join(' ');

  return (
    <div className="container mx-auto my-12 px-4" data-aos="fade-up" data-aos-delay="100">
      <div className="relative text-white overflow-hidden rounded-2xl shadow-2xl h-[60vh] max-h-[650px]">

        {/* Skeleton */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-slate-800 animate-pulse rounded-2xl" />
        )}

        {imageSrc && !hasError ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            priority
            sizes="100vw"
            className={`object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              console.error("Image failed to load:", imageSrc);
              setHasError(true);
            }}
          />
        ) : hasError ? (
          <div className="absolute inset-0 bg-slate-700 flex items-center justify-center text-slate-400 text-sm">
            Failed to load image
          </div>
        ) : null}

        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />
        <div className="absolute bottom-8 left-8 z-10">
          <h1 className="text-3xl md:text-5xl font-light text-white tracking-wide capitalize">
            <span className="font-serif italic text-yellow-300 mr-2">{firstWord}</span>
            <span>{restOfTitle}</span>
          </h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-yellow-300 to-transparent mt-4" />
        </div>
      </div>
    </div>
  );
}