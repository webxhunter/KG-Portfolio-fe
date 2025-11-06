'use client';

import React from 'react';
import Image from 'next/image';
import KGLogo from '@/Assets/Home/KG-logo.png';
import BlogHeroBg from '@/Assets/Blog/blog-color-gradient.jpg';

const BlogHero = () => {
  return (
    <section className="py-5 px-5 bg-black text-white">
      <div className="text-center mb-4">
        {/* <Image
          src={KGLogo}
          alt="KG-logo"
          width={150}
          height={150}
          className="mx-auto mb-3 max-[427px]:hidden"
        /> */}
        <h1 className="text-left md:text-center text-2xl md:text-4xl font-semibold text-[#FFD755] ">
          BLOGS
        </h1>
      </div>

      <div 
        className="bg-cover bg-center bg-no-repeat h-[75vh] max-[427px]:h-[5  0vh] flex items-end justify-center text-center p-8 w-screen -ml-[50vw] left-1/2 relative"
        style={{ backgroundImage: `url(${BlogHeroBg.src})` }}
      >
        <div>
          <h2 className="text-xl md:text-3xl  mb-0 ">
            What is color grading ?
          </h2>
          <p className="text-base md:text-3xl  ">
            (And Why It Makes Your Photos Look WOW!)
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;