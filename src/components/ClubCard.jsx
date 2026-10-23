import React from "react";
import "./ClubCard.css";
import { optimizedImage } from "../utils/optimizedImage";

export default function ClubCard({ club, onClick }) {
  return (
    <div className="club-card" onClick={onClick}>
      <div className="club-card-inner">
        <img src={optimizedImage(club.logo, 400)} alt={club.name} className="club-logo" />
        <h2 className="club-name">{club.name}</h2>
      </div>
    </div>
  );
}
