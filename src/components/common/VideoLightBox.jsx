"use client";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Hls from "hls.js";

const VideoLightBox = ({ open, src, onClose, onNext, onPrev, showNav }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isVideo = /\.(mp4|webm|ogg|mov|m3u8)$/i.test(src || "") || (src && src.includes('hls'));

  const initializeVideo = () => {
    if (!isVideo || !src || !videoRef.current) return;

    const video = videoRef.current;
    const videoSrc = src.startsWith("http") ? src : `${process.env.NEXT_PUBLIC_API_URL}/${src}`;
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
          maxMaxBufferLength: 600
        });
        
        hlsRef.current = hls;
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
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
      video.src = videoSrc;
      video.addEventListener('loadeddata', () => setIsLoaded(true), { once: true });
    }
  };

  useEffect(() => {
    const handleKeydown = (e) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && showNav) onPrev();
      if (e.key === "ArrowRight" && showNav) onNext();
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [open, showNav, onClose, onNext, onPrev]);

  useEffect(() => {
    if (open && src) {
      setIsLoaded(false);
      if (isVideo) {
        initializeVideo();
      } else {
        setIsLoaded(true);
      }
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [open, src, isVideo]);

  useEffect(() => {
    if (open && isVideo && src && videoRef.current && isLoaded) {
      videoRef.current.onended = onNext;
    }
  }, [open, src, isVideo, onNext, isLoaded]);

  return (
    <Dialog open={open} onOpenChange={onClose} className="max-w-[95vw] max-h-[95vh] xl:max-w-[80vw]">
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
        <div className="relative flex items-center justify-center h-full min-h-[50vh] md:min-h-[70vh] lg:max-w-[70vw] xl:max-w-[80vw]">
          {showNav && (
            <button
              className="absolute left-4 z-10 text-white text-4xl hover:text-gray-300 transition-colors"
              onClick={onPrev}
            >
              ‹
            </button>
          )}

          {isVideo ? (
            <video
              ref={videoRef}
              controls
              loop
              autoPlay
              playsInline
              muted
              className={`max-w-[65vw] md:max-w-full max-h-[65vh] transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          ) : (
            <img
              src={src}
              alt=""
              className="max-w-[45vw] max-h-[65vh] object-contain"
              onLoad={() => setIsLoaded(true)}
            />
          )}

          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {showNav && (
            <button
              className="absolute right-4 z-10 text-white text-4xl hover:text-gray-300 transition-colors"
              onClick={onNext}
            >
              ›
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoLightBox;