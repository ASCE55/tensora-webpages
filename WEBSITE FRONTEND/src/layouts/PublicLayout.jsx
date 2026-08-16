import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { HexagonCanvas } from '../components/HexagonCanvas';
import { WaterRippleCanvas } from '../components/WaterRippleCanvas';
import { ScrollProgressBar } from '../components/ScrollProgressBar';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const PublicLayout = () => {
  const location = useLocation();
  useScrollReveal();

  return (
    <div className="d-flex flex-column min-vh-100 position-relative">
      <ScrollProgressBar />
      <HexagonCanvas />
      <WaterRippleCanvas />
      <ScrollToTop />
      <Navbar />
      <main key={location.pathname} className="flex-grow-1 position-relative w-100" style={{ zIndex: 1, overflowX: 'hidden' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
