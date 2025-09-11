'use client';

import React, { useEffect, useState } from 'react';
import { PhotoHero } from '@/components/pages/Photography/PhotoHero';
import { PhotoGrid } from '@/components/pages/Photography/PhotoGrid';
import  ScrollingFooter  from '@/components/molecule/ScrollingCategory/ScrollingFooter';
import  ImageCollage  from '@/components/pages/Blogs/ImageCollage';
import { Lightbox } from '@/components/pages/Photography/Lightbox';
import { useRouter } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Static imports for default images
import PhotographyImage1 from '@/Assets/Photography/Photography-img-1.png';
import PhotographyImage2 from '@/Assets/Photography/Photography-img-2.png';
import PhotographyImage3 from '@/Assets/Photography/Photography-img-3.png';
import PhotographyImage4 from '@/Assets/Photography/Photography-img-4.png';
import PhotographyImage5 from '@/Assets/Photography/Photography-img-5.png';
import PhotographyImage6 from '@/Assets/Photography/Photography-img-6.png';

export const categories = [
  { key: "Food", label: "Food", defaultImg: PhotographyImage1, col: 4 , url:"/taste-meet-frames"},
  { key: "Brand in Frame", label: "Brand in Frame", defaultImg: PhotographyImage2, col: 4, url:"/brand-in-frame" },
  { key: "Self Initiated Stories", label: "Self Initiated Stories", defaultImg: PhotographyImage3, col: 4, url:"/self-initiated" },
  { key: "Couple", label: "Couple", defaultImg: PhotographyImage4, col: 6, url:"/together-forever" },
  { key: "Models", label: "Models", defaultImg: PhotographyImage5, col: 6, url:"/revel-rhythm" },
  { key: "Events", label: "Events", defaultImg: PhotographyImage6, col: 12 , url:"/frame-worthy"},
];

const Photography = () => {
  const [images, setImages] = useState({});
  const router = useRouter()
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${API_URL}/api/photography`);
        const data = await response.json();
        
        const imgMap = {};
        data.forEach((item) => {
          imgMap[item.category] = item.image_url;
        });
        setImages(imgMap);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  // Prepare gallery media array
  const galleryMedia = categories.map((cat) => {
    if (images[cat.key]) {
      return {
        src: `${process.env.NEXT_PUBLIC_API_URL}/uploads/${images[cat.key]}`,
        type: 'image',
      };
    }
    return {
      src: cat.defaultImg,
      type: 'image',
    };
  });
  const handleImageClick = (index) => {
    const category = categories[index];
    if (category && category.url) {
      router.push(category.url);
    }
  };

  const handleLightboxClose = () => {
    setLightboxOpen(false);
  };

  const handlePrevious = () => {
    setLightboxIndex((lightboxIndex - 1 + galleryMedia.length) % galleryMedia.length);
  };

  const handleNext = () => {
    setLightboxIndex((lightboxIndex + 1) % galleryMedia.length);
  };

  return (
    <>
      <section className="py-20 text-white bg-black">
        <PhotoHero />
        <div className="container mx-auto px-4">
          <PhotoGrid 
            categories={categories}
            images={images}
            onImageClick={handleImageClick}
          />
        </div>
      </section>
      
      <ScrollingFooter  />
      <ImageCollage />
    
      
   
    </>
  );
};

export default Photography;