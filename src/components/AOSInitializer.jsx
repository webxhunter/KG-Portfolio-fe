"use client";

import { useEffect } from 'react';
import AOS from 'aos';

const AOSInitializer = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return null; // This component doesn't render anything
};

export default AOSInitializer;
