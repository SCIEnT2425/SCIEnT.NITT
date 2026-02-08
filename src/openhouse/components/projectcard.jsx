function ProjectCard({ imageurl, domain, name, description }) {
  return (
    <div className="w-full rounded-none border border-yellow-500/30 bg-gray-900 hover:opacity-80 transition-opacity duration-300">
      {/* IMAGE */}
      <img
        src={imageurl}
        alt={name}
        className="w-full h-96 md:h-40 lg:h-48 object-cover"
      />

      {/* CONTENT */}
      <div className="p-6">
        {/* DOMAIN */}
        <span className="text-xs uppercase tracking-widest text-yellow-500">
          [ {domain} ]
        </span>

        {/* TITLE */}
        <h3 className="text-xl font-bold mt-3 text-gray-100">
          {name}
        </h3>

        {/* DESCRIPTION */}
        <p className="mt-2 text-sm leading-relaxed text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}

export default ProjectCard;
