"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/Assets/Home/KG-logo.png";
import GlobalLoader from "@/components/GlobalLoader";

const Header = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setIsMobileMenuOpen(false);
        setIsServicesOpen(false);
      }
    };

    const handleScroll = () => {
      setIsMobileMenuOpen(false);
      setIsServicesOpen(false);
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileMenuOpen]);

  const handleNavigation = (href) => {
    const targetPath = href.split('#')[0] || href;
    if (pathname === targetPath) return;
    
    setIsNavigating(true);
    setIsMobileMenuOpen(false);
    router.push(href);
  };

  return (
    <>
      {isNavigating && <GlobalLoader />}
      
      <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="w-full px-4 lg:px-20">
          <div className="flex items-center justify-between">
            <button onClick={() => handleNavigation("/")} className="py-4">
              <Image src={logo} alt="KG-logo" className="h-8 lg:h-10 w-auto" />
            </button>

            <button
              ref={hamburgerRef}
              className="lg:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  d="M4 6h16"
                  className={`origin-center transition-all duration-300 ${
                    isMobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  d="M4 12h16"
                  className={`transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  d="M4 18h16"
                  className={`origin-center transition-all duration-300 ${
                    isMobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </svg>
            </button>

            <div className="hidden lg:flex items-center justify-between flex-1">
              <ul className="flex mx-auto bg-black border border-gray-700 divide-x divide-gray-700 rounded-t-lg">
                <li>
                  <button onClick={() => handleNavigation("/")} className="block px-8 py-5 text-white text-base font-medium hover:bg-gray-800 transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation("/about-me")} className="block px-8 py-5 text-white text-base font-medium hover:bg-gray-800 transition-colors">
                    About Me
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation("/blogs")} className="block px-8 py-5 text-white text-base font-medium hover:bg-gray-800 transition-colors">
                    Blogs
                  </button>
                </li>
                <li
                  className="relative"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button className="flex items-center w-full px-8 py-5 text-white text-base font-medium hover:bg-gray-800 transition-colors">
                    Services
                    <svg className={`ml-2 w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isServicesOpen && (
                    <div className="absolute top-full left-0 w-48 bg-gray-900 border border-gray-600 rounded-lg shadow-2xl z-50">
                      <button onClick={() => handleNavigation("/photography")} className="block w-full text-left px-6 py-3 text-white hover:bg-gray-800 border-b border-gray-600 rounded-t-lg">
                        Photography
                      </button>
                      <button onClick={() => handleNavigation("/cinematography")} className="block w-full text-left px-6 py-3 text-white hover:bg-gray-800 rounded-b-lg">
                        Cinematography
                      </button>
                    </div>
                  )}
                </li>
              </ul>
              <button onClick={() => handleNavigation("/#contact")} className="bg-[#1C1C21] text-white rounded-lg px-5 py-2 text-base font-medium transition-colors">
                Contact Me
              </button>
            </div>
          </div>

          <div
            className={`absolute top-16 right-4 w-2/5 bg-black shadow-xl border border-gray-700 rounded-lg z-50 lg:hidden overflow-hidden transition-all duration-300 origin-top ${
              isMobileMenuOpen
                ? "opacity-100 scale-y-100"
                : "opacity-0 scale-y-0 pointer-events-none"
            }`}
          >
            <div ref={mobileMenuRef} className="p-4 flex flex-col divide-y divide-gray-600">
              <button onClick={() => handleNavigation("/")} className="py-3 px-4 text-left text-white hover:bg-gray-800">
                Home
              </button>
              <button onClick={() => handleNavigation("/about-me")} className="py-3 px-4 text-left text-white hover:bg-gray-800">
                About Me
              </button>
              <button onClick={() => handleNavigation("/blogs")} className="py-3 px-4 text-left text-white hover:bg-gray-800">
                Blogs
              </button>
              <div>
                <button
                  className="flex items-center justify-between w-full py-3 px-4 text-white hover:bg-gray-800"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  Services
                  <svg className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isServicesOpen && (
                  <div className="bg-gray-950 rounded mt-2">
                    <button onClick={() => handleNavigation("/photography")} className="block w-full text-left py-2 px-6 text-white text-sm hover:bg-black">
                      Photography
                    </button>
                    <button onClick={() => handleNavigation("/cinematography")} className="block w-full text-left py-2 px-6 text-white text-sm hover:bg-black">
                      Cinematography
                    </button>
                  </div>
                )}
              </div>
              <button onClick={() => handleNavigation("/about-me#contact")} className="py-3 px-4 text-left text-white hover:bg-gray-800">
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;