import { useEffect, useState } from "react";

function YearCards({ imageUrls, batch, projects, visitors }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // change image every 3 seconds

    return () => clearInterval(interval);
  }, [imageUrls]);

  return (
    <div
      className="relative overflow-hidden w-full max-w-[900px] aspect-[16/9] 
                 border rounded-xl group"
      style={{
        borderColor: "hsl(50, 100%, 50%, 0.3)",
        backgroundColor: "black",
      }}
    >
      {/* Slider Container */}
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {imageUrls.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${batch}-${index}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative p-6 h-full flex flex-col justify-end">
        <span className="text-xs uppercase tracking-widest text-yellow-400">
          {"< "}OPENHOUSE {batch.slice(-4)}{" />"}
        </span>

        <h3 className="text-3xl md:text-4xl font-bold mt-2 text-yellow-400">
          {batch}
        </h3>

        <div className="flex gap-6 mt-3">
          <div>
            <p className="text-xl font-semibold text-white">
              {projects}
            </p>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Projects
            </p>
          </div>

          <div>
            <p className="text-xl font-semibold text-white">
              {visitors}
            </p>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Visitors
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YearCards;
