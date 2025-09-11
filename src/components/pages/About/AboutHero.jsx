"use client";

import React from "react";
import Image from "next/image";

import cameraIcon from "@/Assets/AboutMe/Camera_Icon.png";
import profileImg from "@/Assets/AboutMe/KamalPhotoGraphy.jpg";

const AboutHero = ({ about, aboutLoading }) => {
  const heroImage = about?.image
    ? `${process.env.NEXT_PUBLIC_API_URL}${about.image}`
    : profileImg;

  const stats = [
    {
      label: "Happy Clients",
      value: about?.happy_clients || "500+",
      prefix: "+",
      mobileLabel: "Happy Clients",
    },
    {
      label: "Photography Awards",
      value: about?.photography_awards || "10+",
      hideOnMobile: true,
      prefix: "+",
    },
    {
      label: "Social Media Followers",
      value: about?.social_media_followers || "10k+",
      mobileLabel: "Followers",
      prefix: "+",
    },
    {
      label: "Client Retention Rate",
      value: about?.client_retention_rate || "90%",
      prefix: "%",
      mobileLabel: "CRR",
    },
  ];

  return (
    <div className="bg-black py-5 md:py-0">
      <div className="relative mx-auto mt-6 h-[80vh] max-w-full overflow-hidden md:h-screen md:max-w-7xl">
        <Image
          src={heroImage}
          alt={about?.name || "Kamal Goswami"}
          layout="fill"
          objectFit="cover"
          quality={90}
          className="md:rounded-t-[60px]"
          priority
        />

        <div className="absolute top-0 left-0 z-10 w-[80%] md:max-w-3xl">
          <div className="bg-black hidden md:block p-6 w-[85%] md:[mask:radial-gradient(60px_at_right_center,#0000_98%,#000)]">
            <p className="mb-1 text-[10px] uppercase tracking-wider text-gray-400">
              About
            </p>
            <h1 className="text-sm font-semibold md:text-4xl">
              ABOUT{" "}
              <span className="text-yellow-400">
                {aboutLoading ? "..." : about?.name || "KAMAL GOSWAMI"}
              </span>
            </h1>
          </div>
          <div className="-mt-3 bg-black p-2 rounded-r-full md:hidden"></div>
          <div
            className="-mt-1 bg-black p-4 md:p-6 w-[99%] md:w-full rounded-br-3xl md:rounded-tr-3xl
               [mask:radial-gradient(80px_at_right_center,#0000_98%,#000) md:[mask:none]] "
          >
            <div className="grid grid-cols-3 gap-4 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`rounded-lg border min-w-[2rem] md:min-w-[10rem] md:gap-2 border-[#1C1C21] bg-[#0E0E10] p-2 md:p-4 flex flex-col justify-between text-center ${
                    stat.hideOnMobile ? "hidden lg:block" : ""
                  }`}
                >
                  <h2 className="text-base font-bold md:text-3xl">
                    {aboutLoading ? "..." : stat.value}
                    {stat.prefix}
                  </h2>
                  <p className="text-[10px] text-[#797C86] md:text-sm md:whitespace-nowrap">
                    {stat.label}
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
                {aboutLoading ? "..." : about?.name || "KAMAL GOSWAMI"}
              </span>
            </h1>
          </div>
          <span className="hidden md:block">
            SCROLL DOWN TO SEE
            <br />
            MY JOURNEY
          </span>
        </div>

        <div className="absolute  bottom-0 left-0 hidden md:flex items-center justify-center rounded-tr-3xl bg-black p-3 md:p-5">
          <div className="rounded-full border border-gray-700 p-2">
            <Image src={cameraIcon} alt="Camera Icon" width={32} height={32} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
