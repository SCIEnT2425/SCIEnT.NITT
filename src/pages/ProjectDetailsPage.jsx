import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import "./ProjectDetails.css";

export default function ProjectDetailsPage() {
  const { name, projectId } = useParams();
  const [project, setProject] = useState(null);
  const [otherProjects, setOtherProjects] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    fetch(`/api/clubs/${name}/projects/${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data.project);
        setOtherProjects(data.otherProjects || []);
      })
      .catch((err) => console.error(err));
  }, [name, projectId]);

  if (!project) return <p className="loading-text">Loading...</p>;

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="project-page">
      <Navbar/>
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <Link to={`/clubs/${name}/projects`} className="breadcrumb-link">
          {name}
        </Link>
        <span className="breadcrumb-separator">&gt;</span>
        <span>{project.year}</span>
        <span className="breadcrumb-separator">&gt;</span>
        <span className="breadcrumb-active">{project.name}</span>
      </div>

      {/* Project Header */}
      <div className="project-header">
        <div className="header-left">
          <h1>{project.name}</h1>
          <p className="section-title">Description</p>
          <p className="description">
            {project.description ||
              "No description available for this project."}
          </p>
        </div>

        <div className="header-right">
          <div className="year-badge">{project.year}</div>
          <img
            src={
              project.image?.url ||
              project.image ||
              "https://picsum.photos/400/300?random"
            }
            alt={project.name}
          />
        </div>
      </div>

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <div className="other-projects">
          <h2>Other Projects in {project.year}</h2>

          <div className="scroll-container">
            <button className="scroll-btn left" onClick={() => scroll("left")}>
              <ChevronLeft />
            </button>

            <div className="projects-row" ref={scrollRef}>
              {otherProjects.map((p) => (
                <Link
                  key={p._id}
                  to={`/clubs/${name}/projects/${p._id}`}
                  className="project-card"
                >
                  <img
                    src={
                      p.image?.url ||
                      p.image ||
                      "https://picsum.photos/400/300?random"
                    }
                    alt={p.name}
                  />
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <button className="details-btn">Details</button>
                </Link>
              ))}
            </div>

            <button
              className="scroll-btn right"
              onClick={() => scroll("right")}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
