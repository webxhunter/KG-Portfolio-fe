'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/navigation';
import Hls from 'hls.js';
import CinematographyHeader from '@/components/pages/Cinematography/CinematographyHeader';
import MediaGrid from '@/components/pages/Cinematography/MediaGrid ';
import ScrollingFooter from '@/components/molecule/ScrollingCategory/ScrollingFooter';
import ImageGallery from '@/components/pages/Blogs/ImageCollage';

const categories = [
  { key: "Brand in Frame", label: "Brand in Frame" },
  { key: "Self Initiated Stories", label: "Self Initiated Stories" },
  { key: "Couple", label: "Couple" },
  { key: "Food", label: "Food"},
  { key: "Event", label: "Event"},
  { key: "Fashion Photography", label: "Fashion Cinematography" },
];

const serviceLinks = {
  "Self Initiated Stories": "/cinematography/self-initiated",
  "Couple": "/cinematography/together-forever",
  "Event": "/cinematography/revel-rhythm",
  "Food": "/cinematography/taste-meet-frames",
  "Brand in Frame": "/cinematography/brand-in-frame",
  "Fashion Photography": "/cinematography/frame-worthy",
};

const getMediaType = (filename) => {
  if (!filename) return 'image';
  const ext = filename.split('.').pop().toLowerCase();
  if (["mp4", "webm", "mov", "avi", "mkv", "m3u8"].includes(ext)) return 'video';
  return 'image';
};

// Custom Video Component with HLS support
const HLSVideoPlayer = ({ src, className, onLoadedData, ...props }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const initializeVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const videoSrc = src.startsWith("http") 
      ? src 
      : `${process.env.NEXT_PUBLIC_API_URL}/${src}`;

    // Handle native HLS support (Safari)
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
      video.addEventListener('loadeddata', () => {
        setIsLoaded(true);
        if (onLoadedData) onLoadedData();
      }, { once: true });
    } 
    // Handle HLS.js for other browsers
    else if (Hls.isSupported()) {
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
        if (onLoadedData) onLoadedData();
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
    // Fallback for browsers that don't support HLS
    else {
      video.src = videoSrc;
      video.addEventListener('loadeddata', () => {
        setIsLoaded(true);
        if (onLoadedData) onLoadedData();
      }, { once: true });
    }
  }, [src, onLoadedData]);

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
    <video
      ref={videoRef}
      className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      autoPlay
      muted
      loop
      playsInline
      {...props}
    />
  );
};

const Cinematography = () => {
  const [mediaMap, setMediaMap] = useState({});
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchMedia = async () => {
      if (!API_URL) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/cinematography`, {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const { data } = response;
        const map = {};
        
        if (Array.isArray(data)) {
          data.forEach(item => {
            if (item.location === 'main' && item.category && item.video_hls_path) {
              // Store the relative path, HLSVideoPlayer will handle the full URL construction
              map[item.category] = {
                url: `${process.env.NEXT_PUBLIC_API_URL}/${item.video_hls_path}`,
                type: getMediaType(item.video_hls_path),
              };
            }
          });
        }
        
        setMediaMap(map);
      } catch (err) {
        console.error('Error fetching cinematography data:', err);
        setMediaMap({});
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [API_URL]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ 
      duration: 800, 
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const handleMediaClick = (index) => {
    const category = categories[index];
    // Navigate to service link for videos
    router.push(serviceLinks[category.key]);
  };

  return (
    <>
      <section className="py-20 text-white bg-black min-h-screen" data-aos="fade-in">
        <CinematographyHeader />
        
        <MediaGrid 
          categories={categories}
          mediaMap={mediaMap}
          onMediaClick={handleMediaClick}
          loading={loading}
          HLSVideoPlayer={HLSVideoPlayer} // Pass the HLS component to MediaGrid
        />
      </section>

      <ScrollingFooter categories={categories} />
      
      <ImageGallery />
    </>
  );
};

export default Cinematography;