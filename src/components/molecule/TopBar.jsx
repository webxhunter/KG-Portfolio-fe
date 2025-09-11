'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

export default function Topbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  return (
    <div className="h-16 w-full bg-gradient-to-r from-gray-900 to-cyan-400/10 border-b-2 border-slate-700/60 shadow-lg shadow-cyan-400/20 flex items-center justify-between px-6 rounded-t-2xl">
      <h1 className="text-2xl font-bold text-cyan-400 tracking-wide drop-shadow-lg">
        Dashboard
      </h1>
      
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors duration-300"
        >
          <FaUserCircle size={32} />
          <span className="hidden md:inline">Admin</span>
        </button>
        
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-sm rounded-xl shadow-lg shadow-cyan-400/20 border border-slate-700 z-50">
            <a href="#profile" className="block px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-white rounded-t-xl transition-colors">
              Profile
            </a>
            <hr className="border-slate-700" />
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-700 hover:text-red-300 rounded-b-xl transition-colors flex items-center gap-2"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}