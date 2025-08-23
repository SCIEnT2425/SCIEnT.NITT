import React from 'react';

const ReadyToInnovate = () => {
  return (
    <div className="relative w-full bg-black py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Title */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-yellow-400 mb-12 leading-tight">
          Ready to Innovate?
        </h2>

        {/* Main Description */}
        <div className="mb-16">
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 leading-relaxed font-light max-w-5xl mx-auto">
            No matter where you are in your journey, just starting out or ready to launch, 
            we provide the resources, mentorship, and motivation to take that critical next step. 
            Your passion is the spark; <span className="text-yellow-400 font-semibold">INVENTIVE</span> is 
            the fire that ignites it.
          </p>
        </div>

        {/* Tagline */}
        <div className="relative">
          <p className="text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-relaxed">
            Together, we turn dreams into patents and ideas into reality.
          </p>
          
          {/* Underline decoration */}
          <div className="flex justify-center mt-4">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating particles */}
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-40 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}

        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-1/4 left-20 w-4 h-4 border border-yellow-400 rotate-45 opacity-30 animate-spin" style={{animationDuration: '10s'}}></div>
        <div className="absolute top-3/4 right-32 w-6 h-6 border border-yellow-400 opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-yellow-400 rounded-full opacity-40 animate-bounce" style={{animationDelay: '1s'}}></div>

        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 600">
          <defs>
            <linearGradient id="sparkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#FFA500" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          
          <path 
            d="M100 300 Q400 200 600 300 T1100 300" 
            stroke="url(#sparkGradient)" 
            strokeWidth="2" 
            fill="none" 
            className="animate-pulse"
          />
          <path 
            d="M200 150 Q500 100 800 150 T1000 150" 
            stroke="url(#sparkGradient)" 
            strokeWidth="1" 
            fill="none" 
            className="animate-pulse"
            style={{animationDelay: '1s'}}
          />
          <path 
            d="M150 450 Q450 400 750 450 T950 450" 
            stroke="url(#sparkGradient)" 
            strokeWidth="1" 
            fill="none" 
            className="animate-pulse"
            style={{animationDelay: '2s'}}
          />
        </svg>
      </div>

      {/* Spark effect around INVENTIVE */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-64 h-64">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={`spark-${i}`}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
              style={{
                top: `${50 + 40 * Math.cos((i * Math.PI) / 4)}%`,
                left: `${50 + 40 * Math.sin((i * Math.PI) / 4)}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};

export default ReadyToInnovate;