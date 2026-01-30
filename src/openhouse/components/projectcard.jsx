function ProjectCard({ imageurl, domain, name, description }) {
  return (
    <div
      style={{
        backgroundColor: "hsl(0,0%,8%)",
        border: "1px solid hsla(50, 100%, 50%, 0.3)",
      }}
      className="w-full rounded-none hover:opacity-80 transition-opacity duration-300"
    >
      {/* IMAGE */}
      <img
        src={imageurl}
        alt={name}
        className="w-full h-56 object-cover"
      />

      {/* CONTENT */}
      <div className="p-6">
        {/* DOMAIN */}
        <span style={{ color: "hsl(50,100%,50%)" }} className="text-xs uppercase tracking-widest">
          [ {domain} ]
        </span>

        {/* TITLE */}
        <h3 style={{ color: "hsl(0,0%,98%)" }} className="text-xl font-bold mt-3">
          {name}
        </h3>

        {/* DESCRIPTION */}
        <p style={{ color: "hsl(0,0%,65%)" }} className="mt-2 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default ProjectCard;
