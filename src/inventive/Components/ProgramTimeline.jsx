import React from 'react';

const ProgramTimeline = () => {
  const phases = [
    {
      id: 1,
      phase: "PHASE 1",
      title: "OUTREACH",
      week: "WEEK 1 - WEEK 2",
      description: "Registration opens for students to apply with their ideas and solutions.",
      position: "left"
    },
    {
      id: 2,
      phase: "PHASE 2",
      title: "INTAKE",
      week: "WEEK 3",
      description: "Present your ideas.",
      position: "right"
    },
    {
      id: 3,
      phase: "PHASE 3",
      title: "SELECTION",
      week: "WEEK 4",
      description: "Projects selected based on usefulness, novelty, ethics, feasibility. Assigning student mentors, facilities and alumni for guiding",
      position: "left"
    },
    {
      id: 4,
      phase: "PHASE 4",
      title: "INCUBATION",
      week: "WEEK 5 - WEEK 11",
      description: "Project work in progress",
      position: "right"
    },
    {
      id: 5,
      phase: "PHASE 5",
      title: "SHOWCASE",
      week: "WEEK 12",
      description: "Showcase of projects. Patent filing support for worthy projects",
      position: "left"
    }
  ];

  return (
    <div className="relative w-full bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Program <span className="text-yellow-400">Timeline</span>
          </h2>
          <div className="flex justify-center">
            <div className="w-32 h-1 bg-yellow-400 rounded-full"></div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-400 rounded-full hidden md:block"></div>

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-20">
            {phases.map((phase, index) => (
              <div
                key={phase.id}
                className={`relative flex items-center ${
                  phase.position === 'left' 
                    ? 'md:flex-row-reverse md:text-right' 
                    : 'md:flex-row md:text-left'
                } flex-col text-center`}
              >
                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${phase.position === 'left' ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="bg-gray-900/80 backdrop-blur-sm border-2 border-yellow-500/40 rounded-2xl p-6 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20">
                    {/* Phase Label */}
                    <div className="mb-4">
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 italic transform -skew-x-12 inline-block">
                        {phase.phase}
                      </h3>
                    </div>

                    {/* Title */}
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {phase.title}
                    </h4>

                    {/* Week */}
                    <p className="text-yellow-400 font-semibold mb-4 text-sm md:text-base">
                      {phase.week}
                    </p>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                      {phase.description}
                    </p>
                  </div>
                </div>

                {/* Center Point */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full border-4 border-black z-10"></div>

                {/* Arrow */}
                {index < phases.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-20" style={{ top: '100%', marginTop: '1rem' }}>
                    <svg 
                      width="40" 
                      height="40" 
                      viewBox="0 0 40 40" 
                      className="text-gray-400 animate-pulse"
                      style={{ animationDelay: `${index * 0.5}s` }}
                    >
                      <path 
                        d="M20 5 Q30 15 20 25 Q10 15 20 5" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        fill="none"
                        className="transform rotate-90"
                      />
                      <circle 
                        cx="20" 
                        cy="20" 
                        r="2" 
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                )}

                {/* Mobile Arrow */}
                {index < phases.length - 1 && (
                  <div className="md:hidden flex justify-center my-6">
                    <svg 
                      width="30" 
                      height="30" 
                      viewBox="0 0 30 30" 
                      className="text-yellow-400"
                    >
                      <path 
                        d="M15 5 L15 20 M10 15 L15 20 L20 15" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        fill="none"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating particles */}
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={`timeline-particle-${i}`}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-30 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}

          {/* Gradient orbs */}
          <div className="absolute top-40 left-20 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-20 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgramTimeline;