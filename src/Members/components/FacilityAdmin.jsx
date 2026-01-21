import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminCard from './AdminCard';

export default function FacilityAdminSection({adminData}) {
  const [admin, setAdmin] = useState(adminData);

  

  return (
    <div className="min-h-screen bg-black py-12">
      <AdminCard admin={admin} type="facility" />
    </div>
  );
}