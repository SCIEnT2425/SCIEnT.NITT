import { sponsors } from "../constants/constants";



const SponsorsSection = () => {



  return (
    <section
      id="previous-sponsors"
      style={{ backgroundColor: "hsl(0, 0%, 5%)" }}
      className="py-20 md:py-32 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span style={{ color: "hsl(0, 0%, 98%)" }}>PAST</span>{" "}
            <span style={{ color: "hsl(50, 100%, 50%)" }}>VISITORS</span>
          </h2>
          <div
            className="w-24 h-1 mx-auto"
            style={{ backgroundColor: "hsl(50, 100%, 50%)" }}
          />
        </div>

        {/* Sponsor Logos */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "hsl(0, 0%, 8%)",
                border: "1px solid hsl(0, 0%, 20%)",
                borderRadius: "0.75rem", // matches rounded-xl
              }}
              className="flex items-center justify-center w-56 h-32"
            >
              {sponsor.logo ? (
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-w-full max-h-full object-contain p-4"
                />
              ) : (
                <span
                  style={{ color: "hsl(0, 0%, 65%)" }}
                  className="text-lg font-semibold"
                >
                  {sponsor.name}
                </span>
              )}
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default SponsorsSection;
