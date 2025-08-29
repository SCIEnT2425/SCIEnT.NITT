import React from 'react';
import {useNavigate, Link } from 'react-router-dom';
import { useState , useEffect} from 'react';

const InnovationJourney = () => {
  const navigate = useNavigate();
      const handleClick = () => {
          navigate("/inventiveForm"); 
      };
      
  return (
    <div className="relative w-full bg-black py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Content Card with Golden Border */}
        <div className="relative">
          {/* Content Container with Golden Border */}
          <div className="relative z-10 bg-gray-800 rounded-3xl p-12 border-2 border-yellow-500/60 shadow-2xl shadow-yellow-500/20 flex justify-center items-center flex-col">
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

      
             
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovationJourney;