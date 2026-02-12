import YearCards from "../components/YearCards";
import { years } from "../constants/constants";

function PreviousEditions() {
  return (
    <section
      id="previous-editions"
      className="py-20 md:py-16 px-4 scroll-mt-24 bg-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-yellow-400">PREVIOUS</span>{" "}
            <span className="text-white">EDITIONS</span>
          </h2>
          <div className="w-24 h-1 mx-auto bg-yellow-400" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-16 justify-items-center">
          {years.map((year, index) => (
            year.imageurl.sort(() => 0.5 - Math.random()), // shuffle images for each batch
            <YearCards
              key={index}
              imageUrls={year.imageurl}   // passing array properly
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
