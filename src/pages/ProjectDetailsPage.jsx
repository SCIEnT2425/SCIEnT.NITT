import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProjectDetailsPage() {
  const { name, projectId } = useParams();
  const [project, setProject] = useState(null);
  const [otherProjects, setOtherProjects] = useState([]);

  useEffect(() => {
    fetch(`/api/clubs/${name}/projects/${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data.project);
        setOtherProjects(data.otherProjects || []);
      })
      .catch((err) => console.error(err));
  }, [name, projectId]);

  if (!project) return <p className="text-gray-400">Loading...</p>;

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      {/* Breadcrumbs */}
      <div className="mb-6 text-sm">
        <Link to={`/clubs/${name}/projects`} className="hover:underline">
          {name}
        </Link>{" "}
        &gt; {project.year} &gt;{" "}
        <span className="text-yellow-400">{project.name}</span>
      </div>

      {/* Project Header */}
      <div className="bg-gray-900 rounded-2xl p-6 flex gap-6 items-center mb-10">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="text-yellow-400 font-semibold mt-2">Description</p>
          <p className="mt-2 text-gray-300">{project.description}</p>
        </div>
        <div>
          <img
            src={project.image?.url || project.image}
            alt={project.name}
            className="w-72 rounded-lg"
          />
          {project.year && (
            <div className="mt-3 px-3 py-1 bg-yellow-500 text-black rounded-full text-center">
              {project.year}
            </div>
          )}
        </div>
      </div>

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-green-400">
            Other Projects in {project.year}
          </h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {otherProjects.map((p) => (
              <Link
                key={p._id}
                to={`/clubs/${name}/projects/${p._id}`}
                className="bg-gray-900 p-4 rounded-2xl w-64 flex-shrink-0 hover:scale-105 transition-transform"
              >
                <img
                  src={p.image?.url || p.image}
                  alt={p.name}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-sm text-gray-300 line-clamp-2">
                  {p.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
