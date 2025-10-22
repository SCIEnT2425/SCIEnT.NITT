import React, { useState } from 'react';
import { Mail, Linkedin, Github, Zap, Sparkles, Rocket, Star } from 'lucide-react';
import MemberCard from './MemberCard';
import data from '../assets/data';
import '../styles/ScientMembers.css';

const SCIentMembers = () => {
  const [activeSection, setActiveSection] = useState('all');

  const allMembers = [
    ...data.cores,
    ...data.Managers,
    ...data.DeputyManagers,
    ...data.ExManagers,
    ...data.ExCores,

  ];

  const teamMembers = [
    ...data.cores,
    ...data.Managers,
    ...data.DeputyManagers,
  ];

  const pastMembers = [
    ...data.ExManagers,
    ...data.ExCores,
  ];

  const getFilteredMembers = () => {
    if (activeSection === 'all') return allMembers;
    if (activeSection === 'core') return [...data.cores];
    if (activeSection === 'team') return teamMembers;
    if (activeSection === 'FacultyAdvisor') return data.facultyAdvisor;
    if (activeSection === 'pastMembers') return pastMembers
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-[#facc15]/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-[#facc15]/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute w-96 h-96 bg-[#facc15]/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Hero */}
      <div className="relative pt-20 pb-16 px-4 text-center">
        <div className="inline-block mb-4">
          <Rocket className="w-16 h-16 text-[#facc15] animate-bounce" />
        </div>
        <h1 className="text-6xl md:text-7xl font-black mb-4 text-[#facc15]">
          THE SQUAD
        </h1>
        <p className="text-xl text-[#facc15]/80 max-w-2xl mx-auto">
          Meet the awesome Team behind <span className="text-[#facc15] font-bold">SCIEnT</span>
        </p>
        <p className="text-sm text-[#facc15]/60 mt-2">
          Student Centre for Innovation in Engineering and Technology
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="relative px-4 mb-12">
        <div className="flex flex-wrap gap-3 justify-center max-w-5xl mx-auto">
          {[
            { id: 'all', label: 'Everyone', icon: Star },
            { id: 'FacultyAdvisor', label: 'Faculty Advisor', icon: Sparkles },
            { id: 'core', label: 'Core Members', icon: Rocket },
            { id: 'team', label: 'Team Members', icon: Zap },
            { id: 'pastMembers', label: 'Past Members', icon: Zap }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveSection(filter.id)}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 tabs ${
                activeSection === filter.id
                  ? 'bg-[#facc15] text-black scale-105'
                  : 'bg-black/80 text-[#facc15]/80 border border-[#facc15]/50 hover:bg-[#facc15]/20 hover:scale-105'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Members Grid */}
      <div className="relative max-w-7xl mx-auto px-4 pb-20">
  <div className="membersGrid">
    {getFilteredMembers().map((member, idx) => (
      <MemberCard key={idx} member={member} index={idx} />
    ))}
  </div>
</div>

    </div>
  );
};

export default SCIentMembers;