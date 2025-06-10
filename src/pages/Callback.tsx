
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export default function Callback() {
  const [isProcessing, setIsProcessing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state'); // signin or signup
        const error = urlParams.get('error');

        if (error) {
          console.error('Google OAuth error:', error);
          toast.error('Authentication failed. Please try again.');
          navigate('/login');
          return;
        }

        if (!code) {
          console.error('No authorization code received');
          toast.error('Authentication failed. No authorization code received.');
          navigate('/login');
          return;
        }

        console.log('Processing Google OAuth callback with code:', code);
        
        // Exchange the authorization code for tokens
        const response = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: '472513945629-2qed7qvfb4kn3njilhru2d2djqdm9e6n.apps.googleusercontent.com',
            client_secret: 'YOUR_GOOGLE_CLIENT_SECRET', // You'll need to add this
            code,
            grant_type: 'authorization_code',
            redirect_uri: 'https://jblinx-studio.github.io/Orthodox-Echoes-Ascend/callback',
          }),
        });

        const tokenData = await response.json();
        
        if (tokenData.error) {
          console.error('Token exchange error:', tokenData.error);
          toast.error('Authentication failed during token exchange.');
          navigate('/login');
          return;
        }

        // Get user info from Google
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        });

        const userInfo = await userResponse.json();
        console.log('Google user info:', userInfo);

        // Create or sign in user with Supabase using email/password
        if (state === 'signup') {
          // For signup, create a new user
          const { data, error } = await supabase.auth.signUp({
            email: userInfo.email,
            password: Math.random().toString(36).slice(-8), // Generate random password
            options: {
              data: {
                name: userInfo.name,
                avatar_url: userInfo.picture,
                google_id: userInfo.id,
              }
            }
          });

          if (error) {
            console.error('Supabase signup error:', error);
            toast.error('Failed to create account. Please try again.');
            navigate('/login');
            return;
          }

          toast.success('Account created successfully!');
        } else {
          // For signin, attempt to sign in with email
          const { data, error } = await supabase.auth.signInWithPassword({
            email: userInfo.email,
            password: Math.random().toString(36).slice(-8), // This won't work, need better approach
          });

          if (error) {
            console.error('Supabase signin error:', error);
            toast.error('Failed to sign in. Please try creating an account first.');
            navigate('/login');
            return;
          }

          toast.success('Successfully signed in!');
        }

        navigate('/');
        
      } catch (error) {
        console.error('Callback processing error:', error);
        toast.error('Authentication failed. Please try again.');
        navigate('/login');
      } finally {
        setIsProcessing(false);
      }
    };

    handleGoogleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8 relative">
          <div className="w-32 h-32 relative flex items-center justify-center mx-auto">
            <div className="absolute w-32 h-32">
              <div className="absolute inset-0 rounded-full border-2 border-gold/30 animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-2 border-byzantine/40 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
            </div>
            
            <svg className="w-16 h-16 text-gold relative z-10" viewBox="0 0 32 32" fill="currentColor">
              <g transform="translate(16,16)">
                <rect x="-2" y="-12" width="4" height="24" rx="1"/>
                <rect x="-8" y="-6" width="16" height="4" rx="1"/>
                <rect x="-6" y="4" width="12" height="3" rx="1"/>
                <circle cx="0" cy="-10" r="2" fill="#B8860B"/>
                <path d="M-1,-8 L1,-8 L1,-6 L-1,-6 Z" fill="#B8860B"/>
              </g>
            </svg>
          </div>
          <div className="absolute inset-0 rounded-full bg-gold/10 blur-xl animate-pulse"></div>
        </div>
        
        <h1 className="text-gold font-display text-4xl mb-2">
          {isProcessing ? 'Processing Authentication...' : 'Authentication Complete'}
        </h1>
        <p className="text-white/70 text-lg">
          {isProcessing ? 'Please wait while we complete your sign-in.' : 'Redirecting you now.'}
        </p>
      </div>
    </div>
  );
}
