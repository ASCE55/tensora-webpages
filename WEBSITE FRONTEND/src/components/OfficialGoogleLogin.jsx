import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { GoogleSignInModal } from './GoogleSignInModal';

export const OfficialGoogleLogin = ({ onSuccess, role = 'client', buttonText = 'Continue with Google' }) => {
  const [showFallbackModal, setShowFallbackModal] = useState(false);

  const handleGoogleCredentialResponse = (credentialResponse) => {
    try {
      if (credentialResponse?.credential) {
        const decoded = jwtDecode(credentialResponse.credential);
        const email = decoded.email;
        const name = decoded.name || decoded.given_name;
        const picture = decoded.picture;

        toast.success(`Google verification successful: ${email}`);
        if (onSuccess) {
          onSuccess(email, name, picture);
        }
      } else {
        setShowFallbackModal(true);
      }
    } catch (err) {
      console.error('Google decode error:', err);
      setShowFallbackModal(true);
    }
  };

  const handleGoogleError = () => {
    // If running on custom domain or origin not whitelisted in Google Cloud console yet, open seamless fallback dialog
    setShowFallbackModal(true);
  };

  return (
    <div className="w-100 d-flex flex-column align-items-center">
      {/* Official Google OAuth Button Container */}
      <div className="w-100 d-flex justify-content-center google-btn-wrapper mb-2">
        <GoogleLogin
          onSuccess={handleGoogleCredentialResponse}
          onError={handleGoogleError}
          theme="filled_black"
          shape="rectangular"
          size="large"
          text="continue_with"
          logo_alignment="center"
          width="360"
        />
      </div>

      {/* Fallback & Custom Account Modal */}
      <GoogleSignInModal
        show={showFallbackModal}
        onHide={() => setShowFallbackModal(false)}
        onGoogleSuccess={async (email, name) => {
          if (onSuccess) {
            await onSuccess(email, name);
          }
        }}
        role={role}
      />
    </div>
  );
};
