import React, { useState, useEffect } from 'react';
import { scient } from '../assets';
import '../styles/header.css';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation(); // Get current URL path
  const [activeTab, setActiveTab] = useState('');

  // Set active tab based on the current URL
  useEffect(() => {
    const path = location.pathname.split('/')[2]; // Get the part of the path after "/admindashboard/"
    if (path === 'requests') {
      setActiveTab('requests');
    } else if (path === 'history') {
      setActiveTab('history');
    } else if (path === 'profile') {
      setActiveTab('profile');
    } else {
      setActiveTab('home'); // Default to home if no other path is matched
    }
  }, [location]); // Trigger whenever the location changes

  return (
    <div className="header">
      <div className="logo">
        <img src={scient} alt="Logo" />
      </div>
      <div className="nav-links">
        <Link
          to="/admindashboard"
          className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
        >
          HOME
        </Link>
        <span className="separator">|</span>
        <Link
          to="/admindashboard/requests"
          className={`nav-link ${activeTab === 'requests' ? 'active' : ''}`}
        >
          REQUESTS
        </Link>
        <span className="separator">|</span>
        <Link
          to="/admindashboard/history"
          className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
        >
          HISTORY
        </Link>
        <span className="separator">|</span>
        <Link
          to="/admindashboard/profile"
          className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
        >
          PROFILE
        </Link>
      </div>
    </div>
  );
}

export default Header;
