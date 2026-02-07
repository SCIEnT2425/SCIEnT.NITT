import YearCards from "../components/yearcards";
import { years } from "../constants/constants";

function PreviousEditions() {
  

  return (
    <section
      id="previous-editions"
      style={{ backgroundColor: "hsl(0, 0%, 5%)" }}
      className="py-20 md:py-10 px-4 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span style={{ color: "hsl(50, 100%, 50%)" }}>PREVIOUS</span>{" "}
            <span style={{ color: "hsl(0, 0%, 98%)" }}>EDITIONS</span>
          </h2>
          <div
            className="w-24 h-1 mx-auto"
            style={{ backgroundColor: "hsl(50, 100%, 50%)" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 justify-items-center">
          {years.map((year, index) => (
            <YearCards
              key={index}
              imageurl={year.imageurl}
              batch={year.batch}
              projects={year.projects}
              visitors={year.visitors}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PreviousEditions;
