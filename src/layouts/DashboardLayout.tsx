import React, { useState, ReactNode, useEffect } from 'react';
import DashboardSidebar from '../components/dashboard/dahboard_sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const SIDEBAR_WIDTH = 250; 
  const SIDEBAR_COLLAPSED_WIDTH = 80; 
  const MOBILE_WIDTH = 250; 

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  useEffect(() => {
    if (isMobile) setIsMobileOpen(false);
    else setIsSidebarCollapsed(false);
  }, [isMobile]);

  const sidebarWidth = isMobile
    ? MOBILE_WIDTH
    : isSidebarCollapsed
      ? SIDEBAR_COLLAPSED_WIDTH
      : SIDEBAR_WIDTH;

  const transformX = isMobile
    ? isMobileOpen
      ? 0
      : -MOBILE_WIDTH
    : 0;

  return (
    <div className="flex h-screen bg-background relative">
      <div
        className={`${isMobile ? 'fixed top-0 left-0 z-50 shadow-lg' : 'relative'
          } h-full`}
        style={{
          width: sidebarWidth,
          transform: isMobile ? `translateX(${transformX}px)` : 'translateX(0)',
          transition: 'transform 0.5s ease, width 0.5s ease',
        }}
      >
        <DashboardSidebar
          isCollapsed={isMobile ? false : isSidebarCollapsed}
          onToggle={() => {
            if (isMobile) setIsMobileOpen(!isMobileOpen);
            else setIsSidebarCollapsed(!isSidebarCollapsed);
          }}
          isMobile={isMobile}
        />
      </div>

      <div className="flex-1 overflow-auto relative">
        <div className="w-full h-12 bg-white shadow-md flex items-center justify-end px-4 md:hidden">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`relative w-8 h-8 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${isMobileOpen ? 'space-y-0' : 'space-y-1'
              }`}
          >
            <span
              className={`block h-0.5 w-6 bg-blue-500 rounded transform transition-all duration-500 ease-in-out
      ${isMobileOpen ? 'rotate-45 absolute top-3' : 'relative'}
    `}
            />
            <span
              className={`block h-0.5 w-6 bg-blue-500 rounded transition-all duration-500 ease-in-out
      ${isMobileOpen ? 'opacity-0' : 'opacity-100'}
    `}
            />
            <span
              className={`block h-0.5 w-6 bg-blue-500 rounded transform transition-all duration-500 ease-in-out
      ${isMobileOpen ? '-rotate-45 absolute top-3' : 'relative'}
    `}
            />
          </button>

        </div>

        {children}
      </div>

      {isMobile && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-25 z-40 transition-opacity duration-500 ease-in-out
            ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
