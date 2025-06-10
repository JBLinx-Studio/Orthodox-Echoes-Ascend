
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
      // Your specific Google OAuth configuration
      const googleClientId = '472513945629-2qed7qvfb4kn3njilhru2d2djqdm9e6n.apps.googleusercontent.com';
      const redirectUri = 'https://jblinx-studio.github.io/Orthodox-Echoes-Ascend/callback';
      const scope = 'openid email profile';
      
      console.log('Initiating Google OAuth with your client configuration:', { 
        clientId: googleClientId,
        redirectUri, 
        variant 
      });
      
      // Generate state parameter for security
      const state = btoa(JSON.stringify({ 
        variant, 
        timestamp: Date.now(),
        nonce: Math.random().toString(36).substring(2, 15)
      }));
      
      // Construct Google OAuth URL with your settings
      const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      googleAuthUrl.searchParams.set('client_id', googleClientId);
      googleAuthUrl.searchParams.set('redirect_uri', redirectUri);
      googleAuthUrl.searchParams.set('response_type', 'code');
      googleAuthUrl.searchParams.set('scope', scope);
      googleAuthUrl.searchParams.set('access_type', 'offline');
      googleAuthUrl.searchParams.set('prompt', 'consent');
      googleAuthUrl.searchParams.set('state', state);
      
      console.log('Redirecting to Google OAuth URL:', googleAuthUrl.toString());
      
      toast.success(`Redirecting to Google for ${variant}...`, {
        description: "You'll be brought back after authentication.",
        duration: 2000
      });
      
      // Small delay to show the toast
      setTimeout(() => {
        window.location.href = googleAuthUrl.toString();
      }, 500);
      
    } catch (error) {
      console.error('Google Auth Error:', error);
      toast.error('Authentication failed', {
        description: 'Please try again or contact support if the issue persists.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleAuth}
      disabled={isLoading}
      variant="outline"
      className="w-full border-gold/30 hover:bg-gold/10 text-white transition-all duration-200 hover:border-gold/50"
    >
      <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
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
      {isLoading ? (
        <div className="flex items-center">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
          Connecting...
        </div>
      ) : (
        `${variant === "signup" ? "Sign up" : "Sign in"} with Google`
      )}
    </Button>
  );
}
