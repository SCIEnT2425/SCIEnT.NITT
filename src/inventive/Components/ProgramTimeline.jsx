import React from "react";
import TimeLine from "./TimeLine";

const ProgramTimeline = () => {
  const phases = [
    {
      id: 1,
      phase: "PHASE 1",
      title: "OUTREACH",
      week: "WEEK 1 - WEEK 2",
      description:
        "Registration opens for students to apply with their ideas and solutions.",
    },
    {
      id: 2,
      phase: "PHASE 2",
      title: "INTAKE",
      week: "WEEK 3",
      description: "Present your ideas.",
    },
    {
      id: 3,
      phase: "PHASE 3",
      title: "SELECTION",
      week: "WEEK 4",
      description:
        "Projects selected based on usefulness, novelty, ethics, feasibility. Assigning student mentors, facilities and alumni for guiding",
    },
    {
      id: 4,
      phase: "PHASE 4",
      title: "INCUBATION",
      week: "WEEK 5 - WEEK 11",
      description: "Project work in progress",
    },
    {
      id: 5,
      phase: "PHASE 5",
      title: "SHOWCASE",
      week: "WEEK 12",
      description:
        "Showcase of projects. Patent filing support for worthy projects",
    },
  ];

  return (
    <div className="w-full bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto  space-y-16 ">
        {/* Title */}
        <div className="text-center mb-28">
          <h2 className="text-6xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Program <span className="text-yellow-400 ">Timeline</span>
          </h2>
          <div className="flex justify-center">
            <div className="w-32 h-1 bg-yellow-400 rounded-full"></div>
          </div>
        </div>

        {/* Timeline */}
        {phases.map((element, idx) => (
          <TimeLine key={element.id} phase={element} isReverse={idx % 2 === 0} />
        ))}
      </div>
    </div>
  );
};

export default ProgramTimeline;
