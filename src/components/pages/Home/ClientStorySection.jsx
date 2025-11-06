"use client";
import React, { useRef, useEffect, useCallback, useState } from "react";
import Image from "next/image";
import Hls from "hls.js";
import clientImg2 from "@/Assets/Home/home-clientstory-img-2.png";
import storyPattern from "@/Assets/Home/home-clientstory-bgborder.png";

const ClientStorySection = ({ clientVideo }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const initializeVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video || !clientVideo?.url) return;

    const videoSrc = clientVideo.url.startsWith("http")
      ? clientVideo.url
      : `${process.env.NEXT_PUBLIC_API_URL}${clientVideo.url}`;

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
      });
      
      hlsRef.current = hls;
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const levels = hls.levels;
        let targetLevel = levels.findIndex(level => level.height === 1080 || level.height === 720);
        
        if (targetLevel === -1) {
          targetLevel = levels.reduce((best, level, index) => 
            level.height <= 1080 && level.height > levels[best].height ? index : best
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
    } else {
      video.src = videoSrc;
      video.addEventListener('loadeddata', () => setIsLoaded(true), { once: true });
    }
  }, [clientVideo?.url]);

  useEffect(() => {
    initializeVideo();
    
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [initializeVideo]);

  return (
    <section className="py-12 bg-black text-white overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4">
        <h6 className="text-sm md:text-base text-gray-400 mb-2" data-aos="fade-up" data-aos-delay="200">
          STORY
        </h6>
        <h2 className="text-3xl sm:text-5xl font-semibold uppercase mb-8 sm:mb-12 break-words" data-aos="fade-up" data-aos-delay="300">
          CLIENT STORY
        </h2>

        <div className="rounded-2xl overflow-hidden" data-aos="fade-up" data-aos-delay="400">
          {clientVideo?.url ? (
            <video
              ref={videoRef}
              className={`w-full h-[40vh] sm:h-[70vh] object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <div className="w-full h-[40vh] sm:h-[70vh] flex items-center justify-center bg-gray-900">
              <p>No client video available.</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full my-2 md:my-4" data-aos="fade-up">
        <Image src={storyPattern} alt="Decorative pattern" className="w-full h-auto" width={1920} height={100} />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4" data-aos="fade-right" data-aos-delay="500">
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed break-words">
              <span className="text-yellow-400">Kamal's</span> journey with
              <span className="text-yellow-400"> Dishoom Café </span> started with
              equal parts courage and creativity. He first approached the team
              by showcasing his personal portfolio — a mix of cinematic
              storytelling and visual flair that instantly caught their eye.
              Instead of pitching with big promises, he simply offered to do a{" "}
              <span className="text-yellow-400">free cinematography shoot</span>,
              confidently saying, "Let me show you what Dishoom feels like
              through my lens." Impressed by his enthusiasm, the team welcomed
              him in.
            </p>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed break-words">
              With his camera as the storyteller, Kamal captured the heart of
              Dishoom — chefs passionately crafting every dish, the clatter
              and rhythm of the kitchen, and the joyful faces of staff serving
              guests with genuine warmth. The final film wasn't just a shoot;
              it was a visual celebration of Dishoom's soul. When the team
              watched the finished piece, they were blown away — what began as
              a bold offer turned into a story so good, it almost deserved a
              spot on the menu.{" "}
            </p>
          </div>
          <div className="lg:col-span-1 w-full" data-aos="fade-left" data-aos-delay="600">
            <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden">
              <Image src={clientImg2} alt="Client Story" className="w-full h-full object-cover" width={400} height={384} />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full my-2 md:my-4" data-aos="fade-up">
        <Image src={storyPattern} alt="Decorative pattern" className="w-full h-auto" width={1920} height={100} />
      </div>
    </section>
  );
};

export default ClientStorySection;