"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  Settings,
  Images,
  Video,
  Info,
  Mail,
  LogOut,
  Play,
  Camera,
  BookOpen,
  Quote,
  Layout
} from "lucide-react";
import { ChevronDown } from "lucide-react";
import logo from "@/Assets/Home/KG-logo.png";

const menuItems = {
  home: [
    { href: "/admin/dashboard/hero-video", label: "Hero Video", icon: Play },
    { href: "/admin/dashboard/our-service", label: "Our Service", icon: Settings },
    { href: "/admin/dashboard/testimonials", label: "Testimonials", icon: Quote },
    { href: "/admin/dashboard/client-story-video", label: "Client Story Video", icon: Video },
    { href: "/admin/dashboard/add-blog", label: "Add Blog", icon: BookOpen }
  ],
  services: [
    { href: "/admin/dashboard/photographyimg", label: "Photography", icon: Camera },
    { href: "/admin/dashboard/cinematographyimg", label: "Cinematography", icon: Video }
  ],
  gallery: [
    { href: "/admin/dashboard/gallery/self-initiated", label: "SELF INITIATED STORIES" },
    { href: "/admin/dashboard/gallery/together-forever", label: "WEDDING" },
    // { href: "/admin/dashboard/gallery/revel-rhythm", label: "REVEL & RHYTHM" },
    { href: "/admin/dashboard/gallery/taste-meet-frames", label: "TASTE MEET FRAMES" },
    { href: "/admin/dashboard/gallery/brand-in-frame", label: "BRAND IN FRAME" },
    // { href: "/admin/dashboard/gallery/frame-worthy", label: "FRAME WORTHY" },
    { href: "/admin/dashboard/gallery/models", label: "MODELS" },
    { href: "/admin/dashboard/gallery/events", label: "EVENTS" }
  ],
  videoGallery: [
    { href: "/admin/dashboard/videoGallery/self-initiated", label: "SELF INITIATED STORIES" },
    { href: "/admin/dashboard/videoGallery/together-forever", label: "WEDDING" },
    { href: "/admin/dashboard/videoGallery/revel-rhythm", label: "REVEL & RHYTHM" },
    { href: "/admin/dashboard/videoGallery/taste-meet-frames", label: "TASTE MEET FRAMES" },
    { href: "/admin/dashboard/videoGallery/brand-in-frame", label: "BRAND IN FRAME" },
    { href: "/admin/dashboard/videoGallery/frame-worthy", label: "FRAME WORTHY" }
  ]
};

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = (menu) => setOpenMenu(openMenu === menu ? "" : menu);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  const isActive = (path) => pathname === path;

  const MenuButton = ({ menu, icon: Icon, label }) => (
    <button
      onClick={() => toggleMenu(menu)}
      className={`w-full flex items-center gap-3 px-3 py-3 text-gray-300 font-medium rounded-2xl mb-1.5 transition-all duration-300 hover:bg-slate-700 hover:text-white hover:shadow-lg hover:shadow-cyan-400/30 ${
        openMenu === menu ? "bg-slate-700 text-white shadow-lg shadow-cyan-400/30" : ""
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="md:hidden lg:inline">{label}</span>
      <ChevronDown
        className={`ml-auto w-4 h-4 transition-transform duration-300 md:hidden lg:inline ${
          openMenu === menu ? "rotate-180" : ""
        }`}
      />
    </button>
  );

  const SubMenu = ({ items, menu }) => (
    openMenu === menu && (
      <div className="pl-7 space-y-1.5 mb-2.5 animate-in slide-in-from-top-2 duration-300">
        {items.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`block text-gray-400 py-2 px-3 rounded-2xl transition-all duration-300 hover:bg-slate-700 hover:text-white hover:shadow-lg hover:shadow-cyan-400/30 text-sm ${
              isActive(href) ? "bg-slate-700 text-white shadow-lg shadow-cyan-400/30" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              {Icon && <Icon className="w-4 h-4" />}
              {label}
            </div>
          </Link>
        ))}
      </div>
    )
  );

  return (
    <div className="w-64 lg:w-64 md:w-20 min-h-screen bg-slate-800/65 backdrop-blur-xl shadow-2xl shadow-cyan-400/20 border-r-2 border-slate-700/60 rounded-tr-2xl rounded-br-2xl p-4 flex flex-col relative z-10">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center w-full mx-auto rounded-xl p-1.5">
          <Image src={logo} alt="Logo" width={90} height={90} className="rounded-lg" />
        </div>
      </div>

      <div className="flex-1 space-y-2">
        <div>
          <MenuButton menu="home" icon={Home} label="Home" />
          <SubMenu items={menuItems.home} menu="home" />
        </div>

        <div>
          <MenuButton menu="services" icon={Settings} label="Services" />
          <SubMenu items={menuItems.services} menu="services" />
        </div>

        <div>
          <MenuButton menu="gallery" icon={Images} label="Gallery" />
          <SubMenu items={menuItems.gallery} menu="gallery" />
        </div>

        <div>
          <MenuButton menu="videoGallery" icon={Video} label="Video Gallery" />
          <SubMenu items={menuItems.videoGallery} menu="videoGallery" />
        </div>

        <Link
          href="/admin/dashboard/about-us"
          className={`flex items-center gap-3 px-3 py-3 text-gray-300 font-medium rounded-2xl mb-1.5 transition-all duration-300 hover:bg-slate-700 hover:text-white hover:shadow-lg hover:shadow-cyan-400/30 ${
            isActive("/admin/dashboard/about-us") ? "bg-slate-700 text-white shadow-lg shadow-cyan-400/30" : ""
          }`}
        >
          <Info className="w-5 h-5" />
          <span className="md:hidden lg:inline">About Us</span>
        </Link>

        <Link
          href="/admin/dashboard/footer"
          className={`flex items-center gap-3 px-3 py-3 text-gray-300 font-medium rounded-2xl mb-1.5 transition-all duration-300 hover:bg-slate-700 hover:text-white hover:shadow-lg hover:shadow-cyan-400/30 ${
            isActive("/admin/dashboard/footer") ? "bg-slate-700 text-white shadow-lg shadow-cyan-400/30" : ""
          }`}
        >
          <Layout className="w-5 h-5" />
          <span className="md:hidden lg:inline">Footer</span>
        </Link>

        <Link
          href="/admin/dashboard/contact-messages"
          className={`flex items-center gap-3 px-3 py-3 text-gray-300 font-medium rounded-2xl mb-1.5 transition-all duration-300 hover:bg-slate-700 hover:text-white hover:shadow-lg hover:shadow-cyan-400/30 ${
            isActive("/admin/dashboard/contact-messages") ? "bg-slate-700 text-white shadow-lg shadow-cyan-400/30" : ""
          }`}
        >
          <Mail className="w-5 h-5" />
          <span className="md:hidden lg:inline">Contact Messages</span>
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-3 text-red-400 font-medium rounded-2xl transition-all duration-300 hover:bg-red-500/20 hover:text-white bg-red-500/10 mt-auto"
      >
        <LogOut className="w-5 h-5" />
        <span className="md:hidden lg:inline">Logout</span>
      </button>
    </div>
  );
}