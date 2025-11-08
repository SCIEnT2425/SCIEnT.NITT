import React from "react";
import "./ClubCard.css";

export default function ClubCard({ club, onClick }) {
  return (
    <div className="club-card" onClick={onClick}>
      <div className="club-card-inner">
        <img src={club.logo} alt={club.name} className="club-logo" />
        <h2 className="club-name">{club.name}</h2>
      </div>
    </div>
  );
}
