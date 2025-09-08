import React from 'react';
import "../styles/Inventive.css"
const InventiveHero = () => {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center mt-8">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-30">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFA500" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E90FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0066CC" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Dynamic Grid Lines */}
          {Array.from({ length: 40 }, (_, i) => (
            <g key={`grid-${i}`}>
              <path
                d={`M${i * 30} 0 Q${i * 30 + 200} ${200 + i * 10} ${i * 30 + 100} 800`}
                stroke="url(#gridGradient)"
                strokeWidth="1"
                fill="none"
                opacity="0.6"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            </g>
          ))}

          {/* Curved accent lines */}
          <path
            d="M-100 400 Q300 200 600 400 T1300 300"
            stroke="url(#blueGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse sm:animate-pulse"
          />
          <path
            d="M-100 600 Q400 400 800 600 T1400 500"
            stroke="url(#gridGradient)"
            strokeWidth="3"
            fill="none"
            opacity="0.8"
            className="animate-pulse sm:animate-pulse"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center">
        {/* INVENTIVE Title with 3D effect */}
        <div className="relative mb-4 sm:mb-12">
          <h1 className="inventiveTitle lg:text-12xl text-5xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 drop-shadow-2xl transform hover:scale-105 transition-transform duration-300">
            INVENTIVE
          </h1>
          {/* Curved underline */}
          <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 transform -translate-x-1/2 w-64 sm:w-96 h-2">
            <svg viewBox="0 0 400 20" className="w-full h-full">
              <path
                d="M20 15 Q200 5 380 15"
                stroke="url(#gridGradient)"
                strokeWidth="3"
                fill="none"
                className="animate-pulse sm:animate-pulse"
              />
            </svg>
          </div>
        </div>

        {/* Subtitle */}
        <div className="mb-6 sm:mb-8 space-y-4 sm:space-y-6">
          <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl sm:max-w-4xl mx-auto font-light">
            Got an innovative idea bubbling in your mind? A problem you're passionate about solving? 
            Or a project you've been itching to start, but lack the resources to bring it to life?
          </p>
        </div>

        {/* Main Description */}
        <div className="mb-6 sm:mb-8 space-y-4 sm:space-y-6">
          <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl sm:max-w-4xl mx-auto">
            <span className="text-yellow-400 font-semibold">INVENTIVE</span> is SCIEnT's groundbreaking initiative designed to 
            empower the next generation of creators and problem-solvers right here at NIT Trichy. 
            We believe that every student has the potential to innovate, and we're here to provide 
            the launchpad for your ideas.
          </p>
          
          <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl sm:max-w-4xl mx-auto">
            This program offers you a unique opportunity to transform your concepts into tangible realities. 
            You'll gain access to essential tools and a dedicated workspace, all while receiving expert 
            guidance from our esteemed faculty and experienced alumni mentors.
          </p>
        </div>

        <div className='w-auto h-px bg-yellow-400'>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }, ( _, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 sm:w-2 h-1 sm:h-2 bg-yellow-400 rounded-full opacity-60 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none"></div>
    </div>
  );
};

export default InventiveHero;