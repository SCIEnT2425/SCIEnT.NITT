import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import the club logos
import { 
  spider, delta, ecell, graphique, sigma, ever, oedc, td, fh, max, rmi, psi, dc, naksh, db, prof, tc,scient 
} from '../assets'; // Adjust the path as needed

const styles = {
  container: {
    backgroundColor: '#1a1a1a',
    color: '#FFD700',
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bookingContainer: {
    textAlign: 'center',
    marginTop: '50px',
    backgroundColor: '#333',
    padding: '30px',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '1200px',
    boxSizing: 'border-box',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  },
  heading: {
    fontSize: '1.5em',
    marginBottom: '30px',
    color: '#FFD700',
  },
  slotsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '20px',
    width: '100%',
    boxSizing: 'border-box',
  },
  slot: {
    padding: '30px',
    backgroundColor: '#222',
    color: '#FFD700',
    fontSize: '1.2em',
    border: '1px solid #FFD700',
    borderRadius: '10px',
    textAlign: 'center',
    cursor: 'pointer',
    boxSizing: 'border-box',
    transition: 'transform 0.2s, background-color 0.3s',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotHover: {
    transform: 'scale(1.05)',
  },
  disabledSlot: {
    backgroundColor: '#3a1a1a', // Dark red tint
    opacity: 0.85,
    color: '#ffcccb', // Light coral text
    border: '1px solid #aa5555', // Subtle red border
    pointerEvents: 'none',
  },
  clubLogoContainer: {
    position: 'absolute',
    top: '1px',  // Adjusted position for top-left
    left: '1px', // Adjusted position for top-left
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#444',
    borderRadius: '50%',
    border: '2px solid #FFD700',  // Border to make logo look more defined
  },
  clubLogo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  confirmationPopup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#444',
    color: '#FFD700',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    width: '300px',
    zIndex: 1000,
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 999,
  },
  confirmationTitle: {
    fontSize: '1.2em',
    marginBottom: '15px',
    color: '#FFD700',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
  },
  confirmButton: {
    padding: '10px 15px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
    transition: 'background-color 0.2s',
  },
  confirmButtonHover: {
    backgroundColor: '#218838',
  },
  cancelButton: {
    padding: '10px 15px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
    transition: 'background-color 0.2s',
  },
  cancelButtonHover: {
    backgroundColor: '#c82333',
  },
};

const clubLogos = {
  SPIDER: spider,
  DELTA: delta,
  "E-CELL": ecell,
  "180-DC": oedc,
  GRAPHIQUE: graphique,
  SIGMA: sigma,
  EVER: ever,
  "3D-AERODYNAMICS": td,
  "FORCE-HYPERLOOP": fh,
  MAXIMUS: max,
  RMI: rmi,
  PSI: psi,
  "DESIGNERS-CONSORTIUM": dc,
  NAKSHATRA: naksh,
  "DATA-BYTE": db,
  PROFNITT: prof,
  "TECHNICAL-COUNCIL":tc,
  SCIEnT: scient,
};

const SlotBooking = () => {
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookings, setBookings] = useState([]);
  const selectedDate = localStorage.getItem('selectedDate');
  const selectedRoom = localStorage.getItem('selectedRoom');

  // Fetch available slots and bookings data
  useEffect(() => {
    const fetchSlotsAndBookings = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!selectedDate || !selectedRoom || !token) {
          console.error('Required data not found.');
          return;
        }

        // Fetch slots
        const slotsResponse = await axios.get(`/api/clubs/slots/available`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { date: selectedDate, room: selectedRoom },
        });
        setSlots(slotsResponse.data.slots);

        // Fetch bookings
        const bookingsResponse = await axios.get(`/api/bookings/pastbookings`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { date: selectedDate },
        });
        setBookings(bookingsResponse.data.filter((item) => item.approved));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSlotsAndBookings();
  }, [selectedDate, selectedRoom]);

  const handleSlotClick = (slot) => {
    if (!slot.booked) {
      setSelectedSlot(slot);
    }
  };

  const handleBookingSubmit = async () => {
    localStorage.setItem("room", selectedSlot.room);
    localStorage.setItem("startTime", selectedSlot.startTime);
    localStorage.setItem("endTime", selectedSlot.endTime);
    setSelectedSlot(null);
    navigate('/userdashboard/bookingform');
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata',
    });
  
  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'Asia/Kolkata', 
    });

    console.log("formated time: ", formatTime);
    console.log("formated date: ", formatDate);

  return (
    <div style={styles.container}>
      <div style={styles.bookingContainer}>
        <h2 style={styles.heading}>Slot Booking</h2>
        <div style={styles.slotsContainer}>
        {slots.map((slot) => {
          const booking = bookings.find((booking) => booking._id === slot.booking);
          const club = booking ? booking.club : null;

          return (
            <div
              key={slot._id}
              onClick={() => handleSlotClick(slot)}
              style={{
                ...styles.slot,
                ...(slot.booked && { backgroundColor: '#555' }),
                ...(selectedSlot && selectedSlot._id === slot._id && styles.slotHover),
                ...(slot.booked && styles.disabledSlot),
              }}
            >
              <div className="slot-details">
                <p className="room">{slot.room}</p>
                <p className="date">{formatDate(slot.startTime)}</p>
                <p className="time">
                  {`${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`}
                </p>
              </div>

              {slot.booked && club && (
                <div style={styles.clubLogoContainer}>
                  <img
                    src={clubLogos[club.name]}
                    alt={club.name}
                    style={styles.clubLogo}
                  />
                </div>
              )}
            </div>
          );
        })}
        </div>
        {selectedSlot && (
          <>
            <div style={styles.overlay} onClick={() => setSelectedSlot(null)} />
            <div style={styles.confirmationPopup}>
              <h3 style={styles.confirmationTitle}>Confirm Booking</h3>
              <p>
                <strong>Room:</strong> {selectedSlot.room} <br />
                <strong>Date:</strong> {formatDate(selectedSlot.startTime)} <br />
                <strong>Time:</strong> {`${formatTime(selectedSlot.startTime)} - ${formatTime(selectedSlot.endTime)}`}
              </p>
              <div style={styles.buttonContainer}>
                <button
                  style={styles.confirmButton}
                  onMouseOver={(e) => (e.target.style.backgroundColor = styles.confirmButtonHover.backgroundColor)}
                  onMouseOut={(e) => (e.target.style.backgroundColor = styles.confirmButton.backgroundColor)}
                  onClick={handleBookingSubmit}
                >
                  Confirm
                </button>
                <button
                  style={styles.cancelButton}
                  onMouseOver={(e) => (e.target.style.backgroundColor = styles.cancelButtonHover.backgroundColor)}
                  onMouseOut={(e) => (e.target.style.backgroundColor = styles.cancelButton.backgroundColor)}
                  onClick={() => setSelectedSlot(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SlotBooking;
