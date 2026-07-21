import ProjectCard from "../components/projectcard";
import { projects } from "../constants/constants";
import { useEffect, useRef, useState } from "react";

function Projects() {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const speed = isMobile ? 0.25 : 0.4; // slower on mobile

    let timeout;

    const handleScroll = () => {
      setIsUserScrolling(true);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsUserScrolling(false);
      }, 1200);
    };

    container.addEventListener("scroll", handleScroll);

    const animate = () => {
      if (!isHovered && !isUserScrolling) {
        container.scrollLeft += speed;

        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft -= container.scrollWidth / 2;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isHovered, isUserScrolling]);

  return (
    <section
      id="projects"
      className="py-10 md:py-14 px-4 scroll-mt-24"
      style={{
        backgroundColor: "hsl(0, 0%, 5%)",
        color: "hsl(0,0%,98%)",
      }}
    >
      <div className="max-w-4xl laptop:max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-8 laptop:mb-10">
          <h2 className="text-xl laptop:text-2xl desktop:text-5xl font-bold mb-3 md:mb-4">
            <span style={{ color: "hsl(50, 100%, 50%)" }}>
              PROJECTS IN
            </span>{" "}
            <span>OPENHOUSE 2026</span>
          </h2>

          <div
            className="w-16 md:w-24 h-1 mx-auto"
            style={{ backgroundColor: "hsl(50, 100%, 50%)" }}
          />
        </div>

        {/* Horizontal Scroll */}
        <div className="relative">
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="
              flex
              gap-6 md:gap-12
              overflow-x-auto
              pb-6
              no-scrollbar
              touch-pan-x
            "
          >
            {[...projects, ...projects].map((project, index) => (
              <div
                key={index}
                className="
                  min-w-[280px]
                  sm:min-w-[340px]
                  md:min-w-[420px]
                  max-w-[280px]
                  sm:max-w-[340px]
                  md:max-w-[420px]
                  flex-shrink-0
                "
              >
                <ProjectCard
                  imageurl={project.imageurl}
                  domain={project.domain}
                  name={project.name}
                  description={project.description}
                />
              </div>
            ))}
          </div>

          {/* Edge Fade */}
          <div className="pointer-events-none absolute top-0 left-0 h-full w-10 laptop:w-16 bg-gradient-to-r from-[hsl(0,0%,3%)] to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 h-full w-10 laptop:w-16 bg-gradient-to-l from-[hsl(0,0%,3%)] to-transparent" />
        </div>
      </div>
    </section>
  );
}

export default Projects;
