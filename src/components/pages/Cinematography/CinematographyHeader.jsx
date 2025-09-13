import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import photoicon from "../../../Assets/Photography/AbstractDesign.png";

const CinematographyHeader = () => {
  return (
    <div className="container mx-auto px-4 text-center mb-20 max-w-6xl">
    <h5 
      className="mb-12 text-3xl md:text-4xl font-light tracking-wider"
      style={{ color: '#FFD755' }}
      data-aos="fade-up" 
      data-aos-delay="200"
    >
      CINEMATOGRAPHY
    </h5>
    <div className="relative">
        <div
          className="flex absolute  md:left-[18%] -top-[20%] md:-top-[60%] justify-start"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <Image
            src={photoicon}
            alt="Abstract Design Icon"
            className="w-auto h-auto"
          />
        </div>

        <h2
          className="font-bold relative mb-6 text-[34px] sm:text-[48px] leading-tight text-left sm:text-center"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Framing stories one click at a time
        </h2>
      </div>
    
   
    
    <p 
      className="mb-8 text-gray-400 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto text-left sm:text-center" 
      data-aos="fade-up" 
      data-aos-delay="500"
    >
      Every frame is a feeling, every click a chapter. From vows to vibrant meals, from brands to 
      beautiful glances—we capture what words can't express.
    </p>
    
    <Link href="/#contact" data-aos="fade-up" data-aos-delay="600">
    <button
            className="group inline-flex items-center gap-3  rounded-full px-6 py-3 text-white font-medium tracking-wide transition-all duration-300 hover:bg-white hover:text-black mt-2 sm:mt-0"
            style={{ boxShadow: "4px 4px 17.4px 0px #FFFFFF47 inset" }}
          >
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="7 6 18 6 18 17" />
            </svg>
            BOOK A CALL
          </button>
    </Link>
  </div>
  );
};

export default CinematographyHeader;