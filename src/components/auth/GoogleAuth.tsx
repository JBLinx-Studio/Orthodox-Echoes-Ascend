
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface GoogleAuthProps {
  onSuccess?: () => void;
  variant?: "signin" | "signup";
}

export function GoogleAuth({ onSuccess, variant = "signin" }: GoogleAuthProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    
    try {
      // Use your actual Google Client ID
      const googleClientId = '1019903498866-5q0lubbt5hasule4duhh6tcmq1d6emm6.apps.googleusercontent.com';
      const redirectUri = 'https://jblinx-studio.github.io/Orthodox-Echoes-Ascend/callback';
      const scope = 'openid email profile';
      
      console.log('Initiating Google OAuth with:', { 
        clientId: googleClientId, 
        redirectUri, 
        variant 
      });
      
      // Generate a random state parameter for security
      const state = btoa(JSON.stringify({ 
        variant, 
        timestamp: Date.now(),
        random: Math.random().toString(36).substring(7)
      }));
      
      // Construct Google OAuth URL
      const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      googleAuthUrl.searchParams.set('client_id', googleClientId);
      googleAuthUrl.searchParams.set('redirect_uri', redirectUri);
      googleAuthUrl.searchParams.set('response_type', 'code');
      googleAuthUrl.searchParams.set('scope', scope);
      googleAuthUrl.searchParams.set('access_type', 'offline');
      googleAuthUrl.searchParams.set('prompt', 'consent');
      googleAuthUrl.searchParams.set('state', state);
      
      console.log('Redirecting to Google OAuth URL:', googleAuthUrl.toString());
      
      toast.success('Redirecting to Google...', {
        description: "You'll be redirected back after authentication."
      });
      
      // Redirect to Google OAuth
      window.location.href = googleAuthUrl.toString();
      
    } catch (error) {
      console.error('Google Auth Error:', error);
      toast.error('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleAuth}
      disabled={isLoading}
      variant="outline"
      className="w-full border-gold/30 hover:bg-gold/10 text-white group transition-all duration-300"
    >
      <div className="flex items-center justify-center">
        <svg className="w-5 h-5 mr-3 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span className="font-medium">
          {isLoading ? "Connecting..." : `${variant === "signup" ? "Sign up" : "Sign in"} with Google`}
        </span>
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1A1F2C]/80 rounded">
          <div className="w-5 h-5 border-2 border-gold/30 border-t-gold rounded-full animate-spin"></div>
        </div>
      )}
    </Button>
  );
}
