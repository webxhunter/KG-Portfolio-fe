"use client";
import React from "react";
import Image from "next/image";
import footerIcon from "@/Assets/Home/home-footer-icon.png";

const ScrollingFooter = () => {
    const categories = [
      "Event Photography",
      "Comercial Photography",
      "Product Photography",
      "Wedding Photography",
      "Landscape Photography",
      "Branding Photography",
      "Portrait Photography",
    ];
  
    return (
      <div className="bg-[#0E0E10] border-t border-b border-[#1C1C21] py-2 overflow-hidden whitespace-nowrap">
        <div className="animate-scroll inline-block">
          {categories.concat(categories).map((category, index) => (
            <span
              key={index}
              className="inline-flex items-center mx-4 text-white uppercase text-sm"
            >
              <Image
                src={footerIcon}
                alt=""
                width={24}
                height={24}
                className="mr-2"
              />
              {category}
            </span>
          ))}
        </div>
      </div>
    );
  };

  export default ScrollingFooter;