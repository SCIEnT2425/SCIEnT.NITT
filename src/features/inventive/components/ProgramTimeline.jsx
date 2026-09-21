import React from "react";
import TimeLine from "./TimeLine";
import "../styles/Inventive.css"
const ProgramTimeline = () => {
  const phases = [
    {
      id: 1,
      phase: "PHASE 1 ",
      title: "REGISTRATION",
      week: "WEEK 1",
      dates: "Sept, 21 - Sept, 27",
      description:
        "Registration opens for students to apply with their ideas and solutions.",
    },
    {
      id: 2,
      phase: "PHASE 2  ",
      title: "INTAKE",
      week: "WEEK 2",
      dates: "Sept, 29 - Oct, 4",
      description: "Present your ideas.",
    },
    {
      id: 3,
      phase: "PHASE 3 ",
      title: "SELECTION",
      week: "WEEK 3",
      dates: "Oct, 5 - Oct, 8",
      description:
        "Projects selected based on usefulness, novelty, ethics, feasibility. Assigning student mentors, facilities and alumni for guiding",
    },
    {
      id: 4,
      phase: "PHASE 4 ",
      title: "INCUBATION",
      week: "WEEK 4 - WEEK 8",
      dates: "Oct, 10 - Nov, 20",
      description: "Project work in progress",
    },
    {
      id: 5,
      phase: "PHASE 5",
      dates: "Nov, 30 - Dec, 24",
      title: "SHOWCASE",
      week: "WEEK 9",
      description:
        "Showcase of projects. Patent filing support for worthy projects",
    },
  ];

  return (
    <div className="w-full bg-black py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12 md:space-y-16 ">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="titleTimeline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4">
            Program <span className="text-yellow-400">Timeline</span>
          </h2>
          <div className="flex justify-center">
            <div className="w-20 sm:w-24 md:w-32 h-1 bg-yellow-400 rounded-full"></div>
          </div>
        </div>
        <div className=" timeLines  phases max-w-7xl mx-auto space-y-8 sm:space-y-12 md:space-y-16 relative">
        {/* Timeline */}
        {phases.map((element, idx) => (
          <TimeLine key={element.id} phase={element} isReverse={idx % 2 !== 0} />
        ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramTimeline;