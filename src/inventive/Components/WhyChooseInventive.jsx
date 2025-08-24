import React from 'react';
import { Users, Hexagon, Lightbulb, FileText, Plus, Brain } from 'lucide-react';

const WhyChooseInventive = () => {
  const features = [
    {
      id: 1,
      icon: <Users className="w-12 h-12" />,
      title: "Expert Guidance",
      description: "Access to esteemed faculty and experienced alumni mentors"
    },
    {
      id: 2,
      icon: <Hexagon className="w-12 h-12" />,
      title: "Cutting-Edge Technology",
      description: "State-of-the-art tools and dedicated workspace for innovation"
    },
    {
      id: 3,
      icon: <Lightbulb className="w-12 h-12" />,
      title: "Collaborative Environment",
      description: "Vibrant community of like-minded visionaries and creators"
    },
    {
      id: 4,
      icon: <Brain className="w-12 h-12" />,
      title: "Multi-Disciplinary Support",
      description: "Welcoming all disciplines tech, design, social impact, sustainability"
    },
    {
      id: 5,
      icon: (
        <div className="relative w-12 h-12">
          <FileText className="w-10 h-10" />
          <Plus className="w-4 h-4 absolute -bottom-1 -right-1 bg-yellow-400 text-black rounded-full p-0.5" />
        </div>
      ),
      title: "Patent Support",
      description: "Assistance with patent filing for worthy and innovative projects"
    },
    {
      id: 6,
      icon: <Brain className="w-12 h-12" />,
      title: "Skill Development",
      description: "Workshops and training to sharpen skills and broaden horizons"
    }
  ];

  return (
    <div className="relative w-full bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Why Choose{' '}
            <span className="text-yellow-400">INVENTIVE</span>
            <span className="text-white">?</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className=" flex flex-wrap gap-8 justify-evenly">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group relative transform hover:scale-105 transition-all duration-300  w-1/4"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card */}
              <div className="relative bg-gray-900/80 backdrop-blur-sm border-2 border-yellow-500/40 rounded-3xl p-8 h-full hover:border-yellow-400 transition-colors duration-300">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-yellow-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Icon */}
                <div className="relative z-10 flex justify-center mb-6">
                  <div className="text-yellow-400 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-xl md:text-2xl font-bold text-yellow-400 text-center mb-4 leading-tight">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-gray-300 text-center leading-relaxed">
                  {feature.description}
                </p>

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-yellow-500/40 group-hover:border-yellow-400 transition-colors duration-300"></div>
                <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-yellow-500/40 group-hover:border-yellow-400 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-yellow-500/40 group-hover:border-yellow-400 transition-colors duration-300"></div>
                <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-yellow-500/40 group-hover:border-yellow-400 transition-colors duration-300"></div>
              </div>

              {/* Floating particles */}
              <div className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-300"></div>
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-300" style={{animationDelay: '1s'}}></div>
            </div>
          ))}
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
        
        {/* Connecting lines between cards */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
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