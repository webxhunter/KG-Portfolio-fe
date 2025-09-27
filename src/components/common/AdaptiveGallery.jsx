
"use client";
import React, { useRef, useEffect, useCallback, useState } from "react";
import Hls from "hls.js";

const AdaptiveGallery = ({ content, onItemClick }) => {
  const videoRefs = useRef({});
  const hlsRefs = useRef({});
  const [loadedItems, setLoadedItems] = useState(new Set());
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
  const isVideo = (src) => /\.(mp4|webm|ogg|mov|m3u8)$/i.test(src) || src.includes('hls');

  const initializeVideo = useCallback((src, index) => {
    const video = videoRefs.current[index];
    if (!video || !src) return;

    const videoSrc = src.startsWith("http") ? src : `${process.env.NEXT_PUBLIC_API_URL}/${src}`;
    const isHlsStream = videoSrc.includes('.m3u8') || videoSrc.includes('hls');

    if (isHlsStream) {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
        video.addEventListener('loadeddata', () => {
          setLoadedItems(prev => new Set(prev).add(index));
        }, { once: true });
      } else if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: false,
          lowLatencyMode: true,
          backBufferLength: 30,
          maxBufferLength: 10,
          maxMaxBufferLength: 60,
          capLevelToPlayerSize: false,
          // autoStartLoad: false
        });
        
        hlsRefs.current[index] = hls;
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          const levels = hls.levels;
          let targetLevel = levels.findIndex(level => level.height === 1080 || level.height === 720);
          
          if (targetLevel === -1) {
            targetLevel = levels.reduce((best, level, idx) => 
              level.height <= 1080 && level.height > levels[best].height ? idx : best
            , 0);
          }
          
          hls.currentLevel = targetLevel;
          hls.loadLevel = targetLevel;
          hls.startLoad();
          setLoadedItems(prev => new Set(prev).add(index));
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls.recoverMediaError();
                break;
              default:
                hls.destroy();
                delete hlsRefs.current[index];
                break;
            }
          }
        });
      }
    } else {
      video.src = videoSrc;
      video.addEventListener('loadeddata', () => {
        setLoadedItems(prev => new Set(prev).add(index));
      }, { once: true });
    }
  }, []);

  useEffect(() => {
    content.forEach((src, index) => {
      if (isVideo(src) && videoRefs.current[index]) {
        initializeVideo(src, index);
      }
    });

    return () => {
      Object.values(hlsRefs.current).forEach(hls => {
        if (hls) hls.destroy();
      });
      hlsRefs.current = {};
    };
  }, [content, initializeVideo]);

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
                ref={el => videoRefs.current[index] = el}
                className={`w-full h-full object-cover transition-opacity duration-500 ${loadedItems.has(index) ? 'opacity-100' : 'opacity-0'}`}
                preload="metadata"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
                onLoad={() => setLoadedItems(prev => new Set(prev).add(index))}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdaptiveGallery;