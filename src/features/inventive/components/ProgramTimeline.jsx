import React, { useState } from "react";
import "../styles/ProgramTimeline.css";

const ProgramTimeline = () => {
  const phases = [
    {
      id: 1,
      phase: "PHASE 1",
      title: "OUTREACH",
      week: "WEEK 1 - WEEK 2",
      dates: "Sept, 14 - Sept, 28",
      description:
        "Registration opens for students to apply with their ideas and solutions.",
    },
    {
      id: 2,
      phase: "PHASE 2",
      title: "INTAKE",
      week: "WEEK 3",
      dates: "Sept, 29 - Oct, 10",
      description: "Present your ideas.",
    },
    {
      id: 3,
      phase: "PHASE 3",
      title: "SELECTION",
      week: "WEEK 4",
      dates: "Oct, 11 - Oct, 18",
      description:
        "Projects selected based on usefulness, novelty, ethics, feasibility. Assigning student mentors, facilities and alumni for guiding.",
    },
    {
      id: 4,
      phase: "PHASE 4",
      title: "INCUBATION",
      week: "WEEK 5 - WEEK 11",
      dates: "Oct, 19 - Dec, 14",
      description: "Project work in progress.",
    },
    {
      id: 5,
      phase: "PHASE 5",
      title: "SHOWCASE",
      week: "WEEK 12",
      dates: "Dec, 14 - Dec, 21",
      description:
        "Showcase of projects. Patent filing support for worthy projects.",
    },
  ];

  const [activePhase, setActivePhase] = useState(0);

  const current = phases[activePhase];

  return (
    <section className="timelineSection">
      <div className="timelineFrame">

        {/* Background arcs */}
        <div className="timelineArcs" aria-hidden="true">
          <span className="arc arc1" />
          <span className="arc arc2" />
          <span className="arc arc3" />
          <span className="arc arc4" />
          <span className="arc arc5" />
          <span className="arc arc6" />
        </div>

        {/* Heading */}
        <div className="timelineHeading">
          <h2>
            Program <span>Timeline</span>
          </h2>

          <div className="timelineUnderline" />
        </div>

        {/* Main timeline */}
        <div className="timelineLayout">

          {/* LEFT PHASE LIST */}
          <div className="timelinePhaseList">

            {phases.map((phase, index) => (
              <button
                key={phase.id}
                type="button"
                className={`timelinePhase ${
                  activePhase === index ? "active" : ""
                }`}
                onClick={() => setActivePhase(index)}
              >
                <span className="phaseDot" />

                <span className="phaseConnector" />

                <span className="phaseName">
                  {phase.title}
                </span>
              </button>
            ))}

          </div>

          {/* RIGHT CARD */}
          <div className="timelineCard">

            <div className="timelineCardPhase">
              {current.phase}
            </div>

            <h3>{current.title}</h3>

            <div className="timelineCardWeek">
              {current.week}
            </div>

            <div className="timelineCardDates">
              ( {current.dates} )
            </div>

            <p>
              {current.description}
            </p>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ProgramTimeline;