import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import ClubCard from "../components/ClubCard";

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
      <div className="p-6 bg-black min-h-screen text-white">
        <h1 className="text-4xl font-bold text-center mb-10">CLUBS</h1>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
