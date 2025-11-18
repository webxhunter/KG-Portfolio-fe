"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import NavigationButtons from "@/components/common/NavigationButtons";
import VideoHero from "@/components/common/VideoHero";
import VideoGallery from "./VideoGallery";
import ScrollingFooter from '@/components/molecule/ScrollingCategory/ScrollingFooter';
import ImageCollage from '@/components/pages/Blogs/ImageCollage';

const convertToTitleCase = (str) =>
  str?.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") || "";

export default function SelfInitiatedVideoPage() {
  const params = useParams();
  const slug = params.slug;
  const [videos, setVideos] = useState([]);
  const [hero, setHero] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const fetchGallery = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await axios.get(`${API_URL}/api/cinematography/gallery`, {
        timeout: 10000,
        headers: { "Content-Type": "application/json" },
      });

      if (Array.isArray(res.data)) {
        const filteredVideos = res.data
          .filter(
            (item) =>
              item.location === "gallery" &&
              item.category === slug &&
              item.video_hls_path
          )
          .map((item) => `${API_URL}/${item.video_hls_path}`);
        
        const mainVideo = res.data.find(
          (item) =>
            item.location === "hero" && item.category === slug && item.video_hls_path
        );
        
        setHero(mainVideo ? `${API_URL}/${mainVideo.video_hls_path}` : null);
        setVideos(filteredVideos);
      }
    } catch (e) {
      console.error("Error fetching gallery:", e);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [slug]);

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="py-12 px-4 sm:px-8 md:px-12 lg:px-16" data-aos="fade-in">
        <NavigationButtons type />
        <VideoHero
          defaultVideo={hero}
          title={`${convertToTitleCase(slug)} Stories`}
          containerClass="my-12 -mx-4 sm:-mx-8 md:-mx-12 lg:-mx-16"
        />
        <VideoGallery videos={videos} isVideo={true}/>
      </section>
      <ScrollingFooter />
      <ImageCollage />
    </div>
  );
}