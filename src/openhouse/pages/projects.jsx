import ProjectCard from "../components/projectcard";
import { useState } from "react";
import { projects } from "../constants/constants";

function Projects() {
  const INITIAL_COUNT = 3;
  const STEP = 3;

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + STEP, projects.length));
  };

  const showLess = () => {
    setVisibleCount(INITIAL_COUNT);
    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth" });
  };



  return (
    <section
      id="projects"
      style={{ backgroundColor: "hsl(0, 0%, 5%)", color: "hsl(0,0%,98%)" }}
      className="py-20 md:py-32 px-4 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span style={{ color: "hsl(50, 100%, 50%)" }}>PROJECTS IN</span>{" "}
            <span style={{ color: "hsl(0, 0%, 98%)" }}>OPENHOUSE 2026</span>
          </h2>
          <div
            className="w-24 h-1 mx-auto"
            style={{ backgroundColor: "hsl(50, 100%, 50%)" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 justify-items-center">
          {projects.slice(0, visibleCount).map((project, index) => (
            <ProjectCard
              key={index}
              imageurl={project.imageurl}
              domain={project.domain}
              name={project.name}
              description={project.description}
            />
          ))}
        </div>

        <div className="mt-16 text-center space-x-4">
          {visibleCount < projects.length && (
            <button
              onClick={showMore}
              style={{
                border: "1px solid hsl(50, 100%, 50%)",
                color: "hsl(50, 100%, 50%)",
              }}
              className="px-8 py-3 font-semibold hover:bg-[rgba(50,255,0,0.2)] transition-all duration-300"
            >
              View More Projects →
            </button>
          )}

          {visibleCount === projects.length && (
            <button
              onClick={showLess}
              style={{
                border: "1px solid hsl(0, 0%, 65%)",
                color: "hsl(0, 0%, 65%)",
              }}
              className="px-8 py-3 font-semibold hover:bg-[rgba(165,165,165,0.2)] transition-all duration-300"
            >
              ← View Less
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Projects;
