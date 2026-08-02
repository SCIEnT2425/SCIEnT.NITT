import React, { useState } from 'react';
import AdminCard from './AdminCard';

export default function FacilityAdminSection({ adminData }) {
  const [admin] = useState(adminData);

  return (
    <div className="w-full">
      <AdminCard admin={admin} type="facility" />
    </div>
  );
}