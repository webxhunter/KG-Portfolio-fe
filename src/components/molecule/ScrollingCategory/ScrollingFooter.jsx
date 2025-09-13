"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import footerIcon from "@/Assets/Home/home-footer-icon.png";
import AOS from "aos";
import "aos/dist/aos.css";

const ScrollingFooter = () => {
  const containerRef = useRef(null);

  const categories = [
    "Cinematography",
    "Event Coverage", 
    "Music Videos",
    "Commercial Films",
    "Wedding Films",
    "Short Films",
    "Corporate Videos",
    "Storytelling Visuals",
  ];

  useEffect(() => {
    AOS.init({
      duration: 100,
      once: true,
      easing: 'ease-out-cubic',
    });

    // Set up the animation after component mounts
    if (containerRef.current) {
      const scrollContent = containerRef.current.firstElementChild;
      const scrollWidth = scrollContent.scrollWidth / 2; // Divide by 2 because we duplicate content
      
      containerRef.current.style.setProperty('--scroll-width', `${scrollWidth}px`);
    }
  }, []);

  return (
    <>
      <style jsx>{`
        .scroll-wrapper {
          overflow: hidden;
          position: relative;
        }

        .scroll-container {
          display: flex;
          width: fit-content;
          animation: infinite-scroll 30s linear infinite;
        }

        .scroll-container:hover {
          animation-play-state: paused;
        }

        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * var(--scroll-width, 0px)));
          }
        }

        .scroll-content {
          display: flex;
          flex-shrink: 0;
        }

        .scroll-item {
          display: flex;
          align-items: center;
          padding: 0 2rem;
          white-space: nowrap;
          flex-shrink: 0;
          min-width: fit-content;
        }

        /* Variants for different speeds */
        .scroll-fast {
          animation-duration: 15s;
        }

        .scroll-slow {
          animation-duration: 45s;
        }

        .scroll-reverse {
          animation-direction: reverse;
          animation-duration: 25s;
        }
      `}</style>

      <div 
        className="bg-[#0E0E10] border-t border-b border-[#1C1C21] py-3 scroll-wrapper"
        data-aos="fade-in"
        data-aos-duration="500"
      >
        <div ref={containerRef} className="scroll-container">
          <div className="scroll-content">
            {/* First complete set */}
            {categories.map((category, index) => (
              <div
                key={`original-${index}`}
                className="scroll-item text-white uppercase text-sm font-medium tracking-wide"
              >
                <Image
                  src={footerIcon}
                  alt=""
                  width={24}
                  height={24}
                  className="mr-3 filter brightness-110"
                />
                {category}
              </div>
            ))}
          </div>

          <div className="scroll-content">
            {/* Duplicate set for seamless loop */}
            {categories.map((category, index) => (
              <div
                key={`duplicate-${index}`}
                className="scroll-item text-white uppercase text-sm font-medium tracking-wide"
              >
                <Image
                  src={footerIcon}
                  alt=""
                  width={24}
                  height={24}
                  className="mr-3 filter brightness-110"
                />
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollingFooter;