// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABBahcm0McV-39nF4ug3BS7UnVfa45l2w",
  authDomain: "tensora-website.firebaseapp.com",
  projectId: "tensora-website",
  storageBucket: "tensora-website.firebasestorage.app",
  messagingSenderId: "594154741252",
  appId: "1:594154741252:web:f7d2a8eddc87881c3a5f51",
  measurementId: "G-KZSRSL43WL"
};

// Initialize Firebase (guard against multiple initializations)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Analytics safely for browser
let analytics = null;
if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch((err) => {
      console.warn("Firebase Analytics not supported in this environment:", err);
    });
}

// Initialize Firebase Authentication
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

/**
 * Trigger Firebase Google Sign-In Popup
 */
export const signInWithFirebaseGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const token = await user.getIdToken();

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email?.split("@")[0],
      photoURL: user.photoURL || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80`,
      token
    };
  } catch (error) {
    console.error("Firebase Google Sign-In Error:", error);
    throw error;
  }
};

/**
 * Sign Out from Firebase
 */
export const signOutFirebase = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Firebase SignOut Error:", error);
  }
};

export { app, auth, analytics, googleProvider };
