import React from 'react';

const TimeLine = ({ phase, isReverse }) => {
  return (
    <div
      key={phase.id}
      className={`${isReverse ? 'flex-row-reverse' : 'flex-row'} flex items-start justify-around gap-8 border-b border-gray-800 pb-12`}
    >
      {/* Left side: Title + Week + Description */}
      <div className="w-1/3">
        <h4 className="text-4xl font-bold text-white mb-2">
          {phase.title}
        </h4>
        <p className="text-yellow-400 font-semibold mb-4 text-2xl md:text-base">
          {phase.week}
        </p>
        <p className="text-gray-300 leading-relaxed text-xl md:text-base">
          {phase.description}
        </p>
      </div>

      {/* Right side: Big Phase Text */}
      <div className="md:w-1/3 flex justify-end items-center">
        <h3 className="text-8xl bg-gradient-to-b from-yellow-400 to-black bg-clip-text text-transparent font-extrabold italic opacity-90">
          {phase.phase}
        </h3>
      </div>
    </div>
  );
};

export default TimeLine;
