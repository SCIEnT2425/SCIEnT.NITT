import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const TABS = [
  { to: '/admin/team', label: 'Team Members' },
  { to: '/admin/projects', label: 'Projects & Clubs' },
  { to: '/admin/settings', label: 'Timeline Settings' },
  { to: '/admin/messages', label: 'Messages' },
];

// Navigation shared by the admin dashboards; Messages shows how many are unread
const AdminTabs = ({ className = 'mb-6' }) => {
  const location = useLocation();
  const { token, API_BASE } = useAuth();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    axios.get(`${API_BASE}/api/contact/unread-count`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUnread(res.data.data || 0))
      .catch(() => setUnread(0));
  }, [API_BASE, token, location.pathname]);

  return (
    <div className={`max-w-7xl mx-auto ${className} flex flex-wrap sm:flex-nowrap bg-zinc-900/90 border border-zinc-800 p-1 rounded-xl w-full sm:w-fit gap-1 backdrop-blur-sm`}>
      {TABS.map(({ to, label }) => {
        const active = location.pathname.includes(to);
        return (
          <Link
            key={to}
            to={to}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 text-center px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              active
                ? 'bg-yellow-400 text-black shadow-md shadow-yellow-400/10'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            {label}
            {to === '/admin/messages' && unread > 0 && (
              <span className={`min-w-[20px] rounded-full px-1.5 text-xs font-bold ${active ? 'bg-black text-yellow-400' : 'bg-yellow-400 text-black'}`}>
                {unread}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default AdminTabs;
