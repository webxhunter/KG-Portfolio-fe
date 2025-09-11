import React from 'react';
import Image from 'next/image';
import MediaCard from './MediaCard';

const MediaGrid = ({ categories, mediaMap, onMediaClick, loading }) => {
  if (loading) {
    return (
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-max">
          {categories.map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-800 h-64 md:h-80 lg:h-96 rounded-lg"></div>
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
          const backend = mediaMap[category.key];
          const isVideo = backend && backend.type === 'video';
          const src = backend && backend.url ? backend.url : category.staticImg;
          
          // Special grid positioning for mobile layout
          const getGridClasses = (index) => {
            const classes = {
              0: "md:col-span-1 md:row-span-2 ", // Brand in Frame - tall
              1: "md:col-span-1 md:row-span-1", // Self Initiated Stories
              2: "md:col-span-1 md:row-span-2", // Couple
              3: "md:col-span-1 md:row-span-1", // Food
              4: "md:col-span-1 md:row-span-2", // Event
              5: "md:col-span-1 md:row-span-1", // Fashion - tall
            };
            
            // Add mobile-specific classes for items 2 and 3
            
            
            return classes[index] || '';
          };

          return (
            <MediaCard
              key={category.key}
              category={category}
              src={src}
              isVideo={isVideo}
              index={index}
              gridClasses={getGridClasses(index)}
              onClick={() => onMediaClick(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MediaGrid;