import React from 'react';
import { Users, Hexagon, Lightbulb, FileText, Plus, Brain } from 'lucide-react';
import "../styles/Inventive.css"

const WhyChooseInventive = () => {
  const features = [
    {
      id: 1,
      icon: (<img src="Icons/ExpertGuidanceIcon.png" alt="Expert Guidance Icon" className='w-16 sm:w-20 md:w-24' />),
      title: "Expert Guidance",
      description: "Access to esteemed faculty and experienced alumni mentors"
    },
    {
      id: 2,
      icon: (<img src="Icons/CuttingEdgeTechnology.png" alt="Cutting Edge Technology Icon" className='w-12 sm:w-16 md:w-20' />),
      title: "Cutting-Edge Technology",
      description: "State-of-the-art tools and dedicated workspace for innovation"
    },
    {
      id: 3,
      icon: (<img src="Icons/Colabrative_Environment.png" alt="Collaborative Environment Icon" className='w-12 sm:w-16 md:w-20' />),
      title: "Collaborative Environment",
      description: "Vibrant community of like-minded visionaries and creators"
    },
    {
      id: 4,
      icon: (<img src="Icons/Multidicsiplinary_Support.png" alt="Multi-Disciplinary Support Icon" className='w-12 sm:w-16 md:w-20' />),
      title: "Multi-Disciplinary Support",
      description: "Welcoming all disciplines tech, design, social impact, sustainability"
    },
    {
      id: 5,
      icon: (<img src="Icons/Patent_Icon.png" alt="Patent Support Icon" className='w-12 sm:w-16 md:w-20' />),
      title: "Patent Support",
      description: "Assistance with patent filing for worthy and innovative projects"
    },
    {
      id: 6,
      icon: (<img src="Icons/Skill_Development.png" alt="Skill Development Icon" className='w-12 sm:w-16 md:w-20' />),
      title: "Skill Development",
      description: "Workshops and training to sharpen skills and broaden horizons"
    }
  ];

  return (
    <div className="relative w-full bg-black py-8 sm:py-12 md:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Why Choose{' '}
            <span className="text-yellow-400">INVENTIVE</span>
            <span className="text-white">?</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="chooseInventiveGrid grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-1  sm:gap-8 gap-5 place-items-center">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group relative transform hover:scale-105 transition-all duration-300 box-border h-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card */}
              <div className="relative bg-gray-900/80 backdrop-blur-sm border-2 border-yellow-500/40 rounded-3xl p-6 sm:p-8 hover:border-yellow-400 transition-colors duration-300 box-border h-72 w-80" >
                {/* Background glow effect */}
                <div className="absolute inset-3 bg-yellow-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Icon */}
                <div className="z-10  relative bottom-12 flex justify-center mb-10 ">
                  <div className="text-yellow-400 transform group-hover:scale-110 transition-transform duration-300 ">
                    {feature.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-lg sm:text-xl md:text-2xl font-bold text-yellow-400 text-center mb-3 sm:mb-4 leading-tight">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-sm sm:text-base text-gray-300 text-center leading-relaxed">
                  {feature.description}
                </p>

                {/* Corner accents */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-4 sm:w-4 h-4 sm:h-4 border-l-2 border-t-2 border-yellow-500/40 group-hover:border-yellow-400 transition-colors duration-300"></div>
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-4 sm:w-4 h-4 sm:h-4 border-r-2 border-t-2 border-yellow-500/40 group-hover:border-yellow-400 transition-colors duration-300"></div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-4 sm:w-4 h-4 sm:h-4 border-l-2 border-b-2 border-yellow-500/40 group-hover:border-yellow-400 transition-colors duration-300"></div>
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-4 sm:w-4 h-4 sm:h-4 border-r-2 border-b-2 border-yellow-500/40 group-hover:border-yellow-400 transition-colors duration-300"></div>
              </div>

              {/* Floating particles */}
              <div className="absolute -top-1.5 sm:-top-2 -left-1.5 sm:-left-2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-300"></div>
              <div className="absolute -top-1 sm:-top-1 -right-1 sm:-right-1 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute -bottom-1.5 sm:-bottom-2 -right-1.5 sm:-right-2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-300" style={{animationDelay: '1s'}}></div>
            </div>
          ))}
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
        
        {/* Connecting lines between cards */}
        <div className="absolute inset-0 pointer-events-none opacity-20 hidden md:block">
          <svg className="w-full h-full" viewBox="0 0 1200 600">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#FFA500" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#FFD700" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path d="M200 200 Q400 150 600 200 T1000 200" stroke="url(#lineGradient)" strokeWidth="1" fill="none" className="animate-pulse" />
            <path d="M200 400 Q400 350 600 400 T1000 400" stroke="url(#lineGradient)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '1s'}} />
            <path d="M300 150 L300 450" stroke="url(#lineGradient)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '2s'}} />
            <path d="M600 150 L600 450" stroke="url(#lineGradient)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '3s'}} />
            <path d="M900 150 L900 450" stroke="url(#lineGradient)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '4s'}} />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseInventive;