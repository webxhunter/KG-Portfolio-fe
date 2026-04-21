"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter, usePathname } from "next/navigation";
import CinematographyHeader from "@/components/pages/Cinematography/CinematographyHeader";
import MediaGrid from "@/components/pages/Cinematography/MediaGrid ";
import ScrollingFooter from "@/components/molecule/ScrollingCategory/ScrollingFooter";
import ImageGallery from "@/components/pages/Blogs/ImageCollage";
import GlobalLoader from "@/components/GlobalLoader";

const categories = [
  { key: "Brand in Frame", label: "Brand in Frame" },
  { key: "Self Initiated Stories", label: "Self Initiated Stories" },
  { key: "Couple", label: "Couple" },
  { key: "Food", label: "Food" },
  { key: "Event", label: "Event" },
  { key: "Fashion Photography", label: "Fashion Cinematography" },
];

const serviceLinks = {
  "Self Initiated Stories": "/cinematography/self-initiated",
  Couple: "/cinematography/together-forever",
  Event: "/cinematography/revel-rhythm",
  Food: "/cinematography/taste-meet-frames",
  "Brand in Frame": "/cinematography/brand-in-frame",
  "Fashion Photography": "/cinematography/frame-worthy",
};

const Cinematography = () => {
  const [mediaMap, setMediaMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  useEffect(() => {
    const fetchMedia = async () => {
      if (!API_URL) { setLoading(false); return; }

      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}/api/cinematography`, {
          timeout: 10000,
          headers: { "Content-Type": "application/json" },
        });

        const map = {};

        if (Array.isArray(data)) {
          data.forEach((item) => {
            if (item.location === "main" && item.category && item.image_url) {
              map[item.category] = {
                url: item.image_url.startsWith("http")
                  ? item.image_url
                  : `${API_URL}/uploads/${item.image_url}`,
                type: "image",
              };
            }
          });
        }

        setMediaMap(map);
      } catch (err) {
        console.error("Error fetching cinematography data:", err);
        setMediaMap({});
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [API_URL]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
  }, []);

  const handleMediaClick = (index) => {
    const category = categories[index];
    const href = serviceLinks[category.key];
    if (pathname === href) return;
    setIsNavigating(true);
    router.push(href);
  };

  return (
    <>
      {isNavigating && <GlobalLoader />}
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

      <ImageGallery />
    </>
  );
};

export default Cinematography;