"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import instaicon from "@/Assets/Home/insta-icon-kg.png";

const PhotoCard = ({ category, src, index, gridClasses, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`group cursor-pointer ${gridClasses}`}
      data-aos="fade-up"
      data-aos-delay={700 + index * 100}
      onClick={onClick}
    >
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-[1.02]">
        <Image
          src={src}
          alt={category.label}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 2}
          onLoad={() => setIsLoaded(true)}
        />

        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
          <div className="w-full bg-black bg-opacity-70 group-hover:bg-opacity-80 transition-all duration-300">
            <h5 className="text-white font-medium text-lg p-4 transition-all duration-300 group-hover:text-yellow-300">
              {category.label}
            </h5>
          </div>
        </div>

        <Link
          href="https://www.instagram.com/_shotsbykg?igsh=MTd4NWg1d3FqdGR6Ng=="
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute top-4 right-0 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-sm pl-3 pr-5 py-2 rounded-l-full shadow-lg transition-all duration-300 hover:bg-black hover:scale-105"
        >
          <Image src={instaicon} alt="Instagram" className="w-6 h-6" />
          <span className="text-white text-xs font-medium tracking-wide">See My Work</span>
        </Link>
      </div>
    </div>
  );
};

export default PhotoCard;