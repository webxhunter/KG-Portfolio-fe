"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AboutHero from '@/components/pages/About/AboutHero';
import AboutKamal from '@/components/pages/About/AboutKamal';
import ContactSection from "@/components/pages/Home/ContactSection";
import ImageCollage from '@/components/pages/Blogs/ImageCollage';
import ScrollingFooter from '@/components/molecule/ScrollingCategory/ScrollingFooter';

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/about`);
        setAboutData(response.data);
      } catch (error) {
        toast.error("Failed to load about page data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <div className="bg-black">
      <AboutHero about={aboutData} loading={loading} />
      <AboutKamal />
      <ContactSection />
      <ScrollingFooter />
      <ImageCollage/>
    </div>
  );
};

export default AboutPage;