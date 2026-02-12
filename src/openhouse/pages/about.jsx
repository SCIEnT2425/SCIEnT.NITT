function About() {
  const stats = [
    { number: "70+", label: "Projects" },
    { number: "9000+", label: "Visitors" },
    { number: "10+", label: "Domains" },
    { number: "2", label: "Days" },
  ];

  return (
    <section
      id="about"
      style={{ backgroundColor: "hsl(0, 0%, 5%)", color: "hsl(0, 0%, 98%)" }}
      className="py-20 md:py-32 px-4 scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span style={{ color: "hsl(50, 100%, 50%)" }}>ABOUT</span>{" "}
            <span style={{ color: "hsl(0, 0%, 98%)" }}>OPENHOUSE</span>
          </h2>
          <div
            className="w-24 h-1 mx-auto"
            style={{ backgroundColor: "hsl(50, 100%, 50%)" }}
          />
        </div>

        {/* Description */}
        <div
          className="space-y-6 text-center md:text-lg leading-relaxed"
          style={{ color: "hsl(0, 0%, 65%)" }}
        >
          <p>
            The{" "}
            <span style={{ color: "hsl(50, 100%, 50%)", fontWeight: 600 }}>
              Open House Exhibition
            </span>
            , conducted by{" "}
            <span style={{ color: "hsl(0, 0%, 98%)", fontWeight: 500 }}>
              SCIEnT
            </span>{" "}
            — Student Centre for Innovation in Engineering and Technology of
            the{" "}
            <span style={{ color: "hsl(0, 0%, 98%)", fontWeight: 500 }}>
              National Institute of Technology, Tiruchirappalli
            </span>
            , is a platform for students to showcase their technical projects
            across Aerospace, Robotics, AI, and Sustainable energy.
          </p>

          <p>
            The exhibition will be held in association with{" "}
            <span style={{ color: "hsl(50, 100%, 50%)", fontWeight: 600 }}>
              {/* remove underline */}
              <a href="https://pragyan.org" target="_blank" rel="noopener noreferrer"  className="no-underline " >
              Pragyan&apos;26

              </a>
            </span>
            , the ISO-certified annual technical festival of the National
            Institute of Technology, Tiruchirappalli, from{" "}
            <span style={{ color: "hsl(0, 0%, 98%)", fontWeight: 500 }}>
              February 20–21, 2026
            </span>
            .
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-lg transition-colors duration-300"
              style={{
                backgroundColor: "hsl(0, 0%, 8%)",
                borderColor: "hsl(0, 0%, 20%)",
                borderStyle: "solid",
              }}
            >
              <div
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: "hsl(50, 100%, 50%)" }}
              >
                {stat.number}
              </div>
              <div
                className="text-xs uppercase tracking-wider"
                style={{ color: "hsl(0, 0%, 65%)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
