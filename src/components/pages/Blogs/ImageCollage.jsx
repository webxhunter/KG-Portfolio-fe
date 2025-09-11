'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const ImageCollage = () => {
  const [images, setImages] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${API_URL}/api/footerimage`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setImages(data.slice(0, 6));
        }
      } catch (e) {
        console.error("Error fetching images:", e);
      }
    };
    fetchImages();
  }, [API_URL]);

  if (images.length === 0) return null;

  const imagePositions = [
    // First image - cut corner with clip-path
    "absolute top-0 left-0 rounded-lg md:rounded-2xl z-30 object-cover w-[50%] h-[45%] sm:w-[52%] sm:h-[62%] md:w-[49%] md:h-[62%] lg:w-[49%] lg:h-[62%] ",
    "absolute left-0 rounded-lg md:rounded-2xl z-20 object-cover top-[47%] w-[16%] h-[20%] sm:top-[63%] sm:w-[17%] sm:h-[23%] md:top-[63%] md:w-[15%] md:h-[24%] lg:top-[64.5%] lg:w-[17%] lg:h-[24.5%]",
    "absolute rounded-lg md:rounded-2xl z-30 object-cover top-[23%] left-[16%] w-[50%] h-[48%] sm:top-[26%] sm:left-[19%] sm:w-[34%] sm:h-[63%] md:top-[29%] md:left-[15%] md:w-[39%] md:h-[62%] lg:top-[27.8%] lg:left-[17.2%] lg:w-[39%] lg:h-[63%] xl:w-[41%] border-3 md:border-6 lg:border-9 border-[#000]",
    // // Fourth image - cut corner with clip-path
    "absolute top-0 rounded-lg md:rounded-2xl z-20 object-cover right-[20%] w-[28%] h-[69%] sm:right-[19%] sm:w-[30%] sm:h-[87%] md:right-[18.8%] md:w-[31%] md:h-[87%] lg:right-[18.4%] lg:w-[32%] lg:h-[90%] ",
    "absolute top-0 right-0 rounded-lg md:rounded-2xl z-10 object-cover w-[19%] h-[27%] sm:w-[18%] sm:h-[36%] md:w-[17.5%] md:h-[39%] lg:w-[17.2%] lg:h-[37.8%]",
    "absolute right-0 rounded-lg md:rounded-2xl z-20 object-cover top-[29%] w-[19%] h-[40%] sm:top-[41%] sm:w-[18%] sm:h-[47%] md:top-[41.5%] md:w-[17.5%] md:h-[47%] lg:top-[42.2%] lg:w-[17.2%] lg:h-[46.7%]"
  ];

  return (
    <div className="bg-black py-2 px-6 md:px-[6rem] md:py-10">
      <div className="relative max-w-[1280px] mx-auto px-4 h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]">
        {images.map((image, index) => (
          <Image
            key={image.id}
            src={`${API_URL}/uploads/${image.image_url}`}
            alt=""
            width={500}
            height={500}
            className={imagePositions[index]}
          />
         ))} 
      </div>
    </div>
  );
};

export default ImageCollage;