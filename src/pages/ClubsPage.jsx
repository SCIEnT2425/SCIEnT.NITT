import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import ClubCard from "../components/ClubCard";
import "./ClubsPage.css";

export default function ClubsPage() {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    fetch("/api/clubs")
      .then((res) => res.json())
      .then((data) => setClubs(data || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="clubs-page">
        <h1 className="clubs-title">CLUBS</h1>

        <div className="clubs-grid">
          {clubs.map((club) => (
            <ClubCard
              key={club._id}
              club={club}
              onClick={() => navigate(`/clubs/${club.name}/projects`)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
