"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AboutHero from '@/components/pages/About/AboutHero';
import AboutKamal from '@/components/pages/About/AboutKamal';
import ContactSection from "@/components/pages/Home/ContactSection";
import ScrollingFooter from '@/components/molecule/ScrollingCategory/ScrollingFooter';

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.get(`${API_URL}/api/about`);
        console.log(response)
        setAboutData(response.data);
      } catch (error) {
        toast.error("Failed to load about page data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);
console.log(aboutData)
  return (
    <div className="bg-black">
      <AboutHero about={aboutData} loading={loading} />
      <AboutKamal />
      <ContactSection />
      <ScrollingFooter/>
    </div>
  );
};

export default AboutPage;
