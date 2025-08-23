import React from 'react';

const InnovationJourney = () => {
  return (
    <div className="relative w-full bg-black py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Content Card with Golden Border */}
        <div className="relative">
          {/* Content Container with Golden Border */}
          <div className="relative z-10 bg-gray-800 rounded-3xl p-12 border-2 border-yellow-500/60 shadow-2xl shadow-yellow-500/20">
            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400 mb-8 leading-tight">
              Your Innovation Journey
            </h2>

            {/* Description */}
            <div className="mb-10">
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed font-light">
                Imagine a space buzzing with creativity, where collaboration fuels innovation 
                and every challenge is met with curiosity and courage. At{' '}
                <span className="text-yellow-400 font-semibold">INVENTIVE</span>, your ideas won't just remain dreams, 
                they'll evolve into groundbreaking solutions that can change lives.
              </p>
            </div>

            {/* Register Button */}
            <div className="flex justify-center">
              <button className="group relative px-12 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-xl rounded-full transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-400/50 focus:outline-none focus:ring-4 focus:ring-yellow-400/30">
             
                <span className="relative z-10 tracking-wide">REGISTER NOW</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Button glow effect */}
                <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-xl group-hover:bg-yellow-400/40 transition-all duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovationJourney;