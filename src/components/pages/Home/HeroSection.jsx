"use client";
import React, { useRef, useEffect, useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Hls from "hls.js";
import logo from "@/Assets/Home/KG-logo.png";
import instaicon from "@/Assets/Home/insta-icon-kg.png";

const HeroSection = ({ heroVideo }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const initializeVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video || !heroVideo?.video_hls_path) return;

    const videoSrc = heroVideo.video_hls_path.startsWith("http")
      ? heroVideo.video_hls_path
      : `${process.env.NEXT_PUBLIC_API_URL}/${heroVideo.video_hls_path}`;

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
    } else {
      video.src = videoSrc;
      video.addEventListener('loadeddata', () => setIsLoaded(true), { once: true });
    }
  }, [heroVideo?.video_hls_path]);

  useEffect(() => {
    initializeVideo();
    
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [initializeVideo]);

  if (!heroVideo?.video_hls_path) return null;

  return (
    <section data-aos="fade-in">
      <div className="container mx-auto px-4 pt-12">
        <div className="relative flex flex-col items-center justify-center sm:justify-start sm:flex-row sm:items-center text-white min-h-[calc(100vh-120px)]">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover rounded-3xl md:rounded-[50px] transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />

          <div className="absolute inset-0 bg-black/70 rounded-3xl md:rounded-[50px]" />

          <div
            className="absolute bottom-0 right-0 text-gray-400 bg-black px-3 py-2 rounded-tl-xl z-20 text-xs sm:text-sm sm:px-5 sm:py-4 sm:rounded-tl-2xl"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            SCROLL DOWN TO SEND
            <br />
            ME A MESSAGE
          </div>

          <div
            className="relative z-20 p-2 md:p-5 max-w-xl text-left md:ml-16"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <div className="mb-4 hidden sm:block">
              <Image src={logo} alt="Logo" width={200} height={70} priority />
            </div>
            <div className="mt-[32vh] md:mt-0">
              <p className="text-base font-light text-gray-300 mb-3 md:mb-6 sm:text-xl">
                {heroVideo.description}
              </p>
              <Link 
                href="/#contact"
                className="inline-flex items-center gap-3 px-6 py-2 text-sm md:px-7 md:py-3 md:text-base rounded-full bg-gradient-to-br from-gray-800 to-black text-gray-300 font-normal transition-all duration-300 hover:from-gray-700 hover:to-gray-900 hover:text-white"
              >
                <svg
                  className="w-5 h-5 stroke-current stroke-2 fill-none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <line x1="6" y1="18" x2="18" y2="6" />
                  <polyline points="7 6 18 6 18 17" />
                </svg>
                Contact Me
              </Link>
            </div>
          </div>

          <Link
            href="https://www.instagram.com/_shotsbykg?igsh=MTd4NWg1d3FqdGR6Ng=="
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-1/4 right-0 -translate-y-1/2 z-30 bg-black p-3 sm:px-6 sm:py-5 rounded-l-full shadow-lg transition-transform hover:scale-105"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <Image
              src={instaicon}
              alt="Instagram"
              className="w-10 h-10 sm:w-14 sm:h-14"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;