"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import imgStory from "@/Assets/Home/Self Initiated Stories.png";
import imgWedding from "@/Assets/Home/wedding.png";
import imgRevel from "@/Assets/Home/Revel & Rhythm.png";
import imgFood from "@/Assets/Home/Food.png";
import imgBrand from "@/Assets/Home/Brand in Frame.png";
import imgFrame from "@/Assets/Home/Frame worthy.png";

const defaultImages = {
  self_initiated_stories: imgStory,
  wedding: imgWedding,
  revel_rhythm: imgRevel,
  food: imgFood,
  brand_in_frame: imgBrand,
  frame_worthy: imgFrame,
};

const serviceLinks = {
  self_initiated_stories: "/self-initiated",
  wedding: "/together-forever",
  revel_rhythm: "/revel-rhythm",
  food: "/taste-meet-frames",
  brand_in_frame: "/brand-in-frame",
  frame_worthy: "/frame-worthy",
};

const serviceTitles = {
  self_initiated_stories: "SELF INITIATED STORIES",
  wedding: "WEDDING",
  revel_rhythm: "REVEL & RHYTHM",
  food: "FOOD",
  brand_in_frame: "BRAND IN FRAME",
  frame_worthy: "FRAME WORTHY",
};

const ServiceItem = ({ service, className = "" }) => {
  return (
    <div className={`relative overflow-hidden rounded-xl h-full min-h-[250px] flex group ${className}`} data-aos="fade-up">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-10"></div>
      
      {service.media_type === 'video' && service.media_url ? (
        <video
          src={`${process.env.NEXT_PUBLIC_API_URL}${service.media_url}`}
          className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          autoPlay
          loop
          muted
          playsInline
          poster={defaultImages[service.name].src}
        />
      ) : (
        <Image
          src={
            service.media_url
              ? `${process.env.NEXT_PUBLIC_API_URL}${service.media_url}`
              : defaultImages[service.name]
          }
          alt={serviceTitles[service.name]}
          fill
          className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
        />
      )}
      
      <Link
        href={serviceLinks[service.name]}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-white text-sm uppercase border-b border-white no-underline font-bold tracking-wider text-center"
        data-glitch={serviceTitles[service.name]}
      >
        {serviceTitles[service.name]}
      </Link>
    </div>
  );
};

const ServicesSection = ({ services }) => {
  const orderedServices = [
    'self_initiated_stories',
    'wedding',
    'revel_rhythm',
    'food',
    'brand_in_frame',
    'frame_worthy'
  ];

  const getServiceByName = (name) => services.find(s => s.name === name);

  return (
    <section
      className="py-12 bg-black text-white"
      id="services"
      data-aos="fade-up"
    >
      <div className="container mx-auto px-4">
        <h6 className="text-sm md:text-base text-gray-400 mb-2" data-aos="fade-up" data-aos-delay="200">
          WORK
        </h6>
        <h2 className="text-3xl sm:text-5xl font-semibold uppercase text-white mb-8 sm:mb-12" data-aos="fade-up" data-aos-delay="300">
          Our Services
        </h2>
        <hr className="border-gray-700 mb-8" data-aos="fade-up" data-aos-delay="400" />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4 ">
            {getServiceByName('self_initiated_stories') && <ServiceItem service={getServiceByName('self_initiated_stories')} className="h-full" />}
          </div>
          
          <div className="md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-12">
                {getServiceByName('wedding') && <ServiceItem service={getServiceByName('wedding')} />}
              </div>
              <div className="sm:col-span-7">
                {getServiceByName('revel_rhythm') && <ServiceItem service={getServiceByName('revel_rhythm')} />}
              </div>
              <div className="sm:col-span-5">
                {getServiceByName('food') && <ServiceItem service={getServiceByName('food')} />}
              </div>
              <div className="sm:col-span-7">
                {getServiceByName('brand_in_frame') && <ServiceItem service={getServiceByName('brand_in_frame')} />}
              </div>
              <div className="sm:col-span-5">
                {getServiceByName('frame_worthy') && <ServiceItem service={getServiceByName('frame_worthy')} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
