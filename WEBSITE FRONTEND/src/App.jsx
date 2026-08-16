import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import { LoadingScreen } from './components/LoadingScreen';

import './styles/theme.css';
import './styles/global.css';
import './styles/responsive.css';

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />

        {/* Global Notifications Container */}
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
