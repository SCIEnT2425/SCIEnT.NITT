import React, { useState } from 'react';
import AdminCard from './AdminCard';

export default function FacultyAdvisorSection({ AdvisorData }) {
  const [admin] = useState(AdvisorData);

  return (
    <div className="w-full">
      <AdminCard admin={admin} type="faculty" />
    </div>
  );
}