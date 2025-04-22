import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import '../styles/request.css';
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

const Request = () => {
  const [requests, setRequests] = useState([]);

  // Fetch pending bookings from the backendD
  useEffect(() => {
    const fetchPendingBookings = async () => {
      try {
        const response = await fetch(`/api/admin/pending-bookings`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // JWT token
          },
        });

        const data = await response.json();
        if (response.ok) {
          setRequests(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchPendingBookings();
  }, []);

  // Approve booking
  const approveBooking = async (bookingId) => {
    try {
      const response = await fetch(`/api/admin/approve/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Authorization header with JWT token
        },
      });
  
      const data = await response.json();
      if (response.ok) {
        // Remove the approved booking from the state
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== bookingId)
        );
        alert('Booking approved');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error approving booking:', error);
    }
  };

  // Reject booking
  const rejectBooking = async (bookingId) => {
    try {
      const response = await fetch(`/api/admin/reject/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Authorization header with JWT token
        },
      });
  
      const data = await response.json();
      if (response.ok) {
        // Update the state to remove the rejected booking
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== bookingId)
        );
        alert('Booking rejected');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error rejecting booking:', error);
    }
  };
  

  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString([], options);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString([], {
      weekday: 'short', // e.g., "Mon"
      year: 'numeric',
      month: 'short', // e.g., "Jan"
      day: 'numeric',
    });
  };

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
    <div className="container">
      <div className="requestsBox">
        <h2 className="title">PENDING BOOKINGS</h2>
        <div className="requestsList">
          {requests.map((request) => (
            <div key={request._id} className="requestCard">
              <div className="logoContainer">
                <img
                  src={clubLogos[request.club.name.toUpperCase()]}
                  alt={`${request.club.name} Logo`}
                  className="logoImage"
                />
              </div>
              <div className="requestInfo">
                <div className="primaryDetails">
                  <span><strong>Club:</strong> {request.club.name}</span>
                  <span><strong>Slot:</strong> {formatTime(request.slotTime)}</span>
                  <span><strong>Date:</strong> {formatDate(request.slotTime)}</span>
                  <span><strong>Status:</strong> {request.approved ? "Approved" : "Pending"}</span>
                </div>
                <div className="additionalDetails">
                  <span>
                    Members: <span className="details">{request.members}</span>
                  </span>
                  <span>
                    Reason: <span className="details">{request.reason}</span>
                  </span>
                </div>
              </div>
              <div className="icons">
                {!request.approved && (
                  <>
                    <div className="icon-button approve" onClick={() => approveBooking(request._id)}>
                      <FaCheckCircle size={20} />
                    </div>
                    <div className="icon-button reject" onClick={() => rejectBooking(request._id)}>
                      <FaTimesCircle size={20} />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Request;
