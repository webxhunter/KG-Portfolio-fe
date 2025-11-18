"use client";
import React, { useRef, useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import Hls from "hls.js";

const MediaCard = ({ category, src, isVideo, index, gridClasses, onClick }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  console.log(isVideo, src);
  const initializeVideo = useCallback(() => {
    if (!isVideo || !src) return;
    
    const video = videoRef.current;
    if (!video) return;

    const videoSrc = src.startsWith("http")
      ? src
      : `${process.env.NEXT_PUBLIC_API_URL}/${src}`;

    const isHlsStream = videoSrc.includes('.m3u8') || videoSrc.includes('hls');

    if (isHlsStream) {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
        video.addEventListener('loadeddata', () => setIsLoaded(true), { once: true });
      } else if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: false,
          lowLatencyMode: true,
          backBufferLength: 90,
          maxBufferLength: 30,
          maxMaxBufferLength: 600,
          capLevelToPlayerSize: false,
          // autoStartLoad: false
        });
        
        hlsRef.current = hls;
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
          setIsLoaded(true);
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
                hlsRef.current = null;
                break;
            }
          }
        });
      } else {
        video.src = videoSrc;
        video.addEventListener('loadeddata', () => setIsLoaded(true), { once: true });
      }
    } else {
      video.src = videoSrc;
      video.addEventListener('loadeddata', () => setIsLoaded(true), { once: true });
    }
  }, [isVideo, src]);

  useEffect(() => {
    if (isVideo) {
      initializeVideo();
    } else {
      setIsLoaded(true);
    }
    
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [initializeVideo, isVideo]);

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
            ref={videoRef}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            preload="metadata"
            muted
            autoPlay
            loop
            playsInline
          />
        ) : (
          <Image
            src={src}
            alt={category.label}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 2}
            onLoad={() => setIsLoaded(true)}
          />
        )}
        
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
          <div className="w-full bg-black bg-opacity-70 group-hover:bg-opacity-80 transition-all duration-300">
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