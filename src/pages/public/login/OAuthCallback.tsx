import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('OAuthCallback: Checking cookies...');
        console.log('All cookies:', document.cookie);
        
        // Wait a moment for the session cookie to be processed
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('OAuthCallback: Starting authentication check...');
        
        const response = await fetch('http://localhost:3001/auth/me', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        console.log('OAuthCallback: Response status:', response.status);
        console.log('OAuthCallback: Response headers:', response.headers);
        
        if (response.ok) {
          const userData = await response.json();
          console.log('OAuthCallback: User data received:', userData);
          login(userData);
          navigate('/dashboard');
        } else {
          console.error('OAuthCallback: Authentication failed');
          // Try one more time after a delay
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      } catch (error) {
        console.error('OAuthCallback: Network error:', error);
        navigate('/login');
      }
    };

    handleCallback();
  }, [login, navigate]);

  return <div>Processing login... Checking session...</div>;
};

export default OAuthCallback;