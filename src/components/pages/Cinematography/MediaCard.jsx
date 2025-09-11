import React from 'react';
import Image from 'next/image';

const MediaCard = ({ category, src, isVideo, index, gridClasses, onClick }) => {
  return (
    <div
      className={`group cursor-pointer ${gridClasses}`}
      data-aos="fade-up"
      data-aos-delay={700 + index * 100}
      onClick={onClick}
    >
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-[1.02]">
        {isVideo ? (
          <video
            src={src}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            preload="metadata"
          />
        ) : (
          <Image
            src={src}
            alt={category.label}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 2}
          />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
          <div className="w-full bg-black opacity-70 group-hover:bg-opacity-70 transition-all duration-300">
            <h5 className="text-white font-medium text-lg p-4 transition-all duration-300 group-hover:text-yellow-300">
              {category.label}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;