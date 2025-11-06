'use client';
import { useState, useEffect } from 'react';

export default function GlobalLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-[9999] overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Main loader content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Camera shutter animation */}
        <div className="relative w-32 h-32 mb-8">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-yellow-400 opacity-30" />
          
          {/* Shutter blades container */}
          <div className="absolute inset-0 flex items-center justify-center ml-[5rem]">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-18 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 origin-left"
                style={{
                  transform: `rotate(${i * 45}deg) translateX(-8px)`,
                  animation: `shutterBlade 2s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>

          {/* Center circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-yellow-400 animate-pulse" style={{
              boxShadow: '0 0 20px rgba(250, 204, 21, 0.5)'
            }} />
          </div>

          {/* Rotating outer circle */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="60"
              fill="none"
              stroke="rgba(250, 204, 21, 0.3)"
              strokeWidth="2"
              strokeDasharray={`${progress * 3.77} 377`}
              className="transition-all duration-300"
            />
          </svg>
        </div>

        {/* Brand name with glitch effect */}
        <div className="relative mb-4">
          <h1 className="text-4xl font-bold text-white tracking-wider">
            SHOTS<span className="text-yellow-400">by</span>KG
          </h1>
          <div 
            className="absolute inset-0 text-4xl font-bold tracking-wider text-yellow-400 opacity-50 blur-sm"
            style={{
              animation: 'glitch 3s infinite'
            }}
          >
            SHOTS<span className="text-white">by</span>KG
          </div>
        </div>

        {/* Loading text */}
        <div className="flex items-center space-x-2 mb-6">
          <p className="text-gray-400 text-sm tracking-widest uppercase">Capturing moments</p>
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-yellow-400 rounded-full"
                style={{
                  animation: 'bounce 1.4s infinite',
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white opacity-30 animate-pulse" />
          </div>
        </div>

        {/* Progress percentage */}
        <p className="mt-4 text-yellow-400 font-mono text-sm">{progress}%</p>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-yellow-400 opacity-30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-yellow-400 opacity-30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-yellow-400 opacity-30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-yellow-400 opacity-30" />

      <style jsx>{`
        @keyframes shutterBlade {
          0%, 100% {
            transform: rotate(var(--rotation)) translateX(-8px) scaleX(1);
          }
          50% {
            transform: rotate(var(--rotation)) translateX(-8px) scaleX(0.3);
          }
        }

        @keyframes glitch {
          0%, 90%, 100% {
            transform: translate(0, 0);
            opacity: 0.5;
          }
          92% {
            transform: translate(-2px, 2px);
            opacity: 0.7;
          }
          94% {
            transform: translate(2px, -2px);
            opacity: 0.3;
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}