"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/Assets/Home/KG-logo.png";

const Header = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="w-full px-4 lg:px-20">
        <div className="flex items-center justify-between">
          <Link href="/" className="py-4">
            <Image src={logo} alt="KG-logo" className="h-8 lg:h-10 w-auto" />
          </Link>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="hidden lg:flex items-center justify-between flex-1">
            <ul className="flex mx-auto bg-black border border-gray-700 divide-x divide-gray-700 rounded-t-lg">
              <li>
                <Link href="/" className="block px-8 py-5 text-white text-base font-medium hover:bg-gray-800 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-me" className="block px-8 py-5 text-white text-base font-medium hover:bg-gray-800 transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="block px-8 py-5 text-white text-base font-medium hover:bg-gray-800 transition-colors">
                  Blogs
                </Link>
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
                    <Link href="/photography" className="block px-6 py-3 text-white hover:bg-gray-800 border-b border-gray-600 rounded-t-lg">
                      Photography
                    </Link>
                    <Link href="/cinematography" className="block px-6 py-3 text-white hover:bg-gray-800 rounded-b-lg">
                      Cinematography
                    </Link>
                  </div>
                )}
              </li>
            </ul>
            <Link href="/#contact" className="bg-[#1C1C21] text-white rounded-lg px-5 py-2 text-base font-medium transition-colors">
              Contact Me
            </Link>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-16 right-4 w-2/5 bg-black shadow-xl border border-gray-700 rounded-lg z-50 lg:hidden">
            <div className="p-4 flex flex-col divide-y divide-gray-600">
              <Link href="/" className="py-3 px-4 text-white hover:bg-gray-800" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/about-me" className="py-3 px-4 text-white hover:bg-gray-800" onClick={() => setIsMobileMenuOpen(false)}>
                About Me
              </Link>
              <Link href="/blogs" className="py-3 px-4 text-white hover:bg-gray-800" onClick={() => setIsMobileMenuOpen(false)}>
                Blogs
              </Link>
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
                    <Link href="/photography" className="block py-2 px-6 text-white text-sm hover:bg-black" onClick={() => { setIsServicesOpen(false); setIsMobileMenuOpen(false); }}>
                      Photography
                    </Link>
                    <Link href="/cinematography" className="block py-2 px-6 text-white text-sm hover:bg-black" onClick={() => { setIsServicesOpen(false); setIsMobileMenuOpen(false); }}>
                      Cinematography
                    </Link>
                  </div>
                )}
              </div>
              <Link href="/about-me#contact" className="py-3 px-4 text-white hover:bg-gray-800" onClick={() => setIsMobileMenuOpen(false)}>
                Contact Me
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;