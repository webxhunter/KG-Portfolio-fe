"use client";
import React from "react";
import PhotoCard from "./PhotoCard";

const getGridClasses = (index) => {
  const classes = {
    0: "md:col-span-1",
    1: "md:col-span-1",
    2: "md:col-span-1",
    3: "md:col-span-1",
    4: "md:col-span-1",
    5: "md:col-span-1",
  };
  return classes[index] || "";
};

export const PhotoGrid = ({ categories, images, onImageClick, loading }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (loading) {
    return (
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-max">
          {categories.map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-800 h-64 md:h-80 lg:h-96 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-max">
        {categories.map((category, index) => {
          const backend = images[category.key];
          const src = backend?.url
            ?? (backend ? `${API_URL}/uploads/${backend}` : null)
            ?? category.defaultImg?.src;

          return (
            <PhotoCard
              key={category.key}
              category={category}
              src={src}
              index={index}
              gridClasses={getGridClasses(index)}
              onClick={() => onImageClick(index)}
            />
          );
        })}
      </div>
    </div>
  );
};