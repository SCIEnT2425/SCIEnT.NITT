import React from "react";
import { Link, useParams } from "react-router-dom";

export default function ProjectCard({ project }) {
  const { name } = useParams(); // current club name from URL

  return (
    <div className="bg-gray-900 p-4 rounded-2xl shadow-lg w-72 flex-shrink-0">
      {/* Project Image */}
      <img
        src={project.image?.url || project.image}
        alt={project.name}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />

      {/* Title */}
      <h3 className="font-bold text-lg">{project.name}</h3>

      {/* Short Description */}
      <p className="text-sm text-gray-300 mt-2 line-clamp-3">
        {project.description}
      </p>

      {/* Footer */}
      <div className="flex justify-end mt-4">
        <Link
          to={`/clubs/${name}/projects/${project._id}`}
          className="px-4 py-1 rounded-full bg-yellow-400 text-black text-sm font-medium hover:bg-yellow-500 transition-colors"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
