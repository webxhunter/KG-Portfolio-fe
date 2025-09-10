'use client';

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/navigation';
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

const footerImages = [f_img_1, f_img_2, f_img_3, f_img_4, f_img_5, f_img_6];

const getMediaType = (filename) => {
  if (!filename) return 'image';
  const ext = filename.split('.').pop().toLowerCase();
  if (["mp4", "webm", "mov", "avi", "mkv"].includes(ext)) return 'video';
  return 'image';
};

const Cinematography = () => {
  const [mediaMap, setMediaMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Prepare gallery for Lightbox (only images)
  const galleryMedia = categories
    .map((cat, index) => {
      const backend = mediaMap[cat.key];
      if (backend && backend.url && backend.type === 'image') {
        return {
          src: backend.url,
          type: backend.type,
          label: cat.label,
          originalIndex: index,
        };
      }
      // Always include static images for lightbox
      
    })
    .filter(item => item.type === 'image'); // Only images in lightbox

  // Fetch media data
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
            if (item.location === 'main' && item.category && item.video_url) {
              map[item.category] = {
                url: `${API_URL}/uploads/${item.video_url}`,
                type: getMediaType(item.video_url),
              };
            }
          });
        }
        
        setMediaMap(map);
      } catch (err) {
        console.error('Error fetching cinematography data:', err);
        setError(err.message);
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
        />
      </section>

      

      <ScrollingFooter categories={categories} />
      
      <ImageGallery images={footerImages} />
    </>
  );
};

export default Cinematography;