import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminCard from './AdminCard';

export default function FacilityAdminSection() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const dummyAdmin = {
    name: "John Smith",
    role: "Facility Admin",
    Department: "Facility Management",
    photoUrl: "/Team/facility_admin.png",
    email: "admin@nitt.edu",
    bio: "Ensuring smooth operations and maintenance of all facilities",
    linkedin: "https://linkedin.com/in/example"
  };

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:2000/api/team/facility-admins');
        
        if (response.data && response.data.data && response.data.data.length > 0) {
          setAdmin(response.data.data[0]);
        } else {
          setAdmin(dummyAdmin);
        }
      } catch (err) {
        console.error('Error fetching facility admin:', err);
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
      <AdminCard admin={admin} type="facility" />
    </div>
  );
}