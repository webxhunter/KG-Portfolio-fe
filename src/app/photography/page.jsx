"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import { PhotoHero } from "@/components/pages/Photography/PhotoHero";
import { PhotoGrid } from "@/components/pages/Photography/PhotoGrid";
import ScrollingFooter from "@/components/molecule/ScrollingCategory/ScrollingFooter";
import ImageCollage from "@/components/pages/Blogs/ImageCollage";
import GlobalLoader from "@/components/GlobalLoader";

export const categories = [
  { key: "Food", label: "Food", col: 4, url: "/taste-meet-frames" },
  { key: "Brand in Frame", label: "Brand in Frame", col: 4, url: "/brand-in-frame" },
  { key: "Self Initiated Stories", label: "Self Initiated Stories", col: 4, url: "/self-initiated" },
  { key: "Couple", label: "Couple", col: 6, url: "/together-forever" },
  { key: "Models", label: "Models", col: 6, url: "/models" },
  { key: "Events", label: "Events", col: 12, url: "/events" },
];

const Photography = () => {
  const [imageMap, setImageMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  useEffect(() => {
    const fetchImages = async () => {
      if (!API_URL) { setLoading(false); return; }

      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/photography`, {
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        const map = {};
        if (Array.isArray(data)) {
          data.forEach((item) => {
            if (item.category && item.image_url) {
              map[item.category] = {
                url: item.image_url.startsWith("http")
                  ? item.image_url
                  : `${API_URL}/uploads/${item.image_url}`,
                type: "image",
              };
            }
          });
        }

        setImageMap(map);
      } catch (error) {
        console.error("Failed to fetch images:", error);
        setImageMap({});
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [API_URL]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
  }, []);

  const handleImageClick = (index) => {
    const category = categories[index];
    if (!category?.url) return;
    if (pathname === category.url) return;
    setIsNavigating(true);
    router.push(category.url);
  };

  return (
    <>
      {isNavigating && <GlobalLoader />}
      <section className="py-20 text-white bg-black min-h-screen" data-aos="fade-in">
        <PhotoHero />
        <div className="container mx-auto px-4">
          <PhotoGrid
            categories={categories}
            images={imageMap}
            onImageClick={handleImageClick}
            loading={loading}
          />
        </div>
      </section>

      <ScrollingFooter categories={categories} />
      <ImageCollage />
    </>
  );
};

export default Photography;