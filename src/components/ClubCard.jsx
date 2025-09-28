import React from "react";

export default function ClubCard({ club, onClick }) {
  return (
    <div
      className="club-card bg-black border-2 border-yellow-400 rounded-md flex flex-col items-center justify-center p-6 cursor-pointer hover:scale-105 transition-transform"
      onClick={onClick}
    >
      <img
        src={club.logo}
        alt={club.name}
        className="w-32 h-32 object-contain rounded-full bg-white mb-4"
      />
      <h3 className="text-white font-bold text-lg">{club.name}</h3>
    </div>
  );
}
