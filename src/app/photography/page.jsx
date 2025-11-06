"use client";

import React, { useEffect, useState } from "react";
import { PhotoHero } from "@/components/pages/Photography/PhotoHero";
import { PhotoGrid } from "@/components/pages/Photography/PhotoGrid";
import ScrollingFooter from "@/components/molecule/ScrollingCategory/ScrollingFooter";
import ImageCollage from "@/components/pages/Blogs/ImageCollage";
import { useRouter, usePathname } from "next/navigation";
import GlobalLoader from "@/components/GlobalLoader";
import AOS from "aos";
import "aos/dist/aos.css";

export const categories = [
  { key: "Food", label: "Food", col: 4, url: "/taste-meet-frames" },
  { key: "Brand in Frame", label: "Brand in Frame", col: 4, url: "/brand-in-frame" },
  { key: "Self Initiated Stories", label: "Self Initiated Stories", col: 4, url: "/self-initiated" },
  { key: "Couple", label: "Couple", col: 6, url: "/together-forever" },
  { key: "Models", label: "Models", col: 6, url: "/revel-rhythm" },
  { key: "Events", label: "Events", col: 12, url: "/frame-worthy" },
];

const Photography = () => {
  const [images, setImages] = useState({});
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

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
        console.error("Failed to fetch images:", error);
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

  const handleImageClick = (index) => {
    const category = categories[index];
    if (category?.url) {
      if (pathname === category.url) return;
      setIsNavigating(true);
      router.push(category.url);
    }
  };

  return (
    <>
      {isNavigating && <GlobalLoader />}
      <section className="py-20 text-white bg-black">
        <PhotoHero />
        <div className="container mx-auto px-4">
          <PhotoGrid categories={categories} images={images} onImageClick={handleImageClick} />
        </div>
      </section>

      <ScrollingFooter />
      <ImageCollage />
    </>
  );
};

export default Photography;