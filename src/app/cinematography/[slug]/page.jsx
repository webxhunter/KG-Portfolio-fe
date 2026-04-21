"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import NavigationButtons from "@/components/common/NavigationButtons";
import VideoHero from "@/components/common/VideoHero";
import VideoGallery from "./VideoGallery";
import ScrollingFooter from "@/components/molecule/ScrollingCategory/ScrollingFooter";
import ImageCollage from "@/components/pages/Blogs/ImageCollage";
import { CloudCog } from "lucide-react";

const convertToTitleCase = (str) =>
  str
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") || "";

export default function SelfInitiatedVideoPage() {
  const params = useParams();
  const slug = params.slug;
  const [images, setImages] = useState([]);
  const [hero, setHero] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/cinematography/gallery`, {
        timeout: 10000,
        headers: { "Content-Type": "application/json" },
      });

      if (Array.isArray(res.data)) {
        const filteredImages = res.data
          .filter(
            (item) =>
              item.location === "gallery" &&
              item.category === slug &&
              item.image_url,
          )
          .map((item) =>
            item.image_url.startsWith("http")
              ? item.image_url
              : `${API_URL}/uploads/${item.image_url}`,
          );

        const mainImage = res.data.find(
          (item) =>
            item.location === "hero" &&
            item.category === slug &&
            item.image_url,
        );

        setHero(mainImage ? `${API_URL}/uploads/${mainImage.image_url}` : null);
        setImages(filteredImages);
      }
    } catch (e) {
      console.error("Error fetching gallery:", e);
    }
  };
  useEffect(() => {
    fetchGallery();
  }, [slug]);
console.log("hero",hero);
  return (
    <div className="bg-black text-white min-h-screen">
      <section
        className="py-12 px-4 sm:px-8 md:px-12 lg:px-16"
        data-aos="fade-in"
      >
        <NavigationButtons type />
        <VideoHero
          defaultVideo={hero}
          title={`${convertToTitleCase(slug)} Stories`}
          containerClass="my-12 -mx-4 sm:-mx-8 md:-mx-12 lg:-mx-16"
        />
        <VideoGallery videos={images} />
      </section>
      <ScrollingFooter />
      <ImageCollage />
    </div>
  );
}
