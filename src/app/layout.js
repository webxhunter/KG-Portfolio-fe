'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'aos/dist/aos.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "@/components/molecule/Header/Header";
import Footer from "@/components/molecule/Footer/Footer";
import Sidebar from '@/components/molecule/SideBar';
import Topbar from '@/components/molecule/TopBar';
import AOSInitializer from "@/components/AOSInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage?.getItem('adminToken');
    if (token) {
      setIsAuth(true);
    } else {
      router.replace('/admin/login');
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
        <div className="text-white ml-4">Loading...</div>
      </div>
    );
  }

  return isAuth ? children : null;
}

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen relative bg-gradient-to-br from-gray-900 to-slate-800">
      {/* Background SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 1440 900"
        fill="none"
      >
        <ellipse cx="1200" cy="200" rx="320" ry="120" fill="rgba(0,255,231,0.2)" />
        <ellipse cx="300" cy="700" rx="400" ry="180" fill="rgba(0,255,231,0.1)" />
        <ellipse cx="900" cy="800" rx="200" ry="80" fill="rgba(0,255,231,0.25)" />
      </svg>
     
      <Sidebar />
     
      <div className="flex-1 flex flex-col relative z-10">
        <Topbar />
        <div className="flex-1 bg-slate-800/95 backdrop-blur-sm rounded-2xl m-6 p-8 shadow-2xl shadow-cyan-500/20">
          {children}
        </div>
      </div>
    </div>
  );
}

function RootLayoutContent({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isAdminLogin = pathname === '/admin/login' || pathname === '/admin';
  const isProtectedAdminRoute = isAdminRoute && !isAdminLogin;
  const isDashboardRoute = pathname?.startsWith('/admin/dashboard') || 
                          (isAdminRoute && !isAdminLogin && pathname !== '/admin/login');

  // Handle admin routes
  if (isAdminRoute) {
    // Login page - simple layout
    if (isAdminLogin) {
      return <main className="min-h-screen ">{children}</main>;
    }
    
    // Protected admin routes with dashboard layout
    if (isProtectedAdminRoute) {
      return (
        <ProtectedRoute>
          <DashboardLayout>{children}</DashboardLayout>
        </ProtectedRoute>
      );
    }
  }

  // Regular website routes
  return (
    < >
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white overflow-x-hidden`}
      >
        <AOSInitializer />
        <RootLayoutContent>{children}</RootLayoutContent>
        <ToastContainer 
          position="top-right" 
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}