import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithFirebaseGoogle, signOutFirebase } from '../config/firebase';

const AuthContext = createContext(null);
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Initial Master Admin Gmail List
const DEFAULT_ADMIN_EMAILS = [
  'mugilans229@gmail.com',
  'admin@tensora.com',
  'admin@tensoradigital.com',
  'mugil@gmail.com',
  'mugilan@gmail.com',
  'tensora@gmail.com'
];

export const AuthProvider = ({ children }) => {
  // 1. Persistent Admin Emails List
  const [adminEmails, setAdminEmails] = useState(() => {
    try {
      const saved = localStorage.getItem('tensora_admin_emails');
      return saved ? JSON.parse(saved) : DEFAULT_ADMIN_EMAILS;
    } catch {
      return DEFAULT_ADMIN_EMAILS;
    }
  });

  // 2. Persistent Authenticated User State
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('tensora_auth_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  // Sync adminEmails to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tensora_admin_emails', JSON.stringify(adminEmails));
    } catch (e) {
      console.error('Failed to save admin emails list:', e);
    }
  }, [adminEmails]);

  // Helper to check if an email has Admin privileges
  const checkIsAdmin = (emailStr) => {
    if (!emailStr) return false;
    const cleanEmail = emailStr.trim().toLowerCase();
    return (
      adminEmails.some((e) => e.toLowerCase() === cleanEmail) ||
      cleanEmail.startsWith('admin') ||
      cleanEmail === 'tensora'
    );
  };

  // Add new Admin Gmail (called by existing admins)
  const addAdminEmail = (newEmail) => {
    const clean = newEmail.trim().toLowerCase();
    if (!clean || !clean.includes('@')) {
      throw new Error('Please enter a valid Gmail address.');
    }
    if (adminEmails.some((e) => e.toLowerCase() === clean)) {
      throw new Error('This Gmail is already granted Admin access.');
    }
    const updated = [...adminEmails, clean];
    setAdminEmails(updated);

    // If current logged in user matches this email, update their role immediately
    if (user && user.email && user.email.toLowerCase() === clean) {
      const updatedUser = { ...user, role: 'admin' };
      setUser(updatedUser);
      localStorage.setItem('tensora_auth_user', JSON.stringify(updatedUser));
    }
    return updated;
  };

  // Remove Admin Gmail
  const removeAdminEmail = (targetEmail) => {
    const clean = targetEmail.trim().toLowerCase();
    if (clean === 'admin@tensora.com') {
      throw new Error('Cannot remove primary master admin.');
    }
    const updated = adminEmails.filter((e) => e.toLowerCase() !== clean);
    setAdminEmails(updated);
    return updated;
  };

  // Unified Email / Username Login
  const login = async (identifier, password) => {
    setLoading(true);
    const cleanId = identifier.trim().toLowerCase();
    const isAdmin = checkIsAdmin(cleanId);
    const assignedRole = isAdmin ? 'admin' : 'client';

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: identifier, password, role: assignedRole })
      });

      const json = await response.json();
      if (response.ok && json.success && json.data) {
        const authenticatedUser = {
          ...json.data.user,
          token: json.data.token,
          role: json.data.role || assignedRole
        };
        setUser(authenticatedUser);
        localStorage.setItem('tensora_auth_user', JSON.stringify(authenticatedUser));
        setLoading(false);
        return { success: true, user: authenticatedUser };
      }
    } catch (err) {
      console.warn('Backend server sync skipped, using unified auth engine:', err);
    }

    // Local unified login logic
    await new Promise((res) => setTimeout(res, 300));
    const displayName = cleanId.includes('@')
      ? cleanId.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
      : cleanId;

    const authenticatedUser = {
      id: isAdmin ? `usr_admin_${Date.now().toString().slice(-4)}` : `usr_client_${Date.now().toString().slice(-4)}`,
      name: displayName || (isAdmin ? 'Tensora Admin' : 'Authorized Client'),
      username: cleanId.split('@')[0].toUpperCase(),
      email: cleanId.includes('@') ? cleanId : `${cleanId}@tensora.com`,
      company: isAdmin ? 'TENSORA DIGITAL SOLUTIONS PVT LTD' : `${displayName}'s Enterprise`,
      role: assignedRole,
      avatar: isAdmin ? '/logo.png' : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      authProvider: 'credentials',
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setUser(authenticatedUser);
    localStorage.setItem('tensora_auth_user', JSON.stringify(authenticatedUser));
    setLoading(false);
    return { success: true, user: authenticatedUser };
  };

  // Google SSO with automatic Gmail Role Detection
  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const firebaseUser = await signInWithFirebaseGoogle();
      const userEmail = firebaseUser.email;
      const isAdmin = checkIsAdmin(userEmail);
      const assignedRole = isAdmin ? 'admin' : 'client';

      const authenticatedUser = {
        id: `usr_google_${firebaseUser.uid.slice(0, 8)}`,
        name: firebaseUser.displayName || userEmail.split('@')[0],
        email: userEmail,
        company: assignedRole === 'admin' ? 'TENSORA DIGITAL SOLUTIONS' : `${firebaseUser.displayName}'s Organization`,
        role: assignedRole,
        avatar: firebaseUser.photoURL || '/logo.png',
        authProvider: 'google',
        verified: true,
        firebaseUid: firebaseUser.uid
      };

      setUser(authenticatedUser);
      localStorage.setItem('tensora_auth_user', JSON.stringify(authenticatedUser));
      setLoading(false);
      return { success: true, user: authenticatedUser };
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // GitHub SSO Login
  const loginWithGithub = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 500));
    // Prompt or simulated GitHub OAuth
    const githubUserEmail = prompt('Enter your GitHub account email address:') || 'github.user@gmail.com';
    const cleanEmail = githubUserEmail.trim().toLowerCase();
    const isAdmin = checkIsAdmin(cleanEmail);
    const assignedRole = isAdmin ? 'admin' : 'client';

    const displayName = cleanEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

    const authenticatedUser = {
      id: `usr_github_${Date.now().toString().slice(-4)}`,
      name: `${displayName} (GitHub)`,
      email: cleanEmail,
      company: assignedRole === 'admin' ? 'TENSORA DIGITAL SOLUTIONS' : `${displayName}'s Dev Org`,
      role: assignedRole,
      avatar: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=150&q=80',
      authProvider: 'github',
      verified: true
    };

    setUser(authenticatedUser);
    localStorage.setItem('tensora_auth_user', JSON.stringify(authenticatedUser));
    setLoading(false);
    return { success: true, user: authenticatedUser };
  };

  // Discord SSO Login
  const loginWithDiscord = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 500));
    // Prompt or simulated Discord OAuth
    const discordUserEmail = prompt('Enter your Discord account email address:') || 'discord.user@gmail.com';
    const cleanEmail = discordUserEmail.trim().toLowerCase();
    const isAdmin = checkIsAdmin(cleanEmail);
    const assignedRole = isAdmin ? 'admin' : 'client';

    const displayName = cleanEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

    const authenticatedUser = {
      id: `usr_discord_${Date.now().toString().slice(-4)}`,
      name: `${displayName} (Discord)`,
      email: cleanEmail,
      company: assignedRole === 'admin' ? 'TENSORA DIGITAL SOLUTIONS' : `${displayName}'s Community`,
      role: assignedRole,
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&q=80',
      authProvider: 'discord',
      verified: true
    };

    setUser(authenticatedUser);
    localStorage.setItem('tensora_auth_user', JSON.stringify(authenticatedUser));
    setLoading(false);
    return { success: true, user: authenticatedUser };
  };

  const logout = async () => {
    await signOutFirebase();
    setUser(null);
    localStorage.removeItem('tensora_auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        role: user?.role || null,
        adminEmails,
        addAdminEmail,
        removeAdminEmail,
        checkIsAdmin,
        login,
        loginWithGoogle,
        loginWithGithub,
        loginWithDiscord,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
