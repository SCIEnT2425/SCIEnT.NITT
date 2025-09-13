import React from 'react';
import "../styles/Inventive.css"
const TimeLine = ({ phase, isReverse }) => {
  return (
    <div
      key={phase.id}
      className={`flex ${isReverse ? 'flex-row-reverse' : 'flex-row'} items-start phaseCard gap-8 border-b border-gray-800 pb-8 md:pb-12`}
    >
      {/* Content: Title + Week + Description */}
      <div className="phaseCardContent w-full md:w-1/2 flex wrap flex-col">

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 md:mb-3">
          {phase.title}
        </h3>
        <p className="phaseWeekDates text-base sm:text-lg md:text-xl">
          <span className="text-yellow-400 font-semibold block phaseWeek">{phase.week}</span>{" "}
          <span className="text-gray-300 italic text-sm ">( {phase.dates} )</span>
        </p>

        <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
          {phase.description}
        </p>
      </div>

      {/* Phase Text */}
      <div className=" titlePhasediv w-full md:w-1/2 flex justify-start md:justify-end items-center mt-4 md:mt-0">
        <h3 className="titlePhase text-3xl  bg-gradient-to-b from-yellow-400 to-black bg-clip-text text-transparent font-extrabold italic opacity-90">
          {phase.phase}
        </h3>
      </div>
    </div>
  );
};

export default TimeLine;