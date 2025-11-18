import { useEffect, useRef, useState, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Hls from "hls.js";

const VideoLightBox = ({ open, isVideo, src, onClose, onNext, onPrev, showNav }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);

  const cleanupVideo = useCallback(() => {
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute('src');
      videoRef.current.load();
    }
  }, []);

  const initializeVideo = useCallback(() => {
    if (!isVideo || !src || !videoRef.current || !open) return;

    cleanupVideo();

    const video = videoRef.current;
    const isHlsStream = src.includes('.m3u8') || src.includes('hls');

    if (isHlsStream) {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
        video.addEventListener('canplay', () => {
          setIsMediaLoaded(true);
          video.play().catch(console.error);
        }, { once: true });
      } else if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 90,
          maxBufferLength: 30,
          maxMaxBufferLength: 600,
        });

        hlsRef.current = hls;
        hls.loadSource(src);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          const levels = hls.levels;
          let targetLevel = levels.findIndex(l => l.height === 1080 || l.height === 720);
          
          if (targetLevel === -1) {
            targetLevel = levels.reduce((best, level, idx) =>
              level.height <= 1080 && level.height > levels[best].height ? idx : best, 0
            );
          }

          hls.currentLevel = targetLevel;
          hls.loadLevel = targetLevel;
        });

        hls.on(Hls.Events.LEVEL_LOADED, () => {
          setIsMediaLoaded(true);
          video.play().catch(console.error);
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
                cleanupVideo();
                break;
            }
          }
        });
      }
    } else {
      video.src = src;
      video.addEventListener('canplay', () => {
        setIsMediaLoaded(true);
        video.play().catch(console.error);
      }, { once: true });
    }
  }, [isVideo, src, open, cleanupVideo]);

  useEffect(() => {
    if (open && src) {
      setIsMediaLoaded(false);
      if (isVideo) {
        const timer = setTimeout(initializeVideo, 2);
        return () => clearTimeout(timer);
      }
    }
  }, [open, src, isVideo, initializeVideo]);

  useEffect(() => { 
    if (!open) {
      cleanupVideo();
      setIsMediaLoaded(false);
    }
  }, [open, cleanupVideo]);

  useEffect(() => {
    if (!open) return;

    const handleKeydown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && showNav && onPrev) onPrev();
      if (e.key === "ArrowRight" && showNav && onNext) onNext();
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [open, showNav, onClose, onNext, onPrev]);

  useEffect(() => {
    if (!open || !isVideo || !videoRef.current || !onNext || !showNav) return;

    const handleEnded = () => onNext();
    const video = videoRef.current;
    
    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [open, isVideo, onNext, showNav]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle className="sr-only">
        {isVideo ? "Video Player" : "Image Viewer"}
      </DialogTitle>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
        <div className="relative flex items-center justify-center h-full min-h-[50vh] md:min-h-[70vh]">
          
          {showNav && onPrev && (
            <button
              className="absolute left-4 z-20 text-white text-4xl hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-full p-2"
              onClick={onPrev}
              aria-label="Previous"
            >
              ‹
            </button>
          )}

          {!isMediaLoaded && open && (
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin" />
                <p className="text-gray-400 text-sm">Loading...</p>
              </div>
            </div>
          )}

          {isVideo ? (
            <video
              ref={videoRef}
              controls
              loop
              autoPlay
              playsInline
              preload="metadata"
              muted
              className={`max-w-full max-h-[80vh] transition-opacity duration-300 ${
                isMediaLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <img
              src={src }
              alt="Media content"
              className={`max-w-[90vw] max-h-[80vh] object-contain transition-opacity duration-300 ${
                isMediaLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsMediaLoaded(true)}
              onError={() => setIsMediaLoaded(true)}
            />
          )}

          {showNav && onNext && (
            <button
              className="absolute right-4 z-20 text-white text-4xl hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-full p-2"
              onClick={onNext}
              aria-label="Next"
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