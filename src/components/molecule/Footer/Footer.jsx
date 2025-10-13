"use client";
import React from "react";
import Link from "next/link";                                            
import instaicon from "@/Assets/Home/insta-icon-kg.png";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-[#1C1C21] pt-16 pb-8">
      <div className="container mx-auto ">
        <div className="grid  grid-cols-2 gap-8 mb-12 px-4">
          {/* Left Column */}
          <div className="w-[145px] md:w-full">
            <p className="text-gray-400 text-[9px] md:text-xs uppercase tracking-wider mb-6">
              A MORE MEANINGFUL HOME FOR cinematoGRAPHY
            </p>
            <div className="text-white text-2xl md:text-5xl font-bold uppercase leading-tight">
              <div className="flex items-center gap-4">
                <span>LET'S</span>
                <Link
                  href="/#contact"
                  className="w-10 md:w-14 h-10 md:h-14 flex items-center justify-center rounded-full shadow-[inset_4px_4px_17.4px_0px_#FFFFFF47] transition-transform hover:scale-105"
                >
                  <svg className="w-5 md:w-6 h-5 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="6" y1="18" x2="18" y2="6" />
                    <polyline points="7 6 18 6 18 17" />
                  </svg>
                </Link>
              </div>
              <span>WORK TOGETHER</span>
            </div>
          </div>

          {/* Right Column */}
          <div className=" justify-end pr-4 flex md:justify-center items-end md:items-center">
            <nav className="flex flex-col space-y-4 items-start">
              <Link href="/" className="text-gray-300 text-sm md:text-lg hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/about-me" className="text-gray-300 text-sm md:text-lg hover:text-white transition-colors">
                About Me
              </Link>
              <Link href="/#work" className="text-gray-300 text-sm md:text-lg hover:text-white transition-colors">
                My Works
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-[#1C1C21] pt-6 pr-4 flex justify-between items-center w-full">
          <div className="text-gray-400 text-sm flex gap-x-2   px-4">
            <Link href="/#" className="hover:text-white pt-2 transition-colors">
              Terms & Conditions
            </Link>
            <div className=" bg-[#1C1C21] w-[1px] h-10"/>
            <Link href="/#" className="hover:text-white pt-2 transition-colors">
              Privacy Policy
            </Link>
          </div>
          <a
            href="https://www.instagram.com/_shotsbykg?igsh=MTd4NWg1d3FqdGR6Ng=="
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 md:w-12 h-10 md:h-12 flex items-center justify-center border border-gray-700 rounded-full hover:bg-gray-800 transition-colors"
          >
            <img src={instaicon.src} alt="Instagram" className="" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;