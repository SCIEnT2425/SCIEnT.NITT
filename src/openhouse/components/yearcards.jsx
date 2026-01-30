function YearCards({ imageurl, batch, projects, visitors }) {
  return (
    <div
      className="
        relative overflow-hidden
        w-full aspect-[5/3]
        border
        transition-all duration-300 group
        rounded-lg
      "
      style={{ borderColor: "hsl(50, 100%, 50%, 0.3)", backgroundColor: "hsl(0,0%,0%)" }}
    >
      {/* IMAGE */}
      <img
        src={imageurl}
        alt={batch}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />

      {/* DARK GRADIENT OVERLAY */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)" }}
      />

      {/* CONTENT */}
      <div className="relative p-6 h-full flex flex-col justify-end">
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: "hsl(50, 100%, 50%)" }}
        >
          {"<  "}{batch}{"  />"}
        </span>

        <h3
          className="text-5xl font-bold mt-2"
          style={{ color: "hsl(50, 100%, 50%)" }}
        >
          OPENHOUSE {batch.slice(-2)}
        </h3>

        <div className="flex gap-4">
          <p
            className="mt-1 text-sm"
            style={{ color: "hsl(0, 0%, 65%)" }}
          >
            {projects} Projects
          </p>
          <p
            className="mt-1 text-sm"
            style={{ color: "hsl(0, 0%, 65%)" }}
          >
            {visitors} Visitors
          </p>
        </div>
      </div>
    </div>
  );
}

export default YearCards;
