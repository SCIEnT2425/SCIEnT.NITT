import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/footer";
import ClubCard from "../components/ClubCard";
import StrokeText from "../components/StrokeText";
import "./ClubsPage.css";


export default function ClubsPage() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const MODE = process.env.NODE_ENV || 'development';
        const API_BASE = MODE==="development"? 'http://localhost:5000/api/clubs' : "/api/clubs";
        const res = await axios.get(API_BASE);
        setClubs(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchClubs();
  }, []);

  return (
    <>
      <div className="clubs-page">
        <h1 className="clubs-title">
          <StrokeText
            text="CLUBS"
            strokeColor="#facc15"
            fillColor="#facc15"
            strokeWidth={1.6}
            drawDuration={1.4}
            fillDelay={0.15}
            stagger={0.08}
            ease="power2.out"
            trigger="mount"
            fillMode="wipe"
            wipeFrom="left"
            fontSize={80}
            fontWeight={900}
            letterSpacing={4}
            hoverRedraw
          />
        </h1>

        <div className="clubs-grid">
          {clubs.map((club) => (
            <ClubCard key={club._id} club={club} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
