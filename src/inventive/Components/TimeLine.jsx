import React from 'react';

const TimeLine = ({ phase, isReverse }) => {
  return (
    <div
      key={phase.id}
      className={`flex flex-col md:${isReverse ? 'flex-row-reverse' : 'flex-row'} items-start justify-between gap-6 md:gap-8 border-b border-gray-800 pb-8 md:pb-12`}
    >
      {/* Content: Title + Week + Description */}
      <div className="w-full md:w-1/2">
        <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 md:mb-3">
          {phase.title}
        </h4>
        <p className="text-yellow-400 font-semibold mb-3 md:mb-4 text-base sm:text-lg md:text-xl">
          {phase.week}
        </p>
        <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
          {phase.description}
        </p>
      </div>

      {/* Phase Text */}
      <div className="w-full md:w-1/2 flex justify-start md:justify-end items-center mt-4 md:mt-0">
        <h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-b from-yellow-400 to-black bg-clip-text text-transparent font-extrabold italic opacity-90">
          {phase.phase}
        </h3>
      </div>
    </div>
  );
};

export default TimeLine;