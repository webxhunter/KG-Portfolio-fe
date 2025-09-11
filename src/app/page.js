"use client"
import React, { useEffect, useState } from "react";
import HeroSection from "@/components/pages/Home/HeroSection";
import ServicesSection from "@/components/pages/Home/ServicesSection";
import TestimonialsSection from "@/components/pages/Home/TestimonialsSection";
import BlogsSection from "@/components/pages/Home/BlogsSection";
import ClientStorySection from "@/components/pages/Home/ClientStorySection";
import ContactSection from "@/components/pages/Home/ContactSection";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image"; // Use Next.js Image component
import thankyou from "@/Assets/Home/thankuou-cat.gif";
import ScrollingFooter from "@/components/molecule/ScrollingCategory/ScrollingFooter";
// Helper function for fetching data to reduce repetition
const fetchData = async (url, setter, errorMessage) => {
  try {
    const response = await axios.get(url);
    setter(response.data || (Array.isArray(response.data) ? [] : null));
  } catch (error) {
    toast.error(errorMessage);
  }
};

const Home = () => {
  const [heroVideo, setHeroVideo] = useState(null);
  const [services, setServices] = useState([]);
  const [clientVideo, setClientVideo] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Use NEXT_PUBLIC_ for client-side environment variables
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    fetchData(`${API_URL}/api/hero-video`, setHeroVideo, "Failed to load hero video");
    fetchData(`${API_URL}/api/services`, setServices, "Failed to load services");
    fetchData(`${API_URL}/api/client-videos`, setClientVideo, "Failed to load client video");
    fetchData(`${API_URL}/api/testimonials`, setTestimonials, "Failed to load testimonials");
    fetchData(`${API_URL}/api/blogs`, setBlogs, "Failed to load blogs");
  }, []);

  return (
    <>
      <HeroSection heroVideo={heroVideo} />
      <ServicesSection services={services} />
      <TestimonialsSection testimonials={testimonials} />
      <BlogsSection blogs={blogs} />
      <ClientStorySection clientVideo={clientVideo} />
      <ContactSection />
      
      <section className="pb-5 bg-black w-full h-auto" data-aos="fade-up">
        <div className="container mx-auto text-center px-4">
          <Image
            src={thankyou}
            alt="Thank You GIF"
            className="w-full h-[80vh] object-cover"
            unoptimized // GIFs can have issues with optimization, this is a safe flag
          />
        </div>
      </section>
      <ScrollingFooter/>
    </>
  );
};

export default Home;
