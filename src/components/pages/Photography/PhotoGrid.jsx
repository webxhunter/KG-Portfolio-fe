'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from "@/components/ui/skeleton";

export const PhotoGrid = ({ categories, images, onImageClick }) => {
  const [loadedImages, setLoadedImages] = useState({});

  const getGridPosition = (index) => {
    // Define specific positioning for masonry layout
    const positions = [
      { col: 'col-span-4', row: 'row-span-3', height: 'h-[420px]' }, // Food - medium
      { col: 'col-span-4', row: 'row-span-3', height: 'h-[420px]' }, // People Vibes - tall
      { col: 'col-span-4', row: 'row-span-3', height: 'h-[420px]' }, // Self Portrait Stories - medium
      { col: 'col-span-6', row: 'row-span-2', height: 'h-[280px]' }, // Selfie - wide medium
      { col: 'col-span-6', row: 'row-span-2', height: 'h-[280px]' }, // Vibes - wide medium
      { col: 'col-span-12', row: 'row-span-3', height: 'h-[420px]' }, // Events - full width tall
    ];
    return positions[index] || { col: 'col-span-4', row: 'row-span-2', height: 'h-[280px]' };
  };

  const handleImageLoad = (catKey) => {
    // Add 1 second delay to ensure skeleton is visible
    setTimeout(() => {
      setLoadedImages(prev => ({ ...prev, [catKey]: true }));
    }, 1000);
  };

  const handleImageError = (catKey) => {
    // Add 1 second delay to ensure skeleton is visible
    setTimeout(() => {
      setLoadedImages(prev => ({ ...prev, [catKey]: true }));
    }, 1000);
  };


  return (
    <div className="grid grid-cols-12 auto-rows-[140px] gap-4 px-0 sm:px-4">
      {Object.keys(images || {}).length === 0 ? (
        // Show skeleton grid when no images available
        categories.map((cat, idx) => {
          const position = getGridPosition(idx);
          return (
            <div
              key={cat.key}
              className={`${position.col} ${position.row} px-0 sm:px-2`}
              data-aos="fade-up"
              data-aos-delay={700 + idx * 100}
            >
              <div className="relative overflow-hidden rounded-lg w-full h-full">
                <Skeleton className="w-full h-full rounded-lg min-h-[50vh]" />
                <div className="absolute bottom-0 left-0 right-0">
                  <div className="p-4 bg-black/20 rounded-b-lg">
                    <Skeleton className="min-h-[30vh] w-full bg-white/20" />
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        categories.map((cat, idx) => {
          const position = getGridPosition(idx);
          const isLoaded = loadedImages[cat.key];

          return (
            <div
              key={cat.key}
              className={`${position.col} ${position.row} px-0 sm:px-2`}
              data-aos="fade-up"
              data-aos-delay={700 + idx * 100}
            >
              <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full h-full" onClick={() => onImageClick(idx)}>
                
                
                <div className={`relative w-full h-full ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
                  <img
                    src={
                      images[cat.key]
                        ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${images[cat.key]}`
                        : cat.defaultImg.src
                    }
                    alt={cat.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onLoad={() => handleImageLoad(cat.key)}
                    onError={() => handleImageError(cat.key)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0">
                  <div className="transform translate-y-2 p-4 bg-black opacity-50 hover:opacity-70 group-hover:translate-y-0 transition-transform duration-300">
                    <h5 className="text-white font-semibold text-sm sm:text-base drop-shadow-lg">
                      {cat.label}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};