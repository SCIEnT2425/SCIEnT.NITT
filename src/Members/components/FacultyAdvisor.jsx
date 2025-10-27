import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminCard from './AdminCard';

export default function FacultyAdvisorSection() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const dummyAdmin = {
    name: "Dr. Faculty Name",
    role: "Faculty Advisor",
    Department: "Computer Science & Engineering",
    photoUrl: "/Team/faculty_advisor.png",
    email: "faculty@nitt.edu",
    bio: "Guiding students towards excellence",
    linkedin: "https://linkedin.com/in/example"
  };

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:2000/api/team/faculty-advisors');
        
        if (response.data && response.data.data && response.data.data.length > 0) {
          setAdmin(response.data.data[0]);
        } else {
          setAdmin(dummyAdmin);
        }
      } catch (err) {
        console.error('Error fetching faculty advisor:', err);
        setAdmin(dummyAdmin);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black py-12 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <AdminCard admin={admin} type="faculty" />
    </div>
  );
}