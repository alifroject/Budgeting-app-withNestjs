import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      // Get token from URL or make request to backend
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      
      if (token) {
        localStorage.setItem('token', token);
        
        // Get user data
        const response = await fetch('http://localhost:3001/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.ok) {
          const userData = await response.json();
          login(userData);
          navigate('/dashboard');
        }
      } else {
        navigate('/login');
      }
    };

    handleCallback();
  }, [login, navigate]);

  return <div>Processing login...</div>;
};

export default OAuthCallback;