import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProjectSection.css';
import Footer from '../components/footer';
import Navbar from '../components/Navbar';
//import { spider, delta, ecell, max, sigma, oedc, dc, naksh, psi, rmi, graphique, td, prof, fh, db, ever } from "../assets";
import ProjectCard from '../components/ProjectCard';
import  { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function ProjectsPage() {
  const { name } = useParams(); // club name from URL
  const [club, setClub] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedYear, setSelectedYear] = useState("ALL");

  useEffect(() => {
    fetch(`/api/clubs/${name}/projects`)
      .then((res) => res.json())
      .then((data) => {
        setClub(data.club);
        setProjects(data.projects || []);
      })
      .catch((err) => console.error(err));
  }, [name]);

  // Extract available years
  const years = [...new Set(projects.map((p) => p.year).filter(Boolean))].sort(
    (a, b) => b - a
  );

  // Apply year filter
  const filteredProjects =
    selectedYear === "ALL"
      ? projects
      : projects.filter((p) => p.year === selectedYear);

  // Group by year
  const groupedProjects = years.reduce((acc, year) => {
    acc[year] = filteredProjects.filter((p) => p.year === year);
    return acc;
  }, {});

  // Scroll refs for each year row
  const scrollRefs = useRef({});

  const scroll = (year, direction) => {
    const container = scrollRefs.current[year];
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
        <Navbar/>
    <div className="p-6 text-white bg-black min-h-screen">
      {/* Club Info */}
      {club && (
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold">{club.name}</h1>
            {club.description && (
              <>
                <p className="text-yellow-400 font-semibold mt-2">
                  Description
                </p>
                <p className="max-w-2xl">{club.description}</p>
              </>
            )}
          </div>
          {club.logo && (
            <img
              src={club.logo}
              alt={`${club.name} Logo`}
              className="w-32 h-32 object-contain"
            />
          )}
        </div>
      )}

      {/* Year Filter */}
      <div className="flex gap-3 mb-8 flex-wrap">
        <button
          className={`px-4 py-1 rounded-full ${
            selectedYear === "ALL"
              ? "bg-yellow-400 text-black"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
          onClick={() => setSelectedYear("ALL")}
        >
          ALL
        </button>
        {years.map((year) => (
          <button
            key={year}
            className={`px-4 py-1 rounded-full ${
              selectedYear === year
                ? "bg-yellow-400 text-black"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Projects by Year */}
      {Object.keys(groupedProjects).map((year) => (
        <div key={year} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{year}</h2>
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => scroll(year, "left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 p-2 rounded-full hover:bg-yellow-400 hover:text-black"
            >
              <ChevronLeft />
            </button>

            {/* Scrollable Row */}
            <div
              ref={(el) => (scrollRefs.current[year] = el)}
              className="flex gap-4 overflow-x-auto no-scrollbar px-10"
            >
              {groupedProjects[year].map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scroll(year, "right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 p-2 rounded-full hover:bg-yellow-400 hover:text-black"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      ))}

      {/* Handle case: no projects */}
      {projects.length === 0 && (
        <p className="text-gray-400 text-lg">No projects found for this club.</p>
      )}
    </div>
    <Footer/>
    </div>
  );
}
