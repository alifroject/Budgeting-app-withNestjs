import React from 'react';
import { Link } from 'react-router-dom';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold text-text-primary">
              BudgetBuddy
            </Link>
            <nav className="flex space-x-4">
              <Link to="/login" className="text-text-secondary hover:text-text-primary">
                Sign In
              </Link>
              <Link to="/signup" className="text-text-secondary hover:text-text-primary">
                Sign Up
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
};

export default PublicLayout;