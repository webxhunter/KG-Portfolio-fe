'use client'
import { useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const VideoLightBox = ({ open, src, onClose, onNext, onPrev, showNav }) => {
  const videoRef = useRef(null);
  const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(src || '');

  useEffect(() => {
    const handleKeydown = (e) => {
      if (!open) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && showNav) onPrev();
      if (e.key === 'ArrowRight' && showNav) onNext();
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [open, showNav, onClose, onNext, onPrev]);

  useEffect(() => {
    if (open && isVideo && src && videoRef.current) {
      videoRef.current.onended = onNext;
    }
  }, [open, src, isVideo, onNext]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
        <div className="relative flex items-center justify-center h-full min-h-[50vh]">
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
              src={src}
              controls
              loop
              autoPlay
              preload="none"
          playsInline
              muted
              className="max-w-[45vw] max-h-[65vh]"
            />
          ) : (
            <img
              src={src}
              alt=""
              className="max-w-[45vw] max-h-[65vh] object-contain"
            />
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