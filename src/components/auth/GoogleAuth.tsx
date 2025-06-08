
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { login } from '@/utils/auth-utils';

// Google OAuth configuration
const GOOGLE_CLIENT_ID = "1019903498866-5q0lubbt5hasule4duhh6tcmq1d6emm6.apps.googleusercontent.com";

interface GoogleAuthProps {
  onSuccess?: () => void;
  variant?: "signin" | "signup";
}

export function GoogleAuth({ onSuccess, variant = "signin" }: GoogleAuthProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    
    try {
      // Initialize Google OAuth
      if (!window.google) {
        // Load Google Identity Services
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        document.head.appendChild(script);
        
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      // Initialize Google Identity Services
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      // Prompt the user to sign in
      window.google.accounts.id.prompt();
      
    } catch (error) {
      console.error('Google Auth Error:', error);
      toast.error('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCredentialResponse = (response: any) => {
    try {
      // Decode the JWT token to get user info
      const userInfo = parseJwt(response.credential);
      
      if (userInfo) {
        // Log in the user
        login(userInfo.name || userInfo.email, false);
        
        toast.success(`Welcome, ${userInfo.name || 'Orthodox Friend'}!`, {
          description: "You've successfully signed in with Google."
        });
        
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error('Error processing Google credential:', error);
      toast.error('Authentication failed. Please try again.');
    }
  };

  // Helper function to parse JWT token
  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error parsing JWT:', error);
      return null;
    }
  };

  return (
    <Button
      onClick={handleGoogleAuth}
      disabled={isLoading}
      variant="outline"
      className="w-full border-gold/30 hover:bg-gold/10 text-white"
    >
      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="currentColor"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="currentColor"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="currentColor"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      {isLoading ? "Connecting..." : `${variant === "signup" ? "Sign up" : "Sign in"} with Google`}
    </Button>
  );
}

// Extend the Window interface to include Google
declare global {
  interface Window {
    google: any;
  }
}
