
import React from 'react';
import MediaCard from './MediaCard';

const MediaGrid = ({ categories, mediaMap, onMediaClick, loading, HLSVideoPlayer }) => {
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

  const getGridClasses = (index) => {
    const classes = {
      0: "md:col-span-1 md:row-span-2",
      1: "md:col-span-1 md:row-span-1",
      2: "md:col-span-1 md:row-span-2",
      3: "md:col-span-1 md:row-span-1",
      4: "md:col-span-1 md:row-span-2",
      5: "md:col-span-1 md:row-span-1",
    };
    return classes[index] || '';
  };

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-max">
        {categories.map((category, index) => {
          const backend = mediaMap[category.key];
          const isVideo = backend && backend.type === 'video';
          const src = backend && backend.url ? backend.url : category.staticImg;

          return (
            <MediaCard
              key={category.key}
              category={category}
              src={src}
              isVideo={isVideo}
              index={index}
              gridClasses={getGridClasses(index)}
              onClick={() => onMediaClick(index)}
              HLSVideoPlayer={HLSVideoPlayer}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MediaGrid;
