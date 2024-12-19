import React, { useState } from 'react';
import '../styles/Profile.css';

const Prof = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(''); // Success or error message

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/admin/clubs/reset-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Ensure admin or authorized
        },
        body: JSON.stringify({
          username,
          newPassword: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password updated successfully!');
      } else {
        setMessage(data.message || 'Password update failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong.');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <div className="close-button">×</div>
        <h1 className="profile-title">PROFILE</h1>
        <form onSubmit={handleSubmit} className="profile-form">
          <label className="profile-label">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="profile-input"
          />

          <label className="profile-label">New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="profile-input"
          />

          <label className="profile-label">Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="profile-input"
          />

          <button type="submit" className="profile-button">CONFIRM</button>
        </form>
        {message && <p className="profile-message">{message}</p>}
      </div>
    </div>
  );
};

export default Prof;
