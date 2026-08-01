import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_BASE = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || null);
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_BASE}/api/admin/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setAdmin(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token validation failed", error);
          logout();
        }
      }
      setLoading(false);
    };
    
    validateToken();
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE}/api/admin/login`, { username, password });
      const { token: newToken, admin: adminData } = response.data;
      
      localStorage.setItem('adminToken', newToken);
      setToken(newToken);
      setAdmin(adminData);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setAdmin(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, admin, isAuthenticated, loading, login, logout, API_BASE }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
