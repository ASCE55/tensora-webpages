import React from 'react';
import { ClientLogin } from './ClientLogin';

// Redirect AdminLogin to the unified ClientLogin page
export const AdminLogin = () => {
  return <ClientLogin />;
};
