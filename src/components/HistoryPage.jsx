import React, { useEffect, useState } from 'react';
import '../styles/HistoryPage.css';
import { 
  spider, 
  delta, 
  ecell, 
  graphique, 
  sigma, 
  ever, 
  oedc, 
  td, 
  fh, 
  max, 
  rmi, 
  psi, 
  dc, 
  naksh, 
  db, 
  prof, 
  scient 
} from '../assets';

// Converts UTC time to IST
const toIST = (utcString) => {
  const utcDate = new Date(utcString);
  const istOffset = 5.5 * 60; // IST offset in minutes
  return new Date(utcDate.getTime() + istOffset * 60000);
};

const formatTime = (utcString) => {
  const istDate = toIST(utcString);
  return istDate.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  });
};

const formatDate = (utcString) => {
  const istDate = toIST(utcString);
  return istDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Kolkata',
  });
};

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([]);
  const [clubs, setClubs] = useState([]); // Store clubs data

  // Fetch booking history from the backend
  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/bookings/history`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // JWT token
          },
        });

        const data = await response.json();
        if (response.ok) {
          setHistoryData(data); // Set fetched data to state
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching history data:', error);
      }
    };

    fetchHistoryData();
  }, []);

  // Fetch clubs data from backend
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/clubs/clubdata`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('authToken')}`, // Add token in the header
          },
        });
        const data = await response.json();
        setClubs(data); // Set clubs data
      } catch (error) {
        console.error("Error fetching clubs data:", error);
      }
    };

    fetchClubs();
  }, []);

  const clubLogos = {
    SPIDER: spider,
    DELTA: delta,
    "E-CELL": ecell,
    "180-DC": oedc,
    GRAPHIQUE: graphique,
    SIGMA: sigma,
    EVER: ever,
    OEDC: oedc,
    "3D-AERODYNAMICS": td,
    "FORCE-HYPERLOOP": fh,
    MAXIMUS: max,
    RMI: rmi,
    PSI: psi,
    "DESIGNERS-CONSORTIUM": dc,
    NAKSHATRA: naksh,
    "DATA-BYTE": db,
    PROFNITT: prof,
    SCIENT: scient,
  };

  return (
    <div className="app">
      <div className="history-container">
        <div className="history-header">
          <h2>HISTORY</h2>
        </div>
        <div className="history-items">
          {historyData.length === 0 ? (
            <p>No booking history available.</p>
          ) : (
            historyData.map((item, index) => {
              const club = clubs.find((club) => club._id === item.club); // Match by club ID
              const logo = clubLogos[club?.name.toUpperCase()] || null; // Get club logo

              return (
                <div key={index} className="history-item">
                  <div className="history-logo logo">
                    {/* Display the logo image */}
                    {logo ? (
                      <img src={logo} alt={club?.name} />
                    ) : (
                      <div>No Logo Available</div>
                    )}
                  </div>
                  <div className="history-info">
                    <span>Hall : {item.slot.room}</span>
                    <span className="pipe">|</span>
                    <span>Slot : {formatTime(item.slot.startTime)}</span>
                    <span className="pipe">|</span>
                    <span>Date : {formatDate(item.slot.startTime)}</span>
                    <span className="pipe">|</span>
                    {/* Display Approval Status */}
                    <span>
                      {item.approved === null ? (
                        <span style={{ color: 'red' }}>Not Approved</span>
                      ) : item.approved === false ? (
                        <span style={{ color: 'red' }}>Cancelled</span>
                      ) : (
                        <span style={{ color: 'lime' }}>Approved</span>
                      )}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
