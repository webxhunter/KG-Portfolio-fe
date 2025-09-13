import React from "react";

const AdaptiveGallery = ({ content, onItemClick }) => {
  const getLayoutClasses = (n, index) => {
    if (n >= 10) {
      if (index < 10) {
        if (index === 0) return "md:col-span-6 md:row-span-24 md:h-[120vh]";
        if (index === 7) return "md:col-span-6 md:row-span-24 md:h-[120vh]";
        return "md:col-span-3 md:row-span-12 md:h-[60vh]";
      }
      const remaining = n % 10;
      const extraIndex = index % 10;
      
      if (remaining === 1) return "md:col-span-12 md:row-span-24 md:h-[120vh]";
      if (remaining === 2) return "md:col-span-6 md:row-span-24 md:h-[120vh]";
      if (remaining === 3) {
        return extraIndex === 0 ? "md:col-span-6 md:row-span-24 md:h-[120vh]" : "md:col-span-6 md:row-span-12 md:h-[60vh]";
      }
      if (remaining === 4) {
        if (extraIndex === 0) return "md:col-span-6 md:row-span-24 md:h-[120vh]";
        if (extraIndex < 3) return "md:col-span-3 md:row-span-12 md:h-[60vh]";
        return "md:col-span-6 md:row-span-12 md:h-[60vh]";
      }
      if (remaining === 5) {
        if (extraIndex === 0) return "md:col-span-6 md:row-span-24 md:h-[120vh]";
        return "md:col-span-3 md:row-span-12 md:h-[60vh]";
      }
      if (remaining === 6) {
        if (extraIndex === 0) return "md:col-span-6 md:row-span-24 md:h-[120vh]";
        if (extraIndex < 5) return "md:col-span-3 md:row-span-12 md:h-[60vh]";
        return "md:col-span-12 md:row-span-6 md:h-[60vh]";
      }
      if (remaining === 7) {
        if (extraIndex === 0) return "md:col-span-6 md:row-span-24 md:h-[120vh]";
        if (extraIndex < 5) return "md:col-span-3 md:row-span-12 md:h-[60vh]";
        return "md:col-span-6 md:row-span-6 md:h-[60vh]";
      }
      if (remaining === 8) {
        if (extraIndex === 0) return "md:col-span-6 md:row-span-24 md:h-[120vh]";
        if (extraIndex < 5) return "md:col-span-3 md:row-span-12 md:h-[60vh]";
        return "md:col-span-4 md:row-span-6 md:h-[60vh]";
      }
      if (remaining === 9) {
        if (extraIndex === 0) return "md:col-span-6 md:row-span-24 md:h-[120vh]";
        if (extraIndex === 7) return "md:col-span-6 md:row-span-24 md:h-[120vh]";
        if (extraIndex === 8) return "md:col-span-6 md:row-span-12 md:h-[60vh]";
        if (extraIndex < 9) return "md:col-span-3 md:row-span-12 md:h-[60vh]";
        return "md:col-span-6 md:row-span-12 md:h-[60vh]";
      }
      
      return "md:col-span-3 md:row-span-6 md:h-[60vh]";
    }

    switch (n) {
      case 1: return "md:col-span-12 md:row-span-24 md:h-[120vh]";
      case 2: return "md:col-span-6 md:row-span-24 md:h-[120vh]";
      case 3: return index === 0 ? "md:col-span-6 md:row-span-24 md:h-[120vh]" : "md:col-span-6 md:row-span-12 md:h-[60vh]";
      case 4:
        if (index === 0) return "md:col-span-6 md:row-span-24 md:h-[120vh]";
        if (index < 3) return "md:col-span-3 md:row-span-12 md:h-[60vh]";
        return "md:col-span-6 md:row-span-12 md:h-[60vh]";
      case 5:
        if (index === 0) return "md:col-span-6 md:row-span-24 md:h-[120vh]";
        return "md:col-span-3 md:row-span-12 md:h-[60vh]";
      case 6:
        if (index === 0) return "md:col-span-6 md:row-span-24 md:h-[120vh]";
        if (index < 5) return "md:col-span-3 md:row-span-12 md:h-[60vh]";
        return "md:col-span-12 md:row-span-6 md:h-[60vh]";
      case 7:
        if (index === 0) return "md:col-span-6 md:row-span-24 md:h-[120vh]";
        if (index < 5) return "md:col-span-3 md:row-span-12 md:h-[60vh]";
        return "md:col-span-6 md:row-span-12 md:h-[120vh]";
      case 8:
        if (index === 0) return "md:col-span-6 md:row-span-24 md:h-[120vh]";
        if (index < 5) return "md:col-span-3 md:row-span-12 md:h-[60vh]";
        return "md:col-span-4 md:row-span-12 md:h-[120vh]";
      case 9:
        if (index === 0) return "md:col-span-6 md:row-span-24 md:h-[120vh]";
        if (index === 7) return "md:col-span-6 md:row-span-24 md:h-[120vh]";
        if (index === 8) return "md:col-span-6 md:row-span-12 md:h-[60vh]";
        if (index < 9) return "md:col-span-3 md:row-span-12 md:h-[60vh]";
        return "md:col-span-6 md:row-span-12 md:h-[60vh]";
      default: return "md:col-span-3 md:row-span-6 md:h-[60vh]";
    }
  };

  const isVideo = (src) => /\.(mp4|webm|ogg|mov)$/i.test(src);

  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-24 gap-2">
        {content.map((src, index) => (
          <div
            key={index}
            className={`cursor-pointer overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 ${getLayoutClasses(content.length, index)}`}
            onClick={() => onItemClick(src, index)}
          >
            {isVideo(src) ? (
              <video
                src={src}
                className="w-full h-full object-cover"
                preload="metadata"
                muted
                autoPlay
                loop
                playsInline
              />
            ) : (
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdaptiveGallery