import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminCard from './AdminCard';

export default function FacultyAdvisorSection({AdvisorData}) {
  const [admin, setAdmin] = useState(AdvisorData);

  
  return (
    <div className="min-h-screen bg-black py-12">
      <AdminCard admin={admin} type="faculty" />
    </div>
  );
}