"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import GlobalLoader from "@/components/GlobalLoader";

const NavigationButtons = ({ type }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  const handleNavigation = (href) => {
    if (pathname === href) return;
    setIsNavigating(true);
    router.push(href);
  };

  const navigationLinks = [
    { href: "/brand-in-frame", label: "Brand In Frame" },
    { href: "/taste-meet-frames", label: "Taste Meet Frames" },
    { href: "/self-initiated", label: "Self Initiated Stories" },
    { href: "/together-forever", label: "Together Forever" },
    // { href: "/revel-rhythm", label: "Revel & Rhythm" },
    // { href: "/frame-worthy", label: "Frame Worthy" },
    { href: "/models", label: "Models" },
    { href: "/events", label: "Events" },
  ];

  const navigationVideoLinks = [
    { href: "/cinematography/brand-in-frame", label: "Brand In Frame" },
    { href: "/cinematography/taste-meet-frames", label: "Taste Meet Frames" },
    { href: "/cinematography/self-initiated", label: "Self Initiated Stories" },
    { href: "/cinematography/together-forever", label: "Together Forever" },
    { href: "/cinematography/revel-rhythm", label: "Revel & Rhythm" },
    { href: "/cinematography/frame-worthy", label: "Frame Worthy" },
  ];

  const links = type ? navigationVideoLinks : navigationLinks;
  const sliceIndex = type ? 4 : 3;

  return (
    <>
      {isNavigating && <GlobalLoader />}
      <div className="flex flex-col items-center mb-12" data-aos="fade-up" data-aos-delay="200">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-2 md:mb-4 text-xs md:text-base">
          {links.slice(0, sliceIndex).map((link, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(link.href)}
              className="group inline-flex items-center gap-1 md:gap-3 rounded-full px-4 md:px-6 py-2 md:py-3 text-white font-medium tracking-wide transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-white/10"
              style={{ boxShadow: "4px 4px 17.4px 0px #FFFFFF47 inset" }}
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-xs md:text-base">
          {links.slice(sliceIndex).map((link, index) => (
            <button
              key={index + sliceIndex}
              onClick={() => handleNavigation(link.href)}
              className="group inline-flex items-center gap-1 md:gap-3 rounded-full px-4 md:px-6 py-2 md:py-3 text-white font-medium tracking-wide transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-white/10"
              style={{ boxShadow: "4px 4px 17.4px 0px #FFFFFF47 inset" }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavigationButtons;