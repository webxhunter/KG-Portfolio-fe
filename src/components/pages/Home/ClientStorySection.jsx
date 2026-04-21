"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import storyPattern from "@/Assets/Home/home-clientstory-bgborder.png";
import instaicon from "@/Assets/Home/insta-icon-kg.png";

const ClientStorySection = ({ clientVideo }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const imageUrl = clientVideo?.image_url
    ? clientVideo.image_url.startsWith("http")
      ? clientVideo.image_url
      : `${process.env.NEXT_PUBLIC_API_URL}${clientVideo.image_url}`
    : null;

  return (
    <section className="py-8 bg-black text-white overflow-hidden" data-aos="fade-up">

      <div className="w-full pb-4 my-2 md:my-4" data-aos="fade-up">
        <Image src={storyPattern} alt="Decorative pattern" className="w-full h-auto" width={1920} height={100} />
      </div>

      <div className="mx-auto px-4">
        <h6 className="text-sm md:text-base text-gray-400 mb-2" data-aos="fade-up" data-aos-delay="200">
          STORY
        </h6>
        <h2 className="text-3xl sm:text-5xl font-semibold uppercase mb-8 sm:mb-12 break-words" data-aos="fade-up" data-aos-delay="300">
          CLIENT STORY
        </h2>
        <hr className="border-gray-700 mb-8" data-aos="fade-up" data-aos-delay="400" />

        {/* ── Image + Instagram capsule ── */}
        <div className="rounded-2xl overflow-hidden relative w-full h-[40vh] sm:h-[70vh]" data-aos="fade-up" data-aos-delay="400">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Client story"
              fill
              priority
              className={`object-cover transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setIsLoaded(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-900">
              <p>No client story image available.</p>
            </div>
          )}

          {/* ── Instagram capsule ── */}
          <Link
            href="https://www.instagram.com/_shotsbykg?igsh=MTd4NWg1d3FqdGR6Ng=="
            target="_blank"
            rel="noopener noreferrer"
            data-aos="fade-left"
            data-aos-delay="500"
            className="absolute bottom-4 right-0 z-20 flex items-center gap-3 bg-black/80 backdrop-blur-sm pl-4 pr-6 py-3 rounded-l-full shadow-lg hover:bg-black transition-all duration-300 hover:scale-105 group"
          >
            <Image
              src={instaicon}
              alt="Instagram"
              className="w-12 h-12 sm:w-10 sm:h-10"
            />
            <span className="text-white text-sm font-medium tracking-wide group-hover:text-gray-300 transition-colors">
              See My Work
            </span>
          </Link>
        </div>
      </div>

      <div className="w-full my-2 md:my-4 pt-4" data-aos="fade-up">
        <Image src={storyPattern} alt="Decorative pattern" className="w-full h-auto" width={1920} height={100} />
      </div>

    </section>
  );
};

export default ClientStorySection;