"use client";
import React from "react";
import Image from "next/image";
import cameraIcon from "@/Assets/AboutMe/Camera_Icon.png";

const AboutHero = ({ about, loading }) => {
  const heroImage = about?.image ? `${process.env.NEXT_PUBLIC_API_URL}${about.image}` : null;

  const stats = [
    {
      label: "Repeat clients" ,
      value: about?.happy_clients || "95",
      prefix: "%",
    },
    {
      label: "Moments",
      value: about?.photography_awards || "1,50,000",
      hideOnMobile: true,
      prefix: "+",
    },
    {
      label: "Love Stories",
      value: about?.social_media_followers || "200",
      mobileLabel: true,
      prefix: "+",
    },
   
  ];

  if (!heroImage) {
    return (
      <div className="bg-black py-5 md:py-0">
        <div className="flex items-center justify-center h-[80vh] md:h-screen">
          <div className="text-white text-center">
            {loading ? "Loading..." : "Image not available"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black py-5 md:py-0">
          <div className="bg-black hidden md:block p-6 w-[85%] rounded-br-3xl mx-auto">
            <p className="mb-1 text-[10px] uppercase tracking-wider text-gray-400">
              About
            </p>
            <h1 className="text-sm font-semibold md:text-4xl">
           
              <span className="text-yellow-400">
                {loading ? "..." : about?.name || "KAMAL GOSWAMI"}
              </span>
            </h1>
          </div> 
      <div className="relative mx-auto mt-6 h-[80vh] max-w-full overflow-hidden md:h-screen md:max-w-7xl">
       
   <Image
          src={heroImage}
          alt={about?.name || "Kamal Goswami"}
          fill
          style={{ objectFit: "cover" }}
          quality={90}
          // className="md:rounded-[60px]"
          priority
        />

        <div className="absolute top-0 left-0 z-10 w-[80%] md:max-w-md ">
          
          <div className="-mt-3 bg-black p-2 rounded-r-full md:hidden"></div>
          <div className="-mt-1 bg-black p-4 md:hidden md:p-6 w-[99%] md:w-full rounded-br-3xl md:rounded-tr-3xl">
            <div className="grid grid-cols-3 gap-4 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`rounded-lg border min-w-[2rem] md:min-w-[10rem] md:gap-2 border-[#1C1C21] bg-[#0E0E10] p-2 md:p-4 flex flex-col justify-between text-center ${
                    stat.hideOnMobile ? "hidden lg:block" : ""
                  }`}
                >
                  <h2 className="text-base font-bold md:text-3xl">
                    {loading ? "..." : stat.value}
                    {stat.prefix}
                  </h2>
                  <p className="text-[10px] text-[#797C86] md:text-sm md:whitespace-nowrap">
                    {stat.mobileLabel || stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      
        <div className="absolute bottom-0 right-0 rounded-tl-3xl bg-black p-5 text-center text-xs text-gray-400 md:text-sm">
          <div className="block md:hidden text-left">
            <p className="mb-1 text-[10px] uppercase tracking-wider text-gray-400">
              About me
            </p>
            <h1 className="text-sm font-semibold md:text-4xl">
              <span className="text-yellow-400">
                {loading ? "..." : about?.name || "KAMAL GOSWAMI"}
              </span>
            </h1>
          </div>
          
          <span className="hidden md:block">
            SCROLL DOWN TO SEE
            <br />
            MY JOURNEY
          </span>
        </div>


      </div>
        <div className="-mt-1 bg-black p-4  hidden md:block md:p-6   rounded-br-3xl md:rounded-tr-3xl md:max-w-7xl mx-auto">
            <div className="grid grid-cols-3 gap-4 ">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`rounded-lg border min-w-[2rem] md:min-w-[10rem] md:gap-2 border-[#1C1C21] bg-[#0E0E10] p-2 md:p-4 flex flex-col justify-between text-center ${
                    stat.hideOnMobile ? "hidden lg:block" : ""
                  }`}
                >
                  <h2 className="text-base font-bold md:text-3xl">
                    {loading ? "..." : stat.value}
                    {stat.prefix}
                  </h2>
                  <p className="text-[10px] text-[#797C86] md:text-sm md:whitespace-nowrap">
                    {stat.mobileLabel || stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
    </div>
  );
};

export default AboutHero;