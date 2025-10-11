  import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

  interface User {
    id: string;
    email: string;
    name: string;
    picture?: string;
  }

  interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isLoading: boolean;
  }

  const AuthContext = createContext<AuthContextType | undefined>(undefined);

  export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      
      const checkAuth = async () => {
        try {
          const token = localStorage.getItem('token');
          if (token) {
          
            const response = await fetch('http://localhost:3001/auth/me', {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
              const userData = await response.json();
              setUser(userData);
            }
          }
        } catch (error) {
          console.error('Auth check failed:', error);
        } finally {
          setIsLoading(false);
        }
      };

      checkAuth();
    }, []);

    const login = (userData: User) => {
      setUser(userData);
    };

    const logout = () => {
      setUser(null);
      localStorage.removeItem('token');
    };

    return (
      <AuthContext.Provider value={{ user, login, logout, isLoading }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };