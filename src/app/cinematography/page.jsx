'use client';

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/navigation';

import {Lightbox} from '@/components/pages/Photography/Lightbox';
import CinematographyHeader from '@/components/pages/Cinematography/CinematographyHeader';
import MediaGrid from '@/components/pages/Cinematography/MediaGrid ';
import ScrollingFooter from '@/components/molecule/ScrollingCategory/ScrollingFooter';
import ImageGallery from '@/components/pages/Blogs/ImageCollage';

// Static images
import f_img_1 from "../../assets/BrandInFrame/f-img-1.png";
import f_img_2 from "../../assets/BrandInFrame/f-img-2.png";
import f_img_3 from "../../assets/BrandInFrame/f-img-3.png";
import f_img_4 from "../../assets/BrandInFrame/f-img-4.png";
import f_img_5 from "../../assets/BrandInFrame/f-img-5.png";
import f_img_6 from "../../assets/BrandInFrame/f-img-6.png";

import cinematography_image1 from "../../assets/Cinematography/Cinematography-img-1.png";
import cinematography_image2 from "../../assets/Cinematography/Cinematography-img-2.png";
import cinematography_image3 from "../../assets/Cinematography/Cinematography-img-3.png";
import cinematography_image4 from "../../assets/Cinematography/Cinematography-img-4.png";
import cinematography_image5 from "../../assets/Cinematography/Cinematography-img-5.png";
import cinematography_image6 from "../../assets/Cinematography/Cinematography-img-6.png";

const categories = [
  { key: "Brand in Frame", label: "Brand in Frame", staticImg: cinematography_image1 },
  { key: "Self Initiated Stories", label: "Self Initiated Stories", staticImg: cinematography_image2 },
  { key: "Couple", label: "Couple", staticImg: cinematography_image3 },
  { key: "Food", label: "Food", staticImg: cinematography_image4 },
  { key: "Event", label: "Event", staticImg: cinematography_image5 },
  { key: "Fashion Photography", label: "Fashion Cinematography", staticImg: cinematography_image6 },
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
      return {
        src: cat.staticImg,
        type: 'image',
        label: cat.label,
        originalIndex: index,
      };
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