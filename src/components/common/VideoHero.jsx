"use client";
import { useRef, useEffect, useCallback, useState } from "react";
import Hls from "hls.js";

export default function VideoHero({ media, defaultVideo, title }) {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const videoSrc = media?.['hero']?.media_type === 'video'
    ? `${process.env.NEXT_PUBLIC_API_URL}${media['hero'].file_path}`
    : defaultVideo;

  const titleParts = title.split(' ');
  const firstWord = titleParts[0] || '';
  const restOfTitle = titleParts.slice(1).join(' ');

  const initializeVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    const src = videoSrc.startsWith("http") ? videoSrc : `${process.env.NEXT_PUBLIC_API_URL}/${videoSrc}`;
    const isHlsStream = src.includes('.m3u8') || src.includes('hls');

    if (isHlsStream) {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
        video.addEventListener('loadeddata', () => setIsLoaded(true), { once: true });
      } else if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: false,
          lowLatencyMode: true,
          backBufferLength: 90,
          maxBufferLength: 30,
          maxMaxBufferLength: 600,
          capLevelToPlayerSize: false,
          autoStartLoad: false
        });
        
        hlsRef.current = hls;
        hls.loadSource(src);
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
          video.play().catch(() => {});
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
      }
    } else {
      video.src = src;
      video.addEventListener('loadeddata', () => setIsLoaded(true), { once: true });
    }
  }, [videoSrc]);

  useEffect(() => {
    setIsLoaded(false);
    initializeVideo();
    
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [initializeVideo]);

  return (
    <div className="container mx-auto my-12 px-4" data-aos="fade-up" data-aos-delay="100">
      <div className="relative text-white overflow-hidden rounded-2xl shadow-2xl h-[60vh] max-h-[650px]">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline 
          className={`absolute w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent"></div>
        <div className="absolute bottom-8 left-8">
          <h1 className="text-3xl md:text-5xl font-light text-white tracking-wide capitalize">
            <span className="font-serif italic text-yellow-300 mr-2">{firstWord}</span>
            <span>{restOfTitle}</span>
          </h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-yellow-300 to-transparent mt-4"></div>
        </div>
      </div>
    </div>
  );
}